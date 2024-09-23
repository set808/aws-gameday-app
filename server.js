const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

exports.handler = async (event, context) => {
  try {
    await app.prepare();

    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    const response = await new Promise((resolve, reject) => {
      server.listen(0, (err) => {
        if (err) {
          console.error("Server creation error:", err);
          return reject(new Error("Failed to create server"));
        }

        const { port } = server.address();

        const lambdaEvent = {
          method: event.httpMethod,
          headers: event.headers || {},
          body: event.body || "",
          remoteAddress: event.requestContext?.identity?.sourceIp || "",
          url:
            event.path +
            (event.queryStringParameters
              ? "?" +
                new URLSearchParams(event.queryStringParameters).toString()
              : ""),
        };

        const lambdaResponse = {
          statusCode: 200,
          headers: {},
          body: "",
          isBase64Encoded: false,
        };

        const req = Object.assign(new require("stream").Readable(), {
          url: lambdaEvent.url,
          headers: lambdaEvent.headers,
          method: lambdaEvent.method,
        });
        req.push(lambdaEvent.body);
        req.push(null);

        const res = new require("stream").Writable();
        res.statusCode = 200;
        res._headers = {};
        res.writeHead = (status, headers) => {
          res.statusCode = status;
          res._headers = headers;
        };
        res.write = (chunk) => {
          lambdaResponse.body += chunk.toString();
        };
        res.setHeader = (name, value) => {
          res._headers[name.toLowerCase()] = value;
        };
        res.removeHeader = (name) => {
          delete res._headers[name.toLowerCase()];
        };
        res.getHeader = (name) => {
          return res._headers[name.toLowerCase()];
        };
        res.getHeaders = () => {
          return res._headers;
        };
        res.hasHeader = (name) => {
          return !!res._headers[name.toLowerCase()];
        };
        res.end = (text) => {
          if (text) lambdaResponse.body += text.toString();
          lambdaResponse.statusCode = res.statusCode;
          lambdaResponse.headers = res._headers;
          lambdaResponse.isBase64Encoded = false;
          resolve(lambdaResponse);
        };

        const timeout = setTimeout(() => {
          reject(new Error("Lambda execution timed out"));
        }, context.getRemainingTimeInMillis() - 1000); // 1 second buffer

        server.emit("request", req, res);

        res.on("finish", () => {
          clearTimeout(timeout);
        });
      });
    });

    server.close();
    return response;
  } catch (error) {
    console.error("Unhandled error in Lambda handler:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "production"
            ? "An unexpected error occurred"
            : error.message,
      }),
    };
  }
};

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

import { LayerVersion } from "aws-cdk-lib/aws-lambda";
import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { Table, Bucket, Api, Script, Config } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "uniflix-app",
      region: "us-east-1",
    };
  },

  stacks(app) {
    app.stack(function Site({ stack }) {

      const NEW_RELIC_LICENSE_KEY = new Config.Secret(stack, "NEW_RELIC_LICENSE_KEY");

      const table = new Table(stack, "ContentTable", {
        fields: {
          id: "string",
          genre: "string",
          contentType: "string",
          title: "string",
          releaseDate: "string",
          popularity: "number",
          voteAverage: "number",
          voteCount: "number",
        },
        primaryIndex: { partitionKey: "id" },
        globalIndexes: {
          byPopularity: {
            partitionKey: "contentType",
            sortKey: "popularity",
            projection: "all",
          },
          byType: {
            partitionKey: "contentType",
            sortKey: "releaseDate",
            projection: "all",
          },
        },
      });

      const bucket = new Bucket(stack, "ImageAssetsBucket");

      const api = new Api(stack, "Api", {
        cors: {
          allowMethods: ["ANY"],
          allowHeaders: ["Authorization"],
        },
        defaults: {
          function: {
            bind: [table],
            environment: {
              DYNAMO_TABLE_NAME: table.tableName,
              S3_BUCKET_NAME: bucket.bucketName,
            },
          }
        },
        routes: {
          "GET /api/home": "functions/home.handler",
          "GET /api/movies": "functions/movies.handler",
          "GET /api/movies/{id}": "functions/moviesById.handler",
          "GET /api/shows": "functions/shows.handler",
          "GET /api/shows/{id}": "functions/showsById.handler",
        },
      });

      api.bind([table]);

      const site = new NextjsSite(stack, "Site", {
        path: ".",
        environment: {
          NEXT_PUBLIC_API_URL: api.url,
          DYNAMO_TABLE_NAME: table.tableName,
          S3_BUCKET_NAME: bucket.bucketName,
        },
        bind: [table, bucket, api, NEW_RELIC_LICENSE_KEY]
      });

      site.attachPermissions([table, bucket, api]);

      const populateContent = new Script(stack, "PopulateContent", {
        defaults: {
          function: {
            bind: [table],
            environment: {DYNAMODB_TABLE_NAME: table.tableName},
            permissions: [table],
          },
        },
        onCreate: "functions/populateContent.handler",
      });

      const generateRecords = new Script(stack, "GenerateRecords", {
        defaults: {
          function: {
            bind: [table],
            environment: {DYNAMODB_TABLE_NAME: table.tableName},
            permissions: [table],
          },
        },
        onCreate: "functions/generateRecords.handler",
      });


      stack.addOutputs({
        ApiUrl: api.url,
        URL: site.url,
        BucketName: bucket.bucketName,
        TableName: table.tableName,
      });
    });
  },
} satisfies SSTConfig;

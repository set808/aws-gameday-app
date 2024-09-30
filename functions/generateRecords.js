import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array(length)
    .fill()
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join("");
};

const generateInefficientRecord = () => {
  const largeAttribute = generateRandomString(1000); // 1KB of random data
  const nestedObject = Object.fromEntries(
    Array(10)
      .fill()
      .map((_, i) => [`key${i}`, generateRandomString(100)])
  );

  return {
    id: generateRandomString(20),
    timestamp: Date.now(),
    largeAttribute,
    nestedObject,
    arrayAttribute: Array(50)
      .fill()
      .map(() => generateRandomString(20)),
  };
};

const batchWriteRecords = async (tableName, records) => {
  const params = {
    RequestItems: {
      [tableName]: records.map((record) => ({
        PutRequest: { Item: record },
      })),
    },
  };

  try {
    const command = new BatchWriteCommand(params);
    await docClient.send(command);
    console.log(`Batch of ${records.length} items written successfully.`);
  } catch (error) {
    console.error("Error writing batch to DynamoDB:", error);
    throw error;
  }
};

export const handler = async (event) => {
  const tableName = process.env.DYNAMODB_TABLE_NAME;
  const recordsToGenerate = 1000;

  let batchWriteItems = [];
  let totalRecordsWritten = 0;

  for (let i = 0; i < recordsToGenerate; i++) {
    const record = generateInefficientRecord();
    batchWriteItems.push(record);

    if (batchWriteItems.length === 25 || i === recordsToGenerate - 1) {
      await batchWriteRecords(tableName, batchWriteItems);
      totalRecordsWritten += batchWriteItems.length;
      batchWriteItems = []; // Clear the batch
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${totalRecordsWritten} inefficient records generated and inserted.`,
    }),
  };
};

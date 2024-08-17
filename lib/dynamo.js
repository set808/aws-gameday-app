// lib/dynamo.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const docClient = DynamoDBDocumentClient.from(client);

export async function scanTable(tableName) {
  const command = new ScanCommand({
    TableName: tableName,
  });

  try {
    const response = await docClient.send(command);
    return response.Items;
  } catch (error) {
    console.error("Error scanning DynamoDB table:", error);
    throw error;
  }
}

export async function getItem(tableName, key) {
  const command = new GetCommand({
    TableName: tableName,
    Key: key,
  });

  try {
    const response = await docClient.send(command);
    return response.Item;
  } catch (error) {
    console.error("Error getting item from DynamoDB:", error);
    throw error;
  }
}

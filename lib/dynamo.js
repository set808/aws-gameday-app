import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;

export async function getItem(key) {
  const params = {
    TableName: TABLE_NAME,
    Key: key,
  };

  const result = await dynamoDb.send(new GetCommand(params));
  return result.Item;
}

export async function queryItems(
  index,
  keyConditionExpression,
  expressionAttributeValues
) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: index,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  const result = await dynamoDb.send(new QueryCommand(params));
  return result.Items;
}

export async function scanItems(filterExpression, expressionAttributeValues) {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: filterExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  const result = await dynamoDb.send(new ScanCommand(params));
  return result.Items;
}

export async function queryByTypeAndPopularity(contentType, limit = 10) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "byPopularity",
    KeyConditionExpression: "contentType = :contentType",
    ExpressionAttributeValues: {
      ":contentType": contentType,
    },
    ScanIndexForward: false,
    Limit: limit,
  };

  const result = await dynamoDb.send(new QueryCommand(params));
  return result.Items;
}

export async function queryByTypeAndReleaseDate(contentType, limit = 10) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "byType",
    KeyConditionExpression: "contentType = :contentType",
    ExpressionAttributeValues: {
      ":contentType": contentType,
    },
    ScanIndexForward: false,
    Limit: limit,
  };

  const result = await dynamoDb.send(new QueryCommand(params));
  return result.Items;
}

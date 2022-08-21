import { APIGatewayProxyResult } from 'aws-lambda';

export default async function getProductsList (): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({ test: 'test response' }),
  }
}
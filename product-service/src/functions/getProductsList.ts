import { APIGatewayProxyResult } from 'aws-lambda';

export default async function getProductsList (): Promise<APIGatewayProxyResult> {
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({ test: 'test response' }),
  });
}
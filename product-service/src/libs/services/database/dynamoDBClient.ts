import { DynamoDB } from 'aws-sdk';
import DataBaseClient from './databaseClient';

class DynamoDBCLient extends DataBaseClient {
  private _client: DynamoDB.DocumentClient;

  constructor() {
    super();
    
    this._client = new DynamoDB.DocumentClient();
  }

  get client() {
    return this._client;
  }

  public connect(): Promise<void> {
    return;
  }

  public disconnect(): Promise<void> {
    return;
  }

  public async getAll<T>(table: string): Promise<T> {
    const params = { TableName: table };

    const data = await this.client.scan(params).promise();
     
    return Promise.resolve(data.Items as unknown as T);
  }

  public async getById<T>(table: string, id: string): Promise<T> {
    const params = {
      TableName: table,
      Key: { id },
    };

    const data = await this.client.get(params).promise();

    return Promise.resolve(data.Item as unknown as T);
  }

  public async insert<T>(table: string, item: T): Promise<T> {
    const params = {
      TableName: table,
      Item: item,
    };

    await this.client.put(params).promise();

    return item;
  }
}

export default DynamoDBCLient;

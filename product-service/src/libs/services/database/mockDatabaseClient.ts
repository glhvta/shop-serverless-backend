import DataBaseClient from './databaseClient';

export default class MockDatabaseClient extends DataBaseClient{
  public connect(): Promise<void> {
    return;
  }
  public disconnect(): Promise<void> {
    return;
  }
  public getAll<T>(): Promise<T> {
    return Promise.resolve({} as unknown as T);
  }
  public getById<T>(): Promise<T> {
    return Promise.resolve({} as unknown as T);
  }
  public insert<T>(): Promise<T> {
    return Promise.resolve({} as unknown as T);
  }
}

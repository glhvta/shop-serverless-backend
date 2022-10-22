import ImportService from './importService';

export default class MockImportService extends ImportService {
  static readonly signedUrl = 'mock-signed-url';

  public getSignedUrl(): Promise<string> {
    return Promise.resolve(MockImportService.signedUrl);
  }

  public parseFile<T>(): Promise<T[]> {
    return Promise.resolve([] as T[]);
  }

  public moveFile(): Promise<void> {
    return Promise.resolve();
  }

  public sendImportedProductsToQueue(): Promise<void> {
    return Promise.resolve();
  }
}

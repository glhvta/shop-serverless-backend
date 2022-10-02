import ImportService from './importService';

export default class MockImportService extends ImportService {
  static readonly signedUrl = 'mock-signed-url';

  public getSignedUrl(): Promise<string> {
    return Promise.resolve(MockImportService.signedUrl);
  }
}

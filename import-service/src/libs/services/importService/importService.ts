export default abstract class ImportService {
  public abstract getSignedUrl(fileName: string): Promise<string>;
}

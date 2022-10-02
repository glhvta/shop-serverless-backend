export default abstract class ImportService {
  public abstract getSignedUrl(fileName: string): Promise<string>;
  public abstract parseFile<T>(fileName: string): Promise<T[]>;
}

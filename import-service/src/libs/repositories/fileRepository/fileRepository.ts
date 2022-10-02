export default abstract class FileRepository {
  public abstract getFileSignedUrl(fileName: string): Promise<string>;
  public abstract getFile<T>(fileName: string): Promise<T[]>;
}

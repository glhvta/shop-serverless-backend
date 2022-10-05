export default abstract class FileRepository {
  public abstract getFileSignedUrl(fileName: string): Promise<string>;
  public abstract getFile<T>(fileName: string): Promise<T[]>;
  public abstract copyFile(fileName: string): Promise<void>;
  public abstract deleteFile(fileName: string): Promise<void>;
  public abstract moveFile(fileName: string): Promise<void>;
}

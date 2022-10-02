export default abstract class FileRepository {
  public abstract getFileSignedUrl(fileName: string): Promise<string>;
}

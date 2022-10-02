export default abstract class DataBaseClient {
  public abstract connect(): Promise<void>;
  public abstract disconnect(): Promise<void>; 
  public abstract getAll<T>(table: string): Promise<T>;
  public abstract getById<T>(table: string, id: string): Promise<T>;
  public abstract insert<T>(table: string, item: T): Promise<T>;
}

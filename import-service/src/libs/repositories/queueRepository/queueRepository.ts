export default abstract class QueueRepository {
  public abstract send<T>(message: T): Promise<void>;
}

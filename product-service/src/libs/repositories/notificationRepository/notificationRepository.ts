export enum AttributeType {
  Number = 'Number'
}
export interface Attribute {
  DataType: AttributeType, 
  StringValue: string, 
}
export default abstract class NotificationRepository {
  public abstract send(message: string | undefined, subject: string | undefined, attributes?: Record<string, Attribute>): Promise<void>;
}

export default abstract class AuthorizationService {
  public abstract validate(token: string): Promise<boolean>;
}

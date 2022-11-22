import AuthorizationService from './authorizationService';

export default class BasicAuthorizationService implements AuthorizationService {
  private readonly authorizationToken: string;
  private readonly encodedAuthorizationToken: string;

  constructor(username: string, password: string) {
    this.authorizationToken = `${username}:${password}`;
    this.encodedAuthorizationToken = Buffer.from(this.authorizationToken).toString('base64');
  }

  public validate(tokenHeader: string): Promise<boolean> {
    const [, token] = tokenHeader.split(' ');

    return Promise.resolve(this.encodedAuthorizationToken === token);
  }
}

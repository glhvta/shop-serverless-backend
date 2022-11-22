import { BasicAuthorizationService } from '@libs/services/authorizationService';
import * as handlers from './src/functions';

const { username } = process.env;

const basicAuthorizationService = new BasicAuthorizationService(username, process.env[username]);

const basicAuthorizer = handlers.basicAuthorizer(basicAuthorizationService);

export { basicAuthorizer };

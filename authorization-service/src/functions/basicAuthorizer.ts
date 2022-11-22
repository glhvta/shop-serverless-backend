import { AuthorizationService } from '@libs/services/authorizationService';
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from 'aws-lambda/trigger/api-gateway-authorizer';

enum PolicyEffect {
  Deny = 'Deny',
  Allow = 'Allow',
}

const createPolicy = (policyEffect: PolicyEffect) => (principalId: string, resource: string) => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: policyEffect,
          Resource: resource,
        },
      ],
    },
  };
};

const createAllowPolicy = createPolicy(PolicyEffect.Allow);
const createDenyPolicy = createPolicy(PolicyEffect.Deny);

const basicAuthorizer = (authorizationService: AuthorizationService) => async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  console.log(`Incoming event: ${ JSON.stringify(event) }`);

  const { authorizationToken, methodArn, type } = event;

  if (type !== 'TOKEN') {
    console.log('Deny authorization. Event type is not TOKEN');

    return createDenyPolicy(authorizationToken, methodArn);
  }

  let isAuthorized = false;

  try {
    isAuthorized = await authorizationService.validate(authorizationToken);

    console.log('Token was successfully validated');
  } catch (err) {
    console.log('Error occurred during token validation ', err);
  }

  if (isAuthorized) {
    console.log('Authorized. Returning allow policy');

    return createAllowPolicy(authorizationToken, methodArn);
  }

  console.log('Not Authorized. Returning deny policy');

  return createDenyPolicy(authorizationToken, methodArn);
};

export default basicAuthorizer;


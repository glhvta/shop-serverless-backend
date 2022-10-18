import { ImportService } from '@libs/services/importService';
import { badRequestErrorResponse, serverErrorResponse, successResponse } from '@libs/services/responseBuilder';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

const importProductsFile = (importService: ImportService) => async(event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    const { name } = event.queryStringParameters;

    if (!name) {
      return badRequestErrorResponse('File name was not provided');
    }

    console.log(`Get sign url for filename ${name}`);

    const url = await importService.getSignedUrl(name);

    console.log(`Sign url created: ${url}`);

    return successResponse({ url });
  } catch (err) {
    console.log('Error occurred while creating singed url ', err);

    return serverErrorResponse('Server error occurred while creating singed url');
  }
};

export default importProductsFile;

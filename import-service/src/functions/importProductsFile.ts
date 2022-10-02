import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

const importProductsFile = () => async(event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    return Promise.reject();
  } catch (err) {
    console.log('Error occurred while importing products file');
  }
};

export default importProductsFile;

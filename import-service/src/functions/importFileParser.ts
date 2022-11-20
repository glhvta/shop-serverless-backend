import { ImportService } from '@libs/services/importService';
import { serverErrorResponse } from '@libs/services/responseBuilder';
import { S3Event } from 'aws-lambda';
import { Product } from 'src/types/api-types';

const importFileParser = (importService: ImportService) => async(event: S3Event) => {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    await Promise.all(
      event.Records.map(async (record) => {
        const fileName = record.s3.object.key;

        console.log(`Start parsing file: ${fileName}`);

        const products = await importService.parseFile<Product>(fileName);

        console.log(`File ${fileName} was parsed successfully: `, JSON.stringify(products));

        console.log(`Starting moving file ${fileName}`);

        await importService.moveFile(fileName);

        console.log(`File ${fileName} was successfully moved`);

        console.log('Products to be sent to sqs queue: ', products);

        await importService.sendImportedProductsToQueue(products);

        console.log('Products were successfully sent to sqs queue');
      }),
    );
  } catch (err) {
    console.log('Error while parsing file ', err);

    return serverErrorResponse('Server error occurred while parsing file');
  }
};

export default importFileParser;

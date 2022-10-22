import FileRepository from '@libs/repositories/fileRepository/fileRepository';
import QueueRepository from '@libs/repositories/queueRepository/queueRepository';
import { Product } from 'src/types/api-types';
import ImportService from './importService';

class FileImportService extends ImportService{
  constructor(private readonly fileRepository: FileRepository, private readonly queueRepository: QueueRepository) {
    super();
  }
  
  public getSignedUrl(fileName: string): Promise<string> {
    return this.fileRepository.getFileSignedUrl(fileName);
  }

  public parseFile<T>(fileName: string): Promise<T[]> {
    return this.fileRepository.getFile(fileName);
  }
  
  public moveFile(fileName: string): Promise<void> {
    return this.fileRepository.moveFile(fileName);
  }

  public async sendImportedProductsToQueue(products: Product[]): Promise<void> {
    await Promise.all(products.map((product) => this.queueRepository.send(product)));
  }
}

export default FileImportService;


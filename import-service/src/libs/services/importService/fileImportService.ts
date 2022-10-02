import FileRepository from '@libs/repositories/fileRepository/fileRepository';
import ImportService from './importService';

class FileImportService extends ImportService{
  constructor(private readonly fileRepository: FileRepository) {
    super();
  }
  
  public getSignedUrl(fileName: string): Promise<string> {
    return this.fileRepository.getFileSignedUrl(fileName);
  }
}

export default FileImportService;


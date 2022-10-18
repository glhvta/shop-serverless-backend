import FileRepository from '@libs/repositories/fileRepository/fileRepository';
import ImportService from './importService';

class FileImportService extends ImportService{
  constructor(private readonly fileRepository: FileRepository) {
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
}

export default FileImportService;


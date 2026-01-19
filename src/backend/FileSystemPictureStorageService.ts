import { IPictureStorageService } from "./IPictureStorageService";

export class FileSystemPictureStorageService implements IPictureStorageService {
  getUrlAsync(key: string): Promise<string> {
    // fetch(`${key}`);
    return Promise.resolve("hello");
  }
}
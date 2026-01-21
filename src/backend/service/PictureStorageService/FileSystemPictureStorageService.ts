import { IStorageService } from "./IStorageService";

export class FileSystemPictureStorageService implements IStorageService {
  getUrlAsync(key: string): Promise<string> {
    // fetch(`${key}`);
    return Promise.resolve("hello");
  }
}
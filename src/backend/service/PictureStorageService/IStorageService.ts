export interface IStorageService {
  getUrl(key: string): Promise<string>;
  getUrls(items: StorageObjectRequest[]): Promise<StorageObjectResponse[]>;
}

export type StorageObjectRequest = {
  id: number;
  key: string;
}

export type StorageObjectResponse = {
  id: number;
  url: string;
}
export interface IPictureStorageService {
  getUrlAsync(key: string): Promise<string>;  // Для приватных бакетов, через presignedUrl
  // getUrl(key: string): string;  // Для публичных бакетов
}
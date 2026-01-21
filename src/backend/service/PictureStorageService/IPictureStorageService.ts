export interface IPictureStorageService {
  getUrlAsync(key: string): Promise<string>;  // Для приватных бакетов, через presignedUrl
  getUrl(key: string): string;  // Для публичных бакетов
  getUrls(items: { id: number | string, key: string }[]): Promise<{ id: number | string, url: string }[]>
}
import { IStorageService } from "./IStorageService";
import * as Minio from "minio";
import { minioConfig } from "@/src/backend/config/minioConfig";

// TODO: как сравнить производительность при закрытых и публичных бакетах? С и без асинхронки
// TODO: может быть имеет смысл сделать бакет заменяемым? а не зашивать его в конструкторе наглухо
export class MinioStorageService implements IStorageService {
  private client: Minio.Client;
  private bucket: string;

  constructor(bucket: string) {
    this.client = new Minio.Client({
      endPoint: minioConfig.endPoint,
      port: minioConfig.port,
      useSSL: minioConfig.useSSL,
      accessKey: minioConfig.accessKey,
      secretKey: minioConfig.secretKey
    });
    this.bucket = bucket;
  }

  async getUrl(key: string) {
    return this.client.presignedGetObject(this.bucket, key, 86400);
  }

  async getUrls(
    items: { id: number, key: string }[]
  ): Promise<{ id: number, url: string }[]> {
    // TODO: обдумать это как следует
    const promises = items.map(item => 
      this.client.presignedGetObject(this.bucket, item.key, 86400)
        .then(url => ({ id: item.id, url: url}))
    )

    return Promise.all(promises);
  }
}
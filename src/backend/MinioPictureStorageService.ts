import { IPictureStorageService } from "./IPictureStorageService";
import * as Minio from "minio";
import { minioConfig } from "@/src/config/minioConfig";

export class MinioPictureStorageService implements IPictureStorageService {
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

  async getUrlAsync(key: string): Promise<string> {
    return await this.client.presignedGetObject(this.bucket, key, 86400);
  }

  // async getUrl(key: string): string {
  //   return await this.client.presignedGetObject(this.bucket, key, 86400);
  // }
}
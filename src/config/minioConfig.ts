import { z } from "zod";

const MinIOSchema = z.object({
  MINIO_ENDPOINT: z.string()
    .min(1, "Не указан MINIO_ENDPOINT в переменных окружения"),
  MINIO_PORT: z.string()
    .min(1, "Не указан MINIO_ENDPOINT в переменных окружения")
    .transform(Number),
  MINIO_USE_SSL: z.string()
    .min(1, "Не указан MINIO_USE_SSL в переменных окружения")
    .transform(val => val === "true"),
  MINIO_ACCESS_KEY: z.string()
    .min(1, "Не указан MINIO_ACCESS_KEY в переменных окружения"),
  MINIO_SECRET_KEY: z.string()
    .min(1, "Не указан MINIO_SECRET_KEY в переменных окружения")
}).transform(env => ({
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  useSSL: env.MINIO_USE_SSL,
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY
}));

export const minioConfig = MinIOSchema.parse(process.env);
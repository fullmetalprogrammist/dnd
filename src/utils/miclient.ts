import * as Minio from 'minio'

export const miclient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin", // process.env.MINIO_ACCESS_KEY,
  secretKey: "minioadmin"  // process.env.MINIO_SECRET_KEY
})

// Проще некуда - для публичного бакета
export function getPublicUrl(bucket: string, filename: string) {
  return `http://localhost:9000/${bucket}/${filename}`
}

// Или presigned URL если вдруг приватный
export async function getPresignedUrl(bucket: string, filename: string, expires = 60 * 60) {
  return await miclient.presignedGetObject(bucket, filename, expires)
}

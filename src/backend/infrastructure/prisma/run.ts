import { PrismaErrorMapper } from "./PrismaErrorMapper";

// Ловит Prisma-исключения и оборачивает их в доменные исключения
export async function run<T>(
  fn: () => Promise<T>,
  errorMapper: PrismaErrorMapper
): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    errorMapper.map(e);
    throw e;
  }
}

const prismaMapper = new PrismaErrorMapper();

export async function runPrisma<T>(fn: () => Promise<T>) {
  return run(fn, prismaMapper);
}
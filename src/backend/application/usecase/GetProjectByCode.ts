import { PrismaClient } from '@/src/backend/generated/prisma/client';
import { ILineListRepository } from '@/src/backend/application/query/line/ILineListRepository';

export class GetProjectByCode {

  constructor(
    private readonly prisma: PrismaClient,
    private readonly linesRepo: ILineListRepository
  ) { }

}
import { PrismaClient } from '@/src/backend/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });

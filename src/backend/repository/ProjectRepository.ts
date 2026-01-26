import { IProjectRepository } from "@/src/backend/repository/IProjectRepository";
import { Project } from "@/src/backend/generated/prisma/client";
import { prisma } from "@/src/backend/factory/prismaClient";
import { Prisma } from '@/src/backend/generated/prisma/client';
import { DuplicateEntityError } from "@/src/backend/errors/DuplicateEntityError";

export class ProjectRepository implements IProjectRepository {

  async create(code: string, title: string): Promise<Project> {
    try {
      return await prisma.project.create({
        data: {
          code,
          title,
          projectStatus: 'draft',
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {  // Нарушение unique ограничения
          throw new DuplicateEntityError(`Код проекта ${code} уже занят.`);
        }
      }
      throw error;
    } 
  }

  async getByCode(code: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: { code: code }
    })
  }

}
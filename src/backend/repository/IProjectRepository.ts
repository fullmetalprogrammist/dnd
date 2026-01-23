import { Project } from "@/src/backend/generated/prisma/client";

export interface IProjectRepository {
  create(code: string, title: string): Promise<Project>;
}
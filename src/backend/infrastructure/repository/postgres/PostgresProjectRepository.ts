import { IProjectRepository } from "@/src/backend/core/repository/IProjectRepository";

export class PostgresProjectRepository implements IProjectRepository {

  create(projectCode: string): Promise<number> {
    return Promise.resolve(5);
  }
}
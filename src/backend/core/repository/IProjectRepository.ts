export interface IProjectRepository {
  create(projectCode: string): Promise<number>;
}
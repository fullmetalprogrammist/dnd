import { ProjectEditDto } from "./ProjectEditDto";

export interface IGetProjectForEdit {
  execute(projectCode: string):Promise<ProjectEditDto>;
}
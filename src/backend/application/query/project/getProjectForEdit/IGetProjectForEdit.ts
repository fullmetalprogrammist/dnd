import { EditorDto } from "./EditorDto";

export interface IGetProjectForEdit {
  execute(projectCode: string):Promise<EditorDto>;
}
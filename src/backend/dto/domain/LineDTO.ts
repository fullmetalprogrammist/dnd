import { CharacterDTO } from "./CharacterDTO";
import { ProjectDTO } from "./ProjectDTO";

export type LineDTO = {
  project: ProjectDTO;
  text: string;
  charater: CharacterDTO | null;
}
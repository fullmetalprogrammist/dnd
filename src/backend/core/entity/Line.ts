import type { CharacterId } from "./Character";
import type { ProjectId } from "./Project";

export type Line = {
  id: LineId;
  text: string;
  project: ProjectId;
  inProjectOrder: number;
  character: CharacterId | null;
}

export type LineId = number;
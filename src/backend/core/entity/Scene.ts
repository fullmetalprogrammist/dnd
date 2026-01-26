import type { LineId } from "./Line";

export type Scene = {
  id: SceneId;
  picture: string;
  lines: LineId[];
}

export type SceneId = number;
import type { Character } from "@/src/backend/context/viewer-room/entity/Character";

export type Line = {
  id: number;
  text: string;
  character: Character | null;
}
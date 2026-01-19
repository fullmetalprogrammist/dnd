import type { Character } from "@/src/backend/context/viewer-room/entity/Character";

export interface ICharacterRepository {
  getAllCharacters(): Promise<Character[]>;
}
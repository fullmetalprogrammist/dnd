import { CharacterId } from "@/src/backend/core/entity/Character";
import { LineId } from "@/src/backend/core/entity/Line"

export type LineListItemDto = {
  id: LineId;
  text: string;
  character: CharacterId | null;
  inProjectOrder: number;
}
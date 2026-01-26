import { Line } from "@/src/backend/core/entity/Line";
import type { LineId } from "@/src/backend/core/entity/Line";

export interface ILineRepository {
  save(line: Line): Promise<LineId>;
  getById(lineId: LineId): Promise<Line>;
}
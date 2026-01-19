import { Line } from "@/src/backend/context/viewer-room/entity/Line";

export interface ILineRepository {
  getAllLines(): Promise<Line[]>;
}
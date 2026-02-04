import { EditorData } from "../../../features/editor/types/EditorData"
import { EntityTypes } from "../../../features/editor/entity-panel/types/EntityTypes";

export type EditorState = {
  data: EditorData | null;
  activeItem: {
    itemType: EntityTypes,
    fid: string
  } | null;
}
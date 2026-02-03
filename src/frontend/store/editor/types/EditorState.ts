import { EditorData } from "../../../features/editor/EditorData"
import { SourceTypes } from "../../../features/editor/types";

export type EditorState = {
  data: EditorData | null;
  activeItem: {
    itemType: SourceTypes,
    fid: string
  } | null;
}
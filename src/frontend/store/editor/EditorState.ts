import { EditorData } from "../../features/editor/EditorData"
import { SourceTypes } from "../../features/editor/types";

export type EditorState = {
  data: EditorData | null;
  leftMode: SourceTypes,
  rightMode: SourceTypes,
  activeItem: {
    itemType: SourceTypes,
    fid: string
  } | null;
}
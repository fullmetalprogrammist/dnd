import { EditorData} from "@/src/frontend/features/editor/types/EditorData";
import { EntityTypes } from "../../../features/editor/entity-panel/types/EntityTypes";
import { EditorState } from "../types/EditorState";
import { PayloadAction } from "@reduxjs/toolkit";

export function initEditor(
  state: EditorState, 
  action: PayloadAction<EditorData>
) {
  state.data = action.payload;
  state.activeItem = null;
}

export function setActiveItem(
  state: EditorState,
  action: PayloadAction<{ itemType: EntityTypes; fid: string } | null>
) {
  state.activeItem = action.payload;
}
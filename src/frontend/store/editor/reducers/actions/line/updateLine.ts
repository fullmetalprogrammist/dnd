import { EditorState } from "@/src/frontend/store/editor/types/EditorState"
import { PayloadAction } from "@reduxjs/toolkit";

export type UpdateLinePayload = {
  fid: string;
  text: string | null;
  characterFid: string | null;
}

export function updateLine(
  state: EditorState, 
  action: PayloadAction<UpdateLinePayload>
) {
  const line = state.data?.lines.find(l => l.fid === action.payload.fid);

  if (!line)
    return;

  line.text = action.payload.text;
  line.characterFid = action.payload.characterFid;
}
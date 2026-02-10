import { EditorState } from "../../../types/EditorState";
import { PayloadAction } from "@reduxjs/toolkit";

export type DeleteCharacterPayload = {
  fid: string;
}

export function deleteCharacter(
  state: EditorState, 
  action: PayloadAction<DeleteCharacterPayload>
) {
  const index = state.data?.characters.findIndex(
    char => char.fid === action.payload.fid
  );
  if (index !== undefined && index !== -1)
    state.data?.characters.splice(index, 1);
}
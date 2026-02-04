import { EditorState } from "../../types/EditorState";
import { PayloadAction } from "@reduxjs/toolkit";

export type UpdateCharacterPayload = {
  fid: string;
  fullname: string;
  shortname: string;
  portraitUrl: string;
}

export function updateCharacter(
  state: EditorState, 
  action: PayloadAction<UpdateCharacterPayload>
) {
  const char = state.data?.characters.find(
    char => char.fid === action.payload.fid
  );
  if (!char) return;

  char.fullname = action.payload.fullname;
  char.shortname = action.payload.shortname;
}
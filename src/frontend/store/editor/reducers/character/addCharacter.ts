import { insertToPosition } from "../helpers/insertByPosition";
import { EditorState } from "../../types/EditorState";
import { PayloadAction } from "@reduxjs/toolkit";
import { InsertPosition } from "../helpers/InsertPosition";

export function addCharacter(
  state: EditorState, 
  action: PayloadAction<InsertPosition>
) {
  insertToPosition(
    state.data?.characters, 
    {
      bid: null,
      fid: crypto.randomUUID(),
      fullname: null,
      shortname: null,
      portraitUrl: null
    }, 
    action.payload
  );
}
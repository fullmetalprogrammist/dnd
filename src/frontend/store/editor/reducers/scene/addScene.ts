import { EditorState } from "../../types/EditorState";
import { PayloadAction } from "@reduxjs/toolkit";
import { insertToPosition } from "../helpers/insertByPosition";
import { InsertPosition } from "../helpers/InsertPosition";

export function addScene(
  state: EditorState, 
  action: PayloadAction<InsertPosition>
) {
  insertToPosition(
    state.data?.scenes, 
    {
      fid: crypto.randomUUID(),
      bid: null,
      pictureUrl: null
    }, 
    action.payload
  );
}
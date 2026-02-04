import { EditorState } from "@/src/frontend/store/editor/types/EditorState"
import { PayloadAction } from "@reduxjs/toolkit";
import { InsertPosition, insertToPosition } from "../helpers/insertByPosition";
import { createNewLine } from "./helpers/createNewLine";

export function addLine(
  state: EditorState, 
  action: PayloadAction<InsertPosition>
) {
  insertToPosition(
    state.data?.lines, 
    createNewLine(), 
    action.payload
  );
}
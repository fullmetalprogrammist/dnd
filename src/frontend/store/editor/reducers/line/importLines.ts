import { EditorState } from "../../types/EditorState";
import { PayloadAction } from "@reduxjs/toolkit";
import { createNewLine } from "./helpers/createNewLine";

export function importLines(
  state: EditorState,
  action: PayloadAction<string[]>
) {
  if (state.data?.lines) 
    state.data.lines = [...action.payload.map(str => createNewLine(str))];
}
import { createSlice } from "@reduxjs/toolkit";
import { EditorState } from "./types/EditorState";
import * as reducers from "./reducers";

const initialState: EditorState = {
  data: null,
  activeItem: null,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers
});

export const editorActions = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "./EditorState";
import { EditorData } from "../../features/editor/EditorData";
import { SourceTypes } from "../../features/editor/types";

const initialState: EditorState = {
  data: null,
  activeItem: null
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    initEditor(state, action: PayloadAction<EditorData>) {
      state.data = action.payload;
      state.activeItem = null;
    },

    setActiveItem(
      state,
      action: PayloadAction<{ itemType: SourceTypes; fid: string } | null>
    ) {
      state.activeItem = action.payload;
    },

    addCharacter(state) {
      state.data?.characters.push({
        bid: null,
        fid: crypto.randomUUID(),
        fullname: null,
        shortname: null,
        portraitUrl: null
      })
    },
  },
});

export const { 
  initEditor, 
  setActiveItem, 
  addCharacter 
} = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
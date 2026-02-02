import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "./EditorState";
import { EditorData } from "../../features/editor/EditorData";
import { SourceTypes } from "../../features/editor/types";

const initialState: EditorState = {
  data: null,
  leftMode: "lines",
  rightMode: "characters",
  activeItem: null,
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

    addLine(state) {
      state.data?.lines.push({
        fid: crypto.randomUUID(),
        bid: null,
        text: "hello",
        characterFid: null,
        inProjectOrder: 2,
        inSceneOrder: null,
        sceneFid: null
      })
    },

    addScene(state) {
      state.data?.scenes.push({
        fid: crypto.randomUUID(),
        bid: null,
        pictureUrl: null
      })
    },

    setLeftMode(state, action: PayloadAction<SourceTypes>) {
      state.leftMode = action.payload;
    },

    setRightMode(state, action: PayloadAction<SourceTypes>) {
      state.rightMode = action.payload;
    }
  },
});

export const { 
  initEditor, 
  setActiveItem, 
  addCharacter,
  addLine,
  addScene,
  setLeftMode,
  setRightMode,
} = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
import { EditorState } from "@/src/frontend/store/editor/types/EditorState";
import { PayloadAction } from "@reduxjs/toolkit";
import { insertToPosition } from "@/src/frontend/store/editor/reducers/helpers/insertByPosition";
import { InsertPosition } from "@/src/frontend/store/editor/reducers/helpers/insertByPosition";

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
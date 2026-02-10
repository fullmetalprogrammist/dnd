import { insertToPosition } from "../../helpers/insertByPosition";
import { EditorState } from "../../../types/EditorState";
import { PayloadAction } from "@reduxjs/toolkit";
import { InsertPosition } from "@/src/frontend/store/editor/reducers/helpers/insertByPosition";

export function addCharacter(
  state: EditorState, 
  action: PayloadAction<InsertPosition>
) {
  const fid = crypto.randomUUID();
  insertToPosition(
    state.data?.characters, 
    {
      bid: null,
      fid,
      fullname: null,
      shortname: null,
      portraitUrl: null
    }, 
    action.payload
  );
  state.activeItem = {
    itemType: "characters",
    fid
  }
}
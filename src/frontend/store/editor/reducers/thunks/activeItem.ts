import { EntityTypes } from "@/src/frontend/features/editor/entity-panel/types/EntityTypes";
import { RootState, AppDispatch } from "@/src/frontend/store";
import { editorActions } from "@/src/frontend/store/editor";

export function changeActiveItem(
  next: { itemType: EntityTypes; fid: string } | null  // почему тут | null вообще?
) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const prev = state.editor.activeItem;

    if (prev && prev.fid !== next?.fid) {  // Несохраненный элемент не должен удаляться, если вновь выбранный - это он сам
      const { data } = state.editor;
      if (!data) return;

      let entity;

      switch (prev.itemType) {
        case "characters":
          entity = data.characters.find(c => c.fid === prev.fid);
          if (entity && entity.bid == null) {
            dispatch(editorActions.deleteCharacter({ fid: prev.fid }));
          }
          break;

        // case "lines":
        //   entity = data.lines.find(l => l.fid === prev.fid);
        //   if (entity && entity.bid == null) {
        //     dispatch(editorActions.deleteLine({ fid: prev.fid }));
        //   }
        //   break;

        // case "scenes":
        //   entity = data.scenes.find(s => s.fid === prev.fid);
        //   if (entity && entity.bid == null) {
        //     dispatch(editorActions.deleteScene({ fid: prev.fid }));
        //   }
        //   break;
      }
    }

    dispatch(editorActions.setActiveItem(next));
  }
}
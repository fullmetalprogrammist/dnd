import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/frontend/store";
import { editorActions } from "@/src/frontend/store/editor";

export function CharactersList() {
  const characters = useSelector(
    (state: RootState) => state.editor.data?.characters
  );

  const dispatch = useDispatch();
  const selectCharacter = (fid: string) => dispatch(
    editorActions.setActiveItem({ 
      itemType: "characters", 
      fid 
    })
  );

  return characters?.map(character => 
    <div 
      key={character.fid} 
      onClick={() => selectCharacter(character.fid)}
      className="outline p-1"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "application/character-fid",
          character.fid
        );
        console.log(character.fid)
      }}
    >
      {character.fullname ?? "Новый персонаж"}
    </div>
  )
}
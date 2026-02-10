import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store";
import { editorThunks } from "@/src/frontend/store/editor";
import { useAppDispatch } from "@/src/frontend/store";

export function CharactersList() {
  const characters = useSelector(
    (state: RootState) => state.editor.data?.characters
  );

  const dispatch = useAppDispatch();
  const selectCharacter = (fid: string) => dispatch(
    editorThunks.changeActiveItem({ 
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
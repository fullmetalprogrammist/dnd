import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";
import { setActiveItem } from "@/src/frontend/store/editor/slice";

export function CharactersList() {
  const characters = useSelector(
    (state: RootState) => state.editor.data?.characters
  );

  const dispatch = useDispatch();
  const selectCharacter = (fid: string) => dispatch(
    setActiveItem({ 
      itemType: "characters", 
      fid 
    })
  );

  return characters?.map(character => 
    <div 
      key={character.fid} 
      onClick={() => selectCharacter(character.fid)}
      className="outline p-1"
    >
      {character.fid}
    </div>
  )
}
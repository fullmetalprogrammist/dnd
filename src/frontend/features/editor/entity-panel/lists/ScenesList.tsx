import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store";
import { editorThunks } from "@/src/frontend/store/editor";
import { useAppDispatch } from "@/src/frontend/store";

export function ScenesList() {
   const scenes = useSelector(
    (state: RootState) => state.editor.data?.scenes
  );

  const dispatch = useAppDispatch();
  const selectScene = (fid: string) => dispatch(
    editorThunks.changeActiveItem({
      itemType: "scenes",
      fid
    })
  );

  return scenes?.map(scene => 
    <div 
      key={scene.fid} 
      onClick={() => selectScene(scene.fid)}
      className="outline p-1"
    >
      {scene.fid}
    </div>
  )
}
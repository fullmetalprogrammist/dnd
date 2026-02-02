import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";
import { setActiveItem } from "@/src/frontend/store/editor/slice";

export function ScenesList() {
   const scenes = useSelector(
    (state: RootState) => state.editor.data?.scenes
  );

  const dispatch = useDispatch();
  const selectScene = (fid: string) => dispatch(
    setActiveItem({
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
import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";
import { LineOnBench } from "./LineOnBench";
import { CharacterOnBench } from "./CharacterOnBench";
import { SceneOnBench } from "./SceneOnBench";

export function Workbench() {
  const itemOnBench = useSelector(
    (state: RootState) => {
      const item = state.editor.activeItem;
      switch (item?.itemType) {
        case "lines":
          return <LineOnBench />;
        case "characters":
          return <CharacterOnBench />;
        case "scenes":
          return <SceneOnBench />;
      }
    }
  );

  return itemOnBench;
}
import { LinesList } from "./lists/LinesList";
import { CharactersList } from "./lists/CharactersList";
import { ScenesList } from "./lists/ScenesList";
import { SourcePanelProps } from "./SourcePanel";

export function renderContent({ mode, items }: SourcePanelProps) {
  switch (mode) {
    case "lines":
      return <LinesList lines={items} />
    case "characters":
      return <CharactersList characters={items} />;
    case "scenes":
      return <ScenesList scenes={items} />;
  }
}

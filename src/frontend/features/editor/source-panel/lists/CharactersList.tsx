import { EditorDataCharacter } from "@/src/frontend/features/editor/EditorData"

export function CharactersList({ characters }: { characters: EditorDataCharacter[]}) {
  return characters.map(char => 
    <div key={char.fid}>
      {char.shortname ?? "Новый персонаж"}
    </div>
  )
}
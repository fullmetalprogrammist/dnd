import { EditorStateCharacter } from "@/src/backend/application/query/project/getProjectForEdit/EditorState"

export function CharactersList({ characters }: { characters: EditorStateCharacter[]}) {
  return characters.map(char => 
    <div key={char.fid}>
      {char.shortname ?? "Новый персонаж"}
    </div>
  )
}
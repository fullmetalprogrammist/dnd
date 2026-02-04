import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/frontend/store";
import { useState, useEffect } from "react";
import { editorActions } from "@/src/frontend/store/editor";
import { CharacterPortraitDropZone } from "@/src/frontend/common/ui/drop-zone/PortraitDropZone";

export function CharacterOnBench() {
  const dispatch = useDispatch();

  const character = useSelector((state: RootState) => 
    state.editor.data?.characters.find(char => char.fid === state.editor.activeItem?.fid)
  );

  const [fullname, setFullname] = useState(character?.fullname ?? "");
  const [shortname, setShortname] = useState(character?.shortname ?? "");
  const [portraitFile, setPortraitFile] = useState<File | null>(null);

  if (!character)
    return null;

  const apply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editorActions.updateCharacter({
      fid: character.fid,
      fullname,
      shortname,
      portraitUrl: "temp"
    }));
  }

  return (
    <form 
      className="flex flex-col gap-3 p-4 border rounded bg-white"
      onSubmit={apply}
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Полное имя</label>
        <input
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Не указано"
          className="border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Короткое имя</label>
        <input
          value={shortname}
          onChange={(e) => setShortname(e.target.value)}
          placeholder="Не указано"
          className="border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <CharacterPortraitDropZone onSelect={setPortraitFile} />

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1">
          Применить
        </button>
      </div>
    </form>
  )
}
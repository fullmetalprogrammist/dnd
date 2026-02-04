import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editorActions } from "@/src/frontend/store/editor";

// TODO: 
// - Сделать кнопку "Применить" активной, только если изменился текст реплики
// - Разрешить перетаскивать только персонажей
export function LineOnBench() {
  const dispatch = useDispatch();

  const { line, character } = useSelector((state: RootState) => {
    const line = state.editor.data?.lines.find(
      line => line.fid === state.editor.activeItem?.fid
    ) ?? null;
    
    const character = line
      ? state.editor.data?.characters.find(
          char => char.fid === line.characterFid
        ) ?? null
      : null;

    return {
      line,
      character
    }
  });

  if (!line)
    return null;

  const [lineText, setLineText] = useState<string>(line?.text ?? "");

  const apply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editorActions.updateLine({
      fid: line.fid,
      text: lineText,
      characterFid: line.characterFid
    }))
  }

  return (
    <form 
      onSubmit={apply}
      className="flex flex-col gap-3 p-4 bg-white border rounded w-full max-w-xl"
    >
      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">Текст реплики</span>
        <textarea
          rows={5}
          value={lineText}
          onChange={(e) => setLineText(e.target.value)}
          placeholder="Введите текст реплики…"
          className="border rounded px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-blue-400"
        />
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault(); // ОБЯЗАТЕЛЬНО
        }}
        onDrop={(e) => {
          e.preventDefault();

          const characterFid = e.dataTransfer.getData(
            "application/character-fid"
          );

          if (!characterFid) return;

          dispatch(
            editorActions.updateLine({
              fid: line.fid,
              text: line.text,
              characterFid
            })
          );
        }}
        className="w-full h-16 border-1 border rounded flex items-center px-3 text-gray-500"
      >
        {character?.fullname ?? "Перетащите персонажа сюда"}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Применить
        </button>
      </div>
    </form>
  )
}
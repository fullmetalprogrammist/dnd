import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";
import { useState } from "react";
import { useDispatch } from "react-redux";


export function LineOnBench() {
  const dispatch = useDispatch();
  
  const activeLine = useSelector((state: RootState) => {
    return state.editor.data?.lines.find(line => line.fid === state.editor.activeItem?.fid)
  });

  const [lineText, setLineText] = useState<string>(activeLine?.text ?? "");

  const apply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
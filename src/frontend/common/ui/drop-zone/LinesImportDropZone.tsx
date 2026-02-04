import { DropZone } from "./DropZone";
import { useDispatch } from "react-redux";
import { editorActions } from "@/src/frontend/store/editor";

export function LinesImportDropZone() {
  const dispatch = useDispatch();

  const importFromFile = async (file: File) => {
    const text = await file.text();

    dispatch(
      editorActions.importLines(
        text
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean)
      )
    );
  };

  return (
    <div className="
      w-full h-full
      border-2 border-dashed rounded
      flex flex-col items-center justify-center
      text-sm text-gray-500
    ">
      <DropZone
        action={importFromFile}
        accept=".txt"
      >
        <div>
          <div>Перетащите файл с репликами</div>
          <div className="text-xs text-gray-400">
            или кликните, чтобы выбрать
          </div>
        </div>
      </DropZone>
    </div>
  );
}
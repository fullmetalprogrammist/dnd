import { useRef } from "react";
import { useEditor } from "./features/editor/Editor";

export function DropZone() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { importLinesFromText } = useEditor();

  function handleFile(file: File | null | undefined) {
    if (!file) return;
    file.text().then(importLinesFromText);
  }

  return (
    <div
      className="flex flex-col items-center justify-center
                 h-full border-2 border-dashed rounded
                 text-sm text-muted-foreground cursor-pointer p-3"
      onClick={() => inputRef.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <p>
        Щелкните, чтобы выбрать файл или просто перетащите его сюда
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={e => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
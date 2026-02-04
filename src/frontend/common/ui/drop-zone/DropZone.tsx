import { useRef } from "react";

type DropZoneProps = {
  action: (file: File) => void;
  accept?: string;
  children: React.ReactNode;
}

export function DropZone({ action, accept, children }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFile(file: File | null | undefined) {
    if (!file) return;
    action(file);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      {children}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
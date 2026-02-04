import { useEffect, useState } from "react";
import { DropZone } from "@/src/frontend/common/ui/drop-zone/DropZone";

type CharacterPortraitDropZoneProps = {
  onSelect: (file: File) => void;
};

export function CharacterPortraitDropZone({
  onSelect,
}: CharacterPortraitDropZoneProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Нужен файл изображения");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    onSelect(file);
  }

  useEffect(() => {
    if (!previewUrl) 
      return;

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div>
      {previewUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={previewUrl}
            alt="Portrait preview"
            className="w-24 h-24 object-cover rounded border"
          />
          <button
            type="button"
            className="text-sm text-blue-600"
            onClick={() => setPreviewUrl(null)}
          >
            Убрать
          </button>
        </div>
      ) : (
        <div
          className="
            w-full h-40
            border-2 border-dashed rounded
            flex items-center justify-center
            text-sm text-gray-500
            overflow-hidden
          "
        >
          <DropZone
            action={handleFile}
            accept="image/*"
          >
            <div className="text-center">
              <div>Перетащите портрет персонажа</div>
              <div className="text-xs text-gray-400">
                или кликните, чтобы выбрать
              </div>
            </div>
          </DropZone>
      </div>

      )}
    </div>
  );
}

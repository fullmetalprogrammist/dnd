"use client";

import { useEffect } from "react";

// Чтобы нельзя было перетащить файл на страницу в целом и заменить этим файлов интерфейс
// На дроп-зоны не влияет, они будут работать как надо
export function GlobalDragAndDropGuard() {
  useEffect(() => {
    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);

    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

  return null;
}

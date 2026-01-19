import { Screenplay } from "@/src/components/Screenplay";
import { MinioPictureStorageService } from "@/src/backend/MinioPictureStorageService";
import { JsonSceneRepository } from "@/src/backend/context/viewer-room/repository/json/JsonSceneRepository";

export default async function Home() {
  return (
    <div>
      indamovie project - изучаем английский в контексте по репликам из фильмов
    </div>
  );
}

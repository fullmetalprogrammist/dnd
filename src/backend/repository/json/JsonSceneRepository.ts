import type { ISceneRepository } from "../ISceneRepository";
import { Scene } from "@/src/backend/entity/Scene";
import { Line } from "@/src/backend/entity/Line";
import { Character } from "@/src/backend/entity/Character";
import { IStorageService } from "@/src/backend/service/PictureStorageService/IStorageService";
import { CharacterDTO } from "./types/CharacterDTO";
import { LineDTO } from "./types/LineDTO";
import { SceneDTO } from "./types/SceneDTO";
import { z } from "zod";
import { IJsonDataSourceConfig } from "@/src/backend/config/IJsonDataSourceConfig";
import { IDataSourceConfig } from "@/src/backend/config/IDataSourceConfig";
import { 
  StorageObjectRequest, 
  StorageObjectResponse
} from "@/src/backend/service/PictureStorageService/IStorageService";

const CharacterSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  short: z.string(),
  portrait: z.string().nullable()
})

const LineSchema = z.object({
  id: z.number(),
  text: z.string(),
  character: z.string().nullable()
})

const SceneSchema = z.object({
  id: z.number(),
  lines: z.array(z.number()),
  pic: z.string()
})

const ApiResponseSchema = z.object({
  characters: z.array(CharacterSchema),
  scenes: z.array(SceneSchema),
  lines: z.array(LineSchema)
})

type ApiResponse = z.infer<typeof ApiResponseSchema>;


// * сделать поддержку пагинации для универсальности
export class JsonSceneRepository implements ISceneRepository {
  private config: IJsonDataSourceConfig;
  private storage: IStorageService;
  private projectCode: string | null = null;

  constructor(dataSourceConfig: IDataSourceConfig, storageService: IStorageService) {
    // TODO: есть ли практики как проводить такое преобразование безопасно или бросать исключение?
    this.config = dataSourceConfig as IJsonDataSourceConfig;
    this.storage = storageService;
  }

  async getAllScenes(projectCode: string): Promise<Scene[]> {
    this.projectCode = projectCode;
    try {
      const data = await fetch(`${this.config.baseUrl}/${this.projectCode}/${this.config.dataFilePath}`);
      const json = await data.json();
      const parsedData = ApiResponseSchema.safeParse(json);

      if (!parsedData.success) {
        throw new Error("Ошибка парсинга JSON: формат данных не соответствует схеме");
      }

      const { 
        scenes: scenesDTO,
        lines: linesDTO,
        characters: charactersDTO
      }: ApiResponse = parsedData.data;

      const scenesPictures = await this.storage.getUrls(scenesDTO.map(scene => ({ 
          id: scene.id, 
          key: `${this.projectCode}/${this.config.picturesPath.scenes}/${scene.pic}`
        })
      ));
      const charactersPictures = await this.storage.getUrls(charactersDTO
        .map(character => ({
          id: character.id,
          key: `${this.projectCode}/${this.config.picturesPath.characters}/${character.portrait}`
        }))
      );

      const sceneMapper = new SceneDTOtoDomainMapper(
        scenesDTO,
        linesDTO,
        charactersDTO,
        scenesPictures,
        charactersPictures
      );

      return sceneMapper.getScenes();
    } finally {
      this.projectCode = null;
    }
  }
}


class SceneDTOtoDomainMapper {
  constructor(
    private scenesDTO: SceneDTO[],
    private linesDTO: LineDTO[],
    private charactersDTO: CharacterDTO[],
    private scenesPictures: StorageObjectResponse[],
    private charactersPictures: StorageObjectResponse[]
  ) { }

  public getScenes(): Scene[] {
    return this.scenesDTO.map(scene => this.mapSceneDTOtoDomain(scene));
  }

  private mapSceneDTOtoDomain(sceneDTO: SceneDTO): Scene {
    const lines = sceneDTO.lines.map(
      lineId => this.mapLineDTOtoDomain(lineId)
    );
    const pictureUrl = this.scenesPictures.find(sp => sp.id === sceneDTO.id)!.url;  // TODO: что делать, если не нашел?

    return {
      id: sceneDTO.id,
      pictureUrl,
      lines
    }
  }

  private mapLineDTOtoDomain(lineId: number): Line {
    const line = this.linesDTO.find(x => x.id === lineId);
    if (!line) throw new Error(`Реплика с id ${lineId} не найдена.`);

    const character = line.character
      ? this.mapCharacterDTOtoDomain(line.character)
      : null;

    return {
      id: line.id,
      text: line.text,
      character
    }
  }

  private mapCharacterDTOtoDomain(characterCode: string): Character {
    const character = this.charactersDTO.find(c => c.code === characterCode);
    if (!character) throw new Error(`Персонаж с code ${characterCode} не найден.`);

    const portraitUrl = character.portrait
      ? this.charactersPictures.find(cp => cp.id === character.id)!.url  // TODO: что если не нашел?
      : null;

    return {
      id: character.id,
      code: character.code,
      name: character.name,
      short: character.short,
      portrait: portraitUrl
    }
  }
}
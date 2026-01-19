import type { ISceneRepository } from "../ISceneRepository";
import { Scene } from "../../entity/Scene";
import { Line } from "../../entity/Line";
import { Character } from "../../entity/Character";
import { IPictureStorageService } from "@/src/backend/IPictureStorageService";
import { CharacterDTO } from "./types/CharacterDTO";
import { LineDTO } from "./types/LineDTO";
import { SceneDTO } from "./types/SceneDTO";
import { z } from "zod";
import { IJsonDataSourceConfig } from "@/src/config/IJsonDataSourceConfig";

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
  private pictureService: IPictureStorageService;
  private projectCode: string | null = null;

  constructor(dataSourceConfig: IJsonDataSourceConfig, pictureService: IPictureStorageService) {
    this.config = dataSourceConfig;
    this.pictureService = pictureService;
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

      
      const scenes: Scene[] = await Promise.all(
        scenesDTO.map(async scene => await this.mapSceneDTOtoDomain(scene, linesDTO, charactersDTO))
      );

      return scenes;
    } finally {
      this.projectCode = null;
    }
  }

  private async mapSceneDTOtoDomain(
    sceneDTO: SceneDTO, 
    linesDTO: LineDTO[], 
    charactersDTO: CharacterDTO[]
  ): Promise<Scene> {
    const lines = await Promise.all(
      sceneDTO.lines.map(async lineId => await this.mapLineDTOtoDomain(lineId, linesDTO, charactersDTO))
    );
    const pictureUrl = await this.pictureService.getUrlAsync(`${this.projectCode}/${this.config.picturesPath.scenes}/${sceneDTO.pic}`);

    return {
      id: sceneDTO.id,
      pictureUrl,
      lines
    }
  }

  private async mapLineDTOtoDomain(
    lineId: number,
    linesDTO: LineDTO[],
    charactersDTO: CharacterDTO[]
  ): Promise<Line> {
    const line = linesDTO.find(x => x.id === lineId);
    if (!line) throw new Error(`Реплика с id ${lineId} не найдена.`);

    const character = line.character
      ? await this.mapCharacterDTOtoDomain(line.character, charactersDTO)
      : null;

    return {
      id: line.id,
      text: line.text,
      character
    }
  }

  private async mapCharacterDTOtoDomain(
    characterCode: string, 
    charactersDTO: CharacterDTO[]
  ): Promise<Character> {
    const char = charactersDTO.find(x => x.code === characterCode);
    if (!char) throw new Error(`Персонаж с code ${characterCode} не найден.`);

    const portraitUrl = char.portrait
      ? await this.pictureService.getUrlAsync(`${this.projectCode}/${this.config.picturesPath.characters}/${char.portrait}`)
      : null;

    return {
      id: char.id,
      code: char.code,
      name: char.name,
      short: char.short,
      portrait: portraitUrl
    }
  }
}



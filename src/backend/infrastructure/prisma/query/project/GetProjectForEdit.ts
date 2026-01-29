import { IGetProjectForEdit } from "@/src/backend/application/query/project/getProjectForEdit/IGetProjectForEdit";
import { 
  EditorLineDto, 
  EditorDto, 
  EditorCharacterDto, 
  EditorSceneDto 
} from "@/src/backend/application/query/project/getProjectForEdit/EditorDto";
import { PrismaClient } from '@/src/backend/generated/prisma/client';
import { runPrisma } from "@/src/backend/infrastructure/prisma/run";
import { CharacterModel, LineModel, SceneModel } from "@/src/backend/generated/prisma/models";

export class GetProjectForEdit implements IGetProjectForEdit {
  constructor(
    private readonly prisma: PrismaClient,
  ) { }

  async execute(projectCode: string): Promise<EditorDto> {
    return runPrisma(async () => {
      const project = await this.prisma.project.findUniqueOrThrow({
        where: {
          code: projectCode
        }
      });

      const lines = await this.prisma.line.findMany({
        where: {
          projectId: project.id
        }
      });

      const characters = await this.prisma.character.findMany({
        where: {
          projectId: project.id
        }
      });

      const scenes = await this.prisma.scene.findMany({
        where: {
          projectId: project.id
        }
      });

      return {
        project:{
          id: project.id,
          code: project.code,
          title: project.title
        },
        lines: lines.map(line => this.mapLineToDto(line)),
        characters: characters.map(character => this.mapCharacterToDto(character)),
        scenes: scenes.map(scene => this.mapSceneToDto(scene))
      }
    });
  }

  private mapLineToDto(line: LineModel): EditorLineDto {
    return {
      id: line.id,
      text: line.lineText,
      inProjectOrder: line.inProjectOrder,
      characterId: line.characterId,
      sceneId: line.sceneId,
      inSceneOrder: line.inSceneOrder
    }
  }

  private mapCharacterToDto(character: CharacterModel): EditorCharacterDto {
    return {
      id: character.id,
      fullname: character.fullName,
      shortname: character.shortName,
      portraitUrl: "temp"
    }
  }

  private mapSceneToDto(scene: SceneModel): EditorSceneDto {
    return {
      id: scene.id,
      pictureUrl: "temp-url"
    }
  }
}
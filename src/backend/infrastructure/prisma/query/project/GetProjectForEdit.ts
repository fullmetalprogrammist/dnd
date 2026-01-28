import { IGetProjectForEdit } from "@/src/backend/application/query/project/getProjectForEdit/IGetProjectForEdit";
import { 
  ProjectEditLineDto, 
  ProjectEditDto, 
  ProjectEditCharacterDto, 
  ProjectEditSceneDto 
} from "@/src/backend/application/query/project/getProjectForEdit/ProjectEditDto";
import { PrismaClient } from '@/src/backend/generated/prisma/client';
import { runPrisma } from "@/src/backend/infrastructure/prisma/run";
import { CharacterModel, LineModel, SceneModel } from "@/src/backend/generated/prisma/models";

export class GetProjectForEdit implements IGetProjectForEdit {
  constructor(
    private readonly prisma: PrismaClient,
  ) { }

  async execute(projectCode: string): Promise<ProjectEditDto> {
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
        projectInfo:{
          projectId: project.id,
          projectCode: project.code,
          projectTitle: project.title
        },
        lines: lines.map(line => this.mapLineToDto(line)),
        characters: characters.map(character => this.mapCharacterToDto(character)),
        scenes: scenes.map(scene => this.mapSceneToDto(scene))
      }
    });
  }

  private mapLineToDto(line: LineModel): ProjectEditLineDto {
    return {
      id: line.id,
      text: line.lineText,
      inProjectOrder: line.inProjectOrder,
      characterId: line.characterId,
      sceneId: line.sceneId,
      inSceneOrder: line.inSceneOrder
    }
  }

  private mapCharacterToDto(character: CharacterModel): ProjectEditCharacterDto {
    return {
      id: character.id,
      fullname: character.fullName,
      shortname: character.shortName,
      portraitUrl: "temp"
    }
  }

  private mapSceneToDto(scene: SceneModel): ProjectEditSceneDto {
    return {
      id: scene.id,
      pictureUrl: "temp-url"
    }
  }
}
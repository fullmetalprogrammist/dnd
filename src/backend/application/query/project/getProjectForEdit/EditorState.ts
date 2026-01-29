import { EditorDto } from "@/src/backend/application/query/project/getProjectForEdit/EditorDto";

// bid - backend id
// fid - frontend id

export type EditorState = {
  project: EditorStateProject;
  lines: EditorStateLine[];
  characters: EditorStateCharacter[];
  scenes: EditorStateScene[];
}

export type EditorStateProject = {
  bid: number | null;
  fid: string;
  code: string;
  title: string;
}

export type EditorStateLine = {
  bid: number | null;
  fid: string;
  text: string;
  characterFid: string | null;
  inProjectOrder: number;
  sceneFid: string | null;
  inSceneOrder: number | null;
}

export type EditorStateCharacter = {
  bid: number | null;
  fid: string;
  fullname: string;
  shortname: string;
  portraitUrl: string | null;
}

export type EditorStateScene = {
  bid: number | null;
  fid: string;
  pictureUrl: string;
}

export function mapToEditorState(dto: EditorDto): EditorState {
  const charactersMap = new Map<number, string>();

  const characters = dto.characters.map(character => {
    const char = {
      bid: character.id,
      fid: crypto.randomUUID(),
      fullname: character.fullname,
      shortname: character.shortname,
      portraitUrl: character.portraitUrl
    }
    charactersMap.set(char.bid, char.fid);
    return char;
  });

  const scenesMap = new Map<number, string>();

  const scenes = dto.scenes.map(scene => {
    const sc = {
      bid: scene.id,
      fid: crypto.randomUUID(),
      pictureUrl: scene.pictureUrl
    }
    scenesMap.set(sc.bid, sc.fid);
    return sc;
  });

  const project = {
    bid: dto.project.id,
    fid: crypto.randomUUID(),
    code: dto.project.code,
    title: dto.project.title
  };

  const lines = dto.lines.map(line => ({
    bid: line.id,
    fid: crypto.randomUUID(),
    text: line.text,
    characterFid: line.characterId ? charactersMap.get(line.characterId) ?? null : null,
    inProjectOrder: line.inProjectOrder,
    sceneFid: line.sceneId ? scenesMap.get(line.sceneId) ?? null : null,
    inSceneOrder: line.inSceneOrder
  }));

  return {
    project,
    characters,
    scenes,
    lines
  };
}
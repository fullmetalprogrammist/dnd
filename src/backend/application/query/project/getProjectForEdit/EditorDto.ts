export type EditorDto = {
  project: EditorProjectDto;
  lines: EditorLineDto[];
  characters: EditorCharacterDto[];
  scenes: EditorSceneDto[];
}

export type EditorProjectDto = {
  id: number;
  code: string;
  title: string;
}

export type EditorLineDto = {
  id: number;
  text: string;
  characterId: number | null;
  inProjectOrder: number;
  sceneId: number | null;
  inSceneOrder: number | null;
}

export type EditorCharacterDto = {
  id: number;
  fullname: string;
  shortname: string;
  portraitUrl: string | null;
}

export type EditorSceneDto = {
  id: number;
  pictureUrl: string;
}
export type ProjectEditDto = {
  projectId: number;
  projectCode: string;
  projectTitle: string;
  lines: ProjectEditLineDto[];
  characters: ProjectEditCharacterDto[];
  scenes: ProjectEditSceneDto[];
}

export type ProjectEditLineDto = {
  id: number;
  text: string;
  characterId: number | null;
  inProjectOrder: number;
  sceneId: number | null;
  inSceneOrder: number | null;
}

export type ProjectEditCharacterDto = {
  id: number;
  fullname: string;
  shortname: string;
  portraitUrl: string | null;
}

export type ProjectEditSceneDto = {
  id: number;
  pictureUrl: string;
}
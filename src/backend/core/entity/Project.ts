export type Project = {
  id: ProjectId;
  code: string;
  title: string;
  status: string;  // TODO: здесь наверное какой-то enum
}

export type ProjectId = number;
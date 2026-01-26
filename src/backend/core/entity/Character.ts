export type Character = {
  id: CharacterId;
  code: string;
  name: string;
  short: string;
  portrait: string | null;
}

export type CharacterId = number;
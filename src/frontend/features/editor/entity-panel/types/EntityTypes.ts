export const ENTITIES = ["lines", "characters", "scenes"] as const;
export type EntityTypes = typeof ENTITIES[number];
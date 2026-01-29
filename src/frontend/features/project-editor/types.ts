export const SOURCE_TYPES = ["lines", "characters", "scenes"] as const;
export type SourceTypes = typeof SOURCE_TYPES[number];
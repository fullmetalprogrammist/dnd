export type InsertPosition = "start" | "end";

export function insertToPosition<T>(
  array: T[] | undefined,
  item: T,
  position: InsertPosition
) {
  if (!array) return;
  
  position === "end" 
    ? array.push(item) 
    : array.unshift(item);
}

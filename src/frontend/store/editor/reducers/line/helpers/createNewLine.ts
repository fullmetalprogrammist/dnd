export function createNewLine(text?: string) {
  return {
    fid: crypto.randomUUID(),
    bid: null,
    text: text ?? null,
    characterFid: null,
    inProjectOrder: 2,
    inSceneOrder: null,
    sceneFid: null
  }
}
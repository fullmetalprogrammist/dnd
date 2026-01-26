export class NotExistEntityError extends Error {
  constructor(message: string) {
    super(message);
  }
}
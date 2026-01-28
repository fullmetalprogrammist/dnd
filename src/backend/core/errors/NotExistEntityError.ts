import { ApplicationError } from "./ApplicationError";

export class NotExistEntityError extends ApplicationError {
  name = "NotExistEntityError";
  // TODO: получше разобраться, почему это писать не обязательно
  // constructor(message?: string, options?: { cause?: unknown }) {
  //   super(message, options);
  //   this.name = "NotExistEntityError";
  // }
}
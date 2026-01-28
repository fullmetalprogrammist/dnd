import { ApplicationError } from "./ApplicationError";

export class DuplicateEntityError extends ApplicationError {
  name = "DuplicateEntityError";
}
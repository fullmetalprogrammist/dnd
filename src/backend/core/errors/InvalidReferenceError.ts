import { ApplicationError } from "./ApplicationError";

export class InvalidReferenceError extends ApplicationError {
  name = "InvalidReferenceError";
}
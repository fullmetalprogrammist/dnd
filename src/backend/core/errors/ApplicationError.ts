export class ApplicationError extends Error {
  constructor(message?: string, options?: { cause?: unknown }) {
    super(message);
    if (options?.cause) {
      (this as any).cause = options.cause;
    }
  }
}
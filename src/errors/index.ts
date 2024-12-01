export enum ErrorCode {
    BadRequest = "BAD_REQUEST",
    InternalError = "INTERNAL_ERROR",
  }
  
  export class AppError extends Error {
    public readonly code: ErrorCode;
    public readonly details?: object;
  
    constructor(code: ErrorCode, message: string, details?: object) {
      super(message);
      this.code = code;
      this.details = details;
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AppError);
      }
    }
  }
  
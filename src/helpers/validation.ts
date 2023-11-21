// helpers.ts
import { ValidationError } from "class-validator";

// simply checks if the error is an array of ValidationErrors
export function isValidationError(err: any): err is ValidationError[] {
  return Array.isArray(err) && err[0] instanceof ValidationError;
}


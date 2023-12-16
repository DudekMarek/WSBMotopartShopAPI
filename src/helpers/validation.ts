// helpers for validation for simplifier the controllers
import { ValidationError, validateOrReject } from "class-validator";
import { Response } from "express";
import { UniqueConstraintError } from "sequelize";

// simply checks if the error is an array of ValidationErrors
export function isValidationError(err: any): err is ValidationError[] {
  return Array.isArray(err) && err[0] instanceof ValidationError;
}

export class EntityNotFoundError extends Error {
  constructor(entity: string) {
    super(`${entity} not found`);
    this.name = 'EntityNotFoundError';
  }
}

export class RelationNotFoundError extends Error {
  constructor(relation: string) {
    super(`${relation} with provided ID not found`);
    this.name = 'RelationNotFoundError';
  }
}

export async function validateInstance(instance: any) {
  try {
    await validateOrReject(instance);
  } catch (err) {
    throw err;
  }
}

export function handleError(err: any, res: Response) {
  if (err instanceof UniqueConstraintError) {
    const fieldName = Object.keys(err.fields)[0];
    res.status(409).send({ error: `Entity with this ${fieldName} already exists` });
  } else if (isValidationError(err)) {
    res.status(400).send({ error: 'Validation error', details: err });
  } else if (err instanceof EntityNotFoundError) {
    res.status(404).send({ error: `${err.message}` });
  } else if (err instanceof RelationNotFoundError) {
    res.status(404).send({ error: `${err.message}` });
  } else {
    console.error('Error:', err);
    res.status(500).send({ error: 'Internal server error' });
  }
}
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsIn,
} from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import {
  ALLOWED_DOCUMENT_TYPES,
  T_ALLOWED_DOCUMENT_TYPES,
} from "../models/documentModel";

class CreateDocument {
  @IsNotEmpty()
  @IsIn(ALLOWED_DOCUMENT_TYPES)
  documentType: T_ALLOWED_DOCUMENT_TYPES;

  @Transform((params: TransformFnParams) => new Date(params.value))
  @IsDate()
  documentDate: Date;

  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsNotEmpty()
  @IsInt()
  serviceOrderId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}

class UpdateDocument extends CreateDocument {}

export { CreateDocument, UpdateDocument };

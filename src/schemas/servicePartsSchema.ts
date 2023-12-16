import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsIn,
} from "class-validator";

class CreateServiceParts {
  @IsNotEmpty()
  @IsInt()
  serviceOrderId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  subtotal: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}

class UpdateServiceParts extends CreateServiceParts {}

export { CreateServiceParts, UpdateServiceParts };

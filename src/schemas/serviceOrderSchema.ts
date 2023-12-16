import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsIn,
  IsString,
} from "class-validator";
import {
  T_ALLOWED_SERVICE_ORDER_STATUSES,
  ALLOWED_SERVICE_ORDER_STATUSES,
} from "../models/serviceOrderModel";
import { Transform, TransformFnParams } from "class-transformer";

class CreateServiceOrder {
  @IsDate()
  @IsNotEmpty()
  serviceDate: Date;

  @IsNotEmpty()
  @IsIn(ALLOWED_SERVICE_ORDER_STATUSES)
  serviceStatus: T_ALLOWED_SERVICE_ORDER_STATUSES;

  @IsNotEmpty()
  @IsNumber()
  serviceCost: number;

  @IsNotEmpty()
  @IsNumber()
  servicePartsCost: number;

  @IsNotEmpty()
  @IsNumber()
  serviceTotalCost: number;

  @IsNotEmpty()
  @IsString()
  serviceDescription: string;
}

class UpdateServiceOrder extends CreateServiceOrder {}

export { CreateServiceOrder, UpdateServiceOrder };

import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
} from "class-validator";

class CreateOrderItems {
  @IsNotEmpty()
  @IsInt()
  orderId: number;
}

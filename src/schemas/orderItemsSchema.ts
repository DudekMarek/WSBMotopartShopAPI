import { IsNotEmpty, IsInt, IsNumber } from "class-validator";

class CreateOrderItems {
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  subtotal: number;
}

class UpdateOrderItems extends CreateOrderItems {}

export { CreateOrderItems, UpdateOrderItems };

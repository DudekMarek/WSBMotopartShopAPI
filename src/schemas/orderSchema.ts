// orderSchema.ts
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsDate, IsIn, registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';
import { ALLOWED_ORDER_STATUSES, T_ALLOWED_ORDER_STATUSES } from "../models/orderModel";
import { Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer';

class CreateOrder {
    @IsOptional()
    @Transform((params: TransformFnParams) => new Date(params.value))
    @IsDate()
    orderDate: Date;

    @IsOptional()
    @IsIn(ALLOWED_ORDER_STATUSES)
    status: T_ALLOWED_ORDER_STATUSES;

    @IsNotEmpty()
    @IsInt()
    customerId: number;

    @IsNotEmpty()
    @IsNumber()
    totalCost: number;

}

class UpdateOrder extends CreateOrder {
  // You can add additional properties specific to updating an order if needed
}
export { CreateOrder, UpdateOrder };
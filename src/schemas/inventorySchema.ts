import { IsNotEmpty, IsInt } from 'class-validator'

export default class CreateInventory {
    @IsNotEmpty()
    @IsInt()
    productId: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;

}

class UpdateInventory extends CreateInventory {
    // You can add additional properties specific to updating an inventory if needed
}

export { CreateInventory, UpdateInventory };
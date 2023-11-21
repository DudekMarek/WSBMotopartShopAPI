import { IsNotEmpty, IsString, IsInt, IsNumber, IsOptional } from 'class-validator';

export default class CreateProduct {
    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsString()
    productModel: string;

    @IsOptional()
    @IsString()
    productDescription: string;

    @IsNotEmpty()
    @IsInt()
    categoryId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

}

class UpdateProduct extends CreateProduct {
    // You can add additional properties specific to updating a product if needed
}

export { CreateProduct, UpdateProduct };
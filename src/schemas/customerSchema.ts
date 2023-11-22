import {IsNotEmpty, IsString} from 'class-validator'

export default class CreateCustomer {
    @IsNotEmpty({message: 'First name is required'})
    @IsString()
    firstName: string;

    @IsNotEmpty({message: 'Last name is required'})
    @IsString()
    lastName: string;

    @IsNotEmpty({message: 'Address is required'})
    @IsString()
    address: string;
}

class UpdateCustomer extends CreateCustomer {
    // You can add additional properties specific to updating a customer if needed
}
export  { CreateCustomer, UpdateCustomer };
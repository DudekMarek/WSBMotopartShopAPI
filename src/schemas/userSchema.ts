import { IsNotEmpty, IsString, MinLength, IsIn } from "class-validator";
import { ALLOWED_USER_TYPES, T_ALLOWED_USER_TYPES } from "../models/userModel";

export default class CreateUser {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: "Username needs to contain at least 3 characters" })
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsIn(ALLOWED_USER_TYPES,{
        message: `userType must be one of ${ALLOWED_USER_TYPES}`
    })
    userType: T_ALLOWED_USER_TYPES;
}

class UpdateUser extends CreateUser {
    // You can add additional properties specific to updating a user if needed
}

export { CreateUser, UpdateUser };
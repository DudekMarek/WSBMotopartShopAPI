import { IsNotEmpty,IsString, MinLength, IsIn} from "class-validator";

const ALLOWED_USER_TYPES = [
    "sealsperson",
    "warehouseman",
    "serviceTechnican",
    "customer",
  ];

export class CreateUser{
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {
        message: "Username needs to contain at least 3 characters"
    })
    username;

    @IsNotEmpty()
    @IsString()
    password;

    @IsString()
    @IsIn(ALLOWED_USER_TYPES,{
        message: `userType must be one of ${ALLOWED_USER_TYPES}`
    })
    userType;
}

export default CreateUser
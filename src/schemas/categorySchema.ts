import { IsNotEmpty, IsString } from "class-validator";

export default class CreateCategory {
  @IsNotEmpty({ message: "Category name is required" })
  @IsString()
  categoryName: string;
}

class UpdateCategory extends CreateCategory {
  // You can add additional properties specific to updating a category if needed
}

export { CreateCategory, UpdateCategory };
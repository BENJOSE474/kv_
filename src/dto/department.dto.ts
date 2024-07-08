import { IsNotEmpty, IsString } from "class-validator";

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateDepartmentDto {
  @IsString()
  name: string;
}

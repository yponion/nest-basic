import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(10)
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;

  @MinLength(2)
  @MaxLength(10)
  @IsNotEmpty()
  name: string;

  // @IsIn(["Female", "Male"])
  // gender: string;

  // @IsEmail()
  // email: string;

  // @IsPhoneNumber("KR")
  // phoneNumber: string;
}

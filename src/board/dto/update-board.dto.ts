import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { CreateBoardDto } from "./create-board.dto";
import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from "@nestjs/swagger";

// export class UpdateBoardDto {
//   @MinLength(2)
//   @MaxLength(20)
//   @IsOptional()
//   title?: string;

//   @IsOptional()
//   content?: string;
// }

export class UpdateBoardDto extends PartialType(CreateBoardDto) { }
// export class UpdateBoardDto extends PickType(CreateBoardDto, ["title"]) { }
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ["title"]) {
//   @IsNotEmpty()
//   @MinLength(2)
//   @MaxLength(20)
//   title: string;
// }
// export class UpdateBoardDto extends IntersectionType(
//   CreateBoardDto,
//   CreateBoardDto,
// ) { }

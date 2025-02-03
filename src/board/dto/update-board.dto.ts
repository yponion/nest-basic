import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { CreateBoardDto } from "./create-board.dto";
import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from "@nestjs/swagger";

export class UpdateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    description: "제목",
    required: true,
    example: "요새 누가 Nest.js씀?",
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "내용",
    required: true,
    example:
      "클릭해 주셔서 감사합니다. 다름이 아니라 Nest.js에서 궁금한 점이 생겨 질문을 하나 하려고 합니다...",
  })
  content: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) { }
// export class UpdateBoardDto extends PickType(CreateBoardDto, ["title"]) { }
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ["userId"]) {
//   @IsNotEmpty()
//   @MinLength(2)
//   @MaxLength(20)
//   title: string;
// }
// export class UpdateBoardDto extends IntersectionType(
//   CreateBoardDto,
//   CreateBoardDto,
// ) { }

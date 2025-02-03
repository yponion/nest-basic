import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateBoardDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "작성자 아이디",
    required: true,
    example: "1",
  })
  userId: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
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

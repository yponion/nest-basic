import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { BoardService } from "./board.service";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(":id")
  find(@Param("id") id: string) {
    console.log(typeof id);
    return this.boardService.find(Number(id));
  }

  @Post()
  create(@Body() data) {
    return this.boardService.create(data);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() data) {
    return this.boardService.update(Number(id), data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.boardService.delete(Number(id));
  }
}

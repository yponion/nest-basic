import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { Board } from "src/entity/board.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) { }

  async findAll() {
    return this.boardRepository.find();
  }

  async find(id: number) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!board) throw new HttpException("NotFound", HttpStatus.NOT_FOUND);
    return board;
  }

  async create(data: CreateBoardDto) {
    return this.boardRepository.save(data);
  }

  async update(id: number, data: UpdateBoardDto) {
    const board = await this.getBoardById(id);
    if (!board) throw new HttpException("NotFound", HttpStatus.NOT_FOUND);
    return this.boardRepository.update(id, { ...data });
  }

  async delete(id: number) {
    const board = await this.getBoardById(id);
    if (!board) throw new HttpException("NotFound", HttpStatus.NOT_FOUND);
    return this.boardRepository.remove(board);
  }

  async getBoardById(id: number) {
    return this.boardRepository.findOneBy({ id });
  }
}

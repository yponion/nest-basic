import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async getUsers() {
    // return this.userRepository.find({
    //   relations: { boards: true },
    //   select: {
    //     boards: {
    //       id: true,
    //     },
    //   },
    // });
    const qb = this.userRepository.createQueryBuilder();
    qb.addSelect((subQuery) => {
      return subQuery
        .select("count(id)")
        .from(Board, "board")
        .where("board.userId = User.id");
    }, "User_boardCount");
    return qb.getMany();
  }
}

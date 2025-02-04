import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { hash, compare } from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async createUser(data: CreateUserDto) {
    const { name, username, password } = data;
    const encryptedPassword = await this.encryptPassword(password);
    return this.userRepository.save({
      name,
      username,
      password: encryptedPassword,
    });
  }

  async login(data: LoginUserDto) {
    const { username, password } = data;
    const user = await this.userRepository.findOneBy({
      username,
    });
    if (!user) throw new HttpException("NotFound", HttpStatus.NOT_FOUND);
    const match = await compare(password, user.password);
    if (!match)
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    return user;
  }

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

  async encryptPassword(password: string): Promise<string> {
    const DEFAULT_SALT = 10;
    return await hash(password, DEFAULT_SALT);
  }
}

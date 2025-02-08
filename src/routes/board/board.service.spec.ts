import { Test, TestingModule } from "@nestjs/testing";
import { BoardService } from "./board.service";
import { Repository } from "typeorm";
import { Board } from "src/entity/board.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("BoardService", () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;
  const boardResponsitoryToken = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: boardResponsitoryToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(boardResponsitoryToken);
  });

  it("boardService should be defined", () => {
    expect(boardService).toBeDefined();
  });

  it("boardRepository should be defined", () => {
    expect(boardRepository).toBeDefined();
  });

  describe("게시글 조회", () => {
    it("1번 게시글의 작성자는 user02 다", async () => {
      jest.spyOn(boardRepository, "findOneBy").mockResolvedValue({
        id: 1,
        userId: 2,
        title: "제목",
        content: "내용",
        user: {
          id: 2,
          username: "user02ID",
          name: "user02",
        },
      } as Board);
      const board = await boardService.getBoardById(2);
      console.log(board);
      expect(board?.user.name).toBe("user02");
    });
  });
});

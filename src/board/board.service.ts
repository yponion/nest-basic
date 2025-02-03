import { Injectable } from "@nestjs/common";

@Injectable()
export class BoardService {
  private boards = [
    {
      id: "1",
      title: "hello world",
      content: "Content 1",
    },
    {
      id: "2",
      title: "hello world 2",
      content: "Content 2",
    },
    {
      id: "3",
      title: "hello world 3",
      content: "Content 3",
    },
  ];

  findAll() {
    return this.boards;
  }

  find(id: string) {
    const index = this.boards.findIndex((board) => board.id === id);
    return this.boards[index];
  }
}

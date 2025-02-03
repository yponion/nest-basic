import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity() // 테이블 명도 재설정 가능
export class Board {
  @PrimaryGeneratedColumn({ name: "id" }) // 이렇게 컬럼 명 재설정 가능
  id: number;

  @ApiProperty({ description: "user_id" })
  @Column()
  userId: number;

  @ApiProperty({ description: "제목" })
  @Column()
  title: string;

  @ApiProperty({ description: "내용" })
  @Column()
  content: string;

  @ApiProperty({ description: "수정일" })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: "생성일" })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: "유저정보" })
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" }) // 실제 테이블에 컬럼명이 다르면 이렇게 해줘야함
  user: User;
}

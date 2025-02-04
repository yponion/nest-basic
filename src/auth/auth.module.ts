import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { UserModule } from "src/routes/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LovalStrategy } from "./auth.strategy";

@Module({
  imports: [UserModule, PassportModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, LovalStrategy],
  exports: [AuthService],
})
export class AuthModule { }

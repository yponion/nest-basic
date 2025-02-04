import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { UserModule } from "src/routes/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LovalStrategy } from "./auth.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "secret_key",
      signOptions: {
        expiresIn: "1h",
      },
    }),
  ],
  providers: [AuthService, LovalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }

import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService,JwtStrategy],
  })
  export class UserModule {}
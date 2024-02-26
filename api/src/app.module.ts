import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";

import { UsersController } from "./controllers/users/users.controller";
import { UserService } from "./services/domain/user/user.service";
import { LoggerMiddleware } from "#controllers/middleware/requestLogger";
import { BlocksController } from "#controllers/blocks/blocks.controller";
import { BlockService } from "domain/block/block.service";

@Module({
  controllers: [UsersController, BlocksController],
  imports: [],
  providers: [UserService, BlockService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}

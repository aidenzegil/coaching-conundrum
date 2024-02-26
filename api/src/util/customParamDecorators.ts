import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const OriginatingUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const originatingUser = req.firebaseUser;
    return originatingUser;
  },
);

import type {
  ArgumentsHost,
  ExceptionFilter } from "@nestjs/common";
import {
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import type { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { isProduction } from "src/util/environment";
import { AnsiForeground, deepLog } from "src/util/logging/deepLog";

@Catch()
export class PrismaExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = exception as PrismaClientKnownRequestError;

    if (error.name !== "PrismaClientKnownRequestError") return;

    deepLog(error, AnsiForeground.YELLOW);

    const json = JSON.stringify(exception, null, 2);

    const prismaErr = (() => {
      switch (error.code) {
        case "P2002":
          return {
            code: 400,
            message: "Unique constraint failed on the database.",
          };
        default:
          return { message: "Unknown prisma error occurred." };
      }
    })();

    const statusCode = prismaErr.code || httpStatus;
    const responseBody = {
      error: isProduction()
        ? { message: "Internal Server Error" }
        : JSON.parse(json),
      message: prismaErr.message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}

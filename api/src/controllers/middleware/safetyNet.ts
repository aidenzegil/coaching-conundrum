import type {
  ArgumentsHost,
  ExceptionFilter } from "@nestjs/common";
import {
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { isProduction } from "src/util/environment";
import { AnsiForeground, deepLog } from "src/util/logging/deepLog";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
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

    const json = JSON.stringify(exception, null, 2);
    deepLog(exception, AnsiForeground.BRIGHT_RED);
    console.error(json);
    const responseBody = {
      error: isProduction() ? { message: "Internal Server Error" } : json,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

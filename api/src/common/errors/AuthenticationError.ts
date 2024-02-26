import type { ParamsOrError } from "./ApplicationError";
import { ApplicationError } from "./ApplicationError";

export class AuthenticationError extends ApplicationError {
  constructor(data: ParamsOrError, error?: Error | null) {
    // eslint-disable-next-line no-param-reassign
    data.message = data.message || "Authentication Error";

    super(data, error);
    this.name = "AuthenticationError";
    this.code = 401;
    this.public = true;
  }
}

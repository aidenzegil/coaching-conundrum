import type { ParamsOrError } from "./ApplicationError";
import { ApplicationError } from "./ApplicationError";

export class NotFoundError extends ApplicationError {
  constructor(data: ParamsOrError, error?: Error | null) {
    // eslint-disable-next-line no-param-reassign
    data.message = data.message || "Entity not found error";

    super(data, error);
    this.name = "NotFoundError";
    this.code = 404;
    this.public = true;
  }
}

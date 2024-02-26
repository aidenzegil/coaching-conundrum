import type { ParamsOrError } from "./ApplicationError";
import { ApplicationError } from "./ApplicationError";

export class InvalidContentError extends ApplicationError {
  constructor(data: ParamsOrError, error?: Error | null) {
    // eslint-disable-next-line no-param-reassign
    data.message = data.message || "Unprocessable Content Error";

    super(data, error);
    this.name = data.name || "Unprocessable Content Error";
    this.code = 422;
    this.public = true;
  }
}

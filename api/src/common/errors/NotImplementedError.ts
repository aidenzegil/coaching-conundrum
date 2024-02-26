import type { ParamsOrError } from "./ApplicationError";
import { ApplicationError } from "./ApplicationError";
/**
 * This error is for unimplemented functions for services that are
 * under construction or don't support an interface method
 */
export class NotImplementedError extends ApplicationError {
  constructor(
    data: ParamsOrError = { message: "This method is not implemented" },
    error?: Error | null,
  ) {
    data.message = data.message || "This method is not implemented";

    super(data, error);
    this.name = data.name || "Not Implemented Error";
    this.code = 501;
    this.public = true;
  }
}

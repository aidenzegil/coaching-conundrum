import type { ParamsOrError } from "./ApplicationError";
import { ApplicationError } from "./ApplicationError";
/**
 * This error is for unimplemented functions for services that are
 * under construction or don't support an interface method
 */
export class StubError extends ApplicationError {
  constructor(
    data: ParamsOrError = { message: "This function is under construction" },
    error?: Error | null,
  ) {
    data.message = data.message || "This function is under construction";

    super(data, error);
    this.name = data.name || "Stub Error";
    this.code = 418;
    this.public = true;
  }
}

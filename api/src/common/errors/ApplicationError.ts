export type ParamsOrError = Error | { message: string; name?: string };

export class ApplicationError extends Error {
  code: number;
  originalError?: Error;
  public: boolean;

  /**
   * You can either pass in an object containing a message, or an Error to
   * `paramsOrError`. If you pass an object into `paramsOrError` you can
   * optionally provide the second `error` parameter. The reason this constructor
   * accepts an `Error` is so that we can maintain a copy of an "originalError".
   * This error might contain valuable context about why an error was thrown,
   * for example in the case of an error thrown by RestDataSource, it will contain
   * the response sent back from the network request.
   *
   *
   * **Note: You should try to always provide the original error if you are mapping an
   * error to an ApplicationError.**
   *
   * Examples:
   *
   * ```
   * try {
   *   something()
   * } catch (e) {
   *   throw new ApplicationError(e)
   * }
   *
   * // Or with a custom message
   * throw new ApplicationError({message: "User not found"}, e)
   *
   * // All our other custom errors also support this same API
   * throw new NotFoundError({message: "User not found"}, e)
   * ```
   */
  constructor(paramsOrError: ParamsOrError, error?: Error | null) {
    super(paramsOrError.message || "Application Error");

    this.name = "ApplicationError";
    this.code = 500;
    this.public = false;

    if (error) {
      this.originalError = error;
    } else if (paramsOrError instanceof Error) {
      this.originalError = paramsOrError;
    }
  }
}

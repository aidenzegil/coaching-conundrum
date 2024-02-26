import WebError, { ErrorParams } from "./WebError";

class ApiError extends WebError {
  constructor(code: number, params: ErrorParams) {
    super(params);
    this.code = code as Number;
    this.devMessage = params.devMessage || "Missing devMessage";
    this.originalError = params.originalError || null;
    this.userMessage = params.userMessage || "Authentication Error";
  }
}

export default ApiError;

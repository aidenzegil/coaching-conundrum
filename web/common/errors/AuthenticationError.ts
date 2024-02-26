import WebError, { ErrorParams } from "./WebError";

class AuthenticationError extends WebError {
  constructor(params: ErrorParams) {
    super(params);
    this.code = 401;
    this.devMessage = params.devMessage || "Missing devMessage";
    this.originalError = params.originalError || null;
    this.userMessage = params.userMessage || "Authentication Error";
  }
}

export default AuthenticationError;

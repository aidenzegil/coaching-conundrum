export type ErrorParams = {
  devMessage: string;
  userMessage?: string;
  originalError?: Error;
};

class WebError extends Error {
  code: Number;
  devMessage: string;
  originalError: Error | null;
  userMessage: string;

  constructor(params: ErrorParams) {
    super(params.devMessage || "Unexpected Error");
    this.code = 500;
    this.devMessage = params.devMessage || "Missing devMessage";
    this.originalError = params.originalError || null;
    this.userMessage = params.userMessage || "Unexpected Error";
  }
}

export default WebError;

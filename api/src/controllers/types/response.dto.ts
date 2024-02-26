export type SuccessResponse<T> = {
  data: T;
};

export type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type ApiResponse<T> = Promise<ErrorResponse | SuccessResponse<T>>;

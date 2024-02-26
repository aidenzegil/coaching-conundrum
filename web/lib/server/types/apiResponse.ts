import WebError from "../../../common/errors/WebError";
import { Result } from "../../../common/types/result";

export type ApiResponse<T> = Promise<Result<T, WebError>>;

export type Data<T> = { data: T };

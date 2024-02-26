import WebError from "@/app/common/errors/WebError";
import { Result } from "@/app/common/types/result";

export type ApiResponse<T> = Promise<Result<T, WebError>>;

export type Data<T> = { data: T };

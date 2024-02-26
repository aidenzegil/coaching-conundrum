import WebError from "../../common/errors/WebError";
import { deepLog } from "./deepLog";
import { environment } from "./environment";

export const throwExpectedError = (e: WebError): void => {
  if (!environment.isProduction()) {
    deepLog(e);
  }
  Error(e.userMessage);
};

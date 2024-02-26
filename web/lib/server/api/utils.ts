import type { AxiosError } from "axios";
import ApiError from "../../../common/errors/ApiError";

interface ApiUtils {
  transformAxiosError: (e: AxiosError) => ApiError;
}

/**
 * Utility functions for API operations.
 */
export const apiUtils: ApiUtils = {
  transformAxiosError: (e) => {
    const codeStr = e.code || "500";
    const data = e.response?.data;
    const errMessage = data ? JSON.stringify(data, null, 2) : e.message;
    return new ApiError(parseInt(codeStr), {
      devMessage: errMessage,
      originalError: e,
    });
  },
};

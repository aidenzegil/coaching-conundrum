/* eslint-disable @typescript-eslint/naming-convention */

import type { AxiosError } from "axios";
import axios from "axios";
import { adminLog } from "../../util/deepLog";
import { Data } from "../types/apiResponse";
import { apiUtils } from "./utils";
import WebError from "../../../common/errors/WebError";
import { Result, Err, Ok } from "../../../common/types/result";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

type GetParams = {
  path: string;
  queryParams?: Record<string, string>;
};
export const GET = async <T>({
  path,
  queryParams = {},
}: GetParams): Promise<Result<T, WebError>> => {
  const queryString = Object.entries(queryParams).reduce((acc, [key, val]) => {
    const prefix = acc ? "&" : "?";
    return `${acc}${prefix}${key}=${val}`;
  }, "");

  const result: Result<T, WebError> = await axiosInstance
    .get<{ data: T }>(`${path}${queryString}`)
    .then(
      (val) => {
        const res = val.data;
        return Ok(res.data);
      },
      (e: AxiosError) => {
        adminLog({ axiosError: e });
        const apiErr = apiUtils.transformAxiosError(e);
        return Err(apiErr);
      }
    );

  return result;
};

type PostParams = {
  body?: Record<string, unknown>;
  path: string;
  queryParams?: Record<string, string>;
};
export const POST = async <T>({
  body,
  path,
  queryParams = {},
}: PostParams): Promise<Result<T, WebError>> => {
  const queryString = Object.entries(queryParams).reduce((acc, [key, val]) => {
    const prefix = acc ? "&" : "?";
    return `${acc}${prefix}${key}=${val}`;
  }, "");

  const result: Result<T, WebError> = await axiosInstance
    .post<Data<T>>(`${path}${queryString}`, body)
    .then(
      (val) => Ok(val.data.data),
      (e: AxiosError) => {
        adminLog({ axiosError: e });
        const apiErr = apiUtils.transformAxiosError(e);
        return Err(apiErr);
      }
    );

  return result;
};

type PutParams = {
  body?: Record<string, unknown>;
  path: string;
  queryParams?: Record<string, string>;
};
export const PUT = async <T>({
  body,
  path,
  queryParams = {},
}: PutParams): Promise<Result<T, WebError>> => {
  const queryString = Object.entries(queryParams).reduce((acc, [key, val]) => {
    const prefix = acc ? "&" : "?";
    return `${acc}${prefix}${key}=${val}`;
  }, "");

  const result: Result<T, WebError> = await axiosInstance
    .put<T>(`${path}${queryString}`, body)
    .then(
      (val) => Ok(val.data),
      (e: AxiosError) => {
        adminLog({ axiosError: e });
        const apiErr = apiUtils.transformAxiosError(e);
        return Err(apiErr);
      }
    );

  return result;
};

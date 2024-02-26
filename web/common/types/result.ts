/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */

/** Represents a failed computation.*/
export interface ErrType<T, E> {
  type: "error";
  error: E;
  /*** Returns the value of the Result if it is successful, otherwise throws an error.*/
  unwrap: () => T;
  /*** Returns the value of the Result if it is successful, otherwise returns the provided default value.*/
  unwrapOr: (defaultValue: T) => T;
  /*** Returns the value of the Result if it is successful, otherwise calls the provided function with the error and returns its result.*/
  unwrapOrElse: (fn: (error: E) => T) => T;
  /*** Returns true if the Result is an error, false otherwise.*/
  isErr: (this: Result<T, E>) => this is ErrType<T, E>;
  /*** Returns true if the Result is successful, false otherwise.*/
  isOk: (this: Result<T, E>) => this is OkType<T, E>;
}

/** Represents a successful computation.*/
export interface OkType<T, E> {
  type: "ok";
  value: T;
  /*** Returns the value of the Result.*/
  unwrap: () => T;
  /*** Returns the value of the Result.*/
  unwrapOr: (defaultValue: T) => T;
  /*** Returns the value of the Result.*/
  unwrapOrElse: (fn: (error: E) => T) => T;
  /*** Returns true if the Result is an error, false otherwise.*/
  isErr: (this: Result<T, E>) => this is ErrType<T, E>;
  /*** Returns true if the Result is successful, false otherwise.*/
  isOk: (this: Result<T, E>) => this is OkType<T, E>;
}

export type Result<T, E> = ErrType<T, E> | OkType<T, E>;

/** Creates a successful Result with the given value.
 * @param value The value of the successful computation.
 * @returns A Result with the 'ok' type and the provided value.*/
export function Ok<T, E>(value: T): Result<T, E> {
  return {
    isErr: () => false,
    isOk: () => true,
    type: "ok",
    unwrap: () => value,
    unwrapOr: () => value,
    unwrapOrElse: () => value,
    value: value,
  };
}

/**
 * Creates a failed Result with the given error.
 * @param error The error that caused the computation to fail.
 * @returns A Result with the 'error' type and the provided error.
 */
export function Err<T, E>(error: E): Result<T, E> {
  return {
    error,
    isErr: () => true,
    isOk: () => false,
    type: "error",
    unwrap: (): T => {
      throw error;
    },
    unwrapOr: (defaultValue: T) => defaultValue,
    unwrapOrElse: (fn: (error: E) => T) => fn(error),
  };
}

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */

/**
 * These types are based on the error handling in Rust Lang
 */

export interface SomeType<T> {
  type: "some";
  value: T;
  /*** Returns the value of the Option if it exists, otherwise throws an error.*/
  unwrap: () => T;
  /*** Returns the value of the Option if it exists, otherwise returns the provided default value.*/
  unwrapOr: (defaultValue: T) => T;
  /*** Returns the value of the Option if it exists, otherwise calls the provided function and returns its result.*/
  unwrapOrElse: (fn: () => T) => T;
  /*** Returns true if the Option contains a value, false otherwise.*/
  isSome: (this: Option<T>) => this is SomeType<T>;
  /*** Returns true if the Option does not contain a value, false otherwise.*/
  isNone: (this: Option<T>) => this is NoneType;
}

export interface NoneType {
  type: "none";
  /*** Throws an error because None does not contain a value.*/
  unwrap: () => never;
  /*** Returns the provided default value because None does not contain a value.*/
  unwrapOr: <T>(defaultValue: T) => T;
  /*** Calls the provided function and returns its result because None does not contain a value.*/
  unwrapOrElse: <T>(fn: () => T) => T;
  /*** Returns true if the Option contains a value, false otherwise.*/
  isSome: <T>(this: Option<T>) => this is SomeType<T>;
  /*** Returns true if the Option does not contain a value, false otherwise.*/
  isNone: <T>(this: Option<T>) => this is NoneType;
}

export type Option<T> = NoneType | SomeType<T>;

/**
 * Creates an Option with a value.
 * @param value The value to be wrapped in the Option.
 * @returns An Option with the 'some' type and the provided value.
 */
export function Some<T>(value: T): Option<T> {
  return {
    isNone: () => false,
    isSome: () => true,
    type: "some",
    unwrap: () => value,
    unwrapOr: () => value,
    unwrapOrElse: () => value,
    value,
  };
}
/**
 * Represents an empty Option with no value.
 * @returns An Option with the 'none' type.
 */
export const None: Option<never> = {
  isNone: () => true,
  isSome: () => false,
  type: "none",
  unwrap: () => {
    throw new Error("Cannot unwrap None");
  },
  unwrapOr: <T>(defaultValue: T) => defaultValue,
  unwrapOrElse: <T>(fn: () => T) => fn(),
};
//Freezing the None object to prevent any changes.
Object.freeze(None);


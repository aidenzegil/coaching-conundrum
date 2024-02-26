import { isNil } from "lodash";

import { BadRequestError } from "#common/errors/BadRequestError";

/**
 * @param valueName The name of the value that will appear in the thrown error
 * @param value The value to be asserted
 */
export const assertValue = <AssertedType>(
  valueName: string,
  value?: AssertedType | null,
): AssertedType => {
  // MT, Updated to only throw if value is nullish, 0 is falsey and should not throw
  if (isNil(value)) {
    throw new BadRequestError({
      message: `Asserted value ${valueName} is nullish`,
    });
  }
  return value;
};

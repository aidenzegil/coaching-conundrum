/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { AxiosError } from "axios";
import { inspect } from "util";

export enum AnsiBackground {
  BLACK = 40,
  RED = 41,
  GREEN = 42,
  YELLOW = 43,
  BLUE = 44,
  MAGENTA = 45,
  CYAN = 46,
  WHITE = 47,
  BRIGHT_BLACK = 100,
  BRIGHT_RED = 101,
  BRIGHT_GREEN = 102,
  BRIGHT_YELLOW = 103,
  BRIGHT_BLUE = 104,
  BRIGHT_MAJENTA = 105,
  BRIGHT_CYAN = 106,
}
export enum AnsiForeground {
  BLACK = 30,
  RED = 31,
  GREEN = 32,
  YELLOW = 33,
  BLUE = 34,
  MAGENTA = 35,
  CYAN = 36,
  WHITE = 37,
  BRIGHT_BLACK = 90,
  BRIGHT_RED = 91,
  BRIGHT_GREEN = 92,
  BRIGHT_YELLOW = 93,
  BRIGHT_BLUE = 94,
  BRIGHT_MAJENTA = 95,
  BRIGHT_CYAN = 96,
}
export const deepLog = (
  source: any,
  foreground?: AnsiForeground,
  background?: AnsiBackground,
): void => {
  console.log(
    `\u001b[${foreground || 0}${background ? ";" + background : ""}m\n`,
  );
  if (source?.isAxiosError) {
    const err = source as AxiosError;
    const jsonErr = err.toJSON();
    console.log(
      inspect(
        { axiosError: { ...jsonErr, resData: err.response?.data } },
        { colors: false, depth: null, showHidden: false },
      ),
    );
  } else {
    console.log(
      inspect(source, { colors: false, depth: null, showHidden: false }),
    );
  }
  console.log("\n", "\u001b[0;0m");
};

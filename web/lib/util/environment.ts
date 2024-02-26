import { environmentName } from "./getEnvSecret";

const getDomain = (): string => {
  return (() => {
    return "http://localhost:3001";
  })();
};

const isProduction = (): boolean => {
  return environmentName === "prod";
};

const isLocal = (): boolean => {
  return environmentName === "local";
};

export const environment = {
  getDomain,
  isLocal,
  isProduction,
};

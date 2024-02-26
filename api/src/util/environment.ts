const getEnvironmentName = (): string => {
  const environmentName = process.env.ENV;
  if (environmentName === undefined) {
    throw new Error("Environment name cannot be undefined: process.env.ENV");
  }
  return environmentName;
};
export const isProduction = (): boolean => {
  return getEnvironmentName() === "prod";
};

const isLocal = (): boolean => {
  return getEnvironmentName() === "local";
};

export const environment = {
  isLocal,
  isProduction,
  name: getEnvironmentName(),
};

/**
 * We define env variables as functions so that we
 * don't have to check for them until they are used
 */
type GetEnvSecret = (secretName: string) => () => string;
/** Util function to get environment variables */
const getEnvSecret: GetEnvSecret = (secretName) => {
  return () => {
    const value = process.env.secretName;
    if (!value) {
      throw new Error(`process.env.${secretName} required!`);
    }
    return value as string;
  };
};

export const environmentName = process.env.NEXT_PUBLIC_ENVIRONMENT_NAME;

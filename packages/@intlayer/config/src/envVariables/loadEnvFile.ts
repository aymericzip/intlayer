import dotenv from 'dotenv';

const DEFAULT_ENV = process.env.NODE_ENV ?? 'development';

export type LoadEnvFileOptions = {
  env?: string;
  envFile?: string;
};

export const loadEnvFile = (options?: Partial<LoadEnvFileOptions>) => {
  const env = options?.env ?? DEFAULT_ENV;

  const envFiles = options?.envFile
    ? [options.envFile]
    : [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'];

  const result = {};

  dotenv.config({
    path: envFiles,
    processEnv: result,
  });

  return result; // Return the parsed env object
};

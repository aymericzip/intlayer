import dotenv from 'dotenv';

const env = process.env.NODE_ENV ?? 'development';

export const loadEnvFile = () => {
  const result = dotenv.config({
    path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
  });

  return result.parsed; // Return the parsed env object
};

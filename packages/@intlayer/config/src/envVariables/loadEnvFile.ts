import process from 'process';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV ?? 'development';

export const loadEnvFile = () =>
  dotenv.config({ path: ['.env', `.env.${env}`, `.env.${env}.local`] });

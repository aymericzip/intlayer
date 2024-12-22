import { logger } from '../logger';

function getEnvValue(
  value: unknown,
  type: 'boolean',
  verbose?: boolean
): boolean | undefined;
function getEnvValue(
  value: unknown,
  type: 'number',
  verbose?: boolean
): number | undefined;
function getEnvValue<T extends string>(
  value: unknown,
  type: 'string',
  verbose?: boolean
): T | undefined;
function getEnvValue<T>(
  value: unknown,
  type: 'object',
  verbose?: boolean
): T | undefined;
function getEnvValue<T>(
  value: unknown,
  type: 'array',
  verbose?: boolean
): T[] | undefined;
function getEnvValue(
  value: unknown,
  type: 'string' | 'boolean' | 'number' | 'object' | 'array',
  verbose = false
) {
  try {
    switch (type) {
      case 'boolean':
        // Convert string to boolean explicitly
        return value === 'true' || value === '1';

      case 'number':
        // Convert string to number, return undefined if conversion fails
        return Number(value);

      case 'string':
        // Return the string directly
        return value ?? '';

      case 'object':
      case 'array':
        // Attempt to parse the value as JSON
        return JSON.parse(value as string);

      default:
        return undefined;
    }
  } catch (error) {
    // Log error and return undefined if any error occurs during parsing
    if (verbose) {
      logger(
        `Error parsing environment variable, parsing : ${((value ?? '') as string).toString()}`,
        { level: 'error' }
      );
    }
    return undefined;
  }
}

export { getEnvValue };

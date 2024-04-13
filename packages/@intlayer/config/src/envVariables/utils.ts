function getEnvValue(value: unknown, type: 'boolean'): boolean | undefined;
function getEnvValue(value: unknown, type: 'number'): number | undefined;
function getEnvValue<T extends string>(
  value: unknown,
  type: 'string'
): T | undefined;
function getEnvValue<T>(value: unknown, type: 'object'): T | undefined;
function getEnvValue<T>(value: unknown, type: 'array'): T[] | undefined;
function getEnvValue(
  value: unknown,
  type: 'string' | 'boolean' | 'number' | 'object' | 'array'
) {
  // Handle cases where the environment variable is not set
  if (value === undefined) {
    return undefined;
  }

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
        return value;

      case 'object':
      case 'array':
        // Attempt to parse the value as JSON
        return JSON.parse(value as string);

      default:
        return undefined;
    }
  } catch (error) {
    // Log error and return undefined if any error occurs during parsing
    console.error(`Error parsing environment variable`);
    return undefined;
  }
}

export { getEnvValue };

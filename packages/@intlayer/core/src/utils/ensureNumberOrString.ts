/**
 * Checks if the provided value is a valid number or numeric string.
 * If the value is not a number, logs a warning with the context provided.
 *
 * @param {number|string} value - The value to validate, can be a number or a string.
 * @param {string} callerFunction - The name of the function or context where this check is performed.
 */
export const ensureNumberOrString = (
  value: number | string,
  callerFunction: string
) => {
  if (isNaN(Number(value))) {
    throw new Error(
      `["${callerFunction}"] ⚠️ Invalid value passed: "${value}". Expected a number or numeric string.`
    );
  }
};

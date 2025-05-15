import { appLogger } from '@intlayer/config';

export const formatCode = async (filePath: string, code: string) => {
  // Try to import prettier if it exists
  let prettier: any;
  try {
    prettier = require('prettier');
  } catch (error) {
    // Prettier is not installed, continue without it
  }

  // Apply Prettier formatting if it's available
  if (prettier) {
    try {
      // Try to find a prettier config file
      const prettierConfig = await prettier.resolveConfig(filePath ?? '');

      // Format the code with Prettier
      const formattedCode = await prettier.format(code, {
        ...prettierConfig,
        filepath: filePath, // Explicitly provide the filepath so Prettier can infer the parser
      });

      appLogger(`Applied Prettier formatting to ${filePath}`, {
        level: 'info',
        isVerbose: true,
      });

      return formattedCode;
    } catch (error) {
      const err = error as Error;
      appLogger(
        `Failed to apply Prettier formatting to ${filePath}: ${err.message}`,
        {
          level: 'warn',
          isVerbose: true,
        }
      );
      // Continue with unformatted code on prettier error
    }
  }

  return code;
};

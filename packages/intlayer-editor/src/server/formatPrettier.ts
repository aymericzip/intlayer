import prettier from 'prettier';

/**
 * Format the content with Prettier
 */
export const format = async (content: string) => {
  // Resolve the configuration from the project
  let options: prettier.Options = {};

  try {
    // Resolve the prettier configuration from the project
    options =
      (await prettier.resolveConfig(content, {
        editorconfig: true,
      })) ?? {};
  } catch (error) {
    console.error('Failed to resolve Prettier configuration:', error);
  }

  // Add the parser option to the resolved config
  const config: prettier.Options = { ...options, parser: 'typescript' };

  return prettier.format(content, config);
};

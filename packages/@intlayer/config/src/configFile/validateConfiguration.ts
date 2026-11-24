/** A single problem found while validating a configuration. */
export type ConfigurationIssue = {
  /** Dot-separated path of the invalid field. */
  path: string;
  message: string;
};

/**
 * Validate a user configuration against the Intlayer schema.
 *
 * `zod` is an optional peer dependency, loaded on demand: when it is not
 * installed the validation is skipped and no issue is reported.
 */
export const validateConfiguration = async (
  customConfiguration: unknown
): Promise<ConfigurationIssue[]> => {
  let schemaModule: typeof import('./configurationSchema');

  try {
    schemaModule = await import('./configurationSchema');
  } catch {
    return [];
  }

  const result = schemaModule.intlayerConfigSchema.safeParse(
    customConfiguration,
    schemaModule.intlayerConfigSchemaParseContext
  );

  if (result.success) return [];

  return result.error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
};

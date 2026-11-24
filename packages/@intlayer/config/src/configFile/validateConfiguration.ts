/** A single problem found while validating a configuration. */
export type ConfigurationIssue = {
  /** Dot-separated path of the invalid field. */
  path: string;
  message: string;
};

/**
 * Validate a user configuration against the Intlayer schema.
 *
 * The schema (and zod) is loaded on demand, so zod is not evaluated when
 * validation is not needed. If loading fails, validation is skipped.
 * Never rejects.
 */
export const validateConfiguration = async (
  customConfiguration: unknown
): Promise<ConfigurationIssue[]> => {
  try {
    const { intlayerConfigSchema, intlayerConfigSchemaParseContext } =
      await import('./configurationSchema');

    const result = intlayerConfigSchema.safeParse(
      customConfiguration,
      intlayerConfigSchemaParseContext
    );

    if (result.success) return [];

    return result.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
  } catch {
    return [];
  }
};

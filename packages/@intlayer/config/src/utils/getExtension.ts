import type { IntlayerConfig } from '@intlayer/config';

export const getExtension = (
  configuration: IntlayerConfig,
  format?: 'esm' | 'cjs' | undefined
) => {
  const outputFormats = configuration.build.outputFormat;

  if (format === 'cjs') return 'cjs';
  if (format === 'esm') return 'mjs';

  if (outputFormats.includes('cjs')) return 'cjs';
  if (outputFormats.includes('esm')) return 'mjs';

  return 'cjs';
};

import { type IntlayerConfig, getConfiguration } from '@intlayer/config';

export const getExtension = (
  configuration: IntlayerConfig = getConfiguration(),
  format?: 'esm' | 'cjs' | undefined
) => {
  const outputFormats = configuration.build.outputFormat;

  if (format === 'esm') return 'mjs';
  if (format === 'cjs') return 'cjs';

  if (outputFormats.includes('esm')) return 'mjs';
  if (outputFormats.includes('cjs')) return 'cjs';

  return 'mjs';
};

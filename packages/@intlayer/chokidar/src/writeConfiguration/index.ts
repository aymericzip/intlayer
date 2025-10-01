import type { IntlayerConfig } from '@intlayer/config';
import { mkdir } from 'fs/promises';
import { join } from 'path';

export const writeConfiguration = async (
  configuration: IntlayerConfig,
  format: 'cjs' | 'esm' = 'esm'
) => {
  const { content } = configuration;
  const { configDir } = content;

  // Ensure target directory exists
  // configDir is expected to be the directory where configuration.json will live
  await mkdir(configDir, { recursive: true });

  const configFilePath = join(configDir, 'configuration.json');

  const extension = format === 'cjs' ? 'cjs' : 'mjs';

  const content = generateDictionaryEntryPoint(
    localedDictionariesPathsRecord,
    format,
    configuration
  );

  await writeFileIfChanged(
    resolve(dynamicDictionariesDir, `${key}.${extension}`),
    content
  ).catch((err) => {
    console.error(
      `Error creating dynamic ${colorizePath(resolve(dynamicDictionariesDir, `${key}.${extension}`))}:`,
      err
    );
  });
};

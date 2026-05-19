import { execSync } from 'node:child_process';
import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { stringifyYaml } from '@intlayer/core/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { detectFormatCommand } from '../detectFormatCommand';

// Fields that are auto-generated or runtime-only, not persisted in the file
const EXCLUDED_YAML_KEYS = new Set<string>(['$schema', 'id', 'filePath']);

export const writeYamlFile = async (
  absoluteFilePath: string,
  dictionary: Dictionary,
  configuration: IntlayerConfig
): Promise<void> => {
  const filtered = Object.fromEntries(
    Object.entries(dictionary).filter(
      ([k, v]) => !EXCLUDED_YAML_KEYS.has(k) && v !== undefined
    )
  );

  const fileContent = stringifyYaml(filtered);

  const dir = dirname(absoluteFilePath);
  await mkdir(dir, { recursive: true });

  const tempDir = configuration.system?.tempDir;
  if (tempDir) await mkdir(tempDir, { recursive: true });

  const tempFileName = `${basename(absoluteFilePath)}.${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`;
  const tempPath = tempDir
    ? join(tempDir, tempFileName)
    : `${absoluteFilePath}.${tempFileName}`;

  try {
    await writeFile(tempPath, fileContent, 'utf-8');
    await rename(tempPath, absoluteFilePath);
  } catch (error) {
    try {
      await rm(tempPath, { force: true });
    } catch {
      // ignore
    }
    throw error;
  }

  const formatCommand = detectFormatCommand(configuration);
  if (formatCommand) {
    try {
      execSync(formatCommand.replace('{{file}}', absoluteFilePath), {
        stdio: 'inherit',
        cwd: configuration.system.baseDir,
      });
    } catch (error) {
      console.error(error);
    }
  }
};

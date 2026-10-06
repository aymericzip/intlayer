import { execSync } from 'node:child_process';
import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { detectFormatCommand } from '../detectFormatCommand';
import { renderYamlContentDeclaration } from './renderContentDeclaration';

export const writeYamlFile = async (
  absoluteFilePath: string,
  dictionary: Dictionary,
  configuration: IntlayerConfig
): Promise<void> => {
  const fileContent = renderYamlContentDeclaration(dictionary);

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

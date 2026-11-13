import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { runFormatCommand } from '../detectFormatCommand';
import { renderMarkdownContentDeclaration } from './renderContentDeclaration';

export const writeMarkdownFile = async (
  absoluteFilePath: string,
  dictionary: Dictionary,
  configuration: IntlayerConfig
): Promise<void> => {
  const fileContent = renderMarkdownContentDeclaration(dictionary);

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

  runFormatCommand(absoluteFilePath, configuration);
};

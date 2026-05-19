import { execSync } from 'node:child_process';
import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { MARKDOWN } from '@intlayer/types/nodeType';
import { detectFormatCommand } from '../detectFormatCommand';

const stringifyYamlFrontmatter = (fields: Record<string, any>): string =>
  Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map((item) => `  - ${JSON.stringify(item)}`).join('\n')}`;
      }
      if (
        typeof value === 'string' &&
        (value.includes(':') || value.includes('\n') || value.includes('#'))
      ) {
        return `${key}: ${JSON.stringify(value)}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');

// Strips YAML frontmatter from a markdown string, returning only the body
const getMarkdownBody = (content: string): string => {
  const lines = content.split(/\r?\n/);
  const firstNonEmptyIndex = lines.findIndex((line) => line.trim() !== '');

  if (firstNonEmptyIndex === -1 || lines[firstNonEmptyIndex].trim() !== '---') {
    return content;
  }

  let endIndex = -1;
  for (let i = firstNonEmptyIndex + 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) return content;

  return lines.slice(endIndex + 1).join('\n').trimStart();
};

// Fields that are auto-generated or belong to the body, not the frontmatter
const EXCLUDED_FRONTMATTER_KEYS = new Set<string>([
  'content',
  '$schema',
  'id',
  'filePath',
]);

export const writeMarkdownFile = async (
  absoluteFilePath: string,
  dictionary: Dictionary,
  configuration: IntlayerConfig
): Promise<void> => {
  const content = dictionary.content as any;
  const markdownRaw =
    typeof content === 'object' && content?.nodeType === MARKDOWN
      ? (content[MARKDOWN] ?? '')
      : '';
  // content.markdown now stores the full file (frontmatter + body); extract only the body
  const markdownBody = getMarkdownBody(markdownRaw);

  const frontmatterFields = Object.fromEntries(
    Object.entries(dictionary).filter(
      ([k, v]) => !EXCLUDED_FRONTMATTER_KEYS.has(k) && v !== undefined
    )
  );

  const frontmatterStr = stringifyYamlFrontmatter(frontmatterFields);
  const fileContent = `---\n${frontmatterStr}\n---\n\n${markdownBody}`;

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

import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { detectNextIntlMessagesPattern } from './fileSystem';

const REQUEST_FILE_CONTENT = (importPath: string) => `
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(\`${importPath}\`)).default,
  };
});
`;

describe('detectNextIntlMessagesPattern', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-init-'));
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  const writeRequestFile = async (relativePath: string, importPath: string) => {
    const absolutePath = join(rootDir, relativePath);
    await mkdir(dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, REQUEST_FILE_CONTENT(importPath), 'utf8');
  };

  it('derives a flat root-level template from i18n/request.ts', async () => {
    await writeRequestFile('i18n/request.ts', '../messages/${locale}.json');

    const result = await detectNextIntlMessagesPattern(rootDir);

    expect(result).toEqual({
      type: 'flat',
      template: './messages/${locale}.json',
    });
  });

  it('resolves the path relative to a src/i18n/request.ts location', async () => {
    await writeRequestFile(
      'src/i18n/request.ts',
      '../../messages/${locale}.json'
    );

    const result = await detectNextIntlMessagesPattern(rootDir);

    expect(result).toEqual({
      type: 'flat',
      template: './messages/${locale}.json',
    });
  });

  it('classifies a per-namespace import as nested', async () => {
    await writeRequestFile(
      'i18n/request.ts',
      '../messages/${locale}/${key}.json'
    );

    const result = await detectNextIntlMessagesPattern(rootDir);

    expect(result?.type).toBe('nested');
    expect(result?.template).toBe('./messages/${locale}/${key}.json');
  });

  it('returns null for path-alias imports that cannot be resolved', async () => {
    await writeRequestFile('i18n/request.ts', '@/messages/${locale}.json');

    const result = await detectNextIntlMessagesPattern(rootDir);

    expect(result).toBeNull();
  });

  it('returns null when no request file is present', async () => {
    const result = await detectNextIntlMessagesPattern(rootDir);

    expect(result).toBeNull();
  });
});

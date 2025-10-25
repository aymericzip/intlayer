/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { LocalesValues } from '@intlayer/config';

const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

const readLocale = (relativeAfterLocale: string, locale: LocalesValues): Promise<string> => {
  const target = join(dir, `../../../blog/${locale}/${relativeAfterLocale}`);
  if (!existsSync(target)) {
    console.error(`[docs] File not found: ${target}`);
    return readFile(join(dir, `../../../blog/en/${relativeAfterLocale}`), 'utf8');
  }
  return readFile(target, 'utf8');
};


export const blogEntry = {

} as const;

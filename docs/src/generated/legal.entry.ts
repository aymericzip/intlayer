/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { readFile } from 'fs/promises';
import { localeRecord } from 'intlayer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

export const legalEntry = {
  './legal/en/privacy_notice.md': localeRecord(({ locale }) =>
    readFile(`${dir}/../../../legal/${locale}/privacy_notice.md`, 'utf-8')
  ),
  './legal/en/terms_of_service.md': localeRecord(({ locale }) =>
    readFile(`${dir}/../../../legal/${locale}/terms_of_service.md`, 'utf-8')
  ),
} as const;

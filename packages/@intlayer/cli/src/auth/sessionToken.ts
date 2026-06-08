import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';

const SESSION_FILE_NAME = 'cli-session.json';

export type CliSessionData = {
  token: string;
  expiresAt: string; // ISO date string
};

const getSessionFilePath = (config: IntlayerConfig): string =>
  join(config.system.tempDir, SESSION_FILE_NAME);

export const writeCliSessionToken = async (
  config: IntlayerConfig,
  token: string,
  expiresAt: Date
): Promise<void> => {
  const filePath = getSessionFilePath(config);

  await mkdir(config.system.tempDir, { recursive: true });

  const data: CliSessionData = { token, expiresAt: expiresAt.toISOString() };
  await writeFile(filePath, JSON.stringify(data, null, 2), { mode: 0o600 });
};

export const readCliSessionToken = async (
  config: IntlayerConfig
): Promise<CliSessionData | null> => {
  const filePath = getSessionFilePath(config);

  try {
    const raw = await readFile(filePath, 'utf8');
    const data: CliSessionData = JSON.parse(raw);

    if (!data.token || !data.expiresAt) {
      return null;
    }

    if (new Date() >= new Date(data.expiresAt)) {
      await clearCliSessionToken(config);
      return null;
    }

    return data;
  } catch {
    return null;
  }
};

export const clearCliSessionToken = async (
  config: IntlayerConfig
): Promise<void> => {
  try {
    await unlink(getSessionFilePath(config));
  } catch {
    // Ignore errors (file may not exist)
  }
};

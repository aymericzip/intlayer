import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dataDir = join(import.meta.dirname, '../src/data');

mkdirSync(dataDir, { recursive: true });

/**
 * Writes data to a file only if the fetch succeeded.
 * Keeps the existing file if fetch fails so stale data is better than nothing.
 */
const writeIfChanged = (filePath: string, data: unknown): void => {
  const json = JSON.stringify(data, null, 2);
  const existing = existsSync(filePath)
    ? readFileSync(filePath, 'utf-8')
    : null;
  if (existing !== json) {
    writeFileSync(filePath, json);
  }
};

// --- Pricing ---
try {
  const { getStripeAPI } = await import('@intlayer/api');
  const response = await getStripeAPI().getPricing();
  if (response?.data) {
    writeIfChanged(join(dataDir, 'pricing.json'), response.data);
    console.log('✓ pricing: fetched');
  }
} catch (error) {
  console.error('✗ pricing: fetch failed, keeping existing file', error);
}

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

type Contributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
};

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

// --- Contributors ---
try {
  const response = await fetch(
    'https://api.github.com/repos/aymericzip/intlayer/contributors?per_page=100'
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = (await response.json()) as Contributor[];
  const contributors = data.filter(
    (c) => c.type !== 'Bot' && !c.login.includes('[bot]')
  );
  writeIfChanged(join(dataDir, 'contributors.json'), contributors);
  console.log(`✓ contributors: ${contributors.length} fetched`);
} catch (error) {
  console.error('✗ contributors: fetch failed, keeping existing file', error);
}

// --- Pricing ---
try {
  const { getStripeAPI } = await import('@intlayer/api');
  const response = await getStripeAPI().getPricing({});
  if (response?.data) {
    writeIfChanged(join(dataDir, 'pricing.json'), response.data);
    console.log('✓ pricing: fetched');
  }
} catch (error) {
  console.error('✗ pricing: fetch failed, keeping existing file', error);
}

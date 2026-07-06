import { mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { loadEnvFile } from './loadEnvFile';

const temporaryDirectory = mkdtempSync(join(tmpdir(), 'intlayer-env-'));

describe('loadEnvFile', () => {
  afterAll(() => {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it('parses an explicit env file', () => {
    const envFilePath = join(temporaryDirectory, '.env.parse');
    writeFileSync(envFilePath, 'MY_VARIABLE=first-value\n');

    const parsedEnv = loadEnvFile({ envFile: envFilePath });

    expect(parsedEnv).toEqual({ MY_VARIABLE: 'first-value' });
  });

  it('returns the cached result for an unchanged file', () => {
    const envFilePath = join(temporaryDirectory, '.env.cached');
    writeFileSync(envFilePath, 'MY_VARIABLE=cached-value\n');

    const firstResult = loadEnvFile({ envFile: envFilePath });
    const secondResult = loadEnvFile({ envFile: envFilePath });

    // Same object reference proves the cached entry was reused
    expect(secondResult).toBe(firstResult);
  });

  it('re-parses when the env file changes', () => {
    const envFilePath = join(temporaryDirectory, '.env.changing');
    writeFileSync(envFilePath, 'MY_VARIABLE=before\n');

    const firstResult = loadEnvFile({ envFile: envFilePath });
    expect(firstResult).toEqual({ MY_VARIABLE: 'before' });

    writeFileSync(envFilePath, 'MY_VARIABLE=after!\n');
    // Force a distinct mtime in case both writes land in the same clock tick
    const futureTime = new Date(Date.now() + 5_000);
    utimesSync(envFilePath, futureTime, futureTime);

    const secondResult = loadEnvFile({ envFile: envFilePath });
    expect(secondResult).toEqual({ MY_VARIABLE: 'after!' });
  });

  it('returns an empty object when no env file exists', () => {
    const missingEnvFilePath = join(temporaryDirectory, '.env.missing');

    expect(loadEnvFile({ envFile: missingEnvFilePath })).toEqual({});
  });
});

import {
  mkdtemp,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { writeFileIfChanged } from './writeFileIfChanged';

describe('writeFileIfChanged', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'write-file-if-changed-'));
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  it('should create the file and return true when it does not exist', async () => {
    const filePath = join(testDir, 'new-file.json');

    const hasWritten = await writeFileIfChanged(filePath, '{"key":"value"}');

    expect(hasWritten).toBe(true);
    await expect(readFile(filePath, 'utf8')).resolves.toBe('{"key":"value"}');
  });

  it('should return false and not rewrite the file when the content is identical', async () => {
    const filePath = join(testDir, 'unchanged.json');
    await writeFile(filePath, '{"key":"value"}');
    const statsBefore = await stat(filePath);

    const hasWritten = await writeFileIfChanged(filePath, '{"key":"value"}');

    const statsAfter = await stat(filePath);
    expect(hasWritten).toBe(false);
    // The file must not have been replaced (atomic writes swap the inode)
    expect(statsAfter.ino).toBe(statsBefore.ino);
  });

  it('should overwrite the file and return true when the content differs', async () => {
    const filePath = join(testDir, 'changed.json');
    await writeFile(filePath, '{"key":"old"}');

    const hasWritten = await writeFileIfChanged(filePath, '{"key":"new"}');

    expect(hasWritten).toBe(true);
    await expect(readFile(filePath, 'utf8')).resolves.toBe('{"key":"new"}');
  });

  it('should preserve the file mode when overwriting', async () => {
    const filePath = join(testDir, 'executable.sh');
    await writeFile(filePath, '#!/bin/sh\necho old\n', { mode: 0o755 });

    await writeFileIfChanged(filePath, '#!/bin/sh\necho new\n');

    const stats = await stat(filePath);
    expect(stats.mode & 0o777).toBe(0o755);
  });

  it('should respect the provided encoding', async () => {
    const filePath = join(testDir, 'encoded.txt');
    const base64Data = Buffer.from('hello world').toString('base64');

    await writeFileIfChanged(filePath, base64Data, { encoding: 'base64' });

    await expect(readFile(filePath, 'utf8')).resolves.toBe('hello world');
  });

  it('should not leave temp files behind after writing', async () => {
    const filePath = join(testDir, 'clean.json');

    await writeFileIfChanged(filePath, '{"first":true}');
    await writeFileIfChanged(filePath, '{"second":true}');

    await expect(readdir(testDir)).resolves.toEqual(['clean.json']);
  });

  it('should overwrite in place without a temp file when atomic is false', async () => {
    const filePath = join(testDir, 'non-atomic.json');
    await writeFile(filePath, '{"key":"old"}');
    const statsBefore = await stat(filePath);

    const hasWritten = await writeFileIfChanged(filePath, '{"key":"new"}', {
      atomic: false,
    });

    const statsAfter = await stat(filePath);
    expect(hasWritten).toBe(true);
    await expect(readFile(filePath, 'utf8')).resolves.toBe('{"key":"new"}');
    // No temp file is created, and the inode is reused (overwritten in place).
    await expect(readdir(testDir)).resolves.toEqual(['non-atomic.json']);
    expect(statsAfter.ino).toBe(statsBefore.ino);
  });

  it('should still skip identical writes when atomic is false', async () => {
    const filePath = join(testDir, 'non-atomic-unchanged.json');
    await writeFile(filePath, '{"key":"value"}');

    const hasWritten = await writeFileIfChanged(filePath, '{"key":"value"}', {
      atomic: false,
    });

    expect(hasWritten).toBe(false);
  });

  it('should preserve a non-default file mode when atomic is false', async () => {
    const filePath = join(testDir, 'non-atomic.sh');
    await writeFile(filePath, '#!/bin/sh\necho old\n', { mode: 0o755 });

    await writeFileIfChanged(filePath, '#!/bin/sh\necho new\n', {
      atomic: false,
    });

    const stats = await stat(filePath);
    expect(stats.mode & 0o777).toBe(0o755);
  });
});

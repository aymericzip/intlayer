import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getMarkdownMetadata } from '@intlayer/core/transpiler';
import { afterAll, describe, expect, it } from 'vitest';
import { MARKDOWN_HEAD_CHUNK_SIZE, readMarkdownHead } from './readMarkdownHead';

const temporaryDirectory = mkdtempSync(join(tmpdir(), 'docs-markdown-head-'));

const writeMarkdown = (fileName: string, content: string): string => {
  const filePath = join(temporaryDirectory, fileName);
  writeFileSync(filePath, content);
  return filePath;
};

describe('readMarkdownHead', () => {
  afterAll(() => {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it('stops reading after the front matter', async () => {
    const body = 'x'.repeat(200_000);
    const filePath = writeMarkdown(
      'short.md',
      `---\ntitle: Short\n---\n${body}`
    );

    const head = await readMarkdownHead(filePath);

    expect(head.length).toBeLessThan(body.length);
    expect(getMarkdownMetadata(head)).toEqual({ title: 'Short' });
  });

  it('reads front matter longer than one chunk', async () => {
    const keywords = Array.from(
      { length: 3_000 },
      (_, index) => `  - keyword-${index}`
    ).join('\n');
    const content = `---\ntitle: Long\nkeywords:\n${keywords}\n---\nBody`;
    const filePath = writeMarkdown('long.md', content);

    const head = await readMarkdownHead(filePath);

    expect(getMarkdownMetadata(head)).toEqual(getMarkdownMetadata(content));
  });

  it('keeps multi-byte characters split across chunks intact', async () => {
    // Pushes a 3-byte character across the first chunk boundary
    const padding = 'a'.repeat(
      MARKDOWN_HEAD_CHUNK_SIZE - '---\ntitle: '.length - 1
    );
    const content = `---\ntitle: ${padding}漢字\n---\nBody`;
    const filePath = writeMarkdown('multibyte.md', content);

    const head = await readMarkdownHead(filePath);

    expect(getMarkdownMetadata(head)).toEqual(getMarkdownMetadata(content));
  });

  it('handles CRLF files and files without front matter', async () => {
    const crlfPath = writeMarkdown('crlf.md', '---\r\ntitle: Crlf\r\n---\r\n');
    const plainPath = writeMarkdown('plain.md', '# Title\n\nBody');

    expect(getMarkdownMetadata(await readMarkdownHead(crlfPath))).toEqual({
      title: 'Crlf',
    });
    expect(getMarkdownMetadata(await readMarkdownHead(plainPath))).toEqual({});
  });
});

import { describe, expect, it } from 'vitest';
import { parseEditorServerUrl } from './parseEditorServerUrl';

describe('parseEditorServerUrl', () => {
  it('reads the announced URL, including a shifted port', () => {
    const output = `
    INTLAYER v9.0.0

    Editor running at:           http://localhost:8001
    ➜  Watching application at:  http://localhost:3000
    `;

    expect(parseEditorServerUrl(output)).toBe('http://localhost:8001');
  });

  it('ignores output without the announcement', () => {
    expect(
      parseEditorServerUrl('Port 8000 is in use, using port 8001 instead.')
    ).toBeUndefined();
  });
});

import { describe, expect, it } from 'vitest';
import { getLocalEditorParentOrigin } from './getLocalEditorParentOrigin';

describe('getLocalEditorParentOrigin', () => {
  it('trusts a local parent on another port than a local editorURL', () => {
    expect(
      getLocalEditorParentOrigin(
        'http://localhost:8000',
        'http://localhost:8001'
      )
    ).toBe('http://localhost:8001');
    expect(
      getLocalEditorParentOrigin('http://127.0.0.1:8000', 'http://[::1]:8002')
    ).toBe('http://[::1]:8002');
  });

  it('ignores a remote parent', () => {
    expect(
      getLocalEditorParentOrigin(
        'http://localhost:8000',
        'https://attacker.example'
      )
    ).toBeUndefined();
  });

  it('ignores a local parent when the editor is remote', () => {
    expect(
      getLocalEditorParentOrigin(
        'https://editor.example.com',
        'http://localhost:8001'
      )
    ).toBeUndefined();
  });

  it('ignores missing or invalid values', () => {
    expect(
      getLocalEditorParentOrigin(undefined, 'http://localhost:8001')
    ).toBeUndefined();
    expect(
      getLocalEditorParentOrigin('http://localhost:8000', undefined)
    ).toBeUndefined();
    expect(
      getLocalEditorParentOrigin('not a url', 'http://localhost:8001')
    ).toBeUndefined();
  });
});

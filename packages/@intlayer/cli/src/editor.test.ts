import { describe, expect, it } from 'vitest';
import { getRemoteEditorRunners } from './editor';

describe('getRemoteEditorRunners', () => {
  it('pins intlayer-editor to the CLI version', () => {
    expect(getRemoteEditorRunners('9.6.0')).toEqual([
      ['bun', ['x', 'intlayer-editor@9.6.0']],
      ['npx', ['-y', 'intlayer-editor@9.6.0']],
    ]);
  });

  it('falls back to the latest version when the CLI version is unknown', () => {
    expect(getRemoteEditorRunners(undefined)).toEqual([
      ['bun', ['x', 'intlayer-editor']],
      ['npx', ['-y', 'intlayer-editor']],
    ]);
  });
});

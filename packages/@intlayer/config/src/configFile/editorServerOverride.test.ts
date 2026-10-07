import type { IntlayerConfig } from '@intlayer/types/config';
import { describe, expect, it } from 'vitest';
import {
  applyEditorServerOverride,
  EDITOR_SERVER_PORT_ENV_VAR,
  getEditorURLForPort,
} from './editorServerOverride';

describe('getEditorURLForPort', () => {
  it('replaces the port of a local editor URL', () => {
    expect(getEditorURLForPort('http://localhost:8000', 8001)).toBe(
      'http://localhost:8001'
    );
    expect(getEditorURLForPort('http://127.0.0.1:8000/', 8001)).toBe(
      'http://127.0.0.1:8001/'
    );
  });

  it('keeps a URL already targeting the port', () => {
    expect(getEditorURLForPort('http://localhost:8000', 8000)).toBeUndefined();
    expect(getEditorURLForPort('http://localhost', 80)).toBeUndefined();
  });

  it('keeps a URL naming another host', () => {
    expect(
      getEditorURLForPort('https://editor.example.com', 8001)
    ).toBeUndefined();
  });

  it('falls back to localhost for a missing or invalid URL', () => {
    expect(getEditorURLForPort(undefined, 8001)).toBe('http://localhost:8001');
    expect(getEditorURLForPort('not a url', 8001)).toBe(
      'http://localhost:8001'
    );
  });
});

describe('applyEditorServerOverride', () => {
  const configuration = {
    editor: { enabled: false, port: 8000, editorURL: 'http://localhost:9000' },
  } as unknown as IntlayerConfig;

  it('enables the editor and adapts it to the editor server port', () => {
    const { editor } = applyEditorServerOverride(configuration, {
      [EDITOR_SERVER_PORT_ENV_VAR]: '8001',
    });

    expect(editor).toEqual({
      enabled: true,
      port: 8001,
      editorURL: 'http://localhost:8001',
    });
  });

  it('returns the configuration unchanged without a valid port', () => {
    expect(applyEditorServerOverride(configuration, {})).toBe(configuration);
    expect(
      applyEditorServerOverride(configuration, {
        [EDITOR_SERVER_PORT_ENV_VAR]: 'abc',
      })
    ).toBe(configuration);
  });
});

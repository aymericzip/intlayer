import { describe, expect, it } from 'vitest';
import { buildEditorFields } from './buildBrowserConfiguration';
import { buildConfigurationFields } from './buildConfigurationFields';

describe('editor credential env fallbacks', () => {
  it('falls back to INTLAYER_CLIENT_ID / INTLAYER_CLIENT_SECRET from env', () => {
    const env = {
      INTLAYER_CLIENT_ID: 'client_id_from_env',
      INTLAYER_CLIENT_SECRET: 'client_secret_from_env',
    } as NodeJS.ProcessEnv;

    const editor = buildEditorFields(undefined, env);

    expect(editor.clientId).toBe('client_id_from_env');
    expect(editor.clientSecret).toBe('client_secret_from_env');
  });

  it('prefers explicit configuration over env variables', () => {
    const env = {
      INTLAYER_CLIENT_ID: 'client_id_from_env',
      INTLAYER_CLIENT_SECRET: 'client_secret_from_env',
    } as NodeJS.ProcessEnv;

    const editor = buildEditorFields(
      { clientId: 'explicit_id', clientSecret: 'explicit_secret' },
      env
    );

    expect(editor.clientId).toBe('explicit_id');
    expect(editor.clientSecret).toBe('explicit_secret');
  });

  it('leaves credentials undefined when neither config nor env provide them', () => {
    const editor = buildEditorFields(undefined, {} as NodeJS.ProcessEnv);

    expect(editor.clientId).toBeUndefined();
    expect(editor.clientSecret).toBeUndefined();
  });

  it('threads env through buildConfigurationFields without an editor config', () => {
    const env = {
      INTLAYER_CLIENT_ID: 'config_client_id',
      INTLAYER_CLIENT_SECRET: 'config_client_secret',
    } as NodeJS.ProcessEnv;

    const config = buildConfigurationFields({}, undefined, undefined, env);

    expect(config.editor.clientId).toBe('config_client_id');
    expect(config.editor.clientSecret).toBe('config_client_secret');
  });
});

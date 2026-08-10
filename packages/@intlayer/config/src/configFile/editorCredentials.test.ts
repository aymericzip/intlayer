import { describe, expect, it } from 'vitest';
import { buildEditorFields } from './buildBrowserConfiguration';
import { buildConfigurationFields } from './buildConfigurationFields';

describe('editor credentials', () => {
  it('never infers credentials from the environment', () => {
    process.env.INTLAYER_CLIENT_ID = 'client_id_from_env';
    process.env.INTLAYER_CLIENT_SECRET = 'client_secret_from_env';

    try {
      const editor = buildEditorFields(undefined);

      expect(editor.clientId).toBeUndefined();
      expect(editor.clientSecret).toBeUndefined();
    } finally {
      delete process.env.INTLAYER_CLIENT_ID;
      delete process.env.INTLAYER_CLIENT_SECRET;
    }
  });

  it('keeps credentials undefined when the configuration comments them out', () => {
    process.env.INTLAYER_CLIENT_ID = 'client_id_from_env';
    process.env.INTLAYER_CLIENT_SECRET = 'client_secret_from_env';

    try {
      // Mirrors a configuration file where `clientId` / `clientSecret` are
      // commented out to opt out of remote dictionaries while the variables
      // stay defined in `.env` for other tooling.
      const config = buildConfigurationFields({
        editor: { enabled: true },
      });

      expect(config.editor.clientId).toBeUndefined();
      expect(config.editor.clientSecret).toBeUndefined();
    } finally {
      delete process.env.INTLAYER_CLIENT_ID;
      delete process.env.INTLAYER_CLIENT_SECRET;
    }
  });

  it('uses the credentials explicitly wired in the configuration', () => {
    const editor = buildEditorFields({
      clientId: 'explicit_id',
      clientSecret: 'explicit_secret',
    });

    expect(editor.clientId).toBe('explicit_id');
    expect(editor.clientSecret).toBe('explicit_secret');
  });

  it('leaves credentials undefined when the configuration omits them', () => {
    const editor = buildEditorFields(undefined);

    expect(editor.clientId).toBeUndefined();
    expect(editor.clientSecret).toBeUndefined();
  });
});

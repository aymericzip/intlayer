import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  enableEditorInConfig,
  findEnvFile,
  setupCmsCredentials,
  writeCmsCredentialsToEnv,
} from './cms';

const CREDENTIALS = {
  clientId: 'client-id-123',
  clientSecret: 'client-secret-456',
};

const TS_CONFIG = `import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    enabled: false,
    applicationURL: 'http://localhost:3000',
  },
};

export default config;
`;

describe('cms', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-cms-'));
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  describe('findEnvFile', () => {
    it('should default to .env when no env file exists', async () => {
      expect(await findEnvFile(rootDir)).toBe('.env');
    });

    it('should prefer an existing .env over .env.local', async () => {
      await writeFile(join(rootDir, '.env'), 'FOO=bar\n', 'utf8');
      await writeFile(join(rootDir, '.env.local'), 'BAZ=qux\n', 'utf8');
      expect(await findEnvFile(rootDir)).toBe('.env');
    });

    it('should fall back to .env.local when only it exists', async () => {
      await writeFile(join(rootDir, '.env.local'), 'BAZ=qux\n', 'utf8');
      expect(await findEnvFile(rootDir)).toBe('.env.local');
    });
  });

  describe('writeCmsCredentialsToEnv', () => {
    it('should create a .env file with the credentials', async () => {
      const envFile = await writeCmsCredentialsToEnv(rootDir, CREDENTIALS);
      expect(envFile).toBe('.env');

      const content = await readFile(join(rootDir, '.env'), 'utf8');
      expect(content).toContain('INTLAYER_CLIENT_ID=client-id-123');
      expect(content).toContain('INTLAYER_CLIENT_SECRET=client-secret-456');
    });

    it('should append to an existing .env without dropping content', async () => {
      await writeFile(join(rootDir, '.env'), 'EXISTING=value', 'utf8');

      await writeCmsCredentialsToEnv(rootDir, CREDENTIALS);

      const content = await readFile(join(rootDir, '.env'), 'utf8');
      expect(content).toContain('EXISTING=value');
      expect(content).toContain('INTLAYER_CLIENT_ID=client-id-123');
    });

    it('should update an existing credential in place', async () => {
      await writeFile(
        join(rootDir, '.env'),
        'INTLAYER_CLIENT_ID=old-id\nOTHER=keep\n',
        'utf8'
      );

      await writeCmsCredentialsToEnv(rootDir, CREDENTIALS);

      const content = await readFile(join(rootDir, '.env'), 'utf8');
      expect(content).toContain('INTLAYER_CLIENT_ID=client-id-123');
      expect(content).not.toContain('old-id');
      expect(content).toContain('OTHER=keep');
      // No duplicate key.
      expect(content.match(/INTLAYER_CLIENT_ID=/g)?.length).toBe(1);
    });
  });

  describe('enableEditorInConfig', () => {
    it('should enable the editor in the config file', async () => {
      await writeFile(join(rootDir, 'intlayer.config.ts'), TS_CONFIG, 'utf8');

      const configFile = await enableEditorInConfig(rootDir);
      expect(configFile).toBe('intlayer.config.ts');

      const content = await readFile(
        join(rootDir, 'intlayer.config.ts'),
        'utf8'
      );
      expect(content).toContain('enabled: true');
      expect(content).toContain('clientId: process.env.INTLAYER_CLIENT_ID');
    });

    it('should return undefined when no config file exists', async () => {
      expect(await enableEditorInConfig(rootDir)).toBeUndefined();
    });
  });

  describe('setupCmsCredentials', () => {
    it('should write credentials and enable the editor', async () => {
      await writeFile(join(rootDir, 'intlayer.config.ts'), TS_CONFIG, 'utf8');

      await setupCmsCredentials(rootDir, CREDENTIALS);

      const envContent = await readFile(join(rootDir, '.env'), 'utf8');
      expect(envContent).toContain('INTLAYER_CLIENT_ID=client-id-123');

      const configContent = await readFile(
        join(rootDir, 'intlayer.config.ts'),
        'utf8'
      );
      expect(configContent).toContain('enabled: true');
    });
  });
});

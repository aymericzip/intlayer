// @vitest-environment node
import type { IntlayerConfig } from '@intlayer/types/config';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  readCliSessionToken: vi.fn(),
  login: vi.fn(),
  getCliSessionMe: vi.fn(),
  getOAuth2AccessToken: vi.fn(),
}));

vi.mock('@intlayer/cli', () => ({
  readCliSessionToken: mocks.readCliSessionToken,
  login: mocks.login,
}));

vi.mock('@intlayer/api', () => ({
  getIntlayerAPIProxy: () => ({
    oAuth: { getCliSessionMe: mocks.getCliSessionMe },
  }),
  getOAuthAPI: () => ({ getOAuth2AccessToken: mocks.getOAuth2AccessToken }),
}));

const createConfiguration = (
  editor: Partial<IntlayerConfig['editor']> = {}
): IntlayerConfig =>
  ({ editor, log: { mode: 'silent' } }) as unknown as IntlayerConfig;

const project = { id: 'project-id' };

/** Fresh module per test: the service keeps its caches at module level. */
const importService = async () => {
  vi.resetModules();
  return import('./editorAuth.service');
};

describe('resolveEditorAuth', () => {
  beforeEach(() => {
    mocks.readCliSessionToken.mockResolvedValue(null);
  });

  it('uses the `intlayer login` session first', async () => {
    const { resolveEditorAuth } = await importService();
    mocks.readCliSessionToken.mockResolvedValue({
      token: 'clisession_token',
      expiresAt: '2100-01-01T00:00:00.000Z',
    });
    mocks.getCliSessionMe.mockResolvedValue({ data: { project } });

    const auth = await resolveEditorAuth(
      createConfiguration({ clientId: 'id', clientSecret: 'secret' })
    );

    expect(auth).toEqual({
      accessToken: 'clisession_token',
      expiresAt: '2100-01-01T00:00:00.000Z',
      authType: 'session',
      project,
    });
    expect(mocks.getOAuth2AccessToken).not.toHaveBeenCalled();
  });

  it('falls back to the access key when the session is rejected', async () => {
    const { resolveEditorAuth } = await importService();
    mocks.readCliSessionToken.mockResolvedValue({
      token: 'clisession_revoked',
      expiresAt: '2100-01-01T00:00:00.000Z',
    });
    mocks.getCliSessionMe.mockRejectedValue(new Error('Unauthorized'));
    mocks.getOAuth2AccessToken.mockResolvedValue({
      data: { accessToken: 'access-token', project },
    });

    const auth = await resolveEditorAuth(
      createConfiguration({ clientId: 'id', clientSecret: 'secret' })
    );

    expect(auth?.authType).toBe('accessKey');
    expect(auth?.accessToken).toBe('access-token');
  });

  it('reuses the access token until it expires', async () => {
    const { resolveEditorAuth } = await importService();
    mocks.getOAuth2AccessToken.mockResolvedValue({
      data: {
        accessToken: 'access-token',
        accessTokenExpiresAt: '2100-01-01T00:00:00.000Z',
      },
    });
    const configuration = createConfiguration({
      clientId: 'id',
      clientSecret: 'secret',
    });

    await resolveEditorAuth(configuration);
    await resolveEditorAuth(configuration);

    expect(mocks.getOAuth2AccessToken).toHaveBeenCalledTimes(1);
  });

  it('returns null without session nor access key', async () => {
    const { resolveEditorAuth } = await importService();

    expect(await resolveEditorAuth(createConfiguration())).toBeNull();
  });
});

describe('startEditorLogin', () => {
  it('aborts the pending login when a new one starts', async () => {
    const { isEditorLoginPending, startEditorLogin } = await importService();
    const signals: AbortSignal[] = [];

    mocks.login.mockImplementation(
      ({ signal }: { signal: AbortSignal }) =>
        new Promise<void>((resolve) => {
          signals.push(signal);
          signal.addEventListener('abort', () => resolve());
        })
    );

    const firstLogin = startEditorLogin(createConfiguration());
    startEditorLogin(createConfiguration());

    await firstLogin;

    expect(signals[0]?.aborted).toBe(true);
    expect(signals[1]?.aborted).toBe(false);
    expect(isEditorLoginPending()).toBe(true);
  });

  it('keeps the access key picked during the login', async () => {
    const { resolveEditorAuth, startEditorLogin } = await importService();
    mocks.readCliSessionToken.mockResolvedValue(null);
    mocks.login.mockImplementation(
      async ({
        onCredentials,
      }: {
        onCredentials: (credentials: {
          clientId: string;
          clientSecret: string;
        }) => void;
      }) => onCredentials({ clientId: 'picked-id', clientSecret: 'secret' })
    );
    mocks.getOAuth2AccessToken.mockResolvedValue({
      data: { accessToken: 'picked-token' },
    });

    await startEditorLogin(createConfiguration());

    const auth = await resolveEditorAuth(createConfiguration());
    expect(auth?.accessToken).toBe('picked-token');
  });
});

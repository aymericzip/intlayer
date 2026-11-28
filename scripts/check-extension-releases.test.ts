import { describe, expect, test } from 'bun:test';
import { createHmac } from 'node:crypto';
import {
  createAddonsToken,
  getChromeStoreVersion,
  getFirefoxStoreVersion,
  getMissingMarketplaceTargets,
  getMissingOpenVsxTargets,
  isNewerVersion,
} from './check-extension-releases.ts';

type StubResponse = { status?: number; body: unknown };

/** Serves canned responses by URL prefix and records the requested URLs. */
const createFetchStub = (routes: Record<string, StubResponse>) => {
  const requestedUrls: string[] = [];
  const fetchRequest = async (url: string) => {
    requestedUrls.push(url);
    const route = Object.entries(routes).find(([prefix]) =>
      url.startsWith(prefix)
    );

    if (!route) return new Response('not found', { status: 404 });

    const [, { status = 200, body }] = route;

    return new Response(
      typeof body === 'string' ? body : JSON.stringify(body),
      { status }
    );
  };

  return { fetchRequest, requestedUrls };
};

const targets = ['linux-x64', 'darwin-arm64', 'win32-x64'];

describe('VS Code stores', () => {
  test('lists the Marketplace targets missing at the version', async () => {
    const { fetchRequest } = createFetchStub({
      'https://marketplace.visualstudio.com/': {
        body: {
          results: [
            {
              extensions: [
                {
                  versions: [
                    { version: '9.9.2', targetPlatform: 'linux-x64' },
                    { version: '9.9.1', targetPlatform: 'darwin-arm64' },
                    { version: '9.9.1', targetPlatform: 'win32-x64' },
                  ],
                },
              ],
            },
          ],
        },
      },
    });

    expect(
      await getMissingMarketplaceTargets(
        'intlayer.intlayer-vs-code-extension',
        '9.9.2',
        targets,
        fetchRequest
      )
    ).toEqual(['darwin-arm64', 'win32-x64']);
  });

  test('lists the Open VSX targets answering 404', async () => {
    const { fetchRequest, requestedUrls } = createFetchStub({
      'https://open-vsx.org/api/intlayer/intlayer-vs-code-extension/linux-x64/9.9.2':
        { body: {} },
    });

    expect(
      await getMissingOpenVsxTargets(
        'intlayer.intlayer-vs-code-extension',
        '9.9.2',
        targets,
        fetchRequest
      )
    ).toEqual(['darwin-arm64', 'win32-x64']);
    expect(requestedUrls).toHaveLength(targets.length);
  });

  test('fails when Open VSX answers neither 200 nor 404', async () => {
    const { fetchRequest } = createFetchStub({
      'https://open-vsx.org/': { status: 503, body: 'unavailable' },
    });

    await expect(
      getMissingOpenVsxTargets(
        'intlayer.extension',
        '9.9.2',
        targets,
        fetchRequest
      )
    ).rejects.toThrow('503');
  });
});

describe('Chrome Web Store', () => {
  const extensionId = 'pmlehcgmjmfimmjnembihbakhnheiabc';
  const publishedUpdateCheck = {
    body: `<gupdate><app appid="${extensionId}"><updatecheck codebase="x.crx" version="9.8.3" status="ok"/></app></gupdate>`,
  };

  test('reads the latest upload with OAuth credentials', async () => {
    const { fetchRequest } = createFetchStub({
      'https://www.googleapis.com/oauth2/v4/token': {
        body: { access_token: 'token' },
      },
      'https://www.googleapis.com/chromewebstore/v1.1/items/': {
        body: { crxVersion: '9.9.2', uploadState: 'SUCCESS' },
      },
      'https://clients2.google.com/': publishedUpdateCheck,
    });

    expect(
      await getChromeStoreVersion(
        {
          extensionId,
          clientId: 'id',
          clientSecret: 'secret',
          refreshToken: 'refresh',
        },
        fetchRequest
      )
    ).toBe('9.9.2');
  });

  test('falls back to the published version without credentials', async () => {
    const { fetchRequest, requestedUrls } = createFetchStub({
      'https://clients2.google.com/': publishedUpdateCheck,
    });

    expect(await getChromeStoreVersion({ extensionId }, fetchRequest)).toBe(
      '9.8.3'
    );
    expect(requestedUrls).toHaveLength(1);
  });

  test('falls back to the published version when OAuth fails', async () => {
    const { fetchRequest } = createFetchStub({
      'https://www.googleapis.com/oauth2/v4/token': {
        status: 400,
        body: { error: 'invalid_grant' },
      },
      'https://clients2.google.com/': publishedUpdateCheck,
    });

    expect(
      await getChromeStoreVersion(
        { extensionId, clientId: 'id', refreshToken: 'expired' },
        fetchRequest
      )
    ).toBe('9.8.3');
  });
});

describe('addons.mozilla.org', () => {
  const addonId = 'i18n-scanner@intlayer.org';
  const addonUrl =
    'https://addons.mozilla.org/api/v5/addons/addon/i18n-scanner%40intlayer.org';

  test('reads the newest upload, awaiting review included, with API keys', async () => {
    const { fetchRequest } = createFetchStub({
      [`${addonUrl}/versions/`]: {
        body: { results: [{ version: '9.9.0' }, { version: '9.9.2' }] },
      },
      [`${addonUrl}/`]: { body: { current_version: { version: '9.8.3' } } },
    });

    expect(
      await getFirefoxStoreVersion(
        { addonId, jwtIssuer: 'user:1', jwtSecret: 'secret' },
        fetchRequest
      )
    ).toBe('9.9.2');
  });

  test('falls back to the published version without API keys', async () => {
    const { fetchRequest } = createFetchStub({
      [`${addonUrl}/`]: { body: { current_version: { version: '9.8.3' } } },
    });

    expect(await getFirefoxStoreVersion({ addonId }, fetchRequest)).toBe(
      '9.8.3'
    );
  });

  test('signs a JWT that expires within a minute', () => {
    const token = createAddonsToken('user:1', 'secret', 1_000);
    const [header, payload, signature] = token.split('.');
    const claims = JSON.parse(Buffer.from(payload!, 'base64url').toString());

    expect(claims).toMatchObject({ iss: 'user:1', iat: 1_000, exp: 1_060 });
    expect(signature).toBe(
      createHmac('sha256', 'secret')
        .update(`${header}.${payload}`)
        .digest('base64url')
    );
  });
});

describe('isNewerVersion', () => {
  test('compares numerically, not lexically', () => {
    expect(isNewerVersion('9.10.0', '9.9.2')).toBe(true);
    expect(isNewerVersion('9.9.2', '9.9.2')).toBe(false);
    expect(isNewerVersion('9.8.3', '9.9.2')).toBe(false);
  });
});

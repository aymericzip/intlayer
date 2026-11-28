#!/usr/bin/env bun

/**
 * Compares the VS Code and browser extension versions with what each store
 * already holds, so the release workflow only uploads where a store is behind.
 * Stores refuse a version number twice, and the browser stores review every
 * upload: their check reads the latest upload (in review or not) when the
 * credentials are set, and the published version otherwise.
 *
 * Usage: bun scripts/check-extension-releases.ts <vscode|browser>
 * Writes `<output>=true|false` lines (true: upload needed) to $GITHUB_OUTPUT.
 */

import { createHmac, randomUUID } from 'node:crypto';
import { appendFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  mapConcurrent,
  readWorkspacePackage,
  rootDirectory,
} from './npm-release-utils.ts';
import type { RegistryOptions, WorkspacePackage } from './npm-release-utils.ts';

type FetchRequest = NonNullable<RegistryOptions['fetchRequest']>;

export type ChromeStoreOptions = {
  extensionId: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
};

export type FirefoxStoreOptions = {
  addonId: string;
  jwtIssuer?: string;
  jwtSecret?: string;
};

const browserManifestPath =
  'packages/@intlayer/chrome-extension/public/manifest.json';

/** Fails on any non-2xx answer: a wrong answer would skip or repeat a release. */
const fetchJson = async <Result>(
  url: string,
  init: RequestInit,
  fetchRequest: FetchRequest
): Promise<Result> => {
  const response = await fetchRequest(url, {
    ...init,
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    await response.body?.cancel();
    throw new Error(`${url} answered ${response.status}`);
  }

  return (await response.json()) as Result;
};

/** Whether `candidate` is a newer version than `current`. */
export const isNewerVersion = (candidate: string, current: string) =>
  Bun.semver.order(candidate, current) === 1;

/** Lists the `targets` the VS Code Marketplace does not serve at `version`. */
export const getMissingMarketplaceTargets = async (
  extensionId: string,
  version: string,
  targets: string[],
  fetchRequest: FetchRequest = fetch
): Promise<string[]> => {
  const { results } = await fetchJson<{
    results: {
      extensions: {
        versions: { version: string; targetPlatform?: string }[];
      }[];
    }[];
  }>(
    'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json;api-version=7.2-preview.1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // filterType 7: exact `publisher.name`; flags 1: include versions.
        filters: [{ criteria: [{ filterType: 7, value: extensionId }] }],
        flags: 1,
      }),
    },
    fetchRequest
  );
  const publishedTargets = new Set(
    (results[0]?.extensions[0]?.versions ?? [])
      .filter((entry) => entry.version === version)
      .map(({ targetPlatform }) => targetPlatform)
  );

  return targets.filter((target) => !publishedTargets.has(target));
};

/** Lists the `targets` Open VSX does not serve at `version`. */
export const getMissingOpenVsxTargets = async (
  extensionId: string,
  version: string,
  targets: string[],
  fetchRequest: FetchRequest = fetch
): Promise<string[]> => {
  const [namespace, name] = extensionId.split('.');
  const published = await mapConcurrent(targets, async (target) => {
    const url = `https://open-vsx.org/api/${namespace}/${name}/${target}/${version}`;
    const response = await fetchRequest(url, {
      signal: AbortSignal.timeout(30_000),
    });
    await response.body?.cancel();

    if (response.status !== 200 && response.status !== 404) {
      throw new Error(`${url} answered ${response.status}`);
    }

    return response.ok;
  });

  return targets.filter((_, index) => !published[index]);
};

/** Latest version the Chrome Web Store holds for the extension. */
export const getChromeStoreVersion = async (
  { extensionId, clientId, clientSecret, refreshToken }: ChromeStoreOptions,
  fetchRequest: FetchRequest = fetch
): Promise<string> => {
  if (clientId && refreshToken) {
    try {
      // Same calls as chrome-webstore-upload-cli@3, which uploads afterwards.
      const { access_token: accessToken } = await fetchJson<{
        access_token: string;
      }>(
        'https://www.googleapis.com/oauth2/v4/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          }),
        },
        fetchRequest
      );
      const { crxVersion } = await fetchJson<{ crxVersion?: string }>(
        `https://www.googleapis.com/chromewebstore/v1.1/items/${extensionId}?projection=DRAFT`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'x-goog-api-version': '2',
          },
        },
        fetchRequest
      );

      if (crxVersion) return crxVersion;
    } catch (error) {
      console.warn(
        `::warning::Chrome Web Store upload lookup failed, comparing with the published version: ${(error as Error).message}`
      );
    }
  }

  const updateCheckUrl = new URL(
    'https://clients2.google.com/service/update2/crx'
  );
  updateCheckUrl.searchParams.set('response', 'updatecheck');
  updateCheckUrl.searchParams.set('acceptformat', 'crx3');
  updateCheckUrl.searchParams.set('prodversion', '999.0');
  updateCheckUrl.searchParams.set('x', `id=${extensionId}&uc`);
  const response = await fetchRequest(updateCheckUrl.href, {
    signal: AbortSignal.timeout(30_000),
  });
  const updateCheck = await response.text();
  const publishedVersion = /<updatecheck[^>]*\sversion="([^"]+)"/.exec(
    updateCheck
  )?.[1];

  if (!response.ok || !publishedVersion) {
    throw new Error(
      `Chrome Web Store update check for ${extensionId} returned no version`
    );
  }

  return publishedVersion;
};

/** Signs the short-lived JWT addons.mozilla.org expects from API keys. */
export const createAddonsToken = (
  issuer: string,
  secret: string,
  issuedAtSeconds = Math.floor(Date.now() / 1000)
) => {
  const encode = (value: object) =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
  const unsignedToken = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({
    iss: issuer,
    jti: randomUUID(),
    iat: issuedAtSeconds,
    exp: issuedAtSeconds + 60,
  })}`;
  const signature = createHmac('sha256', secret)
    .update(unsignedToken)
    .digest('base64url');

  return `${unsignedToken}.${signature}`;
};

/** Latest version addons.mozilla.org holds for the add-on. */
export const getFirefoxStoreVersion = async (
  { addonId, jwtIssuer, jwtSecret }: FirefoxStoreOptions,
  fetchRequest: FetchRequest = fetch
): Promise<string> => {
  const addonUrl = `https://addons.mozilla.org/api/v5/addons/addon/${encodeURIComponent(addonId)}`;

  if (jwtIssuer && jwtSecret) {
    try {
      // Newest first; owners also get the versions awaiting review.
      const { results } = await fetchJson<{ results: { version: string }[] }>(
        `${addonUrl}/versions/?filter=all_with_unlisted&page_size=5`,
        {
          headers: {
            Authorization: `JWT ${createAddonsToken(jwtIssuer, jwtSecret)}`,
          },
        },
        fetchRequest
      );
      const latestVersion = results
        .map(({ version }) => version)
        .sort((left, right) => Bun.semver.order(right, left))[0];

      if (latestVersion) return latestVersion;
    } catch (error) {
      console.warn(
        `::warning::addons.mozilla.org upload lookup failed, comparing with the published version: ${(error as Error).message}`
      );
    }
  }

  const { current_version: currentVersion } = await fetchJson<{
    current_version: { version: string };
  }>(`${addonUrl}/`, {}, fetchRequest);

  return currentVersion.version;
};

/** Prints the outputs and hands them to the next workflow jobs. */
const writeOutputs = (outputs: Record<string, boolean>) => {
  const lines = Object.entries(outputs)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  console.log(lines);

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${lines}\n`);
  }
};

const checkVsCode = async () => {
  const { publisher, name, version } = readWorkspacePackage(
    'apps/vscode-extension'
  ) as WorkspacePackage & { publisher: string };
  const extensionId = `${publisher}.${name}`;
  const targets = (process.env.VSCODE_TARGETS ?? '')
    .split(/\s+/)
    .filter(Boolean);

  if (targets.length === 0) throw new Error('VSCODE_TARGETS is empty');

  const [marketplaceTargets, openVsxTargets] = await Promise.all([
    getMissingMarketplaceTargets(extensionId, version, targets),
    getMissingOpenVsxTargets(extensionId, version, targets),
  ]);

  console.log(
    `${extensionId}@${version} missing on the Marketplace: [${marketplaceTargets.join(', ')}], on Open VSX: [${openVsxTargets.join(', ')}]`
  );
  writeOutputs({
    needed: marketplaceTargets.length > 0 || openVsxTargets.length > 0,
  });
};

const checkBrowser = async () => {
  const { version } = readWorkspacePackage();
  const manifest = JSON.parse(
    readFileSync(join(rootDirectory, browserManifestPath), 'utf8')
  ) as {
    version: string;
    browser_specific_settings: { gecko: { id: string } };
  };

  if (manifest.version !== version) {
    throw new Error(
      `${browserManifestPath} is at ${manifest.version}, expected ${version}`
    );
  }

  const extensionId = process.env.CHROME_EXTENSION_ID;

  if (!extensionId) throw new Error('CHROME_EXTENSION_ID is not set');

  const [chromeVersion, firefoxVersion] = await Promise.all([
    getChromeStoreVersion({
      extensionId,
      clientId: process.env.CHROME_CLIENT_ID,
      clientSecret: process.env.CHROME_CLIENT_SECRET,
      refreshToken: process.env.CHROME_REFRESH_TOKEN,
    }),
    getFirefoxStoreVersion({
      addonId: manifest.browser_specific_settings.gecko.id,
      jwtIssuer: process.env.FIREFOX_JWT_ISSUER,
      jwtSecret: process.env.FIREFOX_JWT_SECRET,
    }),
  ]);

  console.log(
    `Extension ${version}; Chrome Web Store holds ${chromeVersion}, addons.mozilla.org holds ${firefoxVersion}`
  );
  writeOutputs({
    chrome: isNewerVersion(version, chromeVersion),
    firefox: isNewerVersion(version, firefoxVersion),
  });
};

if (import.meta.main) {
  const store = process.argv[2];

  if (store === 'vscode') await checkVsCode();
  else if (store === 'browser') await checkBrowser();
  else throw new Error('Usage: check-extension-releases.ts <vscode|browser>');
}

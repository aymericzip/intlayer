import { createServerFn } from '@tanstack/react-start';
import { createRevalidatedMemo } from '~/utils/createRevalidatedMemo';

/** `package_mock.json` on the default branch, the version the hero announces. */
const PACKAGE_MOCK_URL =
  'https://raw.githubusercontent.com/aymericzip/intlayer/main/apps/website/package_mock.json';

/** How long a fetched version is served from memory. */
const LATEST_VERSION_REVALIDATION_INTERVAL_MS = 6 * 60 * 60 * 1000;

const SEMVER_PATTERN = /^\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/;

type PackageMock = {
  version?: unknown;
};

/**
 * Reads the latest released version from the repository.
 *
 * @returns The version, or `null` when GitHub is unreachable or answers with
 * an unexpected payload.
 */
const fetchLatestVersion = async (): Promise<string | null> => {
  try {
    const response = await fetch(PACKAGE_MOCK_URL, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return null;
    }

    const packageMock: PackageMock = await response.json();

    return typeof packageMock.version === 'string' &&
      SEMVER_PATTERN.test(packageMock.version)
      ? packageMock.version
      : null;
  } catch (error) {
    console.error('Error fetching latest version:', error);
    return null;
  }
};

/**
 * Runtime server function, without the static middleware so it reaches the
 * server rather than the build-time payload. The bundled `package_mock.json`
 * stays the rendered base value; this only refreshes it once the page is idle,
 * and the server answers every visitor from one memo refreshed every 6 hours.
 */
export const revalidateLatestVersion = createServerFn({
  method: 'GET',
}).handler(
  createRevalidatedMemo(
    fetchLatestVersion,
    LATEST_VERSION_REVALIDATION_INTERVAL_MS
  )
);

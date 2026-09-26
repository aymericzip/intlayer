import {
  type TechnologyCategory,
  type TechnologySignature,
  technologySignatures,
} from './technologySignatures';
import { getSiteDomain, parseUrl } from './url';

/** A technology detected on the scanned page. */
export type DetectedTechnology = {
  /** Stable identifier, e.g. `nextjs`, `crowdin`. */
  id: string;
  /** Human-readable name, e.g. `Next.js`. */
  name: string;
  category: TechnologyCategory;
  /** Version when it can be read from the page, e.g. `14.2.3`. */
  version?: string;
  /** Short explanation of the signal that triggered the detection. */
  evidence: string;
};

/**
 * Raw signals collected from a page. Every field is optional so each consumer
 * provides what it can: the CLI basic mode only has HTML + scripts, the
 * backend and the extension also read window globals and storage keys.
 */
export type TechnologyDetectionInput = {
  /**
   * URL of the scanned page. Resource URLs on its own site are ignored for
   * third-party services, so the Crowdin website is not reported as using
   * Crowdin because it loads its own favicon.
   */
  pageUrl?: string;
  /** HTML document, inline scripts included. */
  html?: string;
  /** Script / stylesheet / iframe / network request URLs. */
  resourceUrls?: string[];
  /** Contents of the same-origin JavaScript chunks. */
  scripts?: string[];
  /** Names of the window globals that exist on the page. */
  globals?: string[];
  /** Cookie / web-storage keys found on the page. */
  storageKeys?: string[];
  /** Live-DOM markers, see {@link TechnologySignature.domMarkers}. */
  domMarkers?: string[];
  /** Values read from {@link TechnologySignature.versionGlobal} paths. */
  globalVersions?: Record<string, string>;
};

/** Largest script prefix scanned per chunk, to bound regex cost. */
const MAX_SCRIPT_LENGTH = 5_000_000;

/** Shorten a matched snippet for display in the evidence. */
const truncate = (text: string, maxLength = 60): string =>
  text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;

type SignatureMatch = { evidence: string; version?: string };

/** Return the first signal of `signature` found in `input`, if any. */
const matchSignature = (
  signature: TechnologySignature,
  input: TechnologyDetectionInput,
  lowerCaseStorageKeys: Set<string>
): SignatureMatch | undefined => {
  const versionFromGlobal = signature.versionGlobal
    ? input.globalVersions?.[signature.versionGlobal]
    : undefined;

  for (const globalName of signature.globals ?? []) {
    if (input.globals?.includes(globalName)) {
      return { evidence: `window.${globalName}`, version: versionFromGlobal };
    }
  }

  if (versionFromGlobal) {
    return {
      evidence: `window.${signature.versionGlobal}`,
      version: versionFromGlobal,
    };
  }

  for (const domMarker of signature.domMarkers ?? []) {
    if (input.domMarkers?.includes(domMarker)) {
      return { evidence: `${domMarker} DOM marker` };
    }
  }

  for (const storageKey of signature.storageKeys ?? []) {
    if (lowerCaseStorageKeys.has(storageKey.toLowerCase())) {
      return { evidence: `"${storageKey}" cookie / storage key` };
    }
  }

  for (const pattern of signature.html ?? []) {
    const match = input.html?.match(pattern);
    if (match) {
      return {
        evidence: `HTML contains "${truncate(match[0])}"`,
        version: match[1],
      };
    }
  }

  const isThirdPartyService =
    signature.category === 'tms' || signature.category === 'translation-proxy';
  const pageHostname = input.pageUrl
    ? parseUrl(input.pageUrl)?.hostname
    : undefined;
  const isOwnSite = (url: string): boolean => {
    const hostname = parseUrl(url)?.hostname;
    return (
      Boolean(pageHostname && hostname) &&
      getSiteDomain(hostname as string) ===
        getSiteDomain(pageHostname as string)
    );
  };

  for (const pattern of signature.resourceUrls ?? []) {
    const resourceUrl = input.resourceUrls?.find(
      (url) => pattern.test(url) && !(isThirdPartyService && isOwnSite(url))
    );
    if (resourceUrl) {
      return { evidence: `loads ${truncate(resourceUrl, 90)}` };
    }
  }

  for (const pattern of signature.bundle ?? []) {
    for (const script of input.scripts ?? []) {
      const match = script.slice(0, MAX_SCRIPT_LENGTH).match(pattern);
      if (match) {
        return {
          evidence: `JavaScript bundle contains "${truncate(match[0])}"`,
          version: match[1],
        };
      }
    }
  }

  return undefined;
};

/**
 * Every window global and version path referenced by the signatures. Live-page
 * collectors (extension, puppeteer) read these and pass back the ones present.
 */
export const getTechnologyGlobalNames = (): {
  globals: string[];
  versionGlobals: string[];
} => ({
  globals: [
    ...new Set(
      technologySignatures.flatMap((signature) => signature.globals ?? [])
    ),
  ],
  versionGlobals: technologySignatures.flatMap((signature) =>
    signature.versionGlobal ? [signature.versionGlobal] : []
  ),
});

/**
 * Detect the frameworks, i18n libraries, TMS and translation proxies used by a
 * page from the raw signals collected on it.
 *
 * @param input - The {@link TechnologyDetectionInput} signals.
 * @param signatures - Fingerprints to test, defaults to {@link technologySignatures}.
 * @returns Detected technologies, in signature order.
 */
export const detectTechnologies = (
  input: TechnologyDetectionInput,
  signatures: readonly TechnologySignature[] = technologySignatures
): DetectedTechnology[] => {
  const lowerCaseStorageKeys = new Set(
    (input.storageKeys ?? []).map((key) => key.toLowerCase())
  );

  const matchedTechnologies: DetectedTechnology[] = [];
  for (const signature of signatures) {
    const match = matchSignature(signature, input, lowerCaseStorageKeys);
    if (!match) continue;
    matchedTechnologies.push({
      id: signature.id,
      name: signature.name,
      category: signature.category,
      version: match.version || undefined,
      evidence: match.evidence,
    });
  }

  const signatureById = new Map(
    signatures.map((signature) => [signature.id, signature])
  );
  const getIds = (technologies: DetectedTechnology[]): Set<string> =>
    new Set(technologies.map(({ id }) => id));

  // Requirements first, so a dropped technology cannot hide another one.
  const matchedIds = getIds(matchedTechnologies);
  const supportedTechnologies = matchedTechnologies.filter(
    ({ id }) =>
      !signatureById
        .get(id)
        ?.requires?.some((requiredId) => !matchedIds.has(requiredId))
  );

  const supportedIds = getIds(supportedTechnologies);
  return supportedTechnologies.filter(
    ({ id }) =>
      !signatureById
        .get(id)
        ?.hiddenBy?.some((hidingId) => supportedIds.has(hidingId))
  );
};

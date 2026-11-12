import type { ModelContext, ModelContextHost } from './types';

/** The permissions-policy feature gating tool registration. */
const WEBMCP_POLICY_FEATURE = 'tools';

type PermissionsPolicy = { allowsFeature?: (feature: string) => boolean };

/**
 * Whether the document's permissions policy lets it register WebMCP tools.
 * Frames without `allow="tools"` are denied; browsers without the policy API
 * are assumed allowed.
 */
export const isWebMCPAllowedByPolicy = (): boolean => {
  if (typeof document === 'undefined') return false;

  const policyHost = document as Document & {
    permissionsPolicy?: PermissionsPolicy;
    featurePolicy?: PermissionsPolicy;
  };
  const policy = policyHost.permissionsPolicy ?? policyHost.featurePolicy;

  if (typeof policy?.allowsFeature !== 'function') return true;

  try {
    return policy.allowsFeature(WEBMCP_POLICY_FEATURE);
  } catch {
    return true;
  }
};

/**
 * Resolves the WebMCP entry point exposed by the current browser, if any.
 *
 * Candidates are probed in order: `navigator.modelContextTesting` (Chrome with
 * the `#enable-webmcp-testing` flag), `navigator.modelContext` (Chrome early
 * preview / origin trial) and `document.modelContext` (W3C draft). Only an
 * object able to register tools is returned, so callers can rely on
 * `registerTool` being present. Returns `null` when the permissions policy
 * denies the `tools` feature (e.g. the page is framed without `allow="tools"`).
 *
 * @returns The model context, or `null` outside a supporting browser.
 */
export const getModelContext = (): ModelContext | null => {
  if (typeof navigator === 'undefined') return null;

  const navigatorHost = navigator as Navigator & ModelContextHost;
  const documentHost =
    typeof document === 'undefined'
      ? undefined
      : (document as Document & ModelContextHost);

  const candidates: (ModelContext | undefined)[] = [
    navigatorHost.modelContextTesting,
    navigatorHost.modelContext,
    documentHost?.modelContext,
  ];

  const modelContext =
    candidates.find(
      (candidate) => typeof candidate?.registerTool === 'function'
    ) ?? null;

  if (!modelContext || !isWebMCPAllowedByPolicy()) return null;

  return modelContext;
};

/** Whether the current browser exposes a usable WebMCP entry point. */
export const isWebMCPAvailable = (): boolean => getModelContext() !== null;

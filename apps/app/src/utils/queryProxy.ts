/**
 * Query proxy utilities for TanStack Start.
 * In TanStack Router, use useLocation() and useSearch() hooks instead.
 */

// Stub for compatibility - not used in TanStack Start
export const queryProxy = () => null;

export const getQueryParams = async () => {
  return { redirectUrl: null, url: '', pathname: '/' };
};

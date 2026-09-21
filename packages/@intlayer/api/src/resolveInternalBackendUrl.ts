import { editor } from '@intlayer/config/built';

/**
 * Server-only override for the backend origin.
 *
 * The backend URL compiled into the bundle is the one the *browser* reaches
 * (`http://localhost:3100`, `https://back.intlayer.org`). When the dashboard is
 * server-rendered inside a private network — a Docker Compose stack, a
 * Kubernetes pod — that origin is often not routable from the rendering
 * process itself, while a service name such as `http://backend:3100` is.
 */
export const BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE =
  'INTLAYER_BACKEND_INTERNAL_URL';

/**
 * Reads the internal backend origin, if the current runtime declares one.
 * Always `undefined` in the browser, where `process` does not exist.
 */
const getInternalBackendOrigin = (): string | undefined =>
  typeof process === 'undefined'
    ? undefined
    : process.env?.[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE]?.trim() ||
      undefined;

/**
 * Rewrites a request URL aimed at the public backend origin to the internal
 * one, when `INTLAYER_BACKEND_INTERNAL_URL` is set on the server.
 *
 * Only requests to the configured backend origin are touched; any other host
 * (a third-party API, an absolute asset URL) passes through unchanged.
 *
 * @param url - The absolute request URL.
 * @param publicBackendUrl - The browser-facing backend URL the bundle was built
 *   with. Defaults to the compiled `editor.backendURL`.
 * @returns The URL to fetch.
 */
export const resolveInternalBackendUrl = (
  url: string,
  publicBackendUrl: string | undefined = editor.backendURL
): string => {
  const internalOrigin = getInternalBackendOrigin();

  if (!internalOrigin || !publicBackendUrl) return url;

  try {
    const target = new URL(url);
    const publicOrigin = new URL(publicBackendUrl).origin;

    if (target.origin !== publicOrigin) return url;

    const internal = new URL(internalOrigin);

    target.protocol = internal.protocol;
    target.host = internal.host;

    return target.toString();
  } catch {
    return url;
  }
};

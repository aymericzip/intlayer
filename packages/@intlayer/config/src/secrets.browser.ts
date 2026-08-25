/**
 * Browser stub for {@link file://./secrets.ts}.
 *
 * Selected through the `browser` export condition of
 * `@intlayer/config/secrets`, so a client bundle resolves the credential
 * accessor to an inert function instead of pulling the configuration loader —
 * and the secret itself — into a public asset.
 */

/**
 * Always `undefined` in the browser: the CMS client secret grants project-wide
 * API access and must never leave the server.
 *
 * @returns `undefined`.
 */
export const getEditorClientSecret = (): string | undefined => undefined;

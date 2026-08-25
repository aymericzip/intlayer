/**
 * Server-only access to the sensitive parts of the Intlayer configuration.
 *
 * `@intlayer/config/built` is aliased by every framework integration to a
 * generated file that the bundle **inlines**, and the same alias is installed
 * for the client and the server build. Anything it carries that browser code
 * imports therefore ends up in a public asset, which is why the generated file
 * never contains `editor.clientSecret`.
 *
 * This module is the server-side counterpart. It is deliberately *not* aliased:
 * it resolves through the package's export map, whose `browser` condition
 * points at {@link file://./secrets.browser.ts} — an inert stub. Every
 * major bundler (webpack, Rspack, Turbopack, Vite, Rollup, esbuild, Metro)
 * honours that condition, so a browser build resolves to the stub without any
 * integration-specific configuration.
 *
 * It intentionally imports nothing: pulling the configuration loader in here
 * would drag the whole resolved configuration — and the machinery that builds
 * it — into every server bundle that touches a credentialed API.
 *
 * @example
 * ```ts
 * import { getEditorClientSecret } from '@intlayer/config/secrets';
 *
 * const clientSecret = config.editor.clientSecret ?? getEditorClientSecret();
 * ```
 */

/**
 * Returns the CMS client secret from the environment, or `undefined` when it is
 * not set.
 *
 * The configuration file stays the source of truth for *whether* credentials
 * are active — a project opts in by wiring `clientId` (conventionally
 * `clientId: process.env.INTLAYER_CLIENT_ID`), and callers gate on the public
 * `editor.clientId` from `@intlayer/config/built` before asking for the secret.
 * This function only supplies the confidential half, which the generated
 * configuration deliberately does not carry.
 *
 * @returns The OAuth2 client secret, or `undefined`.
 */
export const getEditorClientSecret = (): string | undefined =>
  typeof process === 'undefined'
    ? undefined
    : process.env?.INTLAYER_CLIENT_SECRET;

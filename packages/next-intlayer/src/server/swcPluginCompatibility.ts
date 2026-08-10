import { compareVersions } from '@intlayer/config/utils';

/**
 * Oldest Next.js release whose bundled SWC can load the `@intlayer/swc` Wasm
 * plugin.
 *
 * A Wasm plugin only loads in a host that speaks its `swc_ecma_ast` schema.
 * Next.js 16.1.0 is the first release built on SWC's forward-compatible plugin
 * ABI — the AST travels as self-describing CBOR instead of rkyv, so a plugin
 * compiled against an older `swc_core` keeps loading in newer hosts. Every
 * earlier release uses the rkyv ABI, which requires an exact schema match and
 * rejects the plugin outright, failing the build with `failed to invoke
 * plugin`.
 *
 * Verified by driving `transformSync` on the shipped `@next/swc` binaries with
 * the plugin attached:
 *
 * | Next.js | swc_ecma_ast | plugin loads |
 * | ------- | ------------ | ------------ |
 * | 14.2.x  | 0.112.7      | no           |
 * | 15.5.x  | 14.0.0       | no           |
 * | 16.0.x  | 16.0.0       | no           |
 * | 16.1.x  | 19.0.0       | yes          |
 * | 16.2.x  | 20.0.1       | yes          |
 * | 16.3.x  | 25.0.0       | yes          |
 *
 * Keep in sync with the `swc_core` pin in
 * `packages/@intlayer/swc/Cargo.toml`: the plugin must stay on the
 * `swc_ecma_ast` version this Next.js release ships, never a newer one, or the
 * floor moves up with it.
 */
export const MINIMUM_SWC_PLUGIN_NEXT_VERSION = '16.1.0';

/**
 * Whether `nextVersion` bundles an SWC able to load the `@intlayer/swc` Wasm
 * plugin.
 *
 * Pre-releases of a supported version (`16.1.0-canary.4`, `16.3.0-preview.5`)
 * count as supported: they track the release they lead to, and opting into a
 * canary already means opting into its churn.
 *
 * @param nextVersion - Version string read from the project's `next/package.json`.
 * @returns `true` when the plugin can be registered in `experimental.swcPlugins`.
 *
 * @example
 * ```ts
 * getIsSwcPluginSupported('16.3.0'); // true
 * getIsSwcPluginSupported('15.5.18'); // false
 * ```
 */
export const getIsSwcPluginSupported = (nextVersion: string): boolean =>
  compareVersions(nextVersion, '≥', MINIMUM_SWC_PLUGIN_NEXT_VERSION);

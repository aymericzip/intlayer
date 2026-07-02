/**
 * Caller registry — re-exported from the shared source of truth in
 * `@intlayer/config/callers`.
 *
 * The descriptors are shared with `@intlayer/babel` (usage analysis + optimize
 * rewrite), `@intlayer/swc` (via `toSwcExtraCallers`) and every compat
 * package's bundler plugin, so a compat library declared once in
 * `@intlayer/config/src/callers/compat/<lib>.ts` is supported everywhere.
 *
 * Editor-specific matching helpers built on top of the registry live in
 * `./patterns.ts`.
 */
export * from '@intlayer/config/callers';

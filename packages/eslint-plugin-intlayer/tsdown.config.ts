import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

/**
 * Sub-paths of `@intlayer/config` inlined into the bundle rather than imported
 * at runtime.
 *
 * An ESLint plugin loads under whatever `@intlayer/config` the *host* project
 * has installed, which is frequently older than the one this package was built
 * against. A missing sub-path there is not a soft failure: Node raises
 * `ERR_PACKAGE_PATH_NOT_EXPORTED` while resolving the import and the whole lint
 * run dies before a single rule executes.
 *
 * `extract` is pure, dependency-free logic (the `shouldExtract` heuristic and
 * the extractable-attribute list), so inlining it costs a few hundred bytes and
 * removes the version coupling entirely — while keeping one source of truth in
 * the repo, so `no-raw-text` still reports exactly what `intlayer extract`
 * would rewrite.
 *
 * Sub-paths deliberately left external are the ones whose *content* should
 * track the host project: `callers` carries the compat-library registry, so a
 * project on a newer `@intlayer/config` gets its newer libraries recognised
 * without waiting for a plugin release.
 */
const BUNDLED_SUBPATHS = [/^@intlayer\/config\/extract$/];

/**
 * Type-only packages inlined into the emitted `.d.ts`.
 *
 * `@types/estree` is a devDependency: the AST helpers reference its `Node` type,
 * and inlining it means a consumer never has to install it just to typecheck
 * against this package.
 */
const BUNDLED_TYPE_PACKAGES = ['@types/estree'];

export default defineConfig(
  getOptions({
    all: {
      deps: {
        // `neverBundle` is left to the shared config, which already externalises
        // every dependency; `alwaysBundle` opts this one sub-path back in.
        alwaysBundle: BUNDLED_SUBPATHS,
        // …and nothing else may end up inlined: the build fails if it does.
        onlyBundle: [...BUNDLED_SUBPATHS, ...BUNDLED_TYPE_PACKAGES],
      },
    },
  }) as UserConfig[]
);

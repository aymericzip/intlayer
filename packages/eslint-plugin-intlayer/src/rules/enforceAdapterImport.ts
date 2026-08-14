import { COMPAT_CALLERS } from '@intlayer/config/callers';
import { type AstNode, toAstNode } from '../utils/ast';
import { createRule } from '../utils/createRule';

type MessageIds = 'useAdapterImport';

const ADAPTER_SCOPE = '@intlayer/';

/**
 * Original third-party library specifier → the `@intlayer/*` adapter that
 * replaces it, e.g. `next-intl` → `@intlayer/next-intl`.
 *
 * Derived from the shared registry rather than hard-coded: every compat
 * descriptor lists both its original specifiers and their adapter equivalents in
 * `importSources`, so a library added to `@intlayer/config/callers` is covered
 * here for free.
 *
 * Built from `COMPAT_CALLERS` only, never `ALL_CALLERS`. Intlayer's own packages
 * are not a migration pair: `BASE_CALLERS` lists `intlayer` alongside
 * `@intlayer/core` because `getIntlayer` is importable from both, and treating
 * the scoped one as an "adapter" would tell users to rewrite ordinary
 * `from 'intlayer'` imports.
 *
 * Sub-paths line up by position within a descriptor — `next-intl/server` and
 * `@intlayer/next-intl/server` are listed together — so the mapping is built by
 * matching each original against the adapter that ends with the same tail.
 */
const buildAdapterMap = (): Map<string, string> => {
  const adapterBySpecifier = new Map<string, string>();

  for (const descriptor of COMPAT_CALLERS) {
    const adapters = descriptor.importSources.filter((source) =>
      source.startsWith(ADAPTER_SCOPE)
    );

    if (adapters.length === 0) continue;

    const originals = descriptor.importSources.filter(
      (source) => !source.startsWith(ADAPTER_SCOPE)
    );

    for (const original of originals) {
      // `next-intl/server` → prefer `@intlayer/next-intl/server` over
      // `@intlayer/next-intl`, so match on the longest shared suffix.
      const adapter =
        adapters.find(
          (candidate) => candidate === `${ADAPTER_SCOPE}${original}`
        ) ??
        adapters.find((candidate) => candidate.endsWith(`/${original}`)) ??
        adapters[0];

      if (adapter && !adapterBySpecifier.has(original)) {
        adapterBySpecifier.set(original, adapter);
      }
    }
  }

  return adapterBySpecifier;
};

const ADAPTER_BY_SPECIFIER = buildAdapterMap();

export const enforceAdapterImport = createRule<[], MessageIds>(
  'enforce-adapter-import',
  {
    meta: {
      type: 'suggestion',
      fixable: 'code',
      docs: {
        description:
          'Import compat-library APIs from their `@intlayer/*` adapter rather than the original package',
      },
      messages: {
        useAdapterImport:
          'Import from `{{adapter}}` instead of `{{original}}`. The original specifier only resolves to Intlayer when the bundler alias is configured; the adapter always does.',
      },
    },

    create: (context) => {
      /** Report and rewrite a module specifier that has an adapter equivalent. */
      const checkSource = (node: AstNode | null | undefined): void => {
        if (!node) return;

        const original = node['value'];

        if (typeof original !== 'string') return;

        const adapter = ADAPTER_BY_SPECIFIER.get(original);

        if (!adapter) return;

        context.report({
          node: node as never,
          messageId: 'useAdapterImport',
          data: { adapter, original },
          fix: (fixer) => {
            const raw = (node['raw'] as string | undefined) ?? `'${original}'`;
            const quote = raw.startsWith('"') ? '"' : "'";

            return fixer.replaceText(
              node as never,
              `${quote}${adapter}${quote}`
            );
          },
        });
      };

      return {
        ImportDeclaration: (node) => {
          checkSource(toAstNode(node)['source'] as AstNode);
        },

        ExportNamedDeclaration: (node) => {
          checkSource(toAstNode(node)['source'] as AstNode);
        },

        ExportAllDeclaration: (node) => {
          checkSource(toAstNode(node)['source'] as AstNode);
        },

        ImportExpression: (node) => {
          checkSource(toAstNode(node)['source'] as AstNode);
        },
      };
    },
  }
);

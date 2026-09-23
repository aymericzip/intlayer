---
name: intlayer-compat
description: Migrates an existing i18n library (i18next, react-i18next, next-intl, next-i18next, react-intl, vue-i18n, Lingui…) to Intlayer through compat adapters that keep the original API. Use when the user asks to "migrate from i18next / next-intl / vue-i18n", "keep useTranslation working", or adopt Intlayer without rewriting translation calls.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, migration, i18next, next-intl, react-intl, vue-i18n, lingui]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Compat Adapters

Compat adapters expose the **exact same public API** as an existing i18n library, but serve translations from Intlayer dictionaries. Application code keeps calling `useTranslation`, `useTranslations`, `useIntl`, `$t`… with keys typed against the Intlayer dictionaries.

## How it works

1. Run `npx intlayer init --interactive`: it creates `intlayer.config.ts`, installs the adapter and can keep existing JSON catalogs as the source of truth via a sync plugin.
2. Register the adapter's bundler plugin (`<adapter>/plugin`). It aliases the original imports to the adapter at build time, so no import is rewritten by hand.

## Adapters

| Existing library                | Adapter                   | Bundler plugin (`<adapter>/plugin`) |
| ------------------------------- | ------------------------- | ----------------------------------- |
| `i18next`                       | `@intlayer/i18next`       | `i18nextVitePlugin`                 |
| `react-i18next`                 | `@intlayer/react-i18next` | `reactI18nextVitePlugin`            |
| `next-i18next`                  | `@intlayer/next-i18next`  | `createNextI18nPlugin`              |
| `next-intl`                     | `@intlayer/next-intl`     | `createNextIntlPlugin`              |
| `use-intl`                      | `@intlayer/use-intl`      | `useIntlVitePlugin`                 |
| `react-intl`                    | `@intlayer/react-intl`    | `reactIntlVitePlugin`               |
| `vue-i18n`                      | `@intlayer/vue-i18n`      | `vueI18nVitePlugin`                 |
| `@lingui/core`, `@lingui/react` | `@intlayer/lingui`        | `linguiVitePlugin`                  |

> Lingui: keep the Lingui macro plugin (`@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin`) running before the Intlayer compiler.

> Features outside translation stay with the original library, e.g. `next-intl/navigation` (`Link`, `redirect`, `usePathname`). ICU messages (plural, select, `#`, formatted arguments) and rich formatting (`t.rich`, `<Trans>`) are resolved by Intlayer.

Migration guides also exist for Nuxt I18n, NGX Translate, Transloco, Svelte I18n, Next Translate, Polyglot.js and i18n-js.

## Keep Existing Catalogs: Sync Plugins

To keep the current library **and** its message files, register a sync plugin in the `plugins` of `intlayer.config.ts` instead of (or alongside) an adapter. Intlayer then manages the catalogs (AI fill, CI tests, CMS) without changing the rendering runtime.

| Catalog format | Package                      | Plugins                |
| -------------- | ---------------------------- | ---------------------- |
| JSON           | `@intlayer/sync-json-plugin` | `syncJSON`, `loadJSON` |
| Gettext PO     | `@intlayer/sync-po-plugin`   | `syncPO`, `loadPO`     |

- `sync*` reads **and writes back** the files, keeping them in sync with the dictionaries.
- `load*` only loads the files into dictionaries (never writes back), e.g. for catalogs fetched from a remote source.
- `syncJSON` accepts `format: 'intlayer' | 'icu' | 'i18next' | 'vue-i18n'` to match the message syntax of the existing library.
- Current scope: plain text and translations; insertions, plurals/ICU and the visual editor are not supported yet for synced files.

## After migrating

Once the app runs on Intlayer, components can be moved progressively to the native API (`useIntlayer` + `.content` files) and the adapter removed.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Plugins

- [Sync JSON](https://intlayer.org/doc/plugin/sync-json.md)
- [Sync PO](https://intlayer.org/doc/plugin/sync-po.md)

### Migration Guides

- [Compat Adapters Overview](https://intlayer.org/doc/compatibility.md)
- [i18next](https://intlayer.org/doc/compatibility/i18next.md)
- [react-i18next](https://intlayer.org/doc/compatibility/react-i18next.md)
- [next-i18next](https://intlayer.org/doc/compatibility/next-i18next.md)
- [next-intl](https://intlayer.org/doc/compatibility/next-intl.md)
- [React Intl](https://intlayer.org/doc/compatibility/react-intl.md)
- [Vue I18n](https://intlayer.org/doc/compatibility/vue-i18n.md)
- [Lingui](https://intlayer.org/doc/compatibility/lingui.md)
- [NuxtJS I18n](https://intlayer.org/doc/compatibility/nuxtjs-i18n.md)
- [NGX Translate](https://intlayer.org/doc/compatibility/ngx-translate.md)
- [Transloco](https://intlayer.org/doc/compatibility/transloco.md)
- [Svelte I18n](https://intlayer.org/doc/compatibility/svelte-i18n.md)
- [Next Translate](https://intlayer.org/doc/compatibility/next-translate.md)
- [Polyglot.js](https://intlayer.org/doc/compatibility/polyglot.md)
- [i18n-js](https://intlayer.org/doc/compatibility/i18n-js.md)

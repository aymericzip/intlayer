# prettier-plugin-intlayer

Prettier plugin for [Intlayer](https://intlayer.org). It puts the keys of your
translations in a fixed order every time Prettier formats a file.

| Helper     | Order                                                           |
| ---------- | --------------------------------------------------------------- |
| `t()`      | pinned locales (`en`), then alphabetical                        |
| `plural()` | CLDR: `zero`, `one`, `two`, `few`, `many`, `other`              |
| `enu()`    | ascending threshold, `fallback` last (only if behavior-safe)    |
| `select()` | alphabetical, `fallback` last (implicit last-key fallback kept) |

The serialized `.content.json` nodes (`{ "nodeType": "translation", … }`) are
sorted the same way.

## Installation

```bash
npm install --save-dev prettier prettier-plugin-intlayer
```

Or let `intlayer init prettier` install and configure it.

## Usage

```json
{
  "plugins": ["prettier-plugin-intlayer"],
  "intlayerPinnedLocales": ["en"],
  "intlayerSortContentKeys": false
}
```

| Option                                  | Default  | Description                                                                        |
| --------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | Locales kept first in `t()`, in this order. `[]` sorts them all.                   |
| `intlayerSortContentKeys`               | `false`  | In `*.content.*` files, also sort the dictionary content keys and nested objects.  |
| `intlayerCollapseIdenticalTranslations` | `true`   | In `*.content.*` files, `t({ en: 'Next.js', fr: 'Next.js' })` becomes `'Next.js'`. |

Objects holding a spread, a computed key, a method or a duplicated key are
left untouched. Comments move with their key.

Prettier runs one plugin per parser: if another plugin also replaces the JS/TS
parsers (e.g. `prettier-plugin-tailwindcss`), scope this one to `*.content.*`
files with an override.

Documentation: https://intlayer.org/doc/prettier

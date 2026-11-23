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

| Option                                  | Default  | Description                                                                                                                 |
| --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | Locales kept first in `t()`, in this order. `[]` sorts them all.                                                            |
| `intlayerSortContentKeys`               | `false`  | In `*.content.*` files, also sort the dictionary content keys and nested objects.                                           |
| `intlayerCollapseIdenticalTranslations` | `true`   | In `*.content.*` files, `t({ en: 'Next.js', fr: 'Next.js' })` becomes `'Next.js'`.                                          |
| `intlayerNodeValueAccess`               | `true`   | `alt={content.alt}` becomes `alt={content.alt.value}`, `<h1>{content.title.value}</h1>` becomes `<h1>{content.title}</h1>`. |

With `editor.enabled: true`, an Intlayer node is a renderable node rather than a
string; `intlayerNodeValueAccess` appends `.value` wherever a string is
required (native element attribute, string method) so the types keep holding.
Template literals, concatenation and `String()` accept any type and are left
alone. It also turns `<h1>{content.title.value}</h1>`
into `<h1>{content.title}</h1>` (React, Next.js, Preact, Solid, React Native),
so the visual editor can select the text.

Objects holding a spread, a computed key, a method or a duplicated key are
left untouched. Comments move with their key.

Prettier runs one plugin per parser: if another plugin also replaces the JS/TS
parsers (e.g. `prettier-plugin-tailwindcss`), scope this one to `*.content.*`
files with an override.

Documentation: https://intlayer.org/doc/prettier

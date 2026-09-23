---
name: intlayer-astro
description: Integrates Intlayer internationalization with Astro applications. Use when the user asks to "setup Astro i18n", use "getIntlayer" in Astro components, or manage server-side content in Astro.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Astro Usage

## Setup

- [Astro](https://intlayer.org/doc/environment/astro.md)

The `intlayer()` integration in `astro.config.ts` builds the dictionaries and adds a middleware that resolves the locale of every request into `Astro.locals.intlayer`.

## Server-side (Astro Components)

```astro
---
import { useIntlayer, useLocale } from "astro-intlayer";

// Locale resolved by the middleware (e.g. /es/about -> 'es')
const { locale } = useLocale();
const content = useIntlayer("my-dictionary-key");
---
<h1>{content.title}</h1>
```

## Framework Islands

Islands use their framework package (`react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `lit-intlayer`) and receive the server-detected locale as a prop.

## Compiler

The [Intlayer Compiler](https://intlayer.org/doc/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Astro](https://intlayer.org/doc/environment/astro.md)
- [Astro and React](https://intlayer.org/doc/environment/astro/react.md)
- [Astro and Vue](https://intlayer.org/doc/environment/astro/vue.md)
- [Astro and Svelte](https://intlayer.org/doc/environment/astro/svelte.md)
- [Astro and Solid](https://intlayer.org/doc/environment/astro/solid.md)
- [Astro and Preact](https://intlayer.org/doc/environment/astro/preact.md)
- [Astro and Lit](https://intlayer.org/doc/environment/astro/lit.md)

### Concepts

- [Variants](https://intlayer.org/doc/concept/variants.md)
- [Collections](https://intlayer.org/doc/concept/collections.md)
- [Compiler](https://intlayer.org/doc/compiler.md)
- [Formatters (number, currency, date, …)](https://intlayer.org/doc/formatters.md)

### Packages

- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [Astro Intlayer Exports](https://intlayer.org/doc/packages/astro-intlayer/exports.md)
- [astro-intlayer intlayer](https://intlayer.org/doc/packages/astro-intlayer/intlayer.md)
- [astro-intlayer onRequest](https://intlayer.org/doc/packages/astro-intlayer/onRequest.md)
- [astro-intlayer useDictionary](https://intlayer.org/doc/packages/astro-intlayer/useDictionary.md)
- [astro-intlayer useIntlayer](https://intlayer.org/doc/packages/astro-intlayer/useIntlayer.md)
- [astro-intlayer useLocale](https://intlayer.org/doc/packages/astro-intlayer/useLocale.md)

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

- [Astro](references/environment_astro.md)

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

The [Intlayer Compiler](references/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Astro](references/environment_astro.md)
- [Astro and React](references/environment_astro_react.md)
- [Astro and Vue](references/environment_astro_vue.md)
- [Astro and Svelte](references/environment_astro_svelte.md)
- [Astro and Solid](references/environment_astro_solid.md)
- [Astro and Preact](references/environment_astro_preact.md)
- [Astro and Lit](references/environment_astro_lit.md)

### Concepts

- [Variants](references/concept_variants.md)
- [Collections](references/concept_collections.md)
- [Compiler](references/compiler.md)
- [Formatters (number, currency, date, …)](references/formatters.md)

### Packages

- [Intlayer Exports](references/packages_intlayer_exports.md)
- [Astro Intlayer Exports](references/packages_astro-intlayer_exports.md)
- [astro-intlayer intlayer](references/packages_astro-intlayer_intlayer.md)
- [astro-intlayer onRequest](references/packages_astro-intlayer_onRequest.md)
- [astro-intlayer useDictionary](references/packages_astro-intlayer_useDictionary.md)
- [astro-intlayer useIntlayer](references/packages_astro-intlayer_useIntlayer.md)
- [astro-intlayer useLocale](references/packages_astro-intlayer_useLocale.md)

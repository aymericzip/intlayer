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

## Server-side (Astro Components)

```astro
---
import { getIntlayer } from "astro-intlayer";
const content = await getIntlayer("my-dictionary-key");
---
<h1>{content.title}</h1>
```

[Astro Documentation](references/environment_astro.md)

## References

- [Website](https://intlayer.org)
- [Doc](references/concept_cli.md)

- [Astro](references/environment_astro.md)
- [Intlayer Exports](references/packages_intlayer_exports.md)
- [Astro Intlayer Exports](references/packages_astro-intlayer_exports.md)

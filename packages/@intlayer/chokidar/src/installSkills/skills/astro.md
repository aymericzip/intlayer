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
  version: 8.1.2
---

# Intlayer Astro Usage

## Setup

- [Astro](https://intlayer.org/doc/environment/astro.md)

## Server-side (Astro Components)

```astro
---
import { getIntlayer } from "astro-intlayer";
const content = await getIntlayer("my-dictionary-key");
---
<h1>{content.title}</h1>
```

[Astro Documentation](https://intlayer.org/doc/packages/astro-intlayer.md)

## References

- [Astro](https://intlayer.org/doc/environment/astro.md)
- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [Astro Intlayer Exports](https://intlayer.org/doc/packages/astro-intlayer/exports.md)

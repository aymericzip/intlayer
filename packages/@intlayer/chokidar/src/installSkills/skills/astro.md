---
name: Intlayer Astro
description: Astro-specific usage and getIntlayer
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

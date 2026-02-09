# Intlayer Astro Usage

## Server-side (Astro Components)

```astro
---
import { getIntlayer } from "astro-intlayer";
const content = await getIntlayer("my-dictionary-key");
---
<h1>{content.title}</h1>
```

[Astro Documentation](https://intlayer.org/doc/packages/astro-intlayer)

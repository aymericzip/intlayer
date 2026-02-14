---
name: intlayer-preact
description: Integrates Intlayer internationalization with Preact applications. Use when the user asks to "setup Preact i18n", use the "useIntlayer" hook in Preact, or manage locales in a Preact app.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: @intlayer/mcp
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
  version: 8.1.2
---

# Intlayer Preact Usage

## Setup

- [Vite and Preact](https://intlayer.org/doc/environment/vite-and-preact.md)

## useIntlayer Hook

```tsx
import { useIntlayer } from "preact-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");

  return (
    <div>
      <h1>
        {/* Return react node */}
        {content.title}
      </h1>
      {/* Return string (.value) */}
      <img src={content.image.src.value} alt={content.image.alt.value} />{" "}
    </div>
  );
};
```

## useLocale Hook

```tsx
import { useLocale } from "preact-intlayer";
import { Locales } from "intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};
```

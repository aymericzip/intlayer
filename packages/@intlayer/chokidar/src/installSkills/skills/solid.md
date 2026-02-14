---
name: intlayer-solid-js
description: Integrates Intlayer internationalization with SolidJS components. Use when the user asks to "setup SolidJS i18n", use the "useIntlayer" hook in Solid, or manage locales in a SolidJS application.
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

# Intlayer Solid Usage

## Setup

- [Vite and Solid](https://intlayer.org/doc/environment/vite-and-solid.md)

## useIntlayer Hook

> [!IMPORTANT]
> In Solid, `useIntlayer` returns an **accessor** function (e.g., `content()`). You must call this function to access the reactive content.

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## useLocale Hook

```tsx
import { useLocale } from "solid-intlayer";
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

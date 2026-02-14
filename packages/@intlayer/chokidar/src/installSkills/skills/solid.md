---
name: Intlayer Solid
description: Solid-specific primitives and syntax
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

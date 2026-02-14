---
name: Intlayer Preact
description: Preact-specific syntax and hooks usage
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

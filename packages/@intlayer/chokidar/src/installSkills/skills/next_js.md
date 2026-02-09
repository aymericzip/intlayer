# Intlayer Next.js Usage

## Server Components

```tsx
import { useIntlayer } from "next-intlayer/server";
const MyComponent = async () => {
  const content = await useIntlayer("my-dictionary-key");
  return (
    <div>
      <h1>{content.title}</h1>
      <img src={content.image.src.value} alt={content.image.alt.value} />
    </div>
  );
};
```

## Client Components

```tsx
"use client";
import { useIntlayer } from "next-intlayer";
const MyComponent = async () => {
  const content = await useIntlayer("my-dictionary-key");
  return (
    <div>
      <h1>{content.title}</h1>
      <img src={content.image.src.value} alt={content.image.alt.value} />
    </div>
  );
};
```

Use `useIntlayer` from `next-intlayer` exactly like in React.
[Next.js Documentation](https://intlayer.org/doc/packages/next-intlayer.md)

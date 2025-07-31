---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: How to retrieve the locale from the cookies / headers?
description: Learn how to retrieve the locale from the cookies / headers.
keywords:
  - cookie
  - headers
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - doc
  - faq
  - get-locale-cookie
---

# How to retrieve the locale from the cookies / headers

## Using Hooks (Recommended)

For most use cases, it's recommended to retrieve the current locale using the `useLocale` hook because it's auto-resolved. This works similarly to the `useLocale` composable in Vue.js.

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// or import { useLocale } from "vue-intlayer";

// Client-side usage
const { locale } = useLocale();
```

For server components, you can import it from:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

There is also a `useLocaleCookie` hook that only resolves the cookie value.

## Manual Cookie Configuration

You can declare custom cookie name as

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // default is 'intlayer-locale'
  },
};

export default config;
```

the retreave it as

### Client-side

```ts
// Using the default cookie name
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Using custom cookie name
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Server-side (Next.js)

```ts
import { cookies } from "next/headers";

// Using the default cookie name
const locale = cookies().get("intlayer-locale")?.value;

// Using custom cookie name
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### If locale not set yet

The locale is set as a cookie only once the user select explicitly the locale. By default, for new visitors, the locale is interpreted from the headers fields.

You can detect the user's preferred locale from the request headers. Here's an example of how to handle this:

```ts
/**
 * Detects the locale from the request headers
 *
 * The accept-language header is the most important one for locale detection.
 * It contains a list of language codes with quality values (q-values) that indicate
 * the user's preferred languages in order of preference.
 *
 * Example: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US is the primary language (q=1.0 is implied)
 * - en is the second choice (q=0.9)
 * - fr is the third choice (q=0.8)
 * - es is the fourth choice (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Example of negotiator headers that browsers typically send
 * These headers help determine the user's preferred language
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Usage example:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```

---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: Can I use Intlayer without a global provider?
description: "Read Intlayer content without mounting a provider, how the locale is resolved on the server and in the browser, and the performance difference with a provider."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - performance
  - hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Can I use Intlayer without a global provider?

Yes. `getIntlayer` and `getDictionary` are plain functions that do not need any provider, and `useIntlayer` also works outside of one.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // No locale passed
```

## Which locale is used?

When you pass a locale, it always wins. Otherwise, the locale is resolved in this order:

1. **The locale of the current request**, on the server, when an Intlayer integration handles it: the middlewares of `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` and `astro-intlayer`, or `IntlayerProvider` in React Server Components.
2. **The locale stored in the browser** (cookie, `localStorage`, `sessionStorage`), the one your locale switcher persists.
3. **The `defaultLocale`** of your configuration.

Each request is resolved from its own cookies and headers, and kept in a per-request scope. Concurrent users with different locales never share a locale.

The same resolution applies to `getDictionary`, to the calls rewritten by the [build optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md), and to `useIntlayer` and `useDictionaryDynamic` rendered outside of a provider.

- [build optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)

The [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) (`number`, `date`, `list`…) and their hooks (`useNumber`, `useDate`, `useList`…) follow the same order when no `locale` is passed.

- [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md)

### Next.js Server Components

On Next.js, the request locale is only readable asynchronously, through `headers()` and `cookies()`. Use [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayerAsync.md), which awaits it the same way `getLocale()` from `next-intlayer/server` does:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale of the request

  return { title };
};
```

Reading the headers opts the route into dynamic rendering. When `IntlayerProvider` already provides the locale, the headers are not read and the route stays static.

## Performance: with or without a provider

The content is the same. The difference is about reactivity and rendering cost.

|                  | With a provider                                   | Without a provider                                                                                                                      |
| ---------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Locale switch    | Components re-render in place, without a reload   | Nothing re-renders; the new locale shows on the next call (navigation, reload)                                                          |
| Cost of a read   | Context lookup and subscription to the locale     | A memoized function call, same object for the same `key + locale`                                                                       |
| Cost of a switch | Re-render of every consumer                       | None                                                                                                                                    |
| Server rendering | The server and the browser render the same locale | Outside of a request integration, the server renders the `defaultLocale` and the browser the stored locale: possible hydration mismatch |
| Bundle           | The provider code                                 | About 100 bytes (gzipped) to read the stored locale, cached until the locale changes                                                    |

Keep the provider for interactive apps that switch locale in place or render on the server. Go without one for backends, scripts, static pages whose locale comes from the URL (pass it explicitly), or code that reads content once.

See [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayer.md) for more details.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayer.md)

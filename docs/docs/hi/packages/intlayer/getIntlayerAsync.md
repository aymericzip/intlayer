---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayerAsync Function Documentation | intlayer
description: getIntlayerAsync फ़ंक्शन को intlayer पैकेज के लिए कैसे उपयोग करें यह देखें
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# दस्तावेज़: `intlayer` में `getIntlayerAsync` फ़ंक्शन

## विवरण

`getIntlayerAsync` फ़ंक्शन अपनी key के आधार पर एक डिक्शनरी चुनता है और दिए गए locale के लिए उसकी content को resolve करता है, **केवल उस locale को लोड करते हुए**।

यह [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayer.md) का asynchronous counterpart है, जिसका उपयोग उन जगहों पर किया जाता है जहां डिक्शनरी rendering के बाहर पढ़ी जाती है — route `head` / metadata builders, loaders, server functions।

जहां `getIntlayer` merged डिक्शनरी को pull करता है जिसमें हर locale है, वहीं [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) इस call को `getDictionaryAsync(loaderMap, key, locale)` में rewrite करते हैं, जो `.intlayer/dynamic_dictionaries/` में per-locale chunks की ओर इशारा करते हैं। इसलिए bundle केवल वास्तव में अनुरोधित locale को ही carry करता है।

इन plugins के बिना — एक unoptimized build — call synchronous dictionary registry के माध्यम से resolve होती है: वही content, per-locale split के बिना।

**मुख्य विशेषताएं:**

- `getIntlayer` के समान typed keys, selectors और returned content
- Optimized builds में केवल अनुरोधित locale chunk को load करता है
- एक ही chunk के लिए Concurrent calls एक single load share करती हैं
- `async` metadata builders, loaders और server functions में उपयोग के लिए सुरक्षित

---

## Function Signature

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // आवश्यक
  localeOrSelector?: LocalesValues | DictionarySelector, // वैकल्पिक
  plugins?: Plugins[]                         // वैकल्पिक
): Promise<DeepTransformContent<...>>
```

---

## पैरामीटर

- `key: DictionaryKeys`
  - **विवरण**: डिक्शनरी की कुंजी जिसे पढ़ना है, जैसा कि आपकी content files में घोषित किया गया है।
  - **Type**: `DictionaryKeys` — हर घोषित डिक्शनरी कुंजी का एक union।
  - **आवश्यक**: हाँ

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **विवरण**: content को interpret करने के लिए locale, या [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) के लिए एक selector object।
    - `'fr'` — एक locale
    - `{ item: 2 }` — एक [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/collections.md) item (हर item को array के रूप में पाने के लिए `item` को omit करें)
    - `{ variant: 'black-friday' }` — एक नाम दिया गया [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/variants.md) (`default` के लिए omit करें)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — एक structured variant
    - कोई भी selector एक locale ले सकता है: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **आवश्यक**: नहीं (Optional) — configured `defaultLocale` को default करता है।

- `plugins: Plugins[]`
  - **विवरण**: Custom node transformers जो base interpreter plugins को replace करते हैं। Advanced use only।
  - **Type**: `Plugins[]`
  - **आवश्यक**: नहीं (Optional)

### Returns

- **Type**: `Promise<Content>` — एक promise जो आपकी घोषणा से टाइप किए गए dictionary की interpreted content को resolve करता है।

---

## उदाहरण उपयोग

### बुनियादी उपयोग

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

### TanStack Start route `head` में

क्योंकि locale chunk को demand पर load किया जाता है, `head` `async` बन जाता है:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayerAsync } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale } = params;

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

### एक Next.js `generateMetadata` में

```tsx fileName="src/app/[locale]/page.tsx"
import { getIntlayerAsync } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description } = await getIntlayerAsync(
    "page-metadata",
    locale
  );

  return { title, description };
};
```

### एक सर्वर फंक्शन में

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getIntlayerAsync, getLocale } from "intlayer";

export const getLocalizedContent = createServerFn().handler(async () => {
  const locale = await getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  });

  const content = await getIntlayerAsync("app", locale);

  return { locale, content };
});
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Returns            | सामग्री                                                                                                         | सामग्री का एक promise                                   |
| Dictionary loaded  | मर्ज किया गया शब्दकोश (सभी locales)                                                                             | केवल अनुरोधित locale का chunk                           |
| Best suited for    | Rendering, synchronous code paths                                                                               | Metadata, loaders, server functions                     |
| Requires a plugin? | नहीं                                                                                                            | नहीं — per-locale split को build plugins की आवश्यकता है |

दोनों एक ही arguments स्वीकार करते हैं और एक ही सामग्री return करते हैं: एक से दूसरे में स्विच करने से केवल **कब** और **कितना** load होता है, यह बदलता है।

---

## संबंधित Functions

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayer.md): Synchronous equivalent जो merged dictionary को पढ़ता है।
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getDictionaryAsync.md): The lower-level function जिसे build plugins इस call को rewrite करते हैं।
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocale.md): Incoming request की locale को detect करता है।

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```

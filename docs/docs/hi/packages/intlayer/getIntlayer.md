---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: getIntlayer फंक्शन डॉक्यूमेंटेशन | intlayer
description: "getIntlayer से किसी लोकेल के लिए डिक्शनरी कंटेंट कहीं भी पढ़ें, यह useIntlayer हुक का फ़्रेमवर्क-स्वतंत्र रूप है।"
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "locale न देने पर, default locale से पहले request का locale या संग्रहीत locale resolve होता है"
  - version: 9.4.0
    date: 2026-08-23
    changes: "प्रारंभिक डॉक्यूमेंटेशन"
author: aymericzip
---

# दस्तावेज़: `intlayer` में `getIntlayer` फ़ंक्शन

## विवरण

`getIntlayer` फ़ंक्शन अपनी key द्वारा एक डिक्शनरी चुनता है और दिए गए locale के लिए इसकी content को return करता है। यह `useIntlayer` hook का framework-agnostic समकक्ष है: समान content, समान selectors, लेकिन कहीं भी usable जहाँ React context उपलब्ध नहीं है, Node scripts, server functions, route loaders, metadata builders, Express/Fastify handlers, tests.

यह Intlayer द्वारा `.intlayer/` में जनरेट की गई डिक्शनरीज़ को पढ़ता है, इसलिए `key` argument typed है और आपकी अपनी content declarations से autocompleted है, और returned object प्रत्येक leaf तक पूरी तरह typed है।

**मुख्य विशेषताएं:**

- Typed dictionary keys और typed returned content
- प्रत्येक content node को interpret करता है (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- locale या selector object (collections, variants) स्वीकार करता है
- Results `key + locale + selector` के अनुसार memoized हैं
- Development में एक safe proxy में fallback करता है जब dictionary missing हो, crash करने के बजाय

## फ़ंक्शन सिग्नेचर

```typescript
getIntlayer(
  key: DictionaryKeys,                        // आवश्यक
  localeOrSelector?: LocalesValues | DictionarySelector, // वैकल्पिक
  plugins?: Plugins[]                         // वैकल्पिक
): DeepTransformContent<...>
```

## पैरामीटर

- `key: DictionaryKeys`
  - **विवरण**: डिक्शनरी की कुंजी जिसे पढ़ना है, जैसा कि आपकी कंटेंट फाइलों में घोषित किया गया है।
  - **प्रकार**: `DictionaryKeys`, हर घोषित डिक्शनरी कुंजी का एक union।
  - **आवश्यक**: हाँ

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **विवरण**: कंटेंट को interpret करने के लिए locale, या [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) के लिए एक selector object।
    - `'fr'`: एक locale
    - `{ item: 2 }`: एक [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/collections.md) item (सभी items को array के रूप में प्राप्त करने के लिए `item` को omit करें)
    - `{ variant: 'black-friday' }`: एक named [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/variants.md) (`default` के लिए omit करें)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: एक structured variant
    - कोई भी selector एक locale ले सकता है: `{ item: 2, locale: 'fr' }`
  - **प्रकार**: `LocalesValues | DictionarySelector`
  - **आवश्यक**: नहीं (वैकल्पिक)। छोड़ने पर, [बिना locale के](#बिना-locale-के) देखें।

- `plugins: Plugins[]`
  - **विवरण**: Custom node transformers जो base interpreter plugins को replace करते हैं। Advanced use only; default behaviour रखने के लिए इसे omit करें।
  - **प्रकार**: `Plugins[]`
  - **आवश्यक**: नहीं (वैकल्पिक)

### रिटर्न्स

- **प्रकार**: शब्दकोश की व्याख्या की गई सामग्री, आपकी घोषणा से टाइप की गई।
- **विवरण**: आपके शब्दकोश के `content` फील्ड को दर्शाने वाली एक सादी object, जहां प्रत्येक Intlayer नोड को अनुरोधित locale के लिए अंतिम मान में resolve किया गया है।

## उदाहरण उपयोग

### बुनियादी उपयोग

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      hi: "नमस्ते",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### बिना locale के

जब कोई locale नहीं दिया जाता, तो `getIntlayer` सीधे default locale पर नहीं जाता। यह इस क्रम में resolve करता है:

1. **वर्तमान request का locale**, server पर, जब कोई Intlayer integration उसे संभालता है: `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer` और `elysia-intlayer` middlewares, `remix-intlayer` और `astro-intlayer` middlewares, और React Server Components में `IntlayerProvider` / `setLocale`। हर request अपनी cookies और headers से resolve होती है, इसलिए एक साथ आने वाले users कभी locale साझा नहीं करते।
2. **browser में संग्रहीत locale** (cookie, `localStorage`, `sessionStorage`), जिसे locale switcher सहेजता है।
3. आपके [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में घोषित **`defaultLocale`**।

- [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // request का locale, वरना संग्रहीत, वरना default locale
```

यही resolution `getDictionary` पर, [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) द्वारा दोबारा लिखे गए calls पर, और provider के बाहर render किए गए `useIntlayer` / `useDictionaryDynamic` पर भी लागू होता है। स्पष्ट रूप से दिया गया locale हमेशा प्राथमिकता पाता है।

- [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)

> `getIntlayer` reactive नहीं है: locale बदलने के बाद, नया locale पढ़ने के लिए इसे फिर से call करें। server-rendered page पर, किसी भी provider के बाहर किया गया call server पर default locale और browser में संग्रहीत locale render करता है, जिससे hydration mismatch हो सकता है। ऐसी स्थिति में अपने framework का provider mount करें या locale पास करें।

### एक सर्वर हैंडलर के अंदर

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### एक सिलेक्टर के साथ (collections और variants)

```typescript
import { getIntlayer } from "intlayer";

// एक एकल collection item
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// collection का प्रत्येक item, एक क्रमबद्ध array के रूप में
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// एक नाम वाला variant
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

## व्यवहार नोट्स

### कैशिंग

परिणाम एक मॉड्यूल-स्तरीय कैश में `key + locale + selector` के आधार पर संग्रहीत होते हैं। `getIntlayer("app", "fr")` को बार-बार कॉल करने से शब्दकोश की व्याख्या एक बार होती है और उसके बाद वही ऑब्जेक्ट वापस किया जाता है।

### अनुपलब्ध शब्दकोश

विकास में, एक ऐसी कुंजी का अनुरोध करना जिसके पास कोई जनित शब्दकोश नहीं है, एक बार एक चेतावनी लॉग करता है और एक सुरक्षित फॉलबैक प्रॉक्सी लौटाता है: `content.title` को पढ़ने से `"app.title"` स्ट्रिंग उत्पन्न होती है। यह एक पृष्ठ को उपयोग योग्य रखता है जबकि अनुपलब्ध घोषणा को ठीक किया जाता है। Intlayer बिल्ड चलाएं (या dev सर्वर) ताकि शब्दकोश जनित हो सके।

### Bundle size

`getIntlayer` merged dictionary को पढ़ता है, जो **हर** locale को hold करता है। Client bundles में, [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) call को rewrite करते हैं ताकि केवल required content ship हो। जब आप rendering के बाहर content को पढ़ते हैं (metadata, loaders, server functions) और single locale को on demand load करना चाहते हैं, तो इसके बजाय [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md) का उपयोग करें।

- [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)
- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md)

## संबंधित फ़ंक्शन

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getDictionary.md)
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md)

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```

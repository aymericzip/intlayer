---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayer फंक्शन डॉक्यूमेंटेशन | intlayer
description: intlayer पैकेज के लिए getIntlayer फंक्शन का उपयोग कैसे करें देखें
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
  - version: 9.4.0
    date: 2026-08-23
    changes: "प्रारंभिक डॉक्यूमेंटेशन"
author: aymericzip
---

# दस्तावेज़: `intlayer` में `getIntlayer` फ़ंक्शन

## विवरण

`getIntlayer` फ़ंक्शन अपनी key द्वारा एक डिक्शनरी चुनता है और दिए गए locale के लिए इसकी content को return करता है। यह `useIntlayer` hook का framework-agnostic समकक्ष है: समान content, समान selectors, लेकिन कहीं भी usable जहाँ React context उपलब्ध नहीं है — Node scripts, server functions, route loaders, metadata builders, Express/Fastify handlers, tests.

यह Intlayer द्वारा `.intlayer/` में जनरेट की गई डिक्शनरीज़ को पढ़ता है, इसलिए `key` argument typed है और आपकी अपनी content declarations से autocompleted है, और returned object प्रत्येक leaf तक पूरी तरह typed है।

**मुख्य विशेषताएं:**

- Typed dictionary keys और typed returned content
- प्रत्येक content node को interpret करता है (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- locale या selector object (collections, variants) स्वीकार करता है
- Results `key + locale + selector` के अनुसार memoized हैं
- Development में एक safe proxy में fallback करता है जब dictionary missing हो, crash करने के बजाय

---

## फ़ंक्शन सिग्नेचर

```typescript
getIntlayer(
  key: DictionaryKeys,                        // आवश्यक
  localeOrSelector?: LocalesValues | DictionarySelector, // वैकल्पिक
  plugins?: Plugins[]                         // वैकल्पिक
): DeepTransformContent<...>
```

---

## पैरामीटर

- `key: DictionaryKeys`
  - **Description**: डिक्शनरी की कुंजी जिसे पढ़ना है, जैसा कि आपकी कंटेंट फाइलों में घोषित किया गया है।
  - **Type**: `DictionaryKeys` — हर घोषित डिक्शनरी कुंजी का एक union।
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: कंटेंट को interpret करने के लिए locale, या [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) के लिए एक selector object।
    - `'fr'` — एक locale
    - `{ item: 2 }` — एक [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/collections.md) item (सभी items को array के रूप में प्राप्त करने के लिए `item` को omit करें)
    - `{ variant: 'black-friday' }` — एक named [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/variants.md) (`default` के लिए omit करें)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — एक structured variant
    - कोई भी selector एक locale ले सकता है: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — configured `defaultLocale` को default करता है।

- `plugins: Plugins[]`
  - **Description**: Custom node transformers जो base interpreter plugins को replace करते हैं। Advanced use only; default behaviour रखने के लिए इसे omit करें।
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### रिटर्न्स

- **Type**: शब्दकोश की व्याख्या की गई सामग्री, आपकी घोषणा से टाइप की गई।
- **Description**: आपके शब्दकोश के `content` फील्ड को दर्शाने वाली एक सादी object, जहां प्रत्येक Intlayer नोड को अनुरोधित locale के लिए अंतिम मान में resolve किया गया है।

---

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

Locale को छोड़ देने से content को आपके [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में घोषित `defaultLocale` के साथ interpret किया जाता है।

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Default locale के साथ interpret किया गया
```

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

---

## व्यवहार नोट्स

### कैशिंग

परिणाम एक मॉड्यूल-स्तरीय कैश में `key + locale + selector` के आधार पर संग्रहीत होते हैं। `getIntlayer("app", "fr")` को बार-बार कॉल करने से शब्दकोश की व्याख्या एक बार होती है और उसके बाद वही ऑब्जेक्ट वापस किया जाता है।

### अनुपलब्ध शब्दकोश

विकास में, एक ऐसी कुंजी का अनुरोध करना जिसके पास कोई जनित शब्दकोश नहीं है, एक बार एक चेतावनी लॉग करता है और एक सुरक्षित फॉलबैक प्रॉक्सी लौटाता है: `content.title` को पढ़ने से `"app.title"` स्ट्रिंग उत्पन्न होती है। यह एक पृष्ठ को उपयोग योग्य रखता है जबकि अनुपलब्ध घोषणा को ठीक किया जाता है। Intlayer बिल्ड चलाएं (या dev सर्वर) ताकि शब्दकोश जनित हो सके।

### Bundle size

`getIntlayer` merged dictionary को पढ़ता है, जो **हर** locale को hold करता है। Client bundles में, [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) call को rewrite करते हैं ताकि केवल required content ship हो। जब आप rendering के बाहर content को पढ़ते हैं (metadata, loaders, server functions) और single locale को on demand load करना चाहते हैं, तो इसके बजाय [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md) का उपयोग करें।

---

## संबंधित फ़ंक्शन

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md): एक single locale chunk को लोड करने वाला Async counterpart।
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getDictionary.md): एक dictionary object को interpret करता है जो आप स्वयं पास करते हैं, key द्वारा देखे गए object के बजाय।
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md): React hook का समतुल्य, provider से locale को पढ़ता है।

---

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

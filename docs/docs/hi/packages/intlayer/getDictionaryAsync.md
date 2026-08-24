---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionaryAsync फ़ंक्शन डॉक्यूमेंटेशन | intlayer
description: intlayer पैकेज के लिए getDictionaryAsync फ़ंक्शन का उपयोग कैसे करें, यह देखें
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# दस्तावेज़: `intlayer` में `getDictionaryAsync` फ़ंक्शन

## विवरण

`getDictionaryAsync` फ़ंक्शन एक **एकल locale chunk** को dictionary से लोड करता है और इसकी interpreted content को return करता है।

यह `.intlayer/dynamic_dictionaries/` में emitted per-locale loader maps के लिए [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getDictionary.md) का counterpart है: हर locale को hold करने वाली dictionary प्राप्त करने के बजाय, यह loader map को प्राप्त करता है और केवल उस chunk को await करता है जिसकी requested locale को आवश्यकता है।

> Application code में आप आमतौर पर [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md) को call करते हैं, इस फ़ंक्शन को नहीं। [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) हर `getIntlayerAsync('key', locale)` call को एक `getDictionaryAsync(loaderMap, 'key', locale)` में rewrite करते हैं। `getDictionaryAsync` को custom loaders के लिए और उस tooling के लिए export किया जाता है जो अपने स्वयं के loader maps को build करता है।

**मुख्य विशेषताएं:**

- केवल requested locale chunk को लोड करता है
- Plain (`locale → loader`) और qualified (`locale → qualifierId → loader`) loader maps को support करता है
- एक ही chunk के concurrent loads को deduplicate करता है, और resolved content को cache करता है
- Failed loads को cache से evict किया जाता है ताकि बाद की call chunk को retry कर सके

---

## फ़ंक्शन सिग्नेचर

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // आवश्यक
  key: string,                                           // आवश्यक
  localeOrSelector?: LocalesValues | DictionarySelector, // वैकल्पिक
  plugins?: Plugins[]                                    // वैकल्पिक
): Promise<DeepTransformContent<...>>
```

---

## पैरामीटर

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: प्रति-locale loader map। Plain maps एक locale को एक loader के साथ जोड़ते हैं; qualified maps (collections और variants द्वारा उपयोग किए जाते हैं) एक locale को एक qualifier id के साथ जोड़ते हैं, फिर एक loader के साथ। qualified map के लिए, केवल वह chunk(s) जिसे selector target करता है, लोड होते हैं।
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: dictionary key, chunk cache को namespace करने के लिए उपयोग किया जाता है।
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: सामग्री को interpret करने के लिए locale, या एक selector object (`{ item }`, `{ variant }`, वैकल्पिक रूप से `locale` के साथ)। [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) देखें।
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — configured `defaultLocale` में defaults होता है।

- `plugins: Plugins[]`
  - **Description**: Node transformers। base interpreter set में defaults होता है।
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the loaded chunk.
- **Description**: Resolves to `null` when the map emits no chunk for the requested locale nor for any of its fallbacks, mirroring how a missing qualified coordinate resolves.

---

## उदाहरण उपयोग

### जेनरेट किए गए लोडर मैप के साथ

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### कस्टम लोडर मैप के साथ

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### एक योग्य मानचित्र पर एक चयनकर्ता के साथ

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## व्यवहार नोट्स

### कैशिंग और डीडुप्लिकेशन

कैश प्रत्येक `key + locale + selector` ट्रिपल के **promise** को स्टोर करता है, इसलिए एक ही chunk के लिए समवर्ती कॉल एक single load की प्रतीक्षा करते हैं। एक rejected load को कैश से हटाया जाता है, इसलिए एक failing chunk को अगली कॉल पर फिर से कोशिश की जाती है, बजाय इसके कि एक ही विफलता को हमेशा के लिए दोहराया जाए।

### Locale fallback

एक सादा loader map को synchronous mode के समान fallback chain के अनुसार walk किया जाता है: पहले अनुरोधित locale, फिर इसके fallbacks, फिर `null` अगर कोई भी chunk emit नहीं करता है।

---

## संबंधित फंक्शन

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md): वह फंक्शन जिसे एप्लिकेशन कॉल करती हैं; बिल्ड प्लगइन इसे `getDictionaryAsync` में फिर से लिखते हैं।
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getDictionary.md): सिंक्रोनस समकक्ष जो पूरी dictionary लेता है।
- [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md): संग्रह और variants, और loader maps जो वे जेनरेट करते हैं।

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```

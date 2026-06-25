---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: ऑटो फिल
description: Intlayer में ऑटो फिल फ़ंक्शन का उपयोग कैसे करें ताकि पूर्वनिर्धारित पैटर्न के आधार पर सामग्री स्वचालित रूप से भरी जा सके। अपने प्रोजेक्ट में ऑटो फिल फीचर्स को प्रभावी ढंग से लागू करने के लिए इस दस्तावेज़ का पालन करें।
keywords:
  - ऑटो फिल
  - सामग्री स्वचालन
  - गतिशील सामग्री
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "वैश्विक कॉन्फ़िगरेशन जोड़ें"
  - version: 6.0.0
    date: 2025-09-17
    changes: "`{{fileName}}` वेरिएबल जोड़ें"
  - version: 5.5.10
    date: 2025-06-29
    changes: "इतिहास आरंभ करें"
author: aymericzip
---

# कंटेंट डिक्लेरेशन फ़ाइल अनुवाद भरें

**अपने CI में कंटेंट डिक्लेरेशन फ़ाइलों को ऑटोफिल करना** आपके विकास वर्कफ़्लो को तेज़ करने का एक तरीका है।

## व्यवहार को समझना

`fill` कमांड में दो मोड शामिल हैं:

- **Complete**: प्रत्येक locale के लिए सभी missing content को स्वचालित रूप से भरें और वर्तमान फ़ाइल को संपादित करें, या यदि निर्दिष्ट हो तो दूसरी फ़ाइल को संपादित करें। यानी, complete मोड पहले से से अनुवादित मौजूदा content को छोड़ देगा।
- **Review**: प्रत्येक locale के लिए **सभी** content को स्वचालित रूप से भरें और एक विशिष्ट फ़ाइल के लिए generate करें, या यदि निर्दिष्ट हो तो दूसरी फ़ाइल के लिए generate करें।

`fill` कमांड आपकी सभी locale content declaration files को process करेगा। यानी, यह CMS से आपकी remote content को process नहीं करेगा। CMS के पास अपना स्वयं का translations management है।
यदि आप `@intlayer/sync-json-plugin` जैसे plugins का उपयोग करते हैं, तो Intlayer JSON files को locale content declaration files में transform करेगा। यानी, वे `fill` कमांड द्वारा process किए जाएंगे।

नई generated files में एक `filled` instruction को dictionary metadata के रूप में शामिल है। यह instruction Intlayer को यह जानने के लिए उपयोग किया जाएगा कि फ़ाइल को autofilled किया गया है या नहीं, और यदि मौजूद है तो इस फ़ाइल को फिर से translate किए जाने से छोड़ दें।

Intlayer autofill के लिए निम्नलिखित instruction पर भी विचार करेगा:

- आपकी `.content.{ts|js|json}` → `fill` instruction से
- आपकी configuration file `.intlayer.config.ts` → `dictionary.fill` instruction से
- अन्यथा `true` पर set किया जाएगा

Per-locale content declaration files के लिए, `true` instruction को `./{{fileName}}.fill.content.json` से replace किया जाएगा। यह इसलिए है क्योंकि एक per-locale content declaration file अतिरिक्त localized content प्राप्त नहीं कर सकता है। इसलिए यह मौजूदा फ़ाइल को overwrite न करने के लिए एक नई फ़ाइल generate करेगा।

## डिफ़ॉल्ट व्यवहार

डिफ़ॉल्ट रूप से, `fill` को globally `true` पर सेट किया गया है, जिसका अर्थ है कि Intlayer automatically सभी content files को fill करेगा और फ़ाइल को स्वयं edit करेगा। इस व्यवहार को कई तरीकों से customize किया जा सकता है:

### वैश्विक कॉन्फ़िगरेशन विकल्प

1. **`fill: true` (डिफ़ॉल्ट)** - सभी locales को स्वचालित रूप से भरें और वर्तमान फ़ाइल को संपादित करें
2. **`fill: false`** - इस सामग्री फ़ाइल के लिए स्वचालित भरण अक्षम करें
3. **`fill: "./relative/path/to/file"`** - वर्तमान फ़ाइल को संपादित किए बिना निर्दिष्ट फ़ाइल को बनाएं/अपडेट करें, वर्तमान फ़ाइल के स्थान के आधार पर हल किए गए सापेक्ष पथ की ओर इशारा करके
4. **`fill: "/absolute/path/to/file"`** - वर्तमान फ़ाइल को संपादित किए बिना निर्दिष्ट फ़ाइल को बनाएं/अपडेट करें, कॉन्फ़िगरेशन फ़ाइल `.intlayer.config.ts` में बेस डायरेक्टरी (फ़ील्ड `baseDir`) के आधार पर हल किए गए सापेक्ष पथ की ओर इशारा करके
5. **`fill: "C:\\absolute\path\to\file"`** - वर्तमान फ़ाइल को संपादित किए बिना निर्दिष्ट फ़ाइल को बनाएं/अपडेट करें, आपके ऑपरेटिंग सिस्टम के आधार पर हल किए गए निरपेक्ष पथ की ओर इशारा करके
6. **`fill: { [key in Locales]?: string }`** - प्रत्येक locale के लिए निर्दिष्ट फ़ाइल को बनाएं/अपडेट करें

### v7 व्यवहार परिवर्तन

v7 में, `fill` कमांड का व्यवहार अपडेट किया गया है:

- **`fill: true`** - वर्तमान फ़ाइल को सभी locales के लिए भरी गई सामग्री के साथ फिर से लिखता है
- **`fill: "path/to/file"`** - निर्दिष्ट फ़ाइल को भरता है बिना वर्तमान फ़ाइल को संशोधित किए
- **`fill: false`** - auto-fill को पूरी तरह अक्षम करता है

जब किसी दूसरी फ़ाइल में लिखने के लिए path विकल्प का उपयोग करते हैं, तो fill तंत्र सामग्री घोषणा फ़ाइलों के बीच एक _master-slave_ संबंध के माध्यम से काम करता है। मुख्य (master) फ़ाइल सत्य का स्रोत है, और जब इसे अपडेट किया जाता है, तो Intlayer स्वचालित रूप से उन परिवर्तनों को path द्वारा निर्दिष्ट व्युत्पन्न (भरी गई) घोषणा फ़ाइलों पर लागू करता है।

# ऑटोफिल सामग्री घोषणा फ़ाइल अनुवाद

**ऑटोफिल सामग्री घोषणा फ़ाइलें** आपके विकास कार्यप्रवाह को तेज़ करने का एक तरीका हैं।

ऑटोफिल तंत्र सामग्री घोषणा फ़ाइलों के बीच एक _मास्टर-स्लेव_ संबंध के माध्यम से काम करता है। जब मुख्य (मास्टर) फ़ाइल अपडेट होती है, तो Intlayer स्वचालित रूप से उन परिवर्तनों को व्युत्पन्न (ऑटोफिल की गई) घोषणा फ़ाइलों पर लागू कर देगा।

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "यह सामग्री का एक उदाहरण है", // सामग्री का उदाहरण
  },
} satisfies Dictionary;

export default exampleContent;
```

यहाँ `autoFill` निर्देश का उपयोग करते हुए एक [प्रति-स्थान सामग्री घोषणा फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) है।

फिर, जब आप निम्नलिखित कमांड चलाते हैं:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer स्वचालित रूप से व्युत्पन्न घोषणा फ़ाइल `src/components/example/example.content.json` बनाएगा, जिसमें मुख्य फ़ाइल में पहले से घोषित नहीं किए गए सभी स्थानों को भरा जाएगा।

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

इसके बाद, दोनों घोषणा फ़ाइलों को एकल शब्दकोश में मर्ज किया जाएगा, जिसे मानक `useIntlayer("example")` हुक (react) / कॉम्पोज़ेबल (vue) का उपयोग करके एक्सेस किया जा सकता है।

## Global Configuration

आप `intlayer.config.ts` फ़ाइल में global auto fill configuration को कॉन्फ़िगर कर सकते हैं।

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // सभी dictionaries के लिए लापता translations को auto-generate करें
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // सभी dictionaries के लिए लापता translations को auto-generate करें जैसे "./{{fileName}}.content.json" का उपयोग करना
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

आप content files में `fill` field का उपयोग करके प्रति dictionary को fine-tune कर सकते हैं। Intlayer पहले per dictionary configuration पर विचार करेगा और फिर global configuration पर fallback करेगा।

## ऑटोफिल की गई फ़ाइल प्रारूप

सिफारिश की गई स्वरूप ऑटोफिल की गई घोषणा फ़ाइलों के लिए **JSON** है, जो स्वरूपण प्रतिबंधों से बचने में मदद करता है। हालांकि, Intlayer `.ts`, `.js`, `.mjs`, `.cjs`, और अन्य स्वरूपों का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // आपकी सामग्री
  },
};
```

यह फ़ाइल इस स्थान पर उत्पन्न करेगा:

```
src/components/example/example.filled.content.ts
```

> `.js`, `.ts`, और समान फ़ाइलों का निर्माण इस प्रकार काम करता है:
>
> - यदि फ़ाइल पहले से मौजूद है, तो Intlayer इसे AST (Abstract Syntax Tree) का उपयोग करके पार्स करेगा ताकि प्रत्येक फ़ील्ड का पता लगाया जा सके और कोई भी गायब अनुवाद डाला जा सके।
> - यदि फ़ाइल मौजूद नहीं है, तो Intlayer इसे डिफ़ॉल्ट सामग्री घोषणा फ़ाइल टेम्पलेट का उपयोग करके उत्पन्न करेगा।

## पूर्ण पथ (Absolute Paths)

`autoFill` फ़ील्ड पूर्ण पथों का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // आपकी सामग्री
  },
};
```

यह फ़ाइल इस स्थान पर उत्पन्न करेगा:

```
/messages/example.content.json
```

## प्रति-स्थानीय सामग्री घोषणा फ़ाइलों का स्वचालित निर्माण (Autogenerate Per-Locale Content Declaration Files)

`autoFill` फ़ील्ड **प्रति-स्थानीय** सामग्री घोषणा फ़ाइलों के निर्माण का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // आपकी सामग्री
  },
};
```

यह दो अलग-अलग फ़ाइलें उत्पन्न करेगा:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> इस मामले में, यदि ऑब्जेक्ट में सभी स्थानीय भाषाएँ शामिल नहीं हैं, तो Intlayer बाकी स्थानीय भाषाओं की फ़ाइलें उत्पन्न करने से बचता है।

## विशिष्ट स्थानीय ऑटोफिल को फ़िल्टर करें (Filter Specific Locale Autofill)

`autoFill` फ़ील्ड के लिए एक ऑब्जेक्ट का उपयोग करने से आप फ़िल्टर लागू कर सकते हैं और केवल विशिष्ट स्थानीय फ़ाइलें उत्पन्न कर सकते हैं।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // आपकी सामग्री
  },
};
```

यह केवल फ्रेंच अनुवाद फ़ाइल उत्पन्न करेगा।

## पथ चर (Path Variables)

आप उत्पन्न फ़ाइलों के लिए लक्षित पथों को गतिशील रूप से हल करने के लिए `autoFill` पथ के अंदर वेरिएबल्स का उपयोग कर सकते हैं।

**उपलब्ध वेरिएबल्स:**

- `{{locale}}` – स्थानीय कोड (जैसे `fr`, `es`)
- `{{fileName}}` – फ़ाइल नाम (जैसे `index`)
- `{{key}}` – शब्दकोश कुंजी (जैसे `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // आपकी सामग्री
  },
};
```

यह उत्पन्न करेगा:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // आपकी सामग्री
  },
};
```

यह उत्पन्न करेगा:

- `./index.content.json`
- `./index.content.json`

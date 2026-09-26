---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: astro-intlayer पैकेज प्रलेखन
description: Intlayer के लिए Astro एकीकरण, जो लोकेल-आधारित रूटिंग, मिडलवेयर, हुक्स, क्लाइंट स्टोर और शब्दकोश प्रबंधन के लिए सेटअप प्रदान करता है।
keywords:
  - astro-intlayer
  - astro
  - अंतर्राष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer, useDictionary, useLocale हुक्स, मिडलवेयर, और फॉर्मैटर्स प्रलेखन जोड़ें"
  - version: 8.0.0
    date: 2026-01-21
    changes: "सभी एक्सपोर्ट्स के लिए एकीकृत प्रलेखन"
author: aymericzip
---

# astro-intlayer पैकेज

`astro-intlayer` पैकेज Astro एप्लिकेशनों में Intlayer को एकीकृत करने के लिए आवश्यक उपकरण प्रदान करता है। यह लोकेल-आधारित रूटिंग, शब्दकोश प्रबंधन, बिल्ड-टाइम पेज रीराइटिंग, अनुरोध मिडलवेयर, और सर्वर-रेंडर किए गए `.astro` कंपोनेंट्स और क्लाइंट-साइड स्क्रिप्ट्स दोनों में बहुभाषी सामग्री तक पहुंचने के लिए हुक्स को कॉन्फ़िगर करता है।

## इंस्टॉलेशन

```bash
npm install astro-intlayer
```

## एक्सपोर्ट्स

### एकीकरण

`astro-intlayer` पैकेज एक Astro एकीकरण प्रदान करता है जो आपके प्रोजेक्ट में Intlayer सेट करता है।

इम्पोर्ट:

```tsx
import { intlayer } from "astro-intlayer";
```

या `astro.config.mjs` में डिफ़ॉल्ट इम्पोर्ट:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| फ़ंक्शन    | विवरण                                                                                                                                                                                                                           | संबंधित दस्तावेज़                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Astro एकीकरण जो शब्दकोश तैयार करता है, Vite प्लगइन्स (उपनाम, रूटिंग प्रॉक्सी, प्रून) कॉन्फ़िगर करता है, अनुरोध मिडलवेयर को स्वचालित रूप से पंजीकृत करता है, और स्थानीयकृत रीराइटेड URL पर प्री-रेंडर किए गए पेज आउटपुट करता है। | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/intlayer.md) |

### हुक्स (सर्वर और क्लाइंट)

इम्पोर्ट:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| हुक             | विवरण                                                                                                                                                                                            | संबंधित दस्तावेज़                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | कुंजी द्वारा एक शब्दकोश चुनता है और उसकी स्थानीयकृत सामग्री लौटाता है। `.astro` फ्रंटमैटर में, यह `Astro.locals` से अनुरोध लोकेल पढ़ता है। क्लाइंट `<script>` में, यह क्लाइंट स्टोर से पढ़ता है। | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | शब्दकोश ऑब्जेक्ट को परिवर्तित करता है और हल किए गए लोकेल के लिए सामग्री लौटाता है। फ्रंटमैटर और क्लाइंट स्क्रिप्ट में काम करता है।                                                               | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | वर्तमान लोकेल, डिफ़ॉल्ट लोकेल, उपलब्ध लोकेल्स, और लोकेल को अपडेट करने के लिए एक फ़ंक्शन लौटाता है।                                                                                               | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useLocale.md)         |

### मिडलवेयर (astro-intlayer/middleware)

इम्पोर्ट:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| एक्सपोर्ट   | प्रकार              | विवरण                                                                                                                                                                               | संबंधित दस्तावेज़                                                                                               |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Astro मिडलवेयर जो अनुरोध लोकेल का पता लगाता है और `Astro.locals.intlayer` जोड़ता है। `intlayer()` द्वारा स्वचालित रूप से पंजीकृत होता है, या मैन्युअल रूप से इम्पोर्ट किया जाता है। | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/onRequest.md) |

### उपयोगिताएँ

इम्पोर्ट:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| फ़ंक्शन             | विवरण                                                                                                                       | संबंधित दस्तावेज़ |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `getIntlayerLocals` | `Astro.locals` के बाहर अनुरोध स्टोरेज स्कोप से वर्तमान `IntlayerLocals` ऑब्जेक्ट को पुनः प्राप्त करने के लिए सहायक फ़ंक्शन। | -                 |

### क्लाइंट उपयोगिताएँ (astro-intlayer/client)

इम्पोर्ट:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

जब ब्राउज़र में या क्लाइंट `<script>` टैग के अंदर इम्पोर्ट किया जाता है, तो `astro-intlayer` स्वचालित रूप से `astro-intlayer/client` (`vanilla-intlayer` द्वारा संचालित) पर मैप हो जाता है, जो क्लाइंट-साइड शब्दकोश गेटर्स, स्टोर सब्सक्राइबर्स और लोकेल दृढ़ता उपकरण प्रदान करता है।

### फॉर्मैटर्स (astro-intlayer/format)

इम्पोर्ट:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "astro-intlayer/format";
```

| हुक               | विवरण                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `useIntl`         | अनुरोध या क्लाइंट लोकेल से बंधा एक Intl उदाहरण लौटाता है जिसमें कैशिंग और सदस्यता क्षमताएँ होती हैं। |
| `useDate`         | वर्तमान लोकेल से पूर्व-बद्ध दिनांक फ़ॉर्मेटिंग फ़ंक्शन लौटाता है (`Intl.DateTimeFormat`)।            |
| `useNumber`       | वर्तमान लोकेल से पूर्व-बद्ध संख्या फ़ॉर्मेटिंग फ़ंक्शन लौटाता है (`Intl.NumberFormat`)।              |
| `useCurrency`     | वर्तमान लोकेल से पूर्व-बद्ध मुद्रा फ़ॉर्मेटिंग फ़ंक्शन लौटाता है।                                    |
| `usePercentage`   | वर्तमान लोकेल से पूर्व-बद्ध प्रतिशत फ़ॉर्मेटिंग फ़ंक्शन लौटाता है।                                   |
| `useRelativeTime` | वर्तमान लोकेल से पूर्व-बद्ध सापेक्ष समय फ़ॉर्मेटिंग फ़ंक्शन लौटाता है (`Intl.RelativeTimeFormat`)।   |
| `useList`         | वर्तमान लोकेल से पूर्व-बद्ध सूची फ़ॉर्मेटिंग फ़ंक्शन लौटाता है (`Intl.ListFormat`).                  |
| `useUnit`         | वर्तमान लोकेल से पूर्व-बद्ध इकाई फ़ॉर्मेटिंग फ़ंक्शन लौटाता है।                                      |
| `useCompact`      | वर्तमान लोकेल से पूर्व-बद्ध संक्षिप्त संख्या फ़ॉर्मेटिंग फ़ंक्शन लौटाता है (उदा. `1.5K`)।            |

### HTML उपयोगिताएँ (astro-intlayer/html)

इम्पोर्ट:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| एक्सपोर्ट         | प्रकार     | विवरण                                                                  |
| ----------------- | ---------- | ---------------------------------------------------------------------- |
| `renderHTML`      | `Function` | HTML नोड्स को रेंडर करने के लिए स्टैंडअलोन उपयोगिता फ़ंक्शन।           |
| `useHTML`         | `Hook`     | HTML प्रदाता संदर्भ और कॉन्फ़िगरेशन प्राप्त करने के लिए हुक।           |
| `useHTMLRenderer` | `Hook`     | पूर्व-कॉन्फ़िगर किए गए HTML रेंडरर फ़ंक्शन को प्राप्त करने के लिए हुक। |

### Markdown उपयोगिताएँ (astro-intlayer/markdown)

इम्पोर्ट:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| एक्सपोर्ट             | प्रकार     | विवरण                                                                      |
| --------------------- | ---------- | -------------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | मार्कडाउन स्ट्रिंग्स को संरचित प्रतिनिधित्व में संकलित करता है।            |
| `renderMarkdown`      | `Function` | मार्कडाउन सामग्री को आउटपुट नोड्स में रेंडर करता है।                       |
| `parseMarkdown`       | `Function` | कच्चे मार्कडाउन सामग्री को AST में पार्स करता है।                          |
| `useMarkdown`         | `Hook`     | मार्कडाउन प्रदाता संदर्भ प्राप्त करने के लिए हुक।                          |
| `useMarkdownRenderer` | `Hook`     | पूर्व-कॉन्फ़िगर किए गए Markdown रेंडरर फ़ंक्शन को प्राप्त करने के लिए हुक। |

### प्रकार

इम्पोर्ट:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| प्रकार            | विवरण                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `IntlayerLocals`  | `Astro.locals.intlayer` से जुड़ा ऑब्जेक्ट जिसमें `locale`, `defaultLocale`, और `availableLocales` शामिल हैं। |
| `UseLocaleProps`  | `useLocale()` द्वारा स्वीकृत वैकल्पिक कॉन्फ़िगरेशन गुण।                                                      |
| `UseLocaleResult` | `useLocale()` का रिटर्न प्रकार, जो लोकेल गुण और अपडेट विधियाँ प्रदान करता है।                                |

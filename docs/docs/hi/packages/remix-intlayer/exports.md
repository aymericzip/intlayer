---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: remix-intlayer पैकेज प्रलेखन
description: remix-intlayer पैकेज के एक्सपोर्ट्स का प्रलेखन, जो Remix 3 एप्लिकेशनों के लिए अंतर्राष्ट्रीयकरण (i18n) प्रदान करता है।
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer एक्सपोर्ट्स का प्रारंभिक प्रलेखन"
author: aymericzip
---

# remix-intlayer पैकेज

`remix-intlayer` पैकेज Remix 3 एप्लिकेशनों में Intlayer को एकीकृत करने के लिए आवश्यक उपकरण प्रदान करता है। इसमें अनुरोध लोकेल का पता लगाने के लिए मिडलवेयर, अनुरोध संदर्भ एक्सेस, और शब्दकोश प्राप्त करने तथा लोकेल प्रबंधित करने के लिए हुक्स शामिल हैं।

## इंस्टॉलेशन

```bash
npm install remix-intlayer
```

## पैकेज एक्सपोर्ट्स

### मिडलवेयर

| एक्सपोर्ट  | प्रकार           | विवरण                                                                                                       | संबंधित दस्तावेज़                                                                                                                |
| ---------- | ---------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | मिडलवेयर फ़ंक्शन | Remix 3 के लिए मिडलवेयर जो अनुरोध लोकेल का पता लगाता है, रीडायरेक्ट्स संभालता है, और अनुरोध संदर्भ भरता है। | [intlayer मिडलवेयर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/intlayerMiddleware.md) |

### संदर्भ संग्रहण

| एक्सपोर्ट                   | प्रकार                         | विवरण                                                                                                                                                              | संबंधित दस्तावेज़                                                                                                    |
| --------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | RequestContext कुंजी / संग्रहण | Remix 3 अनुरोध संदर्भ (`context.get(Intlayer)`) से Intlayer स्थिति प्राप्त करने के लिए उपयोग की जाने वाली संदर्भ कुंजी।                                            | [Intlayer संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                       | प्रॉपर्टी नाम (`'intlayer'`) जो सीधे अनुरोध संदर्भ पर इंस्टॉल होती है, जिससे `context.intlayer` और `context.get(Intlayer)` के माध्यम से एक्सेस की अनुमति मिलती है। | -                                                                                                                    |

### हुक्स

| एक्सपोर्ट       | प्रकार | विवरण                                                                                         | संबंधित दस्तावेज़                                                                                                           |
| --------------- | ------ | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | हुक    | वर्तमान अनुरोध लोकेल के अनुसार कुंजी द्वारा शब्दकोश सामग्री प्राप्त और संसाधित करता है।       | [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | हुक    | पहले से इम्पोर्ट किए गए शब्दकोश ऑब्जेक्ट से वर्तमान अनुरोध लोकेल के अनुरूप सामग्री लौटाता है। | [useDictionary हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | हुक    | वर्तमान अनुरोध लोकेल, डिफ़ॉल्ट लोकेल, और उपलब्ध लोकेल्स की सूची तक पहुंच प्रदान करता है।      | [useLocale हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useLocale.md)         |

### उपयोगिताएँ

इम्पोर्ट:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| फ़ंक्शन               | विवरण                                                                                                                                         | संबंधित दस्तावेज़ |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `createLocaleRouting` | एक शुद्ध फ़ंक्शन जो किसी अनुरोध, कॉन्फ़िगरेशन और विकल्पों के आधार पर लोकेल रूटिंग निर्णयों (`redirect`, `rewrite` या `pass`) की गणना करता है। | -                 |
| `getIntlayerState`    | React घटकों के बाहर `AsyncLocalStorage` अनुरोध दायरे से वर्तमान `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) पढ़ता है।     | -                 |

### फॉर्मैटर्स (remix-intlayer/format)

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
} from "remix-intlayer/format";
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

### HTML उपयोगिताएँ (remix-intlayer/html)

इम्पोर्ट:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| एक्सपोर्ट         | प्रकार     | विवरण                                                                  |
| ----------------- | ---------- | ---------------------------------------------------------------------- |
| `renderHTML`      | `Function` | HTML नोड्स को रेंडर करने के लिए स्टैंडअलोन उपयोगिता फ़ंक्शन।           |
| `useHTML`         | `Hook`     | HTML प्रदाता संदर्भ और कॉन्फ़िगरेशन प्राप्त करने के लिए हुक।           |
| `useHTMLRenderer` | `Hook`     | पूर्व-कॉन्फ़िगर किए गए HTML रेंडरर फ़ंक्शन को प्राप्त करने के लिए हुक। |

### Markdown उपयोगिताएँ (remix-intlayer/markdown)

इम्पोर्ट:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
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
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| प्रकार                      | विवरण                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Remix अनुरोध संदर्भ में संग्रहीत `locale`, `defaultLocale` और `availableLocales` रखने वाली स्थिति ऑब्जेक्ट। |
| `IntlayerMiddlewareOptions` | `intlayer()` मिडलवेयर को पास किए गए कॉन्फ़िगरेशन विकल्प।                                                    |
| `LocaleRoutingOptions`      | लोकेल प्रीफिक्सिंग, डिटेक्शन और रीडायरेक्ट को कस्टमाइज़ करने के विकल्प।                                     |
| `LocaleRoutingAction`       | रूटिंग निर्णय का प्रतिनिधित्व करने वाला डिस्क्रिमिनेटेड यूनियन: `redirect`, `rewrite` या `pass`।            |
| `LocaleRoutingRequest`      | `createLocaleRouting` के लिए आवश्यक न्यूनतम अनुरोध प्रतिनिधित्व।                                            |
| `UseLocaleResult`           | `useLocale()` का रिटर्न प्रकार, जिसमें `locale`, `defaultLocale` और `availableLocales` शामिल हैं।           |

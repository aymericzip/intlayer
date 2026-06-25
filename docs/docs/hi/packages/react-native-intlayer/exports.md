---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: react-native-intlayer पैकेज दस्तावेज़
description: Intlayer के लिए React Native समर्थन, जो providers, hooks, polyfills और Metro कॉन्फ़िगरेशन प्रदान करता है।
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "पूर्ण react-intlayer API (hooks, utilities, format/html/markdown subpaths) को re-export करें ताकि React Native ऐप केवल react-native-intlayer पर निर्भर रहे"
  - version: 8.0.0
    date: 2026-01-21
    changes: "सभी exports के लिए एकीकृत दस्तावेज़ीकरण"
author: aymericzip
---

# react-native-intlayer पैकेज

`react-native-intlayer` पैकेज आवश्यक टूल्स प्रदान करता है ताकि Intlayer को React Native एप्लिकेशन्स में एकीकृत किया जा सके। यह `react-intlayer` की पूर्ण API (hooks और utilities) को React Native-ready `IntlayerProvider` के साथ re-export करता है, साथ ही React Native के लिए आवश्यक polyfills और Metro कॉन्फ़िगरेशन भी प्रदान करता है।

> React Native ऐप में, **सब कुछ** `react-native-intlayer` से import करें। आपको `react-intlayer` को सीधे install या import करने की आवश्यकता नहीं है।

## इंस्टॉलेशन

```bash
npm install react-native-intlayer
```

## एक्सपोर्ट्स

### प्रोवाइडर

| Component          | विवरण                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Provider component जो आपके एप्लिकेशन को रैप करता है और Intlayer context प्रदान करता है। आवश्यक polyfills को स्वचालित रूप से लागू करता है। |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hooks और Utilities

ये `react-intlayer` से re-export किए जाते हैं, इसलिए आप इन्हें सीधे `react-native-intlayer` से import कर सकते हैं:

| Export                                                                                                            | विवरण                                                     |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `useIntlayer`                                                                                                     | किसी dictionary key के लिए localized content एक्सेस करें। |
| `useLocale`                                                                                                       | वर्तमान locale को पढ़ें और बदलें।                         |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | विभिन्न तरीकों से dictionary content लोड करें।            |
| `useI18n`                                                                                                         | i18next-compatible hook।                                  |
| `t`                                                                                                               | Inline translation helper।                                |
| `getIntlayer`, `getDictionary`                                                                                    | Imperative content getters।                               |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Locale persistence helpers।                               |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### पॉलीफिल

| फ़ंक्शन            | विवरण                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | React Native के लिए Intlayer का समर्थन करने हेतु आवश्यक polyfills लागू करने वाला फ़ंक्शन। |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> जब आप `IntlayerProvider` import करते हैं तो polyfill स्वचालित रूप से लागू हो जाता है। `intlayerPolyfill` को मैन्युअल रूप से केवल तब कॉल करें जब provider mount होने से पहले polyfills की आवश्यकता हो।

### Formatters

संख्या, दिनांक और अन्य Intl-आधारित formatting hooks `/format` subpath से उपलब्ध हैं:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown और HTML रेंडरिंग

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Metro कॉन्फ़िगरेशन

The `react-native-intlayer` पैकेज Metro कॉन्फ़िगरेशन उपयोगिताएँ प्रदान करता है ताकि Intlayer React Native के साथ सही ढंग से काम करे।

| Function                  | Description                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Intlayer को तैयार करने और Metro कॉन्फ़िगरेशन को मर्ज करने वाला असिंक्रोनस फ़ंक्शन।            |
| `configMetroIntlayerSync` | Intlayer संसाधनों को तैयार किए बिना Metro कॉन्फ़िगरेशन को मर्ज करने वाला सिंक्रोनस फ़ंक्शन।   |
| `exclusionList`           | Metro की blockList के लिए RegExp पैटर्न बनाता है ताकि बंडल से कंटेंट फ़ाइलें बाहर की जा सकें। |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```

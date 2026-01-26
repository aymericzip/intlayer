---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer पैकेज दस्तावेज़ीकरण
description: Intlayer के लिए Vue-विशिष्ट एकीकरण, जो Vue अनुप्रयोगों के लिए प्लगइन और composables प्रदान करता है।
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण
---

# vue-intlayer पैकेज

`vue-intlayer` पैकेज Vue अनुप्रयोगों में Intlayer को एकीकृत करने के लिए आवश्यक टूल प्रदान करता है। इसमें बहुभाषी सामग्री को संभालने के लिए एक Vue प्लगइन और composables शामिल हैं।

## इंस्टॉलेशन

```bash
npm install vue-intlayer
```

## एक्सपोर्ट्स

### प्लगइन

इम्पोर्ट:

```tsx
import "vue-intlayer";
```

| फ़ंक्शन           | विवरण                                                       |
| ----------------- | ----------------------------------------------------------- |
| `installIntlayer` | आपके एप्लिकेशन में Intlayer स्थापित करने के लिए Vue प्लगइन। |

### कम्पोज़ेबल्स

इम्पोर्ट:

```tsx
import "vue-intlayer";
```

| कम्पोज़ेबल             | विवरण                                                                                                                                      | संबंधित दस्तावेज़                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | `useDictionary` पर आधारित है, लेकिन जेनरेट की गई declaration से dictionary का optimized वर्शन inject करता है।                              | -                                                                                                                     |
| `useDictionary`        | उन objects को प्रोसेस करता है जो dictionaries (key, content) जैसी दिखती हैं। यह `t()` translations, enumerations, आदि को प्रोसेस करता है।  | -                                                                                                                     |
| `useDictionaryAsync`   | `useDictionary` जैसा ही है, लेकिन असिंक्रोनस (asynchronous) शब्दकोशों को संभालता है।                                                       | -                                                                                                                     |
| `useDictionaryDynamic` | `useDictionary` जैसा ही है, लेकिन डायनेमिक (dynamic) शब्दकोशों को संभालता है।                                                              | -                                                                                                                     |
| `useLocale`            | वर्तमान locale लौटाता है और इसे सेट करने के लिए एक फ़ंक्शन प्रदान करता है।                                                                 | -                                                                                                                     |
| `useRewriteURL`        | क्लाइंट-साइड composable जो URL री-राइट्स को प्रबंधित करता है। यदि कोई localized री-राइट नियम मौजूद है तो यह स्वतः URL को अपडेट कर देता है। | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | वर्तमान locale के लिए Intl ऑब्जेक्ट लौटाता है।                                                                                             | -                                                                                                                     |
| `useLoadDynamic`       | डायनेमिक शब्दकोश लोड करने के लिए composable।                                                                                               | -                                                                                                                     |

### फ़ंक्शन

Import:

```tsx
import "vue-intlayer";
```

| फ़ंक्शन         | विवरण                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `getDictionary` | ऐसे ऑब्जेक्ट्स को प्रोसेस करता है जो शब्दकोश (key, content) जैसे दिखते हैं। यह `t()` अनुवादों, एन्यूमरेशनों, आदि को प्रोसेस करता है। |
| `getIntlayer`   | `getDictionary` पर आधारित है, लेकिन जनरेट की गई declaration से शब्दकोश का एक ऑप्टिमाइज़्ड संस्करण इंजेक्ट करता है।                   |

### मार्कडाउन

Import:

```tsx
import "vue-intlayer/markdown";
```

| फ़ंक्शन                   | विवरण                                                                         |
| ------------------------- | ----------------------------------------------------------------------------- |
| `installIntlayerMarkdown` | Vue प्लगइन जो आपके एप्लिकेशन में Intlayer Markdown को इंस्टॉल करने के लिए है। |

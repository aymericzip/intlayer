---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: preact-intlayer पैकेज दस्तावेज़ीकरण
description: Preact-विशिष्ट Intlayer एकीकरण, जो Preact एप्लिकेशनों के लिए providers और hooks प्रदान करता है।
keywords:
  - preact-intlayer
  - preact
  - अंतरराष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# preact-intlayer पैकेज

`preact-intlayer` पैकेज Preact एप्लिकेशनों में Intlayer को एकीकृत करने के लिए आवश्यक टूल प्रदान करता है। यह बहुभाषी सामग्री को संभालने के लिए providers और hooks शामिल करता है।

## स्थापना

```bash
npm install preact-intlayer
```

## एक्सपोर्ट्स

### प्रोवाइडर

| कम्पोनेंट          | विवरण                                                                               |
| ------------------ | ----------------------------------------------------------------------------------- |
| `IntlayerProvider` | मुख्य provider जो आपके एप्लिकेशन को रैप करता है और Intlayer context प्रदान करता है। |

### हुक्स

| हुक             | विवरण                                                                                                                               | संबंधित दस्तावेज़                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | यह `useDictionary` पर आधारित है, लेकिन जनरेट की गई घोषणा से शब्दकोश का एक अनुकूलित संस्करण इंजेक्ट करता है।                         | -                                                                                                 |
| `useDictionary` | ऐसे ऑब्जेक्ट्स को प्रोसेस करता है जो शब्दकोश जैसे दिखते हैं (key, content)। यह `t()` अनुवादों, enumerations आदि को प्रोसेस करता है। | -                                                                                                 |
| `useLocale`     | वर्तमान locale और इसे सेट करने के लिए एक फ़ंक्शन लौटाता है।                                                                         | -                                                                                                 |
| `t`             | वर्तमान locale के आधार पर सामग्री चुनता है।                                                                                         | [अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md) |

### कंपोनेंट्स

| कंपोनेंट           | विवरण                                                      |
| ------------------ | ---------------------------------------------------------- |
| `MarkdownProvider` | markdown रेंडरिंग संदर्भ के लिए प्रोवाइडर।                 |
| `MarkdownRenderer` | कस्टम कंपोनेंट्स के साथ markdown सामग्री को रेंडर करता है। |

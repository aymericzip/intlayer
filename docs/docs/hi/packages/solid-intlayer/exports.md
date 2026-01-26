---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: solid-intlayer पैकेज दस्तावेज़
description: Solid-विशिष्ट एकीकरण जो Solid एप्लिकेशनों के लिए Intlayer के providers और hooks प्रदान करता है।
keywords:
  - solid-intlayer
  - solidjs
  - अंतरराष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# solid-intlayer पैकेज

`solid-intlayer` पैकेज Intlayer को Solid एप्लिकेशनों में एकीकृत करने के लिए आवश्यक उपकरण प्रदान करता है। यह बहुभाषी सामग्री को संभालने के लिए providers और hooks शामिल करता है।

## स्थापना

```bash
npm install solid-intlayer
```

## निर्यात

### प्रदाता

इम्पोर्ट:

```tsx
import "solid-intlayer";
```

| कंपोनेंट           | विवरण                                                                               | संबंधित दस्तावेज़                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | मुख्य प्रोवाइडर जो आपके एप्लिकेशन को रैप करता है और Intlayer संदर्भ प्रदान करता है। | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/IntlayerProvider.md) |

### हुक्स

इम्पोर्ट:

```tsx
import "solid-intlayer";
```

| हुक                    | विवरण                                                                                                                                         | संबंधित दस्तावेज़                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | यह `useDictionary` पर आधारित है, लेकिन generated declaration से dictionary का अनुकूलित संस्करण इंजेक्ट करता है।                               | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | डिक्शनरी जैसे दिखने वाले ऑब्जेक्ट्स (key, content) को प्रोसेस करता है। यह `t()` अनुवादों, enumerations आदि को प्रोसेस करता है।                | -                                                                                                                       |
| `useDictionaryAsync`   | बिलकुल `useDictionary` जैसा, लेकिन asynchronous डिक्शनरीज़ को संभालता है।                                                                     | -                                                                                                                       |
| `useDictionaryDynamic` | बिलकुल `useDictionary` जैसा, लेकिन dynamic डिक्शनरीज़ को संभालता है।                                                                          | -                                                                                                                       |
| `useLocale`            | वर्तमान locale और इसे सेट करने के लिए एक फ़ंक्शन लौटाता है।                                                                                   | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | URL rewrites को प्रबंधित करने के लिए क्लाइंट-साइड हुक। यदि कोई localized rewrite rule मौजूद है तो यह URL को स्वचालित रूप से अपडेट कर देता है। | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | वर्तमान locale के लिए Intl ऑब्जेक्ट लौटाता है।                                                                                                | -                                                                                                                       |
| `useLoadDynamic`       | डायनेमिक शब्दकोश लोड करने के लिए हुक।                                                                                                         | -                                                                                                                       |
| `t`                    | वर्तमान locale के आधार पर कंटेंट चुनता है।                                                                                                    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md)                  |

### कंपोनेंट्स

इम्पोर्ट:

```tsx
import "solid-intlayer";
```

| कंपोनेंट           | विवरण                                           |
| ------------------ | ----------------------------------------------- |
| `MarkdownProvider` | markdown रेंडरिंग कॉन्टेक्स्ट के लिए प्रोवाइडर। |

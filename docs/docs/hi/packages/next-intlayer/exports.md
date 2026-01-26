---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer पैकेज दस्तावेज़
description: Intlayer के लिए Next.js-विशिष्ट इंटीग्रेशन, जो App Router और Page Router के लिए middleware और providers प्रदान करता है।
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण
---

# next-intlayer पैकेज

`next-intlayer` पैकेज Next.js एप्लिकेशनों में Intlayer को इंटीग्रेट करने के लिए आवश्यक टूल्स प्रदान करता है। यह App Router और Page Router दोनों का समर्थन करता है, साथ ही locale-आधारित रूटिंग के लिए middleware भी शामिल है।

## इंस्टॉलेशन

```bash
npm install next-intlayer
```

## एक्सपोर्ट्स

### मिडलवेयर

इम्पोर्ट:

```tsx
import "next-intlayer/middleware";
```

| फ़ंक्शन              | विवरण                                                                                                                                                              | संबंधित दस्तावेज                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js मिडलवेयर जो locale-आधारित रूटिंग और रीडायरेक्ट्स को हैंडल करता है। यह हेडर्स/कुकीज़ से locale का पता लगाता है और उपयुक्त locale पाथ पर रीडायरेक्ट करता है। | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/intlayerMiddleware.md) |

### कॉन्फ़िगरेशन हेल्पर्स

Import:

```tsx
import "next-intlayer/server";
```

| फ़ंक्शन            | विवरण                                                                                                                                                                                                 | संबंधित डॉक |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `withIntlayer`     | Next.js कॉन्फ़िगरेशन को रैप करने के लिए असिंक्रोनस हेल्पर, यह सुनिश्चित करता है कि Intlayer डिक्शनरीज़ बिल्ड से पहले तैयार हों। कंटेंट फाइलों को तैयार करता है और webpack/SWC प्लगइन्स सेटअप करता है। | -           |
| `withIntlayerSync` | Next.js कॉन्फ़िगरेशन को रैप करने के लिए सिंक्रोनस हेल्पर, उन कॉन्फ़िगरेशनों के लिए आदर्श जहाँ async संभव/इच्छित नहीं है। सर्वर स्टार्ट पर डिक्शनरीज़ को तैयार नहीं करता।                              | -           |

### प्रोवाइडर्स

इम्पोर्ट:

```tsx
import "next-intlayer";
```

या

```tsx
import "next-intlayer/server";
```

| कंपोनेंट                 | विवरण                                                                                                                    | संबंधित डॉक्स |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `IntlayerClientProvider` | Next.js App Router में क्लाइंट-साइड कॉम्पोनेंट्स के लिए Provider। `react-intlayer` के `IntlayerProvider` को रैप करता है। | -             |
| `IntlayerServerProvider` | Next.js (App Router) में सर्वर-साइड कॉम्पोनेंट्स के लिए Provider। सर्वर पर locale संदर्भ प्रदान करता है।                 | -             |
| `IntlayerServer`         | App Router में Intlayer कंटेंट के लिए सर्वर-साइड रैपर। Server Components में सही locale हैंडलिंग सुनिश्चित करता है।      | -             |

### हुक्स (क्लाइंट-साइड)

आयात:

```tsx
import "next-intlayer";
```

पुन:एक्सपोर्ट करता है अधिकांश हुक्स को `react-intlayer` से।

| हुक                    | विवरण                                                                                                                                                         | संबंधित दस्तावेज़                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | क्लाइंट-साइड हुक जो एक dictionary को उसकी key से चुनता है और उसका कंटेंट लौटाता है। यदि locale प्रदान नहीं किया गया है तो यह context का locale उपयोग करता है। | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | एक हुक जो dictionary ऑब्जेक्ट को ट्रांसफॉर्म करता है और वर्तमान locale के लिए कंटेंट लौटाता है। `t()` अनुवादों, enumerations, आदि को प्रोसेस करता है।         | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | यह हुक असिंक्रोनस डिक्शनरीज़ को संभालता है। यह एक promise-आधारित dictionary map स्वीकार करता है और वर्तमान locale के लिए इसे resolve करता है।                 | -                                                                                                                       |
| `useDictionaryDynamic` | यह हुक key द्वारा लोड की जाने वाली dynamic dictionaries को संभालता है। लोडिंग स्टेट्स के लिए यह अंदर से React Suspense का उपयोग करता है।                      | -                                                                                                                       |
| `useLocale`            | क्लाइंट-साइड hook जो वर्तमान locale और उसे सेट करने के लिए एक फ़ंक्शन प्रदान करता है। Next.js App Router के लिए नेविगेशन समर्थन के साथ संवर्धित।              | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | क्लाइंट-साइड hook जो URL rewrites को प्रबंधित करता है। यदि कोई अधिक उपयुक्त localized rewrite नियम मौजूद हो तो यह स्वचालित रूप से URL को अपडेट कर देता है।    | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Next.js Page Router के लिए विशिष्ट hook जो locale प्रबंधन के लिए है। locale बदलने पर यह रीडायरेक्शन और पेज रीलोड को संभालता है।                               | -                                                                                                                       |
| `useI18n`              | एक hook जो nested सामग्री को key से एक्सेस करने के लिए अनुवाद फ़ंक्शन `t()` प्रदान करता है। यह i18next/next-intl पैटर्न की नकल करता है।                       | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Locale-बाउंड `Intl` ऑब्जेक्ट प्रदान करने वाला Hook। स्वचालित रूप से वर्तमान locale इंजेक्ट करता है और अनुकूलित कैशिंग का उपयोग करता है।                       | -                                                                                                                       |
| `useLoadDynamic`       | React Suspense का उपयोग करके डायनामिक डिक्शनरी लोड करने वाला Hook। एक key और promise स्वीकार करता है, परिणामों को कैश करता है।                                | -                                                                                                                       |

### फ़ंक्शन्स (सर्वर-साइड)

इम्पोर्ट:

```tsx
import "next-intlayer/server";
```

| फ़ंक्शन                | विवरण                                                                                                                                                       | संबंधित दस्तावेज़                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `t`                    | Next.js App Router के लिए सर्वर-साइड संस्करण का अनुवाद फ़ंक्शन। सर्वर locale के लिए बहु-भाषी सामग्री का अनुवाद लौटाता।                                      | [अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md) |
| `getLocale`            | Next.js हेडर्स और कुकीज़ से वर्तमान locale निकालने में सहायक फ़ंक्शन। Server Components, Server Actions, या Route Handlers के लिए डिज़ाइन।                  | -                                                                                                 |
| `generateStaticParams` | कॉन्फ़िगर किए गए locales के आधार पर Next.js के डायनेमिक रूट्स के लिए स्थिर पैरामीटर बनाता है। प्री-रेंडरिंग के लिए locale ऑब्जेक्ट्स की एक array लौटाता है। | -                                                                                                 |
| `locale`               | सर्वर कॉन्टेक्स्ट (App Router) में locale प्राप्त करने या सेट करने का फ़ंक्शन। Server Components में locale प्रबंधन प्रदान करता है।                         | -                                                                                                 |

### प्रकार

Import:

```tsx
import "next-intlayer";
```

| प्रकार                 | विवरण                                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Next.js पृष्ठों के लिए Intlayer सपोर्ट वाला प्रकार। जेनेरिक प्रकार जो locale पैरामीटर शामिल करता है।                               |
| `Next14PageIntlayer`   | Next.js 14 पृष्ठों के लिए Intlayer सपोर्ट वाला प्रकार।                                                                             |
| `Next15PageIntlayer`   | Next.js 15 पृष्ठों के लिए Intlayer सपोर्ट वाला प्रकार।                                                                             |
| `NextLayoutIntlayer`   | Next.js लेआउट्स के लिए Intlayer सपोर्ट वाला प्रकार। जेनेरिक प्रकार जो locale पैरामीटर शामिल करता है।                               |
| `Next14LayoutIntlayer` | Next.js 14 लेआउट के लिए Intlayer समर्थन के साथ टाइप।                                                                               |
| `Next15LayoutIntlayer` | Next.js 15 लेआउट के लिए Intlayer समर्थन के साथ टाइप।                                                                               |
| `LocalParams`          | Next.js रूट पैरामीटर के लिए टाइप с locale के साथ। `locale` प्रॉपर्टी वाला ऑब्जेक्ट।                                                |
| `LocalPromiseParams`   | Next.js रूट पैरामीटर के लिए टाइप с locale के साथ (async संस्करण)। वह Promise है जो `locale` प्रॉपर्टी वाले ऑब्जेक्ट को सुलझाता है। |

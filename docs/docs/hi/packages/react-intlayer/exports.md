---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-intlayer पैकेज प्रलेखन
description: Intlayer का React-विशिष्ट इम्प्लिमेंटेशन, जो React एप्लिकेशन के लिए hooks और providers प्रदान करता है।
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत प्रलेखन
---

# react-intlayer पैकेज

`react-intlayer` पैकेज React एप्लिकेशनों में Intlayer को एकीकृत करने के लिए आवश्यक टूल प्रदान करता है। इसमें context providers, hooks, और बहुभाषी सामग्री को संभालने के लिए components शामिल हैं।

## इंस्टॉलेशन

```bash
npm install react-intlayer
```

## एक्सपोर्ट्स

### प्रोवाइडर्स

इम्पोर्ट:

```tsx
import "react-intlayer";
```

| कंपोनेंट                  | विवरण                                                                                                                      | संबंधित दस्तावेज़                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | आपके एप्लिकेशन को रैप करने वाला मुख्य provider जो Intlayer context प्रदान करता है। डिफ़ॉल्ट रूप से editor समर्थन शामिल है। | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | editor फीचर्स के बिना content पर केंद्रित एक provider component। तब उपयोग करें जब आपको visual editor की आवश्यकता न हो।     | -                                                                                                                             |
| `HTMLProvider`            | HTML-संबंधित अंतर्राष्ट्रीयकरण सेटिंग्स के लिए प्रदाता। HTML टैग्स के लिए component overrides की अनुमति देता है।           | -                                                                                                                             |

### हुक्स

इम्पोर्ट:

```tsx
import "react-intlayer";
```

| हुक                    | विवरण                                                                                                                                                               | संबंधित दस्तावेज़                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | क्लाइंट-साइड hook जो अपनी key द्वारा एक dictionary चुनता है और उसका content लौटाता है। यदि locale प्रदान नहीं किया गया है तो यह context से locale का उपयोग करता है। | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook जो एक dictionary ऑब्जेक्ट को रूपांतरित करता है और वर्तमान locale के लिए कंटेंट लौटाता है। `t()` अनुवादों, enumerations, आदि को प्रोसेस करता है।                | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook जो asynchronous dictionaries को संभालता है। यह एक promise-आधारित dictionary मैप स्वीकार करता है और वर्तमान locale के लिए उसे resolve करता है।                  | -                                                                                                                       |
| `useDictionaryDynamic` | Key द्वारा लोड की जाने वाली डायनामिक डिक्शनरीज़ को हैंडल करने वाला Hook। लोडिंग स्टेट्स के लिए आंतरिक रूप से React Suspense का उपयोग करता है।                       | -                                                                                                                       |
| `useLocale`            | वर्तमान locale, default locale, उपलब्ध locales और locale अपडेट करने के लिए एक फ़ंक्शन प्राप्त करने वाला क्लाइंट-साइड Hook।                                          | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | context से current locale और संबंधित सभी फ़ील्ड्स (locale, defaultLocale, availableLocales, setLocale) प्राप्त करने के लिए Hook।                                    | -                                                                                                                       |
| `useRewriteURL`        | URL rewrites को मैनेज करने के लिए client-side Hook। यदि current pathname और locale के लिए कोई rewrite rule मौजूद है, तो यह URL को अपडेट करेगा।                      | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook जो कुंजी के माध्यम से नेस्टेड कंटेंट तक पहुँचने के लिए एक अनुवाद फ़ंक्शन `t()` प्रदान करता है। i18next/next-intl पैटर्न का अनुकरण करता है।                     | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook जो locale-बाउंड `Intl` ऑब्जेक्ट प्रदान करता है। स्वचालित रूप से वर्तमान locale इंजेक्ट करता है और ऑप्टिमाइज़्ड कैशिंग का उपयोग करता है।                        | -                                                                                                                       |
| `useLocaleStorage`     | Hook जो local storage या cookies में locale persistence प्रदान करता है। getter और setter फ़ंक्शन्स लौटाता है।                                                       | -                                                                                                                       |
| `useLocaleCookie`      | Deprecated. इसके बजाय `useLocaleStorage` का उपयोग करें। Hook जो cookies में locale persistence को प्रबंधित करता है।                                                 | -                                                                                                                       |
| `useLoadDynamic`       | React Suspense का उपयोग करके डायनामिक डिक्शनरीज़ लोड करने के लिए Hook। एक key और promise स्वीकार करता है, और परिणामों को कैश करता है।                               | -                                                                                                                       |
| `useIntlayerContext`   | Hook जो वर्तमान Intlayer क्लाइंट context मान (locale, setLocale, आदि) प्रदान करता है।                                                                               | -                                                                                                                       |
| `useHTMLContext`       | HTMLProvider संदर्भ से HTML कंपोनेंट ओवरराइड्स तक पहुँचने का Hook।                                                                                                  | -                                                                                                                       |

### फ़ंक्शंस

इम्पोर्ट:

```tsx
import "react-intlayer";
```

| फ़ंक्शन              | विवरण                                                                                                                                                          | संबंधित दस्तावेज़                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `t`                  | क्लाइंट-साइड अनुवाद फ़ंक्शन जो प्रदान की गई बहुभाषी सामग्री का अनुवाद लौटाता है। यदि locale प्रदान नहीं किया गया है तो context का locale उपयोग करता है।        | [अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md) |
| `getDictionary`      | डिक्शनरी ऑब्जेक्ट्स को प्रोसेस करता है और निर्दिष्ट locale के लिए सामग्री लौटाता है। यह `t()` अनुवादों, enumerations, markdown, HTML, आदि को प्रोसेस करता है।  | -                                                                                                 |
| `getIntlayer`        | जनरेट की गई घोषणा से उसकी key द्वारा डिक्शनरी प्राप्त करता है और निर्दिष्ट locale के लिए उसका कंटेंट लौटाता है। यह `getDictionary` का ऑप्टिमाइज़्ड संस्करण है। | -                                                                                                 |
| `setLocaleInStorage` | स्टोरेज में locale सेट करता है (कॉन्फ़िगरेशन के आधार पर local storage या cookie में)।                                                                          | -                                                                                                 |
| `setLocaleCookie`    | अप्रचलित। इसके बजाय `setLocaleInStorage` का उपयोग करें। locale को cookie में सेट करता है।                                                                      | -                                                                                                 |
| `localeInStorage`    | स्टोरेज (लोकल स्टोरेज या कुकी) से लोकेल प्राप्त करता है।                                                                                                       | -                                                                                                 |
| `localeCookie`       | अप्रचलित। इसके बजाय `localeInStorage` का उपयोग करें। कुकी से लोकेल प्राप्त करता है।                                                                            | -                                                                                                 |

### कॉम्पोनेंट्स

इम्पोर्ट:

```tsx
import "react-intlayer";
```

or

```tsx
import "react-intlayer/markdown";
```

| कम्पोनेंट          | विवरण                                                                                                                              | संबंधित दस्तावेज़                                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Markdown रेंडरिंग संदर्भ के लिए Provider। Markdown तत्वों के लिए कस्टम component ओवरराइड्स की अनुमति देता है।                      | -                                                                                                                             |
| `MarkdownRenderer` | कस्टम components के साथ markdown कंटेंट को रेंडर करता है। सभी मानक markdown फीचर्स और Intlayer-विशिष्ट सिंटैक्स का समर्थन करता है। | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/MarkdownRenderer.md) |

### प्रकार

इम्पोर्ट:

```tsx
import "react-intlayer";
```

| टाइप           | विवरण                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Intlayer कंटेंट ट्री में एक नोड का प्रतिनिधित्व करने वाला प्रकार। प्रकार-सुरक्षित कंटेंट हेरफेर के लिए उपयोग किया जाता है। |

### सर्वर-साइड (react-intlayer/server)

इम्पोर्ट:

```tsx
import "react-intlayer/server";
```

| निर्यात                  | प्रकार      | विवरण                                                    |
| ------------------------ | ----------- | -------------------------------------------------------- |
| `IntlayerServerProvider` | `Component` | सर्वर-साइड रेंडरिंग के लिए प्रोवाइडर।                    |
| `IntlayerServer`         | `Component` | Intlayer कंटेंट के लिए सर्वर-साइड रैपर।                  |
| `t`                      | `Function`  | अनुवाद फ़ंक्शन का सर्वर-साइड संस्करण।                    |
| `useLocale`              | `Hook`      | सर्वर-साइड पर locale तक पहुँचने के लिए Hook।             |
| `useIntlayer`            | `Hook`      | `useIntlayer` का सर्वर-साइड संस्करण।                     |
| `useDictionary`          | `Hook`      | `useDictionary` का सर्वर-साइड संस्करण।                   |
| `useI18n`                | `Hook`      | `useI18n` का सर्वर-साइड संस्करण।                         |
| `locale`                 | `Function`  | सर्वर पर locale प्राप्त करने या सेट करने के लिए फ़ंक्शन। |

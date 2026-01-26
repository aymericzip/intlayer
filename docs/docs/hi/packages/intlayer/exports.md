---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer पैकेज प्रलेखन
description: Intlayer का कोर पैकेज, जो अंतरराष्ट्रीयकरण के लिए बुनियादी फंक्शंस और टाइप्स प्रदान करता है।
keywords:
  - intlayer
  - कोर
  - अंतरराष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत प्रलेखन
---

# intlayer पैकेज

`intlayer` पैकेज Intlayer ecosystem की कोर लाइब्रेरी है। यह JavaScript और TypeScript एप्लिकेशनों में बहुभाषी सामग्री को प्रबंधित करने के लिए आवश्यक फंक्शंस, टाइप्स, और यूटिलिटीज़ प्रदान करता है।

## इंस्टॉलेशन

```bash
npm install intlayer
```

## एक्सपोर्ट्स

### कॉन्फ़िगरेशन

इम्पोर्ट:

```tsx
import "intlayer";
```

| वेरिएबल            | प्रकार                 | विवरण                                                                                               | संबंधित दस्तावेज़                                                                                                       |
| ------------------ | ---------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Intlayer कॉन्फ़िगरेशन ऑब्जेक्ट।                                                                     | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Intlayer कॉन्फ़िगरेशन ऑब्जेक्ट लौटाता है। (**Deprecated**: इसके बजाय `configuration` का उपयोग करें) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | सभी समर्थित लोकल्स की सूची।                                                                         | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | सभी आवश्यक लोकल्स की सूची।                                                                          | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | डिफ़ॉल्ट locale.                                                                                    | -                                                                                                                       |

### प्रकार

इम्पोर्ट:

```tsx
import "intlayer";
```

| प्रकार                | विवरण                                                                              |
| --------------------- | ---------------------------------------------------------------------------------- |
| `Dictionary`          | डिक्शनरी की संरचना को परिभाषित करने के लिए उपयोग किया जाने वाला Dictionary प्रकार। |
| `DeclarationContent`  | (**Deprecated**) इसके स्थान पर `Dictionary<T>` का उपयोग करें।                      |
| `IntlayerConfig`      | Intlayer कॉन्फ़िगरेशन को परिभाषित करने वाला प्रकार।                                |
| `ContentNode`         | डिक्शनरी सामग्री में एक नोड।                                                       |
| `Locale`              | एक locale का प्रतिनिधित्व करने वाला प्रकार।                                        |
| `LocalesValues`       | किसी locale के लिए संभावित मान।                                                    |
| `StrictModeLocaleMap` | सख्त टाइप-चेकिंग के साथ locales का एक मैप।                                         |

### कंटेंट फ़ंक्शंस

Import:

```tsx
import "intlayer";
```

| फ़ंक्शन                  | प्रकार     | विवरण                                                                                                                                | संबंधित डॉक                                                                                            |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | वर्तमान locale के आधार पर सामग्री का चयन करता है।                                                                                    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | मात्रा के आधार पर सामग्री का चयन करता है।                                                                                            | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | बूलियन शर्त के आधार पर सामग्री चुनता है।                                                                                             | [शर्त](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/condition.md)          |
| `gender`                 | `Function` | लिंग के आधार पर सामग्री चुनता है।                                                                                                    | [लिंग](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md)             |
| `insert`                 | `Function` | कंटेंट स्ट्रिंग में मान सम्मिलित करता है।                                                                                            | [सम्मिलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md)       |
| `nest` / `getNesting`    | `Function` | एक अन्य शब्दकोश को नेस्ट करता है।                                                                                                    | [नेस्टिंग](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/nesting.md)        |
| `md`                     | `Function` | Markdown सामग्री को प्रोसेस करता है।                                                                                                 | [मार्कडाउन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md)      |
| `html`                   | `Function` | HTML सामग्री को प्रोसेस करता है।                                                                                                     | [HTML](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/html.md)               |
| `file`                   | `Function` | फ़ाइल सामग्री को संभालता है।                                                                                                         | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/file.md)               |
| `getDictionary`          | `Function` | ऐसे ऑब्जेक्ट्स को प्रोसेस करता है जो शब्दकोश (key, content) जैसा दिखते हैं। यह `t()` अनुवादों, enumerations, आदि को प्रोसेस करता है। | -                                                                                                      |
| `getIntlayer`            | `Function` | `getDictionary` पर आधारित है, लेकिन जनरेट की गई declaration से शब्दकोश का एक optimized संस्करण इंजेक्ट करता है।                      | -                                                                                                      |

### स्थानीयकरण उपयोगिताएँ

इम्पोर्ट:

```tsx
import "intlayer";
```

| `फ़ंक्शन`              | `प्रकार`   | विवरण                                            | संबंधित डॉक्स                                                                                                                   |
| ---------------------- | ---------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | किसी स्ट्रिंग या path से locale का पता लगाता है। | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | किसी locale का भाषा भाग प्राप्त करता है।         | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | किसी locale का display name प्राप्त करता है।     | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | कैनोनिकल पथ को स्थानीयकृत पथ में हल करता है।     | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | स्थानीयकृत पथ को canonical पथ में हल करता है।    | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | स्थानीयकृत URL उत्पन्न करता है।                  | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | समर्थित सभी locales के लिए URLs उत्पन्न करता है। | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | पाथ से locale प्रिफिक्स हटाता है।                | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | पाथ से locale प्रिफिक्स प्राप्त करता है।         | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | टेक्स्ट की दिशा (LTR/RTL) प्राप्त करता है।       | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | locale प्रीफिक्स की वैधता की जाँच करता है।       | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/validatePrefix.md)             |

### ब्राउज़र उपयोगिताएँ

इम्पोर्ट:

```tsx
import "intlayer";
```

| Function               | Type       | Description                                 |
| ---------------------- | ---------- | ------------------------------------------- |
| `getBrowserLocale`     | `Function` | ब्राउज़र की पसंदीदा locale का पता लगाता है। |
| `getCookie`            | `Function` | कुकी का मान प्राप्त करता है।                |
| `getLocaleFromStorage` | `Function` | स्टोरेज से locale प्राप्त करता है।          |
| `setLocaleInStorage`   | `Function` | locale को स्टोरेज में सेव करता है।          |

### फ़ॉर्मेटर्स

इम्पोर्ट:
//

```tsx
import "intlayer";
```

| फ़ंक्शन        | विवरण                                                   |
| -------------- | ------------------------------------------------------- |
| `number`       | एक संख्या को फ़ॉर्मेट करता है।                          |
| `currency`     | एक मुद्रा मान को फ़ॉर्मेट करता है।                      |
| `percentage`   | प्रतिशत को फ़ॉर्मेट करता है।                            |
| `compact`      | संख्या को संक्षिप्त (compact) रूप में फ़ॉर्मेट करता है। |
| `date`         | एक तिथि को फ़ॉर्मेट करता है।                            |
| `relativeTime` | सापेक्ष समय को फ़ॉर्मेट करता है।                        |
| `units`        | इकाइयों के साथ एक मान को फ़ॉर्मेट करता है।              |
| `Intl`         | मानक Intl ऑब्जेक्ट।                                     |

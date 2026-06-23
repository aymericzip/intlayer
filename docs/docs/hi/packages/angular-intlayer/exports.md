---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer पैकेज दस्तावेज़
description: Intlayer के लिए Angular-विशिष्ट एकीकरण, जो Angular एप्लिकेशनों के लिए providers और services प्रदान करता है।
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname उपयोगिता जोड़ी गई"
  - version: 8.0.0
    date: 2026-01-21
    changes: "सभी एक्सपोर्ट्स के लिए एकीकृत प्रलेखन"
author: aymericzip
---

# angular-intlayer पैकेज

`angular-intlayer` पैकेज Intlayer को Angular एप्लिकेशनों में एकीकृत करने के लिए आवश्यक टूल प्रदान करता है। यह बहुभाषी सामग्री को संभालने के लिए providers और services शामिल करता है।

## इंस्टॉलेशन

```bash
npm install angular-intlayer
```

## एक्सपोर्ट्स

इम्पोर्ट:

```tsx
import "angular-intlayer";
```

### सेटअप

| फ़ंक्शन           | विवरण                                                           |
| ----------------- | --------------------------------------------------------------- |
| `provideIntlayer` | आपके Angular एप्लिकेशन में Intlayer प्रदान करने के लिए फ़ंक्शन। |

### हुक्स

| हुक                    | विवरण                                                                                                                                                                       | संबंधित दस्तावेज़                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | `useDictionary` पर आधारित है, लेकिन जनरेट की गई घोषणा से शब्दकोश का एक अनुकूलित संस्करण इंजेक्ट करता है।                                                                    | -                                                                                                                     |
| `useDictionary`        | ऐसे ऑब्जेक्ट्स को प्रोसेस करता है जो dictionary (key, content) जैसे दिखते हैं। यह `t()` अनुवादों, enumerations, आदि को प्रोसेस करता है।                                     | -                                                                                                                     |
| `useDictionaryAsync`   | `useDictionary` के समान, लेकिन asynchronous dictionaries को हैंडल करता है।                                                                                                  | -                                                                                                                     |
| `useDictionaryDynamic` | `useDictionary` के समान, लेकिन dynamic dictionaries को हैंडल करता है।                                                                                                       | -                                                                                                                     |
| `useLocale`            | वर्तमान स्थान (locale) और इसे सेट करने के लिए एक फ़ंक्शन लौटाता है।                                                                                                         | -                                                                                                                     |
| `usePathname`          | वर्तमान पाथनेम को `Signal<string>` के रूप में लौटाता है जिसमें से स्थान (locale) खंड हटा दिया गया होता है। `DestroyRef` के माध्यम से `popstate` के प्रति प्रतिक्रियाशील है। | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/angular-intlayer/usePathname.md) |
| `useIntl`              | वर्तमान स्थान (locale) के लिए Intl ऑब्जेक्ट लौटाता है।                                                                                                                      | -                                                                                                                     |
| `useLoadDynamic`       | डायनामिक शब्दकोश लोड करने के लिए हुक।                                                                                                                                       | -                                                                                                                     |

### कम्पोनेंट्स

| कम्पोनेंट                   | विवरण                                                   |
| --------------------------- | ------------------------------------------------------- |
| `IntlayerMarkdownComponent` | Angular कम्पोनेंट जो Markdown सामग्री को रेंडर करता है। |

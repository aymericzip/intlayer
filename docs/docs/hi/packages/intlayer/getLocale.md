---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: getLocale फ़ंक्शन दस्तावेज़ | intlayer
description: "getLocale से URL या पाथ जैसी स्ट्रिंग से लोकेल पहचानें, न मिलने पर डिफ़ॉल्ट लोकेल पर लौटें।"
keywords:
  - getLocale
  - अनुवाद
  - Intlayer
  - intlayer
  - Internationalization
  - डॉक्यूमेंटेशन
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# getLocale फ़ंक्शन दस्तावेज़

The `getLocale` function allows you to detect the locale from a given string, such as a URL or a path.

## उपयोग

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// आउटपुट: 'fr'
```

## पैरामीटर

| पैरामीटर | प्रकार   | विवरण                                      |
| -------- | -------- | ------------------------------------------ |
| `path`   | `string` | जिस पथ या स्ट्रिंग से locale निकाला जाएगा। |

## लौटने वाला मान

पहचाना गया locale, या यदि कोई locale नहीं मिला तो डिफ़ॉल्ट locale।

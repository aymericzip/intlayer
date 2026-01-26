---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: getLocale फ़ंक्शन दस्तावेज़ | intlayer
description: देखें कि intlayer पैकेज के लिए getLocale फ़ंक्शन का उपयोग कैसे करें
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
    changes: Init doc
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

---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: validatePrefix फ़ंक्शन दस्तावेज़ | intlayer
description: "validatePrefix से जाँचें कि कोई URL सेगमेंट Intlayer कॉन्फ़िगरेशन के अनुसार मान्य लोकेल प्रीफ़िक्स है या नहीं।"
keywords:
  - validatePrefix
  - अनुवाद
  - Intlayer
  - intlayer
  - Internationalization
  - दस्तावेज़
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# validatePrefix फ़ंक्शन दस्तावेज़

`validatePrefix` फ़ंक्शन यह जांचता है कि दिए गए prefix को कन्फ़िगरेशन के अनुसार मान्य locale prefix माना जा सकता है या नहीं।

## उपयोग

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// आउटपुट: true
```

## पैरामीटर

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `prefix`  | `string` | जांचने के लिए `prefix`। |

## रिटर्न

`true` यदि `prefix` वैध है, अन्यथा `false`।

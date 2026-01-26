---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vite-intlayer पैकेज प्रलेखन
description: Intlayer के लिए Vite प्लगइन, जो शब्दकोश उपनाम और वॉचर्स प्रदान करता है।
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्स्पोर्ट्स के लिए एकीकृत प्रलेखन
---

# vite-intlayer पैकेज

`vite-intlayer` पैकेज आपके Vite-आधारित एप्लिकेशन में Intlayer को इंटीग्रेट करने के लिए एक Vite प्लगइन प्रदान करता है।

## इंस्टॉलेशन

```bash
npm install vite-intlayer
```

## एक्सपोर्ट्स

### प्लगइन

इम्पोर्ट:

```tsx
import "vite-intlayer";
```

| फ़ंक्शन              | विवरण                                                                         | संबंधित दस्तावेज                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | मुख्य Vite प्लगइन जो Intlayer को बिल्ड प्रक्रिया में एकीकृत करता है।          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**अप्रचलित**) `intlayer` के लिए उपनाम।                                       | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | डेवलपमेंट मिडलवेयर प्लगइन जो locale detection और routing को संभालता है।       | -                                                                                                                      |
| `intlayerMiddleware` | (**अप्रचलित**) `intlayerProxy` के लिए उपनाम।                                  | -                                                                                                                      |
| `intlayerPrune`      | बिल्ड के दौरान अप्रयुक्त शब्दकोशों को tree-shake और prune करने के लिए प्लगइन। | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerPrune.md) |

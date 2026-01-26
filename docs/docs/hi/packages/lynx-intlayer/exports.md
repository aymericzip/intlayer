---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: lynx-intlayer पैकेज दस्तावेज़ीकरण
description: Intlayer के लिए Lynx समर्थन, लोकल सपोर्ट के लिए polyfills प्रदान करता है।
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण
---

# lynx-intlayer पैकेज

`lynx-intlayer` पैकेज Lynx एप्लिकेशनों में Intlayer को एकीकृत करने के लिए आवश्यक टूल प्रदान करता है।

## इंस्टॉलेशन

```bash
npm install lynx-intlayer
```

## एक्सपोर्ट्स

### पॉलीफिल

इंपोर्ट:

```tsx
import "lynx-intlayer";
```

| फ़ंक्शन | विवरण |
| फ़ंक्शन | विवरण |
| `intlayerPolyfill` | Lynx के लिए Intlayer को सपोर्ट करने वाले आवश्यक polyfills लागू करने वाला फ़ंक्शन। |

### Rsbuild प्लगइन

`lynx-intlayer` पैकेज Lynx के बिल्ड प्रोसेस में Intlayer को इंटीग्रेट करने के लिए एक Rsbuild प्लगइन प्रदान करता है।

इम्पोर्ट:

```tsx
import "lynx-intlayer";
```

| फ़ंक्शन              | विवरण                                                           |
| -------------------- | --------------------------------------------------------------- |
| `pluginIntlayerLynx` | Rsbuild प्लगइन जो Intlayer को Lynx बिल्ड में इंटीग्रेट करता है। |

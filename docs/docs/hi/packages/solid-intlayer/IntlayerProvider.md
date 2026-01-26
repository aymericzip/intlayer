---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider कंपोनेंट दस्तावेज़ | solid-intlayer
description: देखें कि solid-intlayer पैकेज के लिए IntlayerProvider कंपोनेंट का उपयोग कैसे करें
keywords:
  - IntlayerProvider
  - प्रोवाइडर
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - डॉक्यूमेंटेशन
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण
---

# IntlayerProvider कंपोनेंट दस्तावेज़

The `IntlayerProvider` is the root component that provides the internationalization context to your Solid application. It manages the current locale state and ensures that all child components can access translations.

## उपयोग

```tsx
tsx;
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## विवरण

`IntlayerProvider` निम्नलिखित भूमिकाएँ निभाता है:

1. **स्टेट प्रबंधन**: यह वर्तमान locale को आरंभ और संग्रहित करता है, reactivity के लिए signals का उपयोग करते हुए।
2. **लोकेल निर्धारण**: यह प्रारंभिक locale को cookies, ब्राउज़र प्राथमिकताओं, या डिफ़ॉल्ट कॉन्फ़िगरेशन के आधार पर निर्धारित करता है।
3. **कॉन्टेक्स्ट इंजेक्शन**: यह locale और `setLocale` फ़ंक्शन को `useIntlayer` या `useLocale` जैसे hooks के माध्यम से किसी भी component के लिए उपलब्ध कराता है।
4. **स्थायित्व**: यह locale परिवर्तनों को स्वचालित रूप से cookies या local storage के साथ सिंक करता है ताकि उपयोगकर्ता की पसंद सेशन्स के बीच बनी रहे।

## प्रॉप्स

- **locale** (वैकल्पिक): वर्तमान locale को मैन्युअली सेट करें।
- **defaultLocale** (वैकल्पिक): कॉन्फ़िगरेशन से डिफ़ॉल्ट locale को ओवरराइड करें।
- **setLocale** (वैकल्पिक): एक कस्टम locale setter फ़ंक्शन प्रदान करें।
- **disableEditor** (वैकल्पिक): विज़ुअल एडिटर एकीकरण को अक्षम करें।
- **isCookieEnabled** (वैकल्पिक): कुकी परसिस्टेंस को सक्षम या अक्षम करें।

---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-native-intlayer पैकेज दस्तावेज़
description: Intlayer के लिए React Native समर्थन, जो प्रोवाइडर और पॉलीफिल्स प्रदान करता है।
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# react-native-intlayer पैकेज

`react-native-intlayer` पैकेज आवश्यक टूल्स प्रदान करता है ताकि Intlayer को React Native एप्लिकेशन्स में एकीकृत किया जा सके। इसमें locale समर्थन के लिए एक प्रोवाइडर और पॉलीफिल्स शामिल हैं।

## इंस्टॉलेशन

```bash
npm install react-native-intlayer
```

## एक्सपोर्ट्स

### प्रोवाइडर

| Component          | विवरण                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Provider component जो आपके एप्लिकेशन को रैप करता है और Intlayer context प्रदान करता है। |

इम्पोर्ट:

```tsx
import "react-native-intlayer";
```

### पॉलीफिल

| फ़ंक्शन            | विवरण                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | React Native के लिए Intlayer का समर्थन करने हेतु आवश्यक polyfills लागू करने वाला फ़ंक्शन। |

इम्पोर्ट:

```tsx
import "react-native-intlayer";
```

### Metro कॉन्फ़िगरेशन

The `react-native-intlayer` पैकेज Metro कॉन्फ़िगरेशन उपयोगिताएँ प्रदान करता है ताकि Intlayer React Native के साथ सही ढंग से काम करे।

| Function                  | Description                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Intlayer को तैयार करने और Metro कॉन्फ़िगरेशन को मर्ज करने वाला असिंक्रोनस फ़ंक्शन।            |
| `configMetroIntlayerSync` | Intlayer संसाधनों को तैयार किए बिना Metro कॉन्फ़िगरेशन को मर्ज करने वाला सिंक्रोनस फ़ंक्शन।   |
| `exclusionList`           | Metro की blockList के लिए RegExp पैटर्न बनाता है ताकि बंडल से कंटेंट फ़ाइलें बाहर की जा सकें। |

Import:

```tsx
import "react-native-intlayer/metro";
```

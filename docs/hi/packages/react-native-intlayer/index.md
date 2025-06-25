---
docName: package__react-native-intlayer
url: https://intlayer.org/doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: पैकेज के डॉक्यूमेंटेशन | react-native-intlayer
description: react-native-intlayer पैकेज का उपयोग कैसे करें
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

**Intlayer** विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`react-native-intlayer` पैकेज** आपको अपने Vite एप्लिकेशन को अंतर्राष्ट्रीयकरण करने की अनुमति देता है। इसमें मेट्रो प्लगइन शामिल है जो पर्यावरण वेरिएबल्स के माध्यम से [मेट्रो बंडलर](https://docs.expo.dev/guides/customizing-metro/) में कॉन्फ़िगरेशन सेट करता है।

## अपने React Native एप्लिकेशन को अंतर्राष्ट्रीयकरण क्यों करें?

अपने React Native एप्लिकेशन को अंतर्राष्ट्रीयकरण करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमियों के लोगों के लिए अधिक सुलभ और प्रासंगिक बनता है।

## कॉन्फ़िगरेशन

`react-native-intlayer` पैकेज [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ सहजता से काम करता है। अधिक जानकारी के लिए संबंधित दस्तावेज़ देखें।

## स्थापना

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## उपयोग का उदाहरण

देखें कि कैसे प्लगइन्स को अपने Vite कॉन्फ़िगरेशन में शामिल करें।

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## अपने Vite एप्लिकेशन के अंतर्राष्ट्रीयकरण में महारत हासिल करें

Intlayer आपके Vite एप्लिकेशन को अंतर्राष्ट्रीयकरण करने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, [React Internationalization (i18n) with Intlayer and React Native](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_react_native+expo.md) गाइड को देखें।**

## Intlayer के बारे में पढ़ें

- [Intlayer वेबसाइट](https://intlayer.org)
- [Intlayer दस्तावेज़](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [हमारे स्मार्ट दस्तावेज़ से अपने सवाल पूछें](https://intlayer.org/docchat)

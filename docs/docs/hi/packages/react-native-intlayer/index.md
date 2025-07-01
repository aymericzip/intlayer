---
docName: package__react-native-intlayer
url: https://intlayer.org/doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: पैकेज दस्तावेज़ीकरण | react-native-intlayer
description: react-native-intlayer पैकेज का उपयोग कैसे करें देखें
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
---

# react-native-intlayer: एक React Native एप्लिकेशन का अंतरराष्ट्रीयकरण (i18n)

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक समूह है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`react-native-intlayer` पैकेज** आपको अपने Vite एप्लिकेशन का अंतरराष्ट्रीयकरण करने की अनुमति देता है। इसमें Metro प्लगइन शामिल है जो पर्यावरण चर के माध्यम से कॉन्फ़िगरेशन सेट करने के लिए [Metro बंडलर](https://docs.expo.dev/guides/customizing-metro/) में काम करता है।

## अपने React Native एप्लिकेशन का अंतरराष्ट्रीयकरण क्यों करें?

अपने React Native एप्लिकेशन का अंतरराष्ट्रीयकरण करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि वाले लोगों के लिए अधिक सुलभ और प्रासंगिक बन जाता है।

## कॉन्फ़िगरेशन

`react-native-intlayer` पैकेज सहजता से [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/index.md) के साथ काम करता है। अधिक जानकारी के लिए संबंधित दस्तावेज़ देखें।

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

देखें कि कैसे अपने vite कॉन्फ़िगरेशन में प्लगइन्स को शामिल किया जाए।

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## अपने Vite एप्लिकेशन के अंतरराष्ट्रीयकरण में महारत हासिल करें

Intlayer आपके Vite एप्लिकेशन को अंतरराष्ट्रीय बनाने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, React Native एप्लिकेशन के लिए [Intlayer और React Native के साथ React अंतरराष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_native+expo.md) गाइड देखें।**

## Intlayer के बारे में पढ़ें

- [Intlayer वेबसाइट](https://intlayer.org)
- [Intlayer प्रलेखन](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [हमारे स्मार्ट प्रलेखन से अपने प्रश्न पूछें](https://intlayer.org/docchat)

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

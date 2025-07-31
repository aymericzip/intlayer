---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: पैकेज दस्तावेज़ीकरण | lynx-intlayer
description: lynx-intlayer पैकेज का उपयोग कैसे करें देखें
keywords:
  - Intlayer
  - lynx-intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - lynx-intlayer
---

# lynx-intlayer: एक Lynx एप्लिकेशन को अंतरराष्ट्रीयकृत (i18n) करें

**Intlayer** पैकेजों का एक समूह है जो विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`lynx-intlayer` पैकेज** आपको अपने Vite एप्लिकेशन को अंतरराष्ट्रीयकृत करने की अनुमति देता है। इसमें Metro प्लगइन शामिल है जो [Lynx बंडलर](https://lynxjs.org/index.html) में पर्यावरण चर के माध्यम से कॉन्फ़िगरेशन सेट करता है।

## अपने Lynx एप्लिकेशन को अंतरराष्ट्रीयकृत क्यों करें?

अपने Lynx एप्लिकेशन को अंतरराष्ट्रीयकृत करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि वाले लोगों के लिए अधिक सुलभ और प्रासंगिक हो जाता है।

## कॉन्फ़िगरेशन

`lynx-intlayer` पैकेज बिना किसी रुकावट के [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/index.md) के साथ काम करता है। अधिक जानकारी के लिए संबंधित दस्तावेज़ देखें।

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## उपयोग का उदाहरण

अपने vite कॉन्फ़िगरेशन में प्लगइन्स को शामिल करने का एक उदाहरण देखें।

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... अन्य प्लगइन्स
    pluginIntlayerLynx(),
  ],
});
```

## अपने Vite एप्लिकेशन के अंतरराष्ट्रीयकरण में महारत हासिल करें

Intlayer आपके Vite एप्लिकेशन को अंतरराष्ट्रीय बनाने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, Lynx एप्लिकेशन के लिए [Intlayer और Lynx के साथ React अंतरराष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_lynx+react.md) गाइड देखें।**

## Intlayer के बारे में पढ़ें

- [Intlayer वेबसाइट](https://intlayer.org)
- [Intlayer दस्तावेज़](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [हमारे स्मार्ट दस्तावेज़ से अपने प्रश्न पूछें](https://intlayer.org/doc/chat)

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

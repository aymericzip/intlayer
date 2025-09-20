---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: पैकेज दस्तावेज़ीकरण | vite-intlayer
description: vite-intlayer पैकेज का उपयोग कैसे करें देखें
keywords:
  - Intlayer
  - vite-intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: Vite एप्लिकेशन को अंतरराष्ट्रीयकृत (i18n) करने के लिए NPM पैकेज

**Intlayer** विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक समूह है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`vite-intlayer` पैकेज** आपको अपने Vite एप्लिकेशन को अंतरराष्ट्रीयकृत करने की अनुमति देता है। इसमें Vite प्लगइन शामिल है जो पर्यावरण चर के माध्यम से कॉन्फ़िगरेशन को [Vite बंडलर](https://vitejs.dev/guide/why.html#why-bundle-for-production) में सेट करता है। यह उपयोगकर्ता की पसंदीदा भाषा का पता लगाने के लिए मिडलवेयर भी प्रदान करता है, और उपयोगकर्ता को [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर पुनः निर्देशित करता है।

## अपने Vite एप्लिकेशन को अंतरराष्ट्रीयकृत क्यों करें?

अपने Vite एप्लिकेशन को अंतरराष्ट्रीयकृत करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा प्रदान करने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि वाले लोगों के लिए अधिक सुलभ और प्रासंगिक बन जाता है।

## कॉन्फ़िगरेशन

`vite-intlayer` पैकेज बिना किसी रुकावट के [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/index.md) के साथ काम करता है। अधिक जानकारी के लिए संबंधित दस्तावेज़ देखें।

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## उपयोग का उदाहरण

अपने vite कॉन्फ़िगरेशन में प्लगइन्स को शामिल करने का एक उदाहरण देखें।

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerMiddlewarePlugin()],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट डिक्लेरेशन फाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

> `intlayerMiddlewarePlugin()` आपके एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ता है। यह प्लगइन URL के आधार पर वर्तमान स्थानीय भाषा का स्वचालित पता लगाएगा और उपयुक्त स्थानीय कुकी सेट करेगा। यदि कोई स्थानीय भाषा निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त स्थानीय भाषा निर्धारित करेगा। यदि कोई स्थानीय भाषा पता नहीं चलती है, तो यह डिफ़ॉल्ट स्थानीय भाषा पर पुनर्निर्देशित करेगा।

## अपने Vite एप्लिकेशन के अंतरराष्ट्रीयकरण में महारत हासिल करना

Intlayer आपके Vite एप्लिकेशन को अंतरराष्ट्रीयकृत करने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, Vite और React एप्लिकेशन के लिए [Intlayer और Vite तथा React के साथ React अंतरराष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) गाइड देखें।**

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

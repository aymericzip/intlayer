---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: पैकेज दस्तावेज़ीकरण | react-scripts-intlayer
description: देखें कि react-scripts-intlayer पैकेज का उपयोग कैसे करें
keywords:
  - Intlayer
  - react-scripts-intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-scripts-intlayer
---

# react-scripts-intlayer: React Create App एप्लिकेशन में Intlayer का उपयोग करने के लिए NPM पैकेज

**Intlayer** पैकेजों का एक समूह है जो विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`react-scripts-intlayer` पैकेज** में `react-scripts-intlayer` कमांड और प्लगइन्स शामिल हैं जो Create React App आधारित एप्लिकेशन के साथ Intlayer को एकीकृत करने के लिए हैं। ये प्लगइन्स [craco](https://craco.js.org/) पर आधारित हैं और [Webpack](https://webpack.js.org/) बंडलर के लिए अतिरिक्त कॉन्फ़िगरेशन शामिल करते हैं।

## कॉन्फ़िगरेशन

`react-scripts-intlayer` पैकेज बिना किसी रुकावट के [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/index.md) के साथ काम करता है। अधिक जानकारी के लिए संबंधित दस्तावेज़ीकरण देखें।

## स्थापना

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## उपयोग

### CLI कमांड्स

`react-scripts-intlayer` पैकेज निम्न CLI कमांड्स प्रदान करता है:

- `npx react-scripts-intlayer build`: Intlayer कॉन्फ़िगरेशन के साथ React एप्लिकेशन बनाता है।
- `npx react-scripts-intlayer start`: Intlayer कॉन्फ़िगरेशन के साथ विकास सर्वर शुरू करता है।

### package.json स्क्रिप्ट्स को बदलें

`react-scripts-intlayer` पैकेज का उपयोग करने के लिए, आपको `package.json` स्क्रिप्ट्स को निम्नलिखित कमांड्स से बदलना होगा:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## कस्टम Webpack कॉन्फ़िगरेशन का उपयोग करें

`react-scripts-intlayer` [craco](https://craco.js.org/) पर आधारित है, जो आपको Webpack कॉन्फ़िगरेशन को कस्टमाइज़ करने की अनुमति देता है।
यदि आपको Webpack कॉन्फ़िगरेशन को कस्टमाइज़ करने की आवश्यकता है, तो आप intlayer craco प्लगइन के आधार पर अपनी खुद की सेटअप भी लागू कर सकते हैं। [यहाँ उदाहरण देखें](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)।

## React Create App के लिए पूर्ण Intlayer गाइड पढ़ें

Intlayer आपकी React एप्लिकेशन को अंतरराष्ट्रीयकृत करने में मदद करने के लिए कई फीचर्स प्रदान करता है।
[Intlayer को React Create App के साथ कैसे उपयोग करें देखें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

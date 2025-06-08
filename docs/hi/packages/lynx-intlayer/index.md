**Intlayer** विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक सेट है। यह React, React और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`lynx-intlayer` पैकेज** आपको अपने Vite एप्लिकेशन का अंतर्राष्ट्रीयकरण करने की अनुमति देता है। इसमें मेट्रो प्लगइन शामिल है जो पर्यावरण वेरिएबल्स के माध्यम से [Lynx बंडलर](https://lynxjs.org/index.html) में कॉन्फ़िगरेशन सेट करता है।

## अपने Lynx एप्लिकेशन का अंतर्राष्ट्रीयकरण क्यों करें?

अपने Lynx एप्लिकेशन का अंतर्राष्ट्रीयकरण करना वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि के लोगों के लिए अधिक सुलभ और प्रासंगिक बनता है।

## कॉन्फ़िगरेशन

`lynx-intlayer` पैकेज [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ सहजता से काम करता है। अधिक जानकारी के लिए संबंधित दस्तावेज़ देखें।

## स्थापना

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

देखें कि कैसे अपने Vite कॉन्फ़िगरेशन में प्लगइन्स को शामिल करें।

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

## अपने Vite एप्लिकेशन के अंतर्राष्ट्रीयकरण में महारत हासिल करना

Intlayer आपके Vite एप्लिकेशन का अंतर्राष्ट्रीयकरण करने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, [React के साथ Intlayer और Lynx का उपयोग करके अंतर्राष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_lynx+react.md) गाइड देखें।**

## Intlayer के बारे में पढ़ें

- [Intlayer वेबसाइट](https://intlayer.org)
- [Intlayer दस्तावेज़](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [हमारे स्मार्ट दस्तावेज़ से अपने प्रश्न पूछें](https://intlayer.org/docchat)

# vite-intlayer: Vite एप्लिकेशन को अंतर्राष्ट्रीयकरण (i18n) करने के लिए NPM पैकेज

**Intlayer** विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक समूह है। यह React, React और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`vite-intlayer` पैकेज** आपको अपने Vite एप्लिकेशन को अंतर्राष्ट्रीयकरण करने की अनुमति देता है। इसमें Vite प्लगइन शामिल है जो पर्यावरण वेरिएबल्स के माध्यम से [Vite बंडलर](https://vitejs.dev/guide/why.html#why-bundle-for-production) में कॉन्फ़िगरेशन सेट करता है। यह उपयोगकर्ता की पसंदीदा भाषा का पता लगाने और उपयोगकर्ता को [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर रीडायरेक्ट करने के लिए मिडलवेयर भी प्रदान करता है।

## अपने Vite एप्लिकेशन को अंतर्राष्ट्रीयकरण क्यों करें?

अपने Vite एप्लिकेशन को अंतर्राष्ट्रीयकरण करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि के लोगों के लिए अधिक सुलभ और प्रासंगिक बनता है।

## कॉन्फ़िगरेशन

`vite-intlayer` पैकेज [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ सहजता से काम करता है। अधिक जानकारी के लिए संबंधित दस्तावेज़ देखें।

## इंस्टॉलेशन

अपना पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

देखें कि अपने Vite कॉन्फ़िगरेशन में प्लगइन्स को कैसे शामिल करें।

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण वेरिएबल्स को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

> `intLayerMiddlewarePlugin()` आपके एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ता है। यह प्लगइन स्वचालित रूप से URL के आधार पर वर्तमान भाषा का पता लगाएगा और उपयुक्त भाषा कुकी सेट करेगा। यदि कोई भाषा निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त भाषा निर्धारित करेगा। यदि कोई भाषा नहीं पाई जाती है, तो यह डिफ़ॉल्ट भाषा पर रीडायरेक्ट करेगा।

## अपने Vite एप्लिकेशन के अंतर्राष्ट्रीयकरण में महारत हासिल करना

Intlayer आपके Vite एप्लिकेशन को अंतर्राष्ट्रीयकरण करने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, [Intlayer और Vite और React के साथ React अंतर्राष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) गाइड देखें।**

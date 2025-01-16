# vite-intlayer: NPM पैकेज एक Vite आवेदन का अंतर्राष्ट्रीयकरण (i18n)

**Intlayer** एक सूट है जो विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`vite-intlayer` पैकेज** आपको अपने Vite अनुप्रयोग का अंतर्राष्ट्रीयकरण करने की अनुमति देता है। इसमें [Vite बंडलर](https://vitejs.dev/guide/why.html#why-bundle-for-production) में पर्यावरण चर के माध्यम से सेटअप करने के लिए Vite प्लगइन शामिल है। यह उपयोगकर्ता की पसंदीदा स्थानीयता का पता लगाने के लिए मध्यस्थता भी प्रदान करता है, और उपयोगकर्ता को [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में निर्दिष्ट सही URL पर पुनर्निर्देशित करता है।

## आपके Vite अनुप्रयोग का अंतर्राष्ट्रीयकरण क्यों?

आपके Vite अनुप्रयोग का अंतर्राष्ट्रीयकरण एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके अनुप्रयोग को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता के अनुभव को बढ़ाती है और विभिन्न भाषाई पृष्ठभूमियों के लोगों के लिए इसे अधिक सुलभ और प्रासंगिक बनाकर आपके एप्लिकेशन की पहुंच का विस्तार करती है।

## कॉन्फ़िगरेशन

`vite-intlayer` पैकेज [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ निर्बाध रूप से काम करता है। अधिक जानकारी के लिए प्रासंगिक दस्तावेज़ों पर नज़र डालें।

## स्थापना

आवश्यक पैकेज को अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके इंस्टॉल करें:

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
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उन्हें मॉनिटर करता है। यह Vite अनुप्रयोग के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

> `intLayerMiddlewarePlugin()` आपके अनुप्रयोग में सर्वर-साइड राउटिंग जोड़ता है। यह प्लगइन URL के आधार पर वर्तमान स्थानीयता का स्वतः पता लगाएगा और सही स्थानीयता कुकी सेट करेगा। यदि कोई स्थानीयता निर्दिष्ट नहीं की गई है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त स्थानीयता को निर्धारित करेगा। यदि कोई स्थानीयता का पता नहीं लगाया गया, तो इसे डिफ़ॉल्ट स्थानीयता पर पुनर्निर्देशित किया जाएगा।

## आपके Vite अनुप्रयोग के अंतर्राष्ट्रीयकरण में महारत

Intlayer आपके Vite अनुप्रयोग का अंतर्राष्ट्रीयकरण करने में मदद के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, Vite और React एप्लिकेशन के लिए [Intlayer और Vite और React के साथ React अंतर्राष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) गाइड को देखें।**

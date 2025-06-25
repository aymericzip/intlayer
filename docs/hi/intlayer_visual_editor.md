---
docName: intlayer_visual_editor
url: /doc/concept/editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Intlayer वीजियो संपादक | वीजियो संपादक का उपयोग करके अपने कंटेंट को संपादित करें
description: Intlayer संपादक का उपयोग करके अपने बहुभाषी वेबसाइट का प्रबंधन करने का तरीका जानें। अपने प्रोजेक्ट को कुछ ही मिनटों में सेट करने के लिए इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करें।
keywords:
  - संपादक
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer विजुअल एडिटर दस्तावेज़ीकरण

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer विजुअल एडिटर एक उपकरण है जो आपके वेबसाइट को विजुअल एडिटर का उपयोग करके आपके सामग्री घोषणा फ़ाइलों के साथ इंटरैक्ट करने के लिए रैप करेगा।

![Intlayer विजुअल एडिटर इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

`intlayer-editor` पैकेज Intlayer पर आधारित है और यह जावास्क्रिप्ट एप्लिकेशन जैसे React (Create React App), Vite + React, और Next.js के लिए उपलब्ध है।

## विजुअल एडिटर बनाम CMS

Intlayer विजुअल एडिटर एक उपकरण है जो आपको स्थानीय शब्दकोशों के लिए विजुअल एडिटर में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार परिवर्तन करने के बाद, सामग्री को कोड-बेस में प्रतिस्थापित किया जाएगा। इसका मतलब है कि एप्लिकेशन को फिर से बनाया जाएगा और पृष्ठ को नई सामग्री प्रदर्शित करने के लिए पुनः लोड किया जाएगा।

इसके विपरीत, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) एक उपकरण है जो आपको दूरस्थ शब्दकोशों के लिए विजुअल एडिटर में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार परिवर्तन करने के बाद, सामग्री आपके कोड-बेस को प्रभावित नहीं करेगी। और वेबसाइट स्वचालित रूप से बदली गई सामग्री प्रदर्शित करेगी।

## अपने एप्लिकेशन में Intlayer को एकीकृत करें

Intlayer को एकीकृत करने के तरीके के बारे में अधिक जानकारी के लिए, नीचे दिए गए संबंधित अनुभाग को देखें:

### Next.js के साथ एकीकरण

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकरण

Create React App के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकरण

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) देखें।

## Intlayer एडिटर कैसे काम करता है

विजुअल एडिटर में दो चीजें शामिल होती हैं:

- एक फ्रंटएंड एप्लिकेशन जो आपके वेबसाइट को एक iframe में प्रदर्शित करेगा। यदि आपका वेबसाइट Intlayer का उपयोग करता है, तो विजुअल एडिटर स्वचालित रूप से आपकी सामग्री का पता लगाएगा और आपको इसके साथ इंटरैक्ट करने की अनुमति देगा। एक बार संशोधन करने के बाद, आप अपने परिवर्तनों को डाउनलोड कर सकते हैं।

- एक बार जब आप डाउनलोड बटन पर क्लिक करते हैं, तो विजुअल एडिटर सर्वर को एक अनुरोध भेजेगा ताकि आपकी सामग्री घोषणा फ़ाइलों को नई सामग्री के साथ प्रतिस्थापित किया जा सके (जहां भी ये फ़ाइलें आपके प्रोजेक्ट में घोषित की गई हैं)।

> ध्यान दें कि फिलहाल, Intlayer एडिटर आपकी सामग्री घोषणा फ़ाइलों को JSON फ़ाइलों के रूप में लिखेगा।

## स्थापना

एक बार Intlayer आपके प्रोजेक्ट में कॉन्फ़िगर हो जाने के बाद, `intlayer-editor` को एक विकास निर्भरता के रूप में स्थापित करें:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## कॉन्फ़िगरेशन

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप एडिटर सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    /**
     * आवश्यक
     * एप्लिकेशन का URL।
     * यह वह URL है जिसे विजुअल एडिटर लक्षित करता है।
     * उदाहरण: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `true`। यदि `false`, तो एडिटर निष्क्रिय है और इसे एक्सेस नहीं किया जा सकता।
     * इसे सुरक्षा कारणों से, जैसे उत्पादन के लिए, विशिष्ट वातावरण के लिए एडिटर को अक्षम करने के लिए उपयोग किया जा सकता है।
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `8000`।
     * एडिटर सर्वर का पोर्ट।
     */
    port: process.env.INTLAYER_PORT,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से "http://localhost:8000"
     * एडिटर सर्वर का URL।
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    /**
     * आवश्यक
     * एप्लिकेशन का URL।
     * यह वह URL है जिसे विजुअल एडिटर लक्षित करता है।
     * उदाहरण: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `true`। यदि `false`, तो एडिटर निष्क्रिय है और इसे एक्सेस नहीं किया जा सकता।
     * इसे सुरक्षा कारणों से, जैसे उत्पादन के लिए, विशिष्ट वातावरण के लिए एडिटर को अक्षम करने के लिए उपयोग किया जा सकता है।
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `8000`।
     * विजुअल एडिटर सर्वर द्वारा उपयोग किया जाने वाला पोर्ट।
     */
    port: process.env.INTLAYER_PORT,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से "http://localhost:8000"
     * एप्लिकेशन से पहुंचने के लिए एडिटर सर्वर का URL। सुरक्षा कारणों से एप्लिकेशन के साथ इंटरैक्ट करने वाले मूल को प्रतिबंधित करने के लिए उपयोग किया जाता है। यदि `'*'` पर सेट किया गया है, तो एडिटर किसी भी मूल से सुलभ है। इसे सेट किया जाना चाहिए यदि पोर्ट बदला गया है, या यदि एडिटर किसी अन्य डोमेन पर होस्ट किया गया है।
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    /**
     * आवश्यक
     * एप्लिकेशन का URL।
     * यह वह URL है जिसे विजुअल एडिटर लक्षित करता है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `8000`।
     * एडिटर सर्वर का पोर्ट।
     */
    port: process.env.INTLAYER_PORT,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से "http://localhost:8000"
     * एडिटर सर्वर का URL।
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `true`। यदि `false`, तो एडिटर निष्क्रिय है और इसे एक्सेस नहीं किया जा सकता।
     * इसे सुरक्षा कारणों से, जैसे उत्पादन के लिए, विशिष्ट वातावरण के लिए एडिटर को अक्षम करने के लिए उपयोग किया जा सकता है।
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

## एडिटर का उपयोग करना

1. जब एडिटर स्थापित हो जाए, तो निम्नलिखित कमांड का उपयोग करके एडिटर शुरू करें:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **ध्यान दें कि आपको अपने एप्लिकेशन को समानांतर में चलाना चाहिए।** एप्लिकेशन URL को एडिटर कॉन्फ़िगरेशन (`applicationURL`) में सेट किए गए URL से मेल खाना चाहिए।

2. फिर, प्रदान किए गए URL को खोलें। डिफ़ॉल्ट रूप से `http://localhost:8000`।

   आप अपने कर्सर के साथ अपनी सामग्री पर होवर करके Intlayer द्वारा इंडेक्स किए गए प्रत्येक फ़ील्ड को देख सकते हैं।

   ![सामग्री पर होवर करना](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. यदि आपकी सामग्री को रेखांकित किया गया है, तो आप इसे संपादन ड्रॉअर प्रदर्शित करने के लिए लंबे समय तक दबा सकते हैं।

## डिबग

यदि आपको विजुअल एडिटर के साथ कोई समस्या हो रही है, तो निम्नलिखित की जांच करें:

- विजुअल एडिटर और एप्लिकेशन चल रहे हैं।

- Intlayer कॉन्फ़िगरेशन फ़ाइल में [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) कॉन्फ़िगरेशन सही ढंग से सेट हैं।

  - आवश्यक फ़ील्ड:
    - एप्लिकेशन URL को एडिटर कॉन्फ़िगरेशन (`applicationURL`) में सेट किए गए URL से मेल खाना चाहिए।

- विजुअल एडिटर आपके वेबसाइट को प्रदर्शित करने के लिए एक iframe का उपयोग करता है। सुनिश्चित करें कि आपके वेबसाइट की सामग्री सुरक्षा नीति (CSP) CMS URL को `frame-ancestors` के रूप में अनुमति देती है ('http://localhost:8000' डिफ़ॉल्ट रूप से)। एडिटर कंसोल में किसी भी त्रुटि की जांच करें।

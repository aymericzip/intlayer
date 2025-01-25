# Intlayer Visual Editor Documentation

Intlayer Visual Editor एक ऐसा उपकरण है जो आपके वेबसाइट को आपकी सामग्री घोषणा फाइलों के साथ इंटरैक्ट करने के लिए एक दृश्य संपादक का उपयोग करके लपेटता है।

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

`intlayer-editor` पैकेज Intlayer पर आधारित है और यह JavaScript अनुप्रयोगों के लिए उपलब्ध है, जैसे कि React (Create React App), Vite + React, और Next.js।

## Visual editor vs CMS

Intlayer Visual संपादक एक उपकरण है जो आपको स्थानीय शब्दकोशों के लिए एक दृश्य संपादक में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार जब परिवर्तन किया जाता है, तो सामग्री को कोड-बेस में बदल दिया जाएगा। इसका मतलब है कि अनुप्रयोग को फिर से बनाया जाएगा और नए सामग्री को प्रदर्शित करने के लिए पृष्ठ को फिर से लोड किया जाएगा।

इसके विपरीत, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) एक उपकरण है जो आपको दूरस्थ शब्दकोशों के लिए दृश्य संपादक में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार जब परिवर्तन किया जाता है, तो सामग्री को **नहीं** कोड-बेस पर प्रभाव डालेगा। और वेबसाइट स्वचालित रूप से बदली हुई सामग्री को प्रदर्शित करेगी।

## Integrate Intlayer into your application

Intlayer को अपने अनुप्रयोग में एकीकृत करने के बारे में अधिक विवरण के लिए, नीचे दिए गए संबंधित अनुभाग को देखें:

### Integrating with Next.js

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) को देखें।

### Integrating with Create React App

Create React App के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) को देखें।

### Integrating with Vite + React

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) को देखें।

## How Intlayer Editor Works

एक अनुप्रयोग में Visual संपादक में दो बातें शामिल हैं:

- एक फ़्रंटेंड अनुप्रयोग जो आपके वेबसाइट को iframe में प्रदर्शित करेगा। यदि आपकी वेबसाइट Intlayer का उपयोग करती है, तो Visual संपादक स्वचालित रूप से आपकी सामग्री का पता लगाएगा, और आपको इसके साथ इंटरैक्ट करने की अनुमति देगा। एक बार जब एक संशोधन किया जाता है, तो आप अपने परिवर्तनों को डाउनलोड कर सकेंगे।

- एक बार जब आप डाउनलोड बटन पर क्लिक करते हैं, तो Visual संपादक आपके सामग्री घोषणा फाइलों को नए सामग्री के साथ बदलने के लिए सर्वर को एक अनुरोध भेजेगा (यद्यपि ये फ़ाइलें आपके प्रोजेक्ट में कहीं भी घोषित की गई हैं)।

> ध्यान दें कि फिलहाल, Intlayer संपादक आपकी सामग्री घोषणा फाइलों को JSON फाइलों के रूप में लिखेगा।

## Installation

एक बार जब Intlayer आपके प्रोजेक्ट में कॉन्फ़िगर किया जाता है, तो बस `intlayer-editor` को विकास निर्भरता के रूप में स्थापित करें:

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## Configuration

### 1. अपने intlayer.config.ts फ़ाइल में संपादक को सक्षम करें

आपकी Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप संपादक सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    /**
     * आवश्यक
     * अनुप्रयोग का URL।
     * यह URL है जो Visual संपादक द्वारा लक्षित है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट `8000` के रूप में।
     * संपादक सर्वर का पोर्ट।
     */
    port: process.env.INTLAYER_PORT,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से "http://localhost:8000"
     * संपादक सर्वर का URL।
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `true`। यदि `false`, तो संपादक निष्क्रिय है और उसे एक्सेस नहीं किया जा सकता है।
     * सुरक्षा कारणों से, जैसे कि उत्पादन के लिए, विशेष वातावरणों के लिए संपादक को निष्क्रिय करने के लिए इसका उपयोग किया जा सकता है।
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
   /**
     * आवश्यक
     * अनुप्रयोग का URL।
     * यह URL है जो Visual संपादक द्वारा लक्षित है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट `8000` के रूप में।
     * संपादक सर्वर का पोर्ट।
     */
    port: process.env.INTLAYER_PORT,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से "http://localhost:8000"
     * संपादक सर्वर का URL।
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `true`। यदि `false`, तो संपादक निष्क्रिय है और उसे एक्सेस नहीं किया जा सकता है।
     * सुरक्षा कारणों से, जैसे कि उत्पादन के लिए, विशेष वातावरणों के लिए संपादक को निष्क्रिय करने के लिए इसका उपयोग किया जा सकता है।
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
   /**
     * आवश्यक
     * अनुप्रयोग का URL।
     * यह URL है जो Visual संपादक द्वारा लक्षित है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट `8000` के रूप में।
     * संपादक सर्वर का पोर्ट।
     */
    port: process.env.INTLAYER_PORT,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से "http://localhost:8000"
     * संपादक सर्वर का URL।
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `true`। यदि `false`, तो संपादक निष्क्रिय है और उसे एक्सेस नहीं किया जा सकता है।
     * सुरक्षा कारणों से, जैसे कि उत्पादन के लिए, विशेष वातावरणों के लिए संपादक को निष्क्रिय करने के लिए इसका उपयोग किया जा सकता है।
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) को देखें।

## Using the Editor

1. जब संपादक स्थापित हो जाता है, तो आप निम्नलिखित आदेश का उपयोग करके संपादक को चालू कर सकते हैं:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. फिर, प्रदत्त URL खोलें। डिफ़ॉल्ट रूप से `http://localhost:8000`।

   आप अपने सामग्री पर कर्सर के साथ होवर करके Intlayer द्वारा अनुक्रमित प्रत्येक फ़ील्ड को देख सकते हैं।

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. यदि आपकी सामग्री को outlined किया गया है, तो आप इसे संपादित दराज प्रदर्शित करने के लिए लंबे समय तक दबा सकते हैं।

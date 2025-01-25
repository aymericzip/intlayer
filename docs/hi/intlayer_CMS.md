# Intlayer सामग्री प्रबंधन प्रणाली (CMS) दस्तावेज़

Intlayer CMS एक एप्लिकेशन है जो आपको Intlayer प्रोजेक्ट की सामग्री को बाहरी बनाने की अनुमति देता है।

इसके लिए, Intlayer 'दूर के शब्दकोष' के सिद्धांत को पेश करता है।

## दूर के शब्दकोष को समझना

Intlayer 'स्थानीय' और 'दूर' शब्दकोष के बीच अंतर करता है।

- 'स्थानीय' शब्दकोष एक शब्दकोष है जो आपके Intlayer प्रोजेक्ट में घोषित किया गया है। जैसे कि किसी बटन का घोषणा फ़ाइल, या आपका नेविगेशन बार। आपकी सामग्री को बाहरी बनाना इस मामले में समझदारी नहीं है क्योंकि यह सामग्री अक्सर बदलने की उम्मीद नहीं है।

- 'दूर' शब्दकोष एक ऐसा शब्दकोष है जिसे Intlayer CMS के माध्यम से प्रबंधित किया जाता है। यह आपकी टीम को आपकी सामग्री को आपकी वेबसाइट पर सीधे प्रबंधित करने की अनुमति देने में सहायक हो सकता है, और इसका उद्देश्य A/B परीक्षण सुविधाओं और SEO स्वचालित अनुकूलन का उपयोग करना है।

## दृश्य संपादक बनाम CMS

[Intlayer दृश्य](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) संपादक एक उपकरण है जो आपको स्थानीय शब्दकोष के लिए एक दृश्य संपादक में अपनी सामग्री को प्रबंधित करने की अनुमति देता है। एक बार जब परिवर्तन किया जाता है, तो सामग्री कोड-बेस में बदल दी जाएगी। इसका मतलब है कि एप्लिकेशन का पुनर्निर्माण किया जाएगा और पृष्ठ को नई सामग्री दिखाने के लिए फिर से लोड किया जाएगा।

इसके विपरीत, Intlayer CMS एक ऐसा उपकरण है जो आपको दूर के शब्दकोष के लिए एक दृश्य संपादक में अपनी सामग्री को प्रबंधित करने की अनुमति देता है। एक बार जब परिवर्तन किया जाता है, तो सामग्री आपके कोड-बेस पर **प्रभावित** नहीं होगी। और वेबसाइट स्वचालित रूप से बदली हुई सामग्री को प्रदर्शित करेगी।

## एकीकृत करना

पैकेज को स्थापित करने के लिए अधिक विवरण के लिए, नीचे दिए गए संबंधित अनुभाग को देखें:

### Next.js के साथ एकीकृत करना

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकृत करना

Create React App के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकृत करना

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) देखें।

## कॉन्फ़िगरेशन

### 1. अपने intlayer.config.ts फ़ाइल में संपादक सक्षम करें

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप संपादक की सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    /**
     * क्लाइंट आईडी और क्लाइंट सीक्रेट संपादक को सक्षम करने के लिए आवश्यक हैं।
     * ये उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है - (https://intlayer.org/dashboard/projects)।
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट `true` के रूप में होता है। यदि `false` है, तो संपादक निष्क्रिय होता है और इसे एक्सेस नहीं किया जा सकता।
     * सुरक्षा कारणों से, जैसे कि उत्पादन, विशिष्ट वातावरण के लिए संपादक को अक्षम करने के लिए इसका उपयोग किया जा सकता है।
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
     * क्लाइंट आईडी और क्लाइंट सीक्रेट संपादक को सक्षम करने के लिए आवश्यक हैं।
     * ये उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है - (https://intlayer.org/dashboard/projects)।
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट `true` के रूप में होता है। यदि `false` है, तो संपादक निष्क्रिय होता है और इसे एक्सेस नहीं किया जा सकता।
     * सुरक्षा कारणों से, जैसे कि उत्पादन, विशिष्ट वातावरण के लिए संपादक को अक्षम करने के लिए इसका उपयोग किया जा सकता है।
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
     * क्लाइंट आईडी और क्लाइंट सीक्रेट संपादक को सक्षम करने के लिए आवश्यक हैं।
     * ये उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है - (https://intlayer.org/dashboard/projects)।
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट `true` के रूप में होता है। यदि `false` है, तो संपादक निष्क्रिय होता है और इसे एक्सेस नहीं किया जा सकता।
     * सुरक्षा कारणों से, जैसे कि उत्पादन, विशिष्ट वातावरण के लिए संपादक को अक्षम करने के लिए इसका उपयोग किया जा सकता है।
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> यदि आपके पास क्लाइंट आईडी और क्लाइंट सीक्रेट नहीं है, तो आप इन्हें [Intlayer डैशबोर्ड - प्रोजेक्ट्स](https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामीटर देखने के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

## CMS का उपयोग करना

जब संपादक स्थापित होता है, तो आप अपने कंटेंट पर माउस ले जाकर Intlayer द्वारा अनुक्रमित प्रत्येक फ़ील्ड को देख सकते हैं।

![सामग्री पर होवर करना](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

यदि आपकी सामग्री को रेखांकित किया गया है, तो आप संपादन ड्रावर दिखाने के लिए इसे लंबे समय तक दबा सकते हैं।

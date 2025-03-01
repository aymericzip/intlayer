# Intlayer सामग्री प्रबंधन प्रणाली (CMS) दस्तावेज़ीकरण

Intlayer CMS एक ऐसा एप्लिकेशन है जो आपको Intlayer प्रोजेक्ट की सामग्री को बाहरी रूप से प्रबंधित करने की अनुमति देता है।

इसके लिए, Intlayer 'दूरस्थ शब्दकोशों' की अवधारणा प्रस्तुत करता है।

![Intlayer CMS इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## दूरस्थ शब्दकोशों को समझना

Intlayer 'स्थानीय' और 'दूरस्थ' शब्दकोशों के बीच अंतर करता है।

- एक 'स्थानीय' शब्दकोश वह शब्दकोश है जिसे आपके Intlayer प्रोजेक्ट में घोषित किया गया है। जैसे कि बटन की घोषणा फ़ाइल, या आपका नेविगेशन बार। इस मामले में आपकी सामग्री को बाहरी रूप से प्रबंधित करना समझ में नहीं आता क्योंकि यह सामग्री अक्सर बदलने वाली नहीं होती।

- एक 'दूरस्थ' शब्दकोश वह शब्दकोश है जिसे Intlayer CMS के माध्यम से प्रबंधित किया जाता है। यह आपकी टीम को सीधे आपकी वेबसाइट पर सामग्री प्रबंधित करने की अनुमति देने के लिए उपयोगी हो सकता है, और साथ ही A/B परीक्षण सुविधाओं और SEO स्वचालित अनुकूलन का उपयोग करने का लक्ष्य रखता है।

## दृश्य संपादक बनाम CMS

[Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) संपादक एक उपकरण है जो आपको स्थानीय शब्दकोशों के लिए एक दृश्य संपादक में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार परिवर्तन करने के बाद, सामग्री को कोड-बेस में प्रतिस्थापित कर दिया जाएगा। इसका मतलब है कि एप्लिकेशन को फिर से बनाया जाएगा और नए सामग्री को प्रदर्शित करने के लिए पृष्ठ को पुनः लोड किया जाएगा।

इसके विपरीत, Intlayer CMS एक उपकरण है जो आपको दूरस्थ शब्दकोशों के लिए एक दृश्य संपादक में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार परिवर्तन करने के बाद, सामग्री आपके कोड-बेस को प्रभावित **नहीं** करेगी। और वेबसाइट स्वचालित रूप से बदली गई सामग्री प्रदर्शित करेगी।

## एकीकरण

पैकेज को स्थापित करने के तरीके पर अधिक विवरण के लिए, नीचे दिए गए संबंधित अनुभाग को देखें:

### Next.js के साथ एकीकरण

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकरण

Create React App के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकरण

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) देखें।

## कॉन्फ़िगरेशन

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप CMS सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    /**
     * आवश्यक
     *
     * एप्लिकेशन का URL।
     * यह वह URL है जिसे दृश्य संपादक लक्षित करता है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * आवश्यक
     *
     * संपादक को सक्षम करने के लिए क्लाइंट आईडी और क्लाइंट सीक्रेट आवश्यक हैं।
     * वे उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप CMS का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, यह https://intlayer.org पर सेट है।
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप बैकएंड का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, यह https://back.intlayer.org पर सेट है।
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * एप्लिकेशन का URL।
     * यह वह URL है जिसे दृश्य संपादक लक्षित करता है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * आवश्यक
     *
     * संपादक को सक्षम करने के लिए क्लाइंट आईडी और क्लाइंट सीक्रेट आवश्यक हैं।
     * वे उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप CMS का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, यह https://intlayer.org पर सेट है।
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप बैकएंड का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, यह https://back.intlayer.org पर सेट है।
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * एप्लिकेशन का URL।
     * यह वह URL है जिसे दृश्य संपादक लक्षित करता है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * आवश्यक
     *
     * संपादक को सक्षम करने के लिए क्लाइंट आईडी और क्लाइंट सीक्रेट आवश्यक हैं।
     * वे उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप CMS का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, यह https://intlayer.org पर सेट है।
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप बैकएंड का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, यह https://back.intlayer.org पर सेट है।
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> यदि आपके पास क्लाइंट आईडी और क्लाइंट सीक्रेट नहीं है, तो आप [Intlayer डैशबोर्ड - प्रोजेक्ट्स](https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर इन्हें प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

## CMS का उपयोग करना

### अपनी कॉन्फ़िगरेशन अपलोड करें

Intlayer CMS को कॉन्फ़िगर करने के लिए, आप [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/hi/intlayer_cli.md) कमांड्स का उपयोग कर सकते हैं।

```bash
npx intlayer config push
```

> यदि आप अपने `intlayer.config.ts` कॉन्फ़िगरेशन फ़ाइल में पर्यावरण वेरिएबल्स का उपयोग करते हैं, तो आप `--env` तर्क का उपयोग करके वांछित पर्यावरण निर्दिष्ट कर सकते हैं:

```bash
npx intlayer config push --env production
```

यह कमांड आपकी कॉन्फ़िगरेशन को Intlayer CMS पर अपलोड करता है।

### एक शब्दकोश अपलोड करें

अपने स्थानीय शब्दकोशों को दूरस्थ शब्दकोश में बदलने के लिए, आप [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/hi/intlayer_cli.md) कमांड्स का उपयोग कर सकते हैं।

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> यदि आप अपने `intlayer.config.ts` कॉन्फ़िगरेशन फ़ाइल में पर्यावरण वेरिएबल्स का उपयोग करते हैं, तो आप `--env` तर्क का उपयोग करके वांछित पर्यावरण निर्दिष्ट कर सकते हैं:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

यह कमांड आपकी प्रारंभिक सामग्री शब्दकोशों को अपलोड करता है, जिससे वे Intlayer प्लेटफ़ॉर्म के माध्यम से असिंक्रोनस फेचिंग और संपादन के लिए उपलब्ध हो जाते हैं।

### शब्दकोश संपादित करें

इसके बाद आप [Intlayer CMS](https://intlayer.org/dashboard/content) में अपने शब्दकोश को देख और प्रबंधित कर सकते हैं।

## हॉट रीलोडिंग

Intlayer CMS तब शब्दकोशों को हॉट रीलोड कर सकता है जब कोई परिवर्तन पता चलता है।

हॉट रीलोडिंग के बिना, नई सामग्री प्रदर्शित करने के लिए एप्लिकेशन का एक नया निर्माण आवश्यक होगा।

[`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration) कॉन्फ़िगरेशन को सक्रिय करके, एप्लिकेशन स्वचालित रूप से अद्यतन सामग्री को प्रतिस्थापित करेगा जब इसे पता लगाया जाएगा।

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    // ... अन्य कॉन्फ़िगरेशन सेटिंग्स

    /**
     * यह संकेत करता है कि क्या एप्लिकेशन को स्थानीय कॉन्फ़िगरेशन को हॉट रीलोड करना चाहिए जब कोई परिवर्तन पता चलता है।
     * उदाहरण के लिए, जब कोई नया शब्दकोश जोड़ा या अपडेट किया जाता है, तो एप्लिकेशन पृष्ठ में प्रदर्शित सामग्री को अपडेट करेगा।
     *
     * क्योंकि हॉट रीलोडिंग को सर्वर के साथ एक निरंतर कनेक्शन की आवश्यकता होती है, यह केवल `एंटरप्राइज़` योजना के ग्राहकों के लिए उपलब्ध है।
     *
     * डिफ़ॉल्ट: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    // ... अन्य कॉन्फ़िगरेशन सेटिंग्स

    /**
     * यह संकेत करता है कि क्या एप्लिकेशन को स्थानीय कॉन्फ़िगरेशन को हॉट रीलोड करना चाहिए जब कोई परिवर्तन पता चलता है।
     * उदाहरण के लिए, जब कोई नया शब्दकोश जोड़ा या अपडेट किया जाता है, तो एप्लिकेशन पृष्ठ में प्रदर्शित सामग्री को अपडेट करेगा।
     *
     * क्योंकि हॉट रीलोडिंग को सर्वर के साथ एक निरंतर कनेक्शन की आवश्यकता होती है, यह केवल `एंटरप्राइज़` योजना के ग्राहकों के लिए उपलब्ध है।
     *
     * डिफ़ॉल्ट: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    // ... अन्य कॉन्फ़िगरेशन सेटिंग्स

    /**
     * यह संकेत करता है कि क्या एप्लिकेशन को स्थानीय कॉन्फ़िगरेशन को हॉट रीलोड करना चाहिए जब कोई परिवर्तन पता चलता है।
     * उदाहरण के लिए, जब कोई नया शब्दकोश जोड़ा या अपडेट किया जाता है, तो एप्लिकेशन पृष्ठ में प्रदर्शित सामग्री को अपडेट करेगा।
     *
     * क्योंकि हॉट रीलोडिंग को सर्वर के साथ एक निरंतर कनेक्शन की आवश्यकता होती है, यह केवल `एंटरप्राइज़` योजना के ग्राहकों के लिए उपलब्ध है।
     *
     * डिफ़ॉल्ट: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

हॉट रीलोडिंग सामग्री को सर्वर और क्लाइंट दोनों पक्षों पर प्रतिस्थापित करता है।

- सर्वर पक्ष पर, आपको यह सुनिश्चित करना चाहिए कि एप्लिकेशन प्रक्रिया को `.intlayer/dictionaries` निर्देशिका में लिखने की अनुमति है।
- क्लाइंट पक्ष पर, हॉट रीलोडिंग एप्लिकेशन को ब्राउज़र में सामग्री को हॉट रीलोड करने की अनुमति देता है, बिना पृष्ठ को पुनः लोड करने की आवश्यकता के। हालांकि, यह सुविधा केवल क्लाइंट्स घटकों के लिए उपलब्ध है।

> क्योंकि हॉट रीलोडिंग को सर्वर के साथ एक निरंतर कनेक्शन की आवश्यकता होती है, यह केवल `एंटरप्राइज़` योजना के ग्राहकों के लिए उपलब्ध है।

## डिबग

यदि आपको CMS के साथ कोई समस्या आती है, तो निम्नलिखित की जांच करें:

- एप्लिकेशन चल रहा है।

- आपके Intlayer कॉन्फ़िगरेशन फ़ाइल में [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) कॉन्फ़िगरेशन सही ढंग से सेट हैं।

  - आवश्यक फ़ील्ड:
    - एप्लिकेशन URL को संपादक कॉन्फ़िगरेशन (`applicationURL`) में सेट किए गए URL से मेल खाना चाहिए।
    - CMS URL

- सुनिश्चित करें कि प्रोजेक्ट कॉन्फ़िगरेशन को Intlayer CMS पर अपलोड किया गया है।

- दृश्य संपादक आपकी वेबसाइट को प्रदर्शित करने के लिए एक iframe का उपयोग करता है। सुनिश्चित करें कि आपकी वेबसाइट की सामग्री सुरक्षा नीति (CSP) CMS URL को `frame-ancestors` के रूप में अनुमति देती है ('https://intlayer.org' डिफ़ॉल्ट रूप से)। किसी भी त्रुटि के लिए संपादक कंसोल की जांच करें।

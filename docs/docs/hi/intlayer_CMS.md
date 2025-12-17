---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | अपने कंटेंट को Intlayer CMS में बाहरीकृत करें
description: अपने कंटेंट को Intlayer CMS में बाहरीकृत करें ताकि आप अपनी टीम को कंटेंट प्रबंधन सौंप सकें।
keywords:
  - CMS
  - विज़ुअल एडिटर
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: लाइव सिंक दस्तावेज़ीकरण जोड़ें
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` फ़ील्ड को `liveSync` से बदलें
  - version: 5.5.10
    date: 2025-06-29
    changes: इतिहास प्रारंभ करें
---

# Intlayer कंटेंट प्रबंधन प्रणाली (CMS) दस्तावेज़ीकरण

<iframe title="आपके वेब ऐप के लिए विज़ुअल एडिटर + CMS: Intlayer समझाया गया" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS एक एप्लिकेशन है जो आपको Intlayer प्रोजेक्ट की अपनी सामग्री को बाहरीकृत करने की अनुमति देता है।

इसके लिए, Intlayer ने 'दूरस्थ शब्दकोश' (distant dictionaries) की अवधारणा पेश की है।

![Intlayer CMS इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## दूरस्थ शब्दकोश को समझना

Intlayer 'स्थानीय' (local) और 'दूरस्थ' (distant) शब्दकोश के बीच अंतर करता है।

- एक 'स्थानीय' शब्दकोश वह शब्दकोश होता है जिसे आपके Intlayer प्रोजेक्ट में घोषित किया गया है। जैसे कि किसी बटन की घोषणा फ़ाइल, या आपकी नेविगेशन बार। इस मामले में अपनी सामग्री को बाहरीकृत करना उचित नहीं है क्योंकि इस सामग्री को अक्सर बदलने की आवश्यकता नहीं होती।

- एक 'दूरस्थ' शब्दकोश वह शब्दकोश होता है जिसे Intlayer CMS के माध्यम से प्रबंधित किया जाता है। यह आपकी टीम को आपकी वेबसाइट पर सीधे आपकी सामग्री प्रबंधित करने की अनुमति देने के लिए उपयोगी हो सकता है, और साथ ही A/B परीक्षण सुविधाओं और SEO स्वचालित अनुकूलन का उपयोग करने का लक्ष्य रखता है।

## विज़ुअल एडिटर बनाम CMS

[Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) संपादक एक उपकरण है जो आपको स्थानीय शब्दकोशों के लिए एक दृश्य संपादक में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार परिवर्तन करने के बाद, सामग्री को कोड-बेस में प्रतिस्थापित कर दिया जाएगा। इसका मतलब है कि एप्लिकेशन को पुनः बनाया जाएगा और नया सामग्री दिखाने के लिए पृष्ठ को पुनः लोड किया जाएगा।

इसके विपरीत, Intlayer CMS एक उपकरण है जो आपको दूरस्थ शब्दकोशों के लिए एक दृश्य संपादक में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार परिवर्तन करने के बाद, सामग्री आपके कोड-बेस को प्रभावित **नहीं** करेगी। और वेबसाइट स्वचालित रूप से बदली गई सामग्री प्रदर्शित करेगी।

## एकीकरण

पैकेज को स्थापित करने के बारे में अधिक विवरण के लिए, नीचे संबंधित अनुभाग देखें:

### Next.js के साथ एकीकरण

Next.js के साथ एकीकरण के लिए, कृपया [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकरण

Create React App के साथ एकीकरण के लिए, कृपया [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकरण

Vite + React के साथ एकीकरण के लिए, कृपया [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) देखें।

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
     * यह URL विज़ुअल एडिटर द्वारा लक्षित किया जाता है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * आवश्यक
     *
     * एडिटर को सक्षम करने के लिए क्लाइंट ID और क्लाइंट सीक्रेट आवश्यक हैं।
     * ये उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
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
     * डिफ़ॉल्ट रूप से, इसे https://intlayer.org पर सेट किया गया है।
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप बैकएंड का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, इसे https://back.intlayer.org पर सेट किया गया है।
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
     * यह वह URL है जिसे विज़ुअल एडिटर लक्षित करता है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * आवश्यक
     *
     * एडिटर को सक्षम करने के लिए क्लाइंट ID और क्लाइंट सीक्रेट आवश्यक हैं।
     * ये उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
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
     * डिफ़ॉल्ट रूप से, यह https://intlayer.org पर सेट होता है।
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप बैकएंड का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, यह https://back.intlayer.org पर सेट होता है।
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
     * यह वह URL है जिसे विज़ुअल एडिटर लक्षित करता है।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * आवश्यक
     *
     * एडिटर को सक्षम करने के लिए क्लाइंट ID और क्लाइंट सीक्रेट आवश्यक हैं।
     * ये उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
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
     * डिफ़ॉल्ट रूप से, यह https://intlayer.org पर सेट होता है।
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * वैकल्पिक
     *
     * यदि आप Intlayer CMS को स्वयं होस्ट कर रहे हैं, तो आप बैकएंड का URL सेट कर सकते हैं।
     *
     * Intlayer CMS का URL।
     * डिफ़ॉल्ट रूप से, यह https://back.intlayer.org पर सेट होता है।
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> यदि आपके पास क्लाइंट ID और क्लाइंट सीक्रेट नहीं है, तो आप इन्हें [Intlayer डैशबोर्ड - प्रोजेक्ट्स](https://intlayer.org/dashboard/projects) में नया क्लाइंट बनाकर प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## CMS का उपयोग करना

### अपनी कॉन्फ़िगरेशन पुश करें

Intlayer CMS को कॉन्फ़िगर करने के लिए, आप [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/hi/intlayer_cli.md) कमांड्स का उपयोग कर सकते हैं।

```bash
npx intlayer config push
```

> यदि आप अपनी `intlayer.config.ts` कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर (environment variables) का उपयोग करते हैं, तो आप `--env` तर्क का उपयोग करके इच्छित पर्यावरण निर्दिष्ट कर सकते हैं:

```bash
npx intlayer config push --env production
```

यह कमांड आपकी कॉन्फ़िगरेशन को Intlayer CMS पर अपलोड करता है।

### एक शब्दकोश (डिक्शनरी) पुश करें

अपने लोकल शब्दकोशों को दूरस्थ शब्दकोश में बदलने के लिए, आप [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/hi/intlayer_cli.md) कमांड्स का उपयोग कर सकते हैं।

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> यदि आप अपनी `intlayer.config.ts` कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर (environment variables) का उपयोग करते हैं, तो आप `--env` तर्क का उपयोग करके इच्छित पर्यावरण निर्दिष्ट कर सकते हैं:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

यह कमांड आपकी प्रारंभिक सामग्री शब्दकोशों को अपलोड करता है, जिससे वे Intlayer प्लेटफ़ॉर्म के माध्यम से असिंक्रोनस रूप से प्राप्त करने और संपादित करने के लिए उपलब्ध हो जाते हैं।

### शब्दकोश संपादित करें

फिर आप अपने शब्दकोश को [Intlayer CMS](https://intlayer.org/dashboard/content) में देख और प्रबंधित कर सकेंगे।

## लाइव सिंक

लाइव सिंक आपकी ऐप को रनटाइम पर CMS सामग्री परिवर्तनों को प्रतिबिंबित करने देता है। पुनर्निर्माण या पुनः तैनाती की आवश्यकता नहीं होती। जब सक्षम किया जाता है, तो अपडेट्स लाइव सिंक सर्वर को स्ट्रीम किए जाते हैं जो आपके एप्लिकेशन द्वारा पढ़े जाने वाले शब्दकोशों को ताज़ा करता है।

> लाइव सिंक के लिए एक निरंतर सर्वर कनेक्शन आवश्यक होता है और यह एंटरप्राइज योजना पर उपलब्ध है।

अपने Intlayer कॉन्फ़िगरेशन को अपडेट करके लाइव सिंक सक्षम करें:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    /**
     * जब परिवर्तन पता चलते हैं तो लोकल कॉन्फ़िगरेशन के हॉट रीलोडिंग को सक्षम करता है।
     * उदाहरण के लिए, जब कोई शब्दकोश जोड़ा या अपडेट किया जाता है, तो एप्लिकेशन
     * पृष्ठ पर प्रदर्शित सामग्री को अपडेट करता है।
     *
     * क्योंकि हॉट रीलोडिंग के लिए सर्वर से निरंतर कनेक्शन आवश्यक है,
     * यह केवल `enterprise` योजना के क्लाइंट्स के लिए उपलब्ध है।
     *
     * डिफ़ॉल्ट: false
     */
    liveSync: true,
  },
  build: {
    /**
     * नियंत्रित करता है कि शब्दकोश कैसे आयात किए जाते हैं:
     *
     * - "live": शब्दकोश लाइव सिंक API का उपयोग करके गतिशील रूप से प्राप्त किए जाते हैं।
     *   useIntlayer को useDictionaryDynamic से प्रतिस्थापित करता है।
     *
     * नोट: लाइव मोड शब्दकोश प्राप्त करने के लिए लाइव सिंक API का उपयोग करता है। यदि API कॉल विफल हो जाती है,
     * तो शब्दकोश गतिशील रूप से आयात किए जाते हैं।
     * नोट: केवल दूरस्थ सामग्री वाले और "live" फ्लैग वाले शब्दकोश लाइव मोड का उपयोग करते हैं।
     * अन्य प्रदर्शन के लिए डायनेमिक मोड का उपयोग करते हैं।
     */
    importMode: "live",
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
     * जब परिवर्तन पता चलते हैं तो लोकल कॉन्फ़िगरेशन के हॉट रीलोडिंग को सक्षम करता है।
     * उदाहरण के लिए, जब कोई शब्दकोश जोड़ा या अपडेट किया जाता है, तो एप्लिकेशन
     * पृष्ठ पर प्रदर्शित सामग्री को अपडेट करता है।
     *
     * क्योंकि हॉट रीलोडिंग के लिए सर्वर से निरंतर कनेक्शन आवश्यक होता है,
     * यह केवल `enterprise` योजना के क्लाइंट्स के लिए उपलब्ध है।
     *
     * डिफ़ॉल्ट: false
     */
    liveSync: true,
  },
  build: {
    /**
     * नियंत्रित करता है कि शब्दकोश कैसे आयात किए जाते हैं:
     *
     * - "live": शब्दकोश लाइव सिंक API का उपयोग करके गतिशील रूप से प्राप्त किए जाते हैं।
     *   useIntlayer को useDictionaryDynamic से प्रतिस्थापित करता है।
     *
     * नोट: लाइव मोड शब्दकोश प्राप्त करने के लिए लाइव सिंक API का उपयोग करता है। यदि API कॉल
     * विफल हो जाती है, तो शब्दकोश गतिशील रूप से आयात किए जाते हैं।
     * नोट: केवल वे शब्दकोश जिनमें रिमोट सामग्री और "live" फ्लैग होते हैं, लाइव मोड का उपयोग करते हैं।
     * अन्य प्रदर्शन के लिए डायनेमिक मोड का उपयोग करते हैं।
     */
    importMode: "live",
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
     * जब परिवर्तन पता चलते हैं तो लोकल कॉन्फ़िगरेशन के हॉट रीलोडिंग को सक्षम करता है।
     * उदाहरण के लिए, जब कोई शब्दकोश जोड़ा या अपडेट किया जाता है, तो एप्लिकेशन
     * पृष्ठ पर प्रदर्शित सामग्री को अपडेट करता है।
     *
     * क्योंकि हॉट रीलोडिंग के लिए सर्वर से निरंतर कनेक्शन आवश्यक होता है,
     * यह केवल `enterprise` योजना के क्लाइंट्स के लिए उपलब्ध है।
     *
     * डिफ़ॉल्ट: false
     */
    liveSync: true,

    /**
     * लाइव सिंक सर्वर का पोर्ट।
     *
     * डिफ़ॉल्ट: 4000
     */
    liveSyncPort: 4000,

    /**
     * लाइव सिंक सर्वर का URL।
     *
     * डिफ़ॉल्ट: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * नियंत्रित करता है कि शब्दकोश कैसे आयात किए जाते हैं:
     *
     * - "live": शब्दकोश लाइव सिंक API का उपयोग करके डायनेमिक रूप से प्राप्त किए जाते हैं।
     *   useIntlayer को useDictionaryDynamic से बदलता है।
     *
     * नोट: लाइव मोड शब्दकोश प्राप्त करने के लिए लाइव सिंक API का उपयोग करता है। यदि API कॉल विफल हो जाती है,
     * तो शब्दकोश डायनेमिक रूप से आयात किए जाते हैं।
     * नोट: केवल वे शब्दकोश जिनमें रिमोट सामग्री और "live" फ्लैग होते हैं, लाइव मोड का उपयोग करते हैं।
     * अन्य प्रदर्शन के लिए डायनेमिक मोड का उपयोग करते हैं।
     */
    importMode: "live",
  },
};

module.exports = config;
```

अपने एप्लिकेशन को रैप करने के लिए लाइव सिंक सर्वर शुरू करें:

Next.js का उपयोग करने का उदाहरण:

```json5 fileName="package.json"
{
  "scripts": {
    // ... अन्य स्क्रिप्ट्स
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Vite का उपयोग करने का उदाहरण:

```json5 fileName="package.json"
{
  "scripts": {
    // ... अन्य स्क्रिप्ट्स
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

लाइव सिंक सर्वर आपके एप्लिकेशन को रैप करता है और जैसे ही अपडेटेड कंटेंट आता है, उसे स्वचालित रूप से लागू करता है।

CMS से परिवर्तन सूचनाएँ प्राप्त करने के लिए, Live Sync सर्वर बैकएंड के साथ एक SSE कनेक्शन बनाए रखता है। जब CMS में सामग्री बदलती है, तो बैकएंड अपडेट को Live Sync सर्वर को अग्रेषित करता है, जो नए शब्दकोश लिखता है। आपका एप्लिकेशन अगले नेविगेशन या ब्राउज़र रीलोड पर अपडेट को प्रतिबिंबित करेगा—कोई पुनर्निर्माण आवश्यक नहीं है।

फ्लो चार्ट (CMS/बैकएंड -> Live Sync सर्वर -> एप्लिकेशन सर्वर -> फ्रंटेंड):

![Live Sync Logic Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

यह कैसे काम करता है:

![Live Sync Flow CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### विकास कार्यप्रवाह (स्थानीय)

- विकास में, जब एप्लिकेशन शुरू होता है तो सभी रिमोट शब्दकोश प्राप्त किए जाते हैं, ताकि आप जल्दी से अपडेट का परीक्षण कर सकें।
- Next.js के साथ स्थानीय रूप से Live Sync का परीक्षण करने के लिए, अपने dev सर्वर को इस प्रकार लपेटें:

```json5 fileName="package.json"
{
  "scripts": {
    // ... अन्य स्क्रिप्ट्स
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Vite के लिए
  },
}
```

विकास के दौरान Intlayer लाइव इम्पोर्ट ट्रांसफ़ॉर्मेशन लागू करने के लिए ऑप्टिमाइज़ेशन सक्षम करें:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

यह सेटअप आपके डेवलपमेंट सर्वर को लाइव सिंक सर्वर के साथ लपेटता है, स्टार्टअप पर रिमोट डिक्शनरीज़ को प्राप्त करता है, और CMS से SSE के माध्यम से अपडेट्स को स्ट्रीम करता है। परिवर्तनों को देखने के लिए पेज को रिफ्रेश करें।

नोट्स और प्रतिबंध:

- अपने साइट सुरक्षा नीति (CSP) में लाइव सिंक ओरिजिन को जोड़ें। सुनिश्चित करें कि `connect-src` (और यदि प्रासंगिक हो तो `frame-ancestors`) में लाइव सिंक URL की अनुमति हो।
- लाइव सिंक स्थैतिक आउटपुट के साथ काम नहीं करता। Next.js के लिए, पेज को रनटाइम पर अपडेट प्राप्त करने के लिए डायनामिक होना चाहिए (जैसे, पूर्ण स्थैतिक-केवल प्रतिबंधों से बचने के लिए `generateStaticParams`, `generateMetadata`, `getServerSideProps`, या `getStaticProps` का उपयुक्त उपयोग करें)।
- CMS में, प्रत्येक शब्दकोश में एक `live` फ़्लैग होता है। केवल वे शब्दकोश जिनका `live=true` होता है, उन्हें लाइव सिंक API के माध्यम से प्राप्त किया जाता है; अन्य शब्दकोश गतिशील रूप से आयात किए जाते हैं और रनटाइम में अपरिवर्तित रहते हैं।
- `live` फ़्लैग प्रत्येक शब्दकोश के लिए बिल्ड समय पर मूल्यांकित किया जाता है। यदि बिल्ड के दौरान रिमोट सामग्री को `live=true` के रूप में चिह्नित नहीं किया गया था, तो उस शब्दकोश के लिए लाइव सिंक सक्षम करने के लिए आपको पुनः बिल्ड करना होगा।
- लाइव सिंक सर्वर को `.intlayer` में लिखने में सक्षम होना चाहिए। कंटेनरों में, `/.intlayer` पर लिखने की अनुमति सुनिश्चित करें।

## डिबग

यदि आपको CMS के साथ कोई समस्या आती है, तो निम्नलिखित जांचें:

- एप्लिकेशन चल रहा है।

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) कॉन्फ़िगरेशन आपके Intlayer कॉन्फ़िगरेशन फ़ाइल में सही ढंग से सेट है।
  - आवश्यक फ़ील्ड:
- एप्लिकेशन URL को उस URL से मेल खाना चाहिए जिसे आपने संपादक कॉन्फ़िगरेशन (`applicationURL`) में सेट किया है।
- CMS URL

- सुनिश्चित करें कि प्रोजेक्ट कॉन्फ़िगरेशन Intlayer CMS में पुश किया गया है।

- विज़ुअल एडिटर आपकी वेबसाइट को प्रदर्शित करने के लिए एक iframe का उपयोग करता है। सुनिश्चित करें कि आपकी वेबसाइट की कंटेंट सिक्योरिटी पॉलिसी (CSP) CMS URL को `frame-ancestors` के रूप में अनुमति देती है (डिफ़ॉल्ट रूप से 'https://intlayer.org')। किसी भी त्रुटि के लिए संपादक कंसोल की जांच करें।

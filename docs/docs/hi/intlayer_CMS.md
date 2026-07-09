---
createdAt: 2025-08-23
updatedAt: 2026-07-08
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
  - version: 9.0.0
    date: 2026-07-08
    changes: "'लाइव सिंक' सेक्शन को उसके अपने पेज (live-sync.md) पर ले जाया गया, यहां केवल एक संक्षिप्त परिचय और लिंक रखा गया"
  - version: 9.0.0
    date: 2026-06-30
    changes: "स्व-होस्टिंग अनुभाग जोड़ें"
  - version: 6.0.1
    date: 2025-09-22
    changes: "लाइव सिंक दस्तावेज़ीकरण जोड़ें"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` फ़ील्ड को `liveSync` से बदलें"
  - version: 5.5.10
    date: 2025-06-29
    changes: "इतिहास प्रारंभ करें"
author: aymericzip
---

# Intlayer कंटेंट प्रबंधन प्रणाली (CMS) दस्तावेज़ीकरण

<iframe title="आपके वेब ऐप के लिए विज़ुअल एडिटर + CMS: Intlayer समझाया गया" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS एक एप्लिकेशन है जो आपको Intlayer प्रोजेक्ट की अपनी सामग्री को बाहरीकृत करने की अनुमति देता है।

इसके लिए, Intlayer ने 'दूरस्थ शब्दकोश' (distant dictionaries) की अवधारणा पेश की है।

![Intlayer CMS इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## विषय सूची

<TOC/>

---

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

Intlayer CMS में लॉग इन करने के लिए निम्नलिखित कमांड चलाएँ:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

यह आपके डिफ़ॉल्ट ब्राउज़र को खोलेगा ताकि प्रमाणीकरण प्रक्रिया को पूरा किया जा सके और Intlayer सेवाओं का उपयोग करने के लिए आवश्यक क्रेडेंशियल (क्लाइंट ID और क्लाइंट सीक्रेट) प्राप्त किए जा सकें।

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप CMS सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
     * इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://app.intlayer.org/projects) में नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
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

> यदि आपके पास क्लाइंट ID और क्लाइंट सीक्रेट नहीं है, तो आप इन्हें [Intlayer डैशबोर्ड - प्रोजेक्ट्स](https://app.intlayer.org/projects) में नया क्लाइंट बनाकर प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## CMS का उपयोग करना

### अपनी कॉन्फ़िगरेशन पुश करें

Intlayer CMS को कॉन्फ़िगर करने के लिए, आप [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/hi/cli/index.md) कमांड्स का उपयोग कर सकते हैं।

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> यदि आप अपनी `intlayer.config.ts` कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर (environment variables) का उपयोग करते हैं, तो आप `--env` तर्क का उपयोग करके इच्छित पर्यावरण निर्दिष्ट कर सकते हैं:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

यह कमांड आपकी कॉन्फ़िगरेशन को Intlayer CMS पर अपलोड करता है।

### एक शब्दकोश (डिक्शनरी) पुश करें

अपने लोकल शब्दकोशों को दूरस्थ शब्दकोश में बदलने के लिए, आप [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/hi/cli/index.md) कमांड्स का उपयोग कर सकते हैं।

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> यदि आप अपनी `intlayer.config.ts` कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर (environment variables) का उपयोग करते हैं, तो आप `--env` तर्क का उपयोग करके इच्छित पर्यावरण निर्दिष्ट कर सकते हैं:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

यह कमांड आपकी प्रारंभिक सामग्री शब्दकोशों को अपलोड करता है, जिससे वे Intlayer प्लेटफ़ॉर्म के माध्यम से असिंक्रोनस रूप से प्राप्त करने और संपादित करने के लिए उपलब्ध हो जाते हैं।

### शब्दकोश संपादित करें

फिर आप अपने शब्दकोश को [Intlayer CMS](https://app.intlayer.org/content) में देख और प्रबंधित कर सकेंगे।

## लाइव सिंक

लाइव सिंक आपकी ऐप को रनटाइम पर CMS सामग्री परिवर्तनों को प्रतिबिंबित करने देता है। पुनर्निर्माण या पुनः तैनाती की आवश्यकता नहीं होती। जब सक्षम किया जाता है, तो अपडेट्स लाइव सिंक सर्वर को स्ट्रीम किए जाते हैं जो आपके एप्लिकेशन द्वारा पढ़े जाने वाले शब्दकोशों को ताज़ा करता है।

पूर्ण सेटअप गाइड (सक्षम करना, Live Sync सर्वर शुरू करना, स्थानीय विकास वर्कफ़्लो, और सीमाओं) के लिए, [Live Sync दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/live-sync.md) देखें।

## स्व-होस्टिंग (Self-Hosting)

Intlayer पूरी तरह से आपके अपने इंफ्रास्ट्रक्चर पर चल सकता है। एक सिंगल कमांड Docker Compose के साथ पूरे स्टैक (डैशबोर्ड, API, डेटाबेस, ऑब्जेक्ट स्टोरेज, और ईमेल) को बूटस्ट्रैप करती है:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

पूर्ण सेटअप गाइड, एनवायरनमेंट वेरिएबल रेफरेंस, अपग्रेड निर्देश, और बैकअप/रिस्टोर प्रक्रियाओं के लिए, [स्व-होस्टिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) देखें।

---

## डिबग

यदि आपको CMS के साथ कोई समस्या आती है, तो निम्नलिखित जांचें:

- एप्लिकेशन चल रहा है।

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) कॉन्फ़िगरेशन आपके Intlayer कॉन्फ़िगरेशन फ़ाइल में सही ढंग से सेट है।
  - आवश्यक फ़ील्ड:
- एप्लिकेशन URL को उस URL से मेल खाना चाहिए जिसे आपने संपादक कॉन्फ़िगरेशन (`applicationURL`) में सेट किया है।
- CMS URL

- सुनिश्चित करें कि प्रोजेक्ट कॉन्फ़िगरेशन Intlayer CMS में पुश किया गया है।

- विज़ुअल एडिटर आपकी वेबसाइट को प्रदर्शित करने के लिए एक iframe का उपयोग करता है। सुनिश्चित करें कि आपकी वेबसाइट की कंटेंट सिक्योरिटी पॉलिसी (CSP) CMS URL को `frame-ancestors` के रूप में अनुमति देती है (डिफ़ॉल्ट रूप से 'https://intlayer.org')। किसी भी त्रुटि के लिए संपादक कंसोल की जांच करें।

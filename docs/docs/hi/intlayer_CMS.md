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

## `@intlayer/api` SDK के साथ प्रोग्रामेटिक एक्सेस

CLI और विजुअल एडिटर के अलावा, Intlayer [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api) पैकेज में एक typed SDK प्रदान करता है। यह आपको CMS को एक **headless content database** के रूप में उपयोग करने देता है: आप प्रोजेक्ट प्राप्त कर सकते हैं, डिक्शनरी प्राप्त कर सकते हैं, और उन्हें सीधे अपने एप्लिकेशन, स्क्रिप्ट या CI pipeline से push या अपडेट कर सकते हैं।

SDK आपके लिए प्रमाणीकरण को हैंडल करता है। जब तक आपका `clientId` और `clientSecret` उपलब्ध हैं (आपकी Intlayer कॉन्फ़िगरेशन या environment में), यह स्वचालित रूप से एक OAuth2 एक्सेस टोकन प्राप्त करता है और रीफ्रेश करता है और हर अनुरोध को साइन करता है।

### इंस्टॉलेशन

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### यह कैसे काम करता है: authenticator + endpoints

SDK को **दो अलग-अलग imports** में विभाजित किया गया है, ताकि आपका bundle छोटा रहे:

1. `createIntlayerCMS` — एक हल्का **authenticator** बनाता है। यह केवल credentials और managed access token को ले जाता है; यह किसी विशिष्ट domain के बारे में कुछ नहीं जानता।
2. `dictionaryEndpoint`, `projectEndpoint`, … — प्रति-domain **endpoint binders**, प्रत्येक अपने subpath से imported (`@intlayer/api/dictionary`, `@intlayer/api/project`, …)। आप authenticator को उस endpoint पर पास करते हैं जिसकी आपको जरूरत है।

क्योंकि प्रत्येक endpoint अलग से imported है, आपका bundle केवल उन domains को शामिल करता है जिन्हें आप वास्तव में use करते हैं — `dictionaryEndpoint` को import करना कभी भी project, AI, या किसी अन्य domain client को pull नहीं करता।

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// कॉन्फ़िगरेशन वैकल्पिक है: जब छोड़ा जाता है, तो credentials को पढ़ा जाता है
// `@intlayer/config/built` से, जो INTLAYER_CLIENT_ID और
// INTLAYER_CLIENT_SECRET environment variables को resolve करता है।
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> CMS credentials (`clientId` / `clientSecret`) आपके content को **write access** प्रदान करते हैं। authenticator को केवल **server side** पर बनाएं (server actions, route handlers, scripts, CI)। इसे कभी भी client-side code में import न करें या अपने credentials को browser में expose न करें।

यदि आप build-time configuration पर निर्भर नहीं करना पसंद करते हैं, तो credentials को explicitly पास करें:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // वैकल्पिक, self-hosted backends के लिए:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> [Intlayer Dashboard - Projects](https://app.intlayer.org/projects) में एक नई access key बनाकर अपने credentials प्राप्त करें।

### Projects को Fetch करें

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// अपने credentials के साथ accessible projects को list करें
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// चुने गए project की aggregated localization insights को read करें
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### शब्दकोश प्राप्त करें

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// प्रोजेक्ट के हर दूरस्थ शब्दकोश को सूचीबद्ध करें
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// या कुंजी द्वारा एक एकल शब्दकोश प्राप्त करें
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### शब्दकोश को Push और Update करें

सामग्री वापस लिखने के लिए CMS को डेटाबेस के रूप में उपयोग करें:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// एक नया शब्दकोश बनाएं
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// शब्दकोशों का एक बैच Upsert करें (एक कॉल में उन्हें बनाएं या अपडेट करें)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// एक मौजूदा शब्दकोश को अपडेट करें
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> टिप: बंधे हुए endpoint को दोबारा उपयोग करें ताकि आपको अपने आप को दोहराना न पड़े:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### एक single method निकालना

हर endpoint method पहले से authenticated है और standalone है (यह अपना token handling करता है), इसलिए आप एक को निकाल सकते हैं और इसे around pass कर सकते हैं — उदाहरण के लिए इसे dependency के रूप में inject करने के लिए:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// पहले से authenticated — हर call पर token को automatically refresh करता है
export const pushDictionaries = dictionary.pushDictionaries;

// उपयोग
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

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

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Intlayer CMS और विज़ुअल एडिटर में क्या अंतर है?">

[विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) आपके कोडबेस में स्थानीय शब्दकोश फ़ाइलों को संपादित करता है। CMS सर्वर पर दूरस्थ रूप से सामग्री का प्रबंधन करता है, जिससे एप्लिकेशन कोड के नए परिनियोजन के बिना टेक्स्ट अपडेट की अनुमति मिलती है।

</Question>

<Question title="i18n मेरे बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित सेटअपों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। सर्वर पर रेंडर किया गया मार्कअप सर्वर पर ही अपनी सामग्री को हल करता है, और बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक शब्दकोश प्रविष्टियों से बदल देता है, इसलिए अप्रयुक्त कुंजियों और भाषाओं को हटा दिया जाता है। [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं। पारंपरिक विकल्पों की तुलना में, Intlayer बंडल और पृष्ठ आकार को 50% तक कम करता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना i18next, next-intl या react-i18next से माइग्रेट कर सकता हूँ?">

हाँ, और इसके दो रास्ते हैं। आप [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) या [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) के साथ सामग्री को धीरे-धीरे स्थानांतरित कर सकते हैं। या आप अपने वर्तमान API को पूरी तरह से बनाए रख सकते हैं: [संगतता एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` और `Lingui` के समान API प्रदान करते हैं, लेकिन Intlayer शब्दकोशों द्वारा संचालित होते हैं, जिससे केवल आयात बदलते हैं और घटक कोड समान रहता है।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

पूरी तरह से स्वचालित वर्कफ़्लो के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) JSX, TSX, Vue और Svelte कोड पर निर्माण समय के दौरान भी यही करता है, प्रत्येक परिवर्तन पर शब्दकोश उत्पन्न करता है जिससे कुंजियों को मैन्युअल रूप से बनाए रखने की आवश्यकता समाप्त हो जाती है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="CMS में कौन सी सामग्री रखी जानी चाहिए?">

वह सामग्री जो बार-बार बदलती है और कोड रिलीज़ चक्र से बंधी नहीं होती है: लैंडिंग पेज टेक्स्ट, मूल्य निर्धारण, घोषणाएं, प्रचार बैनर और ब्लॉग लेख।

</Question>

<Question title="यदि CMS से संपर्क नहीं किया जा सकता तो क्या होगा?">

एप्लिकेशन स्वचालित रूप से कोडबेस में स्थानीय शब्दकोश घोषणा पर वापस आ जाता है, यह सुनिश्चित करते हुए कि नेटवर्क विफलता कभी भी उपयोगकर्ता को खाली पृष्ठ न दिखाए।

</Question>

<Question title="क्या मैं CMS को स्वयं होस्ट कर सकता हूँ?">

हाँ। उन आवश्यकताओं के लिए जहाँ सामग्री को आपके आंतरिक नेटवर्क से बाहर नहीं जाना चाहिए, CMS आपके अपने बुनियादी ढांचे पर चल सकता है। [सेल्फ-होस्टिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) देखें।

</Question>

<Question title="क्या सामग्री संपादकों को परिवर्तन प्रकाशित करने के लिए किसी डेवलपर की आवश्यकता होती है?">

नहीं। दूरस्थ शब्दकोशों का मुख्य उद्देश्य यही है: संपादक CMS में टेक्स्ट बदलते हैं और लाइव सिंक (live sync) सुविधा की बदौलत साइट तुरंत अपडेट प्रदर्शित करती है।

</Question>

<Question title="क्या मैं इंटरफ़ेस के बजाय CMS को स्वचालित कर सकता हूँ?">

हाँ। `@intlayer/api` SDK इंटरफ़ेस के समान एंडपॉइंट्स को उजागर करता है, जिससे आप प्रोजेक्ट पढ़ सकते हैं, शब्दकोश प्राप्त कर सकते हैं और स्क्रिप्ट के माध्यम से प्रकाशन को स्वचालित कर सकते हैं।

</Question>

<Question title="क्या CMS अनुवादों के लिए A/B परीक्षण का समर्थन करता है?">

हाँ। दूरस्थ शब्दकोश [सामग्री वेरिएंट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) का समर्थन करते हैं, जिससे आप विभिन्न दर्शक समूहों के लिए अलग-अलग टेक्स्ट संस्करणों का परीक्षण कर सकते हैं।

</Question>

<Question title="क्या CMS मुफ़्त है?">

Intlayer लाइब्रेरी, CLI, कंपाइलर और विज़ुअल एडिटर पूरी तरह से मुफ़्त और Apache 2.0 लाइसेंस के तहत ओपन सोर्स हैं। क्लाउड CMS एक सशुल्क सेवा है, लेकिन सेल्फ-होस्ट संस्करण आपके अपने सर्वर पर मुफ्त में चलाया जा सकता है।

</Question>

</FAQ>

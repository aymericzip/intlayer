---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: लाइव सिंक | रनटाइम पर CMS सामग्री परिवर्तनों को प्रतिबिंबित करें
description: बिना पुनर्निर्माण या पुनः तैनाती के, अपने ऐप को रनटाइम पर Intlayer CMS सामग्री परिवर्तनों को प्रतिबिंबित करने दें।
keywords:
  - लाइव सिंक
  - Live Sync
  - CMS
  - विज़ुअल एडिटर
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Intlayer CMS दस्तावेज़ से अलग करके अपने स्वयं के पेज पर ले जाया गया"
  - version: 6.0.1
    date: 2025-09-22
    changes: "लाइव सिंक दस्तावेज़ीकरण जोड़ें"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` फ़ील्ड को `liveSync` से बदलें"
author: aymericzip
---

# लाइव सिंक

लाइव सिंक आपकी ऐप को रनटाइम पर CMS सामग्री परिवर्तनों को प्रतिबिंबित करने देता है। पुनर्निर्माण या पुनः तैनाती की आवश्यकता नहीं होती। जब सक्षम किया जाता है, तो अपडेट्स लाइव सिंक सर्वर को स्ट्रीम किए जाते हैं जो आपके एप्लिकेशन द्वारा पढ़े जाने वाले शब्दकोशों को ताज़ा करता है।

## विषय-सूची

<TOC/>

---

> लाइव सिंक के लिए एक निरंतर सर्वर कनेक्शन आवश्यक होता है और यह एंटरप्राइज योजना पर उपलब्ध है।

अपने Intlayer कॉन्फ़िगरेशन को अपडेट करके लाइव सिंक सक्षम करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
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
    importMode: "fetch",
  },
};

export default config;
```

अपने एप्लिकेशन को रैप करने के लिए लाइव सिंक सर्वर शुरू करें:

Next.js का उपयोग करने का उदाहरण:

```json5 fileName="package.json"
{
  "scripts": {
    // ... अन्य स्क्रिप्ट्स
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

लाइव सिंक सर्वर आपके एप्लिकेशन को रैप करता है और जैसे ही अपडेटेड कंटेंट आता है, उसे स्वचालित रूप से लागू करता है।

CMS से परिवर्तन सूचनाएँ प्राप्त करने के लिए, Live Sync सर्वर बैकएंड के साथ एक SSE कनेक्शन बनाए रखता है। जब CMS में सामग्री बदलती है, तो बैकएंड अपडेट को Live Sync सर्वर को अग्रेषित करता है, जो नए शब्दकोश लिखता है। आपका एप्लिकेशन अगले नेविगेशन या ब्राउज़र रीलोड पर अपडेट को प्रतिबिंबित करेगा, कोई पुनर्निर्माण आवश्यक नहीं है।

फ्लो चार्ट (CMS/बैकएंड -> Live Sync सर्वर -> एप्लिकेशन सर्वर -> फ्रंटेंड):

![Live Sync Logic Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

यह कैसे काम करता है:

![Live Sync Flow CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## विकास कार्यप्रवाह (स्थानीय)

- विकास में, जब एप्लिकेशन शुरू होता है तो सभी रिमोट शब्दकोश प्राप्त किए जाते हैं, ताकि आप जल्दी से अपडेट का परीक्षण कर सकें।
- Next.js के साथ स्थानीय रूप से Live Sync का परीक्षण करने के लिए, अपने dev सर्वर को इस प्रकार लपेटें:

```json5 fileName="package.json"
{
  "scripts": {
    // ... अन्य स्क्रिप्ट्स
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Vite के लिए
  },
}
```

विकास के दौरान Intlayer लाइव इम्पोर्ट ट्रांसफ़ॉर्मेशन लागू करने के लिए ऑप्टिमाइज़ेशन सक्षम करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

यह सेटअप आपके डेवलपमेंट सर्वर को लाइव सिंक सर्वर के साथ लपेटता है, स्टार्टअप पर रिमोट डिक्शनरीज़ को प्राप्त करता है, और CMS से SSE के माध्यम से अपडेट्स को स्ट्रीम करता है। परिवर्तनों को देखने के लिए पेज को रिफ्रेश करें।

नोट्स और प्रतिबंध:

- अपने साइट सुरक्षा नीति (CSP) में लाइव सिंक ओरिजिन को जोड़ें। सुनिश्चित करें कि `connect-src` (और यदि प्रासंगिक हो तो `frame-ancestors`) में लाइव सिंक URL की अनुमति हो।
- लाइव सिंक स्थैतिक आउटपुट के साथ काम नहीं करता। Next.js के लिए, पेज को रनटाइम पर अपडेट प्राप्त करने के लिए डायनामिक होना चाहिए (जैसे, पूर्ण स्थैतिक-केवल प्रतिबंधों से बचने के लिए `generateStaticParams`, `generateMetadata`, `getServerSideProps`, या `getStaticProps` का उपयुक्त उपयोग करें)।
- CMS में, प्रत्येक शब्दकोश में एक `live` फ़्लैग होता है। केवल वे शब्दकोश जिनका `live=true` होता है, उन्हें लाइव सिंक API के माध्यम से प्राप्त किया जाता है; अन्य शब्दकोश गतिशील रूप से आयात किए जाते हैं और रनटाइम में अपरिवर्तित रहते हैं।
- `live` फ़्लैग प्रत्येक शब्दकोश के लिए बिल्ड समय पर मूल्यांकित किया जाता है। यदि बिल्ड के दौरान रिमोट सामग्री को `live=true` के रूप में चिह्नित नहीं किया गया था, तो उस शब्दकोश के लिए लाइव सिंक सक्षम करने के लिए आपको पुनः बिल्ड करना होगा।
- लाइव सिंक सर्वर को `.intlayer` में लिखने में सक्षम होना चाहिए। कंटेनरों में, `/.intlayer` पर लिखने की अनुमति सुनिश्चित करें।

## उपयोगी लिंक्स

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)
- [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
- [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [स्व-होस्टिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md)

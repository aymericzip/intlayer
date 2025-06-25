---
docName: package__next-intlayer__useIntlayerAsync
url: /doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useIntlayerAsync हुक दस्तावेज | next-intlayer
description: next-intlayer पैकेज के लिए useIntlayerAsync हुक का उपयोग कैसे करें यह देखें
keywords:
  - useIntlayerAsync
  - शब्दकोश
  - चाबी
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
---

# Next.js एकीकरण: `useIntlayerAsync` हुक दस्तावेज़ीकरण

`useIntlayerAsync` हुक `useIntlayer` की कार्यक्षमता को बढ़ाता है, जो केवल पूर्व-रेंडर की गई शब्दकोशों को लौटाने के बजाय, अद्यतन को असिंक्रोनस रूप से प्राप्त करता है। यह उन अनुप्रयोगों के लिए आदर्श है जो प्रारंभिक रेंडर के बाद अपने स्थानीयकृत सामग्री को बार-बार अपडेट करते हैं।

## अवलोकन

- **असिंक्रोनस शब्दकोश लोडिंग:**  
  क्लाइंट साइड पर, `useIntlayerAsync` पहले पूर्व-रेंडर की गई स्थानीय शब्दकोश लौटाता है (जैसे `useIntlayer`) और फिर किसी भी नए उपलब्ध रिमोट शब्दकोश को असिंक्रोनस रूप से प्राप्त और मर्ज करता है।
- **प्रगति स्थिति प्रबंधन:**  
  यह हुक एक `isLoading` स्थिति भी प्रदान करता है, जो यह संकेत देता है कि रिमोट शब्दकोश को प्राप्त किया जा रहा है। यह डेवलपर्स को एक स्मूथ उपयोगकर्ता अनुभव के लिए लोडिंग संकेतक या कंकाल स्थिति प्रदर्शित करने की अनुमति देता है।

## पर्यावरण सेटअप

Intlayer एक हेडलेस कंटेंट सोर्स मैनेजमेंट (CSM) सिस्टम प्रदान करता है जो गैर-डेवलपर्स को एप्लिकेशन सामग्री को निर्बाध रूप से प्रबंधित और अपडेट करने में सक्षम बनाता है। Intlayer के सहज डैशबोर्ड का उपयोग करके, आपकी टीम सीधे कोड को संशोधित किए बिना स्थानीयकृत टेक्स्ट, छवियों और अन्य संसाधनों को संपादित कर सकती है। यह सामग्री प्रबंधन प्रक्रिया को सुव्यवस्थित करता है, सहयोग को बढ़ावा देता है, और यह सुनिश्चित करता है कि अपडेट जल्दी और आसानी से किए जा सकते हैं।

Intlayer के साथ आरंभ करने के लिए, आपको पहले [https://intlayer.org/dashboard](https://intlayer.org/dashboard) पर पंजीकरण करना होगा और एक एक्सेस टोकन प्राप्त करना होगा। एक बार जब आपके पास आपकी क्रेडेंशियल्स हों, तो उन्हें नीचे दिखाए गए अनुसार अपने कॉन्फ़िगरेशन फ़ाइल में जोड़ें:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

अपनी क्रेडेंशियल्स को कॉन्फ़िगर करने के बाद, आप निम्नलिखित कमांड चलाकर Intlayer पर एक नया स्थानीय शब्दकोश पुश कर सकते हैं:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

यह कमांड आपकी प्रारंभिक सामग्री शब्दकोशों को अपलोड करता है, जिससे वे असिंक्रोनस रूप से प्राप्त करने और Intlayer प्लेटफ़ॉर्म के माध्यम से संपादित करने के लिए उपलब्ध हो जाते हैं।

## Next.js में `useIntlayerAsync` आयात करना

चूंकि `useIntlayerAsync` **क्लाइंट-साइड** घटकों के लिए अभिप्रेत है, आप इसे उसी क्लाइंट एंट्री पॉइंट से आयात करेंगे जैसे `useIntlayer`:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

सुनिश्चित करें कि आयात करने वाली फ़ाइल के शीर्ष पर `"use client"` एनोटेट किया गया है, यदि आप Next.js ऐप राउटर का उपयोग कर रहे हैं जिसमें सर्वर और क्लाइंट घटक अलग-अलग हैं।

## पैरामीटर

1. **`key`**:  
   **प्रकार**: `DictionaryKeys`  
   स्थानीयकृत सामग्री ब्लॉक की पहचान करने के लिए उपयोग की जाने वाली शब्दकोश कुंजी। यह कुंजी आपकी सामग्री घोषणा फ़ाइलों में परिभाषित होनी चाहिए।

2. **`locale`** (वैकल्पिक):  
   **प्रकार**: `Locales`  
   वह विशिष्ट स्थानीय जिसे आप लक्षित करना चाहते हैं। यदि छोड़ा गया है, तो हुक क्लाइंट संदर्भ से स्थानीय का उपयोग करता है।

3. **`isRenderEditor`** (वैकल्पिक, डिफ़ॉल्ट `true`):  
   **प्रकार**: `boolean`  
   यह निर्धारित करता है कि सामग्री Intlayer संपादक ओवरले के साथ रेंडरिंग के लिए तैयार होनी चाहिए या नहीं। यदि `false` पर सेट है, तो लौटाए गए शब्दकोश डेटा में संपादक-विशिष्ट सुविधाएँ शामिल नहीं होंगी।

## रिटर्न वैल्यू

हुक एक शब्दकोश ऑब्जेक्ट लौटाता है जिसमें `key` और `locale` द्वारा कुंजीबद्ध स्थानीयकृत सामग्री होती है। इसमें एक `isLoading` बूलियन भी शामिल है जो यह संकेत देता है कि क्या वर्तमान में एक दूरस्थ शब्दकोश प्राप्त किया जा रहा है।

## Next.js में उदाहरण उपयोग

### क्लाइंट-साइड घटक उदाहरण

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**मुख्य बिंदु:**

- प्रारंभिक रेंडर पर, `title` और `description` पूर्व-रेंडर की गई स्थानीय शब्दकोश से आते हैं।
- जबकि `isLoading` `true` है, पृष्ठभूमि में एक रिमोट अनुरोध किया जाता है ताकि एक अद्यतन शब्दकोश प्राप्त किया जा सके।
- एक बार प्राप्ति पूरी हो जाने के बाद, `title` और `description` नवीनतम सामग्री के साथ अपडेट हो जाते हैं, और `isLoading` `false` पर लौट आता है।

## विशेषता स्थानीयकरण को संभालना

`useIntlayer` की तरह, आप विभिन्न HTML गुणों (जैसे, `alt`, `title`, `aria-label`) के लिए स्थानीयकृत विशेषता मान प्राप्त कर सकते हैं:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## शब्दकोश फ़ाइलें

सभी सामग्री कुंजियाँ आपकी सामग्री घोषणा फ़ाइलों में परिभाषित होनी चाहिए ताकि प्रकार सुरक्षा सुनिश्चित हो सके और रनटाइम त्रुटियों को रोका जा सके। ये फ़ाइलें TypeScript सत्यापन को सक्षम करती हैं, यह सुनिश्चित करते हुए कि आप हमेशा मौजूदा कुंजियों और स्थानीयों का संदर्भ देते हैं।

सामग्री घोषणा फ़ाइलों को सेट करने के लिए निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) उपलब्ध हैं।

## अधिक जानकारी

- **Intlayer विज़ुअल एडिटर:**  
  UI से सीधे सामग्री प्रबंधित और संपादित करने के लिए Intlayer विज़ुअल एडिटर के साथ एकीकृत करें। अधिक विवरण [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md)।

---

**सारांश में**, `useIntlayerAsync` एक शक्तिशाली क्लाइंट-साइड हुक है जिसे उपयोगकर्ता अनुभव को बढ़ाने और पूर्व-रेंडर की गई शब्दकोशों को असिंक्रोनस शब्दकोश अपडेट के साथ जोड़कर सामग्री ताजगी बनाए रखने के लिए डिज़ाइन किया गया है। `isLoading` और TypeScript-आधारित सामग्री घोषणाओं का लाभ उठाकर, आप अपने Next.js अनुप्रयोगों में गतिशील, स्थानीयकृत सामग्री को निर्बाध रूप से एकीकृत कर सकते हैं।

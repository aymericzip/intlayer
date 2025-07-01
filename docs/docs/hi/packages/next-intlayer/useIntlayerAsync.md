---
docName: package__next-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync हुक दस्तावेज़ | next-intlayer
description: next-intlayer पैकेज के लिए useIntlayerAsync हुक का उपयोग कैसे करें देखें
keywords:
  - useIntlayerAsync
  - शब्दकोश
  - कुंजी
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
---

# Next.js एकीकरण: `useIntlayerAsync` हुक दस्तावेज़

`useIntlayerAsync` हुक `useIntlayer` की कार्यक्षमता को बढ़ाता है, जो केवल प्री-रेंडर्ड शब्दकोश लौटाने के बजाय अपडेट्स को असिंक्रोनस रूप से भी प्राप्त करता है, जिससे यह उन एप्लिकेशन के लिए आदर्श बन जाता है जो प्रारंभिक रेंडर के बाद अपने स्थानीयकृत कंटेंट को बार-बार अपडेट करते हैं।

## अवलोकन

- **असिंक्रोनस शब्दकोश लोडिंग:**  
  क्लाइंट साइड पर, `useIntlayerAsync` सबसे पहले प्री-रेंडर्ड लोकल शब्दकोश लौटाता है (ठीक `useIntlayer` की तरह) और फिर असिंक्रोनस रूप से किसी भी नए उपलब्ध रिमोट शब्दकोश को प्राप्त करके मर्ज करता है।
- **प्रगति स्थिति प्रबंधन:**  
  यह हुक एक `isLoading` स्थिति भी प्रदान करता है, जो यह दर्शाती है कि कब रिमोट शब्दकोश प्राप्त किया जा रहा है। इससे डेवलपर्स को लोडिंग संकेतक या स्केलेटन स्टेट्स दिखाने की सुविधा मिलती है, जिससे उपयोगकर्ता अनुभव अधिक सहज होता है।

## पर्यावरण सेटअप

Intlayer एक हेडलेस कंटेंट सोर्स मैनेजमेंट (CSM) सिस्टम प्रदान करता है जो गैर-डेवलपर्स को एप्लिकेशन कंटेंट को सहजता से प्रबंधित और अपडेट करने में सक्षम बनाता है। Intlayer के सहज डैशबोर्ड का उपयोग करके, आपकी टीम स्थानीयकृत टेक्स्ट, छवियों, और अन्य संसाधनों को सीधे कोड में बदलाव किए बिना संपादित कर सकती है। यह कंटेंट प्रबंधन प्रक्रिया को सरल बनाता है, सहयोग को बढ़ावा देता है, और सुनिश्चित करता है कि अपडेट्स जल्दी और आसानी से किए जा सकें।

Intlayer के साथ शुरू करने के लिए, आपको पहले [डैशबोर्ड](https://intlayer.org/dashboard) में पंजीकरण करना होगा और एक एक्सेस टोकन प्राप्त करना होगा। एक बार जब आपके पास क्रेडेंशियल्स हों, तो उन्हें अपनी कॉन्फ़िगरेशन फ़ाइल में नीचे दिखाए अनुसार जोड़ें:

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

अपने क्रेडेंशियल्स को कॉन्फ़िगर करने के बाद, आप निम्न कमांड चलाकर Intlayer में एक नया लोकल डिक्शनरी पुश कर सकते हैं:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

यह कमांड आपकी प्रारंभिक कंटेंट डिक्शनरीज़ को अपलोड करता है, जिससे वे Intlayer प्लेटफ़ॉर्म के माध्यम से असिंक्रोनस रूप से फ़ेचिंग और संपादन के लिए उपलब्ध हो जाती हैं।

## Next.js में `useIntlayerAsync` को इम्पोर्ट करना

चूंकि `useIntlayerAsync` **क्लाइंट-साइड** कंपोनेंट्स के लिए है, आप इसे `useIntlayer` के समान क्लाइंट एंट्री पॉइंट से इम्पोर्ट करेंगे:

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

यदि आप Next.js App Router का उपयोग कर रहे हैं जहाँ सर्वर और क्लाइंट कंपोनेंट्स अलग-अलग हैं, तो सुनिश्चित करें कि इम्पोर्ट करने वाली फ़ाइल के शीर्ष पर `"use client"` एनोटेटेड हो।

## पैरामीटर

1. **`key`**:  
   **प्रकार**: `DictionaryKeys`  
   वह डिक्शनरी कुंजी जो स्थानीयकृत कंटेंट ब्लॉक की पहचान के लिए उपयोग की जाती है। यह कुंजी आपकी कंटेंट घोषणा फ़ाइलों में परिभाषित होनी चाहिए।

2. **`locale`** (वैकल्पिक):  
   **प्रकार**: `Locales`  
   वह विशिष्ट लोकल जिसे आप लक्षित करना चाहते हैं। यदि इसे छोड़ दिया जाता है, तो हुक क्लाइंट संदर्भ से लोकल का उपयोग करता है।

3. **`isRenderEditor`** (वैकल्पिक, डिफ़ॉल्ट `true`):  
    **प्रकार**: `boolean`  
   यह निर्धारित करता है कि सामग्री Intlayer संपादक ओवरले के साथ रेंडरिंग के लिए तैयार होनी चाहिए या नहीं। यदि इसे `false` पर सेट किया जाता है, तो लौटाई गई डिक्शनरी डेटा में संपादक-विशिष्ट सुविधाएँ शामिल नहीं होंगी।

## रिटर्न मान

यह हुक एक डिक्शनरी ऑब्जेक्ट लौटाता है जिसमें `key` और `locale` द्वारा की गई स्थानीयकृत सामग्री होती है। इसमें एक `isLoading` बूलियन भी शामिल होता है जो यह दर्शाता है कि क्या कोई दूरस्थ डिक्शनरी वर्तमान में लोड हो रही है।

## Next.js में उदाहरण उपयोग

### क्लाइंट-साइड कंपोनेंट उदाहरण

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

- प्रारंभिक रेंडर पर, `title` और `description` पूर्व-रेंडर किए गए लोकल डिक्शनरी से आते हैं।
- जब `isLoading` `true` होता है, तो पृष्ठभूमि में एक रिमोट अनुरोध किया जाता है ताकि अपडेटेड शब्दकोश प्राप्त किया जा सके।
- एक बार फेच पूरा होने के बाद, `title` और `description` नवीनतम सामग्री के साथ अपडेट हो जाते हैं, और `isLoading` फिर से `false` हो जाता है।

## एट्रिब्यूट लोकलाइजेशन को संभालना

`useIntlayer` की तरह, आप विभिन्न HTML गुणों (जैसे, `alt`, `title`, `aria-label`) के लिए स्थानीयकृत एट्रिब्यूट मान प्राप्त कर सकते हैं:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## शब्दकोश फ़ाइलें

सभी सामग्री कुंजियाँ आपके सामग्री घोषणा फ़ाइलों में परिभाषित होनी चाहिए ताकि टाइप सुरक्षा सुनिश्चित हो और रनटाइम त्रुटियों से बचा जा सके। ये फ़ाइलें TypeScript सत्यापन सक्षम करती हैं, जिससे आप हमेशा मौजूदा कुंजियों और लोकल्स का संदर्भ लेते हैं।

सामग्री घोषणा फ़ाइलों को सेट अप करने के निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) उपलब्ध हैं।

## आगे की जानकारी

- **Intlayer विज़ुअल एडिटर:**  
  UI से सीधे सामग्री प्रबंधन और संपादन के लिए Intlayer विज़ुअल एडिटर के साथ एकीकरण करें। अधिक विवरण [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

---

**सारांश में**, `useIntlayerAsync` एक शक्तिशाली क्लाइंट-साइड हुक है जिसे उपयोगकर्ता अनुभव को बेहतर बनाने और सामग्री की ताजगी बनाए रखने के लिए डिज़ाइन किया गया है, जो प्री-रेंडर्ड शब्दकोशों को असिंक्रोनस शब्दकोश अपडेट्स के साथ जोड़ता है। `isLoading` और TypeScript-आधारित सामग्री घोषणाओं का उपयोग करके, आप अपने Next.js अनुप्रयोगों में गतिशील, स्थानीयकृत सामग्री को सहजता से एकीकृत कर सकते हैं।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

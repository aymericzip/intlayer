---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync हुक दस्तावेज़ | react-intlayer
description: react-intlayer पैकेज के लिए useIntlayerAsync हुक का उपयोग कैसे करें देखें
keywords:
  - useIntlayerAsync
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# React एकीकरण: `useIntlayerAsync` हुक दस्तावेज़

`useIntlayerAsync` हुक `useIntlayer` की कार्यक्षमता को बढ़ाता है, जो केवल पूर्व-रेंडर किए गए शब्दकोश लौटाने तक सीमित नहीं है, बल्कि अपडेट्स को असिंक्रोनस तरीके से प्राप्त भी करता है, जिससे यह उन एप्लिकेशन के लिए आदर्श होता है जो प्रारंभिक रेंडर के बाद अपने स्थानीयकृत कंटेंट को बार-बार अपडेट करते हैं।

## अवलोकन

- **असिंक्रोनस शब्दकोश लोडिंग:**  
  प्रारंभिक माउंट पर, `useIntlayerAsync` पहले किसी भी पूर्व-प्राप्त या स्थैतिक रूप से बंडल किए गए स्थानीय शब्दकोश को लौटाता है (जैसे कि `useIntlayer` करता है) और फिर असिंक्रोनस तरीके से किसी भी नए उपलब्ध रिमोट शब्दकोश को प्राप्त करके मर्ज करता है।
- **प्रगति स्थिति प्रबंधन:**  
  यह हुक एक `isLoading` स्थिति भी प्रदान करता है, जो दर्शाता है कि कब रिमोट शब्दकोश प्राप्त किया जा रहा है। इससे डेवलपर्स को लोडिंग संकेतक या स्केलेटन स्टेट दिखाने की सुविधा मिलती है, जिससे उपयोगकर्ता अनुभव अधिक सहज होता है।

## पर्यावरण सेटअप

Intlayer एक हेडलेस कंटेंट सोर्स मैनेजमेंट (CSM) सिस्टम प्रदान करता है जो गैर-डेवलपर्स को एप्लिकेशन कंटेंट को सहजता से प्रबंधित और अपडेट करने में सक्षम बनाता है। Intlayer के सहज डैशबोर्ड का उपयोग करके, आपकी टीम स्थानीयकृत टेक्स्ट, छवियों, और अन्य संसाधनों को सीधे कोड में बदलाव किए बिना संपादित कर सकती है। यह कंटेंट प्रबंधन प्रक्रिया को सरल बनाता है, सहयोग को बढ़ावा देता है, और सुनिश्चित करता है कि अपडेट जल्दी और आसानी से किए जा सकें।

Intlayer के साथ शुरू करने के लिए:

1. **पंजीकरण करें और एक एक्सेस टोकन प्राप्त करें** [https://intlayer.org/dashboard](https://intlayer.org/dashboard) पर।
2. **अपने कॉन्फ़िगरेशन फ़ाइल में क्रेडेंशियल्स जोड़ें:**  
   अपने React प्रोजेक्ट में, अपने क्रेडेंशियल्स के साथ Intlayer क्लाइंट को कॉन्फ़िगर करें:

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

3. **Intlayer में एक नया लोकल डिक्शनरी पुश करें:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   यह कमांड आपके प्रारंभिक कंटेंट डिक्शनरीज़ को अपलोड करता है, जिससे वे Intlayer प्लेटफ़ॉर्म के माध्यम से असिंक्रोनस रूप से फ़ेचिंग और संपादन के लिए उपलब्ध हो जाते हैं।

## React में `useIntlayerAsync` को इम्पोर्ट करना

अपने React कॉम्पोनेंट्स में, `useIntlayerAsync` को इम्पोर्ट करें:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## पैरामीटर

1. **`key`**:  
   **प्रकार**: `DictionaryKeys`  
   वह डिक्शनरी कुंजी जिसका उपयोग स्थानीयकृत कंटेंट ब्लॉक की पहचान के लिए किया जाता है। यह कुंजी आपके कंटेंट घोषणा फ़ाइलों में परिभाषित होनी चाहिए।

2. **`locale`** (वैकल्पिक):  
   **प्रकार**: `Locales`  
   वह विशिष्ट लोकल जिसे आप लक्षित करना चाहते हैं। यदि छोड़ा गया है, तो हुक वर्तमान Intlayer संदर्भ से लोकल का उपयोग करता है।

3. **`isRenderEditor`** (वैकल्पिक, डिफ़ॉल्ट `true`):  
   **प्रकार**: `boolean`  
   यह निर्धारित करता है कि कंटेंट Intlayer एडिटर ओवरले के साथ रेंडरिंग के लिए तैयार होना चाहिए या नहीं। यदि इसे `false` सेट किया जाता है, तो लौटाई गई डिक्शनरी डेटा में एडिटर-विशिष्ट फीचर्स शामिल नहीं होंगे।

## रिटर्न वैल्यू

हुक एक डिक्शनरी ऑब्जेक्ट लौटाता है जिसमें स्थानीयकृत सामग्री होती है, जो `key` और `locale` द्वारा कुंजीबद्ध होती है। इसमें एक `isLoading` बूलियन भी शामिल है जो यह संकेत देता है कि क्या कोई रिमोट डिक्शनरी वर्तमान में लोड की जा रही है।

## एक React कॉम्पोनेंट में उदाहरण उपयोग

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>लोड हो रहा है…</h1>
          <p>कृपया प्रतीक्षा करें जब तक सामग्री अपडेट हो रही है।</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>लोड हो रहा है…</h1>
          <p>कृपया प्रतीक्षा करें जब तक सामग्री अपडेट हो रही है।</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>लोड हो रहा है…</h1>
          <p>कृपया प्रतीक्षा करें जब तक सामग्री अपडेट हो रही है।</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**मुख्य बिंदु:**

- प्रारंभिक रेंडर पर, `title` और `description` पहले से प्राप्त या स्थैतिक रूप से एम्बेड किए गए लोकल डिक्शनरी से आते हैं।
- जब `isLoading` `true` होता है, तब एक पृष्ठभूमि अनुरोध एक अपडेटेड डिक्शनरी प्राप्त करता है।
- एक बार जब फ़ेच पूरा हो जाता है, तो `title` और `description` नवीनतम सामग्री के साथ अपडेट हो जाते हैं, और `isLoading` फिर से `false` हो जाता है।

## एट्रिब्यूट लोकलाइजेशन को संभालना

आप विभिन्न HTML गुणों (जैसे, `alt`, `title`, `aria-label`) के लिए लोकलाइज्ड एट्रिब्यूट मान भी प्राप्त कर सकते हैं:

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## डिक्शनरी फ़ाइलें

सभी सामग्री कुंजियाँ आपके कंटेंट घोषणा फ़ाइलों में परिभाषित होनी चाहिए ताकि टाइप सुरक्षा बनी रहे और रनटाइम त्रुटियों से बचा जा सके। ये फ़ाइलें टाइपस्क्रिप्ट सत्यापन सक्षम करती हैं, जिससे आप हमेशा मौजूदा कुंजियों और लोकल्स का संदर्भ लेते हैं।

सामग्री घोषणा फ़ाइलें सेट अप करने के निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) उपलब्ध हैं।

## आगे की जानकारी

- **Intlayer विज़ुअल एडिटर:**  
  UI से सीधे सामग्री प्रबंधन और संपादन के लिए Intlayer विज़ुअल एडिटर के साथ एकीकरण करें। अधिक जानकारी [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)।

---

**सारांश में**, `useIntlayerAsync` एक शक्तिशाली React हुक है जिसे उपयोगकर्ता अनुभव को बेहतर बनाने और सामग्री की ताजगी बनाए रखने के लिए डिज़ाइन किया गया है, जो प्री-रेंडर की गई या प्री-फेच की गई शब्दकोशों को असिंक्रोनस शब्दकोश अपडेट्स के साथ मर्ज करता है। `isLoading` और TypeScript-आधारित सामग्री घोषणाओं का उपयोग करके, आप अपने React एप्लिकेशन में गतिशील, स्थानीयकृत सामग्री को सहजता से एकीकृत कर सकते हैं।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useIntlayerAsync हुक दस्तावेज | react-intlayer
description: react-intlayer पैकेज के लिए useIntlayerAsync हुक का उपयोग कैसे करें यह देखें
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

# React एकीकरण: `useIntlayerAsync` हुक दस्तावेज़

`useIntlayerAsync` हुक `useIntlayer` की कार्यक्षमता को बढ़ाता है, जो न केवल पूर्व-रेंडर की गई डिक्शनरी लौटाता है बल्कि अद्यतन सामग्री को असिंक्रोनस रूप से प्राप्त करता है। यह उन अनुप्रयोगों के लिए आदर्श है जो प्रारंभिक रेंडर के बाद बार-बार स्थानीयकृत सामग्री को अपडेट करते हैं।

## अवलोकन

- **असिंक्रोनस डिक्शनरी लोडिंग:**  
  प्रारंभिक माउंट पर, `useIntlayerAsync` पहले किसी भी पूर्व-प्राप्त या स्थिर रूप से बंडल की गई स्थानीय डिक्शनरी लौटाता है (जैसे `useIntlayer` करता है) और फिर असिंक्रोनस रूप से किसी भी नई उपलब्ध रिमोट डिक्शनरी को प्राप्त और मर्ज करता है।
- **प्रगति स्थिति प्रबंधन:**  
  यह हुक एक `isLoading` स्थिति भी प्रदान करता है, जो यह संकेत देता है कि रिमोट डिक्शनरी प्राप्त की जा रही है। यह डेवलपर्स को एक सहज उपयोगकर्ता अनुभव के लिए लोडिंग संकेतक या कंकाल स्थिति प्रदर्शित करने की अनुमति देता है।

## पर्यावरण सेटअप

Intlayer एक हेडलेस कंटेंट सोर्स मैनेजमेंट (CSM) सिस्टम प्रदान करता है जो गैर-डेवलपर्स को एप्लिकेशन सामग्री को निर्बाध रूप से प्रबंधित और अपडेट करने में सक्षम बनाता है। Intlayer के सहज डैशबोर्ड का उपयोग करके, आपकी टीम सीधे कोड को संशोधित किए बिना स्थानीयकृत टेक्स्ट, छवियों और अन्य संसाधनों को संपादित कर सकती है। यह सामग्री प्रबंधन प्रक्रिया को सुव्यवस्थित करता है, सहयोग को बढ़ावा देता है, और यह सुनिश्चित करता है कि अपडेट जल्दी और आसानी से किए जा सकते हैं।

Intlayer के साथ आरंभ करने के लिए:

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

3. **एक नई स्थानीय डिक्शनरी को Intlayer पर पुश करें:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   यह कमांड आपकी प्रारंभिक सामग्री डिक्शनरी को अपलोड करता है, जिससे वे असिंक्रोनस रूप से प्राप्त करने और Intlayer प्लेटफ़ॉर्म के माध्यम से संपादन के लिए उपलब्ध हो जाते हैं।

## React में `useIntlayerAsync` आयात करना

अपने React घटकों में, `useIntlayerAsync` आयात करें:

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
   स्थानीयकृत सामग्री ब्लॉक की पहचान करने के लिए उपयोग की जाने वाली डिक्शनरी कुंजी। यह कुंजी आपकी सामग्री घोषणा फ़ाइलों में परिभाषित होनी चाहिए।

2. **`locale`** (वैकल्पिक):  
   **प्रकार**: `Locales`  
   वह विशिष्ट स्थानीय भाषा जिसे आप लक्षित करना चाहते हैं। यदि छोड़ा गया है, तो हुक वर्तमान Intlayer संदर्भ से स्थानीय भाषा का उपयोग करता है।

3. **`isRenderEditor`** (वैकल्पिक, डिफ़ॉल्ट `true`):  
   **प्रकार**: `boolean`  
   यह निर्धारित करता है कि सामग्री Intlayer संपादक ओवरले के साथ रेंडरिंग के लिए तैयार होनी चाहिए या नहीं। यदि `false` पर सेट किया गया है, तो लौटाई गई डिक्शनरी डेटा संपादक-विशिष्ट सुविधाओं को बाहर कर देगा।

## रिटर्न वैल्यू

हुक एक डिक्शनरी ऑब्जेक्ट लौटाता है जिसमें `key` और `locale` द्वारा कुंजीबद्ध स्थानीयकृत सामग्री होती है। इसमें एक `isLoading` बूलियन भी शामिल है जो यह संकेत देता है कि क्या रिमोट डिक्शनरी वर्तमान में प्राप्त की जा रही है।

## React घटक में उदाहरण उपयोग

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

- प्रारंभिक रेंडर पर, `title` और `description` पूर्व-प्राप्त या स्थिर रूप से एम्बेडेड स्थानीय डिक्शनरी से आते हैं।
- जब `isLoading` `true` होता है, तो एक पृष्ठभूमि अनुरोध एक अद्यतन डिक्शनरी प्राप्त करता है।
- एक बार प्राप्ति पूरी हो जाने के बाद, `title` और `description` नवीनतम सामग्री के साथ अपडेट हो जाते हैं, और `isLoading` `false` पर लौट आता है।

## विशेषता स्थानीयकरण को संभालना

आप विभिन्न HTML गुणों (जैसे, `alt`, `title`, `aria-label`) के लिए स्थानीयकृत विशेषता मान भी प्राप्त कर सकते हैं:

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## डिक्शनरी फ़ाइलें

सभी सामग्री कुंजियों को आपकी सामग्री घोषणा फ़ाइलों में परिभाषित किया जाना चाहिए ताकि प्रकार सुरक्षा सुनिश्चित हो सके और रनटाइम त्रुटियों को रोका जा सके। ये फ़ाइलें TypeScript सत्यापन को सक्षम करती हैं, यह सुनिश्चित करते हुए कि आप हमेशा मौजूदा कुंजियों और स्थानीय भाषाओं का संदर्भ देते हैं।

सामग्री घोषणा फ़ाइलों को सेट करने के निर्देश [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) उपलब्ध हैं।

## अधिक जानकारी

- **Intlayer विज़ुअल एडिटर:**  
  UI से सीधे सामग्री प्रबंधित और संपादित करने के लिए Intlayer विज़ुअल एडिटर के साथ एकीकृत करें। अधिक विवरण [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md)।

---

**सारांश में**, `useIntlayerAsync` एक शक्तिशाली React हुक है जिसे उपयोगकर्ता अनुभव को बढ़ाने और पूर्व-रेंडर या पूर्व-प्राप्त डिक्शनरी को असिंक्रोनस डिक्शनरी अपडेट के साथ मर्ज करके सामग्री ताजगी बनाए रखने के लिए डिज़ाइन किया गया है। `isLoading` और TypeScript-आधारित सामग्री घोषणाओं का लाभ उठाकर, आप अपने React अनुप्रयोगों में गतिशील, स्थानीयकृत सामग्री को निर्बाध रूप से एकीकृत कर सकते हैं।

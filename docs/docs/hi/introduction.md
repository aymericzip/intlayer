---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: परिचय
description: जानिए कि Intlayer कैसे काम करता है। अपने एप्लिकेशन में Intlayer द्वारा उपयोग किए गए चरण देखें। जानिए विभिन्न पैकेज क्या करते हैं।
keywords:
  - परिचय
  - शुरूआत करें
  - Intlayer
  - एप्लिकेशन
  - पैकेज
slugs:
  - doc
  - get-started
---

# Intlayer प्रलेखन

आधिकारिक Intlayer प्रलेखन में आपका स्वागत है! यहां, आपको वह सब कुछ मिलेगा जो आपको Intlayer को एकीकृत, कॉन्फ़िगर और मास्टर करने के लिए चाहिए, चाहे आप Next.js, React, Vite, Express, या किसी अन्य जावास्क्रिप्ट वातावरण के साथ काम कर रहे हों, सभी अंतरराष्ट्रीयकरण (i18n) आवश्यकताओं के लिए।

## परिचय

### Intlayer क्या है?

**Intlayer** एक अंतरराष्ट्रीयकरण पुस्तकालय है जो विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह आपको आपके कोड में कहीं भी अपनी सामग्री घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री की घोषणा को संरचित शब्दकोशों में परिवर्तित करता है ताकि इसे आपके कोड में आसानी से एकीकृत किया जा सके। TypeScript का उपयोग करते हुए, **Intlayer** आपके विकास को मजबूत और अधिक कुशल बनाता है।

Intlayer एक वैकल्पिक दृश्य संपादक भी प्रदान करता है जो आपको अपनी सामग्री को आसानी से संपादित और प्रबंधित करने की अनुमति देता है। यह संपादक उन डेवलपर्स के लिए विशेष रूप से उपयोगी है जो सामग्री प्रबंधन के लिए एक दृश्य इंटरफ़ेस पसंद करते हैं, या उन टीमों के लिए जो बिना कोड की चिंता किए सामग्री उत्पन्न कर रही हैं।

### उपयोग का उदाहरण

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// यह componentContent एक शब्दकोश है जो विभिन्न भाषाओं में अनुवादित सामग्री को परिभाषित करता है
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// यह componentContent एक शब्दकोश है जो विभिन्न भाषाओं में अनुवादित सामग्री को परिभाषित करता है
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

// MyComponent एक फ़ंक्शनल कंपोनेंट है जो Intlayer से अनुवादित सामग्री प्राप्त करता है और उसे प्रदर्शित करता है
export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// MyComponent एक फ़ंक्शनल कंपोनेंट है जो Intlayer से अनुवादित सामग्री प्राप्त करता है और उसे प्रदर्शित करता है
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// MyComponent एक फ़ंक्शनल कंपोनेंट है जो Intlayer से अनुवादित सामग्री प्राप्त करता है और उसे प्रदर्शित करता है
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## मुख्य विशेषताएँ

Intlayer आधुनिक वेब विकास की आवश्यकताओं को पूरा करने के लिए विभिन्न विशेषताएँ प्रदान करता है। नीचे प्रमुख विशेषताएँ दी गई हैं, प्रत्येक के लिए विस्तृत दस्तावेज़ीकरण के लिंक के साथ:

- **अंतरराष्ट्रीयकरण समर्थन**: आपके एप्लिकेशन की वैश्विक पहुंच को अंतर्निर्मित अंतरराष्ट्रीयकरण समर्थन के साथ बढ़ाएं।
- **विज़ुअल एडिटर**: Intlayer के लिए डिज़ाइन किए गए एडिटर प्लगइन्स के साथ अपने विकास कार्यप्रवाह में सुधार करें। [विज़ुअल एडिटर गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।
- **कॉन्फ़िगरेशन लचीलापन**: व्यापक कॉन्फ़िगरेशन विकल्पों के साथ अपनी सेटअप को अनुकूलित करें, जिनका विवरण [कॉन्फ़िगरेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में दिया गया है।
- **उन्नत CLI उपकरण**: Intlayer के कमांड लाइन इंटरफ़ेस का उपयोग करके अपने प्रोजेक्ट्स को कुशलतापूर्वक प्रबंधित करें। क्षमताओं का अन्वेषण करें [CLI टूल्स दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) में।

## मुख्य अवधारणाएँ

### शब्दकोश

अपने बहुभाषी सामग्री को अपने कोड के करीब व्यवस्थित करें ताकि सब कुछ सुसंगत और रखरखाव योग्य रहे।

- **[शुरू करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)**  
  Intlayer में अपनी सामग्री घोषित करने के मूल बातें सीखें।

- **[अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md)**  
  समझें कि आपके एप्लिकेशन में अनुवाद कैसे उत्पन्न, संग्रहीत और उपयोग किए जाते हैं।

- **[सूचीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/enumeration.md)**  
  विभिन्न भाषाओं में बार-बार आने वाले या निश्चित डेटा सेट को आसानी से प्रबंधित करें।

- **[शर्त](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/conditional.md)**  
  Intlayer में गतिशील सामग्री बनाने के लिए शर्तीय तर्क का उपयोग करना सीखें।

- **[सम्मिलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md)**  
  सम्मिलन प्लेसहोल्डर का उपयोग करके स्ट्रिंग में मान कैसे डाले जाएं, यह जानें।

- **[फ़ंक्शन फ़ेचिंग](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/function_fetching.md)**  
  देखें कि कैसे अपनी परियोजना के कार्यप्रवाह के अनुसार कस्टम लॉजिक के साथ गतिशील रूप से सामग्री प्राप्त करें।

- **[मार्कडाउन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md)**  
  जानें कि Intlayer में समृद्ध सामग्री बनाने के लिए मार्कडाउन का उपयोग कैसे करें।

- **[फ़ाइल एम्बेडिंग](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/file_embeddings.md)**  
  जानें कि Intlayer में बाहरी फ़ाइलों को एम्बेड कैसे करें ताकि उन्हें सामग्री संपादक में उपयोग किया जा सके।

- **[नेस्टिंग](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/nesting.md)**  
  समझें कि Intlayer में जटिल संरचनाएँ बनाने के लिए सामग्री को नेस्ट कैसे करें।

### पर्यावरण और एकीकरण

हमने Intlayer को लचीलापन ध्यान में रखकर बनाया है, जो लोकप्रिय फ्रेमवर्क और बिल्ड टूल्स के साथ सहज एकीकरण प्रदान करता है:

- **[Next.js 15 के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (ऐप राउटर) के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_14.md)**
- **[Next.js पेज राउटर के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_page_router.md)**
- **[React CRA के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)**
- **[Vite + React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)**
- **[React Native और Expo के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_native+expo.md)**
- **[Lynx और React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_lynx+react.md)**
- **[Express के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_express.md)**

प्रत्येक एकीकरण गाइड में Intlayer की विशेषताओं का उपयोग करने के लिए सर्वोत्तम प्रथाएँ शामिल हैं, जैसे कि **सर्वर-साइड रेंडरिंग**, **डायनामिक रूटिंग**, या **क्लाइंट-साइड रेंडरिंग**, ताकि आप एक तेज़, SEO-अनुकूल, और अत्यधिक स्केलेबल एप्लिकेशन बनाए रख सकें।

## योगदान और प्रतिक्रिया

हम ओपन-सोर्स और समुदाय-चालित विकास की शक्ति को महत्व देते हैं। यदि आप सुधार प्रस्तावित करना चाहते हैं, एक नया गाइड जोड़ना चाहते हैं, या हमारे दस्तावेज़ों में किसी भी समस्या को ठीक करना चाहते हैं, तो कृपया एक पुल रिक्वेस्ट सबमिट करें या हमारे [GitHub रिपॉजिटरी](https://github.com/aymericzip/intlayer/blob/main/docs/docs) पर एक इश्यू खोलें।

**क्या आप अपनी एप्लिकेशन का अनुवाद तेज़ और अधिक कुशलता से करना चाहते हैं?** आज ही Intlayer का उपयोग शुरू करने के लिए हमारे दस्तावेज़ों में गोता लगाएँ। एक मजबूत, सुव्यवस्थित अंतरराष्ट्रीयकरण दृष्टिकोण का अनुभव करें जो आपकी सामग्री को व्यवस्थित रखता है और आपकी टीम को अधिक उत्पादक बनाता है।

---

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

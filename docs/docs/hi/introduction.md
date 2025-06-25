---
docName: introduction
url: https://intlayer.org/doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: परिचय
description: जानें कि Intlayer कैसे काम करता है। अपने अनुप्रयोग में Intlayer द्वारा उपयोग किए गए चरणों को देखें। विभिन्न पैकेज क्या करते हैं, यह देखें।
keywords:
  - परिचय
  - शुरू करें
  - Intlayer
  - अनुप्रयोग
  - पैकेज
---

# Intlayer दस्तावेज़ीकरण

आधिकारिक Intlayer दस्तावेज़ीकरण में आपका स्वागत है! यहां, आपको Intlayer को एकीकृत, कॉन्फ़िगर और मास्टर करने के लिए आवश्यक सभी जानकारी मिलेगी, चाहे आप Next.js, React, Vite, Express, या किसी अन्य JavaScript वातावरण के साथ काम कर रहे हों।

## परिचय

### Intlayer क्या है?

**Intlayer** एक अंतर्राष्ट्रीयकरण लाइब्रेरी है जो विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन की गई है। यह आपको अपने कोड में कहीं भी सामग्री की घोषणा करने की अनुमति देता है। यह बहुभाषी सामग्री की घोषणा को संरचित शब्दकोशों में परिवर्तित करता है ताकि इसे आपके कोड में आसानी से एकीकृत किया जा सके। TypeScript का उपयोग करते हुए, **Intlayer** आपके विकास को मजबूत और अधिक कुशल बनाता है।

Intlayer एक वैकल्पिक दृश्य संपादक भी प्रदान करता है जो आपको अपनी सामग्री को आसानी से संपादित और प्रबंधित करने की अनुमति देता है। यह संपादक विशेष रूप से उन डेवलपर्स के लिए उपयोगी है जो सामग्री प्रबंधन के लिए एक दृश्य इंटरफ़ेस पसंद करते हैं, या उन टीमों के लिए जो कोड की चिंता किए बिना सामग्री उत्पन्न कर रही हैं।

### उपयोग का उदाहरण

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
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
        "es": "Hola Mundo",
        "hi": "नमस्ते दुनिया"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## मुख्य विशेषताएं

Intlayer आधुनिक वेब विकास की आवश्यकताओं को पूरा करने के लिए विभिन्न विशेषताएं प्रदान करता है। नीचे प्रमुख विशेषताएं दी गई हैं, प्रत्येक के लिए विस्तृत दस्तावेज़ीकरण के लिंक के साथ:

- **अंतर्राष्ट्रीयकरण समर्थन**: अंतर्निहित अंतर्राष्ट्रीयकरण समर्थन के साथ अपने एप्लिकेशन की वैश्विक पहुंच को बढ़ाएं।
- **विज़ुअल संपादक**: Intlayer के लिए डिज़ाइन किए गए संपादक प्लगइन्स के साथ अपने विकास वर्कफ़्लो को बेहतर बनाएं। [विज़ुअल संपादक गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) देखें।
- **कॉन्फ़िगरेशन लचीलापन**: [कॉन्फ़िगरेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में विस्तृत कॉन्फ़िगरेशन विकल्पों के साथ अपनी सेटअप को अनुकूलित करें।
- **उन्नत CLI उपकरण**: Intlayer के कमांड लाइन इंटरफ़ेस का उपयोग करके अपने प्रोजेक्ट्स को कुशलतापूर्वक प्रबंधित करें। [CLI उपकरण दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) में क्षमताओं का अन्वेषण करें।

## मुख्य अवधारणाएँ

### शब्दकोश

अपने बहुभाषी सामग्री को अपने कोड के करीब व्यवस्थित करें ताकि सब कुछ सुसंगत और बनाए रखने योग्य रहे।

- **[शुरू करें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md)**  
  Intlayer में अपनी सामग्री की घोषणा की मूल बातें जानें।

- **[अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/translation.md)**  
  समझें कि अनुवाद कैसे उत्पन्न, संग्रहीत और आपके एप्लिकेशन में उपयोग किए जाते हैं।

- **[क्रमांकन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/enumeration.md)**  
  विभिन्न भाषाओं में डेटा के दोहराए गए या निश्चित सेट को आसानी से प्रबंधित करें।

- **[फ़ंक्शन फ़ेचिंग](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/function_fetching.md)**  
  अपने प्रोजेक्ट के वर्कफ़्लो से मेल खाने के लिए कस्टम लॉजिक के साथ सामग्री को गतिशील रूप से फ़ेच करने का तरीका देखें।

### वातावरण और एकीकरण

हमने Intlayer को लचीलापन ध्यान में रखते हुए बनाया है, जो लोकप्रिय फ्रेमवर्क और बिल्ड टूल्स में सहज एकीकरण प्रदान करता है:

- **[Next.js 15 के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (App Router) के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_14.md)**
- **[Next.js पेज राउटर के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_page_router.md)**
- **[React CRA के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)**
- **[Vite + React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md)**
- **[Express के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_express.md)**

प्रत्येक एकीकरण गाइड में Intlayer की विशेषताओं का उपयोग करने के लिए सर्वोत्तम प्रथाएँ शामिल हैं, जैसे **सर्वर-साइड रेंडरिंग**, **डायनामिक राउटिंग**, या **क्लाइंट-साइड रेंडरिंग**, ताकि आप एक तेज़, SEO-अनुकूल, और अत्यधिक स्केलेबल एप्लिकेशन बनाए रख सकें।

## योगदान और प्रतिक्रिया

हम ओपन-सोर्स और समुदाय-चालित विकास की शक्ति को महत्व देते हैं। यदि आप सुधार प्रस्तावित करना चाहते हैं, एक नया गाइड जोड़ना चाहते हैं, या हमारे दस्तावेज़ में किसी भी समस्या को ठीक करना चाहते हैं, तो [GitHub रिपॉजिटरी](https://github.com/aymericzip/intlayer/blob/main/docs) पर एक Pull Request सबमिट करें या एक समस्या खोलें।

**क्या आप अपने एप्लिकेशन का अनुवाद तेज़ और अधिक कुशलता से करना चाहते हैं?** Intlayer का उपयोग शुरू करने के लिए हमारे दस्तावेज़ में गोता लगाएँ। अंतर्राष्ट्रीयकरण के लिए एक मजबूत, सुव्यवस्थित दृष्टिकोण का अनुभव करें जो आपकी सामग्री को संगठित रखता है और आपकी टीम को अधिक उत्पादक बनाता है।

सुखद अनुवाद!

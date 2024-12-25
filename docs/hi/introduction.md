# Intlayer Documentation

Intlayer दस्तावेज़ में आपका स्वागत है। यह गाइड Intlayer, इसकी मुख्य विशेषताओं, और आपके विकास अनुभव को बढ़ाने के लिए इन दस्तावेज़ों का प्रभावी ढंग से उपयोग कैसे करें, का संग Überblick प्रदान करती है।

## Introduction

### Intlayer क्या है?

**Intlayer** एक अंतरराष्ट्रीयकरण पुस्तकालय है जिसे विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह आपके कोड में आपके सामग्री की सभी जगह घोषणा की अनुमति देता है। यह बहुभाषी सामग्री की घोषणाओं को संरचित शब्दकोशों में बदलता है ताकि इसे आपके कोड में आसानी से एकीकृत किया जा सके। TypeScript का उपयोग करते हुए, **Intlayer** आपके विकास को सशक्त और अधिक प्रभावी बनाता है।

Intlayer एक वैकल्पिक दृश्य संपादक भी प्रदान करता है जो आपको अपनी सामग्री को आसानी से संपादित और प्रबंधित करने की अनुमति देता है। यह संपादक विशेष रूप से उन डेवलपर्स के लिए उपयोगी है जो सामग्री प्रबंधन के लिए एक दृश्य इंटरफ़ेस पसंद करते हैं, या उन टीमों के लिए जो कोड के बारे में चिंता किए बिना सामग्री उत्पन्न करती हैं।

## उपयोग का उदाहरण

```bash codeFormat="typescript"
.
└── Components
    └── myComponent
       ├── index.content.ts
       └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── myComponent
       ├── index.content.cjs
       └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── myComponent
       ├── index.content.mjs
       └── index.js
```

```tsx fileName="src/components/myComponent/myComponent.content.ts" contentDeclarationFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="src/components/myComponent/myComponent.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/myComponent/myComponent.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/myComponent/myComponent.content.json" contentDeclarationFormat="json"
{
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

```tsx fileName="src/components/myComponent/MyComponent.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/myComponent/MyComponent.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/myComponent/MyComponent.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### मुख्य विशेषताएँ

Intlayer आधुनिक वेब विकास की आवश्यकताओं को पूरा करने के लिए कई विशेषताओं की पेशकश करता है। नीचे मुख्य विशेषताएँ दी गई हैं, जिनका लिंक प्रत्येक के लिए विस्तृत दस्तावेज़ में दिया गया है:

- **अंतरराष्ट्रीयकरण समर्थन**: अंतरराष्ट्रीयकरण के लिए अंतर्निहित समर्थन के साथ अपने ऐप्लिकेशन की वैश्विक पहुंच को बढ़ाएं।
- **दृश्य संपादक**: Intlayer के लिए डिज़ाइन किए गए संपादक प्लगइन के साथ अपने विकास वर्कफ़्लो को बेहतर बनाएं। [दृश्य संपादक गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) देखें।
- **कॉन्फ़िगरेशन लचीलापन**: [कॉन्फ़िगरेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में विस्तार से बताए गए व्यापक कॉन्फ़िगरेशन विकल्पों के साथ अपने सेटअप को अनुकूलित करें।
- **उन्नत CLI उपकरण**: Intlayer के कमांड लाइन इंटरफ़ेस का उपयोग करके अपने प्रोजेक्टों का कुशल प्रबंधन करें। [CLI उपकरण दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) में क्षमताओं का अन्वेषण करें।
- **i18n के साथ संगतता**: Intlayer अन्य अंतरराष्ट्रीयकरण पुस्तकालयों के साथ सहजता से काम करता है। अधिक जानकारी के लिए [i18n गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_i18next.md) देखें।

### समर्थित प्लेटफ़ॉर्म

Intlayer Next.js और React ऐप्लिकेशन के साथ सहजता से काम करने के लिए डिज़ाइन किया गया है। यह Vite और Create React App का भी समर्थन करता है।

- **Next.js एकीकरण**: सर्वर-साइड रेंडरिंग और स्थैतिक साइट जनरेशन के लिए Intlayer के भीतर Next.js की शक्ति का उपयोग करें। हमारे [Next.js एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) में विवरण उपलब्ध हैं।
- **Vite और React एकीकरण**: सर्वर-साइड रेंडरिंग और स्थैतिक साइट जनरेशन के लिए Intlayer के भीतर Vite का लाभ उठाएं। हमारे [Vite और React एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) में विवरण उपलब्ध हैं।
- **Create React App एकीकरण**: सर्वर-साइड रेंडरिंग और स्थैतिक साइट जनरेशन के लिए Intlayer के भीतर Create React App की शक्ति का उपयोग करें। हमारे [Create React App एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) में विवरण उपलब्ध हैं।

### इस दस्तावेज़ का उपयोग कैसे करें

इस दस्तावेज़ का अधिकतम लाभ उठाने के लिए:

1. **संबंधित अनुभागों पर जाएं**: अपने आवश्यकताओं का समाधान करने वाले अनुभागों पर सीधे जाने के लिए ऊपर दिए गए लिंक का उपयोग करें।
2. **इंटरएक्टिव उदाहरण**: जहां उपलब्ध हो, उन इंटरएक्टिव उदाहरणों का उपयोग करें ताकि आप वास्तविक समय में देख सकें कि विशेषताएँ कैसे काम करती हैं।
3. **फीडबैक और योगदान**: आपकी प्रतिक्रिया महत्वपूर्ण है। यदि आपके पास सुझाव या सुधार हैं, तो कृपया दस्तावेज़ में योगदान करने पर विचार करें।

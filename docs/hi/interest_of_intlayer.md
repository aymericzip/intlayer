---
docName: interest_of_intlayer
url: /doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2024-08-14
title: Intlayer की रुचि
description: अपने परियोजनाओं में Intlayer का उपयोग करने के लाभ और फायदे जानें। यह समझें कि Intlayer अन्य फ्रेमवर्क के बीच क्यों खड़ा है।
keywords:
  - लाभ
  - फायदे
  - Intlayer
  - फ्रेमवर्क
  - निष्कर्ष
---

# Intlayer: आपकी वेबसाइट को अनुवाद करने का एक अनुकूलित तरीका

**Intlayer** एक अंतर्राष्ट्रीयकरण लाइब्रेरी है जो विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन की गई है। यह आपको अपने कोड में कहीं भी अपनी सामग्री घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री की घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है, जिससे आपके कोड में आसानी से एकीकरण हो सके। TypeScript का उपयोग करके, **Intlayer** आपके विकास को अधिक मजबूत और कुशल बनाता है।

## उपयोग उदाहरण

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Intlayer क्यों चुनें?

- **JavaScript-आधारित सामग्री प्रबंधन**: अपनी सामग्री को कुशलतापूर्वक परिभाषित और प्रबंधित करने के लिए JavaScript की लचीलापन का लाभ उठाएं।
- **टाइप-सुरक्षित वातावरण**: सभी सामग्री परिभाषाओं को सटीक और त्रुटि-मुक्त सुनिश्चित करने के लिए TypeScript का उपयोग करें।
- **एकीकृत सामग्री फ़ाइलें**: अनुवाद सामग्री को उनके संबंधित घटकों के पास रखें, जिससे रखरखाव और स्पष्टता में सुधार हो।
- **सरल कॉन्फ़िगरेशन**: न्यूनतम कॉन्फ़िगरेशन के साथ तुरंत शुरू करें, विशेष रूप से Next.js प्रोजेक्ट्स के लिए अनुकूलित।
- **सर्वर घटक समर्थन**: Next.js सर्वर घटकों के लिए पूरी तरह से उपयुक्त, सहज सर्वर-साइड रेंडरिंग सुनिश्चित करें।
- **बेहतर राउटिंग**: Next.js एप्लिकेशन राउटिंग के लिए पूर्ण समर्थन, जटिल एप्लिकेशन संरचनाओं के लिए पूरी तरह से अनुकूल।
- **अच्छी तरह से संगठित कोडबेस**: कोडबेस को अधिक संगठित रखें: 1 घटक = 1 शब्दकोश एक ही फ़ोल्डर में।
- **स्वचालित TypeScript प्रकार**: TypeScript प्रकार स्वचालित रूप से लागू होते हैं, कुंजियों के पुनर्नामकरण या हटाने के कारण कोड टूटने से बचाते हैं।
- **CI स्वचालित अनुवाद**: अपने CI में अपनी स्वयं की OpenAI API कुंजी का उपयोग करके अपने अनुवादों को स्वचालित रूप से भरें, L10n प्लेटफ़ॉर्म की आवश्यकता को समाप्त करते हुए।
- **MCP सर्वर एकीकरण**: IDE स्वचालन के लिए एक MCP (Model Context Protocol) सर्वर प्रदान करता है, जो आपके विकास वातावरण के भीतर सीधे सामग्री प्रबंधन और i18n वर्कफ़्लो को सक्षम बनाता है। [और जानें](https://github.com/aymericzip/intlayer/blob/main/docs/en/mcp_server.md)।
- **मार्कडाउन समर्थन**: गोपनीयता नीतियों जैसी बहुभाषी सामग्री के लिए मार्कडाउन फ़ाइलों को आयात और व्याख्या करें।
- **मुफ्त विज़ुअल एडिटर और CMS**: यदि आपको अनुवाद के लिए सामग्री लेखकों के साथ सहयोग करने की आवश्यकता है, तो मुफ्त विज़ुअल एडिटर और CMS का उपयोग करें, फिर से स्थानीयकरण प्लेटफ़ॉर्म की आवश्यकता को समाप्त करें और कोडबेस से सामग्री को बाहरीकृत करने की अनुमति दें।
- **सरल सामग्री पुनर्प्राप्ति**: प्रत्येक सामग्री टुकड़े के लिए `t` फ़ंक्शन को कॉल करने की आवश्यकता नहीं है; सभी सामग्री को सीधे पुनर्प्राप्त करने के लिए एक ही हुक का उपयोग करें।
- **संगत कार्यान्वयन**: क्लाइंट और सर्वर घटक एक ही कार्यान्वयन का उपयोग करते हैं, प्रत्येक सर्वर घटक के माध्यम से `t` फ़ंक्शन पास करने की आवश्यकता नहीं है।
- **Tree-shakable सामग्री**: सामग्री tree-shakable है, जिससे अंतिम पैकेज हल्का होता है।
- **गैर-अवरुद्ध स्थिर रेंडरिंग**: Intlayer `next-intl` की तरह स्थिर रेंडरिंग को अवरुद्ध नहीं करता है।
- **अंतरसंचालन**: [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-intl.md) और [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-intl.md) के साथ अंतरसंचालन की अनुमति देता है।

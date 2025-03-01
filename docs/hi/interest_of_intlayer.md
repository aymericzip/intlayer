# Intlayer: अपने एप्लिकेशन का अनुवाद करने का एक निकटतम तरीका

**Intlayer** एक अंतरराष्ट्रीयकरण लाइब्रेरी है जो विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन की गई है। यह आपके कोड में हर जगह आपके सामग्री की घोषणा की अनुमति देता है। यह बहुभाषी सामग्री की घोषणा को संरचित शब्दकोशों में परिवर्तित करता है ताकि इसे आपके कोड में आसानी से एकीकृत किया जा सके। टाइपस्क्रिप्ट का उपयोग करते हुए, **Intlayer** आपके विकास को मजबूत और अधिक कुशल बनाता है।

## उपयोग का उदाहरण

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
      hi: "नमस्ते दुनिया",
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
      hi: "नमस्ते दुनिया",
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
      hi: "नमस्ते दुनिया",
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

- **जावास्क्रिप्ट-संचालित सामग्री प्रबंधन**: अपनी सामग्री को कुशलतापूर्वक परिभाषित और प्रबंधित करने के लिए जावास्क्रिप्ट की लचीलापन का उपयोग करें।
- **टाइप-सुरक्षित वातावरण**: सुनिश्चित करें कि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि-मुक्त हैं, टाइपस्क्रिप्ट का लाभ उठाएं।
- **एकीकृत सामग्री फ़ाइलें**: अपनी अनुवादों को उनके संबंधित घटकों के पास रखें, जिससे रखरखाव और स्पष्टता बढ़े।
- **सरल सेटअप**: न्यूनतम कॉन्फ़िगरेशन के साथ जल्दी से शुरू करें, विशेष रूप से नेक्स्ट.जेएस प्रोजेक्ट्स के लिए अनुकूलित।
- **सर्वर घटक समर्थन**: नेक्स्ट.जेएस सर्वर घटकों के लिए पूरी तरह से उपयुक्त, सुनिश्चित करें कि सर्वर-साइड रेंडरिंग सुचारू हो।
- **बेहतर रूटिंग**: नेक्स्ट.जेएस ऐप रूटिंग के लिए पूर्ण समर्थन, जटिल एप्लिकेशन संरचनाओं के साथ सहजता से अनुकूल।
- **इंटरऑपरेबिलिटी**: [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_next-intl.md), और [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_react-intl.md) के साथ इंटरऑपरेबिलिटी की अनुमति दें।

# Intlayer: आपके अनुप्रयोग का अनुवाद करने का एक करीब तरीका

**Intlayer** एक अंतर्राष्ट्रीयकरण पुस्तकालय है जिसे विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह आपके कोड में हर जगह आपके सामग्री की घोषणा करने की अनुमति देता है। यह बहुभाषी सामग्री की घोषणा को संरचित शब्दकोशों में परिवर्तित करता है ताकि इसे अपने कोड में आसानी से एकीकृत किया जा सके। TypeScript का उपयोग करते हुए, **Intlayer** आपके विकास को मजबूत और अधिक प्रभावी बनाता है।

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
import { type DeclarationContent, t } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

- **जावास्क्रिप्ट-शक्ति प्राप्त सामग्री प्रबंधन**: अपनी सामग्री को कुशलता से परिभाषित और प्रबंधित करने के लिए जावास्क्रिप्ट की लचीलापन का लाभ उठाएं।
- **प्रकार-सुरक्षित वातावरण**: यह सुनिश्चित करने के लिए TypeScript का लाभ उठाएं कि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि-रहित हैं।
- **एकीकृत सामग्री फ़ाइलें**: अपनी अनुवादों को उनके संबंधित घटकों के करीब रखें, जिससे बनाए रखने और स्पष्टता में सुधार होता है।
- **सरल सेटअप**: न्यूनतम कॉन्फ़िगरेशन के साथ जल्दी से शुरू हो जाएं, विशेष रूप से Next.js परियोजनाओं के लिए अनुकूलित।
- **सर्वर घटक समर्थन**: Next.js सर्वर घटकों के लिए पूरी तरह से उपयुक्त, यह सर्वर साइड रेंडरिंग सुनिश्चित करता है।
- **सुधारी गई राउटिंग**: Next.js ऐप राउटिंग के लिए पूर्ण समर्थन, जटिल अनुप्रयोग संरचनाओं के अनुरूप ढलना।
- **अंतर-सामंजस्य**: i18next अंतर-सामंजस्य की अनुमति दें। (बीटा)

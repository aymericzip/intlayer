# Intlayer: आपके अनुप्रयोग का अनुवाद करने का एक करीबी तरीका

**Intlayer** एक अंतरराष्ट्रीयकरण लाइब्रेरी है जो विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन की गई है। यह आपके कोड में कहीं भी आपके सामग्री की घोषणा करने की अनुमति देता है। यह बहुभाषी सामग्री की घोषणा को संरचित शब्दकोशों में परिवर्तित करता है ताकि इसे आपके कोड में आसानी से एकीकृत किया जा सके। TypeScript का उपयोग करते हुए, **Intlayer** आपके विकास को और मजबूत और अधिक प्रभावी बनाता है।

## उपयोग का उदाहरण

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## Intlayer क्यों चुनें?

- **JavaScript-प्रेरित सामग्री प्रबंधन**: आपके सामग्री को प्रभावी ढंग से परिभाषित और प्रबंधित करने के लिए JavaScript की लचीलापन का लाभ उठाएं।
- **टाइप-सेफ वातावरण**: सभी आपकी सामग्री परिभाषाओं की सटीकता और त्रुटि-मुक्तता सुनिश्चित करने के लिए TypeScript का लाभ उठाएं।
- **एकीकृत सामग्री फ़ाइलें**: आपके अनुवादों को उनके संबंधित घटकों के करीब रखें, जिससे रखरखाव और स्पष्टता में सुधार होता है।
- **सरल सेटअप**: न्यूनतम कॉन्फ़िगरेशन के साथ जल्दी पनपें, विशेष रूप से Next.js परियोजनाओं के लिए अनुकूलित।
- **सर्वर कंपोनेंट समर्थन**: Next.js सर्वर कंपोनेंट के लिए पूरी तरह से उपयुक्त, जो चिकनी सर्वर-साइड रेंडरिंग सुनिश्चित करता है।
- **सुधारित रूटिंग**: Next.js ऐप रूटिंग के लिए पूर्ण समर्थन, जटिल अनुप्रयोग संरचनाओं के अनुकूलता में समायोजित।
- **इंटरऑपरेबिलिटी**: i18next इंटरऑपरेबिलिटी की अनुमति दें। (बीटा)

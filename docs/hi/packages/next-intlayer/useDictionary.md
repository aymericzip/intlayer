# React Integration: `useDictionary` Hook Documentation

यह अनुभाग React अनुप्रयोगों के भीतर `useDictionary` हुक का उपयोग करने पर विस्तृत मार्गदर्शन प्रदान करता है, जो बिना दृश्य संपादक के स्थानीयकृत सामग्री को कुशलतापूर्वक संभालने की अनुमति देता है।

## React में `useDictionary` का आयात करना

`useDictionary` हुक को संदर्भ के आधार पर React अनुप्रयोगों में आयात किया जा सकता है:

- **क्लाइंट कंपोनेंट:**

  ```javascript
  import { useDictionary } from "next-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

- **सर्वर कंपोनेंट:**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

## पैरामीटर

यह हुक दो पैरामीटर स्वीकार करता है:

1. **`dictionary`**: एक घोषित शब्दकोश वस्तु जिसमें विशिष्ट कुंजियों के लिए स्थानीयकृत सामग्री होती है।
2. **`locale`** (वैकल्पिक): वांछित स्थानीयता। यदि निर्दिष्ट नहीं किया गया है, तो यह वर्तमान संदर्भ की स्थानीयता को डिफ़ॉल्ट रूप से लेता है।

## सामग्री घोषणा

सभी शब्दकोश वस्तुओं को संरचित सामग्री फ़ाइलों में घोषित किया जाना चाहिए ताकि टाइप सुरक्षा सुनिश्चित की जा सके और रनटाइम त्रुटियों से बचा जा सके। आप सेटअप निर्देश [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) पा सकते हैं। यहां सामग्री की घोषणा का एक उदाहरण है:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## React में उपयोग का उदाहरण

नीचे उस तरीके का एक उदाहरण है कि कैसे `useDictionary` हुक को React घटक में उपयोग किया जा सकता है:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## सर्वर एकीकरण

यदि आप `IntlayerServerProvider` के बाहर `useDictionary` हुक का उपयोग कर रहे हैं, तो घटक को रेंडर करते समय स्थानीयता को एक पैरामीटर के रूप में स्पष्ट रूप से प्रदान किया जाना चाहिए:

```tsx
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## विशेषताओं पर नोट्स

दृश्य संपादकों का उपयोग करने वाली एकीकरण के विपरीत, `buttonTitle.value` जैसी विशेषताएं यहाँ लागू नहीं होती हैं। इसके बजाय, अपनी सामग्री में घोषित की गई स्थानीयकृत स्ट्रिंग्स को सीधे एक्सेस करें।

```tsx
<button title={content.title}>{content.content}</button>
```

## अतिरिक्त सुझाव

- **टाइप सुरक्षा**: हमेशा टाइप सुरक्षा सुनिश्चित करने के लिए अपने शब्दकोशों को परिभाषित करने के लिए `DeclarationContent` का उपयोग करें।
- **स्थानीयकरण अपडेट**: सामग्री को अपडेट करते समय, सभी स्थानीयताओं में संगति सुनिश्चित करें ताकि अनुवाद छूट न जाएं।

यह दस्तावेज़ `useDictionary` हुक के एकीकरण पर केंद्रित है, जो बिना दृश्य संपादक कार्यक्षमताओं पर निर्भर किए स्थानीयकृत सामग्री को प्रबंधित करने के लिए एक सहज दृष्टिकोण प्रदान करता है।

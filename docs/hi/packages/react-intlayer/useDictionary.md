# React Integration: `useDictionary` Hook Documentation

यह अनुभाग React अनुप्रयोगों के भीतर `useDictionary` हुक के उपयोग पर विस्तृत मार्गदर्शन प्रदान करता है, जो बिना किसी दृश्य संपादक के स्थानीयकृत सामग्री को प्रभावी ढंग से संभालने में सक्षम बनाता है।

## Importing `useDictionary` in React

`useDictionary` हुक को संदर्भ के आधार पर React अनुप्रयोगों में एकीकृत किया जा सकता है:

- **Client Component:**

  ```javascript
  import { useDictionary } from "react-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

- **Server Component:**

  ```javascript
  import { useDictionary } from "react-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

## Parameters

हुक दो पैरामीटर स्वीकार करता है:

1. **`dictionary`**: एक घोषित शब्दकोश वस्तु जो विशिष्ट कुंजी के लिए स्थानीयकृत सामग्री को समाहित करती है।
2. **`locale`** (वैकल्पिक): वांछित स्थानीयता। यदि निर्दिष्ट नहीं है, तो वर्तमान संदर्भ की स्थानीयता डिफ़ॉल्ट होती है।

## Content Declaration

सभी शब्दकोश वस्तुओं को संरचित सामग्री फ़ाइलों में घोषित किया जाना चाहिए ताकि प्रकार की सुरक्षा सुनिश्चित हो सके और रनटाइम त्रुटियों से बचा जा सके। आप सेटअप निर्देश [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) पा सकते हैं। यहाँ सामग्री घोषणा का एक उदाहरण है:

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

## Example Usage in React

नीचे बताया गया है कि कैसे `useDictionary` हुक का उपयोग एक React घटक में किया जाता है:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "react-intlayer";
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

## Server Integration

यदि आप `IntlayerProvider` के बाहर `useDictionary` हुक का उपयोग कर रहे हैं, तो घटक को रेंडर करते समय स्थानीयता को एक पैरामीटर के रूप में स्पष्ट रूप से प्रदान करना चाहिए:

```tsx
import { useDictionary } from "react-intlayer/server";
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

## Notes on Attributes

दृश्य संपादकों का उपयोग करते समय जो अभिव्यक्तियाँ लागू होती हैं, वे यहाँ लागू नहीं होती हैं, जैसे `buttonTitle.value`। इसके बजाय, अपनी सामग्री में घोषित स्थानीयकृत स्ट्रिंग्स तक सीधे पहुँचें।

```tsx
<button title={content.title}>{content.content}</button>
```

## Additional Tips

- **Type Safety**: हमेशा अपनी dictionaries को परिभाषित करने के लिए `DeclarationContent` का उपयोग करें ताकि प्रकार की सुरक्षा सुनिश्चित हो सके।
- **Localization Updates**: सामग्री को अपडेट करते समय, सुनिश्चित करें कि सभी स्थानीयताएँ संगत हैं ताकि अनुवाद की कमी न हो।

यह दस्तावेज़ `useDictionary` हुक के एकीकरण पर केंद्रित है, जो बिना दृश्य संपादक कार्यक्षमताओं पर निर्भर किए स्थानीयकृत सामग्री को प्रबंधित करने के लिए एक सुव्यवस्थित दृष्टिकोण प्रदान करता है।

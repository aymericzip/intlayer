# React Integration: `useDictionary` Hook Documentation

यह अनुभाग React अनुप्रयोगों में `useDictionary` हुक का उपयोग करने पर विस्तृत मार्गदर्शन प्रदान करता है, जो दृश्य संपादक के बिना स्थानीयकृत सामग्री को कुशलता से संभालने की अनुमति देता है।

## Importing `useDictionary` in React

`useDictionary` हुक को React अनुप्रयोगों में संदर्भ के आधार पर आयात करके एकीकृत किया जा सकता है:

- **क्लाइंट घटक:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // क्लाइंट साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // क्लाइंट साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // क्लाइंट साइड React घटकों में उपयोग किया जाता है
  ```

- **सर्वर घटक:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // सर्वर साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // सर्वर साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // सर्वर साइड React घटकों में उपयोग किया जाता है
  ```

## Parameters

हुक दो पैरामीटर स्वीकार करता है:

1. **`dictionary`**: एक घोषित शब्दकोश वस्तु जिसमें विशिष्ट कुंजी के लिए स्थानीयकृत सामग्री होती है।
2. **`locale`** (वैकल्पिक): इच्छित स्थानीय भाषा। यदि निर्दिष्ट नहीं किया गया है तो वर्तमान संदर्भ की स्थानीय भाषा पर डिफ़ॉल्ट होता है।

## Content Declaration

सभी शब्दकोश वस्तुओं को संरचित सामग्री फ़ाइलों में घोषित किया जाना चाहिए ताकि प्रकार सुरक्षा सुनिश्चित हो सके और रनटाइम त्रुटियों से बचा जा सके। आप सेटअप निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) पाएंगे। यहां सामग्री घोषणा का एक उदाहरण है:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const componentContent = {
  key: "component-example",
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-example",
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
};

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-example",
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
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## Example Usage in React

नीचे एक उदाहरण दिया गया है कि कैसे `useDictionary` हुक को एक React घटक में उपयोग किया जाए:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Server Integration

यदि आप `IntlayerProvider` के बाहर `useDictionary` हुक का उपयोग कर रहे हैं, तो घटक को रेंडर करते समय स्थानीय भाषा को स्पष्ट रूप से पैरामीटर के रूप में प्रदान करना होगा:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Notes on Attributes

दृश्य संपादकों का उपयोग करने वाली संपूर्णताओं के विपरीत, यहाँ गुण जैसे `buttonTitle.value` लागू नहीं होते हैं। इसके बजाय, आपकी सामग्री में दर्ज स्थानीयकृत स्ट्रिंग को सीधे एक्सेस करें।

```jsx
<button title={content.title}>{content.content}</button>
```

## Additional Tips

- **Type Safety**: हमेशा अपने शब्दकोशों को परिभाषित करने के लिए `DeclarationContent` का उपयोग करें ताकि प्रकार सुरक्षा सुनिश्चित हो सके।
- **Localization Updates**: जब सामग्री अपडेट की जाती है, तो सभी स्थानीय भाषाएँ सुसंगत होने का सुनिश्चित करें ताकि अनुवाद गायब न हों।

यह दस्तावेज़ `useDictionary` हुक के एकीकरण पर केंद्रित है, जो दृश्य संपादक कार्यक्षमता पर निर्भर किए बिना स्थानीयकृत सामग्री को प्रबंधित करने के लिए एक सुव्यवस्थित दृष्टिकोण प्रदान करता है।

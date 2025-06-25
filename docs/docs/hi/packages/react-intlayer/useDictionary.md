# React एकीकरण: `useDictionary` हुक दस्तावेज़ीकरण

यह अनुभाग React अनुप्रयोगों में `useDictionary` हुक का उपयोग करने पर विस्तृत मार्गदर्शन प्रदान करता है, जो दृश्य संपादक के बिना स्थानीयकृत सामग्री को कुशलतापूर्वक संभालने में सक्षम बनाता है।

## React में `useDictionary` आयात करना

React अनुप्रयोगों में `useDictionary` हुक को संदर्भ के आधार पर आयात करके एकीकृत किया जा सकता है:

- **क्लाइंट घटक:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

- **सर्वर घटक:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

## पैरामीटर

हुक दो पैरामीटर स्वीकार करता है:

1. **`dictionary`**: एक घोषित शब्दकोश वस्तु जिसमें विशिष्ट कुंजियों के लिए स्थानीयकृत सामग्री होती है।
2. **`locale`** (वैकल्पिक): वांछित लोकेल। यदि निर्दिष्ट नहीं किया गया है, तो यह वर्तमान संदर्भ के लोकेल पर डिफ़ॉल्ट होता है।

## शब्दकोश

सभी शब्दकोश वस्तुओं को संरचित सामग्री फ़ाइलों में घोषित किया जाना चाहिए ताकि प्रकार सुरक्षा सुनिश्चित हो सके और रनटाइम त्रुटियों को रोका जा सके। सेटअप निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) पाए जा सकते हैं। यहाँ सामग्री घोषणा का एक उदाहरण है:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      hi: "क्लाइंट घटक उदाहरण",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      hi: "यह क्लाइंट घटक उदाहरण की सामग्री है",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      hi: "क्लाइंट घटक उदाहरण",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      hi: "यह क्लाइंट घटक उदाहरण की सामग्री है",
    }),
  },
};

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      hi: "क्लाइंट घटक उदाहरण",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      hi: "यह क्लाइंट घटक उदाहरण की सामग्री है",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "hi": "क्लाइंट घटक उदाहरण"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "hi": "यह क्लाइंट घटक उदाहरण की सामग्री है"
      }
    }
  }
}
```

## React में उपयोग का उदाहरण

नीचे React घटक में `useDictionary` हुक का उपयोग करने का एक उदाहरण दिया गया है:

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

## सर्वर एकीकरण

यदि आप `IntlayerProvider` के बाहर `useDictionary` हुक का उपयोग कर रहे हैं, तो घटक को रेंडर करते समय लोकेल को स्पष्ट रूप से पैरामीटर के रूप में प्रदान करना आवश्यक है:

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

## विशेषताओं पर नोट्स

दृश्य संपादकों का उपयोग करने वाले एकीकरणों के विपरीत, `buttonTitle.value` जैसे विशेषताएँ यहाँ लागू नहीं होती हैं। इसके बजाय, अपनी सामग्री में घोषित स्थानीयकृत स्ट्रिंग्स को सीधे एक्सेस करें।

```jsx
<button title={content.title}>{content.content}</button>
```

## अतिरिक्त सुझाव

- **प्रकार सुरक्षा**: अपने शब्दकोशों को परिभाषित करने के लिए हमेशा `Dictionary` का उपयोग करें ताकि प्रकार सुरक्षा सुनिश्चित हो सके।
- **स्थानीयकरण अपडेट**: सामग्री को अपडेट करते समय, सभी लोकेल को सुसंगत रखें ताकि अनुवाद छूटने से बचा जा सके।

यह दस्तावेज़ीकरण `useDictionary` हुक के एकीकरण पर केंद्रित है, जो दृश्य संपादक कार्यक्षमताओं पर निर्भर किए बिना स्थानीयकृत सामग्री को प्रबंधित करने के लिए एक सुव्यवस्थित दृष्टिकोण प्रदान करता है।

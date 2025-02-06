# React Integration: `useDictionary` Hook Documentation

इस खंड में React अनुप्रयोगों के भीतर `useDictionary` हुक का उपयोग करने के लिए विस्तृत मार्गदर्शन दिया गया है, जो बिना दृश्य संपादक के स्थानीयकृत सामग्री को प्रभावी ढंग से संभालने में सक्षम बनाता है।

## Importing `useDictionary` in React

`useDictionary` हुक को संदर्भ के आधार पर React अनुप्रयोगों में आयात किया जा सकता है:

- **क्लाइंट घटक:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // उपयोग किया गया क्लाइंट-साइड React घटकों में
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // उपयोग किया गया क्लाइंट-साइड React घटकों में
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // उपयोग किया गया क्लाइंट-साइड React घटकों में
  ```

- **सर्वर घटक:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // उपयोग किया गया सर्वर-साइड React घटकों में
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // उपयोग किया गया सर्वर-साइड React घटकों में
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // उपयोग किया गया सर्वर-साइड React घटकों में
  ```

## Parameters

यह हुक दो पैरामीटर स्वीकार करता है:

1. **`dictionary`**: एक घोषित शब्दकोश वस्तु जिसमें विशिष्ट कुंजी के लिए स्थानीयकृत सामग्री होती है।
2. **`locale`** (वैकल्पिक): वांछित स्थानीयता। यदि निर्दिष्ट नहीं किया गया है, तो यह वर्तमान संदर्भ की स्थानीयता पर डिफ़ॉल्ट होता है।

## Content Declaration

सभी शब्दकोश वस्तुएं संरचित सामग्री फ़ाइलों में घोषित की जानी चाहिए ताकि प्रकार सुरक्षा सुनिश्चित की जा सके और रनटाइम त्रुटियों से बचा जा सके। आप सेटअप निर्देश [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) पा सकते हैं। यहाँ सामग्री घोषणा का एक उदाहरण है:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const exampleContent = {
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
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const exampleContent = {
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

export default exampleContent;
```

```javascript fileName="component.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const exampleContent = {
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

module.exports = exampleContent;
```

## Example Usage in React Client Component

यहाँ एक उदाहरण है कि `useDictionary` हुक का उपयोग एक React घटक में कैसे करें:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Example Usage in React Server Component

यदि आप `useDictionary` हुक का उपयोग `IntlayerServerProvider` के बाहर कर रहे हैं, तो घटक को रेंडर करते समय स्थानीयता को स्पष्ट रूप से एक पैरामीटर के रूप में प्रदान करना चाहिए:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Notes on Attributes

दृश्य संपादकों का उपयोग करने वाले एकीकरणों के विपरीत, `buttonTitle.value` जैसे गुण यहाँ लागू नहीं होते हैं। इसके बजाय, अपने सामग्री में घोषित स्थानीयकृत स्ट्रिंग्स को सीधे एक्सेस करें।

```jsx
<button title={content.title}>{content.content}</button>
```

## Additional Tips

- **Type Safety**: हमेशा प्रकार सुरक्षा सुनिश्चित करने के लिए अपने शब्दकोश को परिभाषित करने के लिए `DeclarationContent` का उपयोग करें।
- **Localization Updates**: जब सामग्री को अपडेट करते हैं, तो सुनिश्चित करें कि सभी स्थानीयताएँ सुसंगत हैं ताकि अनूदित संसाधनों की कमी न हो।

यह दस्तावेज़ `useDictionary` हुक के एकीकरण पर केंद्रित है, जो दृश्य संपादक कार्यक्षमताओं पर भरोसा किए बिना स्थानीयकृत सामग्री को प्रबंधित करने के लिए एक सुगम दृष्टिकोण प्रदान करता है।

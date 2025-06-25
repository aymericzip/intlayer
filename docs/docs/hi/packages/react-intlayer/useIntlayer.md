---
docName: package__react-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useIntlayer हुक दस्तावेज | react-intlayer
description: react-intlayer पैकेज के लिए useIntlayer हुक का उपयोग कैसे करें यह देखें
keywords:
  - useIntlayer
  - शब्दकोश
  - चाबी
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
---

# React एकीकरण: `useIntlayer` हुक प्रलेखन

यह अनुभाग React अनुप्रयोगों में `useIntlayer` हुक का उपयोग करने के लिए विस्तृत मार्गदर्शन प्रदान करता है, जो सामग्री स्थानीयकरण को कुशल बनाता है।

## React में `useIntlayer` आयात करना

`useIntlayer` हुक को संदर्भ के आधार पर आयात करके React अनुप्रयोगों में एकीकृत किया जा सकता है:

- **क्लाइंट घटक:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

- **सर्वर घटक:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

## पैरामीटर

हुक दो पैरामीटर स्वीकार करता है:

1. **`key`**: स्थानीयकृत सामग्री प्राप्त करने के लिए शब्दकोश कुंजी।
2. **`locale`** (वैकल्पिक): इच्छित लोकेल। यदि निर्दिष्ट नहीं किया गया है, तो संदर्भ के लोकेल का उपयोग डिफ़ॉल्ट रूप से किया जाएगा।

## शब्दकोश

सभी शब्दकोश कुंजियों को सामग्री घोषणा फ़ाइलों के भीतर घोषित किया जाना चाहिए ताकि प्रकार सुरक्षा बढ़ सके और त्रुटियों से बचा जा सके। सेटअप निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

## React में उपयोग का उदाहरण

React घटक के भीतर `useIntlayer` हुक का प्रदर्शन:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## गुणों को संभालना

गुणों को स्थानीयकृत करते समय, सामग्री मानों तक उचित तरीके से पहुँचें:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## अतिरिक्त संसाधन

- **Intlayer विज़ुअल एडिटर**: अधिक सहज सामग्री प्रबंधन अनुभव के लिए, विज़ुअल एडिटर प्रलेखन [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

यह अनुभाग विशेष रूप से React अनुप्रयोगों में `useIntlayer` हुक के एकीकरण को लक्षित करता है, स्थानीयकरण प्रक्रिया को सरल बनाता है और विभिन्न लोकेल्स में सामग्री स्थिरता सुनिश्चित करता है।

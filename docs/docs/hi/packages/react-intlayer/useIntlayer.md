---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer हुक दस्तावेज़ | react-intlayer
description: react-intlayer पैकेज के लिए useIntlayer हुक का उपयोग कैसे करें देखें
keywords:
  - useIntlayer
  - शब्दकोश
  - कुंजी
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - जावास्क्रिप्ट
  - रिएक्ट
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
---

# रिएक्ट एकीकरण: `useIntlayer` हुक दस्तावेज़ीकरण

यह अनुभाग React अनुप्रयोगों के भीतर `useIntlayer` हुक का उपयोग करने के लिए विस्तृत मार्गदर्शन प्रदान करता है, जो कुशल सामग्री स्थानीयकरण की अनुमति देता है।

## React में `useIntlayer` को इम्पोर्ट करना

`useIntlayer` हुक को संदर्भ के आधार पर React अनुप्रयोगों में आयात करके एकीकृत किया जा सकता है:

- **क्लाइंट कंपोनेंट:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

- **सर्वर कंपोनेंट:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

## पैरामीटर

यह हुक दो पैरामीटर स्वीकार करता है:

1. **`key`**: स्थानीयकृत सामग्री प्राप्त करने के लिए शब्दकोश कुंजी।
2. **`locale`** (वैकल्पिक): इच्छित लोकल। यदि निर्दिष्ट नहीं किया गया है, तो यह संदर्भ के लोकल पर डिफ़ॉल्ट होता है।

## शब्दकोश

सभी शब्दकोश कुंजियाँ सामग्री घोषणा फ़ाइलों में घोषित होनी चाहिए ताकि टाइप सुरक्षा बढ़े और त्रुटियों से बचा जा सके। आप [सेटअप निर्देश यहाँ पा सकते हैं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)।

## React में उदाहरण उपयोग

React कंपोनेंट के भीतर `useIntlayer` हुक का प्रदर्शन:

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
jsx fileName="src/app.csx" codeFormat="commonjs"
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

जब गुणों का स्थानीयकरण करें, तो सामग्री के मानों तक उचित रूप से पहुँचें:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## अतिरिक्त संसाधन

- **Intlayer विज़ुअल एडिटर**: एक अधिक सहज सामग्री प्रबंधन अनुभव के लिए, विज़ुअल एडिटर प्रलेखन को [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

यह अनुभाग विशेष रूप से React अनुप्रयोगों में `useIntlayer` हुक के एकीकरण को लक्षित करता है, स्थानीयकरण प्रक्रिया को सरल बनाता है और विभिन्न स्थानीय भाषाओं में सामग्री की संगति सुनिश्चित करता है।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

# React Integration: `useIntlayer` Hook Documentation

यह अनुभाग React अनुप्रयोगों में `useIntlayer` हुक का उपयोग करने पर विस्तृत मार्गदर्शन प्रदान करता है, जिससे सामग्री स्थानीयकरण में कुशलता होती है।

## Importing `useIntlayer` in React

`useIntlayer` हुक को React अनुप्रयोगों में संदर्भ के आधार पर आयात करके एकीकृत किया जा सकता है:

- **Client Component:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

- **Server Component:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

## Parameters

इस हुक में दो पैरामीटर होते हैं:

1. **`key`**: स्थानीयकृत सामग्री को पुनः प्राप्त करने के लिए डिक्शनरी कुंजी।
2. **`locale`** (वैकल्पिक): वांछित स्थानीय। यदि निर्दिष्ट नहीं किया गया है तो संदर्भ के स्थानीय पर डिफ़ॉल्ट होता है।

## Dictionary

सभी डिक्शनरी कुंजी को सामग्री घोषणा फ़ाइलों के भीतर घोषित किया जाना चाहिए ताकि प्रकार सुरक्षा को बढ़ाया जा सके और त्रुटियों से बचा जा सके। आप सेटअप निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) प्राप्त कर सकते हैं।

## Example Usage in React

React घटक के भीतर `useIntlayer` हुक का प्रदर्शन करते हुए:

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

## Handling Attributes

जब गुणों का स्थानीयकरण करते हैं, सामग्री मूल्यों तक उचित तरीके से पहुँचें:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Additional Resources

- **Intlayer Visual Editor**: एक अधिक सहज सामग्री प्रबंधन अनुभव के लिए, दृश्य संपादक दस्तावेज़ [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) देखें।

यह अनुभाग विशेष रूप से React अनुप्रयोगों में `useIntlayer` हुक के एकीकरण पर केंद्रित है, स्थानीयकरण प्रक्रिया को सरल बनाते हुए और विभिन्न स्थानीयताओं के बीच सामग्री की स्थिरता सुनिश्चित करता है।

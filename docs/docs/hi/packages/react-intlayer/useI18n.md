---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useI18n हुक दस्तावेज़ | react-intlayer
description: react-intlayer पैकेज में useI18n हुक का उपयोग कैसे करें, जानें
keywords:
  - useI18n
  - i18n
  - अनुवाद
  - शब्दकोश
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
---

# React एकीकरण: `useI18n` हुक दस्तावेज़

यह अनुभाग React अनुप्रयोगों के भीतर `useI18n` हुक का उपयोग कैसे करें, इस पर विस्तृत मार्गदर्शन प्रदान करता है, जिससे कुशल सामग्री स्थानीयकरण सक्षम होता है।

## React में `useI18n` आयात करना

`useI18n` हुक को संदर्भ के अनुसार React अनुप्रयोगों में निम्नलिखित तरीके से आयात और एकीकृत किया जा सकता है:

- **क्लाइंट कंपोनेंट्स:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // क्लाइंट-साइड React कंपोनेंट्स में उपयोग करें
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // क्लाइंट-साइड React कंपोनेंट्स में उपयोग करें
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // क्लाइंट-साइड React कंपोनेंट्स में उपयोग करें
  ```

- **सर्वर कंपोनेंट्स:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // सर्वर-साइड React कंपोनेंट्स में उपयोग करें
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // सर्वर-साइड React कंपोनेंट्स में उपयोग करें
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // सर्वर-साइड React कंपोनेंट्स में उपयोग करें
  ```

## पैरामीटर

यह हुक दो पैरामीटर स्वीकार करता है:

1. **`namespace`**: अनुवाद कुंजियों के स्कोप के लिए एक शब्दकोश नामस्थान।
2. **`locale`** (वैकल्पिक): इच्छित लोकल। यदि निर्दिष्ट नहीं किया गया है, तो संदर्भ का लोकल डिफ़ॉल्ट के रूप में उपयोग किया जाएगा।

## शब्दकोश

सभी शब्दकोश कुंजियाँ सामग्री घोषणा फ़ाइलों के भीतर घोषित की जानी चाहिए ताकि प्रकार सुरक्षा बढ़े और त्रुटियों से बचा जा सके। [कॉन्फ़िगरेशन निर्देश यहाँ पाए जा सकते हैं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)।

## React में उपयोग के उदाहरण

React कंपोनेंट्स के भीतर `useI18n` हुक का उपयोग करने के उदाहरण:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
         <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* शीर्षक दिखाएं */}
      <p>{t("description")}</p> {/* विवरण दिखाएं */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* शीर्षक दिखाएं */}
      <p>{t("description")}</p> {/* विवरण दिखाएं */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* शीर्षक दिखाएं */}
      <p>{t("description")}</p> {/* विवरण दिखाएं */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* शीर्षक दिखाएं */}
      <p>{t("description")}</p> {/* विवरण दिखाएं */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* शीर्षक दिखाएं */}
      <p>{t("description")}</p> {/* विवरण दिखाएं */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## एट्रिब्यूट हैंडलिंग

जब एट्रिब्यूट्स का स्थानीयकरण किया जाता है, तो अनुवाद मानों तक उचित रूप से पहुँचें:

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>;

{
  /* पहुँच योग्यता एट्रिब्यूट्स (जैसे, aria-label) के लिए, .value का उपयोग करें क्योंकि शुद्ध स्ट्रिंग्स आवश्यक हैं */
}
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>;
```

## अतिरिक्त संसाधन

- **Intlayer विज़ुअल एडिटर**: एक अधिक सहज सामग्री प्रबंधन अनुभव के लिए, विज़ुअल एडिटर दस्तावेज़ीकरण [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

यह अनुभाग विशेष रूप से React अनुप्रयोगों में `useI18n` हुक के एकीकरण को कवर करता है, जो स्थानीयकरण प्रक्रिया को सरल बनाता है और विभिन्न स्थानीयताओं में सामग्री की संगति सुनिश्चित करता है।

## प्रलेखन इतिहास

- 6.0.0 - 2025-06-29: `useI18n` हुक प्रलेखन की प्रारंभिक लेखन

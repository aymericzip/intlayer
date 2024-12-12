# React Integration: `useIntlayer` हुक डॉक्यूमेंटेशन

यह अनुभाग React अनुप्रयोगों के भीतर `useIntlayer` हुक के उपयोग पर विस्तृत मार्गदर्शन प्रदान करता है, जिससे सामग्री स्थानीयकरण में कुशलता और सुविधा मिलती है।

## React में `useIntlayer` का आयात करना

`useIntlayer` हुक को संदर्भ के आधार पर React अनुप्रयोगों में समाहित किया जा सकता है:

- **क्लाइंट घटक:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // क्लाइंट-साइड React घटकों में उपयोग किया जाता है
  ```

- **सर्वर घटक:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // सर्वर-साइड React घटकों में उपयोग किया जाता है
  ```

## पैरामीटर

हुक दो पैरामीटर स्वीकार करता है:

1. **`key`**: स्थानीयकृत सामग्री प्राप्त करने के लिए शब्दकोश की कुंजी।
2. **`locale`** (वैकल्पिक): इच्छित स्थानीयता। निर्दिष्ट न होने पर संदर्भ की स्थानीयता पर डिफ़ॉल्ट करता है।

## सामग्री की घोषणा

सभी शब्दकोश की कुंजियों को प्रकार सुरक्षा बढ़ाने और त्रुटियों से बचने के लिए सामग्री घोषणा फ़ाइलों में घोषित किया जाना चाहिए। आप सेटअप निर्देश [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) पा सकते हैं।

## React में उदाहरण उपयोग

एक React घटक के भीतर `useIntlayer` हुक का प्रदर्शन:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

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

## विशेषताओं को संभालना

विशेषताओं को स्थानीयकरण करते समय, सामग्री मानों को सही ढंग से एक्सेस करें:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## अतिरिक्त संसाधन

- **Intlayer विज़ुअल संपादक**: अधिक सहज सामग्री प्रबंधन अनुभव के लिए, विज़ुअल संपादक दस्तावेज़ीकरण [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) देखें।

यह अनुभाग विशेष रूप से React अनुप्रयोगों में `useIntlayer` हुक के एकीकरण को लक्षित करता है, स्थानीयकरण प्रक्रिया को सरल बनाता है और विभिन्न स्थानीयताओं में सामग्री की निरंतरता सुनिश्चित करता है।

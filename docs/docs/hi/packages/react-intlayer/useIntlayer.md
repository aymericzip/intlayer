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
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# रिएक्ट एकीकरण: `useIntlayer` हुक दस्तावेज़ीकरण

यह अनुभाग React अनुप्रयोगों के भीतर `useIntlayer` हुक का उपयोग करने के लिए विस्तृत मार्गदर्शन प्रदान करता है, जो कुशल सामग्री स्थानीयकरण की अनुमति देता है।

## React में उदाहरण उपयोग

React कंपोनेंट के भीतर `useIntlayer` हुक का प्रदर्शन:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

## अतिरिक्त संसाधन

- **Intlayer विज़ुअल एडिटर**: एक अधिक सहज सामग्री प्रबंधन अनुभव के लिए, विज़ुअल एडिटर प्रलेखन को [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

यह अनुभाग विशेष रूप से React अनुप्रयोगों में `useIntlayer` हुक के एकीकरण को लक्षित करता है, स्थानीयकरण प्रक्रिया को सरल बनाता है और विभिन्न स्थानीय भाषाओं में सामग्री की संगति सुनिश्चित करता है।

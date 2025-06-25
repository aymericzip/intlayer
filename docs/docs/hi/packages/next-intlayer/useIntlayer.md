---
docName: package__next-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useIntlayer हुक दस्तावेज़ | next-intlayer
description: next-intlayer पैकेज के लिए useIntlayer हुक का उपयोग कैसे करें, यह देखें
keywords:
  - useIntlayer
  - शब्दकोश
  - कुंजी
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
---

# Next.js एकीकरण: `useIntlayer` हुक दस्तावेज़ीकरण

`useIntlayer` हुक Next.js अनुप्रयोगों के लिए डिज़ाइन किया गया है ताकि स्थानीयकृत सामग्री को प्रभावी ढंग से प्राप्त और प्रबंधित किया जा सके। यह दस्तावेज़ीकरण Next.js परियोजनाओं में हुक का उपयोग करने पर ध्यान केंद्रित करेगा, यह सुनिश्चित करते हुए कि उचित स्थानीयकरण प्रथाओं का पालन किया जाए।

## Next.js में `useIntlayer` आयात करना

यह इस बात पर निर्भर करता है कि आप Next.js अनुप्रयोग में क्लाइंट-साइड या सर्वर-साइड घटकों पर काम कर रहे हैं, आप `useIntlayer` हुक को निम्नानुसार आयात कर सकते हैं:

- **क्लाइंट घटक:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // क्लाइंट-साइड घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // क्लाइंट-साइड घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // क्लाइंट-साइड घटकों में उपयोग किया जाता है
  ```

- **सर्वर घटक:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // सर्वर-साइड घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // सर्वर-साइड घटकों में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // सर्वर-साइड घटकों में उपयोग किया जाता है
  ```

## पैरामीटर

1. **`key`**: उस शब्दकोश कुंजी के लिए एक स्ट्रिंग पहचानकर्ता जिससे आप सामग्री प्राप्त करना चाहते हैं।
2. **`locale`** (वैकल्पिक): उपयोग करने के लिए एक विशिष्ट लोकेल। यदि छोड़ा गया है, तो हुक क्लाइंट या सर्वर संदर्भ में सेट लोकेल को डिफ़ॉल्ट करता है।

## शब्दकोश फ़ाइलें

यह महत्वपूर्ण है कि सभी सामग्री कुंजियाँ सामग्री घोषणा फ़ाइलों के भीतर परिभाषित हों ताकि रनटाइम त्रुटियों को रोका जा सके और प्रकार सुरक्षा सुनिश्चित की जा सके। यह दृष्टिकोण टाइपस्क्रिप्ट एकीकरण को संकलन-समय मान्यता के लिए भी सक्षम बनाता है।

सामग्री घोषणा फ़ाइलों को सेट करने के निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) उपलब्ध हैं।

## Next.js में उपयोग का उदाहरण

यहाँ बताया गया है कि आप `useIntlayer` हुक को Next.js पृष्ठ के भीतर कैसे लागू कर सकते हैं ताकि अनुप्रयोग के वर्तमान लोकेल के आधार पर स्थानीयकृत सामग्री को गतिशील रूप से लोड किया जा सके:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## विशेषता स्थानीयकरण को संभालना

`alt`, `title`, `href`, `aria-label`, आदि जैसे विशेषताओं को स्थानीयकृत करने के लिए, सुनिश्चित करें कि आप सामग्री को सही ढंग से संदर्भित कर रहे हैं:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## अधिक जानकारी

- **Intlayer विज़ुअल संपादक**: आसान सामग्री प्रबंधन के लिए विज़ुअल संपादक का उपयोग कैसे करें [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) जानें।

यह दस्तावेज़ीकरण विशेष रूप से Next.js वातावरण के भीतर `useIntlayer` हुक के उपयोग को रेखांकित करता है, जो आपके Next.js अनुप्रयोगों में स्थानीयकरण प्रबंधन के लिए एक मजबूत समाधान प्रदान करता है।

# Next.js Integration: `useIntlayer` Hook Documentation

The `useIntlayer` hook को Next.js एप्लिकेशन के लिए स्थानीयकृत सामग्री को प्रभावी ढंग से लाने और प्रबंधित करने के लिए तैयार किया गया है। यह दस्तावेज़ दिखाएगा कि Next.js परियोजनाओं के भीतर इस हुक का उपयोग कैसे करें, सुनिश्चित करते हुए कि उचित स्थानीयकरण प्रथाओं का पालन किया जाए।

## Importing `useIntlayer` in Next.js

चाहे आप Next.js एप्लिकेशन में क्लाइंट-साइड या सर्वर-साइड घटकों पर काम कर रहे हों, आप `useIntlayer` हुक को निम्न तरीके से आयात कर सकते हैं:

- **क्लाइंट कंपोनेंट:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // क्लाइंट-साइड घटकों में उपयोग किया गया
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // क्लाइंट-साइड घटकों में उपयोग किया गया
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // क्लाइंट-साइड घटकों में उपयोग किया गया
  ```

- **सर्वर कंपोनेंट:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // सर्वर-साइड घटकों में उपयोग किया गया
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // सर्वर-साइड घटकों में उपयोग किया गया
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // सर्वर-साइड घटकों में उपयोग किया गया
  ```

## Parameters

1. **`key`**: एक स्ट्रिंग पहचानकर्ता जो शब्दकोश की कुंजी के लिए है जिससे आप सामग्री को प्राप्त करना चाहते हैं।
2. **`locale`** (वैकल्पिक): उपयोग के लिए एक विशिष्ट स्थानीयकरण। यदि छोड़ा गया, तो हुक उस स्थानीयकरण का डिफॉल्ट सेट कर देता है जो क्लाइंट या सर्वर संदर्भ में सेट है।

## सामग्री घोषणा फ़ाइलें

यह सुनिश्चित करना महत्वपूर्ण है कि सभी सामग्री कुंजियाँ सामग्री घोषणा फ़ाइलों के भीतर परिभाषित हैं ताकि रUNTIME त्रुटियों से बचा जा सके और प्रकार की सुरक्षा सुनिश्चित की जा सके। यह दृष्टिकोण संकलन समय की_validation के लिए TypeScript एकीकरण की भी सुविधा देता है।

सामग्री घोषणा फ़ाइलों को सेट करने के लिए निर्देश [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) उपलब्ध हैं।

## Next.js में उदाहरण उपयोग

यहां बताया गया है कि आप Next.js पृष्ठ के भीतर `useIntlayer` हुक को कैसे लागू कर सकते हैं ताकि एप्लिकेशन के वर्तमान स्थानीयकरण के आधार पर स्थानीयकृत सामग्री को गतिशील रूप से लोड किया जा सके:

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

## Handling Attribute Localization

ऐसे गुणों को स्थानीयकृत करने के लिए जैसे `alt`, `title`, `href`, `aria-label` आदि, सुनिश्चित करें कि आप सामग्री का सही संदर्भ लें:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Further Information

- **Intlayer Visual Editor**: विज़ुअल संपादक का उपयोग कैसे करें इसके लिए आसान सामग्री प्रबंधन [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) जानें।

यह दस्तावेज़ विशेष रूप से Next.js वातावरण के भीतर `useIntlayer` हुक के उपयोग का वर्णन करता है, जो आपके Next.js एप्लिकेशनों में स्थानीयकरण प्रबंधन के लिए एक मजबूत समाधान प्रदान करता है।

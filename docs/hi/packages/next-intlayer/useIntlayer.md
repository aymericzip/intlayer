# Next.js Integration: `useIntlayer` Hook Documentation

`useIntlayer` हुक Next.js अनुप्रयोगों के लिए स्थानीयकृत सामग्री को कुशलतापूर्वक प्राप्त और प्रबंधित करने के लिए तैयार किया गया है। यह दस्तावेज़ Next.js परियोजनाओं में हुक का उपयोग कैसे करना है, इस पर ध्यान केंद्रित करेगा, उचित स्थानीयकरण प्रथाओं को सुनिश्चित करेगा।

## Next.js में `useIntlayer` को आयात करना

आप Next.js अनुप्रयोग में क्लाइंट-साइड या सर्वर-साइड घटकों पर काम कर रहे हैं, इस पर निर्भर करते हुए, आप निम्नलिखित के रूप में `useIntlayer` हुक को आयात कर सकते हैं:

- **क्लाइंट घटक:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // 클라이언트 측 구성 요소 में 사용됨
  ```

- **सर्वर घटक:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // 서버 측 घटकों में उपयोग किया जाता है
  ```

## पैरामीटर

1. **`key`**: एक स्ट्रिंग पहचानकर्ता जिसे आप सामग्री प्राप्त करने के लिए शब्दकोश कुंजी से संबंधित करना चाहते हैं।
2. **`locale`** (वैकल्पिक): उपयोग करने के लिए एक विशिष्ट भाषा। यदि छोड़ा गया, तो हुक क्लाइंट या सर्वर संदर्भ में सेट की गई स्थानीयकरण को डिफ़ॉल्ट के रूप में उपयोग करता है।

## सामग्री घोषणा फ़ाइलें

यह महत्वपूर्ण है कि सभी सामग्री कुंजियों को सामग्री घोषणा फ़ाइलों के भीतर परिभाषित किया जाए ताकि रनटाइम त्रुटियों को रोका जा सके और प्रकार की सुरक्षा सुनिश्चित हो सके। यह दृष्टिकोण टाइपस्क्रिप्ट एकीकरण के लिए संकलन समय सत्यापन की सुविधा भी प्रदान करता है।

सामग्री घोषणा फ़ाइलें स्थापित करने के लिए निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) उपलब्ध हैं।

## Next.js में उदाहरण उपयोग

यहाँ एक Next.js पृष्ठ के भीतर `useIntlayer` हुक को कैसे लागू किया जा सकता है, यह स्थानीयकरण को स्वचालित रूप से लोड करने के लिए एप्लिकेशन की वर्तमान स्थानीयकरण के आधार पर है:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  return (
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

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

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

import { useIntlayer } from "next-intlayer/server";

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

## विशेषता स्थानीयकरण को संभालना

ऐसे विशेषताओं को स्थानीय बनाने के लिए जैसे `alt`, `title`, `href`, `aria-label`, आदि, सुनिश्चित करें कि आप सामग्री को सही तरीके से संदर्भित कर रहे हैं:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## आगे की जानकारी

- **Intlayer दृश्य संपादक**: सामग्री प्रबंधन के लिए दृश्य संपादक का उपयोग कैसे करें [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) सीखें।

यह दस्तावेज़ विशेष रूप से Next.js वातावरण में `useIntlayer` हुक के उपयोग को रेखांकित करता है, आपके Next.js अनुप्रयोगों में स्थानीयकरण को प्रबंधित करने के लिए एक मजबूत समाधान प्रदान करता है।

# Next.js अंतर्राष्ट्रीयकरण (i18n) next-i18next और Intlayer के साथ

next-i18next और Intlayer दोनों ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) ढांचे हैं जो Next.js अनुप्रयोगों के लिए डिज़ाइन किए गए हैं। उनका उपयोग सॉफ़्टवेयर परियोजनाओं में अनुवाद, स्थानीयकरण और भाषा स्विचिंग के प्रबंधन के लिए किया जाता है।

दोनों समाधानों में तीन मुख्य अवधारणाएँ शामिल हैं:

1. **सामग्री घोषणा**: आपके अनुप्रयोग की अनुवाद योग्य सामग्री को परिभाषित करने की विधि।

   - `i18next` के मामले में `resource` के नाम से जाना जाता है, सामग्री घोषणा एक संरचित JSON ऑब्जेक्ट है जिसमें एक या अधिक भाषाओं में अनुवाद के लिए कुंजी-मूल्य जोड़ होते हैं। अधिक जानकारी के लिए [i18next डॉक्यूमेंटेशन](https://www.i18next.com/translation-function/essentials) देखें।
   - `Intlayer` के मामले में `content declaration file` के नाम से जाना जाता है, सामग्री घोषणा एक JSON, JS, या TS फ़ाइल हो सकती है जो संरचित डेटा को निर्यात करती है। अधिक जानकारी के लिए [Intlayer डॉक्यूमेंटेशन](https://intlayer.org/fr/doc/concept/content) देखें।

2. **उपकरण**: अनुप्रयोग में सामग्री घोषणाओं को बनाने और व्याख्या करने के लिए उपकरण, जैसे `getI18n()`, `useCurrentLocale()`, या `useChangeLocale()` next-i18next के लिए, और `useIntlayer()` या `useLocale()` Intlayer के लिए।

3. **प्लगइन्स और मिडलवेयर**: URL रिडायरेक्शन, बंडल ऑप्टिमाइजेशन, और अधिक के प्रबंधन के लिए सुविधाएँ, जैसे next-i18next के लिए `next-i18next/middleware` या Intlayer के लिए `intlayerMiddleware`।

## Intlayer बनाम i18next: महत्वपूर्ण मतभेद

i18next और Intlayer के बीच मतभेदों का पता लगाने के लिए हमारे [next-i18next बनाम next-intl बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/hi/i18next_vs_next-intl_vs_intlayer.md) के ब्लॉग पोस्ट पर जाएँ।

## Intlayer के साथ next-i18next शब्दकोश कैसे उत्पन्न करें

### Intlayer को next-i18next के साथ उपयोग करने का कारण?

Intlayer सामग्री घोषणा फ़ाइलें आमतौर पर बेहतर डेवलपर अनुभव प्रदान करती हैं। वे दो मुख्य लाभों के कारण अधिक लचीली और प्रबंधन योग्य हैं:

1. **लचीला स्थान**: एक Intlayer सामग्री घोषणा फ़ाइल अनुप्रयोग की फ़ाइल वृक्ष में कहीं भी रखी जा सकती है, जिससे अप्रयुक्त सामग्री घोषणाओं को छोड़े बिना दोहराए गए या हटाए गए घटकों का प्रबंधन सरल हो जाता है।

   उदाहरण फ़ाइल संरचनाएँ:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # सामग्री घोषणा फ़ाइल
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # सामग्री घोषणा फ़ाइल
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # सामग्री घोषणा फ़ाइल
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # सामग्री घोषणा फ़ाइल
               └── index.jsx
   ```

2. **केंद्रीकृत अनुवाद**: Intlayer सभी अनुवादों को एकल फ़ाइल में संग्रहीत करता है, यह सुनिश्चित करता है कि कोई अनुवाद गायब नहीं है। जब TypeScript का उपयोग किया जाता है, तो गायब अनुवादों का स्वचालित रूप से पता लगाया जाता है और उन्हें त्रुटियों के रूप में रिपोर्ट किया जाता है।

### स्थापना

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Intlayer को i18next शब्दकोश निर्यात करने के लिए कॉन्फ़िगर करना

> i18next संसाधनों का निर्यात अन्य ढांचों के साथ 1:1 संगतता सुनिश्चित नहीं करता है। समस्याओं को कम करने के लिए Intlayer-आधारित कॉन्फ़िगरेशन से चिपके रहना अनुशंसित है।

i18next संसाधनों को निर्यात करने के लिए, एक `intlayer.config.ts` फ़ाइल में Intlayer को कॉन्फ़िगर करें। उदाहरण कॉन्फ़िगरेशन:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

यहाँ आपके दस्तावेज़ के शेष भागों का निरंतरता और सुधार है:

---

### आपके i18next कॉन्फ़िगरेशन में शब्दकोशों को आयात करना

उत्पन्न संसाधनों को आपके i18next कॉन्फ़िगरेशन में आयात करने के लिए, `i18next-resources-to-backend` का उपयोग करें। नीचे उदाहरण दिए गए हैं:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### सामग्री घोषणा

विभिन्न प्रारूपों में सामग्री घोषणा फ़ाइलों के उदाहरण:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### next-i18next संसाधनों का निर्माण

next-i18next संसाधनों का निर्माण करने के लिए, निम्नलिखित कमांड चलाएँ:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

यह `./i18next/resources` निर्देशिका में संसाधन उत्पन्न करेगा। अपेक्षित आउटपुट:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

नोट: i18next namespace Intlayer घोषणा कुंजी के अनुरूप है।

### Next.js प्लगइन का कार्यान्वयन

एक बार कॉन्फ़िगर हो जाने के बाद, जब भी Intlayer सामग्री घोषणा फ़ाइलें अपडेट होती हैं, तब आपके i18next संसाधनों को फिर से बनाने के लिए Next.js प्लगइन को लागू करें।

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Next.js घटकों में सामग्री का उपयोग करना

Next.js प्लगइन को लागू करने के बाद, आप अपने घटकों में सामग्री का उपयोग कर सकते हैं:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
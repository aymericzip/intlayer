---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer और react-i18next
description: React एप्लिकेशन के लिए react-i18next के साथ Intlayer की तुलना करें
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-i18next
---

# React Internationalization (i18n) with react-i18next and Intlayer

## Overview

- **Intlayer** आपको **component-level** सामग्री घोषणा फ़ाइलों के माध्यम से अनुवाद प्रबंधित करने में सहायता करता है।
- **react-i18next** एक लोकप्रिय React एकीकरण है जो **i18next** के लिए `useTranslation` जैसे हुक प्रदान करता है ताकि आपके घटकों में स्थानीयकृत स्ट्रिंग्स प्राप्त की जा सकें।

जब इनका संयोजन किया जाता है, Intlayer **i18next-संगत JSON** में शब्दकोशों को **निर्यात** कर सकता है ताकि react-i18next उन्हें रन-टाइम पर **उपयोग** कर सके।

## Why Use Intlayer with react-i18next?

**Intlayer** सामग्री घोषणा फ़ाइलें बेहतर डेवलपर अनुभव प्रदान करती हैं क्योंकि वे:

1. **फाइल प्लेसमेंट में लचीली**  
   प्रत्येक सामग्री घोषणा फ़ाइल को उस घटक के पास रखें जिसे इसकी आवश्यकता है। यह संरचना आपको अनुवादों को सह-स्थान पर रखने की अनुमति देती है, जब घटक स्थानांतरित होते हैं या हटा दिए जाते हैं।

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

2. **केंद्रित अनुवाद**  
   एकल सामग्री घोषणा फ़ाइल किसी घटक के लिए सभी आवश्यक अनुवादों को एकत्रित करती है, जिससे गायब अनुवादों को पकड़ना आसान हो जाता है।  
   TypeScript के साथ, यदि अनुवाद गायब हैं तो आपको संकलन-समय की त्रुटियाँ भी मिलती हैं।

## Installation

एक Create React App प्रोजेक्ट में, इन निर्भरता को स्थापित करें:

```bash
# npm के साथ
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# yarn के साथ
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# pnpm के साथ
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### ये पैकेज क्या हैं?

- **intlayer** – i18n कॉन्फ़िगरेशन, सामग्री विवरण, और शब्दकोश आउटपुट बनाने के लिए CLI और कोर पुस्तकालय।
- **react-intlayer** – Intlayer के लिए React-विशिष्ट एकीकरण, विशेष रूप से शब्दकोशों के निर्माण को स्वचालित करने के लिए कुछ स्क्रिप्ट प्रदान करना।
- **react-i18next** – i18next के लिए React-विशिष्ट एकीकरण लाइब्रेरी, जिसमें `useTranslation` हुक शामिल है।
- **i18next** – अनुवाद प्रबंधन के लिए मौलिक ढांचा।
- **i18next-resources-to-backend** – एक i18next बैकएंड जो JSON संसाधनों को डायनेमिक रूप से आयात करता है।

## Configuring Intlayer to Export i18next Dictionaries

अपने प्रोजेक्ट की जड़ में `intlayer.config.ts` बनाएं (या अपडेट करें):

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // अपनी इच्छा से जितने चाहें स्थानीयताएँ जोड़ें
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Intlayer को i18next-संगत JSON बनाने के लिए बताएं
    dictionaryOutput: ["i18next"],

    // उत्पन्न संसाधनों के लिए एक आउटपुट डायरेक्टरी चुनें
    // यह फ़ोल्डर अगर अभी तक मौजूद नहीं है तो बनाया जाएगा।
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **नोट**: यदि आप TypeScript का उपयोग नहीं कर रहे हैं, तो आप इस कॉन्फ़िग फ़ाइल को `.cjs`, `.mjs`, या `.js` के रूप में बना सकते हैं (और विस्तार से जानने के लिए [Intlayer docs](https://intlayer.org/hi/doc/concept/configuration) देखें)।

## Building the i18next Resources

एक बार आपकी सामग्री घोषणाएँ जगह में होने के बाद (अगली अनुभाग), **Intlayer निर्माण कमांड** चलाएँ:

```bash
# npm के साथ
npx run intlayer build
```

```bash
# yarn के साथ
yarn intlayer build
```

```bash
# pnpm के साथ
pnpm intlayer build
```

> इसका मतलब है कि आपकी i18next संसाधनों का उत्पादन `./i18next/resources` डायरेक्टरी के अंदर होगा।

एक सामान्य आउटपुट इस तरह दिखाई दे सकता है:

```bash
.
└── i18next
    └── resources
       ├── hi
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

जहाँ प्रत्येक **Intlayer** घोषणा कुंजी का उपयोग एक **i18next नेमस्पेस** के रूप में किया जाता है (जैसे, `my-content.json`)।

## Importing Dictionaries into Your react-i18next Configuration

इन संसाधनों को रन-टाइम पर डायनेमिक रूप से लोड करने के लिए, [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend) का उपयोग करें। उदाहरण के लिए, अपने प्रोजेक्ट में एक `i18n.ts` (या `.js`) फ़ाइल बनाएं:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // react-i18next प्लगइन
  .use(initReactI18next)
  // डायनेमिक रूप से संसाधनों को लोड करें
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // अपने संसाधनों की डायरेक्टरी के लिए आयात पथ समायोजित करें
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // i18next प्रारंभ करें
  .init({
    // बैकअप स्थानीयता
    fallbackLng: "hi",

    // आप यहाँ अन्य i18next कॉन्फ़िग विकल्प जोड़ सकते हैं, देखें:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "hi",
  });

export default i18next;
```

फिर, अपने **root** या **index** फ़ाइल (जैसे, `src/index.tsx`) में इस `i18n` सेटअप को **App** को रेंडर करने से **पहले** आयात करें:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// कुछ और करने से पहले i18n को प्रारंभ करें
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Creating and Managing Your Dictionarys

Intlayer सामग्री घोषणाओं को `./src` के तहत कहीं से भी निकालता है (डिफ़ॉल्ट रूप से)।  
यहाँ TypeScript में एक न्यूनतम उदाहरण है:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" आपके i18next नेमस्पेस होगा (जैसे, "my-component")
  key: "my-component",
  content: {
    // प्रत्येक "t" कॉल एक अलग अनुवाद नोड है
    heading: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

यदि आप JSON, `.cjs`, या `.mjs` पसंद करते हैं, तो [Intlayer docs](https://intlayer.org/hi/doc/concept/content) देखें।

> डिफ़ॉल्ट रूप से, मान्य सामग्री घोषणाएँ फ़ाइल एक्सटेंशन पैटर्न से मेल खाती हैं:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## Using the Translations in React Components

एक बार जब आपने अपने Intlayer संसाधनों को **बना लिया** और react-i18next को कॉन्फ़िगर कर लिया, तो आप सीधे **react-i18next** के `useTranslation` हुक का उपयोग कर सकते हैं।  
उदाहरण के लिए:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * i18next "namespace" Intlayer की `key` है "MyComponent.content.ts" से
 * इसलिए हम useTranslation() को "my-component" पास करेंगे।
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> ध्यान दें कि `t` फ़ंक्शन आपके उत्पन्न JSON के अंदर **कीज़** को संदर्भित करता है। एक Intlayer सामग्री प्रविष्टि जिसका नाम `heading` है, आप `t("heading")` का उपयोग करेंगे।

## Optional: Integrate with Create React App Scripts (CRACO)

**react-intlayer** एक CRACO-आधारित दृष्टिकोण प्रदान करता है कस्टम बिल्ड और विकास सर्वर कॉन्फ़िगरेशन के लिए। यदि आप Intlayer के निर्माण चरण को निर्बाध रूप से एकीकृत करना चाहते हैं, तो आप:

1. **react-intlayer स्थापित करें** (यदि आपने नहीं किया है):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **अपने `package.json` स्क्रिप्ट्स** को `react-intlayer` स्क्रिप्ट्स का उपयोग करने के लिए समायोजित करें:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > `react-intlayer` स्क्रिप्ट्स [CRACO](https://craco.js.org/) पर आधारित हैं। आप intlayer craco प्लगइन के आधार पर अपनी सेटअप को भी कार्यान्वित कर सकते हैं। [देखें उदाहरण यहाँ](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)।

अब, `npm run build`, `yarn build`, या `pnpm build` चलाना Intlayer और CRA बिल्ड को ट्रिगर करता है।

## TypeScript Configuration

**Intlayer** आपके सामग्री के लिए **स्वचालित रूप से उत्पन्न टाइप परिभाषाएँ** प्रदान करता है। यह सुनिश्चित करने के लिए कि TypeScript उन्हें उठाता है, **`types`** (या यदि आपने अलग तरीके से कॉन्फ़िगर किया है तो `types`) अपने `tsconfig.json` **include** ऐरे में जोड़ें:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> यह TypeScript को आपके अनुवादों के आकार का अनुमान लगाने के लिए अनुमति देगा ताकि बेहतर ऑटो-पूर्णता और त्रुटि पहचान हो सके।

## Git Configuration

यह अनुशंसा की जाती है कि आप Intlayer से स्वत: उत्पन्न फ़ाइलों और फ़ोल्डरों को **अनदेखा** करें। अपने `.gitignore` में यह पंक्ति जोड़ें:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
i18next
```

आप आमतौर पर इन संसाधनों या `.intlayer` आंतरिक निर्माण आर्टिफैक्ट्स को कमिट नहीं करते हैं, क्योंकि इन्हें प्रत्येक बिल्ड पर पुनः उत्पन्न किया जा सकता है।

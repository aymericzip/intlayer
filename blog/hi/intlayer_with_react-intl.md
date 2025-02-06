# React Internationalization (i18n) with **react-intl** and Intlayer

यह गाइड दिखाता है कि आप **Intlayer** को **react-intl** के साथ कैसे एकीकृत कर सकते हैं ताकि एक React एप्लिकेशन में अनुवादों का प्रबंधन किया जा सके। आप Intlayer के साथ अपने अनुवाद योग्य कंटेंट को घोषित करेंगे और फिर उन संदेशों का उपभोग करेंगे **react-intl** के साथ, जो [FormatJS](https://formatjs.io/docs/react-intl) पारिस्थितिकी प्रणाली से एक लोकप्रिय लाइब्रेरी है।

## Overview

- **Intlayer** आपको अपने प्रोजेक्ट के भीतर **component-level** कंटेंट घोषणा फ़ाइलों (JSON, JS, TS, आदि) में अनुवाद स्टोर करने की अनुमति देता है।
- **react-intl** React के घटक और हुक (जैसे `<FormattedMessage>` और `useIntl()`) प्रदान करता है ताकि स्थानीयकृत स्ट्रिंग प्रदर्शित की जा सके।

Intlayer को **export** करने के लिए कॉन्फ़िगर करके एक **react-intl–compatible** प्रारूप में अनुवाद, आप स्वचालित रूप से **generate** और **update** कर सकते हैं उन संदेश फ़ाइलों को जिन्हें `<IntlProvider>` (react-intl से) की आवश्यकता होती है।

---

## Why Use Intlayer with react-intl?

1. **Per-Component Content Declarations**  
   Intlayer कंटेंट घोषणा फ़ाइलें आपके React घटकों के साथ-साथ रह सकती हैं, "अनाथ" अनुवादों से बचती हैं अगर घटक स्थानांतरित या हटा दिए जाएं। उदाहरण के लिए:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Intlayer कंटेंट घोषणा
               └── index.tsx          # React घटक
   ```

2. **Centralized Translations**  
   प्रत्येक कंटेंट घोषणा फ़ाइल सभी अनुवादों को एकत्र करती है जिनकी आवश्यकता एक घटक को होती है। यह विशेष रूप से TypeScript प्रोजेक्ट्स में मददगार है: गायब अनुवादों को **संकलन समय** में पकड़ा जा सकता है।

3. **Automatic Build and Regeneration**  
   जब भी आप अनुवाद जोड़ते या अपडेट करते हैं, Intlayer संदेश JSON फ़ाइलों को फिर से उत्पन्न करता है। फिर आप इन्हें react-intl के `<IntlProvider>` में पास कर सकते हैं।

---

## Installation

एक सामान्य React प्रोजेक्ट में, निम्नलिखित इंस्टॉल करें:

```bash
# npm के साथ
npm install intlayer react-intl

# yarn के साथ
yarn add intlayer react-intl

# pnpm के साथ
pnpm add intlayer react-intl
```

### Why These Packages?

- **intlayer**: कोर CLI और लाइब्रेरी जो कंटेंट घोषणाओं के लिए स्कैन करता है, उन्हें मर्ज करता है, और डिक्शनरी आउटपुट बनाता है।
- **react-intl**: FormatJS से मुख्य लाइब्रेरी जो `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` और अन्य अंतर्राष्ट्रीयकरण प्राइमिटिव प्रदान करती है।

> यदि आपके पास पहले से React स्थापित नहीं है, तो आपको इसे भी आवश्यक होगा (`react` और `react-dom`)।

## Configuring Intlayer to Export react-intl Messages

अपने प्रोजेक्ट की रूट में, **`intlayer.config.ts`** (या `.js`, `.mjs`, `.cjs`) इस प्रकार बनाएं:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // जितनी चाहें उतनी लोकल्स जोड़ें
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Intlayer को बताता है कि react-intl के लिए संदेश फ़ाइलें उत्पन्न करें
    dictionaryOutput: ["react-intl"],

    // वह निर्देशिका जहां Intlayer आपके संदेश JSON फ़ाइलों को लिखेगा
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Note**: अन्य फ़ाइल एक्सटेंशनों (`.mjs`, `.cjs`, `.js`) के लिए, [Intlayer docs](https://intlayer.org/hi/doc/concept/configuration) पर उपयोग विवरण देखें।

---

## Creating Your Intlayer Content Declarations

Intlayer आपके कोडबेस को स्कैन करता है (डिफ़ॉल्ट रूप से, `./src` के तहत) ऐसी फ़ाइलों के लिए जो `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` से मेल खाती हैं।  
यहां एक **TypeScript** उदाहरण है:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type DeclarationContent } from "intlayer";

const content = {
  // "key" आपके react-intl JSON फ़ाइल में टॉप-लेवल संदेश कुंजी बनता है
  key: "my-component",

  content: {
    // t() का प्रत्येक कॉल एक अनुवाद योग्य फ़ील्ड घोषित करता है
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

यदि आप JSON या विभिन्न JS स्वाद (`.cjs`, `.mjs`) पसंद करते हैं, तो संरचना काफी हद तक समान है—[Intlayer docs on content declaration](https://intlayer.org/hi/doc/concept/content) देखें।

---

## Building the react-intl Messages

**react-intl** के लिए वास्तविक संदेश JSON फ़ाइलें उत्पन्न करने के लिए, चलाएँ:

```bash
# npm के साथ
npx intlayer build

# yarn के साथ
yarn intlayer build

# pnpm के साथ
pnpm intlayer build
```

यह सभी `*.content.*` फ़ाइलों को स्कैन करता है, उन्हें संकलित करता है, और परिणामों को आपकी **`intlayer.config.ts`** में निर्दिष्ट निर्देशिका में लिखता है—इस उदाहरण में, `./react-intl/messages`।  
एक सामान्य आउटपुट इस प्रकार हो सकता है:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

प्रत्येक फ़ाइल एक JSON ऑब्जेक्ट है जिसका **टॉप-लेवल कीज़** आपके घोषणाओं से प्रत्येक **`content.key`** के अनुरूप होता है। **सब-कुंडल** (जैसे `helloWorld`) उस कंटेंट आइटम के भीतर घोषित अनुवादों को दर्शाते हैं।

उदाहरण के लिए, **en.json** इस प्रकार हो सकता है:

```json filePath="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## Initializing react-intl in Your React App

### 1. Load the Generated Messages

जहां आप अपने ऐप के रूट घटक को कॉन्फ़िगर करते हैं (जैसे, `src/main.tsx` या `src/index.tsx`), आपको:

1. **Import** करें उत्पन्न संदेश फ़ाइलों को (या तो स्थिर या गतिशील रूप से)।
2. **Provide** करें इन्हें `<IntlProvider>` में `react-intl` से।

एक सरल दृष्टिकोण फ़ाइलों को **स्थिर रूप से** इम्पोर्ट करना है:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// निर्माण आउटपुट से JSON फ़ाइलों को आमंत्रित करें।
// वैकल्पिक रूप से, आप उपयोगकर्ता की पसंद की लोकल के आधार पर गतिशील रूप से इम्पोर्ट कर सकते हैं।
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// यदि आपके पास उपयोगकर्ता की भाषा का पता लगाने के लिए कोई तंत्र है, तो इसे यहां सेट करें।
// सरलता के लिए, आइए अंग्रेजी चुनते हैं।
const locale = "en";

// संदेशों को एक वस्तु में संकलित करें (या उन्हें गतिशील रूप से चुनें)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **Tip**: वास्तविक परियोजनाओं के लिए, आप:
>
> - रनटाइम पर JSON संदेशों को गतिशील रूप से लोड कर सकते हैं।
> - वातावरण-आधारित, ब्राउज़र-आधारित, या उपयोगकर्ता खाता–आधारित लोकल पहचान का उपयोग कर सकते हैं।

### 2. Use `<FormattedMessage>` or `useIntl()`

एक बार जब आपके संदेश `<IntlProvider>` में लोड हो जाते हैं, तो कोई भी चाइल्ड घटक react-intl का उपयोग करके स्थानीयकृत स्ट्रिंग्स तक पहुंच सकता है। दो मुख्य दृष्टिकोण हैं:

- **`<FormattedMessage>`** घटक
- **`useIntl()`** हुक

---

## Using Translations in React Components

### Approach A: `<FormattedMessage>`

त्वरित इनलाइन उपयोग के लिए:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” en.json, fr.json आदि से कुंजी को संदर्भित करता है। */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> **`id`** प्रॉप इन `<FormattedMessage>` में **टॉप-लेवल की** (`my-component`) के साथ-साथ किसी भी सब-कुंजी (`helloWorld`) से मेल खाना चाहिए।

### Approach B: `useIntl()`

और अधिक गतिशील उपयोग के लिए:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

दोनों दृष्टिकोण मान्य हैं — जो भी शैली आपके ऐप के लिए उपयुक्त है, चुनें।

---

## Updating or Adding New Translations

1. किसी भी `*.content.*` फ़ाइल में कंटेंट **जोड़ें या संशोधित करें**।
2. `intlayer build` को फिर से चलाएँ ताकि JSON फ़ाइलें `./react-intl/messages` के तहत फिर से उत्पन्न हो सकें।
3. React (और react-intl) अगले समय जब आप अपना एप्लिकेशन पुनर्निर्माण या पुनः लोड करेंगे, अपडेट्स को उठाएगा।

---

## TypeScript Integration (Optional)

यदि आप TypeScript का उपयोग कर रहे हैं, तो Intlayer आपके अनुवादों के लिए **type definitions** उत्पन्न कर सकता है।

- सुनिश्चित करें कि `tsconfig.json` में आपकी `types` फ़ोल्डर (या जो भी आउटपुट फ़ोल्डर Intlayer उत्पन्न करता है) `"include"` एरे में शामिल है।

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

उत्पन्न प्रकार मदद कर सकते हैं गायब अनुवादों या आपकी React घटकों में अमान्य कुंजियों का समय पर पता लगाएं।

---

## Git Configuration

यह सामान्य है कि आप Intlayer के आंतरिक निर्माण उत्पादों को संस्करण नियंत्रण से **बहिष्कृत** करें। अपने `.gitignore` में जोड़ें:

```plaintext
# intlayer निर्माण उत्पादों की उपेक्षा करें
.intlayer
react-intl
```

आपके कार्यप्रवाह के आधार पर, आप यह भी चाह सकते हैं कि आप `./react-intl/messages` में अंतिम डिक्शनेरियों को अनदेखा या कमिट करें। यदि आपका CI/CD पाइपलाइन उन्हें फिर से उत्पन्न करता है, तो आप उन्हें सुरक्षित रूप से अनदेखा कर सकते हैं; अन्यथा, यदि आपको उन्हें उत्पादन परिनियोजनों के लिए आवश्यक है, तो उन्हें कमिट करें।

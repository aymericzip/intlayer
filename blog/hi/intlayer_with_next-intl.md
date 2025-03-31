# Next.js Internationalization (i18n) with next-intl and Intlayer

next-intl और Intlayer दोनों ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) ढांचे हैं जो Next.js अनुप्रयोगों के लिए डिजाइन किए गए हैं। इनका उपयोग सॉफ़्टवेयर परियोजनाओं में अनुवाद, स्थानीयकरण, और भाषा स्विचिंग प्रबंधित करने के लिए व्यापक रूप से किया जाता है।

ये तीन मुख्य अवधारणाओं को साझा करते हैं:

1. **सामग्री घोषणा**: आपकी एप्लिकेशन की अनुवादनीय सामग्री को परिभाषित करने की विधि।

   - Intlayer में इसे `सामग्री घोषणा फ़ाइल` कहा जाता है, जो JSON, JS, या TS फ़ाइल हो सकती है जो संरचित डेटा निर्यात करती है। अधिक जानकारी के लिए [Intlayer दस्तावेज़](https://intlayer.org/fr/doc/concept/content) देखें।
   - next-intl में इसे `messages` या `locale messages` कहा जाता है, जो आमतौर पर JSON फ़ाइलों में होती हैं। अधिक जानकारी के लिए [next-intl दस्तावेज़](https://github.com/amannn/next-intl) देखें।

2. **उपकरण**: एप्लिकेशन में सामग्री घोषणाएं बनाने और व्याख्यित करने के लिए उपकरण, जैसे Intlayer के लिए `useIntlayer()` या `useLocale()`, और next-intl के लिए `useTranslations()`।

3. **प्लगइन्स और मिडलवेयर**: URL रीडायरेक्शन, बंडलिंग ऑप्टिमाइजेशन, और अन्य प्रबंधित करने के लिए सुविधाएँ, जैसे, Intlayer के लिए `intlayerMiddleware` या next-intl के लिए [`createMiddleware`](https://github.com/amannn/next-intl)।

## Intlayer और next-intl: प्रमुख अंतरों

Intlayer अन्य i18n पुस्तकालयों की तुलना कैसे करती है Next.js के लिए (जैसे next-intl), इसके गहरे विश्लेषण के लिए [next-i18next vs. next-intl vs. Intlayer ब्लॉग पोस्ट](https://github.com/aymericzip/intlayer/blob/main/blog/hi/i18next_vs_next-intl_vs_intlayer.md) देखें।

## Intlayer के साथ next-intl संदेश कैसे उत्पन्न करें

### Intlayer का उपयोग next-intl के साथ क्यों करें?

Intlayer सामग्री घोषणा फ़ाइलें आमतौर पर बेहतर डेवलपर अनुभव प्रदान करती हैं। ये अधिक लचीली और रखरखाव योग्य होती हैं, जिसमें दो मुख्य लाभ होते हैं:

1. **लचीला स्थान**: आप Intlayer सामग्री घोषणा फ़ाइल को अपनी एप्लिकेशन की फ़ाइल पेड़ में कहीं भी रख सकते हैं। इससे घटकों के नाम बदलने या हटाने में आसानी होती है, बिना उपयोग में न आने वाली या लटकी हुई संदेश फ़ाइलों को छोड़े।

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

2. **केंद्रीकृत अनुवाद**: Intlayer सभी अनुवादों को एकल सामग्री घोषणा में संग्रहीत करती है, यह सुनिश्चित करते हुए कि कोई अनुवाद गायब न हो। TypeScript परियोजनाओं में, गायब अनुवादों को प्रकार त्रुटियों के रूप में स्वचालित रूप से चिह्नित किया जाता है, जिससे डेवलपर्स को तुरंत फीडबैक मिलता है।

### स्थापना

Intlayer और next-intl का उपयोग करने के लिए, दोनों पुस्तकालयों को स्थापित करें:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Intlayer को next-intl संदेश निर्यात करने के लिए कॉन्फ़िगर करना

> **नोट:** Intlayer से next-intl के लिए संदेश निर्यात करने से संरचना में थोड़े भिन्नताएँ आ सकती हैं। यदि संभव हो, तो एक Intlayer-केवल या next-intl-केवल प्रवाह बनाए रखें ताकि एकीकरण सरल हो सके। यदि आपको Intlayer से next-intl संदेश उत्पन्न करने की आवश्यकता है, तो नीचे दिए गए चरणों का पालन करें।

अपने प्रोजेक्ट की जड़ में एक `intlayer.config.ts` फ़ाइल (या `.mjs` / `.cjs`) बनाएं या अपडेट करें:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // next-intl आउटपुट का उपयोग करें
    nextIntlMessagesDir: "./intl/messages", // जहां next-intl संदेशों को सहेजना है
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
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
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
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### सामग्री घोषणा

नीचे विभिन्न प्रारूपों में सामग्री घोषणा फ़ाइलों के उदाहरण दिए गए हैं। Intlayer इन्हें संदेश फ़ाइलों में संकलित करेगा जिन्हें next-intl उपभोग कर सकता है।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-component",
  "content": {
    "helloWorld": {
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

### next-intl संदेशों का निर्माण

next-intl के लिए संदेश फ़ाइलों का निर्माण करने के लिए, चलाएँ:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

इससे `./intl/messages` निर्देशिका में संसाधन उत्पन्न होंगे (जैसा कि `intlayer.config.*` में कॉन्फ़िगर किया गया है)। अपेक्षित आउटपुट:

```bash
.
└── intl
    └── messages
       └── hi
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

प्रत्येक फ़ाइल में सभी Intlayer सामग्री घोषणाओं से संकलित संदेश होते हैं। शीर्ष स्तर की कुंजियाँ आमतौर पर आपके `content.key` फ़ील्ड से मेल खाती हैं।

### अपने Next.js ऐप में next-intl का उपयोग करना

> अधिक विवरण के लिए, आधिकारिक [next-intl उपयोग दस्तावेज़](https://github.com/amannn/next-intl#readme) देखें।

1. **एक Middleware बनाएँ (वैकल्पिक):**  
   यदि आप स्वचालित स्थानीयकरण पहचान या रीडायरेक्शन प्रबंधित करना चाहते हैं, तो next-intl के [createMiddleware](https://github.com/amannn/next-intl#createMiddleware) का उपयोग करें।

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **संदेश लोड करने के लिए `layout.tsx` या `_app.tsx` बनाएँ:**  
   यदि आप ऐप राउटर (Next.js 13+) का उपयोग कर रहे हैं, तो एक लेआउट बनाएँ:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';

   export const
   ```

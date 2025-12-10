---
createdAt: 2024-03-07
updatedAt: 2025-12-10
title: अपना Vite और React एप्लिकेशन कैसे अनुवाद करें – i18n गाइड 2025
description: जानें कि कैसे Intlayer का उपयोग करके अपने Vite और React एप्लिकेशन में अंतरराष्ट्रीयकरण (i18n) जोड़ें। इस गाइड का पालन करके अपनी ऐप को बहुभाषी बनाएं।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Intlayer का उपयोग करके अपनी Vite और React वेबसाइट का अनुवाद करें | अंतरराष्ट्रीयकरण (i18n)

## विषय-सूची

<TOC/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके** कंपोनेंट स्तर पर अनुवादों का आसानी से प्रबंधन करें।
- **मेटाडेटा**, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकल डिटेक्शन और स्विचिंग।

---

## Vite और React एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-vite-react-template) देखें।

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**
  यह मुख्य पैकेज है जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  वह पैकेज जो Intlayer को React एप्लिकेशन के साथ एकीकृत करता है। यह React अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक्स प्रदान करता है।

- **vite-intlayer**
  Vite प्लगइन शामिल करता है जो Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा लोकल का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी प्रदान करता है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

`intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      hi: "Vite लोगो",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      hi: "React लोगो",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      hi: "गिनती है ",
    }),

    edit: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
      hi: (
        <>
          <code>src/App.tsx</code> को संपादित करें और HMR का परीक्षण करने के लिए
          सहेजें
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      hi: "अधिक जानने के लिए Vite और React लोगो पर क्लिक करें",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // यदि आप अपनी सामग्री में React node का उपयोग कर रहे हैं तो React को आयात करना न भूलें
        en: (
          <>
            Edit <code>src/App.tsx</code> और HMR परीक्षण के लिए सहेजें
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Vite और React लोगो पर क्लिक करें अधिक जानने के लिए",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      hi: "Vite लोगो",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      hi: "React लोगो",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      hi: "काउंट है ",
    }),

    edit:
      t <
      ReactNode >
      {
        // यदि आप अपनी सामग्री में React node का उपयोग करते हैं तो React को import करना न भूलें
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
        hi: (
          <>
            <code>src/App.tsx</code> संपादित करें और HMR परीक्षण के लिए सहेजें
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      hi: "अधिक जानने के लिए Vite और React लोगो पर क्लिक करें",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "hi": "Vite लोगो"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "hi": "React लोगो"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "hi": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "hi": "गिनती है "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "hi": "src/App.tsx संपादित करें और HMR परीक्षण के लिए सहेजें"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "hi": "अधिक जानने के लिए Vite और React लोगो पर क्लिक करें"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हो जाती हैं और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

यदि आपकी सामग्री फ़ाइल में TSX कोड शामिल है, तो आपको अपनी सामग्री फ़ाइल में `import React from "react";` आयात करने पर विचार करना चाहिए।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुँचें:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> यदि आप अपने कंटेंट का उपयोग किसी `string` एट्रिब्यूट में करना चाहते हैं, जैसे कि `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किया गया `setLocale` फ़ंक्शन उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की लोकल सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      अंग्रेज़ी में भाषा बदलें
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      अंग्रेज़ी में भाषा बदलें
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      अंग्रेज़ी में भाषा बदलें
    </button>
  );
};
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

### (वैकल्पिक) चरण 7: अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय रूट बनाना है। यह SEO और SEO-अनुकूल URLs के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

डिफ़ॉल्ट रूप से, डिफ़ॉल्ट लोकल के लिए रूट्स को कोई प्रीफ़िक्स नहीं दिया जाता है। यदि आप डिफ़ॉल्ट लोकल के लिए प्रीफ़िक्स जोड़ना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` कॉम्पोनेंट बना सकते हैं जो आपके एप्लिकेशन के रूट्स को लपेटता है और लोकल-आधारित रूटिंग को संभालता है। यहाँ [React Router](https://reactrouter.com/home) का उपयोग करते हुए एक उदाहरण दिया गया है:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer"; // 'intlayer' से उपयोगिता फ़ंक्शन और प्रकार
import type { FC, PropsWithChildren } from "react"; // कार्यात्मक घटकों और प्रॉप्स के लिए React प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतरराष्ट्रीयकरण संदर्भ के लिए प्रदाता
import { BrowserRouter, Route, Routes } from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर घटक

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग सेट करता है।
 * यह React Router का उपयोग नेविगेशन प्रबंधित करने और स्थानीयकृत घटकों को रेंडर करने के लिए करता है।
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // लोकल को पकड़ने के लिए रूट पैटर्न (उदाहरण: /en/, /fr/) और सभी बाद के पथों से मेल खाना
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // लोकल प्रबंधन के साथ बच्चों को लपेटें
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
import { localeMap } from 'intlayer'; // 'intlayer' से उपयोगिता फ़ंक्शंस और प्रकार
import type { FC, PropsWithChildren } from 'react'; // फ़ंक्शनल कंपोनेंट्स और प्रॉप्स के लिए React प्रकार
import { IntlayerProvider } from 'react-intlayer'; // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रदाता
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // नेविगेशन प्रबंधन के लिए राउटर घटक

/**
 * एक राउटर घटक जो स्थानीयकरण-विशिष्ट मार्ग सेट करता है।
 * यह React Router का उपयोग नेविगेशन प्रबंधित करने और स्थानीयकृत घटकों को रेंडर करने के लिए करता है।
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // स्थानीयकरण को पकड़ने के लिए रूट पैटर्न (जैसे, /en/, /fr/) और सभी बाद के पथों से मेल खाता है
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // बच्चों को स्थानीयकरण प्रबंधन के साथ लपेटता है
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
const { localeMap } = require("intlayer"); // 'intlayer' से उपयोगिता फ़ंक्शंस और प्रकार
const React = require("react"); // React को आयात करें
const { IntlayerProvider } = require("react-intlayer"); // अंतरराष्ट्रीयकरण संदर्भ के लिए प्रदाता
const { BrowserRouter, Route, Routes } = require("react-router-dom"); // नेविगेशन प्रबंधन के लिए राउटर घटक

/**
 * एक राउटर कॉम्पोनेंट जो लोकल-विशिष्ट रूट सेट करता है।
 * यह नेविगेशन प्रबंधित करने और स्थानीयकृत कॉम्पोनेंट्स को रेंडर करने के लिए React Router का उपयोग करता है।
 */
const LocaleRouter = ({ children }) =>
  React.createElement(
    BrowserRouter,
    {},
    React.createElement(
      Routes,
      {},
      localeMap(({ locale, urlPrefix }) =>
        React.createElement(Route, {
          path: `${urlPrefix}/*`,
          key: locale,
          element: React.createElement(IntlayerProvider, { locale }, children),
        })
      )
    )
  );

exports.LocaleRouter = LocaleRouter;
```

> नोट: यदि आप `routing.mode: 'no-prefix' | 'search-params'` का उपयोग करते हैं, तो आपको शायद `localeMap` फ़ंक्शन का उपयोग करने की आवश्यकता नहीं है।

फिर, आप अपने एप्लिकेशन में `LocaleRouter` कॉम्पोनेंट का उपयोग कर सकते हैं:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... आपका AppContent घटक

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... आपका AppContent घटक

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... आपका AppContent घटक

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

साथ ही, आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intlayerProxy` का भी उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान लोकल का स्वचालित रूप से पता लगाएगा और उपयुक्त लोकल कुकी सेट करेगा। यदि कोई लोकल निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त लोकल निर्धारित करेगा। यदि कोई लोकल पता नहीं चलता है, तो यह डिफ़ॉल्ट लोकल पर पुनर्निर्देशित करेगा।

> ध्यान दें कि production में `intlayerProxy` का उपयोग करने के लिए, आपको `vite-intlayer` पैकेज को `devDependencies` से `dependencies` में स्विच करना होगा।

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

### (वैकल्पिक) चरण 8: जब लोकल बदलता है तो URL बदलें

जब लोकल बदलता है तो URL बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किया गया `onLocaleChange` प्रॉप का उपयोग कर सकते हैं। साथ ही, आप URL पथ को अपडेट करने के लिए `react-router-dom` से `useLocation` और `useNavigate` हुक का उपयोग कर सकते हैं।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें। उदाहरण: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // अपडेट किए गए लोकल के साथ URL बनाएं
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL पथ अपडेट करें
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* लोकल - उदाहरण के लिए FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें। उदाहरण: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // अपडेटेड लोकल के साथ URL बनाएं
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL पथ अपडेट करें
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* क्षेत्र - उदाहरण के लिए FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी ही भाषा में - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए, Locales.SPANISH सेट होने पर Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें। उदाहरण: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // अपडेट किए गए लोकल के साथ URL बनाएं
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL पथ अपडेट करें
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* लोकल - उदाहरण के लिए FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी ही लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> दस्तावेज़ संदर्भ:
>
> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` एट्रिब्यूट](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

नीचे अपडेट किया गया **चरण 9** है जिसमें अतिरिक्त व्याख्याएँ और परिष्कृत कोड उदाहरण शामिल हैं:

---

### (वैकल्पिक) चरण 9: HTML भाषा और दिशा एट्रिब्यूट्स को स्विच करें

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो `<html>` टैग के `lang` और `dir` एट्रिब्यूट्स को वर्तमान लोकल के अनुसार अपडेट करना बहुत महत्वपूर्ण होता है। ऐसा करने से निम्नलिखित सुनिश्चित होता है:

- **पहुँचयोग्यता (Accessibility)**: स्क्रीन रीडर्स और सहायक तकनीकें सही `lang` एट्रिब्यूट पर निर्भर करती हैं ताकि वे सामग्री को सही ढंग से उच्चारित और व्याख्यायित कर सकें।
- **टेक्स्ट रेंडरिंग (Text Rendering)**: `dir` (दिशा) एट्रिब्यूट यह सुनिश्चित करता है कि टेक्स्ट सही क्रम में प्रदर्शित हो (जैसे, अंग्रेज़ी के लिए बाएं से दाएं, अरबी या हिब्रू के लिए दाएं से बाएं), जो पठनीयता के लिए आवश्यक है।
- **एसईओ (SEO)**: सर्च इंजन `lang` एट्रिब्यूट का उपयोग पृष्ठ की भाषा निर्धारित करने के लिए करते हैं, जिससे वे खोज परिणामों में सही स्थानीयकृत सामग्री प्रदान कर सकें।

जब आप इन एट्रिब्यूट्स को लोकल बदलने पर डायनामिक रूप से अपडेट करते हैं, तो आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव की गारंटी देते हैं।

#### हुक को लागू करना

HTML एट्रिब्यूट्स को प्रबंधित करने के लिए एक कस्टम हुक बनाएं। यह हुक लोकल परिवर्तनों को सुनता है और एट्रिब्यूट्स को तदनुसार अपडेट करता है:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * वर्तमान लोकल के आधार पर HTML <html> एलिमेंट के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 * - `lang`: ब्राउज़रों और सर्च इंजनों को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने के क्रम को सुनिश्चित करता है (जैसे, अंग्रेज़ी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट उचित टेक्स्ट रेंडरिंग, सुलभता, और SEO के लिए आवश्यक है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा एट्रिब्यूट को वर्तमान लोकल के अनुसार अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * वर्तमान लोकल के आधार पर HTML <html> एलिमेंट के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 * - `lang`: ब्राउज़रों और सर्च इंजनों को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने के क्रम को सुनिश्चित करता है (जैसे, अंग्रेज़ी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट उचित टेक्स्ट रेंडरिंग, सुलभता, और SEO के लिए आवश्यक है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा एट्रिब्यूट को वर्तमान लोकल के अनुसार अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * वर्तमान लोकल के आधार पर HTML <html> एलिमेंट के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 * - `lang`: ब्राउज़रों और सर्च इंजनों को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने के क्रम को सुनिश्चित करता है (जैसे, अंग्रेज़ी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट उचित टेक्स्ट रेंडरिंग, सुलभता, और SEO के लिए आवश्यक है।
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // वर्तमान लोकल के अनुसार भाषा एट्रिब्यूट को अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### अपने एप्लिकेशन में हुक का उपयोग करना

अपने मुख्य कॉम्पोनेंट में हुक को एकीकृत करें ताकि HTML एट्रिब्यूट्स लोकल बदलने पर अपडेट हो जाएं:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // लोकल के आधार पर <html> टैग के lang और dir एट्रिब्यूट्स को अपडेट करने के लिए हुक लागू करें।
  useI18nHTMLAttributes();

  // ... आपके कॉम्पोनेंट का बाकी हिस्सा
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // लोकल के आधार पर <html> टैग के lang और dir एट्रिब्यूट्स को अपडेट करने के लिए हुक लागू करें।
  useI18nHTMLAttributes();

  // ... आपके कॉम्पोनेंट का बाकी हिस्सा
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // लोकल के आधार पर <html> टैग के lang और dir एट्रिब्यूट्स को अपडेट करने के लिए हुक लागू करें।
  useI18nHTMLAttributes();

  // ... आपके कंपोनेंट का बाकी हिस्सा
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

इन परिवर्तनों को लागू करने से, आपका एप्लिकेशन:

- सुनिश्चित करें कि **भाषा** (`lang`) एट्रिब्यूट वर्तमान लोकल को सही ढंग से दर्शाए, जो SEO और ब्राउज़र व्यवहार के लिए महत्वपूर्ण है।
- लोकल के अनुसार **टेक्स्ट दिशा** (`dir`) को समायोजित करें, जिससे विभिन्न पढ़ने के क्रम वाली भाषाओं के लिए पठनीयता और उपयोगिता बढ़े।
- एक अधिक **सुलभ** अनुभव प्रदान करें, क्योंकि सहायक तकनीकें इन एट्रिब्यूट्स पर निर्भर करती हैं ताकि वे बेहतर तरीके से काम कर सकें।

### (वैकल्पिक) चरण 10: एक स्थानीयकृत लिंक कंपोनेंट बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन की नेविगेशन वर्तमान लोकल का सम्मान करती है, आप एक कस्टम `Link` कंपोनेंट बना सकते हैं। यह कंपोनेंट स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ प्रीफिक्स करता है, ताकि उदाहरण के लिए, जब एक फ्रेंच-भाषी उपयोगकर्ता "About" पेज के लिंक पर क्लिक करता है, तो उसे `/fr/about` पर पुनः निर्देशित किया जाता है, न कि `/about` पर।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजन को भाषा-विशिष्ट पृष्ठों को सही ढंग से इंडेक्स करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: अपने एप्लिकेशन में स्थानीयकृत लिंक का उपयोग करके, आप सुनिश्चित करते हैं कि नेविगेशन वर्तमान लोकल के भीतर ही रहता है, जिससे अप्रत्याशित भाषा स्विचिंग से बचा जा सकता है।
- **रखरखाव योग्यता**: स्थानीयकरण लॉजिक को एक ही कंपोनेंट में केंद्रीकृत करने से URL प्रबंधन सरल हो जाता है, जिससे आपका कोडबेस बनाए रखना और बढ़ाना आसान हो जाता है क्योंकि आपका एप्लिकेशन बढ़ता है।

नीचे TypeScript में एक स्थानीयकृत `Link` कंपोनेंट का कार्यान्वयन दिया गया है:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * यह उपयोगिता फ़ंक्शन जांचता है कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link कंपोनेंट जो वर्तमान लोकल के आधार पर href एट्रिब्यूट को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है ताकि URL के साथ लोकल (जैसे, /fr/about) जोड़ा जा सके।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर रहता है।
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * यह उपयोगिता फ़ंक्शन जांचता है कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link कंपोनेंट जो वर्तमान लोकल के आधार पर href एट्रिब्यूट को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है ताकि URL के आगे लोकल जोड़ा जा सके (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर बना रहे।
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * यह उपयोगिता फ़ंक्शन जांचता है कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link कंपोनेंट जो वर्तमान लोकल के आधार पर href एट्रिब्यूट को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है ताकि URL के आगे लोकल जोड़ा जा सके (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर बना रहे।
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### यह कैसे काम करता है

- **बाहरी लिंक का पता लगाना**:  
  सहायक फ़ंक्शन `checkIsExternalLink` यह निर्धारित करता है कि कोई URL बाहरी है या नहीं। बाहरी लिंक को अपरिवर्तित छोड़ दिया जाता है क्योंकि उन्हें स्थानीयकरण की आवश्यकता नहीं होती।

- **वर्तमान लोकल प्राप्त करना**:  
  `useLocale` हुक वर्तमान लोकल प्रदान करता है (जैसे, फ्रेंच के लिए `fr`)।

- **URL का स्थानीयकरण**:  
  आंतरिक लिंक (अर्थात् गैर-बाहरी) के लिए, `getLocalizedUrl` का उपयोग वर्तमान लोकल के साथ URL को स्वचालित रूप से उपसर्गित करने के लिए किया जाता है। इसका मतलब है कि यदि आपका उपयोगकर्ता फ्रेंच में है, तो `/about` को `href` के रूप में पास करने पर यह `/fr/about` में परिवर्तित हो जाएगा।

- **लिंक लौटाना**:  
  कंपोनेंट एक `<a>` एलिमेंट लौटाता है जिसमें स्थानीयकृत URL होता है, यह सुनिश्चित करता है कि नेविगेशन स्थानीय भाषा के अनुरूप हो।

अपने एप्लिकेशन में इस `Link` कंपोनेंट को एकीकृत करके, आप एक सुसंगत और भाषा-सचेत उपयोगकर्ता अनुभव बनाए रखते हैं, साथ ही बेहतर SEO और उपयोगिता का लाभ भी प्राप्त करते हैं।

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से जनरेट किए गए प्रकारों को शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा जनरेट की गई फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- **अनुवाद कुंजियों के लिए ऑटोकंप्लीशन**।
- **अनुवादों के लिए रीयल-टाइम त्रुटि पहचान**।
- **अनुवादित सामग्री के इनलाइन पूर्वावलोकन**।
- **तेजी से क्रियाएं** ताकि आप आसानी से अनुवाद बना और अपडेट कर सकें।

विस्तृत जानकारी के लिए, एक्सटेंशन का उपयोग कैसे करें, देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।

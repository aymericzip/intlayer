---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: अपनी Vite और Preact वेबसाइट का अनुवाद करें (i18n)
description: जानें कि अपनी Vite और Preact वेबसाइट को बहुभाषी कैसे बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
---

# Intlayer और Vite और Preact के साथ अंतरराष्ट्रीयकरण (i18n) शुरू करना

> यह पैकेज विकासाधीन है। अधिक जानकारी के लिए [issue](https://github.com/aymericzip/intlayer/issues/118) देखें। Intlayer for Preact में अपनी रुचि दिखाने के लिए इस issue को लाइक करें।

GitHub पर [Application Template](https://github.com/aymericzip/intlayer-vite-preact-template) देखें।

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है, जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कि कंपोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटोकंप्लीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत विशेषताओं का लाभ उठाएं**, जैसे गतिशील लोकल डिटेक्शन और स्विचिंग।

---

## Vite और Preact एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ इंस्टॉल करें

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **preact-intlayer**
  वह पैकेज जो Intlayer को Preact एप्लिकेशन के साथ एकीकृत करता है। यह Preact अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक्स प्रदान करता है।

- **vite-intlayer**
  इसमें Vite प्लगइन शामिल है जो Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा लोकल का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर पुनर्निर्देशन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उन्हें मॉनिटर करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          <code>src/app.tsx</code> को संपादित करें और HMR का परीक्षण करने के लिए
          सहेजें
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // यदि आप सीधे .mjs में JSX का उपयोग करते हैं तो आवश्यक है

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // यदि आप सीधे .cjs में JSX का उपयोग करते हैं तो आवश्यक है

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      hi: "गिनती है ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
      hi: "src/app.tsx संपादित करें और HMR परीक्षण के लिए सहेजें",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      hi: "अधिक जानने के लिए Vite और Preact लोगो पर क्लिक करें",
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
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "hi": "Preact लोगो"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "hi": "Vite + Preact"
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
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "hi": "src/app.tsx को संपादित करें और HMR परीक्षण के लिए सहेजें"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "hi": "अधिक जानने के लिए Vite और Preact लोगो पर क्लिक करें"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

> यदि आपकी सामग्री फ़ाइल में TSX कोड शामिल है, तो आपको `import { h } from "preact";` आयात करने की आवश्यकता हो सकती है या सुनिश्चित करें कि आपका JSX प्रैग्मा Preact के लिए सही ढंग से सेट है।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुँचें:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // मान लेते हैं कि आपके पास preact.svg है
import viteLogo from "/vite.svg";
import "./app.css"; // मान लेते हैं कि आपकी CSS फ़ाइल का नाम app.css है
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> नोट: Preact में, `className` आमतौर पर `class` के रूप में लिखा जाता है।

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md) देखें (API `preact-intlayer` के लिए समान है)।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किया गया `setLocale` फ़ंक्शन उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की लोकल सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      भाषा को अंग्रेज़ी में बदलें
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      भाषा को अंग्रेज़ी में बदलें
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      भाषा को अंग्रेज़ी में बदलें
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें (API `preact-intlayer` के लिए समान है)।

### (वैकल्पिक) चरण 7: अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय रूट बनाना है। यह SEO और SEO-अनुकूल URL के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, डिफ़ॉल्ट लोकल के लिए रूट्स को कोई उपसर्ग नहीं दिया जाता है। यदि आप डिफ़ॉल्ट लोकल के लिए उपसर्ग जोड़ना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` कॉम्पोनेंट बना सकते हैं जो आपके एप्लिकेशन के रूट्स को लपेटता है और लोकल-आधारित रूटिंग को संभालता है। यहाँ [preact-iso](https://github.com/preactjs/preact-iso) का उपयोग करते हुए एक उदाहरण दिया गया है:

सबसे पहले, `preact-iso` इंस्टॉल करें:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त लोकल संदर्भ के साथ लपेटता है।
 * यह URL-आधारित लोकल पहचान और सत्यापन का प्रबंधन करता है।
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // वर्तमान लोकल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट लोकल पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से लोकल उपसर्ग हटाएं ताकि एक आधार पथ बनाया जा सके
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
/**
 * एक कॉम्पोनेंट जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और सत्यापन को प्रबंधित करता है।
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // वर्तमान स्थानीय भाषा निर्धारित करें, यदि प्रदान नहीं की गई है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से स्थानीय उपसर्ग हटाएं ताकि एक मूल पथ बनाया जा सके
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट स्थानीय हमेशा उपसर्गित होना चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीय की सत्यापन करें
    if (!locale || !locales.includes(locale)) {
      // अद्यतन पथ के साथ डिफ़ॉल्ट स्थानीय पर पुनर्निर्देशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए से बदलें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीय सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault गलत होता है, तो डिफ़ॉल्ट स्थानीय उपसर्गित नहीं होता है।
     * सुनिश्चित करें कि वर्तमान लोकल मान्य है और डिफ़ॉल्ट लोकल नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // डिफ़ॉल्ट लोकल को बाहर करें
        )
        .includes(currentLocale) // जांचें कि वर्तमान लोकल मान्य लोकलों की सूची में है या नहीं
    ) {
      // लोकल उपसर्ग के बिना पथ पर पुनर्निर्देशित करें
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान लोकल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * एक राउटर कॉम्पोनेंट जो स्थानीय-विशिष्ट रूट सेट करता है।
 * यह प्रीऐक्ट-आइसो का उपयोग नेविगेशन प्रबंधित करने और स्थानीयकृत कॉम्पोनेंट्स को रेंडर करने के लिए करता है।
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// आवश्यक निर्भरताओं और फ़ंक्शंस को आयात करना
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // JSX के लिए आवश्यक

// Intlayer से कॉन्फ़िगरेशन को डेस्ट्रक्चर करना
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और सत्यापन का प्रबंधन करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // वर्तमान स्थानीय भाषा निर्धारित करें, यदि प्रदान नहीं की गई हो तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से स्थानीय उपसर्ग हटाएं ताकि एक मूल पथ बनाया जा सके
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट स्थानीय भाषा को हमेशा उपसर्गित किया जाना चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीय भाषा को मान्य करें
    if (!locale || !locales.includes(locale)) {
      // अपडेट किए गए पथ के साथ डिफ़ॉल्ट स्थानीय भाषा पर पुनर्निर्देशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए से बदलें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीय भाषा सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault गलत होता है, तो डिफ़ॉल्ट स्थानीय भाषा को उपसर्गित नहीं किया जाता है।
     * सुनिश्चित करें कि वर्तमान स्थानीय भाषा मान्य है और डिफ़ॉल्ट स्थानीय भाषा नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // डिफ़ॉल्ट लोकल को बाहर करें
        )
        .includes(currentLocale) // जांचें कि वर्तमान लोकल मान्य लोकलों की सूची में है या नहीं
    ) {
      // लोकल उपसर्ग के बिना पथ पर पुनर्निर्देशित करें
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान लोकल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * एक राउटर कॉम्पोनेंट जो स्थानीय-विशिष्ट मार्ग सेट करता है।
 * यह प्रीएक्ट-आइस का उपयोग नेविगेशन प्रबंधित करने और स्थानीयकृत कॉम्पोनेंट्स को रेंडर करने के लिए करता है।
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// आवश्यक निर्भरताओं और फ़ंक्शंस को आयात करना
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // JSX के लिए आवश्यक

// Intlayer से configuration को डीस्ट्रक्चर करना
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * एक कॉम्पोनेंट जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और सत्यापन का प्रबंधन करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // वर्तमान लोकल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से लोकल उपसर्ग हटाएं ताकि एक बेस पथ बनाया जा सके
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault true है, तो डिफ़ॉल्ट लोकल हमेशा उपसर्गित होना चाहिए।
   */
  if (middleware.prefixDefault) {
    // लोकल को मान्य करें
    if (!locale || !locales.includes(locale)) {
      // अपडेट किए गए पथ के साथ डिफ़ॉल्ट लोकल पर पुनर्निर्देशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए से बदलें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीय सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault गलत होता है, तो डिफ़ॉल्ट स्थानीय उपसर्गित नहीं होता है।
     * सुनिश्चित करें कि वर्तमान स्थानीय मान्य है और डिफ़ॉल्ट स्थानीय नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीय को बाहर करें
        )
        .includes(currentLocale) // जांचें कि वर्तमान स्थानीय भाषा मान्य स्थानीय भाषाओं की सूची में है या नहीं
    ) {
      // स्थानीय भाषा उपसर्ग के बिना पथ पर पुनर्निर्देशित करें
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान स्थानीय भाषा सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * एक राउटर कॉम्पोनेंट जो लोकल-विशिष्ट रूट सेट करता है।
 * यह नेविगेशन प्रबंधित करने और स्थानीयकृत कॉम्पोनेंट्स को रेंडर करने के लिए preact-iso का उपयोग करता है।
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

फिर, आप अपने एप्लिकेशन में `LocaleRouter` कॉम्पोनेंट का उपयोग कर सकते हैं:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... आपका AppContent घटक (चरण 5 में परिभाषित)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... आपका AppContent घटक (चरण 5 में परिभाषित)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... आपका AppContent घटक (चरण 5 में परिभाषित)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

साथ ही, आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intLayerMiddlewarePlugin` का भी उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान लोकल का स्वचालित रूप से पता लगाएगा और उपयुक्त लोकल कुकी सेट करेगा। यदि कोई लोकल निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त लोकल निर्धारित करेगा। यदि कोई लोकल पता नहीं चलता है, तो यह डिफ़ॉल्ट लोकल पर पुनः निर्देशित करेगा।

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (वैकल्पिक) चरण 8: जब भाषा बदलती है तो URL बदलें

जब लोकल बदलता है तो URL बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किया गया `onLocaleChange` प्रॉप का उपयोग कर सकते हैं। साथ ही, आप URL पथ को अपडेट करने के लिए `preact-iso` से `useLocation` और `route` का उपयोग कर सकते हैं।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso पूर्ण URL प्रदान करता है
      // अपडेट किए गए लोकल के साथ URL बनाएं
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // URL पथ अपडेट करें
      route(pathWithLocale, true); // true का मतलब रिप्लेस करना है
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // सेटिंग लोकल के बाद प्रोग्रामेटिक नेविगेशन onLocaleChange द्वारा संभाला जाएगा
            }}
            key={localeItem}
          >
            <span>
              {/* लोकल - उदाहरण के लिए FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी ही लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH सेट हो */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // JSX के लिए

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // JSX के लिए

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> दस्तावेज़ संदर्भ:
>
> > - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) (`preact-intlayer` के लिए API समान है)
> > - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
> > - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
> > - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
> > - [`hreflang` एट्रिब्यूट](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=hi)
> > - [`lang` एट्रिब्यूट](https://developer.mozilla.org/hi/docs/Web/HTML/Global_attributes/lang)
> > - [`dir` एट्रिब्यूट](https://developer.mozilla.org/hi/docs/Web/HTML/Global_attributes/dir)
> > - [`aria-current` एट्रिब्यूट](https://developer.mozilla.org/hi/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> > - [Popover API](https://developer.mozilla.org/hi/docs/Web/API/Popover_API)la.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` विशेषता](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

नीचे अपडेट किया गया **चरण 9** है जिसमें अतिरिक्त व्याख्याएँ और परिष्कृत कोड उदाहरण शामिल हैं:

---

### (वैकल्पिक) चरण 9: HTML भाषा और दिशा विशेषताएँ स्विच करें

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो यह आवश्यक है कि `<html>` टैग के `lang` और `dir` विशेषताओं को वर्तमान लोकल के अनुसार अपडेट किया जाए। ऐसा करने से सुनिश्चित होता है:

- **सुलभता**: स्क्रीन रीडर और सहायक तकनीकें सही `lang` विशेषता पर निर्भर करती हैं ताकि वे सामग्री को सही ढंग से उच्चारित और व्याख्यायित कर सकें।
- **पाठ रेंडरिंग**: `dir` (दिशा) विशेषता सुनिश्चित करती है कि पाठ सही क्रम में प्रदर्शित हो (जैसे, अंग्रेज़ी के लिए बाएं से दाएं, अरबी या हिब्रू के लिए दाएं से बाएं), जो पठनीयता के लिए आवश्यक है।
- **एसईओ**: खोज इंजन आपके पृष्ठ की भाषा निर्धारित करने के लिए `lang` एट्रिब्यूट का उपयोग करते हैं, जिससे खोज परिणामों में सही स्थानीयकृत सामग्री प्रदान करने में मदद मिलती है।

जब आप इन एट्रिब्यूट्स को स्थानीय भाषा बदलने पर गतिशील रूप से अपडेट करते हैं, तो आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव सुनिश्चित करते हैं।

#### हुक को लागू करना

HTML एट्रिब्यूट्स को प्रबंधित करने के लिए एक कस्टम हुक बनाएं। यह हुक स्थानीय भाषा में बदलाव सुनता है और एट्रिब्यूट्स को तदनुसार अपडेट करता है:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * वर्तमान स्थानीय भाषा के आधार पर HTML <html> तत्व के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 * - `lang`: ब्राउज़र और सर्च इंजनों को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने के क्रम को सुनिश्चित करता है (जैसे, अंग्रेज़ी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह गतिशील अपडेट सही टेक्स्ट रेंडरिंग, पहुँच योग्यता, और SEO के लिए आवश्यक है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // वर्तमान लोकल के अनुसार भाषा एट्रिब्यूट अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * वर्तमान लोकल के आधार पर HTML <html> तत्व के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * वर्तमान लोकल के आधार पर HTML <html> तत्व के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### अपने एप्लिकेशन में हुक का उपयोग करना

अपने मुख्य कॉम्पोनेंट में हुक को एकीकृत करें ताकि जब भी लोकल बदलें, HTML एट्रिब्यूट्स अपडेट हो जाएं:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // यदि AppContent को useIntlayer की आवश्यकता है तो पहले से आयातित है
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// चरण 5 से AppContent परिभाषा

const AppWithHooks: FunctionalComponent = () => {
  // स्थानीय भाषा के आधार पर <html> टैग के lang और dir गुणों को अपडेट करने के लिए हुक लागू करें।
  useI18nHTMLAttributes();

  // मान लेते हैं कि AppContent आपका मुख्य कंटेंट डिस्प्ले कंपोनेंट है जो चरण 5 से है
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// चरण 5 से AppContent की परिभाषा

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// चरण 5 से AppContent परिभाषा

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

इन परिवर्तनों को लागू करने से, आपका एप्लिकेशन:

- सुनिश्चित करेगा कि **भाषा** (`lang`) एट्रिब्यूट वर्तमान लोकल को सही ढंग से दर्शाता है, जो SEO और ब्राउज़र व्यवहार के लिए महत्वपूर्ण है।
- लोकल के अनुसार **पाठ दिशा** (`dir`) को समायोजित करेगा, जिससे विभिन्न पढ़ने के क्रम वाली भाषाओं के लिए पठनीयता और उपयोगिता बढ़ेगी।
- एक अधिक **सुलभ** अनुभव प्रदान करें, क्योंकि सहायक तकनीकें इन विशेषताओं पर निर्भर करती हैं ताकि वे सही ढंग से काम कर सकें।

### (वैकल्पिक) चरण 10: एक स्थानीयकृत लिंक कॉम्पोनेंट बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन का नेविगेशन वर्तमान लोकल का सम्मान करता है, आप एक कस्टम `Link` कॉम्पोनेंट बना सकते हैं। यह कॉम्पोनेंट स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ पूर्वसर्ग करता है।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजन को भाषा-विशिष्ट पृष्ठों को सही ढंग से अनुक्रमित करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: अपने एप्लिकेशन में स्थानीयकृत लिंक का उपयोग करके, आप सुनिश्चित करते हैं कि नेविगेशन वर्तमान लोकल के भीतर ही रहता है, जिससे अप्रत्याशित भाषा परिवर्तन से बचा जा सके।
- **रखरखाव योग्यता**: स्थानीयकरण लॉजिक को एकल घटक में केंद्रीकृत करने से URL प्रबंधन सरल हो जाता है।

Preact के साथ `preact-iso` में, सामान्यतः नेविगेशन के लिए `<a>` टैग का उपयोग किया जाता है, और `preact-iso` रूटिंग को संभालता है। यदि आपको क्लिक पर प्रोग्रामेटिक नेविगेशन की आवश्यकता है (जैसे, नेविगेट करने से पहले कुछ क्रियाएं करना), तो आप `useLocation` से `route` फ़ंक्शन का उपयोग कर सकते हैं। यहाँ बताया गया है कि आप कैसे एक कस्टम एंकर घटक बना सकते हैं जो URL को स्थानीयकृत करता है:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // मानते हुए कि useLocation और route को preact-iso से preact-intlayer के माध्यम से पुनः निर्यात किया गया है, या सीधे आयात करें
// यदि पुनः निर्यात नहीं किया गया है, तो सीधे आयात करें: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // HTMLAttributes के लिए
import { forwardRef } from "preact/compat"; // refs अग्रेषित करने के लिए

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // वैकल्पिक: इतिहास स्थिति को बदलने के लिए
}

/**
 * उपयोगिता फ़ंक्शन यह जांचने के लिए कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम लिंक कॉम्पोनेंट जो वर्तमान स्थानीय भाषा के आधार पर href एट्रिब्यूट को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है ताकि URL के आगे स्थानीय भाषा का उपसर्ग जोड़ा जा सके (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन उसी स्थानीय संदर्भ के भीतर बना रहे।
 * यह एक मानक <a> टैग का उपयोग करता है लेकिन preact-iso के `route` का उपयोग करके क्लाइंट-साइड नेविगेशन को ट्रिगर कर सकता है।
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // preact-iso से
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // सुनिश्चित करें कि href परिभाषित है
        event.button === 0 && // बायाँ क्लिक
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // मानक मॉडिफायर जांच
        !props.target // नया टैब/विंडो लक्षित नहीं कर रहा है
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // केवल तब नेविगेट करें जब URL अलग हो
          route(hrefI18n, replace); // preact-iso के route का उपयोग करें
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // preact-iso से आयात करें
import { forwardRef } from "preact/compat";
import { h } from "preact"; // JSX के लिए

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // preact-iso से आयात करें
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // JSX के लिए

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? ""); // जांचें कि लिंक बाहरी है या नहीं

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // वर्तमान भाषा प्राप्त करें
    const location = useLocation(); // वर्तमान स्थान प्राप्त करें
    const isExternalLink = checkIsExternalLink(href); // जांचें कि लिंक बाहरी है या नहीं

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href; // स्थानीयकृत URL प्राप्त करें

    const handleClick = (event) => {
      if (onClick) {
        onClick(event); // कस्टम क्लिक हैंडलर कॉल करें
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault(); // डिफ़ॉल्ट नेविगेशन रोकें
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### यह कैसे काम करता है

- **बाहरी लिंक का पता लगाना**:  
  सहायक फ़ंक्शन `checkIsExternalLink` यह निर्धारित करता है कि कोई URL बाहरी है या नहीं। बाहरी लिंक अपरिवर्तित छोड़ दिए जाते हैं।
- **वर्तमान लोकल प्राप्त करना**:  
  `useLocale` हुक वर्तमान लोकल प्रदान करता है।
- **URL का स्थानीयकरण करना**:  
  आंतरिक लिंक के लिए, `getLocalizedUrl` URL के आगे वर्तमान लोकल जोड़ता है।
- **क्लाइंट-साइड नेविगेशन**:
  `handleClick` फ़ंक्शन जांचता है कि क्या यह एक आंतरिक लिंक है और क्या मानक नेविगेशन को रोका जाना चाहिए। यदि हाँ, तो यह `preact-iso` के `route` फ़ंक्शन (जो `useLocation` के माध्यम से प्राप्त किया गया हो या सीधे आयात किया गया हो) का उपयोग क्लाइंट-साइड नेविगेशन करने के लिए करता है। यह पूर्ण पृष्ठ पुनः लोड के बिना SPA-जैसे व्यवहार प्रदान करता है।
- **लिंक लौटाना**:  
  यह कंपोनेंट एक `<a>` तत्व लौटाता है जिसमें स्थानीयकृत URL और कस्टम क्लिक हैंडलर होता है।

### टाइपस्क्रिप्ट कॉन्फ़िगर करें

Intlayer टाइपस्क्रिप्ट के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Preact 10+ के लिए अनुशंसित
    // ...
  },
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जेनरेटेड टाइप्स शामिल करें
  ],
}
```

> सुनिश्चित करें कि आपका `tsconfig.json` Preact के लिए सेट है, विशेष रूप से `jsx` और `jsxImportSource` या पुराने Preact संस्करणों के लिए `jsxFactory`/`jsxFragmentFactory` यदि आप `preset-vite` के डिफ़ॉल्ट का उपयोग नहीं कर रहे हैं।

### Git कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा जेनरेट की गई फाइलों को अनदेखा किया जाए। इससे आप उन्हें अपनी Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसे करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक जानकारी के लिए देखें [Intlayer VS कोड एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।

---

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

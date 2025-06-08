# इंटलेयर और वाइट और प्रीएक्ट के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करना

> यह पैकेज विकास में है। अधिक जानकारी के लिए [समस्या](https://github.com/aymericzip/intlayer/issues/118) देखें। प्रीएक्ट के लिए इंटलेयर में अपनी रुचि दिखाने के लिए समस्या को लाइक करें।

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-vite-preact-template) देखें।

## इंटलेयर क्या है?

**इंटलेयर** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है, जिसे आधुनिक वेब एप्लिकेशन में बहुभाषीय समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

इंटलेयर के साथ, आप कर सकते हैं:

- **अनुवादों को आसानी से प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, ऑटो-कम्प्लीशन और त्रुटि पहचान में सुधार करते हुए।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

---

## वाइट और प्रीएक्ट एप्लिकेशन में इंटलेयर सेट अप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer preact-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer vite-intlayer
```

- **intlayer**

  यह मुख्य पैकेज है जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **preact-intlayer**
  यह पैकेज इंटलेयर को प्रीएक्ट एप्लिकेशन के साथ एकीकृत करता है। यह प्रीएक्ट अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

- **vite-intlayer**
  इसमें [वाइट बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ इंटलेयर को एकीकृत करने के लिए वाइट प्लगइन शामिल है, साथ ही उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ प्रबंधित करने, और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर भी शामिल है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य लोकेल्स
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
      // आपकी अन्य लोकेल्स
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
      // आपकी अन्य लोकेल्स
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में इंटलेयर लॉग्स को अक्षम करना, और अधिक सेट कर सकते हैं। उपलब्ध सभी पैरामीटरों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### चरण 3: अपने वाइट कॉन्फ़िगरेशन में इंटलेयर को एकीकृत करें

अपने कॉन्फ़िगरेशन में इंटलेयर प्लगइन जोड़ें।

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

> `intlayerPlugin()` वाइट प्लगइन का उपयोग वाइट के साथ इंटलेयर को एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह वाइट एप्लिकेशन के भीतर इंटलेयर पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाओं को बनाएँ और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      hi: "वाइट लोगो",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      hi: "प्रीएक्ट लोगो",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      hi: "गणना है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      hi: "src/app.tsx संपादित करें और HMR का परीक्षण करने के लिए सहेजें",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      hi: "अधिक जानने के लिए वाइट और प्रीएक्ट लोगो पर क्लिक करें",
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
// import { h } from 'preact'; // यदि आप .mjs में सीधे JSX का उपयोग करते हैं तो आवश्यक है

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      hi: "वाइट लोगो",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      hi: "प्रीएक्ट लोगो",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      hi: "गणना है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      hi: "src/app.jsx संपादित करें और HMR का परीक्षण करने के लिए सहेजें",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      hi: "अधिक जानने के लिए वाइट और प्रीएक्ट लोगो पर क्लिक करें",
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
// const { h } = require('preact'); // यदि आप .cjs में सीधे JSX का उपयोग करते हैं तो आवश्यक है

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      hi: "वाइट लोगो",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      hi: "प्रीएक्ट लोगो",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      hi: "गणना है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      hi: "src/app.tsx संपादित करें और HMR का परीक्षण करने के लिए सहेजें",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      hi: "अधिक जानने के लिए वाइट और प्रीएक्ट लोगो पर क्लिक करें",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};
```

```json fileName="src/app.content.json" codeFormat="json"
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
        "hi": "गणना है "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "hi": "src/app.tsx संपादित करें और HMR का परीक्षण करने के लिए सहेजें"
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

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हैं। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`) से मेल खाती हैं।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) देखें।

> यदि आपकी सामग्री फ़ाइल में TSX कोड शामिल है, तो आपको `import { h } from "preact";` आयात करने की आवश्यकता हो सकती है या यह सुनिश्चित करना होगा कि आपका JSX प्रैग्मा Preact के लिए सही ढंग से सेट है।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुंचें:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // मान लें कि आपके पास preact.svg है
import viteLogo from "/vite.svg";
import "./app.css"; // मान लें कि आपकी CSS फ़ाइल का नाम app.css है
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

> यदि आप अपनी सामग्री को `string` विशेषता में उपयोग करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:

> ```jsx
>
> ```

> <img src={content.image.src.value} alt={content.image.value} />

> ```
>
> ```

> ध्यान दें: Preact में, `className` आमतौर पर `class` के रूप में लिखा जाता है।

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayer.md) देखें (`preact-intlayer` के लिए API समान है)।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की भाषा सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      भाषा को अंग्रेज़ी में बदलें

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

> `useLocale` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md) देखें (API `preact-intlayer` के लिए समान है)।

### (वैकल्पिक) चरण 7: अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय रूट बनाना है। यह SEO और SEO-अनुकूल URLs के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, डिफ़ॉल्ट लोकेल के लिए रूट्स प्रीफिक्स नहीं होते हैं। यदि आप डिफ़ॉल्ट लोकेल को प्रीफिक्स करना चाहते हैं, तो आप अपने कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` कंपोनेंट बना सकते हैं जो आपके एप्लिकेशन के रूट्स को रैप करता है और लोकेल-आधारित रूटिंग को संभालता है। यहाँ [preact-iso](https://github.com/preactjs/preact-iso) का उपयोग करके एक उदाहरण है:

पहले, `preact-iso` इंस्टॉल करें:

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
 * एक कंपोनेंट जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त लोकेल संदर्भ के साथ रैप करता है।
 * यह URL-आधारित लोकेल डिटेक्शन और सत्यापन का प्रबंधन करता है।
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

  // वर्तमान लोकेल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से लोकेल प्रीफिक्स को हटाएं ताकि एक बेस पथ बनाया जा सके
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट लोकेल को हमेशा प्रीफिक्स किया जाना चाहिए।
   */
  if (middleware.prefixDefault) {
    // लोकेल को सत्यापित करें
    if (!locale || !locales.includes(locale)) {
      // अपडेटेड पथ के साथ डिफ़ॉल्ट लोकेल पर रीडायरेक्ट करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ रैप करें और वर्तमान लोकेल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault झूठा है, तो डिफ़ॉल्ट लोकेल प्रीफिक्स नहीं होता है।
     * सुनिश्चित करें कि वर्तमान लोकेल मान्य है और डिफ़ॉल्ट लोकेल नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // डिफ़ॉल्ट लोकेल को छोड़ दें
        )
        .includes(currentLocale) // जांचें कि वर्तमान लोकेल मान्य लोकेल की सूची में है
    ) {
      // लोकेल प्रीफिक्स के बिना पथ पर रीडायरेक्ट करें
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // बच्चों को IntlayerProvider के साथ रैप करें और वर्तमान लोकेल सेट करें
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
 * एक राउटर कंपोनेंट जो लोकेल-विशिष्ट रूट्स सेट करता है।
 * यह नेविगेशन को प्रबंधित करने और स्थानीयकृत कंपोनेंट्स को रेंडर करने के लिए preact-iso का उपयोग करता है।
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
// आवश्यक डिपेंडेंसी और फंक्शन्स को इम्पोर्ट करना
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
 * एक कंपोनेंट जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त लोकेल संदर्भ के साथ रैप करता है।
 * यह URL-आधारित लोकेल डिटेक्शन और सत्यापन का प्रबंधन करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // वर्तमान लोकेल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से लोकेल प्रीफिक्स को हटाएं ताकि एक बेस पथ बनाया जा सके
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट लोकेल को हमेशा प्रीफिक्स किया जाना चाहिए।
   */
  if (middleware.prefixDefault) {
    // लोकेल को सत्यापित करें
    if (!locale || !locales.includes(locale)) {
      // अपडेटेड पथ के साथ डिफ़ॉल्ट लोकेल पर रीडायरेक्ट करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ रैप करें और वर्तमान लोकेल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault झूठा है, तो डिफ़ॉल्ट लोकेल प्रीफिक्स नहीं होता है।
     * सुनिश्चित करें कि वर्तमान लोकेल मान्य है और डिफ़ॉल्ट लोकेल नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // डिफ़ॉल्ट लोकेल को छोड़ दें
        )
        .includes(currentLocale) // जांचें कि वर्तमान लोकेल मान्य लोकेल की सूची में है
    ) {
      // लोकेल प्रीफिक्स के बिना पथ पर रीडायरेक्ट करें
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // बच्चों को IntlayerProvider के साथ रैप करें और वर्तमान लोकेल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

// आवश्यक निर्भरता और कार्यों को आयात करना
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // JSX के लिए आवश्यक

// Intlayer से कॉन्फ़िगरेशन को डीस्ट्रक्चर करना
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
 * यह URL-आधारित स्थानीय पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // वर्तमान स्थानीय निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से स्थानीय उपसर्ग को हटाकर एक आधार पथ बनाएं
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट स्थानीय को हमेशा उपसर्गित किया जाना चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीय को मान्य करें
    if (!locale || !locales.includes(locale)) {
      // अद्यतन पथ के साथ डिफ़ॉल्ट स्थानीय पर पुनर्निर्देशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // वर्तमान इतिहास प्रविष्टि को नई प्रविष्टि से बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान स्थानीय सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault झूठा होता है, तो डिफ़ॉल्ट स्थानीय को उपसर्गित नहीं किया जाता है।
     * सुनिश्चित करें कि वर्तमान स्थानीय मान्य है और डिफ़ॉल्ट स्थानीय नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीय को बाहर करें
        )
        .includes(currentLocale) // जांचें कि वर्तमान स्थानीय मान्य स्थानीय की सूची में है या नहीं
    ) {
      // स्थानीय उपसर्ग के बिना पथ पर पुनर्निर्देशित करें
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान स्थानीय सेट करें
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
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग सेट करता है।
 * यह नेविगेशन का प्रबंधन करने और स्थानीयकृत घटकों को प्रस्तुत करने के लिए preact-iso का उपयोग करता है।
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

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

साथ ही, आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intLayerMiddlewarePlugin` का उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान स्थानीय का स्वतः पता लगाएगा और उपयुक्त स्थानीय कुकी सेट करेगा। यदि कोई स्थानीय निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त स्थानीय निर्धारित करेगा। यदि कोई स्थानीय नहीं मिलता है, तो यह डिफ़ॉल्ट स्थानीय पर पुनर्निर्देशित करेगा।

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

### (वैकल्पिक) चरण 8: जब स्थानीय बदलता है तो URL बदलें

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
      const currentFullPath = location.url; // preact-iso द्वारा पूरा URL प्रदान किया जाता है
      // अपडेटेड लोकेल के साथ URL बनाएं
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // URL पथ को अपडेट करें
      route(pathWithLocale, true); // true का मतलब replace है
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
              // लोकेल सेट करने के बाद प्रोग्रामेटिक नेविगेशन onLocaleChange द्वारा संभाला जाएगा
            }}
            key={localeItem}
          >
            <span>
              {/* लोकेल - जैसे FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकेल में भाषा - जैसे Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकेल में भाषा - जैसे Francés जब वर्तमान लोकेल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - जैसे French */}
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

> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md) (API `preact-intlayer` के लिए समान है)

> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleName.md)

> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocalizedUrl.md)

> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getHTMLTextDir.md)

> - [`hreflang` एट्रिब्यूट](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=hi)

> - [`lang` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

> - [`dir` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

> - [`aria-current` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

---

### (वैकल्पिक) चरण 9: HTML भाषा और दिशा एट्रिब्यूट्स को स्विच करें

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो `<html>` टैग के `lang` और `dir` एट्रिब्यूट्स को वर्तमान लोकेल से मेल खाने के लिए अपडेट करना महत्वपूर्ण है। ऐसा करने से सुनिश्चित होता है:

- **एक्सेसिबिलिटी**: स्क्रीन रीडर्स और सहायक तकनीकें सही `lang` एट्रिब्यूट पर निर्भर करती हैं ताकि सामग्री को सही ढंग से उच्चारित और व्याख्या किया जा सके।
- **पाठ रेंडरिंग**: `dir` (दिशा) एट्रिब्यूट यह सुनिश्चित करता है कि पाठ सही क्रम में प्रस्तुत किया गया है (जैसे, अंग्रेजी के लिए बाएं से दाएं, अरबी या हिब्रू के लिए दाएं से बाएं), जो पठनीयता के लिए आवश्यक है।
- **SEO**: सर्च इंजन आपके पृष्ठ की भाषा निर्धारित करने के लिए `lang` एट्रिब्यूट का उपयोग करते हैं, जिससे खोज परिणामों में सही स्थानीयकृत सामग्री प्रदर्शित करने में मदद मिलती है।

इन एट्रिब्यूट्स को गतिशील रूप से अपडेट करके जब लोकेल बदलता है, तो आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव सुनिश्चित करते हैं।

#### हुक को लागू करना

HTML एट्रिब्यूट्स को प्रबंधित करने के लिए एक कस्टम हुक बनाएं। हुक लोकेल परिवर्तनों को सुनता है और एट्रिब्यूट्स को तदनुसार अपडेट करता है:

import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/\*\*

- वर्तमान लोकेल के आधार पर HTML <html> तत्व के `lang` और `dir` गुणों को अपडेट करता है।
- - `lang`: ब्राउज़रों और सर्च इंजन को पृष्ठ की भाषा की जानकारी देता है।
- - `dir`: सही पढ़ने के क्रम को सुनिश्चित करता है (जैसे, अंग्रेजी के लिए 'ltr', अरबी के लिए 'rtl')।
-
- यह डायनामिक अपडेट सही टेक्स्ट रेंडरिंग, एक्सेसिबिलिटी और SEO के लिए आवश्यक है।
  \*/
  export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

useEffect(() => {
// वर्तमान लोकेल के अनुसार भाषा गुण को अपडेट करें।
document.documentElement.lang = locale;

    // वर्तमान लोकेल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);

}, [locale]);
};

````

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * वर्तमान लोकेल के आधार पर HTML <html> तत्व के `lang` और `dir` गुणों को अपडेट करता है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
````

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * वर्तमान लोकेल के आधार पर HTML <html> तत्व के `lang` और `dir` गुणों को अपडेट करता है।
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

अपने मुख्य घटक में हुक को एकीकृत करें ताकि लोकेल बदलने पर HTML गुण अपडेट हो जाएं:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // यदि AppContent को आवश्यकता हो तो useIntlayer पहले से आयातित है
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Step 5 से AppContent परिभाषा

const AppWithHooks: FunctionalComponent = () => {
  // लोकेल के आधार पर <html> टैग के lang और dir गुणों को अपडेट करने के लिए हुक लागू करें।
  useI18nHTMLAttributes();

  // मान लें कि AppContent आपका मुख्य सामग्री प्रदर्शन घटक है Step 5 से
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
// Step 5 से AppContent परिभाषा

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
// Step 5 से AppContent परिभाषा

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

इन परिवर्तनों को लागू करके, आपका एप्लिकेशन:

- सुनिश्चित करेगा कि **भाषा** (`lang`) गुण सही तरीके से वर्तमान लोकेल को दर्शाता है, जो SEO और ब्राउज़र व्यवहार के लिए महत्वपूर्ण है।
- **पाठ दिशा** (`dir`) को लोकेल के अनुसार समायोजित करेगा, जिससे विभिन्न पढ़ने के क्रम वाली भाषाओं के लिए पठनीयता और उपयोगिता बढ़ेगी।
- एक अधिक **सुलभ** अनुभव प्रदान करेगा, क्योंकि सहायक तकनीकें इन गुणों पर निर्भर करती हैं ताकि वे इष्टतम रूप से कार्य कर सकें।

import { useLocation, route } from "preact-iso"; // preact-iso से आयात करें
import { forwardRef } from "preact/compat";
import { h } from "preact"; // JSX के लिए

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
({ href, children, onClick, replace = false, ...props }, ref) => {
const { locale } = useLocale(); // वर्तमान भाषा प्राप्त करें
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

````

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // preact-iso से आयात करें
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // JSX के लिए

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // वर्तमान भाषा प्राप्त करें
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

module.exports = { LocalizedLink, checkIsExternalLink };
````

#### यह कैसे काम करता है

- **बाहरी लिंक का पता लगाना**:  
  सहायक फ़ंक्शन `checkIsExternalLink` यह निर्धारित करता है कि URL बाहरी है या नहीं। बाहरी लिंक को अपरिवर्तित छोड़ दिया जाता है।
- **वर्तमान भाषा प्राप्त करना**:  
  `useLocale` हुक वर्तमान भाषा प्रदान करता है।
- **URL का स्थानीयकरण करना**:  
  आंतरिक लिंक के लिए, `getLocalizedUrl` URL को वर्तमान भाषा के साथ प्रीफिक्स करता है।
- **क्लाइंट-साइड नेविगेशन**:  
  `handleClick` फ़ंक्शन जांचता है कि क्या यह एक आंतरिक लिंक है और क्या मानक नेविगेशन को रोका जाना चाहिए। यदि हां, तो यह `preact-iso` के `route` फ़ंक्शन का उपयोग करता है (जो `useLocation` के माध्यम से या सीधे आयात किया गया है) क्लाइंट-साइड नेविगेशन करने के लिए। यह पूर्ण पृष्ठ रीलोड के बिना SPA-जैसा व्यवहार प्रदान करता है।
- **लिंक लौटाना**:  
  यह घटक एक `<a>` तत्व लौटाता है जिसमें स्थानीयकृत URL और कस्टम क्लिक हैंडलर होता है।

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript का उपयोग मॉड्यूल वृद्धि के साथ करता है ताकि आपका कोडबेस मजबूत हो सके।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं।

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
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

> सुनिश्चित करें कि आपका `tsconfig.json` Preact के लिए सेटअप है, विशेष रूप से `jsx` और `jsxImportSource` या पुराने Preact संस्करणों के लिए `jsxFactory`/`jsxFragmentFactory` यदि आप `preset-vite` के डिफ़ॉल्ट का उपयोग नहीं कर रहे हैं।

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की सिफारिश की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्न निर्देश जोड़ सकते हैं:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इस पर अधिक विवरण के लिए, [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

### और आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी बना सकते हैं।

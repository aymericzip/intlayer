# इंटलेयर और Vite और React के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करना

## इंटलेयर क्या है?

**इंटलेयर** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

इंटलेयर के साथ, आप कर सकते हैं:

- **आसानी से अनुवाद प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **मेटाडेटा, रूट्स और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

---

## Vite और React एप्लिकेशन में इंटलेयर सेट अप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  पैकेज जो React एप्लिकेशन के साथ इंटलेयर को एकीकृत करता है। यह React अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

- **vite-intlayer**
  [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ इंटलेयर को एकीकृत करने के लिए Vite प्लगइन शामिल करता है, साथ ही उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर भी।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएँ:

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में इंटलेयर लॉग्स को अक्षम करना, और बहुत कुछ सेट कर सकते हैं। उपलब्ध पैरामीटरों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### चरण 3: अपने Vite कॉन्फ़िगरेशन में इंटलेयर को एकीकृत करें

अपने कॉन्फ़िगरेशन में इंटलेयर प्लगइन जोड़ें।

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite प्लगइन का उपयोग Vite के साथ इंटलेयर को एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर इंटलेयर पर्यावरण वेरिएबल्स को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएँ और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      hi: "Vite लोगो",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      hi: "React लोगो",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      hi: "गिनती है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // यदि आप अपनी सामग्री में React नोड का उपयोग करते हैं, तो React आयात करना न भूलें
      hi: (
        <>
          <code>src/App.tsx</code> संपादित करें और HMR का परीक्षण करने के लिए
          सहेजें
        </>
      ),
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
    }),

    readTheDocs: t({
      hi: "अधिक जानने के लिए Vite और React लोगो पर क्लिक करें",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
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
      hi: "Vite लोगो",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      hi: "React लोगो",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      hi: "गिनती है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // यदि आप अपनी सामग्री में React नोड का उपयोग करते हैं, तो React आयात करना न भूलें
        hi: (
          <>
            <code>src/App.tsx</code> संपादित करें और HMR का परीक्षण करने के लिए
            सहेजें
          </>
        ),
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
      },

    readTheDocs: t({
      hi: "अधिक जानने के लिए Vite और React लोगो पर क्लिक करें",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

{
"$schema": "https://intlayer.org/schema.json",
"key": "app",
"content": {
"viteLogo": {
"nodeType": "translation",
"translation": {
"hi": "Vite लोगो",
"en": "Vite logo",
"fr": "Logo Vite",
"es": "Logo Vite"
}
},
"reactLogo": {
"nodeType": "translation",
"translation": {
"hi": "React लोगो",
"en": "React logo",
"fr": "Logo React",
"es": "Logo React"
}
},
"title": {
"nodeType": "translation",
"translation": {
"hi": "Vite + React",
"en": "Vite + React",
"fr": "Vite + React",
"es": "Vite + React"
}
},
"count": {
"nodeType": "translation",
"translation": {
"hi": "गणना है ",
"en": "count is ",
"fr": "le compte est ",
"es": "el recuento es "
}
},
"edit": {
"nodeType": "translation",
"translation": {
"hi": "src/App.tsx संपादित करें और HMR का परीक्षण करने के लिए सहेजें",
"en": "Edit src/App.tsx and save to test HMR",
"fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
"es": "Edita src/App.tsx y guarda para probar HMR"
}
},
"readTheDocs": {
"nodeType": "translation",
"translation": {
"hi": "अधिक जानने के लिए Vite और React लोगो पर क्लिक करें",
"en": "Click on the Vite and React logos to learn more",
"fr": "Cliquez sur les logos Vite et React pour en savoir plus",
"es": "Haga clic en los logotipos de Vite y React para obtener más información"
}
}
}
}

````

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं, जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हैं। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।
> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) देखें।
> यदि आपकी सामग्री फ़ाइल में TSX कोड शामिल है, तो आपको अपनी सामग्री फ़ाइल में `import React from "react";` आयात करने पर विचार करना चाहिए।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुंचें:

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
````

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

> यदि आप अपनी सामग्री को `string` विशेषता में उपयोग करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की भाषा सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.Hindi)}>
      भाषा हिंदी में बदलें
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
    <button onClick={() => setLocale(Locales.Hindi)}>
      भाषा हिंदी में बदलें
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
      भाषा को अंग्रेज़ी में बदलें
    </button>
  );
};
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md) देखें।

### (वैकल्पिक) चरण 7: अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय रूट्स बनाना है। यह SEO और SEO-अनुकूल URLs के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, रूट्स डिफ़ॉल्ट लोकेल के लिए प्रीफिक्स नहीं होते हैं। यदि आप डिफ़ॉल्ट लोकेल को प्रीफिक्स करना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन डॉक्स](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` घटक बना सकते हैं जो आपके एप्लिकेशन के रूट्स को लपेटता है और लोकेल-आधारित रूटिंग को संभालता है। यहाँ [React Router](https://reactrouter.com/home) का उपयोग करते हुए एक उदाहरण है:

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat="typescript"
// आवश्यक डिपेंडेंसी और फ़ंक्शन्स को इम्पोर्ट करना
import { configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से यूटिलिटी फ़ंक्शन्स और प्रकार
import type { FC, PropsWithChildren } from "react"; // फ़ंक्शनल कंपोनेंट्स और प्रॉप्स के लिए React प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रोवाइडर
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन को डेस्ट्रक्चर करना
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त लोकेल संदर्भ के साथ लपेटता है।
 * यह URL-आधारित लोकेल डिटेक्शन और वैलिडेशन का प्रबंधन करता है।
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें

  // वर्तमान लोकेल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से लोकेल प्रीफिक्स को हटाकर एक बेस पथ बनाएं
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट लोकेल को हमेशा प्रीफिक्स किया जाना चाहिए।
   */
  if (middleware.prefixDefault) {
    // लोकेल को वैलिडेट करें
    if (!locale || !locales.includes(locale)) {
      // अपडेटेड पथ के साथ डिफ़ॉल्ट लोकेल पर रीडायरेक्ट करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान लोकेल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault झूठा है, तो डिफ़ॉल्ट लोकेल को प्रीफिक्स नहीं किया जाता है।
     * सुनिश्चित करें कि वर्तमान लोकेल वैध है और डिफ़ॉल्ट लोकेल नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट लोकेल को बाहर करें
        )
        .includes(currentLocale) // जांचें कि वर्तमान लोकेल वैध लोकेल की सूची में है
    ) {
      // लोकेल प्रीफिक्स के बिना पथ पर रीडायरेक्ट करें
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान लोकेल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो लोकेल-विशिष्ट रूट्स सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत घटकों को रेंडर करने के लिए React Router का उपयोग करता है।
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // लोकेल को कैप्चर करने के लिए रूट पैटर्न (जैसे, /en/, /fr/) और सभी सब्सीक्वेंट पथों से मेल खाता है
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // बच्चों को लोकेल प्रबंधन के साथ लपेटता है
          />
        ))}

      {
        // यदि डिफ़ॉल्ट लोकेल को प्रीफिक्स करना अक्षम है, तो बच्चों को सीधे रूट पथ पर रेंडर करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // बच्चों को लोकेल प्रबंधन के साथ लपेटता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// आवश्यक डिपेंडेंसी और फ़ंक्शन्स को इम्पोर्ट करना
import { configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से यूटिलिटी फ़ंक्शन्स और प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रोवाइडर
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन को डेस्ट्रक्चर करना
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त लोकेल संदर्भ के साथ लपेटता है।
 * यह URL-आधारित लोकेल डिटेक्शन और वैलिडेशन का प्रबंधन करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें

  // वर्तमान लोकेल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से लोकेल प्रीफिक्स को हटाकर एक बेस पथ बनाएं
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट लोकेल को हमेशा प्रीफिक्स किया जाना चाहिए।
   */
  if (middleware.prefixDefault) {
    // लोकेल को वैलिडेट करें
    if (!locale || !locales.includes(locale)) {
      // अपडेटेड पथ के साथ डिफ़ॉल्ट लोकेल पर रीडायरेक्ट करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान लोकेल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault झूठा है, तो डिफ़ॉल्ट लोकेल को प्रीफिक्स नहीं किया जाता है।
     * सुनिश्चित करें कि वर्तमान लोकेल वैध है और डिफ़ॉल्ट लोकेल नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट लोकेल को बाहर करें
        )
        .includes(currentLocale) // जांचें कि वर्तमान लोकेल वैध लोकेल की सूची में है
    ) {
      // लोकेल प्रीफिक्स के बिना पथ पर रीडायरेक्ट करें
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान लोकेल सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो लोकेल-विशिष्ट रूट्स सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत घटकों को रेंडर करने के लिए React Router का उपयोग करता है।
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // लोकेल को कैप्चर करने के लिए रूट पैटर्न (जैसे, /en/, /fr/) और सभी उपरांत पथों से मेल खाता है
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // बच्चों को लोकेल प्रबंधन के साथ रैप करता है
          />
        ))}

      {
        // यदि डिफ़ॉल्ट लोकेल को प्रीफिक्स करना अक्षम है, तो बच्चों को सीधे रूट पथ पर रेंडर करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // बच्चों को लोकेल प्रबंधन के साथ रैप करता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// आवश्यक डिपेंडेंसी और फ़ंक्शन्स को इम्पोर्ट करना
const { configuration, getPathWithoutLocale } = require("intlayer"); // 'intlayer' से यूटिलिटी फ़ंक्शन्स और प्रकार
const { IntlayerProvider, useLocale } = require("react-intlayer"); // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रोवाइडर
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन को डीस्ट्रक्चर करना
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त लोकेल संदर्भ के साथ रैप करता है।
 * यह URL-आधारित लोकेल डिटेक्शन और वैलिडेशन को प्रबंधित करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें

  // वर्तमान लोकेल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // पथ से लोकेल प्रीफिक्स को हटाकर एक बेस पथ बनाएं
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट लोकेल को हमेशा प्रीफिक्स किया जाना चाहिए।
   */
  if (middleware.prefixDefault) {
    // लोकेल को वैलिडेट करें
    if (!locale || !locales.includes(locale)) {
      // डिफ़ॉल्ट लोकेल के साथ अपडेटेड पथ पर रीडायरेक्ट करें
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
     * जब middleware.prefixDefault झूठा है, तो डिफ़ॉल्ट लोकेल को प्रीफिक्स नहीं किया जाता है।
     * सुनिश्चित करें कि वर्तमान लोकेल वैध है और डिफ़ॉल्ट लोकेल नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट लोकेल को बाहर करें
        )
        .includes(currentLocale) // जांचें कि वर्तमान लोकेल वैध लोकेल की सूची में है
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

/**
 * एक राउटर घटक जो लोकेल-विशिष्ट रूट्स सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत घटकों को रेंडर करने के लिए React Router का उपयोग करता है।
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // लोकेल को कैप्चर करने के लिए रूट पैटर्न (जैसे, /en/, /fr/) और सभी उपरांत पथों से मेल खाता है
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // बच्चों को लोकेल प्रबंधन के साथ रैप करता है
          />
        ))}

      {
        // यदि डिफ़ॉल्ट लोकेल को प्रीफिक्स करना अक्षम है, तो बच्चों को सीधे रूट पथ पर रेंडर करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // बच्चों को लोकेल प्रबंधन के साथ रैप करता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

फिर, आप अपने एप्लिकेशन में `LocaleRouter` घटक का उपयोग कर सकते हैं:

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

साथ ही, आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intLayerMiddlewarePlugin` का उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान लोकेल का स्वतः पता लगाएगा और उपयुक्त लोकेल कुकी सेट करेगा। यदि कोई लोकेल निर्दिष्ट नहीं है, तो यह उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त लोकेल निर्धारित करेगा। यदि कोई लोकेल नहीं मिली, तो यह डिफ़ॉल्ट लोकेल पर रीडायरेक्ट करेगा।

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (वैकल्पिक) चरण 8: जब लोकेल बदलती है तो URL बदलें

जब लोकेल बदलती है तो URL बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `onLocaleChange` प्रॉप का उपयोग कर सकते हैं। साथ ही, आप URL पथ को अपडेट करने के लिए `react-router-dom` से `useLocation` और `useNavigate` हुक का उपयोग कर सकते हैं।

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

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // अद्यतनित लोकेल के साथ URL का निर्माण करें
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL पथ को अपडेट करें
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
              {/* लोकेल - जैसे FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकेल में भाषा - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकेल में भाषा - जैसे Francés जब वर्तमान लोकेल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
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

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // अद्यतनित लोकेल के साथ URL का निर्माण करें
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL पथ को अपडेट करें
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
              {/* लोकेल - जैसे FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकेल में भाषा - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकेल में भाषा - जैसे Francés जब वर्तमान लोकेल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
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

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // अद्यतनित लोकेल के साथ URL का निर्माण करें
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL पथ को अपडेट करें
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
              {/* लोकेल - जैसे FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकेल में भाषा - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकेल में भाषा - जैसे Francés जब वर्तमान लोकेल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे French */}
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
> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` एट्रिब्यूट](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### (वैकल्पिक) चरण 9: HTML भाषा और दिशा एट्रिब्यूट्स को स्विच करें

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो `<html>` टैग के `lang` और `dir` एट्रिब्यूट्स को वर्तमान लोकेल के अनुसार अपडेट करना महत्वपूर्ण है। ऐसा करने से यह सुनिश्चित होता है:

- **एक्सेसिबिलिटी**: स्क्रीन रीडर्स और सहायक तकनीकें सही `lang` एट्रिब्यूट पर निर्भर करती हैं ताकि सामग्री को सही ढंग से उच्चारित और व्याख्या किया जा सके।
- **पाठ रेंडरिंग**: `dir` (दिशा) एट्रिब्यूट यह सुनिश्चित करता है कि पाठ सही क्रम में प्रस्तुत किया गया है (जैसे, अंग्रेजी के लिए बाएं से दाएं, अरबी या हिब्रू के लिए दाएं से बाएं), जो पठनीयता के लिए आवश्यक है।
- **एसईओ**: सर्च इंजन आपके पृष्ठ की भाषा निर्धारित करने के लिए `lang` एट्रिब्यूट का उपयोग करते हैं, जिससे खोज परिणामों में सही स्थानीयकृत सामग्री प्रदर्शित करने में मदद मिलती है।

इन एट्रिब्यूट्स को गतिशील रूप से अपडेट करके जब लोकेल बदलता है, तो आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव सुनिश्चित करते हैं।

#### हुक को लागू करना

HTML एट्रिब्यूट्स को प्रबंधित करने के लिए एक कस्टम हुक बनाएं। हुक लोकेल परिवर्तनों को सुनता है और एट्रिब्यूट्स को तदनुसार अपडेट करता है:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

 * HTML <html> तत्व के `lang` और `dir` गुणों को वर्तमान लोकेल के आधार पर अपडेट करता है।
 * - `lang`: ब्राउज़र और सर्च इंजन को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने की दिशा सुनिश्चित करता है (जैसे, अंग्रेजी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट सही टेक्स्ट रेंडरिंग, एक्सेसिबिलिटी और SEO के लिए आवश्यक है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा गुण को वर्तमान लोकेल में अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकेल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * HTML <html> तत्व के `lang` और `dir` गुणों को वर्तमान लोकेल के आधार पर अपडेट करता है।
 * - `lang`: ब्राउज़र और सर्च इंजन को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने की दिशा सुनिश्चित करता है (जैसे, अंग्रेजी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट सही टेक्स्ट रेंडरिंग, एक्सेसिबिलिटी और SEO के लिए आवश्यक है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा गुण को वर्तमान लोकेल में अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकेल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * HTML <html> तत्व के `lang` और `dir` गुणों को वर्तमान लोकेल के आधार पर अपडेट करता है।
 * - `lang`: ब्राउज़र और सर्च इंजन को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने की दिशा सुनिश्चित करता है (जैसे, अंग्रेजी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट सही टेक्स्ट रेंडरिंग, एक्सेसिबिलिटी और SEO के लिए आवश्यक है।
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा गुण को वर्तमान लोकेल में अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकेल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### अपने एप्लिकेशन में हुक का उपयोग करना

अपने मुख्य घटक में हुक को एकीकृत करें ताकि HTML गुण हर बार लोकेल बदलने पर अपडेट हो जाएं:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // हुक को लागू करें ताकि <html> टैग के lang और dir गुण लोकेल के आधार पर अपडेट हो जाएं।
  useI18nHTMLAttributes();

  // ... आपके घटक का बाकी हिस्सा
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
  // हुक को लागू करें ताकि <html> टैग के lang और dir गुण लोकेल के आधार पर अपडेट हो जाएं।
  useI18nHTMLAttributes();

  // ... आपके घटक का बाकी हिस्सा
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
  // हुक को लागू करें ताकि <html> टैग के lang और dir गुण लोकेल के आधार पर अपडेट हो जाएं।
  useI18nHTMLAttributes();

  // ... आपके घटक का बाकी हिस्सा
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

इन परिवर्तनों को लागू करके, आपका एप्लिकेशन:

- सुनिश्चित करेगा कि **भाषा** (`lang`) गुण वर्तमान लोकेल को सही तरीके से दर्शाता है, जो SEO और ब्राउज़र व्यवहार के लिए महत्वपूर्ण है।
- लोकेल के अनुसार **टेक्स्ट दिशा** (`dir`) को समायोजित करेगा, जिससे विभिन्न पढ़ने के आदेश वाली भाषाओं के लिए पठनीयता और उपयोगिता बढ़ेगी।
- एक अधिक **सुलभ** अनुभव प्रदान करेगा, क्योंकि सहायक तकनीकें इन गुणों पर निर्भर करती हैं ताकि वे इष्टतम रूप से कार्य कर सकें।

### (वैकल्पिक) चरण 10: एक स्थानीयकृत लिंक घटक बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन का नेविगेशन वर्तमान लोकेल का सम्मान करता है, आप एक कस्टम `Link` घटक बना सकते हैं। यह घटक स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ प्रीफिक्स करता है, ताकि। उदाहरण के लिए, जब एक फ्रेंच-भाषी उपयोगकर्ता "About" पेज के लिंक पर क्लिक करता है, तो उन्हें `/fr/about` पर रीडायरेक्ट किया जाता है, न कि `/about` पर।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL सर्च इंजन को भाषा-विशिष्ट पृष्ठों को सही तरीके से इंडेक्स करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: अपने एप्लिकेशन में स्थानीयकृत लिंक का उपयोग करके, आप यह गारंटी देते हैं कि नेविगेशन वर्तमान लोकेल के भीतर रहता है, अप्रत्याशित भाषा स्विच को रोकता है।
- **रखरखाव**: URL प्रबंधन को एक ही घटक में केंद्रीकृत करके, आप अपने कोडबेस को सरल बनाते हैं, जिससे आपके एप्लिकेशन के बढ़ने के साथ इसे बनाए रखना और विस्तारित करना आसान हो जाता है।

नीचे टाइपस्क्रिप्ट में एक स्थानीयकृत `Link` घटक का कार्यान्वयन दिया गया है:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * यह जांचने के लिए उपयोगिता फ़ंक्शन कि क्या दिया गया URL बाहरी है।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link घटक जो वर्तमान लोकेल के आधार पर href गुण को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह URL को लोकेल के साथ प्रीफिक्स करने के लिए `getLocalizedUrl` का उपयोग करता है (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन एक ही लोकेल संदर्भ के भीतर रहता है।
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
 * यह जांचने के लिए उपयोगिता फ़ंक्शन कि क्या दिया गया URL बाहरी है।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link घटक जो वर्तमान लोकेल के आधार पर href गुण को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह URL को लोकेल के साथ प्रीफिक्स करने के लिए `getLocalizedUrl` का उपयोग करता है (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन एक ही लोकेल संदर्भ के भीतर रहता है।
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * यह उपयोगिता फ़ंक्शन यह जांचने के लिए है कि दी गई URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम लिंक घटक जो वर्तमान लोकेल के आधार पर href विशेषता को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह URL को लोकेल के साथ प्रीफ़िक्स करने के लिए `getLocalizedUrl` का उपयोग करता है (जैसे, /hi/about)।
 * यह सुनिश्चित करता है कि नेविगेशन समान लोकेल संदर्भ में बना रहे।
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
  सहायक फ़ंक्शन `checkIsExternalLink` यह निर्धारित करता है कि कोई URL बाहरी है या नहीं। बाहरी लिंक अपरिवर्तित रहते हैं क्योंकि उन्हें स्थानीयकरण की आवश्यकता नहीं होती।

- **वर्तमान लोकेल प्राप्त करना**:  
  `useLocale` हुक वर्तमान लोकेल प्रदान करता है (जैसे, `hi` हिंदी के लिए)।

- **URL का स्थानीयकरण करना**:  
  आंतरिक लिंक (यानी, गैर-बाहरी) के लिए, `getLocalizedUrl` का उपयोग स्वचालित रूप से URL को वर्तमान लोकेल के साथ प्रीफ़िक्स करने के लिए किया जाता है। इसका मतलब है कि यदि आपका उपयोगकर्ता हिंदी में है, तो `/about` को `href` के रूप में पास करने से यह `/hi/about` में बदल जाएगा।

- **लिंक लौटाना**:  
  घटक एक `<a>` तत्व को स्थानीयकृत URL के साथ लौटाता है, यह सुनिश्चित करते हुए कि नेविगेशन लोकेल के साथ सुसंगत है।

इस `Link` घटक को अपने एप्लिकेशन में एकीकृत करके, आप एक सुसंगत और भाषा-जागरूक उपयोगकर्ता अनुभव बनाए रखते हैं, साथ ही बेहतर SEO और उपयोगिता का लाभ उठाते हैं।

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल वृद्धि का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // आपकी कस्टम कॉन्फ़िगरेशन
  "include": [
    "src",
    "types", // <- स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल वृद्धि का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसा की जाती है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी बना सकते हैं।

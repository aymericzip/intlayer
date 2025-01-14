# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## What is Intlayer?

**Intlayer** एक नवोन्मेषी, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) पुस्तकालय है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **आसान तरीके से अनुवाद प्रबंधित करें** घटक स्तर पर वैकल्पिक शब्दकोशों का उपयोग करके।
- **गतिशील रूप से मेटाडेटा**, मार्गों और सामग्री का स्थानीयकरण करें।
- **Typescript समर्थन सुनिश्चित करें** स्वचालित प्रकारों के साथ, स्वचालित पूर्णता और त्रुटि पहचान में सुधार।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील स्थानीयकरण पहचान और स्विचिंग।

---

## Step-by-Step Guide to Set Up Intlayer in a Vite and React Application

### Step 1: Install Dependencies

npm का उपयोग करते हुए आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md), ट्रांसपाइलिंग, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  पैकेज जो Intlayer को React अनुप्रयोग के साथ एकीकृत करता है। यह React अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाताओं और हुक प्रदान करता है। इसके अतिरिक्त, यह [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ Intlayer को एकीकृत करने के लिए Vite प्लगइन प्रदान करता है, साथ ही उपयोगकर्ता के पसंदीदा स्थानीयकरण का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल है।

### Step 2: Configuration of your project

अपने आवेदन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपके अन्य स्थानीयकरण
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
      // आपके अन्य स्थानीयकरण
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
      // आपके अन्य स्थानीयकरण
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीय यूआरएल को सेट अप कर सकते हैं, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में Intlayer लॉग को निष्क्रिय करें, और अधिक। उपलब्ध पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) पर जाएं।

### Step 3: Integrate Intlayer in Your Vite Configuration

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण और विकास मोड में उनकी निगरानी को सुनिश्चित करता है। यह Vite अनुप्रयोग के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### Step 4: Declare Your Content

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import type { ReactNode } from "react";

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

    edit: t<ReactNode>({
      // यदि आप अपनी सामग्री में एक React नोड का उपयोग कर रहे हैं तो React को आयात करना न भूलें
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
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
        // यदि आप अपनी सामग्री में एक React नोड का उपयोग कर रहे हैं तो React को आयात करना न भूलें
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
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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
        // यदि आप अपनी सामग्री में एक React नोड का उपयोग कर रहे हैं तो React को आयात करना न भूलें
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
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके अनुप्रयोग में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` डाइरेक्टरी (डिफ़ॉल्ट रूप से, `./src`) में शामिल होती हैं। और सामग्री घोषणा फ़ाइल के विस्तार से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{ts,tsx,js,jsx,mjs,cjs}`)।
> अधिक जानकारी के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) पर जाएं।
> यदि आपकी सामग्री फ़ाइल में TSX कोड शामिल है, तो आपको अपने सामग्री फ़ाइल में `import React from "react";` आयात करने पर विचार करना चाहिए।

### Step 5: Utilize Intlayer in Your Code

अपने अनुप्रयोग में अपने सामग्री शब्दकोशों तक पहुंचें:

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

> यदि आप अपनी सामग्री को एक `string` विशेषता, जैसे `alt`, `title`, `href`, `aria-label`, आदि में उपयोग करना चाहते हैं, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayer.md) पर जाएं।

### (Optional) Step 6: Change the language of your content

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको अनुप्रयोग की स्थानीयकरण सेट करने और उसी के अनुसार सामग्री को अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
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
      Change Language to English
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
      Change Language to English
    </button>
  );
};
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md) पर जाएं।

### (Optional) Step 7: Add localized Routing to your application

इस कदम का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय मार्ग बनाना है। यह SEO और SEO-अनुकूल URLs के लिए उपयोगी है। उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, मार्गों को डिफ़ॉल्ट स्थानीयकरण के लिए पूर्वप्रारंभित नहीं किया जाता है। यदि आप डिफ़ॉल्ट स्थानीयकरण को पूर्वप्रारंभित करना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) पर जाएं।

अपने अनुप्रयोग में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` घटक बना सकते हैं जो आपके अनुप्रयोग के मार्गों को लपेटता है और स्थानीयकरण-आधारित रूटिंग को संभालता है। यहाँ [React Router](https://reactrouter.com/home) का उपयोग करके एक उदाहरण है:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// आवश्यक निर्भरता और कार्यों को आयात कर रहे हैं
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से उपयोगिता कार्य और प्रकार
import type { FC, PropsWithChildren } from "react"; // कार्यात्मक घटकों और प्रॉप्स के लिए React प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतरराष्ट्रीयकरण संदर्भ के लिए प्रदाता
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन का विघटन
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // वर्तमान URL पथ प्राप्त कर रहा है
  const { locale } = useParams<{ locale: Locales }>(); // URL से स्थानीय पैरामीटर निकालना

  // वर्तमान स्थानीयकरण निर्धारित करना, यदि प्रदान नहीं किया गया तो डिफ़ॉल्ट पर वापस लौटना
  const currentLocale = locale ?? defaultLocale;

  // पथ से स्थानीय प्रीफिक्स को हटाना
  const pathWithoutLocale = getPathWithoutLocale(
    path // वर्तमान URL पथ
  );

  /**
   * जब middleware.prefixDefault सत्य हो, तो डिफ़ॉल्ट स्थानीयकरण हमेशा पूर्वप्रारंभित होना चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीयकरण की मान्यता करना
    if (!locale || !locales.includes(locale)) {
      // अद्यतन पथ के साथ डिफ़ॉल्ट स्थानीयकरण पर पुनर्निर्देशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ प्रतिस्थापित करें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटना और वर्तमान स्थानीयकरण सेट करना
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault असत्य हो, तो डिफ़ॉल्ट स्थानीयकरण को पूर्वप्रारंभित नहीं किया जाता है।
     * यह सुनिश्चित करें कि वर्तमान स्थानीयकरण मान्य है और डिफ़ॉल्ट स्थानीयकरण नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीयकरण को बाहर करना
        )
        .includes(currentLocale) // मान्य स्थानीयकरण की सूची में वर्तमान स्थानीयकरण की जांच करना
    ) {
      // स्थानीय प्रीफिक्स के बिना पथ पर पुनर्निर्देशित करें
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider के साथ बच्चों को लपेटना और वर्तमान स्थानीयकरण सेट करना
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग स्थापित करता है।
 * यह React Router का उपयोग करके नेविगेशन का प्रबंधन करता है और स्थानीयकृत घटकों को रेंडर करता है।
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // मार्ग पैटर्न जो स्थानीयकरण को पकड़ता है (जैसे, /en/, /fr/) और सभी आगे के पथों से मेल खाता है
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // स्थानीयकरण प्रबंधन के साथ बच्चों को लपेटना
      />

      {
        // यदि डिफ़ॉल्ट स्थानीयकरण को पूर्वप्रारंभित करना बंद कर दिया गया है, तो रूट पथ पर बच्चों को सीधे रेंडर करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // स्थानीयकरण प्रबंधन के साथ बच्चों को लपेटना
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// आवश्यक निर्भरता और कार्यों को आयात कर रहे हैं
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से उपयोगिता कार्य और प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतरराष्ट्रीयकरण संदर्भ के लिए प्रदाता
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन का विघटन
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // वर्तमान URL पथ प्राप्त कर रहा है
  const { locale } = useParams(); // URL से स्थानीय पैरामीटर निकालना

  // वर्तमान स्थानीयकरण निर्धारित करना, यदि प्रदान नहीं किया गया तो डिफ़ॉल्ट पर वापस लौटना
  const currentLocale = locale ?? defaultLocale;

  // पथ से स्थानीय प्रीफिक्स को हटाना
  const pathWithoutLocale = getPathWithoutLocale(
    path // वर्तमान URL पथ
  );

  /**
   * जब middleware.prefixDefault सत्य हो, तो डिफ़ॉल्ट स्थानीयकरण हमेशा पूर्वप्रारंभित होना चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीयकरण की मान्यता करना
    if (!locale || !locales.includes(locale)) {
      // अद्यतन पथ के साथ डिफ़ॉल्ट स्थानीयकरण पर पुनर्निर्देशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ प्रतिस्थापित करें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटना और वर्तमान स्थानीयकरण सेट करना
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault असत्य हो, तो डिफ़ॉल्ट स्थानीयकरण को पूर्वप्रारंभित नहीं किया जाता है।
     * यह सुनिश्चित करें कि वर्तमान स्थानीयकरण मान्य है और डिफ़ॉल्ट स्थानीयकरण नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीयकरण को बाहर करना
        )
        .includes(currentLocale) // मान्य स्थानीयकरण की सूची में वर्तमान स्थानीयकरण की जांच करना
    ) {
      // स्थानीय प्रीफिक्स के बिना पथ पर पुनर्निर्देशित करें
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider के साथ बच्चों को लपेटना और वर्तमान स्थानीयकरण सेट करना
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग स्थापित करता है।
 * यह React Router का उपयोग करके नेविगेशन का प्रबंधन करता है और स्थानीयकृत घटकों को रेंडर करता है।
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // मार्ग पैटर्न जो स्थानीयकरण को पकड़ता है (जैसे, /en/, /fr/) और सभी आगे के पथों से मेल खाता है
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // स्थानीयकरण प्रबंधन के साथ बच्चों को लपेटना
      />

      {
        // यदि डिफ़ॉल्ट स्थानीयकरण को पूर्वप्रारंभित करना बंद कर दिया गया है, तो रूट पथ पर बच्चों को सीधे रेंडर करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // स्थानीयकरण प्रबंधन के साथ बच्चों को लपेटना
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// आवश्यक निर्भरता और कार्यों को आयात कर रहे हैं
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // 'intlayer' से उपयोगिता कार्य और प्रकार
const { IntlayerProvider, useLocale } = require("react-intlayer"); // अंतरराष्ट्रीयकरण संदर्भ के लिए प्रदाता
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन का विघटन
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // वर्तमान URL पथ प्राप्त कर रहा है
  const { locale } = useParams(); // URL से स्थानीय पैरामीटर निकालना

  // वर्तमान स्थानीयकरण निर्धारित करना, यदि प्रदान नहीं किया गया तो डिफ़ॉल्ट पर वापस लौटना
  const currentLocale = locale ?? defaultLocale;

  // पथ से स्थानीय प्रीफिक्स को हटाना
  const pathWithoutLocale = getPathWithoutLocale(
    path // वर्तमान URL पथ
  );

  /**
   * जब middleware.prefixDefault सत्य हो, तो डिफ़ॉल्ट स्थानीयकरण हमेशा पूर्वप्रारंभित होना चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीयकरण की मान्यता करना
    if (!locale || !locales.includes(locale)) {
      // अद्यतन पथ के साथ डिफ़ॉल्ट स्थानीयकरण पर पुनर्निर्देशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ प्रतिस्थापित करें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटना और वर्तमान स्थानीयकरण सेट करना
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault असत्य हो, तो डिफ़ॉल्ट स्थानीयकरण को पूर्वप्रारंभित नहीं किया जाता है।
     * यह सुनिश्चित करें कि वर्तमान स्थानीयकरण मान्य है और डिफ़ॉल्ट स्थानीयकरण नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीयकरण को बाहर करना
        )
        .includes(currentLocale) // मान्य स्थानीयकरण की सूची में वर्तमान स्थानीयकरण की जांच करना
    ) {
      // स्थानीय प्रीफिक्स के बिना पथ पर पुनर्निर्देशित करें
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider के साथ बच्चों को लपेटना और वर्तमान स्थानीयकरण सेट करना
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग स्थापित करता है।
 * यह React Router का उपयोग करके नेविगेशन का प्रबंधन करता है और स्थानीयकृत घटकों को रेंडर करता है।
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // मार्ग पैटर्न जो स्थानीयकरण को पकड़ता है (जैसे, /en/, /fr/) और सभी आगे के पथों से मेल खाता है
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // स्थानीयकरण प्रबंधन के साथ बच्चों को लपेटना
      />

      {
        // यदि डिफ़ॉल्ट स्थानीयकरण को पूर्वप्रारंभित करना बंद कर दिया गया है, तो रूट पथ पर बच्चों को सीधे रेंडर करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // स्थानीयकरण प्रबंधन के साथ बच्चों को लपेटना
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

साथ ही, आप अपने अनुप्रयोग के लिए सर्वर-साइड रूटिंग जोड़ने के लिए `intLayerMiddlewarePlugin` का उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान स्थानीयकरण का पता लगाने और उपयुक्त स्थानीयकरण कुकी सेट करने का काम करता है। यदि कोई स्थानीयकरण निर्दिष्ट नहीं किया गया है, तो यह उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त स्थानीयकरण निर्धारित करेगा। यदि कोई स्थानीयकरण नहीं मिलता है, तो यह डिफ़ॉल्ट स्थानीयकरण पर पुनर्निर्देशित करेगा।

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const {
  intlayerPlugin,
  intLayerMiddlewarePlugin,
} = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Step 8: Change the URL when the locale changes

जब स्थानीयकरण बदलता है, तो URL बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `onLocaleChange` प्रॉप का उपयोग कर सकते हैं। इसके साथ ही, आप URL पथ को अपडेट करने के लिए `react-router-dom` से `useLocation` और `useNavigate` हुक का उपयोग कर सकते हैं।

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
  const location = useLocation(); // वर्तमान URL पथ प्राप्त कर रहा है। उदाहरण: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // अद्यतन स्थानीयकरण के साथ URL का निर्माण करना
    // उदाहरण: /es/about जबकि स्थानीयकरण स्पेनिश पर सेट हो
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL पथ को अपडेट करना
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी खुद की स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे फ्रेंच जब वर्तमान स्थानीयता Locales.SPANISH पर सेट होती है */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी खुद की स्थानीयता में भाषा - जैसे FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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
  const location = useLocation(); // वर्तमान URL पथ प्राप्त कर रहा है। उदाहरण: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // अद्यतन स्थानीयकरण के साथ URL का निर्माण करना
    // उदाहरण: /es/about जबकि स्थानीयकरण स्पेनिश पर सेट हो
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL पथ को अपडेट करना
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी खुद की स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे फ्रेंच जब वर्तमान स्थानीयता Locales.SPANISH पर सेट होती है */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी खुद की स्थानीयता में भाषा - जैसे FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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
  const location = useLocation(); // वर्तमान URL पथ प्राप्त कर रहा है। उदाहरण: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // अद्यतन स्थानीयकरण के साथ URL का निर्माण करना
    // उदाहरण: /es/about जबकि स्थानीयकरण स्पेनिश पर सेट हो
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL पथ को अपडेट करना
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी खुद की स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे फ्रेंच जब वर्तमान स्थानीयता Locales.SPANISH पर सेट होती है */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी खुद की स्थानीयता में भाषा - जैसे FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> दस्तावेज़ संदर्भ:
>
> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` विशेषता](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` विशेषता](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` विशेषता](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` विशेषता](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configure TypeScript

Intlayer अपने कोडबेस को मजबूत बनाने और TypeScript के लाभ प्राप्त करने के लिए मॉड्यूल संवर्धन का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

यह सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // आपकी कस्टम कॉन्फ़िगरेशन
  "include": [
    "src",
    "types", // <- स्वत: उत्पन्न प्रकारों को शामिल करें
  ],
}
```

### Git Configuration

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करना अनुशंसित है। इससे आप उन्हें अपने Git संग्रह में कमिट करने से बच सकते हैं।

इसके लिए, आप अपने `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext
# Ignore the files generated by Intlayer
.intlayer
```

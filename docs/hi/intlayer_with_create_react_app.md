# प्रारंभ करना अंतरराष्ट्रीयकरण (i18n) Intlayer और React Create App के साथ

## Intlayer क्या है?

**Intlayer** एक नवीन, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जो आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन की गई है।

Intlayer के साथ, आप:

- **आसानी से अनुवाद प्रबंधित करें** पहले से निर्धारित शब्दकोशों का उपयोग करके।
- **गतिशील रूप से मेटाडेटा, मार्गों और सामग्री का स्थानीयकरण करें।**
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित प्रकारों के साथ, ऑटो-पूर्णता और त्रुटि पहचान में सुधार करें।
- **उन्नत सुविधाओं से लाभ प्राप्त करें**, जैसे गतिशील स्थानीयकरण पहचान और स्विचिंग।

---

## React अनुप्रयोग में Intlayer सेट अप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेजों को स्थापित करें:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**

  पैकेज जो Intlayer को React अनुप्रयोग के साथ एकीकृत करता है। यह React अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अलावा, यह Create React App आधारित अनुप्रयोग के साथ Intlayer को एकीकृत करने के लिए प्लगइन शामिल करता है।

### चरण 2: आपके प्रोजेक्ट की कॉन्फ़िगरेशन

अपने अनुप्रयोग की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपके अन्य स्थानीय
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
      // आपके अन्य स्थानीय
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
      // आपके अन्य स्थानीय
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URLs, मिडलवेयर पुनर्निर्देशन, कुकी नामों, आपकी सामग्री घोषणाओं के स्थान और विस्तार को सेट कर सकते हैं, Intlayer लॉग को कंसोल में बंद कर सकते हैं, और अधिक। उपलब्ध पैरामीटर की पूर्ण सूची के लिए, [कॉन्फ़िगरेशन डोक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### चरण 3: अपने CRA कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने स्क्रिप्ट्स को react-intlayer का उपयोग करने के लिए बदलें

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer` स्क्रिप्ट्स [craco](https://craco.js.org/) पर आधारित हैं। आप intlayer craco प्लगइन के आधार पर अपनी स्वयं की सेटअप भी कार्यान्वित कर सकते हैं। [यहां उदाहरण देखें](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### चरण 4: अपनी सामग्री की घोषणा करें

अनुवाद संग्रहित करने के लिए अपनी सामग्री की घोषणाओं को बनाएं और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> आपकी सामग्री की घोषणाएँ आपके अनुप्रयोग में कहीं भी निर्धारित की जा सकती हैं जब तक कि उन्हें `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल किया गया हो। और सामग्री घोषणा फ़ाइल का विस्तार से मेल खाता है (डिफ़ॉल्ट रूप से, `.content.{ts,tsx,js,jsx,mjs,cjs}`)।
> अधिक विवरण के लिए, [सामग्री घोषणा डोक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) देखें।
> यदि आपकी सामग्री फ़ाइल में TSX कोड शामिल है, तो आपको अपनी सामग्री फ़ाइल में `import React from "react";` आयात करने पर विचार करना चाहिए।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने अनुप्रयोग में अपनी सामग्री शब्दकोशों तक पहुँचें:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> नोट: यदि आप अपने सामग्री को एक `string` गुण में, जैसे कि `alt`, `title`, `href`, `aria-label`, आदि में उपयोग करना चाहते हैं, तो आपको फ़ंक्शन का मान कॉल करना होगा, जैसे:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [डोक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन अनुप्रयोग की स्थानीयकरण सेट करने और सामग्री को तदनुसार अद्यतन करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
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

> `useLocale` हुक के बारे में अधिक जानने के लिए, [डोक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md) देखें।

### (वैकल्पिक) चरण 7: अपने अनुप्रयोग में स्थानीयकृत रूटिंग जोड़ें

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय मार्ग बनाना है। यह SEO और SEO-अनुकूल URLs के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, मार्गों के लिए डिफ़ॉल्ट स्थानीयकृत नहीं होते। यदि आप डिफ़ॉल्ट स्थानीयकरण को पूर्ववर्ती बनाना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन डोक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

अपने अनुप्रयोग में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` घटक बना सकते हैं जो आपके अनुप्रयोग के मार्गों को लपेटता है और स्थानीयकरण-आधारित रूटिंग को संभालता है। यहां [React Router](https://reactrouter.com/home) का उपयोग करते हुए एक उदाहरण है:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// आवश्यक निर्भरताएँ और फ़ंक्शन आयात करना
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से उपयोगिता फ़ंक्शन और प्रकार
import type { FC, PropsWithChildren } from "react"; // कार्यात्मक घटक और गुणों के लिए React प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतरराष्ट्रीयकरण संदर्भ के लिए प्रदाता
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन का विघटन करना
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उचित स्थानीय सामग्री के साथ लपेटता है।
 * यह URL-आधारित स्थानीयकरण पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // वर्तमान URL पथ प्राप्त करें
  const { locale } = useParams<{ locale: Locales }>(); // URL से स्थानीयता पैरा को निचोड़ें

  // वर्तमान स्थानीयता निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर लौटें
  const currentLocale = locale ?? defaultLocale;

  // आधार पथ बनाने के लिए पथ से स्थानीयता पूर्ववर्ती को हटाएँ
  const pathWithoutLocale = getPathWithoutLocale(
    path // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault true है, तो डिफ़ॉल्ट स्थानीयता हमेशा पूर्ववर्ती होनी चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीयता मान्य करें
    if (!locale || !locales.includes(locale)) {
      // अद्यतन पथ के साथ डिफ़ॉल्ट स्थानीयता पर पुनर्निदेशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // नए एक के साथ वर्तमान इतिहास प्रविष्टि को बदलें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीयता सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault false है, तो डिफ़ॉल्ट स्थानीयता पूर्ववर्ती नहीं होती।
     * सुनिश्चित करें कि वर्तमान स्थानीयता मान्य है और डिफ़ॉल्ट स्थानीयता नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीयता को छोड़ दें
        )
        .includes(currentLocale) // सुनिश्चित करें कि वर्तमान स्थानीयता मान्य स्थानीयताओं की सूची में है
    ) {
      // पूर्ववर्ती के बिना पथ पर पुनर्निदेशित करें
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीयता सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्गों को सेट करता है।
 * यह नेविगेशन को प्रबंधित करने और स्थानीयकृत घटकों को प्रस्तुत करने के लिए React Router का उपयोग करता है।
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // मार्ग पैटर्न जो स्थानीयता को कैप्चर करता है (जैसे, /en/, /fr/) और सभी अगले पथों से मेल खाता है
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // स्थानीय प्रबंधन के साथ बच्चों को लपेटता है
      />

      {
        // यदि डिफ़ॉल्ट स्थानीयता को पूर्ववर्ती बनाना बंद कर दिया गया है, तो रूट पथ पर सीधे बच्चों को प्रस्तुत करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // स्थानीय प्रबंधन के साथ बच्चों को लपेटता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// आवश्यक निर्भरताएँ और फ़ंक्शन आयात करना
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से उपयोगिता फ़ंक्शन और प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतरराष्ट्रीयकरण संदर्भ के लिए प्रदाता
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन का विघटन करना
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उचित स्थानीय सामग्री के साथ लपेटता है।
 * यह URL-आधारित स्थानीयकरण पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // वर्तमान URL पथ प्राप्त करें
  const { locale } = useParams(); // URL से स्थानीयता पैरा को निचोड़ें

  // वर्तमान स्थानीयता निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर लौटें
  const currentLocale = locale ?? defaultLocale;

  // आधार पथ बनाने के लिए पथ से स्थानीयता पूर्ववर्ती को हटाएँ
  const pathWithoutLocale = getPathWithoutLocale(
    path // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सही है, तो डिफ़ॉल्ट स्थानीयता हमेशा पूर्ववर्ती होनी चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीयता मान्य करें
    if (!locale || !locales.includes(locale)) {
      // अद्यतन पथ के साथ डिफ़ॉल्ट स्थानीयता पर पुनर्निदेशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // नए एक के साथ वर्तमान इतिहास प्रविष्टि को बदलें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीयता सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault गलत है, तो डिफ़ॉल्ट स्थानीयता पूर्ववर्ती नहीं होती।
     * सुनिश्चित करें कि वर्तमान स्थानीयता मान्य है और डिफ़ॉल्ट स्थानीयता नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीयता को छोड़ दें
        )
        .includes(currentLocale) // सुनिश्चित करें कि वर्तमान स्थानीयता मान्य स्थानीयताओं की सूची में है
    ) {
      // पूर्ववर्ती के बिना पथ पर पुनर्निदेशित करें
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीयता सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्गों को सेट करता है।
 * यह नेविगेशन को प्रबंधित करने और स्थानीयकृत घटकों को प्रस्तुत करने के लिए React Router का उपयोग करता है।
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // मार्ग पैटर्न जो स्थानीयता को कैप्चर करता है (जैसे, /en/, /fr/) और सभी अगले पथों से मेल खाता है
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // स्थानीय प्रबंधन के साथ बच्चों को लपेटता है
      />

      {
        // यदि डिफ़ॉल्ट स्थानीयता को पूर्ववर्ती बनाना बंद कर दिया गया है, तो रूट पथ पर सीधे बच्चों को प्रस्तुत करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // स्थानीय प्रबंधन के साथ बच्चों को लपेटता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// आवश्यक निर्भरताएँ और फ़ंक्शन आयात करना
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // 'intlayer' से उपयोगिता फ़ंक्शन और प्रकार
const { IntlayerProvider, useLocale } = require("react-intlayer"); // अंतरराष्ट्रीयकरण संदर्भ के लिए प्रदाता
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन का विघटन करना
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उचित स्थानीय सामग्री के साथ लपेटता है।
 * यह URL-आधारित स्थानीयकरण पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // वर्तमान URL पथ प्राप्त करें
  const { locale } = useParams(); // URL से स्थानीयता पैरा को निचोड़ें

  // वर्तमान स्थानीयता निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर लौटें
  const currentLocale = locale ?? defaultLocale;

  // आधार पथ बनाने के लिए पथ से स्थानीयता पूर्ववर्ती को हटाएँ
  const pathWithoutLocale = getPathWithoutLocale(
    path // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सही है, तो डिफ़ॉल्ट स्थानीयता हमेशा पूर्ववर्ती होनी चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीयता मान्य करें
    if (!locale || !locales.includes(locale)) {
      // अद्यतन पथ के साथ डिफ़ॉल्ट स्थानीयता पर पुनर्निदेशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // नए एक के साथ वर्तमान इतिहास प्रविष्टि को बदलें
        />
      );
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीयता सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault गलत है, तो डिफ़ॉल्ट स्थानीयता पूर्ववर्ती नहीं होती।
     * सुनिश्चित करें कि वर्तमान स्थानीयता मान्य है और डिफ़ॉल्ट स्थानीयता नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीयता को छोड़ दें
        )
        .includes(currentLocale) // सुनिश्चित करें कि वर्तमान स्थानीयता मान्य स्थानीयताओं की सूची में है
    ) {
      // पूर्ववर्ती के बिना पथ पर पुनर्निदेशित करें
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider के साथ बच्चों को लपेटें और वर्तमान स्थानीयता सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्गों को सेट करता है।
 * यह नेविगेशन को प्रबंधित करने और स्थानीयकृत घटकों को प्रस्तुत करने के लिए React Router का उपयोग करता है।
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // मार्ग पैटर्न जो स्थानीयता को कैप्चर करता है (जैसे, /en/, /fr/) और सभी अगले पथों से मेल खाता है
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // स्थानीय प्रबंधन के साथ बच्चों को लपेटता है
      />

      {
        // यदि डिफ़ॉल्ट स्थानीयता को पूर्ववर्ती बनाना बंद कर दिया गया है, तो रूट पथ पर सीधे बच्चों को प्रस्तुत करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // स्थानीय प्रबंधन के साथ बच्चों को लपेटता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (वैकल्पिक) चरण 8: स्थानीयता बदलते ही URL बदलें

जब स्थानीयता बदलती है, तो URL बदलने के लिए आप `useLocale` हुक द्वारा प्रदान किए गए `onLocaleChange` प्रॉप्स का उपयोग कर सकते हैं। इसके समानांतर, आप URL पथ को अद्यतन करने के लिए `useLocation` और `useNavigate` हुक्स का उपयोग कर सकते हैं।

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
  const location = useLocation(); // वर्तमान URL पथ प्राप्त करें। उदाहरण: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // अद्यतन स्थानीयता के साथ URL का निर्माण करें
    // उदाहरण: /es/about जब स्थानीयता स्पेनिश पर सेट हो
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL पथ को अपडेट करें
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
              {/* इसकी अपनी स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे फ्रेंच जब वर्तमान स्थानीयता Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* इसकी अपनी स्थानीयता में भाषा - जैसे FR */}
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
  const location = useLocation(); // वर्तमान URL पथ प्राप्त करें। उदाहरण: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // अद्यतन स्थानीयता के साथ URL का निर्माण करें
    // उदाहरण: /es/about जब स्थानीयता स्पेनिश पर सेट हो
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL पथ को अपडेट करें
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
              {/* इसकी अपनी स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे फ्रेंच जब वर्तमान स्थानीयता Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* इसकी अपनी स्थानीयता में भाषा - जैसे FR */}
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
  const location = useLocation(); // वर्तमान URL पथ प्राप्त करें। उदाहरण: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // अद्यतन स्थानीयता के साथ URL का निर्माण करें
    // उदाहरण: /es/about जब स्थानीयता स्पेनिश पर सेट हो
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL पथ को अपडेट करें
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
              {/* इसकी अपनी स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे फ्रेंच जब वर्तमान स्थानीयता Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* इसकी अपनी स्थानीयता में भाषा - जैसे FR */}
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

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने के लिए मॉड्यूल वृद्धि का उपयोग करता है और आपके कोडबेस को मजबूत बनाता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन स्वचालित प्रकारों को शामिल करती है।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    "types", // ऑटो-जनित प्रकारों को सम्मिलित करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह सिफारिश की जाती है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें। इससे आप उन्हें अपने Git भंडार में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश शामिल कर सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

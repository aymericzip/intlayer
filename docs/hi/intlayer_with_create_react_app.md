# इंटलेयर और रिएक्ट क्रिएट ऐप के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करना

[एप्लेट टेम्पलेट](https://github.com/aymericzip/intlayer-react-cra-template) को जाँचें.

## इंटलेयर क्या है?

**इंटलेयर** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

इंटलेयर के साथ, आप कर सकते हैं:

- **आसानी से अनुवाद प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **मेटाडेटा, रूट्स और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, जो ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार करता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

## रिएक्ट एप्लिकेशन में इंटलेयर सेट अप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरता स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**

  पैकेज जो इंटलेयर को रिएक्ट एप्लिकेशन के साथ एकीकृत करता है। यह रिएक्ट अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

- **react-scripts-intlayer**

  `react-scripts-intlayer` कमांड्स और प्लगइन्स को इंटलेयर के साथ क्रिएट रिएक्ट ऐप आधारित एप्लिकेशन में एकीकृत करता है। ये प्लगइन्स [क्राको](https://craco.js.org/) पर आधारित हैं और [वेबपैक](https://webpack.js.org/) बंडलर के लिए अतिरिक्त कॉन्फ़िगरेशन शामिल करते हैं।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फाइल बनाएं:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

> इस कॉन्फ़िगरेशन फाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में इंटलेयर लॉग्स को अक्षम करना, और अधिक सेट कर सकते हैं। उपलब्ध पैरामीटरों की पूरी सूची के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### चरण 3: अपने CRA कॉन्फ़िगरेशन में इंटलेयर को एकीकृत करें

अपने स्क्रिप्ट्स को react-intlayer का उपयोग करने के लिए बदलें

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer` स्क्रिप्ट्स [CRACO](https://craco.js.org/) पर आधारित हैं। आप इंटलेयर क्राको प्लगइन पर आधारित अपना सेटअप भी लागू कर सकते हैं। [यहाँ उदाहरण देखें](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)।

### चरण 4: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाओं को बनाएं और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      hi: (
        <>
          <code>src/App.tsx</code> संपादित करें और पुनः लोड करने के लिए सहेजें
        </>
      ),
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
        hi: "रिएक्ट सीखें",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      hi: "संपादन करके शुरू करें",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        hi: "रिएक्ट सीखें",
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

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      hi: "संपादन करके शुरू करें",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        hi: "रिएक्ट सीखें",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हैं। और सामग्री घोषणा फाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) देखें।

> यदि आपकी सामग्री फाइल में TSX कोड शामिल है, तो आपको अपनी सामग्री फाइल में `import React from "react";` आयात करने पर विचार करना चाहिए।

### चरण 5: अपने कोड में इंटलेयर का उपयोग करें

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों का उपयोग करें:

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

// आवश्यक फाइलें लोड करें
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

> नोट: यदि आप अपने कंटेंट को `string` एट्रिब्यूट जैसे `alt`, `title`, `href`, `aria-label`, आदि में उपयोग करना चाहते हैं, तो आपको फ़ंक्शन के वैल्यू को कॉल करना होगा, जैसे:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की लोकेल सेट करने और सामग्री को अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
// आवश्यक मॉड्यूल आयात करें
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      भाषा को अंग्रेज़ी में बदलें
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
// आवश्यक मॉड्यूल आयात करें
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      भाषा को अंग्रेज़ी में बदलें
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
// आवश्यक मॉड्यूल आयात करें
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

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय रूट बनाना है। यह SEO और SEO-अनुकूल URL के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, डिफ़ॉल्ट लोकेल के लिए रूट्स प्रीफिक्स नहीं होते हैं। यदि आप डिफ़ॉल्ट लोकेल को प्रीफिक्स करना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` कंपोनेंट बना सकते हैं जो आपके एप्लिकेशन के रूट्स को रैप करता है और लोकेल-आधारित रूटिंग को संभालता है। यहां [React Router](https://reactrouter.com/home) का उपयोग करते हुए एक उदाहरण है:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// आवश्यक डिपेंडेंसी और फ़ंक्शन आयात करें
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से उपयोगी फ़ंक्शन और प्रकार
import type { FC, PropsWithChildren } from "react"; // फ़ंक्शनल कंपोनेंट्स और प्रॉप्स के लिए React प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रोवाइडर
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर कंपोनेंट्स

// Intlayer से कॉन्फ़िगरेशन को डेस्ट्रक्चर करें
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * एक कंपोनेंट जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त लोकेल संदर्भ के साथ रैप करता है।
 * यह URL-आधारित लोकेल डिटेक्शन और वैलिडेशन को प्रबंधित करता है।
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें

  // वर्तमान लोकेल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // लोकेल प्रीफिक्स को पथ से हटा दें ताकि एक बेस पथ बनाया जा सके
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
     * जब middleware.prefixDefault झूठा होता है, तो डिफ़ॉल्ट लोकेल को प्रीफिक्स नहीं किया जाता है।
     * सुनिश्चित करें कि वर्तमान लोकेल मान्य है और डिफ़ॉल्ट लोकेल नहीं है।
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
 * एक राउटर कंपोनेंट जो लोकेल-विशिष्ट रूट्स सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत कंपोनेंट्स को रेंडर करने के लिए React Router का उपयोग करता है।
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

// Intlayer से कॉन्फ़िगरेशन को डीस्ट्रक्चर करना
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें

  // वर्तमान स्थानीय निर्धारित करें, यदि प्रदान नहीं किया गया तो डिफ़ॉल्ट पर वापस जाएं
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
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान स्थानीय सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault झूठा है, तो डिफ़ॉल्ट स्थानीय उपसर्गित नहीं होता है।
     * सुनिश्चित करें कि वर्तमान स्थानीय मान्य है और डिफ़ॉल्ट स्थानीय नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीय को बाहर करें
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

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत घटकों को प्रस्तुत करने के लिए React Router का उपयोग करता है।
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
            // मार्ग पैटर्न जो स्थानीय को कैप्चर करता है (जैसे, /en/, /fr/) और सभी बाद के पथों से मेल खाता है
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // बच्चों को स्थानीय प्रबंधन के साथ लपेटता है
          />
        ))}

      {
        // यदि डिफ़ॉल्ट स्थानीय को उपसर्गित करना अक्षम है, तो बच्चों को सीधे रूट पथ पर प्रस्तुत करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // बच्चों को स्थानीय प्रबंधन के साथ लपेटता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat='esm'
// आवश्यक डिपेंडेंसी और फ़ंक्शन आयात करें
import { configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से उपयोगी फ़ंक्शन और प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रोवाइडर
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर कंपोनेंट्स

// Intlayer से कॉन्फ़िगरेशन को डेस्ट्रक्चर करें
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * एक कंपोनेंट जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त लोकेल संदर्भ के साथ रैप करता है।
 * यह URL-आधारित लोकेल डिटेक्शन और वैलिडेशन को प्रबंधित करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें

  // वर्तमान लोकेल निर्धारित करें, यदि प्रदान नहीं किया गया है तो डिफ़ॉल्ट पर वापस जाएं
  const currentLocale = locale ?? defaultLocale;

  // लोकेल प्रीफिक्स को पथ से हटा दें ताकि एक बेस पथ बनाया जा सके
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
     * जब middleware.prefixDefault झूठा होता है, तो डिफ़ॉल्ट लोकेल को प्रीफिक्स नहीं किया जाता है।
     * सुनिश्चित करें कि वर्तमान लोकेल मान्य है और डिफ़ॉल्ट लोकेल नहीं है।
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
 * एक राउटर कंपोनेंट जो लोकेल-विशिष्ट रूट्स सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत कंपोनेंट्स को रेंडर करने के लिए React Router का उपयोग करता है।
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
            // लोकेल को कैप्चर करने के लिए रूट पैटर्न (जैसे, /en/, /fr/) और सभी सब्सीक्वेंट पथों से मेल खाता है
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

// Intlayer से कॉन्फ़िगरेशन को डीस्ट्रक्चर करना
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें

  // वर्तमान स्थानीय निर्धारित करें, यदि प्रदान नहीं किया गया तो डिफ़ॉल्ट पर वापस जाएं
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
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान स्थानीय सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault झूठा है, तो डिफ़ॉल्ट स्थानीय उपसर्गित नहीं होता है।
     * सुनिश्चित करें कि वर्तमान स्थानीय मान्य है और डिफ़ॉल्ट स्थानीय नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीय को बाहर करें
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

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत घटकों को प्रस्तुत करने के लिए React Router का उपयोग करता है।
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
            // मार्ग पैटर्न जो स्थानीय को कैप्चर करता है (जैसे, /en/, /fr/) और सभी बाद के पथों से मेल खाता है
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // बच्चों को स्थानीय प्रबंधन के साथ लपेटता है
          />
        ))}

      {
        // यदि डिफ़ॉल्ट स्थानीय को उपसर्गित करना अक्षम है, तो बच्चों को सीधे रूट पथ पर प्रस्तुत करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // बच्चों को स्थानीय प्रबंधन के साथ लपेटता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// आवश्यक निर्भरताओं और कार्यों को आयात करना
const { configuration, getPathWithoutLocale } = require("intlayer"); // 'intlayer' से यूटिलिटी फ़ंक्शन और प्रकार
const { IntlayerProvider, useLocale } = require("react-intlayer"); // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रदाता
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
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // वर्तमान URL पथ प्राप्त करें

  // वर्तमान स्थानीय निर्धारित करें, यदि प्रदान नहीं किया गया तो डिफ़ॉल्ट पर वापस जाएं
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
          replace // वर्तमान इतिहास प्रविष्टि को नए के साथ बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान स्थानीय सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault झूठा है, तो डिफ़ॉल्ट स्थानीय उपसर्गित नहीं होता है।
     * सुनिश्चित करें कि वर्तमान स्थानीय मान्य है और डिफ़ॉल्ट स्थानीय नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीय को बाहर करें
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

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत घटकों को प्रस्तुत करने के लिए React Router का उपयोग करता है।
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
            // मार्ग पैटर्न जो स्थानीय को कैप्चर करता है (जैसे, /en/, /fr/) और सभी बाद के पथों से मेल खाता है
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // बच्चों को स्थानीय प्रबंधन के साथ लपेटता है
          />
        ))}

      {
        // यदि डिफ़ॉल्ट स्थानीय को उपसर्गित करना अक्षम है, तो बच्चों को सीधे रूट पथ पर प्रस्तुत करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // बच्चों को स्थानीय प्रबंधन के साथ लपेटता है
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

### (वैकल्पिक) चरण 8: जब स्थानीय बदलता है तो URL बदलें

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
      // अपडेटेड स्थानीय भाषा के साथ URL बनाएं
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
              {/* स्थानीय भाषा - जैसे FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी स्थानीय भाषा में भाषा - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीय भाषा में भाषा - जैसे Francés जब वर्तमान स्थानीय भाषा Locales.SPANISH हो */}
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
      // अपडेटेड स्थानीय भाषा के साथ URL बनाएं
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
              {/* स्थानीय भाषा - जैसे FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी स्थानीय भाषा में भाषा - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीय भाषा में भाषा - जैसे Francés जब वर्तमान स्थानीय भाषा Locales.SPANISH हो */}
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
      // अपडेटेड स्थानीय भाषा के साथ URL बनाएं
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
              {/* स्थानीय भाषा - जैसे FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी स्थानीय भाषा में भाषा - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीय भाषा में भाषा - जैसे Francés जब वर्तमान स्थानीय भाषा Locales.SPANISH हो */}
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

> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md)

> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleName.md)

> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocalizedUrl.md)

> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getHTMLTextDir.md)

> - [`hrefLang` विशेषता](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)

> - [`lang` विशेषता](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

> - [`dir` विशेषता](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

> - [`aria-current` विशेषता](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (वैकल्पिक) चरण 9: HTML भाषा और दिशा विशेषताओं को स्विच करें

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो `<html>` टैग की `lang` और `dir` विशेषताओं को वर्तमान स्थानीय भाषा के अनुसार अपडेट करना महत्वपूर्ण है। ऐसा करने से सुनिश्चित होता है:

- **सुलभता**: स्क्रीन रीडर और सहायक तकनीकें सही `lang` विशेषता पर निर्भर करती हैं ताकि सामग्री को सही ढंग से उच्चारित और व्याख्या किया जा सके।
- **पाठ रेंडरिंग**: `dir` (दिशा) विशेषता यह सुनिश्चित करती है कि पाठ सही क्रम में प्रस्तुत किया गया है (जैसे, अंग्रेजी के लिए बाएं से दाएं, अरबी या हिब्रू के लिए दाएं से बाएं), जो पठनीयता के लिए आवश्यक है।

जब भी लोकेल बदलता है, इन एट्रिब्यूट्स को डायनामिक रूप से अपडेट करके, आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव सुनिश्चित करते हैं।

#### हुक को लागू करना

HTML एट्रिब्यूट्स को प्रबंधित करने के लिए एक कस्टम हुक बनाएं। यह हुक लोकेल परिवर्तनों को सुनता है और एट्रिब्यूट्स को तदनुसार अपडेट करता है:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * वर्तमान लोकेल के आधार पर HTML <html> तत्व के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 * - `lang`: ब्राउज़रों और सर्च इंजनों को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने के क्रम को सुनिश्चित करता है (जैसे, अंग्रेजी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट सही टेक्स्ट रेंडरिंग, सुलभता और एसईओ के लिए आवश्यक है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा एट्रिब्यूट को वर्तमान लोकेल में अपडेट करें।
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
 * वर्तमान लोकेल के आधार पर HTML <html> तत्व के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 * - `lang`: ब्राउज़रों और सर्च इंजनों को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने के क्रम को सुनिश्चित करता है (जैसे, अंग्रेजी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट सही टेक्स्ट रेंडरिंग, सुलभता और एसईओ के लिए आवश्यक है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा एट्रिब्यूट को वर्तमान लोकेल में अपडेट करें।
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
 * वर्तमान लोकेल के आधार पर HTML <html> तत्व के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 * - `lang`: ब्राउज़रों और सर्च इंजनों को पेज की भाषा की जानकारी देता है।
 * - `dir`: सही पढ़ने के क्रम को सुनिश्चित करता है (जैसे, अंग्रेजी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह डायनामिक अपडेट सही टेक्स्ट रेंडरिंग, सुलभता और एसईओ के लिए आवश्यक है।
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा एट्रिब्यूट को वर्तमान लोकेल में अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकेल के आधार पर टेक्स्ट दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### अपने एप्लिकेशन में हुक का उपयोग करना

मुख्य घटक में हुक को एकीकृत करें ताकि लोकेल बदलने पर HTML एट्रिब्यूट्स अपडेट हो जाएं:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // लोकेल के आधार पर <html> टैग के lang और dir एट्रिब्यूट्स को अपडेट करने के लिए हुक लागू करें।
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
  // लोकेल के आधार पर <html> टैग के lang और dir एट्रिब्यूट्स को अपडेट करने के लिए हुक लागू करें।
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
  // लोकेल के आधार पर <html> टैग के lang और dir एट्रिब्यूट्स को अपडेट करने के लिए हुक लागू करें।
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

- सुनिश्चित करेगा कि **भाषा** (`lang`) एट्रिब्यूट वर्तमान लोकेल को सही ढंग से प्रतिबिंबित करता है, जो एसईओ और ब्राउज़र व्यवहार के लिए महत्वपूर्ण है।
- **टेक्स्ट दिशा** (`dir`) को लोकेल के अनुसार समायोजित करेगा, जिससे विभिन्न पढ़ने के क्रम वाली भाषाओं के लिए पठनीयता और उपयोगिता बढ़ेगी।
- एक अधिक **सुलभ** अनुभव प्रदान करेगा, क्योंकि सहायक तकनीकें इन एट्रिब्यूट्स पर निर्भर करती हैं।

### टाइपस्क्रिप्ट कॉन्फ़िगरेशन

Intlayer टाइपस्क्रिप्ट का उपयोग मॉड्यूल ऑगमेंटेशन के साथ करता है ताकि आपका कोडबेस मजबूत हो सके।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी टाइपस्क्रिप्ट कॉन्फ़िगरेशन में ऑटो-जनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जनरेटेड टाइप्स को शामिल करें
  ],
}
```

### गिट कॉन्फ़िगरेशन

यह अनुशंसा की जाती है कि Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा करें। यह आपको उन्हें अपने गिट रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

इसके लिए, आप अपनी `.gitignore` फाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा करें
.intlayer
```

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी रूप से प्रबंधित कर सकते हैं।

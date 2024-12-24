# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## What is Intlayer?

**Intlayer** एक नवाचारी, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जो आधुनिक वेब अनुप्रयोगों में बहुभाषीय समर्थन को सरल बनाने के लिए डिज़ाइन की गई है।

Intlayer के साथ, आप कर सकते हैं:

- **आसान तरीके से अनुवाद प्रबंधित करें** घटक स्तर पर निरूपक शब्दकोष का उपयोग करके।
- **गतिकी से मेटाडेटा**, मार्ग, और सामग्री का स्थानीयकरण करें।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित रूप से निर्मित प्रकारों के साथ, ऑटोकम्पलीशन और त्रुटि पहचान को सुधारें।
- **उन्नत विशेषताओं का लाभ उठाएं**, जैसे गतिशील रूप से स्थलीय पहचान और स्विच करना।

---

## Step-by-Step Guide to Set Up Intlayer in a React Application

### Step 1: Install Dependencies

आवश्यक पैकेजों को npm का उपयोग करके स्थापित करें:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Step 2: Configuration of your project

आपके अनुप्रयोग की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपके अन्य स्थानीयकृत भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

सभी उपलब्ध पैरामीटर देखने के लिए, [यहाँ कॉन्फ़िगरेशन दस्तावेज देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md)।

### Step 3: Integrate Intlayer in Your CRA Configuration

अपने स्क्रिप्टों को react-intlayer का उपयोग करने के लिए बदलें

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

नोट: react-intlayer स्क्रिप्ट craco पर आधारित हैं। आप intlayer craco प्लगइन के आधार पर अपनी स्वयं की सेटअप भी कार्यान्वित कर सकते हैं। [यहाँ उदाहरण देखें](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### Step 4: Declare Your Content

अपनी सामग्री शब्दकोष बनाएं और प्रबंधित करें:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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

[अपने Intlayer घोषणा फ़ाइलों को घोषित करने का तरीका देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md)。

### Step 5: Utilize Intlayer in Your Code

अपने अनुप्रयोग में सामग्री शब्दकोष का उपयोग करें:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
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
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* useIntlayer हुक का सही उपयोग करने के लिए, आपको एक बच्चे के घटक में अपने डेटा का उपयोग करना चाहिए */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> नोट: यदि आप अपनी सामग्री को `string` विशेषता में उपयोग करना चाहते हैं, जैसे कि `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन का मान कॉल करना होगा, जैसे:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Step 6: Change the language of your content

आपकी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान की गई `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको अनुप्रयोग की स्थानीयकरण सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

```tsx
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

### (Optional) Step 7: Add localized Routing to your application

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय मार्ग बनाना है। यह SEO और SEO-फ्रेंडली URLs के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट भाषी के लिए मार्गों को पूर्व-निर्धारित नहीं किया गया है। यदि आप डिफ़ॉल्ट भाषी को पूर्व-निर्धारित करना चाहते हैं, तो आप अपने कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन दस्तावेज़ देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md)।

अपने अनुप्रयोग में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` घटक बना सकते हैं जो आपके अनुप्रयोग के मार्गों को लपेटता है और स्थानीयकरण आधारित रूटिंग को संभालता है। यहाँ [React Router](https://reactrouter.com/home) का उपयोग करने का एक उदाहरण है:

```tsx
// आवश्यक निर्भरताएँ और फ़ंक्शन आयात करना
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से उपयोगिता फ़ंक्शन और प्रकार
import { FC, PropsWithChildren } from "react"; // कार्यात्मक घटकों और प्रॉप्स के लिए React प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रदाता
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधित करने के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन का विघटन करना
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और प्रमाणीकरण का प्रबंधन करता है।
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // वर्तमान URL पथ प्राप्त करना
  const { locale } = useParams<{ locale: Locales }>(); // URL से स्थानीयता पैरामीटर निकालना

  // वर्तमान स्थानीयता निर्धारित करना, यदि प्रदान नहीं की गई तो डिफ़ॉल्ट पर वापस जाना
  const currentLocale = locale ?? defaultLocale;

  // स्थानीयता उपसर्ग को पथ से हटाना ताकि एक आधार पथ का निर्माण हो सके
  const pathWithoutLocale = removeLocaleFromUrl(
    path // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सही है, तो डिफ़ॉल्ट स्थानीयता हमेशा उपसर्ग होनी चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीयता को मान्य करना
    if (!locale || !locales.includes(locale)) {
      // अपडेटेड पथ के साथ डिफ़ॉल्ट स्थानीयता की ओर पुनः निर्देशित करें
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // वर्तमान इतिहास प्रविष्टि को नई प्रविष्टि से बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान स्थानीयता सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault गलत है, डिफ़ॉल्ट स्थानीयता को उपसर्गित नहीं किया गया है।
     * सुनिश्चित करें कि वर्तमान स्थानीयता मान्य है और डिफ़ॉल्ट स्थानीयता नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीयता को छोड़ें
        )
        .includes(currentLocale) // जांचें कि क्या वर्तमान स्थानीयता मान्य स्थानीयताओं की सूची में है
    ) {
      // बिना स्थानीयता उपसर्ग वाले पथ की ओर पुनः निर्देशित करें
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // बच्चों को IntlayerProvider के साथ लपेटें और वर्तमान स्थानीयता सेट करें
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो स्थानीय-विशिष्ट मार्ग सेट करता है।
 * यह नेविगेशन का प्रबंधन करने और स्थानीय घटकों को प्रस्तुत करने के लिए React Router का उपयोग करता है।
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // मार्ग पैटर्न जो स्थानीयता को कैप्चर करता है (जैसे, /en/, /fr/) और सभी आगे के पथों से मेल खाता है
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // बच्चों को स्थानीय प्रबंधन के साथ लपेटता है
      />

      {
        // यदि डिफ़ॉल्ट स्थानीयता को पूर्व-निर्धारित करना बंद कर दिया गया है, तो बच्चों को सीधे रूट पथ पर प्रस्तुत करें
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // बच्चों को स्थानीय प्रबंधन के साथ लपेटता है
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Step 8: Change the URL when the locale changes

जब स्थानीयता बदलती है, तो URL बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `onLocaleChange` प्रॉप का उपयोग कर सकते हैं। इसके समानांतर, आप `react-router-dom` से `useLocation` और `useNavigate` हुक का उपयोग करके URL पथ को अपडेट कर सकते हैं।

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // वर्तमान URL पथ प्राप्त करना। उदाहरण: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // अपडेटेड स्थानीयता के साथ URL का निर्माण करना
    // उदाहरण: स्पेनिश में स्थानीयता सेट होने पर /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL पथ को अपडेट करें
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

### Configure TypeScript

Intlayer TypeScript के लाभ प्राप्त करने के लिए मॉड्यूल संवर्धन का उपयोग करता है और आपके कोडबेस को मजबूत बनाता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से निर्मित प्रकार शामिल हैं।

```json5
// tsconfig.json

{
  // आपकी कस्टम कॉन्फ़िगरेशन
  "include": [
    "src",
    "types", // <- स्वचालित निर्मित प्रकारों को शामिल करें
  ],
}
```

### Git Configuration

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करना рекоменд किया जाता है। इससे आप उन्हें अपने Git रिपोजिटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

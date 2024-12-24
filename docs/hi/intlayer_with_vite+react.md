# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## What is Intlayer?

**Intlayer** एक नवोन्मेषी, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) पुस्तकालय है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप:

- **डेकरटिव डिक्शनरीज़** का उपयोग करके अनुवादों को आसानी से प्रबंधित करें।
- **सक्रिय रूप से स्थानीयकरण** मेटाडेटा, रूट और सामग्री।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, ऑटो-पूर्णता और त्रुटि पहचान में सुधार।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील स्थानीय भाषा पहचान और स्विचिंग।

---

## Step-by-Step Guide to Set Up Intlayer in a Vite and React Application

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

अपने अनुप्रयोग की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएँ:

```typescript
// intlayer.config.ts

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

सभी उपलब्ध पैरामीटर देखने के लिए, [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) पर जाएं।

### Step 3: Integrate Intlayer in Your Vite Configuration

अपनी कॉन्फ़िग्रेशन में intlayer प्लगइन जोड़ें।

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### Step 4: Declare Your Content

अपने सामग्री डिक्शनरीज़ को बनाएँ और प्रबंधित करें:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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
      // यदि आप अपने सामग्री में एक React नोड उपयोग कर रहे हैं तो React को आयात करना न भूलें
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

> नोट: यदि आपकी सामग्री फ़ाइल में TSX कोड शामिल है, तो आपको अपने सामग्री फ़ाइल में `import React from "react";` को आयात करने पर विचार करना चाहिए।

[See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) पर जाएँ।

### Step 5: Utilize Intlayer in Your Code

अपने अनुप्रयोग में अपने सामग्री डिक्शनरीज़ का उपयोग करें:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
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
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> नोट: यदि आप अपने सामग्री का उपयोग किसी `string` विशेषता जैसे `alt`, `title`, `href`, `aria-label`, आदि में करना चाहते हैं, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Step 6: Change the language of your content

अपने सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान की गई `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपके अनुप्रयोग की स्थानीय भाषा सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

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

इस कदम का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय रूट बनाना है। यह SEO और SEO-अनुकूल URLs के लिए फायदेमंद होता है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, रूट्स डिफ़ॉल्ट स्थानीय भाषा के लिए पूर्वसर्गित नहीं होते हैं। यदि आप डिफ़ॉल्ट स्थानीय भाषा के लिए पूर्वसर्गित करना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` सेट कर सकते हैं। जानकारी के लिए [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

अपने अनुप्रयोग में स्थानीयकृत राउटिंग जोड़ने के लिए, आप एक `LocaleRouter` घटक बना सकते हैं जो आपके अनुप्रयोग के रूट्स को लपेटता है और स्थानीयकृत राउटिंग को संभालता है। यहाँ एक उदाहरण है जो [React Router](https://reactrouter.com/home) का उपयोग करता है:

```tsx
// आवश्यक निर्भरताओं और कार्यों को आयात करना
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer' से उपयोगिता कार्य और प्रकार
import { FC, PropsWithChildren } from "react"; // कार्यात्मक घटकों और संपत्तियों के लिए React प्रकार
import { IntlayerProvider } from "react-intlayer"; // अंतर्राष्ट्रीयकरण संदर्भ के लिए प्रदाता
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // नेविगेशन प्रबंधन के लिए राउटर घटक

// Intlayer से कॉन्फ़िगरेशन को निकालना
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * एक घटक जो स्थानीयकरण को संभालता है और बच्चों को उपयुक्त स्थानीय संदर्भ के साथ लपेटता है।
 * यह URL-आधारित स्थानीय पहचान और मान्यता का प्रबंधन करता है।
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // वर्तमान URL पथ प्राप्त करना
  const { locale } = useParams<{ locale: Locales }>(); // URL से स्थानीय भाषा पैरामीटर निकालना

  // वर्तमान स्थानीय भाषा निर्धारित करना, यदि उपलब्ध नहीं है तो डिफ़ॉल्ट पर वापस लौटें
  const currentLocale = locale ?? defaultLocale;

  // एक आधार पथ बनाने के लिए पथ से स्थानीय भाषा प्रीफ़िक्स को हटाना
  const pathWithoutLocale = getPathWithoutLocale(
    path // वर्तमान URL पथ
  );

  /**
   * यदि middleware.prefixDefault सत्य है, तो डिफ़ॉल्ट स्थानीय भाषा हमेशा पूर्वसर्गित होनी चाहिए।
   */
  if (middleware.prefixDefault) {
    // स्थानीय भाषा की मान्यता करना
    if (!locale || !locales.includes(locale)) {
      // अपडेटेड पाथ के साथ डिफ़ॉल्ट स्थानीय भाषा पर रीडायरेक्ट करना
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // नए के साथ वर्तमान इतिहास प्रविष्टि को बदलें
        />
      );
    }

    // बच्चों को IntlayerProvider के साथ लपेटना और वर्तमान स्थानीय भाषा सेट करना
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * जब middleware.prefixDefault मिथ्या हो, तो डिफ़ॉल्ट स्थानीय भाषा को पूर्वसर्गित नहीं किया जाता है।
     * सुनिश्चित करना कि वर्तमान स्थानीय भाषा मान्य है और डिफ़ॉल्ट स्थानीय भाषा नहीं है।
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // डिफ़ॉल्ट स्थानीय भाषा को छोड़ें
        )
        .includes(currentLocale) // जांचें कि वर्तमान स्थानीय भाषा मान्य स्थानीय भाषाओं की सूची में है
    ) {
      // बिना स्थानीय प्रीफ़िक्स के पथ पर रीडायरेक्ट करें
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // बच्चों को IntlayerProvider के साथ लपेटना और वर्तमान स्थानीय भाषा सेट करना
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * एक राउटर घटक जो स्थानीय विशिष्ट रूट सेट करता है।
 * यह नेविगेशन प्रबंधन और स्थानीयकृत घटकों को रेंडर करने के लिए React Router का उपयोग करता है।
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // रूट पैटर्न जो स्थानीय भाषा को कैप्चर करता है (जैसे, /en/, /fr/) और सभी बाद के पथों से मेल खाता है
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // स्थानीय प्रबंधन के साथ बच्चों को लपेटता है
      />

      {
        // यदि डिफ़ॉल्ट स्थानीय भाषा को पूर्वसर्गित करना निष्क्रिय है, तो रूट पथ पर बच्चों को सीधे रेंडर करें
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

साथ ही, आप अपने अनुप्रयोग में सर्वर-साइड रूटिंग जोड़ने के लिए intLayerMiddlewarePlugin का उपयोग कर सकते हैं। यह प्लगइन वर्तमान स्थानीय भाषा का पता लगाने के लिए URL का उपयोग करेगा और उपयुक्त स्थानीय कुकी सेट करेगा। यदि कोई स्थानीय भाषा निर्धारित नहीं होती है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त स्थानीय भाषा का निर्धारण करेगा। यदि कोई स्थानीय भाषा नहीं होती है, तो यह डिफ़ॉल्ट स्थानीय भाषा पर रीडायरेक्ट करेगा।

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Step 8: Change the URL when the locale changes

जब स्थानीय भाषा बदलती है तो URL बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `onLocaleChange` प्रॉप का उपयोग कर सकते हैं। साथ ही, आप URL पथ को अपडेट करने के लिए `react-router-dom` से `useLocation` और `useNavigate` हुक का उपयोग कर सकते हैं।

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // वर्तमान URL पथ प्राप्त करें। उदाहरण: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // अपडेटेड स्थानीय भाषा के साथ URL बनाना
    // उदाहरण: /es/about जब स्थानीय भाषा स्पेनिश पर सेट हो
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL पथ अपडेट करें
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

Intlayer टाइपस्क्रिप्ट के फायदों को प्राप्त करने के लिए मॉड्यूल वृद्धि का उपयोग करता है और आपके कोडबेस को मजबूत बनाता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं।

```json5
// tsconfig.json

{
  // आपकी कस्टम कॉन्फ़िग
  "include": [
    "src",
    "types", // <- ऑटो जनरेटेड प्रकार शामिल करें
  ],
}
```

### Git Configuration

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की सिफारिश की जाती है। इससे आप उन्हें अपने Git भंडारण में कमिट करने से बच सकते हैं।

इसका करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext
# Ignore the files generated by Intlayer
.intlayer
```

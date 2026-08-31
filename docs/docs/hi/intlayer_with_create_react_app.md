---
createdAt: 2024-08-11
updatedAt: 2026-05-31
title: "Create React App i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Create React App ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - डॉक्यूमेंटेशन
  - Intlayer
  - Create React App
  - CRA
  - जावास्क्रिप्ट
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
author: aymericzip
---

# Intlayer के साथ अपना Create React App अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-cra-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

[एप्लेट टेम्पलेट](https://github.com/aymericzip/intlayer-react-cra-template) को जाँचें.

## इंटलेयर क्या है?

`react-i18next` या `i18next` जैसे मुख्य समाधानों की तुलना में, Intlayer एक ऐसा समाधान है जो निम्नलिखित जैसे एकीकृत अनुकूलन के साथ आता है:

<AccordionGroup>

<Accordion header="React की पूरी कवरेज">

**इंटलेयर** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

</Accordion>

<Accordion header="Bundle size">

अपने पेजों में विशाल JSON फ़ाइलों को लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। Intlayer आपके **bundle और page sizes को 50% तक कम करने में मदद करता है**।

</Accordion>

<Accordion header="रखरखाव">

अपने एप्लिकेशन की content को scope करना **बड़े पैमाने पर एप्लिकेशन के लिए रखरखाव को सुविधाजनक बनाता है**। आप अपने पूरे content codebase की समीक्षा करने के मानसिक भार के बिना एक एकल feature folder को duplicate या delete कर सकते हैं। इसके अलावा, Intlayer **पूरी तरह से typed** है ताकि आपकी content की सटीकता सुनिश्चित की जा सके।

</Accordion>

<Accordion header="AI Agent">

कंटेंट को एक साथ रखने से Large Language Models (LLMs) को आवश्यक context **कम हो जाता है**। Intlayer के साथ एक suite of tools भी आता है, जैसे **CLI** missing translations को test करने के लिए, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, ताकि AI agents के लिए developer experience (DX) को और भी smooth बनाया जा सके।

</Accordion>

<Accordion header="Automation">

अपनी CI/CD पाइपलाइन में अपनी पसंद के LLM का उपयोग करके अपने AI प्रदाता की लागत पर अनुवाद को स्वचालित करें। Intlayer एक **compiler** भी प्रदान करता है जो सामग्री निष्कर्षण को स्वचालित करता है, साथ ही एक [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) जो **पृष्ठभूमि में अनुवाद** करने में सहायता करता है।

</Accordion>

इंटलेयर के साथ, आप कर सकते हैं:

बड़ी JSON फ़ाइलों को components से जोड़ने से performance और reactivity की समस्याएं हो सकती हैं। Intlayer आपकी content loading को build time पर optimize करता है।

</Accordion>

<Accordion header="गैर-विकास के साथ स्केलिंग">

- **आसानी से अनुवाद प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **मेटाडेटा, रूट्स और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, जो ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार करता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

</Accordion>
</AccordionGroup>

---

## रिएक्ट एप्लिकेशन में इंटलेयर सेट अप करने के लिए चरण-दर-चरण गाइड

<Steps>

<Step number={1} title="निर्भरता स्थापित करें">

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` ध्वज (flag) वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके एनवायरनमेंट को डिटेक्ट करेगी और आवश्यक पैकेज इंस्टॉल करेगी। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**

  पैकेज जो इंटलेयर को रिएक्ट एप्लिकेशन के साथ एकीकृत करता है। यह रिएक्ट अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

- **react-scripts-intlayer**

  `react-scripts-intlayer` कमांड्स और प्लगइन्स को इंटलेयर के साथ क्रिएट रिएक्ट ऐप आधारित एप्लिकेशन में एकीकृत करता है। ये प्लगइन्स [क्राको](https://craco.js.org/) पर आधारित हैं और [वेबपैक](https://webpack.js.org/) बंडलर के लिए अतिरिक्त कॉन्फ़िगरेशन शामिल करते हैं।

</Step>

<Step number={2} title="अपने प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> इस कॉन्फ़िगरेशन फाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में इंटलेयर लॉग्स को अक्षम करना, और अधिक सेट कर सकते हैं। उपलब्ध पैरामीटरों की पूरी सूची के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने CRA कॉन्फ़िगरेशन में इंटलेयर को एकीकृत करें">

अपने स्क्रिप्ट्स को react-intlayer का उपयोग करने के लिए बदलें

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer` स्क्रिप्ट्स [CRACO](https://craco.js.org/) पर आधारित हैं। आप इंटलेयर क्राको प्लगइन पर आधारित अपना सेटअप भी लागू कर सकते हैं। [यहाँ उदाहरण देखें](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)।

</Step>

<Step number={4} title="अपनी सामग्री घोषित करें">

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाओं को बनाएं और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" codeFormat={["typescript", "esm"]}
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

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हैं। और सामग्री घोषणा फाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)।

> अधिक विवरण के लिए [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

> यदि आपकी सामग्री फाइल में TSX कोड शामिल है, तो आपको अपनी सामग्री फाइल में `import React from "react";` आयात करने पर विचार करना चाहिए।

</Step>

<Step number={5} title="अपने कोड में इंटलेयर का उपयोग करें">

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों का उपयोग करें:

```tsx {4,7} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
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

> नोट: यदि आप अपने कंटेंट को `string` एट्रिब्यूट जैसे `alt`, `title`, `href`, `aria-label`, आदि में उपयोग करना चाहते हैं, तो आपको फ़ंक्शन के वैल्यू को कॉल करना होगा, जैसे:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

</Step>

<Step number={6} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की लोकेल सेट करने और सामग्री को अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

> `useLocale` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

</Step>

<Step number={7} title="अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें" isOptional={true}>

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय रूट बनाना है। यह SEO और SEO-अनुकूल URL के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, डिफ़ॉल्ट लोकेल के लिए रूट्स प्रीफिक्स नहीं होते हैं। यदि आप डिफ़ॉल्ट लोकेल को प्रीफिक्स करना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `middleware.prefixDefault` विकल्प को `true` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` कंपोनेंट बना सकते हैं जो आपके एप्लिकेशन के रूट्स को रैप करता है और लोकेल-आधारित रूटिंग को संभालता है। यहां [React Router](https://reactrouter.com/home) का उपयोग करते हुए एक उदाहरण है:

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

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... आपका AppContent घटक

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

</Step>

<Step number={8} title="जब स्थानीय बदलता है तो URL बदलें" isOptional={true}>

लोकेल परिवर्तन के समय URL को बदलने के लिए, आप `useLocale` hook द्वारा प्रदान किए गए `onLocaleChange` prop का उपयोग कर सकते हैं। समानांतर में, आप `react-router-dom` से `useLocation` और `useNavigate` hooks का उपयोग करके URL पाथ को अपडेट कर सकते हैं।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

> दस्तावेज़ संदर्भ:
>
> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` विशेषता](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` विशेषता](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` विशेषता](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` विशेषता](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="HTML भाषा और दिशा विशेषताओं को स्विच करें" isOptional={true}>

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो `<html>` टैग की `lang` और `dir` विशेषताओं को वर्तमान स्थानीय भाषा के अनुसार अपडेट करना महत्वपूर्ण है। ऐसा करने से सुनिश्चित होता है:

- **सुलभता**: स्क्रीन रीडर और सहायक तकनीकें सही `lang` विशेषता पर निर्भर करती हैं ताकि सामग्री को सही ढंग से उच्चारित और व्याख्या किया जा सके।
- **पाठ रेंडरिंग**: `dir` (दिशा) विशेषता यह सुनिश्चित करती है कि पाठ सही क्रम में प्रस्तुत किया गया है (जैसे, अंग्रेजी के लिए बाएं से दाएं, अरबी या हिब्रू के लिए दाएं से बाएं), जो पठनीयता के लिए आवश्यक है।

जब भी लोकेल बदलता है, इन एट्रिब्यूट्स को डायनामिक रूप से अपडेट करके, आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव सुनिश्चित करते हैं।

#### हुक को लागू करना

HTML एट्रिब्यूट्स को प्रबंधित करने के लिए एक कस्टम हुक बनाएं। यह हुक लोकेल परिवर्तनों को सुनता है और एट्रिब्यूट्स को तदनुसार अपडेट करता है:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
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

#### अपने एप्लिकेशन में हुक का उपयोग करना

मुख्य घटक में हुक को एकीकृत करें ताकि लोकेल बदलने पर HTML एट्रिब्यूट्स अपडेट हो जाएं:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
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

इन परिवर्तनों को लागू करके, आपका एप्लिकेशन:

- सुनिश्चित करेगा कि **भाषा** (`lang`) एट्रिब्यूट वर्तमान लोकेल को सही ढंग से प्रतिबिंबित करता है, जो एसईओ और ब्राउज़र व्यवहार के लिए महत्वपूर्ण है।
- **टेक्स्ट दिशा** (`dir`) को लोकेल के अनुसार समायोजित करेगा, जिससे विभिन्न पढ़ने के क्रम वाली भाषाओं के लिए पठनीयता और उपयोगिता बढ़ेगी।
- एक अधिक **सुलभ** अनुभव प्रदान करेगा, क्योंकि सहायक तकनीकें इन एट्रिब्यूट्स पर निर्भर करती हैं।
  </Step>

</Steps>

### टाइपस्क्रिप्ट कॉन्फ़िगरेशन

Intlayer टाइपस्क्रिप्ट का उपयोग मॉड्यूल ऑगमेंटेशन के साथ करता है ताकि आपका कोडबेस मजबूत हो सके।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

### VS Code Extension

Intlayer के साथ अपने development अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code Extension** को install कर सकते हैं।

[VS Code Marketplace से Install करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह extension निम्नलिखित प्रदान करता है:

- Translation keys के लिए **Autocompletion**।
- Missing translations के लिए **Real-time error detection**।
- Translated content के **Inline previews**।
- Translations को आसानी से create और update करने के लिए **Quick actions**।

Extension का उपयोग कैसे करें, इसके बारे में अधिक जानकारी के लिए, [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension) को देखें।

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी रूप से प्रबंधित कर सकते हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Create React App परियोजना के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`react-i18next` / `i18next`**: रनटाइम JSON नेमस्पेस।
- **`react-intl`** और **`Lingui`**: ICU-आधारित समाधान।
- **`Intlayer`**: `react-scripts-intlayer` के माध्यम से बिल्ड समय संकलन, सख्त TypeScript प्रकार, AI अनुवाद और विज़ुअल एडिटर।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे React बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित समाधानों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक प्रविष्टियों से बदल देता है, और [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं, जिससे बंडल 50% तक कम हो जाता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना react-i18next या react-intl से माइग्रेट कर सकता हूँ?">

हाँ, माइग्रेशन गाइड का पालन करें या संगतता एडेप्टर का उपयोग करें।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी फ़ाइलों को पढ़ता है, उपयोगकर्ता के अनुकूल स्ट्रिंग्स निकालता है, और प्रत्येक के बगल में एक `.content` फ़ाइल लिखता है, जिससे आप कैटलॉग में मैन्युअल रूप से कॉपी करने के बजाय एक diff की समीक्षा करते हैं।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) बिल्ड समय पर यही काम करता है: प्रत्येक परिवर्तन पर कोड स्कैन करता है, शब्दकोश उत्पन्न करता है और HMR के साथ सिंक करता है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="Create React App अब समर्थित नहीं है। क्या मुझे पहले Vite पर जाना चाहिए?">

यदि माइग्रेशन की योजना पहले से है, तो इसे पहले करें और [Vite और React गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) का पालन करें। यदि नहीं, तो यह गाइड मज़बूती से काम करती है और सेटअप के बीच सामग्री घोषणाएँ नहीं बदलती हैं।

</Question>

<Question title="Create React App में स्थानीयकृत रूटिंग कैसे सेट करें?">

React Router के लिए, [React Router v7 गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_router_v7.md) देखें। बिना राउटर वाले ऐप्स के लिए, `routing.mode` को `"no-prefix"` या `"search-params"` पर सेट करें।

</Question>

<Question title="क्लाइंट-साइड React ऐप में SEO मेटाडेटा कैसे प्रबंधित करें?">

`html` तत्व पर `lang` और `dir` विशेषताएँ सेट करें और `getMultilingualUrls` का उपयोग करके `hreflang` लिंक प्रकाशित करें।

</Question>

<Question title="अरबी या हिब्रू जैसी दाएं से बाएं लिखी जाने वाली भाषाओं का समर्थन कैसे करें?">

`getHTMLTextDir` किसी दिए गए लोकेल के लिए `ltr`, `rtl`, या `auto` लौटाता है, जिससे आप सक्रिय लोकेल से रूट तत्व पर `lang` और `dir` बाइंड कर सकते हैं और अपनी तार्किक CSS विशेषताओं को बाकी संभालने दे सकते हैं।

</Question>

<Question title="मैं ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं। यह कमांड आपके चुने हुए LLM का उपयोग करके आपके अपने प्रदाता और API कुंजी के साथ लापता अनुवादों को भरता है, और `--git-diff` बदली गई फ़ाइलों तक संचालन को सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

</Question>

<Question title="क्या Intlayer बहुवचन, लिंग और समृद्ध पाठ (rich text) का समर्थन करता है?">

हाँ: [बहुवचन (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/plurial.md), [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md), शर्तें, [सम्मिलन (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md), और संख्याओं, तिथियों और मुद्राओं के लिए [प्रारूपक (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md)।

</Question>

<Question title="अनुवादक कोड को छुए बिना सामग्री को कैसे संपादित कर सकते हैं?">

[विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) के माध्यम से, जो किसी को भी सीधे चलते हुए ऐप में टेक्स्ट संपादित करने देता है, या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के माध्यम से, जो सामग्री को अलग करता है ताकि कोड को फिर से तैनात किए बिना उसे अपडेट किया जा सके।

</Question>

<Question title="क्या Intlayer मुफ्त और ओपन सोर्स है?">

हाँ, Apache 2.0 लाइसेंस के तहत, व्यावसायिक उपयोग सहित। होस्टेड CMS एक वैकल्पिक सशुल्क सेवा है जिसे [स्वयं होस्ट (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

</Question>

</FAQ>

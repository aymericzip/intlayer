---
createdAt: 2024-12-07
updatedAt: 2025-06-29
title: अपने Next.js और Page Router वेबसाइट का अनुवाद करें (i18n)
description: जानें कि कैसे आप Page Router का उपयोग करने वाली अपनी Next.js वेबसाइट को बहुभाषी बना सकते हैं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़
  - Intlayer
  - Page Router
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - next-with-page-router
---

# Intlayer और Next.js के साथ Page Router का उपयोग करके अंतरराष्ट्रीयकरण (i18n) शुरू करना

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js** फ्रेमवर्क के साथ सहजता से एकीकृत होता है, जिसमें इसका पारंपरिक **Page Router** भी शामिल है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कॉम्पोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, जो ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार करता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकल डिटेक्शन और स्विचिंग।

> Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js App Router का उपयोग कर रहे हैं, तो कृपया [App Router गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_14.md) देखें। Next.js 15 के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md) का पालन करें।

---

## Page Router का उपयोग करके Next.js एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  वह पैकेज जो Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक्स प्रदान करता है। इसके अतिरिक्त, इसमें Next.js प्लगइन शामिल है जो Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

### चरण 2: अपने प्रोजेक्ट को कॉन्फ़िगर करें

अपने एप्लिकेशन द्वारा समर्थित भाषाओं को परिभाषित करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // यहां अपनी अन्य भाषाएँ जोड़ें
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
      // यहां अपनी अन्य भाषाएँ जोड़ें
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
      // यहां अपनी अन्य भाषाएँ जोड़ें
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर पुनर्निर्देशन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: Next.js कॉन्फ़िगरेशन के साथ Intlayer को एकीकृत करें

अपने Next.js कॉन्फ़िगरेशन को संशोधित करें ताकि Intlayer को शामिल किया जा सके:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // आपका मौजूदा Next.js कॉन्फ़िगरेशन
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर घटकों के साथ संगतता सुनिश्चित करता है।

### चरण 4: स्थानीयकरण पहचान के लिए मिडलवेयर कॉन्फ़िगर करें

मिडलवेयर सेट करें ताकि उपयोगकर्ता की पसंदीदा स्थानीय भाषा को स्वचालित रूप से पहचानकर संभाला जा सके:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> अपने एप्लिकेशन के रूट्स से मेल खाने के लिए `matcher` पैरामीटर को अनुकूलित करें। अधिक जानकारी के लिए, [Next.js दस्तावेज़ीकरण में matcher को कॉन्फ़िगर करने](https://nextjs.org/docs/app/building-your-application/routing/middleware) पर जाएं।

### चरण 5: डायनामिक लोकल रूट्स परिभाषित करें

उपयोगकर्ता की लोकल के आधार पर स्थानीयकृत सामग्री प्रदान करने के लिए डायनामिक रूटिंग लागू करें।

1.  **लोकल-विशिष्ट पेज बनाएं:**

    अपने मुख्य पेज फ़ाइल का नाम बदलकर उसमें `[locale]` डायनामिक सेगमेंट शामिल करें।

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **लोकलाइज़ेशन को संभालने के लिए `_app.tsx` अपडेट करें:**

    अपने `_app.tsx` को Intlayer प्रदाताओं को शामिल करने के लिए संशोधित करें।

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **`getStaticPaths` और `getStaticProps` सेट करें:**

    अपने `[locale]/index.tsx` में, विभिन्न लोकल्स को संभालने के लिए पाथ्स और प्रॉप्स को परिभाषित करें।

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* आपका कंटेंट यहाँ */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* आपका कंटेंट यहाँ */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* आपका सामग्री यहाँ */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` और `getStaticProps` सुनिश्चित करते हैं कि आपका एप्लिकेशन Next.js पेज राउटर में सभी लोकल्स के लिए आवश्यक पेजों को प्री-बिल्ड करता है। यह तरीका रनटाइम कंप्यूटेशन को कम करता है और बेहतर उपयोगकर्ता अनुभव प्रदान करता है। अधिक जानकारी के लिए Next.js दस्तावेज़ में [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) और [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) देखें।

### चरण 6: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाओं को बनाएं और प्रबंधित करें।

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "मेरी वेबसाइट में आपका स्वागत है",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "इस पृष्ठ को संपादित करके शुरू करें।",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "इस पृष्ठ को संपादित करके शुरू करें।",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "इस पृष्ठ को संपादित करके शुरू करें।", // इस पृष्ठ को संपादित करके शुरू करें।
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "इस पृष्ठ को संपादित करके शुरू करें।",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

अधिक जानकारी के लिए सामग्री घोषणा गाइड देखें: [content declaration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)।

### चरण 7: अपने कोड में सामग्री का उपयोग करें

अपने एप्लिकेशन में अनुवादित सामग्री प्रदर्शित करने के लिए अपनी सामग्री शब्दकोशों तक पहुंचें।

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* अतिरिक्त घटक */}
    </div>
  );
};

// ... बाकी कोड, जिसमें getStaticPaths और getStaticProps शामिल हैं

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* अतिरिक्त घटक */}
    </div>
  );
};

// ... बाकी कोड, जिसमें getStaticPaths और getStaticProps शामिल हैं

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* अतिरिक्त घटक */}
    </div>
  );
};

// ... बाकी कोड, जिसमें getStaticPaths और getStaticProps शामिल हैं
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // सुनिश्चित करें कि आपके पास संबंधित सामग्री घोषणा है

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // सुनिश्चित करें कि आपके पास संबंधित सामग्री घोषणा है

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // सुनिश्चित करें कि आपके पास संबंधित सामग्री घोषणा है

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> जब आप `string` गुणों (जैसे, `alt`, `title`, `href`, `aria-label`) में अनुवाद का उपयोग करते हैं, तो फ़ंक्शन के मान को इस प्रकार कॉल करें:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayer.md) देखें।

### (वैकल्पिक) चरण 8: अपने मेटाडेटा का अंतरराष्ट्रीयकरण

यदि आप अपने मेटाडेटा, जैसे कि अपने पृष्ठ के शीर्षक को अंतरराष्ट्रीयकृत करना चाहते हैं, तो आप Next.js पेज राउटर द्वारा प्रदान किए गए `getStaticProps` फ़ंक्शन का उपयोग कर सकते हैं। इसके अंदर, आप अपने मेटाडेटा का अनुवाद करने के लिए `getIntlayer` फ़ंक्शन से सामग्री प्राप्त कर सकते हैं।

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { type Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/pages/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/pages/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/pages/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
          "hi": "प्रिएक्ट लोगो"
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "hi": "create next app द्वारा उत्पन्न"
      },
    },
  },
};
```

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({
  metadata,
  multilingualUrls,
  locale,
}) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO के लिए hreflang टैग जनरेट करें */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* पेज सामग्री */}
      <main>{/* आपका पृष्ठ सामग्री यहाँ */}</main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const locale = params?.locale as string;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * प्रत्येक भाषा के लिए सभी URL शामिल करने वाला एक ऑब्जेक्ट बनाता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटाता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... बाकी कोड जिसमें getStaticPaths शामिल है
````

````jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO के लिए hreflang टैग जनरेट करें */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* पेज सामग्री */}
      <main>{/* आपका पृष्ठ सामग्री यहाँ */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * प्रत्येक लोकल के लिए सभी URL शामिल करने वाला एक ऑब्जेक्ट बनाता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटाता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... बाकी कोड जिसमें getStaticPaths शामिल है
````

````jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO के लिए hreflang टैग जनरेट करें */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* पेज सामग्री */}
      <main>{/* आपका पृष्ठ सामग्री यहाँ */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * प्रत्येक लोकल के लिए सभी URL शामिल करने वाला एक ऑब्जेक्ट जनरेट करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटाता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... getStaticPaths सहित बाकी कोड
````

> ध्यान दें कि `next-intlayer` से आयातित `getIntlayer` फ़ंक्शन आपके कंटेंट को `IntlayerNode` में लपेट कर लौटाता है, जिससे विज़ुअल एडिटर के साथ एकीकरण संभव होता है। इसके विपरीत, `intlayer` से आयातित `getIntlayer` फ़ंक्शन आपके कंटेंट को सीधे बिना अतिरिक्त गुणों के लौटाता है।

वैकल्पिक रूप से, आप अपने मेटाडेटा को घोषित करने के लिए `getTranslation` फ़ंक्शन का उपयोग कर सकते हैं। हालांकि, मेटाडेटा के अनुवाद को स्वचालित करने और किसी बिंदु पर कंटेंट को बाहरी बनाने के लिए कंटेंट घोषणा फ़ाइलों का उपयोग करना अनुशंसित है।

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page"); // पेज कंटेंट के लिए Intlayer का उपयोग करें

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO के लिए hreflang टैग जनरेट करें */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={url}
          />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* पृष्ठ सामग्री */}
      <main>
        {/* आपका पृष्ठ सामग्री यहाँ */}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params
}) => {
  const locale = params?.locale as string;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... getStaticPaths सहित बाकी कोड
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO के लिए hreflang टैग जनरेट करें */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* पृष्ठ सामग्री */}
      <main>{/* आपकी पृष्ठ सामग्री यहाँ */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... getStaticPaths सहित बाकी कोड
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO के लिए hreflang टैग जनरेट करें */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* पृष्ठ सामग्री */}
      <main>{/* आपकी पृष्ठ सामग्री यहाँ */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... getStaticPaths सहित बाकी कोड
```

> आधिकारिक Next.js दस्तावेज़ीकरण [पर मेटाडेटा अनुकूलन](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata) के बारे में अधिक जानें।

### (वैकल्पिक) चरण 9: अपनी सामग्री की भाषा बदलें

Next.js में अपनी सामग्री की भाषा बदलने के लिए, अनुशंसित तरीका है कि `Link` कॉम्पोनेंट का उपयोग करके उपयोगकर्ताओं को उपयुक्त स्थानीयकृत पृष्ठ पर पुनः निर्देशित किया जाए। `Link` कॉम्पोनेंट पृष्ठ की प्रीफेचिंग सक्षम करता है, जो पूर्ण पृष्ठ पुनः लोड से बचने में मदद करता है।

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
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
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए, Locales.SPANISH सेट होने पर Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
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
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
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
          </Link>
        </option>
      ))}
    </select>
  );
};
```

> एक वैकल्पिक तरीका है `useLocale` हुक द्वारा प्रदान किया गया `setLocale` फ़ंक्शन उपयोग करना। यह फ़ंक्शन पेज को प्रीफ़ेच करने की अनुमति नहीं देगा और पेज को पुनः लोड करेगा।

> इस मामले में, `router.push` का उपयोग किए बिना पुनर्निर्देशन के, केवल आपका सर्वर-साइड कोड सामग्री की भाषा को बदल देगा।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... बाकी कोड

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>फ्रेंच में बदलें</button>
);
```

> `useLocalePageRouter` API `useLocale` के समान है। `useLocale` हुक के बारे में अधिक जानने के लिए, कृपया [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md) देखें।

> दस्तावेज़ संदर्भ:
>
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` एट्रिब्यूट](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (वैकल्पिक) चरण 10: एक स्थानीयकृत लिंक कॉम्पोनेंट बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन की नेविगेशन वर्तमान स्थानीय भाषा का सम्मान करती है, आप एक कस्टम `Link` कॉम्पोनेंट बना सकते हैं। यह कॉम्पोनेंट स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ पूर्वसर्ग करता है। उदाहरण के लिए, जब एक फ्रेंच-भाषी उपयोगकर्ता "About" पेज के लिंक पर क्लिक करता है, तो वे `/about` के बजाय `/fr/about` पर पुनः निर्देशित होते हैं।

यह व्यवहार कई कारणों से उपयोगी है:

- **एसईओ और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजनों को भाषा-विशिष्ट पृष्ठों को सही ढंग से अनुक्रमित करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: अपने एप्लिकेशन में स्थानीयकृत लिंक का उपयोग करके, आप यह सुनिश्चित करते हैं कि नेविगेशन वर्तमान स्थानीय भाषा के भीतर ही रहे, जिससे अप्रत्याशित भाषा परिवर्तन से बचा जा सके।
- **रखरखाव योग्यता**: स्थानीयकरण लॉजिक को एकल घटक में केंद्रीकृत करने से URL प्रबंधन सरल हो जाता है, जिससे आपका कोडबेस बनाए रखना और बढ़ाना आसान हो जाता है क्योंकि आपका एप्लिकेशन बढ़ता है।

नीचे TypeScript में एक स्थानीयकृत `Link` घटक का कार्यान्वयन दिया गया है:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * उपयोगिता फ़ंक्शन यह जांचने के लिए कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link कॉम्पोनेंट जो वर्तमान लोकल के आधार पर href एट्रिब्यूट को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करके URL के साथ लोकल (जैसे /fr/about) को जोड़ता है।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर रहता है।
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * एक उपयोगिता फ़ंक्शन जो जांचता है कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * एक कस्टम Link कॉम्पोनेंट जो वर्तमान लोकल के आधार पर href एट्रिब्यूट को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है ताकि URL के आगे लोकल जोड़ा जा सके (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर रहे।
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * एक उपयोगिता फ़ंक्शन जो जांचता है कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### यह कैसे काम करता है

- **बाहरी लिंक का पता लगाना**:  
  सहायक फ़ंक्शन `checkIsExternalLink` यह निर्धारित करता है कि कोई URL बाहरी है या नहीं। बाहरी लिंक को अपरिवर्तित छोड़ दिया जाता है क्योंकि उन्हें स्थानीयकरण की आवश्यकता नहीं होती।

- **वर्तमान स्थानीय भाषा प्राप्त करना**:  
  `useLocale` हुक वर्तमान लोकल (जैसे, फ्रेंच के लिए `fr`) प्रदान करता है।

- **URL का स्थानीयकरण**:  
  आंतरिक लिंक (अर्थात, गैर-बाहरी) के लिए, `getLocalizedUrl` का उपयोग वर्तमान लोकल के साथ URL को स्वचालित रूप से प्रीफिक्स करने के लिए किया जाता है। इसका मतलब है कि यदि आपका उपयोगकर्ता फ्रेंच में है, तो `href` के रूप में `/about` पास करने पर यह `/fr/about` में परिवर्तित हो जाएगा।

- **लिंक लौटाना**:  
  यह कॉम्पोनेंट स्थानीयकृत URL के साथ एक `<a>` तत्व लौटाता है, जिससे नेविगेशन लोकल के अनुरूप रहता है।

अपने एप्लिकेशन में इस `Link` कॉम्पोनेंट को एकीकृत करके, आप एक सुसंगत और भाषा-सचेत उपयोगकर्ता अनुभव बनाए रखते हैं, साथ ही बेहतर SEO और उपयोगिता का लाभ भी उठाते हैं।

### (वैकल्पिक) चरण 11: अपने बंडल आकार को अनुकूलित करें

जब `next-intlayer` का उपयोग किया जाता है, तो डिक्शनरी डिफ़ॉल्ट रूप से हर पेज के बंडल में शामिल होती हैं। बंडल साइज को ऑप्टिमाइज़ करने के लिए, Intlayer एक वैकल्पिक SWC प्लगइन प्रदान करता है जो मैक्रोज़ का उपयोग करके `useIntlayer` कॉल्स को बुद्धिमानी से बदलता है। यह सुनिश्चित करता है कि डिक्शनरी केवल उन पेजों के बंडल में शामिल हों जो वास्तव में उनका उपयोग करते हैं।

इस ऑप्टिमाइज़ेशन को सक्षम करने के लिए, `@intlayer/swc` पैकेज इंस्टॉल करें। एक बार इंस्टॉल हो जाने पर, `next-intlayer` स्वचालित रूप से इस प्लगइन का पता लगाएगा और उपयोग करेगा:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> नोट: यह ऑप्टिमाइज़ेशन केवल Next.js 13 और उससे ऊपर के लिए उपलब्ध है।

> नोट: यह पैकेज डिफ़ॉल्ट रूप से स्थापित नहीं होता क्योंकि SWC प्लगइन्स अभी भी Next.js पर प्रयोगात्मक हैं। भविष्य में यह बदल सकता है।

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जनरेटेड टाइप्स शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

अपने रिपॉजिटरी को साफ़ रखने और उत्पन्न फ़ाइलों को कमिट करने से बचने के लिए, Intlayer द्वारा बनाई गई फ़ाइलों को अनदेखा करना अनुशंसित है।

अपने `.gitignore` फ़ाइल में निम्नलिखित पंक्तियाँ जोड़ें:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पता लगाना**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएँ**।

एक्सटेंशन का उपयोग कैसे करें, इस पर अधिक जानकारी के लिए, [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

## अतिरिक्त संसाधन

- **Intlayer दस्तावेज़:** [GitHub रिपॉजिटरी](https://github.com/aymericzip/intlayer)
- **शब्दकोश मार्गदर्शिका:** [शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)
- **कॉन्फ़िगरेशन दस्तावेज़:** [कॉन्फ़िगरेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

इस गाइड का पालन करके, आप अपने Next.js एप्लिकेशन में Page Router का उपयोग करते हुए Intlayer को प्रभावी ढंग से एकीकृत कर सकते हैं, जो आपके वेब प्रोजेक्ट्स के लिए मजबूत और स्केलेबल अंतरराष्ट्रीयकरण समर्थन सक्षम करता है।

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपने कंटेंट को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

# Intlayer और Next.js के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करना

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) पुस्तकालय है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषाई समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js** ढांचे के साथ निर्बाध रूप से एकीकृत होता है, जिसमें इसका पारंपरिक **पृष्ठ राउटर** शामिल है।

Intlayer के साथ, आप कर सकते हैं:

- **आसान तरीके से अनुवाद प्रबंधित करें** उपयोगी शब्दकोशों का उपयोग करके जो घटक स्तर पर होते हैं।
- **गतिशील रूप से मेटाडेटा**, रूट और सामग्री का स्थानीयकरण करें।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित प्रकारों के साथ, जो ऑटोकंप्लीशन और त्रुटि पहचान में सुधार करता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील स्थानीयता पहचान और स्विचिंग।

> Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js ऐप राउटर का उपयोग कर रहे हैं, तो [ऐप राउटर गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_14.md) का संदर्भ लें। Next.js 15 के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) का पालन करें।

---

## Next.js अनुप्रयोग में पृष्ठ राउटर का उपयोग करके Intlayer सेटअप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

  वह मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री की घोषणाएँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  वह पैकेज जो Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाताओं और हुक प्रदान करता है। इसके अतिरिक्त, इसमें Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन शामिल है, साथ ही उपयोगकर्ता की पसंदीदा स्थानीयता का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन करने के लिए मध्यवर्ती भी शामिल है।

### चरण 2: अपने प्रोजेक्ट को कॉन्फ़िगर करें

एक कॉन्फ़िगरेशन फ़ाइल बनाएं जो आपकी अनुप्रयोग द्वारा समर्थित भाषाओं को परिभाषित करें:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // यहाँ अपनी अन्य स्थानीयताएँ जोड़ें
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
      // यहाँ अपनी अन्य स्थानीयताएँ जोड़ें
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
      // यहाँ अपनी अन्य स्थानीयताएँ जोड़ें
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URLs सेट कर सकते हैं, मध्यवर्ती पुनर्निर्देशन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और विस्तार, कंसोल में Intlayer लॉग को बंद करें, और अधिक। उपलब्ध पैरामीटर की पूर्ण सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) का संदर्भ लें।

### चरण 3: Next.js कॉन्फ़िगरेशन के साथ Intlayer को एकीकृत करें

Intlayer को समाहित करने के लिए अपने Next.js कॉन्फ़िगरेशन में संशोधन करें:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // आपका मौजूदा Next.js कॉन्फ़िगरेशन
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री की घोषणाओं वाली फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उन्हें मॉनिटर करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) परिवेश के भीतर Intlayer वातावरणीय चर परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर घटकों के साथ संगतता सुनिश्चित करता है।

### चरण 4: स्थानीयता पहचान के लिए मध्यवर्ती को कॉन्फ़िगर करें

उपयोगकर्ता की पसंदीदा स्थानीयता का स्वचालित रूप से पता लगाने और प्रबंधित करने के लिए मध्यवर्ती सेट करें:

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

> `matcher` पैरामीटर को आपकी अनुप्रयोग के रूट से मेल खाने के लिए अनुकूलित करें। अधिक जानकारी के लिए, [मीडियावरे दस्तावेज़ पर](https://nextjs.org/docs/app/building-your-application/routing/middleware) जाएं।

### चरण 5: गतिशील स्थानीयता रूट परिभाषित करें

उपयोगकर्ता की स्थानीयता के आधार पर स्थानीयकृत सामग्री प्रदान करने के लिए गतिशील रूटिंग लागू करें।

1.  **स्थानीयता-विशिष्ट पृष्ठ बनाएँ:**

    अपने मुख्य पृष्ठ फ़ाइल का नाम बदलें ताकि `[locale]` गतिशील खंड शामिल हो।

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **स्थानीयकरण को संभालने के लिए `_app.tsx` अपडेट करें:**

    अपने `_app.tsx` को Intlayer प्रदाताओं सहित संशोधित करें।

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App: FC<AppProps> = ({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    };

    export default App;
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

    अपने `[locale]/index.tsx` में, विभिन्न स्थानीयताओं को संभालने के लिए पथों और प्रॉप्स परिभाषित करें।

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* आपकी सामग्री यहाँ */}</div>;

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

    const HomePage = () => <div>{/* आपकी सामग्री यहाँ */}</div>;

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

    const HomePage = () => <div>{/* आपकी सामग्री यहाँ */}</div>;

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

> `getStaticPaths` और `getStaticProps` सुनिश्चित करते हैं कि आपका अनुप्रयोग Next.js पृष्ठ राउटर में सभी स्थानीयताओं के लिए आवश्यक पृष्ठों को पूर्व-निर्माण कर रहा है। यह दृष्टिकोण रनटाइम गणनाओं को कम करता है और उपयोगकर्ता के अनुभव को सुधारता है। अधिक जानकारी के लिए, [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) और [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) पर Next.js दस्तावेज़ का संदर्भ लें।

### चरण 6: अपनी सामग्री की घोषणा करें

अनुवाद स्टोर करने के लिए अपनी सामग्री घोषणाओं को बनाएं और प्रबंधित करें।

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "My वेबसाइट पर स्वागत है",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "इस पृष्ठ को संपादित करके शुरू करें।",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

सामग्री की घोषणा करने के बारे में अधिक जानकारी के लिए, [सामग्री की घोषणा गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) का संदर्भ लें।

### चरण 7: अपने कोड में सामग्री का उपयोग करें

अपने अनुप्रयोग में अनुवादित सामग्री प्रदर्शित करने के लिए अपनी सामग्री शब्दकोशों तक पहुंचें।

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

// ... कोड का बाकी भाग, जिसमें getStaticPaths और getStaticProps शामिल हैं

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

// ... कोड का बाकी भाग, जिसमें getStaticPaths और getStaticProps शामिल हैं

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

// ... कोड का बाकी भाग, जिसमें getStaticPaths और getStaticProps शामिल हैं
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // सुनिश्चित करें कि आपके पास एक संबंधित सामग्री घोषणा है

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
  const content = useIntlayer("component-example"); // सुनिश्चित करें कि आपके पास एक संबंधित सामग्री घोषणा है

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
  const content = useIntlayer("component-example"); // सुनिश्चित करें कि आपके पास एक संबंधित सामग्री घोषणा है

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> जब अनुवादों का उपयोग करते समय `string` गुणों (जैसे, `alt`, `title`, `href`, `aria-label`) में मानों को कॉल करें, तो फ़ंक्शन के मान को इस प्रकार कॉल करें:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानकारी जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useIntlayer.md) का संदर्भ लें।

### (वैकल्पिक) चरण 8: अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करें

पृष्ठ के शीर्षक और विवरण जैसे मेटाडेटा को अंतर्राष्ट्रीयकरण करने के लिए, `getStaticProps` फ़ंक्शन का उपयोग Intlayer के `getTranslationContent` फ़ंक्शन के साथ करें।

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // मेटाडेटा का उपयोग आवश्यकतानुसार head या अन्य घटकों में किया जा सकता है
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* अतिरिक्त सामग्री */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "मेरी वेबसाइट",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "मेरी वेबसाइट पर आपका स्वागत है।",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... कोड का बाकी भाग जिसमें getStaticPaths शामिल है
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // मेटाडेटा का उपयोग आवश्यकतानुसार head या अन्य घटकों में किया जा सकता है
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* अतिरिक्त सामग्री */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "मेरी वेबसाइट",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "मेरी वेबसाइट पर आपका स्वागत है।",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... कोड का बाकी भाग जिसमें getStaticPaths शामिल है
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslationContent, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // मेटाडेटा का उपयोग आवश्यकतानुसार head या अन्य घटकों में किया जा सकता है
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* अतिरिक्त सामग्री */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "मेरी वेबसाइट",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "मेरी वेबसाइट पर आपका स्वागत है।",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... कोड का बाकी भाग जिसमें getStaticPaths शामिल है
```

### (वैकल्पिक) चरण 9: अपनी सामग्री का भाषा बदलिए

उपयोगकर्ताओं को गतिशील रूप से भाषाएँ स्विच करने की अनुमति देने के लिए, `useLocale` हुक द्वारा प्रदान की गई `setLocale` फ़ंक्शन का उपयोग करें।

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे "Francés" जब वर्तमान स्थानीयता Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी स्थानीयता में भाषा - जैसे FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे "Francés" जब वर्तमान स्थानीयता Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी स्थानीयता में भाषा - जैसे FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी स्थानीयता में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीयता में भाषा - जैसे "Francés" जब वर्तमान स्थानीयता Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी स्थानीयता में भाषा - जैसे FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocalePageRouter` API, `useLocale` के समान है। `useLocale` हुक के बारे में अधिक जानकारी के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useLocale.md) का संदर्भ लें।

> दस्तावेज़ संदर्भ:
>
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` एट्रिब्यूट](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **TypeScript लाभ का उदाहरण:**

   ![ऑटोकंप्लीशन उदाहरण](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![अनुवाद त्रुटि उदाहरण](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### गिट कॉन्फ़िगरेशन

अपने भंडार को साफ रखने के लिए और उत्पन्न फ़ाइलों को संवित करने से रोकने के लिए, Intlayer द्वारा बनाई गई फ़ाइलों की अनदेखी करना अनुशंसा की जाती है।

अपने `.gitignore` फ़ाइल में निम्नलिखित पंक्तियाँ जोड़ें:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों की अनदेखी करें
.intlayer
```

## अतिरिक्त संसाधन

- **Intlayer दस्तावेज़:** [GitHub संग्रह](https://github.com/aymericzip/intlayer)
- **सामग्री घोषणा गाइड:** [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md)
- **कॉन्फ़िगरेशन दस्तावेज़:** [कॉन्फ़िगरेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md)

इस गाइड का पालन करके, आप प्रभावी रूप से Intlayer को अपने Next.js अनुप्रयोग में पृष्ठ राउटर का उपयोग करके एकीकृत कर सकते हैं, अपने वेब प्रोजेक्ट के लिए मजबूत और स्केलेबल अंतर्राष्ट्रीयकरण समर्थन सक्षम कर सकते हैं।

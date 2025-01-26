# Intlayer और Next.js 14 के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करने के लिए

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) पुस्तकालय है जिसे आधुनिक वेब अनुप्रयोगों में बहु-भाषा समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js 14** ढांचे के साथ सहजता से एकीकृत होता है, जिसमें इसकी शक्तिशाली **App Router** शामिल है। यह कुशल रेंडरिंग के लिए **Server Components** के साथ कार्य करने के लिए ऑप्टिमाइज़ किया गया है और [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (Next.js >= 15 से) के साथ पूरी तरह से संगत है।

Intlayer के साथ, आप कर सकते हैं:

- **घटक स्तर पर डिक्शनरी का उपयोग करके अनुवादों का आसानी से प्रबंधन** करें।
- **Metadata**, मार्गों और सामग्री को गतिशील रूप से स्थानीयकृत करें।
- **क्लाइंट-साइड और सर्वर-साइड घटकों में अनुवादों तक पहुँचें**।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित प्रकारों के साथ, ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार करते हुए।
- **गतिशील स्थानीयकरण पहचान और स्विचिंग** जैसी उन्नत विशेषताओं का लाभ उठाएं।

> Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js Page Router का उपयोग कर रहे हैं, तो इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_page_router.md) को देखें। Next.js 15 के लिए, टर्बोपैक के साथ या बिना, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) को देखें।

---

## Next.js अनुप्रयोग में Intlayer सेट करने के लिए कदम-दर-कदम गाइड

### कदम 1: निर्भरता स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

  कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md), ट्रांसपिलेशन और [CLI आदेशों](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करने वाला मुख्य पैकेज।

- **next-intlayer**

  Next.js के साथ Intlayer को एकीकृत करने वाला पैकेज। यह Next.js अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ Intlayer को एकीकृत करने के लिए Next.js प्लगइन के साथ-साथ उपयोगकर्ता के पसंदीदा स्थानीयकरण का पता लगाने, कुकी प्रबंधन और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल है।

### कदम 2: अपने प्रोजेक्ट को कॉन्फ़िगर करें

अपने अनुप्रयोग की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएँ:

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URLs, मिडलवेयर रीडायरेक्शन, कुकी के नाम, आपकी सामग्री घोषणाओं के स्थान और एक्सटेंशन का सेटअप कर सकते हैं, Intlayer लॉग को कंसोल में बंद कर सकते हैं, और बहुत कुछ। उपलब्ध पैरामीटर्स की पूरी सूची के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) को देखें।

### कदम 3: Next.js कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

Intlayer का उपयोग करने के लिए अपनी Next.js सेटअप को कॉन्फ़िगर करें:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उन्हें मॉनिटर करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर घटकों के साथ संगतता सुनिश्चित करता है।

### कदम 4: स्थानीयकरण पहचान के लिए मिडलवेयर कॉन्फ़िगर करें

उपयोगकर्ता के पसंदीदा स्थानीयकरण का पता लगाने के लिए मिडलवेयर सेट करें:

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

> `intlayerMiddleware` का उपयोग उपयोगकर्ता के पसंदीदा स्थानीयकरण का पता लगाने और उन्हें URL के अनुसार पुनः निर्देशित करने के लिए किया जाता है जैसे कि [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में निर्दिष्ट है। इसके अतिरिक्त, यह उपयोगकर्ता के पसंदीदा स्थानीयकरण को कुकी में सहेजने को सक्षम बनाता है।

> अपने अनुप्रयोग के मार्गों से मेल खाने के लिए `matcher` पैरामीटर को समायोजित करें। अधिक विवरण के लिए, [Next.js दस्तावेज़ पर matcher कॉन्फ़िगर करने](https://nextjs.org/docs/app/building-your-application/routing/middleware) को देखें।

### कदम 5: गतिशील स्थानीयकरण मार्गों को परिभाषित करें

`RootLayout` से सब कुछ हटा दें और निम्नलिखित कोड के साथ बदलें:

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> `RootLayout` घटक को खाली रखना [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) और [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) गुणों को `<html>` टैग पर सेट करने की अनुमति देता है।

गतिशील रूटिंग लागू करने के लिए, अपने `[locale]` निर्देशिका में एक नया लेआउट जोड़कर स्थानीयकरण के लिए मार्ग प्रदान करें:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

module.exports = LocaleLayout;
```

> `[locale]` पथ खंड का उपयोग स्थानीयकरण को परिभाषित करने के लिए किया जाता है। उदाहरण: `/en-US/about` `en-US` को संदर्भित करेगा और `/fr/about` `fr` को।

फिर, अपने एप्लिकेशन लेआउट में `generateStaticParams` फ़ंक्शन को लागू करें।

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // जोड़ने के लिए लाइन

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... कोड का शेष भाग*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // जोड़ने के लिए लाइन

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... कोड का शेष भाग*/
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // जोड़ने के लिए लाइन

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... कोड का शेष भाग*/
};

module.exports = LocaleLayout;
```

> `generateStaticParams` आपके अनुप्रयोग को सभी स्थानीयकरण के लिए आवश्यक पृष्ठों का पूर्व-निरूपण सुनिश्चित करता है, रनटाइम गणना को कम करता है और उपयोगकर्ता अनुभव को सुधारता है। अधिक विवरण के लिए, [Next.js दस्तावेज़ देखें generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)।

### कदम 6: अपनी सामग्री की घोषणा करें

अनुवाद स्टोर करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
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

> आपकी सामग्री घोषणाएँ आपके अनुप्रयोग में कहीं भी परिभाषित की जा सकती हैं जब वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल होती हैं। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{ts,tsx,js,jsx,mjs,cjs}`)।
> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) को देखें।

### कदम 7: अपने कोड में सामग्री का उपयोग करें

अपने अनुप्रयोग में अपनी सामग्री की डिक्शनरी तक पहुँचें:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <IntlayerClientProvider locale={locale}>
          <ServerComponentExample />
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** क्लाइंट-साइड घटकों के लिए स्थानीयकरण प्रदान करने के लिए उपयोग किया जाता है। इसे किसी भी माता-पिता घटक में रखा जा सकता है, जिसमें लेआउट भी शामिल है। हालाँकि, इसे एक लेआउट में रखना बेहतर है क्योंकि Next.js लेआउट को पृष्ठों के बीच साझा करता है, जिससे इसे अधिक कुशल बनाता है। लेआउट में `IntlayerClientProvider` का उपयोग करके, आप इसे हर पृष्ठ के लिए पुनः आरंभ करने से बचाते हैं, जिससे प्रदर्शन में सुधार होता है और आपके अनुप्रयोग में निरंतर स्थानीयकरण संदर्भ बनाए रखा जाता है।
- **`IntlayerServerProvider`** सर्वर बच्चों के लिए स्थानीयकरण प्रदान करने के लिए उपयोग किया जाता है। इसे लेआउट में सेट नहीं किया जा सकता है।

  > लेआउट और पृष्ठ एक सामान्य सर्वर संदर्भ साझा नहीं कर सकते हैं क्योंकि सर्वर संदर्भ प्रणाली प्रति-अनुरोध डेटा स्टोर (React के [cache](https://react.dev/reference/react/cache) तंत्र के माध्यम से) पर आधारित है, जिससे अनुप्रयोग के विभिन्न खंडों के लिए प्रत्येक "संदर्भ" को फिर से बनाया जा रहा है। साझा लेआउट में प्रदाता को रखना इस पृथक्करण को तोड़ देगा, जिससे सर्वर संदर्भ मानों का सही प्रसारण रोका जाएगा।

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> यदि आप अपनी सामग्री का उपयोग किसी `string` विशेषता में करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन का मान कॉल करना चाहिए, जैसे:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useIntlayer.md) को देखें।

### (वैकल्पिक) कदम 8: अपनी मेटाडेटा का अंतर्राष्ट्रीयकरण

यदि आप अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करना चाहते हैं, जैसे कि अपने पृष्ठ का शीर्षक, तो आप Next.js द्वारा प्रदान किए गए `generateMetadata` फ़ंक्शन का उपयोग कर सकते हैं। फ़ंक्शन के अंदर, अपने मेटाडेटा का अनुवाद करने के लिए `getTranslationContent` फ़ंक्शन का उपयोग करें।

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
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
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... कोड का शेष भाग
````

````javascript fileName="src/app/[locale]/layout.msx or src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslationContent, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslationContent(content, locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
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
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... कोड का शेष भाग
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="javascript"
const { getTranslationContent, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslationContent(content, locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
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
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... कोड का शेष भाग
````

> मेटाडेटा ऑप्टिमाइजेशन के बारे में अधिक जानने के लिए [Next.js दस्तावेज़](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) पर जाएं।

### (वैकल्पिक) कदम 9: अपने sitemap.xml और robots.txt का अंतर्राष्ट्रीयकरण

अपने `sitemap.xml` और `robots.txt` को अंतर्राष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान किए गए `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपके साइटमैप के लिए बहुभाषी URL उत्पन्न करने की अनुमति देता है।

```tsx fileName="src/app/sitemap.ts"   codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> साइटमैप ऑप्टिमाइजेशन के बारे में अधिक जानने के लिए [Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) पर जाएं। robots.txt ऑप्टिमाइजेशन के बारे में [Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) पर जाएं।

### (वैकल्पिक) कदम 10: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपके अनुप्रयोग की स्थानीयकरण सेट करने और इसके अनुसार सामग्री को अद्यतन करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
              {/* अपनी भाषा में - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान Locale में - जैसे Francés जब वर्तमान Locale Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में - जैसे French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी भाषा में - जैसे FR */}
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
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
              {/* अपनी भाषा में - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान Locale में - जैसे Francés जब वर्तमान Locale Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में - जैसे French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी भाषा में - जैसे FR */}
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
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
              {/* अपनी भाषा में - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान Locale में - जैसे Francés जब वर्तमान Locale Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में - जैसे French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी भाषा में - जैसे FR */}
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
> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` विशेषता](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` विशेषता](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` विशेषता](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` विशेषता](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ उठाने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल संवर्द्धन का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन स्वचालित प्रकारों को शामिल करती है।

```json5 fileName="tsconfig.json"
{
  // ... आपकी वर्तमान TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी वर्तमान TypeScript कॉन्फ़िगरेशन
    "types", // स्वचालित-निर्मित प्रकार शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसा की जाती है कि Intlayer द्वारा निर्मित फ़ाइलों की अनदेखी की जाए। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा निर्मित फ़ाइलों की अनदेखी करें
.intlayer
```

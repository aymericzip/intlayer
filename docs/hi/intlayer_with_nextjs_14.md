# अंतर्राष्ट्रीयकरण (i18n) के साथ Intlayer और Next.js 14 का उपयोग शुरू करना

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js 14** फ्रेमवर्क के साथ सहजता से एकीकृत होता है, जिसमें इसका शक्तिशाली **App Router** शामिल है। यह कुशल रेंडरिंग के लिए **Server Components** के साथ काम करने के लिए अनुकूलित है और [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (Next.js >= 15 से) के साथ पूरी तरह संगत है।

Intlayer के साथ, आप कर सकते हैं:

- **अनुवादों को आसानी से प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **मेटाडेटा, रूट्स और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **क्लाइंट-साइड और सर्वर-साइड दोनों घटकों में अनुवादों तक पहुंचें**।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार करें।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल का पता लगाना और स्विच करना।

> Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js Page Router का उपयोग कर रहे हैं, तो इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_page_router.md) को देखें। Next.js 15 के साथ या बिना turbopack के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) को देखें।

---

## Next.js एप्लिकेशन में Intlayer सेट अप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

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

  यह मुख्य पैकेज है जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  यह पैकेज Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, यह Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन और उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ प्रबंधन और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल करता है।

### चरण 2: अपने प्रोजेक्ट को कॉन्फ़िगर करें

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में Intlayer लॉग्स को अक्षम करना, और अधिक सेट कर सकते हैं। उपलब्ध सभी पैरामीटरों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### चरण 3: अपने Next.js कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

Intlayer का उपयोग करने के लिए अपने Next.js सेटअप को कॉन्फ़िगर करें:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर घटकों के साथ संगतता सुनिश्चित करता है।

### चरण 4: लोकेल का पता लगाने के लिए मिडलवेयर कॉन्फ़िगर करें

उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने के लिए मिडलवेयर सेट करें:

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

> `intlayerMiddleware` का उपयोग उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने और उन्हें [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर रीडायरेक्ट करने के लिए किया जाता है। इसके अतिरिक्त, यह उपयोगकर्ता की पसंदीदा लोकेल को कुकी में सहेजने में सक्षम बनाता है।

> अपने एप्लिकेशन के रूट्स से मेल खाने के लिए `matcher` पैरामीटर को अनुकूलित करें। अधिक विवरण के लिए, [Next.js दस्तावेज़](https://nextjs.org/docs/app/building-your-application/routing/middleware) पर `matcher` को कॉन्फ़िगर करने के बारे में पढ़ें।

### चरण 5: गतिशील लोकेल रूट्स परिभाषित करें

`RootLayout` से सब कुछ हटा दें और निम्नलिखित कोड से बदलें:

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

> `RootLayout` घटक को खाली रखना `<html>` टैग के [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) और [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) विशेषताओं को सेट करने की अनुमति देता है।

गतिशील रूटिंग को लागू करने के लिए, अपने `[locale]` निर्देशिका में एक नया लेआउट जोड़कर लोकेल के लिए पथ प्रदान करें:

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

> `[locale]` पथ खंड का उपयोग लोकेल को परिभाषित करने के लिए किया जाता है। उदाहरण: `/en-US/about` `en-US` को संदर्भित करेगा और `/fr/about` `fr` को।

इसके बाद, अपने एप्लिकेशन लेआउट में `generateStaticParams` फ़ंक्शन लागू करें।

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // सम्मिलित करने के लिए पंक्ति

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... कोड का शेष भाग*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // सम्मिलित करने के लिए पंक्ति

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... कोड का शेष भाग*/
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // सम्मिलित करने के लिए पंक्ति

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... कोड का शेष भाग*/
};

module.exports = LocaleLayout;
```

> `generateStaticParams` यह सुनिश्चित करता है कि आपका एप्लिकेशन सभी लोकेल के लिए आवश्यक पृष्ठों को पहले से तैयार कर ले, रनटाइम गणना को कम कर और उपयोगकर्ता अनुभव को बेहतर बना सके। अधिक विवरण के लिए, [Next.js दस्तावेज़](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) पर `generateStaticParams` के बारे में पढ़ें।

### चरण 6: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएँ और प्रबंधित करें:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        hi: "संपादन करके शुरू करें",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        hi: "संपादन करके शुरू करें",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        hi: "संपादन करके शुरू करें",
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
        "es": "Comience por editar",
        "hi": "संपादन करके शुरू करें"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx",
        "hi": "src/app/page.tsx"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं, जब तक वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हैं। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{ts,tsx,js,jsx,mjs,cjs}`)।
> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) देखें।

### चरण 7: अपनी कोड में सामग्री का उपयोग करें

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुँचें:

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

- **`IntlayerClientProvider`** का उपयोग क्लाइंट-साइड घटकों को लोकेल प्रदान करने के लिए किया जाता है। इसे किसी भी पैरेंट घटक में रखा जा सकता है, जिसमें लेआउट भी शामिल है। हालांकि, इसे लेआउट में रखना अनुशंसित है क्योंकि Next.js पृष्ठों के बीच लेआउट कोड साझा करता है, जिससे यह अधिक कुशल हो जाता है। लेआउट में `IntlayerClientProvider` का उपयोग करके, आप इसे हर पृष्ठ के लिए पुनः आरंभ करने से बचते हैं, प्रदर्शन में सुधार करते हैं और अपने एप्लिकेशन में एक सुसंगत स्थानीयकरण संदर्भ बनाए रखते हैं।
- **`IntlayerServerProvider`** का उपयोग सर्वर बच्चों को लोकेल प्रदान करने के लिए किया जाता है। इसे लेआउट में सेट नहीं किया जा सकता।

  > लेआउट और पृष्ठ एक सामान्य सर्वर संदर्भ साझा नहीं कर सकते क्योंकि सर्वर संदर्भ प्रणाली प्रति-रिक्वेस्ट डेटा स्टोर (के माध्यम से [React’s cache](https://react.dev/reference/react/cache) तंत्र) पर आधारित है, जिससे एप्लिकेशन के विभिन्न खंडों के लिए प्रत्येक “संदर्भ” को पुनः बनाया जाता है। साझा लेआउट में प्रदाता को रखने से यह पृथक्करण टूट जाएगा, जिससे आपके सर्वर घटकों को सर्वर संदर्भ मानों का सही प्रचार रोक दिया जाएगा।

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

> यदि आप अपनी सामग्री का उपयोग `string` विशेषता में करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useIntlayer.md) देखें।

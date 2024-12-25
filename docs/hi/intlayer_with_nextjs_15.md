````markdown
# Intlayer और Next.js 15 App Router के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करना

## Intlayer क्या है?

**Intlayer** एक नवोन्मेषी, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) पुस्तकालय है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js 15** फ्रेमवर्क के साथ seamlessly एकीकृत होता है, जिसमें इसकी शक्तिशाली **App Router** शामिल है। यह कुशल रेंडरिंग के लिए **Server Components** के साथ काम करने के लिए अनुकूलित किया गया है और [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) के साथ पूरी तरह से संगत है।

Intlayer के साथ, आप कर सकते हैं:

- **घटक स्तर पर स्पष्ट शब्दकोशों का उपयोग करके अनुवाद का आसानी से प्रबंधन करें।**
- **धारणाओं, मार्गों और सामग्री का गतिशील रूप से स्थानीयकरण करें।**
- **क्लाइंट-साइड और सर्वर-साइड घटकों में अनुवाद तक पहुँच प्राप्त करें।**
- **ऑटो-जेनरेटेड प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें, जो ऑटो-कम्पलीशन और त्रुटि पहचान में सुधार करता है।**
- **गतिशील लोकल खोज और स्विचिंग जैसी उन्नत सुविधाओं का लाभ उठाएँ।**

> Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js Page Router का उपयोग कर रहे हैं, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_page_router.md) को संदर्भित कर सकते हैं। Next.js 12, 13, और 14 के लिए App Router के साथ, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_14.md) का संदर्भ लें।

---

## एक Next.js अनुप्रयोग में Intlayer सेट अप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरता स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer next-intlayer
```
````

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  यह मुख्य पैकेज है जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  यह पैकेज Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, इसमें प्राप्त करना शामिल है कि Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन, साथ ही उपयोगकर्ता की पसंदीदा लोकल का पता लगाने, कुकीज़ का प्रबंधन करने, और URL रीडायरेक्शन संभालने के लिए मिडलवेयर शामिल है।

### चरण 2: अपने प्रोजेक्ट कॉन्फ़िगर करें

अपने अनुप्रयोग की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URLs, मिडलवेयर रीडायरेक्शन, कुकी के नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और अधिक। उपलब्ध पैरामीटर की पूर्ण सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) का संदर्भ लें।

### चरण 3: अपने Next.js कॉन्फ़िगरेशन में Intlayer एकीकृत करें

अपने Next.js सेटअप को Intlayer का उपयोग करने के लिए कॉन्फ़िगर करें:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनका मॉनिटर करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर घटकों के साथ संगतता सुनिश्चित करता है।

### चरण 4: लोकल पहचान के लिए मिडलवेयर कॉन्फ़िगर करें

उपयोगकर्ता की पसंदीदा लोकल का पता लगाने के लिए मिडलवेयर सेट करें:

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

> `intlayerMiddleware` का उपयोग उपयोगकर्ता की पसंदीदा लोकल का पता लगाने और उन्हें उपयुक्त URL पर रीडायरेक्ट करने के लिए किया जाता है जैसा कि [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में निर्दिष्ट है। इसके अतिरिक्त, यह उपयोगकर्ता की पसंदीदा लोकल को एक कुकी में सहेजने में सक्षम बनाता है।

### चरण 5: गतिशील लोकल मार्गों को परिभाषित करें

`RootLayout` से सब कुछ हटा दें और इसे नीचे दिए गए कोड से स्थानापन्न करें:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> `RootLayout` घटक को खाली रखना `<html>` टैग के लिए [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) और [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) विशेषताओं को सेट करने की अनुमति देता है।

गतिशील रूटिंग को लागू करने के लिए, अपने `[locale]` निर्देशिका में एक नया लेआउट जोड़कर लोकल के लिए पथ प्रदान करें:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> `[locale]` पथ खंड का उपयोग लोकल को परिभाषित करने के लिए किया जाता है। उदाहरण: `/en-US/about` `en-US` को संदर्भित करेगा और `/fr/about` को `fr`।

फिर, अपने अनुप्रयोग लेआउट में `generateStaticParams` फ़ंक्शन लागू करें।

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // जोड़ने के लिए लाइन

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Rest of the code*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // जोड़ने के लिए लाइन

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Rest of the code*/
};

// ... Rest of the code
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // जोड़ने के लिए लाइन

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Rest of the code*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` सुनिश्चित करता है कि आपका अनुप्रयोग सभी लोकल के लिए आवश्यक पृष्ठों का पूर्व-निर्माण करता है, रनटाइम गणना को कम करता है और उपयोगकर्ता अनुभव में सुधार करता है। अधिक जानकारी के लिए, [Next.js पर generateStaticParams के बारे में दस्तावेज़](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) को संदर्भित करें।

### चरण 6: अपनी सामग्री की घोषणा करें

अनुवादों को स्टोर करने के लिए अपनी सामग्री घोषणाओं को बनाएं और प्रबंधित करें:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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

> आपकी सामग्री की घोषणाएँ आपके अनुप्रयोग में कहीं भी परिभाषित की जा सकती हैं जब तक कि उन्हें `contentDir` निर्देशिका में शामिल किया जा सके (डिफ़ॉल्ट रूप से, `./src`)। और सामग्री की घोषणा फ़ाइल एक्सटेंशन का मेल खाता हो (डिफ़ॉल्ट रूप से, `.content.{ts,tsx,js,jsx,mjs,cjs}`)।
> अधिक जानकारी के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) को संदर्भित करें।

### चरण 7: अपने कोड में सामग्री का उपयोग करें

अपने अनुप्रयोग में अपने सामग्री शब्दकोशों तक पहुँच प्राप्त करें:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />

        <IntlayerClientProvider locale={locale}>
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

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

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

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

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

- **`IntlayerClientProvider`** का उपयोग क्लाइंट-साइड घटकों को लोकल प्रदान करने के लिए किया जाता है। इसे किसी भी पैरेंट घटक में रखा जा सकता है, जिसमें लेआउट भी शामिल है। हालाँकि, इसे लेआउट में रखना अनुशंसित है क्योंकि Next.js लेआउट को पृष्ठों के बीच साझा करता है, जिससे यह अधिक कुशल बनता है। लेआउट में `IntlayerClientProvider` का उपयोग करने से आप इसे प्रत्येक पृष्ठ के लिए फिर से शुरू करने से बचते हैं, जिससे प्रदर्शन में सुधार होता है और आपके अनुप्रयोग में एक निरंतर स्थानीयकरण संदर्भ बनाए रखने में मदद मिलती है।
- **`IntlayerServerProvider`** का उपयोग सर्वर बच्चों को लोकल प्रदान करने के लिए किया जाता है। इसे लेआउट में सेट नहीं किया जा सकता है।

> लेआउट और पृष्ठ एक सामान्य सर्वर संदर्भ साझा नहीं कर सकते क्योंकि सर्वर संदर्भ प्रणाली एक प्रति-अनुरोध डेटा स्टोर ([@React के कैश](https://react.dev/reference/react/cache) तंत्र के माध्यम से) पर आधारित है, जिसके कारण प्रत्येक "संदर्भ" के लिए अलग हो जाता है एप्लिकेशन के विभिन्न खंडों के लिए पुन: बनाई जाती है। साझा लेआउट में प्रदाता रखना इस अलगाव को तोड़ देगा, सर्वर संदर्भ मूल्यों के सही प्रसार को रोक देगा।

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
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

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
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

> यदि आप अपनी सामग्री का उपयोग `string` विशेषता में करना चाहते हैं, जैसे कि `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useIntlayer.md) को देखें।

### (वैकल्पिक) चरण 8: अपने मेटाडेटा का अंतर्राष्ट्रीयकरण

यदि आप अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करना चाहते हैं, जैसे कि अपने पृष्ठ का शीर्षक, तो आप Next.js द्वारा प्रदान की गई `generateMetadata` फ़ंक्शन का उपयोग कर सकते हैं। फ़ंक्शन के अंदर, अपने मेटाडेटा का अनुवाद करने के लिए `getTranslationContent` फ़ंक्शन का उपयोग करें।

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
   * प्रत्येक स्थानीयकरण के लिए सभी url बनाने वाली एक वस्तु उत्पन्न करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटता है
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

// ... अन्य कोड
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslationContent, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslationContent(content, locale);

  /**
   * प्रत्येक स्थानीयकरण के लिए सभी url बनाने वाली एक वस्तु उत्पन्न करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
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

// ... अन्य कोड
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslationContent, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslationContent(content, locale);

  /**
   * प्रत्येक स्थानीयकरण के लिए सभी url बनाने वाली एक वस्तु उत्पन्न करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
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

// ... अन्य कोड
````

> मेटाडेटा अनुकूलन के बारे में अधिक जानने के लिए [आधिकारिक Next.js दस्तावेज़](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) पर जाएँ।

### (वैकल्पिक) चरण 9: अपने sitemap.xml और robots.txt का अंतर्राष्ट्रीयकरण

अपने `sitemap.xml` और `robots.txt` का अंतर्राष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान की गई `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपके साइटमैप के लिए बहु-भाषी URLs उत्पन्न करने की अनुमति देता है।

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
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

> साइटमैप अनुकूलन के बारे में अधिक जानने के लिए [आधिकारिक Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) पर जाएँ। और robots.txt अनुकूलन के लिए [आधिकारिक Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) पर जाएँ।

### (वैकल्पिक) चरण 10: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान की गई `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको अनुप्रयोग की लोकल को सेट करने और उसके अनुसार सामग्री को अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए FR */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए FR */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए FR */}
              {localeItem}
            </span>
          </Link>
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

Intlayer TypeScript के फ़ायदे प्राप्त करने के लिए मॉड्यूल वृद्धि का उपयोग करता है और आपके कोडबेस को मजबूत बनाता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    "types", // ऑटो-जनरेटेड प्रकारों को शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा उत्पन्न फ़ाइलों को नज़रअंदाज़ करें। इससे आप उन्हें अपने Git भंडार में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को नज़रअंदाज़ करें
.intlayer
```

---
createdAt: 2024-12-06
updatedAt: 2026-06-23
title: "Next.js 14 i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Next.js 14 ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - शक्ति
  - Intlayer
  - Next.js 14
  - जावास्क्रिप्ट
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 14
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी Next.js 14 और App Router वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

## विषय-सूची

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`नेक्स्ट-इंटल` या `आई18नेक्स्ट` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

<AccordionGroup>
<Accordion header="पूर्ण Next.js कवरेज">

कुशल रेंडरिंग के लिए इंटलेयर को **सर्वर कंपोनेंट्स** के साथ काम करने के लिए अनुकूलित किया गया है और यह [**टर्बोपैक**](https://nextjs.org/docs/architecture/turbopack) के साथ पूरी तरह से संगत है। यह स्थैतिक रेंडरिंग को अवरुद्ध नहीं करता है और मिडलवेयर के साथ-साथ अंतर्राष्ट्रीयकरण (i18n) को स्केल करने के लिए आवश्यक सभी सुविधाएँ प्रदान करता है।

> इंटलेयर Next.js 12, 13, 14, 15 और 16 के साथ संगत है। यदि आप Next.js पेज राउटर का उपयोग कर रहे हैं, तो आप इस [गाइड] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md) को देख सकते हैं।
> लोकेल रूटिंग एसईओ, बंडल आकार और प्रदर्शन के लिए उपयोगी है। यदि आपको इसकी आवश्यकता नहीं है, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) का संदर्भ ले सकते हैं।
> ऐप राउटर के साथ Next.js 12, 13, 14, और 15 के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md) को देखें।

</Accordion>

<Accordion header="Bundle size">

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

</Accordion>

<Accordion header="रखरखाव">

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

</Accordion>

<Accordion header="AI Agent">

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

</Accordion>

<Accordion header="Automation">

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

</Accordion>

<Accordion header="Performance">

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

</Accordion>

<Accordion header="किसी भी देव के साथ स्केलिंग">

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

</Accordion>
</AccordionGroup>

---

## Next.js एप्लिकेशन में Intlayer सेट अप करने के लिए चरण-दर-चरण गाइड

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीय बनाने का तरीका"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [Application Template](https://github.com/aymericzip/intlayer-next-14-template) देखें।

<Steps>

<Step number={1} title="डिपेंडेंसी इंस्टॉल करें">

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` ध्वज (flag) वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके एनवायरनमेंट को डिटेक्ट करेगी और आवश्यक पैकेज इंस्टॉल करेगी। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  यह मुख्य पैकेज है जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  यह पैकेज Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, यह Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन और उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ प्रबंधन, और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल करता है।

</Step>

<Step number={2} title="अपने प्रोजेक्ट को कॉन्फ़िगर करें">

Here is the final structure that we will make:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
// भाषाओं और कॉन्फ़िगरेशन के लिए Intlayer आयात करें
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएं
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में Intlayer लॉग्स को अक्षम करना, और अधिक सेट कर सकते हैं। उपलब्ध पैरामीटरों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने Next.js कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

Intlayer का उपयोग करने के लिए अपने Next.js सेटअप को कॉन्फ़िगर करें:

```typescript fileName="next.config.mjs"
// Intlayer को Next.js के साथ एकीकृत करने के लिए आयात करें
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरणों के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर घटकों के साथ संगतता सुनिश्चित करता है।

> `withIntlayer()` फ़ंक्शन एक promise फ़ंक्शन है। यदि आप इसे अन्य plugins के साथ उपयोग करना चाहते हैं, तो आप इसे await कर सकते हैं। उदाहरण:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

</Step>

<Step number={4} title="लोकेल डिटेक्शन के लिए मिडलवेयर कॉन्फ़िगर करें">

उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने के लिए मिडलवेयर सेट करें:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
// Intlayer मिडलवेयर को आयात और निर्यात करें
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerMiddleware` का उपयोग उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने और उन्हें [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर रीडायरेक्ट करने के लिए किया जाता है। इसके अतिरिक्त, यह उपयोगकर्ता की पसंदीदा लोकेल को कुकी में सहेजने में सक्षम बनाता है।

> Intlayer v9 के बाद से, यह middleware `routing.enableProxy` option को सम्मान करता है (`true` डिफ़ॉल्ट रूप से)। इस फ़ाइल को हटाए बिना इसे pass-through में बदलने के लिए अपने configuration में `routing.enableProxy: false` सेट करें। [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/releases/v9.md) देखें।

> अपने एप्लिकेशन के रूट्स से मेल खाने के लिए `matcher` पैरामीटर को अनुकूलित करें। अधिक विवरण के लिए, [Next.js दस्तावेज़](https://nextjs.org/docs/app/building-your-application/routing/middleware) देखें।

> यदि आपको कई middlewares को एक साथ जोड़ना है (उदाहरण के लिए, `intlayerMiddleware` को authentication या custom middlewares के साथ), Intlayer अब `multipleMiddlewares` नामक एक helper प्रदान करता है।

```ts
import {
  multipleMiddlewares,
  intlayerMiddleware,
} from "next-intlayer/middleware";
import { customMiddleware } from "@utils/customMiddleware";

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  customMiddleware,
]);
```

</Step>

<Step number={5} title="डायनामिक लोकेल रूट्स परिभाषित करें">

`RootLayout` से सब कुछ हटा दें और निम्नलिखित कोड से बदलें:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
// रूट लेआउट घटक को परिभाषित करें
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

> `RootLayout` घटक को खाली रखना `<html>` टैग पर [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) और [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) विशेषताओं को सेट करने की अनुमति देता है।

डायनामिक रूटिंग को लागू करने के लिए, अपने `[locale]` डायरेक्टरी में एक नया लेआउट जोड़कर लोकेल के लिए पथ प्रदान करें:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
// डायनामिक लोकेल लेआउट घटक को परिभाषित करें
import { type Next14LayoutIntlayer, IntlayerProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
    </body>
  </html>
);

import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </body>
  </html>
);

export default LocaleLayout;
```

> एक एकल `IntlayerProvider` पेड़ के दोनों हिस्सों को कवर करता है: यह request-scoped server context को seed करता है जो server hooks द्वारा पढ़ा जाता है, और client provider को mount करता है ताकि client components को समान locale प्राप्त हो।

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </body>
  </html>
);

module.exports = LocaleLayout;
```

 </Tab>
</Tabs>

> `[locale]` पथ खंड का उपयोग लोकेल को परिभाषित करने के लिए किया जाता है। उदाहरण: `/en-US/about` `en-US` को संदर्भित करेगा और `/fr/about` `fr` को।

> इस चरण में, आपको त्रुटि का सामना करना पड़ेगा: `Error: Missing <html> and <body> tags in the root layout.`। यह अपेक्षित है क्योंकि `/app/page.tsx` फ़ाइल अब उपयोग में नहीं है और इसे हटाया जा सकता है। इसके बजाय, `[locale]` पथ खंड `/app/[locale]/page.tsx` पृष्ठ को सक्रिय करेगा। परिणामस्वरूप, पृष्ठ आपके ब्राउज़र में `/en`, `/fr`, `/es` जैसे पथों के माध्यम से सुलभ होंगे। डिफ़ॉल्ट लोकेल को रूट पृष्ठ के रूप में सेट करने के लिए, चरण 4 में `middleware` सेटअप देखें।

फिर, अपने एप्लिकेशन लेआउट में `generateStaticParams` फ़ंक्शन लागू करें।

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // डालने के लिए पंक्ति

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... कोड का शेष भाग*/
};

export default LocaleLayout;
```

> `generateStaticParams` यह सुनिश्चित करता है कि आपका एप्लिकेशन सभी लोकेल्स के लिए आवश्यक पृष्ठों को पहले से निर्मित करता है, रनटाइम गणना को कम करता है और उपयोगकर्ता अनुभव को बेहतर बनाता है। अधिक विवरण के लिए, [generateStaticParams पर Next.js प्रलेखन](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) देखें।

</Step>

<Step number={6} title="अपनी सामग्री घोषित करें">

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएँ और प्रबंधित करें:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        hi: "संपादन करके शुरू करें",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "hi": "संपादन करके शुरू करें",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "hi": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि उन्हें `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल किया गया हो। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हो (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>

<Step number={7} title="अपनी सामग्री का कोड में उपयोग करें">

अपने एप्लिकेशन में अपने कंटेंट डिक्शनरीज़ को एक्सेस करें:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
import { useIntlayer } from "next-intlayer";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <ServerComponentExample />
      <ClientComponentExample />
    </>
  );
};

export default Page;
```

- **`IntlayerProvider`** को locale layout में एक बार mount किया जाता है। यह server और client दोनों components को locale प्रदान करता है, इसलिए pages अब खुद को wrap नहीं करते हैं।
- Server hooks locale को इस क्रम में resolve करते हैं: call site पर pass किया गया locale, फिर provider द्वारा seeded server context, फिर request के साथ carry किया गया locale (Intlayer proxy द्वारा set की गई `x-intlayer-locale` header, फिर locale cookie)। यह अंतिम चरण यह सुनिश्चित करता है कि client-side navigation पर content सही रहे जो केवल page segment को re-render करता है, जहां layout — और इसके साथ provider — फिर से run नहीं होता है।

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुँचें:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
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
        <ServerComponentExample />
        <ClientComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** का उपयोग क्लाइंट-साइड घटकों को लोकेल प्रदान करने के लिए किया जाता है। इसे किसी भी पैरेंट घटक में रखा जा सकता है, जिसमें लेआउट भी शामिल है। हालाँकि, इसे लेआउट में रखना अनुशंसित है क्योंकि Next.js पृष्ठों में लेआउट कोड साझा करता है, जिससे यह अधिक कुशल हो जाता है। लेआउट में `IntlayerClientProvider` का उपयोग करके, आप इसे हर पृष्ठ के लिए पुनः आरंभ करने से बचते हैं, प्रदर्शन में सुधार करते हैं और अपने एप्लिकेशन में एक सुसंगत स्थानीयकरण संदर्भ बनाए रखते हैं।
- **`IntlayerServerProvider`** का उपयोग सर्वर बच्चों को लोकेल प्रदान करने के लिए किया जाता है। इसे लेआउट में सेट नहीं किया जा सकता।

> Layout और page एक common server context साझा नहीं कर सकते क्योंकि server context system एक per-request data store पर आधारित है (via [React's cache](https://react.dev/reference/react/cache) mechanism), जिससे प्रत्येक "context" application के विभिन्न segments के लिए re-create होता है। Provider को एक shared layout में रखने से यह isolation टूट जाएगी, जिससे server context values का सही propagation आपके server components तक नहीं हो पाएगा।

</Tab>
</Tabs>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएं

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` isomorphic import path है: `react-server` export condition server components को ambient-locale implementation देता है, जबकि client components को context-backed implementation मिलता है। यही call दोनों sides पर काम करती है।

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

</Tab>
</Tabs>

> यदि आप अपनी सामग्री को `string` एट्रिब्यूट में उपयोग करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayer.md) देखें।

</Step>

<Step number={8} title="अपने मेटाडेटा का अंतर्राष्ट्रीयकरण" isOptional={true}>

यदि आप अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करना चाहते हैं, जैसे कि आपके पृष्ठ का शीर्षक, तो आप Next.js द्वारा प्रदान किए गए `generateMetadata` फ़ंक्शन का उपयोग कर सकते हैं। इसके अंदर, आप अपने मेटाडेटा का अनुवाद करने के लिए `getIntlayer` फ़ंक्शन से सामग्री प्राप्त कर सकते हैं।

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

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

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "hi": "Preact लोगो",
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "hi": "create next app द्वारा जेनरेट किया गया",
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
      },
    },
  },
};
```

````javascript fileName="src/app/[locale]/layout.msx or src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  /**
   * प्रत्येक लोकेल के लिए सभी URL युक्त एक ऑब्जेक्ट उत्पन्न करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // परिणाम
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
      hi: "मेरा शीर्षक",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      hi: "मेरा विवरण",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... कोड का शेष भाग
````

> ध्यान दें कि `next-intlayer` से imported `getIntlayer` function आपकी content को `IntlayerNode` में wrapped करके return करता है, जो visual editor के साथ integration की अनुमति देता है। इसके विपरीत, `intlayer` से imported `getIntlayer` function आपकी content को बिना किसी अतिरिक्त properties के directly return करता है।

> मेटाडेटा ऑप्टिमाइजेशन के बारे में अधिक जानें [Next.js के आधिकारिक दस्तावेज़](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) पर।

</Step>

<Step number={9} title="अपने sitemap.xml और robots.txt का अंतर्राष्ट्रीयकरण" isOptional={true}>

अपने `sitemap.xml` और `robots.txt` का अंतर्राष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान की गई `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपके साइटमैप के लिए बहुभाषी URL उत्पन्न करने की अनुमति देता है।

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

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/hi/login", "/hi/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> साइटमैप अनुकूलन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) पर। robots.txt अनुकूलन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) पर।

</Step>

<Step number={10} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

अपनी सामग्री की भाषा बदलने के लिए, Next.js में अनुशंसित तरीका `Link` घटक का उपयोग करके उपयोगकर्ताओं को उपयुक्त स्थानीयकृत पृष्ठ पर पुनर्निर्देशित करना है। `Link` घटक पृष्ठ के पूर्व-प्राप्ति को सक्षम करता है, जो पूर्ण पृष्ठ पुनः लोड से बचने में मदद करता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* लोकेल - जैसे FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकेल में भाषा - जैसे Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकेल में भाषा - जैसे Francés जब वर्तमान लोकेल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा - जैसे French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> एक वैकल्पिक तरीका `useLocale` hook द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग करना है। यह फ़ंक्शन पृष्ठ को prefetch करने की अनुमति नहीं देगा। अधिक विवरण के लिए [`useLocale` hook documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md) देखें।

> आप `onLocaleChange` विकल्प में एक फ़ंक्शन सेट कर सकते हैं ताकि जब लोकेल परिवर्तित हो तो एक कस्टम फ़ंक्शन को ट्रिगर किया जा सके।

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... बाकी कोड

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>फ्रेंच में बदलें</button>
);
```

> दस्तावेज़ संदर्भ:
>
> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` एट्रिब्यूट](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="एक स्थानीयकृत लिंक घटक बनाना" isOptional={true}>

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन का नेविगेशन वर्तमान लोकेल का सम्मान करता है, आप एक कस्टम `Link` घटक बना सकते हैं। यह घटक स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ प्रीफिक्स करता है। उदाहरण के लिए, जब एक फ्रेंच-भाषी उपयोगकर्ता "About" पृष्ठ के लिंक पर क्लिक करता है, तो उसे `/fr/about` पर रीडायरेक्ट किया जाता है, न कि `/about` पर।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजन को भाषा-विशिष्ट पृष्ठों को सही ढंग से अनुक्रमित करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: अपने एप्लिकेशन में एक स्थानीयकृत लिंक का उपयोग करके, आप यह सुनिश्चित करते हैं कि नेविगेशन वर्तमान लोकेल के भीतर बना रहे, अप्रत्याशित भाषा स्विच को रोकते हुए।
- **रखरखाव**: एकल घटक में स्थानीयकरण लॉजिक को केंद्रीकृत करना URL के प्रबंधन को सरल बनाता है, जिससे आपका कोडबेस आपके एप्लिकेशन के बढ़ने के साथ बनाए रखने और विस्तारित करने में आसान हो जाता है।

नीचे TypeScript में एक स्थानीयकृत `Link` घटक का कार्यान्वयन दिया गया है:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * यह उपयोगिता फ़ंक्शन जांचता है कि कोई URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम लिंक घटक जो href एट्रिब्यूट को वर्तमान लोकेल के आधार पर अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है URL को लोकेल के साथ प्रीफिक्स करने के लिए (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन समान लोकेल संदर्भ के भीतर बना रहे।
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

#### यह कैसे काम करता है

- **बाहरी लिंक का पता लगाना**:  
  सहायक फ़ंक्शन `checkIsExternalLink` यह निर्धारित करता है कि कोई URL बाहरी है या नहीं। बाहरी लिंक अपरिवर्तित रहते हैं क्योंकि उन्हें स्थानीयकरण की आवश्यकता नहीं होती।

- **वर्तमान लोकेल प्राप्त करना**:  
  `useLocale` हुक वर्तमान लोकेल प्रदान करता है (जैसे, फ्रेंच के लिए `fr`)।

- **URL का स्थानीयकरण**:  
  आंतरिक लिंक के लिए (यानी, गैर-बाहरी), `getLocalizedUrl` का उपयोग URL को स्वचालित रूप से वर्तमान लोकेल के साथ प्रीफिक्स करने के लिए किया जाता है। इसका मतलब है कि यदि आपका उपयोगकर्ता फ्रेंच में है, तो `/about` को `href` के रूप में पास करने से यह `/fr/about` में बदल जाएगा।

- **लिंक लौटाना**:  
  घटक एक `<a>` तत्व लौटाता है जिसमें स्थानीयकृत URL होता है, यह सुनिश्चित करते हुए कि नेविगेशन लोकेल के साथ सुसंगत है।

इस `Link` घटक को अपने एप्लिकेशन में एकीकृत करके, आप एक सुसंगत और भाषा-सचेत उपयोगकर्ता अनुभव बनाए रखते हैं, साथ ही बेहतर SEO और उपयोगिता का लाभ उठाते हैं।

</Step>

<Step number={12} title="अपने बंडल आकार को अनुकूलित करें" isOptional={true}>

यदि आपको एक Server Action के अंदर active locale की आवश्यकता है (उदाहरण के लिए, ईमेल को localize करने या locale-aware logic चलाने के लिए), तो `next-intlayer/server` से `getLocale` को कॉल करें:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // locale के साथ कुछ करें
};
```

> `getLocale` फ़ंक्शन user के locale को निर्धारित करने के लिए एक cascading strategy का पालन करता है:
>
> 1. पहले, यह request headers में एक locale value को check करता है जो middleware द्वारा set की गई हो सकती है
> 2. यदि headers में कोई locale नहीं मिलता है, तो यह cookies में stored locale को खोजता है
> 3. यदि कोई cookie नहीं मिलता है, तो यह user की browser settings से preferred language को detect करने का प्रयास करता है
> 4. अंतिम उपाय के रूप में, यह application के configured default locale पर fallback करता है
>
> यह उपलब्ध context के आधार पर सबसे उपयुक्त locale को चुना जाता है।

</Step>

<Step number={13} title="अपने bundle size को optimize करें" isOptional={true}>

`next-intlayer` का उपयोग करते समय, डिफ़ॉल्ट रूप से प्रत्येक पृष्ठ के लिए शब्दकोश बंडल में शामिल होते हैं। बंडल आकार को अनुकूलित करने के लिए, Intlayer एक वैकल्पिक SWC प्लगइन प्रदान करता है जो मैक्रोज़ का उपयोग करके `useIntlayer` कॉल को बुद्धिमानी से बदलता है। यह सुनिश्चित करता है कि शब्दकोश केवल उन पृष्ठों के बंडल में शामिल हों जो वास्तव में उनका उपयोग करते हैं।

इस अनुकूलन को सक्षम करने के लिए, `@intlayer/swc` पैकेज इंस्टॉल करें। एक बार इंस्टॉल हो जाने पर, `next-intlayer` स्वचालित रूप से प्लगइन का पता लगाएगा और उसका उपयोग करेगा:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> नोट: यह अनुकूलन केवल Next.js 13 और उच्चतर के लिए उपलब्ध है।

> नोट: यह पैकेज डिफ़ॉल्ट रूप से स्थापित नहीं होता है क्योंकि SWC प्लगइन अभी भी Next.js पर प्रयोगात्मक हैं। यह भविष्य में बदल सकता है।

> नोट: यदि आप विकल्प को `importMode: 'dynamic'` या `importMode: 'fetch'` के रूप में सेट करते हैं (आपके `dictionary` कॉन्फ़िगरेशन में), तो यह Suspense पर निर्भर करेगा, इसलिए आपको अपनी `useIntlayer` कॉल को एक `Suspense` boundary में लपेटना होगा। इसका मतलब है कि आप `useIntlayer` को सीधे अपने Page / Layout component के शीर्ष स्तर पर उपयोग नहीं कर सकेंगे।

</Step>

</Steps>

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसा की जाती है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपनी Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- **अनुवादों के लिए रियल-टाइम त्रुटि पहचान।**
- **अनुवादित सामग्री के इनलाइन पूर्वावलोकन।**
- **तेजी से क्रियाएं** जो अनुवादों को आसानी से बनाने और अपडेट करने में मदद करती हैं।

विस्तृत जानकारी के लिए, एक्सटेंशन का उपयोग कैसे करें, देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Next.js 14 अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

`next.config.js` का `i18n` फ़ील्ड App Router पर लागू नहीं होता है, इसलिए स्थानीयकरण परत हमेशा एक लाइब्रेरी का विकल्प होती है:

- **`next-intl`**: App Router के लिए लोकप्रिय संदेश लाइब्रेरी, रनटाइम पर JSON फ़ाइलें लोड करती है।
- **`next-i18next`**: Pages Router के लिए मानक समाधान।
- **`Intlayer`**: सबसे उन्नत समाधान। सामग्री घटक के बगल में घोषित की जाती है, बिल्ड समय पर संकलित होती है, सख्त TypeScript प्रकार, AI अनुवाद, विज़ुअल एडिटर और CMS प्रदान करती है।

प्रति-घटक घोषणा यह सुनिश्चित करती है कि एक पृष्ठ संपूर्ण कैटलॉग के बजाय केवल उन्हीं स्ट्रिंग्स को लोड करे जिन्हें वह प्रस्तुत करता है। [Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="i18n मेरे Next.js बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित समाधानों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। सर्वर घटक सर्वर पर सामग्री का समाधान करते हैं, और बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक प्रविष्टियों से बदल देता है। [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं, जिससे बंडल का आकार 50% तक कम हो जाता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना next-intl, next-i18next या i18next से माइग्रेट कर सकता हूँ?">

हाँ, इसके दो रास्ते हैं। आप [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) या [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) के साथ सामग्री को धीरे-धीरे स्थानांतरित कर सकते हैं। या आप अपने वर्तमान API को पूरी तरह से रख सकते हैं: [संगतता एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) बिल्कुल समान API प्रदान करते हैं लेकिन Intlayer शब्दकोशों द्वारा संचालित होते हैं।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) JSX, TSX, Vue और Svelte कोड पर निर्माण समय के दौरान भी यही करता है, प्रत्येक परिवर्तन पर शब्दकोश उत्पन्न करता है जिससे कुंजियों को मैन्युअल रूप से बनाए रखने की आवश्यकता समाप्त हो जाती है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="Intlayer किन Next.js संस्करणों का समर्थन करता है?">

Next.js 12, 13, 14, 15, और 16। App Router और Pages Router दोनों पूरी तरह से समर्थित हैं।

</Question>

<Question title="क्या Intlayer React Server Components के साथ काम करता है?">

हाँ। सर्वर घटकों में सामग्री सीधे सर्वर पर हल की जाती है, इसलिए सर्वर द्वारा रेंडर किए गए टेक्स्ट के लिए क्लाइंट को कोई शब्दकोश नहीं भेजा जाता है। क्लाइंट घटक प्रदाता के माध्यम से शब्दकोश पढ़ते हैं।

</Question>

<Question title="क्या मुझे URL में लोकेल शामिल करना अनिवार्य है, जैसे /hi/about?">

नहीं। `routing.mode` मान `"prefix-no-default"` (डिफ़ॉल्ट: मुख्य भाषा के लिए `/about` और अन्य के लिए `/hi/about`), `"prefix-all"`, `"no-prefix"`, और `"search-params"` स्वीकार करता है। `routing.domains` विकल्प प्रत्येक भाषा को उसके अपने डोमेन से मैप करता है। [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Question>

<Question title="SEO के लिए hreflang टैग और स्थानीयकृत मेटाडेटा कैसे जोड़ें?">

`generateMetadata` और `sitemap.xml` चरण इसे कवर करते हैं। फ़ंक्शन `getMultilingualUrls` प्रत्येक घोषित लोकेल के लिए `alternates.languages` मैपिंग उत्पन्न करता है, जिसमें `x-default` शामिल है, ताकि सर्च इंजन सही तरीके से इंडेक्स करें।

</Question>

<Question title="क्या मुझे मिडलवेयर की आवश्यकता है?">

मिडलवेयर विज़िटर की भाषा का पता लगाता है और उपयुक्त उपसर्ग पर पुनर्निर्देशित करता है, इसलिए यदि आप स्वयं रूटिंग नहीं संभाल रहे हैं तो इसकी अनुशंसा की जाती है। API रूट और स्थिर संपत्तियां स्वचालित रूप से बाहर रखी जाती हैं।

</Question>

<Question title="स्थानीयकृत लिंक घटक कैसे बनाएं?">

घटक मानक Next.js `Link` को लपेटता है और `getLocalizedUrl` के माध्यम से href पास करता है, ताकि `/about` लिंक स्वचालित रूप से सक्रिय लोकेल उपसर्ग प्राप्त करे जैसे `/hi/about`।

</Question>

<Question title="मैं ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं। CLI अनुपलब्ध अनुवादों का पता लगाता है और आपके द्वारा चुने गए LLM के साथ आपके स्वयं के प्रदाता और API कुंजी का उपयोग करके उन्हें भरता है। `--git-diff` ध्वज वर्तमान शाखा पर बदली गई सामग्री तक सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

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

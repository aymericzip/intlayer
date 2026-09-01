---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Astro i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Astro ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ा गया"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Astro एकीकरण, कॉन्फ़िगरेशन और उपयोग का अपडेट"
author: aymericzip
---

# Intlayer के साथ अपनी Astro साइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डिमो कोडसैंडबॉक्स - Intlayer के साथ अपने एप्लिकेशन को कैसे अंतर्राष्ट्रीयकृत करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## विषय-सूची

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`एस्ट्रो-आई18एन` या `आई18नेक्स्ट` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

<AccordionGroup>
<Accordion header="पूर्ण एस्ट्रो कवरेज">

इंटलेयर को **बहुभाषी रूटिंग**, **साइटमैप**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके एस्ट्रो के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

</Accordion>

<Accordion header="Bundle आकार">

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

</Accordion>

<Accordion header="रखरखाव">

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

</Accordion>

<Accordion header="AI Agent">

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

</Accordion>

<Accordion header="ऑटोमेशन">

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

## Astro में Intlayer को कॉन्फ़िगर करने के लिए चरण-दर-चरण मार्गदर्शिका

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-astro-template) देखें।

<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

अपने package manager का उपयोग करके आवश्यक packages को install करें:

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

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज स्थापित करें:

> यह command आपके environment को detect करेगा और आवश्यक packages को install करेगा। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer astro-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
```

```bash packageManager="bun"
bun add intlayer astro-intlayer
```

- **intlayer**
  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए i18n टूल प्रदान करता है।

- **astro-intlayer**
  Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ जोड़ने के लिए Astro एकीकरण प्लगइन, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्ट को संभालने के लिए मिडलवेयर शामिल है।

</Step>

<Step number={2} title="अपना प्रोजेक्ट कॉन्फ़िगर करें">

अपने एप्लिकेशन की भाषाओं को परिभाषित करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएँ:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.HINDI,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्ट, कुकी नाम, सामग्री घोषणाओं का स्थान और एक्सटेंशन कॉन्फ़िगर कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और बहुत कुछ। उपलब्ध मापदंडों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने Astro कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

अपने Astro कॉन्फ़िगरेशन में `intlayer` प्लगइन जोड़ें।

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` एकीकरण प्लगइन का उपयोग Intlayer को Astro के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के उत्पादन को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Astro एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है और प्रदर्शन को अनुकूलित करने के लिए उपनाम (aliases) प्रदान करता है।

</Step>

<Step number={4} title="अपनी सामग्री घोषित करें">

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएँ और प्रबंधित करें:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      hi: "नमस्ते दुनिया",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> सामग्री घोषणाओं को आपके एप्लिकेशन में कहीं भी परिभाषित किया जा सकता है, बशर्ते वे `contentDir` (डिफ़ॉल्ट रूप से `./src`) में शामिल हों और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाती हों।

> अधिक जानकारी के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>

<Step number={5} title="Astro में सामग्री का उपयोग करना">

आप सीधे अपने `.astro` फ़ाइलों में `intlayer` से निर्यात किए गए मुख्य सहायकों का उपयोग करके शब्दकोशों का उपयोग कर सकते हैं।

```astro fileName="src/pages/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Get the current locale from the URL (e.g. /es/about -> 'es')
const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;

// Get the content for the 'app' dictionary
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Fallback for users in unmatched languages -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

</Step>

<Step number={6} title="स्थानीयकृत रूटिंग">

स्थानीयकृत पृष्ठों को परोसने के लिए गतिशील रूट सेगमेंट बनाएँ (उदा. `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astro एकीकरण एक Vite मिडलवेयर जोड़ता है जो विकास के दौरान भाषा-संवेदनशील रूटिंग और पर्यावरण परिभाषाओं में मदद करता है। आप अपनी स्वयं की तर्क या `intlayer` टूल जैसे `getLocalizedUrl` का उपयोग करके विभिन्न भाषाओं के बीच लिंक भी बना सकते हैं।

</Step>

<Step number={7} title="भाषा स्विचर जोड़ें">

उपयोगकर्ताओं को भाषाओं के बीच स्विच करने की अनुमति देने के लिए, आप एक `LocaleSwitcher` घटक बना सकते हैं। इस घटक को सभी समर्थित भाषाओं की एक सूची प्रदर्शित करनी चाहिए और प्रत्येक भाषा में उसी पृष्ठ पर लिंक करना चाहिए।

```astro fileName="src/components/LocaleSwitcher.astro"
---
import {
  locales,
  getLocaleName,
  getLocalizedUrl,
  getLocaleFromPath,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<nav>
  {
    locales.map((localeItem) => (
      <a
        href={getLocalizedUrl(pathWithoutLocale, localeItem)}
        data-locale={localeItem}
        aria-current={localeItem === locale ? "page" : undefined}
      >
        {getLocaleName(localeItem)}
      </a>
    ))
  }
</nav>

<script>
  import { setLocaleInStorageClient, getLocalizedUrl, type LocalesValues } from "intlayer";

  const localeLinks = document.querySelectorAll("[data-locale]");

  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const locale = link.getAttribute("data-locale") as LocalesValues;

      // Update the locale cookie
      setLocaleInStorageClient(locale);
    });
  });
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }
  a[aria-current="page"] {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
```

> **स्थिरता पर ध्यान दें:**
> क्लाइंट-साइड स्क्रिप्ट में `setLocaleInStorageClient` का उपयोग यह सुनिश्चित करता है कि उपयोगकर्ता की भाषा प्राथमिकता कुकी में सहेजी गई है। यह Intlayer मिडलवेयर को विकल्प याद रखने और भविष्य की यात्राओं पर उपयोगकर्ता को स्वचालित रूप से उनकी पसंदीदा भाषा में रीडायरेक्ट करने की अनुमति देता है।

</Step>

<Step number={8} title="Sitemap और Robots.txt">

Intlayer आपकी स्थानीयकृत साइटमैप और robots.txt फ़ाइलों को गतिशील रूप से बनाने के लिए उपयोगिताओं की पेशकश करता है।

#### साइटमैप (Sitemap)

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localized routes and adds the necessary metadata for search engines.

> The Intlayer generated sitemap supports the `xhtml:link` namespace (Hreflang XML Extensions). Unlike the default sitemap generators that only list raw URLs, Intlayer automatically creates the required bidirectional links between all language versions of a page (e.g., `/about`, `/about?lang=fr`, and `/about?lang=es`). This ensures search engines correctly index and serve the right language version to the right audience.

अपने सभी स्थानीयकृत रूट सहित साइटमैप उत्पन्न करने के लिए `src/pages/sitemap.xml.ts` बनाएँ।

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

खोज इंजन क्रॉलिंग को नियंत्रित करने के लिए `src/pages/robots.txt.ts` बनाएँ।

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>

<Step number={9} title="अपने पसंदीदा फ्रेमवर्क का उपयोग जारी रखें">

अपनी पसंद के फ्रेमवर्क का उपयोग करके अपना एप्लिकेशन बनाना जारी रखें।

- Intlayer + React: [React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)
- Intlayer + Vue: [Vue के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Svelte के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Solid के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Preact के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+preact.md)
  </Step>

<Step number={15} title="अपने घटकों की सामग्री निकालें" isOptional={true}>

यदि आपके पास मौजूदा कोडबेस है, तो हजारों फ़ाइलों को बदलना समय लेने वाला हो सकता है।

इस प्रक्रिया को आसान बनाने के लिए, Intlayer आपके घटकों को बदलने और सामग्री निकालने के लिए एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) / [एक्सट्रैक्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) का प्रस्ताव करता है।

इसे सेट करने के लिए, आप अपनी `intlayer.config.ts` फ़ाइल में एक `compiler` अनुभाग जोड़ सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... आपका शेष कॉन्फ़िगरेशन
  compiler: {
    /**
     * इंगित करता है कि क्या कंपाइलर सक्षम होना चाहिए।
     */
    enabled: true,

    /**
     * आउटपुट फ़ाइलों का पथ परिभाषित करता है
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * इंगित करता है कि क्या घटकों को बदलने के बाद सहेजा जाना चाहिए। उस तरह से, कंपाइलर को ऐप बदलने के लिए केवल एक बार चलाया जा सकता है, और फिर इसे हटाया जा सकता है।
     */
    saveComponents: false,

    /**
     * शब्दकोश कुंजी उपसर्ग
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='निकालें कमांड'>

अपने घटकों को बदलने और सामग्री निकालने के लिए एक्सट्रैक्टर चलाएँ

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='बैबेल कंपाइलर'>

> v9 के बाद से, `intlayerCompiler` को `intlayer` plugin में शामिल किया गया है। इसलिए आपको इसे मैन्युअल रूप से जोड़ने की आवश्यकता नहीं है।

intlayerCompiler प्लगइन शामिल करने के लिए अपनी `vite.config.ts` अपडेट करें:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

```bash packageManager="npm"
npm run build # या npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

### TypeScript कॉन्फ़िगरेशन

Intlayer अपने कोडबेस को अधिक मजबूत बनाने के लिए TypeScript का लाभ उठाने के लिए मॉड्यूल ऑगमेंटेशन (module augmentation) का उपयोग करता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपके TypeScript कॉन्फ़िगरेशन में स्वतः उत्पन्न प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपका मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपका मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वतः उत्पन्न प्रकारों को शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह उन्हें आपके Git रिपॉजिटरी में कमिट करने से बचाता है।

ऐसा करने के लिए, अपनी `.gitignore` फ़ाइल में निम्न निर्देश जोड़ें:

```bash
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप **आधिकारिक Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code Marketplace से इंस्टॉलेशन](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटो-पूर्णता**।
- अनुपलब्ध अनुवादों के लिए **वास्तविक समय त्रुटि पहचान**।
- अनूदित सामग्री का **इनलाइन पूर्वावलोकन**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग करने के बारे में अधिक जानकारी के लिए, [VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

### अपने ज्ञान को और गहरा करें

यदि आप और अधिक सीखना चाहते हैं, तो आप [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को भी लागू कर सकते हैं या अपनी सामग्री को बाहरी बनाने के लिए [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग कर सकते हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Astro साइट के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

Astro URL उपसर्गों के लिए `i18n` रूटिंग प्रदान करता है, लेकिन सामग्री प्रबंधन आप पर छोड़ देता है:

- **Astro का अंतर्निहित `i18n`** प्लस मैन्युअल JSON/TS फ़ाइलें: कोई प्रकार सुरक्षा, बहुवचन नियम या लापता अनुवाद उपकरण नहीं।
- **`i18next`** या अलग-अलग आइलैंड लाइब्रेरी (`vue-i18n`, `svelte-i18n`): प्रत्येक आइलैंड प्रकार के लिए अपने स्वयं के कैटलॉग के साथ एक पूर्ण लाइब्रेरी।
- **`Intlayer`**: Astro पृष्ठों और प्रत्येक आइलैंड फ्रेमवर्क दोनों के लिए एक साझा सामग्री परत, बिल्ड समय पर संकलित, पूर्ण प्रकारों, AI अनुवाद, विज़ुअल एडिटर और CMS के साथ।

प्रमुख लाभ यह है कि वही शब्दकोश `.astro` पृष्ठों और React, Vue, Svelte, Solid, Preact या Lit आइलैंड को सेवा प्रदान करता है। [Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे Astro बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित समाधानों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। Astro पृष्ठ बिल्ड समय पर रेंडर होते हैं, इसलिए केवल अनुवादित HTML भेजा जाता है बिना किसी अतिरिक्त शब्दकोश के; केवल इंटरैक्टिव आइलैंड घटक ही शब्दकोश प्राप्त करते हैं। [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) सामग्री को प्रति लोकेल विभाजित करते हैं, जिससे बंडल 50% तक कम हो जाता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना i18next या मैन्युअल शब्दकोशों से माइग्रेट कर सकता हूँ?">

काफी हद तक हाँ। [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) का पालन करें। आप [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) के माध्यम से भी धीरे-धीरे माइग्रेट कर सकते हैं।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी फ़ाइलों को पढ़ता है, उपयोगकर्ता के अनुकूल स्ट्रिंग्स निकालता है, और प्रत्येक के बगल में एक `.content` फ़ाइल लिखता है, जिससे आप कैटलॉग में मैन्युअल रूप से कॉपी करने के बजाय एक diff की समीक्षा करते हैं। इस गाइड का चरण 15 इसे समझाता है।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) बिल्ड समय पर यही काम करता है: प्रत्येक परिवर्तन पर कोड स्कैन करता है, शब्दकोश उत्पन्न करता है और HMR के साथ सिंक करता है।

कंपाइलर को चालू करने से पहले दो सीमाएं जानने योग्य हैं। यह स्थिर विश्लेषण द्वारा काम करता है, इसलिए जो स्ट्रिंग्स केवल रनटाइम पर मौजूद होती हैं, जैसे कि API त्रुटि कोड या CMS फ़ील्ड, वे पहुंच से बाहर रहती हैं। और इसे `className="active"` या स्थिति कोड जैसे एप्लिकेशन लॉजिक से उपयोगकर्ता के सामने आने वाले टेक्स्ट को अलग करना होगा, जिसके लिए एक बड़े कोडबेस में कुछ एनोटेशन की आवश्यकता होती है। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) आपको लूप में रखकर दोनों से बचाता है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="क्या Intlayer Astro के आइलैंड (islands) के अंदर काम करता है?">

हाँ। `astro-intlayer` `.astro` पक्ष को कवर करता है, और प्रत्येक आइलैंड फ्रेमवर्क की अपनी बाइंडिंग होती है, इसलिए आइलैंड सीधे पृष्ठ से सक्रिय लोकेल प्राप्त करते हैं। समर्पित मार्गदर्शिकाएँ [Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_react.md), [Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_vue.md), और [Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_svelte.md) के लिए उपलब्ध हैं।

</Question>

<Question title="क्या अनुवादित सामग्री स्थिर HTML के रूप में वितरित की जाती है?">

हाँ। Astro पृष्ठ डिफ़ॉल्ट रूप से बिल्ड समय पर प्रस्तुत होते हैं और Intlayer उस रेंडर के दौरान सामग्री को हल करता है, इसलिए स्थानीयकृत पृष्ठ शुद्ध स्थिर HTML होते हैं। केवल वे आइलैंड जो रनटाइम पर भाषा बदलते हैं, सक्रिय भाषा के लिए शब्दकोश प्राप्त करते हैं।

</Question>

<Question title="स्थानीयकृत रूटिंग और भाषा स्विचर कैसे सेट करें?">

इस गाइड के चरण 6 और 7 इसे समझाते हैं। `routing.mode` यह नियंत्रित करता है कि डिफ़ॉल्ट भाषा को उपसर्ग मिले (`"prefix-no-default"`), सभी भाषाओं को उपसर्ग मिले (`"prefix-all"`), या भाषा पथ से स्वतंत्र हो (`"no-prefix"`)। `getLocalizedUrl` आगंतुकों को उसी पृष्ठ पर रखते हुए वर्तमान पथ को लक्षित भाषा में अनुवादित करता है।

</Question>

<Question title="स्थानीयकृत साइटमैप और hreflang टैग कैसे बनाएं?">

चरण 8 `sitemap.xml` और `robots.txt` कॉन्फ़िगरेशन को कवर करता है। फ़ंक्शन `getMultilingualUrls` प्रत्येक घोषित लोकेल के लिए विकल्प उत्पन्न करता है, जिसमें `x-default` शामिल है, ताकि सर्च इंजन ठीक से अनुक्रमित कर सकें।

</Question>

<Question title="AI के साथ Astro साइट का स्वचालित अनुवाद कैसे करें?">

`npx intlayer fill` चलाएं। यह कमांड आपके चुने हुए LLM का उपयोग करके आपके अपने प्रदाता और API कुंजी के साथ लापता अनुवादों को भरता है, और `--git-diff` बदली गई फ़ाइलों तक संचालन को सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

</Question>

<Question title="क्या Intlayer बहुवचन, लिंग और Markdown सामग्री का समर्थन करता है?">

हाँ: [बहुवचन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/plurial.md), [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md), शर्तें, [सम्मिलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md), और लंबे पाठ के लिए [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md)।

</Question>

<Question title="अनुवादक कोड को छुए बिना सामग्री को कैसे संपादित कर सकते हैं?">

[विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) के माध्यम से, जो किसी को भी सीधे चलते हुए ऐप में टेक्स्ट संपादित करने देता है, या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के माध्यम से, जो सामग्री को अलग करता है ताकि कोड को फिर से तैनात किए बिना उसे अपडेट किया जा सके।

</Question>

<Question title="क्या Intlayer मुफ्त और ओपन सोर्स है?">

हाँ, Apache 2.0 लाइसेंस के तहत, व्यावसायिक उपयोग सहित। होस्टेड CMS एक वैकल्पिक सशुल्क सेवा है जिसे [स्वयं होस्ट (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

</Question>

</FAQ>

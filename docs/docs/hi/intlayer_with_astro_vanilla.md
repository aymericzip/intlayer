---
createdAt: 2026-04-24
updatedAt: 2026-05-31
title: "Astro + Vanilla JS i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Astro + Vanilla JS ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environment
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Vanilla JS के लिए प्रारंभिक दस्तावेज़ीकरण"
---

# Intlayer के साथ अपनी Astro + Vanilla JS साइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="डिमो कोडसैंडबॉक्स - Intlayer के साथ अपने एप्लिकेशन को कैसे अंतर्राष्ट्रीयकृत करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
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

**पूर्ण एस्ट्रो कवरेज**

इंटलेयर को **बहुभाषी रूटिंग**, **साइटमैप**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके एस्ट्रो के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

**बंडल का आकार**

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

**रखरखाव**

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

**एआई एजेंट**

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[एजेंट कौशल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

**स्वचालन**

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

**प्रदर्शन**

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

**किसी भी देव के साथ स्केलिंग**

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

---

## Astro + Vanilla JS में Intlayer को कॉन्फ़िगर करने के लिए चरण-दर-चरण मार्गदर्शिका

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-astro-template) देखें।

<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer astro-intlayer vanilla-intlayer

npx intlayer init
```

> यदि आप अपनी सामग्री का उपयोग `स्ट्रिंग` एट्रिब्यूट में करना चाहते हैं, जैसे कि `alt`, `title`, `href`, `aria-label`, आदि, तो आप फ़ंक्शन के मान का उपयोग कर सकते हैं, जैसे:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer

bun x intlayer init
```

- **intlayer**
  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए i18n टूल प्रदान करता है।

- **astro-intlayer**
  Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ जोड़ने के लिए Astro एकीकरण प्लगइन, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्ट को संभालने के लिए मिडलवेयर शामिल है।

- **vanilla-intlayer**
  Vanilla JavaScript / TypeScript अनुप्रयोगों में Intlayer को एकीकृत करने के लिए एक पैकेज। यह एक Pub/Sub सिंगलटन (`IntlayerClient`) और कॉलबैक-आधारित सहायक (`useIntlayer`, `useLocale`, आदि) प्रदान करता है, जिससे आपके Astro `<script>` टैग का कोई भी हिस्सा बिना किसी UI फ्रेमवर्क की आवश्यकता के भाषा परिवर्तनों का जवाब दे सकता है।

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

अपने Astro कॉन्फ़िगरेशन में `intlayer` प्लगइन जोड़ें। Vanilla JS के लिए, किसी अतिरिक्त UI फ्रेमवर्क एकीकरण की आवश्यकता नहीं है।

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

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      hi: "नमस्ते दुनिया",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
      hi: "मेरी बहुभाषी Astro साइट पर आपका स्वागत है।",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
      hi: "भाषा बदलें:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> सामग्री घोषणाओं को आपके एप्लिकेशन में कहीं भी परिभाषित किया जा सकता है, बशर्ते वे `contentDir` (डिफ़ॉल्ट रूप से `./src`) में शामिल हों और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाती हों।

> अधिक जानकारी के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>

<Step number={5} title="Astro में सामग्री का उपयोग करना">

Vanilla JS के साथ, सभी सर्वर-साइड रेंडरिंग सीधे `getIntlayer` का उपयोग करके `.astro` फ़ाइलों में होती है। इसके बाद, क्लाइंट पर भाषा स्विचिंग सक्षम करने के लिए एक `<script>` ब्लॉक `vanilla-intlayer` को इनिशियलाइज़ करता है।

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- कैनोनिकल लिंक -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang लिंक्स -->
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
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> **रूटिंग सेटअप पर नोट:**
> आपके द्वारा उपयोग की जाने वाली निर्देशिका संरचना `intlayer.config.ts` में `middleware.routing` सेटिंग पर निर्भर करती है:
>
> - **`prefix-no-default` (डिफ़ॉल्ट):** डिफ़ॉल्ट भाषा को रूट पर रखता है (कोई उपसर्ग नहीं) और अन्य को उपसर्ग देता है। सभी मामलों को पकड़ने के लिए `[...locale]` का उपयोग करें।
> - **`prefix-all`:** सभी URL को भाषा उपसर्ग प्राप्त होता है। यदि आपको रूट को अलग से संभालने की आवश्यकता नहीं है तो आप मानक `[locale]` का उपयोग कर सकते हैं।
> - **`search-param` या `no-prefix`:** किसी भाषा निर्देशिका की आवश्यकता नहीं है। भाषा को क्वेरी पैरामीटर या कुकीज़ के माध्यम से संभाला जाता है।

</Step>

<Step number={6} title="भाषा स्विचर जोड़ना">

Vanilla JS के साथ Astro में, भाषा स्विचर सर्वर पर नियमित लिंक के रूप में रेंडर किया जाता है और क्लाइंट पर एक `<script>` ब्लॉक के माध्यम से हाइड्रेट किया जाता है। जब कोई उपयोगकर्ता भाषा लिंक पर क्लिक करता है, तो `vanilla-intlayer` स्थानीयकृत URL पर नेविगेट करने से पहले `setLocale` के माध्यम से भाषा कुकी सेट करता है।

```astro fileName="src/pages/[...locale]/index.astro"
<!-- ऊपर चरण 5 से सर्वर-साइड मार्कअप शामिल करें -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // वर्तमान पथ से लिए गए लोकेल के साथ क्लाइंट पर Intlayer को इनिशियलाइज़ करें
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // भाषा स्विचर लिंक पर क्लिक इवेंट बाइंड करें
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **निरंतरता पर नोट:**
> `installIntlayer` सर्वर-परिभाषित लोकेल के साथ Intlayer सिंगलटन को इनिशियलाइज़ करता है। `onLocaleChange` के साथ `useLocale` सुनिश्चित करता है कि मिडलवेयर के माध्यम से नेविगेट करने से पहले भाषा कुकी सेट हो जाए, ताकि भविष्य की यात्राओं में उपयोगकर्ता की भाषा वरीयता याद रखी जाए।

> **प्रोग्रेसिव एन्हांसमेंट पर नोट:**
> भाषा स्विचर में लिंक जावास्क्रिप्ट के बिना भी मानक `<a>` टैग के रूप में काम करेंगे। जब जावास्क्रिप्ट उपलब्ध हो, तो `setLocale` को कॉल करने से नेविगेट करने से पहले कुकी अपडेट हो जाएगी, यह सुनिश्चित करते हुए कि मिडलवेयर सही रीडायरेक्ट करता है।

</Step>

<Step number={7} title="Sitemap और Robots.txt">

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

<Step number={1} title="अपने घटकों की सामग्री निकालें" isOptional={true}>

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

intlayerCompiler प्लगइन शामिल करने के लिए अपनी `vite.config.ts` अपडेट करें:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // कंपाइलर प्लगइन जोड़ता है
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

---

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

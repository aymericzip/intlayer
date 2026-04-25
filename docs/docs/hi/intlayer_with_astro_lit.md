---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Lit i18n - 2026 में Astro + Lit एप्लिकेशन का अनुवाद कैसे करें
description: Intlayer के साथ अपनी Astro + Lit साइट में अंतर्राष्ट्रीयकरण (i18n) जोड़ना सीखें। अपनी साइट को बहुभाषी बनाने के लिए इस गाइड का पालन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Lit के लिए प्रारंभिक दस्तावेज़ीकरण"
---

# Intlayer के साथ अपनी Astro + Lit साइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप यह कर सकते हैं:

- **अनुवादों को आसानी से प्रबंधित करें**: घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **मेटाडेटा, रूट और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **Ensure TypeScript समर्थन करें**: बेहतर ऑटो-पूर्णता और त्रुटि पहचान के लिए स्वतः उत्पन्न प्रकारों के साथ।
- **उन्नत सुविधाओं का लाभ उठाएं**: जैसे गतिशील भाषा पहचान और स्विचिंग।

---

## Astro + Lit में Intlayer को कॉन्फ़िगर करने के लिए चरण-दर-चरण मार्गदर्शिका

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डिमो कोडसैंडबॉक्स - Intlayer के साथ अपने एप्लिकेशन को कैसे अंतर्राष्ट्रीयकृत करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-astro-template) देखें।

### चरण 1: निर्भरताएँ स्थापित करें

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए i18n टूल प्रदान करता है।

- **astro-intlayer**
  Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ जोड़ने के लिए Astro एकीकरण प्लगइन, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्ट को संभालने के लिए मिडलवेयर शामिल है।

- **lit**
  तेज़, हल्के Web Components बनाने के लिए मुख्य Lit पैकेज।

- **lit-intlayer**
  Lit अनुप्रयोगों में Intlayer को एकीकृत करने के लिए पैकेज। यह `ReactiveController` आधारित हुक (`useIntlayer`, `useLocale`, आदि) प्रदान करता है जो भाषा बदलने पर LitElement को स्वतः पुन: रेंडर करने का निर्देश देते हैं।

- **@astrojs/lit**
  आधिकारिक Astro एकीकरण जो Astro पृष्ठों के भीतर Lit custom elements के उपयोग की अनुमति देता है।

### चरण 2: अपना प्रोजेक्ट कॉन्फ़िगर करें

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

### चरण 3: अपने Astro कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने Astro कॉन्फ़िगरेशन में `intlayer` प्लगइन और Lit एकीकरण जोड़ें।

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> `intlayer()` एकीकरण प्लगइन का उपयोग Intlayer को Astro के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के उत्पादन को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Astro एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है और प्रदर्शन को अनुकूलित करने के लिए उपनाम (aliases) प्रदान करता है।

> `lit()` एकीकरण Astro पृष्ठों के भीतर Lit custom elements के उपयोग की अनुमति देता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएँ और प्रबंधित करें:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      hi: "नमस्ते दुनिया",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      hi: "मेरी बहुभाषी Astro + Lit साइट पर आपका स्वागत है।",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> सामग्री घोषणाओं को आपके एप्लिकेशन में कहीं भी परिभाषित किया जा सकता है, बशर्ते वे `contentDir` (डिफ़ॉल्ट रूप से `./src`) में शामिल हों और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) से मेल खाती हों।

> अधिक जानकारी के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### चरण 5: Astro में सामग्री का उपयोग करना

आप सीधे अपने `.astro` फ़ाइलों में `intlayer` से निर्यात किए गए मुख्य सहायकों का उपयोग करके शब्दकोशों का उपयोग कर सकते हैं। आपको हर पृष्ठ पर SEO मेटाडेटा (जैसे hreflang और कैनोनिकल लिंक) भी जोड़ना चाहिए। Lit custom elements को एक क्लाइंट `<script>` के माध्यम से आयात किया जाता है और बॉडी में रखा जाता है।

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale}>
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
    <!-- Lit custom element — सर्वर-पहचाने गए लोकेल को एक प्रॉपर्टी के रूप में प्राप्त करता है -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> **रूटिंग सेटअप पर नोट:**
> आपके द्वारा उपयोग की जाने वाली निर्देशिका संरचना `intlayer.config.ts` में `middleware.routing` सेटिंग पर निर्भर करती है:
>
> - **`prefix-no-default` (डिफ़ॉल्ट):** डिफ़ॉल्ट भाषा को रूट पर रखता है (कोई उपसर्ग नहीं) और अन्य को उपसर्ग देता है। सभी मामलों को पकड़ने के लिए `[...locale]` का उपयोग करें।
> - **`prefix-all`:** सभी URL को भाषा उपसर्ग प्राप्त होता है। यदि आपको रूट को अलग से संभालने की आवश्यकता नहीं है तो आप मानक `[locale]` का उपयोग कर सकते हैं।
> - **`search-param` या `no-prefix`:** किसी भाषा निर्देशिका की आवश्यकता नहीं है। भाषा को क्वेरी पैरामीटर या कुकीज़ के माध्यम से संभाला जाता है।

### चरण 6: एक Lit Custom Element घटक बनाएँ

एक Lit custom element बनाएँ। क्लाइंट-साइड अनुवाद सिंगलटन को इनिशियलाइज़ करने के लिए सर्वर-आधारित `locale` एट्रिब्यूट (attribute) का उपयोग करके `connectedCallback` में `installIntlayer` को कॉल करें।

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // सर्वर-पहचाने गए लोकेल के साथ इनिशियलाइज़ करें
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- LitElement के भीतर रेंडर किया गया भाषा स्विचर -->
        <div class="locale-switcher">
          <span class="switcher-label">भाषा बदलें:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> `locale` एट्रिब्यूट को Astro पृष्ठ (सर्वर पहचान) से पारित किया जाता है और `connectedCallback` में `installIntlayer` को इनिशियलाइज़ करने के लिए उपयोग किया जाता है, जो घटक के भीतर सभी `ReactiveController` हुक के लिए प्रारंभिक भाषा सेट करता है।

> `useIntlayer` को एक `ReactiveController` के रूप में पंजीकृत किया गया है। भाषा बदलने पर यह ऑटोमैटिक रूप से घटक को पुन: रेंडर (re-render) करने का निर्देश देता है, इसलिए किसी अतिरिक्त सदस्यता तर्क की आवश्यकता नहीं है।

### चरण 7: एक भाषा स्विचर जोड़ना

भाषा स्विचिंग कार्यक्षमता सीधे Lit custom element की `render()` विधि के भीतर एकीकृत है (ऊपर चरण 6 देखें)। यह `lit-intlayer` से `useLocale` का उपयोग करता है और उपयोगकर्ता द्वारा एक नई भाषा चुनने पर स्थानीयकृत URL पर नेविगेट करता है:

```typescript fileName="src/components/lit/LitDemo.ts"
// LitElement क्लास के भीतर, चरण 6 में useLocale सेटअप के बाद:

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // भाषा परिवर्तन पर स्थानीयकृत URL पर नेविगेट करें
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">भाषा बदलें:</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Lit प्रतिक्रियात्मकता पर नोट:**
> `useLocale` एक `ReactiveController` लौटाता है। जब `setLocale` को कॉल किया जाता है, तो कंट्रोलर ऑटोमैटिक रूप से पुन: रेंडर का निर्देश देता है, जिससे मैन्युअल DOM हेरफेर के बिना सक्रिय बटन स्थिति अपडेट हो जाती है।

> **निरंतरता पर नोट:**
> `window.location.href` के माध्यम से रीडायरेक्ट करने के लिए `onLocaleChange` का उपयोग यह सुनिश्चित करता है कि नया भाषाई URL देखा जाए, जिससे Intlayer मिडलवेयर भाषा कुकी सेट कर सके और भविष्य की यात्राओं में उपयोगकर्ता की वरीयता को याद रख सके।

### चरण 8: Sitemap और Robots.txt

Intlayer आपकी स्थानीयकृत साइटमैप और robots.txt फ़ाइलों को गतिशील रूप से बनाने के लिए उपयोगिताओं की पेशकश करता है।

#### साइटमैप (Sitemap)

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

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### TypeScript कॉन्फ़िगरेशन

Intlayer अपने कोडबेस को अधिक मजबूत बनाने के लिए TypeScript का लाभ उठाने के लिए मॉड्यूल ऑगमेंटेशन (module augmentation) का उपयोग करता है। यदि आप डेकोरेटर (decorator) सिंटैक्स का उपयोग करते हैं, तो सुनिश्चित करें कि आप अपने कंपाइलर विकल्पों में `experimentalDecorators` को सक्षम करें।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपके TypeScript कॉन्फ़िगरेशन में स्वतः उत्पन्न प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Lit में डेकोरेटर समर्थन के लिए आवश्यक
  },
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

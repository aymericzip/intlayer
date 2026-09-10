---
createdAt: 2026-09-09
updatedAt: 2026-09-09
title: "Remix 3 i18n - अपने ऐप का अनुवाद करने के लिए संपूर्ण गाइड"
description: "i18next को भूल जाइए। बहुभाषी (i18n) Remix 3 ऐप बनाने के लिए 2026 की संपूर्ण गाइड। AI एजेंटों के साथ अनुवाद करें और बंडल साइज, SEO और परफॉर्मेंस को ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - वेब मानक
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Remix 3 के लिए प्रारंभिक दस्तावेज़"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी Remix 3 वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

यह गाइड दर्शाती है कि भाषा-जागरूक रूटिंग, टाइप-सुरक्षित सामग्री घोषणाओं, सुरक्षित HTML टेम्प्लेट और Node.js, Bun, Deno और Cloudflare Workers में क्रॉस-रनटाइम समर्थन के साथ **Remix 3** अनुप्रयोगों में सहज अंतर्राष्ट्रीयकरण के लिए **Intlayer** को कैसे एकीकृत किया जाए।

## Remix 3 क्या है?

**Remix 3** पूरी तरह से वेब मानकों पर निर्मित, **एक कंपोज़ेबल, रनटाइम-अज्ञेयवादी वेब फ्रेमवर्क** की ओर एक मौलिक वास्तुकला परिवर्तन का प्रतिनिधित्व करता है। विशिष्ट बंडलर्स या मालिकाना सर्वर एपीआई से जुड़े होने के बजाय, Remix 3 को एकल-उद्देश्यीय, कंपोज़ेबल पैकेजों के रूप में वितरित किया जाता है:

- **`remix/fetch-router`** (या `remix/router`): Fetch API (`Request` और `Response`) पर निर्मित हल्का, मानक-अनुरूप रूटिंग।
- **`remix/html-template`**: स्वचालित XSS सुरक्षा और अंश संरचना के साथ सुरक्षित HTML टेम्पलेट लिटरल्स।
- **`remix/response/html`**: मानक HTTP शब्दार्थ के साथ HTML परोसने के लिए प्रतिक्रिया सहायक उपयोगिताएँ।
- **`remix/node-fetch-server`**: Bun, Deno और एज रनटाइम के मूल समर्थन के साथ Node.js के लिए सर्वर एडेप्टर।
- **`remix/cookie`**: क्रिप्टोग्राफ़िक रूप से सुरक्षित कुकी पार्सिंग और क्रमांकन।

**Intlayer** के साथ मिलकर, आपको एक संपूर्ण अंतर्राष्ट्रीयकरण प्रणाली मिलती है जो संकलन-समय सुरक्षा, स्वचालित AI अनुवाद, शून्य-ओवरहेड सर्वर रेंडरिंग और सहज भाषा रूटिंग प्रदान करती है।

## सामग्री तालिका

<TOC/>

## विकल्पों के बजाय Intlayer क्यों चुनें?

`i18next` या पारंपरिक अनुवाद लोडरों की तुलना में, Intlayer आधुनिक वेब आर्किटेक्चर के लिए अनुकूलित एक एकीकृत डेवलपर अनुभव प्रदान करता है:

<AccordionGroup>
<Accordion header="पूर्ण Remix 3 और वेब मानक कवरेज">

Intlayer को वेब मानकों (`Request`, `Response`, `Headers`, और `URL`) के साथ सहजता से काम करने के लिए बनाया गया है। यह हल्के मिडलवेयर के माध्यम से Remix 3 के Fetch राउटर में आसानी से एकीकृत हो जाता है, जो आपको किसी विशिष्ट रनटाइम में बांधे बिना URL पथों, कुकीज़ या `Accept-Language` हेडर से भाषाएँ निकालता है।

</Accordion>
<Accordion header="टाइप-सुरक्षित सामग्री घोषणाएं">

ढीली JSON कुंजियों और रनटाइम पर लापता-कुंजी क्रैश को अलविदा कहें। Intlayer सभी घोषित भाषाओं में TypeScript जांच लागू करता है, यदि कोई अनुवाद गायब या अमान्य है तो आपको निर्माण के समय ही चेतावनी देता है।

</Accordion>
<Accordion header="सर्वर पर शून्य बंडल ओवरहेड">

Remix 3 के सर्वर-रेंडर किए गए HTML टेम्प्लेट (`remix/html-template`) का उपयोग करते समय, अनुरोधित भाषा के लिए केवल हल किया गया टेक्स्ट आउटपुट स्ट्रीम में भेजा जाता है। जब तक स्पष्ट रूप से आवश्यक न हो, किसी क्लाइंट हाइड्रेशन बंडल या भारी अनुवाद कैटलॉग की आवश्यकता नहीं होती है।

</Accordion>
<Accordion header="AI एजेंट और स्वचालन तैयार">

Intlayer सामग्री घोषणाओं (`.content.ts`) को आपके रूट लॉजिक के साथ रखता है, जिससे बड़े भाषा मॉडल (LLMs) के लिए आवश्यक टोकन संदर्भ कम हो जाता है। `intlayer fill` और `intlayer test` जैसे अंतर्निहित CLI कमांड आपको अपने स्वयं के AI प्रदाता की लागत पर CI/CD पाइपलाइनों में अनुवाद को स्वचालित करने देते हैं।

</Accordion>
<Accordion header="दृश्य संपादक और CMS एकीकरण">

कोड-प्रथम वर्कफ़्लो से परे, Intlayer एक स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) और एक [रिमोट CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) प्रदान करता है, जिससे गैर-तकनीकी संपादकों और अनुवादकों को कोड को फिर से तैनात किए बिना सामग्री को अपडेट करने की अनुमति मिलती है।

</Accordion>
</AccordionGroup>

## चरण-दर-चरण गाइड

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन का अंतर्राष्ट्रीयकरण कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 टेम्पलेट"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-remix-3-template) देखें।

<Steps>
<Step number={1} title="निर्भरताएँ स्थापित करें">

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके `intlayer` और `remix` (संस्करण 3) स्थापित करें:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: मुख्य अंतर्राष्ट्रीयकरण इंजन जो कॉन्फ़िगरेशन प्रबंधन, शब्दकोश घोषणा (`t()`, `Dictionary`), CLI उपकरण और रनटाइम दुभाषिया प्रदान करता है।
- **`remix`**: एकीकृत Remix 3 फ्रेमवर्क पैकेज जो `remix/router`, `remix/routes`, `remix/html-template`, और `remix/node-fetch-server` का निर्यात करता है।

</Step>
<Step number={2} title="Intlayer कॉन्फ़िगर करें">

अपनी समर्थित भाषाओं और अंतर्राष्ट्रीयकरण सेटिंग्स को घोषित करने के लिए अपने प्रोजेक्ट के रूट में `intlayer.config.ts` बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> अतिरिक्त कॉन्फ़िगरेशन सेटिंग्स के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>
<Step number={3} title="अपनी बहुभाषी सामग्री घोषित करें">

अपनी स्थानीयकृत सामग्री को एक `.content.ts` फ़ाइल में घोषित करें:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      hi: "Remix 3 में आपका स्वागत है",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      hi: "देशी i18n के साथ एक कंपोज़ेबल, वेब-मानक अनुप्रयोग।",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      hi: "भाषा बदलें:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer JSON, YAML और CommonJS घोषणा प्रारूपों का भी समर्थन करता है। [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>
<Step number={4} title="Intlayer शब्दकोश बनाएँ">

TypeScript प्रकार और रनटाइम रजिस्ट्रियां उत्पन्न करने के लिए शब्दकोश परिभाषाओं को संकलित करें:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

यह आपकी सामग्री को `.intlayer` आर्टिफैक्ट निर्देशिका में संकलित करता है, जिससे पूर्ण TypeScript स्वतः पूर्णता और तीव्र शब्दकोश लुकअप सक्षम होता है।

</Step>
<Step number={5} title="Intlayer मिडलवेयर लागू करें">

Remix 3 `createRouter({ middleware: [...] })` के माध्यम से एक कंपोज़ेबल मिडलवेयर पाइपलाइन प्रदान करता है।

प्रत्येक आने वाले अनुरोध की भाषा को हल करने वाला एक Intlayer मिडलवेयर बनाएँ:

1. Intlayer के `getLocaleFromPath` (उदा. `/hi` या `/fr`) के माध्यम से URL पथ उपसर्ग।
2. Intlayer का `getLocale` सहायक, जो स्टोरेज कुकीज़ (`INTLAYER_LOCALE`), कस्टम हेडर (`x-intlayer-locale`), मानक `Accept-Language` हेडर और आपके कॉन्फ़िगर किए गए `defaultLocale` में स्वचालित रूप से बातचीत करता है।

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Remix 3 RequestContext से हल की गई भाषा प्राप्त करने के लिए टाइप-सुरक्षित संदर्भ कुंजी।
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Remix 3 के लिए Intlayer मिडलवेयर।
 *
 * प्राथमिकता के अनुसार अनुरोध भाषा को हल करता है:
 * 1. `getLocaleFromPath` के माध्यम से URL पथ उपसर्ग (उदा. `/hi/...`)
 * 2. `getLocale` के माध्यम से हेडर और स्टोरेज बातचीत (कुकी, कस्टम हेडर, Accept-Language, फ़ॉलबैक defaultLocale)
 *
 * हल की गई भाषा को Remix 3 RequestContext से जोड़ता है।
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // पथ पहचान (/hi/about -> "hi", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // हल की गई भाषा को Remix 3 अनुरोध संदर्भ से जोड़ें
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // हल की गई भाषा को Remix 3 अनुरोध संदर्भ से जोड़ें
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="टाइप-सुरक्षित रूट्स परिभाषित करें">

`remix/routes` से `route()` का उपयोग करके अपने एप्लिकेशन रूट्स को परिभाषित करें:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // डिफ़ॉल्ट भाषा रूट
  home: "/",

  // गतिशील :locale खंड के साथ स्थानीयकृत रूट
  localizedHome: "/:locale",
});
```

`route()` का उपयोग करने से आपको अपने पूरे एप्लिकेशन में टाइप-सुरक्षित URL जनरेशन मिलता है:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "hi" }); // "/hi"
```

</Step>
<Step number={7} title="स्थानीयकृत HTML टेम्प्लेट रेंडर करें">

Remix 3 सुरक्षित और स्वचालित रूप से एस्केप किए गए HTML निर्माण के लिए `remix/html-template` का उपयोग करता है। एक दृश्य फ़ंक्शन बनाएं जो `getIntlayer` का उपयोग करके स्थानीयकृत शब्दकोश निकालता है, `<html lang="..." dir="...">` विशेषताओं को सेट करता है, और एक भाषा स्विचर प्रदर्शित करता है:

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${home.title}</title>
      </head>
      <body>
        <header>
          <nav aria-label="Languages">
            <span>${home.switchLanguage}</span>
            ${locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  aria-current="${isActive ? "true" : "false"}"
                >
                  ${getLocaleName(loc, locale)}
                </a>
              `;
            })}
          </nav>
        </header>
        <main>
          <h1>${home.title}</h1>
          <p>${home.description}</p>
        </main>
      </body>
    </html>
  `;
};
```

</Step>
<Step number={8} title="सर्वर एप्लिकेशन को कनेक्ट करें">

`src/server.ts` में अपने राउटर, मिडलवेयर और रूट क्रियाओं को एक साथ कनेक्ट करें:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. Intlayer मिडलवेयर के साथ राउटर प्रारंभ करें
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. रूट हैंडलर मैप करें
router.map(routes, {
  actions: {
    // डिफ़ॉल्ट भाषा रूट
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // स्थानीयकृत रूट
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. सर्वर प्रारंभ करें
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`सर्वर http://localhost:${PORT} पर चल रहा है`);
});

export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="अनुवाद का ऑडिट करें और स्वतः भरें">

Intlayer अनुपलब्ध अनुवादों का ऑडिट करने और AI का उपयोग करके उन्हें स्वचालित रूप से भरने के लिए एक CLI प्रदान करता है:

```bash packageManager="npm"
# लापता अनुवादों का ऑडिट करें
npx intlayer test

# AI का उपयोग करके छूटे हुए अनुवाद भरें
npx intlayer fill
```

```bash packageManager="pnpm"
# लापता अनुवादों का ऑडिट करें
pnpm dlx intlayer test

# AI का उपयोग करके छूटे हुए अनुवाद भरें
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# लापता अनुवादों का ऑडिट करें
yarn dlx intlayer test

# AI का उपयोग करके छूटे हुए अनुवाद भरें
yarn dlx intlayer fill
```

```bash packageManager="bun"
# लापता अनुवादों का ऑडिट करें
bun x intlayer test

# AI का उपयोग करके छूटे हुए अनुवाद भरें
bun x intlayer fill
```

</Step>
</Steps>

## TypeScript कॉन्फ़िगरेशन

सुनिश्चित करें कि आपकी `tsconfig.json` में उत्पन्न `.intlayer` प्रकार शामिल हैं:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

## निष्कर्ष

Remix 3 और Intlayer के साथ, आपके पास एक सुव्यवस्थित, पूरी तरह से टाइप किया हुआ और रनटाइम-पोर्टेबल स्टैक है जो खुले वेब मानकों का पालन करता है। आपका एप्लिकेशन साधारण स्थानीयकृत मार्केटिंग पेजों से लेकर विश्व स्तर पर वितरित और एज पर रेंडर की जाने वाली सेवाओं तक सहजता से विस्तार कर सकता है।

---
createdAt: 2026-09-09
updatedAt: 2026-09-21
priority: 9
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
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer मिडलवेयर और हुक्स का उपयोग"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Remix 3 के लिए प्रारंभिक दस्तावेज़"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी Remix 3 वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

यह गाइड दर्शाती है कि भाषा-जागरूक रूटिंग, टाइप-सुरक्षित सामग्री घोषणाओं, सर्वर-रेंडर किए गए JSX घटकों और Node.js, Bun, Deno और Cloudflare Workers में क्रॉस-रनटाइम समर्थन के साथ **Remix 3** अनुप्रयोगों में सहज अंतर्राष्ट्रीयकरण के लिए **Intlayer** को कैसे एकीकृत किया जाए।

## Remix 3 क्या है?

**Remix 3** पूरी तरह से वेब मानकों पर निर्मित, **एक कंपोज़ेबल, रनटाइम-अज्ञेयवादी वेब फ्रेमवर्क** की ओर एक मौलिक वास्तुकला परिवर्तन का प्रतिनिधित्व करता है। विशिष्ट बंडलर्स या मालिकाना सर्वर एपीआई से जुड़े होने के बजाय, Remix 3 को एकल-उद्देश्यीय, कंपोज़ेबल पैकेजों के रूप में वितरित किया जाता है:

- **`remix/fetch-router`** (या `remix/router`): Fetch API (`Request` और `Response`) पर निर्मित हल्का, मानक-अनुरूप रूटिंग।
- **`remix/ui`**: एक JSX घटक मॉडल (`jsxImportSource: "remix/ui"`). एक घटक एक सेटअप फ़ंक्शन है जो एक रेंडर फ़ंक्शन लौटाता है, इसलिए यह React जैसा दिखता है लेकिन स्थिति को सामान्य JavaScript क्लोजर में रखता है।
- **`remix/middleware/render`**: प्रत्येक अनुरोध पर `context.render(<Page />)` स्थापित करता है, जो JSX ट्री को HTML `Response` में स्ट्रीम करता है।
- **`remix/node-fetch-server`**: Bun, Deno और एज रनटाइम के मूल समर्थन के साथ Node.js के लिए सर्वर एडेप्टर।
- **`remix/cookie`**: क्रिप्टोग्राफ़िक रूप से सुरक्षित कुकी पार्सिंग और क्रमांकन।

**Intlayer** और **`remix-intlayer`** पैकेज (एक लोकेल मिडलवेयर और Remix अनुरोध संदर्भ से बंधे `react-intlayer` के समान `useIntlayer` / `useDictionary` / `useLocale` हुक्स) के साथ संयुक्त, आपको एक संपूर्ण अंतर्राष्ट्रीयकरण प्रणाली मिलती है जो संकलन-समय सुरक्षा, स्वचालित AI अनुवाद, शून्य-ओवरहेड सर्वर रेंडरिंग और सहज लोकेल रूटिंग प्रदान करती है।

## सामग्री तालिका

<TOC/>

## विकल्पों के बजाय Intlayer क्यों चुनें?

`i18next` या पारंपरिक अनुवाद लोडरों की तुलना में, Intlayer आधुनिक वेब आर्किटेक्चर के लिए अनुकूलित एक एकीकृत डेवलपर अनुभव प्रदान करता है:

<AccordionGroup>
<Accordion header="पूर्ण Remix 3 और वेब मानक कवरेज">

Intlayer को वेब मानकों (`Request`, `Response`, `Headers`, और `URL`) के साथ सहजता से काम करने के लिए बनाया गया है। `remix-intlayer` एक हल्के मिडलवेयर के रूप में Remix 3 के Fetch राउटर में प्लग करता है, URL पथों, कुकीज़ या `Accept-Language` हेडर से लोकेल निकालता है और इसे अनुरोध के बाकी हिस्सों, हैंडलर, दृश्यों और `remix/ui` घटकों को बिना किसी तर्क के पास किए प्रदर्शित करता है।

</Accordion>
<Accordion header="टाइप-सुरक्षित सामग्री घोषणाएं">

ढीली JSON कुंजियों और रनटाइम पर लापता-कुंजी क्रैश को अलविदा कहें। Intlayer सभी घोषित भाषाओं में TypeScript जांच लागू करता है, यदि कोई अनुवाद गायब या अमान्य है तो आपको निर्माण के समय ही चेतावनी देता है।

</Accordion>
<Accordion header="सर्वर पर शून्य बंडल ओवरहेड">

Remix 3 सर्वर पर JSX घटकों को रेंडर करता है और HTML को क्लाइंट पर स्ट्रीम करता है। अनुरोधित भाषा के लिए केवल हल किया गया टेक्स्ट आउटपुट स्ट्रीम में जाता है। जब तक किसी घटक को स्पष्ट रूप से `clientEntry` के रूप में चिह्नित न किया गया हो, किसी क्लाइंट हाइड्रेशन बंडल या भारी अनुवाद कैटलॉग की आवश्यकता नहीं होती है।

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

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके `intlayer`, `remix-intlayer` और `remix` (संस्करण 3) स्थापित करें:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: मुख्य अंतर्राष्ट्रीयकरण इंजन जो कॉन्फ़िगरेशन प्रबंधन, शब्दकोश घोषणा (`t()`, `Dictionary`), CLI उपकरण और रनटाइम दुभाषिया प्रदान करता है।
- **`remix-intlayer`**: Remix 3 एकीकरण: `intlayer()` राउटर मिडलवेयर जो प्रत्येक अनुरोध के लोकेल को हल करता है, और `useIntlayer`, `useDictionary` और `useLocale` हुक्स जो इसे बाद में कहीं भी पढ़ते हैं।
- **`remix`**: एकीकृत Remix 3 फ्रेमवर्क पैकेज जो `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render`, और `remix/node-fetch-server` का निर्यात करता है।

</Step>
<Step number={2} title="Intlayer कॉन्फ़िगर करें">

### आर्किटेक्चर

इस आर्किटेक्चर में, `remix-intlayer` का `intlayer()` मिडलवेयर `render()` मिडलवेयर से पहले `createRouter()` में पंजीकृत होता है। यह राउटर मिलान से पहले लोकेल प्रीफ़िक्स को हटा देता है, जिससे रूट्स को बिना किसी `:locale` सेगमेंट के `src/routes.ts` में एक बार घोषित किया जाता है, और यह शेष अनुरोध को एक `AsyncLocalStorage` स्कोप के अंदर चलाता है, जिससे `useIntlayer` / `useLocale` रूट हैंडलर्स और `remix/ui` व्यूज़ में बिना किसी तर्क के लोकेल पढ़ सकते हैं। कंटेंट घोषणाएं `src/` में आपके व्यूज़ के साथ रखी जाती हैं:

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### कॉन्फ़िगरेशन

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
<Step number={5} title="Intlayer मिडलवेयर जोड़ें">

Remix 3 `createRouter({ middleware: [...] })` के माध्यम से एक कंपोजेबल मिडलवेयर पाइपलाइन प्रदान करता है।

`remix-intlayer` `intlayer()` मिडलवेयर प्रदान करता है। प्रत्येक आने वाले अनुरोध के लिए यह निम्न का उपयोग करके लोकेल को हल करता है:

1. `no-prefix` को छोड़कर प्रत्येक रूटिंग मोड में URL: पथ उपसर्ग (उदा. `/hi` या `/en`) या `?locale=` खोज पैरामीटर।
2. क्लाइंट द्वारा सहेजा गया लोकेल: स्टोरेज कुकी (`INTLAYER_LOCALE`) या कस्टम हेडर (`x-intlayer-locale`)।
3. मानक `Accept-Language` वार्ता, आपके कॉन्फ़िगर किए गए `defaultLocale` पर वापस आना।

परिणाम को Remix अनुरोध संदर्भ में `locale`, `defaultLocale` और `availableLocales` के साथ `context.intlayer` (या `context.get(Intlayer)`) के रूप में संग्रहीत किया जाता है। मिडलवेयर तब उस संदर्भ से बंधे `AsyncLocalStorage` दायरे के अंदर शेष अनुरोध को चलाता है, जिससे पैकेज के हुक्स बिना किसी तर्क के लोकेल को पढ़ सकते हैं, चाहे वह रूट हैंडलर, दृश्य या `remix/ui` घटक हों:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// मिडलवेयर के बाद कहीं भी
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` या `useIntlayer("faq", { item: 2 })` एक कॉल के लिए अनुरोध लोकेल को ओवरराइड करते हैं, और `useDictionary(homeContent)` एक कुंजी के बजाय एक आयातित शब्दकोश पढ़ता है। एक अनुरोध के बाहर हुक्स डिफ़ॉल्ट लोकेल पर वापस आ जाते हैं।

> मिडलवेयर सर्वर शुरू होने पर Intlayer शब्दकोशों को भी तैयार करता है, ताकि एक छूटा हुआ `intlayer build` रजिस्ट्री को खाली न छोड़े।

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
<Step number={7} title="JSX के साथ स्थानीयकृत पृष्ठों को रेंडर करें">

Remix 3 `remix/ui` के JSX घटकों के साथ UI को रेंडर करता है। एक घटक एक **सेटअप फ़ंक्शन** है जो एक `Handle` प्राप्त करता है और एक **रेंडर फ़ंक्शन** लौटाता है। सेटअप प्रति इंस्टेंस एक बार चलता है, रेंडर प्रत्येक अपडेट पर चलता है, और प्रॉप्स को `handle.props` के माध्यम से पढ़ा जाता है।

एक साझा `Document` शेल से शुरू करें जो मिडलवेयर द्वारा हल किए गए लोकेल से `<html lang="..." dir="...">` विशेषताओं को सेट करता है:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

फिर होम पेज बनाएं। यह `useIntlayer` के साथ स्थानीयकृत शब्दकोश पढ़ता है और एक भाषा स्विचर प्रस्तुत करता है:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX React नहीं है: `class` जैसा है वैसा ही लिखा जाता है (`className` भी स्वीकार किया जाता है), और पुन: रेंडरिंग को `handle.update()` के साथ स्पष्ट रूप से ट्रिगर किया जाता है। प्रक्षेपित मान स्वचालित रूप से बच जाते हैं। Intlayer हुक्स अनुरोध दायरे को पढ़ने वाले सादे फ़ंक्शन हैं, इसलिए उन्हें सेटअप फ़ंक्शन या रेंडर फ़ंक्शन दोनों से बुलाया जा सकता है।

</Step>
<Step number={8} title="राउटर और सर्वर को कनेक्ट करें">

Intlayer मिडलवेयर के आगे `remix/middleware/render` से `render()` मिडलवेयर जोड़ें। यह प्रत्येक अनुरोध पर `context.render(node, init)` स्थापित करता है, जो JSX ट्री को HTML `Response` में स्ट्रीम करता है (शुरुआत में `<!DOCTYPE html>` जोड़ता है और `Content-Type` हेडर सेट करता है):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` दूसरे तर्क के रूप में एक वैकल्पिक `ResponseInit` स्वीकार करता है, उदा. `context.render(<NotFoundPage />, { status: 404 })`। हल किया गया लोकेल हैंडलर से `context.intlayer.locale` के रूप में पहुँचा जा सकता है, उदाहरण के लिए `Response.json` पेलोड बनाने के लिए।

अंत में, एक मानक `fetch` हैंडलर के माध्यम से राउटर को प्रदर्शित करें। वही राउटर Node.js, Bun, Deno और Cloudflare Workers पर चलता है:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`सर्वर http://localhost:${PORT} पर चल रहा है`);
});

// Bun / Deno / Cloudflare Workers
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

JSX को `remix/ui` रनटाइम पर इंगित करें और सुनिश्चित करें कि आपकी `tsconfig.json` में उत्पन्न `.intlayer` प्रकार शामिल हैं:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` के कारण ही `<HomePage />` React के बजाय Remix के `createElement` पर हल होता है।

## निष्कर्ष

Remix 3 और Intlayer के साथ, आपके पास एक सुव्यवस्थित, पूरी तरह से टाइप किया हुआ और रनटाइम-पोर्टेबल स्टैक है जो खुले वेब मानकों का पालन करता है। आपका एप्लिकेशन साधारण स्थानीयकृत मार्केटिंग पेजों से लेकर विश्व स्तर पर वितरित और एज पर रेंडर की जाने वाली सेवाओं तक सहजता से विस्तार कर सकता है।

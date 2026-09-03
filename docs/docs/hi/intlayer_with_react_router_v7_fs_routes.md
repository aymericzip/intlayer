---
createdAt: 2025-09-04
updatedAt: 2026-06-23
title: "React Router v7 i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में React Router v7 ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Locale रूटिंग
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ें"
  - version: 6.1.5
    date: 2025-10-03
    changes: "दस्तावेज़ अपडेट किया गया"
  - version: 5.8.2
    date: 2025-09-04
    changes: "React Router v7 के लिए जोड़ा"
author: aymericzip
---

# Intlayer के साथ अपना React Router v7 अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

यह गाइड दिखाता है कि कैसे **Intlayer** को React Router v7 प्रोजेक्ट्स में seamless अंतरराष्ट्रीयकरण के लिए एकीकृत किया जाए, जिसमें locale-aware रूटिंग, TypeScript समर्थन, और आधुनिक विकास प्रथाएँ शामिल हैं।

क्लाइंट-साइड रूटिंग के लिए, [Intlayer के साथ React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_router_v7.md) गाइड देखें।

## Table of Contents

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`रिएक्ट-आई18नेक्स्ट` या `आई18नेक्स्ट` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

<AccordionGroup>
<Accordion header="पूर्ण रिएक्ट राउटर कवरेज">

इंटलेयर को **लोकेल-अवेयर रूटिंग**, **लोकेल डिटेक्शन के लिए मिडलवेयर**, और स्केलिंग इंटरनेशनलाइजेशन (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके रिएक्ट राउटर के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

</Accordion>

<Accordion header="बंडल आकार">

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

## React Router v7 एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज स्थापित करें:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

अपने पसंदीदा package manager का उपयोग करके आवश्यक packages को install करें:

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

- **intlayer**  
  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**  
  वह पैकेज जो Intlayer को React एप्लिकेशन के साथ एकीकृत करता है। यह React अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक्स प्रदान करता है।

- **vite-intlayer**  
  इसमें Vite प्लगइन शामिल है जो Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

- **@react-router/fs-routes**
  वह पैकेज जो React Router v7 के लिए फ़ाइल-सिस्टम आधारित रूटिंग को सक्षम करता है।

</Step>

<Step number={2} title="अपने प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URLs, middleware पुनर्निर्देशन, कुकी नाम, आपकी content declarations के स्थान और एक्सटेंशन को सेट अप कर सकते हैं, कंसोल में Intlayer लॉग्स को अक्षम कर सकते हैं, और बहुत कुछ कर सकते हैं। उपलब्ध parameters की संपूर्ण सूची के लिए, [कॉन्फ़िगरेशन documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) को देखें।

</Step>

<Step number={3} title="अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

अपने कॉन्फ़िगरेशन में intlayer plugin जोड़ें:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> `intlayer()` Vite plugin का उपयोग Intlayer को Vite के साथ integrate करने के लिए किया जाता है। यह content declaration files की building को सुनिश्चित करता है और development mode में उन्हें monitor करता है। यह Vite application के भीतर Intlayer environment variables को परिभाषित करता है। इसके अतिरिक्त, यह performance को optimize करने के लिए aliases प्रदान करता है।

</Step>

<Step number={4} title="React Router v7 फ़ाइल-सिस्टम रूट्स कॉन्फ़िगर करें">

अपने routing configuration को `flatRoutes` के साथ file-system based routes का उपयोग करने के लिए सेट अप करें:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // सामग्री घोषणा फ़ाइलों को routes के रूप में माना जाने से बचाएं
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> `@react-router/fs-routes` से `flatRoutes` फ़ंक्शन फ़ाइल-सिस्टम आधारित routing को सक्षम करता है, जहाँ `routes/` डायरेक्टरी में फ़ाइल संरचना आपके एप्लिकेशन की routes को निर्धारित करती है। `ignoredRouteFiles` विकल्प यह सुनिश्चित करता है कि Intlayer कंटेंट घोषणा फ़ाइलें (`.content.ts`, आदि) route फ़ाइलों के रूप में नहीं मानी जाती हैं।

</Step>

<Step number={5} title="लेआउट कंपोनेंट बनाएं">

फ़ाइल-सिस्टम रूटिंग के साथ, आप एक सपाट नामकरण सम्मेलन का उपयोग करते हैं जहाँ डॉट्स (`.`) पथ खंडों का प्रतिनिधित्व करते हैं और कोष्ठक `()` वैकल्पिक खंडों को दर्शाते हैं।

अपनी `app/routes/` निर्देशिका में निम्नलिखित फ़ाइलें बनाएँ:

#### फ़ाइल संरचना

```bash
app/
├── root.tsx                         # locale routes के लिए Layout wrapper
└──routes/
    ├── ($locale)._index.tsx         # Home page (/, /es, etc.)
    ├── ($locale)._index.content.ts  # Home page content
    ├── ($locale).about.tsx          # About page (/about, /es/about, etc.)
    └── ($locale).about.content.ts   # About page content
```

नामकरण परंपराएं:

- `($locale)` - locale parameter के लिए वैकल्पिक गतिशील segment
- `_layout` - Layout route जो child routes को wrap करता है
- `_index` - Index route (parent path पर renders होता है)
- `.` (dot) - Path segments को अलग करता है (उदा., `($locale).about` → `/:locale?/about`)

#### Layout Component

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// ... अपरिवर्तित App, links और ErrorBoundary code

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

#### रूट लेआउट

```tsx fileName="app/routes/layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

#### स्थानीयकृत होम पेज

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Step>

<Step number={6} title="अपनी सामग्री की घोषणा करें">

अपनी content declarations बनाएं और प्रबंधित करें translations को store करने के लिए। Content files को अपनी route files के साथ रखें:

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      hi: "React Router v7 + Intlayer में आपका स्वागत है",
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      hi: "React Router v7 और Intlayer का उपयोग करके आसानी से बहुभाषी एप्लिकेशन बनाएं।",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      hi: "हमारे बारे में जानें",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      hi: "हमारे बारे में",
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      hi: "यह हमारे बारे में पृष्ठ की सामग्री है।",
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      hi: "होम",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> आपकी content declarations आपके application में कहीं भी परिभाषित की जा सकती हैं जब तक वे `contentDir` directory में शामिल हों (डिफ़ॉल्ट रूप से, `./app`). और content declaration file extension से मेल खाएं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

> यदि आपका ऐप पहले से मौजूद है, तो आप हजारों घटकों को एक सेकंड में बदलने के लिए [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) को [एक्सट्रैक्ट कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) के साथ उपयोग कर सकते हैं।

</Step>

<Step number={7} title="लोकेल-अवेयर कंपोनेंट्स बनाएँ">

लोकेल-जागरूक नेविगेशन के लिए एक `LocalizedLink` component बनाएं:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

// बाहरी लिंक की जांच करता है
const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// URL को स्थानीयकृत करता है
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// स्थानीयकृत लिंक घटक
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

यदि आप लोकलाइज़्ड routes पर नेविगेट करना चाहते हैं, तो आप `useLocalizedNavigate` hook का उपयोग कर सकते हैं:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="एक लोकल स्विचर कंपोनेंट बनाएं">

उपयोगकर्ताओं को भाषाएँ बदलने की अनुमति देने के लिए एक कॉम्पोनेंट बनाएं:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* लोकल - उदाहरण के लिए FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, कृपया [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

</Step>

<Step number={9} title="HTML एट्रिब्यूट्स प्रबंधन जोड़ें">

HTML lang और dir एट्रिब्यूट्स को प्रबंधित करने के लिए एक हुक बनाएं:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

यह hook पहले से ही layout component (`($locale)._layout.tsx`) में उपयोग किया जा रहा है जो Step 5 में दिखाया गया है।

</Step>

<Step number={10} title="Add middleware">

फिर इसे अपने रूट कॉम्पोनेंट में उपयोग करें:

आप अपने एप्लिकेशन में server-side routing जोड़ने के लिए `intlayerProxy` का भी उपयोग कर सकते हैं। यह plugin स्वचालित रूप से URL के आधार पर वर्तमान locale को detect करेगा और appropriate locale cookie सेट करेगा। यदि कोई locale निर्दिष्ट नहीं है, तो plugin उपयोगकर्ता की browser language preferences के आधार पर सबसे appropriate locale determine करेगा। यदि कोई locale detect नहीं होता है, तो यह default locale पर redirect करेगा।

> ध्यान दें कि उत्पादन में `intlayerProxy` का उपयोग करने के लिए, आपको `vite-intlayer` पैकेज को `devDependencies` से `dependencies` में स्विच करना होगा।

> Intlayer v9 के बाद से, `intlayerProxy()` को सीधे `intlayer()` plugin में बंडल किया गया है और `routing.enableProxy` विकल्प के माध्यम से डिफ़ॉल्ट रूप से सक्षम किया गया है (`true` डिफ़ॉल्ट रूप से)। इसे अलग से पंजीकृत करना जैसा कि नीचे दिखाया गया है अब वैकल्पिक है — इसे पिछड़े संगतता के लिए और उन सेटअप के लिए रखा गया है जिन्हें plugin क्रम को नियंत्रित करने की आवश्यकता है। `routing.enableProxy: false` सेट करके अनुमति न दें। [v9 रिलीज़ नोट्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/releases/v9.md) देखें।

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // हुक को इम्पोर्ट करें

export default function RootLayout() {
  useI18nHTMLAttributes(); // हुक को कॉल करें

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

</Step>

<Step number={11} title="अपने घटकों की सामग्री निकालें" isOptional={true}>

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

> v9 से, `intlayerCompiler` को `intlayer` प्लगइन में शामिल किया गया है। इसलिए आपको इसे मैन्युअल रूप से जोड़ने की आवश्यकता नहीं है।

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

</Step>

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## दस्तावेज़ संदर्भ

- [Intlayer दस्तावेज़](https://intlayer.org)
- [React Router v7 दस्तावेज़](https://reactrouter.com/)
- [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md)
- [useLocale हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)
- [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

यह व्यापक मार्गदर्शिका आपको Intlayer को React Router v7 के साथ पूरी तरह से अंतरराष्ट्रीयकृत एप्लिकेशन के लिए एकीकृत करने के लिए आवश्यक सभी जानकारी प्रदान करती है, जिसमें स्थानीय-जानकारी वाले रूटिंग और TypeScript समर्थन शामिल हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="React Router v7 अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`react-i18next`**: रनटाइम JSON लोडिंग।
- **`react-intl`**: ICU प्रारूप।
- **`Intlayer`**: फ़ाइल सिस्टम रूटिंग के साथ पूरी तरह से एकीकृत, घटक के बगल में घोषणा, बिल्ड समय अनुकूलन, AI अनुवाद और विज़ुअल एडिटर।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे React Router बंडल आकार को कितना बढ़ाता है?">

पारंपरिक कैटलॉग प्रणालियों की तुलना में बहुत कम, क्योंकि पृष्ठ केवल उसी सामग्री को लोड करता है जिसे वह वास्तव में प्रस्तुत करता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना react-i18next या react-intl से माइग्रेट कर सकता हूँ?">

हाँ, माइग्रेशन गाइड का पालन करें या संगतता एडेप्टर का उपयोग करें।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपके घटकों को पढ़ता है, उपयोगकर्ता के अनुकूल स्ट्रिंग्स निकालता है, और प्रत्येक के बगल में एक `.content` फ़ाइल लिखता है, जिससे आप कैटलॉग में एक-एक करके स्ट्रिंग्स कॉपी करने के बजाय एक diff की समीक्षा करते हैं। इस गाइड का चरण 11 इसे समझाता है।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) बिल्ड समय पर यही काम करता है: यह प्रत्येक परिवर्तन पर आपके JSX, TSX, Vue और Svelte स्रोत को स्कैन करता है, शब्दकोश उत्पन्न करता है और HMR के माध्यम से उन्हें सिंक में रखता है, ताकि कुंजियों को मैन्युअल रूप से बनाए रखने की आवश्यकता न रहे।

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

<Question title="इस गाइड और कॉन्फ़िगरेशन-आधारित React Router गाइड में क्या अंतर है?">

केवल रूट्स घोषित करने के तरीके में: यह गाइड `routes.ts` में रूट ट्री के बजाय फ़ाइल नामकरण परंपराओं का उपयोग करती है। सामग्री घोषणा और हुक समान हैं।

</Question>

<Question title="फ़ाइल सिस्टम रूट्स में लोकेल सेगमेंट कैसे जोड़ें?">

लोकेल सेगमेंट फ़ाइल नाम का गतिशील हिस्सा बन जाता है। `validatePrefix` अज्ञात भाषाओं को फ़िल्टर करता है, और `getLocalizedUrl` URL बदलता है।

</Question>

<Question title="क्या यह SSR और लोडर्स के साथ React Router फ्रेमवर्क मोड में काम करता है?">

हाँ। सर्वर रेंडरिंग और लोडर फ़ंक्शन सीधे लोकेल का समाधान करते हैं और क्लाइंट को पूरी तरह तैयार मार्कअप भेजते हैं।

</Question>

<Question title="SEO के लिए hreflang टैग और स्थानीयकृत मेटाडेटा कैसे जोड़ें?">

वैकल्पिक भाषाओं को मैप करने के लिए रूट के `meta` निर्यात में `getMultilingualUrls` का उपयोग करें।

</Question>

<Question title="स्थानीयकृत लिंक घटक कैसे बनाएं?">

`getLocalizedUrl` का उपयोग करके `Link` पर एक रैपर बनाकर, जो स्वचालित रूप से आंतरिक लिंक में सक्रिय लोकेल उपसर्ग जोड़ता है।

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

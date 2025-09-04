---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: TanStack Start (React) में Intlayer के साथ शुरुआत करना
description: Intlayer का उपयोग करके अपने TanStack Start ऐप में i18n जोड़ें-कंपोनेंट-स्तरीय शब्दकोश, स्थानीयकृत URL, और SEO-अनुकूल मेटाडेटा।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# Intlayer और TanStack Start (React) के साथ अंतरराष्ट्रीयकरण (i18n) शुरू करना

## Intlayer क्या है?

**Intlayer** React ऐप्स के लिए एक ओपन-सोर्स i18n टूलकिट है। यह आपको प्रदान करता है:

- **कंपोनेंट-स्थानीय शब्दकोश** TypeScript सुरक्षा के साथ।
- **डायनामिक मेटाडेटा और रूट्स** (SEO-तैयार)।
- **रनटाइम लोकल स्विचिंग** (और लोकल का पता लगाने/सहेजने के लिए सहायक)।
- **Vite प्लगइन** बिल्ड-टाइम ट्रांसफॉर्म और डेवलपर अनुभव (DX) के लिए।

यह गाइड दिखाता है कि Intlayer को **TanStack Start** प्रोजेक्ट में कैसे जोड़ा जाए (जो अंतर्निहित रूप से Vite का उपयोग करता है और रूटिंग/SSR के लिए TanStack Router का उपयोग करता है)।

---

## चरण 1: निर्भरताएँ स्थापित करें

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: कोर (कॉन्फ़िग, शब्दकोश, CLI/ट्रांसफॉर्म)।
- **react-intlayer**: `<IntlayerProvider>` + React के लिए हुक्स।
- **vite-intlayer**: Vite प्लगइन, साथ ही वैकल्पिक मिडलवेयर लोकल डिटेक्शन/रिडायरेक्ट के लिए (डेवलपमेंट और SSR/पूर्वावलोकन में काम करता है; प्रोडक्शन SSR के लिए इसे `dependencies` में ले जाएं)।

---

## चरण 2: Intlayer कॉन्फ़िगर करें

अपने प्रोजेक्ट रूट पर `intlayer.config.ts` बनाएं:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // आप contentDir, contentFileExtensions, middleware विकल्प आदि को भी समायोजित कर सकते हैं।
};

export default config;
```

यदि आप `cjs`/`mjs` पसंद करते हैं तो CommonJS/ESM वेरिएंट आपके मूल दस्तावेज़ के समान ही हैं।

> पूर्ण कॉन्फ़िग संदर्भ के लिए: Intlayer के कॉन्फ़िगरेशन दस्तावेज़ देखें।

---

## चरण 3: Vite प्लगइन (और वैकल्पिक मिडलवेयर) जोड़ें

**TanStack Start Vite का उपयोग करता है**, इसलिए Intlayer के प्लगइन को अपने `vite.config.ts` में जोड़ें:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // वैकल्पिक लेकिन स्थानीय पहचान, कुकीज़ और रीडायरेक्ट के लिए अनुशंसित:
    intlayerMiddlewarePlugin(),
  ],
});
```

> यदि आप SSR तैनात करते हैं, तो `vite-intlayer` को `dependencies` में स्थानांतरित करें ताकि मिडलवेयर उत्पादन में चले।

---

## चरण 4: अपनी सामग्री घोषित करें

अपने शब्दकोशों को `./src` (डिफ़ॉल्ट `contentDir`) के अंतर्गत कहीं भी रखें। उदाहरण:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({ en: "Vite logo", fr: "Logo Vite", es: "Logo Vite" }),
    reactLogo: t({ en: "React logo", fr: "Logo React", es: "Logo React" }),
    title: t({
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t<ReactNode>({
      en: (
        <>
          <code>src/routes/index.tsx</code> को संपादित करें और HMR परीक्षण के
          लिए सहेजें
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      en: "लोगो पर क्लिक करके अधिक जानें",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS संस्करण आपके मूल दस्तावेज़ की तरह ही काम करते हैं।

> TSX सामग्री? यदि आपकी सेटअप को इसकी आवश्यकता है तो `import React from "react"` करना न भूलें।

---

## चरण 5: TanStack Start को Intlayer के साथ लपेटें

TanStack Start के साथ, आपका **रूट रूट** प्रदाताओं को सेट करने के लिए सही स्थान है।

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // शीर्ष स्तर पर एक शब्दकोश का उपयोग करने का उदाहरण:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">होम</RouterLink>
        <RouterLink to="/about">के बारे में</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

फिर अपने पृष्ठों में अपनी सामग्री का उपयोग करें:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> स्ट्रिंग गुण (`alt`, `title`, `aria-label`, …) को `.value` की आवश्यकता होती है:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (वैकल्पिक) चरण 6: भाषा स्विचिंग (क्लाइंट)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>अंग्रेज़ी</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>फ्रेंच</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>स्पेनिश</button>
    </div>
  );
}
```

---

## (वैकल्पिक) चरण 7: स्थानीयकृत रूटिंग (SEO-अनुकूल URL)

TanStack Start के साथ आपके पास **दो अच्छे पैटर्न** हैं। एक चुनें।

`src/routes/$locale/` नामक एक डायनेमिक सेगमेंट फ़ोल्डर बनाएं ताकि आपके URL `/:locale/...` हों। `$locale` लेआउट में, `params.locale` को मान्य करें, `<IntlayerProvider locale=...>` सेट करें, और एक `<Outlet />` रेंडर करें। यह तरीका सीधा है, लेकिन आप अपने बाकी रूट्स को `$locale` के नीचे माउंट करेंगे, और यदि आप डिफ़ॉल्ट लोकल को प्रीफिक्स नहीं करना चाहते हैं तो आपको एक अतिरिक्त गैर-प्रिफिक्स्ड ट्री की आवश्यकता होगी।

---

## (वैकल्पिक) चरण 8: लोकैल बदलते समय URL अपडेट करें

पैटर्न A (basepath) के साथ, लोकैल बदलना मतलब है **एक अलग basepath पर नेविगेट करना**:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // इतिहास को संरक्षित करता है
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>अंग्रेज़ी</button>
      <button onClick={() => change(Locales.FRENCH)}>फ्रेंच</button>
      <button onClick={() => change(Locales.SPANISH)}>स्पेनिश</button>
    </div>
  );
}
```

---

## (वैकल्पिक) चरण 9: `<html lang>` और `dir` (TanStack Start Document)

TanStack Start एक **Document** (रूट HTML शेल) प्रदान करता है जिसे आप अनुकूलित कर सकते हैं। पहुँच/SEO के लिए `lang` और `dir` सेट करें:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* यदि आप सर्वर पर locale की गणना करते हैं, तो इसे Document में पास करें; अन्यथा क्लाइंट पोस्ट-हाइड्रेशन के बाद सही कर देगा */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

क्लाइंट-साइड सुधार के लिए, आप अपना छोटा हुक भी रख सकते हैं:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## (वैकल्पिक) चरण 10: स्थानीयकृत लिंक कॉम्पोनेंट

TanStack Router एक `<Link/>` प्रदान करता है, लेकिन यदि आपको कभी एक साधारण `<a>` की आवश्यकता हो जो आंतरिक URL को स्वचालित रूप से प्रीफिक्स करे:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

// बाहरी URL की जांच करने के लिए फ़ंक्शन
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    // यदि href आंतरिक URL है, तो इसे स्थानीयकृत URL में बदलें
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> यदि आप पैटर्न A (basepath) का उपयोग करते हैं, तो TanStack का `<Link to="/about" />` पहले से ही `basepath` के माध्यम से `/fr/about` को हल करता है, इसलिए एक कस्टम लिंक वैकल्पिक है।

---

## TypeScript

Intlayer द्वारा उत्पन्न प्रकारों को शामिल करें:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Intlayer द्वारा उत्पन्न आर्टिफैक्ट्स को अनदेखा करें:

```gitignore
.intlayer
```

---

## VS कोड एक्सटेंशन

- **Intlayer VS कोड एक्सटेंशन** → ऑटोकंप्लीशन, त्रुटियाँ, इनलाइन प्रीव्यू, त्वरित क्रियाएँ।
  मार्केटप्लेस: `intlayer.intlayer-vs-code-extension`

---

## आगे बढ़ें

- विज़ुअल एडिटर
- CMS मोड
- एज / एडाप्टर पर लोकल डिटेक्शन

---

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                           |
| ------- | ---------- | ---------------------------------- |
| 1.0.0   | 2025-08-11 | TanStack स्टार्ट अनुकूलन जोड़ा गया |

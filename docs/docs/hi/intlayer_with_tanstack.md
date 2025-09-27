---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Tanstack Start में Intlayer के साथ शुरुआत करना
description: जानें कि कैसे Intlayer का उपयोग करके अपने Tanstack Start एप्लिकेशन में अंतरराष्ट्रीयकरण (i18n) जोड़ें। इस व्यापक गाइड का पालन करें ताकि आपका ऐप बहुभाषी और लोकल-आधारित रूटिंग के साथ हो।
keywords:
  - अंतरराष्ट्रीयकरण
  - प्रलेखन
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - लोकल रूटिंग
slugs:
  - doc
  - environment
  - vite-and-react
  - tanstack-start
applicationTemplate: https://github.com/AydinTheFirst/tanstack-start-intlayer
author: AydinTheFirst
---

# Intlayer और Tanstack Start के साथ अंतरराष्ट्रीयकरण (i18n) शुरू करना

यह गाइड दिखाता है कि कैसे **Intlayer** को Tanstack Start प्रोजेक्ट्स में सहज अंतरराष्ट्रीयकरण के लिए एकीकृत किया जाए, जिसमें लोकल-आधारित रूटिंग, TypeScript समर्थन, और आधुनिक विकास प्रथाएँ शामिल हैं।

## Intlayer क्या है?

**Intlayer** एक नवोन्मेषी, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन** करें, जो कि कंपोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत** करें।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटो-कम्प्लीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकल पहचान और स्विचिंग।
- **Tanstack Start की फ़ाइल-आधारित रूटिंग सिस्टम के साथ लोकल-आवेयर रूटिंग सक्षम करें।**

---

## Tanstack Start एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: प्रोजेक्ट बनाएं

TanStack Start वेबसाइट पर उपलब्ध [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) गाइड का पालन करके एक नया TanStack Start प्रोजेक्ट बनाएं।

### चरण 2: Intlayer पैकेज इंस्टॉल करें

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  वह पैकेज जो Intlayer को React एप्लिकेशन के साथ एकीकृत करता है। यह React अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक्स प्रदान करता है।

- **vite-intlayer**
  इसमें Vite प्लगइन शामिल है जो Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा लोकल का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

### चरण 3: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // डिफ़ॉल्ट भाषा
    locales: [
      Locales.ENGLISH, // अंग्रेज़ी
      Locales.FRENCH, // फ्रेंच
      Locales.SPANISH, // स्पेनिश
      // आपकी अन्य भाषाएँ
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // डिफ़ॉल्ट भाषा
    locales: [
      Locales.ENGLISH, // अंग्रेज़ी
      Locales.FRENCH, // फ्रेंच
      Locales.SPANISH, // स्पेनिश
      // आपकी अन्य भाषाएँ
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // डिफ़ॉल्ट भाषा
    locales: [
      Locales.ENGLISH, // अंग्रेज़ी
      Locales.FRENCH, // फ्रेंच
      Locales.SPANISH, // स्पेनिश
      // आपकी अन्य भाषाएँ
    ],
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर पुनर्निर्देशन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 4: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddlewarePlugin, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
    intlayerMiddlewarePlugin(),
  ],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को बेहतर बनाने के लिए उपनाम प्रदान करता है।

### चरण 5: लेआउट कॉम्पोनेंट बनाएं

अपने रूट लेआउट और स्थानीय-विशिष्ट लेआउट सेट करें:

#### रूट लेआउट

```tsx fileName="src/routes/{-$locale}/route.tsx" codeFormat="typescript"
// src/routes/{-$locale}/route.tsx
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### चरण 6: अपनी सामग्री घोषित करें

अपने अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/contents/page.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "होम",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        en: "यह Intlayer को TanStack Router के साथ उपयोग करने का एक उदाहरण है",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "Intlayer + TanStack Router में आपका स्वागत है",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब वे `contentDir` निर्देशिका में शामिल हो जाती हैं (डिफ़ॉल्ट रूप से, `./app`)। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

### चरण 7: स्थानीय-ज्ञानी (Locale-Aware) घटक और हुक बनाएं

स्थानीय-ज्ञानी नेविगेशन के लिए एक `LocalizedLink` घटक बनाएं:

```tsx fileName="src/components/localized-link.tsx" codeFormat="typescript"
// src/components/localized-link.tsx
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, "to">;

export function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps["to"]} />;
}
```

प्रोग्रामेटिक नेविगेशन के लिए `useLocalizedNavigate` हुक बनाएं:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx" codeFormat="typescript"
// src/hooks/useLocalizedNavigate.tsx
// eslint-disable-next-line no-restricted-imports
import { NavigateOptions, useNavigate } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedNavigateOptions = {
  to: string;
} & Omit<NavigateOptions, "to">;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (options: LocalizedNavigateOptions) => {
    const to = isExternal(options.to)
      ? options.to
      : getLocalizedUrl(options.to, locale);

    navigate({ ...options, to: to as NavigateOptions["to"] });
  };

  return localizedNavigate;
};
```

### चरण 8: अपने पृष्ठों में Intlayer का उपयोग करें

अपने एप्लिकेशन में अपने कंटेंट डिक्शनरीज़ तक पहुँचें:

#### रूट रीडायरेक्ट पेज

```tsx fileName="src/routes/page.tsx" codeFormat="typescript"
// src/routes/page.tsx
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### स्थानीयकृत होम पेज

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4 items-center text-center">
        {content.title}
        <LocaleSwitcher />
        <div className="flex gap-4">
          <a href="/">इंडेक्स</a>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

### चरण 9: एक लोकल स्विचर कंपोनेंट बनाएं

उपयोगकर्ताओं को भाषाएं बदलने की अनुमति देने के लिए एक कंपोनेंट बनाएं:

```tsx fileName="src/components/locale-switcher.tsx" codeFormat="typescript"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";

export default function LocaleSwitcher() {
  const { pathname, searchStr } = useLocation();
  const content = useIntlayer("locale-switcher");

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + searchStr, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label={content.label.toString()}
      onChange={(e) => setLocale(e.target.value)}
      value={locale}
    >
      {availableLocales.map((localeItem) => (
        <option
          dir={getHTMLTextDir(localeItem)}
          key={localeItem}
          lang={localeItem}
          value={localeItem}
        >
          {/* उदाहरण: Français (फ्रेंच) */}
          {getLocaleName(localeItem, locale)} (
          {getLocaleName(localeItem, Locales.ENGLISH)})
        </option>
      ))}
    </select>
  );
}
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

### चरण 10: HTML एट्रिब्यूट्स प्रबंधन जोड़ें (वैकल्पिक)

HTML lang और dir एट्रिब्यूट्स को प्रबंधित करने के लिए एक हुक बनाएं:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// src/hooks/useI18nHTMLAttributes.tsx
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

फिर इसे अपने रूट कॉम्पोनेंट में उपयोग करें:

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // हुक को इम्पोर्ट करें

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // इस लाइन को जोड़ें

  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### चरण 11: अपनी एप्लिकेशन को बिल्ड और रन करें

कंटेंट डिक्शनरीज़ बनाएं और अपनी एप्लिकेशन चलाएं:

```bash packageManager="npm"
# Intlayer डिक्शनरीज़ बनाएं
npm run intlayer:build

# डेवलपमेंट सर्वर शुरू करें
npm run dev
```

```bash packageManager="pnpm"
# Intlayer डिक्शनरीज़ बनाएं
pnpm intlayer:build

# डेवलपमेंट सर्वर शुरू करें
pnpm dev
```

```bash packageManager="yarn"
# Intlayer डिक्शनरीज़ बनाएं
yarn intlayer:build

# डेवलपमेंट सर्वर शुरू करें
yarn dev
```

### चरण 12: TypeScript कॉन्फ़िगर करें (वैकल्पिक)

Intlayer मॉड्यूल ऑगमेंटेशन का उपयोग करता है ताकि TypeScript के लाभ प्राप्त किए जा सकें और आपका कोडबेस मजबूत बनाया जा सके।

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड टाइप्स शामिल हैं:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  },
  include: [
    // ... आपकी मौजूदा शामिल की गई फाइलें
    ".intlayer/**/*.ts", // ऑटो-जेनरेटेड टाइप्स शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा किया जाए। इससे आप उन्हें अपनी Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा करें
.intlayer
```

---

### चरण 13: रीडायरेक्शन बनाएं (वैकल्पिक)

```typescript fileName="src/routes/{-$locale}/rotue.tsx" codeFormat="typescript"
function LayoutComponent() {
  useI18nHTMLAttributes();

  const { locale } = Route.useParams();
  const { locale: selectedLocale } = useLocale();
  const { defaultLocale } = configuration.internationalization;
  const { prefixDefault } = configuration.middleware;

  // यदि prefixDefault true है और URL में कोई locale मौजूद नहीं है, तो डिफ़ॉल्ट locale पर पुनर्निर्देशित करें
  if (selectedLocale === defaultLocale && !locale && prefixDefault) {
    return <Navigate replace to={defaultLocale} />;
  }

  // यदि URL में locale चयनित locale से मेल नहीं खाता है, तो चयनित locale पर पुनर्निर्देशित करें
  if (selectedLocale !== defaultLocale && !locale) {
    return <Navigate replace to={selectedLocale} />;
  }

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

## प्रोडक्शन डिप्लॉयमेंट

जब आप अपनी एप्लिकेशन को डिप्लॉय कर रहे हों:

1. **अपनी एप्लिकेशन बनाएं:**

   ```bash
   npm run build
   ```

2. **Intlayer शब्दकोश बनाएं:**

   ```bash
   npm run intlayer:build
   ```

3. **यदि प्रोडक्शन में मिडलवेयर का उपयोग कर रहे हैं तो `vite-intlayer` को dependencies में जोड़ें:**
   ```bash
   npm install vite-intlayer --save
   ```

अब आपकी एप्लिकेशन निम्नलिखित का समर्थन करेगी:

- **URL संरचना**: `/en`, `/en/about`, `/tr`, `/tr/about`
- **ब्राउज़र प्राथमिकताओं के आधार पर स्वचालित लोकल डिटेक्शन**
- **Tanstack Start के साथ लोकल-संज्ञानी रूटिंग**
- **स्वचालित जनरेट किए गए प्रकारों के साथ TypeScript समर्थन**
- **सर्वर-साइड रेंडरिंग के साथ उचित लोकल हैंडलिंग**

## VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकंप्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक जानकारी के लिए देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

## आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपने कंटेंट को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।

---

## दस्तावेज़ संदर्भ

- [Intlayer दस्तावेज़](https://intlayer.org)
- [Tanstack Start दस्तावेज़](https://reactrouter.com/)
- [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md)
- [useLocale हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)
- [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

यह व्यापक गाइड आपको Intlayer को Tanstack Start के साथ पूरी तरह से अंतरराष्ट्रीयकृत एप्लिकेशन के लिए एकीकृत करने के लिए आवश्यक सभी जानकारी प्रदान करता है, जिसमें स्थानीय-जानकारी रूटिंग और TypeScript समर्थन शामिल है।

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                        |
| ------- | ---------- | ------------------------------- |
| 5.8.1   | 2025-09-09 | Tanstack Start के लिए जोड़ा गया |

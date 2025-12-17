---
createdAt: 2025-09-09
updatedAt: 2025-12-11
title: अपना Tanstack Start ऐप कैसे अनुवाद करें – i18n गाइड 2025
description: जानें कि अपने Tanstack Start एप्लिकेशन में Intlayer का उपयोग करके अंतरराष्ट्रीयकरण (i18n) कैसे जोड़ें। इस व्यापक गाइड का पालन करें ताकि आपका ऐप बहुभाषी और लोकल-आधारित रूटिंग के साथ हो।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - लोकल रूटिंग
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.4.0
    date: 2025-12-11
    changes: validatePrefix पेश किया गया और चरण 14 जोड़ा गया: स्थानीयकृत रूट्स के साथ 404 पेज हैंडल करना।
  - version: 7.3.9
    date: 2025-12-05
    changes: चरण 13 जोड़ा गया: सर्वर एक्शन्स में अपनी भाषा (locale) प्राप्त करें (वैकल्पिक)
  - version: 6.5.2
    date: 2025-10-03
    changes: दस्तावेज़ अपडेट
  - version: 5.8.1
    date: 2025-09-09
    changes: Tanstack Start के लिए जोड़ा
---

# Intlayer के साथ अपना Tanstack Start अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

## विषय-सूची

<TOC/>

यह गाइड दिखाता है कि कैसे **Intlayer** को Tanstack Start प्रोजेक्ट्स में सहज अंतरराष्ट्रीयकरण के लिए एकीकृत किया जाए, जिसमें लोकल-आधारित रूटिंग, TypeScript समर्थन, और आधुनिक विकास प्रथाएँ शामिल हैं।

## Intlayer क्या है?

**Intlayer** एक नवीन, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कि कंपोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटोकम्पलीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकल पहचान और स्विचिंग।
- **Tanstack Start की फ़ाइल-आधारित रूटिंग प्रणाली के साथ लोकल-आधारित रूटिंग सक्षम करें**।

---

## Tanstack Start एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Tanstack Start के लिए सर्वश्रेष्ठ i18n समाधान? Intlayer खोजें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-tanstack-start-template) देखें।

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

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  वह पैकेज जो Intlayer को React एप्लिकेशन के साथ एकीकृत करता है। यह React अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक्स प्रदान करता है।

- **vite-intlayer**
  इसमें Vite प्लगइन शामिल है जो Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

### चरण 3: अपने प्रोजेक्ट का कॉन्फ़िगरेशन सेट करें

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फाइल बनाएं:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर पुनर्निर्देशन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 4: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    viteReact(),
    intlayer(), // To add
  ],
});

export default config;
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 5: लेआउट कंपोनेंट बनाएं

अपने रूट लेआउट और स्थानीय-विशिष्ट लेआउट सेट करें:

#### रूट लेआउट

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### चरण 6: अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/contents/page.content.ts"
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
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> आपकी सामग्री घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./app`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

### चरण 7: स्थानीय-जानकारी वाले घटक और हुक बनाएं

स्थानीय-जानकारी वाली नेविगेशन के लिए `LocalizedLink` घटक बनाएं:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react.intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// मुख्य उपयोगिता
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// सहायक
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

इस कॉम्पोनेंट के दो उद्देश्य हैं:

- URL से अनावश्यक `{-$locale}` उपसर्ग को हटाना।
- URL में locale पैरामीटर डालना ताकि उपयोगकर्ता सीधे स्थानीयकृत रूट पर पुनः निर्देशित हो सके।

फिर हम प्रोग्रामेटिक नेविगेशन के लिए `useLocalizedNavigate` हुक बना सकते हैं:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useLocale } from "react.intlayer";
import { useNavigate } from "@tanstack/react-router";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  type StripLocalePrefix<T extends string> = T extends
    | `/${typeof LOCALE_ROUTE}`
    | `/${typeof LOCALE_ROUTE}/`
    ? "/" // URL से locale उपसर्ग को हटाने के लिए प्रकार
    : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
      ? `/${Rest}`
      : never;

  type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

  interface LocalizedNavigate {
    (to: LocalizedTo): ReturnType<typeof navigate>;
    (
      opts: { to: LocalizedTo } & Record<string, unknown>
    ): ReturnType<typeof navigate>;
  }

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    if (typeof args === "string") {
      return navigate({ to: `/${LOCALE_ROUTE}${args}`, params: { locale } });
    }

    const { to, ...rest } = args;

    const localedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({ to: localedTo, params: { locale, ...rest } as any });
  };

  return localizedNavigate;
};
```

### चरण 8: अपने पृष्ठों में Intlayer का उपयोग करें

अपने एप्लिकेशन में अपने सामग्री शब्दकोशों तक पहुंचें:

#### स्थानीयकृत होम पेज

```tsx fileName="src/routes/{-$locale}/index.tsx"
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
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
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

### चरण 9: एक लोकल स्विचर कॉम्पोनेंट बनाएं

उपयोगकर्ताओं को भाषाएँ बदलने की अनुमति देने के लिए एक कॉम्पोनेंट बनाएं:

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import { useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
          >
            <span>
              {/* लोकल - उदाहरण के लिए FR */}
              {localeEl}
            </span>
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH सेट हो */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

### चरण 10: HTML एट्रिब्यूट्स प्रबंधन जोड़ें (वैकल्पिक)

HTML lang और dir एट्रिब्यूट्स को प्रबंधित करने के लिए एक हुक बनाएं:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
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

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // हुक को इम्पोर्ट करें

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // इस लाइन को जोड़ें

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### चरण 11: मिडलवेयर जोड़ें (वैकल्पिक)

आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intlayerProxy` का भी उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान लोकल का स्वचालित रूप से पता लगाएगा और उपयुक्त लोकल कुकी सेट करेगा। यदि कोई लोकल निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त लोकल निर्धारित करेगा। यदि कोई लोकल पता नहीं चलता है, तो यह डिफ़ॉल्ट लोकल पर पुनः निर्देशित करेगा।

> ध्यान दें कि उत्पादन में `intlayerProxy` का उपयोग करने के लिए, आपको `vite-intlayer` पैकेज को `devDependencies` से `dependencies` में स्विच करना होगा।

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // यदि आप Nitro का उपयोग करते हैं, तो प्रॉक्सी को सर्वर से पहले रखा जाना चाहिए
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
  ],
});
```

---

### चरण 12: अपने मेटाडेटा को अंतर्राष्ट्रीयकृत करें (वैकल्पिक)

आप अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुंचने के लिए `getIntlayer` हुक का भी उपयोग कर सकते हैं:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Step 13: Retrieve the locale in your server actions (Optional)

You may want to access the current locale from inside your server actions or API endpoints.
You can do this using the `getLocale` helper from `intlayer`.

Here's an example using TanStack Start's server functions:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Get the cookie from the request (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Get the header from the request (default: 'x-intlayer-locale')
    // Fallback using Accept-Language negotiation
    getHeader: (name) => getRequestHeader(name),
  });

  // Retrieve some content using getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### चरण 14: पृष्ठ नहीं मिले प्रबंधित करें (वैकल्पिक)

जब कोई उपयोगकर्ता एक मौजूदा नहीं पृष्ठ पर जाता है, तो आप एक कस्टम पृष्ठ नहीं मिला प्रदर्शित कर सकते हैं और लोकेल उपसर्ग पृष्ठ नहीं मिला के ट्रिगर होने के तरीके को प्रभावित कर सकता है।

#### लोकेल उपसर्गों के साथ TanStack Router के 404 हैंडलिंग को समझना

TanStack Router में, स्थानीयकृत रूट के साथ 404 पृष्ठों को हैंडल करने के लिए एक बहु-परत दृष्टिकोण की आवश्यकता होती है:

1. **समर्पित 404 रूट**: 404 UI प्रदर्शित करने के लिए एक विशिष्ट रूट
2. **रूट-स्तरीय सत्यापन**: लोकेल उपसर्गों को सत्यापित करता है और अमान्य को 404 पर रीडायरेक्ट करता है
3. **कैच-ऑल रूट**: लोकेल सेगमेंट के भीतर किसी भी मैच न होने वाले पथ को कैप्चर करता है

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// यह एक समर्पित /[locale]/404 रूट बनाता है
// इसका उपयोग एक प्रत्यक्ष रूट के रूप में और अन्य फ़ाइलों में एक घटक के रूप में आयात किया जाता है
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// अलग से निर्यात किया गया ताकि इसे notFoundComponent और catch-all रूट में पुन: उपयोग किया जा सके
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad रूट रेंडर होने से पहले चलता है (सर्वर और क्लाइंट दोनों पर)
  // लोकेल उपसर्ग को मान्य करने के लिए यह आदर्श स्थान है
  beforeLoad: ({ params }) => {
    // रूट पैरामीटर से लोकेल प्राप्त करें (सर्वर हेडर से नहीं, क्योंकि beforeLoad क्लाइंट और सर्वर दोनों पर चलता है)
    const localeParam = params.locale;

    // validatePrefix जांचता है कि लोकेल आपकी intlayer कॉन्फ़िग के अनुसार मान्य है या नहीं
    // रिटर्न: { isValid: boolean, localePrefix: string }
    // - isValid: true यदि उपसर्ग एक कॉन्फ़िग किए गए लोकेल से मेल खाता है (या खाली है जब उपसर्ग वैकल्पिक है)
    // - localePrefix: मान्य उपसर्ग या रीडायरेक्ट के लिए डिफ़ॉल्ट लोकेल उपसर्ग
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (isValid) {
      // लोकेल मान्य है, रूट को सामान्य रूप से रेंडर करने की अनुमति दें
      return;
    }

    // अमान्य लोकेल उपसर्ग (उदा., /xyz/about जहां "xyz" एक मान्य लोकेल नहीं है)
    // मान्य लोकेल उपसर्ग के साथ 404 पृष्ठ पर रीडायरेक्ट करें
    // यह सुनिश्चित करता है कि 404 पृष्ठ अभी भी ठीक से स्थानीयकृत है
    throw redirect({
      to: "/{-$locale}/404",
      params: { locale: localePrefix },
    });
  },
  component: RouteComponent,
  // notFoundComponent तब कहा जाता है जब एक चाइल्ड रूट मौजूद नहीं होता
  // उदा., /en/अस्तित्वहीन-पृष्ठ /en लेआउट के भीतर इसे ट्रिगर करता है
  notFoundComponent: NotFoundLayout,
});

function RouteComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    // पूरे लोकेल सेगमेंट को IntlayerProvider के साथ लपेटें
    // जब लोकेल पैरामीटर undefined हो तो defaultLocale पर वापस जाता है (वैकल्पिक उपसर्ग मोड)
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}

// NotFoundLayout 404 घटक को IntlayerProvider के साथ लपेटता है
// यह सुनिश्चित करता है कि अनुवाद 404 पृष्ठ पर अभी भी काम करते हैं
function NotFoundLayout() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <NotFoundComponent />
      {/* LocaleSwitcher शामिल करें ताकि उपयोगकर्ता 404 पर भी भाषा बदल सकें */}
      <LocaleSwitcher />
    </IntlayerProvider>
  );
}
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) रूट किसी भी पथ से मेल खाता है जो अन्य रूट से मेल नहीं खाता
// उदा., /en/कुछ/गहराई/से/निहित/अमान्य/पथ
// यह सुनिश्चित करता है कि लोकेल के भीतर सभी बेमेल पथ 404 पृष्ठ दिखाते हैं
// इसके बिना, बेमेल गहरे पथ एक खाली पृष्ठ या त्रुटि दिखा सकते हैं
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### चरण 15: टाइपस्क्रिप्ट कॉन्फ़िगर करें (वैकल्पिक)

Intlayer टाइपस्क्रिप्ट के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

सुनिश्चित करें कि आपकी टाइपस्क्रिप्ट कॉन्फ़िगरेशन में स्वचालित रूप से जनरेट किए गए प्रकार शामिल हैं:

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा कॉन्फ़िगरेशन
  include: [
    // ... आपकी मौजूदा शामिल सूची
    ".intlayer/**/*.ts", // स्वचालित रूप से जनरेट किए गए प्रकार शामिल करें
  ],
}
```

---

### गिट कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा किया जाए। इससे आप उन्हें अपनी गिट रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसे करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फ़ाइलों को अनदेखा करें
.intlayer
```

---

## VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पता लगाना**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

विस्तार से जानने के लिए कि एक्सटेंशन का उपयोग कैसे करें, कृपया [Intlayer VS कोड एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

## आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।

---

## दस्तावेज़ संदर्भ

- [Intlayer दस्तावेज़](https://intlayer.org)
- [Tanstack Start दस्तावेज़](https://reactrouter.com/)
- [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)
- [useLocale हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)
- [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

यह व्यापक मार्गदर्शिका आपको Intlayer को Tanstack Start के साथ पूरी तरह से अंतरराष्ट्रीयकृत एप्लिकेशन के लिए एकीकृत करने के लिए आवश्यक सभी जानकारी प्रदान करती है, जिसमें स्थानीय-जानकारी रूटिंग और TypeScript समर्थन शामिल है।

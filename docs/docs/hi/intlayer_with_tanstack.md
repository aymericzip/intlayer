---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Tanstack Start i18n - Tanstack Start ऐप कैसे अनुवाद करें 2026 में
description: जानें कि Intlayer का उपयोग करके अपने TanStack Start एप्लिकेशन में अंतर्राष्ट्रीयकरण (i18n) कैसे जोड़ें। अपने ऐप को बहुभाषी और लोकेल-जागरूक रूटिंग के साथ बनाने के लिए इस व्यापक गाइड का पालन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - लोकेल रूटिंग
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init कमांड जोड़ें
  - version: 7.4.0
    date: 2025-12-11
    changes: validatePrefix पेश करें और चरण 14 जोड़ें: स्थानीयकृत रूट्स के साथ 404 पेज हैंडल करना।
  - version: 7.3.9
    date: 2025-12-05
    changes: चरण 13 जोड़ें: अपने सर्वर एक्शन्स में लोकेल प्राप्त करें (वैकल्पिक)
  - version: 7.2.3
    date: 2025-11-18
    changes: चरण 13 जोड़ें: Nitro को अनुकूलित करें
  - version: 7.1.0
    date: 2025-11-17
    changes: getPrefix फ़ंक्शन जोड़कर उपसर्ग डिफ़ॉल्ट को ठीक करें useLocalizedNavigate, LocaleSwitcher और LocalizedLink का उपयोग करें।
  - version: 6.5.2
    date: 2025-10-03
    changes: दस्तावेज़ अपडेट करें
  - version: 5.8.1
    date: 2025-09-09
    changes: TanStack Start के लिए जोड़ा गया
---

# Intlayer का उपयोग करके अपनी TanStack Start वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

## विषय-सूची

<TOC/>

यह गाइड दिखाता है कि लोकेल-जागरूक रूटिंग, TypeScript समर्थन और आधुनिक विकास प्रथाओं के साथ TanStack Start प्रोजेक्ट्स में निर्बाध अंतर्राष्ट्रीयकरण के लिए **Intlayer** को कैसे एकीकृत किया जाए।

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों को आसानी से प्रबंधित करें** जो घटक स्तर पर होते हैं।
- **मेटाडेटा, रूट्स और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार करते हुए।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।
- **TanStack Start की फ़ाइल-आधारित रूटिंग प्रणाली के साथ लोकेल-जागरूक रूटिंग सक्षम करें**।

---

## TanStack Start एप्लिकेशन में Intlayer सेट अप करने के लिए चरण-दर-चरण मार्गदर्शिका

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">
  
<iframe title="TanStack Start के लिए सबसे अच्छा i18n समाधान? Intlayer खोजें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो कोडसैंडबॉक्स - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-tanstack-start-template) देखें।

### चरण 1: प्रोजेक्ट बनाएं

TanStack Start वेबसाइट पर [नया प्रोजेक्ट शुरू करें](https://tanstack.com/start/latest/docs/framework/react/quick-start) गाइड का पालन करके एक नया TanStack Start प्रोजेक्ट बनाना शुरू करें।

### चरण 2: Intlayer पैकेज इंस्टॉल करें

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  वह पैकेज जो Intlayer को React एप्लिकेशन के साथ एकीकृत करता है। यह React अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

- **vite-intlayer**
  इसमें Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करने के लिए Vite प्लगइन, साथ ही उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ प्रबंधित करने और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर शामिल है।

### चरण 3: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपनी एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर पुनर्निर्देशन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और विस्तार सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और बहुत कुछ। उपलब्ध पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

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
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 5: रूट लेआउट बनाएं

वर्तमान लोकेल का पता लगाने के लिए `useMatches` का उपयोग करके और `html` टैग पर `lang` और `dir` विशेषताओं को सेट करके अंतर्राष्ट्रीयकरण का समर्थन करने के लिए अपने रूट लेआउट को कॉन्फ़िगर करें।

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // किसी भी सक्रिय मैच के मापदंडों में लोकेल खोजने का प्रयास करें
  // यह मानता है कि आप अपनी रूट ट्री में गतिशील खंड "/{-$locale}" का उपयोग करते हैं
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### चरण 6: लोकेल लेआउट बनाएं

एक लेआउट बनाएं जो लोकेल उपसर्ग को संभालता है और सत्यापन करता है।

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // लोकेल उपसर्ग सत्यापित करें
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> यहाँ, `{-$locale}` एक गतिशील रूट पैरामीटर है जो वर्तमान लोकेल से बदल दिया जाता है। यह नोटेशन स्लॉट को वैकल्पिक बनाता है, जिससे यह `'prefix-no-default'` आदि जैसे रूटिंग मोड के साथ काम करने की अनुमति देता है।

> ध्यान रखें कि यदि आप एक ही रूट में कई गतिशील खंडों का उपयोग करते हैं (जैसे, `/{-$locale}/other-path/$anotherDynamicPath/...`), तो यह स्लॉट समस्याएँ पैदा कर सकता है।
> `'prefix-all'` मोड के लिए, आप इसके बजाय स्लॉट को `$locale` में बदलना पसंद कर सकते हैं।
> `'no-prefix'` या `'search-params'` मोड के लिए, आप स्लॉट को पूरी तरह से हटा सकते हैं।

### चरण 7: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

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
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un उदाहरण de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> आपकी सामग्री घोषणाएं आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जैसे ही वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./app`) में शामिल होती हैं। और सामग्री घोषणा फ़ाइल विस्तार (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) से मेल खाती हैं।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### चरण 8: लोकेल-जागरूक घटक और हुक बनाएं

लोकेल-जागरूक नेविगेशन के लिए एक `LocalizedLink` घटक बनाएं:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

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

इस घटक के दो उद्देश्य हैं:

- URL से अनावश्यक `{-$locale}` उपसर्ग को हटाना।
- URL में लोकेल पैरामीटर इंजेक्ट करना ताकि यह सुनिश्चित हो सके कि उपयोगकर्ता सीधे स्थानीयकृत रूट पर निर्देशित हो।

फिर हम प्रोग्रामेटिक नेविगेशन के लिए एक `useLocalizedNavigate` हुक बना सकते हैं:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

### चरण 9: अपने पृष्ठों में Intlayer का उपयोग करें

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

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

### चरण 10: एक लोकेल स्विचर घटक बनाएं

उपयोगकर्ताओं को भाषाएं बदलने की अनुमति देने के लिए एक घटक बनाएं:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

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
            to={pathWithoutLocale as To}
          >
            <span>
              {/* लोकेल - उदा. FR */}
              {localeEl}
            </span>
            <span>
              {/* अपनी लोकेल में भाषा - उदा. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* वर्तमान लोकेल में भाषा - उदा. Francés जब वर्तमान लोकेल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदा. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

### चरण 11: HTML विशेषताओं का प्रबंधन

जैसा कि चरण 5 में देखा गया है, आप अपने रूट घटक में `useMatches` का उपयोग करके `html` टैग की `lang` और `dir` विशेषताओं को प्रबंधित कर सकते हैं। यह सुनिश्चित करता है कि सर्वर और क्लाइंट पर सही विशेषताएं सेट की गई हैं।

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // किसी भी सक्रिय मैच के मापदंडों में लोकेल खोजने का प्रयास करें
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### चरण 12: मिडलवेयर जोड़ें (वैकल्पिक)

आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intlayerProxy` का भी उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान लोकेल का स्वचालित रूप से पता लगाएगा और उपयुक्त लोकेल कुकी सेट करेगा। यदि कोई लोकेल निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त लोकेल निर्धारित करेगा। यदि कोई लोकेल नहीं मिलता है, तो यह डिफ़ॉल्ट लोकेल पर पुनर्निर्देशित करेगा।

> ध्यान दें कि उत्पादन में `intlayerProxy` का उपयोग करने के लिए, आपको `vite-intlayer` पैकेज को `devDependencies` से `dependencies` में स्विच करने की आवश्यकता है।

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // यदि आप Nitro का उपयोग करते हैं तो प्रॉक्सी को सर्वर से पहले रखा जाना चाहिए
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### चरण 13: अपने मेटाडेटा को अंतर्राष्ट्रीयकृत करें (वैकल्पिक)

आप अपने एप्लिकेशन में अपने सामग्री शब्दकोशों तक पहुंचने के लिए `getIntlayer` हुक का भी उपयोग कर सकते हैं:

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

### चरण 14: अपने सर्वर एक्शन्स में लोकेल प्राप्त करें (वैकल्पिक)

आप अपने सर्वर एक्शन्स या API एंडपॉइंट के अंदर से वर्तमान लोकेल तक पहुंचना चाह सकते हैं।
आप इसे `intlayer` से `getLocale` हेल्पर का उपयोग करके कर सकते हैं।

यहाँ TanStack Start के सर्वर फ़ंक्शंस का उपयोग करने वाला एक उदाहरण है:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // अनुरोध से कुकी प्राप्त करें (डिफ़ॉल्ट: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // अनुरोध से हेडर प्राप्त करें (डिफ़ॉल्ट: 'x-intlayer-locale')
    // Accept-Language बातचीत का उपयोग करके फ़ालबैक
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer() का उपयोग करके कुछ सामग्री प्राप्त करें
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### चरण 15: नहीं मिले पृष्ठों का प्रबंधन करें (वैकल्पिक)

जब कोई उपयोगकर्ता गैर-मौजूद पृष्ठ पर जाता है, तो आप एक कस्टम नहीं मिला पृष्ठ प्रदर्शित कर सकते हैं और लोकेल उपसर्ग नहीं मिला पृष्ठ के ट्रिगर होने के तरीके को प्रभावित कर सकता है।

#### लोकेल उपसर्गों के साथ TanStack Router के 404 हैंडलिंग को समझना

TanStack Router में, स्थानीयकृत रूट्स के साथ 404 पृष्ठों को संभालने के लिए एक बहु-स्तरीय दृष्टिकोण की आवश्यकता होती है:

1. **समर्पित 404 रूट**: 404 UI प्रदर्शित करने के लिए एक विशिष्ट रूट
2. **रूट-स्तरीय सत्यापन**: लोकेल उपसर्गों को मान्य करता है और अमान्य को 404 पर पुनर्निर्देशित करता है
3. **कैच-ऑल रूट**: लोकेल खंड के भीतर किसी भी बेमेल पथ को कैप्चर करता है

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// यह एक समर्पित /[locale]/404 रूट बनाता है
// इसका उपयोग प्रत्यक्ष रूट के रूप में और अन्य फ़ाइलों में घटक के रूप में आयात दोनों के लिए किया जाता है
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// अलग से निर्यात किया गया ताकि इसे notFoundComponent और कैच-ऑल रूट्स में पुन: उपयोग किया जा सके
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
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad रूट रेंडर होने से पहले चलता है (सर्वर और क्लाइंट दोनों पर)
  // लोकेल उपसर्ग को मान्य करने के लिए यह आदर्श स्थान है
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix जाँचता है कि क्या लोकेल आपके intlayer कॉन्फ़िग के अनुसार मान्य है
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // अमान्य लोकेल उपसर्ग - मान्य लोकेल उपसर्ग के साथ 404 पृष्ठ पर पुनर्निर्देशित करें
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent तब कहा जाता है जब कोई चाइल्ड रूट मौजूद नहीं होता
  // उदा., /en/non-existent-page /en लेआउट के भीतर इसे ट्रिगर करता है
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// $ (स्प्लैट/कैच-ऑल) रूट किसी भी पथ से मेल खाता है जो अन्य रूट्स से मेल नहीं खाता
// उदा., /en/some/deeply/nested/invalid/path
// यह सुनिश्चित करता है कि लोकेल के भीतर सभी बेमेल पथ 404 पृष्ठ दिखाते हैं
// इसके बिना, बेमेल गहरे पथ एक खाली पृष्ठ या त्रुटि दिखा सकते हैं
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### चरण 16: TypeScript कॉन्फ़िगर करें (वैकल्पिक)

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

सुनिश्चित करें कि आपके TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं:

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा कॉन्फ़िगरेशन
  include: [
    // ... आपके मौजूदा शामिल
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

---

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की सिफारिश की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

---

## VS Code एक्सटेंशन

Intlayer के साथ अपने विकास के अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code Marketplace से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गुम अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक विवरण के लिए, [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

## आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी रूप दे सकते हैं।

---

## दस्तावेज़ संदर्भ

- [Intlayer दस्तावेज़ीकरण](https://intlayer.org)
- [TanStack Start दस्तावेज़ीकरण](https://reactrouter.com/)
- [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md)
- [useLocale हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)
- [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Tanstack Start में Intlayer के साथ शुरुआत करना
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
  - vite-and-react
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
---

# Intlayer और Tanstack Start के साथ अंतरराष्ट्रीयकरण (i18n) शुरू करना

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

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

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
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), intlayer()],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 5: लेआउट कंपोनेंट बनाएं

अपने रूट लेआउट और स्थानीय-विशिष्ट लेआउट सेट करें:

#### रूट लेआउट

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={defaultLocale}>
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

  return (
    <Link
      {...props}
      params={{
        locale,
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
import { getHTMLTextDir, getLocaleName, getPathWithoutLocale } from "intlayer";
import { setLocaleCookie, useIntlayer, useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeEl)}`}
            onClick={() => setLocaleCookie(localeEl)}
            params={{ locale: localeEl }}
            to={pathWithoutLocale as To}
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
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
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

आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intlayerMiddleware` का भी उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान लोकल का स्वचालित रूप से पता लगाएगा और उपयुक्त लोकल कुकी सेट करेगा। यदि कोई लोकल निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त लोकल निर्धारित करेगा। यदि कोई लोकल पता नहीं चलता है, तो यह डिफ़ॉल्ट लोकल पर पुनः निर्देशित करेगा।

> ध्यान दें कि उत्पादन में `intlayerMiddleware` का उपयोग करने के लिए, आपको `vite-intlayer` पैकेज को `devDependencies` से `dependencies` में स्विच करना होगा।

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
    intlayerMiddleware(),
  ],
});
```

---

### चरण 12: टाइपस्क्रिप्ट कॉन्फ़िगर करें (वैकल्पिक)

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

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                    |
| ------- | ---------- | --------------------------- |
| 6.5.2   | 2025-10-03 | दस्तावेज़ अपडेट             |
| 5.8.1   | 2025-09-09 | Tanstack Start के लिए जोड़ा |

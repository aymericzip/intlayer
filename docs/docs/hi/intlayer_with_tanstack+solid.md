---
createdAt: 2025-03-25
updatedAt: 2026-06-23
title: "TanStack Start + Solid i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में TanStack Start + Solid ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - लोकेल रूटिंग
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Tanstack Start Solid.js के लिए जोड़ा गया"
author: aymericzip
---

# Intlayer का उपयोग करके Solid.js के साथ अपनी Tanstack Start वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

## विषय सूची

<TOC/>

यह गाइड दर्शाती है कि Solid.js, लोकेल-जागरूक रूटिंग, TypeScript समर्थन और आधुनिक विकास प्रथाओं के साथ Tanstack Start परियोजनाओं में निर्बाध अंतर्राष्ट्रीयकरण के लिए **Intlayer** को कैसे एकीकृत किया जाए।

## विकल्पों पर इन्टलेयर क्यों?

`रिएक्ट-आई18नेक्स्ट` या `आई18नेक्स्ट` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

**पूर्ण टैनस्टैक प्रारंभ कवरेज**

इंटलेयर को **बहुभाषी रूटिंग**, **साइटमैप**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके टैनस्टैक स्टार्ट और सॉलिड के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

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

## Tanstack Start एप्लिकेशन में Intlayer सेटअप करने के लिए स्टेप-बाय-स्टेप गाइड

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">

<iframe title="Tanstack Start के लिए सबसे अच्छा i18n समाधान? Intlayer की खोज करें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) देखें।

<Steps>

<Step number={1} title="प्रोजेक्ट निर्माण">

सबसे पहले, TanStack Start वेबसाइट पर [नया प्रोजेक्ट शुरू करें](https://tanstack.com/start/latest/docs/framework/solid/quick-start) गाइड का पालन करते हुए एक नया TanStack Start प्रोजेक्ट बनाएं।

</Step>

<Step number={2} title="Intlayer पैकेज स्थापित करें">

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` ध्वज (flag) वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके एनवायरनमेंट को डिटेक्ट करेगी और आवश्यक पैकेज इंस्टॉल करेगी। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **solid-intlayer**
  वह पैकेज जो Intlayer को Solid एप्लिकेशन में एकीकृत करता है। यह Solid अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता (context providers) और हुक प्रदान करता है।

- **vite-intlayer**
  Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करने के लिए Vite प्लगइन शामिल है, साथ ही उपयोगकर्ता के पसंदीदा लोकेल का पता लगाने, कुकीज़ प्रबंधित करने और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

</Step>

<Step number={3} title="अपने प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने एप्लिकेशन की भाषाओं को सेटअप करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएं:

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन कॉन्फ़िगर कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और बहुत कुछ। उपलब्ध पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={4} title="अपनी Vite कॉन्फ़िगरेशन में Intlayer एकीकृत करें">

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer वातावरण चर (environment variables) को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन ओवरहेड को कम करने के लिए उपनाम (aliases) प्रदान करता है।

</Step>

<Step number={5} title="रूट लेआउट बनाएं">

वर्तमान लोकेल का पता लगाने के लिए `useParams` का उपयोग करके और `html` टैग पर `lang` और `dir` विशेषताओं को सेट करके अंतर्राष्ट्रीयकरण का समर्थन करने के लिए अपना रूट लेआउट कॉन्फ़िगर करें।

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="लोकेल लेआउट बनाएं">

एक लेआउट बनाएं जो लोकेल उपसर्ग को संभालता है और सत्यापन करता है। यह लेआउट सुनिश्चित करेगा कि केवल वैध लोकेल ही संसाधित हों।

> यदि आपको रूट स्तर पर लोकेल उपसर्ग को मान्य करने की आवश्यकता नहीं है, तो यह चरण वैकल्पिक है।

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // लोकेल उपसर्ग को मान्य करें
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> यहाँ, `{-$locale}` एक गतिशील रूट मापदंड है जिसे वर्तमान लोकेल द्वारा प्रतिस्थापित किया जाता है। यह नोटेशन स्लॉट को वैकल्पिक बनाता है, जिससे यह `'prefix-no-default'` आदि जैसे रूटिंग मोड के साथ काम करने में सक्षम होता है।

> ध्यान रखें कि यदि आप एक ही रूट में कई गतिशील खंडों का उपयोग करते हैं (जैसे: `/{-$locale}/other-path/$anotherDynamicPath/...`), तो यह स्लॉट समस्याएँ पैदा कर सकता है।
> `'prefix-all'` मोड के लिए, आप स्लॉट को `$locale` पर स्विच करना पसंद कर सकते हैं।
> `'no-prefix'` या `'search-params'` मोड के लिए, आप स्लॉट को पूरी तरह से हटा सकते हैं।

</Step>

<Step number={7} title="अपनी सामग्री घोषित करें">

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
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> आपकी सामग्री घोषणाएं आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं, बशर्ते वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से `./app`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाती हों।

> अधिक विवरण के लिए, [सामग्ऱी घोषणा दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>

<Step number={8} title="लोकेल-जागरूक घटकों और हुक का उपयोग करें">

लोकेल-जागरूक नेविगेशन के लिए एक `LocalizedLink` घटक बनाएं:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

यह घटक दो उद्देश्यों की पूर्ति करता है:

- URL से अनावश्यक `{-$locale}` उपसर्ग हटाना।
- URL में लोकेल मापदंड इंजेक्ट करना ताकि यह सुनिश्चित हो सके कि उपयोगकर्ता सीधे स्थानीयकृत रूट पर रीडायरेक्ट हो गया है।

फिर, हम प्रोग्रामेटिक नेविगेशन के लिए `useLocalizedNavigate` हुक बना सकते हैं:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="अपने पेजों में Intlayer का उपयोग करें">

अपने पूरे एप्लिकेशन में अपने सामग्री शब्दकोशों तक पहुँचें:

#### स्थानीयकृत होम पेज

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> यदि आप अपनी सामग्री को `string` एट्रिब्यूट में उपयोग करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> In Solid, `useIntlayer` returns reactive content (e.g., `content`). You can access its properties directly.
>
> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/useIntlayer.md) देखें।

</Step>

<Step number={10} title="लोकेल स्विचर घटक बनाएं">

उपयोगकर्ताओं को भाषा बदलने की अनुमति देने के लिए एक घटक बनाएं:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> Solid में, `useLocale` से `locale` एक **सिग्नल एक्सेसॉर** है। इसके वर्तमान मान को प्रतिक्रियाशील रूप से पढ़ने के लिए `locale()` (कोष्ठक के साथ) का उपयोग करें।
>
> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/useLocale.md) देखें।

</Step>

<Step number={11} title="HTML विशेषताओं का प्रबंधन">

जैसा कि स्टेप 5 में देखा गया है, आप अपने रूट घटक में `useParams` का उपयोग करके `html` टैग की `lang` और `dir` विशेषताओं को प्रबंधित कर सकते हैं। यह सुनिश्चित करता है कि सर्वर और क्लाइंट दोनों पर सही विशेषताएँ सेट हैं।

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

</Step>

<Step number={12} title="मिडलवेयर जोड़ें">

आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intlayerProxy` का भी उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान लोकेल का स्वचालित रूप से पता लगाएगा और उचित लोकेल कुकी सेट करेगा। यदि कोई लोकेल निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त लोकेल निर्धारित करेगा। यदि कोई लोकेल नहीं पाया जाता है, तो यह डिफ़ॉल्ट लोकेल पर रीडायरेक्ट करेगा।

> ध्यान दें कि उत्पादन में `intlayerProxy` का उपयोग करने के लिए, आपको `vite-intlayer` पैकेज को `devDependencies` से `dependencies` में बदलना होगा।

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solid(),
  ],
});
```

---

</Step>

<Step number={13} title="अपने मेटाडेटा को अंतर्राष्ट्रीयकृत करें">

आप लोकेल-जागरूक मेटाडेटा के लिए `head` लोडर के भीतर अपने सामग्री शब्दकोशों तक पहुँचने के लिए `getIntlayer` फ़ंक्शन का भी उपयोग कर सकते हैं:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

---

</Step>

<Step number={14} title="अपने सर्वर कार्यों में लोकेल प्राप्त करें">

आप अपने सर्वर कार्यों या API एंडपॉइंट के भीतर से वर्तमान लोकेल तक पहुँचना चाह सकते हैं।
आप `intlayer` से `getLocale` हेल्पर का उपयोग करके ऐसा कर सकते हैं।

TanStack Start के सर्वर फ़ंक्शंस का उपयोग करने वाला एक उदाहरण यहाँ दिया गया है:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // अनुरोध से कुकी प्राप्त करें (डिफ़ॉल्ट: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // अनुरोध से हेडर प्राप्त करें (डिफ़ॉल्ट: 'x-intlayer-locale')
    // Accept-Language बातचीत का उपयोग करके फ़ॉलबैक
    getHeader: (name) => getRequestHeader(name),
  });

  // some content retrieved with getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={15} title="नहीं मिले पेजों का प्रबंधन करें">

जब कोई उपयोगकर्ता गैर-मौजूद पेज पर जाता है, तो आप एक कस्टम नहीं मिला पेज प्रदर्शित कर सकते हैं और लोकेल उपसर्ग नहीं मिले पेज के चालू होने के तरीके को प्रभावित कर सकता है।

#### लोकेल उपसर्गों के साथ TanStack Router के 404 प्रबंधन को समझना

TanStack Router में, स्थानीयकृत रूट के साथ 404 पेजों को संभालने के लिए एक बहु-स्तरीय दृष्टिकोण की आवश्यकता होती है:

1. **समर्पित 404 रूट**: 404 UI प्रदर्शित करने के लिए एक विशिष्ट रूट
2. **रूट-स्तरीय सत्यापन**: लोकेल उपसर्गों को मान्य करता है और अमान्य उपसर्गों को 404 पर रीडायरेक्ट करता है
3. **कैच-ऑल रूट**: लोकेल खंड के भीतर किसी भी गैर-मिलान वाले पथ को कैप्चर करता है

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// यह एक समर्पित /[locale]/404 रूट बनाता है
// इसका उपयोग प्रत्यक्ष रूट के रूप में और अन्य फ़ाइलों में घटक के रूप में आयात किया जाता है
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// इसे अलग से निर्यात किया गया ताकि इसे notFoundComponent और कैच-ऑल रूट में पुन: उपयोग किया जा सके
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad रूट के रेंडर होने से पहले चलता है (सर्वर और क्लाइंट दोनों)
  // यह लोकेल उपसर्ग को मान्य करने के लिए आदर्श स्थान है
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix जाँचता है कि लोकेल आपकी intlayer कॉन्फ़िगरेशन के अनुसार मान्य है या नहीं
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // अमान्य लोकेल उपसर्ग - मान्य लोकेल उपसर्ग के साथ 404 पेज पर रीडायरेक्ट करें
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent तब कॉल किया जाता है जब कोई चाइल्ड रूट मौजूद नहीं होता है
  // उदा: /en/non-existent-page /en लेआउट के भीतर इसे ट्रिगर करता है
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// $ (स्प्लैट/कैच-ऑल) रूट किसी भी पथ से मेल खाता है जो अन्य रूट से मेल नहीं खाता है
// उदा: /en/some/deeply/nested/invalid/path
// यह सुनिश्चित करता है कि लोकेल के भीतर सभी गैर-मिलान पथ 404 पेज दिखाएं
// इसके बिना, गहरे गैर-मिलान पथ एक खाली पेज या त्रुटि दिखा सकते हैं
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={16} title="अपने घटकों से सामग्री निकालें" isOptional={true}>

यदि आपके पास मौजूदा कोडबेस है, तो हजारों फ़ाइलों को बदलना समय लेने वाला हो सकता है।

इस प्रक्रिया को आसान बनाने के लिए, Intlayer आपके घटकों को बदलने और सामग्री निकालने के लिए एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) / [एक्सट्रैक्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) का प्रस्ताव देता है।

इसे सेटअप करने के लिए, आप अपने `intlayer.config.ts` फ़ाइल में एक `compiler` अनुभाग जोड़ सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... आपकी कॉन्फ़िगरेशन का शेष भाग
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
     * इंगित करता है कि क्या घटकों को बदलने के बाद सहेजा जाना चाहिए।
     *
     * - यदि `true` है, तो कंपाइलर डिस्क पर घटक फ़ाइल को फिर से लिखेगा। इस प्रकार, परिवर्तन स्थायी होगा, और कंपाइलर अगली प्रक्रिया के लिए परिवर्तन को छोड़ देगा। इस तरह, कंपाइलर ऐप को बदल सकता है और फिर इसे हटाया जा सकता है।
     *
     * - यदि `false` है, तो कंपाइलर कोड में `useIntlayer()` फ़ंक्शन कॉल को केवल बिल्ड आउटपुट में इंजेक्ट करेगा, जिससे मूल कोडबेस बरकरार रहेगा। परिवर्तन केवल मेमोरी में किया जाएगा।
     */
    saveComponents: false,

    /**
     * डिक्शनरी की प्रिफिक्स
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='एक्सट्रैक्ट कमांड'>

अपने घटकों को बदलने और सामग्री निकालने के लिए एक्सट्रैक्टर चलाएं

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
 <Tab value='Babel कंपाइलर'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`intlayerCompiler` प्लगइन शामिल करने के लिए अपनी `vite.config.ts` अपडेट करें:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # या npm run dev
```

```bash packageManager="pnpm"
pnpm run build # या pnpm run dev
```

```bash packageManager="yarn"
yarn build # या yarn dev
```

```bash packageManager="bun"
bun run build # या bun run dev
```

 </Tab>
</Tabs>

---

</Step>

<Step number={17} title="TypeScript कॉन्फ़िगर करें">

Intlayer TypeScript के लाभों को प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑग्मेंटेशन (module augmentation) का उपयोग करता है।

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड प्रकार शामिल हैं:

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा सेटिंग्स
  include: [
    // ... आपके मौजूदा शामिल पथ
    ".intlayer/**/*.ts", // ऑटो-जेनरेटेड प्रकार शामिल करें
  ],
}
```

---

</Step>

</Steps>

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में प्रतिबद्ध करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

---

## VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code Marketplace से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटो-कम्प्लीशन**।
- गुम अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनूदित सामग्री का **इनलाइन पूर्वावलोकन**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **त्वरित कार्य**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक विवरण के लिए, [Intlayer VS Code एक्सटेंशन दस्तावेज़ीकरण](https://intlayer.org/doc/vs-code-extension) देखें।

---

## आगे बढ़ना

आगे बढ़ने के लिए, आप [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी बना सकते हैं।

---

## दस्तावेज़ीकरण संदर्भ

- [Intlayer दस्तावेज़ीकरण](https://intlayer.org)
- [Tanstack Start दस्तावेज़ीकरण](https://tanstack.com/start/latest)
- [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/useIntlayer.md)
- [useLocale हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/useLocale.md)
- [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

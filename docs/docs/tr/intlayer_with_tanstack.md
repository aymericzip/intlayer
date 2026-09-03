---
createdAt: 2025-09-09
updatedAt: 2026-08-25
title: "TanStack Start i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) TanStack Start uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Yerel Dil Yönlendirmesi
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Rota head fonksiyonlarında meta veri sözlüklerinin statik, dinamik ve önbellekli dinamik çözümlemesinin karşılaştırılması"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 7.4.0
    date: 2025-12-11
    changes: "validatePrefix'i tanıt ve 14. adımı ekle: Yerelleştirilmiş rotalarla 404 sayfalarını ele alma."
  - version: 7.3.9
    date: 2025-12-05
    changes: "13. adımı ekle: Sunucu işlemlerinde locale bilgisini almak (Opsiyonel)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "13. adımı ekle: Nitro'yu uyarla"
  - version: 7.1.0
    date: 2025-11-17
    changes: "getPrefix fonksiyonunu ekleyerek useLocalizedNavigate, LocaleSwitcher ve LocalizedLink için önek varsayılanını düzelt."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Doküman güncellemesi"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Tanstack Start için eklendi"
author: aymericzip
---

# Intlayer ile Tanstack Start sitenizi çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

Bu rehber, Tanstack Start projelerinde yerel dil yönlendirmesi, TypeScript desteği ve modern geliştirme uygulamalarıyla sorunsuz uluslararasılaştırma için **Intlayer**'ın nasıl entegre edileceğini göstermektedir.

## Neden alternatifler yerine Intlayer?

'React-i18next' veya 'use-intl' veya 'paraglide' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>
<Accordion header="Tam TanStack Start kapsamı">

Intlayer, TanStack Start için tamamen optimize edilmiştir ve **çok dilli yönlendirme**, **çerez yönetimi**, **site haritası oluşturma**, **dinamik içerik yükleme** ve uluslararasılaştırma (i18n) çabalarınızı ölçeklendirmek için gereken tüm özellikleri sağlar.

</Accordion>

<Accordion header="Bundle boyutu">

Sayfalarınıza çok büyük JSON dosyaları yüklemek yerine yalnızca gerekli içeriği yükleyin. Intlayer **bundle ve sayfa boyutlarınızı %50'ye kadar azaltmanıza** yardımcı olur.

</Accordion>

<Accordion header="Sürdürülebilirlik">

Uygulamanızın içeriğinin kapsamını belirlemek, büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. İçerik kod tabanınızın tamamını gözden geçirmenin zihinsel yükü olmadan, tek bir özellik klasörünü çoğaltabilir veya silebilirsiniz. Ayrıca Intlayer, içeriğinizin doğruluğunu sağlamak için **tamamen tiplendirilmiş (fully typed)tır**.

</Accordion>

<Accordion header="Yapay Zeka Temsilcisi">

İçeriğin bir arada konumlandırılması **Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için **CLI** gibi bir araç paketiyle birlikte gelir**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**, geliştirici deneyimini (DX) yapay zeka için daha da sorunsuz hale getirmek için ajanlar.

</Accordion>

<Accordion header="Otomasyon">

Maliyeti AI sağlayıcınıza ait olmak üzere seçtiğiniz LLM'yi kullanarak CI/CD işlem hattınızda çeviri yapmak için otomasyonu kullanın. Intlayer ayrıca içerik çıkarmayı otomatikleştirmek için bir **derleyici** ve **arka planda çeviri yapmaya** yardımcı olacak bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) sunar.

</Accordion>

<Accordion header="Performans">

Büyük JSON dosyalarını bileşenlere bağlamak performans ve tepkime sorunlarına yol açabilir. Intlayer, içerik yüklemenizi derleme sırasında optimize eder.

</Accordion>

<Accordion header="Non-dev ile ölçeklendirme">

Bir i18n çözümünden çok daha fazlası olan Intlayer, **kendi kendine barındırılan bir [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** ve **[tam CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** çok dilli içeriğinizi **gerçek zamanlı** olarak yönetmenize yardımcı olarak çevirmenler, metin yazarları ve diğer ekip üyeleriyle işbirliğini kusursuz hale getirir. İçerik yerel olarak ve/veya uzaktan depolanabilir.

</Accordion>
</AccordionGroup>

---

## Tanstack Start Uygulamasında Intlayer Kurulumu için Adım Adım Rehber

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Tanstack Start için en iyi i18n çözümü mü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştıracağınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-tanstack-start-template) sayfasına bakın.

<Steps>

<Step number={1} title="Proje Oluşturma">

TanStack Start web sitesindeki [Yeni proje başlatma](https://tanstack.com/start/latest/docs/framework/react/quick-start) rehberini takip ederek yeni bir TanStack Start projesi oluşturun.

</Step>

<Step number={2} title="Intlayer Paketlerini Yükleyin">

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

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

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

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

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **react-intlayer**
  Intlayer'ı React uygulamasıyla entegre eden paket. React uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sunar.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyicisi](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini içerir; ayrıca kullanıcının tercih ettiği yereli algılayan, çerezleri yöneten ve URL yönlendirmesini ele alan ara yazılımı da kapsar.

</Step>

<Step number={3} title="Projenizin Yapılandırılması">

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

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

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, ara yazılım yönlendirmesi, çerez isimleri, içerik bildirimlerinizin konumu ve uzantısı, Intlayer günlüklerini konsolda devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

</Step>

<Step number={4} title="Intlayer'ı Vite Yapılandırmanıza Entegre Edin">

Yapılandırmanıza intlayer eklentisini ekleyin:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
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
    viteReact(),
  ],
});

export default config;
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca performansı optimize etmek için takma adlar sağlar.

</Step>

<Step number={5} title="Kök Düzen (Root Layout) Oluşturma">

Kök düzeninizi uluslararasılaştırmayı destekleyecek şekilde yapılandırın; `useParams` kullanarak mevcut yerel ayarı tespit edin ve `html` etiketinde `lang` ve `dir` özniteliklerini ayarlayın.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

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

</Step>

<Step number={6} title="Yerel Dil Düzeni Oluşturma">

Yerel ayar ön ekini işleyen ve doğrulama gerçekleştiren bir düzen oluşturun.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Yerel ayar ön ekini doğrula
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

> Burada `{-$locale}`, mevcut yerel ayar ile değiştirilen dinamik bir rota parametresidir. Bu gösterim, slotu isteğe bağlı hale getirerek `'prefix-no-default'` vb. gibi yönlendirme modlarıyla çalışmasına olanak tanır.

> Aynı rotada birden fazla dinamik segment kullanıyorsanız bu slotun sorunlara yol açabileceğini unutmayın (örneğin, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> `'prefix-all'` modu için slotu `$locale` olarak değiştirmeyi tercih edebilirsiniz.
> `'no-prefix'` veya `'search-params'` modu için slotu tamamen kaldırabilirsiniz.

</Step>

<Step number={7} title="İçeriğinizi Bildirin">

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

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

> İçerik bildirimleriniz, uygulamanızda herhangi bir yerde tanımlanabilir, yeter ki `contentDir` dizinine dahil edilsin (varsayılan olarak, `./app`). Ve içerik bildirim dosya uzantısıyla eşleşmelidir (varsayılan olarak, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla ayrıntı için, [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakınız.

</Step>

<Step number={8} title="Yerel Dili Algılayan Bileşenler ve Hook'lar Oluşturun">

Yerel dil algılayan gezinme için bir `LocalizedLink` bileşeni oluşturun:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

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

Bu bileşenin iki amacı vardır:

- URL'den gereksiz `{-$locale}` önekini kaldırmak.
- Kullanıcının doğrudan yerelleştirilmiş rotaya yönlendirilmesini sağlamak için URL'ye locale parametresini enjekte etmek.

Daha sonra programatik gezinme için bir `useLocalizedNavigate` kancası oluşturabiliriz:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

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

</Step>

<Step number={9} title="Sayfalarınızda Intlayer'ı Kullanın">

> Varsayılan olarak **`useIntlayer`** kullanın: bileşenler içinde içerik okumanın önerilen yoludur ve derleyici onu render edilen yerel ayara çözer. `getIntlayer` / `getIntlayerAsync` işlevlerine yalnızca React ağacının dışında başvurun: rota `head`'i, loader'lar ve sunucu işlevleri.

Uygulamanız genelinde içerik sözlüklerinize erişin:

#### Yerelleştirilmiş Ana Sayfa

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
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

> İçeriğinizi `alt`, `title`, `href`, `aria-label` gibi `string` niteliğinde kullanmak istiyorsanız, fonksiyonun değerini şu şekilde kullanabilirsiniz:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` hook'u hakkında daha fazla bilgi için [belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md) inceleyebilirsiniz.

</Step>

<Step number={9} title="Yerel Değiştirici Bileşeni Oluşturun">

Kullanıcıların dil değiştirebilmesini sağlayan bir bileşen oluşturun:

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
              {/* Yerel - örn: TR */}
              {localeEl}
            </span>
            <span>
              {/* Dil kendi Yerel dilinde - örn: Türkçe */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Dil mevcut Yerel dilinde - örn: Mevcut yerel İspanyolca olarak ayarlandığında Türkçe */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Dil İngilizce - örn: Turkish */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` hook'u hakkında daha fazla bilgi için [belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md) inceleyebilirsiniz.

</Step>

<Step number={10} title="HTML Nitelikleri Yönetimi">

Adım 5'te görüldüğü gibi, root bileşeninizde `useParams` kullanarak `html` etiketinin `lang` ve `dir` niteliklerini yönetebilirsiniz. Bu, doğru niteliklerin sunucu ve istemci tarafında ayarlanmasını sağlar.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

</Step>

<Step number={11} title="Middleware Ekleyin">

Uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerProxy`'yi de kullanabilirsiniz. Bu eklenti, URL'ye dayalı olarak mevcut dili otomatik olarak algılayacak ve uygun yerel tanımlama bilgisini ayarlayacaktır. Hiçbir yerel belirtilmezse, eklenti kullanıcının tarayıcı dili tercihlerine göre en uygun dili belirleyecektir. Hiçbir yerel algılanmazsa, varsayılan dile yeniden yönlendirecektir.

> `intlayerProxy`'yi üretimde kullanmak için `vite-intlayer` paketini `devDependencies`'den `dependencies`'ye değiştirmeniz gerektiğini unutmayın.

> Intlayer v9 itibariyle, `intlayerProxy()` doğrudan `intlayer()` eklentisine paketlenmiş ve `routing.enableProxy` seçeneği (`varsayılan olarak true`) aracılığıyla varsayılan olarak etkinleştirilmiştir. Aşağıda gösterilen şekilde ayrı olarak kaydetmek artık isteğe bağlıdır: geriye dönük uyumluluk ve eklenti sırasını kontrol etmesi gereken kurulumlar için saklanmıştır. `routing.enableProxy: false` olarak ayarlayarak devre dışı bırakabilirsiniz. [v9 sürüm notlarına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/releases/v9.md) bakın.

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
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
    viteReact(),
  ],
});
```

</Step>

<Step number={12} title="Meta Verilerinizi Uluslararasılaştırın">

<Tabs>

<Tab label="Statik çözümleme" value="static">

`getIntlayer` **birleştirilmiş** sözlüğe karşı senkron olarak çözer, her bir bildirilen dili tutan sözlüktür. `head` senkron kalır ve hiçbir şey beklemez, ancak tüm çok dilli sözlük tarayıcıya gönderilen rota parçasına çekilir.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Bu rota için yol

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Kanonik bağlantı: Mevcut yerelleştirilmiş sayfayı gösterir
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Google'a tüm yerelleştirilmiş sürümler hakkında bilgi ver
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Eşleşmeyen dillerdeki kullanıcılar için
        // Varsayılan fallback dilini tanımla (genellikle birincil diliniz)
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

Küçük meta veri sözlükleri, bir avuç yerel dil veya prototip oluştururken en iyisidir.

</Tab>

<Tab label="Dinamik çözümleme" value="dynamic">

`getIntlayerAsync` (**v9.4** sürümünden itibaren kullanılabilir), `getIntlayer`'e benzer şekilde davranır, ancak yapı eklentisi birleştirilmiş sözlük yerine `.intlayer/dynamic_dictionaries/` içindeki yerel başına parçayı gösterir. Bir sayfa bu nedenle yalnızca oluşturduğu dili gönderir. Bu parça isteğe bağlı yüklendiği için `head` `async` olur:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Bu rota için yol

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Kanonik bağlantı: Mevcut yerelleştirilmiş sayfayı gösterir
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Google'a tüm yerelleştirilmiş sürümler hakkında bilgi ver
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Eşleşmeyen dillerdeki kullanıcılar için
        // Varsayılan fallback dilini tanımla (genellikle birincil diliniz)
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

> Bir `head` birden çok sözlüğü okuyor ise, `Promise.all` ile çözümleyin: her `getIntlayerAsync`'i kendi satırında beklemeniz istekleri paralel olarak çalıştırmak yerine zincirlemenize neden olur.

Ödün: dinamik import, `head` çalışırken belge işleme açısından kritik yolda çözülür. Soğuk bir rota üzerinde bu, başlığı birkaç milisaniye geciktirir ve **LCP**'yi hafifçe bozabilir.

</Tab>

<Tab label="Önbelleğe alınan dinamik çözümleme" value="cached">

Sözlüğü rota `loader`'ında çözün ve `head`'de `loaderData`'dan geri okuyun. Eşleşen rotaların yükleyicileri paralel olarak çalışır ve `staleTime: Infinity`, TanStack Router'a sonucun hiçbir zaman eski olmadığını söyler, bu nedenle yerel başına parça bir kez çözülür ve daha sonra router önbelleğinden sunulur, `head`'i senkron bırakır.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Diğer eşleşen rotalar ile paralel olarak çözülür, head kritik yolundan uzakta
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // Sözlük belirli bir yerel dil için hiçbir zaman değişmez: parçayı bir kez çözün
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Bu rota için yol

    return {
      links: [
        // Kanonik bağlantı: Mevcut yerelleştirilmiş sayfayı gösterir
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Google'a tüm yerelleştirilmiş sürümler hakkında bilgi ver
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Eşleşmeyen dillerdeki kullanıcılar için
        // Varsayılan fallback dilini tanımla (genellikle birincil diliniz)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` yükleyici kararlı olmadan önce çağrılabilir, bu nedenle `loaderData` muhtemelen `undefined` olarak yazılır. İsteğe bağlı zincir oluşturmayı tutun veya bir başlık için fallback döndürün.

Yerel başına parçayı, head kritik yolunda maliyetini ödemeden tutarsınız. Fiyat geliştirici deneyimidir: içeriğin `loaderData` aracılığıyla yükleyiciden `head`'e açıkça iletilmesi gerekir.

</Tab>

</Tabs>

### Hangi çözümü seçmeliyim?

|                      | Statik çözüm       | Dinamik çözüm              | Önbelleğe alınmış dinamik çözüm           |
| -------------------- | ------------------ | -------------------------- | ----------------------------------------- |
| API                  | `getIntlayer`      | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+)    |
| `head` imzası        | senkron            | `async`                    | senkron, `loaderData` okur                |
| Gönderilen diller    | her bildirilen dil | yalnızca istenen dil       | yalnızca istenen dil                      |
| İstemci navigasyonu  | çözüme gerek yok   | her eşleşmede yeniden gir  | yönlendirici önbelleğinden sunulur        |
| Geliştirici deneyimi | en basit           | bir `await`                | içerik `loaderData` aracılığıyla iletilir |

</Step>

<Step number={13} title="Sunucu eylemlerinizde yerel ayarı alın">

Sunucu eylemleri veya API uç noktalarınızda geçerli yerel ayara erişmek isteyebilirsiniz.
Bunu `intlayer` öğesinden `getLocale` yardımcısını kullanarak yapabilirsiniz.

TanStack Start'ın sunucu işlevlerini kullanan bir örnek:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // İstekten çerezi alın (varsayılan: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // İstekten başlığı alın (varsayılan: 'x-intlayer-locale')
    // Accept-Language müzakeresi kullanarak geri dönüş
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayerAsync() kullanarak bazı içerik alın
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={14} title="Bulunamayan sayfaları yönetme">

Bir kullanıcı var olmayan bir sayfayı ziyaret ettiğinde, özel bir bulunamadı sayfası gösterebilirsiniz ve yerel ayar öneki, bulunamadı sayfasının tetiklenme şeklini etkileyebilir.

#### TanStack Router'ın Yerel Ayar Önekleriyle 404 İşlemesini Anlama

TanStack Router'da yerelleştirilmiş rotalarla 404 sayfalarını işlemek, çok katmanlı bir yaklaşım gerektirir:

1. **Özel 404 rotası**: 404 kullanıcı arayüzünü göstermek için özel bir rota
2. **Rota düzeyinde doğrulama**: Yerel ayar öneklerini doğrular ve geçersiz olanları 404'e yönlendirir
3. **Catch-all rotası**: Yerel ayar segmenti içindeki eşleşmeyen tüm yolları yakalar

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Bu, özel bir /[locale]/404 rotası oluşturur
// Hem doğrudan bir rota olarak kullanılır hem de diğer dosyalarda bir bileşen olarak içe aktarılır
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponent ve catch-all rotalarında yeniden kullanılabilmesi için ayrı olarak dışa aktarılır
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
  // beforeLoad, rota render edilmeden önce çalışır (hem sunucuda hem de istemcide)
  // Yerel ayar önekini doğrulamak için ideal yerdir
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix, yerel ayarın intlayer yapılandırmanıza göre geçerli olup olmadığını kontrol eder
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Geçersiz yerel ayar öneki - Geçerli bir yerel ayar öneki ile 404 sayfasına yönlendir
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent, bir alt rota mevcut olmadığında çağrılır
  // örn. /en/var-olmayan-sayfa bunu /en düzeni içinde tetikler
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) rotası, diğer rotalarla eşleşmeyen herhangi bir yolu eşleştirir
// örn. /en/bazı/derin/iç içe/geçersiz/yol
// Bu, bir yerel ayar içindeki TÜM eşleşmeyen yolların 404 sayfasını göstermesini sağlar
// Bu olmadan, eşleşmeyen derin yollar boş bir sayfa veya hata gösterebilir
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="Bileşenlerinizin içeriğini çıkarın" isOptional={true}> isOptional={true}>

Mevcut bir kod tabanınız varsa, binlerce dosyayı dönüştürmek zaman alıcı olabilir.

Bu süreci kolaylaştırmak için Intlayer, bileşenlerinizi dönüştürmek ve içeriği çıkarmak için bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) / [çıkarıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) sunar.

Kurulum için `intlayer.config.ts` dosyanıza bir `compiler` bölümü ekleyebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Yapılandırmanızın geri kalanı
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Çıktı dosyalarının yolunu tanımlar
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir. Bu sayede derleyici, uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,

    /**
     * Sözlük anahtarı öneki
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value="Çıkarma komutu">

Bileşenlerinizi dönüştürmek ve içeriği çıkarmak için çıkarıcıyı çalıştırın

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
 <Tab value="Babel derleyicisi">

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`vite.config.ts` dosyanızı `intlayerCompiler` eklentisini içerecek şekilde güncelleyin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Veya npm run dev
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

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Pre-render & Sitemap Oluştur">

Intlayer, uygulamanız için bir sitemap oluşturmanıza kolayca yardımcı olmak için yerleşik bir sitemap oluşturucusu ile birlikte gelir. Yerelleştirilmiş rotaları işler ve arama motorları için gerekli meta verileri ekler.

> Intlayer tarafından oluşturulan sitemap, `xhtml:link` ad alanını (Hreflang XML Uzantıları) destekler. Yalnızca ham URL'leri listeleyen varsayılan sitemap oluşturucularının aksine, Intlayer bir sayfanın tüm dil sürümleri arasında gerekli çift yönlü bağlantıları otomatik olarak oluşturur (örneğin, `/about`, `/about?lang=fr` ve `/about?lang=es`). Bu, arama motorlarının doğru dil sürümünü doğru kitleye doğru şekilde indekslemesini ve sunmasını sağlar.

Bunu kullanmak için, önce `vite.config.ts` dosyanızı yerelleştirilmiş rotalarınız için ön-işlemeyi etkinleştirmek ve TanStack Start'ın varsayılan sitemap oluşturmayı devre dışı bırakmak üzere yapılandırmanız gerekir.

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
// ... diğer importlar

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... diğer eklentiler
    tanstackStart({
      // ... diğer konfigürasyon
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Ardından, `generateSitemap` fonksiyonunu kullanan bir `src/routes/sitemap[.]xml.ts` rotası oluşturun:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { generateSitemap } from "intlayer";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

</Step>

<Step number={17} title="TypeScript'i Yapılandır">

Intlayer, TypeScript'in avantajlarından yararlanmak ve codebase'inizi güçlendirmek için module augmentation kullanır.

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun:

```json5 fileName="tsconfig.json"
{
  // ... mevcut yapılandırmalarınız
  include: [
    // ... mevcut includes'larınız
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

</Step>

</Steps>

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, bu dosyaların Git deposuna eklenmesini önlemenizi sağlar.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

---

## VS Code Extension

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Extension**'ını yükleyebilirsiniz.

[VS Code Marketplace'ten Yükle](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu extension şunları sağlar:

- **Autocompletion** çeviri anahtarları için.
- **Real-time error detection** eksik çeviriler için.
- **Inline previews** çevirilen içerik için.
- **Quick actions** kolayca çeviri oluşturmak ve güncellemek için.

Extension'ın nasıl kullanılacağı hakkında daha fazla ayrıntı için, [Intlayer VS Code Extension belgelerine](https://intlayer.org/doc/vs-code-extension) başvurun.

---

## Daha İleri Gidin

Daha ileri gitmek için, [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışsallaştırabilirsiniz.

---

## Dokümantasyon Referansları

- [Intlayer Dokümantasyonu](https://intlayer.org)
- [Tanstack Start Dokümantasyonu](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

## Sıkça Sorulan Sorular

<FAQ>

<Question title="TanStack Start uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

TanStack Start kendi i18n katmanına sahip değildir:

- **`i18next` / `react-i18next`** ve **`react-intl`**: çalışma zamanında JSON ad alanları yükleyen kütüphaneler.
- **`Intlayer`**: SSR ve ön render desteği, bileşen yanında bildirim, tam TypeScript tipleri, AI çeviri ve görsel düzenleyici sunan modern çözüm.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

</Question>

<Question title="i18n TanStack Start paket boyutuma ne kadar ekler?">

Ad alanı tabanlı bir yapılandırmaya kıyasla çok daha az, çünkü bir sayfa render etmediği bir kataloğu asla indirmez. Derleme zamanı derleyicisi `useIntlayer` çağrılarını bileşenin kullandığı kesin sözlük girişleriyle değiştirir ve [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını yerel başına böler. Intlayer paket boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

</Question>

<Question title="react-i18next veya react-intl'den bileşenlerimi yeniden yazmadan geçiş yapabilir miyim?">

Evet. Aşamalı geçiş kılavuzlarını izleyebilir veya uyumluluk adaptörlerini kullanabilirsiniz.

</Question>

<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

</Question>

<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer bileşenlerinizi okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz.

Tam otomatik bir süreç için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında aynı işlemi yapar: her değişiklikte kaynak kodunu tarar, sözlükleri üretir ve HMR ile senkronize tutar.

Derleyiciyi açmadan önce bilmeye değer iki sınır vardır. Statik analiz ile çalışır, bu nedenle API hata kodları veya CMS alanları gibi yalnızca çalışma zamanında var olan dizeler ulaşılamaz kalır. Ayrıca, `className="active"` veya durum kodu gibi uygulama mantığından kullanıcıya yönelik metinleri ayırt etmesi gerekir; bu da büyük bir kod tabanında birkaç ek açıklama gerektirir. [Extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) sizi döngüde tutarak her ikisinden de kaçınır.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>

<Question title="Intlayer TanStack Start'ta sunucu tarafı render ve ön render desteği sunuyor mu?">

Evet. İçerik SSR sırasında çözümlenir ve kılavuz yerel başına statik bir belge üreten ön render yapılandırmasını kapsar.

</Question>

<Question title="hreflang etiketlerini ve yerelleştirilmiş site haritasını nasıl eklerim?">

`src/routes/sitemap[.]xml.ts` rotasında `generateSitemap` işlevini kullanarak `xhtml:link` etiketlerini ve `x-default` girişini oluşturun.

</Question>

<Question title="URL'ye yerel koymak zorunda mıyım?">

Hayır. `routing.mode` ayarı `"prefix-no-default"` (varsayılan), `"prefix-all"`, `"no-prefix"` ve `"search-params"` değerlerini kabul eder.

</Question>

<Question title="Mevcut rotayı koruyan bir dil değiştirici nasıl oluşturulur?">

Adım 9'da açıklanan yerelleştirilmiş link bileşeni ile birlikte `useLocale` kullanın.

</Question>

<Question title="Yerelleştirilmiş rotalarda 404 sayfalarını nasıl yönetirim?">

Adım 14 bunu kapsar. `validatePrefix`, URL'nin yerel segmentinin geçerli olup olmadığını doğrular.

</Question>

<Question title="TanStack Start uygulamasını AI ile otomatik olarak nasıl çeviririm?">

`npx intlayer fill` komutunu çalıştırın. Eksik çevirileri seçtiğiniz LLM ile tamamlar ve `--git-diff` işlemi daldaki değişikliklerle sınırlar. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md).

</Question>

<Question title="Intlayer çoğulları, cinsiyeti ve zengin metni (rich text) destekliyor mu?">

Evet: [çoğul biçimleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md), [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md), koşullar, [eklemeler (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md) ve [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md).

</Question>

<Question title="Çevirmenler koda dokunmadan içeriği nasıl düzenleyebilir?">

Kendi altyapınızda çalışan ve herkesin metinleri çalışan uygulamada yerinde düzenlemesine olanak tanıyan [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) veya içeriği kod dağıtımı olmadan güncellenebilecek şekilde dışsallaştıran [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) aracılığıyla.

</Question>

<Question title="Intlayer ücretsiz ve açık kaynaklı mı?">

Evet, ticari kullanım dahil Apache 2.0 lisansı altındadır. Barındırılan CMS isteğe bağlı ücretli bir hizmettir ve ayrıca [kendi sunucunuzda barındırılabilir (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

</Question>

</FAQ>

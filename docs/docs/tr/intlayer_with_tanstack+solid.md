---
createdAt: 2025-03-25
updatedAt: 2026-03-25
title: Tanstack Start i18n - 2026'da Solid.js kullanarak Tanstack Start Uygulamasını Çevirme
description: Intlayer ve Solid.js kullanarak Tanstack Start uygulamanıza nasıl uluslararasılaştırma (i18n) ekleyeceğinizi öğrenin. Uygulamanızı yerel ayara duyarlı yönlendirme ile çok dilli hale getirmek için bu kapsamlı kılavuzu izleyin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Yerel Ayar Yönlendirmesi
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Tanstack Start Solid.js için eklendi"
---

# Intlayer Kullanarak Tanstack Start + Solid.js Web Sitenizi Çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

Bu kılavuz, Solid.js içeren Tanstack Start projelerinde sorunsuz uluslararasılaştırma, yerel ayara duyarlı yönlendirme, TypeScript desteği ve modern geliştirme uygulamaları için **Intlayer**'ı nasıl entegre edeceğinizi gösterir.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- Bileşen düzeyinde bildirimsel sözlükler kullanarak **çevirileri kolayca yönetebilirsiniz**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirebilirsiniz**.
- Otomatik olarak oluşturulan türlerle **TypeScript desteği sağlayabilir**, otomatik tamamlamayı ve hata tespitini iyileştirebilirsiniz.
- Dinamik yerel ayar algılama ve değiştirme gibi **gelişmiş özelliklerden yararlanabilirsiniz**.
- Tanstack Start'ın dosya tabanlı yönlendirme sistemi ile **yerel ayara duyarlı yönlendirmeyi etkinleştirebilirsiniz**.

---

## Tanstack Start Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Tanstack Start için en iyi i18n çözümü mü? Intlayer'ı Keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız?"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'daki [Uygulama Şablonu](https://github.com/aymericzip/intlayer-tanstack-start-solid-template)na göz atın.

### Adım 1: Proje Oluşturma

Öncelikle, TanStack Start web sitesindeki [Yeni Proje Başlat](https://tanstack.com/start/latest/docs/framework/solid/quick-start) kılavuzunu izleyerek yeni bir TanStack Start projesi oluşturun.

### Adım 2: Intlayer Paketlerini Kurun

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri kurun:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **solid-intlayer**
  Intlayer'ı Solid uygulamasına entegre eden paket. Solid uluslararasılaştırması için bağlam sağlayıcıları (context providers) ve hook'lar sunar.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı (middleware) içerir.

### Adım 3: Projenizin Yapılandırılması

Uygulamanızın dillerini ayarlamak için bir yapılandırma dosyası oluşturun:

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

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, ara yazılım yönlendirmesini, çerez adlarını, içerik bildirimlerinizin konumunu ve uzantısını yapılandırabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)na bakın.

### Adım 4: Intlayer'ı Vite Yapılandırmanıza Entegre Edin

Bite yapılandırmanıza intlayer eklentisini ekleyin:

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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performans yükünü azaltmak için takma adlar (aliases) sağlar.

### Adım 5: Kök Düzeni (Root Layout) Oluşturma

Geçerli yerel ayarı algılamak için `useMatches` kullanarak ve `html` etiketinde `lang` ve `dir` özelliklerini ayarlayarak kök düzeninizi uluslararasılaştırmayı destekleyecek şekilde yapılandırın.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // Herhangi bir etkin eşleşmenin parametrelerinde yerel ayarı bulmaya çalışın
  // Bu, rota ağacınızda "/{-$locale}" dinamik segmentini kullandığınızı varsayar
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Adım 6: Yerel Ayar Düzeni Oluşturma (İsteğe Bağlı)

Yerel ayar önekini işleyen ve doğrulama gerçekleştiren bir düzen oluşturun. Bu düzen, yalnızca geçerli yerel ayarların işlenmesini sağlayacaktır.

> Rota düzeyinde yerel ayar önekini doğrulamanız gerekmiyorsa bu adım isteğe bağlıdır.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Yerel ayar önekini doğrula
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

> Burada, `{-$locale}` geçerli yerel ayarla değiştirilen dinamik bir rota parametresidir. Bu gösterim, bu slotu isteğe bağlı hale getirerek `'prefix-no-default'` vb. yönlendirme modlarıyla çalışmasına olanak tanır.

> Aynı rotada birden fazla dinamik segment kullanırsanız bu slotun sorunlara neden olabileceğini unutmayın (ör: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> `'prefix-all'` modu için slotu `$locale` olarak değiştirmeyi tercih edebilirsiniz.
> `'no-prefix'` veya `'search-params'` modu için slotu tamamen kaldırabilirsiniz.

### Adım 7: İçeriğinizi Bildirin

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

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./app`) dahil edildiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)na bakın.

### Adım 8: Yerel Ayara Duyarlı Bileşenleri ve Hook'ları Kullanın

Yerel ayara duyarlı navigasyon için bir `LocalizedLink` bileşeni oluşturun:

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
  McPherson,
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

Bu bileşen iki amaca hizmet eder:

- URL'den gereksiz `{-$locale}` önekini kaldırmak.
- Kullanıcının doğrudan yerelleştirilmiş rotaya yönlendirilmesini sağlamak için yerel ayar parametresini URL'ye enjekte etmek.

Ardından, programatik navigasyon için bir `useLocalizedNavigate` hook'u oluşturabiliriz:

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

### Adım 9: Sayfalarınızda Intlayer'ı Kullanın

Uygulamanız genelinde içerik sözlüklerinize erişin:

#### Yerelleştirilmiş Ana Sayfa

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
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> Solid'de, `useIntlayer` bir **accessor** fonksiyonu (ör: `content()`) döndürür. Reaktif içeriğe erişmek için bu fonksiyonu çağırmalısınız.
>
> `useIntlayer` hook'u hakkında daha fazla bilgi edinmek için [dokümantasyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useIntlayer.md)a bakın.

### Adım 10: Yerel Ayar Değiştirici Bileşeni Oluşturma

Kullanıcıların dilleri değiştirmesine olanak tanıyan bir bileşen oluşturun:

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

> Solid'de, `useLocale`dan gelen `locale` bir **signal accessor**'dur. Reaktif olarak geçerli değerini okumak için `locale()` (parantezli) kullanın.
>
> `useLocale` hook'u hakkında daha fazla bilgi edinmek için [dokümantasyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useLocale.md)a bakın.

### Adım 11: HTML Özniteliklerinin Yönetimi

Adım 5'te görüldüğü gibi, kök bileşeninizde `useMatches` kullanarak `html` etiketinin `lang` ve `dir` özniteliklerini yönetebilirsiniz. Bu, hem sunucuda hem de istemcide doğru özniteliklerin ayarlanmasını sağlar.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // Herhangi bir etkin eşleşmenin parametrelerinde yerel ayarı bulmaya çalışın
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Adım 12: Ara Yazılım Ekleme (İsteğe Bağlı)

Uygulamanıza sunucu tarafı yönlendirmesi eklemek için `intlayerProxy`yi de kullanabilirsiniz. Bu eklenti, URL'ye göre geçerli yerel ayarı otomatik olarak algılayacak ve uygun yerel ayar çerezini ayarlayacaktır. Herhangi bir yerel ayar belirtilmemişse, eklenti kullanıcının tarayıcı dili tercihlerine göre en uygun yerel ayarı belirleyecektir. Hiçbir yerel ayar algılanmazsa varsayılan yerel ayara yönlendirecektir.

> Üretimde `intlayerProxy`yi kullanmak için `vite-intlayer` paketini `devDependencies`dan `dependencies`e taşımanız gerektiğini unutmayın.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Nitro kullanıyorsanız Proxy sunucudan önce yerleştirilmelidir
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Adım 13: Meta Verilerinizi Uluslararasılaştırın (İsteğe Bağlı)

Yerel ayara duyarlı meta veriler için `head` yükleyicisi içindeki içerik sözlüklerinize erişmek için `getIntlayer` fonksiyonunu da kullanabilirsiniz:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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

### Adım 14: Sunucu aksiyonlarınızda yerel ayarı alın (İsteğe Bağlı)

Sunucu aksiyonlarınızın veya API uç noktalarınızın içinden geçerli yerel ayara erişmek isteyebilirsiniz.
Bunu `intlayer`dan `getLocale` yardımcısını kullanarak yapabilirsiniz.

İşte TanStack Start'ın sunucu fonksiyonlarını kullanan bir örnek:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // İstekten çerezi al (varsayılan: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // İstekten başlığı al (varsayılan: 'x-intlayer-locale')
    // Accept-Language anlaşması kullanılarak geri dönüş (fallback)
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer() ile alınan bazı içerikler
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Adım 15: Bulunamayan sayfaları yönetme (İsteğe Bağlı)

Bir kullanıcı var olmayan bir sayfayı ziyaret ettiğinde, özel bir bulunamadı sayfası görüntüleyebilirsiniz ve yerel ayar öneki bulunamadı sayfasının tetiklenme şeklini etkileyebilir.

#### TanStack Router'ın yerel ayar önekleriyle 404 işlemesini anlama

TanStack Router'da, yerelleştirilmiş rotalarla 404 sayfalarını işlemek çok katmanlı bir yaklaşım gerektirir:

1. **Özel 404 rotası**: 404 kullanıcı arabirimini görüntülemek için belirli bir rota
2. **Rota düzeyinde doğrulama**: Yerel ayar öneklerini doğrular ve geçersiz olanları 404'e yönlendirir
3. **Catch-all rotası**: Yerel ayar segmentindeki eşleşmeyen tüm yolları yakalar

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Bu, özel bir /[locale]/404 rotası oluşturur
// Hem doğrudan bir rota olarak kullanılır hem de diğer dosyalarda bir bileşen olarak içe aktarılır
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponent ve catch-all rotalarında yeniden kullanılabilmesi için ayrı olarak dışa aktarıldı
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
  // beforeLoad, rota işlenmeden (render) önce çalışır (hem sunucu hem istemci)
  // Yerel ayar önekini doğrulamak için ideal yerdir
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix, yerel ayarın intlayer yapılandırmanıza göre geçerli olup olmadığını kontrol eder
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Geçersiz yerel ayar öneki - geçerli bir yerel ayar önekiyle 404 sayfasına yönlendir
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent, bir alt rota mevcut olmadığında çağrılır
  // ör: /en/var-olmayan-sayfa /en düzeni içinde bunu tetikler
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) rotası, diğer rotalarla eşleşmeyen tüm yollarla eşleşir
// ör: /en/derin/ic-ice/gecersiz/yol
// Bu, bir yerel ayar içindeki TÜM eşleşmeyen yolların 404 sayfasını göstermesini sağlar
// Bu olmadan, derin eşleşmeyen yollar boş bir sayfa veya hata gösterebilir
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### (İsteğe Bağlı) Adım 16: Bileşenlerinizden içeriği çıkartın

Mevcut bir kod tabanınız varsa, binlerce dosyayı dönüştürmek zaman alıcı olabilir.

Bu süreci kolaylaştırmak için Intlayer, bileşenlerinizi dönüştürmek ve içeriği çıkartmak için bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) / [çıkartıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) önerir.

Kurulumu yapmak için `intlayer.config.ts` dosyanıza bir `compiler` bölümü ekleyebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Yapılandırmanızın geri kalanı
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Çıkış dosyaları yolunu tanımlar
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Dönüştürüldükten sonra bileşenlerin kaydedilip kaydedilmeyeceğini belirtir.
     *
     * - `true` ise, derleyici diskteki bileşen dosyasını yeniden yazacaktır. Böylece dönüşüm kalıcı olacak ve derleyici bir sonraki işlem için dönüşümü atlayacaktır. Bu şekilde, derleyici uygulamayı dönüştürebilir ve ardından kaldırılabilir.
     *
     * - `false` ise, derleyici `useIntlayer()` fonksiyon çağrısını yalnızca derleme çıktısındaki koda enjekte ederek temel kod tabanını olduğu gibi tutacaktır. Dönüşüm yalnızca bellekte yapılacaktır.
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Yapılandırmanızın geri kalanı
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Çıkış dosyaları yolunu tanımlar
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Dönüştürüldükten after after components recorded indicate whether.
     *
     * - `true` ise, derleyici diskteki bileşen dosyasını yeniden yazacaktır. Böylece dönüşüm kalıcı olacak ve derleyici bir sonraki işlem için dönüşümü atlayacaktır. Bu şekilde, derleyici uygulamayı dönüştürebilir ve ardından kaldırılabilir.
     *
     * - `false` ise, derleyici `useIntlayer()` fonksiyon çağrısını yalnızca derleme çıktısındaki koda enjekte ederek temel kod tabanını olduğu gibi tutacaktır. Dönüşüm yalnızca bellekte yapılacaktır.
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Yapılandırmanızın geri kalanı
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Çıkış dosyaları yolunu tanımlar
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Dönüştürüldükten after after components recorded indicate whether.
     *
     * - `true` ise, derleyici diskteki bileşen dosyasını yeniden yazacaktır. Böylece dönüşüm kalıcı olacak ve derleyici bir sonraki işlem için dönüşümü atlayacaktır. Bu şekilde, derleyici uygulamayı dönüştürebilir ve ardından kaldırılabilir.
     *
     * - `false` ise, derleyici `useIntlayer()` fonksiyon çağrısını yalnızca derleme çıktısındaki koda enjekte ederek temel kod tabanını olduğu gibi tutacaktır. Dönüşüm yalnızca bellekte yapılacaktır.
     */
    saveComponents: false,

    /**
     * Sözlük anahtarı öneki
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
```

<Tabs>
 <Tab value='Extract komutu'>

Bileşenlerinizi dönüştürmek ve içeriği çıkartmak için çıkartıcıyı çalıştırın

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
 <Tab value='Babel derleyicisi'>

`intlayerCompiler` eklentisini dahil etmek için `vite.config.ts` dosyanızı güncelleyin:

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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
  ],
});
```

```bash packageManager="npm"
npm run build # veya npm run dev
```

```bash packageManager="pnpm"
pnpm run build # veya pnpm run dev
```

```bash packageManager="yarn"
yarn build # veya yarn dev
```

```bash packageManager="bun"
bun run build # veya bun run dev
```

 </Tab>
</Tabs>

---

### Adım 17: TypeScript'i Yapılandırın (İsteğe Bağlı)

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun:

```json5 fileName="tsconfig.json"
{
  // ... mevcut ayarlarınız
  include: [
    // ... mevcut içerikleriniz (includes)
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

---

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, bunları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

---

## VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükle](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sunar:

- Çeviri anahtarları için **Otomatik Tamamlama**.
- Eksik çeviriler için **Gerçek zamanlı hata tespiti**.
- Çevrilmiş içeriğin **Satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **Hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonu](https://intlayer.org/doc/vs-code-extension)na bakın.

---

## Daha İleri Gitmek

Daha ileri gitmek için [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)yi uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.

---

## Dokümantasyon Referansları

- [Intlayer Dokümantasyonu](https://intlayer.org)
- [Tanstack Start Dokümantasyonu](https://tanstack.com/start/latest)
- [useIntlayer hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useIntlayer.md)
- [useLocale hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useLocale.md)
- [İçerik Bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)
- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

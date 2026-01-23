---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Tanstack Start uygulamanızı nasıl çevirirsiniz – i18n rehberi 2026
description: Tanstack Start uygulamanıza Intlayer kullanarak uluslararasılaştırma (i18n) nasıl eklenir öğrenin. Uygulamanızı yerel dil yönlendirmesi ile çok dilli hale getirmek için bu kapsamlı rehberi takip edin.
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
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init komutu ekle
  - version: 7.4.0
    date: 2025-12-11
    changes: validatePrefix'i tanıt ve 14. adımı ekle: Yerelleştirilmiş rotalarla 404 sayfalarını ele alma.
  - version: 7.3.9
    date: 2025-12-05
    changes: 13. adımı ekle: Sunucu işlemlerinde locale bilgisini almak (Opsiyonel)
  - version: 7.2.3
    date: 2025-11-18
    changes: 13. adımı ekle: Nitro'yu uyarla
  - version: 7.1.0
    date: 2025-11-17
    changes: getPrefix fonksiyonunu ekleyerek useLocalizedNavigate, LocaleSwitcher ve LocalizedLink için önek varsayılanını düzelt.
  - version: 6.5.2
    date: 2025-10-03
    changes: Doküman güncellemesi
  - version: 5.8.1
    date: 2025-09-09
    changes: Tanstack Start için eklendi
---

# Intlayer ile Tanstack Start sitenizi çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

Bu rehber, Tanstack Start projelerinde yerel dil yönlendirmesi, TypeScript desteği ve modern geliştirme uygulamalarıyla sorunsuz uluslararasılaştırma için **Intlayer**'ın nasıl entegre edileceğini göstermektedir.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen seviyesinde bildirisel sözlükler kullanarak çevirileri kolayca yönetin.**
- **Meta verileri, yönlendirmeleri ve içeriği dinamik olarak yerelleştirin.**
- **Otomatik oluşturulan tiplerle TypeScript desteğini sağlayarak otomatik tamamlama ve hata tespitini geliştirin.**
- **Dinamik yerel dil algılama ve değiştirme gibi gelişmiş özelliklerden faydalanın.**
- **Tanstack Start'ın dosya tabanlı yönlendirme sistemi ile yerel dil farkındalıklı yönlendirmeyi etkinleştirin.**

---

## Tanstack Start Uygulamasında Intlayer Kurulumu için Adım Adım Rehber

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Tanstack Start için en iyi i18n çözümü mü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştıracağınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-tanstack-start-template) sayfasına bakın.

### Adım 1: Proje Oluşturma

TanStack Start web sitesindeki [Yeni proje başlatma](https://tanstack.com/start/latest/docs/framework/react/quick-start) rehberini takip ederek yeni bir TanStack Start projesi oluşturun.

### Adım 2: Intlayer Paketlerini Yükleyin

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

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

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **react-intlayer**
  Intlayer'ı React uygulamasıyla entegre eden paket. React uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sunar.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyicisi](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini içerir; ayrıca kullanıcının tercih ettiği yereli algılayan, çerezleri yöneten ve URL yönlendirmesini ele alan ara yazılımı da kapsar.

### Adım 3: Projenizin Yapılandırılması

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

### Adım 4: Intlayer'ı Vite Yapılandırmanıza Entegre Edin

Yapılandırmanıza intlayer eklentisini ekleyin:

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

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca performansı optimize etmek için takma adlar sağlar.

### Adım 5: Kök Düzen (Root Layout) Oluşturma

Kök düzeninizi uluslararasılaştırmayı destekleyecek şekilde yapılandırın; `useMatches` kullanarak mevcut yerel ayarı tespit edin ve `html` etiketinde `lang` ve `dir` özniteliklerini ayarlayın.

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

  // Aktif herhangi bir eşleşmenin parametrelerinde yerel ayarı bulmaya çalışın
  // Bu, rota ağacınızda "/{-$locale}" dinamik segmentini kullandığınızı varsayar
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

### Adım 6: Yerel Dil Düzeni Oluşturma

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

> İçerik bildirimleriniz, uygulamanızda herhangi bir yerde tanımlanabilir, yeter ki `contentDir` dizinine dahil edilsin (varsayılan olarak, `./app`). Ve içerik bildirim dosya uzantısıyla eşleşmelidir (varsayılan olarak, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla ayrıntı için, [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md) bakınız.

### Adım 8: Yerel Dili Algılayan Bileşenler ve Hook'lar Oluşturun

Yerel dil algılayan gezinme için bir `LocalizedLink` bileşeni oluşturun:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Ana yardımcı
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Yardımcılar
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

Bu bileşenin iki amacı vardır:

- URL'den gereksiz `{-$locale}` önekini kaldırmak.
- Kullanıcının doğrudan yerelleştirilmiş rotaya yönlendirilmesini sağlamak için URL'ye locale parametresini enjekte etmek.

Daha sonra programatik gezinme için bir `useLocalizedNavigate` kancası oluşturabiliriz:

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

### Adım 9: Sayfalarınızda Intlayer'ı Kullanın

Uygulamanız genelinde içerik sözlüklerinize erişin:

#### Yerelleştirilmiş Ana Sayfa

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

> `useIntlayer` kancasını daha fazla öğrenmek için, [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md) bakınız.

### Adım 10: Bir Dil Değiştirici (Locale Switcher) Bileşeni Oluşturun

Kullanıcıların dilleri değiştirmesine izin veren bir bileşen oluşturun:

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
              {/* Dil Kodu - örn. FR */}
              {localeEl}
            </span>
            <span>
              {/* Dil kendi yerelinde - örn. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Dil mevcut yerelde - örn. Francés, mevcut yerel Locales.SPANISH olarak ayarlanmış */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Dil İngilizce olarak - örn. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` hook'u hakkında daha fazla bilgi edinmek için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md) bakınız.

### Adım 11: HTML Öznitelik Yönetimi

Adım 5'te görüldüğü gibi, kök bileşeninizde `useMatches` kullanarak `html` etiketinin `lang` ve `dir` özniteliklerini yönetebilirsiniz. Bu, sunucuda ve istemcide doğru özniteliklerin ayarlanmasını sağlar.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Aktif herhangi bir eşleşmenin parametrelerinde yerel ayarı bulmaya çalışın
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

### Adım 12: Middleware Ekleme (İsteğe Bağlı)

Uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerProxy`'i de kullanabilirsiniz. Bu eklenti, URL'ye göre mevcut yerel ayarı otomatik olarak algılar ve uygun yerel ayar çerezini ayarlar. Hiçbir yerel ayar belirtilmemişse, eklenti kullanıcının tarayıcı dil tercihlerine göre en uygun yerel ayarı belirler. Hiçbir yerel ayar algılanmazsa, varsayılan yerel ayara yönlendirme yapar.

> Üretimde `intlayerProxy` kullanmak için, `vite-intlayer` paketini `devDependencies`'den `dependencies`'e geçirmeniz gerektiğini unutmayın.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Nitro kullanıyorsanız, proxy sunucudan önce yerleştirilmelidir
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

### Adım 13: Meta Verilerinizi Uluslararasılaştırın (İsteğe Bağlı)

Uygulamanız genelinde içerik sözlüklerinize erişmek için `getIntlayer` hook'unu da kullanabilirsiniz:

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

### Adım 14: Sunucu işlemlerinde yerel ayarı alma (İsteğe Bağlı)

Sunucu işlemleriniz veya API uç noktalarınızın içinden mevcut yerel ayara erişmek isteyebilirsiniz.
Bunu `intlayer` paketinden `getLocale` yardımcısını kullanarak yapabilirsiniz.

TanStack Start'ın sunucu fonksiyonlarını kullanan bir örnek:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // İstekten çerezi al (varsayılan: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // İstekten başlığı al (varsayılan: 'x-intlayer-locale')
    // Accept-Language anlaşmasını kullanarak geri dönüş
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer() kullanarak bazı içerikleri al
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Adım 15: Bulunamayan sayfaları yönetme (İsteğe Bağlı)

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

---

### Adım 16: TypeScript Yapılandırması (İsteğe Bağlı)

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

TypeScript yapılandırmanızın otomatik oluşturulan türleri içerdiğinden emin olun:

```json5 fileName="tsconfig.json"
{
  // ... mevcut yapılandırmalarınız
  include: [
    // ... mevcut dahil ettikleriniz
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

---

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, bu dosyaların Git deposuna eklenmesini önlemenizi sağlar.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

---

## VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **Otomatik tamamlama**.
- Eksik çeviriler için **Gerçek zamanlı hata tespiti**.
- Çevrilmiş içeriğin **Satır içi önizlemeleri**.
- Çevirileri kolayca oluşturup güncellemek için **Hızlı işlemler**.

Bu eklentinin nasıl kullanılacağı hakkında daha fazla detay için, [Intlayer VS Code Eklentisi dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakabilirsiniz.

---

## Daha İleri Gitmek

Daha ileri gitmek için, [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışa aktarabilirsiniz.

---

## Dokümantasyon Referansları

- [Intlayer Dokümantasyonu](https://intlayer.org)
- [Tanstack Start Dokümantasyonu](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md)
- [İçerik Beyanı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md)
- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

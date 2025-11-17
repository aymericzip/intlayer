---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Tanstack Start uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
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
history:
  - version: 6.5.2
    date: 2025-10-03
    changes: Doküman güncellemesi
  - version: 5.8.1
    date: 2025-09-09
    changes: Tanstack Start için eklendi
---

# Intlayer ile Tanstack Start çevirin | Uluslararasılaştırma (i18n)

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

### Adım 1: Proje Oluşturma

TanStack Start web sitesindeki [Yeni proje başlatma](https://tanstack.com/start/latest/docs/framework/react/quick-start) rehberini takip ederek yeni bir TanStack Start projesi oluşturun.

### Adım 2: Intlayer Paketlerini Yükleyin

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

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
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca performansı optimize etmek için takma adlar sağlar.

### Adım 5: Düzen Bileşenleri Oluşturun

Kök düzeninizi ve yerel dile özgü düzenlerinizi ayarlayın:

#### Kök Düzen

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

### Adım 6: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        tr: "Hakkında",
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        tr: "Ana Sayfa",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        tr: "Bu, Intlayer'ın TanStack Router ile kullanımına bir örnektir",
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      tr: "Intlayer + TanStack Router'a Hoş Geldiniz",
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> İçerik bildirimleriniz, uygulamanızda herhangi bir yerde tanımlanabilir, yeter ki `contentDir` dizinine dahil edilsin (varsayılan olarak, `./app`). Ve içerik bildirim dosya uzantısıyla eşleşmelidir (varsayılan olarak, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla ayrıntı için, [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md) bakınız.

### Adım 7: Yerel Dili Algılayan Bileşenler ve Hook'lar Oluşturun

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

### Adım 8: Sayfalarınızda Intlayer'ı Kullanın

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

### Adım 9: Bir Dil Değiştirici (Locale Switcher) Bileşeni Oluşturun

Kullanıcıların dilleri değiştirmesine izin veren bir bileşen oluşturun:

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";

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
            aria-current={localeEl === locale ? "sayfa" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeEl)}`}
            onClick={() => setLocaleInStorage(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
          >
            <span>
              {/* Dil Kodu - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi yerelinde - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Dil mevcut yerelde - örn. Francés, mevcut yerel Locales.SPANISH olarak ayarlanmış */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Dil İngilizce olarak - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` hook'u hakkında daha fazla bilgi edinmek için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md) bakınız.

### Adım 10: HTML Özniteliklerinin Yönetimini Ekleme (İsteğe Bağlı)

HTML lang ve dir özniteliklerini yönetmek için bir hook oluşturun:

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

Sonra bunu kök bileşeninizde kullanın:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // hook'u içe aktar

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // bu satırı ekle

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

### Adım 11: Middleware Ekleme (İsteğe Bağlı)

Uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerProxy`'i de kullanabilirsiniz. Bu eklenti, URL'ye göre mevcut yerel ayarı otomatik olarak algılar ve uygun yerel ayar çerezini ayarlar. Hiçbir yerel ayar belirtilmemişse, eklenti kullanıcının tarayıcı dil tercihlerine göre en uygun yerel ayarı belirler. Hiçbir yerel ayar algılanmazsa, varsayılan yerel ayara yönlendirme yapar.

> Üretimde `intlayerProxy` kullanmak için, `vite-intlayer` paketini `devDependencies`'den `dependencies`'e geçirmeniz gerektiğini unutmayın.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
    intlayerProxy(),
  ],
});
```

---

### Adım 12: TypeScript Yapılandırması (İsteğe Bağlı)

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

Bu kapsamlı rehber, Intlayer'ı Tanstack Start ile tam uluslararasılaştırılmış, yerel farkındalıklı yönlendirme ve TypeScript desteğine sahip bir uygulama için entegre etmeniz gereken her şeyi sağlar.

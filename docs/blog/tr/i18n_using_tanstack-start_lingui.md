---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Lingui ile TanStack Start i18n: Kapsamlı 2026 Kurulum Rehberi"
description: "TanStack Start uygulamanızı Lingui ile yerelleştirin: makrolar, PO katalogları, SSR, yerel tabanlı yönlendirme, hreflang, sitemap, robots.txt ve gerçek paket boyutu karşılaştırma verileri."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Uluslararasılaşma
  - i18n
  - SEO
  - PO dosyaları
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "İlk sürüm"
author: aymericzip
---

# 2026 Yılında Lingui Kullanarak TanStack Start Uygulamanızı Nasıl Uluslararasılaştırırsınız?

## İçindekiler

<TOC/>

## Lingui Nedir?

**Lingui**, **makrolar** ve **mesaj çıkarma (extraction)** etrafında inşa edilmiş bir i18n kütüphanesidir. Kaynak metni doğrudan bileşenlerinizde yazarsınız (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` her mesajı kataloglarda (varsayılan olarak PO dosyaları) toplar, çevirmenler bunları doldurur ve Vite eklentisi bunları kompakt JavaScript'e derler. Mesajlar ICU MessageFormat standardını kullanır, bu sayede çoğul ve seçim (select) yapıları desteklenir.

TanStack Start yerleşik bir i18n katmanı sunmaz, bu nedenle bu rehber Lingui'yi sıfırdan entegre eder:

- **Babel tarafından derlenen makrolar**: `@rolldown/plugin-babel` aracılığıyla (`@vitejs/plugin-react` v6 ve Vite 8 ile gereklidir).
- **Yerel tabanlı yönlendirme (Locale routing)**: İsteğe bağlı bir `{-$locale}` segmenti ile (`/about`, `/fr/about`).
- **Her yerel için talep üzerine yüklenen tek katalog** ve eşzamanlı SSR isteklerinin asla aynı yereli paylaşmaması için render başına bir `I18n` örneği.
- **Eksiksiz çok dilli SEO**: çevrilmiş `<title>` ve açıklama, canonical URL, `x-default` ile `hreflang`, Open Graph yerelleri, JSON-LD, sitemap, `robots.txt`, ön işleme (pre-rendering) ve yerelleştirilmiş 404 sayfaları.

> Başka bir teknoloji yığını mı arıyorsunuz?

- [TanStack Start + use-intl rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Paraglide rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_paraglide.md)
- [TanStack Start + Intlayer rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md)

> Next.js mi kullanıyorsunuz?

- [Next.js + Lingui rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_nextjs_lingui.md)

> Kütüphaneleri karşılaştırmak ister misiniz?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/lingui_vs_intlayer.md)

> Bu kütüphanelerin nereden geldiğini anlamak için JavaScript i18n tarihini okuyun.

- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)

## TanStack Start Üzerinde Lingui Karşılaştırma Testleri Ne Söylüyor?

[i18n karşılaştırma testi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md), aynı 10 sayfalık ve 10 yerelli TanStack Start uygulamasını tüm büyük kütüphanelerle çalıştırır ve tarayıcının gerçekte ne indirdiğini ölçer.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

`@lingui/core@6.6.0` için 2026-09-26 tarihinde ölçülen temel veriler (gzip):

| Kurulum                           | Kütüphane boyutu | Sayfa başına JS | Diğer dil sızıntısı | Diğer sayfa sızıntısı |
| :-------------------------------- | ---------------: | --------------: | ------------------: | --------------------: |
| i18n yok (temel uygulama)         |                - |        111.0 KB |                  0% |                    0% |
| Lingui (bu rehberdeki kurulum)    |          56.7 KB |        115.2 KB |                9.3% |                    0% |
| `@intlayer/lingui` (uyumluluk)    |           9.8 KB |        136.7 KB |                9.9% |                    0% |
| `react-intlayer` (yerel Intlayer) |           4.5 KB |        126.8 KB |                  0% |                    0% |

Çıkarılması gereken önemli noktalar:

- **Her yerel için yalnızca tek bir kataloğu talep üzerine yükleyin.** Bu, sayfaları temel uygulama boyutuna yakın tutar.
- **Çalışma zamanı (runtime) ağır kalır** (~57 KB gzip). `@intlayer/lingui` uyumluluk adaptörü (adım 16) makrolarınızı korur ve boyutu ~10 KB seviyesine indirir.

> Tüm verileri inceleyin: [TanStack Start karşılaştırma raporu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) ve [benchmark deposu](https://github.com/intlayer-org/benchmark-i18n).

## TanStack Start Üzerinde Özellik Karşılaştırması

Lingui'nin TanStack Start üzerinde yaygın olarak kullanılan diğer kütüphanelerle karşılaştırması:

| Özellik                                   | `react-intlayer` (Intlayer)          | `use-intl`                | Paraglide JS                               | Lingui                       |
| ----------------------------------------- | ------------------------------------ | ------------------------- | ------------------------------------------ | ---------------------------- |
| **Bileşenlerin yanında çeviriler**        | ✅ Birlikte konumlandırılmış         | ❌ Merkezi JSON           | ❌ Dil başına bir JSON dosyası             | ⚠️ Bileşenlerde kaynak metin |
| **TypeScript entegrasyonu**               | ✅ Otomatik oluşturulan tipler       | ✅ `AppConfig` ile        | ✅ Tipli mesaj fonksiyonları               | ⚠️ Yalnızca makrolar         |
| **Eksik çeviri tespiti**                  | ✅ Tip hataları ve derleme uyarıları | ⚠️ Çalışma zamanı yedeği  | ⚠️ Temel dile geri döner                   | ⚠️ Kaynak metne geri döner   |
| **Zengin içerik (JSX, Markdown)**         | ✅ Doğrudan destek                   | ⚠️ `t.rich` ile etiketler | ⚠️ Düz metin dizeleri                      | ✅ `<Trans>` içinde JSX      |
| **Yerelleştirilmiş yönlendirme**          | ✅ Yerleşik                          | ❌ Manuel `{-$locale}`    | ✅ `urlPatterns` + router rewrite          | ❌ Manuel `{-$locale}`       |
| **Yenilemeden dil değişimi**              | ✅ Evet                              | ✅ Evet                   | ❌ Tam sayfa yenileme                      | ✅ Evet                      |
| **Çoğullaştırma (Pluralization)**         | ✅ Numaralandırma tabanlı            | ✅ ICU                    | ✅ Varyantlar                              | ✅ ICU                       |
| **ICU MessageFormat**                     | ✅ `format: "icu"` ile               | ✅ Yerel                  | ⚠️ inlang eklentisi ile                    | ✅ Yerel                     |
| **İçerik formatları**                     | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`                | ⚠️ inlang JSON                             | ✅ PO, JSON, CSV             |
| **Yapay zeka ile çeviri**                 | ✅ Kendi sağlayıcınız ve anahtarınız | ❌ Yok                    | ❌ Yok                                     | ❌ Yok                       |
| **Görsel editör / CMS**                   | ✅ Yerel editör + isteğe bağlı CMS   | ❌ Harici platformlar     | ⚠️ inlang ekosistem uygulamaları           | ❌ Harici platformlar        |
| **SEO yardımcıları (hreflang, sitemap)**  | ✅ Yerleşik                          | ❌ Manuel                 | ⚠️ Yerelleştirilmiş URL'ler, gerisi manuel | ❌ Manuel                    |
| **Çalışma zamanı boyutu (gzip, test)**    | 4.5 KB                               | 75.9 KB                   | 1.8 KB                                     | 56.7 KB                      |
| **Sızıntı, en iyi kurulum (dil / sayfa)** | 0% / 0%                              | 0% / 0%                   | 49.7% / 0%                                 | 8.6% / 0%                    |
| **CI ortamında eksik çeviriler**          | ✅ `npx intlayer test`               | ⚠️ Yerleşik değil         | ⚠️ Yerleşik değil                          | ✅ `lingui compile --strict` |

> Çalışma zamanı boyutu ve sızıntı verileri [TanStack Start karşılaştırma testinden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) alınmıştır. Sızıntı, her kütüphanenin en iyi yapılandırmasında ölçülmüştür.

> Diğer TanStack Start rehberleri:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md)

## Uygulamanız Gereken En İyi Pratikler

- **`<html>` etiketinde `lang` ve `dir` değerlerini rota yerelinden ayarlayın**, böylece sunucu HTML çıktısında doğru şekilde yer alırlar.
- **Her yerel için bir önek ile tek bir URL kullanın**, böylece her dil sürümü indekslenebilir.
- **Her yerel için bir `I18n` örneği oluşturun**, SSR sırasında asla genel (global) bir örneği değiştirmeyin: eşzamanlı iki istek birbirinin yerelini geçersiz kılabilir.
- **Yalnızca aktif kataloğu yükleyin**, istemci kodunda asla tüm katalogları içe aktarmayın.
- **Tek bir makro stili seçin** (bileşenlerde `useLingui` + `t`, tembel tanımlayıcılar için `msg`) ve buna bağlı kalın. `t`, `i18n._`, `i18n.t` ve `<Trans>` yapılarını rastgele karıştırmak kodun hem insanlar hem de yapay zeka asistanları için okunmasını zorlaştırır.
- **CI ortamında `lingui extract` komutunu çalıştırın**, böylece yeni bir mesaj asla çevrilmeden yayınlanmaz.
- **Meta verilerinizi çevirin** ve her sayfada `canonical`, `hreflang` ve `x-default` tanımlayın.
- **Çok dilli bir sitemap ve robots.txt oluşturun** ve her yereli önceden işleyin (pre-render).
- **Dil değiştirici için gerçek bağlantılar (links) kullanın**, böylece arama motoru tarayıcıları tüm dilleri keşfedebilir.

- [Uluslararasılaşma ve SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md)
- [hreflang rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md)

## TanStack Start Uygulamasında Lingui Kurulumu İçin Adım Adım Rehber

Oluşturacağımız proje yapısı şu şekildedir:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generated by `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Request middleware (locale redirect)
    ├── i18n
    │   ├── config.ts           # Locales, URL helpers
    │   ├── lingui.ts           # Catalog loader, I18n instances
    │   ├── negotiateLocale.ts  # Accept-Language parsing
    │   └── seo.ts              # head() builder
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Locale layout + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Localized 404
```

<Steps>
<Step number={1} title="Bağımlılıkları Yükleyin">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: çalışma zamanı, `I18nProvider` ve makrolar (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: mesajları kataloglarda toplamak için `lingui extract`.
- **@lingui/vite-plugin**: `.po` kataloglarını içe aktarma sırasında derler, bu sayede `lingui compile` gerekmez.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: derleme sırasında makroları dönüştürür.

</Step>
<Step number={2} title="Yerel Yapılandırmanızı Merkezileştirin">

Varsayılan yerel öneksiz kalır (`/about`), diğer yereller önek alır (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui'yi Yapılandırın">

Lingui yapılandırması aynı yerel listesini yeniden kullanır, böylece kataloglar, router ve sitemap asla birbiriyle çelişmez.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

Çıkarma betiklerini ekleyin:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check`, bir bileşen çıkarılmamış ve commiti yapılmamış bir mesaj içerdiğinde CI ortamında hata verir.

</Step>
<Step number={4} title="Vite'ı Yapılandırın">

`@vitejs/plugin-react` v6 ile Babel artık yerleşik olarak gelmez. `@rolldown/plugin-babel`, Lingui makro eklentisini çalıştırır ve `linguiTransformerBabelPreset` yalnızca makro içe aktaran dosyaları işleyerek derlemeleri hızlı tutar.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Katalogları Yerel Başına Yükleyin">

`import()` içindeki şablon dizesi, Vite'ın **her yerel için bir parça (chunk)** üretmesini sağlar ve Lingui eklentisi `.po` dosyasını bu parçaya derler. Fransızca bir ziyaretçi yalnızca Fransızca kataloğu indirir.

Derlenen mesajlar düz verilerdir, bu nedenle bir rota yükleyicisi (route loader) tarafından döndürülebilir, HTML içine serileştirilebilir ve hidrasyon sırasında yeniden kullanılabilir.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

TypeScript'in `.po` içe aktarımını kabul etmesi için modülü bir kez bildirin:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Kök Belgeyi Oluşturun">

Kök rota, sunucu tarafından işlenen `<html>` üzerinde `lang` ve `dir` ayarlarını yapmak için isteğe bağlı yerel parametresini okur.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="Yerel Düzen Rotasını (Locale Layout Route) Oluşturun">

`{-$locale}` klasörü isteğe bağlı bir yol segmenti oluşturur: `/about` ve `/fr/about` yollarının her ikisi de `/{-$locale}/about` ile eşleşir. Düzen, bilinmeyen önekleri reddeder, geçerli yerelin kataloğunu yükler ve tahsis edilmiş bir `I18n` örneği sağlar.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Sayfalarınızda Çevirileri Kullanın">

Kaynak metni bileşende yazın. Makrolar bunu derleme sırasında mesaj kimliklerine (ID) dönüştürür ve `lingui extract` bunları toplar.

- İç içe yerleştirilmiş öğeler dahil JSX içeriği için `<Trans>`;
- Dize değerleri için (nitelikler, proplar) `useLingui().t`;
- ICU çoğul yapıları için `<Plural>`.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> Bir kataloğun dinamik `import()` çağrısı modül sistemi tarafından önbelleğe alınır, bu nedenle birden fazla yükleyicide `loadI18n` çağrılması kataloğu iki kez indirmez.

</Step>
<Step number={9} title="Mesajlarınızı Çıkarın ve Çevirin">

Çıkarma işlemini çalıştırın. Lingui her mesajı ilgili yerel kataloğuna yazar:

```bash
npm run i18n:extract
```

Ardından her girdinin `msgstr` alanını çevirin:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Varsayılan olarak mesaj kimlikleri (ID), kaynak metnin karmalarıdır (hash): İngilizce metni değiştirmek yeni bir mesaj oluşturur. Sık değişen metinler için açık kimlikler (`<Trans id="about.title">About us</Trans>`) kullanın.

</Step>
<Step number={10} title="Yerelleştirilmiş Bir Link Bileşeni Oluşturun" isOptional={true}>

Her rota `{-$locale}` altında yer alır, bu nedenle bağlantıların geçerli yerel parametresini taşıması gerekir.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="İçeriğinizin Dilini Değiştirin" isOptional={true}>

Değiştiriciyi **bağlantılar (links)** olarak oluşturun, böylece tarayıcılar her dil sürümünü bulabilir. `to="."` geçerli sayfayı korur ve yerel parametresini değiştirir. Yerel düzeninin yükleyicisi daha sonra yeni kataloğu getirir.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="Meta Verilerinizi Uluslararasılaştırın" isOptional={true}>

Her sayfa çevrilmiş bir `<title>` ve açıklama, kendine başvuran (self-referencing) bir canonical URL, yerel başına bir `hreflang` ve `x-default`, Open Graph yerelleri ve `inLanguage` içeren JSON-LD sunduğu sürece her dil sürümü bağımsız olarak sıralanabilir. Meta veriler yükleyicide çevrilir (adım 8) ve bu yardımcı işlev geri kalanını oluşturur:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={13} title="Sitemap ve robots.txt Dosyalarınızı Uluslararasılaştırın" isOptional={true}>

Sitemap, her yerelin her URL'sini listeler ve her girdi tüm alternatiflerini `xhtml:link` ile bildirir. `robots.txt` özel rotaları her dilde engeller ve sitemap dosyasını işaret eder. Başlangıç şablonu bir `public/robots.txt` oluşturduysa bunu kaldırın.

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={14} title="Her Yereli Önceden İşleyin (Pre-render)" isOptional={true}>

TanStack Start'ın derleme sırasında tüm dil sürümlerini önceden işlemesi için yerelleştirilmiş her yolu listeleyin:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="İlk Kez Gelen Ziyaretçileri Yönlendirin ve 404 Sayfalarını Yönetin" isOptional={true}>

Bir istek ara yazılımı (request middleware), `/` adresine gelen bir ziyaretçiyi tercih ettiği dile yönlendirir (önce çerez, ardından `Accept-Language`). Derin bağlantılar asla yönlendirilmez, bu sayede tarayıcılar ve paylaşılan URL'ler her zaman istedikleri sayfayı alır.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

404 sayfaları için, genel bir rota (catch-all route) düzenin yerelleştirilmiş `notFoundComponent` bileşenini işler. Bunu `noindex` olarak işaretleyin: React 19, `<meta>` etiketini otomatik olarak `<head>` içine taşır.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Makrolarınızı Koruyun, Intlayer ile Çalışma Zamanını Azaltın" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md) uyumluluk adaptörü kaynak kodunuzu değiştirmeden korur: makrolar tam olarak daha önceki gibi derlenir ve ortaya çıkan `i18n._()`, `useLingui()` ve `<Trans>` çağrıları derlenmiş Intlayer sözlükleri tarafından sunulur. Karşılaştırma testinde çalışma zamanı boyutu gzip ile **~56.7 KB'tan ~9.8 KB'a** düşer.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Eklentiyi makro dönüşümünden sonra ekleyin, böylece `@lingui/core` ve `@lingui/react` modüllerini adaptöre yönlendirir (alias):

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Kataloglar [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) (JSON katalogları) veya [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) (PO katalogları) ile senkronize edilir. Kurulumun tamamını [Lingui uyumluluk rehberinde](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md) ve yan yana karşılaştırmayı [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/lingui_vs_intlayer-lingui.md) yazısında görebilirsiniz.

</Step>
<Step number={17} title="Intlayer Kullanarak Çevirilerinizi Otomatikleştirin" isOptional={true}>

Lingui mesajları çıkarır, ancak düzinelerce kataloğu elle doldurmak en çok zaman alan kısımdır. Intlayer **ücretsiz** ve **açık kaynaklıdır** ve araçları Lingui ile birlikte sorunsuz çalışır:

- Kendi API anahtarınızı ve sağlayıcınızı kullanarak **Yapay Zeka ile çevirin**. [Otomatik doldurma (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md) ve [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) sayfalarına bakın.
- [Sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) ile **PO dosyalarınızı** tek doğruluk kaynağı olarak koruyun.
- CI ortamında **eksik çevirileri test edin**. [Çevirilerinizi test etme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md) sayfasına bakın.
- [Scan komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/scan.md) ile eksik `hreflang`, hatalı canonical bağlantıları ve dil sızıntıları için **yayındaki sitenizi denetleyin**.

</Step>
</Steps>

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Lingui, TanStack Start ile çalışır mı?">

Evet. Lingui'nin özel bir TanStack Start entegrasyonu yoktur, ancak Vite eklentisi ve Babel makro eklentisi olduğu gibi çalışır. Dikkat edilmesi gereken iki nokta, makroları `@rolldown/plugin-babel` ile çalıştırmak (Vite 8 ve `@vitejs/plugin-react` v6 artık Babel içermez) ve SSR sırasında genel bir örneği etkinleştirmek yerine yerel başına bir `I18n` örneği oluşturmaktır.

</Question>
<Question title="@lingui/core içindeki genel i18n nesnesi neden kullanılmamalı?">

Sunucuda tek bir süreç aynı anda birçok isteği işler. Paylaşılan bir nesne üzerinde `i18n.activate("fr")` çağırmak, paralel olarak İngilizce işlenen bir isteğin dilini değiştirecektir. `setupI18n`, yerel başına yalıtılmış bir örnek oluşturur ve bu güvenlidir.

</Question>
<Question title="lingui compile komutunu çalıştırmam gerekir mi?">

Hayır. `@lingui/vite-plugin`, `.po` kataloglarını içe aktarıldıklarında derler. Yalnızca yeni mesajları toplamak için `lingui extract` komutunu çalıştırmanız yeterlidir.

</Question>
<Question title="Lingui ile sayfa başlığını ve meta açıklamasını nasıl çeviririm?">

Bunları `msg` makrosuyla bildirin ve rota yükleyicisinde ``i18n._(msg`...`)`` ile çevirin. Yükleyici düz dizeler döndürür, böylece `head()` senkron kalır ve değerler hidrasyon için serileştirilir. Adım 8 ve adım 12 kurulumun tamamını gösterir.

</Question>
<Question title="TanStack Start paketinde Lingui'nin boyutu ne kadardır?">

[Karşılaştırma testi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md), çalışma zamanı için gzip ile ~56.7 KB ölçmektedir. Talep üzerine yüklenen yerel başına bir katalog ile sayfalar, i18n olmayan 111 KB'a karşılık ~115 KB yer kaplar. Her kataloğu statik olarak içe aktarmak bunu ~152 KB seviyesine çıkarır.

</Question>
<Question title="Lingui makrolarını koruyarak Intlayer'a geçebilir miyim?">

Evet. [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md) adaptörü makroları korur ve çalışma zamanını değiştirir. Ardından bileşenleri tek tek `useIntlayer` yapısına taşıyabilirsiniz. [Uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) sayfasına bakın.

</Question>

</FAQ>

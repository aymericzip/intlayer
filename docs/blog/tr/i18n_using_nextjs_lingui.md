---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Lingui ile Next.js 16 i18n: App Router Kurulum Kılavuzu"
description: "Next.js 16 App Router'da Lingui kurulumu: Server Components, SWC makroları, proxy yönlendirme, generateMetadata, hreflang, sitemap ve robots.txt, benchmark verileriyle."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Uluslararasılaşma
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "İlk sürüm"
author: aymericzip
---

# 2026'da Lingui Kullanarak Next.js Uygulamanızı Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Lingui Nedir?

**Lingui**, **makrolar** ve **mesaj çıkarma (extraction)** etrafında oluşturulmuş bir i18n kütüphanesidir. Kaynak metni doğrudan bileşenlerinizde yazarsınız (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` her mesajı kataloglarda (varsayılan olarak PO dosyaları) toplar ve bir yükleyici (loader) bunları kompakt JavaScript'e derler. Mesajlar ICU MessageFormat kullanır ve Lingui, App Router'da **React Server Components** desteği sunar.

Bu kılavuz, Lingui'yi bir **Next.js 16 App Router** projesinde şu özelliklerle kurar:

- **SWC ile derlenen makrolar**, böylece Turbopack hızını korur.
- Aynı `Trans` ve `useLingui` API'sini paylaşan **Server ve Client Components**.
- `proxy.ts` üzerinden **yerel ayar yönlendirmesi (locale routing)**: varsayılan yerel ayar için `/about`, diğerleri için `/fr/about` ve ilk ziyarette dil algılama.
- `generateStaticParams` ile her yerel ayarın **statik olarak render edilmesi**.
- **Eksiksiz çok dilli SEO**: çevrilmiş `generateMetadata`, canonical, `x-default` ile `hreflang`, Open Graph yerel ayarları, JSON-LD, `sitemap.ts`, `robots.ts` ve yerelleştirilmiş 404 sayfaları.

> Başka bir kütüphane mi arıyorsunuz?

- [next-intl kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_next-intl.md)
- [next-i18next kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_next-i18next.md)
- [Next.js + Intlayer kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)

> TanStack Start mı kullanıyorsunuz?

- [TanStack Start + Lingui kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_lingui.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md)

> Bu kütüphanelerin nereden geldiğini anlamak için JavaScript i18n tarihini okuyun.

- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)

## Benchmark Next.js'te Lingui Hakkında Ne Söylüyor?

[i18n benchmark testi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md), aynı 10 sayfalık, 10 yerel ayarlı Next.js uygulamasını tüm popüler kütüphanelerle çalıştırır ve tarayıcının gerçekte ne indirdiğini ölçer.

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Next.js 16 üzerinde `@lingui/core@6.6.0` için temel rakamlar, 2026-09-26 tarihinde ölçülmüştür (gzip):

| Kurulum                            | Kütüphane boyutu | Sayfa başına JS | Diğer yerel ayar sızıntısı | Diğer sayfa sızıntısı |
| :--------------------------------- | ---------------: | --------------: | -------------------------: | --------------------: |
| i18n yok (temel uygulama)          |                - |        141.0 KB |                         0% |                    0% |
| Lingui, yerel ayar başına bir kat. |          72.1 KB |        145.4 KB |                       2.8% |                 89.9% |
| `@intlayer/lingui` (uyumluluk)     |          10.7 KB |        221.6 KB |                        50% |                   90% |
| `next-intlayer` (yerel Intlayer)   |           4.9 KB |        141.5 KB |                         0% |                    0% |

Çıkarılması gereken önemli sonuçlar:

- **Yerel ayar başına tek bir katalog bile diğer sayfaların mesajlarını istemci sağlayıcısına (client provider) sızdırır.** Mümkün olduğunca çok metni, katalogları değil render edilmiş HTML'i gönderen Server Components içinde tutun.
- **Lingui çalışma zamanı (runtime) ~72 KB gzip ağırlığındadır.** `@intlayer/lingui` uyumluluk bağdaştırıcısı çalışma zamanını ~11 KB seviyesine düşürür, ancak bu benchmark'ta Next.js uyumluluk kurulumu yine de sayfalara tüm katalogları gönderir. Temel uygulama boyutunda kalan kurulum, yerel `next-intlayer` API'sidir.

> Tüm verileri inceleyin: [Next.js benchmark raporu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md) ve [benchmark deposu](https://github.com/intlayer-org/benchmark-i18n).

## Next.js Üzerinde Özellik Karşılaştırması

Lingui'nin, bir Next.js App Router projesinin genellikle ihtiyaç duyduğu özellikler açısından `next-intl` ve Intlayer ile karşılaştırması:

| Özellik                                  | `next-intlayer` (Intlayer)                          | Lingui                                                          | `next-intl`                                   |
| ---------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------- |
| **Bileşenlere yakın çeviriler**          | ✅ İçerik her bileşenle birlikte bulunur            | ⚠️ Kaynak metin bileşenlerde, kataloglar merkezi                | ❌ Merkezi JSON                               |
| **TypeScript entegrasyonu**              | ✅ Otomatik oluşturulan katı tipler                 | ⚠️ Makrolar tiplenmiş, mesaj katalogları tiplenmemiş            | ✅ İyi, `AppConfig` genişletmesi ile          |
| **Eksik çeviri algılama**                | ✅ TypeScript hataları ve derleme uyarıları         | ⚠️ Çalışma zamanında kaynak metne geri dönüş (fallback)         | ⚠️ Çalışma zamanında geri dönüş               |
| **Zengin içerik (JSX, Markdown)**        | ✅ Doğrudan destek                                  | ✅ `<Trans>` içinde JSX, Markdown yok                           | ⚠️ `t.rich` üzerinden etiketler, Markdown yok |
| **Yapay zeka ile çeviri**                | ✅ Kendi sağlayıcınız ve API anahtarınız ile        | ❌ Yok                                                          | ❌ Yok                                        |
| **Görsel editör / CMS**                  | ✅ Yerel görsel editör + isteğe bağlı CMS           | ❌ Harici platformlar üzerinden                                 | ❌ Harici platformlar üzerinden               |
| **Yerelleştirilmiş yönlendirme**         | ✅ Yerleşik                                         | ❌ Kendi `proxy.ts` dosyanızı yazmanız gerekir                  | ✅ Yerleşik `[locale]` segmenti               |
| **Çoğullaştırma (Pluralization)**        | ✅ Numaralandırma tabanlı                           | ✅ ICU, `<Plural>` makrosu                                      | ✅ ICU                                        |
| **İçerik formatları**                    | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`    | ✅ PO, JSON, CSV                                                | ✅ `.json`, `.js`, `.ts`                      |
| **ICU MessageFormat**                    | ✅ `format: "icu"` aracılığıyla                     | ✅ Yerel                                                        | ✅ Yerel                                      |
| **SEO yardımcıları (hreflang, sitemap)** | ✅ Metadata, sitemap ve robots.txt yardımcıları     | ❌ Manuel                                                       | ✅ İyi                                        |
| **Server Components**                    | ✅ Herhangi bir Server Component'te doğrudan erişim | ⚠️ Her layout ve sayfada `setI18n`                              | ⚠️ Bileşen başına `await getTranslations()`   |
| **Bileşen bazında tree-shaking**         | ✅ Derleme zamanında (Babel / SWC)                  | ⚠️ Yerel ayar başına bir katalog, sayfa bazlı çıkarıcı deneysel | ⚠️ Manuel, rota başına `pick()` ile           |
| **Çalışma zamanı boyutu (gzip)**         | 4.9 KB                                              | 72.1 KB                                                         | 14.7 KB                                       |
| **CI ortamında eksik çeviri kontrolü**   | ✅ `npx intlayer test`                              | ✅ `lingui compile --strict`                                    | ⚠️ Yerleşik değil                             |
| **Ekosistem / topluluk**                 | ⚠️ Daha küçük, hızla büyüyor                        | ✅ Olgun                                                        | ✅ Geniş                                      |

> Çalışma zamanı boyutları [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md) testinden alınmıştır. Ayrıntılı bir inceleme için [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/lingui_vs_intlayer.md) yazısını okuyun.

> Diğer Next.js rehberleri:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)

## Uygulamanız Gereken İyi Pratikler

- `[locale]` layout'unda **`<html>` üzerinde `lang` ve `dir` değerlerini ayarlayın**.
- Metinler için **Server Components tercih edin**: sunucuda HTML render ederler ve istemcide kataloğa ihtiyaç duymazlar.
- **Her layout ve sayfada `initLingui(locale)` çağrısı yapın.** Sayfalar arası geçişlerde layout'lar yeniden render edilmez, bu nedenle bir sayfa yerel ayarın layout tarafından ayarlandığına güvenemez.
- **Yerel ayar başına tek bir URL kullanın** ve `generateStaticParams` ile her yerel ayarı önceden render edin.
- `generateMetadata` içinde `canonical`, `hreflang` ve `x-default` ile **meta verilerinizi çevirin**.
- `sitemap.ts` ve `robots.ts` kuralları ile **çok dilli bir sitemap ve robots.txt oluşturun**.
- Dil değiştirici (locale switcher) için **gerçek bağlantılar (links) kullanın**, böylece arama motoru botları her dili keşfedebilir.
- **CI ortamında `lingui extract` çalıştırın**, böylece yeni bir mesaj asla çevrilmeden yayına alınmaz.

- [Uluslararasılaşma ve SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md)
- [hreflang kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md)
- [Next.js çok dilli SEO karşılaştırmasına](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/nextjs-multilingual-seo-comparison.md)

## Next.js Uygulamasında Lingui Kurulumu İçin Adım Adım Kılavuz

Oluşturacağımız proje yapısı şöyledir:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Yerel ayar yönlendirmesi ve algılama
    ├── locales
    │   ├── en
    │   │   └── messages.po         # `lingui extract` tarafından oluşturulur
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Yerel ayarlar, URL yardımcıları
    │   ├── appRouterI18n.ts        # Yalnızca sunucuya özel kataloglar ve örnekler
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # generateMetadata oluşturucusu
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # Bilinmeyen yollar için yerelleştirilmiş 404
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Bağımlılıkları Yükleyin">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: çalışma zamanı, `I18nProvider`, Server Components için `setI18n` ve makrolar (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: Next.js SWC derleme sürecinde makroları derler.
- **@lingui/loader**: içe aktarma sırasında `.po` kataloglarını derler, böylece `lingui compile` çalıştırmaya gerek kalmaz.
- **@lingui/cli**: mesajları kataloglarda toplamak için `lingui extract`.

> `@lingui/swc-plugin`, Next.js'in SWC sürümüne bağlı bir WebAssembly eklentisidir. Next.js güncellemesinden sonra derleme başarısız olursa, eklentiyi README dosyasında uyumlu olarak listelenen sürüme güncelleyin.

</Step>
<Step number={2} title="Yerel Ayar Yapılandırmanızı Merkezileştirin">

Tek bir dosya yerel ayarları ve URL yardımcılarını tanımlar. Yönlendirme, meta veriler, sitemap ve Lingui bu dosyadan okur.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Canonical URL'ler, hreflang ve sitemap için kullanılan genel origin. */
export const siteUrl = "https://example.com";

/** Ziyaretçi tarafından açıkça seçilen yerel ayarı saklayan çerez. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph `language_TERRITORY` kodları bekler. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, varsayılan yerel ayar ön ek almaz. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui ve Next.js'i Yapılandırın">

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

SWC eklentisi makroları derler ve yükleyici, hem Turbopack (Next.js 16'da varsayılan) hem de webpack için `.po` dosyalarını derler:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

Mesaj çıkarma komut dosyalarını ekleyin:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Katalogları Yükleyin ve Sunucu Örneklerini Oluşturun">

Server Components React context yapısına sahip değildir, bu nedenle Lingui geçerli render işlemi için örneği kaydetmek üzere `setI18n` sağlar. Bu modül, her kataloğu **sunucu işlemi başına bir kez** yükler ve yerel ayar başına bir `I18n` örneği oluşturur. Bu modül `server-only` olarak işaretlenmiştir: diğer yerel ayarların katalogları asla istemci paketine ulaşmaz.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Geçerli Server Component render işlemi için örneği kaydeder.
 * Her layout ve sayfada çağırın.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

TypeScript'in `.po` içe aktarımını kabul etmesi için modülü bir kez bildirin:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="İstemci Sağlayıcısını (Client Provider) Oluşturun">

Client Components çevirileri bir React context'inden okur. Sağlayıcı, aktif yerel ayarın kataloğunu sunucu düzeninden (server layout) alır ve kendi örneğini bir kez oluşturur.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Dinamik Yerel Ayar Rotalarını Tanımlayın">

`[locale]` segmenti kök layout'u barındırır. `generateStaticParams` derleme zamanında her yerel ayarı önceden render eder ve `dynamicParams = false` diğer tüm ön ekler için 404 döndürür.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Bilinmeyen ön ekler (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Göreli canonical ve Open Graph URL'lerini çözümler
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> İstemci sağlayıcısı, aktif yerel ayarın tüm kataloğunu alır. Benchmark testinde "diğer sayfa sızıntısı" olarak ölçülen durum budur. Metinleri Server Components içinde tutmak, istemcinin gerçekten ihtiyaç duyduğu şeyleri sınırlandırır. Büyük uygulamalar için Lingui'nin deneysel sayfa bazlı çıkarıcısı (`lingui.config.ts` içindeki `experimental.extractor`) katalogları giriş noktasına göre böler.

</Step>
<Step number={7} title="Server Components İçinde Çevirileri Kullanın">

Server Components, Client Components ile aynı makroları kullanır. `initLingui` sayfa içinde de çalıştırılmalıdır, çünkü sayfalar arasında gezinirken layout yeniden render edilmez.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Client Components İçinde Çevirileri Kullanın">

Client Components aynı içe aktarımları kullanır. Makrolar örneği `LinguiClientProvider` üzerinden okur.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Mesajlarınızı Çıkarın ve Çevirin">

Çıkarma işlemini çalıştırın. Lingui, `src` içinde bulunan her mesajı her bir yerel ayar kataloğuna yazar:

```bash
npm run i18n:extract
```

Ardından her bir girdinin `msgstr` değerini çevirin:

<Tabs group="locale">
 <Tab value='fr' label='Fransızca'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='İspanyolca'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> `<0>` yer tutucuları bir `<Trans>` içindeki JSX öğelerini yerinde tutar, böylece çevirmenler işaretlemeye (markup) dokunmadan bunları taşıyabilir.

</Step>
<Step number={10} title="Yerel Ayar Yönlendirmesi İçin Proxy Kurulumu" isOptional={true}>

Next.js 16, `middleware.ts` dosyasını `proxy.ts` olarak yeniden adlandırdı. Proxy "ihtiyaç duyuldukça" (as-needed) ön ek stratejisini uygular:

- `/fr/about` olduğu gibi sunulur;
- `/en/about`, varsayılan yerel ayarın tek bir URL'e sahip olması için `/about` adresine yönlendirir;
- `/about`, URL değiştirilmeden dahili olarak `/en/about` adresine yeniden yazılır (rewrite);
- `/` üzerindeki ilk ziyaret, tercih edilen dile yönlendirir (önce çerez, ardından `Accept-Language`).

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: varsayılan yerel ayar için tek URL
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // "/" üzerindeki ilk ziyaret: ziyaretçiyi kendi diline yönlendir
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → /en/about tarafından sunulur, URL değişmez
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // API rotalarını, Next.js dahili dosyalarını ve statik dosyaları (sitemap.xml, robots.txt...) atla
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="İçeriğinizin Dilini Değiştirin" isOptional={true}>

`usePathname` tarayıcı tarafından görülen URL'yi döndürür (`/about` veya `/fr/about`). Yerel ayarı ayıklayın, ardından her dilin bağlantısını oluşturun. Değiştirici gerçek bağlantılar render eder, böylece arama motoru botları her dil sürümüne ulaşabilir ve çerez açık tercihi hatırlar.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="Yerelleştirilmiş Link Bileşeni Oluşturun" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Yerel ayar ön eki olmayan yol, örn. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

`LinguiClientProvider` içinde render edildiği için Server Components içinden de sorunsuz çalışır:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Meta Verilerinizi Uluslararasılaştırın" isOptional={true}>

Her sayfa aşağıdakileri sağladığı takdirde her dil sürümü bağımsız olarak sıralama alabilir:

- **çevrilmiş** bir `title` ve `description`;
- kendisine işaret eden bir **canonical** URL;
- **yerel ayar başına bir `hreflang` alternatifi** ve **`x-default`**;
- **Open Graph** `locale`, `alternateLocale` ve `url`;
- `inLanguage` içeren **JSON-LD**.

`generateMetadata` React ağacının dışında çalışır, bu nedenle doğrudan `msg` makrosuyla sunucu örneğini kullanır:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Yerel ayar ön eki olmayan yol, örn. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... 7. adımdaki sayfa bileşeni
```

JSON-LD sayfanın kendisi tarafından render edilir. Sayfa dosyaları yalnızca Next.js alanlarını dışa aktarabilir, bu nedenle bileşeni kendi dosyasında tutun:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// AboutContent içinde
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Site Haritanızı (Sitemap) Uluslararasılaştırın" isOptional={true}>

`sitemap.ts` kuralı, Next.js'in `xhtml:link` alternatifleri olarak render ettiği `alternates.languages` desteğine sahiptir. Her yerel ayarın her URL'sini listeleyin:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="robots.txt Dosyanızı Uluslararasılaştırın" isOptional={true}>

Özel rotalar her dilde mevcuttur, bu nedenle `disallow` her yerelleştirilmiş yolu kapsamalıdır:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Yerelleştirilmiş 404 Sayfalarını Yönetin" isOptional={true}>

`not-found.tsx` dosyası `[locale]` layout'u içinde render edilir, bu nedenle istemci sağlayıcısına erişebilir. Genel yakalama (catch-all) rotası, bir yerel ayar içindeki bilinmeyen yolları buraya yönlendirir. Next.js 404 yanıtlarına otomatik olarak `noindex` ekler.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → yerelleştirilmiş not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Server Actions İçinde Yerel Ayara Erişin" isOptional={true}>

Server Actions rota parametrelerini almaz. En güvenilir yaklaşım, yerel ayarı bilen sayfadan form ile birlikte göndermektir:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Makrolarınızı Koruyun, Intlayer ile Çalışma Zamanını Küçültün" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md) uyumluluk bağdaştırıcısı kaynak kodunuza dokunmaz: makrolar eskisi gibi derlenir ve sonuçta ortaya çıkan `i18n._()`, `useLingui()` ve `<Trans>` çağrıları Intlayer sözlükleri tarafından karşılanır. Next.js benchmark testinde çalışma zamanı **~72.1 KB'tan ~10.7 KB** gzip seviyesine düşer.

Next.js üzerinde bağdaştırıcı, `next.config.ts` dosyasında (webpack ve Turbopack) `@lingui/core` ve `@lingui/react` modüllerini `@intlayer/lingui` ile takma adlandırarak (alias) ve yapılandırmayı `next-intlayer/server` paketinden `withIntlayer` ile sararak bağlanır. Makroların önce derlenmeye devam etmesi için `@lingui/swc-plugin` eklentisini koruyun. Eksiksiz yapılandırma [Lingui uyumluluk kılavuzunda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md) yer almaktadır.

Benchmark tablosunun gösterdiği gibi, bağdaştırıcı çalışma zamanını azaltır ancak Next.js'te her sayfaya gönderilen kataloğu henüz küçültmez. En iyi kullanım şekli bir geçiş köprüsü olmasıdır: çalışır hale geldikten sonra, bileşenleri teker teker yalnızca render ettikleri içeriği gönderen yerel `useIntlayer` API'sine taşıyın. [Next.js + Intlayer kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/lingui_vs_intlayer-lingui.md) karşılaştırmasına ve tüm [uyumluluk bağdaştırıcılarına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) göz atın.

</Step>
<Step number={19} title="Intlayer Kullanarak Çevirilerinizi Otomatikleştirin" isOptional={true}>

Lingui mesajları çıkarır, ancak düzinelerce kataloğu elle doldurmak en çok zaman alan kısımdır. Intlayer **ücretsiz** ve **açık kaynaklıdır**, araçları Lingui ile birlikte sorunsuz çalışır:

- Kendi API anahtarınızı ve sağlayıcınızı kullanarak **yapay zeka ile çeviri yapın**. [Otomatik doldurma (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md) ve [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) belgelerine bakın.
- [PO senkronizasyon eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) ile **PO dosyalarınızı** tek doğruluk kaynağı olarak koruyun.
- CI ortamında **eksik çevirileri test edin**. [Çevirilerinizi test etme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md) sayfasına bakın.
- [Scan komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/scan.md) ile yayındaki sitenizi eksik `hreflang`, hatalı canonical bağlantıları ve yerel ayar sızıntıları açısından **denetleyin**.

</Step>
</Steps>

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Lingui, Next.js App Router ve Server Components desteği sunuyor mu?">

Evet. `@lingui/react` React Server Components desteği sunar. Server Components örneği `@lingui/react/server` paketindeki `setI18n` ile kaydeder, Client Components bunu `I18nProvider` üzerinden okur ve her ikisi de aynı `Trans` ve `useLingui` makrolarını kullanır.

</Question>
<Question title="Neden her sayfa ve layout'ta initLingui çağırmak zorundayım?">

Server Components context yapısına sahip değildir, bu nedenle örnek render başına kaydedilir. Layout'lar gezintiler boyunca korunur ve yeniden render edilmez, bu nedenle bir sayfa yerel ayarı belirleme konusunda kendi layout'una güvenemez. Her layout ve sayfanın en üstünde `initLingui(locale)` çağırmak onları birbirinden bağımsız tutar.

</Question>
<Question title="Next.js ile SWC eklentisini mi yoksa Babel'i mi kullanmalıyım?">

`@lingui/swc-plugin` kullanın. SWC derleme sürecini ve Turbopack'i korur. Bir Babel yapılandırması eklemek, Next.js'te SWC'yi devre dışı bırakır ve derlemeleri yavaşlatır. Tek kısıtlama, eklenti sürümünü Next.js sürümünüzün SWC sürümüyle uyumlu tutmaktır.

</Question>
<Question title="Lingui ile generateMetadata'yı nasıl çeviririm?">

Sunucu örneğini `getI18nInstance(locale)` ile alın ve `msg` makrosuyla tanımlanan tanımlayıcıları çevirin: ``i18n._(msg`About us`)``. `alternates.canonical`, `x-default` ile birlikte `alternates.languages` ve `openGraph.locale` döndürün. 13. adım yeniden kullanılabilir bir yardımcı fonksiyon sağlar.

</Question>
<Question title="Lingui bir Next.js paketinde ne kadar yer kaplar?">

[Benchmark testi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md), çalışma zamanı için ~72 KB gzip ölçmektedir. Yerel ayar başına bir katalog ile sayfalar, i18n olmadan 141 KB iken ~145 KB ağırlığındadır, ancak her sayfa yine de istemci sağlayıcısı aracılığıyla diğer sayfaların mesajlarını alır.

</Question>
<Question title="Lingui, next-intl veya next-i18next: Next.js için hangisini seçmeliyim?">

Lingui, kaynak metinleri doğrudan bileşenler içinde yazmayı, PO dosyaları ve çevirmenlerle çalışmayı tercih eden ekiplere uygundur. next-intl, JSON kataloglarını ve Next.js ile sıkı şekilde entegre edilmiş bir `t("key")` API'sini tercih eden ekipler için uygundur. next-i18next ise geniş i18next eklenti ekosistemini getirir. [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md) ve [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md) yazılarına bakın.

</Question>
<Question title="Bileşenlerimi yeniden yazmadan Lingui'den Intlayer'a geçebilir miyim?">

Evet. [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md) bağdaştırıcısı makroları korur ve çalışma zamanını değiştirir, ardından bileşenleri kademeli olarak `useIntlayer` API'sine taşıyabilirsiniz. [Uyumluluk bağdaştırıcıları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) sayfasına bakın.

</Question>

</FAQ>

---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Next.js 15 uygulamanızı next-i18next kullanarak nasıl çevirirsiniz – i18n rehberi 2026
description: next-i18next/next-i18next ile Next.js 15 App Router uygulamasını uluslararasılaştırmak için pratik, üretime hazır bir rehber ve Intlayer ile geliştirme.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Intlayer kullanarak Next.js 15 uygulamanızı next-i18next ile çevirin | Uluslararasılaştırma (i18n)

### Bu rehber kimler için

- **Junior**: Tam adımları takip edin ve kod bloklarını kopyalayın. Çalışan çok dilli bir uygulama elde edeceksiniz.
- **Orta seviye**: Yaygın hatalardan kaçınmak için kontrol listelerini ve en iyi uygulama uyarılarını kullanın.
- **Kıdemli**: Üst düzey yapı, SEO ve otomasyon bölümlerine göz atın; mantıklı varsayılanlar ve genişletme noktaları bulacaksınız.

### Neler inşa edeceksiniz

- Yerelleştirilmiş rotalara sahip App Router projesi (örneğin, `/`, `/fr/...`)
- Yerel ayarlar, varsayılan yerel ayar, RTL desteği ile i18n yapılandırması
- Sunucu tarafı i18n başlatması ve bir istemci sağlayıcı
- İhtiyaç duyulduğunda yüklenen isim alanlı çeviriler
- `hreflang`, yerelleştirilmiş `sitemap`, `robots` ile SEO
- Yerel ayar yönlendirmesi için middleware
- Çeviri iş akışlarını otomatikleştirmek için Intlayer entegrasyonu (testler, AI ile doldurma, JSON senkronizasyonu)

> Not: next-i18next, i18next üzerine inşa edilmiştir. Bu rehber, App Router'da next-i18next ile uyumlu i18next ilkel fonksiyonlarını kullanırken mimariyi basit ve üretime hazır tutar.
> Daha geniş bir karşılaştırma için bkz. [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Proje yapısı

next-i18next bağımlılıklarını yükleyin:

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="bun"
bun add next-i18next i18next react-i18next i18next-resources-to-backend
```

Başlangıçta net bir yapı ile başlayın. Mesajları locale ve namespace bazında ayrı tutun.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Kontrol listesi (orta/kıdemli):

- Her locale için namespace başına bir JSON dosyası tutun
- Mesajları aşırı merkezi hale getirmeyin; küçük, sayfa/özellik kapsamlı namespace'ler kullanın
- Tüm locale'leri bir kerede import etmekten kaçının; sadece ihtiyacınız olanları yükleyin

---

## 2) Bağımlılıkları yükleyin

```bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Eğer next-i18next API'lerini veya konfigürasyon entegrasyonunu kullanmayı planlıyorsanız, ayrıca:

```bash
pnpm add next-i18next
```

---

## 3) Temel i18n konfigürasyonu

Locale'ları, varsayılan locale'ı, RTL dillerini ve lokalize edilmiş yollar/URL'ler için yardımcı fonksiyonları tanımlayın.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Uzman notu: Eğer `next-i18next.config.js` kullanıyorsanız, sapmayı önlemek için bunu `i18n.config.ts` ile uyumlu tutun.

---

## 4) Sunucu tarafı i18n başlatma

Sadece gerekli locale/namespace JSON dosyasını dinamik olarak içe aktaran bir backend ile sunucuda i18next'i başlatın.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// JSON kaynaklarını src/locales/<locale>/<namespace>.json dizininden yükle
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Orta not: Yükü sınırlamak için namespace listesini sayfa başına kısa tutun. Global “catch-all” paketlerden kaçının.

---

## 5) React bileşenleri için istemci sağlayıcısı

İstemci bileşenlerini, sunucu yapılandırmasını yansıtan ve yalnızca istenen namespace’leri yükleyen bir sağlayıcı ile sarın.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: paket }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Junior ipucu: Tüm mesajları istemciye geçirmenize gerek yok. Sadece sayfanın namespace'leri ile başlayın.

---

## 6) Yerelleştirilmiş düzen ve rotalar

Dili ve yönü ayarlayın ve statik render'ı desteklemek için her locale için rotaları önceden oluşturun.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Sunucu + istemci kullanımı ile örnek sayfa

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Sayfa için statik render zorla
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Çeviriler (her namespace için `src/locales/...` altında bir JSON dosyası):

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

İstemci bileşeni (sadece gerekli namespace'i yükler):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Sayfa/provider'ın yalnızca ihtiyacınız olan namespace'leri içerdiğinden emin olun (örneğin, `about`).
> React < 19 kullanıyorsanız, `Intl.NumberFormat` gibi ağır formatlayıcıları memoize edin.

Bir client sınırı altında gömülü senkron sunucu bileşeni:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Metadata, Hreflang, Sitemap, Robots

İçeriği çevirmek erişimi artırmanın bir yoludur. Çok dilli SEO'yu kapsamlı şekilde yapılandırın.

En iyi uygulamalar:

- Kökte `lang` ve `dir` ayarlarını yapın
- Her yerel dil için `alternates.languages` ekleyin (+ `x-default`)
- Çevrilmiş URL'leri `sitemap.xml` içinde listeleyin ve `hreflang` kullanın
- Yerelleştirilmiş özel alanları (örneğin, `/fr/admin`) `robots.txt` içinde hariç tutun

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Doğru JSON paketini src/locales'den içe aktar
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Hakkında</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Yerel Yönlendirme için Middleware

Yereli algılar ve eksikse yerelleştirilmiş bir rotaya yönlendirir.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // uzantılı dosyaları hariç tut

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Bu yollarla başlayanlar ve uzantılı dosyalar hariç tüm yollarla eşleşir
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Performans ve Geliştirici Deneyimi (DX) en iyi uygulamaları

- **html `lang` ve `dir` ayarla**: `src/app/[locale]/layout.tsx` içinde yapılmıştır.
- **Mesajları namespace'e göre böl**: Paketleri küçük tut (`common.json`, `about.json` vb.).
- **İstemci yükünü minimize et**: Sayfalarda, sağlayıcıya sadece gerekli namespace'leri geçir.
- **Statik sayfaları tercih et**: Her locale için `export const dynamic = 'force-static'` ve `generateStaticParams` kullan.
- **Sunucu bileşenlerini senkronize et**: Render zamanında asenkron çağrılar yerine önceden hesaplanmış string/formatlamaları geçir.
- **Ağır işlemleri memoize et**: Özellikle eski React sürümleri için istemci kodunda.
- **Önbellek ve başlıklar**: Mümkün olduğunda dinamik render yerine statik veya `revalidate` tercih et.

---

## 11) Test ve CI

- `t` kullanan bileşenler için anahtarların varlığını doğrulayan birim testleri ekle.
- Her namespace'in tüm locale'larda aynı anahtarlara sahip olduğunu doğrulayın.
- Eksik anahtarları deploy öncesinde CI sırasında görünür hale getirin.

Intlayer bunun çoğunu otomatikleştirecektir (bir sonraki bölüme bakınız).

---

## 12) Intlayer'ı üstüne ekle (otomasyon)

Intlayer, JSON çevirilerinizi senkronize tutmanıza, eksik anahtarları test etmenize ve istenildiğinde AI ile doldurmanıza yardımcı olur.

Intlayer bağımlılıklarını yükleyin:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Paket scriptlerini ekleyin:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Yaygın akışlar:

- Eksik anahtarlar için CI'de `pnpm i18n:test` çalıştırarak derlemelerin başarısız olmasını sağlamak
- Yeni eklenen anahtarlar için yerel olarak AI çevirileri önermek amacıyla `pnpm i18n:fill` çalıştırmak

> CLI argümanları sağlayabilirsiniz; bkz. [Intlayer CLI dokümanları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md).

---

## 13) Sorun Giderme

- **Anahtarlar bulunamadı**: Sayfa/sağlayıcının doğru namespace'leri listelediğinden ve JSON dosyasının `src/locales/<locale>/<namespace>.json` altında mevcut olduğundan emin olun.
- **Yanlış dil/İngilizce flaşı**: `middleware.ts` içindeki locale tespitini ve sağlayıcı `lng` değerini tekrar kontrol edin.
- **RTL düzen sorunları**: `dir` değerinin `isRtl(locale)` fonksiyonundan türetildiğini ve CSS'inizin `[dir="rtl"]` kurallarına uyduğunu doğrulayın.
- **SEO alternatifi eksik**: `alternates.languages` içinde tüm locale'lerin ve `x-default`'un bulunduğundan emin olun.
- **Paketler çok büyük**: Namespace'leri daha da bölün ve istemci tarafında tüm `locales` ağaçlarını içe aktarmaktan kaçının.

---

## 14) Sonraki Adımlar

- Özellikler geliştikçe daha fazla locale ve namespace ekleyin
- Hata sayfalarını, e-postaları ve API tabanlı içerikleri yerelleştirin
- Çeviri güncellemeleri için otomatik PR açacak şekilde Intlayer iş akışlarını genişletin

Başlangıç için bir şablon tercih ederseniz, şu adresi deneyin: `https://github.com/aymericzip/intlayer-next-i18next-template`.

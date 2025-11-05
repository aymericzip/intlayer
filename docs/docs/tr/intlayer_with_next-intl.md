---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Next.js 15'inizi next-intl kullanarak nasıl çevirirsiniz – i18n rehberi 2025
description: Next.js 15 App Router web sitenizi çok dilli hale nasıl getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve çeviri için dokümantasyonu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Intlayer kullanarak Next.js 15 sitenizi next-intl ile çevirin | Uluslararasılaştırma (i18n)

Bu rehber, Next.js 15 (App Router) uygulamasında next-intl en iyi uygulamalarını adım adım anlatır ve sağlam çeviri yönetimi ve otomasyon için Intlayer'ı nasıl entegre edeceğinizi gösterir.

Karşılaştırmayı [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md) sayfasında inceleyin.

- Yeni başlayanlar için: çalışan çok dilli bir uygulama elde etmek için adım adım bölümleri takip edin.
- Orta seviye geliştiriciler için: payload optimizasyonu ve sunucu/istemci ayrımına dikkat edin.
- Uzmanlar için: statik üretim, middleware, SEO entegrasyonu ve otomasyon kancalarına dikkat edin.

Ele alacaklarımız:

- Kurulum ve dosya yapısı
- Mesajların yüklenme optimizasyonu
- İstemci ve sunucu bileşen kullanımı
- SEO için metadata, sitemap, robots
- Locale yönlendirmesi için middleware
- Üstüne Intlayer eklemek (CLI ve otomasyon)

## next-intl kullanarak uygulamanızı kurun

next-intl bağımlılıklarını yükleyin:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Kurulum ve İçerik Yükleme

Yalnızca rotalarınızın ihtiyaç duyduğu namespace'leri yükleyin ve locale'leri erken doğrulayın. Mümkün olduğunda sunucu bileşenlerini senkron tutun ve istemciye yalnızca gerekli mesajları gönderin.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Yalnızca layout/ sayfalarınızın ihtiyaç duyduğu namespace'leri yükleyin
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Bu sunucu renderı (RSC) için aktif istek yerelini ayarla
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Mesajlar sunucu tarafında yüklenir. İstemciye sadece gerekenleri gönderin.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Sadece sunucu tarafı çeviriler/formatlama
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Bir istemci bileşeninde kullanım

Bir sayaç render eden istemci bileşenine bir örnek alalım.

**Çeviriler (şekil yeniden kullanıldı; bunları istediğiniz gibi next-intl mesajlarına yükleyin)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Sayaç",
    "increment": "Arttır"
  }
}
```

**İstemci bileşeni**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Doğrudan iç içe nesneye kapsam belirleme
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Sayfa istemci mesajına "about" mesajını eklemeyi unutmayın
> (istemcinizin gerçekten ihtiyaç duyduğu ad alanlarını dahil edin).

### Bir sunucu bileşeninde kullanım

Bu UI bileşeni bir sunucu bileşenidir ve bir istemci bileşeni altında render edilebilir (sayfa → istemci → sunucu). Önceden hesaplanmış dizeleri geçirerek senkron tutun.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

Notlar:

- `formattedCount` değerini sunucu tarafında hesaplayın (örneğin, `const initialFormattedCount = format.number(0)`).
- Sunucu bileşenlerine fonksiyonlar veya serileştirilemeyen nesneler geçirmemeye dikkat edin.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Sayfanın geri kalan kodu
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "aylık",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### Yerel yönlendirme için Middleware

Yerel algılama ve yönlendirmeyi yönetmek için bir middleware ekleyin:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // API, Next dahili ve statik varlıkları atla
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### En iyi uygulamalar

- **html `lang` ve `dir` ayarlayın**: `src/app/[locale]/layout.tsx` içinde, `dir` değerini `getLocaleDirection(locale)` ile hesaplayın ve `<html lang={locale} dir={dir}>` olarak ayarlayın.
- **Mesajları namespace bazında ayırın**: JSON dosyalarını locale ve namespace bazında organize edin (örneğin, `common.json`, `about.json`).
- **İstemci yükünü minimize edin**: Sayfalarda, `NextIntlClientProvider`'a yalnızca gerekli namespace'leri gönderin (örneğin, `pick(messages, ['common', 'about'])`).
- **Statik sayfaları tercih edin**: `export const dynamic = 'force-static'` olarak dışa aktarın ve tüm `locales` için statik parametreler oluşturun.
- **Eşzamanlı sunucu bileşenleri**: Önceden hesaplanmış dizeleri (çevirilmiş etiketler, biçimlendirilmiş sayılar) async çağrılar veya serileştirilemeyen fonksiyonlar yerine geçirin.

## next-intl üzerine Intlayer'ı uygulayın

Intlayer bağımlılıklarını yükleyin:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

Intlayer yapılandırma dosyasını oluşturun:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // Namespace başına klasör yapınızı Intlayer ile senkronize tutun
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`package.json` betiklerini ekleyin:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Notlar:

- `intlayer fill`: yapılandırdığınız yerel ayarlara göre eksik çevirileri doldurmak için AI sağlayıcınızı kullanır.
- `intlayer test`: eksik/geçersiz çevirileri kontrol eder (CI'da kullanın).

Argümanları ve sağlayıcıları yapılandırabilirsiniz; bkz. [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md).

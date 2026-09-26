---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "Mevcut Bir Next.js Uygulamasını Sonradan Çok Dilli (i18n) Yapma Rehberi (2026)"
description: "Mevcut bir Next.js uygulamasını kapsamlı bir yeniden yapılandırma olmadan sonradan çok dilli (i18n) yapma rehberi (2026). Intlayer ile otomatik içerik çıkarma, yapay zeka çevirisi ve yönlendirme."
keywords:
  - Next.js i18n
  - Uluslararasılaştırma
  - Mevcut Next.js uygulamasını çevirme
  - Next.js 16
  - Intlayer
  - Çok dilli
  - React i18n
  - Derleyici
  - Yapay Zeka Çevirisi
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# Mevcut Bir Next.js Uygulamasını Sonradan Çok Dilli (i18n) Yapma Rehberi (2026)

Bir Next.js projesine ilk günden i18n eklemek nispeten kolaydır. Ancak tek bir dilde geliştirilmiş olgun bir Next.js uygulamasını **sonradan** çok dilli hale getirmeniz gerektiğinde ne yapmalısınız?

`next-intl` veya `next-i18next` gibi geleneksel kütüphanelerle bu süreç oldukça zahmetlidir:

- Yüzlerce JSX/TSX dosyasında sabit metinleri aramak.
- JSON dosyaları oluşturup rastgele anahtarlar (`pages.dashboard.header.title`) uydurmak.
- Metinleri `t('...')` gibi kancalarla değiştirmek.
- Tüm `app/` dizinini `app/[locale]/...` yapısına taşımak ve mevcut bağlantıları bozmak.

2026 yılında kodunuzu baştan yazmak zorunda değilsiniz. **Intlayer** ile otomatik çıkarma, yapay zeka çevirisi ve esnek yönlendirme sayesinde dakikalar içinde mevcut uygulamanıza çok dillilik kazandırabilirsiniz.

> Next.js 16 App Router için adım adım kapsamlı teknik kılavuz mu arıyorsunuz? Belgelerimize göz atın: [Intlayer ile Next.js 16 Çevirisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md).

## İçindekiler

<TOC/>

## Sonradan Ekleme Zorluğu: Mevcut Uygulamayı Çok Dilli Yapmak Neden Zordur?

Geliştiricilerin karşılaştığı 3 temel engel:

1. **Kod Tabanının Bozulması**: Metinleri JSON dosyalarına manuel taşımak neredeyse her bileşeni değiştirmeyi gerektirir.
2. **Yönlendirme Dayatması**: Geleneksel kütüphaneler sayfaları `[locale]` dinamik segmentine taşımayı zorunlu kılar.
3. **Yorucu Çeviri Süreci**: Onlarca dilde JSON dosyalarını manuel yönetmek ciddi zaman alır.

Intlayer bu sorunları **derleyici destekli çıkarma**, **bildirimsel sözlükler** ve **esnek yönlendirme** ile çözer.

## Otomatik İçerik Çıkarma (Manuel Arama Yok)

### Seçenek A: CLI Çıkarıcı (`npx intlayer extract`)

Intlayer çıkarma komutunu doğrudan çalıştırın:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

React bileşenlerindeki metinleri tespit eder ve yanlarına `.content.ts` bildirim dosyaları oluşturur.

### Seçenek B: Intlayer Derleyicisi (Derleme Sırasında Çıkarma)

Bileşenlerinize varsayılan dilde normal metinler yazmaya devam edin. Derleyici derleme anında metinleri çıkarıp yerelleştirilmiş içerikle bağlar:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

Arka planda Intlayer sözlüğü oluşturur ve bileşeni yerelleştirilmiş içeriğe bağlayarak manuel yeniden düzenleme adımını tamamen ortadan kaldırır.

Bu durumda, aşağıdaki içeriğe sahip bir `src/app/page.content.ts` dosyası oluşturulacaktır:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## Tercih Ettiğiniz LLM ile Yapay Zeka Çevirisi

İçerikler çıkarıldıktan sonra OpenAI, Anthropic, DeepSeek veya Mistral ile saniyeler içinde çevirin:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Üretkenlik ve ekip işbirliği için SaaS kontrol paneli",
  },
};

export default config;
```

`npx intlayer fill` komutunu çalıştırmak, `.content.ts` bildirimlerinizi yapılandırılan tüm diller için çevirilerle otomatik olarak doldurur:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      tr: "Platformumuza Hoş Geldiniz",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      tr: "Modern özelliklerimizi hemen keşfetmeye başlayın.",
    }),
  },
};

export default content;
```

Intlayer, LLM'e üst düzey bir `applicationContext` sağladığından, oluşturulan çeviriler teknik nüansları, marka üslubunu ve dilbilgisi bağlamını geleneksel otomatik araçlara göre çok daha iyi korur.

Canlıya almadan önce hiçbir metnin atlanmadığından emin olmak için:

```bash
npx intlayer test
```

## Mevcut URL'leri Bozmadan Çok Dilli Yönlendirme

Intlayer farklı yönlendirme modlarını destekler:

- **Sorgu Parametresi / Çerez Modu (`search-params`)**: `[locale]` klasörüne geçmeden mevcut `/app/page.tsx` yapısını koruyun.
- **Ön Ek Modu (`prefix` / `prefix-all-locales`)**: SEO uyumlu yollar için kolay entegrasyon.

Next.js entegrasyonunuzu saniyeler içinde yapılandırın:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

Kök düzeninizi (root layout) `IntlayerProvider` ile sarın:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## Çok Dilli SEO

Otomatik yerelleştirilmiş meta veriler ve `hreflang` etiketleri ile arama motorlarında küresel görünürlük kazanın:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## Daha Fazlası: Adım Adım Kurulum Rehberi

Mevcut Next.js uygulamanızı 2026'da dönüştürmenin temellerini öğrendiniz. Middleware, SSG (`generateStaticParams`) ve sunucu bileşenleri hakkında detaylar için tam kılavuza bakın:

👉 **[Next.js 16 Çevirisi Tam Rehberi (Intlayer)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)**

## Sıkça Sorulan Sorular (FAQ)

<FAQ>

<Question title="Dosyaları app/[locale] içine taşımadan uygulamamı çok dilli yapabilir miyim?">

Evet. Intlayer `search-params` modu ve çerez tabanlı dil algılamayı destekler, klasör yapınızı korur.

</Question>
<Question title="Kodumdaki tüm metinleri tek tek manuel değiştirmeli miyim?">

Hayır. `npx intlayer extract` komutu veya Intlayer derleyicisi metinleri otomatik olarak ayıklar.

</Question>
<Question title="Intlayer paket boyutunu next-intl'e kıyasla nasıl küçültür?">

Bileşen bazlı sözlük yapısı ve derleme zamanı makro optimizasyonu sayesinde yalnızca kullanılan veriler paketlenir.

</Question>
<Question title="Mevcut bileşenlerimi yapay zeka ile otomatik çevirebilir miyim?">

Evet. `npx intlayer fill` komutu popüler LLM'ler ile entegre çalışarak bağlama uygun çeviriler üretir.

</Question>
</FAQ>

---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "Mevcut Bir Vite ve React Uygulamasını Sonradan Çok Dilli (i18n) Yapma Rehberi (2026)"
description: "Mevcut bir Vite ve React uygulamasını kapsamlı bir yeniden yapılandırma olmadan sonradan çok dilli (i18n) yapma rehberi (2026). Intlayer ile otomatik içerik çıkarma, yapay zeka çevirisi ve paket optimizasyonu."
keywords:
  - Vite i18n
  - React i18n
  - Uluslararasılaştırma
  - Mevcut Vite uygulamasını çevirme
  - Mevcut React uygulamasını çevirme
  - Intlayer
  - Çok dilli
  - Derleyici
  - Yapay Zeka Çevirisi
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
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

# Mevcut Bir Vite ve React Uygulamasını Sonradan Çok Dilli (i18n) Yapma Rehberi (2026)

Bir Vite ve React projesine ilk günden i18n eklemek nispeten kolaydır. Ancak tek bir dilde geliştirilmiş olgun bir uygulamayı **sonradan** çok dilli hale getirmeniz gerektiğinde ne yapmalısınız?

`react-i18next` veya `react-intl` gibi geleneksel kütüphanelerle bu süreç oldukça zahmetlidir:

- Yüzlerce JSX ve TSX dosyasında sabit metinleri aramak.
- JSON dosyaları oluşturup rastgele anahtarlar (`components.header.title` vb.) uydurmak.
- Metinleri karmaşık `t('...')` gibi kancalarla değiştirmek.
- İstemci tarafı yönlendirmeyi, durum yönetimini ve dil değiştirme mantığını baştan tasarlamak.

2026 yılında kodunuzu baştan yazmak zorunda değilsiniz. **Intlayer** ile otomatik çıkarma, yapay zeka çevirisi ve sorunsuz Vite entegrasyonu sayesinde dakikalar içinde mevcut Vite ve React uygulamanıza çok dillilik kazandırabilirsiniz.

> Vite ve React için adım adım kapsamlı teknik kılavuz mu arıyorsunuz? Belgelerimize göz atın: [Intlayer ile Vite ve React Çevirisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md).

## İçindekiler

<TOC/>

## Sonradan Ekleme Zorluğu: Mevcut Uygulamayı Çok Dilli Yapmak Neden Zordur?

Geliştiricilerin karşılaştığı 3 temel engel:

1. **Kod Tabanının Bozulması**: Dizeleri JSON sözlüklerine elle aktarmak neredeyse her bileşen dosyasının değiştirilmesini gerektirir. Bu durum devasa Git farkları, birleştirme çakışmaları ve görsel bozulma riskleri yaratır.
2. **Anahtar Yönetimi Yükü**: Her metin parçası için `dashboard.hero.ctaButton` gibi anahtarlar uydurmak geliştirmeyi yavaşlatır ve her metin değişikliğinde ek zihinsel yük oluşturur.
3. **Yorucu Çeviri Süreci**: Metinler çıkarıldıktan sonra bunları 5, 10 veya 20 dile çevirmek bitmek bilmeyen kopyala-yapıştır işlemleri veya pahalı dış çeviri servisleri gerektirir.

Intlayer bu sorunları **derleyici destekli çıkarma**, **bileşen düzeyinde bildirimsel sözlükler** ve **doğal Vite entegrasyonu** ile çözer.

## Otomatik İçerik Çıkarma (Elle Metin Aramaya Son)

JSX kodunuzdan her dizeyi elle kopyalamak yerine, Intlayer iki pratik yol sunar:

### Seçenek A: CLI Çıkarma Aracı (`npx intlayer extract`)

Intlayer çıkarma aracını doğrudan kod tabanınızda çalıştırabilirsiniz:

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

Bu komut React bileşenlerinizi analiz eder, kullanıcıya dönük metinleri tespit eder ve bileşenlerin hemen yanında içerik bildirim dosyalarını (`.content.ts`) otomatik olarak oluşturur. Bileşen mantığı bildirimsel, temiz ve tip güvenli kalır.

### Seçenek B: Intlayer Derleyicisi (Derleme Sırasında Çıkarma)

Yapılandırmanızda Intlayer derleyicisini etkinleştirdiğinizde, bileşenlerinizi varsayılan dilde düz metinlerle yazmaya devam edebilirsiniz. Derleme anında derleyici metinleri çıkarır ve yerelleştirilmiş içeriği otomatik olarak enjekte eder:

```tsx fileName="src/App.tsx"
// Normal React kodu yazın. Derleyici metinleri otomatik olarak çıkarır
export default function App() {
  return (
    <section>
      <h1>Platformumuza Hoş Geldiniz</h1>
      <p>Modern özellikleri keşfetmeye hemen başlayın.</p>
    </section>
  );
}
```

Arka planda Intlayer sözlüğü oluşturur ve bileşeni yerelleştirilmiş içeriğiyle bağlar; böylece manuel yeniden yapılandırma adımı tamamen ortadan kalkar.

Bu durumda aşağıdaki yapıya sahip bir `src/App.content.ts` bildirim dosyası üretilir:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    platformumuzaHosGeldiniz: t({
      tr: "Platformumuza Hoş Geldiniz",
    }),
    modernOzellikleriKesfetmeye: t({
      tr: "Modern özellikleri keşfetmeye hemen başlayın.",
    }),
  },
};

export default content;
```

## Favori LLM Modeliniz ile Yapay Zeka Destekli Çeviri

İçerik çıkarıldıktan sonra onlarca dile çevirmek günler sürmemelidir. Intlayer, kendi API anahtarlarınızı kullanarak doğrudan OpenAI, Anthropic, DeepSeek veya Mistral ile iletişim kuran yerleşik bir yapay zeka çeviri CLI aracına sahiptir:

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

Dillerinizi ve yapay zeka sağlayıcınızı `intlayer.config.ts` dosyasında yapılandırın:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.TURKISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Vite ve React ile inşa edilmiş modern SaaS uygulaması ve gösterge paneli",
  },
};

export default config;
```

`npx intlayer fill` komutunu çalıştırmak, tüm yapılandırılmış diller için bildirim dosyalarınızı yüksek kaliteli çevirilerle doldurur:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    platformumuzaHosGeldiniz: t({
      tr: "Platformumuza Hoş Geldiniz",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    modernOzellikleriKesfetmeye: t({
      tr: "Modern özellikleri keşfetmeye hemen başlayın.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

Intlayer modele `applicationContext` sağladığı için üretilen çeviriler teknik bağlamı, marka tonunu ve dilbilgisi ayrıntılarını geleneksel araçlara kıyasla çok daha iyi korur.

Yayına almadan önce çevrilmemiş metin kalıp kalmadığını denetlemek için:

```bash
npx intlayer test
```

## Vite Entegrasyonu ve Provider Kurulumu

Intlayer'ı Vite'a entegre etmek yalnızca eklentiyi `vite.config.ts` dosyasına eklemeyi ve kök bileşeni `IntlayerProvider` ile sarmalamayı gerektirir:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Intlayer v9'dan itibaren derleyici doğrudan `intlayer()` eklentisine dahil edilmiştir ve `intlayer.config.ts` içinde `compiler.enabled` ayarlandığında otomatik olarak devreye girer.

Uygulamanızı kök bileşende `IntlayerProvider` ile sarmalayın:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Dili Dinamik Olarak Değiştirme

Uygulamanızın herhangi bir yerinde `useLocale` kancasını kullanarak diller arasında kolayca geçiş yapabilirsiniz:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Çok Dilli SEO (Sitemap ve Robots.txt)

Intlayer, statik Vite dağıtımları için arama motorlarıyla uyumlu `sitemap.xml` ve `robots.txt` çıktıları üreten `generateSitemap` ve `getMultilingualUrls` gibi yardımcı araçlar barındırır:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("SEO dosyaları başarıyla oluşturuldu.");
```

Bu betiği `vite build` işleminden önce çalıştırmak için `package.json` dosyanıza bir `prebuild` kancası ekleyin:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Derinlemesine İnceleme: Adım Adım Kuruluma Hazır mısınız?

Bu rehber, 2026 yılında mimari zorluklar yaşamadan mevcut bir Vite ve React uygulamasına çok dillilik ekleme yaklaşımına genel bir bakış sundu.

Eksiksiz TypeScript tip güvenliği, dinamik sözlükler ve görsel editör dahil olmak üzere tüm yapılandırma ayrıntılarını adım adım öğrenmek için ayrıntılı kılavuzumuza göz atın:

👉 **[Intlayer ile Vite ve React Çevirisi İçin Tam Kılavuz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)**

## Sıkça Sorulan Sorular (FAQ)

<FAQ>

<Question title="Tüm metinleri elle değiştirmeden Vite ve React uygulamamı çok dilli yapabilir miyim?">

Evet. `npx intlayer extract` komutunu çalıştırarak sabit metinleri otomatik olarak yerelleştirilmiş içerik bildirim dosyalarına çıkarabilir veya standart JSX yazarken bileşenleri derleme anında dönüştüren Intlayer derleyicisini kullanabilirsiniz.

</Question>
<Question title="react-i18next veya react-intl ile karşılaştırıldığında Intlayer Vite paket boyutunu nasıl küçültür?">

Intlayer, bileşen başına sözlük tanımları ve derleme zamanı makro optimizasyonu kullanır. Paketleriniz, devasa JSON dosyalarını yüklemek yerine yalnızca ekranda oluşturulan bileşenlerin gereksinim duyduğu alanları alır. Dinamik sözlükler de dillerin isteğe bağlı yüklenmesini sağlar.

</Question>
<Question title="Mevcut bileşenlerimi birden fazla dile çevirmek için yapay zeka kullanabilir miyim?">

Evet. Intlayer CLI, yapılandırılmış tüm dillerde eksik çevirileri bağlamsal olarak tamamlamak üzere tercih ettiğiniz yapay zeka sağlayıcısına (OpenAI, Anthropic, Mistral, DeepSeek) bağlanan `npx intlayer fill` komutuna sahiptir.

</Question>
<Question title="Bileşenleri yeniden yazmadan react-i18next veya react-intl kütüphanesinden geçiş yapabilir miyim?">

Evet. Intlayer hem `react-i18next` ve `react-intl` için uyumluluk adaptörleri hem de mevcut JSON çeviri dosyalarını senkronize eden eklentiler (`sync-json`) sunar.

</Question>

</FAQ>

---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Mevcut bir Next.js uygulamasını sonradan nasıl çok dilli (i18n) yapabilirsiniz (2026 i18n Kılavuzu)
description: Intlayer Derleyicisi'ni kullanarak mevcut Next.js uygulamanızı nasıl çok dilli yapacağınızı keşfedin. Yapay zeka kullanarak uygulamanızı uluslararasılaştırmak (i18n) ve çevirmek için belgelere göz atın.
keywords:
  - Uluslararasılaştırma
  - Çeviri
  - Belgelendirme
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Derleyici
  - Yapay Zeka
  - AI
slugs:
  - doc
  - yapılandırma
  - nextjs
  - derleyici
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: İlk Sürüm
---

# Mevcut bir Next.js uygulamasını sonradan nasıl çok dilli (i18n) yapabilirsiniz (2026 i18n Kılavuzu)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Next.js için en iyi i18n çözümü mü? Intlayer'ı Keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox Demosu - Uygulamanızı Intlayer ile nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'daki [Uygulama Şablonunu](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) inceleyin.

## İçindekiler

<TOC/>

## Mevcut bir uygulamayı uluslararasılaştırmak neden zordur?

Eğer daha önce sadece tek bir dil için oluşturulmuş bir uygulamaya birden fazla dil eklemeye çalıştıysanız, bunun ne kadar zor olduğunu bilirsiniz. Bu sadece "zor" değil, aynı zamanda sıkıcıdır. Her dosyayı incelemeli, tek tek her metin dizesini (string) bulmalı ve bunları ayrı sözlük dosyalarına taşımalısınız.

Ardından asıl riskli kısım gelir: Tasarımı (layout) veya iş mantığını (logic) bozmadan tüm bu metinleri kod kancalarıyla (hook) değiştirmek. Bu, yeni özelliklerin geliştirilmesini haftalarca durduran ve bitmek bilmeyen bir refaktöring (yeniden yapılandırma) hissi veren bir iştir.

## Intlayer Derleyicisi (Compiler) Nedir?

**Intlayer Derleyicisi**, bu ağır ve manuel işleri atlamanız için yaratıldı. Metin dizelerini manuel olarak çıkarmanıza gerek kalmadan derleyici bunu sizin yerinize yapar. Kodunuzu tarar, metinleri bulur ve arka planda sözlükleri oluşturmak için Yapay Zeka (AI) kullanır.
Daha sonra, derleme (build) aşamasında gerekli i18n hook'larını yerleştirmek için kaynak kodunuzu değiştirir. Temel olarak uygulamanızı tek bir dildeymiş gibi yazmaya devam edersiniz; derleyici çok dilli dönüştürme işlemini otomatik olarak yönetir.

> Derleyici belgeleri: https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md

### Sınırlamalar

Derleyici kod analizini ve dönüşümünü (hook yerleştirme ve sözlük oluşturma) **derleme anında (compile time)** gerçekleştirdiği için uygulamanızın **derleme sürecini yavaşlatabilir**.

Geliştirme sırasındaki bu etkiyi sınırlamak için derleyiciyi [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) modunda çalışacak şekilde ayarlayabilir veya ihtiyaç duymadığınızda devre dışı bırakabilirsiniz.

---

## Next.js uygulamasında Intlayer Kurulumu için Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm ile yükleyin:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Yapılandırma (config), çeviri, [içerik tanımlama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), derleme (transpilation) süreçlerini ve [CLI komutlarını](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) yöneten temel uluslararasılaştırma araçlarını sağlayan ana pakettir.

- **next-intlayer**

  Intlayer'ı Next.js ile entegre eden pakettir. Next.js'in uluslararasılaştırması için bağlam sağlayıcıları (context providers) ve hook'lar sunar. Ayrıca Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için bir Next.js eklentisini barındırır; yanı sıra kullanıcının tercih ettiği dili algılamak, çerezleri (cookies) yönetmek ve URL yönlendirmelerini (redirect) idare etmek için de bir vekil sunucu (proxy) içerir.

### Adım 2: Projenizi Yapılandırın

Uygulamanızın dillerini tanımlamak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Geliştirme (dev) modundaki etkiyi azaltmak için 'build-only' olarak ayarlanabilir
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 'comp-' ön eki olmadan ayarladık
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Bu uygulama basit bir harita uygulamasıdır",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Geliştirme (dev) modundaki etkiyi azaltmak için 'build-only' olarak ayarlanabilir
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 'comp-' ön eki olmadan ayarladık
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Bu uygulama basit bir harita uygulamasıdır",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Geliştirme (dev) modundaki etkiyi azaltmak için 'build-only' olarak ayarlanabilir
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 'comp-' ön eki olmadan ayarladık
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Bu uygulama basit bir harita uygulamasıdır",
  },
};

module.exports = config;
```

> **Not**: `OPEN_AI_API_KEY`'nin çevresel değişkenleriniz (environment variables) içinde yapılandırıldığından emin olun.

> Bu yapılandırma dosyası ile dil bazlı (yerelleştirilmiş) URL'leri yapılandırabilir, yönlendirmeleri (proxy redirects), çerez adlarını ayarlayabilir; içerik dosyalarınızın konumu ile uzantısını seçebilir ve konsoldaki Intlayer günlüklerini (log) devre dışı bırakmayı tercih edebilirsiniz. Kullanılabilir parametrelerin kapsamlı bir listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) göz atın.

### Adım 3: Intlayer'ı Next.js Yapılandırmanıza Entegre Edin

Next.js yapınızı Intlayer kullanacak şekilde ayarlayın:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Diğer yapılandırma (config) seçenekleriniz burada yer alacak */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Diğer yapılandırma (config) seçenekleriniz burada yer alacak */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Diğer yapılandırma (config) seçenekleriniz burada yer alacak */
};

module.exports = withIntlayer(nextConfig);
```

> Next.js `withIntlayer()` eklentisi, Intlayer'ı Next.js ortamı ile bütünleştirir. İçerik beyan dosyalarının (dictionary files) oluşturulmasını sağlar ve geliştirme modunda izlenmelerini (watch mode) üstlenir. Intlayer çevre değişkenlerini [Webpack](https://webpack.js.org/) ya da [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) içinde sisteme tanıtır. Dahası, performansı artırmak üzere takma adlar (alias) barındırır ve Sunucu Bileşenleriyle (Server Components) tam bir uyum yakalar.

### Adım 4: Dinamik Dil Yönlendirmesini Tanımlayın

`RootLayout` bileşeninizin içindekileri tamamen temizleyin ve kodu aşağıdaki örnek ile değiştirin:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Adım 5: İçeriklerinizi Belirleyin (Otomatik Olarak)

Derleyici etkinken artık sözlükleri/içerikleri (örneğin `.content.ts` dosyalarını) **manuel olarak tanımlamanıza gerek kalmaz**.

Bunun yerine, uygulamanıza ait metinleri standart metin karakter dizileri (string) halinde doğrudan koda yazarsınız. Intlayer projenizi inceler, ayarlamış olduğunuz Yapay Zeka (AI) sağlayıcısını kullanarak çevirilerinizi oluşturur; derleme aşamasında ise söz konusu dizeleri doğru dildeki içeriklerle değiştirir.

### Adım 6: Şifrenizin İçerisinde Çeviriden Faydalanın

Bileşenlerinizi (components) varsayılan (ana) dilinizde statik/hardcoded (koda sabitlenmiş) metin dizeleriyle oluşturun, geri kalan işleri derleyici halledecektir.

Örneğin, `page.tsx` sayfanızın şu şekilde göründüğünü düşünün:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const PageContent: FC = () => {
  return (
    <>
      <p>Kodu düzenleyerek başlayın</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>Kodu düzenleyerek başlayın</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { IntlayerServerProvider, getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>Kodu düzenleyerek başlayın</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** - İstemci (client-side) bileşenlerine dil/lokasyon özelliklerini (locale) yaymak için kullanılır.
- **`IntlayerServerProvider`** - Sunucu çocuk düğümlerine (Server child nodes) dil (locale) yapısını yaymak için işlev görür.

### (İsteğe Bağlı) Adım 7: Dile Göre (Locale) Algılama için Proxy'yi Hazırlama

Kullanıcınızın kullanmayı tercih ettiği dili tespit etmek ve ona uygun yönlendirme sağlamak adına Proxy'i entegre edin:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy`, ziyaretçilerinizin potansiyel (tercih edilen) dilini keşfetmek ve ziyaretçiyi [Konfigürasyon (Configuration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) dosyanızdaki ayarlara göre sorunsuz bir şekilde uygun URL'ye (ve dile) yönlendirmek için vazgeçilmez bir araçtır. İlave olarak aynı ayarları gelecekte yeniden hatırlayabilmek için sisteme bağlı (cookie) tercihler işler.

### (İsteğe Bağlı) Adım 8: Sistemde Yeni Bir Dil Önerme / Değiştirme (Language Switcher)

Sayfa içi dil değişimlerinde en efektif yöntem: Ziyaretçiyi projenizdeki/kodunuzdaki dillerle eşleşen doğru URL yapısına bir `Link` öğesi yoluyla aktarmaktır. Next.js altyapısında bu seçenek kullanıldığında, önbellek "prefetch" becerileri güçlenir, üstüne tüm sayfanın gereksiz yere tamamen yeniden sunucudan indirilmesi (hard reload) engellenir.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Dil Kodunun kendisi - örn: TR */}
              {localeItem}
            </span>
            <span>
              {/* O Dile Ait Adın Kendi Diliyle Söylenişi - örn: Türkçe */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli Locale Dili Gözetilerek Söylenişi - örn: Turc (Geçerli diliniz p.e Fransızca (fr-FR) ise) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Diğer Global Bir Temel Dil bazında Söylenişi - örn: Turkish */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Dil Kodunun kendisi - örn: TR */}
              {localeItem}
            </span>
            <span>
              {/* O Dile Ait Adın Kendi Diliyle Söylenişi - örn: Türkçe */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli Locale Dili Gözetilerek Söylenişi - örn: Turc (Geçerli diliniz p.e Fransızca (fr-FR) ise) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Diğer Global Bir Temel Dil bazında Söylenişi - örn: Turkish */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Dil Kodunun kendisi - örn: TR */}
              {localeItem}
            </span>
            <span>
              {/* O Dile Ait Adın Kendi Diliyle Söylenişi - örn: Türkçe */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli Locale Dili Gözetilerek Söylenişi - örn: Turc (Geçerli diliniz p.e Fransızca (fr-FR) ise) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Diğer Global Bir Temel Dil bazında Söylenişi - örn: Turkish */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Seçeneklerden birisi de yönlendirmeye bağımlı olmadan React/Next üzerinde `setLocale` fonksiyonunu tetiklemektir (`useLocale` hook yapısı sağlar). Bunun daha da derin entegrasyonlarını incelemek ve yeteneklerini değerlendirmek adına: [`useLocale` Referansları Sayfası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md)'na bakın.

### (İsteğe Bağlı) Adım 9: Özel Sunucu İstekleri (Server-side) veya Ortamları için Algılama Mekanizması

Yaptığınız mimaride örneğin; kayıt esnasında veya API servisinde arka planda dile özel mail (ör. Node Sunucusundan İngilizce yerine Türkçe bülten vb.) fırlatmanız gerekebilmektedir. İstemciden veriyi manuel gönderip hata riskini arttırmaktansa `@next-intlayer/server` kütüphanesinden entegre edilmiş `getLocale` kullanın.

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // "locale" yapısını elde edip bu değere dayalı olarak işlemi eyleme geçirebilirsiniz. (Eklenti vb.)
};
```

> Çalıştırdığınız komut (`getLocale`) projenizde şu mantıksal yol izleme sırasını/filtrelemesini takip eder:
>
> 1. Next Header Query: Çıkan HTTP isteğinin HTTP Headerlarında bir arama (Parametre ile dil belirtilmiş mi?).
> 2. Çerezler (Cookies): Yönlendirme, Middleware veya daha önceki Intlayer sistemleriyle depolanıp atanmış cookie'lerin eşleşmesinin sınanması.
> 3. İstemci Çevresel Ortamı (Client Browser Config): Browserın ya da donanımın Locale/Kültürel tercih ayarları.
> 4. Varsayılan (Fallback) Locale Seçimi: Tüm seçeneklerden başarısız veya veri gelmeyen bir dönüşte, Intlayer ortam değişkenlerindeki ayarların Default locale karşılığı geçerli atanır!

### (İsteğe Bağlı) Adım 10: Uygulamanızın İletim (Bundle) Yükünü İndirme - (SWC ile Optimize Etmek)

Geçmiş sistem yapısı standart bir işleyişi kabul ettiğinden "next-intlayer" dahil paketler çevrilen veriyi komple bir veri dizisi halinde Component içine entegre eder ve "Client Bundle" gereksiz şişirilmeyle yavaşlatır. (Anlık indirilecek verinin MB artışı). Tüm bu süreci değiştiren yapısı ile Next.js SWC Makrolarının gelişmiş esnekliği kullanılmalıdır. `@intlayer/swc` aracını entegre ettiğinizde bu yazılım sadece kullanılan dizeleri çeker ve ana koda sadece ihtiyaç dahilindeki diziyi (string değerini) taşır ve build yığınını küçültür.

Yükleme İşlemi;

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> DİKKAT: Yeni eklenen eklentiler mimari uyumsuzluk veya yeni kütüphane riskleri taşıyabilmektedir ve Vercel/Next standartlarında (13 sürümü ve üstü Turbopack/SWC projeleri şartları ile) kullanım imkânı yaratmaktadır. Kısmi olarak da olsa (experimental) yapı taşlarına sahiptir.

> Detay Önemi: Sayfanızda "dinamik çağırma" veya "fetch" mantığı içeren asenkron veri talepleri de işlendiğinde (özellikle Client tabanında `useIntlayer` vb hook fonksiyonu kullandığınız koda sahip Root / Layout) bunları dış katmandan mutlaka `<Suspense>` içine yerleştirin. İstemcide veri talebine izin verilmeyip Render askıda kalmasına bağlı olarak Next JS'in hata çıkarıp App bloklamasını önlemiş/bertaraf etmiş olursunuz!

### Turbopack Tabanlı İzleme Ayarları (Watch) (Sadece geliştirme modu "Dev" için)

Mevcut ortam Vercel olduğunda ve Next.js'in meşhur güçlü Bundler eklentisi 'Turbopack' aktif edilerek `next dev` kodlandığında veritabanı eşleştirmesi Webpack tarzında asenkron işlemez! İlgili JSON/Veri aktarımları arayüze anında ("Hot-reload / İzleyici sistemi" ile `.content.ts`) yansıyamadığından derleyiciden "intlayer watch" emrini vermelisiniz.

Kendi sistem ayarlarınızda, `package.json` içinden bu script özelliğini değiştiriniz;

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // İki eklentiyi entegre çalıştırarak Next Watch sistemi eşliğinde Turbo Pack projenizi aktif kılın!
  },
}
```

> İstisnai not: Yeni nesil yapıda değilseniz (Mesela halen `next-intlayer@<=6.x.x` altı alt sürümse) bu flag komutu OS terminaline mutlaka ' `--turbopack` ' eki eklenerek komuta eklenecektir. Eski sorunlardan olan sistemin yeni entegresi >/= 7 versiyonundan sonrası için bunu default hale taşımaktadır.

### Intlayer Kullanıcısına Ekstra Code Type Deneyimleri, Typescript (Intellisense) Kurulumu

Geliştiricinin her gün gördüğü VSCode ya da TypeScript tabanlı Text Editor ile Intellisense desteğinden hatasız kod yapımı için faydalanmak mükemmeldir. "Module Augmentation (Tip Uzatımı)" dediğimiz modül ile oluşturulup izlenen bir dosya sizin için arka planda tüm Type mimarisini kurar. Kodların/Anahtarların varlığını kontrol eder!:

![Arayüzdeki Type Yardımcı Penceresi (Autocomplete)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Kodda Dize Yokluğu Hatasını İleten Linters Testi (Live Validation)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Mevcut TypeScript Configürayon Dosyası olarak adlandırılan dizini (Kök Dizindeki) ayarlamak bu süreci otomasyona çevirir! `.intlayer/**/*.ts` lokasyonunu JSON'da `include` dizgisine koyunuz!

```json5 fileName="tsconfig.json"
{
  // Mevcut Proje Tip Dosyalarınız...
  "include": [
    // Next vesair...
    ".intlayer/**/*.ts", // TypeScript'e yeni çeviri dosyası tanımı sağlandı!
  ],
}
```

### Git - Depoyu (.gitignore) Bildirimi Nasıl Tamamlanmalı?

Tüm arka plan kod çevirileri; TypeScript Definitions, Maplenmiş JSON veya sistem klasör/dosyası Output işlemleri bir araya getirilerek otomasyondaki bir klasöre (`.intlayer`) sıkıştırılır. (Derleme/Transpile aşamaları için.) Projenizin versiyon kontrol depolamasına (Github, Gitlab veya CI/CD Vercel Merge Push adımlarına vb.) bulaşıp konflikt / merge sorunları yaratması istenilmez.

Önlemini almak `gitignore` üzerinde tanımlamalar yapmaktır;

```plaintext fileName=".gitignore"
# Çakışmalar yaşanmaması ve sadece geliştirme veya Cloud'ta Build sırasında üretilebilmesi için ilgili sistem dizinini es geçin!
.intlayer
```

### VS Code Genişletmesiyle Projenizi Hızlandırın! (VS Extension)

Microsoft / Visual Studio geliştiricisi iseniz, kodlamalarınızı otomasyona koymak için yardımcı eklenti yazılımını da unutmamalısınız: Şüphesiz Intlayer'in sağladığı resmî paket olan: **Intlayer VS Code Extension**.

VS Studio Store Market Bölümünden Tıklayıp ve İndirebilirsiniz! ->
[Eklentinin Microsoft Marketplace Sayfasına Ulaşın](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bunlar projeye büyük destek getirir:

- **Anlık Metin Çıktısı (Information / Pop-up previews)**: Uygulamanın içerisinde her nereye yazdığınız string içeriğiniz nereye entegre edilmişse "hover (mause fare imleciyle üzerine getirmenizden ibarettir)" olarak string / dil karşılığını veya dosya içeriğini görürsünüz (Tek tek menülere girip .content string araştırmazsınız!)
- **Görsel Kontrol Listesi Uyarıları (Linter Visualizer / Check-Line Errors)**: Kodunuzun altına kırmızı lint çekilerek ilgili anahtarın kayıp veya hiçbir ana dilde henüz oluşturulmadığını işaret eden yapay zeka/denetim (AI) uyarı entegresi mevcuttur. Datalar daima canlı kontrole tabii tutulmaktadır.
- **Tuş / Makrolar ile Düğme Oluşturma Seçimleri (Short-Keys Command Builder)**: Uygulamada, ana kod içerisinden `Ctrl+Key` kullanarak metinlerden direk ayrık sistem bileşeni yaratılıp .content dosyaları ve iştigal kod blokları ana dosyalardan türetilmektedir! Bunun nasıl olacağını test veya incelemek adına Visual Studio Extension [yardım sayfasını inceleyebilirsiniz](https://intlayer.org/doc/vs-code-extension).

### Sırada Ne Mi Var? (Server API + Frontend CMS Devamı!)

Sisteminiz i18n altyapısıyla çalışırken asıl güç sadece "Yazılımcılar / Client IDE" seviyesinde değil arayüz panel kodsuz (Visual Interface Management) eklentisine erişimde gizlidir. İçerik ve tasarımlarınızı, sadece admin şifreleriniz yetkililikle Web arayüz üzerinden tıkır tıkır yapabilme yeteneği kurabilirsiniz. Detaylar ve kütüphanenin ek paketi için [React ve CMS Uygulaması Çevresel Görsel Web Paneli "Intlayer Visual Editor" Entegresi.](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md).

Döngüsünü Backend Cloud Server CMS ve CDN Depolama altyapısına bağlayarak bağımsız çalıştırmayı seviyorsanız? Proje App içerik yönetim CMS dosya veya servisinizin veri tabanı entegre edilmesi yönergeleri için [Intlayer Node Uygulaması "Headless" Arka-Plan (Backend) Servis CMS Yönetim Sistemini Detaylı Öğrenin Kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)!

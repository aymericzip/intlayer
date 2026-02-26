---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Mevcut bir Next.js uygulamasını çok dilli bir uygulamaya dönüştürün 2026
description: Intlayer Derleyicisi'ni kullanarak mevcut Next.js uygulamanızı nasıl çok dilli yapacağınızı keşfedin. Uygulamanızı uluslararasılaştırmak (i18n) ve AI ile çevirmek için kılavuzu takip edin.
keywords:
  - Uluslararasılaştırma
  - Belgelendirme
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Derleyici
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

# Mevcut bir Next.js uygulamasını çok dilli (i18n) hale getirme (i18n kılavuzu 2026)

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

Eğer daha önce sadece tek bir dil için oluşturulmuş bir uygulamaya birden fazla dil eklemeye çalıştıysanız, bunun ne kadar zor olduğunu bilirsiniz. Bu sadece "zor" değil, aynı zamanda sıkıcıdır. Her dosyayı incelemeli, her metin dizesini bulmalı ve bunları ayrı sözlük dosyalarına taşımalısınız.

Ardından asıl riskli kısım gelir: Tasarımı veya iş mantığını bozmadan tüm bu metinleri kod kancalarıyla değiştirmek. Bu, yeni özelliklerin geliştirilmesini haftalarca durduran ve bitmek bilmeyen bir refaktöring hissi veren bir iştir.

## Intlayer Derleyicisi Nedir?

**Intlayer Derleyicisi**, bu manuel işleri atlamanız için yaratıldı. Metin dizelerini manuel olarak çıkarmak yerine, derleyici bunu sizin yerinize yapar. Kodunuzu tarar, metinleri bulur ve arka planda sözlükleri oluşturmak için AI kullanır.
Daha sonra, derleme adımı sırasında gerekli i18n hook'larını yerleştirmek için kaynak kodunuzu değiştirir. Temel olarak uygulamanızı tek bir dildeymiş gibi yazmaya devam edersiniz ve derleyici çok dilli dönüştürme işlemini otomatik olarak yönetir.

> Derleyici belgeleri: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)

### Sınırlamalar

Derleyici kod analizini ve dönüşümünü (hook yerleştirme ve sözlük oluşturma) **derleme anında** gerçekleştirdiği için uygulamanızın **derleme süresini yavaşlatabilir**.

Aktif geliştirme sırasında (dev modu) bu etkiyi sınırlamak için derleyiciyi [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) moduna ayarlayabilir veya ihtiyaç duymadığınızda devre dışı bırakabilirsiniz.

---

## Next.js uygulamasında Intlayer Kurulumu için Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Yükleyin

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik tanımlama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), derleme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçlarını sağlayan temel pakettir.

- **next-intlayer**

  Intlayer'ı Next.js ile entegre eden pakettir. Next.js uluslararasılaştırması için bağlam sağlayıcıları ve hook'lar sunar. Ayrıca Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js eklentisinin yanı sıra kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmelerini idare etmek için ara yazılım (middleware) içerir.

### Adım 2: Projenizi Yapılandırın

Uygulamanızın dillerini tanımlamak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.TURKISH],
    defaultLocale: Locales.TURKISH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Optimize edilmiş sözlükler için çıktı dizini.
     */
    outputDir: "compiler",

    /**
     * Sözlük anahtar öneki
     */
    dictionaryKeyPrefix: "", // Temel öneki kaldır

    /**
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir.
     * Bu şekilde, derleyici uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Bu basit bir harita uygulaması örneğidir",
  },
};

export default config;
```

> **Not**: `OPEN_AI_API_KEY`'nin çevresel değişkenleriniz içinde yapılandırıldığından emin olun.

> Bu yapılandırma dosyası ile yerelleştirilmiş URL'leri, vekil yönlendirmelerini, çerez eşlemelerini, içerik dosyalarınızın konumu ve uzantısını ayarlayabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) göz atın.

### Adım 3: Intlayer'ı Next.js Yapılandırmanıza Entegre Edin

Next.js kurulumunuzu Intlayer kullanacak şekilde yapılandırın:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Buraya isteğe bağlı ek Next.js yapılandırması */
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js eklentisi, Intlayer'ı Next.js ile entegre etmek için kullanılır. Sözlük dosyalarının oluşturulmasını sağlar ve dev modunda onları izler. Intlayer ortam değişkenlerini [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ortamları içinde tanımlar. Dahası, performansı optimize etmek için takma adlar sağlar ve Sunucu Bileşenleriyle tam uyumlu çalışır.

### Babel'i Yapılandır

Intlayer derleyicisi, içeriğinizi çıkarmak ve optimize etmek için Babel gerektirir. Intlayer eklentilerini içerecek şekilde `babel.config.js` (veya `babel.config.json`) dosyanızı güncelleyin:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Adım 4: Sayfanızda Dil Algılama

`RootLayout` bileşeninizin içeriğini temizleyin ve aşağıdaki örnekle değiştirin:

```tsx fileName="src/app/layout.tsx"
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

### Adım 5: İçeriğinizi Tanımlayın (Otomatik)

Derleyici etkinken artık içerik sözlüklerini (örn. `.content.ts` dosyaları) **manuel olarak tanımlamanıza gerek kalmaz**.

Bunun yerine, içeriğinizi kodunuza doğrudan sabit dizeler (hardcoded strings) olarak yazarsınız. Intlayer kaynak kodu tarar, yapılandırılmış AI sağlayıcısını kullanarak çeviriler oluşturur ve derleme aşamasında bu dizeleri yerelleştirilmiş içerikle sessizce değiştirir. Bunların hepsi tamamen otomatiktir.

Bileşeninize varsayılan dilinizde sabit dizeler yazın ve gerisini Intlayer Derleyicisi'ne bırakın.

`page.tsx` dosyanızın nasıl görüneceğine dair örnek:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Bunu düzenleyerek başlayın!</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      tr: {
        getStartedByEditingThis: "Bunu düzenleyerek başlayın!",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditingThis}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`**, istemci tarafındaki bileşenlere dil sağlamak için kullanılır.
- **`IntlayerServerProvider`** ise sunucu tarafındaki alt bileşenlere dil sağlamak için kullanılır.

### (İsteğe bağlı) Adım 7: Eksik çevirileri doldurma

Intlayer, eksik çevirileri doldurmanıza yardımcı olacak bir CLI aracı sağlar. Kodunuzdaki eksik çevirileri test etmek ve doldurmak için `intlayer` komutunu kullanabilirsiniz.

```bash
npx intlayer test         # Eksik çeviri olup olmadığını test et
```

```bash
npx intlayer fill         # Eksik çevirileri doldur
```

> Daha fazla ayrıntı için [CLI belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/ci.md) bakın.

### (İsteğe Bağlı) Adım 8: Yerelleştirilmiş Yönlendirme Proxy Ara Yazılımı

Kullanıcıları otomatik olarak tercih ettikleri dildeki URL'ye yönlendirmek istiyorsanız, bir proxy ara yazılımı (middleware) kurun:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`, kullanıcının tercih ettiği dili algılamak ve [yapılandırma dosyası ayarlarında](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) belirtildiği gibi uygun URL'ye yönlendirmek için kullanılır. Ek olarak, kullanıcının tercih ettiği dilin bir çerezde saklanmasına olanak tanır.

### (İsteğe Bağlı) Adım 9: İçerik Dilini Değiştirme

Next.js içinde içerik dilini değiştirmenin en önerilen yolu, kullanıcıları uygun dildeki rotaya yönlendirmek için `Link` bileşenini kullanmaktır. Bu, Next.js'in önceden getirme (prefetch) özelliğinden yararlanır ve sayfanın zorla yenilenmesini önler.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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
              {/* Dil kodu - örn: TR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi dilinde ad - örn: Türkçe */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut dile göre ad - örn: Francés (mevcut dil Locales.SPANISH ise) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce ad - örn: Turkish */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Alternatif olarak, `useLocale` hook'u tarafından sağlanan `setLocale` fonksiyonunu kullanabilirsiniz. Bu fonksiyon sayfanın önceden getirilmesine izin vermez. Daha fazla ayrıntı için [`useLocale` hook belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md) göz atın.

### (İsteğe Bağlı) Adım 10: Bundle Boyutunu Optimize Etme

`next-intlayer` kullanıldığında, sözlükler varsayılan olarak her sayfanın paketi (bundle) içinde yer alır. Paket boyutunu optimize etmek için Intlayer, makroları kullanarak `useIntlayer` çağrılarını akıllıca değiştiren isteğe bağlı bir SWC eklentisi sağlar. Bu, sözlüklerin yalnızca onları gerçekten kullanan sayfaların paketlerine dahil edilmesini sağlar.

Bu optimizasyonu etkinleştirmek için `@intlayer/swc` paketini yükleyin. Yüklendikten sonra `next-intlayer` eklentiyi otomatik olarak algılayacak ve kullanacaktır:

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

> Not: Bu optimizasyon yalnızca Next.js 13 ve üzeri sürümlerde mevcuttur.

> Not: Bu paket varsayılan olarak yüklü değildir çünkü SWC eklentileri Next.js'de hala deneysel aşamadadır. Bu durum gelecekte değişebilir.

> Not: Eğer seçeneği (sözlük yapılandırmasında) `importMode: 'dynamic'` veya `importMode: 'fetch'` olarak ayarlarsanız, bu Suspense'e bağlı olacaktır, bu nedenle `useIntlayer` çağrılarınızı bir `Suspense` sınırı ile sarmalamanız gerekecektir. Bu, `useIntlayer`'ı doğrudan Sayfa / Layout bileşeninizin en üst düzeyinde kullanamayacağınız anlamına gelir.

### TypeScript Yapılandırması

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha sağlam hale getirmek için modül genişletmesini (module augmentation) kullanır.

![Otomatik tamamlama](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Çeviri hatası](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, onları Git deponuza yüklemekten kaçınmanıza olanak tanır.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki yönergeleri ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi artırmak için **resmi Intlayer VS Code eklentisini** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler (Quick actions)**.

Eklenti kullanımıyla ilgili detaylı talimatlar için [Intlayer VS Code eklentisi belgelerini](https://intlayer.org/doc/vs-code-extension) okuyun.

### Daha Fazlası

Daha ileri gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.

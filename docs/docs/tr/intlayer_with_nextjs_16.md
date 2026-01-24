---
createdAt: 2024-12-06
updatedAt: 2025-12-30
title: Next.js 16 uygulamanızı nasıl çevirirsiniz – i18n rehberi 2026
description: Next.js 16 web sitenizi çok dilli hale nasıl getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve çeviri için dokümantasyonu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init komutu ekle
  - version: 7.0.6
    date: 2025-11-01
    changes: Alternates nesnesine `x-default` ifadesi eklendi
  - version: 7.0.0
    date: 2025-06-29
    changes: Başlangıç geçmişi
---

# Intlayer kullanarak Next.js 16 web sitenizi çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Next.js için en iyi i18n çözümü mü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'daki [Uygulama Şablonuna](https://github.com/aymericzip/intlayer-next-16-template) bakın.

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir. Intlayer, güçlü **App Router** dahil olmak üzere en son **Next.js 16** framework'ü ile sorunsuz bir şekilde entegre olur. Verimli render için **Sunucu Bileşenleri** (Server Components) ile çalışacak şekilde optimize edilmiştir ve [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) ile tam uyumludur.

Intlayer ile şunları yapabilirsiniz:

- Bileşen düzeyinde bildirimsel sözlükler kullanarak **çevirileri kolayca yönetin**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **Hem istemci tarafı hem de sunucu tarafı bileşenlerinde çevirilere erişin**.
- Otomatik oluşturulan tiplerle **TypeScript desteğini sağlayın**, otomatik tamamlama ve hata tespitini iyileştirin.
- **Dinamik yerel ayar algılama ve değiştirme** gibi gelişmiş özelliklerden yararlanın.

> Intlayer; Next.js 12, 13, 14 ve 16 ile uyumludur. Next.js Page Router kullanıyorsanız, bu [kılavuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_page_router.md) bakabilirsiniz.
> Yerel ayar yönlendirmesi (Locale routing) SEO, paket boyutu ve performans için faydalıdır. İhtiyacınız yoksa, bu [kılavuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_no_locale_path.md) bakabilirsiniz.
> App Router ile Next.js 12, 13, 14 için bu [kılavuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_14.md) bakın.

---

## Next.js Uygulamasında Intlayer Kurulumu Adım Adım Rehber

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

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

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **next-intlayer**

  Intlayer'ı Next.js ile entegre eden paket. Next.js uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sunar. Ayrıca, Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js eklentisinin yanı sıra kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için bir proxy içerir.

### Adım 2: Projenizi Yapılandırın

İşte yapacağımız nihai yapı:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Intlayer sağlayıcısı için yerel ayar düzeni
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Stil ve küresel sağlayıcılar için kök düzen
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Yerel ayar yönlendirmesi (locale routing) istemiyorsanız, intlayer basit bir sağlayıcı / kanca olarak kullanılabilir. Daha fazla ayrıntı için [bu kılavuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_no_locale_path.md) bakın.

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınız
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınız
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınız
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla yerelleştirilmiş URL'ler, proxy yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı, konsoldaki Intlayer günlüklerini devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

### Adım 3: Intlayer'ı Next.js Yapılandırmanıza Entegre Edin

Next.js kurulumunuzu Intlayer kullanacak şekilde yapılandırın:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* buraya yapılandırma seçenekleri */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* buraya yapılandırma seçenekleri */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* buraya yapılandırma seçenekleri */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js eklentisi, Intlayer'ı Next.js ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Intlayer ortam değişkenlerini [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ortamlarında tanımlar. Ek olarak, performansı optimize etmek için takma adlar (aliases) sağlar ve sunucu bileşenleriyle uyumluluğu garanti eder.

> `withIntlayer()` fonksiyonu bir promise fonksiyonudur. Build başlamadan önce Intlayer sözlüklerini hazırlamaya olanak tanır. Başka eklentilerle birlikte kullanmak isterseniz, onu `await` edebilirsiniz. Örnek:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Senkron olarak kullanmak isterseniz `withIntlayerSync()` fonksiyonunu kullanabilirsiniz. Örnek:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer, komut satırı bayrakları `--webpack`, `--turbo` veya `--turbopack` ile mevcut **Next.js sürümünüze** bağlı olarak projenizin **webpack** mi yoksa **Turbopack** mi kullandığını otomatik olarak algılar.
>
> `next>=16` sürümünden itibaren **Rspack** kullanıyorsanız, Turbopack'i devre dışı bırakarak Intlayer'ı açıkça webpack yapılandırmasını kullanmaya zorlamalısınız:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### Adım 4: Dinamik Yerel Ayar Rotalarını Tanımlayın

`RootLayout` içindeki her şeyi kaldırın ve aşağıdaki kodla değiştirin:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Çocukları hala `next-themes`, `react-query`, `framer-motion` vb. gibi diğer sağlayıcılarla sarmalayabilirsiniz.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Çocukları hala `next-themes`, `react-query`, `framer-motion` vb. gibi diğer sağlayıcılarla sarmalayabilirsiniz.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Çocukları hala `next-themes`, `react-query`, `framer-motion` vb. gibi diğer sağlayıcılarla sarmalayabilirsiniz.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> `RootLayout` bileşenini boş bırakmak, `<html>` etiketine [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) ve [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) özniteliklerini ayarlamaya olanak tanır.

Dinamik yönlendirmeyi uygulamak için, `[locale]` dizininizde yeni bir düzen ekleyerek yerel ayar yolunu sağlayın:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> `[locale]` yol segmenti, yerel ayarı tanımlamak için kullanılır. Örnek: `/en-US/about`, `en-US`'ye ve `/fr/about`, `fr`'ye atıfta bulunacaktır.

> Bu aşamada şu hatayla karşılaşacaksınız: `Error: Missing <html> and <body> tags in the root layout.`. Bu beklenen bir durumdur çünkü `/app/page.tsx` dosyası artık kullanılmıyor ve kaldırılabilir. Bunun yerine, `[locale]` yol segmenti `/app/[locale]/page.tsx` sayfasını etkinleştirecektir. Sonuç olarak, sayfalar tarayıcınızda `/en`, `/fr`, `/es` gibi yollar üzerinden erişilebilir olacaktır. Varsayılan yerel ayarı kök sayfa olarak ayarlamak için 7. adımdaki `proxy` kurulumuna bakın.

Ardından, uygulama Düzeninizde (Layout) `generateStaticParams` fonksiyonunu uygulayın.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Eklenecek satır

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Kodun geri kalanı*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Eklenecek satır

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Kodun geri kalanı*/
};

// ... Kodun geri kalanı
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Eklenecek satır

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Kodun geri kalanı*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams`, uygulamanızın tüm yerel ayarlar için gerekli sayfaları önceden oluşturmasını sağlayarak çalışma zamanı hesaplamasını azaltır ve kullanıcı deneyimini iyileştirir. Daha fazla ayrıntı için [generateStaticParams üzerine Next.js dokümantasyonuna](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) bakın.

> Intlayer, sayfaların tüm yerel ayarlar için önceden oluşturulmasını sağlamak amacıyla `export const dynamic = 'force-static';` ile çalışır.

### Adım 5: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Adım 6: İçeriği Kodunuzda Kullanın

Uygulamanız genelinde içerik sözlüklerinize erişin:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`**, yerel ayarı istemci tarafı bileşenlere sağlamak için kullanılır. Düzen dahil herhangi bir üst bileşene yerleştirilebilir. Ancak, Next.js düzen kodunu sayfalar arasında paylaştığı ve bu da onu daha verimli kıldığı için bir düzene yerleştirilmesi önerilir. `IntlayerClientProvider`'ı düzende kullanarak, her sayfa için yeniden başlatılmasını önler, performansı artırır ve uygulamanız genelinde tutarlı bir yerelleştirme bağlamı sağlarsınız.
- **`IntlayerServerProvider`**, yerel ayarı sunucu tarafı çocuklara sağlamak için kullanılır. Düzende (layout) ayarlanamaz.

  > Düzen (layout) ve sayfa ortak bir sunucu bağlamını paylaşamaz çünkü sunucu bağlamı sistemi her istek için veri deposuna ([React'in cache](https://react.dev/reference/react/cache) mekanizması aracılığıyla) dayanır ve her "bağlamın" uygulamanın farklı segmentleri için yeniden oluşturulmasına neden olur. Sağlayıcıyı paylaşılan bir düzene yerleştirmek bu izolasyonu bozacak ve sunucu bağlamı değerlerinin sunucu bileşenlerinize doğru şekilde yayılmasını engelleyecektir.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> İçeriğinizi `alt`, `title`, `href`, `aria-label` vb. gibi bir `string` özniteliğinde kullanmak istiyorsanız, fonksiyonun değerini çağırmalısınız, örneğin:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useIntlayer.md) bakın.

### (İsteğe Bağlı) Adım 7: Yerel Ayar Algılama İçin Proxy Yapılandırın

Kullanıcının tercih ettiği yerel ayarı algılamak için proxy'yi ayarlayın:

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

> `intlayerProxy`, kullanıcının tercih ettiği yerel ayarı algılamak ve onları [yapılandırmada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) belirtilen uygun URL'ye yönlendirmek için kullanılır. Ek olarak, kullanıcının tercih ettiği yerel ayarın bir çerezde saklanmasını sağlar.

> Birden fazla proxy'yi bir zincirleme olarak bağlamanız gerekiyorsa (örneğin, kimlik doğrulama veya özel proxy'lerle birlikte `intlayerProxy`), Intlayer artık `multipleProxies` adında bir yardımcı sunuyor.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (İsteğe Bağlı) Adım 8: Meta Verilerinizin Uluslararasılaştırılması

Sayfanızın başlığı gibi meta verilerinizi uluslararasılaştırmak istediğiniz durumda, Next.js tarafından sağlanan `generateMetadata` fonksiyonunu kullanabilirsiniz. İçinde, meta verilerinizi çevirmek için `getIntlayer` fonksiyonundan içeriği alabilirsiniz.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Her bir yerel ayar için tüm URL'leri içeren bir nesne oluşturur.
   *
   * Örnek:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Döndürür
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Kodun geri kalanı
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Her yerel ayar için tüm URL'leri içeren bir nesne oluşturur.
   *
   * Örnek:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Döndürür
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Kodun geri kalanı
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Her yerel ayar için tüm URL'leri içeren bir nesne oluşturur.
   *
   * Örnek:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Döndürür
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... Kodun geri kalanı
````

> `next-intlayer`'dan içe aktarılan `getIntlayer` fonksiyonunun içeriğinizi bir `IntlayerNode` içine sarılmış olarak döndürdüğünü ve görsel editörle entegrasyona olanak tanıdığını unutmayın. Buna karşılık, `intlayer`'dan içe aktarılan `getIntlayer` fonksiyonu, içeriğinizi ek özellikler olmadan doğrudan döndürür.

Alternatif olarak, meta verilerinizi bildirmek için `getTranslation` fonksiyonunu kullanabilirsiniz. Ancak, meta verilerinizin çevirisini otomatikleştirmek ve bir noktada içeriği dışsallaştırmak için içerik bildirim dosyalarını kullanmanız önerilir.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Kodun geri kalanı
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Kodun geri kalanı
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... Kodun geri kalanı
```

> Meta veri optimizasyonu hakkında daha fazla bilgiyi [resmi Next.js dokümantasyonunda](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) bulabilirsiniz.

### (İsteğe Bağlı) Adım 9: sitemap.xml ve robots.txt Uluslararasılaştırılması

`sitemap.xml` ve `robots.txt` dosyalarınızı uluslararasılaştırmak için Intlayer tarafından sağlanan `getMultilingualUrls` fonksiyonunu kullanabilirsiniz. Bu fonksiyon, sitemap'iniz için çok dilli URL'ler oluşturmanıza olanak tanır.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Sitemap optimizasyonu hakkında daha fazla bilgiyi [resmi Next.js dokümantasyonunda](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) bulabilirsiniz. robots.txt optimizasyonu hakkında daha fazla bilgiyi [resmi Next.js dokümantasyonunda](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) bulabilirsiniz.

### (İsteğe Bağlı) Adım 10: İçeriğinizin Dilini Değiştirme

Next.js'te içeriğinizin dilini değiştirmek için önerilen yöntem, kullanıcıları uygun yerelleştirilmiş sayfaya yönlendirmek için `Link` bileşenini kullanmaktır. `Link` bileşeni sayfanın önceden yüklenmesini (prefetching) sağlar, bu da tam bir sayfa yenilenmesini önlemeye yardımcı olur.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Tarayıcıdaki "geri" düğmesinin önceki sayfaya yönlendirmesini sağlar
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarında dil adı - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut yerel ayarda dil adı - örn. mevcut yerel ayar Locales.SPANISH olduğunda Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dil adı - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Tarayıcıdaki "geri" düğmesinin önceki sayfaya yönlendirmesini sağlar
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarında dil adı - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut yerel ayarda dil adı - örn. mevcut yerel ayar Locales.SPANISH olduğunda Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dil adı - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Tarayıcıdaki "geri" düğmesinin önceki sayfaya yönlendirmesini sağlar
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarında dil adı - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut yerel ayarda dil adı - örn. mevcut yerel ayar Locales.SPANISH olduğunda Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dil adı - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Alternatif bir yol da `useLocale` kancasıyla sağlanan `setLocale` fonksiyonunu kullanmaktır. Bu fonksiyon sayfanın önceden yüklenmesine (prefetching) izin vermez. Daha fazla ayrıntı için [`useLocale` kancası dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md) bakın.

> Ayrıca, yerel ayar değiştiğinde özel bir fonksiyonu tetiklemek için `onLocaleChange` seçeneğinde bir fonksiyon ayarlayabilirsiniz.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Kodun geri kalanı

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Fransızca'ya geç</button>
);
```

> Dokümantasyon referansları:
>
> - [`useLocale` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özniteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özniteliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (İsteğe Bağlı) Adım 11: Yerelleştirilmiş Bir Link Bileşeni Oluşturma

Uygulamanızın navigasyonunun mevcut yerel ayara saygı göstermesini sağlamak için özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'lerin önüne otomatik olarak geçerli dil kodunu ekler. Örneğin, Fransızca konuşan bir kullanıcı "Hakkında" sayfasının bağlantısına tıkladığında, `/about` yerine `/fr/about` sayfasına yönlendirilir.

Bu davranış birkaç nedenden dolayı yararlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dile özgü sayfaları doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sunar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, gezinmenin mevcut yerel ayar içinde kalmasını garanti eder, beklenmedik dil değişikliklerini önlersiniz.
- **Bakım Kolaylığı**: Yerelleştirme mantığını tek bir bileşende merkezileştirmek, URL yönetimini basitleştirir ve uygulamanız büyüdükçe kod tabanınızın bakımını ve genişletilmesini kolaylaştırır.

Aşağıda TypeScript ile yerelleştirilmiş bir `Link` bileşeninin uygulaması yer almaktadır:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Verilen URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa harici kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href özniteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'nin önüne yerel ayarı eklemek için `getLocalizedUrl` kullanılır (örn. /fr/about).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahiliyse ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * Verilen URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa harici kabul edilir.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href özniteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'nin önüne yerel ayarı eklemek için `getLocalizedUrl` kullanılır (örn. /fr/about).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahiliyse ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * Verilen URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa harici kabul edilir.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href özniteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'nin önüne yerel ayarı eklemek için `getLocalizedUrl` kullanılır (örn. /fr/about).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahiliyse ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Nasıl Çalışır?

- **Harici Bağlantıları Algılama**:  
  Yardımcı fonksiyon `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar yerelleştirilmeye ihtiyaç duymadığı için değişmeden bırakılır.

- **Mevcut Yerel Ayarı Alma**:  
  `useLocale` kancası mevcut yerel ayarı sağlar (örneğin, Fransızca için `fr`).

- **URL'yi Yerelleştirme**:  
  Dahili bağlantılar için (yani harici olmayan), `getLocalizedUrl` kullanılarak URL'nin önüne otomatik olarak geçerli yerel ayar eklenir. Bu, kullanıcınız Fransızca ise `/about` olarak iletilen `href` özniteliğinin `/fr/about` olarak dönüştürüleceği anlamına gelir.

- **Bağlantıyı Döndürme**:  
  Bileşen, yerelleştirilmiş URL'ye sahip bir `<a>` elemanı döndürerek navigasyonun yerel ayarla tutarlı olmasını sağlar.

Bu `Link` bileşenini uygulamanız genelinde entegre ederek, tutarlı ve dile duyarlı bir kullanıcı deneyimi sağlarken, aynı zamanda iyileştirilmiş SEO ve kullanılabilirlikten faydalanırsınız.

### (İsteğe Bağlı) Adım 12: Server Action'larda Mevcut Yerel Ayarı Alma

Bir Sunucu Eylemi (Server Action) içinde aktif yerel ayara ihtiyacınız varsa (örneğin, e-postaları yerelleştirmek veya yerel ayara duyarlı mantık yürütmek için), `next-intlayer/server` üzerinden `getLocale` fonksiyonunu çağırın:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Yerel ayarla bir şeyler yapın
};
```

> `getLocale` fonksiyonu, kullanıcının yerel ayarını belirlemek için kademeli bir strateji izler:
>
> 1. Önce, proxy tarafından ayarlanmış olabilecek bir yerel ayar değeri için istek başlıklarını (headers) kontrol eder.
> 2. Başlıklarda yerel ayar bulunamazsa, çerezlerde (cookies) saklanan bir yerel ayara bakar.
> 3. Çerez bulunamazsa, tarayıcı ayarlarından kullanıcının tercih ettiği dili algılamaya çalışır.
> 4. Son çare olarak, uygulamanın yapılandırılmış varsayılan yerel ayarına geri döner.
>
> Bu, mevcut bağlama göre en uygun yerel ayarın seçilmesini sağlar.

### (İsteğe Bağlı) Adım 13: Paket Boyutunuzu Optimize Edin

`next-intlayer` kullanırken, sözlükler varsayılan olarak her sayfa için pakete dahil edilir. Paket boyutunu optimize etmek için Intlayer, makroları kullanarak `useIntlayer` çağrılarını akıllıca değiştiren isteğe bağlı bir SWC eklentisi sunar. Bu, sözlüklerin yalnızca onları gerçekten kullanan sayfaların paketlerine dahil edilmesini sağlar.

Bu optimizasyonu etkinleştirmek için `@intlayer/swc` paketini yükleyin. Yüklendikten sonra `next-intlayer` eklentiyi otomatik olarak algılayacak ve kullanacaktır:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> Not: Bu optimizasyon yalnızca Next.js 13 ve üzeri sürümlerde mevcuttur.

> Not: Bu paket varsayılan olarak yüklü değildir çünkü SWC eklentileri Next.js'te hala deneysel aşamadadır. Gelecekte değişebilir.

> Not: `dictionary` yapılandırmasında seçeneği `importMode: 'dynamic'` veya `importMode: 'live'` olarak ayarlarsanız, Suspense'e dayalı olacaktır, bu nedenle `useIntlayer` çağrılarınızı bir `Suspense` sınırı (boundary) içine sarmalamanız gerekecektir. Bu, `useIntlayer`'ı doğrudan Sayfa / Düzen bileşeninizin en üst düzeyinde kullanamayacağınız anlamına gelir.

### Turbopack'te Sözlük Değişikliklerini İzleyin

Next.js 16 uygulamanızı geliştirme sunucusu olarak Turbopack (`next dev` komutuyla) kullanırken, sözlük değişiklikleri varsayılan olarak otomatik olarak algılanmayacaktır.

Bu sınırlama, Turbopack'in içerik dosyalarınızdaki değişiklikleri izlemek için webpack eklentilerini paralel olarak çalıştıramamasından kaynaklanmaktadır. Bunu aşmak için hem geliştirme sunucusunu hem de Intlayer build izleyicisini eşzamanlı olarak çalıştırmak üzere `intlayer watch` komutunu kullanmanız gerekecektir.

```json5 fileName="package.json"
{
  // ... Mevcut package.json yapılandırmalarınız
  "scripts": {
    // ... Mevcut scripts yapılandırmalarınız
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> next-intlayer@<=6.x.x kullanıyorsanız, Next.js 16 uygulamasının Turbopack ile doğru çalışması için `--turbopack` bayrağını korumanız gerekir. Bu sınırlamadan kaçınmak için next-intlayer@>=7.x.x kullanmanızı öneririz.

### TypeScript Yapılandırması

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan tipleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan tipleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata tespiti**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağına ilişkin daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

### Daha İleriye Gidin

Daha ileri gitmek için [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.

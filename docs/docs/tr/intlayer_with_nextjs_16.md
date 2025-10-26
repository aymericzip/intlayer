---
createdAt: 2024-12-06
updatedAt: 2025-10-09
title: Next.js 16 uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
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
  - version: 7.0.0
    date: 2025-06-29
    changes: Başlangıç geçmişi
---

# Intlayer kullanarak Next.js 16 web sitenizi çevirin | Uluslararasılaştırma (i18n)

<iframe title="Next.js için en iyi i18n çözümü mü? Intlayer'ı keşfedin" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

GitHub'da [Uygulama Şablonunu](https://github.com/aymericzip/intlayer-next-16-template) inceleyin.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir. Intlayer, güçlü **App Router** dahil olmak üzere en son **Next.js 16** çerçevesiyle sorunsuz bir şekilde entegre olur. Verimli render için **Server Components** ile çalışacak şekilde optimize edilmiştir ve [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) ile tam uyumludur.

Intlayer ile şunları yapabilirsiniz:

- Bileşen seviyesinde bildirimsel sözlükler kullanarak **çevirileri kolayca yönetmek**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirmek**.
- **Hem istemci tarafı hem de sunucu tarafı bileşenlerinde çevirilere erişmek**.
- Otomatik oluşturulan tiplerle **TypeScript desteğini sağlamak**, otomatik tamamlama ve hata tespitini iyileştirmek.
- **Dinamik yerel ayar algılama ve değiştirme gibi gelişmiş özelliklerden yararlanın**.

> Intlayer, Next.js 12, 13, 14 ve 16 ile uyumludur. Next.js Page Router kullanıyorsanız, bu [kılavuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_page_router.md) bakabilirsiniz. Next.js 12, 13, 14 App Router ile kullanıyorsanız, bu [kılavuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_14.md) başvurun.

---

## Next.js Uygulamasında Intlayer Kurulumu Adım Adım Rehber

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm ile yükleyin:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **next-intlayer**

Intlayer'ı Next.js ile entegre eden paket. Next.js uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sunar. Ayrıca, Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js eklentisini, kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için proxy'yi içerir.

### Adım 2: Projenizi Yapılandırın

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer dilleriniz
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
      // Diğer dilleriniz
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
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, proxy yönlendirmesi, çerez isimleri, içerik bildirimlerinizin konumu ve uzantısı, Intlayer günlüklerini konsolda devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

### Adım 3: Intlayer'ı Next.js Yapılandırmanıza Entegre Edin

Next.js kurulumunuzu Intlayer kullanacak şekilde yapılandırın:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* yapılandırma seçenekleri buraya */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* yapılandırma seçenekleri buraya */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* yapılandırma seçenekleri buraya */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js eklentisi, Intlayer'ı Next.js ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Intlayer ortam değişkenlerini [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ortamlarında tanımlar. Ayrıca, performansı optimize etmek için takma adlar sağlar ve sunucu bileşenleri ile uyumluluğu garanti eder.

> `withIntlayer()` fonksiyonu bir promise fonksiyonudur. Yapı başlamadan önce intlayer sözlüklerini hazırlamaya olanak tanır. Başka eklentilerle birlikte kullanmak isterseniz, onu await edebilirsiniz. Örnek:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
> ```

> export default nextConfigWithOtherPlugins;
>
> ````
>
> Eşzamanlı kullanmak isterseniz, `withIntlayerSync()` fonksiyonunu kullanabilirsiniz. Örnek:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ````

### Adım 4: Dinamik Yerel Rotaları Tanımlayın

`RootLayout` içindeki her şeyi kaldırın ve aşağıdaki kodla değiştirin:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Çocukları hala diğer sağlayıcılarla sarabilirsiniz, örneğin `next-themes`, `react-query`, `framer-motion` vb.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Çocukları hala `next-themes`, `react-query`, `framer-motion` gibi diğer sağlayıcılarla sarmalayabilirsiniz.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Çocukları hala `next-themes`, `react-query`, `framer-motion` gibi diğer sağlayıcılarla sarmalayabilirsiniz.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> `RootLayout` bileşenini boş tutmak, `<html>` etiketi için [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) ve [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) özniteliklerini ayarlamaya olanak tanır.

Dinamik yönlendirmeyi uygulamak için, `[locale]` dizininize yeni bir layout ekleyerek yerel yolunu sağlayın:

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

> `[locale]` yol segmenti, yerel ayarı tanımlamak için kullanılır. Örnek: `/en-US/about` `en-US`'ye, `/fr/about` ise `fr`'ye karşılık gelir.

> Bu aşamada, şu hatayla karşılaşacaksınız: `Error: Missing <html> and <body> tags in the root layout.`. Bu beklenen bir durumdur çünkü `/app/page.tsx` dosyası artık kullanılmamaktadır ve kaldırılabilir. Bunun yerine, `[locale]` yol segmenti `/app/[locale]/page.tsx` sayfasını etkinleştirecektir. Sonuç olarak, tarayıcınızda sayfalara `/en`, `/fr`, `/es` gibi yollar üzerinden erişilebilecektir. Varsayılan dili kök sayfa olarak ayarlamak için, 7. adımdaki `proxy` ayarına bakınız.

Sonrasında, uygulamanızın Layout bileşeninde `generateStaticParams` fonksiyonunu uygulayın.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Eklenecek satır

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Kodun geri kalanı */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Eklenecek satır

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Kodun geri kalanı */
};

// ... Kodun geri kalanı
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Eklenecek satır

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Kodun geri kalanı */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams`, uygulamanızın tüm yereller için gerekli sayfaları önceden oluşturmasını sağlar, böylece çalışma zamanı hesaplamalarını azaltır ve kullanıcı deneyimini iyileştirir. Daha fazla detay için [Next.js generateStaticParams dokümantasyonuna](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) bakabilirsiniz.

> Intlayer, sayfaların tüm yereller için önceden oluşturulmasını sağlamak amacıyla `export const dynamic = 'force-static';` ile çalışır.

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

> İçerik bildirimleriniz, uygulamanızda herhangi bir yerde tanımlanabilir; yeter ki `contentDir` dizinine (varsayılan olarak `./src`) dahil edilmiş olsun. Ve içerik bildirim dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`) eşleşmelidir.

> Daha fazla detay için, [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakınız.

### Adım 6: İçeriği Kodunuzda Kullanın

Uygulamanız boyunca içerik sözlüklerinize erişin:

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

- **`IntlayerClientProvider`**, istemci tarafı bileşenlere yerel ayarı sağlamak için kullanılır. Herhangi bir üst bileşende, layout dahil olmak üzere yerleştirilebilir. Ancak, Next.js'in layout kodunu sayfalar arasında paylaştığı ve bu nedenle daha verimli olduğu için, bunu bir layout içinde yerleştirmek önerilir. `IntlayerClientProvider`'ı layout içinde kullanarak, her sayfa için yeniden başlatılmasını önler, performansı artırır ve uygulamanız boyunca tutarlı bir yerelleştirme bağlamı sağlar.
- **`IntlayerServerProvider`**, sunucu tarafındaki alt bileşenlere yerel ayarı sağlamak için kullanılır. Layout içinde ayarlanamaz.

> Layout ve sayfa ortak bir sunucu bağlamını paylaşamaz çünkü sunucu bağlam sistemi, her istek için veri deposuna (React'in [cache](https://react.dev/reference/react/cache) mekanizması aracılığıyla) dayanır ve bu, uygulamanın farklı segmentleri için her "bağlamın" yeniden oluşturulmasına neden olur. Sağlayıcıyı paylaşılan bir layout içinde yerleştirmek bu izolasyonu bozacak ve sunucu bağlam değerlerinin sunucu bileşenlerinize doğru şekilde iletilmesini engelleyecektir.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik bildirimi oluştur
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
  const content = useIntlayer("client-component-example"); // İlgili içerik bildirimi oluştur

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
  const content = useIntlayer("client-component-example"); // İlgili içerik bildirimi oluştur

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
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimi oluştur

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
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimi oluştur

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
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimi oluştur

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> İçeriğinizi `alt`, `title`, `href`, `aria-label` gibi bir `string` özniteliğinde kullanmak istiyorsanız, fonksiyonun değerini şu şekilde çağırmalısınız:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` kancasını daha fazla öğrenmek için, [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useIntlayer.md) bakınız.

### (İsteğe Bağlı) Adım 7: Yerel Algılama için Proxy Yapılandırması

Kullanıcının tercih ettiği yereli algılamak için proxy kurun:

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

> `intlayerProxy`, kullanıcının tercih ettiği yereli algılamak ve onları [yapılandırmada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) belirtilen uygun URL'ye yönlendirmek için kullanılır. Ayrıca, kullanıcının tercih ettiği yerelin bir çerezde saklanmasını sağlar.

> Birden fazla proxy'yi zincirlemek (örneğin, `intlayerProxy` ile kimlik doğrulama veya özel proxy'ler) gerekiyorsa, Intlayer artık `multipleProxies` adlı bir yardımcı sağlar.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (İsteğe Bağlı) Adım 8: Meta verilerinizin uluslararasılaştırılması

Sayfanızın başlığı gibi meta verilerinizi uluslararasılaştırmak isterseniz, Next.js tarafından sağlanan `generateMetadata` fonksiyonunu kullanabilirsiniz. İçerisinde, meta verilerinizi çevirmek için `getIntlayer` fonksiyonundan içeriği alabilirsiniz.

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
      en: "create next app tarafından oluşturuldu",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
      fr: "create next app tarafından oluşturuldu",
      es: "create next app tarafından oluşturuldu",
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
      en: "create next app tarafından oluşturuldu",
      fr: "create next app tarafından oluşturuldu",
      es: "create next app tarafından oluşturuldu",
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
        "es": "Logo Preact",
        "tr": "Preact logosu"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "tr": "create next app tarafından oluşturuldu"
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
   * Her yerel dil için tüm URL'leri içeren bir nesne oluşturur.
   *
   * Örnek:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Döner
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale as keyof typeof multilingualUrls],
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
   * Her yerel için tüm URL'leri içeren bir nesne oluşturur.
   *
   * Örnek:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Döner
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
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
   * Her yerel dil için tüm URL'leri içeren bir nesne oluşturur.
   *
   * Örnek:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Döner
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

module.exports = { generateMetadata };

// ... Kodun geri kalanı
````

> `next-intlayer`'dan içe aktarılan `getIntlayer` fonksiyonunun, içeriğinizi bir `IntlayerNode` içinde döndürdüğünü ve bu sayede görsel editörle entegrasyon sağladığını unutmayın. Buna karşılık, `intlayer`'dan içe aktarılan `getIntlayer` fonksiyonu, içeriğinizi ek özellikler olmadan doğrudan döndürür.

Alternatif olarak, meta verilerinizi bildirmek için `getTranslation` fonksiyonunu kullanabilirsiniz. Ancak, meta verilerinizin çevirisini otomatikleştirmek ve içeriği bir noktada dışa aktarmak için içerik bildirim dosyalarını kullanmanız önerilir.

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
      en: "Açıklamam",
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
      en: "Başlığım",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "Açıklamam",
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
      en: "Açıklamam",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... Kodun geri kalanı
```

> Metadata optimizasyonu hakkında daha fazla bilgi edinin [resmi Next.js dokümantasyonunda](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (İsteğe Bağlı) Adım 9: sitemap.xml ve robots.txt dosyalarınızın uluslararasılaştırılması

`sitemap.xml` ve `robots.txt` dosyalarınızı uluslararasılaştırmak için Intlayer tarafından sağlanan `getMultilingualUrls` fonksiyonunu kullanabilirsiniz. Bu fonksiyon, sitemap'iniz için çok dilli URL'ler oluşturmanıza olanak tanır.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

// Çok dilli URL'leri almak için sitemap fonksiyonu
const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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

// Tüm çok dilli URL'leri almak için fonksiyon
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // Tüm kullanıcı ajanlarına izin ver
    allow: ["/"], // Ana sayfaya izin ver
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Giriş ve kayıt sayfalarını engelle
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`, // Site haritası URL'si
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

// Tüm çok dilli URL'leri almak için fonksiyon
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*", // Tüm kullanıcı ajanlarına izin ver
    allow: ["/"], // Ana sayfaya izin ver
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Giriş ve kayıt sayfalarını engelle
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

> Site haritası optimizasyonu hakkında daha fazla bilgi için [resmi Next.js dokümantasyonuna](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) bakabilirsiniz. robots.txt optimizasyonu hakkında daha fazla bilgi için [resmi Next.js dokümantasyonuna](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) göz atabilirsiniz.

### (İsteğe Bağlı) Adım 10: İçeriğinizin Dilini Değiştirme

Next.js'te içeriğinizin dilini değiştirmek için önerilen yöntem, kullanıcıları uygun yerelleştirilmiş sayfaya yönlendirmek amacıyla `Link` bileşenini kullanmaktır. `Link` bileşeni, sayfanın önceden yüklenmesini (prefetch) sağlar, bu da tam sayfa yeniden yüklemesini önlemeye yardımcı olur.

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
            replace // "Geri git" tarayıcı düğmesinin önceki sayfaya yönlendirmesini sağlar
          >
            <span>
              {/* Yerel Ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi Yerel Ayarında - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Dil mevcut Yerel Ayarda - örn. Locales.SPANISH olarak ayarlanmış mevcut yerel ayarla Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dilinde - örn. French */}
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
            replace // "geri git" tarayıcı düğmesinin önceki sayfaya yönlendirmesini sağlar
          >
            <span>
              {/* Yerel - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi yerelinde - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut yerelde dil - örn. Locales.SPANISH olarak ayarlanmış mevcut yerelle Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dil - örn. French */}
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
            aria-current={locale === localeItem ? "sayfa" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // "Geri dön" tarayıcı düğmesinin önceki sayfaya yönlendirmesini sağlar
          >
            <span>
              {/* Yerel - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi yerelinde - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut yerelde dil - örn. Locales.SPANISH olarak ayarlanmış mevcut yerel ile Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dilinde - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Alternatif bir yöntem, `useLocale` kancasının sağladığı `setLocale` fonksiyonunu kullanmaktır. Bu fonksiyon sayfanın önceden getirilmesine (prefetch) izin vermez. Daha fazla detay için [`useLocale` kancası dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md) bakabilirsiniz.

> Ayrıca, `onLocaleChange` seçeneğinde, dil değiştiğinde özel bir fonksiyon tetiklemek için bir fonksiyon ayarlayabilirsiniz.

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
  <button onClick={() => setLocale(Locales.FRENCH)}>Fransızcaya Geç</button>
);
```

> Dokümantasyon referansları:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özniteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özniteliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (İsteğe Bağlı) Adım 11: Yerelleştirilmiş Bir Link Bileşeni Oluşturma

Uygulamanızın navigasyonunun mevcut yerel ayara uygun olmasını sağlamak için özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'lerin önüne otomatik olarak mevcut dili ekler. Örneğin, Fransızca konuşan bir kullanıcı "Hakkında" sayfasına tıkladığında, `/about` yerine `/fr/about` adresine yönlendirilir.

Bu davranış birkaç nedenle faydalıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil bazlı sayfaları doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sunar.
- **Tutarlılık**: Uygulamanızda yerelleştirilmiş linkler kullanarak, navigasyonun mevcut yerel ayar içinde kalmasını garanti eder, beklenmedik dil değişimlerini önlersiniz.
- **Bakım Kolaylığı**: Yerelleştirme mantığını tek bir bileşende merkezileştirmek, URL yönetimini basitleştirir ve uygulamanız büyüdükçe kod tabanınızı daha kolay bakım yapılabilir ve genişletilebilir hale getirir.

Aşağıda TypeScript ile yerelleştirilmiş bir `Link` bileşeninin uygulanması bulunmaktadır:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Verilen URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href özniteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'nin önüne yerel ayarı eklemek üzere `getLocalizedUrl` kullanılır (örneğin, /fr/about).
 * Bu, gezinmenin aynı yerel bağlam içinde kalmasını sağlar.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL alınır.
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
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Geçerli yerel ayara göre href özniteliğini uyarlayan özel Link bileşeni.
 * Dahili bağlantılar için, URL'yi yerel ek ile öneklemek üzere `getLocalizedUrl` kullanılır (örneğin, /fr/about).
 * Bu, gezinmenin aynı yerel bağlam içinde kalmasını sağlar.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahiliyse ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL alınır.
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
 * URL http:// veya https:// ile başlıyorsa, harici kabul edilir.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href özniteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'yi yerel ayar ile öneklemek amacıyla `getLocalizedUrl` kullanılır (örneğin, /fr/about).
 * Bu, gezinmenin aynı yerel bağlam içinde kalmasını sağlar.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi al.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Nasıl Çalışır

- **Harici Bağlantıları Tespit Etme**:  
  Yardımcı fonksiyon `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar, yerelleştirmeye gerek olmadığı için değiştirilmeden bırakılır.

- **Geçerli Yerel Ayarın Alınması**:  
  `useLocale` kancası, geçerli yerel ayarı sağlar (örneğin, Fransızca için `fr`).

- **URL'nin Yerelleştirilmesi**:  
  Dahili bağlantılar (yani harici olmayanlar) için, `getLocalizedUrl` URL'yi otomatik olarak geçerli yerel ayarla ön ekler. Bu, kullanıcınız Fransızca ise, `href` olarak `/about` verilirse bunun `/fr/about` olarak dönüşeceği anlamına gelir.

- **Bağlantının Döndürülmesi**:  
  Bileşen, yerelleştirilmiş URL ile bir `<a>` öğesi döndürür ve böylece gezinmenin yerel ayarla tutarlı olmasını sağlar.

Bu `Link` bileşenini uygulamanızın tamamında entegre ederek, tutarlı ve dil farkındalığı olan bir kullanıcı deneyimi sağlarken aynı zamanda geliştirilmiş SEO ve kullanılabilirlikten de faydalanırsınız.

### (İsteğe Bağlı) Adım 12: Sunucu Eylemlerinde (Server Actions) geçerli yerel ayarı (locale) alın

Eğer bir Sunucu Eylemi içinde aktif yerel ayara ihtiyacınız varsa (örneğin, e-postaları yerelleştirmek veya yerel ayara duyarlı mantık çalıştırmak için), `next-intlayer/server`'dan `getLocale` fonksiyonunu çağırın:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Yerel ayar ile bir şeyler yap
};
```

> `getLocale` fonksiyonu, kullanıcının yerel ayarını belirlemek için kademeli (cascading) bir strateji izler:
>
> 1. İlk olarak, proxy tarafından ayarlanmış olabilecek bir yerel değer için istek başlıklarını kontrol eder
> 2. Başlıklarda yerel bulunamazsa, çerezlerde saklanan bir yerel arar
> 3. Çerez bulunamazsa, kullanıcının tercih ettiği dili tarayıcı ayarlarından tespit etmeye çalışır
> 4. Son çare olarak, uygulamanın yapılandırılmış varsayılan yereline geri döner
>
> Bu, mevcut bağlama göre en uygun yerelin seçilmesini sağlar.

### (İsteğe Bağlı) Adım 13: Paket boyutunuzu optimize edin

`next-intlayer` kullanıldığında, sözlükler varsayılan olarak her sayfanın paketine dahil edilir. Paket boyutunu optimize etmek için, Intlayer, `useIntlayer` çağrılarını makrolar kullanarak akıllıca değiştiren isteğe bağlı bir SWC eklentisi sağlar. Bu, sözlüklerin yalnızca gerçekten kullanan sayfaların paketlerine dahil edilmesini garanti eder.

Bu optimizasyonu etkinleştirmek için `@intlayer/swc` paketini yükleyin. Yüklendikten sonra, `next-intlayer` eklentiyi otomatik olarak algılar ve kullanır:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> Not: Bu optimizasyon yalnızca Next.js 13 ve üzeri sürümler için kullanılabilir.

> Not: Bu paket varsayılan olarak kurulmaz çünkü SWC eklentileri Next.js üzerinde hâlâ deneysel durumdadır. Gelecekte değişebilir.

### Turbopack üzerinde sözlük değişikliklerini izleme

`next dev` komutuyla geliştirme sunucusu olarak Turbopack kullanıldığında, sözlük değişiklikleri varsayılan olarak otomatik algılanmaz.

Bu kısıtlama, Turbopack'in içerik dosyalarınızdaki değişiklikleri izlemek için webpack eklentilerini paralel olarak çalıştıramamasından kaynaklanır. Bunun üstesinden gelmek için, geliştirme sunucusunu ve Intlayer derleme izleyicisini aynı anda çalıştırmak üzere `intlayer watch` komutunu kullanmanız gerekir.

```json5 fileName="package.json"
{
  // ... Mevcut package.json yapılandırmalarınız
  "scripts": {
    // ... Mevcut script yapılandırmalarınız
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Eğer next-intlayer@<=6.x.x kullanıyorsanız, Next.js 16 uygulamasının Turbopack ile doğru çalışması için `--turbopack` bayrağını korumanız gerekir. Bu sınırlamadan kaçınmak için next-intlayer@>=7.x.x kullanmanızı öneririz.

### TypeScript'i Yapılandırma

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

![Otomatik Tamamlama](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Çeviri Hatası](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, bu dosyaların Git deposuna eklenmesini önlemenize olanak tanır.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları göz ardı et
.intlayer
```

### VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **Otomatik Tamamlama**.
- Eksik çeviriler için **Gerçek Zamanlı Hata Tespiti**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı işlemler**.

Eklentinin nasıl kullanılacağı hakkında daha fazla bilgi için [Intlayer VS Code Eklentisi dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakabilirsiniz.

### Daha İleri Gitmek

Daha ileri gitmek için, [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışa aktarabilirsiniz.

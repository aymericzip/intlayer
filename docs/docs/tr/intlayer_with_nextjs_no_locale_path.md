---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js 16 uygulamanızı (sayfa yolunda [locale] olmadan) nasıl çevirirsiniz – i18n rehberi 2026
description: Next.js 16 web sitenizi, sayfa yolunda [locale] olmadan nasıl çokdilli hale getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve çeviri için dokümantasyonu izleyin.
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
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 1.0.0
    date: 2026-01-10
    changes: İlk sürüm
---

# Next.js 16 web sitenizi (sayfa yolunda [locale] olmadan) Intlayer kullanarak çevirin | Uluslararasılaştırma (i18n)

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Next.js için en iyi i18n çözümü mü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) sayfasına bakın.

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer** modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir. Intlayer, güçlü **App Router** dahil olmak üzere en güncel **Next.js 16** framework'ü ile sorunsuz entegre olur. Verimli render için **Server Components** ile çalışacak şekilde optimize edilmiştir ve [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) ile tam uyumludur.

Intlayer ile şunları yapabilirsiniz:

- **Çevirileri kolayca yönetin**: bileşen seviyesinde deklaratif sözlükler kullanarak.
- **Meta verilerini, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **İstemci ve sunucu tarafı bileşenlerinde çevirilere erişin**.
- **TypeScript desteğini sağlayın**; otomatik oluşturulan tiplerle otomatik tamamlama ve hata tespitini iyileştirin.
- **Gelişmiş özelliklerden yararlanın**, dinamik locale algılama ve geçiş gibi.

> Intlayer, Next.js 12, 13, 14 ve 16 ile uyumludur. Eğer Next.js Page Router kullanıyorsanız, bu [rehbere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_page_router.md) bakabilirsiniz. App Router ile Next.js 12, 13, 14 kullanıyorsanız, bu [rehbere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_14.md) bakın.

---

## Next.js Uygulamasında Intlayer Kurulumuna Adım Adım Rehber

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

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilation ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçlarını sağlayan çekirdek paket.

- **next-intlayer**

Intlayer'ı Next.js ile entegre eden paket. Next.js için uluslararasılaştırma amacıyla context provider'ları ve hook'lar sağlar. Ayrıca Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js eklentisini ve kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmesini gerçekleştirmek için bir proxy içerir.

### Adım 2: Projenizi Yapılandırın

İşte oluşturacağımız son yapı:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Eğer locale yönlendirmesi istemiyorsanız, intlayer basit bir provider / hook olarak kullanılabilir. Daha fazla ayrıntı için [bu rehbere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_no_locale_path.md) bakın.

Uygulamanızın dillerini yapılandırmak için bir config dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yereller (locales)
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // veya `no-prefix` - middleware tespiti için kullanışlı
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
      // Diğer yereller (locales)
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // veya `no-prefix` - middleware tespiti için kullanışlı
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
      // Diğer yerelleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // veya `no-prefix` - Middleware tespiti için kullanışlıdır
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, proxy yönlendirmesini, çerez adlarını, içerik bildirimlerinizin konumunu ve uzantısını, Intlayer günlüklerini konsolda devre dışı bırakmayı ve daha fazlasını ayarlayabilirsiniz. Kullanılabilir tüm parametrelerin eksiksiz listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

### Adım 3: Intlayer'ı Next.js Yapılandırmanıza Entegre Edin

Next.js kurulumunuzu Intlayer kullanacak şekilde yapılandırın:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* yapılandırma seçenekleri burada */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* yapılandırma seçenekleri burada */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* yapılandırma seçenekleri burada */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js eklentisi, Intlayer'ı Next.js ile entegre etmek için kullanılır. İçerik bildirim (content declaration) dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ortamlarında Intlayer ortam değişkenlerini tanımlar. Ayrıca performansı optimize etmek için alias'lar sağlar ve sunucu bileşenleriyle uyumluluğu garanti eder.

> `withIntlayer()` fonksiyonu bir promise fonksiyonudur. Derleme başlamadan önce intlayer sözlüklerini hazırlamanıza olanak tanır. Diğer eklentilerle birlikte kullanmak istiyorsanız, onu await edebilirsiniz. Örnek:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Eğer senkron olarak kullanmak isterseniz, `withIntlayerSync()` fonksiyonunu kullanabilirsiniz. Örnek:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer, proje komut satırı bayrakları `--webpack`, `--turbo` veya `--turbopack` ile ve mevcut **Next.js sürümünüz**e göre projenizin **webpack** mi yoksa **Turbopack** mi kullandığını otomatik olarak algılar.
>
> `next>=16` olduğunda, eğer **Rspack** kullanıyorsanız, Turbopack'i devre dışı bırakarak Intlayer'ın webpack yapılandırmasını kullanmasını açıkça zorlamalısınız:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### Adım 4: Dinamik Locale Rotalarını Tanımlayın

RootLayout içindeki her şeyi kaldırın ve aşağıdaki kodla değiştirin:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
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
  const { locale } = await params;
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
  const { locale } = await params;
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

### Adım 5: İçeriğinizi Deklare Edin

Çevirileri saklamak için içerik deklarasyonlarınızı oluşturun ve yönetin:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      tr: "Projemin Başlığı",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      tr: "İş akışınızı sadeleştirmek ve verimliliği artırmak için tasarlanmış yenilikçi platformumuzu keşfedin.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      tr: ["yenilik", "verimlilik", "iş akışı", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      tr: ["yenilik", "verimlilik", "iş akışı", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```tsx fileName="src/app/metadata.content.mjs" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      tr: "İş akışınızı kolaylaştırmak ve verimliliğinizi artırmak için tasarlanmış yenilikçi platformumuzu keşfedin.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      tr: ["inovasyon", "verimlilik", "iş akışı", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      tr: "Projemin Başlığı",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      tr: "İş akışınızı kolaylaştırmak ve verimliliği artırmak için tasarlanmış yenilikçi platformumuzu keşfedin.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      tr: ["inovasyon", "verimlilik", "iş akışı", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "tr": "Projemin Başlığı",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "tr": "İş akışınızı kolaylaştırmak ve verimliliği artırmak için tasarlanmış yenilikçi platformumuzu keşfedin.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "tr": ["yenilik", "verimlilik", "iş akışı", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        tr: "Düzenleyerek başlayın",
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

```javascript fileName="src/app/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Tür: import('intlayer').Dictionary
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        tr: "Düzenleyerek başlayın",
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

```javascript fileName="src/app/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Tür: import('intlayer').Dictionary
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        tr: "Düzenleyerek başlayın",
        en: "Get started by editing",
        fr: "Commencez par éditer",
```

        tr: "Düzenleyerek başlayın",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },

},
};

module.exports = pageContent;

````

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "tr": "Düzenleyerek başlayın",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
````

> İçerik deklarasyonlarınız, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece uygulamanızda herhangi bir yerde tanımlanabilir. Ve içerik deklarasyon dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla ayrıntı için [içerik deklarasyonu dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Adım 6: İçeriği Kodunuzda Kullanın

Uygulamanız genelinde içerik sözlüklerinize erişin:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { headers, cookies } from "next/headers";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async () => {

  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
```

      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>

);
};

export default Page;

````

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};
````

- **`IntlayerClientProvider`** istemci tarafı bileşenlerine locale sağlamak için kullanılır. Layout dahil herhangi bir üst bileşene yerleştirilebilir. Ancak, Next.js'in layout kodunu sayfalar arasında paylaştığı ve bu nedenle daha verimli olduğu için bir layout içine yerleştirilmesi önerilir. `IntlayerClientProvider`'ı layout'ta kullanarak, her sayfa için yeniden oluşturulmasını önleyerek performansı artırır ve uygulamanız boyunca tutarlı bir yerelleştirme bağlamı sağlar.
- **`IntlayerServerProvider`** sunucu çocuklarına locale sağlamak için kullanılır. Layout içinde ayarlanamaz.

  > Layout ve page ortak bir server context paylaşamaz çünkü server context sistemi her isteğe özel bir veri deposuna (React'in cache mekanizması aracılığıyla) dayanır, bu da uygulamanın farklı segmentleri için her "context"in yeniden oluşturulmasına neden olur. Sağlayıcıyı paylaşılan bir layout'a yerleştirmek bu izolasyonu bozacak ve server bileşenlerinize server context değerlerinin doğru şekilde iletilmesini engelleyecektir.

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik tanımını oluştur

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik tanımını oluştur

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
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

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx"  codeFormat="typescript"
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

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.mjx" codeFormat="esm"
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

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.csx" codeFormat="commonjs"
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

> İçeriğinizi bir `string` özniteliğinde kullanmak istiyorsanız; ör. `alt`, `title`, `href`, `aria-label` vb., fonksiyonun değerini çağırmalısınız, örneğin:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` hook'u hakkında daha fazla bilgi edinmek için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useIntlayer.md) bakın.

### (İsteğe Bağlı) Adım 7: Locale Algılama için Proxy'yu Yapılandırma

Kullanıcının tercih ettiği locale'i algılamak için proxy'yu yapılandırın:

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

> `intlayerProxy`, kullanıcının tercih ettiği yerel dili algılamak ve onları [yapılandırmada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) belirtildiği gibi uygun URL'ye yönlendirmek için kullanılır. Ayrıca, kullanıcının tercih ettiği yerel dili bir çerezde kaydetmeyi sağlar.

> Birden fazla proxy'yi birbirine zincirlemeniz gerekiyorsa (örneğin, kimlik doğrulama veya özel proxy'lerle `intlayerProxy`), Intlayer artık `multipleProxies` adlı bir yardımcı sağlar.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (İsteğe Bağlı) Adım 8: İçeriğinizin dilini değiştirin

Next.js'te içeriğinizin dilini değiştirmek için önerilen yol, kullanıcıları uygun yerelleştirilmiş sayfaya yönlendirmek amacıyla `Link` bileşenini kullanmaktır. `Link` bileşeni sayfanın önceden getirilmesini (prefetching) sağlar; bu da tam sayfa yeniden yüklemesini önlemeye yardımcı olur.

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
              {/* Yerel (Locale) - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi yerelinde - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Dil mevcut locale'de - örn. mevcut locale Locales.SPANISH ise "Francés" */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dil adı - örn. French */}
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
              {/* Yerel - ör. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi yerelinde - ör. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Dil mevcut locale'de - ör. mevcut locale Locales.SPANISH iken: Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Dil İngilizce olarak - ör. French */}
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
              {/* Locale - ör. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi locale'inde - ör. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Dil mevcut locale'de - ör. Mevcut locale Locales.SPANISH iken: Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce'de dil - ör. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Alternatif bir yol, `useLocale` hook'unun sağladığı `setLocale` fonksiyonunu kullanmaktır. Bu fonksiyon sayfanın prefetching yapılmasına izin vermez. Daha fazla bilgi için [`useLocale` hook dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md) bakın.

> Dokümantasyon referansları:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özniteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özniteliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (İsteğe Bağlı) Adım 9: Sunucu eylemlerinde geçerli yereli (locale) alın

Eğer bir sunucu eylemi içinde aktif yerel ayara (örn. e-postaları yerelleştirmek veya yerel duyarlı mantık çalıştırmak için) ihtiyacınız varsa, `next-intlayer/server` içinden `getLocale`'i çağırın:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // locale ile bir şeyler yap
};
```

> `getLocale` fonksiyonu kullanıcının yerel ayarını belirlemek için kademeli bir strateji izler:
>
> 1. Öncelikle, proksi tarafından ayarlanmış olabilecek bir locale değerini kontrol etmek için istek başlıklarını (request headers) kontrol eder
> 2. Başlıklarda locale bulunamazsa, çerezlerde (cookies) saklanan bir locale arar
> 3. Çerez bulunamazsa, kullanıcının tarayıcı ayarlarından tercih edilen dili tespit etmeye çalışır
> 4. Son çare olarak uygulamanın yapılandırılmış varsayılan locale değerine döner
>
> Bu, kullanılabilir bağlama göre en uygun yerelin seçilmesini sağlar.

### (İsteğe bağlı) Adım 10: Paket boyutunuzu optimize edin

`next-intlayer` kullanıldığında, sözlükler varsayılan olarak her sayfanın bundle'ına dahil edilir. Paket boyutunu optimize etmek için Intlayer, makrolar kullanarak `useIntlayer` çağrılarını akıllıca değiştiren isteğe bağlı bir SWC eklentisi sağlar. Bu, sözlüklerin yalnızca bunları gerçekten kullanan sayfaların bundle'larına dahil edilmesini sağlar.

Bu optimizasyonu etkinleştirmek için `@intlayer/swc` paketini yükleyin. Yüklendikten sonra `next-intlayer` eklentiyi otomatik olarak algılar ve kullanır:

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

> Not: Bu optimizasyon yalnızca Next.js 13 ve üzeri için kullanılabilir.

> Not: Bu paket varsayılan olarak yüklenmez çünkü SWC eklentileri Next.js üzerinde hâlâ deneysel durumdadır. İleride değişebilir.

> Not: Eğer seçeneği `importMode: 'dynamic'` veya `importMode: 'live'` olarak ayarlarsanız, bu Suspense'e dayanır; bu nedenle `useIntlayer` çağrılarınızı bir `Suspense` sınırı içine almanız gerekir. Bu, `useIntlayer`'ı Sayfa / Layout bileşeninizin en üst düzeyinde doğrudan kullanamayacağınız anlamına gelir.

### Turbopack'ta sözlük değişikliklerini izleme

next dev komutunu kullanarak geliştirme sunucunuz olarak Turbopack'i kullandığınızda, sözlük değişiklikleri varsayılan olarak otomatik algılanmaz.

Bu sınırlama, Turbopack'in içerik dosyalarınızdaki değişiklikleri izlemek için webpack eklentilerini paralel olarak çalıştıramamasından kaynaklanır. Bunu aşmak için geliştirme sunucusunu ve Intlayer derleme izleyicisini aynı anda çalıştırmak üzere `intlayer watch` komutunu kullanmanız gerekir.

```json5 fileName="package.json"
{
  // ... Mevcut package.json yapılandırmalarınız
  "scripts": {
    // ... Mevcut scripts yapılandırmalarınız
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Eğer next-intlayer@<=6.x.x kullanıyorsanız, Next.js 16 uygulamasının Turbopack ile doğru çalışması için `--turbopack` bayrağını tutmanız gerekir. Bu sınırlamadan kaçınmak için next-intlayer@>=7.x.x kullanmanızı öneririz.

### TypeScript'i Yapılandırma

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı güçlendirmek için module augmentation kullanır.

![Otomatik tamamlama](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Çeviri hatası](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik oluşturulmuş tipleri içerdiğinden emin olun.

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

Intlayer tarafından oluşturulan dosyaları yoksaymanız önerilir. Bu, bu dosyaları Git deponuza commit etmekten kaçınmanızı sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki satırları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Otomatik tamamlama** çeviri anahtarları için.
- Eksik çeviriler için **gerçek zamanlı hata tespiti**.
- **Satır içi önizlemeler** — çevrilmiş içeriğin önizlemeleri.
- **Hızlı eylemler** — çevirileri kolayca oluşturup güncellemek için.

Daha fazla ayrıntı için uzantının nasıl kullanılacağına dair [Intlayer VS Code Extension belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

### Daha İleri

Daha ileri gitmek için [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışsallaştırabilirsiniz.

---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Next.js ve Sayfa Yönlendirici web sitenizi çevirin (i18n)
description: Next.js Sayfa Yönlendirici kullanarak web sitenizi çok dilli hale getirmeyi öğrenin. Next.js uygulamanızda uluslararasılaştırma (i18n) ve çeviri yapmak için dokümantasyonu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Sayfa Yönlendirici
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - next-with-page-router
---

# Intlayer ve Next.js Sayfa Yönlendirici ile uluslararasılaştırma (i18n) başlangıç kılavuzu

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir. Geleneksel **Sayfa Yönlendirici** ile **Next.js** framework'ü ile sorunsuz bir şekilde entegre olur.

Intlayer ile şunları yapabilirsiniz:

- **Çevirileri bildirimsel sözlükler kullanarak kolayca yönetin** bileşen düzeyinde.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **TypeScript desteği sağlayın**, otomatik tamamlama ve hata algılama ile geliştirin.
- **Gelişmiş özelliklerden yararlanın**, dinamik yerel algılama ve anahtarlama gibi.

> Intlayer, Next.js 12, 13, 14 ve 15 ile uyumludur. App Router kullanıyorsanız, [App Router kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md) bakın. Next.js 15 için bu [kılavuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md) bakın.

---

## Sayfa Yönlendirici Kullanarak Next.js Uygulamasında Intlayer Kurulumu Adım Adım Kılavuzu

### Adım 1: Bağımlılıkları Kurma

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri kurun:

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

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), derleme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan çekirdek paket.

- **next-intlayer**

  Intlayer'ı Next.js ile entegre eden paket. Next.js için bağlam sağlayıcıları ve kancalar sağlar. Ayrıca, Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js eklentisini içerir, ayrıca kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için middleware içerir.

### Adım 2: Projenizi Yapılandırma

Uygulamanızın desteklediği dilleri tanımlamak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınızı buraya ekleyin
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
      // Diğer yerel ayarlarınızı buraya ekleyin
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
      // Diğer yerel ayarlarınızı buraya ekleyin
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, middleware yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı, Intlayer günlüklerinin konsolda devre dışı bırakılması ve daha fazlasını ayarlayabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

### Adım 3: Next.js Yapılandırmasında Intlayer'ı Entegre Etme

Next.js kurulumunuzu Intlayer ile uyumlu hale getirin:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mevcut Next.js yapılandırmanız
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js eklentisi, Intlayer'ı Next.js ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Intlayer ortam değişkenlerini [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ortamlarında tanımlar. Ayrıca, performansı optimize etmek ve sunucu bileşenleriyle uyumluluğu sağlamak için takma adlar sağlar.
> `withIntlayer()` Next.js eklentisi promise tabanlı bir fonksiyondur.

### Adım 4: Yerel Algılama için Middleware Kurulumu

Kullanıcının tercih ettiği yerel ayarı otomatik olarak algılamak ve işlemek için middleware kurun:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> Eşleştirici parametresini uygulamanızın rotalarına uyacak şekilde uyarlayın. Daha fazla detay için [Next.js dokümantasyonunda eşleştiriciyi yapılandırma](https://nextjs.org/docs/app/building-your-application/routing/middleware) bölümüne bakın.

### Adım 5: Dinamik Yerel Rotalar Tanımlama

Kullanıcının yerel ayarına göre yerelleştirilmiş içerik sunmak için dinamik yönlendirmeyi uygulayın.

1.  **Yerel Ayar Özel Sayfalar Oluşturma:**

    Ana sayfa dosyanızı `[locale]` dinamik segmentini içerecek şekilde yeniden adlandırın.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Yerelleştirmeyi İşlemek için `_app.tsx`'yi Güncelleme:**

    `_app.tsx`'nizi Intlayer sağlayıcılarını içerecek şekilde değiştirin.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **Yolları ve Özellikleri İşlemek için `getStaticPaths` ve `getStaticProps` Kurulumu:**

    `[locale]/index.tsx`'nizde farklı yerel ayarları işlemek için yolları ve özellikleri tanımlayın.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* İçeriğiniz burada */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* İçeriğiniz burada */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* İçeriğiniz burada */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` ve `getStaticProps`, Next.js Sayfa Yönlendirici'de uygulamanızın tüm yerel ayarlar için gerekli sayfaları önceden oluşturmasını sağlar. Bu yaklaşım, çalışma zamanı hesaplamasını azaltır ve iyileştirilmiş bir kullanıcı deneyimi sağlar. Daha fazla detay için Next.js'in [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) ve [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) dokümantasyonuna bakın.

### Adım 6: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

İçerik bildirim hakkında daha fazla bilgi için [içerik bildirim kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

### Adım 7: Kodunuzda İçeriği Kullanın

Çevirilmiş içerik görüntülemek için uygulamanız boyunca içerik sözlüklerinize erişin.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Ek bileşenler */}
    </div>
  );
};

// ... getStaticPaths ve getStaticProps dahil geri kalan kod

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Ek bileşenler */}
    </div>
  );
};

// ... getStaticPaths ve getStaticProps dahil geri kalan kod

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Ek bileşenler */}
    </div>
  );
};

// ... getStaticPaths ve getStaticProps dahil geri kalan kod
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // İlgili içerik bildirimi oluşturduğunuzdan emin olun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // İlgili içerik bildirimi oluşturduğunuzdan emin olun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // İlgili içerik bildirimi oluşturduğunuzdan emin olun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Çevirileri `string` niteliklerinde kullanmak istediğinizde (örneğin `alt`, `title`, `href`, `aria-label`), fonksiyonun değerini şu şekilde çağırın:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md) bakın.

### (İsteğe Bağlı) Adım 8: Meta verilerinizin uluslararasılaştırılması

Sayfanızın başlığı gibi meta verilerinizi uluslararasılaştırmak istiyorsanız, Next.js Sayfa Yönlendirici tarafından sağlanan `getStaticProps` fonksiyonunu kullanabilirsiniz. İçinde, meta verilerinizi çevirmek için `getIntlayer` fonksiyonundan içeriği alabilirsiniz.

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { type Metadata } from "next";

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

```javascript fileName="src/pages/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
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

```javascript fileName="src/pages/[locale]/metadata.content.cjs" codeFormat="commonjs"
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

```json fileName="src/pages/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
      },
    },
  },
};
```

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({
  metadata,
  multilingualUrls,
  locale,
}) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO için hreflang etiketleri oluşturun */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Sayfa içeriği */}
      <main>{/* Sayfa içeriğiniz burada */}</main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const locale = params?.locale as string;

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
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... getStaticPaths dahil geri kalan kod
````

````jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO için hreflang etiketleri oluşturun */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Sayfa içeriği */}
      <main>{/* Sayfa içeriğiniz burada */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

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
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... getStaticPaths dahil geri kalan kod
````

````jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO için hreflang etiketleri oluşturun */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Sayfa içeriği */}
      <main>{/* Sayfa içeriğiniz burada */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Her yerel ayar için tüm URL'leri içeren bir nesne oluşturur.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... getStaticPaths dahil geri kalan kod
````

> Not: `next-intlayer`'dan içe aktarılan `getIntlayer` fonksiyonu, içeriğinizi görsel düzenleyici ile entegrasyon için `IntlayerNode`'a sarılmış olarak döndürür. Aksine, `intlayer`'dan içe aktarılan `getIntlayer` fonksiyonu içeriğinizi doğrudan ek özellikler olmadan döndürür.

Alternatif olarak, meta verilerinizi bildirmek için `getTranslation` fonksiyonunu kullanabilirsiniz. Ancak, içerik bildirim dosyalarını kullanmak, meta verilerinizin çevirisini otomatikleştirmek ve içeriği bir noktada harici hale getirmek için önerilir.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO için hreflang etiketleri oluşturun */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={url}
          />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Sayfa içeriği */}
      <main>
        {/* Sayfa içeriğiniz burada */}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params
}) => {
  const locale = params?.locale as string;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
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

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... getStaticPaths dahil geri kalan kod
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO için hreflang etiketleri oluşturun */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Sayfa içeriği */}
      <main>{/* Sayfa içeriğiniz burada */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
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

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... getStaticPaths dahil geri kalan kod
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer";
const Head = require("next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* SEO için hreflang etiketleri oluşturun */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Sayfa içeriği */}
      <main>{/* Sayfa içeriğiniz burada */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) => getTranslation(content, locale);

  const metadata = {
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

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... getStaticPaths dahil geri kalan kod
```

> Meta veri optimizasyonu hakkında daha fazla bilgi edinmek için resmi [Next.js dokümantasyonuna](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata) bakın.

### (İsteğe Bağlı) Adım 9: İçeriğinizin dilini değiştirme

Next.js'te içeriğinizin dilini değiştirmek için, kullanıcıları uygun yerelleştirilmiş sayfaya yönlendirmek için `Link` bileşenini kullanmak önerilen yoldur. `Link` bileşeni, sayfa ön yüklemesini etkinleştirir, bu da tam sayfa yeniden yüklemeden kaçınmaya yardımcı olur.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarındaki dil - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli yerel ayar set edildiğinde dil - örn. Locales.SPANISH set edildiğinde Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce'deki dil - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarındaki dil - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli yerel ayar set edildiğinde dil - örn. Locales.SPANISH set edildiğinde Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce'deki dil - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarındaki dil - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli yerel ayar set edildiğinde dil - örn. Locales.SPANISH set edildiğinde Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce'deki dil - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </option>
      ))}
    </select>
  );
};
```

> Alternatif bir yol, `useLocale` kancası tarafından sağlanan `setLocale` fonksiyonunu kullanmaktır. Bu fonksiyon, sayfa ön yüklemesine izin vermez ve sayfayı yeniden yükler.

> Bu durumda, `router.push` kullanarak yönlendirme olmadan, sadece sunucu tarafı kodunuz içeriğin yerel ayarını değiştirecektir.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Geri kalan kod

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Fransızca'ya Geç</button>
);
```

> `useLocalePageRouter` API'si `useLocale` ile aynıdır. `useLocale` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md) bakın.

> Dokümantasyon referansları:
>
> - [`getLocaleName` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özelliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özelliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özelliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özelliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (İsteğe Bağlı) Adım 10: Yerelleştirilmiş Bağlantı Bileşeni Oluşturma

Uygulamanızın navigasyonunun mevcut yerel ayarı saygı göstermesini sağlamak için, özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'leri otomatik olarak mevcut dille önekler, böylece örneğin Fransızca konuşan bir kullanıcı "Hakkında" sayfasına bir bağlantıya tıkladığında, `/fr/hakkinda` yerine `/hakkinda`ya yönlendirilir.

Bu davranış birkaç nedenden dolayı kullanışlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil özel sayfalarını doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sağlar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, navigasyonun mevcut yerel ayar içinde kalmasını garanti edersiniz, beklenmedik dil anahtarlarını önlersiniz.
- **Bakım Kolaylığı**: URL yönetim mantığını tek bir bileşende merkezileştirmek, kod tabanınızı yönetmeyi ve uygulamanız büyüdükçe genişletmeyi basitleştirir.

Aşağıda, TypeScript'te yerelleştirilmiş bir `Link` bileşeninin uygulanması bulunmaktadır:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Verilen bir URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Href özelliğini mevcut yerel ayar temelinde uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, `getLocalizedUrl` kullanarak URL'yi yerel ayar ile önekler (örneğin, /fr/hakkinda).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ise ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * Verilen bir URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? '');

/**
 * Href özelliğini mevcut yerel ayar temelinde uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, `getLocalizedUrl` kullanarak URL'yi yerel ayar ile önekler (örneğin, /fr/hakkinda).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ise ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * Verilen bir URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ise ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### Nasıl Çalışır

- **Harici Bağlantıları Algılama**:  
  Yardımcı fonksiyon `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar değişmeden bırakılır çünkü yerelleştirmeye ihtiyaçları yoktur.

- **Mevcut Yerel Ayarı Alma**:  
  `useLocale` kancası mevcut yerel ayarı sağlar (örneğin, Fransızca için `fr`).

- **URL'yi Yerelleştirme**:  
  Dahili bağlantılar (yani harici olmayan) için, `getLocalizedUrl` kullanarak URL'yi otomatik olarak mevcut yerel ayar ile önekler. Bu, kullanıcınız Fransızca ise, `/hakkinda` href'ini geçmek onu `/fr/hakkinda`ya dönüştürür.

- **Bağlantıyı Döndürme**:  
  Bileşen, yerelleştirilmiş URL ile bir `<a>` elementi döndürür, böylece navigasyon yerel ayar ile tutarlı olur.

Bu `Link` bileşenini uygulamanız boyunca entegre ederek, tutarlı ve dil bilincine sahip bir kullanıcı deneyimi sürdürürsünüzken aynı zamanda gelişmiş SEO ve kullanılabilirlikten de yararlanırsınız.

### (İsteğe Bağlı) Adım 11: Paket Boyutunuzu Optimize Edin

`next-intlayer` kullanırken, sözlükler varsayılan olarak her sayfa için pakete dahil edilir. Paket boyutunu optimize etmek için, Intlayer isteğe bağlı bir SWC eklentisi sağlar ki bu, `useIntlayer` çağrılarını akıllıca makrolar kullanarak değiştirir. Bu, sözlüklerin sadece onları gerçekten kullanan sayfalar için paketlere dahil edilmesini sağlar.

Bu optimizasyonu etkinleştirmek için, `@intlayer/swc` paketini kurun. Kurulduktan sonra, `next-intlayer` eklentiyi otomatik olarak algılayacak ve kullanacaktır:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> Not: Bu optimizasyon sadece Next.js 13 ve üzeri için kullanılabilir.

> Not: Bu paket varsayılan olarak kurulmaz çünkü SWC eklentileri Next.js'te hala deneyseldir. Gelecekte değişebilir.

### TypeScript Yapılandırma

Intlayer, TypeScript'ten faydalanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletmesi kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırma

Deponuzu temiz tutmak ve oluşturulan dosyaları göndermemek için, Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir.

`.gitignore` dosyanıza aşağıdaki satırları ekleyin:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi geliştirmek için, resmi **Intlayer VS Code Uzantısı**'nı kurabilirsiniz.

[VS Code Marketplace'ten Kurun](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için, [Intlayer VS Code Uzantısı dokümantasyonu](https://intlayer.org/doc/vs-code-extension)na bakın.

## Ek Kaynaklar

- **Intlayer Dokümantasyonu:** [GitHub Deposu](https://github.com/aymericzip/intlayer)
- **Sözlük Kılavuzu:** [Sözlük](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- **Yapılandırma Dokümantasyonu:** [Yapılandırma Kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

Bu kılavuzu takip ederek, Sayfa Yönlendirici kullanarak Next.js uygulamanızda Intlayer'ı etkili bir şekilde entegre edebilir, web projeleriniz için sağlam ve ölçeklenebilir uluslararasılaştırma desteği sağlayabilirsiniz.

### Daha Fazla Bilgi Edinin

Daha fazla ilerlemek için, [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)yi uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak harici hale getirebilirsiniz.

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler                                                     |
| ------ | ---------- | ----------------------------------------------------------------- |
| 5.6.0  | 2025-07-06 | `withIntlayer()` fonksiyonunu promise tabanlı fonksiyona dönüştür |
| 5.5.10 | 2025-06-29 | Geçmişi başlat                                                    |

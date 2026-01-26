---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Özel URL Yeniden Yazımları
description: Intlayer'da yerel-dil özgü yollar tanımlamak için özel URL yeniden yazımlarının nasıl yapılandırılacağını ve kullanılacağını öğrenin.
keywords:
  - Özel URL Yeniden Yazımları
  - Yönlendirme
  - Uluslararasılaştırma
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Çerçeveye özgü biçimlendiriciler ve useRewriteURL kancasının kullanımıyla merkezi URL yeniden yazımlarını uygulama.
---

# Özel URL Yeniden Yazımları Uygulaması

Intlayer, standart `/locale/path` yapısından farklı olan yerel-dil özgü yollar tanımlamanıza olanak tanıyan özel URL yeniden yazımlarını destekler. Bu, dahili uygulama mantığını kanonik tutarken İngilizce için `/about` ve Fransızca için `/a-propos` gibi URL'lere izin verir.

## Yapılandırma

Özel yeniden yazımlar, framework'e özgü formatters kullanılarak `intlayer.config.ts` dosyanızın `routing` bölümünde yapılandırılır. Bu formatters, tercih ettiğiniz router için doğru sözdizimini sağlar.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-no-default",
        rewrite: nextjsRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="React Router" value="reactrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { reactRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: reactRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="TanStack Yönlendiricisi" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: tanstackRouterRewrite({
          "/$locale/about": {
            fr: "/$locale/a-propos",
            es: "/$locale/acerca-de",
          },
          "/$locale/products/$id": {
            fr: "/$locale/produits/$id",
            es: "/$locale/productos/$id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Vue Yönlendiricisi" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // diğer ayarlar
      routing: {
        mode: "prefix-all",
        rewrite: vueRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="SvelteKit" value="sveltekit">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { svelteKitRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (diğer ayarlar)
      routing: {
        mode: "prefix-all",
        rewrite: svelteKitRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Solid Router" value="solidrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { solidRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (diğer ayarlar)
      routing: {
        mode: "prefix-all",
        rewrite: solidRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Nuxt" value="nuxt">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nuxtRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: nuxtRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
</Tabs>

### Kullanılabilir Formatlayıcılar

Intlayer tüm popüler framework'ler için formatlayıcılar sağlar:

- `nextjsRewrite`: Next.js App Router için. `[slug]`, `[...slug]` (1+), ve `[[...slug]]` (0+) destekler.
- `svelteKitRewrite`: SvelteKit için. `[slug]`, `[...path]` (0+), ve `[[optional]]` (0-1) destekler.
- `reactRouterRewrite`: React Router için. `:slug` ve `*` (0+) destekler.
- `vueRouterRewrite`: Vue Router 4 için. `:slug`, `:slug?` (0-1), `:slug*` (0+), ve `:slug+` (1+) destekler.
- `solidRouterRewrite`: Solid Router için. `:slug` ve `*slug` (0+) destekler.
- `tanstackRouterRewrite`: TanStack Router için. `$slug` ve `*` (0+) destekler.
- `nuxtRewrite`: Nuxt 3 için. `[slug]` ve `[...slug]` (0+) destekler.
- `viteRewrite`: Herhangi bir Vite tabanlı proje için genel bir formatter. Vite proxy'su için sözdizimini normalleştirir.

### Gelişmiş Desenler

Intlayer bu desenleri dahili olarak birleşik bir sözdizimine normalleştirir; bu, gelişmiş yol eşleştirme ve oluşturma olanağı sağlar:

- **İsteğe Bağlı Segmentler**: `[[optional]]` (SvelteKit) veya `:slug?` (Vue/React) desteklenir.
- **Catch-all (Sıfır veya daha fazla)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt) veya `*` (React/TanStack) birden fazla segmentle eşleşmeye izin verir.
- **Zorunlu Catch-all (Bir veya daha fazla)**: `[...slug]` (Next.js) veya `:slug+` (Vue) en az bir segmentin varlığını garanti eder.

## İstemci Taraflı URL Düzeltmesi: `useRewriteURL`

Tarayıcı adres çubuğunun her zaman "pretty" (gösterişli) yerelleştirilmiş URL'yi yansıtmasını sağlamak için Intlayer `useRewriteURL` hook'unu sağlar. Bu hook, kullanıcı kanonik bir yola geldiğinde URL'yi `window.history.replaceState` kullanarak sessizce günceller.

### Çerçevelerde Kullanım

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // /fr/about adresini otomatik olarak /fr/a-propos olarak düzeltir
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Otomatik olarak /fr/about adresini /fr/a-propos'a düzeltir

      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="Vue" value="vue">
  
    ```vue
    <script setup>
    import { useRewriteURL } from "vue-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
  <Tab label="Solid" value="solid">
  
    ```tsx
    import { useRewriteURL } from "solid-intlayer";

    const Layout = (props) => {
      useRewriteURL();
      return <>{props.children}</>;
    };
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    ```svelte
    <script>
    import { useRewriteURL } from "svelte-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
</Tabs>

## Router Entegrasyonu ve Proxy'ler

Intlayer'in sunucu tarafı proxy'leri (Vite ve Next.js), SEO tutarlılığını sağlamak için özel yeniden yazmaları otomatik olarak yönetir.

1. **Dahili Yeniden Yazmalar**: Bir kullanıcı `/fr/a-propos` adresini ziyaret ettiğinde, proxy bunu dahili olarak `/fr/about` adresine eşler, böylece framework doğru rotayla eşleşir.
2. **Yetkili Yönlendirmeler**: Bir kullanıcı elle `/fr/about` yazarsa, proxy `/fr/a-propos`'a 301/302 yönlendirmesi yapar; böylece arama motorları sayfanın yalnızca tek bir sürümünü dizine ekler.

### Next.js Entegrasyonu

Next.js entegrasyonu `intlayerProxy` middleware'i aracılığıyla tamamen yönetilir.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Vite Entegrasyonu

SolidJS, Vue ve Svelte için `intlayerProxy` Vite eklentisi geliştirme sırasında yeniden yazmaları (rewrites) yönetir.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Temel Özellikler

### 1. Çoklu Bağlam Yeniden Yazmaları

Her formatter, farklı tüketiciler için uzmanlaşmış kuralları içeren bir `RewriteObject` oluşturur:

- `url`: İstemci tarafı URL oluşturma için optimize edilmiştir (locale segmentlerini kaldırır).
- `nextjs`: Next.js middleware için `[locale]` korur.
- `vite`: Vite proxy'leri için `:locale` korur.

### 2. Otomatik Pattern Normalizasyonu

Intlayer, tüm kaynak framework'lerinden bağımsız olarak eşlemenin tutarlı kalmasını sağlamak için tüm desen sözdizimlerini dahili olarak normalleştirir (ör. `[param]`'ı `:param`'a dönüştürmek).

### 3. SEO için Yetkili URL'ler

Kanonik yollardan daha okunaklı takma adlara yapılan yönlendirmeleri zorunlu kılarak, Intlayer çoğaltılmış içerik sorunlarını önler ve sitenin bulunabilirliğini artırır.

## Temel Yardımcı Fonksiyonlar

- `getLocalizedUrl(url, locale)`: Yeniden yazma kurallarına uyan yerelleştirilmiş bir URL üretir.
- `getCanonicalPath(path, locale)`: Yerelleştirilmiş bir URL'yi dahili kanonik yoluna çözer.
- `getRewritePath(pathname, locale)`: Bir yol adının daha okunaklı yerelleştirilmiş takma adına düzeltilmesi gerekip gerekmediğini tespit eder.

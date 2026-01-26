---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Penulisan Ulang URL Kustom
description: Pelajari cara mengonfigurasi dan menggunakan penulisan ulang URL kustom di Intlayer untuk menentukan jalur spesifik per locale.
keywords:
  - Penulisan Ulang URL Kustom
  - Routing
  - Internationalization
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Mengimplementasikan penulisan ulang URL terpusat dengan formatter spesifik-framework dan hook useRewriteURL.
---

# Implementasi Penulisan Ulang URL Kustom

Intlayer mendukung penulisan ulang URL kustom, memungkinkan Anda menentukan jalur spesifik per locale yang berbeda dari struktur standar `/locale/path`. Ini memungkinkan URL seperti `/about` untuk bahasa Inggris dan `/a-propos` untuk bahasa Prancis sambil menjaga logika aplikasi internal tetap kanonik.

## Konfigurasi

Penulisan ulang URL kustom dikonfigurasikan di bagian `routing` dari file `intlayer.config.ts` Anda menggunakan formatter khusus framework. Formatter ini menyediakan sintaks yang benar untuk router pilihan Anda.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... // konfigurasi lainnya
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
  <Tab label="TanStack Router" value="tanstackrouter">

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
  <Tab label="Vue Router" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (konfigurasi lainnya)
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
      // ... (selengkapnya)
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
      // ... (selengkapnya)
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

### Formatter yang Tersedia

Intlayer menyediakan formatter untuk semua framework populer:

- `nextjsRewrite`: Untuk Next.js App Router. Mendukung `[slug]`, `[...slug]` (1+), dan `[[...slug]]` (0+).
- `svelteKitRewrite`: Untuk SvelteKit. Mendukung `[slug]`, `[...path]` (0+), dan `[[optional]]` (0-1).
- `reactRouterRewrite`: Untuk React Router. Mendukung `:slug` dan `*` (0+).
- `vueRouterRewrite`: Untuk Vue Router 4. Mendukung `:slug`, `:slug?` (0-1), `:slug*` (0+), dan `:slug+` (1+).
- `solidRouterRewrite`: Untuk Solid Router. Mendukung `:slug` dan `*slug` (0+).
  /// `tanstackRouterRewrite`: Untuk TanStack Router. Mendukung `$slug` dan `*` (0+).
  /// `nuxtRewrite`: Untuk Nuxt 3. Mendukung `[slug]` dan `[...slug]` (0+).
  /// `viteRewrite`: Formatter umum untuk proyek berbasis Vite. Menormalkan sintaks untuk proxy Vite.
  ///
  /// ### Pola Lanjutan
  ///
  /// Intlayer secara internal menormalkan pola-pola ini menjadi sintaks terpadu, memungkinkan pencocokan dan pembuatan path yang lebih canggih:
  ///
  /// - **Segmen Opsional**: `[[optional]]` (SvelteKit) atau `:slug?` (Vue/React) didukung.
  /// - **Catch-all (Nol atau lebih)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt), atau `*` (React/TanStack) memungkinkan mencocokkan beberapa segmen.
  /// - **Catch-all Wajib (Satu atau lebih)**: `[...slug]` (Next.js) atau `:slug+` (Vue) memastikan setidaknya satu segmen ada.
  ///
  /// ## Koreksi URL di Sisi Klien: `useRewriteURL`
  ///
  ///

Untuk memastikan bilah alamat browser selalu mencerminkan URL terlokalisasi yang "cantik", Intlayer menyediakan hook `useRewriteURL`. Hook ini memperbarui URL secara diam-diam menggunakan `window.history.replaceState` ketika pengguna mendarat pada path kanonik.

### Penggunaan pada Frameworks

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Secara otomatis memperbaiki /fr/about menjadi /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Secara otomatis mengoreksi /fr/about menjadi /fr/a-propos

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

## Integrasi Router & Proxies

Proxy sisi-server Intlayer (Vite & Next.js) secara otomatis menangani rewrite kustom untuk memastikan konsistensi SEO.

1. **Penulisan Ulang Internal**: Ketika seorang pengguna mengunjungi `/fr/a-propos`, proxy secara internal memetakan ke `/fr/about` sehingga framework Anda mencocokkan route yang benar.
2. **Pengalihan Otoritatif**: Jika pengguna mengetik `/fr/about` secara manual, proxy mengeluarkan pengalihan 301/302 ke `/fr/a-propos`, memastikan mesin pencari hanya mengindeks satu versi halaman tersebut.

### Integrasi Next.js

Integrasi Next.js sepenuhnya ditangani melalui middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Integrasi Vite

Untuk SolidJS, Vue, dan Svelte, plugin Vite `intlayerProxy` mengelola rewrite selama pengembangan.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Fitur Utama

### 1. Rewrite Multi-Konteks

Setiap formatter menghasilkan sebuah `RewriteObject` yang berisi aturan khusus untuk berbagai konsumen:

- `url`: Dioptimalkan untuk pembuatan URL di sisi klien (menghapus segmen locale).
- `nextjs`: Mempertahankan `[locale]` untuk middleware Next.js.
- `vite`: Mempertahankan `:locale` untuk proxy Vite.

### 2. Normalisasi Pola Otomatis

Intlayer secara internal menormalkan semua sintaks pola (misalnya mengonversi `[param]` menjadi `:param`) sehingga pemacokan tetap konsisten terlepas dari framework sumber.

### 3. URL Otoritatif untuk SEO

Dengan menegakkan pengalihan dari jalur kanonik ke alias yang lebih rapi (pretty aliases), Intlayer mencegah masalah konten duplikat dan meningkatkan keterlihatan situs.

## Utilitas Inti

- `getLocalizedUrl(url, locale)`: Menghasilkan URL terlokalisasi yang mematuhi aturan penulisan ulang.
- `getCanonicalPath(path, locale)`: Menyelesaikan URL terlokalisasi kembali ke jalur kanonik internalnya.
- `getRewritePath(pathname, locale)`: Mendeteksi apakah sebuah pathname perlu dikoreksi ke alias terlokalisasi yang lebih rapi.

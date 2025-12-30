---
createdAt: 2025-11-20
updatedAt: 2025-12-30
title: Cara menerjemahkan aplikasi SvelteKit Anda – panduan i18n 2026
description: Temukan cara membuat situs web SvelteKit Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya menggunakan Server-Side Rendering (SSR).
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Tambahkan perintah init
  - version: 7.1.10
    date: 2025-11-20
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web SvelteKit Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) sumber terbuka yang inovatif, dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern. Ini bekerja mulus dengan kemampuan Server-Side Rendering (SSR) dari **SvelteKit**.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata**, rute, dan konten secara dinamis.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis.
- **Memanfaatkan SSR SvelteKit** untuk internasionalisasi yang ramah SEO.

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi SvelteKit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Untuk memulai, buat proyek SvelteKit baru. Berikut adalah struktur akhir yang akan kita buat:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Langkah 1: Instalasi Dependencies

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: Paket inti i18n.
- **svelte-intlayer**: Menyediakan context providers dan stores untuk Svelte/SvelteKit.
- **vite-intlayer**: Plugin Vite untuk mengintegrasikan deklarasi konten dengan proses build.

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi di root proyek Anda:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Vite Anda

Perbarui `vite.config.ts` Anda untuk menyertakan plugin Intlayer. Plugin ini menangani transpile file konten Anda.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // urutan penting, Intlayer harus ditempatkan sebelum SvelteKit
});
```

### Langkah 4: Deklarasikan Konten Anda

Buat file deklarasi konten Anda di mana saja dalam folder `src` Anda (misalnya, `src/lib/content` atau di samping komponen Anda). File-file ini mendefinisikan konten yang dapat diterjemahkan untuk aplikasi Anda menggunakan fungsi `t()` untuk setiap locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Langkah 5: Gunakan Intlayer dalam Komponen Anda

Sekarang Anda dapat menggunakan fungsi `useIntlayer` di komponen Svelte mana pun. Fungsi ini mengembalikan store reaktif yang secara otomatis diperbarui saat locale berubah. Fungsi ini akan secara otomatis menghormati locale saat ini (baik selama SSR maupun navigasi sisi klien).

> **Catatan:** `useIntlayer` mengembalikan store Svelte, jadi Anda perlu menggunakan prefix `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: Cara menerjemahkan aplikasi SvelteKit Anda – panduan i18n 2025
> description: Temukan cara membuat situs web SvelteKit Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya menggunakan Server-Side Rendering (SSR).
> keywords:

- Internasionalisasi
- Dokumentasi
- Intlayer
- SvelteKit
- JavaScript
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Inisialisasi riwayat

---

# Terjemahkan situs web SvelteKit Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) sumber terbuka yang inovatif, dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern. Ini bekerja mulus dengan kemampuan Server-Side Rendering (SSR) dari **SvelteKit**.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata**, rute, dan konten secara dinamis.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis.
- **Memanfaatkan SSR SvelteKit** untuk internasionalisasi yang ramah SEO.

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi SvelteKit

Untuk memulai, buat proyek SvelteKit baru. Berikut adalah struktur akhir yang akan kita buat:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Langkah 1: Instalasi Dependencies

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: Paket inti i18n.
- **svelte-intlayer**: Menyediakan context providers dan stores untuk Svelte/SvelteKit.
- **vite-intlayer**: Plugin Vite untuk mengintegrasikan deklarasi konten dengan proses build.

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi di root proyek Anda:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Vite Anda

Perbarui `vite.config.ts` Anda untuk menyertakan plugin Intlayer. Plugin ini menangani transpile file konten Anda.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // urutan penting, Intlayer harus ditempatkan sebelum SvelteKit
});
```

### Langkah 4: Deklarasikan Konten Anda

Buat file deklarasi konten Anda di mana saja dalam folder `src` Anda (misalnya, `src/lib/content` atau di samping komponen Anda). File-file ini mendefinisikan konten yang dapat diterjemahkan untuk aplikasi Anda menggunakan fungsi `t()` untuk setiap locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Langkah 5: Gunakan Intlayer dalam Komponen Anda

untuk mengakses nilai reaktifnya (misalnya, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" sesuai dengan key yang didefinisikan di Langkah 4
  const content = useIntlayer("hero-section");
</script>

<!-- Render konten sebagai konten sederhana  -->
<h1>{$content.title}</h1>
<!-- Untuk merender konten yang dapat diedit menggunakan editor -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Untuk merender konten sebagai string -->
<div aria-label={$content.title.value}></div>
```

### (Opsional) Langkah 6: Atur routing

Langkah-langkah berikut menunjukkan cara mengatur routing berbasis locale di SvelteKit. Ini memungkinkan URL Anda menyertakan prefix locale (misalnya, `/en/about`, `/fr/about`) untuk SEO yang lebih baik dan pengalaman pengguna yang lebih baik.

```bash
.
└─── src
    ├── app.d.ts                  # Mendefinisikan tipe locale
    ├── hooks.server.ts           # Mengelola routing locale
    ├── lib
    │   └── getLocale.ts          # Memeriksa locale dari header, cookies
    ├── params
    │   └── locale.ts             # Mendefinisikan parameter locale
    └── routes
        ├── [[locale=locale]]     # Bungkus dalam grup route untuk mengatur locale
        │   ├── +layout.svelte    # Tata letak lokal untuk rute
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Tata letak root untuk font dan gaya global
```

### Langkah 7: Tangani Deteksi Locale di Server (Hooks)

Di SvelteKit, server perlu mengetahui locale pengguna untuk merender konten yang benar selama SSR. Kita menggunakan `hooks.server.ts` untuk mendeteksi locale dari URL atau cookie.

Buat atau modifikasi `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Periksa apakah path saat ini sudah diawali dengan locale (misal /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Jika TIDAK ada locale dalam URL (misal pengguna mengunjungi "/"), arahkan ulang mereka
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Redirect sementara
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Kemudian, buat helper untuk mendapatkan locale pengguna dari event request:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Mendapatkan locale pengguna dari event request.
 * Fungsi ini digunakan dalam hook `handle` di `src/hooks.server.ts`.
 *
 * Pertama-tama mencoba mendapatkan locale dari penyimpanan Intlayer (cookies atau header khusus).
 * Jika locale tidak ditemukan, maka menggunakan fallback negosiasi "Accept-Language" dari browser.
 *
 * @param event - Event request dari SvelteKit
 * @returns Locale pengguna
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Mencoba mendapatkan locale dari penyimpanan Intlayer (Cookies atau header)
  const storedLocale = getLocaleFromStorage({
    // Akses cookie SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Akses header SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Cadangan ke negosiasi "Accept-Language" browser
  const negotiatorHeaders: Record<string, string> = {};

  // Mengonversi objek Headers SvelteKit menjadi Record<string, string> biasa
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Periksa locale dari header `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Kembalikan locale default jika tidak ada yang cocok ditemukan
  return defaultLocale;
};
```

> `getLocaleFromStorage` akan memeriksa locale dari header atau cookie tergantung pada konfigurasi Anda. Lihat [Configuration](https://intlayer.org/doc/configuration) untuk detail lebih lanjut.

> Fungsi `localeDetector` akan memproses header `Accept-Language` dan mengembalikan kecocokan terbaik.

Jika locale tidak dikonfigurasi, kita ingin mengembalikan error 404. Untuk mempermudah, kita dapat membuat fungsi `match` untuk memeriksa apakah locale valid:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **Catatan:** Pastikan `src/app.d.ts` Anda menyertakan definisi locale:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Untuk file `+layout.svelte`, kita dapat menghapus semuanya, agar hanya menyimpan konten statis yang tidak terkait dengan i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Kemudian, buat halaman dan layout baru di bawah grup `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Gunakan tipe Load generik
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Inisialisasi Intlayer dengan locale dari route
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Gunakan kamus konten layout
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from 'svelte-intlayer';

	// Gunakan kamus konten home
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

### (Opsional) Langkah 8: Tautan Internasionalisasi

Untuk SEO, disarankan untuk menambahkan prefix locale pada rute Anda (misalnya, `/en/about`, `/fr/about`). Komponen ini secara otomatis menambahkan prefix locale saat ini pada setiap tautan.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Bantuan untuk menambahkan prefix URL dengan locale saat ini
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Jika Anda menggunakan `goto` dari SvelteKit, Anda dapat menggunakan logika yang sama dengan `getLocalizedUrl` untuk menavigasi ke URL yang sudah dilokalkan:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Menavigasi ke /en/about atau /fr/about tergantung locale
```

### (Opsional) Langkah 9: Pengalih Bahasa

Untuk memungkinkan pengguna mengganti bahasa, perbarui URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Akan mengatur locale di store dan memicu onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

### (Opsional) Langkah 10: Tambahkan proxy backend

Untuk menambahkan proxy backend ke aplikasi SvelteKit Anda, Anda dapat menggunakan fungsi `intlayerProxy` yang disediakan oleh plugin `vite-intlayer`. Plugin ini akan secara otomatis mendeteksi locale terbaik untuk pengguna berdasarkan URL, cookie, dan preferensi bahasa browser.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Opsional) Langkah 11: Mengatur editor / CMS intlayer

Untuk mengatur editor intlayer, Anda harus mengikuti [dokumentasi editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Untuk mengatur CMS intlayer, Anda harus mengikuti [dokumentasi CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

Untuk dapat memvisualisasikan selector editor intlayer, Anda harus menggunakan sintaks komponen dalam konten intlayer Anda.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Render konten sebagai konten sederhana -->
  <h1>{$content.title}</h1>

  <!-- Render konten sebagai komponen (diperlukan oleh editor) -->
  <svelte:component this={$content.component} />
</div>
```

### Konfigurasi Git

Disarankan untuk mengabaikan file-file yang dihasilkan oleh Intlayer.

```plaintext fileName=".gitignore"
# Abaikan file-file yang dihasilkan oleh Intlayer
.intlayer
```

---

### Melangkah Lebih Jauh

- **Editor Visual**: Integrasikan [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) untuk mengedit terjemahan langsung dari UI.
- **CMS**: Eksternalisasi manajemen konten Anda menggunakan [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

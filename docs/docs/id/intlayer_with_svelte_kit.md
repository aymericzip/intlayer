---
createdAt: 2025-11-20
updatedAt: 2026-05-31
title: "SvelteKit i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi SvelteKit multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
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
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Tambahkan perintah init"
  - version: 7.1.10
    date: 2025-11-20
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Terjemahkan situs web SvelteKit Anda menggunakan Intlayer | Internasionalisasi (i18n)

<Tabs defaultTab="code">
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `svelte-i18n` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>

<Accordion header="Cakupan penuh SvelteKit">

Intlayer dioptimalkan untuk bekerja sempurna dengan SvelteKit dengan menawarkan **perutean multibahasa**, **dukungan SSR**, dan semua fitur yang diperlukan untuk penskalaan internasionalisasi (i18n).

</Accordion>

<Accordion header="Ukuran bundle">

Daripada memuat file JSON berukuran besar ke halaman Anda, muat saja konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemampuan Pemeliharaan">

Mencakup konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi berskala besar. Anda dapat menduplikasi atau menghapus satu folder fitur tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **diketik sepenuhnya** untuk memastikan keakuratan konten Anda.

</Accordion>

<Accordion header="Agen AI">

Menempatkan konten bersama **mengurangi konteks yang diperlukan** dengan Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, dan **[agent skill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, untuk menjadikan pengalaman pengembang (DX) lebih lancar bagi agen AI.

</Accordion>

<Accordion header="Otomatisasi">

Gunakan otomatisasi untuk menerjemahkan dalam saluran CI/CD Anda menggunakan LLM pilihan Anda dengan biaya penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatiskan ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Pertunjukan">

Menghubungkan file JSON berukuran besar ke komponen dapat menyebabkan masalah kinerja dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada waktu pembuatan.

</Accordion>

<Accordion header="Menskalakan tanpa pengembang">

Lebih dari sekedar solusi i18n, Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** yang dihosting sendiri dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya menjadi lancar. Konten dapat disimpan secara lokal dan/atau jarak jauh.

</Accordion>
</AccordionGroup>

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

<Steps>

<Step number={1} title="Instalasi Dependencies">

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
bun x intlayer init
```

- **intlayer**: Paket inti i18n.
- **svelte-intlayer**: Menyediakan context providers dan stores untuk Svelte/SvelteKit.
- **vite-intlayer**: Plugin Vite untuk mengintegrasikan deklarasi konten dengan proses build.

</Step>

<Step number={2} title="Konfigurasi proyek Anda">

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

</Step>

<Step number={3} title="Integrasikan Intlayer dalam Konfigurasi Vite Anda">

Perbarui `vite.config.ts` Anda untuk menyertakan plugin Intlayer. Plugin ini menangani transpile file konten Anda.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // urutan penting, Intlayer harus ditempatkan sebelum SvelteKit
});
```

</Step>

<Step number={4} title="Deklarasikan Konten Anda">

Buat file deklarasi konten Anda di mana saja dalam folder `src` Anda (misalnya, `src/lib/content` atau di samping komponen Anda). File-file ini mendefinisikan konten yang dapat diterjemahkan untuk aplikasi Anda menggunakan fungsi `t()` untuk setiap locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

</Step>

<Step number={5} title="Gunakan Intlayer dalam Komponen Anda">

Sekarang Anda dapat menggunakan fungsi `useIntlayer` di komponen Svelte mana pun. Fungsi ini mengembalikan store reaktif yang secara otomatis diperbarui saat locale berubah. Fungsi ini akan secara otomatis menghormati locale saat ini (baik selama SSR maupun navigasi sisi klien).

> **Catatan:** `useIntlayer` mengembalikan store Svelte, jadi Anda perlu menggunakan prefix `---
> createdAt: 2025-11-20
> updatedAt: 2026-05-31
> title: Cara menerjemahkan aplikasi SvelteKit Anda – panduan i18n 2026
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

</Step>

</Steps>

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

<Steps>

<Step number={1} title="Instalasi Dependencies">

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
bun x intlayer init
```

- **intlayer**: Paket inti i18n.
- **svelte-intlayer**: Menyediakan context providers dan stores untuk Svelte/SvelteKit.
- **vite-intlayer**: Plugin Vite untuk mengintegrasikan deklarasi konten dengan proses build.

</Step>

<Step number={2} title="Konfigurasi proyek Anda">

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

</Step>

<Step number={3} title="Integrasikan Intlayer dalam Konfigurasi Vite Anda">

Perbarui `vite.config.ts` Anda untuk menyertakan plugin Intlayer. Plugin ini menangani transpile file konten Anda.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // urutan penting, Intlayer harus ditempatkan sebelum SvelteKit
});
```

</Step>

<Step number={4} title="Deklarasikan Konten Anda">

Buat file deklarasi konten Anda di mana saja dalam folder `src` Anda (misalnya, `src/lib/content` atau di samping komponen Anda). File-file ini mendefinisikan konten yang dapat diterjemahkan untuk aplikasi Anda menggunakan fungsi `t()` untuk setiap locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

</Step>

<Step number={5} title="Gunakan Intlayer dalam Komponen Anda">

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
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Untuk merender konten sebagai string -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="Atur routing" isOptional={true}>

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

</Step>

<Step number={7} title="Tangani Deteksi Locale di Server">

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

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
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
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// Gunakan tipe Load generik
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
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
	import { useIntlayer } from "svelte-intlayer";

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

</Step>

<Step number={8} title="Tautan Internasionalisasi" isOptional={true}>

Untuk SEO, disarankan untuk menambahkan prefix locale pada rute Anda (misalnya, `/en/about`, `/fr/about`). Komponen ini secara otomatis menambahkan prefix locale saat ini pada setiap tautan.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

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

</Step>

<Step number={9} title="Pengalih Bahasa" isOptional={true}>

Untuk memungkinkan pengguna mengganti bahasa, perbarui URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
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

</Step>

<Step number={10} title="Tambahkan proxy backend" isOptional={true}>

Untuk menambahkan proxy backend ke aplikasi SvelteKit Anda, Anda dapat menggunakan fungsi `intlayerProxy` yang disediakan oleh plugin `vite-intlayer`. Plugin ini akan secara otomatis mendeteksi locale terbaik untuk pengguna berdasarkan URL, cookie, dan preferensi bahasa browser.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="Mengatur editor / CMS intlayer" isOptional={true}>

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
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={1} title="Ekstrak konten komponen Anda" isOptional={true}>

Jika Anda memiliki basis kode yang ada, mengubah ribuan file bisa memakan waktu lama.

Untuk memudahkan proses ini, Intlayer mengusulkan [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mengubah komponen Anda dan mengekstrak kontennya.

Untuk mengaturnya, Anda dapat menambahkan bagian `compiler` di file `intlayer.config.ts` Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Sisa konfigurasi Anda
  compiler: {
    /**
     * Menunjukkan apakah compiler harus diaktifkan.
     */
    enabled: true,

    /**
     * Menentukan jalur file output
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Menunjukkan apakah komponen harus disimpan setelah diubah. Dengan begitu, compiler dapat dijalankan satu kali saja untuk mengubah aplikasi, lalu dapat dihapus.
     */
    saveComponents: false,

    /**
     * Prefiks kunci kamus
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Perintah ekstrak'>

Jalankan extractor untuk mengubah komponen Anda dan mengekstrak kontennya

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Compiler Babel'>

Perbarui `vite.config.ts` Anda untuk menyertakan plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Menambahkan plugin compiler
  ],
});
```

```bash packageManager="npm"
npm run build # Atau npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

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

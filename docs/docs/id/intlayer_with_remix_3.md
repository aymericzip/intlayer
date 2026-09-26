---
createdAt: 2026-09-09
updatedAt: 2026-09-21
priority: 9
title: "Remix 3 i18n - Panduan Lengkap Menerjemahkan Aplikasi Anda"
description: "Lupakan i18next. Panduan 2026 untuk membangun aplikasi Remix 3 multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, serta performa."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Standar Web
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Menggunakan middleware dan hook remix-intlayer"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Dokumentasi awal untuk Remix 3"
author: aymericzip
---

# Terjemahkan Situs Web Remix 3 Anda Menggunakan Intlayer | Internasionalisasi (i18n)

Panduan ini menunjukkan cara mengintegrasikan **Intlayer** untuk internasionalisasi yang mulus dalam aplikasi **Remix 3** dengan perutean berbasis bahasa, deklarasi konten yang aman secara tipe, komponen JSX yang dirender di server, serta dukungan lintas runtime di Node.js, Bun, Deno, dan Cloudflare Workers.

## Apa itu Remix 3?

**Remix 3** mewakili perubahan arsitektur fundamental menuju **kerangka kerja web modular dan agnostik runtime yang dibangun sepenuhnya di atas standar web**. Alih-alih terikat pada bundler tertentu atau API server proprietary, Remix 3 didistribusikan sebagai paket modular serbaguna:

- **`remix/fetch-router`** (atau `remix/router`): Perutean ringan yang mematuhi standar dan dibangun di atas Fetch API (`Request` dan `Response`).
- **`remix/ui`**: Model komponen JSX (`jsxImportSource: "remix/ui"`). Sebuah komponen adalah fungsi setup yang mengembalikan fungsi render, menerima props melalui handle bertipe.
- **`remix/middleware/render`**: Memasang `context.render(<Page />)` pada setiap permintaan, mengalirkan (streaming) pohon JSX ke HTML `Response`.
- **`remix/node-fetch-server`**: Adapter server untuk Node.js dengan dukungan bawaan untuk Bun, Deno, dan runtime edge.
- **`remix/cookie`**: Penguraian dan serialisasi cookie yang ditandatangani secara kriptografis.

Dikombinasikan dengan **Intlayer** dan paket **`remix-intlayer`**, middleware lokal plus hook `useIntlayer` / `useDictionary` / `useLocale` yang sama dengan `react-intlayer`, yang terikat pada konteks permintaan Remix, Anda mendapatkan sistem internasionalisasi lengkap yang menghadirkan keamanan saat kompilasi, terjemahan otomatis AI, rendering server tanpa beban tambahan, dan perutean lokal yang lancar.

## Daftar Isi

<TOC/>

## Mengapa Memilih Intlayer Dibandingkan Alternatif Lain?

Dibandingkan dengan solusi tradisional seperti `i18next` atau pemuat terjemahan kustom, Intlayer menawarkan pengalaman pengembang terintegrasi yang dioptimalkan untuk arsitektur web modern:

<AccordionGroup>
<Accordion header="Cakupan Penuh Remix 3 & Standar Web">

Intlayer dirancang untuk bekerja secara mulus dengan standar web (`Request`, `Response`, `Headers`, dan `URL`). `remix-intlayer` terhubung ke perute Fetch Remix 3 sebagai middleware ringan, mengekstrak lokal dari jalur URL, cookie, atau header `Accept-Language` dan mengeksposnya ke sisa permintaan, penangan, tampilan, dan komponen `remix/ui`, tanpa meneruskannya secara manual atau mengunci Anda ke runtime tertentu.

</Accordion>
<Accordion header="Deklarasi Konten yang Aman Secara Tipe">

Ucapkan selamat tinggal pada kunci JSON yang longgar dan error runtime akibat kunci yang hilang. Intlayer menerapkan pemeriksaan TypeScript di semua bahasa yang dideklarasikan, memperingatkan Anda saat build jika ada terjemahan yang hilang atau tidak valid.

</Accordion>
<Accordion header="Nol Overhead Bundle di Server">

Saat menggunakan komponen JSX yang dirender di server Remix 3, hanya teks yang diselesaikan untuk lokalitas yang diminta yang dialirkan ke output stream. Komponen berjalan sepenuhnya di server kecuali Anda secara eksplisit mengonfigurasi hidrasi klien melalui `clientEntry`. Secara default, tidak ada katalog terjemahan atau runtime hidrasi yang dikirim ke klien.

</Accordion>
<Accordion header="Siap untuk Agen AI & Otomasi">

Intlayer menempatkan deklarasi konten (`.content.ts`) bersama logika rute Anda, mengurangi konteks token yang dibutuhkan oleh Large Language Models (LLM). Perintah CLI bawaan seperti `intlayer fill` dan `intlayer test` memungkinkan Anda mengotomatiskan terjemahan dalam pipeline CI/CD dengan biaya langsung dari penyedia AI Anda.

</Accordion>
<Accordion header="Editor Visual & Integrasi CMS">

Di luar alur kerja berbasis kode, Intlayer menyediakan [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) mandiri dan [CMS Jarak Jauh](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), memungkinkan editor dan penerjemah memperbarui konten tanpa harus menerapkan ulang kode.

</Accordion>
</AccordionGroup>

## Panduan Langkah demi Langkah

<Tabs defaultTab="code">
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalkan Aplikasi Anda Menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Template Remix 3 Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-remix-3-template) di GitHub.

<Steps>
<Step number={1} title="Instal Dependensi">

Instal `intlayer`, `remix-intlayer`, dan `remix` (versi 3) menggunakan pengelola paket pilihan Anda:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: Mesin inti internasionalisasi yang menyediakan manajemen konfigurasi, deklarasi kamus (`t()`, `Dictionary`), alat CLI, dan penerjemah runtime.
- **`remix-intlayer`**: Integrasi Remix 3: middleware perute `intlayer()` yang menyelesaikan lokal setiap permintaan, dan hook `useIntlayer`, `useDictionary`, dan `useLocale` yang membacanya di mana pun setelahnya.
- **`remix`**: Paket kerangka kerja terpadu Remix 3 yang mengekspor `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render`, dan `remix/node-fetch-server`.

</Step>
<Step number={2} title="Konfigurasikan Intlayer">

### Arsitektur

Dalam arsitektur ini, middleware `intlayer()` dari `remix-intlayer` didaftarkan di `createRouter()` sebelum middleware `render()`. Middleware ini menghapus awalan locale sebelum router mencocokkan, sehingga rute dideklarasikan sekali di `src/routes.ts` tanpa segmen `:locale`, dan menjalankan sisa permintaan di dalam cakupan `AsyncLocalStorage`, yang memungkinkan `useIntlayer` / `useLocale` membaca locale tanpa argumen di route handler dan tampilan `remix/ui`. Deklarasi konten ditempatkan bersama tampilan Anda di `src/`:

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Konfigurasi

Buat file `intlayer.config.ts` di root proyek Anda untuk mendeklarasikan bahasa yang didukung dan pengaturan internasionalisasi:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.INDONESIAN,
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
      Locales.INDONESIAN,
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
      Locales.INDONESIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Untuk pengaturan konfigurasi tambahan, silakan merujuk ke [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>
<Step number={3} title="Deklarasikan Konten Multibahasa Anda">

Deklarasikan konten lokal Anda dalam file `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      id: "Selamat datang di Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      id: "Aplikasi modular berbasis standar web dengan dukungan i18n bawaan.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      id: "Ganti bahasa:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer juga mendukung format JSON, YAML, dan CommonJS. Lihat [Dokumentasi Deklarasi Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

</Step>
<Step number={4} title="Bangun Kamus Intlayer">

Kompilasi definisi kamus untuk menghasilkan tipe TypeScript dan registri runtime:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Ini mengompilasi konten Anda ke dalam direktori artefak `.intlayer`, memungkinkan pelengkapan otomatis TypeScript penuh dan pencarian kamus yang cepat.

</Step>
<Step number={5} title="Tambahkan Middleware Intlayer">

Remix 3 menyediakan pipa middleware yang dapat disusun melalui `createRouter({ middleware: [...] })`.

`remix-intlayer` menyediakan middleware `intlayer()`. Untuk setiap permintaan masuk, ia menyelesaikan lokal menggunakan:

1. URL, dalam setiap mode perutean kecuali `no-prefix`: awalan jalur (mis. `/id` atau `/en`) atau parameter pencarian `?locale=`.
2. Lokal yang disimpan oleh klien: cookie penyimpanan (`INTLAYER_LOCALE`) atau header kustom (`x-intlayer-locale`).
3. Negosiasi standar `Accept-Language`, kembali ke `defaultLocale` yang Anda konfigurasikan.

Hasilnya disimpan dalam konteks permintaan Remix sebagai `context.intlayer` (atau `context.get(Intlayer)`), dengan `locale`, `defaultLocale`, dan `availableLocales`. Middleware kemudian menjalankan sisa permintaan di dalam cakupan `AsyncLocalStorage` yang terikat pada konteks tersebut, yang memungkinkan hook dari paket membaca lokal tanpa argumen, baik di penangan rute, tampilan, maupun komponen `remix/ui`:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// Di mana saja setelah middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` atau `useIntlayer("faq", { item: 2 })` mengganti lokal permintaan untuk satu panggilan, dan `useDictionary(homeContent)` membaca kamus yang diimpor alih-alih kunci. Di luar permintaan, hook kembali ke lokal default.

> Middleware juga menyiapkan kamus Intlayer saat server dimulai, sehingga `intlayer build` yang terlewat tidak membiarkan registri kosong.

</Step>
<Step number={6} title="Definisikan Rute yang Aman Secara Tipe">

Definisikan rute aplikasi Anda menggunakan `route()` dari `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Rute bahasa default
  home: "/",

  // Rute terlokalisasi dengan segmen dinamis :locale
  localizedHome: "/:locale",
});
```

Menggunakan `route()` memberikan pembuatan URL yang aman secara tipe di seluruh aplikasi Anda:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "id" }); // "/id"
```

</Step>
<Step number={7} title="Render Halaman Terlokalisasi dengan JSX">

Remix 3 menggunakan `remix/ui` untuk komponen JSX. Sebuah komponen adalah **fungsi setup** yang mengembalikan **fungsi render**. Props diteruskan melalui `handle` yang bertipe (misalnya, `handle.props.locale`):

Mulailah dengan shell `Document` bersama yang menyetel atribut `<html lang="..." dir="...">` dari lokal yang diselesaikan oleh middleware:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Kemudian buat halaman beranda. Halaman ini membaca kamus yang dilokalkan dengan `useIntlayer` dan merender pengalih bahasa:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX bukanlah React: `class` ditulis apa adanya (`className` juga diterima), dan render ulang dipicu secara eksplisit dengan `handle.update()`. Nilai yang diinterpolasi otomatis lolos (escaped). Hook Intlayer adalah fungsi biasa yang membaca cakupan permintaan, sehingga dapat dipanggil dari fungsi setup atau fungsi render.

</Step>
<Step number={8} title="Hubungkan Router dan Server">

Buat `src/router.tsx` untuk mendaftarkan middleware dan menentukan aksi rute. Gunakan `remix/middleware/render` untuk memasang utilitas `context.render()`, dan teruskan komponen JSX Anda secara langsung:

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` menerima `ResponseInit` opsional sebagai argumen kedua, mis. `context.render(<NotFoundPage />, { status: 404 })`. Lokal yang diselesaikan tetap dapat dijangkau dari penangan sebagai `context.intlayer.locale`, misalnya untuk membangun respons `Response.json`.

Sekarang hubungkan `src/server.ts` menggunakan `remix/node-fetch-server` untuk Node.js (atau ekspor handler `fetch` secara langsung untuk Bun, Deno, atau Cloudflare Workers):

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Server HTTP Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Ekspor Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Audit dan Isi Terjemahan Otomatis">

Intlayer menyediakan CLI untuk mengaudit terjemahan yang hilang dan mengisinya secara otomatis menggunakan AI:

```bash packageManager="npm"
# Audit terjemahan yang hilang
npx intlayer test

# Isi terjemahan yang hilang menggunakan AI
npx intlayer fill
```

```bash packageManager="pnpm"
# Audit terjemahan yang hilang
pnpm dlx intlayer test

# Isi terjemahan yang hilang menggunakan AI
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Audit terjemahan yang hilang
yarn dlx intlayer test

# Isi terjemahan yang hilang menggunakan AI
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Audit terjemahan yang hilang
bun x intlayer test

# Isi terjemahan yang hilang menggunakan AI
bun x intlayer fill
```

</Step>
</Steps>

## Konfigurasi TypeScript

Konfigurasikan `tsconfig.json` untuk mengarahkan JSX ke runtime `remix/ui` dan menyertakan tipe `.intlayer` yang dihasilkan:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` adalah apa yang membuat `<HomePage />` diselesaikan ke `createElement` milik Remix dan bukan React. Tidak ada runtime React yang dimuat.

## Kesimpulan

Dengan Remix 3 dan Intlayer, Anda memiliki tumpukan teknologi yang ramping, sepenuhnya bertipe, dan portabel yang mematuhi standar web terbuka. Aplikasi Anda dapat diskalakan dengan mudah dari halaman pemasaran lokal sederhana hingga layanan terdistribusi global yang dirender di edge.

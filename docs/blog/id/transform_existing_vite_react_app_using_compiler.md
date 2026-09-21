---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "Cara Membuat Multibahasa (i18n) Aplikasi Vite dan React yang Sudah Ada Setelahnya (Panduan i18n 2026)"
description: "Panduan 2026 untuk menambahkan dukungan multibahasa (i18n) pada aplikasi Vite dan React yang sudah berjalan tanpa refaktor rumit. Ekstraksi otomatis, terjemahan AI, dan bundle optimal dengan Intlayer."
keywords:
  - Vite i18n
  - React i18n
  - Internasionalisasi
  - Terjemahkan aplikasi Vite yang sudah ada
  - Terjemahkan aplikasi React yang sudah ada
  - Intlayer
  - Multibahasa
  - Kompilator
  - Terjemahan AI
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# Cara Membuat Multibahasa (i18n) Aplikasi Vite dan React yang Sudah Ada Setelahnya (Panduan i18n 2026)

Menambahkan internasionalisasi (i18n) ke proyek Vite dan React sejak hari pertama relatif mudah. Namun bagaimana jika Anda sudah memiliki aplikasi produksi yang matang dalam satu bahasa dan harus menjadikannya multibahasa **setelahnya**?

Dengan pustaka tradisional seperti `react-i18next` atau `react-intl`, proses ini sering kali melelahkan:

- Mencari string teks hardcode di ratusan file JSX dan TSX secara manual.
- Membuat file JSON bertingkat dan mengarang kunci terjemahan arbitrer (`components.header.title`, dll.).
- Mengganti teks antarmuka dengan pemanggilan hook yang rumit (`t('...')`).
- Menata ulang perutean di sisi klien, manajemen state, dan logika pergantian bahasa.

Di tahun 2026, Anda tidak perlu menulis ulang kode Anda. Bersama **Intlayer**, Anda dapat mengintegrasikan internasionalisasi ke dalam aplikasi Vite dan React yang sudah ada dalam hitungan menit menggunakan ekstraksi otomatis, terjemahan AI, dan integrasi mulus dengan Vite.

> Mencari panduan teknis langkah demi langkah untuk Vite dan React? Lihat dokumentasi kami: [Terjemahkan Vite dan React dengan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md).

## Daftar Isi

<TOC/>

## Dilema Retrofit: Mengapa Menambahkan i18n pada Aplikasi yang Ada Begitu Sulit

Pengembang menghadapi tiga tantangan utama saat menginternasionalisasi aplikasi Vite dan React yang ada:

1. **Gangguan Basis Kode**: Mengekstraksi string secara manual ke dalam kamus JSON mengharuskan perubahan pada hampir setiap komponen. Ini menghasilkan diff git yang masif, risiko konflik penggabungan, dan potensi regresi tata letak.
2. **Beban Pengelolaan Kunci**: Mengarang kunci seperti `dashboard.hero.ctaButton` untuk setiap cuplikan teks memperlambat pengembangan dan membebani pikiran setiap kali ada perubahan teks.
3. **Pekerjaan Terjemahan yang Melelahkan**: Setelah string diekstraksi, mengisi kamus untuk 5, 10, atau 20 bahasa memerlukan salin-tempel tanpa akhir atau layanan lokalisasi eksternal yang mahal.

Intlayer menyelesaikan kendala ini di tingkat arsitektur dengan **ekstraksi berbantuan kompilator**, **kamus deklaratif per komponen**, dan **integrasi bawaan dengan Vite**.

## Ekstraksi Konten Otomatis (Tanpa Pencarian Teks Manual)

Daripada mengekstrak setiap string secara manual dari JSX Anda, Intlayer menyediakan dua jalur tanpa hambatan:

### Opsi A: Alat Ekstraktor CLI (`npx intlayer extract`)

Anda dapat menjalankan alat ekstraksi Intlayer langsung di basis kode Anda:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

Perintah ini memindai komponen React Anda, mendeteksi teks yang ditampilkan kepada pengguna, dan secara otomatis membuat file deklarasi konten (`.content.ts`) tepat di samping setiap komponen. Logika komponen tetap deklaratif, bersih, dan bertipe aman tanpa harus menulis satu kunci pun dengan tangan.

### Opsi B: Kompilator Intlayer (Ekstraksi Saat Build)

Dengan kompilator Intlayer diaktifkan dalam konfigurasi, Anda dapat terus menulis komponen menggunakan teks biasa dalam bahasa default. Saat build, kompilator mengekstrak teks dan menyuntikkan konten yang dilokalkan secara otomatis:

```tsx fileName="src/App.tsx"
// Tulis kode React biasa. Kompilator mengekstrak teks secara otomatis
export default function App() {
  return (
    <section>
      <h1>Selamat datang di platform kami</h1>
      <p>Mulai jelajahi fitur modern kami hari ini.</p>
    </section>
  );
}
```

Di balik layar, Intlayer menyusun kamus dan menghubungkan komponen ke konten terjemahannya, menghilangkan langkah refaktor manual sepenuhnya.

Dalam hal ini, file deklarasi `src/App.content.ts` akan dihasilkan dengan struktur berikut:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    selamatDatangDiPlatformKami: t({
      id: "Selamat datang di platform kami",
    }),
    mulaiJelajahiFiturModernKami: t({
      id: "Mulai jelajahi fitur modern kami hari ini.",
    }),
  },
};

export default content;
```

## Terjemahan Bertenaga AI dengan LLM Favorit Anda

Setelah konten diekstraksi, menerjemahkannya ke puluhan bahasa tidak memerlukan waktu berhari-hari. Intlayer menyertakan CLI terjemahan AI bawaan yang terhubung langsung ke OpenAI, Anthropic, DeepSeek, atau Mistral menggunakan kunci API Anda:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

Konfigurasikan bahasa dan penyedia AI di `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.INDONESIAN,
    ],
    defaultLocale: Locales.INDONESIAN,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Aplikasi SaaS modern dan dasbor yang dibangun menggunakan Vite dan React",
  },
};

export default config;
```

Menjalankan `npx intlayer fill` akan mengisi deklarasi konten Anda dengan terjemahan berkualitas tinggi untuk semua bahasa yang dikonfigurasi:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    selamatDatangDiPlatformKami: t({
      id: "Selamat datang di platform kami",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    mulaiJelajahiFiturModernKami: t({
      id: "Mulai jelajahi fitur modern kami hari ini.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

Karena Intlayer memberikan `applicationContext` kepada model, hasil terjemahan mempertahankan konteks teknis, nada merek, dan nuansa tata bahasa jauh lebih baik daripada alat penerjemah umum.

Untuk memverifikasi bahwa tidak ada teks yang terlewat sebelum rilis:

```bash
npx intlayer test
```

## Integrasi Vite dan Penyiapan Provider

Mengintegrasikan Intlayer ke dalam Vite hanya membutuhkan penambahan plugin di `vite.config.ts` dan membungkus komponen akar dengan `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Sejak Intlayer v9, kompilator sudah dibundel langsung di dalam plugin `intlayer()` dan akan aktif secara otomatis begitu `compiler.enabled` disetel di `intlayer.config.ts`.

Bungkus aplikasi Anda dengan `IntlayerProvider` di komponen akar:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Mengubah Bahasa Secara Dinamis

Ganti bahasa dengan mudah di bagian mana pun dalam aplikasi menggunakan hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## SEO Multibahasa (Sitemap dan Robots.txt)

Intlayer menyertakan format seperti `generateSitemap` dan `getMultilingualUrls` yang menghasilkan file `sitemap.xml` dan `robots.txt` multibahasa yang ramah mesin pencari untuk penerapan Vite statis:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("File SEO berhasil dibuat.");
```

Tambahkan hook `prebuild` ke `package.json` Anda untuk menjalankan skrip ini sebelum `vite build`:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Pembahasan Mendalam: Siap untuk Penerapan Langkah demi Langkah?

Panduan ini memberikan gambaran konseptual tentang cara menambahkan internasionalisasi ke aplikasi Vite dan React yang ada di tahun 2026 tanpa kendala arsitektur.

Jika Anda siap mengonfigurasi setiap bagian aplikasi secara mendalam, termasuk keamanan tipe TypeScript yang ketat, kamus dinamis, dan editor visual, kunjungi panduan dokumentasi lengkap kami:

👉 **[Panduan Lengkap Menerjemahkan Vite dan React dengan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)**

## Pertanyaan yang Sering Diajukan (FAQ)

<FAQ>

<Question title="Bisakah saya membuat aplikasi Vite dan React multibahasa tanpa merefaktor semua string secara manual?">

Ya. Anda dapat menggunakan `npx intlayer extract` untuk secara otomatis mendeteksi dan mengekstrak string hardcode ke dalam file deklarasi konten lokal, atau menggunakan kompilator Intlayer untuk mengubah komponen pada waktu build sembari tetap menulis JSX standar.

</Question>
<Question title="Bagaimana Intlayer mengurangi ukuran bundle Vite dibandingkan dengan react-i18next atau react-intl?">

Intlayer menggunakan definisi kamus per komponen dan optimalisasi makro pada waktu build. Bundle Anda hanya menerima teks yang benar-benar dibutuhkan oleh komponen yang ditampilkan di layar, alih-alih mengimpor seluruh file JSON namespace. Kamus dinamis juga memungkinkan pemuatan bahasa secara bertahap saat dibutuhkan.

</Question>
<Question title="Bisakah saya menggunakan AI untuk menerjemahkan komponen yang ada ke dalam banyak bahasa?">

Ya. CLI Intlayer menyertakan perintah `npx intlayer fill` yang terhubung ke penyedia AI pilihan Anda (OpenAI, Anthropic, Mistral, DeepSeek) untuk menghasilkan terjemahan kontekstual di seluruh proyek.

</Question>
<Question title="Bisakah saya bermigrasi dari react-i18next atau react-intl tanpa menulis ulang komponen?">

Ya. Intlayer menyediakan adaptor kompatibilitas untuk `react-i18next` dan `react-intl`, serta plugin untuk menyinkronkan file terjemahan JSON yang sudah ada secara dua arah (`sync-json`).

</Question>

</FAQ>

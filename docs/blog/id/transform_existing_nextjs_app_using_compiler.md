---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "Cara Membuat Multibahasa (i18n) Aplikasi Next.js yang Sudah Ada Setelahnya (Panduan i18n 2026)"
description: "Panduan 2026 untuk menambahkan dukungan multibahasa (i18n) pada aplikasi Next.js yang sudah berjalan tanpa refaktor rumit. Ekstraksi otomatis, terjemahan AI, dan routing dengan Intlayer."
keywords:
  - Next.js i18n
  - Internasionalisasi
  - Terjemahkan aplikasi Next.js yang sudah ada
  - Next.js 16
  - Intlayer
  - Multibahasa
  - React i18n
  - Kompilator
  - Terjemahan AI
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
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

# Cara Membuat Multibahasa (i18n) Aplikasi Next.js yang Sudah Ada Setelahnya (Panduan i18n 2026)

Menambahkan internasionalisasi (i18n) ke proyek Next.js sejak awal relatif mudah. Namun bagaimana jika Anda sudah memiliki aplikasi Next.js produksi yang matang dalam satu bahasa dan harus menjadikannya multibahasa **setelahnya**?

Dengan pustaka tradisional seperti `next-intl` atau `next-i18next`, ini adalah mimpi buruk:

- Mencari string teks hardcode di ratusan file JSX/TSX.
- Membuat file JSON bertingkat dan mengarang kunci terjemahan (`pages.dashboard.header.title`).
- Mengganti teks dengan pemanggilan hook (`t('...')`).
- Mengubah struktur `app/` menjadi `app/[locale]/...`, yang merusak URL yang sudah ada dan SEO.

Di tahun 2026, Anda tidak perlu menulis ulang kode Anda. Bersama **Intlayer**, Anda dapat mengintegrasikan i18n dalam hitungan menit menggunakan ekstraksi otomatis, terjemahan AI, dan perutean non-invasif.

> Mencari panduan teknis langkah demi langkah untuk Next.js 16 App Router? Lihat dokumentasi kami: [Terjemahkan Next.js 16 dengan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md).

## Daftar Isi

<TOC/>

## Dilema Retrofit: Mengapa Menambahkan i18n pada Aplikasi yang Ada Begitu Sulit

Tiga tantangan utama:

1. **Kerusakan Basis Kode**: Memindahkan teks ke kamus JSON mengharuskan modifikasi hampir setiap komponen.
2. **Keterikatan Routing**: Pustaka i18n lama memaksa Anda memindahkan halaman ke segmen dinamis `[locale]`.
3. **Pekerjaan Terjemahan yang Melelahkan**: Menyalin dan menerjemahkan kamus ke banyak bahasa.

Intlayer menyelesaikan semua ini dengan **ekstraksi berbantuan kompilator**, **kamus deklaratif**, dan **routing fleksibel**.

## Ekstraksi Konten Otomatis (Tanpa Pencarian Manual)

### Opsi A: Ekstraktor CLI (`npx intlayer extract`)

Jalankan alat ekstraksi Intlayer langsung di kode Anda:

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

Perintah ini akan membuat file deklarasi (`.content.ts`) tepat di samping komponen Anda.

### Opsi B: Kompilator Intlayer (Ekstraksi Saat Build)

Tulis teks biasa di komponen Anda. Saat build, kompilator mengekstrak teks dan menyuntikkan konten terlokalisasi:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

Di balik layar, Intlayer menyusun kamus dan menghubungkan komponen ke konten terlokalisasi, menghilangkan proses refaktor manual sepenuhnya.

Dalam hal ini, file `src/app/page.content.ts` akan dibuat dengan konten berikut:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## Terjemahan AI dengan LLM Pilihan Anda

Terjemahkan dalam hitungan detik menggunakan OpenAI, Anthropic, DeepSeek, atau Mistral:

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

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Dashboard SaaS untuk produktivitas dan kolaborasi tim",
  },
};

export default config;
```

Menjalankan `npx intlayer fill` akan mengisi deklarasi `.content.ts` Anda dengan terjemahan untuk semua bahasa yang dikonfigurasi secara otomatis:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      id: "Selamat Datang di Platform Kami",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      id: "Mulai jelajahi fitur modern kami hari ini.",
    }),
  },
};

export default content;
```

Karena Intlayer memberikan `applicationContext` tingkat tinggi ke LLM, terjemahan yang dihasilkan mempertahankan nuansa teknis, gaya bahasa brand, dan konteks tata bahasa jauh lebih baik daripada alat otomatis konvensional.

Untuk memverifikasi bahwa tidak ada teks yang terlewat sebelum rilis ke produksi:

```bash
npx intlayer test
```

## Routing Multibahasa Tanpa Merusak URL yang Ada

Intlayer mendukung:

- **Mode Parameter / Cookie (`search-params`)**: Pertahankan struktur folder tanpa memindahkan apa pun ke `[locale]`.
- **Mode Awalan (`prefix` / `prefix-all-locales`)**: Dukungan penuh rute URL yang ramah SEO.

Konfigurasikan integrasi Next.js Anda dalam hitungan detik:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

Bungkus root layout Anda dengan `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## SEO Multibahasa

Menghasilkan metadata lokal dan tag `hreflang` otomatis untuk visibilitas global:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## Pelajari Lebih Lanjut: Siap untuk Panduan Langkah demi Langkah?

Untuk panduan teknis lengkap termasuk middleware, SSG (`generateStaticParams`), dan Server Components, kunjungi dokumentasi resmi:

👉 **[Panduan Lengkap Menerjemahkan Next.js 16 dengan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)**

## Pertanyaan yang Sering Diajukan (FAQ)

<FAQ>

<Question title="Bisakah saya membuat aplikasi Next.js multibahasa tanpa memindahkan file ke app/[locale]?">

Bisa. Intlayer mendukung `routing.mode: "search-params"` serta deteksi cookie/header tanpa mengubah struktur folder Anda.

</Question>
<Question title="Apakah saya harus mengganti semua teks kode secara manual?">

Tidak. Gunakan `npx intlayer extract` atau kompilator Intlayer untuk mengekstrak konten secara otomatis.

</Question>
<Question title="Bagaimana Intlayer mengurangi ukuran bundle dibandingkan next-intl?">

Dengan pemaketan modular per-komponen dan optimasi makro saat proses build.

</Question>
<Question title="Bisakah saya menggunakan AI untuk menerjemahkan komponen yang ada?">

Bisa. Perintah `npx intlayer fill` terhubung dengan penyedia AI untuk menerjemahkan teks sesuai konteks.

</Question>
</FAQ>

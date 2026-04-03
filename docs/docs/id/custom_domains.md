---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Domain Kustom
description: Pelajari cara mengonfigurasi perutean lokal berbasis domain di Intlayer untuk menyajikan berbagai lokal dari nama host khusus.
keywords:
  - Domain Kustom
  - Perutean Domain
  - Perutean
  - Internasionalisasi
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Tambahkan perutean lokal berbasis domain melalui konfigurasi routing.domains."
---

# Domain Kustom

Intlayer mendukung perutean lokal berbasis domain, yang memungkinkan Anda menyajikan lokal tertentu dari nama host khusus. Misalnya, pengunjung dari Tiongkok dapat diarahkan ke `intlayer.zh` daripada `intlayer.org/zh`.

## Cara Kerjanya

Peta `domains` di dalam `routing` mengaitkan setiap lokal dengan nama host. Intlayer menggunakan peta ini di dua tempat:

1. **Pembuatan URL** (`getLocalizedUrl`): saat lokal target berada pada domain yang _berbeda_ dari halaman saat ini, URL absolut akan dikembalikan (misalnya `https://intlayer.zh/about`). Saat kedua domain cocok, URL relatif akan dikembalikan (misalnya `/fr/about`).
2. **Proksi server** (Next.js & Vite): permintaan masuk akan dialihkan atau ditulis ulang berdasarkan domain tempat mereka tiba.

### Domain eksklusif vs. bersama

Perbedaan utamanya adalah **eksklusivitas**:

- **Domain eksklusif** — hanya satu lokal yang memetakan ke nama host tersebut (misalnya `zh → intlayer.zh`). Domain itu sendiri bertindak sebagai pengidentifikasi lokal, sehingga tidak ada awalan lokal yang ditambahkan ke jalur. `https://intlayer.zh/about` menyajikan konten bahasa Mandarin.
- **Domain bersama** — beberapa lokal memetakan ke nama host yang sama (misalnya `en` dan `fr` keduanya memetakan ke `intlayer.org`). Perutean berbasis awalan normal berlaku. `intlayer.org/fr/about` menyajikan konten bahasa Prancis.

## Konfigurasi

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Domain bersama — en dan fr menggunakan perutean awalan pada intlayer.org
      en: "intlayer.org",
      // Domain eksklusif — zh memiliki nama host sendiri, tidak perlu awalan /zh/
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Lokal yang tidak tercantum dalam `domains` terus menggunakan perutean awalan standar tanpa penggantian domain apa pun.

## Pembuatan URL

`getLocalizedUrl` secara otomatis menghasilkan jenis URL yang benar berdasarkan konteks pemanggilan.

### Lokal domain yang sama (URL relatif)

```ts
// Halaman saat ini: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about" (lokal default, tanpa awalan)
```

### Lokal lintas domain (URL absolut)

```ts
// Halaman saat ini: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about" (domain eksklusif, tanpa awalan /zh/)
```

### Menyajikan dari domain lokal itu sendiri

```ts
// Halaman saat ini: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about" (sudah berada di domain yang benar — URL relatif)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about" (tautan lintas domain kembali ke intlayer.org)
```

### Deteksi otomatis domain saat ini

`currentDomain` bersifat opsional. Jika dihilangkan, `getLocalizedUrl` menyelesaikannya dalam urutan ini:

1. Nama host dari URL input absolut (misalnya `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` di lingkungan peramban.
3. Jika keduanya tidak tersedia (SSR tanpa opsi eksplisit), URL relatif akan dikembalikan untuk lokal domain yang sama dan tidak ada URL absolut yang dihasilkan — ini adalah fallback yang aman.

```ts
// Peramban — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about" (dideteksi otomatis dari jendela)

// Dari URL absolut — domain terdeteksi secara otomatis
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` dengan domain

`getMultilingualUrls` memanggil `getLocalizedUrl` untuk setiap lokal, sehingga menghasilkan campuran URL relatif dan absolut tergantung pada domain pemanggil:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

URL absolut ini siap digunakan dalam tag `<link rel="alternate" hreflang="...">` untuk SEO.

## Perilaku Proksi

### Next.js

Middleware `intlayerProxy` menangani perutean domain secara otomatis. Tambahkan ke `middleware.ts` Anda:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Redirect** — permintaan tiba di domain yang salah untuk awalan lokal tertentu:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Rewrite** — permintaan tiba di domain eksklusif lokal tanpa awalan:

```
GET intlayer.zh/about
→ tulis ulang ke /zh/about (hanya perutean internal Next.js, URL tetap bersih)
```

### Vite

Plugin Vite `intlayerProxy` menerapkan logika yang sama selama pengembangan:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Catatan**: dalam pengembangan lokal Anda biasanya menggunakan `localhost`, sehingga pengalihan lintas domain akan mengarah ke domain langsung alih-alih port lokal lainnya. Gunakan penggantian file hosts (misalnya `127.0.0.1 intlayer.zh`) atau proksi terbalik jika Anda perlu menguji perutean multi-domain secara lokal.

## Pemilih Lokal (Locale Switcher)

Hook `useLocale` dari `next-intlayer` menangani navigasi sadar domain secara otomatis. Saat pengguna beralih ke lokal di domain yang berbeda, hook melakukan navigasi halaman penuh (`window.location.href`) alih-alih router push sisi klien, karena router Next.js tidak dapat melintasi asal (origins).

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((l) => (
        <li key={l}>
          <button
            onClick={() => setLocale(l)}
            aria-current={l === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Tidak diperlukan konfigurasi tambahan — `useLocale` mendeteksi `window.location.hostname` secara internal dan memutuskan antara `router.replace` (domain yang sama) dan `window.location.href` (lintas domain).

## SEO: Tautan Alternatif `hreflang`

Perutean berbasis domain biasanya digunakan bersama dengan `hreflang` untuk memberi tahu mesin telusur URL mana yang harus diindeks untuk setiap bahasa. Gunakan `getMultilingualUrls` untuk menghasilkan set lengkap URL alternatif:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // mis. "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Ini menghasilkan:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Utilitas Inti

| Utilitas                                          | Deskripsi                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Mengembalikan URL relatif atau absolut tergantung pada apakah lokal target berada di domain saat ini. |
| `getMultilingualUrls(url, { currentDomain })`     | Mengembalikan peta URL lokal yang diberi kunci lokal, mencampur relatif dan absolut sesuai kebutuhan. |
| `getPrefix(locale, { domains })`                  | Mengembalikan awalan kosong untuk lokal domain eksklusif, awalan normal jika sebaliknya.              |

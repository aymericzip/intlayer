---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: audit i18n dan SEO situs"
description: Pelajari cara menggunakan perintah scan pada Intlayer CLI untuk mengukur ukuran halaman dan mengaudit kesehatan i18n/SEO dari situs web mana pun.
keywords:
  - Scan
  - SEO
  - i18n
  - Audit
  - CLI
  - Intlayer
  - Ukuran halaman
  - Bundel
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "Mendeteksi strategi perutean dan stack i18n (pustaka, TMS); menambahkan pemeriksaan resiprositas hreflang, og:locale, dan pengalih bahasa; menelusuri sitemap robots.txt, indeks sitemap, dan sitemap berformat gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Menambahkan flag `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Menambahkan konten perintah scan"
author: aymericzip
---

# Scan Website

Perintah `scan` mengambil URL publik, mengukur total ukuran halaman, dan mengaudit kesehatan i18n serta SEO halaman tersebut. Ini menghasilkan laporan dengan skor (0–100) yang mencakup atribut HTML, tautan kanonis, tag hreflang dan tautan baliknya, robots.txt, sitemap, tautan internal yang terlokalisasi, dan bobot bahasa pada bundel JavaScript.

Perintah ini juga melaporkan bagaimana situs mengodekan locale pada URL-nya (strategi perutean) serta framework, pustaka i18n, sistem manajemen terjemahan (TMS), atau proxy terjemahan yang digunakan. Pemeriksaan yang sama mendukung [pemindai SEO i18n online](https://intlayer.org/i18n-seo-scanner) dan ekstensi Chrome Intlayer.

Tidak diperlukan dependensi tambahan. Jika [puppeteer](https://pptr.dev/) terinstal, pemindaian dapat menangkap fragmen JavaScript yang dimuat secara asinkron (lazy-loaded) untuk analisis bundel yang lebih presisi; jika tidak, perintah akan kembali memeriksa skrip yang dimuat secara langsung yang dideklarasikan dalam HTML.

## Penggunaan

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Contoh

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Contoh keluaran:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Opsi

### `<url>` (diperlukan)

URL lengkap yang akan dipindai (misalnya `https://example.com`).

### `--no-deep`

Menonaktifkan pemindaian mendalam berbasis rendering.

Secara default, perintah mencoba menggunakan [puppeteer](https://pptr.dev/) untuk merender halaman di browser headless, menangkap fragmen JavaScript yang dimuat secara asinkron, dan mengukur ukuran transfer sebenarnya. Jika puppeteer tidak terinstal, perintah akan secara otomatis beralih ke mode dasar.

Gunakan `--no-deep` untuk memaksa mode dasar bahkan ketika puppeteer tersedia.

> Contoh: `npx intlayer scan https://example.com --no-deep`

### `--json`

Menghasilkan seluruh hasil pemindaian sebagai objek JSON alih-alih laporan terformat. Berguna untuk penggunaan programatis atau alur kerja CI.

> Contoh: `npx intlayer scan https://example.com --json`

### Opsi konfigurasi standar

- **`--base-dir`** — Direktori dasar yang digunakan untuk mencari file `intlayer.config.*`.
- **`-e, --env`** — Lingkungan target (misalnya `development`, `production`).
- **`--env-file`** — Jalur ke file `.env` kustom.
- **`--no-cache`** — Menonaktifkan cache konfigurasi.
- **`--ci`** — Menjalankan perintah di setiap proyek Intlayer dalam monorepo (atau hanya proyek saat ini jika dijalankan dari direktori proyek). Kredensial per proyek dapat disuntikkan melalui `INTLAYER_PROJECT_CREDENTIALS`, sebuah objek JSON yang memetakan path proyek ke `{ "clientId", "clientSecret" }`.
- **`--verbose`** — Mengaktifkan pencatatan detail (default dalam mode CLI).
- **`--prefix`** — Prefiks pencatatan kustom.

## Strategi perutean

Pola locale yang dibagikan oleh alternatif hreflang halaman mengungkapkan bagaimana situs merutekan locale-nya. Tanpa alternatif, hanya URL yang dipindai yang digunakan (keandalan rendah).

| Strategi            | Contoh                                 |
| ------------------- | -------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`               |
| `prefix-no-default` | `/about` (locale default), `/fr/about` |
| `search-params`     | `/about?lang=fr`                       |
| `subdomain`         | `fr.example.com`                       |
| `domain`            | `example.fr`, `example.de`             |
| `no-prefix`         | Satu URL untuk setiap locale (cookie)  |

Pemeriksaan tautan, kanonikal, robots.txt, dan sitemap membaca setiap URL melalui strategi ini. Sebagai contoh, tautan tanpa awalan sudah benar pada locale default dari situs `prefix-no-default`, dan tautan tanpa `?lang=` akan meninggalkan locale pada situs `search-params`.

## Stack yang terdeteksi

Framework, pustaka i18n (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), sistem manajemen terjemahan (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS), dan proxy terjemahan (Weglot, Localize, GTranslate…) diidentifikasi dari HTML, sumber daya yang dimuat, dan bundel JavaScript. Mode mendalam juga membaca variabel global window dan cookie.

## Apa yang diperiksa

| Pemeriksaan                     | Deskripsi                                                                                                 | Bobot Skor |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| `html lang`                     | `<html lang>` tersedia dan merupakan tag BCP 47 yang valid                                                | 9          |
| `html dir`                      | `dir="rtl"` diatur untuk bahasa yang ditulis dari kanan ke kiri (`ltr` adalah default)                    | 3          |
| `locale signals consistent`     | `<html lang>`, locale URL, dan entri hreflang referensi mandiri cocok                                     | 5          |
| `og:locale`                     | `og:locale` diatur dan cocok dengan `<html lang>`                                                         | 3          |
| `canonical`                     | Tautan kanonis ada dan tidak mengarah ke versi locale lain                                                | 10         |
| `hreflang`                      | Tag hreflang ada, dengan kode yang valid, URL absolut, tidak ada duplikat, dan memiliki referensi mandiri | 9          |
| `x-default hreflang`            | Alternatif hreflang `x-default` tersedia                                                                  | 7          |
| `hreflang alternates link back` | Alternatif merespons dengan 200, tidak dialihkan, menautkan kembali, dan mendeklarasikan bahasa           | 8          |
| `localized links`               | Tautan internal mengarah ke locale halaman                                                                | 8          |
| `all links keep the locale`     | Tidak ada tautan internal yang beralih atau melepaskan locale                                             | 6          |
| `language switcher`             | Tautan `<a href>` yang dapat dirayapi ke versi bahasa lain tersedia                                       | 6          |
| `robots.txt present`            | `/robots.txt` mengembalikan respons 200                                                                   | 10         |
| `robots.txt localized URLs`     | Baik situs maupun URL yang dilokalkannya tidak diblokir untuk Googlebot                                   | 8          |
| `sitemap present`               | Sitemap ditemukan (direktif robots.txt `Sitemap:`, `/sitemap.xml`, `/sitemap_index.xml`)                  | 10         |
| `sitemap locale coverage`       | Setiap locale terdaftar, dan entri dengan alternatif mencantumkan dirinya sendiri                         | 9          |
| `sitemap alternates`            | Sitemap berisi tautan alternatif `hreflang`                                                               | 8          |
| `sitemap x-default`             | Sitemap berisi hreflang `x-default`                                                                       | 7          |
| `unused bundle content`         | Bundel JS utama tidak membawa terjemahan locale lain                                                      | 8          |

Peringatan menghasilkan setengah dari bobot nilai. Skor akhir adalah jumlah bobot dari pemeriksaan yang dijalankan yang dinyatakan dalam persentase (0–100). Pemeriksaan yang gagal mencetak masalah pertama yang ditemukan; gunakan `--json` untuk rincian lengkap.

## Menggunakan fungsi scan secara programatis

Fungsi `scan` juga diekspor dari `@intlayer/cli` sehingga dapat dipanggil dari skrip Anda sendiri:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Untuk akses tingkat lebih rendah, `scanWebsite` dari `@intlayer/engine/scan` mengembalikan objek `ScanResult` yang terstruktur:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```

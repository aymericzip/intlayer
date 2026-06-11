---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Scan Website
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
  - version: 8.13.0
    date: 2026-06-11
    changes: "Menambahkan konten perintah scan"
---

# Scan Website

Perintah `scan` mengambil URL publik, mengukur total ukuran halaman, dan mengaudit kesehatan i18n serta SEO halaman tersebut. Ini menghasilkan laporan dengan skor (0–100) yang mencakup atribut HTML, tautan kanonis, tag hreflang, robots.txt, sitemap.xml, tautan internal yang terlokalisasi, dan bobot bahasa pada bundel JavaScript.

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
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
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
- **`--verbose`** — Mengaktifkan pencatatan detail (default dalam mode CLI).
- **`--prefix`** — Prefiks pencatatan kustom.

## Apa yang diperiksa

| Pemeriksaan               | Deskripsi                                                          | Bobot Skor |
| ------------------------- | ------------------------------------------------------------------ | ---------- |
| `html lang`               | Atribut `<html lang="…">` tersedia                                 | 9          |
| `html dir`                | Atribut `<html dir="…">` tersedia                                  | 3          |
| `canonical`               | `<link rel="canonical">` tersedia                                  | 10         |
| `hreflang`                | Tag `<link rel="alternate" hreflang="…">` tersedia                 | 9          |
| `x-default hreflang`      | Alternatif hreflang `x-default` tersedia                           | 7          |
| `localized links`         | Setidaknya satu tautan internal menyertakan segmen bahasa          | 5          |
| `all links localized`     | Setiap tautan internal menyertakan segmen bahasa                   | 5          |
| `current locale`          | Bahasa halaman dapat dideteksi                                     | 3          |
| `robots.txt present`      | `/robots.txt` mengembalikan respons 200                            | 10         |
| `robots.txt locale paths` | Tidak ada jalur bahasa yang diblokir di robots.txt                 | 10         |
| `sitemap.xml present`     | `/sitemap.xml` mengembalikan respons 200                           | 10         |
| `sitemap locale coverage` | Setiap bahasa yang terdeteksi muncul di sitemap                    | 10         |
| `sitemap alternates`      | Sitemap berisi tautan alternatif `hreflang`                        | 5          |
| `sitemap x-default`       | Sitemap berisi hreflang `x-default`                                | 5          |
| `unused bundle content`   | Bundel JS tidak membawa data bahasa tidak terpakai yang berlebihan | 9          |

Skor akhir adalah jumlah bobot dari semua pemeriksaan yang berhasil dinyatakan dalam persentase (0–100).

## Menggunakan fungsi scan secara programatis

Fungsi `scan` juga diekspor dari `@intlayer/cli` sehingga dapat dipanggil dari skrip Anda sendiri:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Untuk akses tingkat lebih rendah, `scanWebsite` dari `@intlayer/chokidar/scan` mengembalikan objek `ScanResult` yang terstruktur:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```

---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Tinjau Dokumen
description: Pelajari cara meninjau file dokumentasi untuk kualitas, konsistensi, dan kelengkapan di berbagai lokal.
keywords:
  - Tinjau
  - Dokumen
  - Dokumentasi
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# Tinjau Dokumen

Perintah `doc review` menganalisis file dokumentasi untuk kualitas, konsistensi, dan kelengkapan di berbagai lokal.

## Poin-poin penting:

- Membagi file markdown besar menjadi potongan-potongan untuk tetap berada dalam batas jendela konteks model AI.
- Mengoptimalkan potongan untuk ditinjau dan melewatkan bagian yang sudah diterjemahkan dan tidak berubah.
- Memproses file, potongan, dan locale secara paralel menggunakan sistem antrian untuk meningkatkan kecepatan.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Perintah ini dapat digunakan untuk meninjau file yang sudah diterjemahkan, dan untuk memeriksa apakah terjemahannya sudah benar.

Untuk sebagian besar kasus penggunaan,

- lebih baik menggunakan `doc translate` ketika versi terjemahan dari file ini belum tersedia.
- lebih baik menggunakan `doc review` ketika versi terjemahan dari file ini sudah ada.

> Perlu dicatat bahwa proses review mengonsumsi lebih banyak token entri dibandingkan proses translate untuk meninjau file yang sama secara keseluruhan. Namun, proses review akan mengoptimalkan chunk yang ditinjau, dan akan melewati bagian yang tidak berubah.

## Argumen:

**Opsi daftar file:**

- **`--doc-pattern [docPattern...]`**: Pola glob untuk mencocokkan file dokumentasi yang akan ditinjau.

  > Contoh: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Pola glob untuk mengecualikan file dari peninjauan.

  > Contoh: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Lewati file jika telah dimodifikasi sebelum waktu yang diberikan.
  - Bisa berupa waktu absolut seperti "2025-12-05" (string atau Date)
  - Bisa berupa waktu relatif dalam ms `1 * 60 * 60 * 1000` (1 jam)
  - Opsi ini memeriksa waktu pembaruan file menggunakan metode `fs.stat`. Jadi bisa terpengaruh oleh Git atau alat lain yang memodifikasi file.

  > Contoh: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Lewati file jika telah dimodifikasi dalam waktu yang diberikan.
  - Bisa berupa waktu absolut seperti "2025-12-05" (string atau Date)
  - Bisa berupa waktu relatif dalam ms `1 * 60 * 60 * 1000` (1 jam)
  - Opsi ini memeriksa waktu pembaruan file menggunakan metode `fs.stat`. Jadi bisa terpengaruh oleh Git atau alat lain yang memodifikasi file.

  > Contoh: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Lewati file jika file tersebut sudah ada.

  > Contoh: `npx intlayer doc review --skip-if-exists`

**Opsi mode peninjauan:**

- **`--log`**: Mode hanya log. Jangan menerjemahkan dengan AI; alih-alih log blok yang memerlukan perhatian (dengan nomor baris dan konten) untuk lokal dasar dan target, untuk membantu agen lain menghasilkan terjemahan.

  > Contoh: `npx intlayer doc review --log`

**Opsi output entri:**

- **`--locales [locales...]`**: Lokalisasi target untuk meninjau dokumentasi.

  > Contoh: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Lokalisasi sumber (dokumen dasar) untuk dibandingkan.

  > Contoh: `npx intlayer doc review --base-locale en`

**Opsi pemrosesan file:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Jumlah file yang diproses secara bersamaan untuk peninjauan.

  > Contoh: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Opsi AI:**

- **`--model [model]`**: Model AI yang digunakan untuk peninjauan (misalnya, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Penyedia AI yang digunakan untuk peninjauan.
- **`--temperature [temperature]`**: Pengaturan temperature untuk model AI.
- **`--api-key [apiKey]`**: Berikan API key Anda sendiri untuk layanan AI.
- **`--application-context [applicationContext]`**: Berikan konteks tambahan untuk peninjauan AI.
- **`--data-serialization [dataSerialization]`**: Format serialisasi data yang digunakan untuk fitur AI Intlayer. Opsi: `json` (standar, andal), `toon` (lebih sedikit token, kurang konsisten).
- **`--custom-prompt [prompt]`**: Sesuaikan prompt dasar yang digunakan untuk peninjauan. (Catatan: Untuk sebagian besar kasus penggunaan, opsi `--custom-instructions` lebih disarankan karena memberikan kontrol yang lebih baik.)

  > Contoh: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Opsi variabel lingkungan:**

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file [envFile]`**: Berikan file lingkungan khusus untuk memuat variabel.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek.
- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

  > Contoh: `npx intlayer doc review --verbose`

**Opsi instruksi khusus:**

- **`--custom-instructions [customInstructions]`**: Instruksi khusus yang ditambahkan ke prompt. Berguna untuk menerapkan aturan spesifik terkait format, penerjemahan URL, etc.

  > Contoh: `npx intlayer doc review --custom-instructions "Hindari menerjemahkan url, dan pertahankan format markdown"`

  > Contoh: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Opsi Git:**

- **`--git-diff`**: Hanya jalankan pada file yang mencakup perubahan dari base (default `origin/main`) ke cabang saat ini (default: `HEAD`).
- **`--git-diff-base`**: Tentukan referensi base untuk git diff (default `origin/main`).
- **`--git-diff-current`**: Tentukan referensi saat ini untuk git diff (default: `HEAD`).
- **`--uncommitted`**: Sertakan perubahan yang belum dikomit.
- **`--unpushed`**: Sertakan perubahan yang belum dipush.
- **`--untracked`**: Sertakan file yang belum terlacak.

  > Contoh: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Contoh: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Perlu diperhatikan bahwa jalur file keluaran akan ditentukan dengan mengganti pola-pola berikut:
>
> - `/{{baseLocale}}/` menjadi `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` menjadi `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` menjadi `_{{locale}}.`
> - `{{baseLocale}}_` menjadi `{{locale}}_`
> - `.{{baseLocaleName}}.` menjadi `.{{localeName}}.`
>
> Jika pola tidak ditemukan, file keluaran akan menambahkan `.{{locale}}` pada ekstensi file. Misalnya `./my/file.md` akan ditinjau dan diperbarui menjadi `./my/file.fr.md` untuk locale Prancis.

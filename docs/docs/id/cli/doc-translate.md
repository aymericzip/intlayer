---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Terjemahkan Dokumen
description: Pelajari cara menerjemahkan file dokumentasi secara otomatis menggunakan layanan terjemahan AI.
keywords:
  - Terjemahkan
  - Dokumen
  - Dokumentasi
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Terjemahkan Dokumen

Perintah `doc translate` secara otomatis menerjemahkan file dokumentasi dari locale dasar ke locale target menggunakan layanan terjemahan AI.

## Poin-poin penting:

- Membagi file markdown besar menjadi potongan-potongan untuk tetap berada dalam batas jendela konteks model AI.
- Mencoba ulang terjemahan jika format output tidak benar.
- Menggabungkan konteks spesifik aplikasi dan file untuk meningkatkan akurasi terjemahan.
- Mempertahankan terjemahan yang ada dengan tidak menimpa mereka.
- Memproses file, potongan, dan locale secara paralel menggunakan sistem antrian untuk meningkatkan kecepatan.

```bash
npx intlayer doc translate
```

## Argumen:

**Opsi daftar file:**

- **`--doc-pattern [docPattern...]`**: Pola glob untuk mencocokkan file dokumentasi yang akan diterjemahkan.

  > Contoh: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Pola glob untuk mengecualikan file dari penerjemahan.

  > Contoh: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Lewati file jika telah dimodifikasi sebelum waktu yang diberikan.
  - Bisa berupa waktu absolut seperti "2025-12-05" (string atau Date)
  - Bisa berupa waktu relatif dalam ms `1 * 60 * 60 * 1000` (1 jam)
  - Opsi ini memeriksa waktu pembaruan file menggunakan metode `fs.stat`. Jadi bisa terpengaruh oleh Git atau alat lain yang memodifikasi file.

  > Contoh: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Lewati file jika telah dimodifikasi dalam waktu yang diberikan.
  - Bisa berupa waktu absolut seperti "2025-12-05" (string atau Date)
  - Bisa berupa waktu relatif dalam ms `1 * 60 * 60 * 1000` (1 jam)
  - Opsi ini memeriksa waktu pembaruan file menggunakan metode `fs.stat`. Jadi bisa terpengaruh oleh Git atau alat lain yang memodifikasi file.

  > Contoh: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Lewati file jika file tersebut sudah ada.

  > Contoh: `npx intlayer doc translate --skip-if-exists`

**Opsi output entri:**

- **`--locales [locales...]`**: Lokalisasi target untuk menerjemahkan dokumentasi.

  > Contoh: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Lokalisasi sumber untuk diterjemahkan dari.

  > Contoh: `npx intlayer doc translate --base-locale en`

**Opsi pemrosesan file:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Jumlah file yang diproses secara bersamaan untuk penerjemahan.

  > Contoh: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opsi AI:**

- **`--model [model]`**: Model AI yang digunakan untuk penerjemahan (misalnya, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Penyedia AI yang digunakan untuk penerjemahan.
- **`--temperature [temperature]`**: Pengaturan temperature untuk model AI.
- **`--api-key [apiKey]`**: Berikan API key Anda sendiri untuk layanan AI.
- **`--application-context [applicationContext]`**: Berikan konteks tambahan untuk penerjemahan AI.
- **`--custom-prompt [prompt]`**: Sesuaikan prompt dasar yang digunakan untuk penerjemahan. (Catatan: Untuk sebagian besar kasus penggunaan, opsi `--custom-instructions` lebih disarankan karena memberikan kontrol yang lebih baik atas perilaku penerjemahan.)

  > Contoh: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Opsi variabel lingkungan:**

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file [envFile]`**: Berikan file lingkungan khusus untuk memuat variabel.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek.
- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

  > Contoh: `npx intlayer doc translate --verbose`

**Opsi instruksi khusus:**

- **`--custom-instructions [customInstructions]`**: Instruksi khusus yang ditambahkan ke prompt. Berguna untuk menerapkan aturan spesifik terkait format, penerjemahan URL, dll.
  - Bisa berupa waktu absolut seperti "2025-12-05" (string atau Date)
  - Bisa berupa waktu relatif dalam ms `1 * 60 * 60 * 1000` (1 jam)
  - Opsi ini memeriksa waktu pembaruan file menggunakan metode `fs.stat`. Jadi bisa terpengaruh oleh Git atau alat lain yang memodifikasi file.

  > Contoh: `npx intlayer doc translate --custom-instructions "Hindari menerjemahkan url, dan pertahankan format markdown"`

  > Contoh: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opsi Git:**

- **`--git-diff`**: Hanya jalankan pada kamus yang mencakup perubahan dari base (default `origin/main`) ke cabang saat ini (default: `HEAD`).
- **`--git-diff-base`**: Tentukan referensi base untuk git diff (default `origin/main`).
- **`--git-diff-current`**: Tentukan referensi saat ini untuk git diff (default: `HEAD`).
- **`--uncommitted`**: Sertakan perubahan yang belum dikomit.
- **`--unpushed`**: Sertakan perubahan yang belum dipush.
- **`--untracked`**: Sertakan file yang belum terlacak.

  > Contoh: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Contoh: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Perlu diperhatikan bahwa jalur file keluaran akan ditentukan dengan mengganti pola-pola berikut
>
> - `/{{baseLocale}}/` menjadi `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` menjadi `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` menjadi `_{{locale}}.`
> - `{{baseLocale}}_` menjadi `{{locale}}_`
> - `.{{baseLocaleName}}.` menjadi `.{{localeName}}.`
>
> Jika pola tidak ditemukan, file keluaran akan menambahkan `.{{locale}}` pada ekstensi file. Misalnya `./my/file.md` akan diterjemahkan menjadi `./my/file.fr.md` untuk locale Prancis.

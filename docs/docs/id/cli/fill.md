---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Isi Kamus
description: Pelajari cara mengisi, mengaudit, dan menerjemahkan kamus Anda menggunakan AI.
keywords:
  - Isi
  - Audit
  - Terjemahkan
  - Kamus
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Isi / audit / terjemahkan kamus

```bash
npx intlayer fill
```

Perintah ini menganalisis file deklarasi konten Anda untuk potensi masalah seperti terjemahan yang hilang, ketidakkonsistenan struktural, atau ketidakcocokan tipe. Jika ditemukan masalah, **intlayer fill** akan mengusulkan atau menerapkan pembaruan untuk menjaga kamus Anda tetap konsisten dan lengkap.

Poin-poin penting:

- Membagi file JSON besar menjadi potongan-potongan untuk tetap berada dalam batas jendela konteks model AI.
- Mencoba ulang terjemahan jika format output tidak benar.
- Menggabungkan konteks spesifik aplikasi dan file untuk meningkatkan akurasi terjemahan.
- Mempertahankan terjemahan yang ada dengan tidak menimpa mereka.
- Memproses file, potongan, dan locale secara paralel menggunakan sistem antrian untuk meningkatkan kecepatan.

## Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Contoh output:

```bash
npx intlayer fill

Preparing Intlayer (v7.5.14)
Done 76ms
@intlayer/ai found - Run process locally
Provider: (default) - Model: (default) - API Key: ✓
Affected dictionary keys for processing: app, comp-test, hello-world, lang-switcher
 - [comp-test]      No locales to fill, Skipping comp-test.content.json
 - [app]            Processing app.content.tsx
 - [app]            Filling missing metadata for app.content.tsx
 - [hello-world]    Processing test.content.ts
 - [hello-world]   [French (fr)]      Preparing test.content.ts
 - [hello-world]   [Spanish (es)]     Preparing test.content.ts
 - [lang-switcher]  Processing langSwitcher.content.ts
 - [lang-switcher]  Filling missing metadata for langSwitcher.content.ts
 - [hello-world]    Translation completed successfully for test.content.ts
 - [lang-switcher] [Spanish (es)]     Preparing langSwitcher.content.ts
 - [app]           [French (fr)]      Preparing app.content.tsx
 - [app]           [Spanish (es)]     Preparing app.content.tsx
 - [hello-world]    Content declaration written to test.content.ts
 - [app]            Translation completed successfully for app.content.tsx
 - [app]            Content declaration written to app.content.tsx
 - [lang-switcher]  Translation completed successfully for langSwitcher.content.ts
 - [lang-switcher]  Content declaration written to langSwitcher.content.ts
```

## Argumen:

**Opsi daftar file:**

- **`-f, --file [files...]`**: Daftar file deklarasi konten spesifik untuk diaudit. Jika tidak diberikan, semua file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` yang ditemukan berdasarkan pengaturan file konfigurasi Anda akan diaudit.

  > Contoh: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Memfilter kamus berdasarkan kunci. Jika tidak diberikan, semua kamus akan diaudit.

  > Contoh: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Memfilter kamus berdasarkan kunci (alias dari --keys).

  > Contoh: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Memfilter kamus dengan mengecualikan berdasarkan kunci. Jika tidak diberikan, semua kamus akan diaudit.

  > Contoh: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Memfilter kamus dengan mengecualikan berdasarkan kunci (alias dari --excluded-keys).

  > Contoh: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Memfilter kamus berdasarkan pola glob untuk jalur file.

  > Contoh: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opsi output entri:**

- **`--source-locale [sourceLocale]`**: Locale sumber untuk diterjemahkan. Jika tidak ditentukan, locale default dari konfigurasi Anda akan digunakan.

- **`--output-locales [outputLocales...]`**: Locale target untuk diterjemahkan. Jika tidak ditentukan, semua locale dari konfigurasi Anda akan digunakan kecuali locale sumber.

- **`--mode [mode]`**: Mode terjemahan: `complete`, `review`. Default adalah `complete`. `complete` akan mengisi semua konten yang hilang, `review` akan mengisi konten yang hilang dan meninjau kunci yang sudah ada.

**Opsi Git:**

- **`--git-diff`**: Hanya jalankan pada kamus yang mencakup perubahan dari basis (default `origin/main`) ke cabang saat ini (default: `HEAD`).
- **`--git-diff-base`**: Tentukan referensi basis untuk git diff (default `origin/main`).
- **`--git-diff-current`**: Tentukan referensi saat ini untuk git diff (default: `HEAD`).
- **`--uncommitted`**: Sertakan perubahan yang belum dikomit.
- **`--unpushed`**: Sertakan perubahan yang belum dipush.
- **`--untracked`**: Sertakan file yang tidak terlacak.

  > Contoh: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Contoh: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opsi AI:**

- **`--model [model]`**: Model AI yang digunakan untuk terjemahan (misalnya, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Penyedia AI yang digunakan untuk terjemahan.
- **`--temperature [temperature]`**: Pengaturan temperature untuk model AI.
- **`--api-key [apiKey]`**: Berikan API key Anda sendiri untuk layanan AI.
- **`--custom-prompt [prompt]`**: Berikan prompt khusus untuk instruksi terjemahan Anda.
- **`--application-context [applicationContext]`**: Berikan konteks tambahan untuk terjemahan AI.

  > Contoh: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Aplikasi saya adalah toko kucing"`

  **Opsi variabel lingkungan:**

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file [envFile]`**: Berikan file lingkungan khusus untuk memuat variabel dari file tersebut.

  > Contoh: `npx intlayer fill --env-file .env.production.local`

  > Contoh: `npx intlayer fill --env production`

**Opsi konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek.

  > Contoh: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

**Opsi persiapan:**

- **`--build`**: Bangun kamus sebelum melakukan push untuk memastikan konten terbaru. True akan memaksa build, false akan melewati build, undefined akan mengizinkan penggunaan cache dari build.

- **`--skip-metadata`**: Lewati pengisian metadata yang hilang (deskripsi, judul, tag) untuk kamus.

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

## Contoh:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Perintah ini akan menerjemahkan konten dari bahasa Inggris ke bahasa Prancis dan Spanyol untuk semua file deklarasi konten di direktori `src/home/` menggunakan model GPT-3.5 Turbo.

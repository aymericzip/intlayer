---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: Integrasi CI/CD
description: Pelajari cara mengintegrasikan Intlayer ke dalam pipeline CI/CD Anda untuk manajemen konten dan deployment otomatis.
keywords:
  - CI/CD
  - Integrasi Berkelanjutan
  - Deployment Berkelanjutan
  - Otomatisasi
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Menghasilkan Terjemahan Otomatis dalam Pipeline CI/CD

Intlayer memungkinkan pembuatan terjemahan secara otomatis untuk file deklarasi konten Anda. Ada beberapa cara untuk mencapainya tergantung pada alur kerja Anda.

## Daftar Isi

<TOC/>

## Menggunakan CMS

Dengan Intlayer, Anda dapat mengadopsi alur kerja di mana hanya satu locale yang dideklarasikan secara lokal, sementara semua terjemahan dikelola secara remote melalui CMS. Ini memungkinkan konten dan terjemahan benar-benar terpisah dari codebase, memberikan fleksibilitas lebih bagi editor konten dan memungkinkan Live Sync (tidak perlu membangun ulang aplikasi untuk menerapkan perubahan).

### Contoh Konfigurasi

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Locale opsional akan dikelola secara remote
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    // Kredensial CMS jika Anda menggunakan CMS
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
  ai: {
    applicationContext: "Ini adalah aplikasi uji", // Membantu memastikan konsistensi dalam pembuatan terjemahan
  },
};

export default config;
```

Untuk mempelajari lebih lanjut tentang CMS, lihat [dokumentasi resmi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

## Menggunakan Husky

Anda dapat mengintegrasikan pembuatan terjemahan ke dalam alur kerja Git lokal Anda menggunakan [Husky](https://typicode.github.io/husky/).

### Contoh Konfigurasi

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Locale opsional ditangani secara remote
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Gunakan API key Anda sendiri

    applicationContext: "Ini adalah aplikasi uji", // Membantu memastikan konsistensi dalam pembuatan terjemahan
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Untuk memastikan kamus sudah diperbarui
npx intlayer fill --unpushed --mode fill    # Hanya mengisi konten yang hilang, tidak memperbarui yang sudah ada
```

> Untuk informasi lebih lanjut tentang perintah Intlayer CLI dan penggunaannya, lihat [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

> Jika Anda memiliki beberapa aplikasi dalam repo Anda yang menggunakan instance intlayer terpisah, Anda dapat menggunakan argumen `--base-dir` seperti ini:

```bash fileName=".husky/pre-push"
# Aplikasi 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Aplikasi 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Menggunakan GitHub Actions

Intlayer menyediakan perintah CLI untuk mengisi otomatis dan meninjau konten kamus. Ini dapat diintegrasikan ke dalam alur kerja CI/CD Anda menggunakan GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
# Kondisi pemicu untuk workflow ini
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Langkah 1: Ambil kode terbaru dari repositori
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Simpan kredensial untuk membuat PR
          fetch-depth: 0 # Ambil seluruh riwayat git untuk analisis diff

      # Langkah 2: Siapkan lingkungan Node.js
      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Gunakan Node.js 20 LTS untuk stabilitas

      # Langkah 3: Instal dependensi proyek
      - name: 📦 Instal dependensi
        run: npm install

      # Langkah 4: Instal Intlayer CLI secara global untuk manajemen terjemahan
      - name: 📦 Instal Intlayer
        run: npm install -g intlayer-cli

      # Langkah 5: Bangun proyek Intlayer untuk menghasilkan file terjemahan
      - name: ⚙️ Bangun proyek Intlayer
        run: npx intlayer build

      # Langkah 6: Gunakan AI untuk mengisi otomatis terjemahan yang hilang
      - name: 🤖 Isi otomatis terjemahan yang hilang
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Langkah 7: Periksa jika ada perubahan dan commit perubahan tersebut
      - name: � Periksa perubahan
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Langkah 8: Commit dan push perubahan jika ada
      - name: 📤 Commit dan push perubahan
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: auto-fill missing translations [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Untuk mengatur variabel lingkungan, buka GitHub → Settings → Secrets and variables → Actions dan tambahkan secret tersebut.

> Sama seperti untuk Husky, dalam kasus monorepo, Anda dapat menggunakan argumen `--base-dir` untuk memproses setiap aplikasi secara berurutan.

> Secara default, argumen `--git-diff` memfilter kamus yang mencakup perubahan dari basis (default `origin/main`) ke cabang saat ini (default: `HEAD`).

> Untuk informasi lebih lanjut tentang perintah Intlayer CLI dan penggunaannya, lihat [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

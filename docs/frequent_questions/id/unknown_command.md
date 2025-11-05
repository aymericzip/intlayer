---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Perintah tidak dikenal
description: Pelajari cara memperbaiki kesalahan perintah tidak dikenal.
keywords:
  - tidak dikenal
  - perintah
  - kesalahan
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - restart
  - lokal
slugs:
  - frequent-questions
  - unknown-command
---

# error: perintah tidak dikenal fill / build / dll

Jika `npx intlayer fill --verbose` menghasilkan:

```
error: perintah tidak dikenal 'fill'
```

tetapi Anda yakin perintah `fill` _seharusnya_ ada, berikut langkah-langkah untuk mengatasinya:

## 1. **Pastikan Anda menggunakan versi terbaru**

Jalankan:

```bash
npx intlayer --version                  # versi intlayer lokal saat ini
npx intlayer@latest --version           # versi intlayer terbaru saat ini
```

Ini memaksa `npx` untuk mengambil versi terbaru. Kemudian coba lagi:

```bash
npx intlayer@latest build --verbose
```

## 2. **Periksa apakah perintah sudah terdaftar**

Anda dapat memeriksanya dengan:

```bash
npx intlayer --help                     # memberikan informasi terkait perintah
```

Lihat apakah perintah tersebut muncul dalam daftar perintah.

Buka repo, dan pastikan perintah Anda diekspor dan terdaftar di titik masuk CLI. Intlayer menggunakan `commander` sebagai framework.

Kode terkait CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Restart terminal Anda**

Kadang-kadang perlu restart terminal agar perintah baru dikenali.

## 5. **Jika Anda mengembangkan `intlayer`, bangun ulang dan tautkan**

Jika Anda mengembangkan `intlayer` secara lokal:

```bash
# Di direktori intlayer
npm install
npm run build
npm link
```

Kemudian di terminal lain:

```bash
intlayer fill --verbose
```

Ini menggunakan versi lokal yang sedang Anda kerjakan.

## 6. **Bersihkan cache npx (jika Anda terjebak dengan versi lama)**

```bash
npx clear-npx-cache
```

Atau hapus secara manual paket intlayer yang di-cache:

```bash
rm -rf ~/.npm/_npx
```

Periksa yang setara jika Anda menggunakan pnpm, yarn, bun, atau manajer paket lainnya

---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Kesalahan Build di CI/CD
description: Pelajari cara memperbaiki kesalahan build yang terjadi di lingkungan CI/CD.
keywords:
  - build
  - error
  - ci
  - cd
  - pipeline
  - intlayer
  - dictionaries
  - next.js
  - prebuild
  - automation
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# Kesalahan saat build di CI/CD

Jika Anda mendapatkan kesalahan seperti ini di Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Berikut beberapa solusi:

## 1. Kamus yang hilang

Pastikan bahwa kamus dibangun pada tahap build.

Seringkali build berhasil secara lokal tetapi tidak di CI/CD. Alasannya adalah karena secara lokal, direktori `.intlayer` ada, tetapi di CI/CD tidak ada karena dikecualikan dari build.

Anda dapat memperbaikinya dengan menambahkan skrip prebuild di `package.json` proyek Anda.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Akan dijalankan sebelum build
    "build": "next build",
  },
}
```

> Perlu dicatat bahwa jika Anda menggunakan fungsi `withIntlayer`, atau plugin bundler setara untuk framework Anda, skrip prebuild akan dijalankan sebelum build.

## 2. Variabel lingkungan yang hilang saat build / runtime

Dalam sebuah container, atau platform yang melakukan auto-deploy, disarankan untuk mengecualikan file `.env` dari build.

```text fileName=".gitignore or .dockerignore"
# Variabel lingkungan
.env
**/.env
.env.*
**/.env.*
```

Jika variabel lingkungan Anda tidak tersedia saat build, maka akan terjadi error.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Kemungkinan ini tidak terkait dengan Intlayer. Jadi periksa variabel lingkungan Anda saat build di platform CI/CD Anda.

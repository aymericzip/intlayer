---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Kesalahan ESBuild
description: Pelajari cara memperbaiki kesalahan ESBuild.
keywords:
  - esbuild
  - error
  - intlayer
  - plugin
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - frequent-questions
  - esbuild-error
---

# Kesalahan ESBuild

Jika Anda mengalami kesalahan ESBuild selama proses build, kemungkinan plugin Intlayer belum dikonfigurasi dengan benar.

ESBuild bertanggung jawab untuk membaca file deklarasi konten (`.content.{ts,js,mjs,cjs,json}`) dan menghasilkan kamus yang sesuai di folder `.intlayer/dictionary`. Selain itu juga membaca file konfigurasi (`intlayer.config.ts`).

Intlayer menyediakan plugin untuk integrasi dengan bundler Anda. Plugin ini dirancang untuk mengalias komponen yang hanya dimaksudkan untuk dijalankan di sisi server.

Jika Anda menggunakan framework seperti Next.js (Webpack / Turbopack), Vite, atau React Native, Lynx, dll. Intlayer menyediakan plugin yang dapat Anda gunakan untuk mengintegrasikan Intlayer ke dalam aplikasi Anda. Jadi, lihat dokumentasi spesifik dari framework Anda untuk mempelajari cara mengintegrasikan plugin tersebut.

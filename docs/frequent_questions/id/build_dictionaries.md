---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Cara membangun kamus?
description: Pelajari cara membangun kamus.
keywords:
  - membangun
  - kamus
  - intlayer
  - perintah
  - watch
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
---

# Membangun Kamus

## Cara Membangun Kamus

Intlayer menyediakan alat baris perintah untuk membangun kamus.

```bash
npx intlayer dictionaries build
```

Perintah ini:

- Memindai semua file deklarasi konten (`.content.{ts,tsx,js,mjs,cjs,json,...}`) dalam proyek Anda.
- Menghasilkan kamus dan menyimpannya di folder `.intlayer/dictionary`.

### Mode Watch

Jika Anda ingin secara otomatis memperbarui kamus saat terjadi perubahan pada file deklarasi konten, jalankan perintah berikut:

```bash
npx intlayer dictionaries build --watch
```

Dalam mode ini, Intlayer akan memindai dan membangun kamus setiap kali terjadi perubahan pada file deklarasi konten dan secara otomatis memperbarui folder `.intlayer/dictionary`.

### Menggunakan ekstensi VSCode

Anda juga dapat menggunakan [ekstensi Intlayer VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/id/vs_code_extension.md) untuk meningkatkan pengalaman Intlayer Anda di VSCode.

### Menggunakan plugin untuk framework aplikasi favorit Anda

Jika Anda menggunakan framework seperti Next.js (Webpack / Turbopack), Vite, atau React Native, Lynx, dll. Intlayer menyediakan plugin yang dapat Anda gunakan untuk mengintegrasikan Intlayer ke dalam aplikasi Anda.

Intlayer akan membangun kamus sebelum proses build aplikasi Anda.
Dengan cara yang sama, dalam mode pengembangan, Intlayer akan memantau perubahan pada file deklarasi konten Anda dan membangun ulang kamus secara otomatis.

Jadi, lihat dokumentasi spesifik dari framework Anda untuk mempelajari cara mengintegrasikan plugin tersebut.

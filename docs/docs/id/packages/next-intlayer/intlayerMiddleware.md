---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi intlayerMiddleware | next-intlayer
description: Lihat cara menggunakan fungsi intlayerMiddleware untuk paket next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Dokumentasi
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inisialisasi dokumen
---

# Dokumentasi intlayerMiddleware

Fungsi `intlayerMiddleware` adalah middleware Next.js yang menangani routing berbasis locale dan pengalihan (redirect). Fungsi ini secara otomatis mendeteksi locale yang disukai pengguna dan mengarahkan mereka ke path lokal yang sesuai jika diperlukan.

## Penggunaan

```ts
// middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Deskripsi

Middleware melakukan tugas-tugas berikut:

1. **Locale Detection**: Ia memeriksa path URL, cookie, dan header `Accept-Language` untuk menentukan locale pengguna.
2. **Redirection**: Jika URL tidak berisi prefix locale dan konfigurasi mengharuskannya (atau berdasarkan preferensi pengguna), middleware akan mengarahkan ulang ke URL yang dilokalkan.
3. **Cookie Management**: Dapat menyimpan locale yang terdeteksi dalam cookie untuk permintaan berikutnya.

## Parameter

Fungsi ini menerima `NextRequest` standar dari Next.js sebagai parameter ketika digunakan langsung, atau dapat diekspor seperti yang ditunjukkan di atas.

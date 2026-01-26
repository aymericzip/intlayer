---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentasi Hook useRewriteURL
description: Hook khusus Solid untuk mengelola penulisan ulang URL yang dilokalkan dalam Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

Hook `useRewriteURL` untuk SolidJS dirancang untuk mengelola penulisan ulang (rewrite) URL yang dilokalkan di sisi klien. Hook ini secara otomatis memperbaiki URL di browser ke versi terlokalisasi yang "lebih rapi" berdasarkan locale saat ini dan konfigurasi di `intlayer.config.ts`.

Dengan menggunakan `window.history.replaceState`, hook ini menghindari navigasi berulang yang tidak perlu oleh Solid Router.

## Penggunaan

Panggil hook ini di dalam komponen yang merupakan bagian dari aplikasi Anda.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // Secara otomatis mengoreksi /fr/tests menjadi /fr/essais di bilah alamat jika aturan rewrite ada
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Cara kerjanya

1. **Deteksi**: Hook ini menggunakan `createEffect` untuk memantau perubahan pada reactive `locale()`.
2. **Pencocokan**: Ia mengidentifikasi apakah `window.location.pathname` saat ini sesuai dengan route kanonik yang memiliki alias terlokalisasi yang lebih rapi untuk bahasa saat ini.
3. **Koreksi URL**: Jika alias yang lebih rapi ditemukan, hook memanggil `window.history.replaceState` untuk memperbarui bilah alamat tanpa memengaruhi state navigasi internal atau menyebabkan komponen melakukan re-render.

## Mengapa menggunakannya?

- **URL Otoritatif**: Menegakkan satu URL tunggal untuk setiap versi terlokalisasi dari konten Anda, yang penting untuk SEO.
- **Kenyamanan Pengembang**: Memungkinkan Anda mempertahankan definisi rute internal sebagai kanonis sambil mengekspos path terlokalisasi yang ramah pengguna ke dunia luar.
- **Konsistensi**: Mengoreksi URL ketika pengguna mengetik path secara manual yang tidak sesuai dengan aturan lokalisasi pilihan Anda.

---

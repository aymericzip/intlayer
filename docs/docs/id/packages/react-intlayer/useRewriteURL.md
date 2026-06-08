---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentasi Hook useRewriteURL
description: Hook khusus React untuk mengelola penulisan ulang URL terlokalisasi di Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` dirancang untuk mengelola penulisan ulang (rewrite) URL terlokalisasi di sisi klien. Hook ini secara otomatis mendeteksi apakah URL saat ini harus dikoreksi menjadi versi terlokalisasi yang "lebih rapi" berdasarkan locale pengguna dan aturan rewrite yang didefinisikan di `intlayer.config.ts`.

Berbeda dengan navigasi standar, hook ini menggunakan `window.history.replaceState` untuk memperbarui URL di bilah alamat tanpa memicu pemuatan ulang halaman penuh atau siklus navigasi router.

## Penggunaan

Panggil hook ini dalam komponen sisi klien.

```tsx
import { useRewriteURL } from "react.intlayer";

const MyComponent = () => {
  // Secara otomatis memperbaiki /fr/tests menjadi /fr/essais di bilah alamat jika ada aturan penulisan ulang
  useRewriteURL();

  return <div>Komponen Saya</div>;
};
```

## Cara kerjanya

1. **Deteksi**: Hook memantau `window.location.pathname` saat ini dan `locale` pengguna.
2. **Pencocokan**: Hook menggunakan mesin internal Intlayer untuk memeriksa apakah pathname saat ini cocok dengan rute kanonis yang memiliki alias terlokalisasi yang lebih "cantik" untuk `locale` saat ini.
3. **Koreksi URL**: Jika alias yang lebih baik ditemukan (dan berbeda dari path saat ini), hook memanggil `window.history.replaceState` untuk memperbarui URL di browser sambil mempertahankan konten kanonis dan state yang sama.

## Mengapa menggunakannya?

- **SEO**: Memastikan pengguna selalu mendarat pada satu URL yang 'cantik' dan menjadi otoritatif untuk bahasa tertentu.
- **Konsistensi**: Mencegah ketidakkonsistenan di mana pengguna mungkin mengetik path kanonis secara manual (mis. `/fr/privacy-notice`) alih-alih versi yang dilokalkan (`/fr/politique-de-confidentialite`).
- **Performa**: Memperbarui bilah alamat tanpa memicu efek samping router yang tidak diinginkan atau re-mount komponen.

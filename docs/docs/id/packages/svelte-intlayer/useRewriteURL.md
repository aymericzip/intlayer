---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentasi Hook useRewriteURL
description: Hook khusus Svelte untuk mengelola penulisan ulang URL terlokalisasi di Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` untuk Svelte dirancang untuk mengelola penulisan ulang URL terlokalisasi di sisi klien. Hook ini secara otomatis memperbaiki URL di browser ke versi lokal yang "lebih rapi" berdasarkan locale saat ini dan konfigurasi di `intlayer.config.ts`.

Ia memperbarui URL secara diam-diam menggunakan `window.history.replaceState`, sehingga menghindari navigasi penuh di SvelteKit.

## Penggunaan

Panggil hook ini di dalam komponen Svelte.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Secara otomatis mengoreksi /fr/tests menjadi /fr/essais di bilah alamat jika aturan rewrite tersedia
  useRewriteURL();
</script>

<slot />
```

## Cara kerjanya

1. **Pembaruan Reaktif**: Hook berlangganan ke store `locale` dari Intlayer.
2. **Deteksi**: Setiap kali locale berubah (atau saat mount), hook menghitung apakah `window.location.pathname` saat ini memiliki alias terlokalisasi yang lebih 'cantik' yang didefinisikan dalam aturan rewrite Anda.
3. **Koreksi URL**: Jika ditemukan path yang lebih 'cantik', hook memanggil `window.history.replaceState` untuk memperbarui bilah alamat tanpa memuat ulang halaman penuh atau memicu logika navigasi SvelteKit.

## Mengapa menggunakannya?

- **Praktik Terbaik SEO**: Memastikan mesin pencari mengindeks hanya versi URL terlokalisasi yang 'cantik'.
- **UX yang Ditingkatkan**: Membetulkan URL yang dimasukkan secara manual agar sesuai dengan struktur penamaan yang Anda inginkan.
- **Pembaruan Senyap**: Mengubah bilah alamat tanpa memengaruhi pohon komponen atau riwayat navigasi.

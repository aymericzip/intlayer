---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Ekstensi Chrome, Pemindai i18n & SEO
description: Periksa konfigurasi i18n dari situs web mana pun dengan ekstensi Chrome Intlayer. Deteksi framework, pustaka i18n, lokal, tag hreflang dan SEO, serta jalankan audit SEO i18n lengkap.
keywords:
  - Ekstensi Chrome
  - Pemindai i18n
  - Pemeriksa hreflang
  - SEO Multibahasa
  - Intlayer
  - Lokalisasi
  - Alat Pengembangan
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Ekstensi Chrome: Pemindai i18n & SEO

## Ikhtisar

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) adalah ekstensi Chrome resmi untuk **Intlayer**. Buka ekstensi ini di situs web mana pun untuk melihat bagaimana situs tersebut menangani internasionalisasi: framework dan pustaka i18n apa yang digunakan, lokal apa saja yang disediakan, dan apakah tag SEO multibahasa telah dikonfigurasi dengan benar.

Ekstensi ini berfungsi di setiap situs web, baik yang menggunakan Intlayer maupun tidak.

![Ekstensi Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[Tautan ekstensi](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## Fitur

- **Deteksi teknologi**: mengidentifikasi framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) dan pustaka i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Setiap deteksi menampilkan bukti yang memicunya, seperti variabel global, cookie, atau penanda DOM.
- **Lokal (Locales)**: mencantumkan lokal yang ditemukan pada atribut `lang`, tag hreflang dan `og:locale`, awalan lokal URL, serta cookie atau entri penyimpanan lokal.
- **Tag SEO i18n**: memeriksa `html lang`, `html dir`, tautan kanonikal, tag hreflang, `x-default`, `og:locale`, dan rasio tautan internal yang dilokalisasi.
- **Navigasi antar locale**: mengalihkan halaman saat ini ke salah satu versi yang dilokalkan dengan satu klik, berdasarkan tag hreflang-nya.
- **Pencarian di sitemap**: mencari semua halaman yang tercantum di sitemap situs dan membukanya di tab saat ini.
- **Audit lengkap**: menjalankan audit yang sama dengan [Pemindai SEO i18n](https://intlayer.org/i18n-seo-scanner) dan menampilkan skor langsung.

## Instalasi

Pasang [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) dari Chrome Web Store, lalu sematkan ke toolbar Anda.

Ekstensi ini berfungsi di Chrome dan di peramban berbasis Chromium mana pun yang mendukung ekstensi Chrome Web Store (Edge, Brave, Arc, Opera).

## Penggunaan

### Memeriksa halaman

1. Buka situs web yang ingin Anda periksa.
2. Klik ikon **Intlayer i18n Scanner** di toolbar.
3. Popup akan menampilkan bagian **Teknologi yang terdeteksi**, **Lokal**, dan **Tag SEO i18n** untuk halaman saat ini.

Deteksi berjalan secara lokal di peramban Anda, hanya pada tab yang sedang aktif.

### Berpindah antar locale

![Navigasi Ekstensi Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

Bagian **Navigasi** menampilkan **Versi yang dilokalkan** dari halaman saat ini, dibaca dari tag hreflang-nya. Klik sebuah locale untuk membuka versi tersebut di tab saat ini.

Di **Halaman sitemap**, ketik untuk mencari URL dari sitemap situs, lalu klik hasil untuk membukanya.

### Menjalankan audit lengkap

![Skor audit Ekstensi Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Gulir ke bagian **Audit lengkap** dan klik **Jalankan audit i18n lengkap**. Hasil akan ditampilkan secara bertahap saat setiap pemeriksaan selesai, yang dikelompokkan ke dalam:

- **Halaman**: atribut `html lang` dan `dir`, lokal saat ini, tag hreflang, `x-default`, tautan kanonikal, tautan internal yang dilokalisasi, pemilih bahasa, ikon bendera, dan konten lokal yang tidak digunakan yang dikirim dalam bundle JavaScript.
- **Robots.txt**: keberadaan file dan apakah jalur lokal tetap dapat dirayapi oleh crawler.
- **Peta situs (Sitemap)**: keberadaan file, setiap lokal yang terdaftar, tautan alternatif, dan `x-default`.
- **Domain**: jumlah lokal yang ditemukan di seluruh situs web.

Setiap pemeriksaan ditandai sebagai lolos, peringatan, atau gagal, dan skor merangkum kesehatan SEO i18n secara keseluruhan dari halaman tersebut.

## Privasi dan izin

Ekstensi hanya meminta izin minimal:

- **activeTab** dan **scripting**: pendeteksi hanya berjalan pada tab yang sedang Anda lihat, dan hanya saat Anda membuka popup.
- **back.intlayer.org**: hanya digunakan saat Anda menjalankan audit lengkap. URL halaman saat ini dikirim ke API Intlayer untuk dipindai.

Tidak ada riwayat penjelajahan yang dikumpulkan dan tidak ada yang berjalan di latar belakang.

## FAQ

<FAQ>

<Question title="Apakah situs web harus menggunakan Intlayer?">

Tidak. Ekstensi ini dapat memeriksa situs web mana pun, apa pun framework atau pustaka i18n yang digunakan.

</Question>
<Question title="Mengapa suatu teknologi tidak terdeteksi?">

Deteksi bergantung pada apa yang diekspos oleh halaman di peramban: variabel global, cookie, tag meta, dan penanda DOM. Beberapa build produksi menghapus penanda ini, sehingga suatu pustaka mungkin sedang digunakan tanpa meninggalkan jejak yang terlihat.

</Question>
<Question title="Bagaimana cara memperbaiki masalah yang ditemukan oleh audit?">

Sebagian besar pemeriksaan berkaitan dengan pengaturan perutean atau metadata. Dengan Intlayer, hreflang, tautan kanonikal, `x-default`, tautan yang dilokalisasi, peta situs, dan robots.txt dihasilkan dari [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) Anda. Lihat panduan integrasi untuk framework Anda, misalnya [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md), atau [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Alat terkait

- [Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)
- [Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)

---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Tinjau Dokumen
description: Pelajari cara meninjau file dokumentasi untuk kualitas, konsistensi, dan kelengkapan di berbagai lokal.
keywords:
  - Tinjau
  - Dokumen
  - Dokumentasi
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# Tinjau Dokumen

Perintah `doc review` menganalisis file dokumentasi untuk kualitas, konsistensi, dan kelengkapan di berbagai lokal.

## Poin-poin penting:

- Membagi file markdown besar menjadi potongan-potongan untuk tetap berada dalam batas jendela konteks model AI.
- Mengoptimalkan potongan untuk ditinjau dan melewatkan bagian yang sudah diterjemahkan dan tidak berubah.
- Memproses file, potongan, dan locale secara paralel menggunakan sistem antrian untuk meningkatkan kecepatan.

```bash
npx intlayer doc review
```

Perintah ini dapat digunakan untuk meninjau file yang sudah diterjemahkan, dan untuk memeriksa apakah terjemahannya sudah benar.

Untuk sebagian besar kasus penggunaan,

- lebih baik menggunakan `doc translate` ketika versi terjemahan dari file ini belum tersedia.
- lebih baik menggunakan `doc review` ketika versi terjemahan dari file ini sudah ada.

> Perlu dicatat bahwa proses review mengonsumsi lebih banyak token entri dibandingkan proses translate untuk meninjau file yang sama secara keseluruhan. Namun, proses review akan mengoptimalkan chunk yang ditinjau, dan akan melewati bagian yang tidak berubah.

## Argumen:

Perintah `doc review` menerima argumen yang sama seperti `doc translate`, memungkinkan Anda untuk meninjau file dokumentasi tertentu dan menerapkan pemeriksaan kualitas.

Jika Anda mengaktifkan salah satu opsi git, perintah hanya akan meninjau bagian dari file yang mengalami perubahan. Skrip akan memproses dengan membagi file menjadi chunk dan meninjau setiap chunk. Jika tidak ada perubahan pada chunk tersebut, skrip akan melewatinya untuk mempercepat proses review dan membatasi biaya API Penyedia AI.

- Untuk daftar lengkap argumen, lihat dokumentasi perintah [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-translate.md).

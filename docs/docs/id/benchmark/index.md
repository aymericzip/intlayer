---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Benchmark library i18n
description: Pelajari perbandingan Intlayer dengan library i18n lainnya dalam hal performa dan ukuran bundle.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inisialisasi benchmark"
---

# Benchmark Bloom — Laporan

Benchmark Bloom adalah suite benchmarking performa yang mengukur dampak dunia nyata dari library i18n (internasionalisasi) di berbagai framework React dan strategi pemuatan (loading).

Temukan laporan terperinci dan dokumentasi teknis untuk setiap framework di bawah ini:

- [**Laporan Benchmark Next.js**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md)
- [**Laporan Benchmark TanStack Start**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

---

## Hasil Saat Ini

Lihat [**dasbor benchmark interaktif**](https://intlayer.org/benchmark) untuk perbandingan langsung dan data yang diringkas.
| `scoped-dynamic` | Tinggi (kebocoran mendekati nol) | Tinggi |

Beralih dari `static` ke `scoped-dynamic` biasanya mengurangi konten yang tidak digunakan sebesar 60–90%, tetapi memerlukan konfigurasi yang jauh lebih banyak. Library seperti Intlayer mengotomatiskan pola scoped-dynamic sehingga pengembang mendapatkan efisiensi tanpa kode boilerplate.

### Membaca angka kebocoran (leakage)

Kebocoran halaman sebesar **35%** berarti bahwa 35% JavaScript yang diunduh untuk halaman tersebut berisi string dari halaman lain — konten yang tidak dapat dilihat pengguna di halaman ini. Pada halaman 400 KB, itu berarti ~140 KB data yang sebenarnya bisa dihindari.

Kebocoran lokal (locale leakage) sebesar **10%** berarti 10% dari bundle berisi terjemahan dalam bahasa yang tidak digunakan oleh pengguna saat ini.

### Reaktivitas vs waktu render

- **Reaktivitas E2E**: mengukur pengalaman pengguna penuh: jaringan, overhead framework, pembaruan DOM.
- **Waktu React Profiler**: mengisolasi biaya re-render tree React.

Sebuah library bisa memiliki waktu Profiler yang rendah tetapi waktu E2E yang tinggi jika pergantian lokal melibatkan permintaan jaringan (mengambil file lokal baru). Sebaliknya, sebuah library bisa memiliki waktu Profiler yang tinggi tetapi tetap terasa cepat jika library tersebut melakukan batch pembaruan secara efisien.

---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Intlayer Analytics | Lacak paparan konten dan jalankan pengujian A/B (A/B testing)
description: Temukan bagaimana @intlayer/analytics melacak tampilan halaman/lokal dan paparan konten, dan bagaimana menggunakannya untuk menjalankan pengujian A/B (A/B testing) pada konten Intlayer Anda.
keywords:
  - Analytics (Analitik)
  - A/B Testing (Pengujian A/B)
  - Audience (Audiens)
  - Internationalization (Internasionalisasi)
  - Documentation (Dokumentasi)
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — paket @intlayer/analytics, pelacakan tingkat provider/node, pengujian A/B, dasbor"
author: aymericzip
---

# Dokumentasi Intlayer Analytics

`@intlayer/analytics` adalah paket pelengkap opsional yang memberi tahu Anda **konten mana yang benar-benar ditampilkan** kepada pengunjung Anda — halaman mana, dalam bahasa (locale) apa, dan bagian mana dari konten terjemahan yang spesifik — sehingga Anda dapat memahami audiens Anda dan menjalankan **pengujian A/B pada konten**.

## Daftar Isi (Table of Contents)

<TOC/>

---

## Apa yang dilacak (What it tracks)

`@intlayer/analytics` menggabungkan tiga jenis peristiwa anonim dalam sebuah batch:

| Peristiwa (Event)  | Di mana ditangkap                                 | Apa yang dikatakannya kepada Anda                                                                                                                       |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Tingkat Provider (`IntlayerProvider`)             | Halaman dan lokal (locale) mana yang dilihat oleh sesi (session), pada muat awal, perubahan rute, atau pergantian bahasa.                               |
| `content_exposure` | Tingkat Node (`useIntlayer` / plugin interpreter) | Kunci kamus / jalur kunci mana yang benar-benar diselesaikan (resolved) dan ditampilkan — dan jika bagian dari sebuah eksperimen, **varian** yang mana. |
| `conversion`       | Di mana pun Anda memanggil `useConversion()`      | Sebuah tujuan (goal) yang dicapai (pendaftaran, klik, pembelian...) yang diatribusikan ke varian A/B yang diekspos kepada sesi tersebut.                |

Peristiwa (events) dikumpulkan di dalam memori dan dikirimkan sebagai **sebuah permintaan batch tunggal kira-kira setiap 20 detik** — tidak pernah pada setiap ketikan (keystroke) atau saat di-render (render) — sehingga analitik tidak pernah berdampak pada waktu rendering pertama (first render time) atau menambahkan sebuah request setiap interaksi.

## Bagaimana hal ini mendukung pengujian A/B pada konten

Intlayer telah memungkinkan Anda mendeklarasikan [Varian (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) dari konten (misalnya kamus `hero-banner` yang memiliki varian `control` dan varian `black_friday`). `@intlayer/analytics` menutup siklus tersebut:

1. `getVariant(experimentKey, variants)` secara deterministik (deterministically) menugaskan (assign) setiap sesi anonim ke dalam sebuah varian — ini merupakan murni sebuah fungsi (pure function) dari session id dan experiment key, sehingga tugas (assignment) ini **stabil (stable) di seluruh sesi** dan tidak memerlukan **satu siklus ke server (server round-trip)** sebelum proses rendering pertama selesai dilakukan (tidak ada kelap-kelip / flicker, dan juga layout shift).
2. Setiap peristiwa `content_exposure` turut membawa `variant` yang dipertunjukkan tersebut.
3. `useConversion()` memungkinkan Anda untuk mengatribusikan (attribute) sebuah tujuan (goal) (contohnya `"cta_click"`) ke arah varian tersebut.
4. Titik-akhir (endpoint) terkait hasil eksperimen pada dasbor membandingkan tingkat konversi (conversion rates) dari setiap varian, termasuk dengan signifikansi statistik-nya (melalui z-test).

## Instalasi (Installation)

`@intlayer/analytics` adalah kebergantungan (dependency) yang bersifat **sepadan (peer), opsional** — dan paket framework mana pun tidak akan secara otomatis memasangnya. Anda perlu menambahkannya bersama dengan `intlayer`:

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Bila Anda memutuskan untuk tak memasangnya, maka titik temu / integrasi (integration point) ini diselesaikan menjadi hal yang tidak beroperasi atau no-op — silakan periksa rincian dari [Tidak ada biaya apa pun ketika tidak dipasang (Zero-cost ketika tidak dipasang)](#nol-biaya-saat-tidak-diinstal) pada poin selanjutnya di bawah.

## Konfigurasi (Configuration)

Analytics **menggunakan ulang rancangan pengaturan / blok konfigurasi `editor` yang sudah ada** — jadi tak ada rincian pengaturan maupun bentuk bagan tersendiri (analytics config schema) untuk diisikan:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Turut dipakai pula untuk keperluan analytics (berfungsi selaku analytics ingestion endpoint)
    clientId: "your-client-id", // Juga dipakai pada fungsi kunci proyek analytics / analytics project key
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — merupakan dasar (base) rujukan / acuan bagi URL saat peristiwa (event) analytics diantarkan ke sana (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — merujuk terhadap pengunci (key) bagi proyek publik agar dipertautkan / diatribusikan ke beragam input data. Tak hanya itu fungsinya turut bertindak layaknya **pemicu aktivasi (enable switch)**: analitik sepenuhnya dibuat pada tingkatan non-aktif (dan dalam kondisi ter-tree-shaken, perhatikan penjabarannya di bawah) sampai kemudian di saat fungsi `clientId` ini ditata & dikonfigurasikan.

Dalam situasi ketika melakukan hosting (self-host) mandiri akan halnya fungsi Intlayer ini, analitik bakal terpusat tanpa penyesuaian baru (otomatis) terhadap instalasi server Anda disebabkan rujukan pengaturannya adalah identik terhadap rujukan `editor.backendURL`.

## Dukungan Framework (Framework support)

Analytics sendiri disalurkan beriringan di saat mendayagunakan `IntlayerProvider` rujukan `react-intlayer`, dan pastinya ini membuatnya selalu sedia dipakai di belahan titik mana pun bilamana ia di-inisiasikan:

| Framework                                                | Status                                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Tersedia                                                                                       |
| Next.js (`next-intlayer`)                                | ✅ Tersedia (melalui `react-intlayer`)                                                            |
| React Native / Expo (`react-native-intlayer`)            | ✅ Tersedia (melalui `react-intlayer`)                                                            |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Direncanakan (Planned) — klien yang serupa, dalam tingkatan binding berlandaskan rilis standar |

## Penggunaan (Usage)

### Pelacakan tingkat provider (Automatic provider-level tracking)

Tidak perlu ada perubahan kode atau modifikasi koding apa pun. Setelah instalan dari `@intlayer/analytics` dipastikan, serta konfigurasinya mengacu terhadap `editor.clientId`, dengan cara yang langsung `IntlayerProvider` bertindak untuk:

- Melakukan proses inisialisasi awal klien (analytics client) saat mounting awal (mount),
- Mencatatkan satu rekam jejak rupa tampilan layar `page_view` sewaktu pemuatan yang pertama,
- Menginisiasi kembali pelacakan `page_view` ini sewaktu perpindahan wilayah pilihan penggunaan (locale change),
- Memunculkan mekanisme pusaran siklus (~20s flush loop) agar menyaring tuntas rincian atau pun serpihan yang melekat tanpa menunggu (unmount / tutupan pada tab halaman pengguna; yaitu memfungsikan `navigator.sendBeacon` yang bakal melakukan hal serupa disusul balikan perujukannya memakai `fetch(..., { keepalive: true })`).

### Pelacakan otomatis tingkat Node (Automatic node-level tracking)

Dalam segenap ragam resolusi muatan koding saat menampilkan serpihan / wujud konten pada panggilannya melewati rujukan pemakaian dari `useIntlayer`, interpreter di sistem melaporkan dan merekam serpihan data bertitelkan rujukan nama peristiwanya (event): `content_exposure` untuk paduan akurasi di hal penggunaan ini: `dictionaryKey` + arah pencariannya pada perincian jalan/aksesnya (key path) + daerah acuan pilihan pemakai (locale) — sekali lagi tak satu jengkal pun perubahan bentuk kode dilibatkan. Adanya wujud rentetan dari kemunculan satu buah referensi simpul penamaan (node) selama jangka tahapan pusar (flush window) maka keseluruhannya cuma dikumpulkan di dalam satu rangkuman catatan rujukan dan dibumbuhi tambahan catatan bilangan rekam-an `count`, ini menegaskan bahwasanya dari hal yang sama terulang dan memunculkan rupa ulang tampilan atau rendering tak-kurang-bahkan 50 kali sekalipun bukan berarti mengirimkan rincian berurutan dan mengada-adakan proses berulang (50 pengantaran yang diestimasikan terhitung secara manual).

### Memantau hal rekam pencapaian / Konversi test A/B (Tracking conversions for A/B tests)

Anda mesti menerapkan rincian `useConversion()` guna memandu sebuah tujuan akhir ke wujud sebuah variabel eksperimen dengan hasil pengamatan pengguna akhir (session):

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      Mari kita memulainya (Get started)
    </button>
  );
};
```

### Penyelesaian varian eksperimen klien secara internal (Resolving a variant client-side)

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Privasi dan Peforma (Privacy & performance)

- **Anonim semenjak disajikan di dalam rancang bangun rancangan arsitektur** (Anonymous by design): keseluruhan lalu-lintas data pengguna hanya akan mempergunakan nama acak yang bergilir secara unik (rotating id); fungsi-fungsi bagian hulu dari mesin server (backend) tidak pernah (secara langsung & tak sadar) me-rekam hasil catatan rujukan dalam hal ini IP dari pengguna asalnya — namun alih-alih me-rekam atau men-sirkulasikannya pada **rangkaian fungsi Hash SHA-256 (SHA-256 hash)** demi tujuan keutuhan.
- **Batasan dan acuan dari pemosisian sangat acak / menyeluruh (Location is coarse)**: rincian data disuplai melalui serangkaian fungsi pelacakan geo-posisi atau geolokasi di CDN headers (`cf-ipcountry`, `x-vercel-ip-country`, ...). Rangkaian tidak merekam data maupun menyalin posisi akurat IP penggunanya secara keseluruhan maupun sebagian di sepanjang lalu lalang dari setiap interaksi data di lapangan.
- **Rujukan URL senantiasa tidak menyingkap serpihan/sandi atau referensinya (URLs exclude search params)** berkat penetapan bawaan sistem di balik layar (default settings) demi kemaslahatan fungsi yang menyeluruh dari pengguna saat men-skrining pelacakan referensi penyamaran yang berkesinambungan.
- **Batasan perbandingan sampling (Sampling)**: `sampleRate` dapat diselaraskan atau diformat berdasarkan dari rentetan trafik atau kerumitan penelusuran demi fungsi kinerja tinggi aplikasi.
- **Mekanisme antrian pengiriman rupa-upa (Batched)**: Pengaturan ini mengatur bahwasanya ada rujukan rentang acuan di `flushInterval` dalam interval taksiran pengantaran ± setiap 20 detik (kira-kira) atau pun bila terhambat di `maxBufferSize` maka sistem bereaksi dan beraksi menyuplai secara masal dari sekumpulan rincian (batched) itu ke dalam rujukan tanpa mencederai prinsip asasi yakni 'tak-ada satu-pun rekaman penelusuran untuk setiap transaksi / satu peristiwa dikirim sebagai laporan sendiri'.

### Nol-biaya saat tidak diinstal (Zero-cost when not installed)

Fungsi di belakang layer yang senantiasa berlaku dalam hal-ihwal perincian `@intlayer/analytics` sepenuhnya taat terhadap acuan yang lazim dipakai, tak-ubahnya seperti keberadaan pakem atau patokan yang biasa mendasari / membidani / menyelimuti referensi kebergantungan situasional (optional-dependency pattern) dalam serangkaian fungsi dari ranah operasional `@intlayer/editor`:

- di setiap rupa kemunculan pada fase / titik pertautan (integration point) sistem senantiasa mendatangkan wujud dari kumpulan rujukan kodingnya dalam model penanganan kesalahan yaitu mendayagunakan blok rujukan di kerangka kodingan bersandikan **`try/catch` pada rangkaian perincian pemanggil model pemanggil dari fungsi / pola struktur pemrograman pemanggil dinamis `import()` (dynamic `import()`)** — Hal itu mengasumsikan bila ternyata sewaktu sistem di mana di satu aplikasi tak-menyematkan proses pasang modul / instal koding pendukung untuk instrumen ini (di kasus penggunaan rujukan spesifik bagi instalasi alat pelacak seperti instalasi di `@intlayer/analytics`) — itu sama sekali tak akan mengurangi sedikit pun ruang ketersediaan sistem penyedia data atau server karena sistem mengasumsikan penggunanya memang memandang sebelah mata perihal tersebut (yakni tak pernah merilis wujud dukungan alat operasional penganalisa data rujukan aplikasi untuk ukuran besar/bundel pada penyediaan / runtime di sisi sistem dan tidak perlu melihat kegagalan proses).
- di kala perincian ini sedang berjalan pada fase proses sistem mempabrikasinya menjadi bagian tak-terpisahkan maka hal ini dapat difungsikan pada pengaturan (`INTLAYER_ANALYTICS_ENABLED`) rujukan lingkungan pemrograman bawaan / baku dari waktu-kompilasi.
  Bentuk pengeset-an rupa-rupa di waktu-awal oleh koding pengatur yakni alat di lingkungan rancangan pemograman (`@intlayer/config`) menyelaraskannya seraya otomatis dikukuhkan kepada bentuk referensi bertuliskankan status `'false'` dan rujukan pengunci dari sisi / sisi koding pendefinisi tak ditemukan keberadaannya dari sisi koding acuan konfigurasi (`editor.clientId`). Proses berkesinambungan menyingkirkan elemen mati demi mencegah rupa serpihan sampah ini disebut sebagai — fitur pembuangan dari elemen kode mubazir (atau perlakuan ini dikenal di dunia sistem sebagai pemicu dalam fungsi acuan yang disebut hal **dead-code-eliminate**).

## Dasbor (Dashboard): Halaman Analitik

Saat di mana perancangan rupa proyek Anda secara sempurna rampung & mampu / bisa mengambil dan menyalin kejadian di ranahnya — perincian perujukan sistem dari pemanggil pada tautan **Analytics** pada tampilan di dasbor/pusat fungsi rujukan operasional pada antarmuka ([Intlayer dashboard](https://app.intlayer.org/analytics)) maka bagian tersebut senantiasa terbuka dan tampak bila pengguna menentukan opsi ke sebuah perwujudan pilihan atau proyek tertentu di dalam kolom-menu samping dari layar antar-muka operasional (sidebar) dan tampil perinciannya:

- **Rujukan dari pengunjung atau pemakai / pelanggan atau pengguna-aktif harian** (Active users).
- **Hasil catatan perihal rincian rujukan harian pengunjung / orang yang berlalu lalang (today & last 7 days)**.
- Rangkaian catatan **halaman-halaman** sepanjang jeda hari (Page views) pada periode tertentu.
- Acuan grafis visual yang menjelaskan laju/rekaman harian orang berkunjung.
- Seksi-seksi pilihan untuk mengatur penjabaran berdasarkan perpaduan antara **wilayah/Daerah pilihan pengguna (Locales)** dari pengunjung & acuan per wilayah pemetaan ke-negara / geografi.

## Referensi API Backend (Backend API reference)

Untuk segenap rincian di dalam pangkalan yang bersinggungan langsung sewaktu proses perujukan atau pembacaan-data meniscayakan perlunya satu identifikasi atau rujukan data terpusat (authenticated); proses sebaliknya (pemasukan referensi / ingestion) dibebaskan dan dirujuk & diatur lewat sebaris kode (`clientId`) yang dideklarasikan secara tertanam di sekujur bentuk operasional rincian pembawa referensinya (body parameter).

| Method | Endpoint                                    | Deskripsi                                                                                                      |
| ------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | Proses memasukkan referensi data per kumpulan data berantai (bersifat teruka, diatribusikan lewat `clientId`). |
| `GET`  | `/api/analytics/overview`                   | Kalkulasi halaman (Page) / Daerah Bahasa (Locale) terhadap hasil perhitungan autentikasi keseluruhan.          |
| `GET`  | `/api/analytics/audience?days=30`           | Menjabarkan serangkaian referensi harian untuk setiap ragam pengelompokannya berdasarkan rincian acuan.        |
| `GET`  | `/api/analytics/content-stats`              | Kumpulan kalkulasi (total) untuk masing-masing wujud paparan / eksposur (berkelompok & dikategorikan).         |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Nilai atau serangkaian nilai / referensi A/B test (pengaruh eksperimental dari wujud tampilan pembanding).     |

Fungsi SDK Intlayer secara otomatis menyalurkan ragam instrumen pada fungsi ini melalui jalur kode ter-automasi lewat pemrograman, hal tersebut senantiasa berpedoman kepada fungsi kodingan yang sama dari sumber SDK ini.
Lihat / Pelajari selengkapnya seputar: [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## Tautan Berguna (Useful links)

- [Kamus Dinamis - Koleksi & Varian (Dynamic Dictionaries - Collections & Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- [Editor Visual Intlayer (Intlayer Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [Referensi Konfigurasi (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Panduan Hosting Mandiri (Self-Hosting Guide)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md)

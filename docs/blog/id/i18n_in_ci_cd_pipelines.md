---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Mengotomatiskan Terjemahan di CI/CD Tanpa Mengirim Teks yang Buruk"
description: Tiga tempat untuk mengotomatiskan i18n, pre-push, pull request, dan runtime. Cara membatasi build berdasarkan cakupan, mengisi otomatis dengan aman, dan menghindari loop commit CI tanpa akhir.
keywords:
  - otomatisasi terjemahan ci
  - i18n ci cd
  - github actions terjemahan
  - husky pre-push
  - lokalisasi berkelanjutan
  - pipeline terjemahan
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Mengotomatiskan Terjemahan di CI/CD Tanpa Mengirim Teks yang Buruk

Terjemahan manual tidak dapat bertahan dalam ritme rilis modern. Seseorang menambahkan string pada hari Jumat, proses ekspor baru terjadi pada sprint berikutnya, dan pada saat itu tiga bahasa lainnya sudah tertinggal. Mengotomatiskannya sangat mudah. Mengotomatiskannya tanpa secara diam-diam menerbitkan output mesin tanpa tinjauan kepada pelanggan adalah bagian yang perlu dipikirkan secara matang.

## Daftar Isi

<TOC/>

## Anda tidak perlu bermigrasi untuk mengotomatiskan

Bentuk pipeline di bawah ini tidak bergantung pada library tertentu, begitu pula peralatannya. Jika pesan Anda berupa katalog JSON untuk i18next, next-intl, react-intl, vue-i18n, atau next-translate, [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) membaca dan menulis file-file tersebut langsung di tempat:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // atau "icu" untuk next-intl / react-intl
    }),
  ],
};

export default config;
```

Aplikasi Anda tetap mengimpor file seperti biasa. Tugas CI berikut ini kemudian mengisi dan memverifikasi katalog yang ada, dan perbedaan (diff) yang dilihat oleh reviewer adalah perubahan pada `locales/fr/checkout.json`, bukan migrasi kode besar-besaran. Terdapat juga [plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) untuk alur kerja gettext, dan [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) jika Anda ingin API runtime tetap tidak berubah.

## Pisahkan gerbang pemeriksaan (gate) dari pengisian (fill)

Dua tugas yang berbeda ini sering kali tertukar.

Sebuah **gate** adalah pemeriksaan yang dapat gagal. Ini menyatakan bahwa build ini tidak boleh dirilis karena ada locale wajib yang belum lengkap. Gate tidak menulis file apa pun.

Sebuah **fill** adalah proses mutasi data. Ini menghasilkan terjemahan yang hilang dan melakukan commit. Fill tidak pernah menggagalkan build.

Menjalankan fill saja berarti tidak ada yang pernah diblokir, dan terjemahan mesin yang belum ditinjau akan langsung mengalir ke produksi. Menjalankan gate saja berarti build akan sering merah dan manusia harus turun tangan memperbaikinya setiap saat. Sebagian besar tim menginginkan keduanya dengan pemicu berbeda: fill pada pull request, gate saat merge ke branch rilis.

## Tempat otomasi dapat diterapkan

| Tahap         | Pemicu    | Cocok untuk                               | Biaya                                             |
| :------------ | :-------- | :---------------------------------------- | :------------------------------------------------ |
| Hook pre-push | Git lokal | Umpan balik cepat, nol menit CI           | Berjalan di komputer developer dan API key mereka |
| Pull request  | Job CI    | Review sebelum merge, satu tempat rahasia | Menit CI ditambah panggilan model per PR          |
| Branch rilis  | Job CI    | Gerbang ketat untuk cakupan terjemahan    | Murah, tidak ada panggilan ke model AI            |
| Runtime       | CMS       | Perubahan konten tanpa build ulang        | Ketergantungan layanan hosting                    |

## Pre-push: putaran tercepat

Husky menjalankan proses pengisian sebelum kode meninggalkan komputer lokal, sehingga terjemahan tiba dalam push yang sama dengan string yang membutuhkannya.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` membatasi pekerjaan pada konten yang belum di-push, mencegah proses memakan waktu lama pada setiap push. `--mode complete` hanya mengisi apa yang hilang tanpa menulis ulang entri yang sudah memiliki nilai, sehingga terjemahan yang sudah ditinjau manusia tidak akan pernah ditimpa secara diam-diam.

Untuk monorepo, tentukan cakupan per aplikasi:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

Kelemahannya nyata: setiap pengembang membutuhkan API key, dan biayanya dibebankan kepada siapa pun yang melakukan push. Itulah sebabnya sebagian besar tim memindahkan proses ini ke CI saat tim berkembang.

## Pull request: isi di tempat review dilakukan

Pekerjaan yang sama di GitHub Actions, dibatasi pada diff:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Empat detail di dalamnya sangat krusial:

- **`fetch-depth: 0`** wajib ada agar `--git-diff` dapat bekerja. Kloning dangkal (shallow clone) tidak memiliki basis perbandingan untuk diff, sehingga proses pengisian tidak mencakup apa pun secara diam-diam.
- **`[skip ci]` dalam pesan commit** mencegah workflow memicu dirinya sendiri tanpa akhir. Tanpa ini, commit memicu eksekusi baru yang kemudian commit lagi, menghabiskan kuota CI dalam semalam.
- **`concurrency` dengan `cancel-in-progress`** mencegah dua push bersamaan berebut menulis ke file yang sama.
- **`--git-diff`** membatasi pengisian hanya pada apa yang diubah dalam PR. Jika diabaikan, Anda akan menerjemahkan ulang seluruh katalog pada setiap proses.

Terjemahan akan masuk sebagai commit di branch PR, yang berarti reviewer dapat memeriksanya di diff. Itulah inti dari melakukannya di sini daripada setelah merge.

## Branch rilis: gerbang pemeriksaan (gate)

Gate tidak memerlukan akses model dan harus selesai dengan cepat.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Didukung oleh tes yang menguji cakupan melalui assertion daripada sekadar laporan teks CLI:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` mencetak laporan tetapi keluar dengan kode nol, sehingga hanya memberi tahu tanpa memblokir build. Gunakan itu secara lokal; gunakan assertion tes di CI. Rincian lebih lanjut di [menemukan terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md).

## `requiredLocales` membuat gate dapat bertahan di dunia nyata

Sebuah gerbang yang menuntut lengkapnya semua delapan belas bahasa akan memblokir setiap rilis hingga bahasa yang paling lambat selesai, dan biasanya dinonaktifkan dalam waktu satu bulan.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Deklarasikan bahasa yang Anda layani, dan jadikan wajib hanya bahasa yang benar-benar harus memblokir rilis. Sisanya dapat dilengkapi secara asinkron tanpa menahan jadwal deployment.

## Memisahkan terjemahan sepenuhnya dari repositori

Model lainnya adalah mendeklarasikan satu bahasa utama dalam kode dan mengelola sisanya dari jarak jauh melalui CMS dengan Live Sync. Perubahan konten kemudian tidak memerlukan proses build ulang aplikasi, memisahkan ritme pembaruan teks dari ritme deploy kode.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Ini cocok untuk tim di mana non-developer mengelola konten. Ini adalah kompromi: Anda mendapatkan otonomi editor namun kehilangan jaminan bahwa git checkout secara mandiri mendeskripsikan secara tepat apa yang dirender aplikasi. Detailnya di [dokumentasi CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

Harap dicatat bahwa `clientSecret` adalah kredensial sisi server. Kunci ini harus berada di rahasia CI dan variabel lingkungan server Anda, tidak boleh masuk ke bundle klien.

## Batasan nyata yang harus disadari

Semua yang dijelaskan di atas mengotomatiskan _cakupan (coverage)_, bukan _kualitas_. Pengisian mesin mengubah celah yang terlihat menjadi tidak terlihat: audit menjadi hijau karena kunci sekarang memiliki nilai, tetapi belum ada manusia yang membacanya.

Itu dapat diterima untuk alat internal, catatan rilis, atau locale dalam versi beta. Ini tidak dapat diterima untuk penetapan harga, dokumen hukum, pesan kesalahan pembayaran, atau apa pun yang dibaca pelanggan sebelum mengambil keputusan. Arahkan teks penting tersebut melalui peninjauan manusia, dan gunakan `--mode complete` di mana saja agar string yang sudah diperiksa tidak pernah ditimpa.

Beri konteks pada model agar keluarannya konsisten:

```ts
ai: {
  applicationContext: "Aplikasi faktur B2B. Gaya bahasa formal. Jangan pernah menerjemahkan nama produk.",
}
```

## Kesalahan umum

- **Tidak ada `[skip ci]` pada auto-commit.** Alur kerja memicu dirinya sendiri dalam lingkaran tanpa akhir.
- **Shallow clone dengan `--git-diff`.** Tidak ada basis diff, tidak ada yang diisi dan tidak ada error yang dilaporkan.
- **Mengisi seluruh katalog pada setiap proses.** Batasi dengan `--git-diff` atau `--unpushed` untuk mengontrol tagihan.
- **Menggunakan laporan CLI sebagai gate.** Perintah keluar dengan kode 0 sehingga build tetap lolos.
- **Mewajibkan semua locale.** Gerbang langsung dinonaktifkan saat pertama kali memblokir rilis penting.
- **Job pengisian tanpa gerbang verifikasi.** Tidak ada yang pernah gagal, sehingga teks mesin tanpa review langsung tayang di produksi.
- **Menyimpan API key model di dalam repo.** Kunci harus disimpan di rahasia CI, sama seperti `clientSecret`.

## Pelajari lebih lanjut

- [CI/CD: membuat terjemahan otomatis dengan Husky, GitHub Actions, dan CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md)
- [Menguji konten Anda dan membatasi build berdasarkan cakupan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md)
- [autoFill: menghasilkan file deklarasi per-locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md)
- [Referensi konfigurasi: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Laporan benchmark performa antar berbagai framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)
- [Adapter kompatibilitas i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md)
- [Cara mendeteksi terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md)
- [Cara menguji terjemahan tanpa tes yang rapuh](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_testing_strategies.md)

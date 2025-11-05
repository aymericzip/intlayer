---
createdAt: 2025-03-01
updatedAt: 2025-10-05
title: Menguji konten Anda
description: Temukan cara menguji konten Anda dengan Intlayer.
keywords:
  - Pengujian
  - Intlayer
  - Internasionalisasi
  - CMS
  - Sistem Manajemen Konten
  - Editor Visual
slugs:
  - doc
  - testing
history:
  - version: 6.0.1
    date: 2025-10-05
    changes: Membuat pengujian asinkron dan menambahkan opsi build
  - version: 6.0.0
    date: 2025-09-20
    changes: Pengenalan pengujian
---

# Menguji konten Anda

Panduan ini menunjukkan cara memverifikasi secara otomatis bahwa kamus Anda lengkap, menangkap terjemahan yang hilang sebelum pengiriman, dan menguji UI yang dilokalisasi dalam aplikasi Anda.

---

## Apa yang bisa Anda uji

- **Terjemahan yang hilang**: gagal CI jika ada locale yang diperlukan hilang untuk kamus apa pun.
- **Rendering UI yang dilokalisasi**: render komponen dengan penyedia locale tertentu dan pastikan teks/atribut yang terlihat.
- **Audit saat build**: jalankan audit cepat secara lokal melalui CLI.

---

## Mulai cepat: audit melalui CLI

Jalankan audit dari root proyek Anda:

```bash
npx intlayer content test
```

Flag yang berguna:

- `--env-file [path]`: memuat variabel lingkungan dari sebuah file.
- `-e, --env [name]`: memilih profil lingkungan.
- `--base-dir [path]`: menetapkan direktori dasar aplikasi untuk resolusi.
- `--verbose`: menampilkan log secara detail.
- `--prefix [label]`: menambahkan prefix pada baris log.
- `--build [build]`: membangun kamus sebelum pengujian untuk memastikan konten terbaru. True akan memaksa build, false akan melewati build, undefined akan menggunakan cache build.

Catatan: CLI mencetak laporan terperinci tetapi tidak keluar dengan kode non-zero saat terjadi kegagalan. Untuk pengujian CI, tambahkan unit test (di bawah) yang memastikan tidak ada locale wajib yang hilang.

---

## Pengujian programatik (Vitest/Jest)

Gunakan Intlayer CLI API untuk memastikan tidak ada terjemahan yang hilang untuk locale wajib Anda.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Berguna saat pengujian gagal secara lokal atau di CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Setara Jest:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("tidak ada locale wajib yang hilang", async () => {
  const result = await listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // Berguna saat pengujian gagal secara lokal atau di CI
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Cara kerjanya:

- Intlayer membaca konfigurasi Anda (locales, requiredLocales) dan kamus yang dideklarasikan, lalu melaporkan:
  - `missingTranslations`: per kunci, locale mana yang hilang dan dari file mana.
  - `missingLocales`: gabungan dari semua locale yang hilang.
  - `missingRequiredLocales`: subset terbatas pada `requiredLocales` (atau semua locales jika `requiredLocales` tidak disetel).

---

## Menguji UI yang dilokalkan (React / Next.js)

Render komponen di bawah penyedia Intlayer dan lakukan assert pada konten yang terlihat.

Contoh React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("menampilkan judul yang dilokalkan dalam bahasa Inggris", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Expected English title")).toBeInTheDocument();
});
```

Contoh Next.js (App Router): gunakan pembungkus framework:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("menampilkan heading yang dilokalkan dalam bahasa Prancis", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Tips:

- Saat Anda membutuhkan nilai string mentah untuk atribut (misalnya, `aria-label`), akses field `.value` yang dikembalikan oleh `useIntlayer` di React.
- Simpan kamus berdekatan dengan komponen untuk memudahkan pengujian unit dan pembersihan.

---

## Integrasi Berkelanjutan

Tambahkan pengujian yang akan membuat build gagal ketika terjemahan yang dibutuhkan hilang.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Contoh GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Opsional: jalankan audit CLI untuk ringkasan yang mudah dibaca manusia bersamaan dengan pengujian:

```bash
npx intlayer content test --verbose
```

---

## Pemecahan Masalah

- Pastikan konfigurasi Intlayer Anda mendefinisikan `locales` dan (opsional) `requiredLocales`.
- Jika aplikasi Anda menggunakan kamus dinamis atau jarak jauh, jalankan pengujian di lingkungan di mana kamus tersebut tersedia.
- Untuk monorepo campuran, gunakan `--base-dir` untuk mengarahkan CLI ke root aplikasi yang benar.

---

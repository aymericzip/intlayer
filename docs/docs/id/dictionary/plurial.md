---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Jamak (Plural)
description: Pelajari cara mendeklarasikan dan menggunakan konten jamak yang sadar lokal (berbasis CLDR) di situs web multibahasa Anda. Ikuti langkah-langkah dalam dokumentasi online ini untuk menyiapkan proyek Anda dalam beberapa menit.
keywords:
  - Jamak
  - Pluralisasi
  - CLDR
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# Konten Jamak / Jamak di Intlayer

## Cara Kerja Jamak

Di Intlayer, konten jamak dicapai melalui fungsi `plural`, yang memetakan kategori jamak CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, ke konten yang sesuai. Kategori yang benar dipilih secara otomatis berdasarkan lokal aktif dan nilai hitungan, menggunakan API [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) bawaan platform.

Berbeda dengan [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/enumeration.md), yang memilih konten berdasarkan rentang numerik yang Anda tentukan sendiri, `plural` mendelegasikan pemilihan ke aturan CLDR. Inilah yang membuatnya skalabel untuk bahasa dengan aturan pluralisasi yang kompleks, seperti Rusia, Polandia, Arab, atau Welsh, tanpa harus menulis logika modulo secara manual.

## Kapan Menggunakan `plural` vs `enu`

| Kasus penggunaan                                                         | Helper   |
| ------------------------------------------------------------------------ | -------- |
| Bentuk jamak gramatikal yang sadar lokal (satu apel / dua apel / 5 apel) | `plural` |
| Rentang numerik khusus (`<5`, `>=10`) atau bucket non-CLDR               | `enu`    |

Jika Anda hanya menargetkan bahasa Inggris atau Indonesia (yang hanya memiliki `one` / `other` atau bahkan tidak memiliki perubahan bentuk jamak yang kompleks), keduanya berfungsi. Untuk bahasa apa pun dengan perbedaan `few` / `many` / `two`, lebih baik gunakan `plural`.

## Menyiapkan Konten Jamak

Untuk menyiapkan konten jamak dalam proyek Intlayer Anda, buat modul konten yang menggunakan helper `plural`. Kategori `other` wajib ada dan digunakan sebagai fallback ketika lokal tidak menentukan kategori yang lebih spesifik.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      id: plural({
        other: "{{count}} lowongan",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "id": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} lowongan"
          }
        }
      }
    }
  }
}
```

> Kategori yang didukung adalah `zero`, `one`, `two`, `few`, `many`, `other`. Anda hanya perlu mendeklarasikan kategori yang digunakan bahasa target Anda, Intlayer kembali ke `other` ketika tidak ada kategori spesifik yang cocok.
>
> Placeholder `{{count}}` secara otomatis diganti dengan hitungan yang Anda berikan saat runtime. Anda juga dapat menyertakan placeholder lain (lihat [Placeholder khusus](#custom-placeholders) di bawah).

## Menggunakan Konten Jamak dengan React Intlayer

Untuk menggunakan konten jamak di dalam komponen React, ambil melalui hook `useIntlayer` dan panggil dengan hitungan. Lokal aktif dan hitungan digabungkan untuk memilih kategori CLDR yang cocok.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* Dalam bahasa Inggris:                               */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Anda dapat memanggil fungsi yang dikembalikan dengan dua cara yang setara:

```tsx
totalOpenings(21); // singkatan: hanya hitungan
totalOpenings({ count: 21 }); // bentuk eksplisit
```

## Placeholder khusus

String jamak dapat menyertakan placeholder selain `{{count}}`. Lewatkan dalam bentuk objek bersama `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      other: "{{name}}, Anda memiliki {{count}} pesan baru",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, Anda memiliki 1 pesan baru"

summary({ count: 7, name: "Alice" });
// → "Alice, Anda memiliki 7 pesan baru"
```

## Sekilas Kategori CLDR

Bahasa yang berbeda menggunakan subset kategori CLDR yang berbeda. Beberapa kasus umum:

| Bahasa                        | Kategori yang digunakan                      |
| ----------------------------- | -------------------------------------------- |
| Inggris (`en`)                | `one`, `other`                               |
| Prancis (`fr`)                | `one`, `many`, `other`                       |
| Rusia (`ru`)                  | `one`, `few`, `many`, `other`                |
| Polandia (`pl`)               | `one`, `few`, `many`, `other`                |
| Arab (`ar`)                   | `zero`, `one`, `two`, `few`, `many`, `other` |
| Jepang / Mandarin / Indonesia | `other` saja                                 |

Anda tidak perlu menghafal ini, deklarasikan kategori yang Anda miliki terjemahannya, dan Intlayer akan kembali ke `other` jika diperlukan.

## Batasan

Dibandingkan dengan node lain, `plural` belum dapat disarangkan (nested) dengan node anak.

Contoh:

Valid:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Tidak Valid:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## Sumber Daya Tambahan

Untuk informasi lebih rinci tentang konfigurasi dan penggunaan, lihat sumber daya berikut:

- [Dokumentasi Enumerasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/enumeration.md)
- [Dokumentasi Inseri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md)
- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)

Sumber daya ini menawarkan wawasan lebih lanjut tentang penyiapan dan penggunaan Intlayer di berbagai lingkungan dan kerangka kerja.

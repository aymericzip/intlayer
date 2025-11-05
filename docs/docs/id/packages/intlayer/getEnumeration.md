---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi getEnumeration | intlayer
description: Lihat cara menggunakan fungsi getEnumeration untuk paket intlayer
keywords:
  - getEnumeration
  - terjemahan
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `getEnumeration` di `intlayer`

## Deskripsi

Fungsi `getEnumeration` mengambil konten yang sesuai dengan kuantitas tertentu berdasarkan kondisi yang telah ditentukan dalam objek enumerasi. Kondisi-kondisi tersebut didefinisikan sebagai kunci, dan prioritasnya ditentukan oleh urutan mereka dalam objek.

## Parameter

- `enumerationContent: QuantityContent<Content>`
  - **Deskripsi**: Sebuah objek di mana kunci mewakili kondisi (misalnya, `<=`, `<`, `>=`, `=`) dan nilai mewakili konten yang sesuai. Urutan kunci menentukan prioritas pencocokan mereka.
  - **Tipe**: `QuantityContent<Content>`
    - `Content` dapat berupa tipe apa pun.

- `quantity: number`
  - **Deskripsi**: Nilai numerik yang digunakan untuk mencocokkan dengan kondisi dalam `enumerationContent`.
  - **Tipe**: `number`

## Mengembalikan

- **Tipe**: `Content`
- **Deskripsi**: Konten yang sesuai dengan kondisi pertama yang cocok dalam `enumerationContent`. Jika tidak ditemukan kecocokan, maka akan ditangani sesuai dengan implementasi (misalnya, error atau konten fallback).

## Contoh Penggunaan

### Penggunaan Dasar

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Anda memiliki kurang dari -2.3",
    "<1": "Anda memiliki kurang dari satu",
    "2": "Anda memiliki dua",
    ">=3": "Anda memiliki tiga atau lebih",
  },
  2
);

console.log(content); // Output: "Anda memiliki dua"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Anda memiliki kurang dari satu",
    "2": "Anda memiliki dua",
    ">=3": "Anda memiliki tiga atau lebih",
  },
  2
);

console.log(content); // Output: "Anda memiliki dua"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Anda memiliki kurang dari satu",
    "2": "Anda memiliki dua",
    ">=3": "Anda memiliki tiga atau lebih",
  },
  2
);

console.log(content); // Output: "Anda memiliki dua"
```

### Prioritas Kondisi

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Anda memiliki kurang dari empat",
    "2": "Anda memiliki dua",
  },
  2
);

console.log(content); // Output: "Anda memiliki kurang dari empat"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Anda memiliki kurang dari empat",
    "2": "Anda memiliki dua",
  },
  2
);

console.log(content); // Output: "Anda memiliki kurang dari empat"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Anda memiliki kurang dari empat",
    "2": "Anda memiliki dua",
  },
  2
);

console.log(content); // Output: "Anda memiliki kurang dari empat"
```

## Kasus Tepi

- **Tidak Ada Kondisi yang Cocok:**
  - Jika tidak ada kondisi yang cocok dengan kuantitas yang diberikan, fungsi akan mengembalikan `undefined` atau menangani skenario default/fallback secara eksplisit.

- **Kondisi Ambigu:**
  - Jika kondisi saling tumpang tindih, kondisi yang pertama cocok (berdasarkan urutan objek) yang akan diutamakan.

- **Kunci Tidak Valid:**
  - Fungsi mengasumsikan bahwa semua kunci dalam `enumerationContent` valid dan dapat diurai sebagai kondisi. Kunci yang tidak valid atau format yang salah dapat menyebabkan perilaku yang tidak terduga.

- **Penegakan TypeScript:**
  - Fungsi memastikan bahwa tipe `Content` konsisten di semua kunci, memungkinkan keamanan tipe pada konten yang diambil.

## Catatan

- Utilitas `findMatchingCondition` digunakan untuk menentukan kondisi yang sesuai berdasarkan kuantitas yang diberikan.

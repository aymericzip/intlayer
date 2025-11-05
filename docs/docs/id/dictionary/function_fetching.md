---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Pengambilan Fungsi
description: Temukan cara mendeklarasikan dan menggunakan pengambilan fungsi di situs web multibahasa Anda. Ikuti langkah-langkah dalam dokumentasi online ini untuk mengatur proyek Anda dalam beberapa menit.
keywords:
  - Pengambilan Fungsi
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
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Pengambilan Fungsi

Intlayer memungkinkan Anda untuk mendeklarasikan fungsi konten dalam modul konten Anda, yang dapat bersifat sinkron atau asinkron. Ketika aplikasi dibangun, Intlayer menjalankan fungsi-fungsi ini untuk mendapatkan hasil dari fungsi tersebut. Nilai yang dikembalikan harus berupa objek JSON atau nilai sederhana seperti string atau angka.

> Peringatan: pengambilan fungsi saat ini tidak tersedia dalam deklarasi konten JSON dan file deklarasi konten jarak jauh.

## Deklarasi Fungsi

Berikut adalah contoh pengambilan konten fungsi sinkron sederhana:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Ini adalah konten yang dirender oleh sebuah fungsi",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Ini adalah konten yang dirender oleh sebuah fungsi",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Ini adalah konten yang dirender oleh sebuah fungsi"
  }
}
```

Dalam contoh ini, kunci `text` berisi sebuah fungsi yang mengembalikan sebuah string. Konten ini dapat dirender dalam komponen React Anda menggunakan paket interpreter Intlayer seperti `react-intlayer`.

## Pengambilan Fungsi Asinkron

Selain fungsi sinkron, Intlayer mendukung fungsi asinkron, memungkinkan Anda untuk mengambil data dari sumber eksternal atau mensimulasikan pengambilan data dengan data tiruan (mock data).

Berikut adalah contoh fungsi asinkron yang mensimulasikan pengambilan dari server:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Tunggu selama 200ms untuk mensimulasikan pengambilan dari server
  return await setTimeout(200).then(
    () => "Ini adalah konten yang diambil dari server"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Tunggu selama 200ms untuk mensimulasikan pengambilan dari server
  await setTimeout(200);
  return "Ini adalah konten yang diambil dari server";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Tunggu selama 200ms untuk mensimulasikan pengambilan dari server
  await setTimeout(200);
  return "Ini adalah konten yang diambil dari server";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Tidak ada cara untuk mengambil konten dari file JSON, gunakan file .ts atau .js sebagai gantinya
```

Dalam kasus ini, fungsi `fakeFetch` meniru penundaan untuk mensimulasikan waktu respons server. Intlayer menjalankan fungsi asinkron dan menggunakan hasilnya sebagai konten untuk kunci `text`.

## Menggunakan Konten Berbasis Fungsi dalam Komponen React

Untuk menggunakan konten berbasis fungsi dalam komponen React, Anda perlu mengimpor `useIntlayer` dari `react-intlayer` dan memanggilnya dengan ID konten untuk mengambil konten tersebut. Berikut adalah contohnya:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Output: Ini adalah konten yang dirender oleh sebuah fungsi */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: Ini adalah konten yang diambil dari server */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Output: Ini adalah konten yang dirender oleh sebuah fungsi */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: Ini adalah konten yang diambil dari server */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Output: Ini adalah konten yang dirender oleh sebuah fungsi */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: Ini adalah konten yang diambil dari server */}
    </div>
  );
};

module.exports = MyComponent;
```

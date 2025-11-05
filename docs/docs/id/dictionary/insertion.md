---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Penyisipan
description: Pelajari cara mendeklarasikan dan menggunakan placeholder penyisipan dalam konten Anda. Dokumentasi ini memandu Anda melalui langkah-langkah untuk menyisipkan nilai secara dinamis dalam struktur konten yang telah ditentukan.
keywords:
  - Penyisipan
  - Konten Dinamis
  - Placeholder
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Konten Penyisipan / Penyisipan di Intlayer

## Cara Kerja Penyisipan

Di Intlayer, konten penyisipan dicapai melalui fungsi `insertion`, yang mengidentifikasi bidang placeholder dalam sebuah string (seperti `{{name}}` atau `{{age}}`) yang dapat diganti secara dinamis saat runtime. Pendekatan ini memungkinkan Anda membuat string yang fleksibel seperti template di mana bagian tertentu dari konten ditentukan oleh data yang dikirim dari aplikasi Anda.

Saat diintegrasikan dengan React Intlayer atau Next Intlayer, Anda cukup menyediakan objek data yang berisi nilai untuk setiap placeholder, dan Intlayer akan secara otomatis merender konten dengan placeholder yang sudah diganti.

## Menyiapkan Konten Penyisipan

Untuk menyiapkan konten penyisipan dalam proyek Intlayer Anda, buat modul konten yang mencakup definisi penyisipan Anda. Berikut adalah contoh dalam berbagai format.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Halo, nama saya {{name}} dan saya berumur {{age}} tahun!"
    ),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Halo, nama saya {{name}} dan saya berumur {{age}} tahun!"
    ),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Halo, nama saya {{name}} dan saya berumur {{age}} tahun!"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Halo, nama saya {{name}} dan saya berumur {{age}} tahun!",
    },
  },
}
```

## Menggunakan Konten Insertion dengan React Intlayer

Untuk memanfaatkan konten insertion dalam sebuah komponen React, impor dan gunakan hook `useIntlayer` dari paket `react-intlayer`. Hook ini mengambil konten untuk kunci yang ditentukan dan memungkinkan Anda untuk mengirimkan sebuah objek yang memetakan setiap placeholder dalam konten Anda ke nilai yang ingin Anda tampilkan.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: "Halo, nama saya John dan saya berumur 30 tahun!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Anda dapat menggunakan kembali insertion yang sama dengan nilai yang berbeda */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: "Halo, nama saya John dan saya berumur 30 tahun!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Anda dapat menggunakan kembali insertion yang sama dengan nilai berbeda */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: "Halo, nama saya John dan saya berumur 30 tahun!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Anda dapat menggunakan kembali insertion yang sama dengan nilai yang berbeda */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Sumber Daya Tambahan

Untuk informasi lebih rinci tentang konfigurasi dan penggunaan, lihat sumber daya berikut:

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)

Sumber daya ini menawarkan wawasan lebih lanjut tentang pengaturan dan penggunaan Intlayer di berbagai lingkungan dan framework.

---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Konten Kondisional
description: Pelajari cara menggunakan konten kondisional di Intlayer untuk menampilkan konten secara dinamis berdasarkan kondisi tertentu. Ikuti dokumentasi ini untuk mengimplementasikan kondisi secara efisien dalam proyek Anda.
keywords:
  - Konten Kondisional
  - Rendering Dinamis
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - condition
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Konten Kondisional / Kondisi di Intlayer

## Cara Kerja Kondisi

Di Intlayer, konten kondisional dicapai melalui fungsi `cond`, yang memetakan kondisi spesifik (biasanya nilai boolean) ke konten yang sesuai. Pendekatan ini memungkinkan Anda untuk memilih konten secara dinamis berdasarkan kondisi yang diberikan. Ketika diintegrasikan dengan React Intlayer atau Next Intlayer, konten yang tepat secara otomatis dipilih sesuai dengan kondisi yang diberikan saat runtime.

## Menyiapkan Konten Kondisional

Untuk menyiapkan konten kondisional dalam proyek Intlayer Anda, buat modul konten yang mencakup definisi kondisional Anda. Berikut adalah contoh dalam berbagai format.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "konten saya ketika kondisinya benar",
      false: "konten saya ketika kondisinya salah",
      fallback: "konten saya ketika kondisi gagal", // Opsional
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "konten saya ketika kondisinya benar",
      false: "konten saya ketika kondisinya salah",
      fallback: "konten saya ketika kondisi gagal", // Opsional
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "konten saya ketika kondisinya benar",
      false: "konten saya ketika kondisinya salah",
      fallback: "konten saya ketika kondisi gagal", // Opsional
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "konten saya ketika kondisinya benar",
        "false": "konten saya ketika kondisinya salah",
        "fallback": "konten saya ketika kondisi gagal", // Opsional
      },
    },
  },
}
```

> Jika tidak ada fallback yang dideklarasikan, kunci terakhir yang dideklarasikan akan diambil sebagai fallback jika kondisi tidak terpenuhi.

## Menggunakan Konten Kondisional dengan React Intlayer

Untuk memanfaatkan konten kondisional dalam sebuah komponen React, impor dan gunakan hook `useIntlayer` dari paket `react-intlayer`. Hook ini mengambil konten untuk kunci yang ditentukan dan memungkinkan Anda untuk melewatkan kondisi untuk memilih output yang sesuai.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: konten saya ketika kondisinya benar */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika kondisinya salah */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika kondisi gagal */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika kondisi gagal */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: konten saya ketika kondisinya salah */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika kondisi gagal */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika kondisi gagal */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: konten saya ketika kondisinya benar */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika kondisinya salah */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika kondisi gagal */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika kondisi gagal */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Sumber Daya Tambahan

Untuk informasi lebih rinci tentang konfigurasi dan penggunaan, lihat sumber daya berikut:

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)

Sumber daya ini menawarkan wawasan lebih lanjut tentang pengaturan dan penggunaan Intlayer di berbagai lingkungan dan framework.

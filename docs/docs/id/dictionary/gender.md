---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Konten Berdasarkan Gender
description: Pelajari cara menggunakan konten berdasarkan gender di Intlayer untuk menampilkan konten secara dinamis berdasarkan gender. Ikuti dokumentasi ini untuk mengimplementasikan konten spesifik gender secara efisien dalam proyek Anda.
keywords:
  - Konten Berdasarkan Gender
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
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Memperkenalkan konten berdasarkan gender
---

# Konten Berdasarkan Gender / Gender di Intlayer

## Cara Kerja Gender

Di Intlayer, konten berdasarkan gender dicapai melalui fungsi `gender`, yang memetakan nilai gender spesifik ('male', 'female') ke konten yang sesuai. Pendekatan ini memungkinkan Anda untuk memilih konten secara dinamis berdasarkan gender yang diberikan. Ketika diintegrasikan dengan React Intlayer atau Next Intlayer, konten yang tepat secara otomatis dipilih sesuai dengan gender yang diberikan saat runtime.

## Menyiapkan Konten Berdasarkan Gender

Untuk menyiapkan konten berdasarkan gender dalam proyek Intlayer Anda, buat modul konten yang mencakup definisi spesifik gender Anda. Berikut adalah contoh dalam berbagai format.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "konten saya untuk pengguna laki-laki",
      female: "konten saya untuk pengguna perempuan",
      fallback: "konten saya ketika gender tidak ditentukan", // Opsional
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "konten saya untuk pengguna laki-laki",
      female: "konten saya untuk pengguna perempuan",
      fallback: "konten saya ketika gender tidak ditentukan", // Opsional
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "konten saya untuk pengguna laki-laki",
      female: "konten saya untuk pengguna perempuan",
      fallback: "konten saya ketika gender tidak ditentukan", // Opsional
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "konten saya untuk pengguna laki-laki",
        "female": "konten saya untuk pengguna perempuan",
        "fallback": "konten saya ketika gender tidak ditentukan", // Opsional
      },
    },
  },
}
```

> Jika tidak ada fallback yang dideklarasikan, kunci terakhir yang dideklarasikan akan digunakan sebagai fallback jika gender tidak ditentukan atau tidak cocok dengan gender yang didefinisikan.

## Menggunakan Konten Berbasis Gender dengan React Intlayer

Untuk memanfaatkan konten berbasis gender dalam sebuah komponen React, impor dan gunakan hook `useIntlayer` dari paket `react-intlayer`. Hook ini mengambil konten untuk kunci yang ditentukan dan memungkinkan Anda untuk memasukkan gender guna memilih output yang sesuai.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: konten saya untuk pengguna laki-laki */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna perempuan */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna laki-laki */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna perempuan */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika gender tidak ditentukan */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika gender tidak ditentukan */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: konten saya untuk pengguna laki-laki */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna perempuan */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna laki-laki */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna perempuan */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika gender tidak ditentukan */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika gender tidak ditentukan */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: konten saya untuk pengguna laki-laki */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna perempuan */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna laki-laki */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: konten saya untuk pengguna perempuan */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika gender tidak ditentukan */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: konten saya ketika gender tidak ditentukan */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Sumber Daya Tambahan

Untuk informasi lebih rinci tentang konfigurasi dan penggunaan, lihat sumber daya berikut:

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)

Sumber daya ini menawarkan wawasan lebih lanjut tentang pengaturan dan penggunaan Intlayer di berbagai lingkungan dan kerangka kerja.

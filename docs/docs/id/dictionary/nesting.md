---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Penanaman Kamus
description: Pelajari cara menggunakan penanaman konten di Intlayer untuk menggunakan kembali dan menyusun konten multibahasa Anda secara efisien. Ikuti dokumentasi ini untuk mengimplementasikan penanaman dengan mulus dalam proyek Anda.
keywords:
  - Penanaman
  - Penggunaan Kembali Konten
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Penanaman / Referensi Sub Konten

## Cara Kerja Penanaman

Di Intlayer, penanaman dicapai melalui fungsi `nest`, yang memungkinkan Anda merujuk dan menggunakan kembali konten dari kamus lain. Alih-alih menggandakan konten, Anda dapat menunjuk ke modul konten yang sudah ada berdasarkan kuncinya.

## Menyiapkan Penanaman

Untuk menyiapkan penanaman dalam proyek Intlayer Anda, pertama-tama Anda mendefinisikan konten dasar yang ingin Anda gunakan kembali. Kemudian, dalam modul konten terpisah, Anda menggunakan fungsi `nest` untuk mengimpor konten tersebut.

### Kamus Dasar

Berikut adalah contoh kamus dasar untuk ditanamkan dalam kamus lain:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Referensi dengan Nest

Sekarang, buat modul konten lain yang menggunakan fungsi `nest` untuk mereferensikan konten di atas. Anda dapat mereferensikan seluruh konten atau nilai nested tertentu:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Mereferensikan seluruh dictionary:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Mereferensikan nilai nested tertentu:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

Sebagai parameter kedua, Anda dapat menentukan jalur ke nilai yang bersarang di dalam konten tersebut. Jika tidak ada jalur yang diberikan, seluruh konten dari kamus yang dirujuk akan dikembalikan.

## Menggunakan Nesting dengan React Intlayer

Untuk menggunakan konten bersarang dalam komponen React, manfaatkan hook `useIntlayer` dari paket `react-intlayer`. Hook ini mengambil konten yang benar berdasarkan kunci yang ditentukan. Berikut adalah contoh cara menggunakannya:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* Output: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Nilai Bersarang Parsial: {partialNestedContent}
        {/* Output: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Konten Bersarang Lengkap: {JSON.stringify(fullNestedContent)}
        {/* Output: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Nilai Bersarang Parsial: {partialNestedContent}
        {/* Output: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Konten Bersarang Lengkap: {JSON.stringify(fullNestedContent)}
        {/* Output: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Nilai Bersarang Parsial: {partialNestedContent}
        {/* Output: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Sumber Daya Tambahan

Untuk informasi lebih rinci tentang konfigurasi dan penggunaan, lihat sumber daya berikut:

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)

Sumber daya ini memberikan wawasan lebih lanjut tentang pengaturan dan penggunaan Intlayer di berbagai lingkungan dan dengan berbagai framework.

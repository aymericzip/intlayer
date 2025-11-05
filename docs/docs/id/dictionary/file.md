---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: File
description: Pelajari cara menyematkan file eksternal ke dalam kamus konten Anda menggunakan fungsi `file`. Dokumentasi ini menjelaskan bagaimana Intlayer menghubungkan dan mengelola konten file secara dinamis.
keywords:
  - File
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
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Konten File / Menyematkan File di Intlayer

Di Intlayer, fungsi `file` memungkinkan penyematan konten file eksternal ke dalam sebuah kamus. Pendekatan ini memastikan bahwa Intlayer mengenali file sumber, memungkinkan integrasi mulus dengan Intlayer Visual Editor dan CMS.

## Mengapa menggunakan `file` daripada `import`, `require`, atau `fs`?

Berbeda dengan metode pembacaan file seperti `import`, `require`, atau `fs`, menggunakan `file` mengasosiasikan file dengan kamus, memungkinkan Intlayer untuk melacak dan memperbarui konten secara dinamis saat file diedit. Dengan demikian, penggunaan `file` akan memberikan integrasi yang lebih baik dengan Intlayer Visual Editor dan CMS.

## Menyiapkan Konten File

Untuk menyematkan konten file dalam proyek Intlayer Anda, gunakan fungsi `file` dalam modul konten. Berikut adalah contoh yang menunjukkan berbagai implementasi.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Mendefinisikan konten file dengan tipe Dictionary dari Intlayer
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // Menggunakan fungsi file untuk mengasosiasikan file
  },
};

export default myFileContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Mendefinisikan konten file dengan tipe Dictionary dari Intlayer
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // Menggunakan fungsi file untuk mengasosiasikan file
  },
};

module.exports = myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Menggunakan Konten File di React Intlayer

Untuk menggunakan konten file yang disematkan dalam komponen React, impor dan gunakan hook `useIntlayer` dari paket `react-intlayer`. Ini mengambil konten dari kunci yang ditentukan dan memungkinkan konten tersebut ditampilkan secara dinamis.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Contoh Markdown Multibahasa

Untuk mendukung file Markdown yang dapat diedit dalam berbagai bahasa, Anda dapat menggunakan `file` bersama dengan `t()` dan `md()` untuk mendefinisikan versi bahasa yang berbeda dari sebuah file konten Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Mendefinisikan konten multibahasa dengan kunci dan isi yang berbeda berdasarkan bahasa
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Pengaturan ini memungkinkan konten diambil secara dinamis berdasarkan preferensi bahasa pengguna. Saat digunakan di Intlayer Visual Editor atau CMS, sistem akan mengenali bahwa konten berasal dari file Markdown yang ditentukan dan memastikan konten tersebut tetap dapat diedit.

## Jenis-jenis path yang berbeda

Saat menggunakan fungsi `file`, Anda dapat menggunakan berbagai jenis path untuk menentukan file yang akan disematkan.

- `file("./path/to/file.txt")` - Path relatif terhadap file saat ini
- `file("path/to/file.txt")` - Path relatif terhadap direktori root proyek
- `file("/users/username/path/to/file.txt")` - Path absolut

## Cara Intlayer Menangani Konten File

Fungsi `file` didasarkan pada modul `fs` Node.js untuk membaca konten file yang ditentukan dan memasukkannya ke dalam dictionary. Saat digunakan bersama dengan Intlayer Visual Editor atau CMS, Intlayer dapat melacak hubungan antara dictionary dan file. Ini memungkinkan Intlayer untuk:

- Mengenali bahwa konten berasal dari file tertentu.
- Secara otomatis memperbarui konten dictionary ketika file yang terhubung diedit.
- Memastikan sinkronisasi antara file dan kamus, menjaga integritas konten.

## Sumber Daya Tambahan

Untuk detail lebih lanjut tentang konfigurasi dan penggunaan penyematan file di Intlayer, lihat sumber daya berikut:

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)
- [Dokumentasi Konten Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)
- [Dokumentasi Konten Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md)

Sumber daya ini memberikan wawasan lebih lanjut tentang embedding file, manajemen konten, dan integrasi Intlayer dengan berbagai framework.

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
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Konten File / Menyematkan File di Intlayer

Di Intlayer, fungsi `file` memungkinkan penyematan konten file eksternal ke dalam sebuah kamus. Pendekatan ini memastikan bahwa Intlayer mengenali file sumber, memungkinkan integrasi mulus dengan Intlayer Visual Editor dan CMS.

## Mengapa menggunakan `file` daripada `import`, `require`, atau `fs`?

<Tabs group="framework">
  <Tab label="React" value="react">

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use embedded file content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

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

  </Tab>
  <Tab label="Vue" value="vue">

To use embedded file content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use embedded file content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use embedded file content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

To use embedded file content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use embedded file content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use embedded file content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>
## Menyiapkan Konten File

Untuk menyematkan konten file dalam proyek Intlayer Anda, gunakan fungsi `file` dalam modul konten. Berikut adalah contoh yang menunjukkan berbagai implementasi.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
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

<Tabs group="framework">
  <Tab label="React" value="react">

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use embedded file content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

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

  </Tab>
  <Tab label="Vue" value="vue">

To use embedded file content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use embedded file content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use embedded file content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

To use embedded file content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use embedded file content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use embedded file content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## Contoh Markdown Multibahasa

Untuk mendukung file Markdown yang dapat diedit dalam berbagai bahasa, Anda dapat menggunakan `file` bersama dengan `t()` dan `md()` untuk mendefinisikan versi bahasa yang berbeda dari sebuah file konten Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)
- [Dokumentasi Konten Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)
- [Dokumentasi Konten Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md)

Sumber daya ini memberikan wawasan lebih lanjut tentang embedding file, manajemen konten, dan integrasi Intlayer dengan berbagai framework.

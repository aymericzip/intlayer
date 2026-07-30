---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Konten Berbasis Pilihan (Select)
description: Pelajari cara menggunakan konten berbasis pilihan di Intlayer untuk menampilkan konten secara dinamis berdasarkan nilai string sembarang. Ikuti dokumentasi ini untuk mengimplementasikan konten mirip switch secara efisien dalam proyek Anda.
keywords:
  - Konten berbasis pilihan
  - Select Content
  - Konten Switch
  - ICU select
  - Rendering dinamis
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Memperkenalkan konten berbasis pilihan"
author: aymericzip
---

# Konten Berbasis Pilihan (Select) / Intlayer

## Cara Kerja Select

Dalam Intlayer, konten berbasis pilihan (select) dicapai melalui fungsi `select`, yang memetakan nilai string sembarang ke konten yang sesuai. Ini setara dengan pesan ICU `{value, select, …}`, atau pernyataan `switch` dalam kode aplikasi Anda.

Gunakan `select` ketika penentu (discriminant) adalah string berbentuk bebas: sebuah status, paket berlangganan, platform, atau peran. Untuk penentu lainnya, Intlayer menyediakan node khusus:

| Penentu        | Node       |
| -------------- | ---------- |
| Kuantitas      | `enu()`    |
| Boolean        | `cond()`   |
| Gender         | `gender()` |
| String lainnya | `select()` |

## Menyiapkan Konten Berbasis Pilihan

Untuk menyiapkan konten berbasis pilihan di proyek Intlayer Anda, buat modul konten yang menyertakan definisi pilihan Anda. Di bawah ini adalah contoh dalam berbagai format.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // opsional
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // opsional
      },
    },
  },
}
```

> Jika tidak ada `fallback` yang dideklarasikan, kunci yang dideklarasikan terakhir akan dianggap sebagai fallback ketika nilai yang diberikan tidak cocok dengan kasus mana pun yang dideklarasikan: persis seperti kontrak `cond()` dan `gender()`.

### Type Safety

Argumen yang diterima disimpulkan dari kasus yang dideklarasikan:

- Tanpa `fallback`, hanya kasus yang dideklarasikan yang diterima: salah ketik akan menghasilkan kesalahan tipe (type error).
- Dengan `fallback`, string apa pun akan diterima (karena fallback mencakup nilai yang tidak cocok) sementara kasus yang dideklarasikan tetap menyediakan pelengkapan otomatis (autocompletion).

## Mengapa Tidak Menggunakan Objek Biasa?

Sangat menggoda untuk mendeklarasikan objek biasa dan mengindeksnya menggunakan nilai saat runtime (runtime value):

```tsx
// ❌ Jangan lakukan ini
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Kompilator (compiler) Intlayer menganalisis kode sumber Anda untuk menghapus konten yang tidak digunakan dan memperkecil (minify) kunci yang tersisa. Akses terkomputasi dinamis (`obj[expr]`) tidak dapat dianalisis secara statis, sehingga seluruh cabang akan ditandai sebagai opak (opaque): cabang tersebut akan tetap ada di dalam bundle dan kuncinya tidak akan diperkecil.

Dengan menggunakan `select()`, resolusi kasus terjadi di dalam pemanggilan fungsi alih-alih sebagai akses properti. Kompilator melihatnya sebagai akses bidang statis tunggal, dan mengoptimalkan node secara akurat, persis seperti yang dilakukannya dengan `enu()`, `cond()`, atau `gender()`:

```tsx
// ✅ Lakukan ini
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Menggunakan Konten Berbasis Pilihan

<Tabs group="framework">
  <Tab label="React" value="react">

Untuk memanfaatkan konten berbasis pilihan dalam komponen React, impor dan gunakan hook `useIntlayer` dari paket `react-intlayer`. Hook ini mengambil konten untuk kunci yang ditentukan dan memungkinkan Anda meneruskan nilai untuk memilih output yang sesuai.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Output: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Output: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Untuk memanfaatkan konten berbasis pilihan dalam Komponen Klien (Client Components) Next.js, ambil konten tersebut melalui hook `useIntlayer`. Berikut adalah contohnya:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Untuk memanfaatkan konten berbasis pilihan dalam komponen Vue, ambil konten tersebut melalui hook `useIntlayer`. Berikut adalah contohnya:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Untuk memanfaatkan konten berbasis pilihan dalam komponen Svelte, ambil konten tersebut melalui hook `useIntlayer`. Store diakses menggunakan `$`. Berikut adalah contohnya:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Untuk memanfaatkan konten berbasis pilihan dalam komponen Preact, ambil konten tersebut melalui hook `useIntlayer`. Berikut adalah contohnya:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Untuk memanfaatkan konten berbasis pilihan dalam komponen SolidJS, ambil konten tersebut melalui hook `useIntlayer`. Berikut adalah contohnya:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Untuk memanfaatkan konten berbasis pilihan dalam komponen Angular, ambil konten tersebut melalui hook `useIntlayer`. Berikut adalah contohnya:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Untuk memanfaatkan konten berbasis pilihan dengan `vanilla-intlayer`, ambil konten tersebut melalui hook `useIntlayer`. Berikut adalah contohnya:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Render awal
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Menggabungkan Select dengan Node Lain

Karena setiap kasus berisi node konten penuh, `select` dapat dikombinasikan dengan `t()`, `insert()`, `md()`, dll:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          id: "{{name}} menyimpan draf",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          id: "{{name}} memublikasikan postingan",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          id: "{{name}} memperbarui postingan",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Output: Alice menyimpan draf
```

## Migrasi dari ICU `select`

Pesan yang menggunakan argumen `select` dari ICU diimpor sebagai node `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

Akan menjadi:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

Kasus `other` pada ICU dinamai ulang menjadi `fallback`, nama kanonikal di Intlayer untuk semua kasus tangkapan-semua (catch-all). Argumen kedua mencatat nama variabel ICU sehingga saat diekspor, pesan tersebut berubah kembali menjadi string ICU yang sama persis.

> Sebagai catatan, pernyataan ICU `select` di mana kasusnya adalah nilai gender (`male` / `female` / `other`) akan diimpor sebagai node [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md).

## Sumber Daya Tambahan

Untuk informasi lebih rinci mengenai konfigurasi dan penggunaan, lihat sumber daya berikut:

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- [Dokumentasi Intlayer React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Intlayer Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)

Sumber daya ini memberikan wawasan lebih lanjut tentang cara menyiapkan dan menggunakan Intlayer dalam berbagai lingkungan dan kerangka kerja.

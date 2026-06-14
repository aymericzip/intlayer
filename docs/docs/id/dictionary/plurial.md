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
author: aymericzip
---

# Konten Jamak / Jamak di Intlayer

## Cara Kerja Jamak

Di Intlayer, konten jamak dicapai melalui fungsi `plural`, yang memetakan kategori jamak CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, ke konten yang sesuai. Kategori yang benar dipilih secara otomatis berdasarkan lokal aktif dan nilai hitungan, menggunakan API [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) bawaan platform.

Berbeda dengan [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/enumeration.md), yang memilih konten berdasarkan rentang numerik yang Anda tentukan sendiri, `plural` mendelegasikan pemilihan ke aturan CLDR. Inilah yang membuatnya skalabel untuk bahasa dengan aturan pluralisasi yang kompleks, seperti Rusia, Polandia, Arab, atau Welsh, tanpa harus menulis logika modulo secara manual.

## Kapan Menggunakan `plural` vs `enu`

<Tabs group="framework">
  <Tab label="React" value="react">

To use plural content inside a React component, retrieve it via the `useIntlayer` hook and call it with a count. The active locale and the count are combined to pick the matching CLDR category.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use plural content in Next.js Client Components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use plural content in Vue components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```vue fileName="**/*.vue" codeFormat="vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { totalOpenings } = useIntlayer("total_openings");
</script>

<template>
  <div>
    <p>{{ totalOpenings(count) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use plural content in Svelte components, retrieve it via the `useIntlayer` hook and call it with a count. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte" codeFormat="svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("total_openings");
</script>

<div>
  <p>{$content.totalOpenings(count)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use plural content in Preact components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use plural content in SolidJS components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const OpeningsComponent: Component<{ count: number }> = (props) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(props.count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use plural content in Angular components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-openings",
  template: `
    <div>
      <p>{{ content().totalOpenings(count) }}</p>
    </div>
  `,
})
export class OpeningsComponent {
  @Input() count!: number;

  content = useIntlayer("total_openings");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use plural content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("total_openings").onChange((newContent) => {
  document.getElementById("openings")!.textContent =
    newContent.totalOpenings(5);
});

// Initial render
document.getElementById("openings")!.textContent = content.totalOpenings(5);
```

  </Tab>
</Tabs>

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

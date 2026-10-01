---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "Bisakah tipe node digabungkan? (cth. beberapa bentuk jamak dalam satu kalimat)"
description: "Cara menggabungkan tipe node dan mengekspresikan beberapa variabel jamak independen dalam satu kalimat menggunakan insert() atau plural() bersarang di Intlayer."
keywords:
  - plural
  - nested plural
  - multiple plurals
  - composition
  - insertion
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# Bisakah tipe node digabungkan? (cth. beberapa bentuk jamak dalam satu kalimat)

**Ya**, tipe node di Intlayer dapat digabungkan (dikomposisikan). Misalnya, Anda dapat menyarangkan `plural()` di dalam `plural()` lain, atau menggabungkan `plural()` dengan `insert()`.

Ketika Anda perlu menyatakan **dua variabel jamak independen dalam satu kalimat** (contoh: _"1 berkas dalam 2 folder"_ vs. _"3 berkas dalam 1 folder"_), terdapat dua pendekatan utama:

1. **Menggunakan `insert()` dengan kunci `plural()` terpisah (Disarankan)**: Rapi, mudah dirawat, dan mempertahankan urutan kata yang tepat di berbagai bahasa.
2. **Menyarangkan `plural()` di dalam `plural()` (Komposisi langsung)**: Sintaks yang valid, tetapi dapat menyebabkan ledakan kombinatorial percabangan untuk bahasa dengan aturan jamak yang rumit.

## Menggabungkan `insert()` dengan `plural()`

Pola yang paling fleksibel dan idiomatis adalah mendeklarasikan kunci `plural` individual untuk setiap istilah jamak dan menggabungkannya dengan templat `insert()`.

### 1. Deklarasikan Konten

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Templat penyisipan menentukan bagaimana elemen diatur per bahasa
    summary: t({
      id: insert("{{files}} dalam {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"),
    }),
    files: t({
      id: plural({
        other: "{{count}} berkas",
      }),
      en: plural({
        one: "{{count}} file",
        other: "{{count}} files",
      }),
      fr: plural({
        one: "{{count}} fichier",
        other: "{{count}} fichiers",
      }),
      ja: plural({
        other: "{{count}} 個のファイル",
      }),
    }),
    folders: t({
      id: plural({
        other: "{{count}} folder",
      }),
      en: plural({
        one: "{{count}} folder",
        other: "{{count}} folders",
      }),
      fr: plural({
        one: "{{count}} dossier",
        other: "{{count}} dossiers",
      }),
      ja: plural({
        other: "{{count}} 個のフォルダー",
      }),
    }),
  },
} satisfies Dictionary;

export default fileSummaryContent;
```

```json fileName="src/fileSummary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "file_summary",
  "content": {
    "summary": {
      "nodeType": "translation",
      "translation": {
        "id": {
          "nodeType": "insertion",
          "insertion": "{{files}} dalam {{folders}}"
        },
        "en": {
          "nodeType": "insertion",
          "insertion": "{{files}} in {{folders}}"
        }
      }
    },
    "files": {
      "nodeType": "translation",
      "translation": {
        "id": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} berkas"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} file",
            "other": "{{count}} files"
          }
        }
      }
    },
    "folders": {
      "nodeType": "translation",
      "translation": {
        "id": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} folder"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} folder",
            "other": "{{count}} folders"
          }
        }
      }
    }
  }
}
```

### 2. Gunakan dalam komponen Anda

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/components/FileSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const FileSummary: FC<{ fileCount: number; folderCount: number }> = ({
  fileCount,
  folderCount,
}) => {
  const { summary, files, folders } = useIntlayer("file_summary");

  return (
    <p>
      {summary({
        files: files(fileCount),
        folders: folders(folderCount),
      })}
    </p>
  );
};
```

  </Tab>
  <Tab label="Vue" value="vue">

```vue fileName="src/components/FileSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{
  fileCount: number;
  folderCount: number;
}>();

const { summary, files, folders } = useIntlayer("file_summary");
</script>

<template>
  <p>
    {{
      summary({
        files: files(fileCount),
        folders: folders(folderCount),
      })
    }}
  </p>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

```svelte fileName="src/components/FileSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  export let fileCount: number;
  export let folderCount: number;

  const content = useIntlayer("file_summary");
</script>

<p>
  {$content.summary({
    files: $content.files(fileCount),
    folders: $content.folders(folderCount),
  })}
</p>
```

  </Tab>
</Tabs>

### Mengapa ini adalah pendekatan yang disarankan

- **Struktur Kalimat & Urutan Kata**: Bahasa yang berbeda menempatkan kata sifat, hitungan, dan objek dalam urutan yang berbeda (misalnya bahasa Jepang atau Jerman mungkin membalik urutan berkas dan folder). Templat `insert()` memberikan kendali penuh kepada penerjemah atas urutan kata tanpa memengaruhi aturan jamak.
- **Mencegah Ledakan Kombinatorial**: Jika bahasa A memiliki 2 bentuk jamak (Inggris: `one`, `other`) dan bahasa B memiliki 4 bentuk (Rusia: `one`, `few`, `many`, `other`), menyarangkan bentuk jamak memerlukan $4 \times 4 = 16$ cabang untuk bahasa Rusia. Dengan kunci terpisah, Anda hanya perlu mendeklarasikan $4 + 4 = 8$ cabang.
- **Dapat Digunakan Kembali**: Anda dapat menggunakan kembali definisi jamak `files` atau `folders` di bagian lain antarmuka Anda.

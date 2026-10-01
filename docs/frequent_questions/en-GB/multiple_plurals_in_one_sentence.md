---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: Can node types be composed? (e.g. multiple plurals in one sentence)
description: "How to compose node types and express multiple independent plural variables in one sentence using insert() or nested plural() in Intlayer."
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

# Can node types be composed? (e.g. multiple plurals in one sentence)

**Yes**, node types in Intlayer can be composed. For instance, you can nest a `plural()` inside another `plural()`, or compose `plural()` with `insert()`.

When you need to express **two independent plural variables in a single sentence** (for example: _"1 file in 2 folders"_ vs. _"3 files in 1 folder"_), there are two main approaches:

1. **Using `insert()` with separate `plural()` keys (Recommended)**: Clean, maintainable, and preserves correct word ordering across languages.
2. **Nesting `plural()` inside `plural()` (Direct composition)**: Valid syntax, but can lead to a combinatorial explosion of branches for languages with complex plural rules.

## Composing `insert()` with `plural()`

The most flexible and idiomatic pattern is to declare individual `plural` keys for each pluralized term and combine them with an `insert()` template.

### 1. Declare the Content

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Insertion template defines how elements are arranged per language
    summary: t({
      "en-GB": insert("{{files}} in {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Notice custom word order for Japanese
    }),
    files: t({
      "en-GB": plural({
        one: "{{count}} file",
        other: "{{count}} files",
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
      "en-GB": plural({
        one: "{{count}} folder",
        other: "{{count}} folders",
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
        "en-GB": {
          "nodeType": "insertion",
          "insertion": "{{files}} in {{folders}}"
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
        "en-GB": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} file",
            "other": "{{count}} files"
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
        "en-GB": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} folder",
            "other": "{{count}} folders"
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

### 2. Consume in your component

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

### Why this is the recommended approach

- **Sentence Structure & Word Order**: Different languages place adjectives, counts, and objects in different orders (e.g. Japanese or German might invert the order of files and folders). An `insert()` template gives translators full control over word order without affecting the plural rules.
- **Prevents Combinatorial Explosion**: If language A has 2 plural forms (English: `one`, `other`) and language B has 4 forms (Russian: `one`, `few`, `many`, `other`), nesting plurals requires $4 \times 4 = 16$ branches for Russian. With separate keys, you only declare $4 + 4 = 8$ branches.
- **Reusability**: You can reuse the `files` or `folders` plural definitions in other parts of your UI.

---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "Czy można łączyć typy węzłów? (np. wiele form liczby mnogiej w jednym zdaniu)"
description: "Jak łączyć typy węzłów i obsługiwać wiele niezależnych zmiennych liczby mnogiej w jednym zdaniu przy użyciu insert() lub zagnieżdżonego plural() w Intlayer."
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

# Czy można łączyć typy węzłów? (np. wiele form liczby mnogiej w jednym zdaniu)

**Tak**, typy węzłów w Intlayer można ze sobą łączyć. Możesz na przykład zagnieździć `plural()` wewnątrz innego `plural()` lub połączyć `plural()` z `insert()`.

Gdy musisz wyrazić **dwie niezależne zmienne liczby mnogiej w jednym zdaniu** (na przykład: _"1 plik w 2 folderach"_ vs. _"3 pliki w 1 folderze"_), istnieją dwa główne podejścia:

1. **Użycie `insert()` z osobnymi kluczami `plural()` (Zalecane)**: Czyste, łatwe w utrzymaniu i zachowujące prawidłowy szyk wyrazów w różnych językach.
2. **Zagnieżdżanie `plural()` wewnątrz `plural()` (Bezpośrednia kompozycja)**: Prawidłowa składnia, ale może prowadzić do kombinatorycznej eksplozji gałęzi w językach o skomplikowanych regułach liczby mnogiej.

## Łączenie `insert()` z `plural()`

Najbardziej elastycznym i idiomatycznym wzorcem jest zadeklarowanie osobnych kluczy `plural` dla każdego terminu i połączenie ich za pomocą szablonu `insert()`.

### 1. Deklaracja zawartości

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Szablon wstawiania określa układ elementów w zależności od języka
    summary: t({
      pl: insert("{{files}} w {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Niestandardowy szyk zdań w języku japońskim
    }),
    files: t({
      pl: plural({
        one: "{{count}} plik",
        few: "{{count}} pliki",
        many: "{{count}} plików",
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
      pl: plural({
        one: "{{count}} folder",
        few: "{{count}} foldery",
        many: "{{count}} folderów",
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
        "pl": {
          "nodeType": "insertion",
          "insertion": "{{files}} w {{folders}}"
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
        "pl": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} plik",
            "few": "{{count}} pliki",
            "many": "{{count}} plików"
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
        "pl": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} folder",
            "few": "{{count}} foldery",
            "many": "{{count}} folderów"
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

### 2. Wykorzystanie w komponencie

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

### Dlaczego to podejście jest zalecane

- **Szyk zdania i kolejność słów**: Różne języki umieszczają przymiotniki, liczniki i rzeczowniki w różnej kolejności (np. japoński lub niemiecki mogą odwracać kolejność plików i folderów). Szablon `insert()` daje tłumaczom pełną kontrolę nad szykiem słów bez wpływu na reguły liczby mnogiej.
- **Zapobiega eksplozji kombinatorycznej**: Jeśli język A ma 2 formy liczby mnogiej (angielski: `one`, `other`), a język B ma 4 formy (polski: `one`, `few`, `many`, `other`), zagnieżdżanie reguł plural wymaga $4 \times 4 = 16$ gałęzi dla polskiego. W przypadku osobnych kluczy deklaruje się tylko $4 + 4 = 8$ gałęzi.
- **Możliwość ponownego użycia**: Definicje liczby mnogiej `files` lub `folders` można wykorzystać w innych częściach interfejsu.

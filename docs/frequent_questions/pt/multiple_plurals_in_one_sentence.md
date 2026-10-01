---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "É possível compor tipos de nós? (ex.: múltiplos plurais em uma mesma frase)"
description: "Como compor tipos de nós e expressar múltiplas variáveis de plural independentes em uma única frase usando insert() ou plural() aninhado no Intlayer."
keywords:
  - plural
  - plural aninhado
  - múltiplos plurais
  - composição
  - inserção
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# É possível compor tipos de nós? (ex.: múltiplos plurais em uma mesma frase)

**Sim**, os tipos de nós no Intlayer podem ser compostos. Por exemplo, você pode aninhar um `plural()` dentro de outro `plural()`, ou compor `plural()` com `insert()`.

Quando você precisa expressar **duas variáveis de plural independentes em uma única frase** (por exemplo: _"1 arquivo em 2 pastas"_ vs. _"3 arquivos em 1 pasta"_), existem duas abordagens principais:

1. **Usar `insert()` com chaves `plural()` separadas (Recomendado)**: Limpo, sustentável e preserva a ordem correta das palavras entre diferentes idiomas.
2. **Aninhar `plural()` dentro de `plural()` (Composição direta)**: Sintaxe válida, mas pode levar a uma explosão combinatória de ramificações para idiomas com regras de plural complexas.

## Compondo `insert()` com `plural()`

O padrão mais flexível e idiomático é declarar chaves `plural` individuais para cada termo no plural e combiná-las com um template `insert()`.

### 1. Declarar o conteúdo

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // O template de inserção define como os elementos são organizados por idioma
    summary: t({
      pt: insert("{{files}} em {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Ordem personalizada para o japonês
    }),
    files: t({
      pt: plural({
        one: "{{count}} arquivo",
        other: "{{count}} arquivos",
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
      pt: plural({
        one: "{{count}} pasta",
        other: "{{count}} pastas",
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
        "pt": {
          "nodeType": "insertion",
          "insertion": "{{files}} em {{folders}}"
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
        "pt": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} arquivo",
            "other": "{{count}} arquivos"
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
        "pt": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} pasta",
            "other": "{{count}} pastas"
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

### 2. Consumir em seu componente

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

### Por que esta é a abordagem recomendada

- **Estrutura da frase e ordem das palavras**: Idiomas diferentes posicionam adjetivos, contadores e objetos em ordens distintas (por exemplo, japonês ou alemão podem inverter a ordem de arquivos e pastas). O template `insert()` garante controle total da ordem das palavras sem alterar as regras de plural.
- **Previne a explosão combinatória**: Se o idioma A possui 2 formas de plural (inglês: `one`, `other`) e o idioma B possui 4 formas (russo: `one`, `few`, `many`, `other`), aninhar plurais exige $4 \times 4 = 16$ ramificações no russo. Com chaves separadas, declaram-se apenas $4 + 4 = 8$ ramificações.
- **Reutilização**: Você pode reutilizar as definições de plural de `files` ou `folders` em outras partes da interface.

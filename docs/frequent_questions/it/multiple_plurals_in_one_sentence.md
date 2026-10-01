---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "È possibile comporre i tipi di nodo? (es. più plurali in una sola frase)"
description: "Come comporre i tipi di nodo ed esprimere più variabili di plurale indipendenti in una sola frase usando insert() o plural() annidato in Intlayer."
keywords:
  - plurale
  - plurale annidato
  - plurali multipli
  - composizione
  - inserimento
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# È possibile comporre i tipi di nodo? (es. più plurali in una sola frase)

**Sì**, i tipi di nodo in Intlayer possono essere composti. Ad esempio, puoi annidare un `plural()` all'interno di un altro `plural()`, oppure comporre `plural()` con `insert()`.

Quando devi esprimere **due variabili di plurale indipendenti in un'unica frase** (ad esempio: _"1 file in 2 cartelle"_ rispetto a _"3 file in 1 cartella"_), ci sono due approcci principali:

1. **Usare `insert()` con chiavi `plural()` separate (Consigliato)**: Pulito, manutenibile e preserva il corretto ordine delle parole tra le diverse lingue.
2. **Annidare `plural()` all'interno di `plural()` (Composizione diretta)**: Sintassi valida, ma può portare a un'esplosione combinatoria di rami per le lingue con regole di plurale complesse.

## Comporre `insert()` con `plural()`

Il pattern più flessibile e idiomatico consiste nel dichiarare chiavi `plural` separate per ciascun termine al plurale e combinarle con un template `insert()`.

### 1. Dichiarare il contenuto

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Il template di inserimento definisce la disposizione degli elementi per lingua
    summary: t({
      it: insert("{{files}} in {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Ordine personalizzato per il giapponese
    }),
    files: t({
      it: plural({
        one: "{{count}} file",
        other: "{{count}} file",
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
      it: plural({
        one: "{{count}} cartella",
        other: "{{count}} cartelle",
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
        "it": {
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
        "it": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} file",
            "other": "{{count}} file"
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
        "it": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} cartella",
            "other": "{{count}} cartelle"
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

### 2. Utilizzare nel componente

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

### Perché questo approccio è consigliato

- **Struttura della frase e ordine delle parole**: Lingue diverse dispongono aggettivi, numeri e oggetti in ordini differenti (ad esempio il giapponese o il tedesco possono invertire l'ordine di file e cartelle). Un template `insert()` offre ai traduttori il pieno controllo sull'ordine delle parole senza interferire con le regole del plurale.
- **Previene l'esplosione combinatoria**: Se la lingua A ha 2 forme di plurale (inglese: `one`, `other`) e la lingua B ne ha 4 (russo: `one`, `few`, `many`, `other`), annidare i plurali richiede $4 \times 4 = 16$ rami per il russo. Con chiavi separate, si dichiarano solo $4 + 4 = 8$ rami.
- **Riutilizzabilità**: Puoi riutilizzare le definizioni di plurale `files` o `folders` in altre parti della tua interfaccia.

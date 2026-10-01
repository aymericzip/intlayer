---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "¿Se pueden componer los tipos de nodos? (ej. múltiples plurales en una misma frase)"
description: "Cómo componer tipos de nodos y expresar múltiples variables de plural independientes en una sola frase usando insert() o plural() anidado en Intlayer."
keywords:
  - plural
  - plural anidado
  - múltiples plurales
  - composición
  - inserción
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# ¿Se pueden componer los tipos de nodos? (ej. múltiples plurales en una misma frase)

**Sí**, los tipos de nodos en Intlayer se pueden componer. Por ejemplo, puedes anidar un `plural()` dentro de otro `plural()`, o componer `plural()` con `insert()`.

Cuando necesitas expresar **dos variables de plural independientes en una sola frase** (por ejemplo: _"1 archivo en 2 carpetas"_ vs. _"3 archivos en 1 carpeta"_), existen dos enfoques principales:

1. **Usar `insert()` con claves `plural()` independientes (Recomendado)**: Limpio, mantenible y preserva el orden correcto de las palabras entre diferentes idiomas.
2. **Anidar `plural()` dentro de `plural()` (Composición directa)**: Sintaxis válida, pero puede provocar una explosión combinatoria de ramas en idiomas con reglas de plural complejas.

## Componer `insert()` con `plural()`

El patrón más flexible e idiomático consiste en declarar claves `plural` individuales para cada término pluralizado y combinarlas mediante una plantilla `insert()`.

### 1. Declarar el contenido

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // La plantilla de inserción define el orden de los elementos por idioma
    summary: t({
      es: insert("{{files}} en {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Nótese el orden de palabras personalizado para japonés
    }),
    files: t({
      es: plural({
        one: "{{count}} archivo",
        other: "{{count}} archivos",
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
      es: plural({
        one: "{{count}} carpeta",
        other: "{{count}} carpetas",
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
        "es": {
          "nodeType": "insertion",
          "insertion": "{{files}} en {{folders}}"
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
        "es": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} archivo",
            "other": "{{count}} archivos"
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
        "es": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} carpeta",
            "other": "{{count}} carpetas"
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

### 2. Consumir en el componente

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

### Por qué este es el enfoque recomendado

- **Estructura de la oración y orden de las palabras**: Diferentes idiomas colocan los adjetivos, contadores y objetos en órdenes distintos (por ejemplo, el japonés o el alemán pueden invertir el orden de archivos y carpetas). Una plantilla `insert()` otorga a los traductores un control completo sobre el orden sin alterar las reglas de pluralización.
- **Evita la explosión combinatoria**: Si el idioma A tiene 2 formas de plural (inglés: `one`, `other`) y el idioma B tiene 4 formas (ruso: `one`, `few`, `many`, `other`), anidar plurales requeriría $4 \times 4 = 16$ ramas para el ruso. Con claves independientes, solo declaras $4 + 4 = 8$ ramas.
- **Reutilización**: Puedes reutilizar las definiciones de plural de `files` o `folders` en otras partes de tu interfaz.

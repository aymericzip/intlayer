---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "Peut-on composer les types de nœuds ? (ex. plusieurs pluriels dans une même phrase)"
description: "Comment composer les types de nœuds et gérer plusieurs variables de pluriel indépendantes dans une même phrase avec insert() ou plural() imbriqué dans Intlayer."
keywords:
  - pluriel
  - pluriel imbriqué
  - pluriels multiples
  - composition
  - insertion
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# Peut-on composer les types de nœuds ? (ex. plusieurs pluriels dans une même phrase)

**Oui**, les types de nœuds dans Intlayer peuvent être composés. Par exemple, vous pouvez imbriquer un `plural()` à l'intérieur d'un autre `plural()`, ou composer `plural()` avec `insert()`.

Lorsque vous devez exprimer **deux variables de pluriel indépendantes dans une seule phrase** (par exemple : _"1 fichier dans 2 dossiers"_ vs _"3 fichiers dans 1 dossier"_), il existe deux approches principales :

1. **Utiliser `insert()` avec des clés `plural()` séparées (Recommandé)** : Propre, maintenable et préserve l'ordre des mots selon les langues.
2. **Imbriquer `plural()` dans `plural()` (Composition directe)** : Syntaxe valide, mais peut mener à une explosion combinatoire de branches pour les langues ayant des règles de pluriel complexes.

## Composer `insert()` avec `plural()`

Le pattern le plus flexible et idiomatique consiste à déclarer des clés `plural` distinctes pour chaque terme au pluriel et à les combiner à l'aide d'un template `insert()`.

### 1. Déclarer le contenu

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Le template d'insertion définit la disposition des éléments par langue
    summary: t({
      fr: insert("{{files}} dans {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Ordre des mots spécifique au japonais
    }),
    files: t({
      fr: plural({
        one: "{{count}} fichier",
        other: "{{count}} fichiers",
      }),
      en: plural({
        one: "{{count}} file",
        other: "{{count}} files",
      }),
      ja: plural({
        other: "{{count}} 個のファイル",
      }),
    }),
    folders: t({
      fr: plural({
        one: "{{count}} dossier",
        other: "{{count}} dossiers",
      }),
      en: plural({
        one: "{{count}} folder",
        other: "{{count}} folders",
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
        "fr": {
          "nodeType": "insertion",
          "insertion": "{{files}} dans {{folders}}"
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
        "fr": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} fichier",
            "other": "{{count}} fichiers"
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
        "fr": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} dossier",
            "other": "{{count}} dossiers"
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

### 2. Consommer dans votre composant

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

### Pourquoi cette approche est recommandée

- **Structure de la phrase et ordre des mots** : Chaque langue positionne les adjectifs, compteurs et objets dans un ordre différent (par exemple, le japonais ou l'allemand peuvent inverser l'ordre des fichiers et des dossiers). Le template `insert()` offre aux traducteurs un contrôle total sur l'ordre des mots sans impacter les règles de pluriel.
- **Évite l'explosion combinatoire** : Si la langue A dispose de 2 formes de pluriel (anglais : `one`, `other`) et la langue B de 4 formes (russe : `one`, `few`, `many`, `other`), imbriquer les pluriels requiert $4 \times 4 = 16$ branches pour le russe. Avec des clés distinctes, vous ne déclarez que $4 + 4 = 8$ branches.
- **Réutilisabilité** : Vous pouvez réutiliser les définitions de pluriel `files` ou `folders` dans d'autres parties de votre interface.

---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "Können Knotentypen zusammengesetzt werden? (z. B. mehrere Plurale in einem Satz)"
description: "Wie Knotentypen zusammengesetzt und mehrere unabhängige Pluralvariablen in einem Satz mit insert() oder verschachteltem plural() in Intlayer dargestellt werden."
keywords:
  - plural
  - verschachtelter plural
  - mehrere plurale
  - komposition
  - insertion
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# Können Knotentypen zusammengesetzt werden? (z. B. mehrere Plurale in einem Satz)

**Ja**, Knotentypen in Intlayer können zusammengesetzt werden. Beispielsweise können Sie ein `plural()` innerhalb eines anderen `plural()` verschachteln oder `plural()` mit `insert()` kombinieren.

Wenn Sie **zwei unabhängige Pluralvariablen in einem einzigen Satz** ausdrücken müssen (zum Beispiel: _"1 Datei in 2 Ordnern"_ vs. _"3 Dateien in 1 Ordner"_), gibt es zwei Hauptansätze:

1. **`insert()` mit separaten `plural()`-Schlüsseln verwenden (Empfohlen)**: Sauber, wartungsfreundlich und bewahrt die korrekte Wortstellung über verschiedene Sprachen hinweg.
2. **`plural()` in `plural()` verschachteln (Direkte Komposition)**: Gültige Syntax, kann jedoch bei Sprachen mit komplexen Pluralregeln zu einer kombinatorischen Explosion von Zweigen führen.

## `insert()` mit `plural()` zusammensetzen

Das flexibelste und idiomatischste Muster besteht darin, einzelne `plural`-Schlüssel für jeden pluralisierten Begriff zu deklarieren und diese mithilfe einer `insert()`-Vorlage zu kombinieren.

### 1. Inhalt deklarieren

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Die Insertionsvorlage definiert die Anordnung der Elemente pro Sprache
    summary: t({
      de: insert("{{files}} in {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Benutzerdefinierte Wortstellung für Japanisch
    }),
    files: t({
      de: plural({
        one: "{{count}} Datei",
        other: "{{count}} Dateien",
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
      de: plural({
        one: "{{count}} Ordner",
        other: "{{count}} Ordner",
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
        "de": {
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
        "de": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} Datei",
            "other": "{{count}} Dateien"
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
        "de": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} Ordner",
            "other": "{{count}} Ordner"
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

### 2. In der Komponente verwenden

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

### Warum dies der empfohlene Ansatz ist

- **Satzstruktur und Wortstellung**: Verschiedene Sprachen platzieren Adjektive, Zahlen und Objekte in unterschiedlicher Reihenfolge (z. B. können Japanisch oder Deutsch die Reihenfolge von Dateien und Ordnern umkehren). Eine `insert()`-Vorlage gibt Übersetzern die volle Kontrolle über die Wortstellung, ohne die Pluralregeln zu beeinflussen.
- **Verhindert kombinatorische Explosion**: Wenn Sprache A 2 Pluralformen hat (Englisch: `one`, `other`) und Sprache B 4 Formen hat (Russisch: `one`, `few`, `many`, `other`), erfordert das Verschachteln von Pluralen $4 \times 4 = 16$ Zweige für Russisch. Mit getrennten Schlüsseln deklarieren Sie nur $4 + 4 = 8$ Zweige.
- **Wiederverwendbarkeit**: Sie können die Pluraldefinitionen für `files` oder `folders` in anderen Bereichen Ihrer Benutzeroberfläche wiederverwenden.

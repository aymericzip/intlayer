---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "Можно ли комбинировать типы узлов? (напр. несколько множественных чисел в одном предложении)"
description: "Как комбинировать типы узлов и выражать несколько независимых переменных множественного числа в одном предложении с помощью insert() или вложенного plural() в Intlayer."
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

# Можно ли комбинировать типы узлов? (напр. несколько множественных чисел в одном предложении)

**Да**, типы узлов в Intlayer можно комбинировать. Например, можно вложить один `plural()` внутрь другого `plural()` или скомбинировать `plural()` с `insert()`.

Когда вам необходимо выразить **две независимые переменные множественного числа в одном предложении** (например: _"1 файл в 2 папках"_ против _"3 файла в 1 папке"_), существует два основных подхода:

1. **Использование `insert()` с отдельными ключами `plural()` (Рекомендуется)**: Чисто, удобно в поддержке и сохраняет правильный порядок слов для разных языков.
2. **Вложение `plural()` в `plural()` (Прямая композиция)**: Допустимый синтаксис, однако это может привести к комбинаторному взрыву ветвей для языков со сложными правилами множественного числа.

## Композиция `insert()` и `plural()`

Наиболее гибкий и идиоматичный подход заключается в объявлении отдельных ключей `plural` для каждого термина и их объединении с помощью шаблона `insert()`.

### 1. Объявление контента

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Шаблон вставки определяет структуру предложения для каждого языка
    summary: t({
      ru: insert("{{files}} в {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Специальный порядок слов для японского языка
    }),
    files: t({
      ru: plural({
        one: "{{count}} файл",
        few: "{{count}} файла",
        many: "{{count}} файлов",
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
      ru: plural({
        one: "{{count}} папка",
        few: "{{count}} папки",
        many: "{{count}} папок",
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
        "ru": {
          "nodeType": "insertion",
          "insertion": "{{files}} в {{folders}}"
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
        "ru": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} файл",
            "few": "{{count}} файла",
            "many": "{{count}} файлов"
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
        "ru": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} папка",
            "few": "{{count}} папки",
            "many": "{{count}} папок"
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

### 2. Использование в компоненте

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

### Почему это рекомендуемый подход

- **Структура предложения и порядок слов**: В разных языках прилагательные, числительные и существительные располагаются в разном порядке (например, в японском или немецком порядок файлов и папок может меняться). Шаблон `insert()` предоставляет переводчикам полный контроль над структурой фразы, не затрагивая правила множественного числа.
- **Предотвращение комбинаторного взрыва**: Если язык A имеет 2 формы множественного числа (английский: `one`, `other`), а язык B имеет 4 формы (русский: `one`, `few`, `many`, `other`), вложение одного plural в другой потребует $4 \times 4 = 16$ веток для русского языка. При использовании раздельных ключей объявляется всего $4 + 4 = 8$ веток.
- **Повторное использование**: Определения множественного числа для `files` или `folders` можно переиспользовать в других частях пользовательского интерфейса.

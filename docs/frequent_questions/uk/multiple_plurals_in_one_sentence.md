---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "Чи можна комбінувати типи вузлів? (напр. кілька множин в одному реченні)"
description: "Як комбінувати типи вузлів та виражати кілька незалежних змінних множини в одному реченні за допомогою insert() або вкладеного plural() в Intlayer."
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

# Чи можна комбінувати типи вузлів? (напр. кілька множин в одному реченні)

**Так**, типи вузлів в Intlayer можна комбінувати. Наприклад, ви можете вкласти один `plural()` всередину іншого `plural()`, або скомбінувати `plural()` з `insert()`.

Коли вам потрібно виразити **дві незалежні змінні множини в одному реченні** (наприклад: _"1 файл у 2 папках"_ проти _"3 файли в 1 папці"_), є два основних підходи:

1. **Використання `insert()` з окремими ключами `plural()` (Рекомендовано)**: Чисто, зручно в підтримці та зберігає правильний порядок слів для різних мов.
2. **Вкладення `plural()` у `plural()` (Пряма композиція)**: Допустимий синтаксис, але може призвести до комбінаторного вибуху гілок для мов зі складними правилами множини.

## Композиція `insert()` з `plural()`

Найбільш гнучкий та ідіоматичний підхід полягає в оголошенні окремих ключів `plural` для кожного терміна та їх поєднанні за допомогою шаблону `insert()`.

### 1. Оголошення вмісту

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Шаблон вставки визначає структуру речення для кожної мови
    summary: t({
      uk: insert("{{files}} у {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // Спеціальний порядок слів для японської мови
    }),
    files: t({
      uk: plural({
        one: "{{count}} файл",
        few: "{{count}} файли",
        many: "{{count}} файлів",
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
      uk: plural({
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
        "uk": {
          "nodeType": "insertion",
          "insertion": "{{files}} у {{folders}}"
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
        "uk": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} файл",
            "few": "{{count}} файли",
            "many": "{{count}} файлів"
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
        "uk": {
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

### 2. Використання в компоненті

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

### Чому цей підхід рекомендований

- **Структура речення та порядок слів**: Різні мови розташовують прикметники, кількісні показники та іменники в різному порядку (наприклад, у японській чи німецькій порядок файлів і папок може змінюватися). Шаблон `insert()` надає перекладачам повний контроль над порядком слів без порушення правил множини.
- **Запобігає комбінаторному вибуху**: Якщо мова A має 2 форми множини (англійська: `one`, `other`), а мова B має 4 форми (українська або російська: `one`, `few`, `many`, `other`), вкладення одного `plural()` в інший вимагає $4 \times 4 = 16$ гілок. З окремими ключами оголошується лише $4 + 4 = 8$ гілок.
- **Повторне використання**: Ви можете перевикористовувати визначення множини `files` або `folders` в інших частинах інтерфейсу користувача.

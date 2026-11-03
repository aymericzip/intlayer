---
createdAt: 2026-10-01
updatedAt: 2026-11-03
priority: 4
title: האם ניתן להרכיב טיפוסי צמתים (node types)? (למשל, מספר צורות רבים במשפט אחד)
description: "כיצד להרכיב טיפוסי צמתים ולבטא מספר משתני רבים (plural) בלתי תלויים במשפט אחד באמצעות insert() או plural() מקונן ב-Intlayer."
keywords:
  - רבים
  - plural
  - plural מקונן
  - nested plural
  - צורות רבים מרובות
  - multiple plurals
  - הרכבה
  - composition
  - החלפה
  - insertion
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# האם ניתן להרכיב טיפוסי צמתים (node types)? (למשל, מספר צורות רבים במשפט אחד)

**כן**, ניתן להרכיב טיפוסי צמתים (node types) ב-Intlayer. לדוגמה, ניתן לקנן `plural()` בתוך `plural()` אחר, או להרכיב `plural()` יחד עם `insert()`.

כאשר עליך לבטא **שני משתני רבים (plural) בלתי תלויים במשפט יחיד** (למשל: _"1 file in 2 folders"_ לעומת _"3 files in 1 folder"_), קיימות שתי גישות עיקריות:

1. **שימוש ב-`insert()` עם מפתחות `plural()` נפרדים (מומלץ)**: נקי, קל לתחזוקה ושומר על סדר מילים נכון בין שפות שונות.
2. **קינון `plural()` בתוך `plural()` (הרכבה ישירה)**: תחביר תקין, אך עלול להוביל להתפוצצות קומבינטורית של ענפים עבור שפות בעלות כללי רבים מורכבים.

## הרכבת `insert()` עם `plural()`

הדפוס הגמיש והאידיומטי ביותר הוא להגדיר מפתחות `plural` נפרדים עבור כל מונח בעל צורת רבים, ולשלב אותם באמצעות תבנית `insert()`.

### 1. הצהרת התוכן

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // תבנית ההחלפה מגדירה כיצד האלמנטים מסודרים בכל שפה
    summary: t({
      "he-IL": insert("{{files}} ב-{{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"), // שים לב לסדר המילים הייחודי ביפנית
    }),
    files: t({
      "he-IL": plural({
        one: "קובץ {{count}}",
        other: "{{count}} קבצים",
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
      "he-IL": plural({
        one: "תיקייה {{count}}",
        other: "{{count}} תיקיות",
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
        "he-IL": {
          "nodeType": "insertion",
          "insertion": "{{files}} ב-{{folders}}"
        },
        "en": {
          "nodeType": "insertion",
          "insertion": "{{files}} in {{folders}}"
        },
        "fr": {
          "nodeType": "insertion",
          "insertion": "{{files}} dans {{folders}}"
        }
      }
    },
    "files": {
      "nodeType": "translation",
      "translation": {
        "he-IL": {
          "nodeType": "plural",
          "plural": {
            "one": "קובץ {{count}}",
            "other": "{{count}} קבצים"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} file",
            "other": "{{count}} files"
          }
        },
        "fr": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} fichier",
            "other": "{{count}} fichiers"
          }
        }
      }
    },
    "folders": {
      "nodeType": "translation",
      "translation": {
        "he-IL": {
          "nodeType": "plural",
          "plural": {
            "one": "תיקייה {{count}}",
            "other": "{{count}} תיקיות"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} folder",
            "other": "{{count}} folders"
          }
        },
        "fr": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} dossier",
            "other": "{{count}} dossiers"
          }
        }
      }
    }
  }
}
```

### 2. שימוש ברכיב שלך

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

### מדוע זוהי הגישה המומלצת

- **מבנה המשפט וסדר המילים**: שפות שונות מציבות תארים, ספירות ועצמים בסדר שונה (למשל, יפנית או גרמנית עשויות להפוך את סדר הקבצים והתיקיות). תבנית `insert()` מעניקה למתרגמים שליטה מלאה בסדר המילים מבלי להשפיע על כללי צורת הרבים.
- **מניעת התפוצצות קומבינטורית**: אם לשפה א' יש 2 צורות רבים (אנגלית: `one`, `other`) ולשפה ב' יש 4 צורות (רוסית: `one`, `few`, `many`, `other`), קינון צורות רבים דורש $4 \times 4 = 16$ ענפים עבור רוסית. בעזרת מפתחות נפרדים, מגדירים רק $4 + 4 = 8$ ענפים.
- **שימוש חוזר (Reusability)**: ניתן לעשות שימוש חוזר בהגדרות ה-plural של `files` או `folders` בחלקים אחרים של ממשק המשתמש (UI).

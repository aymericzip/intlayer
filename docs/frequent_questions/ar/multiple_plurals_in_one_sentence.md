---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "هل يمكن دمج أنواع العقد؟ (مثلاً: عدة صيغ جمع في جملة واحدة)"
description: "كيفية دمج أنواع العقد والتعبير عن عدة متغيرات جمع مستقلة في جملة واحدة باستخدام insert() أو plural() متداخل في Intlayer."
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

# هل يمكن دمج أنواع العقد؟ (مثلاً: عدة صيغ جمع في جملة واحدة)

**نعم**، يمكن دمج أنواع العقد في Intlayer. على سبيل المثال، يمكنك تداخل `plural()` داخل `plural()` آخر، أو دمج `plural()` مع `insert()`.

عندما تحتاج إلى التعبير عن **متغيرين مستقلين للجمع في جملة واحدة** (على سبيل المثال: _"ملف واحد في مجلدين"_ مقابل _"3 ملفات في مجلد واحد"_)، هناك طريقتان رئيسيتان:

1. **استخدام `insert()` مع مفاتيح `plural()` منفصلة (موصى به)**: حل نظيف، سهل الصيانة ويحافظ على الترتيب الصحيح للكلمات عبر اللغات المختلفة.
2. **تداخل `plural()` داخل `plural()` (التركيب المباشر)**: صياغة صالحة، ولكنها قد تؤدي إلى تضخم تركيبي كبير في عدد الفروع بالنسبة للغات ذات قواعد الجمع المعقدة.

## دمج `insert()` مع `plural()`

النمط الأكثر مرونة وملاءمة هو التصريح عن مفاتيح `plural` فردية لكل مصطلح مجمع والجمع بينها باستخدام قالب `insert()`.

### 1. التصريح عن المحتوى

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // يحدد قالب الإدراج كيفية ترتيب العناصر لكل لغة
    summary: t({
      ar: insert("{{files}} في {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"),
    }),
    files: t({
      ar: plural({
        one: "{{count}} ملف",
        other: "{{count}} ملفات",
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
      ar: plural({
        one: "{{count}} مجلد",
        other: "{{count}} مجلدات",
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
        "ar": {
          "nodeType": "insertion",
          "insertion": "{{files}} في {{folders}}"
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
        "ar": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} ملف",
            "other": "{{count}} ملفات"
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
        "ar": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} مجلد",
            "other": "{{count}} مجلدات"
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

### 2. الاستخدام في المكون

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

### لماذا يوصى بهذا النهج

- **بنية الجملة وترتيب الكلمات**: تضع اللغات المختلفة الصفات والأعداد والأسماء بترتيبات مختلفة (على سبيل المثال، قد تعكس اللغتان اليابانية أو الألمانية ترتيب الملفات والمجلدات). يمنح قالب `insert()` المترجمين تحكماً كاملاً في ترتيب الكلمات دون التأثير على قواعد الجمع.
- **تجنب التضخم التركيبي**: إذا كانت اللغة A تحتوي على صيغتي جمع (الإنجليزية: `one`، `other`) وكانت اللغة B تحتوي على 4 أو 6 صيغ (كالروسية أو العربية)، فإن تداخل الجمع يتطلب فروعاً مضاعفة بشكل كبير. مع استخدام مفاتيح منفصلة، تعلن فقط عن مجموع الفروع بدلاً من ضربها.
- **إعادة الاستخدام**: يمكنك إعادة استخدام تعريفات صيغ الجمع لـ `files` أو `folders` في أجزاء أخرى من واجهة المستخدم.

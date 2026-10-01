---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "节点类型可以组合吗？（例如一句话中包含多个复数）"
description: "如何在 Intlayer 中通过组合节点类型，使用 insert() 或嵌套 plural() 在一句话中表达多个独立的复数变量。"
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

# 节点类型可以组合吗？（例如一句话中包含多个复数）

**可以**，Intlayer 中的节点类型支持相互组合。例如，你可以在一个 `plural()` 内部嵌套另一个 `plural()`，或者将 `plural()` 与 `insert()` 进行组合。

当你需要**在一句话中表达两个独立的复数变量**时（例如：_“2 个文件夹中的 1 个文件”_ 对比 _“1 个文件夹中的 3 个文件”_），主要有两种方式：

1. **使用 `insert()` 配合独立的 `plural()` 键（推荐）**：结构清晰、易于维护，并能保证不同语言之间正确的语序。
2. **在 `plural()` 内嵌套 `plural()`（直接组合）**：语法有效，但对于复数规则复杂的语言，会导致分支出现组合爆炸。

## 组合 `insert()` 与 `plural()`

最灵活且符合惯用法的模式是为每个复数词分别声明独立的 `plural` 键，并通过 `insert()` 模板将它们组合起来。

### 1. 声明内容

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // 插入模板定义了各种语言下的元素排列顺序
    summary: t({
      zh: insert("{{folders}} 中的 {{files}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"),
    }),
    files: t({
      zh: plural({
        other: "{{count}} 个文件",
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
      zh: plural({
        other: "{{count}} 个文件夹",
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
        "zh": {
          "nodeType": "insertion",
          "insertion": "{{folders}} 中的 {{files}}"
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
        "zh": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} 个文件"
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
        "zh": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} 个文件夹"
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

### 2. 在组件中使用

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

### 为什么推荐这种方式

- **句子结构与语序**：不同的语言具有不同的词序排列（例如日语、中文或德语中文件与文件夹的先后顺序可能与英语相反）。`insert()` 模板让翻译人员能够完全掌控语序，而不会影响复数规则。
- **避免组合爆炸**：如果语言 A 有 2 种复数形态（英语：`one`, `other`），而语言 B 有 4 种形态（俄语：`one`, `few`, `many`, `other`），嵌套 plural 在俄语中需要声明 $4 \times 4 = 16$ 个分支。而采用独立键，仅需声明 $4 + 4 = 8$ 个分支。
- **可复用性**：你可以在界面的其他地方单独复用 `files` 或 `folders` 的复数定义。

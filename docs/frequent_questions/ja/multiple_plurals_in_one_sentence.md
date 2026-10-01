---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "ノード型を組み合わせることはできますか？（例：1文の中に複数の複数形がある場合）"
description: "Intlayerでinsert()またはネストしたplural()を使用して、ノード型を組み合わせ、1つの文の中で複数の独立した複数形変数を表現する方法。"
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

# ノード型を組み合わせることはできますか？（例：1文の中に複数の複数形がある場合）

**はい**、Intlayerのノード型は組み合わせることができます。例えば、`plural()`の中に別の`plural()`をネストしたり、`plural()`と`insert()`を組み合わせたりすることが可能です。

**1つの文の中に2つの独立した複数形変数を表現したい場合**（例：_「1つのファイルが2つのフォルダーにあります」_ vs _「3つのファイルが1つのフォルダーにあります」_）、主に2つのアプローチがあります：

1. **個別の`plural()`キーを持つ`insert()`を使用する（推奨）**：クリーンで保守性が高く、言語ごとの正しい語順を維持できます。
2. **`plural()`の中に`plural()`をネストする（直接的な合成）**：構文としては有効ですが、複雑な複数形ルールを持つ言語では分岐の組み合わせが爆発的に増加する可能性があります。

## `insert()`と`plural()`を組み合わせる

最も柔軟でイディオマティックなパターンは、複数化する対象ごとに個別の`plural`キーを宣言し、それらを`insert()`テンプレートで組み合わせることです。

### 1. コンテンツを宣言する

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // 挿入テンプレートにより言語ごとの要素の並び順を定義
    summary: t({
      ja: insert("{{folders}}の中に{{files}}"), // 日本語独自の語順
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
    }),
    files: t({
      ja: plural({
        other: "{{count}} 個のファイル",
      }),
      en: plural({
        one: "{{count}} file",
        other: "{{count}} files",
      }),
      fr: plural({
        one: "{{count}} fichier",
        other: "{{count}} fichiers",
      }),
    }),
    folders: t({
      ja: plural({
        other: "{{count}} 個のフォルダー",
      }),
      en: plural({
        one: "{{count}} folder",
        other: "{{count}} folders",
      }),
      fr: plural({
        one: "{{count}} dossier",
        other: "{{count}} dossiers",
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
        "ja": {
          "nodeType": "insertion",
          "insertion": "{{folders}}の中に{{files}}"
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
        "ja": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} 個のファイル"
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
        "ja": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} 個のフォルダー"
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

### 2. コンポーネントで使用する

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

### このアプローチが推奨される理由

- **文構造と語順**：言語によって形容詞、数値、目的語の並び順が異なります（例えば、日本語やドイツ語ではファイルとフォルダーの語順が逆になる場合があります）。`insert()`テンプレートを使用することで、複数形ルールを壊すことなく、翻訳者が語順を完全にコントロールできます。
- **組み合わせ爆発の防止**：言語Aに2つの複数形があり（英語：`one`, `other`）、言語Bに4つの複数形がある場合（ロシア語：`one`, `few`, `many`, `other`）、複数形をネストするとロシア語では $4 \times 4 = 16$ 通りの分岐が必要になります。キーを分割すれば、$4 + 4 = 8$ 通りの宣言で済みます。
- **再利用性**：`files`や`folders`の複数形定義をUIの他の場所で再利用できます。

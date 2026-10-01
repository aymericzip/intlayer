---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "노드 타입을 결합할 수 있나요? (예: 한 문장에 복수형이 여러 개 있는 경우)"
description: "Intlayer에서 insert() 또는 중첩된 plural()을 사용하여 노드 타입을 결합하고 한 문장에서 여러 독립적인 복수형 변수를 표현하는 방법."
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

# 노드 타입을 결합할 수 있나요? (예: 한 문장에 복수형이 여러 개 있는 경우)

**네**, Intlayer의 노드 타입은 서로 결합할 수 있습니다. 예를 들어, `plural()` 안에 또 다른 `plural()`을 중첩하거나 `plural()`을 `insert()`와 결합할 수 있습니다.

**한 문장에 두 개의 독립적인 복수형 변수를 표현해야 할 때**(예: _"2개 폴더에 있는 1개 파일"_ vs. _"1개 폴더에 있는 3개 파일"_), 두 가지 주요 접근 방식이 있습니다:

1. **별도의 `plural()` 키와 함께 `insert()` 사용 (권장)**: 깔끔하고 유지보수가 쉬우며 언어별 올바른 어순을 유지합니다.
2. **`plural()` 안에 `plural()` 중첩 (직접 결합)**: 유효한 문법이지만 복잡한 복수형 규칙을 가진 언어의 경우 경우의 수가 급격히 늘어날 수 있습니다.

## `insert()`와 `plural()` 결합하기

가장 유연하고 관용적인 패턴은 복수화되는 각 단어에 대해 개별 `plural` 키를 선언하고 이를 `insert()` 템플릿으로 결합하는 것입니다.

### 1. 콘텐츠 선언

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // 삽입 템플릿은 언어별 요소의 배치 순서를 정의합니다
    summary: t({
      ko: insert("{{folders}} 안의 {{files}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"),
    }),
    files: t({
      ko: plural({
        other: "{{count}}개의 파일",
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
      ko: plural({
        other: "{{count}}개의 폴더",
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
        "ko": {
          "nodeType": "insertion",
          "insertion": "{{folders}} 안의 {{files}}"
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
        "ko": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}}개의 파일"
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
        "ko": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}}개의 폴더"
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

### 2. 컴포넌트에서 사용하기

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

### 이 방식이 권장되는 이유

- **문장 구조 및 어순**: 언어마다 형용사, 수량, 목적어의 어순이 다릅니다 (예: 한국어, 일본어 또는 독일어에서는 파일과 폴더의 순서가 바뀔 수 있습니다). `insert()` 템플릿을 사용하면 복수형 규칙에 영향을 주지 않고 번역자가 어순을 완전히 제어할 수 있습니다.
- **경우의 수 폭발 방지**: 언어 A에 2개의 복수형이 있고 (영어: `one`, `other`), 언어 B에 4개의 형태가 있는 경우 (러시아어: `one`, `few`, `many`, `other`), 복수형을 중첩하면 러시아어의 경우 $4 \times 4 = 16$개의 분기가 필요합니다. 반면 별도 키를 사용하면 $4 + 4 = 8$개의 분기만 선언하면 됩니다.
- **재사용성**: UI의 다른 곳에서 `files`나 `folders`의 복수형 정의를 재사용할 수 있습니다.

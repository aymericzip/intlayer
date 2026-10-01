---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "Có thể kết hợp các loại node không? (vd: nhiều số nhiều trong một câu)"
description: "Cách kết hợp các loại node và biểu diễn nhiều biến số nhiều độc lập trong một câu bằng insert() hoặc plural() lồng nhau trong Intlayer."
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

# Có thể kết hợp các loại node không? (vd: nhiều số nhiều trong một câu)

**Có**, các loại node trong Intlayer hoàn toàn có thể kết hợp với nhau. Ví dụ: bạn có thể lồng một `plural()` bên trong một `plural()` khác, hoặc kết hợp `plural()` với `insert()`.

Khi cần biểu diễn **hai biến số nhiều độc lập trong cùng một câu** (ví dụ: _"1 tệp trong 2 thư mục"_ so với _"3 tệp trong 1 thư mục"_), có hai hướng tiếp cận chính:

1. **Sử dụng `insert()` với các khóa `plural()` riêng biệt (Khuyến nghị)**: Rõ ràng, dễ bảo trì và duy trì thứ tự từ chính xác theo từng ngôn ngữ.
2. **Lồng `plural()` bên trong `plural()` (Kết hợp trực tiếp)**: Cú pháp hợp lệ, nhưng có thể dẫn đến bùng nổ tổ hợp các nhánh đối với các ngôn ngữ có quy tắc số nhiều phức tạp.

## Kết hợp `insert()` với `plural()`

Mẫu hình linh hoạt và chuẩn mực nhất là khai báo các khóa `plural` riêng cho từng từ cần chia số nhiều và kết hợp chúng bằng một mẫu `insert()`.

### 1. Khai báo nội dung

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Mẫu chèn xác định cách sắp xếp các phần tử theo từng ngôn ngữ
    summary: t({
      vi: insert("{{files}} trong {{folders}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"),
    }),
    files: t({
      vi: plural({
        other: "{{count}} tệp",
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
      vi: plural({
        other: "{{count}} thư mục",
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
        "vi": {
          "nodeType": "insertion",
          "insertion": "{{files}} trong {{folders}}"
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
        "vi": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} tệp"
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
        "vi": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} thư mục"
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

### 2. Sử dụng trong component của bạn

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

### Tại sao đây là cách tiếp cận được khuyến nghị

- **Cấu trúc câu và thứ tự từ**: Các ngôn ngữ khác nhau sắp xếp tính từ, số lượng và danh từ theo thứ tự khác nhau (ví dụ tiếng Nhật hay tiếng Đức có thể đảo vị trí giữa tệp và thư mục). Mẫu `insert()` cho phép người dịch toàn quyền quyết định trật tự từ mà không làm xáo trộn các quy tắc số nhiều.
- **Tránh bùng nổ tổ hợp nhánh**: Nếu ngôn ngữ A có 2 dạng số nhiều (tiếng Anh: `one`, `other`) và ngôn ngữ B có 4 dạng (tiếng Nga: `one`, `few`, `many`, `other`), việc lồng các plural vào nhau đòi hỏi $4 \times 4 = 16$ nhánh cho tiếng Nga. Với các khóa tách rời, bạn chỉ cần khai báo $4 + 4 = 8$ nhánh.
- **Khả năng tái sử dụng**: Bạn có thể tái sử dụng định nghĩa số nhiều của `files` hoặc `folders` ở nhiều nơi khác trong giao diện người dùng.

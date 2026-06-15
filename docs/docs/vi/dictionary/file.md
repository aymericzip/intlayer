---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Tệp tin
description: Tìm hiểu cách nhúng các tệp tin bên ngoài vào từ điển nội dung của bạn bằng cách sử dụng hàm `file`. Tài liệu này giải thích cách Intlayer liên kết và quản lý nội dung tệp tin một cách động.
keywords:
  - Tệp tin
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Nội dung Tệp tin / Nhúng Tệp tin trong Intlayer

Trong Intlayer, hàm `file` cho phép nhúng nội dung tệp tin bên ngoài vào một từ điển. Cách tiếp cận này đảm bảo Intlayer nhận diện được tệp nguồn, giúp tích hợp liền mạch với Intlayer Visual Editor và CMS.

## Tại sao sử dụng `file` thay vì `import`, `require` hoặc `fs`?

<Tabs group="framework">
  <Tab label="React" value="react">

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use embedded file content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use embedded file content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use embedded file content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use embedded file content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use embedded file content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use embedded file content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use embedded file content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>
## Cài đặt Nội dung Tệp tin

Để nhúng nội dung tệp vào dự án Intlayer của bạn, hãy sử dụng hàm `file` trong một module nội dung. Dưới đây là các ví dụ minh họa các cách triển khai khác nhau.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Sử dụng Nội dung Tệp trong React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use embedded file content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use embedded file content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use embedded file content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use embedded file content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use embedded file content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use embedded file content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use embedded file content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## Ví dụ Markdown Đa ngôn ngữ

Để hỗ trợ các tệp Markdown có thể chỉnh sửa đa ngôn ngữ, bạn có thể sử dụng `file` kết hợp với `t()` và `md()` để định nghĩa các phiên bản ngôn ngữ khác nhau của một tệp nội dung Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

Cấu hình này cho phép nội dung được truy xuất động dựa trên ngôn ngữ ưu tiên của người dùng. Khi được sử dụng trong Intlayer Visual Editor hoặc CMS, hệ thống sẽ nhận biết rằng nội dung đến từ các tệp Markdown được chỉ định và đảm bảo chúng vẫn có thể chỉnh sửa được.

## Các loại đường dẫn khác nhau

Khi sử dụng hàm `file`, bạn có thể sử dụng các loại đường dẫn khác nhau để chỉ định tệp cần nhúng.

- `file("./path/to/file.txt")` - Đường dẫn tương đối đến tệp hiện tại
- `file("path/to/file.txt")` - Đường dẫn tương đối đến thư mục gốc của dự án
- `file("/users/username/path/to/file.txt")` - Đường dẫn tuyệt đối

## Cách Intlayer Xử Lý Nội Dung Tệp

Hàm `file` dựa trên module `fs` của Node.js để đọc nội dung của tệp được chỉ định và chèn nó vào từ điển. Khi được sử dụng kết hợp với Intlayer Visual Editor hoặc CMS, Intlayer có thể theo dõi mối quan hệ giữa từ điển và tệp. Điều này cho phép Intlayer:

- Nhận biết rằng nội dung xuất phát từ một tệp cụ thể.
- Tự động cập nhật nội dung từ điển khi tệp liên kết được chỉnh sửa.
- Đảm bảo đồng bộ giữa tệp và từ điển, giữ nguyên tính toàn vẹn của nội dung.

## Tài Nguyên Bổ Sung

Để biết thêm chi tiết về cách cấu hình và sử dụng nhúng tệp trong Intlayer, hãy tham khảo các tài nguyên sau:

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)
- [Tài liệu Nội dung Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md)
- [Tài liệu Nội dung Dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về nhúng tệp, quản lý nội dung, và tích hợp của Intlayer với các framework khác nhau.

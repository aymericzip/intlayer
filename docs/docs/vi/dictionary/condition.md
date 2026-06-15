---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Nội dung có điều kiện
description: Tìm hiểu cách sử dụng nội dung có điều kiện trong Intlayer để hiển thị nội dung một cách động dựa trên các điều kiện cụ thể. Theo dõi tài liệu này để triển khai điều kiện một cách hiệu quả trong dự án của bạn.
keywords:
  - Nội dung có điều kiện
  - Kết xuất động
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - condition
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Nội dung có điều kiện / Điều kiện trong Intlayer

## Cách hoạt động của Điều kiện

Trong Intlayer, nội dung có điều kiện được thực hiện thông qua hàm `cond`, hàm này ánh xạ các điều kiện cụ thể (thường là giá trị boolean) tới nội dung tương ứng của chúng. Cách tiếp cận này cho phép bạn chọn nội dung một cách động dựa trên một điều kiện nhất định. Khi tích hợp với React Intlayer hoặc Next Intlayer, nội dung phù hợp sẽ được tự động chọn dựa trên điều kiện được cung cấp tại thời điểm chạy.

## Thiết lập Nội dung Có điều kiện

Để thiết lập nội dung có điều kiện trong dự án Intlayer của bạn, hãy tạo một module nội dung bao gồm các định nghĩa điều kiện của bạn. Dưới đây là các ví dụ ở nhiều định dạng khác nhau.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "nội dung của tôi khi điều kiện đúng",
      false: "nội dung của tôi khi điều kiện sai",
      fallback: "nội dung của tôi khi điều kiện không thỏa mãn", // Tùy chọn
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "nội dung của tôi khi điều kiện đúng",
        "false": "nội dung của tôi khi điều kiện sai",
        "fallback": "nội dung của tôi khi điều kiện không thỏa mãn", // Tùy chọn
      },
    },
  },
}
```

> Nếu không khai báo fallback, khóa cuối cùng được khai báo sẽ được sử dụng làm fallback nếu điều kiện không được thỏa mãn.

## Sử dụng Nội dung Có điều kiện với React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

To utilize conditional content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass in a condition to select the appropriate output.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content when it's true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: my content when it's false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To utilize conditional content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To utilize conditional content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myCondition } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myCondition(true) }}</p>
    <p>{{ myCondition(false) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To utilize conditional content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myCondition(true)}</p>
  <p>{$content.myCondition(false)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To utilize conditional content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To utilize conditional content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const ConditionalComponent: Component = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To utilize conditional content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-conditional",
  template: `
    <div>
      <p>{{ content().myCondition(true) }}</p>
      <p>{{ content().myCondition(false) }}</p>
    </div>
  `,
})
export class ConditionalComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To utilize conditional content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("true-content")!.textContent =
    newContent.myCondition(true);
  document.getElementById("false-content")!.textContent =
    newContent.myCondition(false);
});

// Initial render
document.getElementById("true-content")!.textContent =
  content.myCondition(true);
document.getElementById("false-content")!.textContent =
  content.myCondition(false);
```

  </Tab>
</Tabs>

## Tài Nguyên Bổ Sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, vui lòng tham khảo các tài nguyên sau:

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Intlayer cho Next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về cách thiết lập và sử dụng Intlayer trên nhiều môi trường và framework khác nhau.

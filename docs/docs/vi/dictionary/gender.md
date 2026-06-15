---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Nội dung dựa trên giới tính
description: Tìm hiểu cách sử dụng nội dung dựa trên giới tính trong Intlayer để hiển thị nội dung một cách động dựa trên giới tính. Theo dõi tài liệu này để triển khai nội dung theo giới tính một cách hiệu quả trong dự án của bạn.
keywords:
  - Nội dung dựa trên giới tính
  - Hiển thị động
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "Giới thiệu nội dung dựa trên giới tính"
author: aymericzip
---

# Nội dung dựa trên giới tính / Giới tính trong Intlayer

## Cách hoạt động của giới tính

Trong Intlayer, nội dung dựa trên giới tính được thực hiện thông qua hàm `gender`, hàm này ánh xạ các giá trị giới tính cụ thể ('male', 'female') tới nội dung tương ứng của chúng. Cách tiếp cận này cho phép bạn chọn nội dung một cách động dựa trên giới tính được cung cấp. Khi tích hợp với React Intlayer hoặc Next Intlayer, nội dung phù hợp sẽ tự động được chọn dựa trên giới tính được cung cấp tại thời điểm chạy.

## Thiết lập Nội dung Dựa trên Giới tính

Để thiết lập nội dung dựa trên giới tính trong dự án Intlayer của bạn, hãy tạo một module nội dung bao gồm các định nghĩa theo giới tính của bạn. Dưới đây là các ví dụ ở nhiều định dạng khác nhau.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "nội dung của tôi dành cho người dùng nam",
      female: "nội dung của tôi dành cho người dùng nữ",
      fallback: "nội dung của tôi khi giới tính không được chỉ định", // Tùy chọn
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "nội dung của tôi dành cho người dùng nam",
        "female": "nội dung của tôi dành cho người dùng nữ",
        "fallback": "nội dung của tôi khi giới tính không được chỉ định", // Tùy chọn
      },
    },
  },
}
```

> Nếu không khai báo fallback, khóa cuối cùng được khai báo sẽ được sử dụng làm fallback nếu giới tính không được chỉ định hoặc không khớp với bất kỳ giới tính nào đã định nghĩa.

## Sử dụng Nội dung Dựa trên Giới tính với React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

To utilize gender-based content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass in a gender to select the appropriate output.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content for male users */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: my content for male users */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To utilize gender-based content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To utilize gender-based content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myGender } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myGender("male") }}</p>
    <p>{{ myGender("female") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To utilize gender-based content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myGender("male")}</p>
  <p>{$content.myGender("female")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To utilize gender-based content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To utilize gender-based content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const GenderComponent: Component = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To utilize gender-based content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-gender",
  template: `
    <div>
      <p>{{ content().myGender("male") }}</p>
      <p>{{ content().myGender("female") }}</p>
    </div>
  `,
})
export class GenderComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To utilize gender-based content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("gender-male")!.textContent =
    newContent.myGender("male");
  document.getElementById("gender-female")!.textContent =
    newContent.myGender("female");
});

// Initial render
document.getElementById("gender-male")!.textContent = content.myGender("male");
document.getElementById("gender-female")!.textContent =
  content.myGender("female");
```

  </Tab>
</Tabs>

## Tài Nguyên Bổ Sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, hãy tham khảo các tài nguyên sau:

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Những tài nguyên này cung cấp thêm cái nhìn sâu sắc về việc thiết lập và sử dụng Intlayer trên nhiều môi trường và framework khác nhau.

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về việc thiết lập và sử dụng Intlayer trên nhiều môi trường và framework khác nhau.

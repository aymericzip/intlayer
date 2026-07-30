---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Nội dung dựa trên lựa chọn (Select)
description: Tìm hiểu cách sử dụng nội dung dựa trên lựa chọn (select) trong Intlayer để hiển thị động nội dung dựa trên giá trị chuỗi tùy ý. Theo dõi tài liệu này để triển khai hiệu quả nội dung giống như switch trong dự án của bạn.
keywords:
  - Nội dung dựa trên lựa chọn
  - Select Content
  - Nội dung Switch
  - ICU select
  - Kết xuất động (Dynamic rendering)
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Giới thiệu nội dung dựa trên lựa chọn"
author: aymericzip
---

# Nội dung dựa trên lựa chọn (Select) / Intlayer

## Select hoạt động như thế nào

Trong Intlayer, nội dung dựa trên lựa chọn đạt được thông qua hàm `select`, hàm này ánh xạ các giá trị chuỗi tùy ý tới nội dung tương ứng của chúng. Hàm này tương đương với thông báo ICU `{value, select, …}`, hoặc giống như một câu lệnh `switch` trong mã ứng dụng của bạn.

Sử dụng `select` khi yếu tố phân biệt (discriminant) là một chuỗi dạng tự do: trạng thái (status), gói đăng ký (plan), nền tảng (platform) hoặc vai trò (role). Đối với các yếu tố phân biệt khác, Intlayer cung cấp các nút (nodes) chuyên dụng:

| Yếu tố phân biệt (Discriminant) | Nút (Node) |
| ------------------------------- | ---------- |
| Số lượng (Quantity)             | `enu()`    |
| Boolean                         | `cond()`   |
| Giới tính (Gender)              | `gender()` |
| Bất kỳ chuỗi nào khác           | `select()` |

## Thiết lập nội dung dựa trên lựa chọn

Để thiết lập nội dung dựa trên lựa chọn trong dự án Intlayer của bạn, hãy tạo một module nội dung bao gồm các định nghĩa lựa chọn (select) của bạn. Dưới đây là ví dụ trong các định dạng khác nhau.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // tùy chọn (optional)
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // tùy chọn (optional)
      },
    },
  },
}
```

> Nếu không có `fallback` nào được khai báo, khóa (key) được khai báo cuối cùng sẽ được coi là dự phòng khi giá trị được cung cấp không khớp với bất kỳ trường hợp nào đã được khai báo: giống hệt như thỏa thuận (contract) của `cond()` và `gender()`.

### An toàn kiểu (Type Safety)

Tham số được chấp nhận được suy luận từ các trường hợp đã được khai báo:

- Nếu không có `fallback`, chỉ các trường hợp đã khai báo mới được chấp nhận: việc đánh máy sai sẽ tạo ra một lỗi kiểu (type error).
- Nếu có `fallback`, bất kỳ chuỗi nào cũng được chấp nhận (bởi vì fallback bao gồm các giá trị không khớp) trong khi các trường hợp đã khai báo vẫn cung cấp tính năng tự động hoàn thành (autocompletion).

## Tại sao không sử dụng một đối tượng thông thường?

Sẽ rất hấp dẫn nếu khai báo một đối tượng (object) thông thường và lập chỉ mục (index) vào đó bằng cách sử dụng một giá trị trong thời gian chạy (runtime value):

```tsx
// ❌ Đừng làm điều này
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Trình biên dịch (compiler) Intlayer phân tích mã nguồn của bạn để loại bỏ nội dung không sử dụng và thu nhỏ (minify) các khóa còn lại. Việc truy cập được tính toán động (`obj[expr]`) không thể được giải quyết tĩnh (statically resolved), do đó toàn bộ nhánh sẽ được đánh dấu là mờ (opaque): nó sẽ được giữ lại trong gói (bundle) và các khóa của nó sẽ không được thu nhỏ.

Bằng cách sử dụng `select()`, việc giải quyết trường hợp (case resolution) diễn ra bên trong một lệnh gọi hàm thay vì là một truy cập thuộc tính (property access). Trình biên dịch coi nó là một truy cập trường tĩnh (static field access) đơn lẻ, và tối ưu hóa nút này một cách chính xác như những gì nó làm với `enu()`, `cond()`, hoặc `gender()`:

```tsx
// ✅ Hãy làm điều này
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Sử dụng nội dung dựa trên lựa chọn

<Tabs group="framework">
  <Tab label="React" value="react">

Để tận dụng nội dung dựa trên lựa chọn trong một component React, hãy nhập khẩu (import) và sử dụng hook `useIntlayer` từ gói `react-intlayer`. Hook này lấy (fetch) nội dung cho khóa (key) đã chỉ định và cho phép bạn truyền một giá trị vào để chọn đầu ra thích hợp.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Đầu ra: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Đầu ra: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Đầu ra: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Để tận dụng nội dung dựa trên lựa chọn trong các Client Components của Next.js, hãy lấy nội dung thông qua hook `useIntlayer`. Đây là một ví dụ:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Để tận dụng nội dung dựa trên lựa chọn trong các component Vue, hãy lấy nội dung thông qua hook `useIntlayer`. Đây là một ví dụ:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Để tận dụng nội dung dựa trên lựa chọn trong các component Svelte, hãy lấy nội dung thông qua hook `useIntlayer`. Store (kho lưu trữ) được truy cập bằng cách sử dụng dấu `$`. Đây là một ví dụ:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Để tận dụng nội dung dựa trên lựa chọn trong các component Preact, hãy lấy nội dung thông qua hook `useIntlayer`. Đây là một ví dụ:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Để tận dụng nội dung dựa trên lựa chọn trong các component SolidJS, hãy lấy nội dung thông qua hook `useIntlayer`. Đây là một ví dụ:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Để tận dụng nội dung dựa trên lựa chọn trong các component Angular, hãy lấy nội dung thông qua hook `useIntlayer`. Đây là một ví dụ:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Để tận dụng nội dung dựa trên lựa chọn với `vanilla-intlayer`, hãy lấy nội dung thông qua hàm `useIntlayer`. Đây là một ví dụ:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Lần hiển thị ban đầu (Initial render)
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Kết hợp Select với các Nút (Nodes) khác

Bởi vì mỗi trường hợp (case) chứa một nút nội dung đầy đủ (full content node), `select` có thể được kết hợp với các nút như `t()`, `insert()`, `md()`, v.v.:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          vi: "{{name}} đã lưu một bản nháp",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          vi: "{{name}} đã xuất bản bài viết",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          vi: "{{name}} đã cập nhật bài viết",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Đầu ra: Alice đã lưu một bản nháp
```

## Chuyển đổi từ ICU `select`

Các thông báo sử dụng tham số `select` của ICU sẽ được nhập (imported) dưới dạng nút (node) `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

Sẽ trở thành:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

Trường hợp `other` của ICU được đổi tên thành `fallback`, tên chuẩn (canonical name) trong Intlayer cho tất cả các trường hợp bao gồm (catch-all cases). Tham số thứ hai lưu lại tên biến ICU để thông báo sẽ biến đổi trở lại thành đúng chuỗi ICU đó khi xuất (export).

> Xin lưu ý, thông báo ICU `select` nơi các trường hợp là các giá trị giới tính (`male` / `female` / `other`) thay vào đó sẽ được nhập dưới dạng nút [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md).

## Tài nguyên Bổ sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, hãy xem các tài nguyên sau:

- [Tài liệu Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- [Tài liệu Intlayer React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Intlayer Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Các tài nguyên này cung cấp thêm thông tin chi tiết về việc thiết lập và sử dụng Intlayer trong các môi trường và framework khác nhau.

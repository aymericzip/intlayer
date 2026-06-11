---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Kiểu IntlayerNode. Nó là gì?
description: Kiểu IntlayerNode là gì? Tại sao chuỗi của tôi lại được chuyển đổi thành IntlayerNode&lt;string&gt;?
keywords:
  - Giới thiệu
  - Bắt đầu
  - Intlayer
  - Ứng dụng
  - Gói (Packages)
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Khởi tạo tài liệu"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Kiểu IntlayerNode là gì?

Kiểu `IntlayerNode<T>` là một kiểu đặc biệt được cung cấp bởi các gói của intlayer như `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` và `vanilla-intlayer`.

## Ví dụ sử dụng

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // trả về kiểu: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo thêm các framework khác dưới dạng tab giống như trong docs/docs/vi/dictionary/markdown.md
</Tabs>

### Tại sao Intlayer lại chèn một IntlayerNode?

Intlayer chèn một IntlayerNode để có thể hiển thị các Bộ chọn (Selectors) của trình chỉnh sửa trực quan trong ngữ cảnh của CMS / Trình chỉnh sửa trực quan.

![Bản demo trình chỉnh sửa trực quan](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

Một IntlayerNode là một Node React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla được làm phong phú, nhưng nó cũng cho phép truy cập các thuộc tính của node nguyên thủy cơ bản.

Ví dụ:

```js
const content = useIntlayer("app");

// Trường hợp là Chuỗi (String)
content.title; // Trả về IntlayerNode&lt;string&gt;
content.title.value; // Trả về nội dung cơ bản, ở đây là một chuỗi

content.title.toString(); // Trả về chuỗi
content.title.toLowerCase(); // Trả về chuỗi
String(content.title); // Trả về chuỗi
content.title.toUpperCase(); // Trả về chuỗi in hoa
content.title.replace("a", "b"); // Trả về chuỗi đã sửa đổi
// ...
```

> Việc truy cập các thuộc tính của một IntlayerNode sẽ vẫn hoạt động, nhưng sẽ làm mất khả năng hiển thị các bộ chọn trong Trình chỉnh sửa trực quan.

> IntlayerNode cũng có thể bao bọc số, hoặc các kiểu khác như `IntlayerNode<number>`

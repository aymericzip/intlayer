---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Markdown
description: Tìm hiểu cách khai báo và sử dụng nội dung Markdown trên trang web đa ngôn ngữ của bạn với Intlayer. Làm theo các bước trong tài liệu trực tuyến này để tích hợp Markdown một cách liền mạch vào dự án của bạn.
keywords:
  - Markdown
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
  - markdown
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Markdown / Nội dung Văn bản Đa dạng

## Cách Markdown Hoạt động

Intlayer hỗ trợ nội dung văn bản đa dạng được định nghĩa bằng cú pháp Markdown. Điều này được thực hiện thông qua hàm `md`, hàm này chuyển đổi một chuỗi Markdown thành định dạng có thể được quản lý bởi Intlayer. Bằng cách sử dụng Markdown, bạn có thể dễ dàng viết và duy trì nội dung với định dạng phong phú, chẳng hạn như blog, bài viết, và nhiều hơn nữa.

[Công cụ chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) và [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) đều hỗ trợ quản lý nội dung Markdown.

Khi tích hợp với một ứng dụng React, bạn có thể sử dụng một nhà cung cấp kết xuất Markdown (chẳng hạn như [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) để kết xuất nội dung Markdown thành HTML. Điều này cho phép bạn viết nội dung bằng Markdown trong khi đảm bảo nó hiển thị đúng trong ứng dụng của bạn.

## Thiết lập Nội dung Markdown

Để thiết lập nội dung Markdown trong dự án Intlayer của bạn, hãy định nghĩa một từ điển nội dung sử dụng hàm `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Định nghĩa từ điển Markdown với kiểu dữ liệu Dictionary của Intlayer
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Tiêu đề của tôi \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Định nghĩa từ điển Markdown với kiểu dữ liệu Dictionary của Intlayer
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Tiêu đề của tôi \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## Tiêu đề của tôi \n\nLorem Ipsum"
    }
  }
}
```

## Nhập file `.md` (đa ngôn ngữ)

Nếu file Markdown của bạn là file `.md`, bạn có thể nhập nó bằng các định dạng import khác nhau do JavaScript hoặc Intlayer cung cấp.

Khuyến nghị ưu tiên nhập thông qua [`file` function](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/file.md), vì nó cho phép Intlayer quản lý đúng các đường dẫn tương đối với vị trí file và đảm bảo tích hợp file này với Visual Editor / CMS.

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Khai báo này cho phép TypeScript nhận diện và nhập các file Markdown (.md) như các module.
// Nếu không có đoạn này, TypeScript sẽ báo lỗi khi cố gắng nhập các file Markdown,
// vì nó không hỗ trợ nhập file không phải mã nguồn một cách nguyên bản.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, file, t, type Dictionary } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown from "./myMarkdown.md";

const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, file, t } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown from "./myMarkdown.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, file, t } = require("intlayer");

const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
// Định nghĩa từ điển markdown với các nội dung đa ngôn ngữ và các phương thức lấy nội dung khác nhau
const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// - Việc nhập các tệp Markdown bên ngoài (.md) chỉ có thể thực hiện bằng cách sử dụng node `file`, hoặc các tệp khai báo JS hoặc TS.
// - Việc lấy nội dung Markdown bên ngoài chỉ có thể thực hiện bằng các tệp khai báo JS hoặc TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "": {
        "nodeType": "file",
        "file": "./myMarkdown.md",
      },
    },

    "contentMultilingualFile": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.en.md",
          },
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.fr.md",
          },
        },
        "es": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.es.md",
          },
        },
      },
    },
  },
}
```

## Sử dụng Markdown với React Intlayer

Để hiển thị nội dung Markdown trong ứng dụng React, bạn có thể tận dụng hook `useIntlayer` từ gói `react-intlayer` cùng với một provider để render Markdown. Trong ví dụ này, chúng tôi sử dụng gói [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) để chuyển đổi Markdown thành HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="esm"
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="commonjs"
const { useIntlayer, MarkdownProvider } = require("react-intlayer");
const Markdown = require("markdown-to-jsx");

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

module.exports = {
  AppProvider,
};
```

Trong triển khai này:

- `MarkdownProvider` bao bọc ứng dụng (hoặc phần liên quan của nó) và chấp nhận một hàm `renderMarkdown`. Hàm này được sử dụng để chuyển đổi chuỗi Markdown thành JSX bằng cách sử dụng gói `markdown-to-jsx`.
- Hook `useIntlayer` được sử dụng để lấy nội dung Markdown (`myMarkdownContent`) từ dictionary với khóa `"app"`.
- Nội dung Markdown được render trực tiếp trong component, và việc render Markdown được xử lý bởi provider.

### Sử dụng Markdown với Next Intlayer

Việc triển khai sử dụng package `next-intlayer` tương tự như trên. Điểm khác duy nhất là hàm `renderMarkdown` nên được truyền vào component `MarkdownProvider` trong một client component.

```tsx title="src/providers/IntlayerMarkdownProvider.tsx" codeFormat="typescript"
"use client";

import type { FC, PropsWithChildren } from "react";
import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown: string) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.msx" codeFormat="esm"
"use client";

import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span> // hiển thị markdown với màu đỏ
);

export const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.csx" codeFormat="commonjs"
"use client";

const { MarkdownProvider } = require("next-intlayer");

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

## Tài Nguyên Bổ Sung

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)
- [markdown-to-jsx trên npm](https://www.npmjs.com/package/markdown-to-jsx)

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về cách thiết lập và sử dụng Intlayer với các loại nội dung và framework khác nhau.

---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu Hook useDictionary | next-intlayer
description: Xem cách sử dụng hook useDictionary cho gói next-intlayer
keywords:
  - useDictionary
  - dictionary
  - key
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tích hợp React: Tài liệu Hook `useDictionary`

Phần này cung cấp hướng dẫn chi tiết về cách sử dụng hook `useDictionary` trong các ứng dụng React, cho phép xử lý hiệu quả nội dung địa phương hóa mà không cần trình chỉnh sửa trực quan.

## Nhập `useDictionary` trong React

Hook `useDictionary` có thể được tích hợp vào các ứng dụng React bằng cách nhập nó tùy theo ngữ cảnh:

- **Client Component (Thành phần phía khách hàng):**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Sử dụng trong các thành phần React phía khách hàng
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Sử dụng trong các thành phần React phía khách hàng
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Sử dụng trong các thành phần React phía khách hàng
  ```

- **Server Component (Thành phần phía máy chủ):**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Sử dụng trong các thành phần React phía máy chủ
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Sử dụng trong các thành phần React phía máy chủ
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Sử dụng trong các thành phần React phía máy chủ
  ```

## Tham số

Hook nhận hai tham số:

1. **`dictionary`**: Một đối tượng từ điển đã được khai báo chứa nội dung được bản địa hóa cho các khóa cụ thể.
2. **`locale`** (tùy chọn): Ngôn ngữ mong muốn. Mặc định là ngôn ngữ của ngữ cảnh hiện tại nếu không được chỉ định.

## Từ điển

Tất cả các đối tượng từ điển nên được khai báo trong các tệp nội dung có cấu trúc để đảm bảo an toàn kiểu và ngăn ngừa lỗi thời gian chạy. Bạn có thể tìm thấy [hướng dẫn thiết lập tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md). Dưới đây là một ví dụ về khai báo nội dung:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Khai báo nội dung ví dụ với kiểu Dictionary
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Khai báo nội dung ví dụ với kiểu Dictionary
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Ví dụ sử dụng trong React Client Component

Dưới đây là ví dụ về cách sử dụng hook `useDictionary` trong một component React:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

// Sử dụng hook useDictionary từ next-intlayer
const { useDictionary } = require("next-intlayer");
// Nội dung ví dụ được import từ file component.content
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  // Lấy title và content từ hook useDictionary
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Ví dụ sử dụng trong React Server Component

Nếu bạn sử dụng hook `useDictionary` bên ngoài `IntlayerServerProvider`, bạn phải cung cấp rõ locale như một tham số khi render component:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Ghi chú về Thuộc tính

Không giống như các tích hợp sử dụng trình chỉnh sửa trực quan, các thuộc tính như `buttonTitle.value` không áp dụng ở đây. Thay vào đó, truy cập trực tiếp các chuỗi đã được bản địa hóa như đã khai báo trong nội dung của bạn.

```jsx
<button title={content.title}>{content.content}</button>
```

## Mẹo bổ sung

- **An toàn kiểu**: Luôn sử dụng `Dictionary` để định nghĩa các từ điển của bạn nhằm đảm bảo an toàn kiểu.
- **Cập nhật bản địa hóa**: Khi cập nhật nội dung, hãy đảm bảo tất cả các ngôn ngữ đều nhất quán để tránh thiếu bản dịch.

Tài liệu này tập trung vào việc tích hợp hook `useDictionary`, cung cấp một phương pháp đơn giản hóa để quản lý nội dung bản địa hóa mà không phụ thuộc vào các chức năng của trình chỉnh sửa trực quan.

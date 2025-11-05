---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary Hook - Tài liệu React Intlayer
description: Hướng dẫn đầy đủ về cách sử dụng hook useDictionary trong các ứng dụng React với Intlayer để xử lý hiệu quả nội dung đa ngôn ngữ mà không cần trình chỉnh sửa trực quan.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localization
  - i18n
  - dictionary
  - translation
slugs:
  - doc
  - package
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tích hợp React: Tài liệu Hook `useDictionary`

Phần này cung cấp hướng dẫn chi tiết về cách sử dụng hook `useDictionary` trong các ứng dụng React, cho phép xử lý hiệu quả nội dung đa ngôn ngữ mà không cần trình chỉnh sửa trực quan.

## Nhập `useDictionary` trong React

Hook `useDictionary` có thể được tích hợp vào các ứng dụng React bằng cách nhập nó tùy theo ngữ cảnh:

- **Component phía Client:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Sử dụng trong các component React phía client
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Sử dụng trong các component React phía client
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Sử dụng trong các component React phía client
  ```

- **Component phía Server:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Sử dụng trong các component React phía server
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Sử dụng trong các component React phía server
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Sử dụng trong các component React phía server
  ```

## Tham số

Hook nhận hai tham số:

1. **`dictionary`**: Một đối tượng từ điển đã được khai báo chứa nội dung được bản địa hóa cho các khóa cụ thể.
2. **`locale`** (tùy chọn): Ngôn ngữ mong muốn. Mặc định là ngôn ngữ của ngữ cảnh hiện tại nếu không được chỉ định.

## Từ điển

Tất cả các đối tượng từ điển nên được khai báo trong các tệp nội dung có cấu trúc để đảm bảo an toàn kiểu và ngăn ngừa lỗi trong thời gian chạy. Bạn có thể tìm thấy [hướng dẫn thiết lập tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md). Dưới đây là một ví dụ về khai báo nội dung:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
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
      // Đây là nội dung của một ví dụ về component client
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "vi": "Ví dụ về Component Client"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "vi": "Đây là nội dung của một ví dụ về component client"
      }
    }
  }
}
```

## Ví dụ sử dụng trong React

Dưới đây là ví dụ về cách sử dụng hook `useDictionary` trong một component React:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Tích hợp Server

Nếu bạn sử dụng hook `useDictionary` bên ngoài `IntlayerProvider`, locale phải được cung cấp rõ ràng như một tham số khi render component:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Ghi chú về Thuộc tính

Không giống như các tích hợp sử dụng trình chỉnh sửa trực quan, các thuộc tính như `buttonTitle.value` không áp dụng ở đây. Thay vào đó, truy cập trực tiếp các chuỗi đã được địa phương hóa như đã khai báo trong nội dung của bạn.

```jsx
<button title={content.title}>{content.content}</button>
```

## Mẹo bổ sung

- **An toàn kiểu**: Luôn sử dụng `Dictionary` để định nghĩa các từ điển của bạn nhằm đảm bảo an toàn kiểu.
- **Cập nhật địa phương hóa**: Khi cập nhật nội dung, hãy đảm bảo tất cả các ngôn ngữ đều nhất quán để tránh thiếu bản dịch.

Tài liệu này tập trung vào việc tích hợp hook `useDictionary`, cung cấp một phương pháp đơn giản để quản lý nội dung địa phương hóa mà không phụ thuộc vào các chức năng của trình chỉnh sửa trực quan.

---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Chèn Nội Dung
description: Tìm hiểu cách khai báo và sử dụng các chỗ giữ chèn trong nội dung của bạn. Tài liệu này hướng dẫn bạn các bước để chèn giá trị một cách động trong các cấu trúc nội dung đã định sẵn.
keywords:
  - Chèn Nội Dung
  - Nội Dung Động
  - Chỗ Giữ
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Nội Dung Chèn / Chèn trong Intlayer

## Cách Thức Hoạt Động của Chèn

Trong Intlayer, nội dung chèn được thực hiện thông qua hàm `insertion`, hàm này xác định các trường chỗ giữ trong một chuỗi (chẳng hạn như `{{name}}` hoặc `{{age}}`) có thể được thay thế một cách động khi chạy. Cách tiếp cận này cho phép bạn tạo các chuỗi linh hoạt, giống như mẫu, trong đó các phần cụ thể của nội dung được xác định bởi dữ liệu được truyền từ ứng dụng của bạn.

Khi tích hợp với React Intlayer hoặc Next Intlayer, bạn chỉ cần cung cấp đối tượng dữ liệu chứa các giá trị cho từng chỗ giữ, và Intlayer sẽ tự động hiển thị nội dung với các chỗ giữ được thay thế.

## Thiết Lập Nội Dung Chèn

Để thiết lập nội dung chèn trong dự án Intlayer của bạn, hãy tạo một module nội dung bao gồm các định nghĩa chèn của bạn. Dưới đây là các ví dụ ở nhiều định dạng khác nhau.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Xin chào, tôi tên là {{name}} và tôi {{age}} tuổi!"),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Xin chào, tôi tên là {{name}} và tôi {{age}} tuổi!"),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Nội dung chèn với các biến động
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Xin chào, tôi tên là {{name}} và tôi {{age}} tuổi!"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Xin chào, tôi tên là {{name}} và tôi {{age}} tuổi!",
    },
  },
}
```

## Sử dụng Nội dung Chèn với React Intlayer

## Sử dụng Nội dung Chèn với React Intlayer

Để sử dụng nội dung chèn trong một component React, hãy import và sử dụng hook `useIntlayer` từ package `react-intlayer`. Hook này lấy nội dung theo key được chỉ định và cho phép bạn truyền vào một đối tượng ánh xạ mỗi placeholder trong nội dung với giá trị bạn muốn hiển thị.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Kết quả: "Xin chào, tôi tên là John và tôi 30 tuổi!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Bạn có thể tái sử dụng cùng một nội dung chèn với các giá trị khác nhau */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Kết quả: "Xin chào, tôi tên là John và tôi 30 tuổi!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Bạn có thể tái sử dụng cùng một nội dung chèn với các giá trị khác nhau */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Kết quả: "Xin chào, tôi tên là John và tôi 30 tuổi!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Bạn có thể tái sử dụng cùng một nội dung chèn với các giá trị khác nhau */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Tài Nguyên Bổ Sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, vui lòng tham khảo các tài nguyên sau:

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về cách thiết lập và sử dụng Intlayer trên nhiều môi trường và framework khác nhau.

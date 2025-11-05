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
    changes: Khởi tạo lịch sử
---

# Nội dung có điều kiện / Điều kiện trong Intlayer

## Cách hoạt động của Điều kiện

Trong Intlayer, nội dung có điều kiện được thực hiện thông qua hàm `cond`, hàm này ánh xạ các điều kiện cụ thể (thường là giá trị boolean) tới nội dung tương ứng của chúng. Cách tiếp cận này cho phép bạn chọn nội dung một cách động dựa trên một điều kiện nhất định. Khi tích hợp với React Intlayer hoặc Next Intlayer, nội dung phù hợp sẽ được tự động chọn dựa trên điều kiện được cung cấp tại thời điểm chạy.

## Thiết lập Nội dung Có điều kiện

Để thiết lập nội dung có điều kiện trong dự án Intlayer của bạn, hãy tạo một module nội dung bao gồm các định nghĩa điều kiện của bạn. Dưới đây là các ví dụ ở nhiều định dạng khác nhau.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "nội dung của tôi khi điều kiện đúng",
      false: "nội dung của tôi khi điều kiện sai",
      fallback: "nội dung của tôi khi điều kiện không thỏa mãn", // Tùy chọn
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "nội dung của tôi khi điều kiện đúng",
      false: "nội dung của tôi khi điều kiện sai",
      fallback: "nội dung của tôi khi điều kiện không thỏa mãn", // Tùy chọn
    }),
  },
};

module.exports = myConditionalContent;
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

Để sử dụng nội dung có điều kiện trong một component React, hãy import và sử dụng hook `useIntlayer` từ package `react-intlayer`. Hook này lấy nội dung cho khóa được chỉ định và cho phép bạn truyền vào một điều kiện để chọn kết quả phù hợp.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện đúng */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện là false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện không hợp lệ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện không hợp lệ */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện là true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện là false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện không hợp lệ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện không hợp lệ */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện là true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện là false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện không hợp lệ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Kết quả: nội dung của tôi khi điều kiện không hợp lệ */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Tài Nguyên Bổ Sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, vui lòng tham khảo các tài nguyên sau:

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Intlayer cho Next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về cách thiết lập và sử dụng Intlayer trên nhiều môi trường và framework khác nhau.

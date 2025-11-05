---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Lồng từ điển
description: Tìm hiểu cách sử dụng lồng nội dung trong Intlayer để tái sử dụng và cấu trúc nội dung đa ngôn ngữ của bạn một cách hiệu quả. Theo dõi tài liệu này để triển khai lồng nội dung một cách liền mạch trong dự án của bạn.
keywords:
  - Lồng nội dung
  - Tái sử dụng nội dung
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Lồng nội dung / Tham chiếu nội dung con

## Cách hoạt động của lồng nội dung

Trong Intlayer, lồng nội dung được thực hiện thông qua hàm `nest`, cho phép bạn tham chiếu và tái sử dụng nội dung từ một từ điển khác. Thay vì sao chép nội dung, bạn có thể trỏ đến một module nội dung hiện có bằng khóa của nó.

## Thiết lập lồng nội dung

Để thiết lập lồng nội dung trong dự án Intlayer của bạn, trước tiên bạn định nghĩa nội dung cơ sở mà bạn muốn tái sử dụng. Sau đó, trong một module nội dung riêng biệt, bạn sử dụng hàm `nest` để nhập nội dung đó.

### Từ điển cơ sở

Dưới đây là ví dụ về một từ điển cơ sở để lồng vào một từ điển khác:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "nội dung",
    subContent: {
      contentNumber: 0,
      contentString: "chuỗi",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "nội dung",
    subContent: {
      contentNumber: 0,
      contentString: "chuỗi",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "nội dung",
    "subContent": {
      "contentNumber": 0,
      "contentString": "chuỗi"
    }
  }
}
```

### Tham chiếu với Nest

Bây giờ, tạo một module nội dung khác sử dụng hàm `nest` để tham chiếu đến nội dung trên. Bạn có thể tham chiếu toàn bộ nội dung hoặc một giá trị lồng nhau cụ thể:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Tham chiếu toàn bộ dictionary:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Tham chiếu một giá trị lồng nhau cụ thể:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

Là tham số thứ hai, bạn có thể chỉ định một đường dẫn đến một giá trị lồng bên trong nội dung đó. Khi không có đường dẫn được cung cấp, toàn bộ nội dung của từ điển được tham chiếu sẽ được trả về.

## Sử dụng Nesting với React Intlayer

Để sử dụng nội dung lồng trong một component React, hãy tận dụng hook `useIntlayer` từ package `react-intlayer`. Hook này lấy nội dung chính xác dựa trên key được chỉ định. Dưới đây là ví dụ về cách sử dụng:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* Kết quả: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Giá trị Lồng Một Phần: {partialNestedContent}
        {/* Kết quả: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Nội dung Lồng Đầy Đủ: {JSON.stringify(fullNestedContent)}
        {/* Kết quả: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Giá trị Lồng Một Phần: {partialNestedContent}
        {/* Kết quả: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Nội dung Lồng Đầy Đủ: {JSON.stringify(fullNestedContent)}
        {/* Kết quả: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Giá trị Lồng Một Phần: {partialNestedContent}
        {/* Kết quả: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Tài Nguyên Bổ Sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, vui lòng tham khảo các tài nguyên sau:

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về cách thiết lập và sử dụng Intlayer trong các môi trường khác nhau và với nhiều framework khác nhau.

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
    changes: Giới thiệu nội dung dựa trên giới tính
---

# Nội dung dựa trên giới tính / Giới tính trong Intlayer

## Cách hoạt động của giới tính

Trong Intlayer, nội dung dựa trên giới tính được thực hiện thông qua hàm `gender`, hàm này ánh xạ các giá trị giới tính cụ thể ('male', 'female') tới nội dung tương ứng của chúng. Cách tiếp cận này cho phép bạn chọn nội dung một cách động dựa trên giới tính được cung cấp. Khi tích hợp với React Intlayer hoặc Next Intlayer, nội dung phù hợp sẽ tự động được chọn dựa trên giới tính được cung cấp tại thời điểm chạy.

## Thiết lập Nội dung Dựa trên Giới tính

Để thiết lập nội dung dựa trên giới tính trong dự án Intlayer của bạn, hãy tạo một module nội dung bao gồm các định nghĩa theo giới tính của bạn. Dưới đây là các ví dụ ở nhiều định dạng khác nhau.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "nội dung của tôi dành cho người dùng nam",
      female: "nội dung của tôi dành cho người dùng nữ",
      fallback: "nội dung của tôi khi giới tính không được chỉ định", // Tùy chọn
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "nội dung của tôi dành cho người dùng nam",
      female: "nội dung của tôi dành cho người dùng nữ",
      fallback: "nội dung của tôi khi giới tính không được chỉ định", // Tùy chọn
    }),
  },
};

module.exports = myGenderContent;
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

Để sử dụng nội dung dựa trên giới tính trong một component React, hãy import và sử dụng hook `useIntlayer` từ package `react-intlayer`. Hook này lấy nội dung cho khóa được chỉ định và cho phép bạn truyền vào một giới tính để chọn đầu ra phù hợp.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nam */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nữ */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nam */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nữ */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi khi không xác định giới tính */
          myGender("")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi khi không xác định giới tính */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nam */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nữ */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nam */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nữ */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi khi không xác định giới tính */
          myGender("")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi khi không xác định giới tính */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nam */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nữ */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nam */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi dành cho người dùng nữ */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi khi giới tính không được chỉ định */
          myGender("")
        }
      </p>
      <p>
        {
          /* Đầu ra: nội dung của tôi khi giới tính không được chỉ định */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Tài Nguyên Bổ Sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, hãy tham khảo các tài nguyên sau:

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Những tài nguyên này cung cấp thêm cái nhìn sâu sắc về việc thiết lập và sử dụng Intlayer trên nhiều môi trường và framework khác nhau.

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về việc thiết lập và sử dụng Intlayer trên nhiều môi trường và framework khác nhau.

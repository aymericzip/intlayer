---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Tệp tin
description: Tìm hiểu cách nhúng các tệp tin bên ngoài vào từ điển nội dung của bạn bằng cách sử dụng hàm `file`. Tài liệu này giải thích cách Intlayer liên kết và quản lý nội dung tệp tin một cách động.
keywords:
  - Tệp tin
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
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Nội dung Tệp tin / Nhúng Tệp tin trong Intlayer

Trong Intlayer, hàm `file` cho phép nhúng nội dung tệp tin bên ngoài vào một từ điển. Cách tiếp cận này đảm bảo Intlayer nhận diện được tệp nguồn, giúp tích hợp liền mạch với Intlayer Visual Editor và CMS.

## Tại sao sử dụng `file` thay vì `import`, `require` hoặc `fs`?

Khác với các phương pháp đọc tệp như `import`, `require` hoặc `fs`, việc sử dụng `file` liên kết tệp với từ điển, cho phép Intlayer theo dõi và cập nhật nội dung một cách động khi tệp được chỉnh sửa. Do đó, sử dụng `file` sẽ mang lại sự tích hợp tốt hơn với Intlayer Visual Editor và CMS.

## Cài đặt Nội dung Tệp tin

Để nhúng nội dung tệp vào dự án Intlayer của bạn, hãy sử dụng hàm `file` trong một module nội dung. Dưới đây là các ví dụ minh họa các cách triển khai khác nhau.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Định nghĩa nội dung tệp với kiểu Dictionary của Intlayer
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // Đường dẫn tới tệp được nhúng
  },
};

export default myFileContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Định nghĩa nội dung tệp với kiểu Dictionary của Intlayer
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // Đường dẫn tới tệp được nhúng
  },
};

module.exports = myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Sử dụng Nội dung Tệp trong React Intlayer

Để sử dụng nội dung tệp được nhúng trong một component React, hãy import và sử dụng hook `useIntlayer` từ package `react-intlayer`. Hook này lấy nội dung từ key được chỉ định và cho phép hiển thị nội dung đó một cách động.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Ví dụ Markdown Đa ngôn ngữ

Để hỗ trợ các tệp Markdown có thể chỉnh sửa đa ngôn ngữ, bạn có thể sử dụng `file` kết hợp với `t()` và `md()` để định nghĩa các phiên bản ngôn ngữ khác nhau của một tệp nội dung Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Cấu hình này cho phép nội dung được truy xuất động dựa trên ngôn ngữ ưu tiên của người dùng. Khi được sử dụng trong Intlayer Visual Editor hoặc CMS, hệ thống sẽ nhận biết rằng nội dung đến từ các tệp Markdown được chỉ định và đảm bảo chúng vẫn có thể chỉnh sửa được.

## Các loại đường dẫn khác nhau

Khi sử dụng hàm `file`, bạn có thể sử dụng các loại đường dẫn khác nhau để chỉ định tệp cần nhúng.

- `file("./path/to/file.txt")` - Đường dẫn tương đối đến tệp hiện tại
- `file("path/to/file.txt")` - Đường dẫn tương đối đến thư mục gốc của dự án
- `file("/users/username/path/to/file.txt")` - Đường dẫn tuyệt đối

## Cách Intlayer Xử Lý Nội Dung Tệp

Hàm `file` dựa trên module `fs` của Node.js để đọc nội dung của tệp được chỉ định và chèn nó vào từ điển. Khi được sử dụng kết hợp với Intlayer Visual Editor hoặc CMS, Intlayer có thể theo dõi mối quan hệ giữa từ điển và tệp. Điều này cho phép Intlayer:

- Nhận biết rằng nội dung xuất phát từ một tệp cụ thể.
- Tự động cập nhật nội dung từ điển khi tệp liên kết được chỉnh sửa.
- Đảm bảo đồng bộ giữa tệp và từ điển, giữ nguyên tính toàn vẹn của nội dung.

## Tài Nguyên Bổ Sung

Để biết thêm chi tiết về cách cấu hình và sử dụng nhúng tệp trong Intlayer, hãy tham khảo các tài nguyên sau:

- [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)
- [Tài liệu Nội dung Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md)
- [Tài liệu Nội dung Dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về nhúng tệp, quản lý nội dung, và tích hợp của Intlayer với các framework khác nhau.

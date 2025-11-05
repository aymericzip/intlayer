---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Khai báo nội dung `Theo Ngôn Ngữ` trong Intlayer
description: Tìm hiểu cách khai báo nội dung theo từng ngôn ngữ trong Intlayer. Theo dõi tài liệu để hiểu các định dạng và trường hợp sử dụng khác nhau.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Theo Ngôn Ngữ
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Khai báo nội dung `Theo Ngôn Ngữ` trong Intlayer

Intlayer hỗ trợ hai cách để khai báo nội dung đa ngôn ngữ:

- Một file duy nhất chứa tất cả các bản dịch
- Một file cho mỗi ngôn ngữ (định dạng theo ngôn ngữ)

Sự linh hoạt này cho phép:

- Dễ dàng di chuyển từ các công cụ i18n khác
- Hỗ trợ cho các quy trình dịch tự động
- Tổ chức rõ ràng các bản dịch thành các file riêng biệt theo từng ngôn ngữ

## Một File với Nhiều Bản Dịch

Định dạng này phù hợp cho:

- Lặp nhanh trong code.
- Tích hợp liền mạch với CMS.

Đây là phương pháp được khuyến nghị cho hầu hết các trường hợp sử dụng. Nó tập trung các bản dịch, giúp dễ dàng lặp lại và tích hợp với CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Nội dung helloWorld với các bản dịch đa ngôn ngữ
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Nội dung helloWorld với các bản dịch đa ngôn ngữ
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Khuyến nghị: Định dạng này là tốt nhất khi sử dụng trình chỉnh sửa trực quan của Intlayer hoặc quản lý bản dịch trực tiếp trong mã.

## Định dạng theo từng locale

Định dạng này hữu ích khi:

- Bạn muốn phiên bản hóa hoặc ghi đè các bản dịch một cách độc lập.
- Bạn đang tích hợp các quy trình dịch máy hoặc dịch thủ công.

Bạn cũng có thể tách các bản dịch thành các tệp riêng biệt theo từng locale bằng cách chỉ định trường locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Quan trọng
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Quan trọng
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Định nghĩa nội dung cho bản dịch "hello-world" với locale tiếng Anh
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Quan trọng
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Định nghĩa nội dung cho bản dịch "hello-world" với locale tiếng Tây Ban Nha
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Quan trọng
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Định nghĩa nội dung cho bản dịch "hello-world" với locale tiếng Anh
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Quan trọng
  content: {
    multilingualContent: "Title of my component",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Định nghĩa nội dung cho bản dịch "hello-world" với locale tiếng Tây Ban Nha
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Quan trọng
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Quan trọng
  "content": {
    "multilingualContent": "Tiêu đề của thành phần của tôi",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Quan trọng
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Quan trọng: Hãy chắc chắn rằng trường locale được định nghĩa. Nó cho Intlayer biết ngôn ngữ mà file đại diện.

> Lưu ý: Trong cả hai trường hợp, file khai báo nội dung phải tuân theo mẫu đặt tên `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` để được Intlayer nhận diện. Phần hậu tố `.[locale]` là tùy chọn và chỉ được sử dụng như một quy ước đặt tên.

## Kết hợp các định dạng

Bạn có thể kết hợp cả hai cách khai báo cho cùng một khóa nội dung. Ví dụ:

- Khai báo nội dung cơ sở của bạn một cách tĩnh trong một file như index.content.ts.
- Thêm hoặc ghi đè các bản dịch cụ thể trong các file riêng biệt như index.fr.content.ts hoặc index.content.json.

Cấu hình này đặc biệt hữu ích khi:

- Bạn muốn định nghĩa cấu trúc nội dung ban đầu trong code.
- Bạn dự định bổ sung hoặc hoàn thiện các bản dịch sau này bằng cách sử dụng CMS hoặc các công cụ tự động.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Ví dụ

Dưới đây là một file khai báo nội dung đa ngôn ngữ:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Tiêu đề của thành phần của tôi",
    projectName: "Dự án của tôi",
  },
} satisfies Dictionary;

// Xuất nội dung helloWorldContent mặc định
export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer tự động hợp nhất các file đa ngôn ngữ và theo từng locale.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Ngôn ngữ mặc định là ENGLISH, nên nó sẽ trả về nội dung bằng tiếng ANH

console.log(JSON.stringify(intlayer, null, 2));
// Kết quả:
// {
//  "multilingualContent": "Tiêu đề của thành phần của tôi",
//  "projectName": "Dự án của tôi"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Kết quả:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Dự án của tôi"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Kết quả:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Dự án của tôi"
// }
```

### Tạo Dịch Tự Động

Sử dụng [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md) để tự động điền các bản dịch còn thiếu dựa trên các dịch vụ bạn ưu tiên.

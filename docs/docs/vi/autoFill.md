---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Tự Động Điền
description: Tìm hiểu cách sử dụng chức năng tự động điền trong Intlayer để tự động điền nội dung dựa trên các mẫu định sẵn. Theo dõi tài liệu này để triển khai các tính năng tự động điền một cách hiệu quả trong dự án của bạn.
keywords:
  - Tự Động Điền
  - Tự Động Hóa Nội Dung
  - Nội Dung Động
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 7.0.0
    date: 2025-10-23
    changes: Đổi tên `autoFill` thành `fill` và cập nhật hành vi
  - version: 6.0.0
    date: 2025-09-20
    changes: Thêm cấu hình toàn cục
  - version: 6.0.0
    date: 2025-09-17
    changes: Thêm biến `{{fileName}}`
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch Tệp Khai Báo Nội Dung Tự Động Điền

**Các tệp khai báo nội dung tự động điền** trong CI của bạn là một cách để tăng tốc quy trình phát triển.

## Hành Vi Mặc Định

Theo mặc định, `fill` được đặt là `true` toàn cục, có nghĩa là Intlayer sẽ tự động điền tất cả các tệp nội dung và chỉnh sửa chính tệp đó. Hành vi này có thể được tùy chỉnh theo nhiều cách:

### Tùy Chọn Cấu Hình Toàn Cục

1. **`fill: true` (mặc định)** - Tự động điền tất cả các locale và chỉnh sửa tệp hiện tại
2. **`fill: false`** - Vô hiệu hóa tự động điền cho tệp nội dung này
3. **`fill: "path/to/file"`** - Tạo/cập nhật tệp được chỉ định mà không chỉnh sửa tệp hiện tại
4. **`fill: { [key in Locales]?: string }`** - Tạo/cập nhật tệp được chỉ định cho từng locale

### Thay Đổi Hành Vi trong v7

Trong v7, hành vi của lệnh `fill` đã được cập nhật:

- **`fill: true`** - Viết lại tệp hiện tại với nội dung đã điền cho tất cả các locale
- **`fill: "path/to/file"`** - Điền vào tệp được chỉ định mà không sửa đổi tệp hiện tại
- **`fill: false`** - Vô hiệu hóa hoàn toàn tính năng tự động điền

Khi sử dụng tùy chọn đường dẫn để ghi vào một tệp khác, cơ chế điền hoạt động thông qua mối quan hệ _master-slave_ giữa các tệp khai báo nội dung. Tệp chính (master) đóng vai trò là nguồn dữ liệu chính xác, và khi nó được cập nhật, Intlayer sẽ tự động áp dụng những thay đổi đó cho các tệp khai báo dẫn xuất (đã điền) được chỉ định bởi đường dẫn.

### Tùy Chỉnh Theo Locale

Bạn cũng có thể tùy chỉnh hành vi cho từng locale bằng cách sử dụng một đối tượng:

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  content: {
    internationalization: {
      locales: [Locales.ENGLISH, Locales.FRENCH, Locales.POLISH],
      defaultLocale: Locales.ENGLISH,
      requiredLocales: [Locales.ENGLISH], // Khuyến nghị để tránh lỗi Property 'pl' is missing in type '{ en: string; xxx }' trong hàm t của bạn nếu
    },
  },
  dictionary: {
    fill: {
      en: true, // Điền và chỉnh sửa tệp hiện tại cho tiếng Anh
      fr: "./translations/fr.json", // Tạo tệp riêng cho tiếng Pháp
      es: false, // Vô hiệu hóa điền cho tiếng Tây Ban Nha
    },
  },
};
```

Điều này cho phép bạn có các hành vi điền khác nhau cho các locale khác nhau trong cùng một dự án.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  fill: "./example.content.json",
  content: {
    contentExample: "Đây là một ví dụ về nội dung",
  },
} satisfies Dictionary;

export default exampleContent;
```

Dưới đây là một [tệp khai báo nội dung theo từng locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) sử dụng chỉ dẫn `fill`.

Sau đó, khi bạn chạy lệnh sau:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer sẽ tự động tạo tệp khai báo dẫn xuất tại `src/components/example/example.content.json`, điền vào tất cả các locale chưa được khai báo trong tệp chính.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Sau đó, cả hai tệp khai báo sẽ được hợp nhất thành một từ điển duy nhất, có thể truy cập bằng cách sử dụng hook tiêu chuẩn `useIntlayer("example")` (react) / composable (vue).

## Cấu hình toàn cục

Bạn có thể cấu hình tự động điền toàn cục trong tệp `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Tự động tạo các bản dịch còn thiếu cho tất cả các từ điển
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // tự động tạo các bản dịch còn thiếu cho tất cả các từ điển giống như sử dụng "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Bạn vẫn có thể tinh chỉnh từng từ điển bằng cách sử dụng trường `fill` trong các tệp nội dung. Intlayer sẽ ưu tiên cấu hình theo từng từ điển trước, sau đó mới dùng cấu hình toàn cục.

## Định dạng tệp tự động điền

Định dạng được khuyến nghị cho các tệp khai báo tự động điền là **JSON**, giúp tránh các ràng buộc về định dạng. Tuy nhiên, Intlayer cũng hỗ trợ các định dạng `.ts`, `.js`, `.mjs`, `.cjs` và các định dạng khác.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "./example.filled.content.ts",
  content: {
    // Nội dung của bạn
  },
};
```

Điều này sẽ tạo tệp tại:

```
src/components/example/example.filled.content.ts
```

> Việc tạo các tệp `.js`, `.ts` và các tệp tương tự hoạt động như sau:
>
> - Nếu tệp đã tồn tại, Intlayer sẽ phân tích nó bằng cách sử dụng AST (Cây cú pháp trừu tượng) để xác định từng trường và chèn các bản dịch còn thiếu.
> - Nếu tệp không tồn tại, Intlayer sẽ tạo tệp đó bằng cách sử dụng mẫu tệp khai báo nội dung mặc định.

## Đường dẫn tuyệt đối

Trường `fill` cũng hỗ trợ các đường dẫn tuyệt đối.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/example.content.json",
  content: {
    // Nội dung của bạn
  },
};
```

Điều này sẽ tạo tệp tại:

```
/messages/example.content.json
```

## Tự động tạo tệp khai báo nội dung theo từng locale

Trường `fill` cũng hỗ trợ tạo các tệp khai báo nội dung **theo từng locale**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Nội dung của bạn
  },
};
```

Điều này sẽ tạo hai tệp riêng biệt:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> Trong trường hợp này, nếu đối tượng không chứa tất cả các locale, Intlayer sẽ bỏ qua việc tạo các locale còn lại.

## Lọc tự động điền cho locale cụ thể

Sử dụng một đối tượng cho trường `fill` cho phép bạn áp dụng bộ lọc và chỉ tạo các tệp locale cụ thể.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Nội dung của bạn
  },
};
```

Điều này chỉ tạo tệp dịch tiếng Pháp.

## Biến đường dẫn

Bạn có thể sử dụng các biến bên trong đường dẫn `fill` để giải quyết động các đường dẫn đích cho các tệp được tạo ra.

**Các biến có sẵn:**

- `{{locale}}` – Mã locale (ví dụ: `fr`, `es`)
- `{{fileName}}` – Tên tệp (ví dụ: `index`)
- `{{key}}` – Khóa từ điển (ví dụ: `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Nội dung của bạn
  },
};
```

Điều này sẽ tạo ra:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "./{{fileName}}.content.json",
  content: {
    // Nội dung của bạn
  },
};
```

Điều này sẽ tạo ra:

- `./index.content.json`
- `./index.content.json`

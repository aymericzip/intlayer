---
createdAt: 2025-02-07
updatedAt: 2025-12-13
title: Tệp Nội Dung
description: Tìm hiểu cách tùy chỉnh các phần mở rộng cho các tệp khai báo nội dung của bạn. Theo dõi tài liệu này để triển khai các điều kiện một cách hiệu quả trong dự án của bạn.
keywords:
  - Tệp Nội Dung
  - Tài liệu
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Thêm hỗ trợ định dạng ICU và i18next
  - version: 7.0.0
    date: 2025-10-23
    changes: Đổi tên `autoFill` thành `fill`
  - version: 6.0.0
    date: 2025-09-20
    changes: Thêm tài liệu cho các trường
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tệp Nội Dung

<iframe title="i18n, Markdown, JSON… một giải pháp duy nhất để quản lý tất cả | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Tệp Nội Dung là gì?

Tệp nội dung trong Intlayer là một tệp chứa các định nghĩa từ điển.
Những tệp này khai báo nội dung văn bản, bản dịch và tài nguyên của ứng dụng của bạn.
Các tệp nội dung được Intlayer xử lý để tạo ra các từ điển.

Các từ điển sẽ là kết quả cuối cùng mà ứng dụng của bạn sẽ nhập khẩu bằng cách sử dụng hook `useIntlayer`.

### Các Khái Niệm Chính

#### Từ điển

Một từ điển là một tập hợp có cấu trúc của nội dung được tổ chức theo các khóa. Mỗi từ điển bao gồm:

- **Khóa**: Một định danh duy nhất cho từ điển
- **Nội dung**: Các giá trị nội dung thực tế (văn bản, số, đối tượng, v.v.)
- **Metadata**: Thông tin bổ sung như tiêu đề, mô tả, thẻ, v.v.

#### Tệp Nội Dung

Ví dụ về tệp nội dung:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Xin chào Thế giới", // Nội dung chuỗi
        numberContent: 123, // Nội dung số
        booleanContent: true, // Nội dung boolean
        javaScriptContent: `${process.env.NODE_ENV}`, // Nội dung JavaScript
      },
    },
    multilingualContent: t({
      en: "Nội dung tiếng Anh",
      "en-GB": "Nội dung tiếng Anh (UK)",
      fr: "Nội dung tiếng Pháp",
      es: "Nội dung tiếng Tây Ban Nha",
    }),
    quantityContent: enu({
      "<-1": "Ít hơn âm một chiếc xe",
      "-1": "Âm một chiếc xe",
      "0": "Không có xe nào",
      "1": "Một chiếc xe",
      ">5": "Một vài chiếc xe",
      ">19": "Nhiều chiếc xe",
    }),
    conditionalContent: cond({
      true: "Xác thực được bật",
      false: "Xác thực bị tắt",
    }),
    insertionContent: insert("Xin chào {{name}}!"),
    nestedContent: nest(
      "navbar", // Khóa của từ điển để lồng vào
      "login.button" // [Tùy chọn] Đường dẫn đến nội dung để lồng vào
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Ví dụ Markdown"),

    /*
     * Chỉ có sẵn khi sử dụng `react-intlayer` hoặc `next-intlayer`
     */
    jsxContent: <h1>Tiêu đề của tôi</h1>,
  },
} satisfies Dictionary<Content>; // [tùy chọn] Dictionary là generic và cho phép bạn củng cố định dạng của từ điển
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Xin chào Thế giới", // Nội dung chuỗi
        numberContent: 123, // Nội dung số
        booleanContent: true, // Nội dung boolean
        javaScriptContent: `${process.env.NODE_ENV}`, // Nội dung JavaScript
      },
      imbricatedArray: [1, 2, 3], // Mảng lồng nhau
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Ít hơn âm một chiếc xe",
      "-1": "Âm một chiếc xe",
      "0": "Không có xe",
      "1": "Một chiếc xe",
      ">5": "Một vài chiếc xe",
      ">19": "Nhiều chiếc xe",
    }),
    conditionalContent: cond({
      true: "Xác thực được bật",
      false: "Xác thực bị tắt",
    }),
    insertionContent: insert("Xin chào {{name}}!"),
    nestedContent: nest(
      "navbar", // Khóa của dictionary để lồng vào
      "login.button" // [Tùy chọn] Đường dẫn đến nội dung để lồng vào
    ),
    markdownContent: md("# Ví dụ Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Chỉ có sẵn khi sử dụng `react-intlayer` hoặc `next-intlayer`
    jsxContent: <h1>Tiêu đề của tôi</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Xin chào Thế giới",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // Biến môi trường Node.js
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Ít hơn âm một chiếc xe",
      "-1": "Âm một chiếc xe",
      "0": "Không có chiếc xe nào",
      "1": "Một chiếc xe",
      ">5": "Một vài chiếc xe",
      ">19": "Nhiều chiếc xe",
    }),
    conditionalContent: cond({
      true: "Xác thực được bật",
      false: "Xác thực bị tắt",
    }),
    insertionContent: insert("Xin chào {{name}}!"),
    nestedContent: nest(
      "navbar", // Khóa của từ điển để lồng vào
      "login.button" // [Tùy chọn] Đường dẫn đến nội dung để lồng vào
    ),
    markdownContent: md("# Ví dụ Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Chỉ có sẵn khi sử dụng `react-intlayer` hoặc `next-intlayer`
    jsxContent: <h1>Tiêu đề của tôi</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Xin chào Thế giới",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Nội dung tiếng Anh",
        "en-GB": "Nội dung tiếng Anh (UK)",
        "fr": "Nội dung tiếng Pháp",
        "es": "Nội dung tiếng Tây Ban Nha",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Không có xe",
        "1": "Một chiếc xe",
        "<-1": "Ít hơn âm một chiếc xe",
        "-1": "Âm một chiếc xe",
        ">5": "Một vài chiếc xe",
        ">19": "Nhiều chiếc xe",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Xác thực được bật",
        "false": "Xác thực bị tắt",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Xin chào {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Ví dụ Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Tiêu đề của tôi"],
      },
    },
  },
}
```

#### Các nút nội dung

Các nút nội dung là các khối xây dựng của nội dung từ điển. Chúng có thể là:

- **Giá trị nguyên thủy**: chuỗi, số, boolean, null, undefined
- **Node kiểu**: Các loại nội dung đặc biệt như bản dịch, điều kiện, markdown, v.v.
- **Hàm**: Nội dung động có thể được đánh giá tại thời gian chạy [xem Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/function_fetching.md)
- **Nội dung lồng nhau**: Tham chiếu đến các từ điển khác

#### Các loại nội dung

Intlayer hỗ trợ nhiều loại nội dung thông qua các node kiểu:

- **Nội dung bản dịch**: Văn bản đa ngôn ngữ với các giá trị theo từng locale [xem Nội dung bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation_content.md)
- **Nội dung Điều kiện**: Nội dung có điều kiện dựa trên các biểu thức boolean [xem Nội dung Điều kiện](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/condition_content.md)
- **Nội dung Liệt kê**: Nội dung thay đổi dựa trên các giá trị được liệt kê [xem Nội dung Liệt kê](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/enumeration_content.md)
- **Nội dung Chèn**: Nội dung có thể được chèn vào các nội dung khác [xem Nội dung Chèn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion_content.md)
- **Nội dung Markdown**: Nội dung văn bản phong phú ở định dạng Markdown [xem Nội dung Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown_content.md)
- **Nội dung Lồng nhau**: Tham chiếu đến các từ điển khác [xem Nội dung Lồng nhau](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/nested_content.md)
- **Nội dung Giới tính**: Nội dung thay đổi dựa trên giới tính [xem Nội dung Giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender_content.md)
- **Nội dung Tệp**: Tham chiếu đến các tệp bên ngoài [xem Nội dung Tệp](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/file_content.md)

## Cấu trúc Từ điển

Một từ điển trong Intlayer được định nghĩa bởi kiểu `Dictionary` và chứa một số thuộc tính điều khiển hành vi của nó:

### Thuộc tính Bắt buộc

#### `key` (string)

Định danh cho từ điển. Nếu nhiều từ điển có cùng một key, Intlayer sẽ tự động hợp nhất chúng.

> Sử dụng quy tắc đặt tên kebab-case (ví dụ: `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

Thuộc tính `content` chứa dữ liệu thực tế của từ điển và hỗ trợ:

- **Giá trị nguyên thủy**: chuỗi, số, boolean, null, undefined
- **Typed nodes**: Các loại nội dung đặc biệt sử dụng các hàm trợ giúp của Intlayer
- **Đối tượng lồng nhau**: Cấu trúc dữ liệu phức tạp
- **Mảng**: Bộ sưu tập nội dung
- **Hàm**: Đánh giá nội dung động

### Thuộc tính tùy chọn

#### `title` (string)

Tiêu đề dễ đọc cho con người của từ điển giúp nhận diện nó trong các trình soạn thảo và hệ thống CMS. Điều này đặc biệt hữu ích khi quản lý số lượng lớn từ điển hoặc khi làm việc với các giao diện quản lý nội dung.

**Ví dụ:**

```typescript
{
  key: "about-page-meta",
  title: "Metadata Trang Giới Thiệu",
  content: { /* ... */ }
}
```

#### `description` (string)

Mô tả chi tiết giải thích mục đích của từ điển, hướng dẫn sử dụng và các lưu ý đặc biệt. Mô tả này cũng được sử dụng làm ngữ cảnh cho việc tạo bản dịch bằng AI, giúp duy trì chất lượng và sự nhất quán của bản dịch.

**Ví dụ:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Từ điển này quản lý metadata của Trang Giới Thiệu",
    "Xem xét các thực hành tốt cho SEO:",
    "- Tiêu đề nên có độ dài từ 50 đến 60 ký tự",
    "- Mô tả nên có độ dài từ 150 đến 160 ký tự",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Mảng các chuỗi dùng để phân loại và tổ chức các từ điển. Các thẻ cung cấp ngữ cảnh bổ sung và có thể được sử dụng để lọc, tìm kiếm hoặc tổ chức các từ điển trong các trình soạn thảo và hệ thống CMS.

**Ví dụ:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Chỉ định bộ định dạng để sử dụng cho nội dung từ điển. Điều này cho phép sử dụng các cú pháp định dạng thông báo khác nhau.

- `'intlayer'`: Bộ định dạng Intlayer mặc định.
- `'icu'`: Sử dụng định dạng thông báo ICU.
- `'i18next'`: Sử dụng định dạng thông báo i18next.

**Ví dụ:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

Chuyển đổi từ điển thành từ điển theo từng locale, trong đó mỗi trường được khai báo trong nội dung sẽ tự động được chuyển thành một nút dịch. Khi thuộc tính này được thiết lập:

- Từ điển được xử lý như một từ điển đơn ngữ
- Mỗi trường trở thành một nút dịch cho ngôn ngữ cụ thể đó
- Bạn KHÔNG nên sử dụng các nút dịch (`t()`) trong nội dung khi sử dụng thuộc tính này
- Nếu không có thuộc tính này, từ điển sẽ được xử lý như một từ điển đa ngôn ngữ

> Xem [Khai báo nội dung theo ngôn ngữ trong Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) để biết thêm thông tin.

**Ví dụ:**

```json
// Từ điển theo ngôn ngữ
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Đây trở thành nút dịch cho 'en'
    "description": "Learn more about our company"
  }
}
```

#### `fill` (Fill)

Hướng dẫn tự động điền nội dung từ điển từ các nguồn bên ngoài. Điều này có thể được cấu hình toàn cục trong `intlayer.config.ts` hoặc theo từng từ điển. Hỗ trợ nhiều định dạng:

- **`true`**: Bật tính năng điền cho tất cả các ngôn ngữ
- **`false`**: Tắt tính năng điền cho tất cả các ngôn ngữ
- **`string`**: Đường dẫn tới một tệp đơn hoặc mẫu với các biến
- **`object`**: Đường dẫn tệp theo từng ngôn ngữ

**Ví dụ:**

```json
// Tắt tính năng điền
{
  "fill": false
}
// Tệp đơn
{
  "fill": "./translations/aboutPage.content.json"
}
// Mẫu với các biến
{
  "fill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Cấu hình chi tiết theo từng ngôn ngữ
{
  "fill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Các biến có sẵn:**

- `{{locale}}` – Mã ngôn ngữ (ví dụ: `fr`, `es`)
- `{{fileName}}` – Tên tệp (ví dụ: `example`)
- `{{key}}` – Khóa từ điển (ví dụ: `example`)

> Xem thêm [Cấu hình Tự động điền trong Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/fill.md) để biết thêm thông tin.

##### `priority` (number)

Chỉ định độ ưu tiên của từ điển để giải quyết xung đột. Khi có nhiều từ điển cùng chứa một khóa, từ điển có số ưu tiên cao nhất sẽ ghi đè lên các từ điển khác. Điều này hữu ích để quản lý thứ bậc nội dung và ghi đè.

**Ví dụ:**

```typescript
// Từ điển cơ sở
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// Từ điển ghi đè
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Chào mừng bạn đến với dịch vụ cao cấp của chúng tôi!" }
}
// Điều này sẽ ghi đè từ điển cơ sở
```

### Thuộc tính CMS

##### `version` (string)

Định danh phiên bản cho các từ điển từ xa. Giúp theo dõi phiên bản của từ điển đang được sử dụng, đặc biệt hữu ích khi làm việc với các hệ thống quản lý nội dung từ xa.

##### `live` (boolean)

Đối với các từ điển từ xa, cho biết liệu từ điển có nên được lấy trực tiếp tại thời gian chạy hay không. Khi được bật:

- Yêu cầu `importMode` được đặt thành "live" trong `intlayer.config.ts`
- Yêu cầu có một server trực tiếp đang chạy
- Từ điển sẽ được lấy tại thời gian chạy sử dụng API đồng bộ trực tiếp
- Nếu bật live nhưng việc lấy dữ liệu thất bại, sẽ chuyển sang giá trị động
- Nếu không ở chế độ live, từ điển sẽ được chuyển đổi tại thời điểm build để tối ưu hiệu suất

### Thuộc tính Hệ thống (Tự động tạo)

Các thuộc tính này được Intlayer tự động tạo và không nên chỉnh sửa thủ công:

##### `$schema` (string)

Schema JSON được sử dụng để xác thực cấu trúc của từ điển. Được Intlayer tự động thêm vào để đảm bảo tính toàn vẹn của từ điển.

##### `id` (string)

Đối với các từ điển từ xa, đây là định danh duy nhất của từ điển trên máy chủ từ xa. Được sử dụng để lấy và quản lý nội dung từ xa.

##### `projectIds` (string[])

Đối với các từ điển từ xa, mảng này chứa các ID của các dự án có thể sử dụng từ điển này. Một từ điển từ xa có thể được chia sẻ giữa nhiều dự án.

##### `localId` (LocalDictionaryId)

Định danh duy nhất cho các từ điển cục bộ. Được Intlayer tự động tạo để giúp xác định từ điển và xác định xem nó là cục bộ hay từ xa, cùng với vị trí của nó.

##### `localIds` (LocalDictionaryId[])

Đối với các từ điển được gộp, mảng này chứa các ID của tất cả các từ điển đã được gộp lại với nhau. Hữu ích để theo dõi nguồn gốc của nội dung được gộp.

##### `filePath` (string)

Đường dẫn tệp của từ điển cục bộ, chỉ ra tệp `.content` mà từ điển được tạo ra từ đó. Giúp trong việc gỡ lỗi và theo dõi nguồn.

##### `versions` (string[])

Đối với các từ điển từ xa, mảng này chứa tất cả các phiên bản có sẵn của từ điển. Giúp theo dõi các phiên bản có thể sử dụng.

##### `filled` (true)

Chỉ ra liệu từ điển đã được tự động điền từ các nguồn bên ngoài hay chưa. Trong trường hợp có xung đột, các từ điển cơ sở sẽ ghi đè lên các từ điển được tự động điền.

##### `location` ('distant' | 'locale')

Chỉ ra vị trí của từ điển:

- `'locale'`: Từ điển cục bộ (từ các tệp nội dung)
- `'distant'`: Từ điển từ xa (từ nguồn bên ngoài)

## Các loại nút nội dung

Intlayer cung cấp một số loại nút nội dung chuyên biệt mở rộng các giá trị nguyên thủy cơ bản:

### Nội dung dịch (`t`)

Nội dung đa ngôn ngữ thay đổi theo locale:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Nội dung điều kiện (`cond`)

Nội dung thay đổi dựa trên các điều kiện boolean:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "Người dùng đã đăng nhập",
  false: "Vui lòng đăng nhập để tiếp tục",
});
```

### Nội dung liệt kê (`enu`)

Nội dung thay đổi dựa trên các giá trị liệt kê:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Yêu cầu của bạn đang chờ xử lý",
  approved: "Yêu cầu của bạn đã được phê duyệt",
  rejected: "Yêu cầu của bạn đã bị từ chối",
});
```

### Nội dung chèn (`insert`)

Nội dung có thể được chèn vào các nội dung khác:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Đoạn văn bản này có thể được chèn vào bất cứ đâu");
```

### Nội dung lồng nhau (`nest`)

Tham chiếu đến các từ điển khác:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Nội dung Markdown (`md`)

Nội dung văn bản phong phú ở định dạng Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Chào mừng\n\nĐây là văn bản **in đậm** với các [liên kết](https://example.com)"
);
```

### Nội dung theo giới tính (`gender`)

Nội dung thay đổi dựa trên giới tính:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Anh ấy là một nhà phát triển",
  female: "Cô ấy là một nhà phát triển",
  other: "Họ là một nhà phát triển",
});
```

### Nội dung tệp tin (`file`)

Tham chiếu đến các tệp tin bên ngoài:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Tạo các tệp nội dung

### Cấu trúc cơ bản của tệp nội dung

Một file nội dung xuất một đối tượng mặc định thỏa mãn kiểu `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Nội dung Trang Chào mừng",
  description:
    "Nội dung cho trang chào mừng chính bao gồm phần hero và các tính năng",
  tags: ["page", "welcome", "homepage"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Bắt đầu",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Đăng ký",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          en: "Dễ sử dụng",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          en: "Giao diện trực quan cho mọi trình độ kỹ năng",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### File Nội dung JSON

Bạn cũng có thể tạo các tệp nội dung ở định dạng JSON:

```json
{
  "key": "welcome-page",
  "title": "Nội dung Trang Chào mừng",
  "description": "Nội dung cho trang chào mừng chính",
  "tags": ["trang", "chào mừng"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Tệp Nội dung Theo Ngôn ngữ

Đối với từ điển theo từng ngôn ngữ, hãy chỉ định thuộc tính `locale`:

```typescript
typescript;
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Welcome to Our Platform",
      subtitle: "Build amazing applications with ease",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Phần Mở Rộng Tệp Nội Dung

Intlayer cho phép bạn tùy chỉnh phần mở rộng cho các tệp khai báo nội dung của bạn. Việc tùy chỉnh này mang lại sự linh hoạt trong quản lý các dự án quy mô lớn và giúp tránh xung đột với các module khác.

### Phần Mở Rộng Mặc Định

Theo mặc định, Intlayer theo dõi tất cả các tệp có phần mở rộng sau để khai báo nội dung:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Các phần mở rộng mặc định này phù hợp với hầu hết các ứng dụng. Tuy nhiên, khi bạn có những nhu cầu cụ thể, bạn có thể định nghĩa các phần mở rộng tùy chỉnh để tối ưu hóa quá trình build và giảm thiểu rủi ro xung đột với các thành phần khác.

> Để tùy chỉnh các phần mở rộng tệp mà Intlayer sử dụng để nhận diện các tệp khai báo nội dung, bạn có thể chỉ định chúng trong tệp cấu hình Intlayer. Cách làm này rất hữu ích cho các dự án quy mô lớn, nơi việc giới hạn phạm vi theo dõi giúp cải thiện hiệu suất build.

## Các Khái Niệm Nâng Cao

### Hợp Nhất Dictionary

Khi nhiều dictionary có cùng một khóa, Intlayer sẽ tự động hợp nhất chúng. Hành vi hợp nhất phụ thuộc vào một số yếu tố sau:

- **Ưu tiên**: Các dictionary có giá trị `priority` cao hơn sẽ ghi đè lên các dictionary có giá trị thấp hơn
- **Tự động điền vs Cơ sở**: Các dictionary cơ sở sẽ ghi đè lên các dictionary được tự động điền
- **Vị trí**: Các dictionary cục bộ sẽ ghi đè lên các dictionary từ xa (khi ưu tiên bằng nhau)

### An toàn kiểu

Intlayer cung cấp hỗ trợ đầy đủ TypeScript cho các tệp nội dung:

```typescript
// Định nghĩa kiểu nội dung của bạn
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Sử dụng nó trong dictionary của bạn
export default {
  key: "welcome-page",
  content: {
    // TypeScript sẽ cung cấp tính năng tự động hoàn thành và kiểm tra kiểu
    hero: {
      title: "Chào mừng",
      subtitle: "Xây dựng các ứng dụng tuyệt vời",
      cta: "Bắt đầu",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Lồng nút (Node Imbrication)

Bạn có thể dễ dàng lồng các hàm vào nhau mà không gặp vấn đề gì.

Ví dụ:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` trả về `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Nội dung tổng hợp lồng điều kiện, liệt kê và nội dung đa ngôn ngữ
    // `getIntlayer('page','en').advancedContent(true)(10) trả về 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "Không có dữ liệu hợp lệ",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` trả về `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Nội dung tổng hợp lồng điều kiện, liệt kê và nội dung đa ngôn ngữ
    // `getIntlayer('page','en').advancedContent(true)(10)` trả về 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "Không tìm thấy mục nào",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Tìm thấy một mục",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Tìm thấy nhiều mục",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "Không có dữ liệu hợp lệ",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` trả về `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Nội dung tổng hợp kết hợp điều kiện, liệt kê và nội dung đa ngôn ngữ
    // `getIntlayer('page','en').advancedContent(true)(10)` trả về 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi",
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                en: "No items found",
                fr: "Aucun article trouvé",
                es: "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                en: "One item found",
                fr: "Un article trouvé",
                es: "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                en: "Multiple items found",
                fr: "Plusieurs articles trouvés",
                es: "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            en: "No valid data available",
            fr: "Aucune donnée valide disponible",
            es: "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "vi": "Không tìm thấy mục nào",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "vi": "Tìm thấy một mục",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Thực hành tốt nhất

1. **Quy ước đặt tên**:
   - Sử dụng kebab-case cho các khóa trong dictionary (`"about-page-meta"`)
   - Nhóm các nội dung liên quan dưới cùng một tiền tố khóa

2. **Tổ chức nội dung**:
   - Giữ nội dung liên quan cùng nhau trong cùng một từ điển
   - Sử dụng các đối tượng lồng nhau để tổ chức các cấu trúc nội dung phức tạp
   - Tận dụng các thẻ để phân loại
   - Sử dụng `fill` để tự động điền các bản dịch còn thiếu

3. **Hiệu suất**:
   - Điều chỉnh cấu hình nội dung để giới hạn phạm vi các tệp được theo dõi
   - Chỉ sử dụng từ điển trực tiếp khi cần cập nhật thời gian thực (ví dụ: thử nghiệm A/B, v.v.)
   - Đảm bảo plugin chuyển đổi build (`@intlayer/swc`, hoặc `@intlayer/babel`) được bật để tối ưu hóa từ điển trong quá trình build

---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Lấy Dữ Liệu Hàm
description: Tìm hiểu cách khai báo và sử dụng lấy dữ liệu hàm trong trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - Lấy Dữ Liệu Hàm
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
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Lấy Dữ Liệu Hàm

Intlayer cho phép bạn khai báo các hàm nội dung trong các module nội dung của bạn, có thể là đồng bộ hoặc bất đồng bộ. Khi ứng dụng được xây dựng, Intlayer sẽ thực thi các hàm này để lấy kết quả của hàm. Giá trị trả về phải là một đối tượng JSON hoặc một giá trị đơn giản như chuỗi hoặc số.

> Cảnh báo: lấy dữ liệu hàm hiện tại không khả dụng trong khai báo nội dung JSON và các tệp khai báo nội dung từ xa.

## Khai Báo Hàm

Dưới đây là ví dụ về một hàm đồng bộ đơn giản lấy nội dung:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Đây là nội dung được hiển thị bởi một hàm",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Đây là nội dung được hiển thị bởi một hàm",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Đây là nội dung được hiển thị bởi một hàm"
  }
}
```

Trong ví dụ này, khóa `text` chứa một hàm trả về một chuỗi. Nội dung này có thể được hiển thị trong các component React của bạn bằng cách sử dụng các package trình thông dịch của Intlayer như `react-intlayer`.

## Lấy Dữ liệu Bất đồng bộ (Asynchronous Function Fetching)

Ngoài các hàm đồng bộ, Intlayer còn hỗ trợ các hàm bất đồng bộ, cho phép bạn lấy dữ liệu từ các nguồn bên ngoài hoặc mô phỏng việc lấy dữ liệu với dữ liệu giả (mock data).

Dưới đây là một ví dụ về hàm bất đồng bộ mô phỏng việc lấy dữ liệu từ server:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Chờ 200ms để mô phỏng việc lấy dữ liệu từ server
  return await setTimeout(200).then(() => "Đây là nội dung được lấy từ server");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Chờ 200ms để mô phỏng việc lấy dữ liệu từ server
  await setTimeout(200);
  return "Đây là nội dung được lấy từ server";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Chờ 200ms để mô phỏng việc lấy dữ liệu từ server
  await setTimeout(200);
  return "Đây là nội dung được lấy từ server";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Không thể lấy nội dung từ file JSON, hãy sử dụng file .ts hoặc .js thay thế
```

Trong trường hợp này, hàm `fakeFetch` mô phỏng một độ trễ để giả lập thời gian phản hồi của server. Intlayer thực thi hàm bất đồng bộ và sử dụng kết quả làm nội dung cho khóa `text`.

## Sử dụng Nội dung Dựa trên Hàm trong Các Thành phần React

Để sử dụng nội dung dựa trên hàm trong một thành phần React, bạn cần import `useIntlayer` từ `react-intlayer` và gọi nó với ID nội dung để lấy nội dung. Dưới đây là một ví dụ:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Đầu ra: Đây là nội dung được hiển thị bởi một hàm */}
      <p>{asyncFunctionContent.text}</p>
      {/* Đầu ra: Đây là nội dung được lấy từ server */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Đầu ra: Đây là nội dung được hiển thị bởi một hàm */}
      <p>{asyncFunctionContent.text}</p>
      {/* Đầu ra: Đây là nội dung được lấy từ server */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Đầu ra: Đây là nội dung được hiển thị bởi một hàm */}
      <p>{asyncFunctionContent.text}</p>
      {/* Đầu ra: Đây là nội dung được lấy từ server */}
    </div>
  );
};

module.exports = MyComponent;
```

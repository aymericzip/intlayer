---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu Hook useIntlayer | next-intlayer
description: Xem cách sử dụng hook useIntlayer cho gói next-intlayer
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tích hợp Next.js: Tài liệu Hook `useIntlayer`

Hook `useIntlayer` được thiết kế riêng cho các ứng dụng Next.js nhằm lấy và quản lý nội dung bản địa hóa một cách hiệu quả. Tài liệu này sẽ tập trung vào cách sử dụng hook trong các dự án Next.js, đảm bảo thực hành bản địa hóa đúng chuẩn.

## Nhập khẩu `useIntlayer` trong Next.js

Tùy thuộc vào việc bạn đang làm việc với các thành phần phía client hay phía server trong ứng dụng Next.js, bạn có thể nhập hook `useIntlayer` như sau:

- **Thành phần Client:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Sử dụng trong các thành phần phía client
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Sử dụng trong các thành phần phía client
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Sử dụng trong các thành phần phía client
  ```

- **Thành phần Server:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Sử dụng trong các thành phần phía server
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Sử dụng trong các thành phần phía server
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Sử dụng trong các thành phần phía server
  ```

## Tham số

1. **`key`**: Một chuỗi định danh cho khóa từ điển mà bạn muốn lấy nội dung.
2. **`locale`** (tùy chọn): Một locale cụ thể để sử dụng. Nếu không cung cấp, hook sẽ mặc định sử dụng locale được thiết lập trong ngữ cảnh client hoặc server.

## Các tệp Từ điển

Việc tất cả các khóa nội dung phải được định nghĩa trong các tệp khai báo nội dung là rất quan trọng để tránh lỗi khi chạy và đảm bảo an toàn kiểu. Cách tiếp cận này cũng hỗ trợ tích hợp TypeScript để kiểm tra lỗi trong thời gian biên dịch.

Hướng dẫn thiết lập các tệp khai báo nội dung có sẵn [tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

## Ví dụ sử dụng trong Next.js

Dưới đây là cách bạn có thể triển khai hook `useIntlayer` trong một trang Next.js để tải nội dung đa ngôn ngữ một cách động dựa trên locale hiện tại của ứng dụng:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Xử lý Đa ngôn ngữ cho Thuộc tính

Để đa ngôn ngữ hóa các thuộc tính như `alt`, `title`, `href`, `aria-label`, v.v., hãy đảm bảo bạn tham chiếu nội dung một cách chính xác:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Thông tin thêm

- **Trình chỉnh sửa trực quan Intlayer**: Tìm hiểu cách sử dụng trình chỉnh sửa trực quan để quản lý nội dung dễ dàng hơn [tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Tài liệu này trình bày cách sử dụng hook `useIntlayer` đặc biệt trong môi trường Next.js, cung cấp một giải pháp mạnh mẽ để quản lý đa ngôn ngữ trên các ứng dụng Next.js của bạn.

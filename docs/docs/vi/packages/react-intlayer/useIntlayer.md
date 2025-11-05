---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu Hook useIntlayer | react-intlayer
description: Xem cách sử dụng hook useIntlayer cho gói react-intlayer
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
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tích hợp React: Tài liệu Hook `useIntlayer`

Phần này cung cấp hướng dẫn chi tiết về cách sử dụng hook `useIntlayer` trong các ứng dụng React, cho phép bản địa hóa nội dung hiệu quả.

## Nhập `useIntlayer` trong React

Hook `useIntlayer` có thể được tích hợp vào các ứng dụng React bằng cách nhập nó tùy theo ngữ cảnh:

- **Component phía Client:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Sử dụng trong các component React phía client
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Sử dụng trong các component React phía client
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Sử dụng trong các component React phía client
  ```

- **Component phía Server:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Sử dụng trong các component React phía server
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Sử dụng trong các component React phía server
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Sử dụng trong các component React phía server
  ```

## Tham số

Hook nhận hai tham số:

1. **`key`**: Khóa từ điển để lấy nội dung đã được bản địa hóa.
2. **`locale`** (tùy chọn): Ngôn ngữ mong muốn. Mặc định là ngôn ngữ của ngữ cảnh nếu không được chỉ định.

## Từ điển

Tất cả các khóa từ điển phải được khai báo trong các tệp khai báo nội dung để tăng tính an toàn kiểu và tránh lỗi. Bạn có thể tìm thấy [hướng dẫn thiết lập tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

## Ví dụ sử dụng trong React

Minh họa hook `useIntlayer` trong một component React:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Xử lý Thuộc tính

Khi bản địa hóa các thuộc tính, truy cập giá trị nội dung một cách thích hợp:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Tài nguyên Bổ sung

- **Trình chỉnh sửa trực quan Intlayer**: Để có trải nghiệm quản lý nội dung trực quan hơn, hãy tham khảo tài liệu trình chỉnh sửa trực quan [tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Phần này tập trung cụ thể vào việc tích hợp hook `useIntlayer` trong các ứng dụng React, giúp đơn giản hóa quá trình bản địa hóa và đảm bảo tính nhất quán của nội dung trên các ngôn ngữ khác nhau.

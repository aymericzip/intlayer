---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu Hook useI18n | react-intlayer
description: Tìm hiểu cách sử dụng hook useI18n trong gói react-intlayer
keywords:
  - useI18n
  - i18n
  - dịch thuật
  - từ điển
  - Intlayer
  - quốc tế hóa
  - tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
history:
  - version: 6.0.0
    date: 2025-06-29
    changes: Viết tài liệu ban đầu cho hook `useI18n`
---

# Tích hợp React: Tài liệu Hook `useI18n`

Phần này cung cấp hướng dẫn chi tiết về cách sử dụng hook `useI18n` trong các ứng dụng React, giúp thực hiện việc bản địa hóa nội dung hiệu quả.

## Nhập `useI18n` trong React

Hook `useI18n` có thể được nhập và tích hợp vào các ứng dụng React tùy theo ngữ cảnh như sau:

- **Client Components (Thành phần phía khách):**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Sử dụng trong các thành phần React phía client
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Sử dụng trong các thành phần React phía client
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Sử dụng trong các thành phần React phía client
  ```

- **Server Components (Thành phần phía máy chủ):**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Sử dụng trong các thành phần React phía server
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Sử dụng trong các thành phần React phía server
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Sử dụng trong các thành phần React phía server
  ```

## Tham số

Hook này nhận hai tham số:

1. **`namespace`**: Không gian tên của từ điển để giới hạn phạm vi các khóa dịch.
2. **`locale`** (tùy chọn): Ngôn ngữ mong muốn. Nếu không được chỉ định, ngôn ngữ trong ngữ cảnh sẽ được sử dụng làm mặc định.

## Từ điển

Tất cả các khóa trong từ điển phải được khai báo trong các tệp khai báo nội dung để tăng cường an toàn kiểu và tránh lỗi. [Hướng dẫn cấu hình có thể được tìm thấy tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

## Ví dụ sử dụng trong React

Ví dụ về cách sử dụng hook `useI18n` trong các thành phần React:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Hiển thị tiêu đề */}
      <p>{t("description")}</p> {/* Hiển thị mô tả */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Hiển thị tiêu đề */}
      <p>{t("description")}</p> {/* Hiển thị mô tả */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Hiển thị tiêu đề */}
      <p>{t("description")}</p> {/* Hiển thị mô tả */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Hiển thị tiêu đề */}
      <p>{t("description")}</p> {/* Hiển thị mô tả */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Hiển thị tiêu đề */}
      <p>{t("description")}</p> {/* Hiển thị mô tả */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Hiển thị tiêu đề */}
      <p>{t("description")}</p> {/* Hiển thị mô tả */}
    </div>
  );
};
```

## Xử lý thuộc tính

Khi bản địa hóa các thuộc tính, truy cập giá trị dịch một cách thích hợp:

```jsx
<!-- Đối với các thuộc tính hỗ trợ truy cập (ví dụ: aria-label), sử dụng .value vì cần chuỗi thuần túy -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Tài nguyên bổ sung

- **Trình chỉnh sửa trực quan Intlayer**: Để có trải nghiệm quản lý nội dung trực quan hơn, tham khảo tài liệu trình chỉnh sửa trực quan [tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

```tsx
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Xử lý Thuộc tính

Khi bản địa hóa các thuộc tính, truy cập giá trị dịch một cách thích hợp:

```jsx
<!-- Đối với các thuộc tính hỗ trợ truy cập (ví dụ: aria-label), sử dụng .value vì yêu cầu chuỗi thuần túy -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Tài nguyên Bổ sung

- **Trình chỉnh sửa trực quan Intlayer**: Để có trải nghiệm quản lý nội dung trực quan hơn, hãy tham khảo tài liệu trình chỉnh sửa trực quan [tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Phần này đặc biệt đề cập đến việc tích hợp hook `useI18n` trong các ứng dụng React, giúp đơn giản hóa quá trình bản địa hóa và đảm bảo tính nhất quán của nội dung trên các ngôn ngữ khác nhau.

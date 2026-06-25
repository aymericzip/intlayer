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
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

## Từ điển

Tất cả các khóa từ điển phải được khai báo trong các tệp khai báo nội dung để tăng tính an toàn kiểu và tránh lỗi. Bạn có thể tìm thấy [hướng dẫn thiết lập tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

## Ví dụ sử dụng trong React

Minh họa hook `useIntlayer` trong một component React:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

## Tài nguyên Bổ sung

- **Trình chỉnh sửa trực quan Intlayer**: Để có trải nghiệm quản lý nội dung trực quan hơn, hãy tham khảo tài liệu trình chỉnh sửa trực quan [tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Phần này tập trung cụ thể vào việc tích hợp hook `useIntlayer` trong các ứng dụng React, giúp đơn giản hóa quá trình bản địa hóa và đảm bảo tính nhất quán của nội dung trên các ngôn ngữ khác nhau.

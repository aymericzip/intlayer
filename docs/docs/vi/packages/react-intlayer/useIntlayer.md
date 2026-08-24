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

# Tài liệu Hook useIntlayer

Hook `useIntlayer` cho phép bạn truy xuất nội dung được bản địa hóa từ một từ điển bằng khóa của nó. Nó dựa trên `useDictionary` nhưng tự động đưa vào một phiên bản tối ưu hóa của từ điển từ các khai báo được tạo ra.

## Ví dụ sử dụng trong React

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

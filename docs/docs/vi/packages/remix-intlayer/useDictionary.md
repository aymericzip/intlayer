---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Tài liệu Hook useDictionary | remix-intlayer
description: Xem cách sử dụng hook useDictionary trong các ứng dụng Remix 3 để giải quyết các đối tượng từ điển cho locale hiện tại của yêu cầu.
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - quốc tế hóa
  - tài liệu
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu hook useDictionary"
author: aymericzip
---

# Tài liệu Hook useDictionary

Hook `useDictionary` chuyển đổi một đối tượng từ điển được import hoặc nội tuyến và trả về nội dung của nó đã được phân giải cho locale hiện tại của yêu cầu trong các ứng dụng Remix 3.

Khác với `useIntlayer` tìm kiếm từ điển theo khóa chuỗi từ sổ đăng ký từ điển toàn cục, `useDictionary` chấp nhận trực tiếp một đối tượng từ điển.

## Cách sử dụng

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Bạn cũng có thể truyền các từ điển nội tuyến được định nghĩa bằng `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        vi: "Đã đăng ký bản quyền.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Tham số

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Một đối tượng từ điển hoặc nhóm từ điển đủ điều kiện.
2. **`localeOrSelector`** (tùy chọn): Một locale hoặc đối tượng bộ chọn cụ thể (`{ item }`, `{ variant }`, có thể kèm `locale`). Có quyền ưu tiên cao hơn locale của yêu cầu nếu được cung cấp.

## Mô tả

Hook thực hiện các nhiệm vụ sau:

1. **Phát hiện Locale**: Đọc locale yêu cầu đang hoạt động từ bộ lưu trữ `AsyncLocalStorage` do middleware `intlayer()` tạo ra.
2. **Phân giải Nội dung**: Đánh giá các bản dịch (`t()`), phép liệt kê, điều kiện và các cấu trúc lồng nhau theo locale đã giải quyết.
3. **Xử lý Bộ chọn**: Áp dụng bất kỳ bộ chọn mục hoặc biến thể nào được chỉ định trong đối số.

## Tài liệu liên quan

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useLocale.md)

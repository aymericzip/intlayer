---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Tài liệu Hook useDictionary | astro-intlayer
description: Xem cách sử dụng hook useDictionary trong các thành phần và script Astro để giải quyết các đối tượng từ điển.
keywords:
  - useDictionary
  - từ điển
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# Tài liệu Hook useDictionary

Hook `useDictionary` giải quyết một đối tượng từ điển được nhập hoặc định nghĩa inline và trả về nội dung của nó cho ngôn ngữ hiện tại trong các ứng dụng Astro.

Không giống như `useIntlayer`, lấy từ điển theo khóa từ sổ đăng ký từ điển toàn cục, `useDictionary` hoạt động trực tiếp với một đối tượng từ điển.

## Cách sử dụng

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Bạn cũng có thể truyền các từ điển inline được định nghĩa bằng `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      vi: "Đã đăng ký bản quyền.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Tham số

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Một đối tượng từ điển hoặc nhóm từ điển đủ điều kiện.
2. **`localeOrSelector`** (tùy chọn): Một ngôn ngữ cụ thể hoặc đối tượng bộ chọn (`{ item }`, `{ variant }`, tùy chọn với `locale`).

## Mô tả chi tiết

Hook thực hiện các nhiệm vụ sau:

1. **Phát hiện ngôn ngữ**: Trên máy chủ, nó lấy ngôn ngữ từ `Astro.locals.intlayer`. Trong trình duyệt, nó sử dụng ngôn ngữ trong store của client.
2. **Xử lý nội dung**: Giải quyết các bản dịch (`t()`), phép liệt kê, điều kiện và các cấu trúc lồng nhau theo ngôn ngữ đã được giải quyết.
3. **Bộ chọn**: Áp dụng bất kỳ bộ chọn mục hoặc biến thể nào được cung cấp trong đối số.

## Tài liệu liên quan

- [Tích hợp `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useLocale.md)

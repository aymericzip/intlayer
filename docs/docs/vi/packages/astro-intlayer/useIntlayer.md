---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Tài liệu Hook useIntlayer | astro-intlayer
description: Xem cách sử dụng hook useIntlayer trong các thành phần Astro và script client để truy cập nội dung được bản địa hóa.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# Tài liệu Hook useIntlayer

Hook `useIntlayer` cho phép bạn truy xuất nội dung từ điển được bản địa hóa theo khóa trong các ứng dụng Astro.

Nó có thể được gọi trong hai ngữ cảnh riêng biệt bằng cùng một đường dẫn nhập:

1. **Máy chủ / Frontmatter**: Bên trong các tệp `.astro`, nó tự động phân giải nội dung bằng ngôn ngữ yêu cầu được lưu trữ trong `Astro.locals.intlayer`.
2. **Trình duyệt / Script Client `<script>`**: Bên trong các script client hoặc các thành phần framework UI, nó phân giải sang triển khai store phía client (`vanilla-intlayer`).

## Cách sử dụng

### Trong Frontmatter của Thành phần Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### Trong các khối `<script>` của Client

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Tham số

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Khóa duy nhất của từ điển (như được định nghĩa trong các tệp khai báo `.content.ts` của bạn).
2. **`localeOrSelector`** (tùy chọn): Một ngôn ngữ cụ thể hoặc đối tượng bộ chọn (`{ item }`, `{ variant }`, tùy chọn với `locale`). Khi được cung cấp, nó sẽ ghi đè ngôn ngữ được phát hiện từ ngữ cảnh yêu cầu hoặc store client.

## Mô tả chi tiết

Hook thực hiện các nhiệm vụ sau:

1. **Giải quyết ngôn ngữ**:
   - Trên máy chủ, đọc ngôn ngữ hoạt động từ `Astro.locals.intlayer` thông qua phạm vi `AsyncLocalStorage` được khởi tạo bởi `astro-intlayer/middleware`.
   - Trong trình duyệt, đọc ngôn ngữ hoạt động từ bộ nhớ hoặc store của client.
2. **Truy xuất từ điển**: Đưa vào nội dung từ điển khớp với khóa đã chỉ định.
3. **Xử lý bản dịch**: Giải quyết các bản dịch (`t()`), phép liệt kê, điều kiện và markdown thành nội dung sẵn sàng hiển thị.

## Tài liệu liên quan

- [Tích hợp `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useLocale.md)

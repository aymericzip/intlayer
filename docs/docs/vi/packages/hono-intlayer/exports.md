---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Tài liệu gói hono-intlayer
description: Middleware Hono cho Intlayer, cung cấp các hàm dịch và phát hiện ngôn ngữ.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Tài liệu thống nhất cho tất cả các bản xuất
---

# Gói hono-intlayer

Gói `hono-intlayer` cung cấp một middleware cho các ứng dụng Hono để xử lý quốc tế hóa. Nó phát hiện ngôn ngữ của người dùng và điền vào đối tượng ngữ cảnh.

## Cài đặt

```bash
npm install hono-intlayer
```

## Các bản xuất

### Middleware

Nhập:

```tsx
import { intlayer } from "hono-intlayer";
```

| Hàm        | Mô tả                                                                                                                                                                                                                                                                            | Tài liệu liên quan                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Middleware Hono tích hợp Intlayer vào ứng dụng Hono của bạn. Xử lý phát hiện ngôn ngữ từ bộ lưu trữ (cookie, tiêu đề), điền vào ngữ cảnh với `t`, `getIntlayer` và `getDictionary`, đồng thời thiết lập không gian tên CLS để truy cập theo chương trình trong vòng đời yêu cầu. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/hono-intlayer/intlayer.md) |

### Các hàm

Nhập:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Hàm             | Mô tả                                                                                                                                                                                                                                         | Tài liệu liên quan                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `t`             | Hàm dịch toàn cục lấy nội dung cho ngôn ngữ hiện tại trong Hono. Sử dụng CLS (Async Local Storage) và phải được sử dụng trong ngữ cảnh yêu cầu được quản lý bởi middleware `intlayer`. Cũng có thể được truy cập thông qua ngữ cảnh.          | [dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |
| `getIntlayer`   | Lấy một từ điển bằng khóa của nó từ khai báo được tạo và trả về nội dung của nó cho ngôn ngữ được chỉ định. Phiên bản tối ưu hóa của `getDictionary`. Sử dụng CLS để truy cập ngữ cảnh yêu cầu. Cũng có thể được truy cập thông qua ngữ cảnh. | -                                                                                                     |
| `getDictionary` | Xử lý các đối tượng từ điển và trả về nội dung cho ngôn ngữ được chỉ định. Xử lý các bản dịch `t()`, liệt kê, markdown, HTML, v.v. Sử dụng CLS để truy cập ngữ cảnh yêu cầu. Cũng có thể được truy cập thông qua ngữ cảnh.                    | -                                                                                                     |

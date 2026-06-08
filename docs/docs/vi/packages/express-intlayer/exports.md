---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "Tài liệu gói express-intlayer"
description: "Middleware Express cho Intlayer, cung cấp các hàm dịch và phát hiện locale."
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Hợp nhất tài liệu cho tất cả các export"
---

# Gói express-intlayer

Gói `express-intlayer` cung cấp một middleware cho các ứng dụng Express để xử lý quốc tế hóa. Nó phát hiện locale của người dùng và cung cấp các hàm dịch.

## Cài đặt

```bash
npm install express-intlayer
```

## Các export

### Middleware

Nhập:

```tsx
import "express-intlayer";
```

| Hàm        | Mô tả                                                                                                                                                                                                                                                                   | Tài liệu liên quan                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware cho Express phát hiện locale của người dùng và điền `res.locals` bằng dữ liệu Intlayer. Thực hiện phát hiện locale từ cookie/headers, chèn `t`, `getIntlayer`, và `getDictionary` vào `res.locals`, và thiết lập namespace CLS để truy cập vòng đời request. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/express-intlayer/intlayer.md) |

### Hàm

Nhập:

```tsx
import "express-intlayer";
```

| Hàm             | Mô tả                                                                                                                                                                                  | Tài liệu liên quan                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Hàm dịch lấy nội dung cho locale hiện tại. Hoạt động trong vòng đời request được quản lý bởi middleware `intlayer`. Sử dụng CLS (Async Local Storage) để truy cập ngữ cảnh yêu cầu.    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |
| `getIntlayer`   | Lấy một từ điển theo khóa từ khai báo đã được sinh và trả về nội dung của nó cho locale được chỉ định. Phiên bản tối ưu của `getDictionary`. Sử dụng CLS để truy cập ngữ cảnh yêu cầu. | -                                                                                                      |
| `getDictionary` | Xử lý các đối tượng dictionary và trả về nội dung cho locale được chỉ định. Xử lý các bản dịch `t()`, enumerations, markdown, HTML, v.v. Sử dụng CLS để truy cập ngữ cảnh yêu cầu.     | -                                                                                                      |

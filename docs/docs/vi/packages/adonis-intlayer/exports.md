---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Tài liệu Gói adonis-intlayer
description: Middleware AdonisJS cho Intlayer, cung cấp các hàm dịch và phát hiện ngôn ngữ.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Tài liệu ban đầu
---

# Gói adonis-intlayer

Gói `adonis-intlayer` cung cấp một middleware cho các ứng dụng AdonisJS để xử lý quốc tế hóa. Nó phát hiện ngôn ngữ của người dùng và cung cấp các hàm dịch.

## Cài đặt

```bash
npm install adonis-intlayer
```

## Xuất bản (Exports)

### Middleware

Gói cung cấp một middleware AdonisJS để xử lý quốc tế hóa.

| Hàm                  | Mô tả                                                                                                                                                                                                                                                        | Tài liệu liên quan                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | Middleware AdonisJS phát hiện ngôn ngữ của người dùng và điền dữ liệu Intlayer vào ngữ cảnh yêu cầu. Nó cũng thiết lập không gian tên CLS (Async Local Storage) để truy cập vòng đời yêu cầu, cho phép sử dụng các hàm toàn cục như `t`, `getIntlayer`, v.v. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/adonis-intlayer/intlayer.md) |

### Hàm

| Hàm             | Mô tả                                                                                                                                                                                             | Tài liệu liên quan                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Hàm dịch truy xuất nội dung cho ngôn ngữ hiện tại. Hoạt động trong vòng đời yêu cầu được quản lý bởi middleware `intlayer`. Sử dụng CLS (Async Local Storage) để truy cập ngữ cảnh yêu cầu.       | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |
| `getIntlayer`   | Truy xuất từ điển bằng khóa của nó từ khai báo được tạo và trả về nội dung của nó cho ngôn ngữ được chỉ định. Phiên bản tối ưu hóa của `getDictionary`. Sử dụng CLS để truy cập ngữ cảnh yêu cầu. | -                                                                                                      |
| `getDictionary` | Xử lý các đối tượng từ điển và trả về nội dung cho ngôn ngữ được chỉ định. Xử lý các bản dịch `t()`, các phép liệt kê, markdown, HTML, v.v. Sử dụng CLS để truy cập ngữ cảnh yêu cầu.             | -                                                                                                      |
| `getLocale`     | Truy xuất ngôn ngữ hiện tại từ ngữ cảnh yêu cầu bằng CLS.                                                                                                                                         | -                                                                                                      |

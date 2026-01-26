---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói fastify-intlayer
description: Plugin Fastify cho Intlayer, cung cấp các hàm dịch và phát hiện locale.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các export
---

# Gói fastify-intlayer

Gói `fastify-intlayer` cung cấp một plugin cho các ứng dụng Fastify để xử lý internationalization. Nó phát hiện locale của người dùng và mở rộng (decorate) đối tượng request.

## Cài đặt

```bash
npm install fastify-intlayer
```

## Các export

### Plugin

Nhập:

```tsx
import "fastify-intlayer";
```

| Hàm        | Mô tả                                                                                                                                                                                                                                                                                                  | Tài liệu liên quan                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Fastify tích hợp Intlayer vào ứng dụng Fastify của bạn. Xử lý phát hiện locale từ bộ nhớ (cookies, headers), bổ sung vào đối tượng request dữ liệu `intlayer` chứa `t`, `getIntlayer`, và `getDictionary`, và thiết lập namespace CLS để truy cập theo chương trình trong vòng đời của request. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/fastify-intlayer/intlayer.md) |

### Hàm

Import:

```tsx
import "fastify-intlayer";
```

| Hàm             | Mô tả                                                                                                                                                                                                                                            | Tài liệu liên quan                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `t`             | Hàm dịch toàn cục lấy nội dung cho locale hiện tại trong Fastify. Sử dụng CLS (Async Local Storage) và phải được dùng trong ngữ cảnh request được quản lý bởi plugin `intlayer`. Cũng có thể truy cập qua `req.intlayer.t`.                      | [dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |
| `getIntlayer`   | Truy xuất một dictionary bằng key của nó từ khai báo được sinh và trả về nội dung cho locale được chỉ định. Phiên bản tối ưu của `getDictionary`. Sử dụng CLS để truy cập ngữ cảnh request. Cũng có thể truy cập qua `req.intlayer.getIntlayer`. | -                                                                                               |
| `getDictionary` | Xử lý các đối tượng dictionary và trả về nội dung cho locale được chỉ định. Xử lý các bản dịch `t()`, các enum, markdown, HTML, v.v. Sử dụng CLS để truy cập ngữ cảnh request. Cũng có thể truy cập thông qua `req.intlayer.getDictionary`.      | -                                                                                               |

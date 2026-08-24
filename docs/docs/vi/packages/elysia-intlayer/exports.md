---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Tài liệu gói elysia-intlayer
description: Plugin Elysia cho Intlayer, cung cấp các hàm dịch và phát hiện locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Hợp nhất tài liệu cho tất cả các export"
author: aymericzip
---

# Gói elysia-intlayer

Gói `elysia-intlayer` cung cấp một plugin cho các ứng dụng Elysia để xử lý internationalization. Nó phát hiện locale của người dùng và tiêm một đối tượng `intlayer` vào route context.

## Cài đặt

```bash
npm install elysia-intlayer
```

## Các export

### Plugin

Nhập:

```tsx
import { intlayer } from "elysia-intlayer";
```

| Hàm        | Mô tả                                                                                                                                                                                                                                                                                                    | Tài liệu liên quan                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Elysia tích hợp Intlayer vào ứng dụng Elysia của bạn. Xử lý phát hiện locale từ storage (cookies, headers) rồi từ `Accept-Language`, tiêm một đối tượng `intlayer` phơi bày `locale`, `t`, `getIntlayer` và `getDictionary` vào route context, và thiết lập ngữ cảnh request `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/elysia-intlayer/intlayer.md) |

### Hàm

Nhập:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Hàm             | Mô tả                                                                                                                                                                                                                                                | Tài liệu liên quan                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Hàm dịch toàn cục lấy nội dung cho locale hiện tại trong Elysia. Sử dụng `AsyncLocalStorage` để truy cập ngữ cảnh request do plugin `intlayer` thiết lập, và quay về locale mặc định khi ở ngoài ngữ cảnh đó. Cũng có thể truy cập qua `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |
| `getIntlayer`   | Lấy một dictionary theo key từ khai báo được sinh ra và trả về nội dung của nó cho locale hiện tại. Phiên bản tối ưu của `getDictionary`. Sử dụng `AsyncLocalStorage` để truy cập ngữ cảnh request. Cũng có thể truy cập qua `intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Xử lý các đối tượng dictionary và trả về nội dung cho locale hiện tại. Xử lý các bản dịch `t()`, enumeration, markdown, HTML, v.v. Sử dụng `AsyncLocalStorage` để truy cập ngữ cảnh request. Cũng có thể truy cập qua `intlayer.getDictionary`.      | -                                                                                                      |

### Kiểu

Nhập:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Kiểu                | Mô tả                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IntlayerContext`   | Hình dạng của đối tượng `intlayer` được tiêm vào mọi route context: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Chữ ký của hàm dịch, chuyển một locale map thành nội dung khớp với locale của request hiện tại.                                                                          |

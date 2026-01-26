---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói next-intlayer
description: Tích hợp dành riêng cho Next.js với Intlayer, cung cấp middleware và các provider cho App Router và Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Đã hợp nhất tài liệu cho tất cả các exports
---

# Gói next-intlayer

Gói `next-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Next.js. Nó hỗ trợ cả App Router và Page Router, bao gồm middleware cho định tuyến theo locale.

## Cài đặt

```bash
npm install next-intlayer
```

## Các export

### Middleware

| Hàm                  | Mô tả                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware của Next.js để xử lý định tuyến và chuyển hướng dựa trên locale. |

### Các Provider

| Thành phần               | Mô tả                                                              |
| ------------------------ | ------------------------------------------------------------------ |
| `IntlayerClientProvider` | Provider cho các component phía client trong Next.js.              |
| `IntlayerServerProvider` | Provider cho các component phía server trong Next.js (App Router). |

### Hooks (Phía client)

Tái xuất hầu hết các hook từ `react-intlayer`.

| Hook            | Mô tả                                                 |
| --------------- | ----------------------------------------------------- |
| `useIntlayer`   | Chọn một từ điển theo khóa của nó và trả về nội dung. |
| `useDictionary` | Chọn một từ điển theo khóa của nó và trả về nội dung. |
| `useLocale`     | Trả về locale hiện tại và một hàm để thiết lập nó.    |
| `useI18n`       | Trả về các giá trị context hiện tại của Intlayer.     |

### Các hàm (Server-side)

| Function               | Mô tả                                                                |
| ---------------------- | -------------------------------------------------------------------- |
| `t`                    | Phiên bản chạy phía server của hàm dịch dành cho Next.js App Router. |
| `generateStaticParams` | Sinh các tham số tĩnh cho các route động của Next.js.                |

### Các kiểu

| Kiểu                 | Mô tả                                           |
| -------------------- | ----------------------------------------------- |
| `NextPageIntlayer`   | Kiểu cho các trang Next.js có hỗ trợ Intlayer.  |
| `NextLayoutIntlayer` | Kiểu cho các layout Next.js có hỗ trợ Intlayer. |

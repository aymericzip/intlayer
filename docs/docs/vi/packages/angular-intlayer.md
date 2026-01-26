---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói angular-intlayer
description: Tích hợp dành riêng cho Angular cho Intlayer, cung cấp providers và services cho các ứng dụng Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả exports
---

# Gói angular-intlayer

Gói `angular-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Angular. Nó bao gồm các providers và services để xử lý nội dung đa ngôn ngữ.

## Cài đặt

```bash
npm install angular-intlayer
```

## Các export

### Thiết lập

| Hàm               | Mô tả                                                    |
| ----------------- | -------------------------------------------------------- |
| `provideIntlayer` | Hàm để cung cấp Intlayer trong ứng dụng Angular của bạn. |

### Dịch vụ

| Dịch vụ           | Mô tả                                                            |
| ----------------- | ---------------------------------------------------------------- |
| `IntlayerService` | Dịch vụ chọn một dictionary theo khóa của nó và trả về nội dung. |
| `LocaleService`   | Dịch vụ trả về locale hiện tại và một hàm để thiết lập nó.       |

### Các thành phần

| Thành phần                  | Mô tả                                          |
| --------------------------- | ---------------------------------------------- |
| `IntlayerMarkdownComponent` | Thành phần Angular hiển thị nội dung markdown. |

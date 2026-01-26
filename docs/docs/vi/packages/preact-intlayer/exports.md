---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói preact-intlayer
description: Tích hợp chuyên biệt cho Preact với Intlayer, cung cấp các providers và hooks cho các ứng dụng Preact.
keywords:
  - preact-intlayer
  - preact
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các export
---

# Gói preact-intlayer

Gói `preact-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Preact. Nó bao gồm các providers và hooks để xử lý nội dung đa ngôn ngữ.

## Cài đặt

```bash
npm install preact-intlayer
```

## Các export

### Nhà cung cấp

| Thành phần         | Mô tả                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| `IntlayerProvider` | Provider chính bao bọc ứng dụng của bạn và cung cấp context Intlayer. |

### Hooks

| Hook            | Mô tả                                                                                                   | Tài liệu liên quan                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | Dựa trên `useDictionary`, nhưng chèn một phiên bản tối ưu hóa của từ điển từ khai báo được sinh ra.     | -                                                                                                      |
| `useDictionary` | Xử lý các đối tượng có dạng từ điển (key, content). Nó xử lý các bản dịch `t()`, các enumerations, v.v. | -                                                                                                      |
| `useLocale`     | Trả về locale hiện tại và một hàm để thiết lập nó.                                                      | -                                                                                                      |
| `t`             | Lấy nội dung dựa trên locale hiện tại.                                                                  | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |

### Thành phần

| Thành phần         | Mô tả                                                   |
| ------------------ | ------------------------------------------------------- |
| `MarkdownProvider` | Provider cho ngữ cảnh render markdown.                  |
| `MarkdownRenderer` | Hiển thị nội dung markdown với các component tuỳ chỉnh. |

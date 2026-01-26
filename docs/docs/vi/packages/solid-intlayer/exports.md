---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói solid-intlayer
description: Tích hợp chuyên biệt cho Solid cho Intlayer, cung cấp các providers và hooks cho ứng dụng Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói solid-intlayer

Gói `solid-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Solid. Nó bao gồm các providers và hooks để xử lý nội dung đa ngôn ngữ.

## Cài đặt

```bash
npm install solid-intlayer
```

## Các exports

### Provider

Import:

```tsx
import "solid-intlayer";
```

| Component          | Mô tả                                                                     | Tài liệu liên quan                                                                                                            |
| ------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Provider chính bao bọc ứng dụng của bạn và cung cấp context của Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/IntlayerProvider.md) |

### Hooks

Nhập:

```tsx
import "solid-intlayer";
```

| Hook                   | Mô tả                                                                                                              | Tài liệu liên quan                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Dựa trên `useDictionary`, nhưng injects một phiên bản tối ưu hóa của dictionary từ khai báo được sinh.             | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Xử lý các đối tượng có cấu trúc giống từ điển (key, content). Nó xử lý các bản dịch `t()`, enumerations, v.v.      | -                                                                                                                       |
| `useDictionaryAsync`   | Tương tự `useDictionary`, nhưng xử lý các từ điển bất đồng bộ.                                                     | -                                                                                                                       |
| `useDictionaryDynamic` | Tương tự `useDictionary`, nhưng xử lý các từ điển động.                                                            | -                                                                                                                       |
| `useLocale`            | Trả về locale hiện tại và một hàm để thiết lập nó.                                                                 | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook phía client để quản lý việc viết lại URL. Tự động cập nhật URL nếu tồn tại quy tắc viết lại được bản địa hóa. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Trả về đối tượng Intl cho locale hiện tại.                                                                         | -                                                                                                                       |
| `useLoadDynamic`       | Hook để tải từ điển động.                                                                                          | -                                                                                                                       |
| `t`                    | Chọn nội dung dựa trên locale hiện tại.                                                                            | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)                  |

### Thành phần

Nhập:

```tsx
import "solid-intlayer";
```

| Thành phần         | Mô tả                                  |
| ------------------ | -------------------------------------- |
| `MarkdownProvider` | Provider cho ngữ cảnh render Markdown. |

---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói svelte-intlayer
description: Tích hợp Intlayer cho Svelte, cung cấp các hàm thiết lập và các store cho ứng dụng Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói svelte-intlayer

Gói `svelte-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Svelte. Nó bao gồm các hàm thiết lập và các store để xử lý nội dung đa ngôn ngữ.

## Cài đặt

```bash
npm install svelte-intlayer
```

## Các exports

### Thiết lập

Nhập:

```tsx
import "svelte-intlayer";
```

| Hàm             | Mô tả                                                    |
| --------------- | -------------------------------------------------------- |
| `setupIntlayer` | Hàm để thiết lập Intlayer trong ứng dụng Svelte của bạn. |

### Store

Nhập:

```tsx
import "svelte-intlayer";
```

| Store           | Mô tả                                               |
| --------------- | --------------------------------------------------- |
| `intlayerStore` | Svelte store chứa trạng thái hiện tại của Intlayer. |

### Hooks (Context)

Nhập:

```tsx
import "svelte-intlayer";
```

| Hàm                    | Mô tả                                                                                                                  | Tài liệu liên quan                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Dựa trên `useDictionary`, nhưng chèn một phiên bản tối ưu của dictionary từ khai báo được sinh ra.                     | -                                                                                                                        |
| `useDictionary`        | Xử lý các đối tượng có dạng dictionary (key, content). Nó xử lý các bản dịch `t()`, các enumeration, v.v.              | -                                                                                                                        |
| `useDictionaryAsync`   | Tương tự `useDictionary`, nhưng xử lý các dictionary bất đồng bộ.                                                      | -                                                                                                                        |
| `useDictionaryDynamic` | Tương tự `useDictionary`, nhưng xử lý các dictionary động.                                                             | -                                                                                                                        |
| `useLocale`            | Trả về locale hiện tại và một hàm để thiết lập nó.                                                                     | -                                                                                                                        |
| `useRewriteURL`        | Hàm phía client để quản lý việc rewrite URL. Tự động cập nhật URL nếu tồn tại một quy tắc rewrite đã được bản địa hóa. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Trả về đối tượng Intl cho locale hiện tại.                                                                             | -                                                                                                                        |

### Markdown

Nhập:

```tsx
import "svelte-intlayer";
```

| Hàm                   | Mô tả                                                             |
| --------------------- | ----------------------------------------------------------------- |
| `setIntlayerMarkdown` | Hàm để thiết lập ngữ cảnh markdown trong ứng dụng Svelte của bạn. |

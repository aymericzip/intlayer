---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói react-intlayer
description: Cài đặt dành riêng cho React của Intlayer, cung cấp hooks và providers cho các ứng dụng React.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói react-intlayer

Gói `react-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng React. Nó bao gồm context providers, hooks và components để xử lý nội dung đa ngôn ngữ.

## Cài đặt

```bash
npm install react-intlayer
```

## Exports

### Providers

Import:

```tsx
import "react-intlayer";
```

| Component                 | Mô tả                                                                                                                                | Tài liệu liên quan                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | Provider chính bao bọc ứng dụng của bạn và cung cấp context của Intlayer. Mặc định bao gồm hỗ trợ editor.                            | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Một component provider tập trung vào nội dung mà không có các tính năng editor. Sử dụng khi bạn không cần trình chỉnh sửa trực quan. | -                                                                                                                             |
| `HTMLProvider`            | Provider cho các thiết lập quốc tế hóa (i18n) liên quan đến HTML. Cho phép ghi đè component cho các thẻ HTML.                        | -                                                                                                                             |

### Hooks

Nhập:

```tsx
import "react-intlayer";
```

| Hook                   | Mô tả                                                                                                                          | Tài liệu liên quan                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook phía client chọn một dictionary theo khóa và trả về nội dung của nó. Sử dụng locale từ context nếu không được cung cấp.   | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook chuyển đổi một đối tượng dictionary và trả về nội dung cho locale hiện tại. Xử lý các bản dịch `t()`, enumerations, v.v.  | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook xử lý các dictionary bất đồng bộ. Chấp nhận một map dictionary dựa trên Promise và giải quyết nó cho locale hiện tại.     | -                                                                                                                       |
| `useDictionaryDynamic` | Hook xử lý các từ điển động được tải theo khóa. Sử dụng React Suspense nội bộ để xử lý trạng thái tải.                         | -                                                                                                                       |
| `useLocale`            | Hook phía client để lấy locale hiện tại, default locale, các locale khả dụng, và một hàm để cập nhật locale.                   | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook để lấy locale hiện tại và tất cả các trường liên quan (locale, defaultLocale, availableLocales, setLocale) từ context.    | -                                                                                                                       |
| `useRewriteURL`        | Hook phía client để quản lý việc rewrite URL. Nếu tồn tại quy tắc rewrite cho pathname và locale hiện tại, nó sẽ cập nhật URL. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook cung cấp một hàm dịch `t()` để truy cập nội dung lồng nhau theo khóa. Bắt chước mẫu i18next/next-intl.                    | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook cung cấp một đối tượng `Intl` liên kết với locale. Tự động chèn locale hiện tại và sử dụng bộ nhớ đệm tối ưu.             | -                                                                                                                       |
| `useLocaleStorage`     | Hook cung cấp khả năng lưu trữ locale trong localStorage hoặc cookies. Trả về các hàm getter và setter.                        | -                                                                                                                       |
| `useLocaleCookie`      | Không còn được khuyến nghị (Deprecated). Sử dụng `useLocaleStorage` thay thế. Hook quản lý việc lưu trữ locale trong cookies.  | -                                                                                                                       |
| `useLoadDynamic`       | Hook để tải các từ điển động sử dụng React Suspense. Nhận một key và một Promise, lưu kết quả vào cache.                       | -                                                                                                                       |
| `useIntlayerContext`   | Hook cung cấp các giá trị context hiện tại của client Intlayer (locale, setLocale, v.v.).                                      | -                                                                                                                       |
| `useHTMLContext`       | Hook để truy cập các override (ghi đè) của component HTML từ context HTMLProvider.                                             | -                                                                                                                       |

### Hàm

Nhập:

```tsx
import "react-intlayer";
```

| Hàm                  | Mô tả                                                                                                                                    | Tài liệu liên quan                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `t`                  | Hàm dịch phía client trả về bản dịch của nội dung đa ngôn ngữ được cung cấp. Sử dụng locale từ context nếu không được cung cấp.          | [dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |
| `getDictionary`      | Xử lý các đối tượng dictionary và trả về nội dung cho locale được chỉ định. Xử lý các bản dịch `t()`, enumerations, markdown, HTML, v.v. | -                                                                                               |
| `getIntlayer`        | Lấy một dictionary theo key từ declaration được sinh và trả về nội dung cho locale được chỉ định. Phiên bản tối ưu của `getDictionary`.  | -                                                                                               |
| `setLocaleInStorage` | Đặt locale vào bộ nhớ (local storage hoặc cookie tùy theo cấu hình).                                                                     | -                                                                                               |
| `setLocaleCookie`    | Đã lỗi thời. Sử dụng `setLocaleInStorage` thay thế. Đặt locale trong cookie.                                                             | -                                                                                               |
| `localeInStorage`    | Lấy locale từ storage (local storage hoặc cookie).                                                                                       | -                                                                                               |
| `localeCookie`       | Không còn được dùng. Sử dụng `localeInStorage` thay thế. Lấy locale từ cookie.                                                           | -                                                                                               |

### Thành phần

Nhập:

```tsx
import "react-intlayer";
```

hoặc

```tsx
import "react-intlayer/markdown";
```

| Thành phần         | Mô tả                                                                                                                               | Tài liệu liên quan                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Provider cho ngữ cảnh render markdown. Cho phép ghi đè các component tùy chỉnh cho các phần tử markdown.                            | -                                                                                                                             |
| `MarkdownRenderer` | Hiển thị nội dung markdown với các component tùy chỉnh. Hỗ trợ tất cả các tính năng markdown chuẩn và cú pháp đặc thù của Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/MarkdownRenderer.md) |

### Kiểu

Nhập:

```tsx
import "react-intlayer";
```

| Kiểu           | Mô tả                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Kiểu đại diện cho một node trong cây nội dung Intlayer. Dùng để thao tác nội dung an toàn về kiểu. |

### Phía server (react-intlayer/server)

Import:

```tsx
import "react-intlayer/server";
```

| Export                   | Kiểu        | Mô tả                                      |
| ------------------------ | ----------- | ------------------------------------------ |
| `IntlayerServerProvider` | `Component` | Provider cho kết xuất phía server.         |
| `IntlayerServer`         | `Component` | Wrapper phía server cho nội dung Intlayer. |
| `t`                      | `Function`  | Phiên bản phía server của hàm dịch.        |
| `useLocale`              | `Hook`      | Hook để truy cập locale ở phía server.     |
| `useIntlayer`            | `Hook`      | Phiên bản phía server của `useIntlayer`.   |
| `useDictionary`          | `Hook`      | Phiên bản phía server của `useDictionary`. |
| `useI18n`                | `Hook`      | Phiên bản phía server của `useI18n`.       |
| `locale`                 | `Function`  | Hàm để lấy hoặc đặt locale trên server.    |

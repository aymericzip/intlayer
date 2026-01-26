---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói intlayer
description: Gói lõi của Intlayer, cung cấp các hàm và kiểu cơ bản cho quốc tế hóa.
keywords:
  - intlayer
  - lõi
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói intlayer

Gói `intlayer` là thư viện lõi của hệ sinh thái Intlayer. Nó cung cấp các hàm, kiểu và tiện ích cần thiết để quản lý nội dung đa ngôn ngữ trong các ứng dụng JavaScript và TypeScript.

## Cài đặt

```bash
npm install intlayer
```

## Các exports

### Cấu hình

Nhập:

```tsx
import "intlayer";
```

| Biến               | Kiểu                   | Mô tả                                                                                     | Tài liệu liên quan                                                                                                      |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Đối tượng cấu hình của Intlayer.                                                          | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Trả về đối tượng cấu hình Intlayer. (**Đã ngừng dùng**: Sử dụng `configuration` thay thế) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | Danh sách tất cả các locales được hỗ trợ.                                                 | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | Danh sách tất cả các locales bắt buộc.                                                    | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | Locale mặc định.                                                                          | -                                                                                                                       |

### Kiểu

Nhập:

```tsx
import "intlayer";
```

| Kiểu                  | Mô tả                                                                |
| --------------------- | -------------------------------------------------------------------- |
| `Dictionary`          | Kiểu Dictionary được dùng để định nghĩa cấu trúc của một dictionary. |
| `DeclarationContent`  | (**Đã lỗi thời**) Sử dụng `Dictionary<T>` thay thế.                  |
| `IntlayerConfig`      | Kiểu định nghĩa cấu hình của Intlayer.                               |
| `ContentNode`         | Một phần tử (node) trong nội dung của từ điển.                       |
| `Locale`              | Kiểu đại diện cho một locale.                                        |
| `LocalesValues`       | Các giá trị có thể cho một locale.                                   |
| `StrictModeLocaleMap` | Một map các locale với kiểm tra kiểu nghiêm ngặt.                    |

### Các hàm nội dung

Nhập:

```tsx
import "intlayer";
```

| Hàm                      | Kiểu       | Mô tả                                                                                                   | Tài liệu liên quan                                                                                 |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `t` / `getTranslation`   | `Function` | Chọn nội dung dựa trên locale hiện tại.                                                                 | [dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)    |
| `enu` / `getEnumeration` | `Function` | Chọn nội dung dựa trên số lượng.                                                                        | [liệt kê](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Chọn nội dung dựa trên điều kiện boolean.                                                               | [điều kiện](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/condition.md) |
| `gender`                 | `Function` | Chọn nội dung dựa trên giới tính.                                                                       | [giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md)    |
| `insert`                 | `Function` | Chèn giá trị vào chuỗi nội dung.                                                                        | [chèn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md)      |
| `nest` / `getNesting`    | `Function` | Lồng một dictionary khác.                                                                               | [lồng nhau](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/nesting.md)   |
| `md`                     | `Function` | Xử lý nội dung Markdown.                                                                                | [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md)   |
| `html`                   | `Function` | Xử lý nội dung HTML.                                                                                    | [HTML](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/html.md)           |
| `file`                   | `Function` | Xử lý nội dung tệp.                                                                                     | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/file.md)           |
| `getDictionary`          | `Function` | Xử lý các objects có dạng dictionary (key, content). Nó xử lý các dịch `t()`, enumerations, v.v.        | -                                                                                                  |
| `getIntlayer`            | `Function` | Dựa trên `getDictionary`, nhưng chèn một phiên bản dictionary được tối ưu hóa từ generated declaration. | -                                                                                                  |

### Tiện ích Bản địa hóa

Nhập:

```tsx
import "intlayer";
```

| Hàm                    | Loại       | Mô tả                                                                   | Tài liệu liên quan                                                                                                              |
| ---------------------- | ---------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Phát hiện locale từ một chuỗi hoặc đường dẫn.                           | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Lấy phần ngôn ngữ của một locale.                                       | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Lấy tên hiển thị của một locale.                                        | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Chuyển đổi một đường dẫn canonical thành đường dẫn đã được bản địa hóa. | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Chuyển đường dẫn đã được bản địa hóa sang dạng chuẩn.                   | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Tạo URL được bản địa hóa.                                               | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Tạo các URL cho tất cả các locale được hỗ trợ.                          | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Xóa tiền tố locale khỏi đường dẫn.                                      | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Lấy tiền tố locale từ đường dẫn.                                        | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Lấy hướng văn bản (LTR/RTL).                                            | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Xác thực một tiền tố locale.                                            | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/validatePrefix.md)             |

### Tiện ích trình duyệt

Nhập:

```tsx
import "intlayer";
```

| Hàm                    | Loại       | Mô tả                                     |
| ---------------------- | ---------- | ----------------------------------------- |
| `getBrowserLocale`     | `Function` | Phát hiện locale ưu tiên của trình duyệt. |
| `getCookie`            | `Function` | Lấy giá trị cookie.                       |
| `getLocaleFromStorage` | `Function` | Truy xuất locale từ storage.              |
| `setLocaleInStorage`   | `Function` | Lưu locale vào storage.                   |

### Bộ định dạng

Nhập:

```tsx
import "intlayer";
```

| Hàm            | Mô tả                          |
| -------------- | ------------------------------ |
| `number`       | Định dạng số.                  |
| `currency`     | Định dạng giá trị tiền tệ.     |
| `percentage`   | Định dạng phần trăm.           |
| `compact`      | Định dạng số ở dạng rút gọn.   |
| `date`         | Định dạng ngày.                |
| `relativeTime` | Định dạng thời gian tương đối. |
| `units`        | Định dạng giá trị kèm đơn vị.  |
| `Intl`         | Đối tượng Intl tiêu chuẩn.     |

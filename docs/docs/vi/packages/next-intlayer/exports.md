---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói next-intlayer
description: Tích hợp dành riêng cho Next.js cho Intlayer, cung cấp middleware và providers cho App Router và Page Router.
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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói next-intlayer

Gói `next-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào ứng dụng Next.js. Nó hỗ trợ cả App Router và Page Router, bao gồm middleware cho điều hướng theo locale.

## Cài đặt

```bash
npm install next-intlayer
```

## Exports

### Middleware

Nhập:

```tsx
import "next-intlayer/middleware";
```

| Hàm                  | Mô tả                                                                                                                                                           | Tài liệu liên quan                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware của Next.js để xử lý định tuyến và chuyển hướng theo locale. Phát hiện locale từ headers/cookies và chuyển hướng đến đường dẫn tương ứng cho locale. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/intlayerMiddleware.md) |

### Trợ giúp cấu hình

Nhập:

```tsx
import "next-intlayer/server";
```

| Hàm                | Mô tả                                                                                                                                                                            | Tài liệu liên quan |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `withIntlayer`     | Trợ giúp bất đồng bộ để bao bọc cấu hình Next.js, đảm bảo các từ điển Intlayer được chuẩn bị trước khi build. Chuẩn bị các tệp nội dung và thiết lập các plugin cho webpack/SWC. | -                  |
| `withIntlayerSync` | Trợ giúp đồng bộ để bao bọc cấu hình Next.js, lý tưởng cho các cấu hình nơi async không khả dụng hoặc không mong muốn. Không chuẩn bị các từ điển khi server khởi động.          | -                  |

### Các Provider

Nhập:

```tsx
import "next-intlayer";
```

hoặc

```tsx
import "next-intlayer/server";
```

| Component                | Mô tả                                                                                                              | Tài liệu liên quan |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `IntlayerClientProvider` | Provider cho các component phía client trong Next.js App Router. Bao bọc `IntlayerProvider` từ react-intlayer.     | -                  |
| `IntlayerServerProvider` | Provider cho các component phía server trong Next.js (App Router). Cung cấp ngữ cảnh locale trên server.           | -                  |
| `IntlayerServer`         | Wrapper phía server cho nội dung Intlayer trong App Router. Đảm bảo xử lý locale đúng đắn trong Server Components. | -                  |

### Hooks (phía client)

Import:

```tsx
import "next-intlayer";
```

Tái xuất hầu hết các hooks từ `react-intlayer`.

| Hook                   | Mô tả                                                                                                                           | Tài liệu liên quan                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook phía client chọn một dictionary theo khoá của nó và trả về nội dung. Sử dụng locale từ ngữ cảnh nếu không được cung cấp.   | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook chuyển đổi một đối tượng dictionary và trả về nội dung cho locale hiện tại. Xử lý các dịch `t()`, các enumeration, v.v.    | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook xử lý các dictionary bất đồng bộ. Nhận một map dictionary dựa trên Promise và resolve nó cho locale hiện tại.              | -                                                                                                                       |
| `useDictionaryDynamic` | Hook xử lý các dictionary động được load theo key. Sử dụng React Suspense nội bộ để quản lý trạng thái tải.                     | -                                                                                                                       |
| `useLocale`            | Hook phía client để lấy locale hiện tại và một hàm để thiết lập nó. Được cải tiến cho Next.js App Router với hỗ trợ điều hướng. | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook phía client để quản lý URL rewrites. Tự động cập nhật URL nếu tồn tại quy tắc rewrite bản địa hóa gọn gàng hơn.            | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Hook dành cho Next.js Page Router để quản lý locale. Xử lý chuyển hướng và tải lại trang khi thay đổi locale.                   | -                                                                                                                       |
| `useI18n`              | Hook cung cấp hàm dịch `t()` để truy cập nội dung lồng nhau theo khóa. Mô phỏng mô hình i18next/next-intl.                      | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook cung cấp một đối tượng `Intl` ràng buộc theo locale. Tự động chèn locale hiện tại và sử dụng cơ chế caching được tối ưu.   | -                                                                                                                       |
| `useLoadDynamic`       | Hook để tải các từ điển động (dynamic dictionaries) sử dụng React Suspense. Nhận một key và một promise, và lưu cache kết quả.  | -                                                                                                                       |

### Hàm (Server-side)

Import:

```tsx
import "next-intlayer/server";
```

| Hàm                    | Mô tả                                                                                                                                          | Tài liệu liên quan                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Phiên bản phía server của hàm dịch cho Next.js App Router. Trả về bản dịch của nội dung đa ngôn ngữ cho locale của server.                     | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |
| `getLocale`            | Hàm trợ giúp để trích xuất locale hiện tại từ headers và cookies của Next.js. Dành cho Server Components, Server Actions, hoặc Route Handlers. | -                                                                                                      |
| `generateStaticParams` | Tạo các tham số tĩnh cho các route động của Next.js dựa trên các locale được cấu hình. Trả về mảng các đối tượng locale để pre-render.         | -                                                                                                      |
| `locale`               | Hàm để lấy hoặc thiết lập locale trong ngữ cảnh server (App Router). Cung cấp quản lý locale trong Server Components.                          | -                                                                                                      |

### Các kiểu

Nhập:

```tsx
import "next-intlayer";
```

| Kiểu                   | Mô tả                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Kiểu cho các trang Next.js với hỗ trợ Intlayer. Kiểu generic bao gồm tham số locale.                                  |
| `Next14PageIntlayer`   | Kiểu cho các trang Next.js 14 với hỗ trợ Intlayer.                                                                    |
| `Next15PageIntlayer`   | Kiểu cho các trang Next.js 15 với hỗ trợ Intlayer.                                                                    |
| `NextLayoutIntlayer`   | Kiểu cho các layout Next.js với hỗ trợ Intlayer. Kiểu generic bao gồm tham số locale.                                 |
| `Next14LayoutIntlayer` | Kiểu cho layout Next.js 14 với hỗ trợ Intlayer.                                                                       |
| `Next15LayoutIntlayer` | Kiểu cho layout Next.js 15 với hỗ trợ Intlayer.                                                                       |
| `LocalParams`          | Kiểu cho tham số route của Next.js có locale. Đối tượng với thuộc tính `locale`.                                      |
| `LocalPromiseParams`   | Kiểu cho tham số route của Next.js có locale (phiên bản async). Promise trả về một đối tượng với thuộc tính `locale`. |

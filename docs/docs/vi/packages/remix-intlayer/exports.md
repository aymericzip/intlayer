---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Tài liệu gói remix-intlayer
description: Tài liệu về các exports của gói remix-intlayer, cung cấp quốc tế hóa (i18n) cho các ứng dụng Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu exports cho remix-intlayer"
author: aymericzip
---

# Gói remix-intlayer

Gói `remix-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Remix 3. Gói bao gồm middleware để phát hiện locale của yêu cầu, quyền truy cập vào context của yêu cầu, và các hook để lấy từ điển và quản lý locale.

## Cài đặt

```bash
npm install remix-intlayer
```

## Các Exports của gói

### Middleware

| Export     | Loại           | Mô tả                                                                                                       | Tài liệu liên quan                                                                                                                 |
| ---------- | -------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Hàm Middleware | Middleware cho Remix 3 giúp phát hiện locale của yêu cầu, quản lý chuyển hướng và điền vào context yêu cầu. | [Middleware intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/intlayerMiddleware.md) |

### Lưu trữ Context

| Export                      | Loại                          | Mô tả                                                                                                                                                  | Tài liệu liên quan                                                                                                    |
| --------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | Khóa RequestContext / Lưu trữ | Khóa context yêu cầu được sử dụng để lấy trạng thái Intlayer từ context yêu cầu Remix 3 (`context.get(Intlayer)`).                                     | [Context Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                      | Tên thuộc tính (`'intlayer'`) được cài đặt trực tiếp trên ngữ cảnh yêu cầu, cho phép truy cập qua `context.intlayer` cũng như `context.get(Intlayer)`. | -                                                                                                                     |

### Hooks

| Export          | Loại | Mô tả                                                                                            | Tài liệu liên quan                                                                                                           |
| --------------- | ---- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Hook | Lấy và xử lý nội dung từ điển theo khóa cho locale hiện tại của yêu cầu.                         | [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Hook | Trả về nội dung của đối tượng từ điển đã import tương ứng với locale hiện tại của yêu cầu.       | [Hook useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Hook | Cung cấp quyền truy cập vào locale yêu cầu hiện tại, locale mặc định và danh sách locale có sẵn. | [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useLocale.md)         |

### Tiện ích (Utilities)

Nhập (Import):

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Hàm                   | Mô tả                                                                                                                                              | Tài liệu liên quan |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `createLocaleRouting` | Hàm thuần túy tính toán các quyết định định tuyến ngôn ngữ (`redirect`, `rewrite` hoặc `pass`) dựa trên yêu cầu, cấu hình và các tùy chọn.         | -                  |
| `getIntlayerState`    | Đọc `IntlayerState` hiện tại (`locale`, `defaultLocale`, `availableLocales`) từ phạm vi yêu cầu `AsyncLocalStorage` bên ngoài các component React. | -                  |

### Trình định dạng (remix-intlayer/format)

Nhập (Import):

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| Hook              | Mô tả                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Trả về một phiên bản Intl gắn liền với ngôn ngữ yêu cầu hoặc client với khả năng lưu vào bộ nhớ cache.        |
| `useDate`         | Trả về hàm định dạng ngày tháng được liên kết sẵn với ngôn ngữ hiện tại (`Intl.DateTimeFormat`).              |
| `useNumber`       | Trả về hàm định dạng số được liên kết sẵn với ngôn ngữ hiện tại (`Intl.NumberFormat`).                        |
| `useCurrency`     | Trả về hàm định dạng tiền tệ được liên kết sẵn với ngôn ngữ hiện tại.                                         |
| `usePercentage`   | Trả về hàm định dạng phần trăm được liên kết sẵn với ngôn ngữ hiện tại.                                       |
| `useRelativeTime` | Trả về hàm định dạng thời gian tương đối được liên kết sẵn với ngôn ngữ hiện tại (`Intl.RelativeTimeFormat`). |
| `useList`         | Trả về hàm định dạng danh sách được liên kết sẵn với ngôn ngữ hiện tại (`Intl.ListFormat`).                   |
| `useUnit`         | Trả về hàm định dạng đơn vị đo lường được liên kết sẵn với ngôn ngữ hiện tại.                                 |
| `useCompact`      | Trả về hàm định dạng số thu gọn được liên kết sẵn với ngôn ngữ hiện tại (ví dụ: `1.5K`).                      |

### Tiện ích HTML (remix-intlayer/html)

Nhập (Import):

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Bản xuất          | Kiểu       | Mô tả                                               |
| ----------------- | ---------- | --------------------------------------------------- |
| `renderHTML`      | `Function` | Hàm tiện ích độc lập để render các nút HTML.        |
| `useHTML`         | `Hook`     | Hook để lấy context nhà cung cấp HTML và cấu hình.  |
| `useHTMLRenderer` | `Hook`     | Hook để lấy hàm render HTML đã được cấu hình trước. |

### Tiện ích Markdown (remix-intlayer/markdown)

Nhập (Import):

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Bản xuất              | Kiểu       | Mô tả                                                      |
| --------------------- | ---------- | ---------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Biên dịch chuỗi markdown thành cấu trúc phân tích cú pháp. |
| `renderMarkdown`      | `Function` | Render nội dung markdown thành các nút đầu ra.             |
| `parseMarkdown`       | `Function` | Phân tích cú pháp nội dung markdown thô thành AST.         |
| `useMarkdown`         | `Hook`     | Hook để lấy context nhà cung cấp markdown.                 |
| `useMarkdownRenderer` | `Hook`     | Hook để lấy hàm render Markdown đã được cấu hình trước.    |

### Kiểu dữ liệu (Types)

Nhập (Import):

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Kiểu dữ liệu                | Mô tả                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Đối tượng trạng thái lưu trữ `locale`, `defaultLocale` và `availableLocales` trong ngữ cảnh yêu cầu Remix. |
| `IntlayerMiddlewareOptions` | Các tùy chọn cấu hình được truyền vào middleware `intlayer()`.                                             |
| `LocaleRoutingOptions`      | Tùy chọn tùy chỉnh tiền tố ngôn ngữ, phát hiện ngôn ngữ và chuyển hướng.                                   |
| `LocaleRoutingAction`       | Kiểu union biểu thị quyết định định tuyến: `redirect`, `rewrite` hoặc `pass`.                              |
| `LocaleRoutingRequest`      | Biểu diễn yêu cầu tối thiểu cần thiết cho `createLocaleRouting`.                                           |
| `UseLocaleResult`           | Kiểu trả về của `useLocale()`, bao gồm `locale`, `defaultLocale` và `availableLocales`.                    |

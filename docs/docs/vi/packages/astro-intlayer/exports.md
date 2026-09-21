---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: Tài liệu Gói astro-intlayer
description: Tích hợp Astro cho Intlayer, cung cấp cấu hình định tuyến theo ngôn ngữ, middleware, hooks, client store và quản lý từ điển.
keywords:
  - astro-intlayer
  - astro
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Thêm tài liệu cho useIntlayer, useDictionary, useLocale hooks, middleware và formatters"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Hợp nhất tài liệu cho tất cả các bản xuất"
author: aymericzip
---

# Gói astro-intlayer

Gói `astro-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Astro. Nó cấu hình định tuyến dựa trên ngôn ngữ, quản lý từ điển, viết lại trang trong quá trình build, middleware xử lý yêu cầu và các hook để truy cập nội dung đa ngôn ngữ trên cả các thành phần `.astro` được render trên máy chủ và các script phía client.

## Cài đặt

```bash
npm install astro-intlayer
```

## Các bản xuất (Exports)

### Tích hợp (Integration)

Gói `astro-intlayer` cung cấp tích hợp Astro để thiết lập Intlayer trong dự án của bạn.

Nhập (Import):

```tsx
import { intlayer } from "astro-intlayer";
```

hoặc nhập mặc định trong `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Hàm        | Mô tả                                                                                                                                                                                           | Tài liệu liên quan                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Tích hợp Astro chuẩn bị từ điển, cấu hình plugin Vite (alias, proxy định tuyến, cắt tỉa mã build), tự động đăng ký middleware yêu cầu và xuất các trang prerender tại các URL được bản địa hóa. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/intlayer.md) |

### Hooks (Máy chủ & Client)

Nhập (Import):

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Mô tả                                                                                                                                                                               | Tài liệu liên quan                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Chọn một từ điển theo khóa và trả về nội dung được bản địa hóa. Trong frontmatter `.astro`, nó đọc ngôn ngữ từ `Astro.locals`. Trong `<script>` client, nó đọc từ store của client. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Chuyển đổi một đối tượng từ điển và trả về nội dung cho ngôn ngữ đã giải quyết. Hoạt động trong frontmatter và script phía client.                                                  | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Trả về ngôn ngữ hiện tại, ngôn ngữ mặc định, danh sách các ngôn ngữ khả dụng và hàm để cập nhật ngôn ngữ.                                                                           | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Nhập (Import):

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Bản xuất    | Kiểu                | Mô tả                                                                                                                                                  | Tài liệu liên quan                                                                                              |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Middleware của Astro phát hiện ngôn ngữ của yêu cầu và gán vào `Astro.locals.intlayer`. Được đăng ký tự động bởi `intlayer()` hoặc được nhập thủ công. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/onRequest.md) |

### Tiện ích (Utilities)

Nhập (Import):

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Hàm                 | Mô tả                                                                                                 | Tài liệu liên quan |
| ------------------- | ----------------------------------------------------------------------------------------------------- | ------------------ |
| `getIntlayerLocals` | Hàm hỗ trợ lấy đối tượng `IntlayerLocals` hiện tại từ phạm vi lưu trữ yêu cầu bên ngoài Astro.locals. | -                  |

### Tiện ích Client (astro-intlayer/client)

Nhập (Import):

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Khi được nhập trong trình duyệt hoặc bên trong thẻ `<script>` của client, `astro-intlayer` tự động ánh xạ tới `astro-intlayer/client` (được cung cấp bởi `vanilla-intlayer`), cung cấp các hàm lấy từ điển phía client, bộ lắng nghe store và các công cụ lưu trữ ngôn ngữ.

### Trình định dạng (astro-intlayer/format)

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
} from "astro-intlayer/format";
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

### Tiện ích HTML (astro-intlayer/html)

Nhập (Import):

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Bản xuất          | Kiểu       | Mô tả                                               |
| ----------------- | ---------- | --------------------------------------------------- |
| `renderHTML`      | `Function` | Hàm tiện ích độc lập để render các nút HTML.        |
| `useHTML`         | `Hook`     | Hook để lấy context nhà cung cấp HTML và cấu hình.  |
| `useHTMLRenderer` | `Hook`     | Hook để lấy hàm render HTML đã được cấu hình trước. |

### Tiện ích Markdown (astro-intlayer/markdown)

Nhập (Import):

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
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
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Kiểu              | Mô tả                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | Đối tượng được gắn vào `Astro.locals.intlayer` chứa `locale`, `defaultLocale` và `availableLocales`. |
| `UseLocaleProps`  | Các thuộc tính cấu hình tùy chọn được chấp nhận bởi `useLocale()`.                                   |
| `UseLocaleResult` | Kiểu trả về của `useLocale()`, cung cấp các thuộc tính ngôn ngữ và các phương thức cập nhật.         |

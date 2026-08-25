---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Tài liệu gói elysia-intlayer
description: Plugin Elysia cho Intlayer, cung cấp các hàm dịch và phát hiện locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Hợp nhất tài liệu cho tất cả các export"
author: aymericzip
---

# Gói elysia-intlayer

Gói `elysia-intlayer` cung cấp một plugin cho các ứng dụng Elysia để xử lý internationalization. Nó phát hiện locale của người dùng và tiêm một đối tượng `intlayer` vào route context.

## Cài đặt

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` là một peer dependency (`>=1.0.0`). Elysia nhắm tới runtime **Bun**.

## Các export

### Plugin

Nhập:

```ts
import { intlayer } from "elysia-intlayer";
```

| Hàm        | Mô tả                                                                                                                                                                                                                                                                                                    | Tài liệu liên quan                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Elysia tích hợp Intlayer vào ứng dụng Elysia của bạn. Xử lý phát hiện locale từ storage (cookies, headers) rồi từ `Accept-Language`, tiêm một đối tượng `intlayer` phơi bày `locale`, `t`, `getIntlayer` và `getDictionary` vào route context, và thiết lập ngữ cảnh request `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/elysia-intlayer/intlayer.md) |

### Hàm

Nhập:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Hàm             | Mô tả                                                                                                                                                                                                                                                | Tài liệu liên quan                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Hàm dịch toàn cục lấy nội dung cho locale hiện tại trong Elysia. Sử dụng `AsyncLocalStorage` để truy cập ngữ cảnh request do plugin `intlayer` thiết lập, và quay về locale mặc định khi ở ngoài ngữ cảnh đó. Cũng có thể truy cập qua `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md) |
| `getIntlayer`   | Lấy một dictionary theo key từ khai báo được sinh ra và trả về nội dung của nó cho locale hiện tại. Phiên bản tối ưu của `getDictionary`. Sử dụng `AsyncLocalStorage` để truy cập ngữ cảnh request. Cũng có thể truy cập qua `intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Xử lý các đối tượng dictionary và trả về nội dung cho locale hiện tại. Xử lý các bản dịch `t()`, enumeration, markdown, HTML, v.v. Sử dụng `AsyncLocalStorage` để truy cập ngữ cảnh request. Cũng có thể truy cập qua `intlayer.getDictionary`.      | -                                                                                                      |

### Kiểu

Nhập:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Kiểu                | Mô tả                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IntlayerContext`   | Hình dạng của đối tượng `intlayer` được tiêm vào mọi route context: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Chữ ký của hàm dịch, chuyển một locale map thành nội dung khớp với locale của request hiện tại.                                                                          |

## Sử dụng

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Tải plugin quốc tế hóa
  .use(intlayer())
  // Đọc locale và các helper từ context của route
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      vi: "Xin chào",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Hoặc dùng các helper standalone, gắn với request hiện tại
  .get("/t_example", () =>
    t({
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Plugin đăng ký context của nó thông qua một `derive` **global**, được Elysia định kiểu là `Partial<{ intlayer: IntlayerContext }>`. Giá trị luôn tồn tại lúc runtime với các route được đăng ký sau `.use(intlayer())`, vì vậy hãy dùng non-null assertion (`intlayer!.locale`) — hoặc optional chaining — để thỏa mãn TypeScript ở chế độ `strict`.

## Tài liệu liên quan

- [Elysia i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_elysia.md)
- [Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

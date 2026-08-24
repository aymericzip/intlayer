---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next. Hướng dẫn năm 2026 để xây dựng ứng dụng Elysia đa ngôn ngữ (i18n). Dịch với các tác nhân AI và tối ưu hóa kích thước gói, SEO và hiệu suất."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Dịch trang web backend Elysia của bạn bằng Intlayer | Quốc tế hóa (i18n)

`elysia-intlayer` là một plugin quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng Elysia, được thiết kế để làm cho các dịch vụ backend của bạn có thể truy cập được trên toàn cầu bằng cách cung cấp các phản hồi được bản địa hóa dựa trên tùy chọn của máy khách.

> Xem triển khai package trên GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Các Trường Hợp Sử Dụng Thực Tế

- **Hiển Thị Lỗi Backend Theo Ngôn Ngữ của Người Dùng**: Khi một lỗi xảy ra, hiển thị thông báo bằng ngôn ngữ mẹ đẻ của người dùng sẽ cải thiện sự hiểu biết và giảm bớt sự thất vọng. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần giao diện như toasts hoặc modals.
- **Truy Xuất Nội Dung Đa Ngôn Ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ. Điều này rất quan trọng đối với các nền tảng như các trang web thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài viết và nội dung khác bằng ngôn ngữ mà người dùng ưa thích.
- **Gửi Email Đa Ngôn Ngữ**: Cho dù đó là email giao dịch, chiến dịch marketing hay thông báo, gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể mức độ tương tác và hiệu quả.
- **Thông Báo Push Đa Ngôn Ngữ**: Đối với các ứng dụng di động, gửi thông báo push bằng ngôn ngữ ưa thích của người dùng có thể nâng cao sự tương tác và giữ chân người dùng. Điều này tạo ra sự gần gũi và khiến các thông báo cảm thấy liên quan hơn và có thể hành động được.
- **Các Loại Giao Tiếp Khác**: Bất kỳ hình thức giao tiếp nào từ backend, chẳng hạn như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều được hưởng lợi từ việc sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm người dùng tổng thể.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng các khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, khiến nó trở thành một bước quan trọng trong việc mở rộng dịch vụ của bạn trên toàn thế giới.

## Bắt Đầu

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Application Template](https://github.com/aymericzip/intlayer-elysia-template) trên GitHub.

### Cài đặt

Để bắt đầu sử dụng `elysia-intlayer`, cài đặt package bằng npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là một AI agent.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các package cần thiết. Ví dụ:

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

### Thiết lập

Cấu hình các cài đặt quốc tế hóa bằng cách tạo một `intlayer.config.ts` ở thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Khai báo Nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "vi": "Ví dụ về nội dung được trả về bằng tiếng Việt",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (theo mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (theo mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Thiết lập Elysia Application

Thiết lập ứng dụng Elysia của bạn để sử dụng `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Tải plugin quốc tế hóa
  .use(intlayer())
  // Routes
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

Plugin cũng inject một object `intlayer` vào route context. Sử dụng nó khi bạn muốn có một dependency rõ ràng thay vì sử dụng các standalone helpers:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // Locale được sử dụng cho request này, được thương lượng từ `Accept-Language` hoặc đọc từ storage
  locale: intlayer.locale,
  greeting: intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> Route context exposed `locale`, `defaultLocale`, `locale_storage` (locale được đặt rõ ràng bởi client), `locale_detected` (locale được thương lượng từ headers), `t`, `getIntlayer` và `getDictionary`.

### Tương thích

`elysia-intlayer` hoàn toàn tương thích với:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md)>) cho các ứng dụng React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md)>) cho các ứng dụng Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md)>) cho các ứng dụng Vite

Nó cũng hoạt động liền mạch với bất kỳ giải pháp quốc tế hóa nào trong các môi trường khác nhau, bao gồm trình duyệt và các yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện locale thông qua các header hoặc cookie:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Các tùy chọn cấu hình khác
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

Theo mặc định, `elysia-intlayer` sẽ giải thích header `Accept-Language` để xác định ngôn ngữ ưa thích của khách hàng.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) của chúng tôi.

### Cấu hình TypeScript

`elysia-intlayer` tận dụng các khả năng mạnh mẽ của TypeScript để nâng cao quá trình quốc tế hóa. Kiểu tĩnh của TypeScript đảm bảo rằng mọi khóa dịch được tính đến, giảm nguy hiểm bỏ sót bản dịch và cải thiện khả năng bảo trì.

Đảm bảo các loại tự động tạo (theo mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tự động tạo
  ],
}
```

### Tiện ích VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích VS Code Intlayer** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích này cung cấp:

- **Autocompletion** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung** dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích này, hãy tham khảo [tài liệu Tiện ích VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

### Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh commit chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

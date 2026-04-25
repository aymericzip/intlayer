---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Dịch Astro i18n - Cách dịch ứng dụng Astro vào năm 2026
description: Tìm hiểu cách thêm đa ngôn ngữ (i18n) vào trang web Astro của bạn bằng Intlayer. Làm theo hướng dẫn này để trang web của bạn có thể sử dụng nhiều ngôn ngữ.
keywords:
  - đa ngôn ngữ
  - tài liệu
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Cập nhật tích hợp Astro, cấu hình và cách sử dụng"
---

# Dịch trang web Astro của bạn với Intlayer | Đa ngôn ngữ (i18n)

## Intlayer là gì?

**Intlayer** là một thư viện đa ngôn ngữ (i18n) mã nguồn mở sáng tạo được thiết kế để đơn giản hóa việc hỗ trợ nhiều ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Quản lý bản dịch dễ dàng**: Sử dụng các từ điển khai báo ở cấp độ thành phần.
- **Bản địa hóa động các metadata, route và nội dung**.
- **Đảm bảo hỗ trợ TypeScript**: Với các kiểu dữ liệu được tạo tự động để tự động hoàn thành và phát hiện lỗi tốt hơn.
- **Tận dụng các tính năng nâng cao**: Như phát hiện ngôn ngữ động và chuyển đổi ngôn ngữ.

---

## Hướng dẫn từng bước để cấu hình Intlayer trong Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách đa ngôn ngữ hóa ứng dụng của bạn với Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [mẫu ứng dụng](https://github.com/aymericzip/intlayer-astro-template) trên GitHub.

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng trình quản lý gói ưa thích của bạn:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# tùy chọn: nếu bạn muốn thêm hỗ trợ React islands
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# tùy chọn: nếu bạn muốn thêm hỗ trợ React islands
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# tùy chọn: nếu bạn muốn thêm hỗ trợ React islands
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ i18n để quản lý cấu hình, bản dịch, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **astro-intlayer**
  Plugin tích hợp Astro để kết nối Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production); nó cũng bao gồm middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 2: Cấu hình dự án của bạn

Tạo một file cấu hình để xác định các ngôn ngữ của ứng dụng:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.VIETNAMESE,
      // Các ngôn ngữ khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Thông qua file cấu hình này, bạn có thể thiết lập các URL bản địa hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt log Intlayer trong console, v.v. Để biết danh sách đầy đủ các tham số có sẵn, hãy xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Astro của bạn

Thêm plugin `intlayer` vào cấu hình Astro của bạn.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Plugin tích hợp `intlayer()` được sử dụng để tích hợp Intlayer với Astro. Nó đảm bảo việc tạo các file khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó xác định các biến môi trường Intlayer bên trong ứng dụng Astro và cung cấp các alias để tối ưu hóa hiệu suất.

### Bước 4: Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      vi: "Xin chào thế giới",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn, miễn là chúng nằm trong `contentDir` (mặc định là `./src`) và khớp với phần mở rộng của file khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm thông tin, hãy xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng nội dung trong Astro

Bạn có thể sử dụng các từ điển trực tiếp trong các file `.astro` bằng cách sử dụng các hàm hỗ trợ cốt lõi được xuất từ `intlayer`.

```astro fileName="src/pages/index.astro"
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Bước 6: Định tuyến bản địa hóa

Tạo các đoạn route động (ví dụ: `src/pages/[locale]/index.astro`) để phục vụ các trang bản địa hóa:

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Tích hợp Astro thêm middleware Vite giúp định tuyến nhận biết ngôn ngữ và định nghĩa môi trường trong quá trình phát triển. Bạn cũng có thể sử dụng logic của riêng mình hoặc các công cụ `intlayer` như `getLocalizedUrl` để liên kết giữa các ngôn ngữ.

### Bước 7: Tiếp tục sử dụng Framework yêu thích của bạn

Tiếp tục xây dựng ứng dụng của bạn bằng cách sử dụng framework mà bạn chọn.

- Intlayer + React: [Intlayer với React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer với Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer với Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer với Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer với Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+preact.md)

### Cấu hình TypeScript

Intlayer sử dụng cơ chế mở rộng module (module augmentation) để tận dụng TypeScript, làm cho cơ sở mã của bạn mạnh mẽ hơn.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu dữ liệu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... cấu hình TypeScript hiện tại của bạn
  "include": [
    // ... cấu hình TypeScript hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu dữ liệu được tạo tự động
  ],
}
```

### Cấu hình Git

Khuyên bạn nên bỏ qua các file được tạo bởi Intlayer. Điều này ngăn chúng được commit vào kho lưu trữ Git của bạn.

Để làm điều đó, hãy thêm các hướng dẫn sau vào file `.gitignore` của bạn:

```bash
# Bỏ qua các file được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **tiện ích mở rộng Intlayer chính thức cho VS Code**.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích này sẽ cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước trực tiếp** nội dung đã dịch.
- **Các hành động nhanh** để tạo và cập nhật bản dịch dễ dàng.

Để biết thêm thông tin về cách sử dụng tiện ích này, hãy xem [tài liệu tiện ích VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Tìm hiểu sâu hơn

Nếu bạn muốn tìm hiểu thêm, bạn cũng có thể triển khai [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để quản lý nội dung bên ngoài.

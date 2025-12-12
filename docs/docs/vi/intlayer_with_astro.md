---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Cách dịch ứng dụng Astro của bạn – Hướng dẫn i18n 2025
description: Tìm hiểu cách thêm quốc tế hóa (i18n) vào trang web Astro của bạn bằng Intlayer. Làm theo hướng dẫn này để làm cho trang web của bạn đa ngôn ngữ.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - Astro
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 6.2.0
    date: 2025-10-03
    changes: Làm mới hướng dẫn tích hợp Astro, cấu hình, cách sử dụng
---

# Dịch trang web Astro của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Định vị động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu tự động tạo, cải thiện tính năng tự hoàn thành và phát hiện lỗi.
- **Tận hưởng các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-astro-template) trên GitHub.

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng trình quản lý gói của bạn:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Tùy chọn: thêm hỗ trợ React island
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Tùy chọn: thêm hỗ trợ React island
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
 # Tùy chọn: thêm hỗ trợ React island
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **astro-intlayer**
  Bao gồm plugin tích hợp Astro để tích hợp Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie, và xử lý chuyển hướng URL.

### Bước 2: Cấu hình dự án của bạn

Tạo một tệp cấu hình để cấu hình các ngôn ngữ của ứng dụng của bạn:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Các ngôn ngữ khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung của bạn, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào Cấu hình Astro của bạn

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Plugin tích hợp `intlayer()` cho Astro được sử dụng để tích hợp Intlayer với Astro. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Astro. Ngoài ra, nó cung cấp các bí danh để tối ưu hiệu suất.

### Bước 4: Khai báo Nội dung của bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

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
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng nội dung của bạn trong Astro

Bạn có thể sử dụng trực tiếp các từ điển trong các tệp `.astro` bằng cách sử dụng các helper cốt lõi được xuất bởi `intlayer`.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
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

### Bước 6: Định tuyến theo ngôn ngữ

Tạo một đoạn route động để phục vụ các trang được địa phương hóa, ví dụ `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Việc tích hợp Astro thêm một middleware Vite trong quá trình phát triển giúp định tuyến theo ngôn ngữ và định nghĩa môi trường. Bạn vẫn có thể liên kết giữa các ngôn ngữ bằng logic riêng của mình hoặc các hàm tiện ích như `getLocalizedUrl` từ `intlayer`.

### Bước 7: Tiếp tục sử dụng framework yêu thích của bạn

Tiếp tục sử dụng framework yêu thích của bạn để xây dựng ứng dụng.

- Intlayer + React: [Intlayer với React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer với Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer với Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer với Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer với Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+preact.md)

### Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng các lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tự động tạo.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tự động tạo
  ],
}
```

### Cấu hình Git

Khuyến nghị bạn nên bỏ qua các file được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit các file này vào kho Git của mình.

Để làm điều này, bạn có thể thêm các chỉ dẫn sau vào file `.gitignore` của bạn:

```plaintext
# Bỏ qua các file được tạo bởi Intlayer
.intlayer
```

### Extension VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Extension Intlayer chính thức cho VS Code**.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Extension này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng extension, tham khảo [Tài liệu Extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Tiến xa hơn

Để tiến xa hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---

---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - Cách dịch ứng dụng AdonisJS năm 2026
description: Khám phá cách làm cho backend AdonisJS của bạn đa ngôn ngữ. Làm theo tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Khởi tạo lịch sử
---

# Dịch website backend AdonisJS của bạn bằng Intlayer | Quốc tế hóa (i18n)

`adonis-intlayer` là một gói quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng AdonisJS, được thiết kế để làm cho các dịch vụ backend của bạn có thể truy cập toàn cầu bằng cách cung cấp các phản hồi được bản địa hóa dựa trên sở thích của khách hàng.

### Các trường hợp sử dụng thực tế

- **Hiển thị lỗi backend bằng ngôn ngữ của người dùng**: Khi xảy ra lỗi, việc hiển thị thông báo bằng ngôn ngữ mẹ đẻ của người dùng sẽ giúp cải thiện sự hiểu biết và giảm bớt sự khó chịu. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần front-end như toast hoặc modal.

- **Truy xuất nội dung đa ngôn ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ. Điều này rất quan trọng đối với các nền tảng như trang thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài viết và các nội dung khác bằng ngôn ngữ mà người dùng ưa thích.

- **Gửi email đa ngôn ngữ**: Cho dù đó là email giao dịch, chiến dịch tiếp thị hay thông báo, việc gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể sự tương tác và hiệu quả.

- **Thông báo push đa ngôn ngữ**: Đối với các ứng dụng di động, gửi thông báo push bằng ngôn ngữ ưu tiên của người dùng có thể tăng cường sự tương tác và giữ chân người dùng. Sự tiếp xúc cá nhân này có thể làm cho các thông báo cảm thấy phù hợp và có thể hành động hơn.

- **Các hình thức liên lạc khác**: Bất kỳ hình thức liên lạc nào từ backend, chẳng hạn như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều có lợi khi sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm tổng thể của người dùng.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng sự khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, khiến nó trở thành một bước quan trọng trong việc mở rộng dịch vụ của bạn trên toàn thế giới.

## Bắt đầu

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) trên GitHub.

### Cài đặt

Để bắt đầu sử dụng `adonis-intlayer`, hãy cài đặt gói bằng npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### Thiết lập

Cấu hình các cài đặt quốc tế hóa bằng cách tạo một tệp `intlayer.config.ts` trong thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "vi": "Ví dụ về nội dung được trả về bằng tiếng Việt",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src` hoặc `./app`) và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Thiết lập ứng dụng AdonisJS

Thiết lập ứng dụng AdonisJS của bạn để sử dụng `adonis-intlayer`.

#### Đăng ký middleware

Trước tiên, bạn cần đăng ký middleware `intlayer` trong ứng dụng của mình.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Định nghĩa các route của bạn

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de nội dung renvoyé en français",
    vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Các hàm

`adonis-intlayer` xuất ra một số hàm để xử lý quốc tế hóa trong ứng dụng của bạn:

- `t(content, locale?)`: Hàm dịch cơ bản.
- `getIntlayer(key, locale?)`: Truy xuất nội dung bằng khóa từ các từ điển của bạn.
- `getDictionary(dictionary, locale?)`: Truy xuất nội dung từ một đối tượng từ điển cụ thể.
- `getLocale()`: Truy xuất ngôn ngữ hiện tại từ ngữ cảnh yêu cầu.

#### Sử dụng trong Controller

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        vi: "Xin chào từ bộ điều khiển",
      })
    );
  }
}
```

### Khả năng tương thích

`adonis-intlayer` hoàn toàn tương thích với:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md) cho các ứng dụng React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md) cho các ứng dụng Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md) cho các ứng dụng Vite

Nó cũng hoạt động liền mạch với bất kỳ giải pháp quốc tế hóa nào trên nhiều môi trường khác nhau, bao gồm trình duyệt và yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện ngôn ngữ thông qua header hoặc cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Các tùy chọn cấu hình khác
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

Theo mặc định, `adonis-intlayer` sẽ diễn giải header `Accept-Language` để xác định ngôn ngữ ưa thích của khách hàng.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) của chúng tôi.

### Cấu hình TypeScript

`adonis-intlayer` tận dụng khả năng mạnh mẽ của TypeScript để cải thiện quá trình quốc tế hóa. Việc nhập liệu tĩnh của TypeScript đảm bảo rằng mọi khóa dịch đều được tính đến, giảm rủi ro thiếu bản dịch và cải thiện khả năng bảo trì.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo các loại được tự động tạo (mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tự động tạo
  ],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước nội tuyến** nội dung đã dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/vi/doc/vs-code-extension).

### Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh cam kết chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

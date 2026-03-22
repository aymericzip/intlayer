---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - Cách dịch ứng dụng Fastify vào năm 2026
description: Khám phá cách làm cho backend Fastify của bạn đa ngôn ngữ. Làm theo tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "Thêm lệnh init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Khởi tạo lịch sử"
---

# Dịch trang web backend Fastify của bạn bằng Intlayer | Quốc tế hóa (i18n)

`fastify-intlayer` là một plugin quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng Fastify, được thiết kế để làm cho dịch vụ backend của bạn có thể truy cập toàn cầu bằng cách cung cấp các phản hồi được địa phương hóa dựa trên sở thích của khách hàng.

> Xem triển khai gói trên GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Các trường hợp sử dụng thực tế

- **Hiển thị lỗi Backend bằng ngôn ngữ của người dùng**: Khi xảy ra lỗi, việc hiển thị thông báo bằng ngôn ngữ mẹ đẻ của người dùng sẽ cải thiện sự hiểu biết và giảm bớt sự khó chịu. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần giao diện người dùng như toast hoặc modal.
- **Truy xuất nội dung đa ngôn ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, việc quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ. Điều này rất quan trọng đối với các nền tảng như trang web thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài viết và nội dung khác bằng ngôn ngữ ưa thích của người dùng.
- **Gửi Email đa ngôn ngữ**: Cho dù đó là email giao dịch, chiến dịch tiếp thị hay thông báo, việc gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể sự tương tác và hiệu quả.
- **Thông báo đẩy đa ngôn ngữ**: Đối với ứng dụng di động, việc gửi thông báo đẩy bằng ngôn ngữ ưa thích của người dùng có thể tăng cường sự tương tác và giữ chân người dùng. Sự cá nhân hóa này có thể làm cho các thông báo cảm thấy phù hợp và có thể hành động hơn.
- **Các giao tiếp khác**: Bất kỳ hình thức giao tiếp nào từ backend, chẳng hạn như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều có lợi khi sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm người dùng tổng thể.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng sự khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, khiến nó trở thành một bước quan trọng trong việc mở rộng quy mô dịch vụ của bạn trên toàn thế giới.

## Bắt đầu

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách Quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-fastify-template) trên GitHub.

### Cài đặt

Để bắt đầu sử dụng `fastify-intlayer`, hãy cài đặt gói bằng npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Thiết lập

Cấu hình các cài đặt quốc tế hóa bằng cách tạo tệp `intlayer.config.ts` trong thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de nội dung devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de nội dung devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de nội dung devuelto en español (España)",
      "es-MX": "Ejemplo de nội dung devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de nội dung devuelto en español (México)"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Thiết lập ứng dụng Fastify

Thiết lập ứng dụng Fastify của bạn để sử dụng `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Tải plugin quốc tế hóa
await fastify.register(intlayer);

// Các tuyến đường
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de nội dung devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Khởi động máy chủ
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Tải plugin quốc tế hóa
await fastify.register(intlayer);

// Các tuyến đường
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de nội dung renvoyé en français",
    "es-ES": "Ejemplo de nội dung devuelto en español (España)",
    "es-MX": "Ejemplo de nội dung devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Khởi động máy chủ
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Trình bao bọc khởi động máy chủ cho async/await
const start = async () => {
  try {
    // Tải plugin quốc tế hóa
    await fastify.register(intlayer);

    // Các tuyến đường
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de nội dung renvoyé en français",
        "es-ES": "Ejemplo de nội dung devuelto en español (España)",
        "es-MX": "Ejemplo de nội dung devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Tính tương thích

`fastify-intlayer` hoàn toàn tương thích với:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md) cho ứng dụng React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md) cho ứng dụng Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md) cho ứng dụng Vite

Nó cũng hoạt động trơn tru với bất kỳ giải pháp quốc tế hóa nào trong các môi trường khác nhau, bao gồm trình duyệt và yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện locale thông qua header hoặc cookie:

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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Các tùy chọn cấu hình khác
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Các tùy chọn cấu hình khác
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Theo mặc định, `fastify-intlayer` sẽ diễn giải tiêu đề `Accept-Language` để xác định ngôn ngữ ưa thích của ứng dụng khách.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) của chúng tôi.

### Cấu hình TypeScript

`fastify-intlayer` tận dụng khả năng mạnh mẽ của TypeScript để cải thiện quá trình quốc tế hóa. Việc nhập tĩnh của TypeScript đảm bảo rằng mọi khóa dịch đều được tính đến, giảm rủi ro thiếu bản dịch và cải thiện khả năng bảo trì.

Đảm bảo các loại được tạo tự động (mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện tại của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tạo tự động
  ],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Intlayer VS Code Extension** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội tuyến** nội dung đã dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Cấu hình Git

Nên bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh việc commit chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer

```

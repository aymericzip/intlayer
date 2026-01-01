---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Cách dịch backend Fastify của bạn – Hướng dẫn i18n 2026
description: Tìm hiểu cách làm cho backend Fastify của bạn hỗ trợ đa ngôn ngữ. Thực hiện theo tài liệu để internationalize (i18n) và dịch nội dung.
keywords:
  - Quốc tế hóa (i18n)
  - Tài liệu
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: Thêm lệnh init
  - version: 7.6.0
    date: 2025-12-31
    changes: Khởi tạo lịch sử
---

# Dịch backend Fastify của bạn bằng Intlayer | Quốc tế hóa (i18n)

`fastify-intlayer` là một plugin quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng Fastify, được thiết kế để làm cho dịch vụ backend của bạn có thể truy cập trên toàn cầu bằng cách cung cấp phản hồi được địa phương hóa dựa trên sở thích của client.

### Các trường hợp sử dụng thực tế

- **Hiển thị lỗi Backend bằng ngôn ngữ của người dùng**: Khi xảy ra lỗi, hiển thị thông điệp bằng ngôn ngữ mẹ đẻ của người dùng sẽ cải thiện khả năng hiểu và giảm sự bực bội. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần front-end như toast hoặc modal.

`fastify-intlayer` là một plugin quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng Fastify, được thiết kế để giúp các dịch vụ backend của bạn có thể truy cập toàn cầu bằng cách cung cấp các phản hồi địa phương hóa dựa trên sở thích của khách hàng.

### Trường hợp sử dụng thực tế

- **Hiển thị lỗi backend bằng ngôn ngữ của người dùng**: Khi xảy ra lỗi, hiển thị thông điệp bằng ngôn ngữ mẹ đẻ của người dùng giúp họ hiểu tốt hơn và giảm bực bội. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần front-end như toasts hoặc modals.
- **Truy xuất nội dung đa ngôn ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ. Điều này rất quan trọng cho các nền tảng như trang thương mại điện tử (e-commerce) hoặc hệ thống quản lý nội dung (CMS) cần hiển thị mô tả sản phẩm, bài viết và các nội dung khác theo ngôn ngữ mà người dùng ưu tiên.
- **Gửi email đa ngôn ngữ**: Dù là email giao dịch, chiến dịch marketing hay thông báo, gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể mức độ tương tác và hiệu quả.
- **Thông báo đẩy đa ngôn ngữ**: Đối với ứng dụng di động, gửi thông báo đẩy bằng ngôn ngữ ưa thích của người dùng có thể tăng tương tác và giữ chân người dùng. Sự chăm chút cá nhân này khiến thông báo trở nên phù hợp và dễ hành động hơn.
- **Các hình thức liên lạc khác**: Bất kỳ hình thức liên lạc nào từ backend, như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều hưởng lợi khi được gửi bằng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm tổng thể.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, trở thành bước then chốt để mở rộng dịch vụ ra toàn thế giới.

## Bắt đầu

### Cài đặt

Để bắt đầu sử dụng `fastify-intlayer`, cài gói bằng npm:

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

Cấu hình các thiết lập quốc tế hóa bằng cách tạo một tệp `intlayer.config.ts` ở thư mục gốc của dự án:

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

### Khai báo Nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ bản dịch:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      vi: "Ví dụ về nội dung trả về bằng tiếng Việt",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** Danh sách từ điển. @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      vi: "Ví dụ về nội dung trả về bằng tiếng Anh",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** Danh sách từ điển. @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      vi: "Ví dụ về nội dung trả về bằng tiếng Anh",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
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

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Thiết lập Ứng dụng Fastify

Thiết lập ứng dụng Fastify của bạn để sử dụng `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Tải plugin quốc tế hóa
await fastify.register(intlayer);

// Định tuyến
fastify.get("/t_example", async (_req, reply) => {
  return t({
    vi: "Ví dụ nội dung trả về bằng tiếng Việt",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Khởi động server
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

// Đăng ký plugin quốc tế hóa
await fastify.register(intlayer);

// Các route
fastify.get("/t_example", async (_req, reply) => {
  return t({
    vi: "Ví dụ nội dung trả về bằng tiếng Việt",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Bắt đầu server
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

// Wrapper khởi động server để hỗ trợ async/await
const start = async () => {
  try {
    // Đăng ký plugin quốc tế hóa
    await fastify.register(intlayer);

    // Các routes
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        vi: "Ví dụ về nội dung trả về bằng tiếng Việt",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
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
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        vi: "Ví dụ về nội dung trả về bằng tiếng Việt",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
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

### Tương thích

`fastify-intlayer` tương thích hoàn toàn với:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md)>) cho các ứng dụng React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md)>) cho các ứng dụng Next.js

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md)>) cho ứng dụng React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md)>) cho ứng dụng Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md)>) cho ứng dụng Vite

Nó cũng hoạt động mượt mà với bất kỳ giải pháp quốc tế hóa nào trên nhiều môi trường khác nhau, bao gồm trình duyệt và các yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện locale thông qua headers hoặc cookies:

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
  // ... Các tuỳ chọn cấu hình khác
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
  // ... Các tuỳ chọn cấu hình khác
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Mặc định, `fastify-intlayer` sẽ sử dụng header `Accept-Language` để xác định ngôn ngữ ưu tiên của client.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy xem [tài liệu của chúng tôi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Cấu hình TypeScript

`fastify-intlayer` tận dụng khả năng mạnh mẽ của TypeScript để cải thiện quá trình quốc tế hóa. Hệ thống kiểu tĩnh của TypeScript đảm bảo mọi translation key đều được kiểm kê, giảm nguy cơ thiếu bản dịch và cải thiện khả năng bảo trì.

Đảm bảo các kiểu được tự động sinh (mặc định tại ./types/intlayer.d.ts) được bao gồm trong file tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tự động sinh
  ],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước trực tiếp** nội dung đã dịch ngay trong trình soạn thảo.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

### Cấu hình Git

Nên bỏ qua các tệp do Intlayer tạo ra. Điều này giúp bạn tránh commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được Intlayer tạo ra
.intlayer
```

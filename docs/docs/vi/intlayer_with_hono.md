---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: i18n Hono - Cách dịch ứng dụng Hono của bạn – hướng dẫn 2026
description: Khám phá cách làm cho backend Hono của bạn đa ngôn ngữ. Làm theo tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Thêm lệnh init
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch website backend Hono của bạn bằng Intlayer | Quốc tế hóa (i18n)

`hono-intlayer` là một middleware quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng Hono, được thiết kế để làm cho các dịch vụ backend của bạn có thể truy cập toàn cầu bằng cách cung cấp các phản hồi được bản địa hóa dựa trên sở thích của khách hàng.

### Các trường hợp sử dụng thực tế

- **Hiển thị lỗi backend bằng ngôn ngữ của người dùng**: Khi xảy ra lỗi, việc hiển thị thông báo bằng tiếng mẹ đẻ của người dùng sẽ giúp họ dễ hiểu hơn và giảm bớt sự khó chịu. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần front-end như toast hoặc modal.

- **Truy xuất nội dung đa ngôn ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, quốc tế hóa đảm bảo rằng bạn có thể cung cấp nội dung này bằng nhiều ngôn ngữ. Điều này rất quan trọng đối với các nền tảng như trang web thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài báo và nội dung khác bằng ngôn ngữ ưa thích của người dùng.

- **Gửi email đa ngôn ngữ**: Cho dù đó là email giao dịch, chiến dịch tiếp thị hay thông báo, việc gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể mức độ tương tác và hiệu quả.

- **Thông báo đẩy đa ngôn ngữ**: Đối với các ứng dụng di động, việc gửi thông báo đẩy bằng ngôn ngữ ưa thích của người dùng có thể tăng cường tương tác và giữ chân họ. Sự tiếp xúc cá nhân này có thể làm cho các thông báo trở nên phù hợp và dễ thực hiện hơn.

- **Các hình thức liên lạc khác**: Bất kỳ hình thức liên lạc nào từ backend, chẳng hạn như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều được hưởng lợi từ việc sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm tổng thể của người dùng.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng sự khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, đây là một bước quan trọng trong việc mở rộng quy mô dịch vụ của bạn trên toàn thế giới.

## Bắt đầu

### Cài đặt

Để bắt đầu sử dụng `hono-intlayer`, hãy cài đặt gói bằng npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### Thiết lập

Cấu hình cài đặt quốc tế hóa bằng cách tạo tệp `intlayer.config.ts` trong thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.VIETNAMESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Thiết lập ứng dụng Hono

Thiết lập ứng dụng Hono của bạn để sử dụng `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Tải trình xử lý yêu cầu quốc tế hóa
app.use("*", intlayer());

// Các tuyến đường
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Khả năng tương thích

`hono-intlayer` tương thích hoàn toàn với:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md) cho các ứng dụng React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md) cho các ứng dụng Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md) cho các ứng dụng Vite

Nó cũng hoạt động trơn tru với bất kỳ giải pháp quốc tế hóa nào trên các môi trường khác nhau, bao gồm trình duyệt và yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện ngôn ngữ thông qua tiêu đề hoặc cookie:

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

Theo mặc định, `hono-intlayer` sẽ diễn giải tiêu đề `Accept-Language` để xác định ngôn ngữ ưa thích của khách hàng.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu của chúng tôi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Cấu hình TypeScript

`hono-intlayer` tận dụng khả năng mạnh mẽ của TypeScript để tăng cường quy trình quốc tế hóa. Việc nhập tĩnh của TypeScript đảm bảo rằng mọi khóa dịch đều được tính đến, giảm thiểu rủi ro thiếu bản dịch và cải thiện khả năng bảo trì.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Hãy đảm bảo các kiểu tự động tạo (mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu tự động tạo
  ],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội tuyến** nội dung đã dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Cấu hình Git

Khuyên bạn nên bỏ qua các tệp do Intlayer tạo ra. Điều này cho phép bạn tránh việc commit chúng vào kho lưu trữ Git của mình.

Để thực hiện việc này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp do Intlayer tạo ra
.intlayer
```

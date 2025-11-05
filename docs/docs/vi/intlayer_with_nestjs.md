---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Cách dịch backend Nest của bạn – Hướng dẫn i18n 2025
description: Khám phá cách làm cho backend vite của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 5.8.0
    date: 2025-09-09
    changes: Tài liệu ban đầu
---

# Dịch website backend Nest của bạn bằng Intlayer | Quốc tế hóa (i18n)

`express-intlayer` là một middleware quốc tế hóa (i18n) mạnh mẽ dành cho các ứng dụng Express, được thiết kế để làm cho các dịch vụ backend của bạn có thể truy cập toàn cầu bằng cách cung cấp các phản hồi được địa phương hóa dựa trên sở thích của khách hàng. Vì NestJS được xây dựng trên nền tảng Express, bạn có thể tích hợp liền mạch `express-intlayer` vào các ứng dụng NestJS của mình để xử lý nội dung đa ngôn ngữ một cách hiệu quả.

Các trường hợp sử dụng thực tế

- **Hiển thị lỗi backend bằng ngôn ngữ của người dùng**: Khi xảy ra lỗi, việc hiển thị thông báo bằng ngôn ngữ mẹ đẻ của người dùng giúp cải thiện sự hiểu biết và giảm bớt sự khó chịu. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần front-end như toast hoặc modal.

- **Truy xuất nội dung đa ngôn ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ khác nhau. Điều này rất quan trọng đối với các nền tảng như trang thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài viết và các nội dung khác theo ngôn ngữ mà người dùng ưu tiên.

- **Gửi email đa ngôn ngữ**: Dù là email giao dịch, chiến dịch marketing hay thông báo, việc gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể sự tương tác và hiệu quả.

- **Thông báo đẩy đa ngôn ngữ**: Đối với các ứng dụng di động, việc gửi thông báo đẩy bằng ngôn ngữ ưu tiên của người dùng có thể tăng cường tương tác và giữ chân người dùng. Sự chăm chút cá nhân này giúp các thông báo trở nên phù hợp và dễ hành động hơn.

- **Các hình thức giao tiếp khác**: Bất kỳ hình thức giao tiếp nào từ backend, như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều được hưởng lợi khi sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm tổng thể của người dùng.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng sự khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, trở thành bước quan trọng trong việc mở rộng dịch vụ của bạn trên toàn thế giới.

## Bắt đầu

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nestjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-nestjs-template) trên GitHub.

### Tạo một Dự án NestJS mới

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Cài đặt

Để bắt đầu sử dụng `express-intlayer`, cài đặt gói bằng npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Cấu hình tsconfig.json

Để sử dụng Intlayer với TypeScript, hãy đảm bảo rằng `tsconfig.json` của bạn được thiết lập để hỗ trợ các module ES. Bạn có thể làm điều này bằng cách đặt các tùy chọn `module` và `moduleResolution` thành `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... các tùy chọn khác
  },
}
```

### Thiết lập

Cấu hình các thiết lập quốc tế hóa bằng cách tạo một file `intlayer.config.ts` trong thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Khai Báo Nội Dung Của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](/doc/concept/content).

### Cài Đặt Middleware Express

Tích hợp middleware `express-intlayer` vào ứng dụng NestJS của bạn để xử lý đa ngôn ngữ:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Áp dụng cho tất cả các route
  }
}
```

### Sử Dụng Bản Dịch Trong Các Service hoặc Controller Của Bạn

Bạn có thể sử dụng hàm `getIntlayer` để truy cập các bản dịch trong các service hoặc controller của bạn:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // Trả về lời chào từ bản dịch
  }
}
```

### Tương Thích

`express-intlayer` hoàn toàn tương thích với:

- [`react-intlayer`](/doc/packages/react-intlayer) cho các ứng dụng React
- [`next-intlayer`](/doc/packages/next-intlayer) cho các ứng dụng Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) cho các ứng dụng Vite

Nó cũng hoạt động mượt mà với bất kỳ giải pháp quốc tế hóa nào trên nhiều môi trường khác nhau, bao gồm cả trình duyệt và các yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện locale thông qua headers hoặc cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Các tùy chọn cấu hình khác
  middleware: {
    headerName: "my-locale-header", // Tên header để phát hiện locale
    cookieName: "my-locale-cookie", // Tên cookie để phát hiện locale
  },
};

export default config;
```

Mặc định, `express-intlayer` sẽ giải thích header `Accept-Language` để xác định ngôn ngữ ưu tiên của client.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu](/doc/concept/configuration).

### Cấu hình TypeScript

`express-intlayer` tận dụng khả năng mạnh mẽ của TypeScript để nâng cao quá trình quốc tế hóa. Kiểu tĩnh của TypeScript đảm bảo rằng mọi khóa dịch đều được tính đến, giảm thiểu rủi ro thiếu bản dịch và cải thiện khả năng bảo trì.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo các kiểu được tự động tạo (mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  include: [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tự động tạo
  ],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

### Cấu hình Git

Nên bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Analog i18n - Cách dịch ứng dụng Analog năm 2026
description: Khám phá cách làm cho ứng dụng Analog của bạn hỗ trợ đa ngôn ngữ. Làm theo tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer-analog-template
history:
  - version: 8.0.4
    date: 2026-01-26
    changes: "Khởi tạo lịch sử"
---

# Dịch ứng dụng Analog (Angular) của bạn bằng Intlayer | Quốc tế hóa (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-analog-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) nguồn mở sáng tạo được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý các bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ thành phần.
- **Bản địa hóa động các siêu dữ liệu**, các tuyến đường và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu dữ liệu được tự động tạo, cải thiện khả năng tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, như phát hiện và chuyển đổi ngôn ngữ động.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Analog

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-analog-template) trên GitHub.

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer vite-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
bunx intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **angular-intlayer**
  Gói tích hợp Intlayer với ứng dụng Angular. Nó cung cấp các trình cung cấp ngữ cảnh (context providers) và các hook cho quốc tế hóa Angular.

- **vite-intlayer**
  Gói tích hợp Intlayer với Vite. Nó cung cấp một plugin để xử lý các tệp khai báo nội dung và thiết lập các bí danh (aliases) để đạt hiệu suất tối ưu.

### Bước 2: Cấu hình dự án của bạn

Tạo một tệp cấu hình để thiết lập các ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL được bản địa hóa, chuyển hướng trung gian (middleware redirection), tên cookie, vị trí và phần mở rộng của các khai báo nội dung của bạn, tắt nhật ký Intlayer trong bảng điều khiển, và nhiều hơn nữa. Để biết danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Để tích hợp Intlayer với Analog, bạn cần sử dụng plugin `vite-intlayer`.

Sửa đổi tệp `vite.config.ts` của bạn:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer(), // Thêm plugin Intlayer
  ],
}));
```

> Plugin `intlayer()` cấu hình Vite với Intlayer. Nó xử lý các tệp khai báo nội dung và thiết lập các bí danh để đạt hiệu suất tối ưu.

### Bước 4: Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
      vi: "Xin chào",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
      vi: "Chúc mừng! Ứng dụng của bạn đang chạy. 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng Intlayer trong mã của bạn

Để sử dụng các tính năng quốc tế hóa của Intlayer trong suốt ứng dụng Analog của bạn, bạn cần cung cấp Intlayer trong cấu hình ứng dụng của mình.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // Thêm trình cung cấp Intlayer tại đây
  ],
};
```

Sau đó, bạn có thể sử dụng hàm `useIntlayer` trong bất kỳ thành phần nào.

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

Nội dung Intlayer được trả về dưới dạng một `Signal`, vì vậy bạn truy cập các giá trị bằng cách gọi signal: `content().title`.

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hàm `useLocale`. Điều này cho phép bạn thiết lập ngôn ngữ của ứng dụng và cập nhật nội dung tương ứng.

Tạo một thành phần để chuyển đổi giữa các ngôn ngữ:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Sau đó, sử dụng thành phần này trong các trang của bạn:

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

### Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng các lợi ích của TypeScript và làm cho mã nguồn của bạn mạnh mẽ hơn.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu dữ liệu được tự động tạo.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện tại của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu dữ liệu được tự động tạo
  ],
}
```

### Cấu hình Git

Khuyên dùng bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh việc commit chúng vào kho lưu trữ Git của mình.

Để thực hiện việc này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```bash
#  Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội tuyến** nội dung đã dịch.
- **Các hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

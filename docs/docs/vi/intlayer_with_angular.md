---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Angular i18n - Cách dịch ứng dụng Angular của bạn – hướng dẫn 2026
description: Khám phá cách làm cho trang web Angular của bạn đa ngôn ngữ. Làm theo tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Thêm lệnh init
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Angular của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở, sáng tạo được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý các bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ thành phần.
- **Bản địa hóa động siêu dữ liệu (metadata)**, các tuyến đường (routes) và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu dữ liệu được tự động tạo, cải thiện khả năng tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, như tự động phát hiện và chuyển đổi ngôn ngữ.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Angular

<Tabs defaultTab="code">
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-angular-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-angular-template) trên GitHub.

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-webpack --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-webpack --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-webpack --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-webpack --dev
bunx intlayer init
```

- **intlayer**

  Gói cốt lõi cung cả các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), chuyển đổi mã (transpilation) và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **angular-intlayer**
  Gói tích hợp Intlayer với ứng dụng Angular. Nó cung cấp các trình cung cấp ngữ cảnh (context providers) và các hook cho quốc tế hóa Angular.

- **@angular-builders/custom-webpack**
  Yêu cầu để tùy chỉnh cấu hình Webpack của Angular CLI.

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

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL được bản địa hóa, điều hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt nhật ký Intlayer trong bảng điều khiển, v.v. Để biết danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Angular của bạn

Để tích hợp Intlayer với Angular CLI, bạn cần sử dụng một trình xây dựng (builder) tùy chỉnh. Hướng dẫn này giả định bạn đang sử dụng Webpack (mặc định cho nhiều dự án Angular).

Đầu tiên, sửa đổi tệp `angular.json` của bạn để sử dụng trình xây dựng Webpack tùy chỉnh. Cập nhật các cấu hình `build` và `serve`:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser", // replace "@angular-devkit/build-angular:application",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts",
              "mergeStrategies": { "module.rules": "prepend" },
            },
            "main": "src/main.ts", // replace "browser": "src/main.ts",
            // ...
          },
        },
      },
    },
  },
}
```

> Đảm bảo thay thế `your-app-name` bằng tên thực tế của dự án bạn trong `angular.json`.

Tiếp theo, tạo một tệp `webpack.config.ts` tại thư mục gốc của dự án:

```typescript fileName="webpack.config.ts"
import { mergeConfig } from "angular-intlayer/webpack";

export default mergeConfig({});
```

> Hàm `mergeConfig` cấu hình Webpack với Intlayer. Nó chèn `IntlayerWebpackPlugin` (để xử lý các tệp khai báo nội dung) và thiết lập các biệt danh (aliases) để đạt hiệu suất tối ưu.

### Bước 4: Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre với các Tutoriels",
      es: "Aprender với các Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`) và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Bước 5: Sử dụng Intlayer trong mã của bạn

Để sử dụng các tính năng quốc tế hóa của Intlayer trong toàn bộ ứng dụng Angular của bạn, bạn cần cung cấp Intlayer trong cấu hình ứng dụng.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Thêm provider Intlayer tại đây
  ],
};
```

Sau đó, bạn có thể sử dụng hàm `useIntlayer` bên trong bất kỳ thành phần (component) nào.

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

Và trong template của bạn:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Nội dung Intlayer được trả về dưới dạng một `Signal`, vì vậy bạn truy cập các giá trị bằng cách gọi signal đó: `content().title`.

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ nội dung của bạn

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
  styles: [
    `
      .locale-switcher {
        margin: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: fit-content;
      }
    `,
  ],
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Sau đó, sử dụng thành phần này trong `app.component.ts` của bạn:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

### Cấu hình TypeScript

Intlayer sử dụng tăng cường mô-đun (module augmentation) để tận dụng lợi ích của TypeScript và giúp mã nguồn của bạn mạnh mẽ hơn.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu dữ liệu được tự động tạo.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu dữ liệu được tạo tự động
  ],
}
```

### Cấu hình Git

Khuyên dùng bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho lưu trữ Git của mình.

Để thực hiện việc này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước trực tiếp** nội dung đã dịch.
- **Các hành động nhanh (Quick actions)** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Đi xa hơn

Để tìm hiểu thêm, bạn có thể triển khai [trình chỉnh sửa trực quan (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) hoặc xuất nội dung của bạn bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

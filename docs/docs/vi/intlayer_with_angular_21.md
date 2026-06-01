---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: Angular i18n - Hướng dẫn đầy đủ để dịch Angular 21
description: Giải pháp tốt nhất cho kích thước bundle, SEO, hiệu suất & khả năng bảo trì. Làm cho Angular 21 ứng dụng của bạn đa ngôn ngữ vào năm 2026, dịch thuật LLM, Agent Skills & MCP.
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
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật sử dụng API Solid useIntlayer để truy cập trực tiếp vào thuộc tính"
  - version: 8.0.0
    date: 2026-01-26
    changes: "Phát hành phiên bản ổn định"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Lịch sử ban đầu"
---

# Dịch trang web Angular 21 (Vite) của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `ngx-translate` hay `angular-l10n`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

**Bảo hiểm góc đầy đủ**

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Angular bằng cách cung cấp **phạm vi nội dung cấp thành phần**, **bản dịch được tải từng phần** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

**Kích thước bundle**

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm tới 50% kích thước bundle và kích thước trang**.

**Khả năng bảo trì**

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

**Đại lý AI**

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

**Tự động hóa**

Sử dụng tính năng tự động hóa để dịch trong quy trình CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí do nhà cung cấp AI của bạn chi trả. Intlayer cũng cung cấp **trình biên dịch** để tự động trích xuất nội dung cũng như [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

**Hiệu suất**

Việc kết nối các tệp JSON lớn với các thành phần có thể dẫn đến các vấn đề về hiệu suất và khả năng phản hồi. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build.

**Mở rộng quy mô không có nhà phát triển**

Không chỉ là giải pháp i18n, Intlayer còn cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình trong **thời gian thực**, giúp việc cộng tác với người dịch, người viết quảng cáo và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong một Ứng dụng Angular

<Tabs defaultTab="code">
  <Tab label="Mã" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-angular-21-template) trên GitHub.

### Bước 1: Cài đặt các gói phụ thuộc

Cài đặt các gói cần thiết bằng cách sử dụng npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
bun x intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho việc quản lý cấu hình, bản dịch, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã (transpilation), và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **angular-intlayer**
  Gói giúp tích hợp Intlayer vào ứng dụng Angular. Nó cung cấp các context providers và hooks cho quốc tế hóa trong Angular.

- **@angular-builders/custom-esbuild**
  Bắt buộc để tùy chỉnh cấu hình esbuild của Angular CLI.

### Bước 2: Cấu hình dự án của bạn

Tạo một tập tin cấu hình để thiết lập ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL được địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng cho các khai báo nội dung của bạn, vô hiệu hóa nhật ký Intlayer trong bảng điều khiển và hơn thế nữa. Để xem danh sách đầy đủ các thông số khả dụng, tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào Cấu hình Angular của bạn

Để tích hợp Intlayer với Angular CLI, bạn cần sử dụng một builder tùy chỉnh. Hướng dẫn này giả định bạn đang sử dụng Vite/esbuild (mặc định cho các dự án Angular 21).

Trước tiên, sửa đổi tập tin `angular.json` của bạn để sử dụng builder esbuild tùy chỉnh. Cập nhật cấu hình `build` và `serve`:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> Hãy chắc chắn thay thế `your-app-name` bằng tên thực tế của dự án của bạn trong tệp `angular.json`.

Tiếp theo, hãy tạo một tệp `esbuild.plugins.ts` ở thư mục gốc của dự án:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> Hàm `intlayerEsbuildPlugin` sẽ cấu hình esbuild cho Intlayer. Nó nhúng plugin để xử lý các tập tin khai báo nội dung và thiết lập các cấu hình tối ưu hiệu suất.

> **Người dùng NX**: Các trình xây dựng Angular của NX tải các tệp plugin thông qua độ phân giải ESM gốc của Node và không biên dịch các tệp plugin TypeScript trực tiếp. Thay vào đó, hãy sử dụng tệp `.mjs` và cập nhật tham chiếu `plugins` trong `angular.json` tương ứng:
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> Sau đó, trong `angular.json`, hãy trỏ đến `"./esbuild.plugins.mjs"` thay vì `"./esbuild.plugins.ts"`.

### Bước 4: Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ bản dịch:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
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

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng miễn là chúng nằm trong thư mục `contentDir` (mặc định là `./src`). Và chúng phải có phần mở rộng file phù hợp với quy định về khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng Intlayer trong Mã của bạn

Để khai thác các tính năng quốc tế hóa của Intlayer trên toàn bộ ứng dụng Angular của bạn, bạn cần cung cấp (provide) Intlayer trong cấu hình ứng dụng.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Thêm provider cho Intlayer tại đây
  ],
};
```

Sau đó, bạn có thể sử dụng hàm `useIntlayer` bên trong bất kỳ component nào.

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

Nội dung của Intlayer được trả về dưới dạng `Signal`, vì vậy bạn truy cập các giá trị bằng cách gọi tín hiệu (signal): `content().title`.

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ cho nội dung của bạn

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hàm `useLocale`. Nó cho phép bạn cài đặt ngôn ngữ cho ứng dụng và nội dung sẽ tự động cập nhật theo.

Tạo một component để chuyển đổi giữa các ngôn ngữ:

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

Sau đó, sử dụng component này trong tệp `app.component.ts` của bạn:

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

Intlayer tận dụng Module Augmentation để nhận được những lợi ích từ TypeScript và làm cho cơ sở mã của bạn mạnh mẽ hơn.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Hãy chắc chắn rằng cấu hình TypeScript của bạn bao gồm các loại (types) được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện tại của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại tự động được tạo
  ],
}
```

### Cấu hình Git

Chúng tôi khuyên bạn nên bỏ qua các tệp do Intlayer tạo ra. Điều này giúp bạn tránh commit chúng vào kho lưu trữ Git.

Để thực hiện, bạn có thể thêm hướng dẫn sau vào tệp `.gitignore`:

```bash
# Bỏ qua các tệp do Intlayer tạo ra
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng VS Code chính thức của Intlayer**.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích này cung cấp:

- **Tự động hoàn thành (Autocompletion)** cho các khóa dịch (translation keys).
- **Phát hiện lỗi theo thời gian thực** đối với các bản dịch bị thiếu.
- **Xem trước nội dung ngay trong dòng** cho các nội dung đã dịch.
- **Thao tác nhanh** dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích, hãy tham khảo [tài liệu tiện ích mở rộng VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Đi xa hơn

Để đi xa hơn nữa, bạn có thể triển khai [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc externalize (đưa ra ngoài) nội dung của bạn bằng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---

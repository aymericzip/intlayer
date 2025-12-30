---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Cách dịch ứng dụng Angular của bạn – Hướng dẫn i18n 2026
description: Khám phá cách làm cho trang web Angular của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
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
# applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Thêm lệnh init
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Angular của bạn bằng Intlayer | Quốc tế hóa (i18n)

> Gói này đang trong quá trình phát triển. Xem [vấn đề](https://github.com/aymericzip/intlayer/issues/116) để biết thêm thông tin. Thể hiện sự quan tâm của bạn đến Intlayer cho Angular bằng cách like vấn đề này

<!-- Xem [Application Template](https://github.com/aymericzip/intlayer-angular-template) trên GitHub. -->

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Định vị động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tạo tự động, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.

---

## Hướng Dẫn Từng Bước Để Cài Đặt Intlayer Trong Ứng Dụng Angular

### Bước 1: Cài Đặt Các Phụ Thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/webpack
bunx intlayer init
```

- **intlayer**

- Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **angular-intlayer**
  Gói tích hợp Intlayer với ứng dụng Angular. Nó cung cấp các context provider và hook cho quốc tế hóa trong Angular.

- **@intlayer/webpack**

  Gói tích hợp Intlayer với Webpack. Nó được Angular CLI sử dụng để xây dựng các file khai báo nội dung và giám sát chúng trong chế độ phát triển.

### Bước 2: Cấu hình dự án của bạn

Tạo một file cấu hình để thiết lập các ngôn ngữ cho ứng dụng của bạn:

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

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào Cấu hình Angular của Bạn

Để tích hợp Intlayer với Angular CLI, bạn có hai lựa chọn tùy thuộc vào builder bạn sử dụng: `esbuild` hoặc `webpack`.

#### Lựa chọn 1: Sử dụng esbuild (Khuyến nghị)

Đầu tiên, chỉnh sửa tệp `angular.json` của bạn để sử dụng builder esbuild tùy chỉnh. Cập nhật cấu hình `build`:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
```

> Hãy chắc chắn thay thế `your-app-name` bằng tên thực tế của dự án bạn trong `angular.json`.

Tiếp theo, tạo một tệp `esbuild/intlayer-plugin.ts` trong thư mục gốc của dự án của bạn:

```typescript fileName="esbuild/intlayer-plugin.ts"
import { prepareIntlayer, watch } from "@intlayer/chokidar";
import { getConfiguration, logger } from "@intlayer/config";
import type { Plugin } from "esbuild";

const intlayer: Plugin = {
  name: "intlayer-esbuild-plugin",
  setup(build) {
    const configuration = getConfiguration();
    let isWatching = false;

    build.onStart(async () => {
      logger("Plugin esbuild Intlayer đã bắt đầu", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("Chế độ Watch được bật. Bắt đầu watcher...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Lỗi trong plugin esbuild Intlayer: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> `intlayer` cho esbuild đảm bảo rằng Intlayer được chuẩn bị trước khi quá trình build bắt đầu và theo dõi các thay đổi trong chế độ phát triển.

#### Lựa chọn 2: Sử dụng Webpack

Trước tiên, chỉnh sửa tệp `angular.json` của bạn để sử dụng custom Webpack builder. Cập nhật các cấu hình `build` và `serve`:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server"
        }
      }
    }
  }
}
```

> Hãy chắc chắn thay thế `your-app-name` bằng tên thực tế của dự án bạn trong `angular.json`.

Tiếp theo, tạo một tệp `webpack.config.js` ở thư mục gốc của dự án:

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> `IntlayerWebpackPlugin` được sử dụng để tích hợp Intlayer với Webpack. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng. Ngoài ra, nó cung cấp các alias để tối ưu hiệu suất.

### Bước 4: Khai Báo Nội Dung Của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

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
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "Tài liệu CLI",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Công cụ phát triển Angular",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và phải phù hợp với phần mở rộng của tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng Intlayer trong Mã của Bạn

Để sử dụng các tính năng quốc tế hóa của Intlayer trong toàn bộ ứng dụng Angular của bạn, bạn cần sử dụng hàm `useIntlayer` trong một component. Hàm này, có sẵn từ `angular-intlayer`, cung cấp quyền truy cập vào các bản dịch của bạn dưới dạng các tín hiệu phản ứng (reactive signals).

`IntlayerProvider` đã được đăng ký ở gốc của ứng dụng, vì vậy bạn không cần thêm nó vào providers của module.

Truy cập các từ điển nội dung trong lớp component của bạn:

```typescript fileName="src/app/hello-world.component.ts"
import { Component, signal } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-hello-world",
  standalone: true,
  template: `
    <h1>{{ content().title }}</h1>

    <div class="card">
      <button type="button" (click)="increment()">
        {{ content().count }} {{ count() }}
      </button>
      <p [innerHTML]="content().edit"></p>
    </div>

    <p class="read-the-docs">{{ content().readTheDocs }}</p>
  `,
})
export class HelloWorldComponent {
  content = useIntlayer("helloworld");
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
```

Nội dung Intlayer được trả về dưới dạng một `Signal`, vì vậy bạn truy cập các giá trị bằng cách gọi tín hiệu trong template của bạn: `content().title`.

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung của bạn

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hàm `useLocale`. Điều này cho phép bạn thiết lập locale của ứng dụng và cập nhật nội dung tương ứng.

Tạo một component để chuyển đổi giữa các ngôn ngữ:

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { getLocaleName } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeInfo = useLocale();
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // Phơi bày getLocaleName cho template
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

Sau đó, sử dụng component này trong `app.component.ts` của bạn:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { HelloWorldComponent } from "./hello-world.component";
import { LocaleSwitcherComponent } from "./components/locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HelloWorldComponent, LocaleSwitcherComponent],
  template: `
    <div>
      <app-locale-switcher />
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Logo Vite" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Logo Angular"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
```

### (Tùy chọn) Bước 7: Thêm định tuyến có địa phương hóa cho ứng dụng của bạn

Thêm định tuyến có địa phương hóa trong ứng dụng Angular bao gồm việc sử dụng Angular Router với các tiền tố locale. Điều này tạo ra các tuyến đường duy nhất cho mỗi ngôn ngữ, rất hữu ích cho SEO.

Ví dụ:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Trước tiên, hãy đảm bảo bạn đã cài đặt `@angular/router`.

Sau đó, tạo cấu hình router xử lý định tuyến theo locale trong `app.routes.ts`.

```typescript fileName="src/app/app.routes.ts"
import { Routes } from "@angular/router";
import { configuration, localeFlatMap } from "intlayer";
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root/root.component";

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  localeFlatMap((localizedData) => [
    {
      path: `${localizedData.urlPrefix}`,
      component: RootComponent,
      data: { locale: localizedData.locale },
    },
    {
      path: `${localizedData.urlPrefix}/home`,
      component: HomeComponent,
      data: { locale: localizedData.locale },
    },
  ]),
  { path: "**", redirectTo: `/${defaultLocale}/home` },
];
```

Sau đó, bạn cần cung cấp router trong `app.config.ts` của bạn.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (Tùy chọn) Bước 8: Thay đổi URL khi locale thay đổi

Để tự động cập nhật URL khi người dùng thay đổi ngôn ngữ, bạn có thể sửa đổi component `LocaleSwitcher` để sử dụng Router của Angular:

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });

  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

### (Tùy chọn) Bước 9: Chuyển đổi thuộc tính Ngôn ngữ và Hướng của thẻ HTML

Khi ứng dụng của bạn hỗ trợ nhiều ngôn ngữ, việc cập nhật thuộc tính `lang` và `dir` của thẻ `<html>` để phù hợp với locale hiện tại là rất quan trọng.

Bạn có thể tạo một service để xử lý việc này một cách tự động.

```typescript fileName="src/app/services/i18n-html-attributes.service.ts"
import { Injectable, effect } from "@angular/core";
import { useLocale } from "angular-intlayer";
import { getHTMLTextDir } from "intlayer";

@Injectable({
  providedIn: "root",
})
export class I18nHtmlAttributesService {
  private localeInfo = useLocale();

  constructor() {
    effect(() => {
      const newLocale = this.localeInfo.locale();
      if (newLocale) {
        document.documentElement.lang = newLocale; // Cập nhật thuộc tính lang của thẻ html
        document.documentElement.dir = getHTMLTextDir(newLocale); // Cập nhật thuộc tính dir của thẻ html dựa trên ngôn ngữ
      }
    });
  }

  // Phương thức này có thể được gọi trong component gốc của ứng dụng để đảm bảo dịch vụ được khởi tạo.
  init() {}
}
```

Sau đó, tiêm và khởi tạo dịch vụ này trong `AppComponent` chính của bạn:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... các import khác
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ...
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init(); // Khởi tạo dịch vụ thuộc tính HTML i18n
  }
}
```

### (Tùy chọn) Bước 10: Tạo Directive Liên Kết Đa Ngôn Ngữ

Để đảm bảo điều hướng trong ứng dụng của bạn tuân thủ ngôn ngữ hiện tại, bạn có thể tạo một directive tùy chỉnh. Directive này tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ.

```typescript fileName="src/app/directives/localized-link.directive.ts"
import { Directive, Input, HostBinding, inject } from "@angular/core";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";

@Directive({
  selector: "a[appLocalizedLink]",
  standalone: true,
})
export class LocalizedLinkDirective {
  @Input("href") originalHref: string = "";

  private localeInfo = useLocale();

  @HostBinding("href")
  get localizedHref(): string {
    const locale = this.localeInfo.locale();
    const isExternalLink = /^https?:\/\//.test(this.originalHref);

    if (isExternalLink || !this.originalHref) {
      return this.originalHref;
    }

    return getLocalizedUrl(this.originalHref, locale);
  }
}
```

Để sử dụng, thêm directive `appLocalizedLink` vào các thẻ anchor của bạn và đảm bảo import nó trong component của bạn.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Trang chủ</a> `,
})
export class AppComponent {}
```

### (Tùy chọn) Bước 11: Hiển thị Markdown

Intlayer hỗ trợ hiển thị nội dung Markdown. Để chuyển đổi Markdown thành HTML phong phú, bạn có thể tích hợp [markdown-it](https://github.com/markdown-it/markdown-it).

Trước tiên, cài đặt `markdown-it`:

```bash
npm install markdown-it
# và các kiểu của nó
npm install -D @types/markdown-it
```

Tiếp theo, cấu hình `INTLAYER_MARKDOWN_TOKEN` trong file `app.config.ts` của bạn.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    createIntlayerMarkdownProvider((markdown) => md.render(markdown)),
  ],
};
```

Mặc định, Intlayer sẽ trả về HTML đã được render dưới dạng chuỗi. Nếu bạn sử dụng `[innerHTML]` để liên kết, hãy lưu ý các vấn đề bảo mật (XSS). Luôn đảm bảo nội dung của bạn đến từ nguồn tin cậy.

Đối với các trường hợp phức tạp hơn, bạn có thể tạo một pipe để render HTML một cách an toàn.

### Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng các lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
  ],
}
```

### Cấu hình Git

Khuyến nghị nên bỏ qua các file được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Đi xa hơn

Để đi xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---

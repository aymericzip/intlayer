---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Di chuyển từ ngx-translate sang Intlayer"
description: "Di chuyển ứng dụng Angular từ ngx-translate sang Intlayer từng bước. Giữ cho pipe translate, directive translate và TranslateService tiếp tục hoạt động với compat adapter @intlayer/ngx-translate."
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Di chuyển từ ngx-translate sang Intlayer

## Tại sao nên chuyển từ ngx-translate sang Intlayer?

<AccordionGroup>
<Accordion header="Không cần HTTP loader">

ngx-translate tải các file locale lúc runtime thông qua `TranslateHttpLoader`, làm chậm lần render đầu tiên. Intlayer biên dịch từ điển lúc build, nên bản dịch có sẵn ngay lập tức.

</Accordion>
<Accordion header="Khả năng bảo trì">

Các key **được định kiểu** theo từ điển của bạn: key không hợp lệ sẽ lỗi khi build. Nội dung có thể đặt cạnh các component sử dụng nó.

</Accordion>
<Accordion header="AI Agent">

Nội dung đặt cạnh component **giảm ngữ cảnh cần thiết** cho LLM. Intlayer cung cấp **CLI** để kiểm tra bản dịch còn thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[máy chủ MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)** và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**.

</Accordion>
<Accordion header="Tự động hóa">

Dịch các thông điệp còn thiếu trong pipeline CI/CD bằng LLM bạn chọn, hoặc chạy nền với [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

</Accordion>
<Accordion header="Mở rộng cùng người không phải lập trình viên">

Intlayer cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)** tự host và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để người dịch và copywriter chỉnh sửa nội dung theo thời gian thực.

</Accordion>
</AccordionGroup>

> Để hiểu các thư viện này đến từ đâu, hãy đọc [lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md).

## Chiến lược di chuyển

1. **Compat adapter (khuyến nghị cho ứng dụng hiện có)**: cài `@intlayer/ngx-translate`. Package này cung cấp cùng API với `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) và phục vụ thông điệp từ các từ điển Intlayer. Template của bạn giữ nguyên.
2. **Di chuyển hoàn toàn**: thay dần các lời gọi ngx-translate bằng `useIntlayer` từ `angular-intlayer` và các file `.content.ts` đặt cạnh component.

## Mục lục

<TOC/>

## Di chuyển nhanh

<Steps>
<Step number={1} title="Cài đặt dependency">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> Flag `--interactive` là tùy chọn. Hãy dùng `intlayer-cli init` nếu bạn là AI agent.

Lệnh này phát hiện môi trường của bạn và cài các package cần thiết, ví dụ:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> Giữ `@ngx-translate/core` đã cài: nó cung cấp kiểu TypeScript. Có thể gỡ `@ngx-translate/http-loader`.

</Step>
<Step number={2} title="Cấu hình Intlayer">

Trỏ plugin `syncJSON` tới các file bản dịch hiện có. Với một file cho mỗi namespace (`src/i18n/en/home.json`), mỗi file trở thành một từ điển:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate` được phân giải thành trường `title` của từ điển `home`. Nếu bạn dùng một file cho mỗi locale (`src/assets/i18n/en.json`) với các key lồng nhau, hãy dùng `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\`` thay thế: mỗi key cấp cao nhất trở thành một từ điển.

</Step>
<Step number={3} title="Thêm plugin esbuild">

Angular CLI chấp nhận plugin esbuild thông qua `@angular-builders/custom-esbuild`. Tạo một file plugin:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Sau đó tham chiếu nó trong `angular.json`:

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

Plugin chạy build Intlayer và phân giải `@ngx-translate/core` sang `@intlayer/ngx-translate`, không cần thay đổi file nguồn.

> Build bằng Vite (Analog)? Hãy dùng `ngxTranslateVitePlugin()` từ `@intlayer/ngx-translate/plugin` thay thế.

</Step>
<Step number={4} title="Gỡ HTTP loader">

Giữ `provideTranslateService()`, nhưng bỏ tùy chọn `loader`: thông điệp đến từ các từ điển Intlayer.

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> Bản dịch không còn đi qua loader, nên có thể gỡ `TranslateHttpLoader` và `@ngx-translate/http-loader`.

</Step>
</Steps>

Template và service của bạn tiếp tục hoạt động mà không cần thay đổi:

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## Di chuyển hoàn toàn

<Steps>
<Step number={5} title="Đổi tên import tường minh (tùy chọn)" isOptional={true}>

Plugin esbuild đã xử lý alias. Để thể hiện dependency một cách tường minh:

| Trước                                                           | Sau                                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Chuyển nội dung sang file .content.ts" isOptional={true}>

Các component mới có thể dùng nội dung Intlayer gốc, song song với các lời gọi ngx-translate hiện có. Đăng ký `provideIntlayer()` từ `angular-intlayer` cạnh `provideTranslateService()` trong `app.config.ts`, sau đó:

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
```

</Step>
<Step number={7} title="Bật dịch bằng AI" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Các bản dịch được điền sẽ ghi ngược lại vào các file JSON của bạn. Xem [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để cấu hình AI.

</Step>
</Steps>

## Những gì có thể xóa sau khi di chuyển

| File / mẫu                                        | Lý do không còn cần                      |
| ------------------------------------------------- | ---------------------------------------- |
| `TranslateHttpLoader` / loader tùy chỉnh          | Từ điển được Intlayer biên dịch và tải.  |
| `@ngx-translate/http-loader`                      | Không còn tải file bản dịch lúc runtime. |
| `provideHttpClient()` (nếu chỉ dùng cho bản dịch) | Cùng lý do.                              |

## Cấu hình TypeScript

Thêm các kiểu được sinh ra vào `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Cấu hình Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/ngx-translate.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md)
- [Intlayer với Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular_21.md)
- [Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)

---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Lit - Cách dịch ứng dụng Lit vào năm 2026
description: Khám phá cách làm cho trang web Vite và Lit của bạn hỗ trợ đa ngôn ngữ. Làm theo tài liệu để quốc tế hóa (i18n) và dịch thuật.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Dịch trang web Vite và Lit của bạn bằng Intlayer | Quốc tế hóa (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-lit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý các bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ thành phần.
- **Bản địa hóa động metadata**, route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tạo tự động, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, như phát hiện và chuyển đổi ngôn ngữ động.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Vite và Lit

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển đổi mã và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **lit-intlayer**
  Gói tích hợp Intlayer với các ứng dụng Lit. Nó cung cấp các hook dựa trên `ReactiveController` (`useIntlayer`, `useLocale`, v.v.) để các LitElement tự động render lại khi ngôn ngữ thay đổi.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

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

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL bản địa hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt nhật ký Intlayer trong console, và nhiều hơn nữa. Để biết danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó xác định các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các alias để tối ưu hóa hiệu suất.

### Bước 4: Khởi động Intlayer trong điểm đầu vào (entry point) của bạn

Gọi `installIntlayer()` **trước khi** bất kỳ custom element nào được đăng ký để đối tượng ngôn ngữ toàn cầu (global locale singleton) sẵn sàng khi phần tử đầu tiên kết nối.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// Phải được gọi trước khi bất kỳ LitElement nào được kết nối với DOM.
installIntlayer();

// Nhập và đăng ký các custom element của bạn.
import "./my-element.js";
```

Nếu bạn cũng sử dụng khai báo nội dung `md()` (Markdown), hãy cài đặt thêm trình kết xuất markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

### Bước 5: Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite và Lit para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite và Lit para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite và Lit para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite và Lit para obtener más información"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`) và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 6: Sử dụng Intlayer trong LitElement của bạn

Sử dụng `useIntlayer` bên trong một `LitElement`. Nó trả về một proxy `ReactiveController` tự động kích hoạt render lại bất cứ khi nào ngôn ngữ hiện tại thay đổi — không cần thiết lập thêm.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer đăng ký chính nó như một ReactiveController.
  // Phần tử sẽ tự động render lại khi ngôn ngữ thay đổi.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> [!NOTE]
> Khi bạn cần chuỗi đã dịch trong một thuộc tính HTML gốc (ví dụ: `alt`, `aria-label`, `title`), hãy gọi `.value` trên nút lá:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> ```

### (Tùy chọn) Bước 7: Thay đổi ngôn ngữ của nội dung

Để thay đổi ngôn ngữ của nội dung, hãy sử dụng phương thức `setLocale` được cung cấp bởi controller `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (Tùy chọn) Bước 8: Render nội dung Markdown và HTML

Intlayer hỗ trợ các khai báo nội dung `md()` và `html()`. Trong Lit, đầu ra đã biên dịch được chèn dưới dạng HTML thô thông qua directive `unsafeHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Render HTML đã biên dịch trong phần tử của bạn:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` gọi `toString()` trên `IntlayerNode`, nó trả về chuỗi Markdown thô. Chuyển nó vào `compileMarkdown` để lấy chuỗi HTML, sau đó render bằng directive `unsafeHTML` của Lit.

### (Tùy chọn) Bước 9: Thêm Routing bản địa hóa vào ứng dụng của bạn

Để tạo các route duy nhất cho mỗi ngôn ngữ (hữu ích cho SEO), bạn có thể sử dụng một trình định tuyến phía máy khách cùng với các helper `localeMap` / `localeFlatMap` của Intlayer, và plugin Vite `intlayerProxy` để phát hiện ngôn ngữ phía máy chủ.

Đầu tiên, thêm `intlayerProxy` vào cấu hình Vite của bạn:

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

### (Tùy chọn) Bước 10: Thay đổi URL khi ngôn ngữ thay đổi

Để cập nhật URL trình duyệt khi ngôn ngữ thay đổi, hãy sử dụng `useRewriteURL` cùng với trình chuyển đổi ngôn ngữ:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // Tự động viết lại URL hiện tại khi ngôn ngữ thay đổi.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (Tùy chọn) Bước 11: Chuyển đổi các thuộc tính Language và Direction của HTML

Cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để khớp với ngôn ngữ hiện tại nhằm mục đích truy cập và SEO.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- nội dung của bạn -->`;
  }
}
```

### (Tùy chọn) Bước 12: Trích xuất nội dung của các component

Nếu bạn có một codebase hiện có, việc chuyển đổi hàng nghìn tệp có thể mất nhiều thời gian.

Để giảm bớt quá trình này, Intlayer đề xuất một [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi các component của bạn và trích xuất nội dung.

Để thiết lập, bạn có thể thêm một phần `compiler` trong tệp `intlayer.config.ts` của mình:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Các phần còn lại của cấu hình
  compiler: {
    /**
     * Cho biết liệu trình biên dịch có được bật hay không.
     */
    enabled: true,

    /**
     * Xác định đường dẫn tệp đầu ra
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Cho biết liệu các component có được lưu sau khi được chuyển đổi hay không.
     * Bằng cách đó, trình biên dịch có thể chỉ cần chạy một lần để chuyển đổi ứng dụng, sau đó nó có thể bị xóa.
     */
    saveComponents: false,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

### Cấu hình TypeScript

Đảm bảo rằng cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` và `useDefineForClassFields: false` là bắt buộc đối với Lit để hỗ trợ decorator.

### Cấu hình Git

Khuyên bạn nên bỏ qua các tệp do Intlayer tạo ra. Điều này cho phép bạn tránh việc commit chúng lên kho lưu trữ Git của mình.

Để thực hiện việc này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```bash
# Bỏ qua các tệp do Intlayer tạo ra
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước trực tuyến** nội dung đã dịch.
- **Các hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Tìm hiểu thêm

Để tìm hiểu sâu hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc bên thứ ba hóa nội dung của bạn bằng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

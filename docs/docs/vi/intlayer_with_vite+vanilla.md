---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - Cách dịch ứng dụng Vanilla JS vào năm 2026
description: Khám phá cách làm cho website Vite và Vanilla JS của bạn đa ngôn ngữ. Làm theo tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Dịch website Vite và Vanilla JS của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở và sáng tạo được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý các bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ thành phần.
- **Bản địa hóa động metadata**, route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu dữ liệu được tạo tự động, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Tận dụng các tính năng nâng cao**, như phát hiện và chuyển đổi ngôn ngữ động.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Vite và Vanilla JS

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển đổi mã nguồn và [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **vanilla-intlayer**
  Gói tích hợp Intlayer với các ứng dụng JavaScript / TypeScript thuần túy. Nó cung cấp một pub/sub singleton (`IntlayerClient`) và các hàm hỗ trợ dựa trên callback (`useIntlayer`, `useLocale`, v.v.) để bất kỳ phần nào trong ứng dụng của bạn cũng có thể phản ứng với các thay đổi ngôn ngữ mà không phụ thuộc vào framework UI.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

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

> Thông qua tệp cấu hình này, bạn có thể thiết lập URL được bản địa hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt log Intlayer trong console, và nhiều hơn nữa. Để biết danh sách đầy đủ các tham số khả dụng, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

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

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các alias để tối ưu hóa hiệu suất.

### Bước 4: Khởi tạo Intlayer trong entry point của bạn

Gọi `installIntlayer()` **trước khi** bất kỳ nội dung nào được render để ngôn ngữ singleton toàn cầu sẵn sàng.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Phải được gọi trước khi render bất kỳ nội dung i18n nào.
installIntlayer();

// Import và chạy các module ứng dụng của bạn.
import "./app.js";
```

Nếu bạn cũng sử dụng khai báo nội dung `md()` (Markdown), hãy cài đặt thêm trình render markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

### Bước 5: Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Nhấp vào logo Vite để tìm hiểu thêm",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Nhấp vào logo Vite để tìm hiểu thêm",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Nhấp vào logo Vite để tìm hiểu thêm",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Nhấp vào logo Vite để tìm hiểu thêm"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`) và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 6: Sử dụng Intlayer trong JavaScript của bạn

`vanilla-intlayer` ánh xạ API của `react-intlayer`: `useIntlayer(key, locale?)` trả về nội dung đã dịch trực tiếp. Chuỗi hàm `.onChange()` vào kết quả để đăng ký theo dõi các thay đổi ngôn ngữ — tương đương với việc re-render trong React.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Lấy nội dung ban đầu cho ngôn ngữ hiện tại.
// Chuỗi hàm .onChange() để được thông báo mỗi khi ngôn ngữ thay đổi.
const content = useIntlayer("app").onChange((newContent) => {
  // Chỉ re-render hoặc cập nhật các node DOM bị ảnh hưởng
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Render lần đầu
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> Truy cập các giá trị lá dưới dạng chuỗi bằng cách bao bọc chúng trong `String()`, việc này sẽ gọi phương thức `toString()` của node và trả về văn bản đã dịch.
>
> Khi bạn cần giá trị cho một thuộc tính HTML thuần (ví dụ: `alt`, `aria-label`), hãy sử dụng trực tiếp `.value`:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (Tùy chọn) Bước 7: Thay đổi ngôn ngữ nội dung của bạn

Để thay đổi ngôn ngữ nội dung, hãy sử dụng hàm `setLocale` được cung cấp bởi `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value as any));

  // Giữ dropdown đồng bộ khi ngôn ngữ thay đổi từ nơi khác
  return subscribe((newLocale) => render(newLocale));
}
```

### (Tùy chọn) Bước 8: Render nội dung Markdown và HTML

Intlayer hỗ trợ khai báo nội dung dưới dạng `md()` và `html()`. Trong Vanilla JS, đầu ra đã biên dịch được chèn dưới dạng HTML thô qua `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Biên dịch và chèn HTML:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` gọi `toString()` trên `IntlayerNode` để trả về chuỗi Markdown thô. Truyền nó vào `compileMarkdown` để lấy chuỗi HTML, sau đó thiết lập qua `innerHTML`.

> [!WARNING]
> Chỉ sử dụng `innerHTML` với nội dung tin cậy. Nếu markdown đến từ đầu vào của người dùng, hãy lọc sạch nó trước (ví dụ với DOMPurify). Bạn có thể cài đặt trình render lọc sạch một cách linh hoạt:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (Tùy chọn) Bước 9: Thêm Localized Routing vào ứng dụng của bạn

Để tạo các route duy nhất cho mỗi ngôn ngữ (hữu ích cho SEO), bạn có thể sử dụng `intlayerProxy` trong cấu hình Vite của mình để phát hiện ngôn ngữ ở phía server.

Đầu tiên, thêm `intlayerProxy` vào cấu hình Vite của bạn:

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // nên đặt đầu tiên
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // nên đặt đầu tiên
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // nên đặt đầu tiên
    intlayer(),
  ],
});
```

### (Tùy chọn) Bước 10: Thay đổi URL khi ngôn ngữ thay đổi

Để cập nhật URL trình duyệt khi ngôn ngữ thay đổi, hãy gọi `useRewriteURL()` sau khi cài đặt Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// Viết lại URL ngay lập tức và mỗi khi ngôn ngữ thay đổi sau đó.
// Trả về một hàm hủy đăng ký để dọn dẹp.
const stopRewriteURL = useRewriteURL();
```

### (Tùy chọn) Bước 11: Chuyển đổi thuộc tính Language và Direction của HTML

Cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để khớp với ngôn ngữ hiện tại nhằm hỗ trợ truy cập và SEO.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (Tùy chọn) Bước 12: Lazy-load từ điển theo ngôn ngữ

Đối với các ứng dụng lớn, bạn có thể muốn chia từ điển của mỗi ngôn ngữ thành một phần (chunk) riêng. Sử dụng `useDictionaryDynamic` cùng với `import()` động của Vite:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> Mỗi bundle ngôn ngữ chỉ được tải khi ngôn ngữ đó được kích hoạt và kết quả được lưu vào cache — các lần chuyển đổi sau đó sang cùng một ngôn ngữ sẽ diễn ra tức thì.

### (Tùy chọn) Bước 13: Trích xuất nội dung từ các thành phần của bạn

Nếu bạn có một codebase hiện có, việc chuyển đổi hàng ngàn tệp có thể tốn thời gian.

Để giảm bớt quá trình này, Intlayer đề xuất một [trình biên dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) / [trình trích xuất](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi các thành phần và trích xuất nội dung.

Để thiết lập, bạn có thể thêm một phần `compiler` trong tệp `intlayer.config.ts` của mình:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Cấu hình còn lại của bạn
  compiler: {
    /**
     * Chỉ định xem trình biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Định nghĩa đường dẫn các tệp đầu ra
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Chỉ định xem các thành phần có nên được lưu lại sau khi được chuyển đổi hay không.
     * Bằng cách đó, trình biên dịch có thể chỉ chạy một lần để chuyển đổi ứng dụng, và sau đó nó có thể được gỡ bỏ.
     */
    saveComponents: false,

    /**
     * Tiền tố phím từ điển
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Lệnh Extract'>

Chạy trình trích xuất để chuyển đổi các thành phần và trích xuất nội dung

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Trình biên dịch Babel'>

Cập nhật `vite.config.ts` của bạn để bao gồm plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Thêm plugin trình biên dịch
  ],
});
```

```bash packageManager="npm"
npm run build # Hoặc npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Hoặc pnpm run dev
```

```bash packageManager="yarn"
yarn build # Hoặc yarn dev
```

```bash packageManager="bun"
bun run build # Hoặc bun run dev
```

 </Tab>
</Tabs>

### Cấu hình TypeScript

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu dữ liệu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Cấu hình Git

Khuyên dùng việc bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh việc commit chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các chỉ dẫn sau vào tệp `.gitignore` của mình:

```bash
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Extension VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Extension Intlayer VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Extension này cung cấp:

- **Tự động hoàn thành** cho các khóa bản dịch.
- **Phát hiện lỗi theo thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung đã dịch** trực tiếp.
- **Quick actions** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng extension, hãy tham khảo [tài liệu Extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Đi xa hơn

Để tìm hiểu sâu hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc bên ngoài hóa nội dung của bạn bằng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---
createdAt: 2025-04-18
updatedAt: 2025-11-19
title: Cách dịch ứng dụng Vite và Svelte của bạn – Hướng dẫn i18n 2025
description: Khám phá cách làm cho trang web Vite và Svelte của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
history:
  - version: 5.5.11
    date: 2025-11-19
    changes: Cập nhật tài liệu
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Vite và Svelte của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Địa phương hóa động metadata**, các tuyến đường và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tạo tự động, cải thiện tự động hoàn thành và phát hiện lỗi.
- **Tận hưởng các tính năng nâng cao**, như phát hiện và chuyển đổi ngôn ngữ động.

---

## Hướng Dẫn Từng Bước Để Cài Đặt Intlayer Trong Ứng Dụng Vite và Svelte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-vite-svelte-template) trên GitHub.

### Bước 1: Cài Đặt Các Phụ Thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **svelte-intlayer**
  Gói tích hợp Intlayer với ứng dụng Svelte. Nó cung cấp các context providers và hooks cho việc quốc tế hóa trong Svelte.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 2: Cấu hình dự án của bạn

Tạo một file cấu hình để thiết lập các ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts"
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

> Thông qua file cấu hình này, bạn có thể thiết lập các URL có địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> Plugin `intlayer()` của Vite được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các file khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các alias để tối ưu hiệu năng.

### Bước 4: Khai báo Nội dung của bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Khai báo nội dung ứng dụng với các bản dịch cho tiêu đề
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Khai báo nội dung ứng dụng với các bản dịch cho tiêu đề
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
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
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng Intlayer trong mã của bạn

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Hiển thị nội dung như nội dung đơn giản -->
<h1>{$content.title}</h1>
<!-- Để hiển thị nội dung có thể chỉnh sửa bằng trình soạn thảo -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Để hiển thị nội dung dưới dạng chuỗi -->
<div aria-label={$content.title.value}></div>
```

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// Lấy thông tin locale và hàm setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Xử lý thay đổi locale
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### (Tùy chọn) Bước 7: Hiển thị Markdown

Intlayer hỗ trợ hiển thị nội dung Markdown trực tiếp trong ứng dụng Svelte của bạn. Theo mặc định, Markdown được xử lý như văn bản thuần túy. Để chuyển đổi Markdown thành HTML phong phú, bạn có thể tích hợp `@humanspeak/svelte-markdown` hoặc một trình phân tích markdown khác.

> Để xem cách khai báo nội dung markdown sử dụng gói `intlayer`, xem tài liệu [markdown doc](https://github.com/aymericzip/intlayer/tree/main/docs/vi/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // hiển thị nội dung markdown dưới dạng chuỗi
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> Bạn cũng có thể truy cập dữ liệu front-matter của markdown bằng cách sử dụng thuộc tính `content.markdownContent.metadata.xxx`.

### (Tùy chọn) Bước 8: Thiết lập trình chỉnh sửa intlayer / CMS

Để thiết lập trình chỉnh sửa intlayer, bạn phải làm theo [tài liệu trình chỉnh sửa intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Để thiết lập CMS intlayer, bạn phải làm theo [tài liệu CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

Song song đó, trong ứng dụng Svelte của bạn, bạn phải thêm dòng sau vào một layout, hoặc tại gốc của ứng dụng:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (Tùy chọn) Bước 7: Thêm định tuyến có bản địa hóa vào ứng dụng của bạn

Để xử lý định tuyến có bản địa hóa trong ứng dụng Svelte của bạn, bạn có thể sử dụng `svelte-spa-router` cùng với `localeFlatMap` của Intlayer để tạo các tuyến đường cho từng ngôn ngữ.

Trước tiên, cài đặt `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
```

```bash packageManager="yarn"
yarn add svelte-spa-router
```

```bash packageManager="bun"
bun add svelte-spa-router
```

Sau đó, tạo một file `Router.svelte` để định nghĩa các tuyến đường của bạn:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

Cập nhật file `main.ts` của bạn để mount component `Router` thay vì `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Cuối cùng, cập nhật `App.svelte` của bạn để nhận prop `locale` và sử dụng nó với `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from 'svelte-intlayer';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher từ './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... phần còn lại của ứng dụng của bạn ... -->
</main>
```

#### Cấu hình Routing phía Server (Tùy chọn)

Song song với đó, bạn cũng có thể sử dụng `intlayerProxy` để thêm routing phía server cho ứng dụng của bạn. Plugin này sẽ tự động phát hiện locale hiện tại dựa trên URL và thiết lập cookie locale phù hợp. Nếu không có locale nào được chỉ định, plugin sẽ xác định locale phù hợp nhất dựa trên sở thích ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được locale nào, nó sẽ chuyển hướng đến locale mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (Tùy chọn) Bước 8: Thay đổi URL khi thay đổi ngôn ngữ

Để cho phép người dùng chuyển đổi ngôn ngữ và cập nhật URL tương ứng, bạn có thể tạo một component `LocaleSwitcher`. Component này sẽ sử dụng `getLocalizedUrl` từ `intlayer` và `push` từ `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Lấy thông tin ngôn ngữ
const { locale, availableLocales } = useLocale();

// Xử lý thay đổi ngôn ngữ
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### Cấu hình Git

Khuyến nghị nên bỏ qua các file được tạo ra bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các chỉ dẫn sau vào file `.gitignore` của bạn:

```plaintext
# Bỏ qua các file được tạo ra bởi Intlayer
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

### Tiến xa hơn

Để tiến xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

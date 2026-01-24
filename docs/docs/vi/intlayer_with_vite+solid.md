---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Cách dịch ứng dụng Vite và Solid của bạn – Hướng dẫn i18n 2026
description: Khám phá cách làm cho trang web Vite và Solid của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Thêm lệnh init
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Vite và Solid của bạn bằng Intlayer | Quốc tế hóa (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Solid? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

> Gói này đang trong quá trình phát triển. Xem [vấn đề](https://github.com/aymericzip/intlayer/issues/117) để biết thêm thông tin. Thể hiện sự quan tâm của bạn đến Intlayer cho Solid bằng cách thích vấn đề này

<!-- Xem [Mẫu Ứng dụng](https://github.com/aymericzip/intlayer-solid-template) trên GitHub. -->

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng từ điển khai báo ở cấp độ component.
- **Định vị động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tạo tự động, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.

---

## Hướng Dẫn Từng Bước Cài Đặt Intlayer trong Ứng Dụng Vite và Solid

## Mục Lục

<TOC/>

### Bước 1: Cài Đặt Các Phụ Thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **solid-intlayer**  
  Gói tích hợp Intlayer với ứng dụng Solid. Nó cung cấp các context provider và hook cho việc quốc tế hóa trong Solid.

- **vite-intlayer**  
  Bao gồm plugin Vite để tích hợp Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện locale ưu tiên của người dùng, quản lý cookie, và xử lý chuyển hướng URL.

### Bước 2: Cấu hình dự án của bạn

Tạo một file cấu hình để cấu hình các ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Các locale khác của bạn
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
      // Các locale khác của bạn
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
      // Các locale khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung của bạn, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> Plugin `intlayer()` của Vite được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các file khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó còn cung cấp các bí danh để tối ưu hiệu suất.

### Bước 4: Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Khai báo nội dung ứng dụng
const appContent = {
  key: "app",
  content: {},
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và phải phù hợp với phần mở rộng file khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng Intlayer trong Mã của Bạn

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

```tsx {1,11} fileName="src/App.tsx" codeFormat="typescript"
import { createSignal, type Component } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "solid-intlayer";

const AppContent: Component = () => {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content().viteLogo.value} />
        </a>
        <a href="https://www.solidjs.com/" target="_blank">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content().solidLogo.value}
          />
        </a>
      </div>
      <h1>{content().title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content().count({ count: count() })}
        </button>
        <p>{content().edit}</p>
      </div>
      <p class="read-the-docs">{content().readTheDocs}</p>
    </>
  );
};

const App: Component = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> [!NOTE]
> Trong Solid, `useIntlayer` trả về một hàm **accessor** (ví dụ: `content()`). Bạn phải gọi hàm này để truy cập nội dung phản ứng.

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn phải gọi giá trị của hàm, như:
>
> ```jsx
> <img src={content().image.src.value} alt={content().image.value} />
> ```

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hook `useLocale`. Hàm này cho phép bạn đặt locale của ứng dụng và cập nhật nội dung tương ứng.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { Locales } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as Locales)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

### (Tùy chọn) Bước 7: Thêm định tuyến địa phương hóa vào ứng dụng của bạn

Mục đích của bước này là tạo các tuyến đường duy nhất cho mỗi ngôn ngữ. Điều này hữu ích cho SEO và URL thân thiện với SEO.
Ví dụ:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Để thêm định tuyến địa phương hóa vào ứng dụng của bạn, bạn có thể sử dụng `@solidjs/router`.

Trước tiên, cài đặt các phụ thuộc cần thiết:

```bash packageManager="npm"
npm install @solidjs/router
```

Sau đó, bọc ứng dụng của bạn bằng `Router` và xác định các tuyến đường của bạn bằng `localeMap`:

```tsx fileName="src/index.tsx"  codeFormat="typescript"
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
```

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { type Component } from "solid-js";
import { Route } from "@solidjs/router";
import { localeMap } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import Home from "./pages/Home";
import About from "./pages/About";

const App: Component = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix || "/"}
        component={(props: any) => (
          <IntlayerProvider locale={locale}>{props.children}</IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    ))}
  </IntlayerProvider>
);

export default App;
```

### (Tùy chọn) Bước 8: Thay đổi URL khi ngôn ngữ thay đổi

Để thay đổi URL khi locale thay đổi, bạn có thể sử dụng prop `onLocaleChange` được cung cấp bởi hook `useLocale`. Bạn có thể sử dụng các hook `useNavigate` và `useLocation` từ `@solidjs/router` để cập nhật đường dẫn URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (loc) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, loc);
      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as any)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

### (Tùy chọn) Bước 9: Chuyển đổi thuộc tính Ngôn ngữ và Hướng của HTML

Cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để khớp với locale hiện tại để hỗ trợ khả năng truy cập và SEO.

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { createEffect, type Component } from "solid-js";
import { useLocale } from "solid-intlayer";
import { getHTMLTextDir } from "intlayer";

const AppContent: Component = () => {
  const { locale } = useLocale();

  createEffect(() => {
    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    // ... Nội dung ứng dụng của bạn
  );
};
```

### (Tùy chọn) Bước 10: Tạo thành phần Liên kết Địa phương hóa

Tạo một thành phần `Link` tùy chỉnh tự động thêm tiền tố các URL nội bộ bằng ngôn ngữ hiện tại.

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { type ParentComponent } from "solid-js";
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const Link: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => props.href.startsWith("http");
  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

### (Tùy chọn) Bước 11: Render Markdown

Intlayer hỗ trợ render nội dung Markdown trực tiếp trong ứng dụng Solid của bạn bằng cách sử dụng trình phân tích cú pháp nội bộ riêng. Theo mặc định, Markdown được xử lý như văn bản thuần túy. Để render nó dưới dạng HTML phong phú, hãy bọc ứng dụng của bạn bằng `MarkdownProvider`.

```tsx fileName="src/index.tsx"
import { render } from "solid-js/web";
import { MarkdownProvider } from "solid-intlayer";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <MarkdownProvider>
      <App />
    </MarkdownProvider>
  ),
  root!
);
```

Sau đó bạn có thể sử dụng nó trong các thành phần của mình:

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-content");

  return (
    <div>
      {/* Render dưới dạng HTML qua MarkdownProvider */}
      {content().markdownContent}
    </div>
  );
};
```

### Cấu hình TypeScript

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tự động tạo.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Cấu hình Git

Khuyến nghị bỏ qua các file được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của bạn.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào file `.gitignore` của bạn:

```plaintext
# Bỏ qua các file được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Các hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Tiến xa hơn

Để tiến xa hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---

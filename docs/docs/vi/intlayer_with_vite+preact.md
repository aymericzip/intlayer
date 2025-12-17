---
createdAt: 2025-04-18
updatedAt: 2025-10-28
title: Cách dịch ứng dụng Vite và Preact của bạn – Hướng dẫn i18n 2025
description: Khám phá cách làm cho trang web Vite và Preact của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 7.0.0
    date: 2025-10-28
    changes: Cập nhật component LocaleRouter để sử dụng cấu hình route mới
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Vite và Preact của bạn bằng Intlayer | Quốc tế hóa (i18n)

> Gói này đang trong quá trình phát triển. Xem [vấn đề](https://github.com/aymericzip/intlayer/issues/118) để biết thêm thông tin. Thể hiện sự quan tâm của bạn đến Intlayer cho Preact bằng cách thích vấn đề này

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Địa phương hóa động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tạo tự động, cải thiện tính năng tự hoàn thành và phát hiện lỗi.
- **Tận hưởng các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.

---

## Hướng Dẫn Từng Bước Để Cài Đặt Intlayer Trong Ứng Dụng Vite và Preact

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách Quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-vite-preact-template) trên GitHub.

### Bước 1: Cài Đặt Các Phụ Thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển đổi mã, và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **preact-intlayer**
  Gói tích hợp Intlayer với ứng dụng Preact. Nó cung cấp các context provider và hook cho việc quốc tế hóa trong Preact.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 2: Cấu hình dự án của bạn

Tạo một file cấu hình để cấu hình các ngôn ngữ của ứng dụng của bạn:

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
  routing: {
    mode: "prefix-no-default", // Mặc định: thêm tiền tố cho tất cả các ngôn ngữ ngoại trừ ngôn ngữ mặc định
    storage: ["cookie", "header"], // Mặc định: lưu ngôn ngữ trong cookie và phát hiện từ header
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
  routing: {
    mode: "prefix-no-default", // Mặc định: thêm tiền tố cho tất cả các ngôn ngữ ngoại trừ ngôn ngữ mặc định
    storage: ["cookie", "header"], // Mặc định: lưu ngôn ngữ trong cookie và phát hiện từ header
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
  routing: {
    mode: "prefix-no-default", // Mặc định: thêm tiền tố cho tất cả các ngôn ngữ ngoại trừ ngôn ngữ mặc định
    storage: ["cookie", "header"], // Mặc định: lưu ngôn ngữ trong cookie và phát hiện từ header
  },
};

module.exports = config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập URL đa ngôn ngữ, chế độ định tuyến, tùy chọn lưu trữ, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các file khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó còn cung cấp các bí danh để tối ưu hiệu suất.

### Bước 4: Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Chỉnh sửa <code>src/app.tsx</code> và lưu để thử HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Nhấn vào logo Vite và Preact để tìm hiểu thêm",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Cần thiết nếu bạn sử dụng JSX trực tiếp trong .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Chỉnh sửa src/app.jsx và lưu để thử HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Nhấn vào logo Vite và Preact để tìm hiểu thêm",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Cần thiết nếu bạn sử dụng JSX trực tiếp trong .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      vi: "số đếm là ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
      vi: "Chỉnh sửa src/app.tsx và lưu để thử HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      vi: "Nhấn vào logo Vite và Preact để tìm hiểu thêm",
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
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "vi": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "vi": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "vi": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "vi": "số đếm là "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "vi": "Chỉnh sửa src/app.tsx và lưu để kiểm tra HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "vi": "Nhấp vào logo Vite và Preact để tìm hiểu thêm"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và phải phù hợp với phần mở rộng của file khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

> Nếu file nội dung của bạn bao gồm mã TSX, bạn có thể cần import `import { h } from "preact";` hoặc đảm bảo pragma JSX của bạn được thiết lập đúng cho Preact.

### Bước 5: Sử dụng Intlayer trong Code của Bạn

Truy cập các từ điển nội dung trong toàn bộ ứng dụng của bạn:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Giả sử bạn có file preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Giả sử file CSS của bạn tên là app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn phải gọi giá trị của hàm, ví dụ:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Lưu ý: Trong Preact, `className` thường được viết là `class`.

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md) (API tương tự cho `preact-intlayer`).

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hook `useLocale`. Hàm này cho phép bạn thiết lập locale của ứng dụng và cập nhật nội dung tương ứng.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Thay đổi ngôn ngữ sang tiếng Anh
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Thay đổi ngôn ngữ sang tiếng Anh
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Thay đổi ngôn ngữ sang tiếng Anh
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Để tìm hiểu thêm về hook `useLocale`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md) (API tương tự cho `preact-intlayer`).

### (Tùy chọn) Bước 7: Thêm định tuyến có bản địa hóa vào ứng dụng của bạn

Mục đích của bước này là tạo các tuyến đường duy nhất cho mỗi ngôn ngữ. Điều này hữu ích cho SEO và các URL thân thiện với SEO.
Ví dụ:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Mặc định, các route không được thêm tiền tố cho locale mặc định (`routing.mode: "prefix-no-default"`). Nếu bạn muốn thêm tiền tố cho locale mặc định, bạn có thể đặt tùy chọn `routing.mode` thành `"prefix-all"` trong cấu hình của bạn. Xem thêm tại [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) để biết thêm thông tin.

Để thêm routing theo locale vào ứng dụng của bạn, bạn có thể tạo một component `LocaleRouter` bao bọc các route của ứng dụng và xử lý routing dựa trên locale. Dưới đây là ví dụ sử dụng [preact-iso](https://github.com/preactjs/preact-iso):

Đầu tiên, cài đặt `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { configuration, getPathWithoutLocale, type Locale } from "intlayer";
import type { ComponentChildren, FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";

const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
/**
 * Một component xử lý việc địa phương hóa và bao bọc các phần tử con với ngữ cảnh locale phù hợp.
 * Nó quản lý việc phát hiện và xác thực locale dựa trên URL.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locale;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Xác định locale hiện tại, nếu không có thì sử dụng locale mặc định
  const currentLocale = locale ?? defaultLocale;

  // Loại bỏ tiền tố locale khỏi đường dẫn để tạo đường dẫn cơ sở
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Đường dẫn URL hiện tại
  );

  /**
   * Nếu routing.mode là 'prefix-all', locale mặc định luôn phải được thêm tiền tố.
   */
  if (routing.mode === "prefix-all") {
    // Xác thực locale
    if (!locale || !locales.includes(locale)) {
      // Chuyển hướng đến locale mặc định với đường dẫn đã cập nhật
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Thay thế mục lịch sử hiện tại bằng mục mới
        />
      );
    }

    // Bao bọc các phần tử con với IntlayerProvider và thiết lập locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Khi routing.mode không phải 'prefix-all', locale mặc định sẽ không có tiền tố.
     * Đảm bảo rằng locale hiện tại hợp lệ và không phải là locale mặc định.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Loại trừ locale mặc định
        )
        .includes(currentLocale) // Kiểm tra xem locale hiện tại có trong danh sách các locale hợp lệ không
    ) {
      // Chuyển hướng đến đường dẫn không có tiền tố locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Bao bọc children với IntlayerProvider và đặt locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locale;

  const isLocaleRoute = locales
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Một component router thiết lập các route theo locale cụ thể.
 * Nó sử dụng preact-iso để quản lý điều hướng và render các component theo locale.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Nhập các phụ thuộc và hàm cần thiết
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Cần thiết cho JSX

// Lấy cấu hình từ Intlayer
const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
/**
 * Một component xử lý việc địa phương hóa và bao bọc các phần tử con với ngữ cảnh locale phù hợp.
 * Nó quản lý việc phát hiện và xác thực locale dựa trên URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Xác định locale hiện tại, sử dụng locale mặc định nếu không được cung cấp
  const currentLocale = locale ?? defaultLocale;

  // Loại bỏ tiền tố locale khỏi đường dẫn để tạo đường dẫn cơ sở
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Đường dẫn URL hiện tại
  );

  /**
   * Nếu routing.mode là 'prefix-all', locale mặc định luôn phải được thêm tiền tố.
   */
  if (routing.mode === "prefix-all") {
    // Xác thực locale
    if (!locale || !locales.includes(locale)) {
      // Chuyển hướng đến locale mặc định với đường dẫn đã được cập nhật
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Thay thế mục lịch sử hiện tại bằng mục mới
        />
      );
    }

    // Bao bọc các phần tử con với IntlayerProvider và đặt locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Khi routing.mode không phải là 'prefix-all', locale mặc định sẽ không được thêm tiền tố.
     * Đảm bảo rằng locale hiện tại hợp lệ và không phải là locale mặc định.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Loại trừ locale mặc định
        )
        .includes(currentLocale) // Kiểm tra xem locale hiện tại có nằm trong danh sách các locale hợp lệ không
    ) {
      // Chuyển hướng đến đường dẫn không có tiền tố locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Bao bọc children với IntlayerProvider và đặt locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Một component router thiết lập các route theo từng locale cụ thể.
 * Nó sử dụng preact-iso để quản lý điều hướng và render các component theo locale.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Import các dependencies và hàm cần thiết
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Cần thiết cho JSX

// Phân rã cấu hình từ Intlayer
const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Một component xử lý việc bản địa hóa và bao bọc các phần tử con với ngữ cảnh locale phù hợp.
 * Nó quản lý việc phát hiện và xác thực locale dựa trên URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Xác định locale hiện tại, nếu không có thì dùng locale mặc định
  const currentLocale = locale ?? defaultLocale;

  // Loại bỏ tiền tố locale khỏi đường dẫn để tạo đường dẫn cơ sở
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Đường dẫn URL hiện tại
  );

  /**
   * Nếu routing.mode là 'prefix-all', locale mặc định luôn phải có tiền tố.
   */
  if (routing.mode === "prefix-all") {
    // Kiểm tra tính hợp lệ của locale
    if (!locale || !locales.includes(locale)) {
      // Chuyển hướng đến locale mặc định với đường dẫn đã cập nhật
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Thay thế mục lịch sử hiện tại bằng mục mới
        />
      );
    }

    // Bao bọc các phần tử con với IntlayerProvider và thiết lập locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Khi routing.mode không phải là 'prefix-all', locale mặc định sẽ không có tiền tố.
     * Đảm bảo rằng locale hiện tại hợp lệ và không phải là locale mặc định.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Loại trừ locale mặc định
        )
        .includes(currentLocale) // Kiểm tra xem locale hiện tại có trong danh sách các locale hợp lệ không
    ) {
      // Chuyển hướng đến đường dẫn không có tiền tố locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Bao bọc các phần tử con với IntlayerProvider và thiết lập locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Một component router thiết lập các route theo locale cụ thể.
 * Nó sử dụng preact-iso để quản lý điều hướng và render các component theo locale.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Sau đó, bạn có thể sử dụng component `LocaleRouter` trong ứng dụng của mình:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Component AppContent của bạn (được định nghĩa trong Bước 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Component AppContent của bạn (được định nghĩa ở Bước 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Component AppContent của bạn (được định nghĩa ở Bước 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

Trong khi đó, bạn cũng có thể sử dụng `intlayerProxy` để thêm routing phía server vào ứng dụng của bạn. Plugin này sẽ tự động phát hiện locale hiện tại dựa trên URL và thiết lập cookie locale phù hợp. Nếu không có locale nào được chỉ định, plugin sẽ xác định locale phù hợp nhất dựa trên ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được locale nào, nó sẽ chuyển hướng đến locale mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

### (Tùy chọn) Bước 8: Thay đổi URL khi locale thay đổi

Để thay đổi URL khi locale thay đổi, bạn có thể sử dụng prop `onLocaleChange` được cung cấp bởi hook `useLocale`. Đồng thời, bạn có thể sử dụng `useLocation` và `route` từ `preact-iso` để cập nhật đường dẫn URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

### (Tùy chọn) Bước 8: Thay đổi URL khi thay đổi locale

Để thay đổi URL khi locale thay đổi, bạn có thể sử dụng prop `onLocaleChange` được cung cấp bởi hook `useLocale`. Đồng thời, bạn có thể sử dụng `useLocation` và `route` từ `preact-iso` để cập nhật đường dẫn URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso cung cấp URL đầy đủ
      // Xây dựng URL với locale được cập nhật
      // Ví dụ: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Cập nhật đường dẫn URL
      route(pathWithLocale, true); // true để thay thế
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // Điều hướng lập trình sau khi đặt locale sẽ được xử lý bởi onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ trong chính Locale của nó - ví dụ: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong Locale hiện tại - ví dụ: Francés với locale hiện tại được đặt thành Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // Dùng cho JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // Dùng cho JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Tham khảo tài liệu:
>
> > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md) (API tương tự cho `preact-intlayer`) > - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleName.md) > - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md) > - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getHTMLTextDir.md) > - Thuộc tính [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr) > - Thuộc tính [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) > - Thuộc tính [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) > - Thuộc tính [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) > - [API Popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)la.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

Dưới đây là **Bước 9** được cập nhật với các giải thích bổ sung và ví dụ mã được tinh chỉnh:

---

### (Tùy chọn) Bước 9: Chuyển đổi thuộc tính Ngôn ngữ và Hướng của thẻ HTML

Khi ứng dụng của bạn hỗ trợ nhiều ngôn ngữ, việc cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để phù hợp với locale hiện tại là rất quan trọng. Việc này đảm bảo:

- **Khả năng truy cập**: Các trình đọc màn hình và công nghệ hỗ trợ dựa vào thuộc tính `lang` chính xác để phát âm và hiểu nội dung một cách chính xác.
- **Hiển thị văn bản**: Thuộc tính `dir` (hướng) đảm bảo văn bản được hiển thị theo đúng thứ tự (ví dụ: từ trái sang phải cho tiếng Anh, từ phải sang trái cho tiếng Ả Rập hoặc tiếng Do Thái), điều này rất cần thiết cho khả năng đọc.
- **SEO**: Các công cụ tìm kiếm sử dụng thuộc tính `lang` để xác định ngôn ngữ của trang, giúp phục vụ nội dung địa phương hóa phù hợp trong kết quả tìm kiếm.

Bằng cách cập nhật các thuộc tính này một cách động khi locale thay đổi, bạn đảm bảo trải nghiệm nhất quán và dễ tiếp cận cho người dùng trên tất cả các ngôn ngữ được hỗ trợ.

#### Triển khai Hook

Tạo một hook tùy chỉnh để quản lý các thuộc tính HTML. Hook này lắng nghe sự thay đổi của locale và cập nhật các thuộc tính tương ứng:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Cập nhật thuộc tính `lang` và `dir` của phần tử <html> dựa trên locale hiện tại.
 * - `lang`: Thông báo cho trình duyệt và công cụ tìm kiếm về ngôn ngữ của trang.
 * - `dir`: Đảm bảo thứ tự đọc đúng (ví dụ: 'ltr' cho tiếng Anh, 'rtl' cho tiếng Ả Rập).
 *
 * Việc cập nhật động này rất quan trọng để hiển thị văn bản đúng cách, hỗ trợ truy cập và SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Cập nhật thuộc tính ngôn ngữ thành locale hiện tại.
    document.documentElement.lang = locale;

    // Đặt hướng văn bản dựa trên locale hiện tại.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên locale hiện tại.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên locale hiện tại.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Sử dụng Hook trong Ứng dụng của Bạn

Tích hợp hook vào thành phần chính của bạn để các thuộc tính HTML được cập nhật mỗi khi locale thay đổi:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer đã được import nếu AppContent cần
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Định nghĩa AppContent từ Bước 5

const AppWithHooks: FunctionalComponent = () => {
  // Áp dụng hook để cập nhật các thuộc tính lang và dir của thẻ <html> dựa trên locale.
  useI18nHTMLAttributes();

  // Giả sử AppContent là thành phần hiển thị nội dung chính của bạn từ Bước 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Định nghĩa AppContent từ Bước 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Định nghĩa AppContent từ Bước 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

Bằng cách áp dụng những thay đổi này, ứng dụng của bạn sẽ:

- Đảm bảo thuộc tính **ngôn ngữ** (`lang`) phản ánh chính xác locale hiện tại, điều này quan trọng cho SEO và hành vi của trình duyệt.
- Điều chỉnh **hướng văn bản** (`dir`) theo locale, nâng cao khả năng đọc và tính tiện dụng cho các ngôn ngữ có thứ tự đọc khác nhau.
- Cung cấp trải nghiệm **dễ tiếp cận** hơn, vì các công nghệ hỗ trợ phụ thuộc vào các thuộc tính này để hoạt động tối ưu.

### (Tùy chọn) Bước 10: Tạo thành phần Link có địa phương hóa

Để đảm bảo điều hướng trong ứng dụng của bạn tôn trọng ngôn ngữ hiện tại, bạn có thể tạo một thành phần `Link` tùy chỉnh. Thành phần này tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ.

Hành vi này hữu ích vì một số lý do:

- **SEO và Trải nghiệm người dùng**: URL có địa phương hóa giúp các công cụ tìm kiếm lập chỉ mục chính xác các trang theo ngôn ngữ và cung cấp nội dung cho người dùng theo ngôn ngữ ưu tiên của họ.
- **Tính nhất quán**: Bằng cách sử dụng liên kết có địa phương hóa trong toàn bộ ứng dụng, bạn đảm bảo điều hướng luôn nằm trong ngôn ngữ hiện tại, tránh việc chuyển đổi ngôn ngữ không mong muốn.
- **Dễ bảo trì**: Tập trung logic địa phương hóa trong một component duy nhất giúp đơn giản hóa việc quản lý các URL.

Đối với Preact khi dùng `preact-iso`, bạn thường dùng thẻ `<a>` cho điều hướng nội bộ. Để đảm bảo các liên kết phù hợp với locale hiện tại, bạn nên tạo một component anchor tùy chỉnh tự động thêm tiền tố locale và xử lý điều hướng phía client bằng `route` từ `preact-iso`. Dưới đây là ví dụ hoàn chỉnh:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso";
import type { JSX } from "preact";
import { forwardRef } from "preact/compat";

/** Kiểm tra một đường dẫn có phải là liên kết ngoài không */
export const checkIsExternalLink = (href?: string) =>
  /^https?:\/\//.test(href ?? "");

export interface LocalizedLinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
}

/**
 * LocalizedLink là một thẻ <a> tự động nối locale hiện tại vào đường dẫn nội bộ
 * và điều hướng route phía client mà không load lại trang.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternal = checkIsExternalLink(href);

    const hrefLocalized =
      href && !isExternal ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(event);
      if (
        !isExternal &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefLocalized) {
          route(hrefLocalized, replace);
        }
      }
    };

    return (
      <a href={hrefLocalized} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // Nhập từ preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Dùng cho JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // Nhập từ preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Dùng cho JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // Lấy locale hiện tại
    const location = useLocation(); // Lấy vị trí hiện tại
    const isExternalLink = checkIsExternalLink(href); // Kiểm tra xem có phải liên kết ngoài không

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href; // Lấy URL đã được địa phương hóa nếu không phải liên kết ngoài

    const handleClick = (event) => {
      if (onClick) {
        onClick(event); // Gọi hàm onClick nếu có
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault(); // Ngăn hành vi mặc định của trình duyệt
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Cách Hoạt Động

- **Phát hiện Liên kết Ngoài**:  
  Hàm trợ giúp `checkIsExternalLink` xác định xem một URL có phải là liên kết ngoài hay không. Các liên kết ngoài sẽ không bị thay đổi.
- **Lấy Ngôn ngữ Hiện tại**:  
  Hook `useLocale` cung cấp ngôn ngữ hiện tại.
- **Địa phương hóa URL**:  
  Đối với các liên kết nội bộ, `getLocalizedUrl` sẽ thêm tiền tố ngôn ngữ hiện tại vào URL.
- **Điều hướng phía Client**:
  Hàm `handleClick` kiểm tra xem đó có phải là liên kết nội bộ và liệu điều hướng tiêu chuẩn có nên bị ngăn chặn hay không. Nếu đúng, nó sử dụng hàm `route` của `preact-iso` (lấy qua `useLocation` hoặc nhập trực tiếp) để thực hiện điều hướng phía client. Điều này cung cấp hành vi giống SPA mà không cần tải lại toàn bộ trang.
- **Trả về Liên kết**:  
  Component trả về một phần tử `<a>` với URL đã được địa phương hóa và trình xử lý sự kiện click tùy chỉnh.

### Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Khuyến nghị cho Preact 10+
    // ...
  },
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
  ],
}
```

> Đảm bảo `tsconfig.json` của bạn được thiết lập cho Preact, đặc biệt là `jsx` và `jsxImportSource` hoặc `jsxFactory`/`jsxFragmentFactory` cho các phiên bản Preact cũ hơn nếu không sử dụng mặc định của `preset-vite`.

### Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

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
- **Xem trước nội tuyến** của nội dung đã dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Đi xa hơn

Để đi xa hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

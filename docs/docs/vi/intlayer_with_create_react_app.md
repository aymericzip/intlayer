---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Cách dịch ứng dụng Create React App của bạn – Hướng dẫn i18n 2026
description: Khám phá cách làm cho trang web Create React App (CRA) của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Thêm lệnh init
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Create React App của bạn bằng Intlayer | Quốc tế hóa (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-cra-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Application Template](https://github.com/aymericzip/intlayer-react-cra-template) trên GitHub.

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở, sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Quản lý bản dịch dễ dàng** bằng cách sử dụng từ điển khai báo ở cấp độ component.
- **Địa phương hóa động metadata**, routes và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu tự động tạo, cải thiện tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng React

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
bunx intlayer init
```

- **intlayer**

Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **react-intlayer**

  Gói tích hợp Intlayer với ứng dụng React. Nó cung cấp các context providers và hooks cho quốc tế hóa trong React.

- **react-scripts-intlayer**

  Bao gồm các lệnh `react-scripts-intlayer` và các plugin để tích hợp Intlayer với ứng dụng dựa trên Create React App. Các plugin này dựa trên [craco](https://craco.js.org/) và bao gồm cấu hình bổ sung cho bộ đóng gói [Webpack](https://webpack.js.org/).

### Bước 2: Cấu hình dự án của bạn

Tạo một file cấu hình để cấu hình các ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

> Thông qua tệp cấu hình này, bạn có thể thiết lập URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung của bạn, tắt các log của Intlayer trong console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào Cấu hình CRA của Bạn

Thay đổi các script của bạn để sử dụng react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Các script `react-scripts-intlayer` dựa trên [CRACO](https://craco.js.org/). Bạn cũng có thể tự thiết lập dựa trên plugin craco của intlayer. [Xem ví dụ tại đây](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Bước 4: Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Chỉnh sửa <code>src/App.tsx</code> và lưu để tải lại
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Chỉnh sửa <code>src/App.tsx</code> và lưu để tải lại
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Học React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Bắt đầu bằng cách chỉnh sửa",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Học React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Bắt đầu bằng cách chỉnh sửa",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Học React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và phải khớp với phần mở rộng của tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

> Nếu tệp nội dung của bạn bao gồm mã TSX, bạn nên cân nhắc nhập `import React from "react";` trong tệp nội dung của bạn.

### Bước 5: Sử dụng Intlayer trong Mã của Bạn

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Lưu ý: Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn phải gọi giá trị của hàm, ví dụ:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md).

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hook `useLocale`. Hàm này cho phép bạn thiết lập locale của ứng dụng và cập nhật nội dung tương ứng.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Thay đổi ngôn ngữ sang tiếng Anh
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Thay đổi ngôn ngữ sang tiếng Anh
    </button>
  );
};
```

> Để tìm hiểu thêm về hook `useLocale`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md).

### (Tùy chọn) Bước 7: Thêm định tuyến theo ngôn ngữ vào ứng dụng của bạn

Mục đích của bước này là tạo các đường dẫn duy nhất cho mỗi ngôn ngữ. Điều này hữu ích cho SEO và các URL thân thiện với SEO.
Ví dụ:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Theo mặc định, các đường dẫn không được thêm tiền tố cho locale mặc định. Nếu bạn muốn thêm tiền tố cho locale mặc định, bạn có thể đặt tùy chọn `middleware.prefixDefault` thành `true` trong cấu hình của bạn. Xem thêm trong [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) để biết thêm thông tin.

Để thêm định tuyến theo ngôn ngữ vào ứng dụng của bạn, bạn có thể tạo một component `LocaleRouter` bao bọc các route của ứng dụng và xử lý định tuyến dựa trên locale. Dưới đây là ví dụ sử dụng [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Import các dependencies và hàm cần thiết
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Các hàm tiện ích và kiểu từ 'intlayer'
// Các hàm tiện ích và kiểu từ 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Kiểu React cho các functional component và props
import { IntlayerProvider } from "react-intlayer"; // Provider cho ngữ cảnh quốc tế hóa
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Các component router để quản lý điều hướng

// Lấy cấu hình từ Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Một component xử lý việc địa phương hóa và bao bọc các children với ngữ cảnh locale phù hợp.
 * Nó quản lý việc phát hiện và xác thực locale dựa trên URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Lấy đường dẫn URL hiện tại

  // Xác định locale hiện tại, nếu không có thì dùng locale mặc định
  const currentLocale = locale ?? defaultLocale;

  // Loại bỏ tiền tố locale khỏi đường dẫn để tạo đường dẫn cơ sở
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Đường dẫn URL hiện tại
  );

  /**
   * Nếu middleware.prefixDefault là true, locale mặc định luôn phải có tiền tố.
   */
  if (middleware.prefixDefault) {
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

    // Bao bọc children với IntlayerProvider và đặt locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Khi middleware.prefixDefault là false, locale mặc định không có tiền tố.
     * Đảm bảo locale hiện tại hợp lệ và không phải là locale mặc định.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Loại trừ locale mặc định
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

/**
 * Một component router thiết lập các tuyến đường theo locale cụ thể.
 * Nó sử dụng React Router để quản lý điều hướng và render các component đã được bản địa hóa.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Mẫu tuyến đường để bắt locale (ví dụ: /en/, /fr/) và khớp với tất cả các đường dẫn tiếp theo
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Bao bọc children với quản lý locale
          />
        ))}

      {
        // Nếu không bật tiền tố cho locale mặc định, render trực tiếp children tại đường dẫn gốc
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Bao bọc children với quản lý locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Nhập các phụ thuộc và hàm cần thiết
import { configuration, getPathWithoutLocale } from "intlayer"; // Các hàm tiện ích và kiểu từ 'intlayer'
// Các hàm tiện ích và kiểu từ 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Provider cho ngữ cảnh quốc tế hóa
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Các thành phần router để quản lý điều hướng

// Phân rã cấu hình từ Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Một component xử lý việc địa phương hóa và bao bọc children với ngữ cảnh locale phù hợp.
 * Nó quản lý việc phát hiện và xác thực locale dựa trên URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Lấy đường dẫn URL hiện tại

  // Xác định locale hiện tại, nếu không có thì dùng locale mặc định
  const currentLocale = locale ?? defaultLocale;

  // Loại bỏ tiền tố locale khỏi đường dẫn để tạo đường dẫn cơ sở
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Đường dẫn URL hiện tại
  );

  /**
   * Nếu middleware.prefixDefault là true, locale mặc định luôn phải có tiền tố.
   */
  if (middleware.prefixDefault) {
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

    // Bao bọc children với IntlayerProvider và đặt locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Khi middleware.prefixDefault là false, locale mặc định sẽ không có tiền tố.
     * Đảm bảo rằng locale hiện tại hợp lệ và không phải là locale mặc định.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Loại bỏ locale mặc định
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

/**
 * Một component router thiết lập các route theo locale cụ thể.
 * Nó sử dụng React Router để quản lý điều hướng và render các component đã được địa phương hóa.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Mẫu route để bắt locale (ví dụ: /en/, /fr/) và khớp với tất cả các đường dẫn tiếp theo
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Bao bọc children với quản lý locale
          />
        ))}

      {
        // Nếu không bật tiền tố cho locale mặc định, render children trực tiếp tại đường dẫn gốc
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Bao bọc children với quản lý locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Import các dependencies và hàm cần thiết
const { configuration, getPathWithoutLocale } = require("intlayer"); // Các hàm tiện ích và kiểu từ 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provider cho ngữ cảnh quốc tế hóa
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Các thành phần Router để quản lý điều hướng

// Lấy cấu hình từ Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Một component xử lý localization và bao bọc children với ngữ cảnh locale phù hợp.
 * Nó quản lý việc phát hiện và xác thực locale dựa trên URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Lấy đường dẫn URL hiện tại

  // Xác định locale hiện tại, nếu không có thì dùng locale mặc định
  const currentLocale = locale ?? defaultLocale;

  // Loại bỏ tiền tố locale khỏi đường dẫn để tạo đường dẫn cơ sở
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Đường dẫn URL hiện tại
  );

  /**
   * Nếu middleware.prefixDefault là true, locale mặc định luôn phải có tiền tố.
   */
  if (middleware.prefixDefault) {
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

    // Bao bọc children với IntlayerProvider và thiết lập locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Khi middleware.prefixDefault là false, locale mặc định sẽ không có tiền tố.
     * Đảm bảo rằng locale hiện tại hợp lệ và không phải là locale mặc định.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Loại bỏ locale mặc định
        )
        .includes(currentLocale) // Kiểm tra xem locale hiện tại có trong danh sách các locale hợp lệ không
    ) {
      // Chuyển hướng đến đường dẫn không có tiền tố locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Bao bọc children với IntlayerProvider và thiết lập locale hiện tại
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Một component router thiết lập các tuyến đường theo locale cụ thể.
 * Nó sử dụng React Router để quản lý điều hướng và hiển thị các component đã được bản địa hóa.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Mẫu tuyến đường để bắt locale (ví dụ: /en/, /fr/) và khớp với tất cả các đường dẫn tiếp theo
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Bao bọc children với quản lý locale
          />
        ))}

      {
        // Nếu không bật tiền tố cho locale mặc định, render children trực tiếp tại đường dẫn gốc
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Bao bọc children với quản lý locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Sau đó, bạn có thể sử dụng component `LocaleRouter` trong ứng dụng của mình:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Component AppContent của bạn

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Component AppContent của bạn

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Component AppContent của bạn

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### (Tùy chọn) Bước 8: Thay đổi URL khi locale thay đổi

Để thay đổi URL khi locale thay đổi, bạn có thể sử dụng prop `onLocaleChange` được cung cấp bởi hook `useLocale`. Đồng thời, bạn có thể sử dụng các hook `useLocation` và `useNavigate` từ `react-router-dom` để cập nhật đường dẫn URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Lấy đường dẫn URL hiện tại. Ví dụ: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Tạo URL với locale được cập nhật
      // Ví dụ: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Cập nhật đường dẫn URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Ngôn ngữ - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ trong chính ngôn ngữ đó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong ngôn ngữ hiện tại - ví dụ: Francés với ngôn ngữ hiện tại là Locales.SPANISH */}
              {getLocaleName(localeItem)}
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
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Lấy đường dẫn URL hiện tại. Ví dụ: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Tạo URL với locale được cập nhật
      // Ví dụ: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Cập nhật đường dẫn URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ trong chính Locale của nó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong Locale hiện tại - ví dụ: Francés với locale hiện tại được đặt là Locales.SPANISH */}
              {getLocaleName(localeItem)}
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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Lấy đường dẫn URL hiện tại. Ví dụ: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Tạo URL với locale được cập nhật
      // Ví dụ: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Cập nhật đường dẫn URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Mã ngôn ngữ - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ trong chính mã ngôn ngữ đó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong mã ngôn ngữ hiện tại - ví dụ: Francés khi mã ngôn ngữ hiện tại là Locales.SPANISH */}
              {getLocaleName(localeItem)}
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
```

> Tham khảo tài liệu:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Tùy chọn) Bước 9: Chuyển đổi Thuộc tính Ngôn ngữ và Hướng của HTML

Khi ứng dụng của bạn hỗ trợ nhiều ngôn ngữ, việc cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để phù hợp với locale hiện tại là điều rất quan trọng. Việc này đảm bảo:

- **Khả năng truy cập**: Trình đọc màn hình và các công nghệ hỗ trợ dựa vào thuộc tính `lang` chính xác để phát âm và diễn giải nội dung một cách chính xác.
- **Hiển thị văn bản**: Thuộc tính `dir` (hướng) đảm bảo rằng văn bản được hiển thị theo đúng thứ tự (ví dụ: từ trái sang phải cho tiếng Anh, từ phải sang trái cho tiếng Ả Rập hoặc tiếng Do Thái), điều này rất quan trọng cho khả năng đọc.
- **SEO**: Công cụ tìm kiếm sử dụng thuộc tính `lang` để xác định ngôn ngữ của trang, giúp cung cấp nội dung địa phương hóa phù hợp trong kết quả tìm kiếm.

Bằng cách cập nhật các thuộc tính này một cách động khi locale thay đổi, bạn đảm bảo trải nghiệm nhất quán và dễ tiếp cận cho người dùng trên tất cả các ngôn ngữ được hỗ trợ.

#### Triển khai Hook

Tạo một hook tùy chỉnh để quản lý các thuộc tính HTML. Hook này lắng nghe sự thay đổi của locale và cập nhật các thuộc tính tương ứng:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên locale hiện tại.
 * - `lang`: Thông báo cho trình duyệt và công cụ tìm kiếm về ngôn ngữ của trang.
 * - `dir`: Đảm bảo thứ tự đọc đúng (ví dụ: 'ltr' cho tiếng Anh, 'rtl' cho tiếng Ả Rập).
 *
 * Việc cập nhật động này rất cần thiết cho việc hiển thị văn bản chính xác, khả năng truy cập và SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Cập nhật thuộc tính ngôn ngữ theo locale hiện tại.
    document.documentElement.lang = locale;

    // Đặt hướng văn bản dựa trên locale hiện tại.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên locale hiện tại.
 * - `lang`: Thông báo cho trình duyệt và công cụ tìm kiếm về ngôn ngữ của trang.
 * - `dir`: Đảm bảo thứ tự đọc đúng (ví dụ: 'ltr' cho tiếng Anh, 'rtl' cho tiếng Ả Rập).
 *
 * Việc cập nhật động này rất cần thiết cho việc hiển thị văn bản chính xác, khả năng truy cập và SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Cập nhật thuộc tính ngôn ngữ theo locale hiện tại.
    document.documentElement.lang = locale;

    // Đặt hướng văn bản dựa trên locale hiện tại.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên locale hiện tại.
 * - `lang`: Thông báo cho trình duyệt và công cụ tìm kiếm về ngôn ngữ của trang.
 * - `dir`: Đảm bảo thứ tự đọc đúng (ví dụ: 'ltr' cho tiếng Anh, 'rtl' cho tiếng Ả Rập).
 *
 * Việc cập nhật động này rất quan trọng để hiển thị văn bản đúng cách, hỗ trợ truy cập và SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Cập nhật thuộc tính ngôn ngữ theo locale hiện tại.
    document.documentElement.lang = locale;

    // Đặt hướng văn bản dựa trên locale hiện tại.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Sử dụng Hook trong Ứng dụng của Bạn

Tích hợp hook vào thành phần chính của bạn để các thuộc tính HTML được cập nhật mỗi khi locale thay đổi:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Áp dụng hook để cập nhật thuộc tính lang và dir của thẻ <html> dựa trên locale.
  useI18nHTMLAttributes();

  // ... Phần còn lại của component của bạn
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Áp dụng hook để cập nhật thuộc tính lang và dir của thẻ <html> dựa trên locale.
  useI18nHTMLAttributes();

  // ... Phần còn lại của component của bạn
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Áp dụng hook để cập nhật thuộc tính lang và dir của thẻ <html> dựa trên locale.
  useI18nHTMLAttributes();

  // ... Phần còn lại của component của bạn
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;

module.exports = App;
```

Bằng cách áp dụng những thay đổi này, ứng dụng của bạn sẽ:

- Đảm bảo thuộc tính **ngôn ngữ** (`lang`) phản ánh chính xác locale hiện tại, điều này quan trọng cho SEO và hành vi của trình duyệt.
- Điều chỉnh **hướng văn bản** (`dir`) theo locale, nâng cao khả năng đọc và sử dụng cho các ngôn ngữ có thứ tự đọc khác nhau.
- Cung cấp trải nghiệm **dễ tiếp cận** hơn, vì các công nghệ hỗ trợ phụ thuộc vào các thuộc tính này để hoạt động tối ưu.

### Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

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

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

### Đi xa hơn

Để đi xa hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

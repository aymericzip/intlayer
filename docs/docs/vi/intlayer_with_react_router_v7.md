---
createdAt: 2025-09-04
updatedAt: 2025-10-03
title: Cách dịch ứng dụng React Router v7 của bạn – hướng dẫn i18n 2025
description: Tìm hiểu cách thêm quốc tế hóa (i18n) vào ứng dụng React Router v7 của bạn bằng Intlayer. Theo dõi hướng dẫn toàn diện này để làm cho ứng dụng của bạn đa ngôn ngữ với định tuyến nhận biết locale.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Định tuyến theo Locale
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 6.1.5
    date: 2025-10-03
    changes: Cập nhật tài liệu
  - version: 5.8.2
    date: 2025-09-04
    changes: Thêm cho React Router v7
---

# Dịch trang web React Router v7 của bạn bằng Intlayer | Quốc tế hóa (i18n)

Hướng dẫn này trình bày cách tích hợp **Intlayer** để thực hiện quốc tế hóa liền mạch trong các dự án React Router v7 với định tuyến nhận biết locale, hỗ trợ TypeScript và các thực hành phát triển hiện đại.

## Table of Contents

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng từ điển khai báo ở cấp độ component.
- **Định vị động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tự động tạo, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Tận hưởng các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.
- **Kích hoạt định tuyến nhận biết locale** với hệ thống định tuyến dựa trên cấu hình của React Router v7.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng React Router v7

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn sử dụng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng trình quản lý gói bạn ưa thích:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **react-intlayer**
  Gói tích hợp Intlayer với ứng dụng React. Nó cung cấp các context provider và hook cho việc quốc tế hóa trong React.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 2: Cấu hình dự án của bạn

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng React Router v7 với các route dựa trên hệ thống tệp

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="How to translate your React Router v7 app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-template) on GitHub.

Tạo một file cấu hình để cấu hình các ngôn ngữ của ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// cấu hình Intlayer
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // ngôn ngữ mặc định
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // các ngôn ngữ được hỗ trợ
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// cấu hình Intlayer
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // ngôn ngữ mặc định
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // các ngôn ngữ được hỗ trợ
  },
};

module.exports = config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập URL theo ngôn ngữ, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Thêm plugin intlayer vào cấu hình của bạn:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó còn cung cấp các alias để tối ưu hiệu suất.

### Bước 4: Cấu hình các Route của React Router v7

Thiết lập cấu hình routing với các route nhận biết ngôn ngữ:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:lang?", "routes/page.tsx"), // Trang chủ có hỗ trợ đa ngôn ngữ
    route("/:lang?/about", "routes/about/page.tsx"), // Trang about có hỗ trợ đa ngôn ngữ
  ]),
] satisfies RouteConfig;
```

### Bước 5: Tạo các Component Layout

Thiết lập root layout và các layout theo ngôn ngữ cụ thể:

#### Root Layout

```tsx fileName="app/routes/layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Bước 6: Khai báo Nội dung của bạn

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="app/routes/[lang]/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Xây dựng các ứng dụng đa ngôn ngữ một cách dễ dàng sử dụng React Router v7 và Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Tìm hiểu về chúng tôi",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      en: "Trang chủ",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./app`). Và phải phù hợp với phần mở rộng của tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 7: Tạo các thành phần nhận biết ngôn ngữ

Tạo một thành phần `LocalizedLink` để điều hướng nhận biết ngôn ngữ:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

Trong trường hợp bạn muốn điều hướng đến các route đã được địa phương hóa, bạn có thể sử dụng hook `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

### Bước 8: Sử dụng Intlayer trong các Trang của Bạn

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

#### Trang Chủ Đã Được Địa Phương Hóa

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md).

### Bước 9: Tạo Thành Phần Chuyển Đổi Ngôn Ngữ

Tạo một thành phần cho phép người dùng thay đổi ngôn ngữ:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Ngôn ngữ - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ theo Locale riêng của nó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ theo Locale hiện tại - ví dụ: Francés với locale hiện tại được đặt là Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> Để tìm hiểu thêm về hook `useLocale`, tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md).

### Bước 10: Thêm quản lý thuộc tính HTML (Tùy chọn)

Tạo một hook để quản lý các thuộc tính lang và dir của HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale; // đặt thuộc tính lang của thẻ gốc theo locale hiện tại
    document.documentElement.dir = getHTMLTextDir(locale); // đặt thuộc tính dir của thẻ gốc theo locale hiện tại
  }, [locale]);
};
```

Sau đó sử dụng nó trong component gốc của bạn:

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // nhập hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // gọi hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Bước 11: Thêm middleware (Tùy chọn)

Bạn cũng có thể sử dụng `intlayerProxy` để thêm routing phía server cho ứng dụng của bạn. Plugin này sẽ tự động phát hiện locale hiện tại dựa trên URL và thiết lập cookie locale phù hợp. Nếu không có locale nào được chỉ định, plugin sẽ xác định locale phù hợp nhất dựa trên ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được locale nào, nó sẽ chuyển hướng đến locale mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerProxy()],
});
```

---

## Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng các lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động:

```json5 fileName="tsconfig.json"
{
  // ... các cấu hình hiện có của bạn
  include: [
    // ... các phần include hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
  ],
}
```

---

## Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

---

## Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [Tài liệu Tiện ích mở rộng VS Code của Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Đi xa hơn

Để đi xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---

## Tham khảo Tài liệu

- [Tài liệu Intlayer](https://intlayer.org)
- [Tài liệu React Router v7](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md)
- [Khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)
- [Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

Hướng dẫn toàn diện này cung cấp tất cả những gì bạn cần để tích hợp Intlayer với React Router v7 cho một ứng dụng được quốc tế hóa hoàn chỉnh với định tuyến nhận biết locale và hỗ trợ TypeScript.

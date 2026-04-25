---
createdAt: 2025-10-25
updatedAt: 2025-12-30
title: Next.js i18n - Cách dịch ứng dụng Next.js 15 năm 2026
description: Khám phá cách làm cho trang web Next.js 15 của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js 15
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 15
applicationTemplate: https://github.com/aymericzip/intlayer-next-15-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Thêm đề cập đến `x-default` trong đối tượng `alternates`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Thêm đề cập đến hàm `withIntlayerSync()`"
  - version: 6.2.0
    date: 2025-10-09
    changes: "Thêm tài liệu cho hook `useLocale` với tùy chọn `onLocaleChange`"
  - version: 5.6.6
    date: 2025-10-02
    changes: "Thêm tài liệu cho hàm `getLocale` trong các hành động server"
  - version: 5.6.2
    date: 2025-09-23
    changes: "Thêm tài liệu cho việc theo dõi thay đổi từ điển trên Turbopack"
  - version: 5.6.2
    date: 2025-09-22
    changes: "Thêm tài liệu cho helper `multipleMiddlewares`"
  - version: 5.6.0
    date: 2025-07-06
    changes: "Chuyển hàm `withIntlayer()` thành hàm dựa trên promise"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
---

# Dịch trang web Next.js 15 của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại. Intlayer tích hợp liền mạch với framework **Next.js 15** mới nhất, bao gồm cả **App Router** mạnh mẽ của nó. Thư viện được tối ưu để làm việc với **Server Components** nhằm hiệu quả trong việc render và hoàn toàn tương thích với [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp component.
- **Địa phương hóa động metadata**, routes và nội dung.
- **Truy cập bản dịch trong cả component phía client và phía server**.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tự động tạo, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại. Intlayer tích hợp liền mạch với framework **Next.js 15** mới nhất, bao gồm cả **App Router** mạnh mẽ của nó. Nó được tối ưu để hoạt động với **Server Components** nhằm tăng hiệu quả render và hoàn toàn tương thích với [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Địa phương hóa động metadata**, các route và nội dung.
- **Truy cập bản dịch trong cả component phía client và phía server**.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tự động sinh ra, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.

> Intlayer tương thích với Next.js 12, 13, 14 và 15. Nếu bạn đang sử dụng Next.js Page Router, bạn có thể tham khảo [hướng dẫn này](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_page_router.md). Đối với Next.js 12, 13, 14 với App Router, tham khảo [hướng dẫn này](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_14.md).

---

## Hướng Dẫn Từng Bước Để Cài Đặt Intlayer Trong Ứng Dụng Next.js

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Giải pháp i18n tốt nhất cho Next.js? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-15-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Application Template](https://github.com/aymericzip/intlayer-next-15-template) trên GitHub.

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun x intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **next-intlayer**

  Gói tích hợp Intlayer với Next.js. Nó cung cấp các context provider và hook cho quốc tế hóa Next.js. Ngoài ra, nó bao gồm plugin Next.js để tích hợp Intlayer với [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), cũng như middleware để phát hiện locale ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 2: Cấu hình Dự án của Bạn

Here is the final structure that we will make:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Tạo một file cấu hình để cấu hình các ngôn ngữ của ứng dụng của bạn:

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

> Thông qua tệp cấu hình này, bạn có thể thiết lập URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Next.js của bạn

Cấu hình thiết lập Next.js của bạn để sử dụng Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* các tùy chọn cấu hình ở đây */
};

export default withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` được sử dụng để tích hợp Intlayer với Next.js. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong môi trường [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Ngoài ra, nó cung cấp các bí danh để tối ưu hiệu suất và đảm bảo tương thích với các thành phần server.

> Hàm `withIntlayer()` là một hàm promise. Nó cho phép chuẩn bị các từ điển intlayer trước khi quá trình build bắt đầu. Nếu bạn muốn sử dụng nó cùng với các plugin khác, bạn có thể dùng await. Ví dụ:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Nếu bạn muốn sử dụng nó một cách đồng bộ, bạn có thể dùng hàm `withIntlayerSync()`. Ví dụ:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> ### Bước 4: Định nghĩa các tuyến đường Locale động
>
> Xóa tất cả mọi thứ trong `RootLayout` và thay thế bằng đoạn mã sau:
>
> ```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
> import type { PropsWithChildren, FC } from "react";
> import "./globals.css";
>
> const RootLayout: FC<PropsWithChildren> = ({ children }) => (
>   // Bạn vẫn có thể bao bọc các children với các provider khác, như `next-themes`, `react-query`, `framer-motion`, v.v.
>   <>{children}</>
> );
> ```

export default RootLayout;

````

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Bạn vẫn có thể bao bọc children với các provider khác, như `next-themes`, `react-query`, `framer-motion`, v.v.
  <>{children}</>
);

export default RootLayout;
````

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Bạn vẫn có thể bao bọc children với các provider khác, như `next-themes`, `react-query`, `framer-motion`, v.v.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Giữ cho component `RootLayout` trống cho phép thiết lập các thuộc tính [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) và [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) trên thẻ `<html>`.

Để triển khai dynamic routing, cung cấp đường dẫn cho locale bằng cách thêm một layout mới trong thư mục `[locale]` của bạn:

````tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
> Việc giữ cho component `RootLayout` trống cho phép thiết lập các thuộc tính [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) và [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) cho thẻ `<html>`.

Để triển khai routing động, cung cấp đường dẫn cho locale bằng cách thêm một layout mới trong thư mục `[locale]` của bạn:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
````

> Đoạn đường dẫn `[locale]` được sử dụng để định nghĩa locale. Ví dụ: `/en-US/about` sẽ tương ứng với `en-US` và `/fr/about` sẽ tương ứng với `fr`.

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
const { locale } = await params;
return (

<html lang={locale} dir={getHTMLTextDir(locale)}>
<body className={inter.className}>
        {children}
      </body>
</html>
);
};

module.exports = LocaleLayout;

````

> Đoạn đường dẫn `[locale]` được sử dụng để xác định locale. Ví dụ: `/en-US/about` sẽ tham chiếu đến `en-US` và `/fr/about` sẽ tham chiếu đến `fr`.

> Ở giai đoạn này, bạn sẽ gặp lỗi: `Error: Missing <html> and <body> tags in the root layout.`. Điều này là bình thường vì file `/app/page.tsx` không còn được sử dụng và có thể xóa bỏ. Thay vào đó, phân đoạn đường dẫn `[locale]` sẽ kích hoạt trang `/app/[locale]/page.tsx`. Do đó, các trang sẽ có thể truy cập qua các đường dẫn như `/en`, `/fr`, `/es` trên trình duyệt của bạn. Để đặt locale mặc định làm trang gốc, hãy tham khảo thiết lập `middleware` trong bước 7.

Sau đó, triển khai hàm `generateStaticParams` trong Layout ứng dụng của bạn.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Dòng cần chèn

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Phần còn lại của mã */
};

export default LocaleLayout;
````

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Dòng cần chèn

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Phần còn lại của mã */
};

// ... Phần còn lại của mã
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Dòng cần chèn

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Phần còn lại của mã */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` đảm bảo rằng ứng dụng của bạn xây dựng trước các trang cần thiết cho tất cả các ngôn ngữ, giảm thiểu tính toán khi chạy và cải thiện trải nghiệm người dùng. Để biết thêm chi tiết, hãy tham khảo [tài liệu Next.js về generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer hoạt động với `export const dynamic = 'force-static';` để đảm bảo các trang được xây dựng trước cho tất cả các ngôn ngữ.

### Bước 5: Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar",
        "vi": "Bắt đầu bằng cách chỉnh sửa"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và phải phù hợp với phần mở rộng của tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 6: Sử dụng Nội dung trong Mã của Bạn

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p> {/* Nội dung chính để bắt đầu */}
      <code>{content.getStarted.pageLink}</code>{" "}
      {/* Liên kết trang để bắt đầu */}
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** được sử dụng để cung cấp locale cho các component phía client. Nó có thể được đặt trong bất kỳ component cha nào, bao gồm cả layout. Tuy nhiên, việc đặt nó trong layout được khuyến nghị vì Next.js chia sẻ mã layout giữa các trang, giúp hiệu quả hơn. Bằng cách sử dụng `IntlayerClientProvider` trong layout, bạn tránh việc khởi tạo lại cho mỗi trang, cải thiện hiệu suất và duy trì ngữ cảnh localization nhất quán trong toàn bộ ứng dụng của bạn.
- **`IntlayerServerProvider`** được sử dụng để cung cấp locale cho các component con phía server. Nó không thể được đặt trong layout.

  > Layout và trang không thể chia sẻ một ngữ cảnh server chung vì hệ thống ngữ cảnh server dựa trên kho dữ liệu theo từng yêu cầu (thông qua cơ chế [React's cache](https://react.dev/reference/react/cache)), khiến mỗi "context" được tạo lại cho các phân đoạn khác nhau của ứng dụng. Việc đặt provider trong một layout dùng chung sẽ phá vỡ sự cô lập này, ngăn cản việc truyền đúng giá trị ngữ cảnh server đến các component server của bạn.

  > Layout và trang không thể chia sẻ một context server chung vì hệ thống context server dựa trên kho dữ liệu theo từng yêu cầu (qua cơ chế [React's cache](https://react.dev/reference/react/cache)), dẫn đến mỗi "context" được tạo lại cho các phân đoạn khác nhau của ứng dụng. Việc đặt provider trong một layout dùng chung sẽ phá vỡ sự cô lập này, ngăn cản việc truyền đúng các giá trị context server đến các component server của bạn.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, như `alt`, `title`, `href`, `aria-label`, v.v., bạn phải gọi giá trị của hàm, ví dụ:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useIntlayer.md).

### (Tùy chọn) Bước 7: Cấu hình Middleware để Phát hiện Ngôn ngữ

Thiết lập middleware để phát hiện ngôn ngữ ưu tiên của người dùng:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerMiddleware` được sử dụng để phát hiện ngôn ngữ ưu tiên của người dùng và chuyển hướng họ đến URL phù hợp như được chỉ định trong [cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md). Ngoài ra, nó còn cho phép lưu ngôn ngữ ưu tiên của người dùng trong cookie.

> Nếu bạn cần kết hợp nhiều middleware với nhau (ví dụ, `intlayerMiddleware` cùng với middleware xác thực hoặc middleware tùy chỉnh), Intlayer hiện cung cấp một helper gọi là `multipleMiddlewares`.

```ts
import {
  multipleMiddlewares,
  intlayerMiddleware,
} from "next-intlayer/middleware";
import { customMiddleware } from "@utils/customMiddleware";

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  customMiddleware,
]);
```

### (Tùy chọn) Bước 8: Quốc tế hóa metadata của bạn

Trong trường hợp bạn muốn quốc tế hóa metadata của mình, chẳng hạn như tiêu đề trang, bạn có thể sử dụng hàm `generateMetadata` do Next.js cung cấp. Bên trong, bạn có thể lấy nội dung từ hàm `getIntlayer` để dịch metadata của bạn.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
      vi: "Tạo ứng dụng Next",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
      vi: "Được tạo bởi create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
          "vi": "Logo Preact"
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "vi": "Được tạo bởi create next app"
        "es": "Generado por create next app",
      },
    },
  },
};
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Tạo một đối tượng chứa tất cả các url cho mỗi ngôn ngữ.
   *
   * Ví dụ:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Trả về
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Phần còn lại của mã
````

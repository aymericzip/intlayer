---
createdAt: 2024-12-06
updatedAt: 2025-12-30
title: Cách dịch ứng dụng Next.js 16 của bạn – hướng dẫn i18n 2026
description: Khám phá cách làm cho trang web Next.js 16 của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Thêm lệnh init
  - version: 7.0.6
    date: 2025-11-01
    changes: Đã thêm đề cập đến `x-default` trong đối tượng `alternates`
  - version: 7.0.0
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Next.js 16 của bạn bằng Intlayer | Quốc tế hóa (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Giải pháp i18n tốt nhất cho Next.js? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu Ứng dụng](https://github.com/aymericzip/intlayer-next-16-template) trên GitHub.

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại. Intlayer tích hợp liền mạch với framework **Next.js 16** mới nhất, bao gồm cả **App Router** mạnh mẽ. Nó được tối ưu hóa để hoạt động với **Server Components** nhằm kết xuất hiệu quả và hoàn toàn tương thích với [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ thành phần.
- **Bản địa hóa động metadata**, các tuyến đường và nội dung.
- **Truy cập bản dịch trong cả thành phần phía máy khách và phía máy chủ**.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu tự động tạo, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, như phát hiện và chuyển đổi ngôn ngữ động.

> Intlayer tương thích với Next.js 12, 13, 14 và 16. Nếu bạn đang sử dụng Next.js Page Router, bạn có thể tham khảo [hướng dẫn này](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_page_router.md).
> Định tuyến ngôn ngữ (Locale routing) hữu ích cho SEO, kích thước gói và hiệu suất. Nếu bạn không cần nó, bạn có thể tham khảo [hướng dẫn này](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_no_locale_path.md).
> Đối với Next.js 12, 13, 14 với App Router, hãy tham khảo [hướng dẫn này](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_14.md).

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Next.js

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
bunx intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã (transpilation) và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **next-intlayer**

  Gói tích hợp Intlayer với Next.js. Nó cung cấp các nhà cung cấp ngữ cảnh (context providers) và các hook cho việc quốc tế hóa Next.js. Ngoài ra, nó bao gồm plugin Next.js để tích hợp Intlayer với [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), cũng như proxy để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 2: Cấu hình Dự án của Bạn

Đây là cấu trúc cuối cùng mà chúng ta sẽ thực hiện:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Bố cục ngôn ngữ cho nhà cung cấp Intlayer
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Bố cục gốc cho kiểu dáng và các nhà cung cấp toàn cục
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Nếu bạn không muốn định tuyến ngôn ngữ, intlayer có thể được sử dụng như một nhà cung cấp / hook đơn giản. Xem [hướng dẫn này](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_no_locale_path.md) để biết thêm chi tiết.

Tạo một tệp cấu hình để định cấu hình các ngôn ngữ cho ứng dụng của bạn:

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

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL được bản địa hóa, chuyển hướng proxy, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt nhật ký Intlayer trong bảng điều khiển và hơn thế nữa. Để biết danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào Cấu hình Next.js của Bạn

Định cấu hình thiết lập Next.js của bạn để sử dụng Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* tùy chọn cấu hình tại đây */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* tùy chọn cấu hình tại đây */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* tùy chọn cấu hình tại đây */
};

module.exports = withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` được sử dụng để tích hợp Intlayer với Next.js. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong môi trường [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Ngoài ra, nó cung cấp các bí danh (aliases) để tối ưu hóa hiệu suất và đảm bảo khả năng tương thích với các thành phần máy chủ.

> Hàm `withIntlayer()` là một hàm trả về promise. Nó cho phép chuẩn bị các từ điển intlayer trước khi quá trình xây dựng bắt đầu. Nếu bạn muốn sử dụng nó với các plugin khác, bạn có thể await nó. Ví dụ:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Nếu bạn muốn sử dụng nó một cách đồng bộ, bạn có thể sử dụng hàm `withIntlayerSync()`. Ví dụ:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer tự động phát hiện xem dự án của bạn có đang sử dụng **webpack** hay **Turbopack** dựa trên các cờ dòng lệnh `--webpack`, `--turbo`, hoặc `--turbopack`, cũng như **phiên bản Next.js** hiện tại của bạn.
>
> Kể từ `next>=16`, nếu bạn đang sử dụng **Rspack**, bạn phải buộc Intlayer sử dụng cấu hình webpack một cách rõ ràng bằng cách tắt Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### Bước 4: Định nghĩa các Tuyến đường Ngôn ngữ Động

Xóa mọi thứ khỏi `RootLayout` và thay thế bằng mã sau:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Bạn vẫn có thể bao bọc các con bằng các nhà cung cấp khác, như `next-themes`, `react-query`, `framer-motion`, v.v.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Bạn vẫn có thể bao bọc các con bằng các nhà cung cấp khác, như `next-themes`, `react-query`, `framer-motion`, v.v.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Bạn vẫn có thể bao bọc các con bằng các nhà cung cấp khác, như `next-themes`, `react-query`, `framer-motion`, v.v.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Việc giữ cho thành phần `RootLayout` trống cho phép thiết lập các thuộc tính [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) và [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) cho thẻ `<html>`.

Để triển khai định tuyến động, hãy cung cấp đường dẫn cho ngôn ngữ bằng cách thêm một bố cục mới trong thư mục `[locale]` của bạn:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> Đoạn đường dẫn `[locale]` được sử dụng để xác định ngôn ngữ. Ví dụ: `/en-US/about` sẽ tham chiếu đến `en-US` và `/fr/about` đến `fr`.

> Ở giai đoạn này, bạn sẽ gặp lỗi: `Error: Missing <html> and <body> tags in the root layout.`. Điều này là bình thường vì tệp `/app/page.tsx` không còn được sử dụng và có thể bị xóa. Thay vào đó, đoạn đường dẫn `[locale]` sẽ kích hoạt trang `/app/[locale]/page.tsx`. Do đó, các trang sẽ có thể truy cập được qua các đường dẫn như `/en`, `/fr`, `/es` trong trình duyệt của bạn. Để đặt ngôn ngữ mặc định làm trang gốc, hãy tham khảo thiết lập `proxy` trong bước 7.

Sau đó, triển khai hàm `generateStaticParams` trong Bố cục ứng dụng của bạn.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Dòng cần chèn

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Phần còn lại của mã*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Dòng cần chèn

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Phần còn lại của mã*/
};

// ... Phần còn lại của mã
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Dòng cần chèn

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Phần còn lại của mã*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` đảm bảo rằng ứng dụng của bạn xây dựng trước các trang cần thiết cho tất cả các ngôn ngữ, giảm tính toán thời gian chạy và cải thiện trải nghiệm người dùng. Để biết thêm chi tiết, hãy tham khảo [tài liệu Next.js về generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer hoạt động với `export const dynamic = 'force-static';` để đảm bảo rằng các trang được xây dựng trước cho tất cả các ngôn ngữ.

### Bước 5: Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = pageContent;
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
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (theo mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (theo mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 6: Sử dụng Nội dung trong Mã của Bạn

Truy cập từ điển nội dung của bạn trong toàn bộ ứng dụng:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** được sử dụng để cung cấp ngôn ngữ cho các thành phần phía máy khách. Nó có thể được đặt trong bất kỳ thành phần cha nào, bao gồm cả bố cục. Tuy nhiên, việc đặt nó trong một bố cục được khuyến nghị vì Next.js chia sẻ mã bố cục giữa các trang, giúp hiệu quả hơn. Bằng cách sử dụng `IntlayerClientProvider` trong bố cục, bạn tránh việc khởi tạo lại nó cho mỗi trang, cải thiện hiệu suất và duy trì ngữ cảnh bản địa hóa nhất quán trong toàn bộ ứng dụng của bạn.
- **`IntlayerServerProvider`** được sử dụng để cung cấp ngôn ngữ cho các thành phần con phía máy chủ. Nó không thể được đặt trong bố cục.

  > Bố cục và trang không thể chia sẻ ngữ cảnh máy chủ chung vì hệ thống ngữ cảnh máy chủ dựa trên kho dữ liệu theo từng yêu cầu (thông qua cơ chế [React's cache](https://react.dev/reference/react/cache)), khiến mỗi "ngữ cảnh" được tạo lại cho các đoạn khác nhau của ứng dụng. Việc đặt nhà cung cấp trong một bố cục dùng chung sẽ phá vỡ sự cô lập này, ngăn cản việc truyền đúng các giá trị ngữ cảnh máy chủ đến các thành phần máy chủ của bạn.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
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

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
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

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn phải gọi giá trị của hàm, như:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Để Tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useIntlayer.md).

### (Tùy chọn) Bước 7: Cấu hình Proxy để Phát hiện Ngôn ngữ

Thiết lập proxy để phát hiện ngôn ngữ ưu tiên của người dùng:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy` được sử dụng để phát hiện ngôn ngữ ưu tiên của người dùng và chuyển hướng họ đến URL thích hợp như được chỉ định trong [cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md). Ngoài ra, nó cho phép lưu ngôn ngữ ưu tiên của người dùng trong một cookie.

> Nếu bạn cần xâu chuỗi nhiều proxy với nhau (ví dụ: `intlayerProxy` với xác thực hoặc các proxy tùy chỉnh), Intlayer hiện cung cấp một trợ giúp gọi là `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (Tùy chọn) Bước 8: Quốc tế hóa metadata của bạn

Trong trường hợp bạn muốn quốc tế hóa metadata của mình, chẳng hạn như tiêu đề trang, bạn có thể sử dụng hàm `generateMetadata` do Next.js cung cấp. Bên trong đó, bạn có thể truy xuất nội dung từ hàm `getIntlayer` để dịch metadata của mình.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
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
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Tạo một đối tượng chứa tất cả url cho từng ngôn ngữ.
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

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Tạo một đối tượng chứa tất cả url cho từng ngôn ngữ.
   *
   * Ví dụ:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Trả về
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Tạo một đối tượng chứa tất cả url cho từng ngôn ngữ.
   *
   * Ví dụ:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Trả về
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

module.exports = { generateMetadata };

// ... Phần còn lại của mã
````

> Lưu ý rằng hàm `getIntlayer` được nhập từ `next-intlayer` trả về nội dung của bạn được bao bọc trong một `IntlayerNode`, cho phép tích hợp với trình chỉnh sửa trực quan. Ngược lại, hàm `getIntlayer` được nhập từ `intlayer` trả về nội dung của bạn trực tiếp mà không có các thuộc tính bổ sung.

Ngoài ra, bạn có thể sử dụng hàm `getTranslation` để khai báo metadata của mình. Tuy nhiên, việc sử dụng các tệp khai báo nội dung được khuyến nghị để tự động hóa việc dịch metadata của bạn và tách rời nội dung tại một thời điểm nào đó.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Phần còn lại của mã
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Phần còn lại của mã
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... Phần còn lại của mã
```

> Tìm hiểu thêm về tối ưu hóa metadata [trên tài liệu chính thức của Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Tùy chọn) Bước 9: Quốc tế hóa sitemap.xml và robots.txt của bạn

Để quốc tế hóa `sitemap.xml` và `robots.txt` của bạn, bạn có thể sử dụng hàm `getMultilingualUrls` do Intlayer cung cấp. Hàm này cho phép bạn tạo các URL đa ngôn ngữ cho sitemap của mình.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Tìm hiểu thêm về tối ưu hóa sitemap [trên tài liệu chính thức của Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Tìm hiểu thêm về tối ưu hóa robots.txt [trên tài liệu chính thức của Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Tùy chọn) Bước 10: Thay đổi ngôn ngữ của nội dung của bạn

Để thay đổi ngôn ngữ của nội dung trong Next.js, cách được khuyến nghị là sử dụng thành phần `Link` để chuyển hướng người dùng đến trang bản địa hóa thích hợp. Thành phần `Link` cho phép tải trước trang, giúp tránh việc tải lại toàn bộ trang.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Sẽ đảm bảo nút "quay lại" của trình duyệt sẽ chuyển hướng đến trang trước đó
          >
            <span>
              {/* Locale - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ trong chính Locale đó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong Locale hiện tại - ví dụ: Francés với locale hiện tại là Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Sẽ đảm bảo nút "quay lại" của trình duyệt sẽ chuyển hướng đến trang trước đó
          >
            <span>
              {/* Locale - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ trong chính Locale đó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong Locale hiện tại - ví dụ: Francés với locale hiện tại là Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Sẽ đảm bảo nút "quay lại" của trình duyệt sẽ chuyển hướng đến trang trước đó
          >
            <span>
              {/* Locale - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ trong chính Locale đó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong Locale hiện tại - ví dụ: Francés với locale hiện tại là Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Một cách thay thế là sử dụng hàm `setLocale` do hook `useLocale` cung cấp. Hàm này sẽ không cho phép tải trước trang. Xem [tài liệu hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md) để biết thêm chi tiết.

> Bạn cũng có thể thiết lập một hàm trong tùy chọn `onLocaleChange` để kích hoạt một hàm tùy chỉnh khi ngôn ngữ thay đổi.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Phần còn lại của mã

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Chuyển sang tiếng Pháp
  </button>
);
```

> Tài liệu tham khảo:
>
> - [hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md)
> - [hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleName.md)
> - [hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md)
> - [hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getHTMLTextDir.md)
> - [thuộc tính `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [thuộc tính `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [thuộc tính `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [thuộc tính `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Tùy chọn) Bước 11: Tạo một thành phần Link được bản địa hóa

Để đảm bảo rằng việc điều hướng của ứng dụng tôn trọng ngôn ngữ hiện tại, bạn có thể tạo một thành phần `Link` tùy chỉnh. Thành phần này tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ. Ví dụ: khi một người dùng nói tiếng Pháp nhấp vào liên kết đến trang "Giới thiệu", họ sẽ được chuyển hướng đến `/fr/about` thay vì `/about`.

Hành vi này hữu ích vì một số lý do:

- **SEO và Trải nghiệm người dùng**: Các URL được bản địa hóa giúp công cụ tìm kiếm lập chỉ mục các trang dành riêng cho ngôn ngữ một cách chính xác và cung cấp cho người dùng nội dung bằng ngôn ngữ ưa thích của họ.
- **Tính nhất quán**: Bằng cách sử dụng một liên kết được bản địa hóa trong toàn bộ ứng dụng của mình, bạn đảm bảo rằng việc điều hướng luôn nằm trong ngôn ngữ hiện tại, ngăn chặn việc chuyển đổi ngôn ngữ không mong muốn.
- **Khả năng bảo trì**: Việc tập trung logic bản địa hóa trong một thành phần duy nhất giúp đơn giản hóa việc quản lý các URL, làm cho mã nguồn của bạn dễ bảo trì và mở rộng hơn khi ứng dụng phát triển.

Dưới đây là việc triển khai thành phần `Link` được bản địa hóa trong TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Hàm tiện ích để kiểm tra xem một URL cho trước có phải là bên ngoài hay không.
 * Nếu URL bắt đầu bằng http:// hoặc https://, nó được coi là bên ngoài.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Một thành phần Link tùy chỉnh thích ứng thuộc tính href dựa trên ngôn ngữ hiện tại.
 * Đối với các liên kết nội bộ, nó sử dụng `getLocalizedUrl` để thêm tiền tố ngôn ngữ vào URL (ví dụ: /fr/about).
 * Điều này đảm bảo rằng việc điều hướng vẫn nằm trong cùng một ngữ cảnh ngôn ngữ.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Nếu liên kết là nội bộ và một href hợp lệ được cung cấp, lấy URL được bản địa hóa.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * Hàm tiện ích để kiểm tra xem một URL cho trước có phải là bên ngoài hay không.
 * Nếu URL bắt đầu bằng http:// hoặc https://, nó được coi là bên ngoài.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Một thành phần Link tùy chỉnh thích ứng thuộc tính href dựa trên ngôn ngữ hiện tại.
 * Đối với các liên kết nội bộ, nó sử dụng `getLocalizedUrl` để thêm tiền tố ngôn ngữ vào URL (ví dụ: /fr/about).
 * Điều này đảm bảo rằng việc điều hướng vẫn nằm trong cùng một ngữ cảnh ngôn ngữ.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Nếu liên kết là nội bộ và một href hợp lệ được cung cấp, lấy URL được bản địa hóa.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * Hàm tiện ích để kiểm tra xem một URL cho trước có phải là bên ngoài hay không.
 * Nếu URL bắt đầu bằng http:// hoặc https://, nó được coi là bên ngoài.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Một thành phần Link tùy chỉnh thích ứng thuộc tính href dựa trên ngôn ngữ hiện tại.
 * Đối với các liên kết nội bộ, nó sử dụng `getLocalizedUrl` để thêm tiền tố ngôn ngữ vào URL (ví dụ: /fr/about).
 * Điều này đảm bảo rằng việc điều hướng vẫn nằm trong cùng một ngữ cảnh ngôn ngữ.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Nếu liên kết là nội bộ và một href hợp lệ được cung cấp, lấy URL được bản địa hóa.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Cách hoạt động

- **Phát hiện các liên kết bên ngoài**:  
  Hàm trợ giúp `checkIsExternalLink` xác định xem một URL có phải là bên ngoài hay không. Các liên kết bên ngoài được để nguyên vì chúng không cần bản địa hóa.

- **Truy xuất ngôn ngữ hiện tại**:  
  Hook `useLocale` cung cấp ngôn ngữ hiện tại (ví dụ: `fr` cho tiếng Pháp).

- **Bản địa hóa URL**:  
  Đối với các liên kết nội bộ (nghĩa là không phải bên ngoài), `getLocalizedUrl` được sử dụng để tự động thêm tiền tố ngôn ngữ hiện tại vào URL. Điều này có nghĩa là nếu người dùng của bạn đang ở tiếng Pháp, việc truyền `/about` dưới dạng `href` sẽ chuyển nó thành `/fr/about`.

- **Trả về liên kết**:  
  Thành phần trả về một phần tử `<a>` với URL được bản địa hóa, đảm bảo rằng việc điều hướng nhất quán với ngôn ngữ.

Bằng cách tích hợp thành phần `Link` này trong toàn bộ ứng dụng của mình, bạn duy trì một trải nghiệm người dùng nhất quán và nhận biết ngôn ngữ đồng thời được hưởng lợi từ việc cải thiện SEO và khả năng sử dụng.

### (Tùy chọn) Bước 12: Lấy ngôn ngữ hiện tại trong Server Actions

Nếu bạn cần ngôn ngữ hoạt động bên trong một Server Action (ví dụ: để bản địa hóa email hoặc chạy logic nhận biết ngôn ngữ), hãy gọi `getLocale` từ `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Làm điều gì đó với ngôn ngữ
};
```

> Hàm `getLocale` tuân theo một chiến lược phân cấp để xác định ngôn ngữ của người dùng:
>
> 1. Đầu tiên, nó kiểm tra các tiêu đề yêu cầu cho một giá trị ngôn ngữ có thể đã được thiết lập bởi proxy.
> 2. Nếu không tìm thấy ngôn ngữ nào trong tiêu đề, nó sẽ tìm kiếm ngôn ngữ được lưu trữ trong cookie.
> 3. Nếu không tìm thấy cookie nào, nó sẽ cố gắng phát hiện ngôn ngữ ưa thích của người dùng từ cài đặt trình duyệt của họ.
> 4. Là phương án cuối cùng, nó quay trở lại ngôn ngữ mặc định đã định cấu hình của ứng dụng.
>
> Điều này đảm bảo rằng ngôn ngữ thích hợp nhất được chọn dựa trên ngữ cảnh có sẵn.

### (Tùy chọn) Bước 13: Tối ưu hóa kích thước gói của bạn

Khi sử dụng `next-intlayer`, các từ điển được đưa vào gói cho mỗi trang theo mặc định. Để tối ưu hóa kích thước gói, Intlayer cung cấp một plugin SWC tùy chọn giúp thay thế các cuộc gọi `useIntlayer` một cách thông minh bằng các macro. Điều này đảm bảo các từ điển chỉ được đưa vào gói cho các trang thực sự sử dụng chúng.

Để bật tính năng tối ưu hóa này, hãy cài đặt gói `@intlayer/swc`. Sau khi cài đặt, `next-intlayer` sẽ tự động phát hiện và sử dụng plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> Lưu ý: Tính năng tối ưu hóa này chỉ khả dụng cho Next.js 13 trở lên.

> Lưu ý: Gói này không được cài đặt theo mặc định vì các plugin SWC vẫn đang trong quá trình thử nghiệm trên Next.js. Nó có thể thay đổi trong tương lai.

> Lưu ý: Nếu bạn đặt tùy chọn thành `importMode: 'dynamic'` hoặc `importMode: 'live'` (trong cấu hình `dictionary`), nó sẽ dựa trên Suspense, vì vậy bạn sẽ phải bao bọc các cuộc gọi `useIntlayer` của mình trong một ranh giới `Suspense`. Điều đó có nghĩa là, bạn sẽ không thể sử dụng `useIntlayer` trực tiếp ở cấp cao nhất của thành phần Trang / Bố cục của mình.

### Theo dõi các thay đổi từ điển trên Turbopack

Khi sử dụng Turbopack làm máy chủ phát triển của bạn với lệnh `next dev`, các thay đổi từ điển sẽ không được tự động phát hiện theo mặc định.

Hạn chế này xảy ra vì Turbopack không thể chạy các plugin webpack song song để theo dõi các thay đổi trong tệp nội dung của bạn. Để giải quyết vấn đề này, bạn sẽ cần sử dụng lệnh `intlayer watch` để chạy đồng thời cả máy chủ phát triển và trình theo dõi xây dựng Intlayer.

```json5 fileName="package.json"
{
  // ... Các cấu hình package.json hiện có của bạn
  "scripts": {
    // ... Các cấu hình scripts hiện có của bạn
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Nếu bạn đang sử dụng next-intlayer@<=6.x.x, bạn cần giữ cờ `--turbopack` để ứng dụng Next.js 16 hoạt động chính xác với Turbopack. Chúng tôi khuyên bạn nên sử dụng next-intlayer@>=7.x.x để tránh hạn chế này.

### Cấu hình TypeScript

Intlayer sử dụng tăng cường mô-đun (module augmentation) để nhận được các lợi ích của TypeScript và làm cho cơ sở mã của bạn mạnh mẽ hơn.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh cam kết chúng vào kho lưu trữ Git của mình.

Để thực hiện việc này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa bản dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội tuyến** nội dung đã dịch.
- **Các hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Đi Xa Hơn

Để đi xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc bên ngoài hóa nội dung của bạn bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

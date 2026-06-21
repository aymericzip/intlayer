---
createdAt: 2024-12-06
updatedAt: 2026-05-31
title: "Next.js 14 i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Next.js 14 đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js 14
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 14
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 6.2.0
    date: 2025-10-09
    changes: "Thêm tài liệu cho hook `useLocale` với tùy chọn `onLocaleChange`"
  - version: 5.6.6
    date: 2025-10-02
    changes: "Thêm tài liệu cho hàm `getLocale` trên các hành động server"
  - version: 5.6.2
    date: 2025-09-22
    changes: "Thêm tài liệu cho helper `multipleMiddlewares`"
  - version: 5.6.0
    date: 2025-07-06
    changes: "Chuyển hàm `withIntlayer()` thành hàm dựa trên promise"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Dịch trang web Next.js 14 và App Router của bạn bằng Intlayer | Quốc tế hóa (i18n)

<Tabs defaultTab="code">
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `next-intl` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>

<Accordion header="Phạm vi bảo hiểm đầy đủ của Next.js">

Intlayer được tối ưu hóa để hoạt động với **Thành phần máy chủ** nhằm hiển thị hiệu quả và hoàn toàn tương thích với [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Nó không chặn hiển thị tĩnh và cung cấp phần mềm trung gian cũng như tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

> Intlayer tương thích với Next.js 12, 13, 14, 15 và 16. Nếu đang sử dụng Bộ định tuyến trang Next.js, bạn có thể tham khảo [hướng dẫn] này(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Định tuyến ngôn ngữ rất hữu ích cho SEO, kích thước bundle và hiệu suất. Nếu không cần, bạn có thể tham khảo [hướng dẫn] này(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Đối với Next.js 12, 13, 14 và 15 với Bộ định tuyến ứng dụng, hãy tham khảo [hướng dẫn] này (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm tới 50% kích thước bundle và kích thước trang**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

</Accordion>

<Accordion header="Đại lý AI">

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tính năng tự động hóa để dịch trong quy trình CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí do nhà cung cấp AI của bạn chi trả. Intlayer cũng cung cấp **trình biên dịch** để tự động trích xuất nội dung cũng như [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

</Accordion>

<Accordion header="Hiệu suất">

Việc kết nối các tệp JSON lớn với các thành phần có thể dẫn đến các vấn đề về hiệu suất và khả năng phản hồi. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build.

</Accordion>

<Accordion header="Mở rộng quy mô không có nhà phát triển">

Không chỉ là giải pháp i18n, Intlayer còn cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình trong **thời gian thực**, giúp việc cộng tác với người dịch, người viết quảng cáo và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>
</AccordionGroup>

---

## Hướng Dẫn Từng Bước Để Cài Đặt Intlayer Trong Ứng Dụng Next.js

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-next-14-template) trên GitHub.

<Steps>

<Step number={1} title="Cài Đặt Các Phụ Thuộc">

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **next-intlayer**

  Gói tích hợp Intlayer với Next.js. Nó cung cấp các context provider và hook cho việc quốc tế hóa trong Next.js. Ngoài ra, nó bao gồm plugin Next.js để tích hợp Intlayer với [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie, và xử lý chuyển hướng URL.

</Step>

<Step number={2} title="Cấu hình Dự án của Bạn">

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

Tạo một file cấu hình để cấu hình các ngôn ngữ cho ứng dụng của bạn:

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

> Thông qua tệp cấu hình này, bạn có thể thiết lập URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung của bạn, tắt các bản ghi Intlayer trong console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Tích hợp Intlayer vào Cấu hình Next.js của Bạn">

Cấu hình thiết lập Next.js của bạn để sử dụng Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> Plugin `withIntlayer()` của Next.js được sử dụng để tích hợp Intlayer với Next.js. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong môi trường [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Ngoài ra, nó cung cấp các bí danh để tối ưu hiệu suất và đảm bảo tương thích với các thành phần server.

> Hàm `withIntlayer()` là một hàm promise. Nếu bạn muốn sử dụng nó cùng với các plugin khác, bạn có thể sử dụng await. Ví dụ:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

</Step>

<Step number={4} title="Cấu hình Middleware để Phát hiện Ngôn ngữ">

Thiết lập middleware để phát hiện ngôn ngữ ưu tiên của người dùng:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerMiddleware` được sử dụng để phát hiện ngôn ngữ ưu tiên của người dùng và chuyển hướng họ đến URL phù hợp như được chỉ định trong [cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md). Ngoài ra, nó còn cho phép lưu ngôn ngữ ưu tiên của người dùng trong cookie.

> Điều chỉnh tham số `matcher` để phù hợp với các tuyến đường của ứng dụng của bạn. Để biết thêm chi tiết, hãy tham khảo [tài liệu Next.js về cấu hình matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

> Nếu bạn cần kết hợp nhiều middleware với nhau (ví dụ, `intlayerMiddleware` cùng với xác thực hoặc các middleware tùy chỉnh), Intlayer hiện cung cấp một helper gọi là `multipleMiddlewares`.

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

</Step>

<Step number={5} title="Định nghĩa các tuyến đường ngôn ngữ động">

Xóa tất cả nội dung trong `RootLayout` và thay thế bằng đoạn mã sau:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Bạn vẫn có thể bao bọc các children với các provider khác, như `next-themes`, `react-query`, `framer-motion`, v.v.
  <>{children}</>
);

export default RootLayout;
```

> Việc giữ cho component `RootLayout` trống cho phép thiết lập các thuộc tính [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) và [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) cho thẻ `<html>`.

Để triển khai dynamic routing, cung cấp đường dẫn cho locale bằng cách thêm một layout mới trong thư mục `[locale]` của bạn:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import {
  type Next14LayoutIntlayer,
  IntlayerClientProvider,
} from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </body>
  </html>
);

export default LocaleLayout;
```

> Đoạn đường dẫn `[locale]` được sử dụng để xác định locale. Ví dụ: `/en-US/about` sẽ tham chiếu đến `en-US` và `/fr/about` sẽ tham chiếu đến `fr`.

> Ở giai đoạn này, bạn sẽ gặp lỗi: `Error: Missing <html> and <body> tags in the root layout.`. Điều này là bình thường vì file `/app/page.tsx` không còn được sử dụng và có thể bị xóa. Thay vào đó, đoạn đường dẫn `[locale]` sẽ kích hoạt trang `/app/[locale]/page.tsx`. Do đó, các trang sẽ có thể truy cập qua các đường dẫn như `/en`, `/fr`, `/es` trên trình duyệt của bạn. Để đặt locale mặc định làm trang gốc, hãy tham khảo phần thiết lập `middleware` trong bước 4.

Sau đó, triển khai hàm `generateStaticParams` trong Layout ứng dụng của bạn.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Dòng cần chèn

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Phần còn lại của mã */
};

export default LocaleLayout;
```

> `generateStaticParams` đảm bảo rằng ứng dụng của bạn sẽ tiền xây dựng các trang cần thiết cho tất cả các locale, giảm thiểu tính toán khi chạy và cải thiện trải nghiệm người dùng. Để biết thêm chi tiết, tham khảo [tài liệu Next.js về generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

</Step>

<Step number={6} title="Khai báo Nội dung của Bạn">

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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
        "en": "Bắt đầu bằng cách chỉnh sửa",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và khớp với phần mở rộng của file khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={7} title="Sử dụng Nội dung trong Mã của Bạn">

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
        <ClientComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** được sử dụng để cung cấp locale cho các component phía client. Nó có thể được đặt trong bất kỳ component cha nào, bao gồm cả layout. Tuy nhiên, việc đặt nó trong layout được khuyến nghị vì Next.js chia sẻ mã layout giữa các trang, giúp hiệu quả hơn. Bằng cách sử dụng `IntlayerClientProvider` trong layout, bạn tránh phải khởi tạo lại cho mỗi trang, cải thiện hiệu suất và duy trì ngữ cảnh localization nhất quán trong toàn bộ ứng dụng của bạn.
- **`IntlayerServerProvider`** được sử dụng để cung cấp locale cho các component con phía server. Nó không thể được đặt trong layout.

  > Layout và trang không thể chia sẻ một ngữ cảnh server chung vì hệ thống ngữ cảnh server dựa trên kho dữ liệu theo từng yêu cầu (thông qua cơ chế [React’s cache](https://react.dev/reference/react/cache)), khiến mỗi “context” được tạo lại cho các phân đoạn khác nhau của ứng dụng. Việc đặt provider trong layout dùng chung sẽ phá vỡ sự cô lập này, ngăn cản việc truyền đúng giá trị ngữ cảnh server đến các component server của bạn.

  > Layout và trang không thể chia sẻ một ngữ cảnh server chung vì hệ thống ngữ cảnh server dựa trên kho dữ liệu theo từng yêu cầu (qua cơ chế [React’s cache](https://react.dev/reference/react/cache)), khiến mỗi “ngữ cảnh” được tạo lại cho các phân đoạn khác nhau của ứng dụng. Việc đặt provider trong một layout dùng chung sẽ phá vỡ sự cô lập này, ngăn cản việc truyền đúng các giá trị ngữ cảnh server đến các component server của bạn.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
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

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn phải gọi giá trị của hàm, như sau:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={8} title="Quốc tế hóa metadata của bạn" isOptional={true}>

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
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "vi": "Được tạo bởi create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Tạo một đối tượng chứa tất cả các url cho mỗi locale.
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

> Lưu ý rằng hàm `getIntlayer` được nhập từ `next-intlayer` trả về nội dung của bạn được bao bọc trong một `IntlayerNode`, cho phép tích hợp với trình chỉnh sửa trực quan. Ngược lại, hàm `getIntlayer` được nhập từ `intlayer` trả về nội dung của bạn trực tiếp mà không có các thuộc tính bổ sung.

Ngoài ra, bạn có thể sử dụng hàm `getTranslation` để khai báo metadata của mình. Tuy nhiên, việc sử dụng các file khai báo nội dung được khuyến nghị để tự động hóa việc dịch metadata và tách nội dung ra bên ngoài tại một thời điểm nào đó.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
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

> Tìm hiểu thêm về tối ưu hóa metadata [trong tài liệu chính thức của Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Quốc tế hóa sitemap.xml và robots.txt của bạn" isOptional={true}>

Để quốc tế hóa `sitemap.xml` và `robots.txt` của bạn, bạn có thể sử dụng hàm `getMultilingualUrls` do Intlayer cung cấp. Hàm này cho phép bạn tạo các URL đa ngôn ngữ cho sitemap của mình.

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

// Lấy tất cả các URL đa ngôn ngữ từ một danh sách URL
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Định nghĩa cấu hình robots.txt
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Không cho phép truy cập các trang đăng nhập và đăng ký
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Tìm hiểu thêm về tối ưu hóa sitemap [trong tài liệu chính thức của Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Tìm hiểu thêm về tối ưu hóa robots.txt [trong tài liệu chính thức của Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Thay đổi ngôn ngữ nội dung của bạn" isOptional={true}>

Để thay đổi ngôn ngữ của nội dung trong Next.js, cách được khuyến nghị là sử dụng component `Link` để chuyển hướng người dùng đến trang đã được địa phương hóa phù hợp. Component `Link` cho phép tải trước trang, giúp tránh việc tải lại toàn bộ trang.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Sẽ đảm bảo rằng nút "quay lại" trên trình duyệt sẽ chuyển hướng về trang trước đó
          >
            <span>
              {/* Locale - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ theo Locale của chính nó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong Locale hiện tại - ví dụ Francés với locale hiện tại được đặt thành Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Một cách thay thế là sử dụng hàm `setLocale` được cung cấp bởi hook `useLocale`. Hàm này sẽ không cho phép prefetch trang. Xem thêm chi tiết trong [tài liệu hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md).

> Bạn cũng có thể thiết lập một hàm trong tùy chọn `onLocaleChange` để kích hoạt một hàm tùy chỉnh khi locale thay đổi.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Phần còn lại của code

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

> Tham khảo tài liệu:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`thuộc tính lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`thuộc tính dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`thuộc tính aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Tạo một Component Link Đa Ngôn Ngữ" isOptional={true}>

Để đảm bảo rằng điều hướng trong ứng dụng của bạn tuân thủ ngôn ngữ hiện tại, bạn có thể tạo một component `Link` tùy chỉnh. Component này tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ. Ví dụ, khi một người dùng nói tiếng Pháp nhấp vào liên kết đến trang "About", họ sẽ được chuyển hướng đến `/fr/about` thay vì `/about`.

Hành vi này hữu ích vì một số lý do sau:

- **SEO và Trải nghiệm Người dùng**: URL được địa phương hóa giúp các công cụ tìm kiếm lập chỉ mục chính xác các trang theo ngôn ngữ và cung cấp nội dung cho người dùng theo ngôn ngữ ưu tiên của họ.
- **Tính nhất quán**: Bằng cách sử dụng liên kết được địa phương hóa trong toàn bộ ứng dụng của bạn, bạn đảm bảo rằng điều hướng luôn nằm trong ngữ cảnh ngôn ngữ hiện tại, tránh việc chuyển đổi ngôn ngữ không mong muốn.
- **Dễ bảo trì**: Tập trung logic địa phương hóa trong một component duy nhất giúp đơn giản hóa việc quản lý URL, làm cho codebase của bạn dễ bảo trì và mở rộng khi ứng dụng phát triển.

Dưới đây là triển khai của một component `Link` được địa phương hóa bằng TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Hàm tiện ích để kiểm tra xem một URL có phải là liên kết bên ngoài hay không.
 * Nếu URL bắt đầu bằng http:// hoặc https://, nó được coi là liên kết bên ngoài.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Một component Link tùy chỉnh điều chỉnh thuộc tính href dựa trên locale hiện tại.
 * Đối với các liên kết nội bộ, nó sử dụng `getLocalizedUrl` để thêm tiền tố locale vào URL (ví dụ: /fr/about).
 * Điều này đảm bảo điều hướng luôn nằm trong cùng ngữ cảnh locale.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Nếu liên kết là nội bộ và href hợp lệ được cung cấp, lấy URL đã được địa phương hóa.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

#### Cách Hoạt Động

- **Phát hiện Liên kết Ngoài**:  
  Hàm trợ giúp `checkIsExternalLink` xác định xem một URL có phải là liên kết ngoài hay không. Các liên kết ngoài được giữ nguyên vì không cần địa phương hóa.

- **Lấy Locale Hiện Tại**:
- **Lấy URL theo ngôn ngữ**:  
  Đối với các liên kết nội bộ (tức là không phải liên kết ngoài), `getLocalizedUrl` được sử dụng để tự động thêm tiền tố URL với ngôn ngữ hiện tại. Điều này có nghĩa là nếu người dùng của bạn đang dùng tiếng Pháp, việc truyền `/about` làm `href` sẽ chuyển thành `/fr/about`.

- **Trả về liên kết**:  
  Component trả về một phần tử `<a>` với URL đã được địa phương hóa, đảm bảo điều hướng nhất quán với ngôn ngữ.

Bằng cách tích hợp component `Link` này trong toàn bộ ứng dụng của bạn, bạn duy trì trải nghiệm người dùng nhất quán và nhận biết ngôn ngữ đồng thời cải thiện SEO và khả năng sử dụng.

</Step>

<Step number={12} title="Lấy ngôn ngữ hiện tại trong Server Actions" isOptional={true}>

Nếu bạn cần lấy locale đang hoạt động bên trong một Server Action (ví dụ: để địa phương hóa email hoặc chạy logic nhận biết locale), hãy gọi `getLocale` từ `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Thực hiện một số việc với locale
};
```

> Hàm `getLocale` tuân theo chiến lược phân tầng để xác định locale của người dùng:
>
> 1. Đầu tiên, nó kiểm tra các header của yêu cầu để tìm giá trị locale có thể đã được middleware thiết lập
> 2. Nếu không tìm thấy locale trong header, nó sẽ tìm locale được lưu trong cookie
> 3. Nếu không tìm thấy cookie, nó sẽ cố gắng phát hiện ngôn ngữ ưu tiên của người dùng từ cài đặt trình duyệt của họ
> 4. Trong trường hợp cuối cùng, nó sẽ sử dụng locale mặc định được cấu hình trong ứng dụng
>
> Điều này đảm bảo locale phù hợp nhất được chọn dựa trên ngữ cảnh có sẵn.

</Step>

<Step number={13} title="Tối ưu kích thước bundle của bạn" isOptional={true}>

Khi sử dụng `next-intlayer`, các từ điển được bao gồm trong bundle cho mỗi trang theo mặc định. Để tối ưu kích thước bundle, Intlayer cung cấp một plugin SWC tùy chọn thay thế thông minh các lệnh gọi `useIntlayer` bằng cách sử dụng macro. Điều này đảm bảo các từ điển chỉ được bao gồm trong các bundle của những trang thực sự sử dụng chúng.

Để kích hoạt tối ưu này, hãy cài đặt gói `@intlayer/swc`. Khi đã cài đặt, `next-intlayer` sẽ tự động phát hiện và sử dụng plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Lưu ý: Tối ưu hóa này chỉ khả dụng cho Next.js 13 trở lên.

> Lưu ý: Gói này không được cài đặt mặc định vì các plugin SWC vẫn đang trong giai đoạn thử nghiệm trên Next.js. Điều này có thể thay đổi trong tương lai.

> Lưu ý: Nếu bạn đặt tùy chọn là `importMode: 'dynamic'` hoặc `importMode: 'fetch'` (in the `dictionary` configuration), nó sẽ dựa vào Suspense, vì vậy bạn sẽ phải bao bọc các lệnh gọi `useIntlayer` của mình trong một vùng `Suspense`. Điều đó có nghĩa là bạn sẽ không thể sử dụng `useIntlayer` trực tiếp ở cấp trên cùng của thành phần Page / Layout của bạn.
> </Step>

</Steps>

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

Để làm điều này, bạn có thể thêm các chỉ dẫn sau vào tệp `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
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

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

### Tiến xa hơn

Để tiến xa hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

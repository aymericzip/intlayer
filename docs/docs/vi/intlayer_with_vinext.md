---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Hướng dẫn đầy đủ để dịch ứng dụng Next.js của bạn trên Vite"
description: "Thiết lập Intlayer với vinext, API Next.js chạy trên Vite: định tuyến theo ngôn ngữ bằng proxy.ts, Server và Client Components, metadata được bản địa hóa, sitemap và triển khai lên Cloudflare Workers."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Lịch sử ban đầu"
author: aymericzip
---

# Dịch website vinext của bạn bằng Intlayer

[vinext](https://github.com/cloudflare/vinext) triển khai lại API Next.js trên nền Vite. Thư mục `app/`, các import `next/*` và `proxy.ts` của bạn vẫn hoạt động, nhưng quá trình build chạy qua Vite thay vì Turbopack hoặc webpack.

Intlayer tích hợp vào thiết lập này bằng hai package: `next-intlayer` cho các hook, provider và proxy mà component của bạn đã dùng trên Next.js, và `vite-intlayer` cho phần build (biên dịch dictionary, watch và tối ưu bundle).

> Đang chạy Next.js với toolchain riêng của nó? Hãy làm theo [hướng dẫn Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md).

- [Hướng dẫn Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)

## Mục lục

<TOC/>

## Tại sao chọn Intlayer thay vì các giải pháp khác?

So với các giải pháp như `next-intl` hay `i18next`, Intlayer tích hợp sẵn các tối ưu hóa:

<AccordionGroup>
<Accordion header="Xây dựng cho API Next.js, chạy trên Vite">

Cùng một đoạn mã `next-intlayer` chạy được trên cả Next.js và vinext. Server Components phân giải nội dung trên server, Client Components đọc nội dung qua provider, và việc định tuyến theo ngôn ngữ chạy từ `proxy.ts` của bạn. Chuyển đổi giữa hai toolchain không đụng đến component của bạn.

</Accordion>
<Accordion header="Kích thước bundle">

Thay vì tải các file JSON khổng lồ vào trang, bạn chỉ tải nội dung cần thiết. Plugin Vite thay mỗi lệnh gọi `useIntlayer` bằng những mục mà component thực sự dùng, giúp **giảm kích thước bundle và trang tới 50%**.

</Accordion>
<Accordion header="Khả năng bảo trì">

Chia nội dung theo từng component **giúp bảo trì dễ hơn** với các ứng dụng lớn. Bạn có thể nhân bản hoặc xóa một thư mục tính năng mà không phải rà soát toàn bộ codebase nội dung, và Intlayer **được định kiểu đầy đủ** để nội dung luôn chính xác.

</Accordion>
<Accordion header="Tác nhân AI">

Đặt nội dung ngay cạnh component **giúp giảm ngữ cảnh cần thiết** cho LLM. Intlayer cung cấp **CLI** để kiểm tra bản dịch còn thiếu, một **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, một **[máy chủ MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)** và các **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)
- [Máy chủ MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)

</Accordion>
<Accordion header="Tự động hóa">

Dịch ngay trong pipeline CI/CD với LLM bạn chọn, chi phí do nhà cung cấp AI của bạn tính. Intlayer cũng có **compiler** để tự động trích xuất nội dung, và một [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để **dịch ngầm**.

- [Nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)

</Accordion>
<Accordion header="Mở rộng cùng người không phải lập trình viên">

Intlayer cung cấp một **[trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) có thể tự lưu trữ** và một **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để quản lý nội dung đa ngôn ngữ **theo thời gian thực** cùng biên dịch viên và copywriter. Nội dung có thể lưu cục bộ và/hoặc từ xa.

- [Trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- [CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Hướng dẫn từng bước thiết lập Intlayer trong ứng dụng vinext

<Steps>
<Step number={1} title="Cài đặt các dependency">

Bắt đầu từ một dự án vinext đang chạy được. Để tạo dự án mới, chạy `npm create vinext-app@latest`. Để chuyển một ứng dụng Next.js hiện có, chạy `npx vinext init`.

Sau đó cài đặt Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Package lõi cung cấp các công cụ quốc tế hóa: quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), transpile và [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **next-intlayer**

  Cung cấp các provider, hook và proxy cho API Next.js. vinext ánh xạ `next/navigation`, `next/headers` và `next/server` sang các bản triển khai của riêng nó, vì vậy `next-intlayer` hoạt động mà không cần chỉnh sửa.

- **vite-intlayer**

  Plugin Vite build các khai báo nội dung của bạn, theo dõi chúng khi phát triển và tối ưu dictionary trong bundle production. Nó thay thế plugin Next.js `withIntlayer()`, thứ mà vinext không chạy.

</Step>
<Step number={2} title="Cấu hình dự án của bạn">

Chọn xem ứng dụng sẽ dùng đường dẫn URL có ngôn ngữ (ví dụ `/en/about`, `/fr/about`) hay phục vụ nội dung mà không có phân đoạn ngôn ngữ trong đường dẫn (ví dụ `/about`, phát hiện ngôn ngữ qua cookie, header hoặc query parameter).

<Tabs group="routing-mode">
<Tab label="Có đường dẫn ngôn ngữ" value="with-locale-path">

### Kiến trúc

Tất cả các trang đã bản địa hóa được lồng dưới phân đoạn động `[locale]`. Cách này được khuyến nghị cho SEO và render tĩnh, vì mỗi ngôn ngữ có URL riêng:

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
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Cấu hình

Tạo file `intlayer.config.ts` để khai báo các ngôn ngữ được hỗ trợ:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Không có đường dẫn ngôn ngữ" value="without-locale-path">

### Kiến trúc

Các route không có phân đoạn `[locale]`. Tất cả trang nằm trực tiếp dưới `src/app/`, và ngôn ngữ lấy từ cookie, header hoặc query parameter. Cách này phù hợp với dashboard và ứng dụng có xác thực:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Cấu hình

Đặt `routing.mode` thành `"search-params"` (ví dụ `/about?locale=fr`) hoặc `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> File này cũng thiết lập chuyển hướng proxy, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, log và nhiều thứ khác. Xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) để biết danh sách đầy đủ.

- [Tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

</Step>
<Step number={3} title="Tích hợp Intlayer vào cấu hình Vite của bạn">

Thêm plugin `intlayer()` cạnh `vinext()` trong `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> Plugin `intlayer()` build các dictionary của bạn trước khi quá trình build bắt đầu, theo dõi các file nội dung khi phát triển, và thiết lập các alias cùng tối ưu hóa mà `next-intlayer` dùng trong môi trường RSC, SSR và client.

> `intlayer()` cũng đi kèm một middleware định tuyến theo ngôn ngữ cho dev server của Vite. Trên vinext, `src/proxy.ts` đã đảm nhiệm việc này, cả khi phát triển lẫn trên runtime production, nên tùy chọn `ignore` tắt middleware của Vite để tránh định tuyến mỗi request hai lần.

> Đừng dùng `withIntlayer()` trong `next.config.ts`. vinext đọc `next.config.ts` cho các tùy chọn như `redirects`, `rewrites` và `headers`, nhưng không chạy plugin webpack hay Turbopack.

Nếu bạn triển khai lên Cloudflare Workers, hãy giữ plugin `cloudflare()` do `vinext init` tạo ra:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Định nghĩa các route ngôn ngữ động">

<Tabs group="routing-mode">
<Tab label="Có đường dẫn ngôn ngữ" value="with-locale-path">

Xóa toàn bộ nội dung trong `RootLayout` và thay bằng đoạn mã sau:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Để `RootLayout` trống cho phép layout ngôn ngữ thiết lập các thuộc tính [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) và [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) trên thẻ `<html>`.

Thêm một layout vào thư mục `[locale]` của bạn:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Chỉ một `IntlayerProvider` là đủ cho cả hai nửa của cây: nó cung cấp ngôn ngữ cho Server Components và gắn client provider để Client Components nhận cùng ngôn ngữ.

> Phân đoạn `[locale]` chứa ngôn ngữ: `/en-US/about` phân giải thành `en-US`, `/fr/about` thành `fr`. File `src/app/page.tsx` cũ không còn được dùng và có thể xóa. Proxy (bước 7) phục vụ ngôn ngữ mặc định ở đường dẫn gốc.

> `generateStaticParams` khiến vinext prerender mọi trang cho từng ngôn ngữ. vinext cũng áp dụng `dynamicParams`, nên ngôn ngữ không xác định sẽ trả về 404 khi bạn đặt `export const dynamicParams = false`.

</Tab>
<Tab label="Không có đường dẫn ngôn ngữ" value="without-locale-path">

Không có thư mục `[locale]`. Cấu hình `src/app/layout.tsx` để đọc ngôn ngữ từ request và bọc ứng dụng bằng `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Khai báo nội dung của bạn">

Tạo các khai báo nội dung để lưu bản dịch của bạn:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        vi: "Bắt đầu bằng cách chỉnh sửa",
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
      "main": {
        "nodeType": "translation",
        "translation": {
          "vi": "Bắt đầu bằng cách chỉnh sửa",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> Các khai báo nội dung có thể nằm ở bất kỳ đâu trong thư mục `contentDir` (mặc định là `./src`), miễn là khớp với phần mở rộng của khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

- [Tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)

</Step>
<Step number={6} title="Sử dụng nội dung trong mã của bạn">

Truy cập dictionary của bạn từ bất kỳ component nào:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

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
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` là isomorphic: điều kiện export `react-server`, mà vinext áp dụng cho môi trường RSC của nó, cấp cho Server Components bản triển khai phía server, còn Client Components nhận bản dựa trên context. Cùng một lệnh gọi hoạt động ở cả hai phía.

> Để dùng nội dung trong một thuộc tính kiểu `string`, như `alt`, `title`, `href` hoặc `aria-label`, hãy đọc giá trị của nó:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Tìm hiểu thêm trong [tài liệu `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useIntlayer.md).

- [Tài liệu `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useIntlayer.md)

> Nếu ứng dụng của bạn đã có sẵn, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) và [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) chuyển đổi hàng nghìn component chỉ trong một giây.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md)
- [Lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md)

</Step>
<Step number={7} title="Cấu hình proxy để phát hiện ngôn ngữ">

vinext chạy `proxy.ts` (và `middleware.ts`) giống Next.js 16, khi phát triển lẫn production, bao gồm cả trên Cloudflare Workers. Export proxy của Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` phát hiện ngôn ngữ ưa thích của người dùng, chuyển hướng tới URL tương ứng theo [cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) và lưu ngôn ngữ vào cookie. Nó cũng truyền ngôn ngữ cho `getLocale()` và các hook phía server, vì vậy hãy giữ nó ngay cả với kiến trúc không có đường dẫn ngôn ngữ.

- [Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

> Để nối chuỗi nhiều proxy (ví dụ `intlayerProxy` với xác thực), dùng `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Quốc tế hóa metadata của bạn" isOptional={true}>

vinext hỗ trợ Metadata API. Dùng `generateMetadata` với `getIntlayer` để dịch metadata của trang:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      vi: "Ứng dụng vinext của tôi",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      vi: "Một ứng dụng Next.js chạy trên Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
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
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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

// ... Rest of the code
````

> Hàm `getIntlayer` import từ `intlayer` trả về giá trị thô, sẵn sàng cho đối tượng metadata. Hàm từ `next-intlayer` bọc các giá trị này cho trình soạn thảo trực quan.

</Step>
<Step number={9} title="Quốc tế hóa sitemap.xml và robots.txt của bạn" isOptional={true}>

`sitemap.ts` và `robots.ts` hoạt động như trên Next.js. Dùng `getMultilingualUrls` để liệt kê mọi URL đã bản địa hóa:

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
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

</Step>
<Step number={10} title="Thay đổi ngôn ngữ nội dung của bạn" isOptional={true}>

Dùng `next/link` để điều hướng đến trang đã bản địa hóa. vinext giữ nguyên điều hướng phía client và prefetching, nên việc chuyển đổi diễn ra mà không cần tải lại toàn bộ trang:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Tham khảo tài liệu:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md)
> - [Hàm `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleName.md)
> - [Hàm `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md)
> - [Hàm `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Tạo component Link đã bản địa hóa" isOptional={true}>

Một component `Link` tùy chỉnh thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ, nhờ vậy người dùng Pháp nhấp vào `/about` sẽ đến `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Lấy ngôn ngữ hiện tại trong Server Actions" isOptional={true}>

Gọi `getLocale` từ `next-intlayer/server` bên trong một Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` đọc ngôn ngữ do proxy đặt trong header của request, rồi đến cookie ngôn ngữ, rồi đến header `Accept-Language` của trình duyệt, và cuối cùng dùng ngôn ngữ mặc định.

</Step>
<Step number={13} title="Triển khai lên Cloudflare Workers" isOptional={true}>

Intlayer biên dịch các dictionary vào bundle ở thời điểm build, nên không có gì đọc hệ thống file khi chạy và ứng dụng chạy nguyên trạng trong workerd. Build và triển khai bằng CLI của vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Để triển khai nơi khác (Vercel, Netlify, AWS, Node.js), thêm plugin Vite [Nitro](https://v3.nitro.build/) cạnh `vinext()`, hoặc đặt `output: "standalone"` trong `next.config.ts`. Thiết lập Intlayer không thay đổi.

</Step>
<Step number={14} title="Trích xuất nội dung từ các component của bạn" isOptional={true}>

Với một codebase có sẵn, Intlayer cung cấp [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) và [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển các chuỗi viết cứng sang khai báo nội dung.

- [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md)
- [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md)

Bật compiler trong `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Chạy extractor để chuyển đổi các component và trích xuất nội dung:

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
 <Tab value='Vite compiler'>

Plugin Vite `intlayer()` đã bao gồm compiler. Sau khi đặt `compiler.enabled`, hãy chạy dev server hoặc build như bình thường:

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Cấu hình TypeScript

Intlayer dùng module augmentation để định kiểu cho các key và giá trị nội dung của bạn.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Thêm các kiểu được sinh ra vào cấu hình TypeScript của bạn:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Cấu hình Git

Bỏ qua các file do Intlayer sinh ra:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Cài đặt **[tiện ích mở rộng Intlayer cho VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** chính thức để có tự động hoàn thành key, báo lỗi bản dịch thiếu, xem trước nội tuyến và các thao tác nhanh. Xem [tài liệu tiện ích mở rộng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md).

- [Tài liệu tiện ích mở rộng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)

### Tìm hiểu thêm

Thêm [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc đưa nội dung ra ngoài với [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

- [Trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)

## Câu hỏi thường gặp

<FAQ>

<Question title="vinext là gì?">

vinext là một plugin Vite mã nguồn mở do Cloudflare duy trì, triển khai lại API công khai của Next.js: App Router và Pages Router, React Server Components, Server Actions, `proxy.ts`, route handler và các module `next/*`. Mã Next.js của bạn chạy trên Vite, và có thể triển khai native lên Cloudflare Workers hoặc lên các nền tảng khác thông qua Nitro.

</Question>
<Question title="Điều gì thay đổi so với thiết lập Next.js?">

Chỉ có phần tích hợp build. Trên Next.js, `withIntlayer()` bọc `next.config.ts`. Trên vinext, plugin `intlayer()` từ `vite-intlayer` được đặt trong `vite.config.ts`. Provider, hook, `proxy.ts`, metadata và mã sitemap giữ nguyên, vì vậy bạn có thể làm theo [hướng dẫn Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md) cho mọi thứ mà trang này không đề cập.

- [Hướng dẫn Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)

</Question>
<Question title="Tôi có cần cấu hình i18n của Next.js hay plugin SWC không?">

Không. Trường `i18n` của `next.config.ts` trên vinext chỉ áp dụng cho tiền tố ngôn ngữ của Pages Router, và Intlayer tự định tuyến thông qua `proxy.ts`. Plugin `@intlayer/swc` cũng không cần thiết: plugin Vite đã thay thế các lệnh gọi `useIntlayer` để mỗi trang chỉ gửi những dictionary nó dùng. Xem [tối ưu bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

- [Tối ưu bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)

</Question>
<Question title="Tôi có cần `intlayer watch` khi phát triển không?">

Không. Plugin Vite `intlayer()` khởi động content watcher cùng `vite dev`, và khi sửa nội dung chỉ những component đọc dictionary thay đổi được cập nhật nóng.

</Question>
<Question title="Tôi có thể chuyển từ `next-intl` hoặc `i18next` mà không viết lại component không?">

Có. Làm theo [hướng dẫn di chuyển từ next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md) hoặc [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md), hoặc giữ API hiện tại với các [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md), vốn cung cấp các API `next-intl`, `react-i18next` và `react-intl` chạy trên dictionary của Intlayer.

- [Hướng dẫn di chuyển từ next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md)
- [Hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md)
- [Adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md)

</Question>
<Question title="Tôi có bắt buộc phải đặt ngôn ngữ trong URL, như /fr/about không?">

Không. `routing.mode` chấp nhận:

- `"prefix-no-default"` (mặc định): `/about` cho ngôn ngữ mặc định, `/fr/about` cho các ngôn ngữ còn lại.
- `"prefix-all"`: mọi ngôn ngữ đều có tiền tố, `/en/about` và `/fr/about`.
- `"no-prefix"`: không có ngôn ngữ trong đường dẫn, được xác định từ cookie hoặc header.
- `"search-params"`: `/about?locale=fr`.

Xem [tham chiếu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) và kiến trúc không có đường dẫn ngôn ngữ ở bước 2.

- [Tham chiếu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

</Question>
<Question title="Làm thế nào để dịch ứng dụng của tôi tự động bằng AI?">

Chạy `npx intlayer fill`. CLI phát hiện các bản dịch còn thiếu và điền chúng bằng LLM bạn chọn, dùng nhà cung cấp và API key của chính bạn. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

- [Lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md)
- [Tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md)

</Question>
<Question title="Làm thế nào để phát hiện bản dịch còn thiếu trước khi phát hành?">

Chạy `npx intlayer test` trong CI. Build sẽ thất bại khi một ngôn ngữ đã khai báo thiếu nội dung. [Tiện ích mở rộng VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md) hiển thị cùng các lỗi này khi bạn gõ, và [plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md) đánh dấu các chuỗi viết cứng.

- [Tiện ích mở rộng VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- [Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)

</Question>
<Question title="Intlayer có miễn phí và mã nguồn mở không?">

Có. Intlayer là mã nguồn mở theo giấy phép Apache 2.0, và thư viện, CLI, trình soạn thảo trực quan cùng compiler đều miễn phí sử dụng, kể cả cho mục đích thương mại. CMS được lưu trữ là dịch vụ trả phí tùy chọn, và cũng có thể [tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

- [Tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md)

</Question>

</FAQ>

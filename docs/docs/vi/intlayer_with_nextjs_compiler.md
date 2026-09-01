---
createdAt: 2026-01-10
updatedAt: 2026-06-23
title: "Next.js i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Next.js đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Trình biên dịch
  - AI
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Phiên bản đầu tiên"
author: aymericzip
---

# Cách biến ứng dụng Next.js hiện tại thành đa ngôn ngữ (i18n) (hướng dẫn i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Giải pháp i18n tốt nhất cho Next.js? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản Demo tại CodeSandbox - Hướng dẫn quốc tế hóa ứng dụng của bạn với Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Kiểm tra [Bản Mẫu Ứng dụng](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) trên GitHub.

## Mục lục

<TOC/>

## Tại sao việc quốc tế hóa một ứng dụng đã tồn tại lại khó khăn?

Nếu bạn đã từng thử thêm nhiều ngôn ngữ vào một ứng dụng trước đây chỉ được xây dựng cho một ngôn ngữ duy nhất, bạn sẽ biết được những rắc rối. Nó không chỉ đơn thuần là "khó khăn" - nó rất tẻ nhạt. Bạn phải xem qua từng tệp, tìm mọi chuỗi văn bản và di chuyển chúng vào các tệp từ điển riêng biệt.

Sau đó là phần rủi ro: thay thế toàn bộ văn bản đó bằng các móc mã mà không làm hỏng bố cục hay logic. Đó là loại công việc có thể làm đình trệ quá trình phát triển tính năng mới trong hàng tuần lễ và cảm giác như một cuộc tái cấu trúc không hồi kết.

## Intlayer Compiler là gì?

**Intlayer Compiler** được tạo ra để bỏ qua những công việc thủ công đó. Thay vì ép bạn trích xuất chuỗi một cách thủ công, trình biên dịch thực hiện điều đó cho bạn. Nó quét mã của bạn, tìm văn bản và sử dụng AI để tạo ra các từ điển trong nền.
Sau đó, nó sửa đổi mã nguồn của bạn trong quá trình biên dịch để chèn các hook i18n cần thiết. Về cơ bản, bạn tiếp tục viết ứng dụng của mình như thể nó chỉ dùng một ngôn ngữ, và trình biên dịch sẽ xử lý quá trình chuyển đổi đa ngôn ngữ một cách tự nhiên.

> Tài liệu về trình biên dịch: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md)

### Hạn chế

Do trình biên dịch thực hiện phân tích và chuyển đổi mã (chèn hook và tạo từ điển) trong **thời gian biên dịch**, nó có thể **làm chậm thời gian build** ứng dụng của bạn.

Để hạn chế ảnh hưởng này trong quá trình phát triển năng động (dev mode), bạn có thể thiết lập trình biên dịch thành chế độ [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) hoặc tắt nó khi không cần thiết.

---

## Hướng dẫn từng bước thiết lập Intlayer vào trong ứng dụng Next.js

<Steps>
<Step number={1} title="Cài đặt các thư viện phụ thuộc">

Cài đặt các gói cần thiết bằng trình quản lý gói ưa thích của bạn:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là tác nhân AI.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **next-intlayer**

  Gói tích hợp Intlayer với Next.js. Nó cung cấp các context provider và hook cho quốc tế hóa Next.js. Ngoài ra, nó bao gồm Next.js plugin để tích hợp Intlayer với [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), cũng như middleware để phát hiện locale ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

</Step>
<Step number={2} title="Cấu hình cho dự án của bạn">

Tạo một tệp cấu hình để xác định các ngôn ngữ của ứng dụng:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.VIETNAMESE],
    defaultLocale: Locales.VIETNAMESE,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * Cho biết trình biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Thư mục đầu ra cho các từ điển được tối ưu hóa.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Chỉ chèn nội dung vào tệp đã tạo, không có khóa.
     */
    noMetadata: false,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Cho biết liệu các thành phần có nên được lưu sau khi được chuyển đổi hay không.
     * Bằng cách đó, trình biên dịch có thể được chạy một lần duy nhất để chuyển đổi ứng dụng, và sau đó nó có thể được gỡ bỏ.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Đây là một ứng dụng bản đồ đơn giản điển hình",
  },
};

export default config;
```

> **Ghi chú**: Đảm bảo bạn đã thiết lập `OPEN_AI_API_KEY` trong các biến môi trường của mình.

> Qua tệp cấu hình này, bạn có thể thiết lập URL đã được bản địa hóa, chuyển hướng proxy, mapping cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt log Intlayer trong console, và nhiều hơn nữa. Để biết danh sách đầy đủ các tham số có sẵn, hãy kiểm tra [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>
<Step number={3} title="Tích hợp Intlayer vào cấu hình Next.js của bạn">

Cấu hình thiết lập Next.js của bạn để sử dụng Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Các cấu hình Next.js bổ sung tùy chọn tại đây */
};

export default withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` được sử dụng để tích hợp Intlayer với Next.js. Nó đảm bảo việc xây dựng các tệp từ điển và theo dõi chúng trong chế độ dev. Nó xác định các biến môi trường Intlayer bên trong môi trường [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Ngoài ra, nó cung cấp các alias để tối ưu hóa hiệu suất và hoạt động mượt mà với Server Components.

</Step>
<Step number={4} title="Phát hiện ngôn ngữ trên trang của bạn">

Trình biên dịch Intlayer yêu cầu Babel để trích xuất và tối ưu hóa nội dung của bạn. Cập nhật `babel.config.js` (hoặc `babel.config.json`) của bạn để bao gồm các plugin Intlayer:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

</Step>
<Step number={5} title="Phát hiện Locale trong các trang của bạn">

Dọn dẹp nội dung `RootLayout` của bạn và thay thế bằng ví dụ bên dưới:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>
<Step number={6} title="Khai báo nội dung của bạn">

Khi trình biên dịch được bật, bạn **không còn cần** khai báo các từ điển nội dung (ví dụ: tệp `.content.ts`) một cách thủ công.

Thay vào đó, bạn chỉ cần viết nội dung của mình dưới dạng các chuỗi ký tự cứng ngay trong mã. Intlayer sẽ quét mã nguồn, tạo bản dịch bằng cách sử dụng nhà cung cấp AI đã cấu hình, và âm thầm thay thế các chuỗi đó bằng nội dung đã được bản địa hóa trong bước compile của quá trình build. Mọi thứ hoàn toàn tự động.

Chỉ cần viết các thành phần của bạn với các chuỗi hardcoded trong ngôn ngữ mặc định và để Intlayer Compiler lo phần còn lại.

Ví dụ về cách `page.tsx` của bạn sẽ trông như thế nào:

<Tabs>
<Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Bắt đầu bằng cách chỉnh sửa cái này!</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

</Tab>
<Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      vi: {
        getStartedByEditingThis: "Bắt đầu bằng cách chỉnh sửa cái này!",
      },
    }
  }
}
```

</Tab>
</Tabs>
<Tabs>
<Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditingThis}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerProvider`** được gắn một lần trong root layout. Nó cung cấp locale cho cả server và client components, vì vậy các trang không còn phải tự bọc chúng nữa.
- Mà không có đoạn đường dẫn `[locale]`, locale luôn đến từ request — header `x-intlayer-locale` được thiết lập bởi Intlayer proxy, sau đó là locale cookie — mà các server hooks đọc trên chính chúng khi provider chưa chạy.

</Tab>
<Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerClientProvider`** được sử dụng để cung cấp ngôn ngữ cho các thành phần con phía client.
- Trong khi **`IntlayerServerProvider`** được sử dụng để cung cấp ngôn ngữ cho các thành phần con phía server.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

</Tab>
</Tabs>
</Step>
<Step number={7} title="Điền các bản dịch còn thiếu" isOptional={true}>

Intlayer cung cấp một công cụ CLI để giúp bạn điền các bản dịch còn thiếu. Bạn có thể sử dụng lệnh `intlayer` để kiểm tra và điền các bản dịch còn thiếu từ mã của mình.

```bash packageManager="npm"
npx intlayer test         # Kiểm tra xem có thiếu bản dịch không
```

```bash packageManager="yarn"
yarn intlayer test         # Kiểm tra xem có thiếu bản dịch không
```

```bash packageManager="pnpm"
pnpm intlayer test         # Kiểm tra xem có thiếu bản dịch không
```

```bash packageManager="bun"
bun x intlayer test         # Kiểm tra xem có thiếu bản dịch không
```

```bash packageManager="npm"
npx intlayer fill         # Điền các bản dịch còn thiếu
```

```bash packageManager="yarn"
yarn intlayer fill         # Điền các bản dịch còn thiếu
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Điền các bản dịch còn thiếu
```

```bash packageManager="bun"
bun x intlayer fill         # Điền các bản dịch còn thiếu
```

> Để biết thêm chi tiết, vui lòng tham khảo [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/ci.md)

</Step>
<Step number={8} title="Middleware Proxy cho Router Localized" isOptional={true}>

Nếu bạn muốn tự động chuyển hướng người dùng đến ngôn ngữ ưu thích của họ, hãy thiết lập một middleware proxy:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` được sử dụng để phát hiện ngôn ngữ ưu tiên của người dùng và chuyển hướng họ đến URL thích hợp như được xác định trong [các thiết lập của tệp cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md). Thêm vào đó, nó cho phép lưu trữ ngôn ngữ ưu tiên của người dùng trong cookie.

> Kể từ Intlayer v9, middleware này tuân thủ tùy chọn `routing.enableProxy` (`true` theo mặc định). Đặt `routing.enableProxy: false` trong cấu hình của bạn để biến nó thành pass-through mà không cần xóa tệp này. Xem [ghi chú phát hành v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/releases/v9.md).

</Step>
<Step number={9} title="Thay đổi ngôn ngữ nội dung" isOptional={true}>

Cách khuyên dùng nhất để thay đổi ngôn ngữ nội dung trong Next.js là sử dụng thành phần `Link` để hướng người dùng đến route với ngôn ngữ tương ứng. Điều này tận dụng tính năng prefetch của Next.js và tránh việc tải lại trang một cách cưỡng ép.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Ngôn ngữ - vd: VI */}
              {localeItem}
            </span>
            <span>
              {/* Tên ngôn ngữ bằng chính nó - vd: Tiếng Việt */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Tên ngôn ngữ theo ngôn ngữ hiện tại - vd: Francés (nếu ngôn ngữ hiện tại là Locales.SPANISH) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Tên ngôn ngữ bằng tiếng Anh - vd: Vietnamese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Ngoài ra, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hook `useLocale`. Hàm này không cho phép prefetch trang. Kiểm tra [tài liệu hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md) để biết thêm chi tiết.

</Step>
<Step number={10} title="Tối ưu hóa kích thước Bundle" isOptional={true}>

Khi sử dụng `next-intlayer`, các từ điển mặc định được bao gồm trong bundle cho từng trang. Để tối ưu hóa kích thước bundle, Intlayer cung cấp một plugin SWC tùy chọn giúp thay thế một cách thông minh các lệnh gọi `useIntlayer` bằng macro. Điều này đảm bảo rằng các từ điển chỉ được bao gồm trong bundle của những trang thực sự sử dụng chúng.

Plugin `@intlayer/babel` đã tích hợp tối ưu hóa bundling (xem `babel.config.js`). Tuy nhiên, plugin `@intlayer/swc` có hiệu suất cao hơn. Nếu bạn loại bỏ plugin `@intlayer/babel`, bạn có thể sử dụng plugin `@intlayer/swc`.

Để bật tính năng tối ưu hóa này, hãy cài đặt gói `@intlayer/swc`. Sau khi cài đặt, `next-intlayer` sẽ tự động phát hiện và sử dụng plugin:

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

> Lưu ý: Tính năng tối ưu hóa này chỉ khả dụng cho Next.js 13 trở lên.

> Lưu ý: Gói này không được cài đặt mặc định vì các plugin SWC vẫn đang ở giai đoạn thử nghiệm trong Next.js. Điều này có thể thay đổi trong tương lai.

> Lưu ý: Nếu bạn thiết lập tùy chọn (trong cấu hình từ điển) `importMode: 'dynamic'` hoặc `importMode: 'fetch'`, nó sẽ phụ thuộc vào Suspense, vì vậy bạn sẽ cần bọc các lệnh gọi `useIntlayer` trong một ranh giới `Suspense`. Điều này có nghĩa là bạn không thể sử dụng `useIntlayer` trực tiếp ở cấp cao nhất của thành phần Page / Layout.

</Step>
<Step number={11} title="Trích xuất nội dung các thành phần của bạn" isOptional={true}>

Nếu bạn có một cơ sở mã hiện có, việc chuyển đổi hàng nghìn tệp có thể tốn nhiều thời gian.

Để đơn giản hóa quy trình này, Intlayer đề xuất một [trình biên dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) / [trình trích xuất](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi các thành phần của bạn và trích xuất nội dung.

Để thiết lập, bạn có thể thêm phần `compiler` vào tệp `intlayer.config.ts` của mình:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Phần còn lại của cấu hình
  compiler: {
    /**
     * Cho biết trình biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Xác định đường dẫn các tệp đầu ra
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Cho biết các thành phần có nên được lưu sau khi chuyển đổi hay không. Bằng cách đó, trình biên dịch có thể được chạy chỉ một lần để chuyển đổi ứng dụng, sau đó có thể được gỡ bỏ.
     */
    saveComponents: false,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
<Tab value='Extract command'>

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
<Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Trích xuất nội dung từ các thành phần vào từ điển
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # Hoặc npm run dev
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

Intlayer sử dụng module augmentation để tận dụng các ưu điểm của TypeScript và làm cho cơ sở mã của bạn mạnh mẽ hơn.

![Autocomplete](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... cấu hình TypeScript hiện tại của bạn
  "include": [
    // ... cấu hình TypeScript hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
  ],
}
```

### Cấu hình Git

Khuyên dùng việc bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh việc tải chúng lên kho lưu trữ Git của mình.

Để thực hiện việc này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để nâng cao trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng VS Code chính thức của Intlayer**.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa bản dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước inline** nội dung đã dịch.
- **Quick actions** để dễ dàng tạo và cập nhật các bản dịch.

Đọc [tài liệu Tiện ích mở rộng VS Code của Intlayer](https://intlayer.org/doc/vs-code-extension) để biết hướng dẫn chi tiết về cách sử dụng tiện ích mở rộng.

### Đi xa hơn

Để tiến xa hơn, bạn có thể triển khai [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc ngoại hóa nội dung của mình bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng Next.js?">

Trường `i18n` của `next.config.js` không áp dụng cho App Router, do đó lớp bản địa hóa luôn là một lựa chọn thư viện:

- **`next-intl`**, **`next-i18next` / `i18next`** và **`react-intl`**: catalog JSON hoặc ICU được tải theo từng namespace, với các khóa được viết thủ công tại mỗi vị trí gọi.
- **`Lingui`**: theo hướng trích xuất, với các thông báo ICU được biên dịch tại thời điểm build.
- **`Intlayer`**: nội dung được biên dịch từ các component của bạn tại thời điểm build, được định kiểu đầy đủ, có dịch bằng AI, trình chỉnh sửa trực quan và CMS.

Hướng dẫn này sử dụng thiết lập compiler, nơi bạn tiếp tục viết các chuỗi thông thường trong các component của mình và các từ điển được tạo cho bạn. Xem [tại sao nên chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md) và [benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md).

</Question>

<Question title="i18n làm tăng kích thước bundle Next.js của tôi bao nhiêu?">

Ít hơn đáng kể so với các giải pháp dựa trên namespace, vì trang không bao giờ tải catalog mà nó không hiển thị. Server Components phân giải nội dung ngay trên server, và compiler tại thời điểm build thay thế các lệnh gọi `useIntlayer` bằng chính xác các mục từ điển mà component sử dụng. [Từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) chia phần còn lại theo từng locale, giảm kích thước bundle tới 50%. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Tôi có thể di chuyển từ next-intl, next-i18next hoặc i18next mà không cần viết lại các component của mình không?">

Có, theo hai cách. Bạn có thể di chuyển nội dung dần dần bằng [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md) hoặc [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md). Hoặc bạn có thể giữ nguyên API hiện tại: [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) cung cấp chính xác các API tương tự nhưng chạy trên các từ điển Intlayer.

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp nguồn của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn chỉ cần xem lại diff thay vì sao chép chuỗi vào catalog thủ công. Xem [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md).

Hai giới hạn đáng lưu ý. Compiler hoạt động bằng phân tích tĩnh, do đó các chuỗi chỉ tồn tại khi runtime, chẳng hạn như mã lỗi API hoặc các trường CMS, nằm ngoài phạm vi tiếp cận và vẫn cần một từ điển được khai báo. Và nó phải phân biệt văn bản hiển thị cho người dùng với logic ứng dụng như `className="active"` hoặc mã trạng thái, điều này cần một vài chú thích trong một codebase lớn.

Để tự động hóa hoàn toàn, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện việc tương tự trong quá trình build trên mã JSX, TSX, Vue và Svelte, tạo từ điển trên mỗi thay đổi mà không cần quản lý khóa thủ công.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ khóa `useIntlayer` đến tệp nội dung khai báo nó, trích xuất nội dung từ component, và chạy build, fill, test, push và pull từ command palette hoặc tab Intlayer.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: trải nghiệm tương tự trong bất kỳ trình soạn thảo nào hỗ trợ LSP, với go to definition, xem trước giá trị bản dịch khi hover, tự động hoàn thành khóa, và cảnh báo khi khóa chưa được khai báo. Hỗ trợ cả các lệnh gọi `i18next`, `react-i18next`, `next-intl` và `use-intl`.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: quy tắc `no-raw-text` phát hiện các chuỗi chưa được bản địa hóa.

</Question>

<Question title="Làm thế nào compiler quyết định nội dung nào là văn bản dành cho người dùng?">

Compiler sử dụng các quy tắc phân tích tĩnh: văn bản trong các thẻ JSX và các thuộc tính phổ biến (`aria-label`, `title`, `placeholder`) được coi là nội dung bản địa hóa, trong khi các class CSS và định danh mã nguồn được bỏ qua.

</Question>

<Question title="Điều gì xảy ra với các chuỗi mà compiler không thể nhìn thấy?">

Các chuỗi động được tạo ra tại runtime hoặc phản hồi từ API sẽ không được compiler phát hiện. Đối với các chuỗi này, bạn sử dụng hàm `t()` hoặc tệp `.content` tiêu chuẩn.

</Question>

<Question title="Tôi nên dùng compiler hay tự khai báo nội dung?">

Để tạo mẫu nhanh, compiler cực kỳ tiện lợi. Đối với giao diện phức tạp có quy tắc số nhiều hoặc định dạng đặc thù, tệp `.content` rõ ràng mang lại sự kiểm soát chi tiết hơn.

</Question>

<Question title="Intlayer có hoạt động với React Server Components không?">

Có. Nội dung trong Server Components được giải quyết trực tiếp trên server, do đó không có từ điển nào được gửi tới client cho phần văn bản được render phía server. Client Components đọc từ điển qua provider.

</Question>

<Question title="Làm cách nào tôi có thể dịch ứng dụng tự động bằng AI?">

Chạy `npx intlayer fill`. CLI phát hiện các bản dịch còn thiếu và điền chúng bằng LLM bạn chọn sử dụng provider và API key của riêng bạn. Flag `--git-diff` giới hạn thao tác ở nội dung đã thay đổi trên branch hiện tại. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

</Question>

<Question title="Intlayer có hỗ trợ dạng số nhiều, giới tính và rich text không?">

Có: [dạng số nhiều (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md), [nội dung dựa trên giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [chèn (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md), và [định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) cho số, ngày tháng và tiền tệ.

</Question>

<Question title="Làm thế nào người dịch có thể chỉnh sửa nội dung mà không cần chạm vào mã nguồn?">

Thông qua [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), cho phép bất kỳ ai chỉnh sửa văn bản trực tiếp trên ứng dụng đang chạy, hoặc qua [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), giúp tách biệt nội dung để cập nhật mà không cần triển khai lại mã nguồn.

</Question>

<Question title="Intlayer có phải là mã nguồn mở và miễn phí không?">

Có, theo giấy phép Apache 2.0, bao gồm cả mục đích thương mại. CMS lưu trữ trên đám mây là một dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>

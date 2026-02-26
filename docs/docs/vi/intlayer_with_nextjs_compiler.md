---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Chuyển đổi ứng dụng Next.js hiện tại thành ứng dụng đa ngôn ngữ năm 2026
description: Khám phá cách biến ứng dụng Next.js hiện tại của bạn thành một ứng dụng đa ngôn ngữ bằng cách sử dụng Intlayer Compiler. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch ứng dụng của bạn bằng AI.
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
  - cau hinh
  - nextjs
  - trình biên dịch
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Phiên bản đầu tiên
---

# Cách biến ứng dụng Next.js hiện tại thành đa ngôn ngữ (i18n) (hướng dẫn i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Giải pháp i18n tốt nhất cho Next.js? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
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

### Bước 1: Cài đặt các thư viện phụ thuộc

Cài đặt các gói cần thiết bằng trình quản lý gói ưa thích của bạn:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **next-intlayer**

  Gói tích hợp Intlayer với Next.js. Nó cung cấp các context provider và hook cho quốc tế hóa Next.js. Ngoài ra, nó bao gồm Next.js plugin để tích hợp Intlayer với [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), cũng như middleware để phát hiện locale ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 2: Cấu hình cho dự án của bạn

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
     * Cho biết liệu trình biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Thư mục đầu ra cho các từ điển đã được tối ưu hóa.
     */
    outputDir: "compiler",

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "", // Xóa tiền tố cơ bản

    /**
     * Cho biết liệu các thành phần có nên được lưu lại sau khi được biến đổi hay không.
     * Bằng cách này, trình biên dịch có thể được chạy một lần để biến đổi ứng dụng, sau đó nó có thể được gỡ bỏ.
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

### Bước 3: Tích hợp Intlayer vào cấu hình Next.js của bạn

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

### Cấu hình Babel

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

### Bước 4: Phát hiện ngôn ngữ trên trang của bạn

Dọn dẹp nội dung `RootLayout` của bạn và thay thế bằng ví dụ bên dưới:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

### Bước 5: Khai báo nội dung của bạn (Tự động)

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

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** được sử dụng để cung cấp ngôn ngữ cho các thành phần con phía client.
- Trong khi **`IntlayerServerProvider`** được sử dụng để cung cấp ngôn ngữ cho các thành phần con phía server.

### (Tùy chọn) Bước 7: Điền các bản dịch còn thiếu

Intlayer cung cấp một công cụ CLI để giúp bạn điền các bản dịch còn thiếu. Bạn có thể sử dụng lệnh `intlayer` để kiểm tra và điền các bản dịch còn thiếu từ mã của mình.

```bash
npx intlayer test         # Kiểm tra xem có thiếu bản dịch không
```

```bash
npx intlayer fill         # Điền các bản dịch còn thiếu
```

> Để biết thêm chi tiết, vui lòng tham khảo [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/ci.md)

### (Không bắt buộc) Bước 8: Middleware Proxy cho Router Localized

Nếu bạn muốn tự động chuyển hướng người dùng đến ngôn ngữ ưu thích của họ, hãy thiết lập một middleware proxy:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` được sử dụng để phát hiện ngôn ngữ ưu tiên của người dùng và chuyển hướng họ đến URL thích hợp như được xác định trong [các thiết lập của tệp cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md). Thêm vào đó, nó cho phép lưu trữ ngôn ngữ ưu tiên của người dùng trong cookie.

### (Không bắt buộc) Bước 9: Thay đổi ngôn ngữ nội dung

Cách khuyên dùng nhất để thay đổi ngôn ngữ nội dung trong Next.js là sử dụng thành phần `Link` để hướng người dùng đến route với ngôn ngữ tương ứng. Điều này tận dụng tính năng prefetch của Next.js và tránh việc tải lại trang một cách cưỡng ép.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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

### (Không bắt buộc) Bước 10: Tối ưu hóa kích thước Bundle

Khi sử dụng `next-intlayer`, các từ điển mặc định được bao gồm trong bundle cho từng trang. Để tối ưu hóa kích thước bundle, Intlayer cung cấp một plugin SWC tùy chọn giúp thay thế một cách thông minh các lệnh gọi `useIntlayer` bằng macro. Điều này đảm bảo rằng các từ điển chỉ được bao gồm trong bundle của những trang thực sự sử dụng chúng.

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

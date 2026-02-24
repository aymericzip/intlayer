---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Chuyển đổi ứng dụng Next.js hiện tại thành ứng dụng đa ngôn ngữ (hướng dẫn i18n 2026)
description: Khám phá cách biến ứng dụng Next.js hiện tại của bạn thành một ứng dụng đa ngôn ngữ bằng cách sử dụng Intlayer Compiler. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch ứng dụng của bạn bằng trí tuệ nhân tạo (AI).
keywords:
  - Quốc tế hóa
  - Dịch thuật
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Trình biên dịch
  - AI
slugs:
  - cẩm nang
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
  <Tab label="Mã nguồn (Code)" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản Demo tại CodeSandbox - Hướng dẫn quốc tế hóa ứng dụng của bạn với Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Kiểm tra [Bản Mẫu Ứng dụng (Application Template)](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) trên nền tảng GitHub.

## Mục lục (Table of Contents)

<TOC/>

## Tại sao việc quốc tế hóa (i18n) một ứng dụng đã tồn tại lại khó khăn?

Nếu bạn đã từng thử thêm nhiều ngôn ngữ vào một ứng dụng mà trước đây chỉ được xây dựng riêng cho một ngôn ngữ duy nhất, bạn sẽ biết được những rắc rối của việc này. Nó không chỉ đơn thuần là "khó khăn" - nó rất tẻ nhạt và tốn sức. Bạn phải xem qua từng tệp một, tìm mọi chuỗi văn bản (text string) và di chuyển chúng vào các tệp từ điển (dictionary) riêng biệt.

Sau đó là phần chông gai nhất: thay thế toàn bộ văn bản gốc ấy bằng các móc mã (code hooks) mà không làm phá vỡ giao diện bố cục (layout) hay logic của chương trình. Đó là loại công việc có thể làm đình trệ quá trình phát triển tính năng mới trong hàng tuần lễ và đem lại cảm giác refactoring (tái cấu trúc) không bao giờ kết thúc.

## Intlayer Compiler là gì?

**Intlayer Compiler** (Trình biên dịch Intlayer) được tạo ra để giúp bạn vượt qua những công việc thủ công nhàm chán vừa nêu. Thay vì ép bạn giải nén và cắt chuỗi (string) một cách thủ công, trình biên dịch thực hiện điều đó cho bạn một cách gọn gàng. Nó tự động quét mã của bạn, phát hiện văn bản và sẽ sử dụng Trí tuệ nhân tạo (AI) nhằm tạo ra các cuốn từ điển ngay ở chế độ nền (background).
Sau đó, nó sửa đổi mã nguồn của bạn trong quá trình biên dịch (build) để chèn / tiêm (inject) các i18n hooks thiết yếu. Về cơ bản, bạn có thể tiếp tục viết mã ứng dụng của mình như thể nó đang dùng một ngôn ngữ duy nhất, và trình biên dịch sẽ hoàn toàn tự động xử lý quá trình chuyển đổi đa ngôn ngữ cho bạn.

> Tài liệu về trình biên dịch: https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md

### Hạn chế

Do trình biên dịch này thực hiện quá trình phân tích và chuyển đổi mã (tiêm hooks và khởi tạo từ điển) ngay vào **lúc biên dịch (compile time)**, vì thế nó có thể **làm chậm tiến trình xây dựng (build)** ứng dụng của bạn.

Để hạn chế ảnh hưởng này trong lúc bạn đang tích cực phát triển (developer mode), bạn có thể dễ dàng thiết lập trình biên dịch theo chế độ [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) hoặc tắt hoàn toàn nó khi không có nhu cầu sử dụng.

---

## Hướng dẫn từng bước thiết lập Intlayer vào trong ứng dụng Next.js của bạn

### Bước 1: Cài đặt các thư viện phụ thuộc (Dependencies)

Cài đặt các gói phần mềm cần thiết bằng trình quản lý gói ưa thích của bạn (npm, pnpm, v.v.):

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

  Đây là gói cốt lõi, chuyên cung cấp nhiều bộ công cụ phục vụ trong việc quốc tế hóa dùng để xử lý quản lý cấu hình, thao tác dịch thuật, [khai báo nội dung ngôn ngữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã biên dịch (transpilation), hay các [Lệnh thao tác CLI (Lệnh dòng lệnh)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **next-intlayer**

  Gói này đóng vai trò nhúng Intlayer cùng với môi trường Next.js. Nhiệm vụ chính là phân phối các context providers (nhà cung cấp ngữ cảnh) và các đoạn hooks dành riêng cho quá trình quốc tế hóa trên nền Next.js. Ngoài ra, nó mang trong mình Next.js plugin tiện dụng để tối hợp Intlayer với [Webpack](https://webpack.js.org/) hay dạng [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), kèm tới luôn phần middleware giúp theo dõi dễ dàng locale ưu tiên tự động qua góc nhìn của người dùng, làm chủ tệp quy định cookies và kiểm soát luôn tiến trình chuyển hướng URLs trực tiếp nhanh chóng.

### Bước 2: Bắt đầu cấu hình hóa cho dự án của bạn (Project Configuration)

Chỉ cần tạo ra một tệp định hình (configuration file) có mục đích định dạng và chứa các cấu hình về ngôn ngữ sử dụng hiện hành cho ứng dụng của đôi bên:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Được quyền thiết đặt thông số thành 'build-only' chủ chốt là giới hạn tối đa sự hao tốn bên mô hình dev (development).
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Loại ngay tiền tố comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Đây chỉ là một ứng dụng bản đồ đơn giản điển hình",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Được quyền thiết đặt thông số thành 'build-only' chủ chốt là giới hạn tối đa sự hao tốn bên mô hình dev (development).
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Loại ngay tiền tố comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Đây chỉ là một ứng dụng bản đồ đơn giản điển hình",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Được quyền thiết đặt thông số thành 'build-only' chủ chốt là giới hạn tối đa sự hao tốn bên mô hình dev (development).
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Loại ngay tiền tố comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Đây chỉ là một ứng dụng bản đồ đơn giản điển hình",
  },
};

module.exports = config;
```

> **Ghi chú**: Hãy đặc biệt đảm bảo khai báo rõ và nạp trọn giá trị tương thích của mã khóa `OPEN_AI_API_KEY` nằm ở mục quy ước biến môi trường của hệ điều hành của bạn (environment variables).

> Khai thông quy chiếu thông qua file configuration file, anh em coder giờ có cơ sở dễ dàng đưa hệ cài đặt vào thiết lập URL cục bộ tự động (localized URLs), uốn nắn quá trình chuyển đổi Proxy, làm tròn quy đổi hệ thống alias cho thành phần cookie, định cấu hình chốn riêng cho hệ thống các phần tử cấu trúc bản ghi nội dung định nghĩa (content declarations), dập bớt thông số nhật ký (logs) mà Intlayer trình xuất trên giao diện màn hình Console,... Tìm ngay cho mình bảng danh mục đa dạng giải nghĩa chi tiết cấu hình chuẩn nếu tò mò thêm tại [Kho tài liệu Cấu hình hệ thống này](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Nâng cấp Intlayer thành phần cốt rễ bên trong trình cài đặt riêng với hệ Next.js Runtime (next.config)

Nhúng các hàm hỗ trợ thiết lập thư viện Intlayer tới quy chuẩn thiết đặt Next.js hiện trường của bạn:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Chứa lại tùy chỉnh nguyên thủy của Next tại đây nếu đang sẵn có nhé bạn */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Chứa lại tùy chỉnh nguyên thủy của Next tại đây nếu đang sẵn có nhé bạn */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Chứa lại tùy chỉnh nguyên thủy của Next tại đây nếu đang sẵn có nhé bạn */
};

module.exports = withIntlayer(nextConfig);
```

> Chức năng `withIntlayer()` vốn được mệnh danh trình Plugin tích hợp cho máy trạm Next.js sinh ra thuần khiết giúp dung hoà môi trường Intlayer hòa lẫn vào kho vận Next.js. Cụ thể thì chính thứ đồ chơi này mang hiệu ứng bảo hộ tính kiên cường trong việc duy trì và liên tục đảm định rằng file dạng kho từ điển đã được kiến tạo cũng như liên tục được theo dõi nếu người viết có vô tình tuỳ ý chỉnh (watch mode) bên trong khu kiểm định dev mode (Chế độ test môi trường lập trình viên). Đi xa với năng lực bẩm sinh khai triển giá trị chuẩn thuộc môi trường Intlayer trên bàn cờ [Webpack](https://webpack.js.org/) hoặc phiên bản tốc độ [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Song hành nữa, tính năng "alias tự thu hẹp truy xuất" (aliases) bứt phá tăng cực đại sự thể hiện phần hiệu năng vận tác lẫn tính hòa quyện dẻo dai chung cùng Hệ Lõi Render Thành Phần Bố Cục Máy Chủ (Server Components).

### Cấu hình Babel

Trình biên dịch Intlayer yêu cầu Babel để trích xuất và tối ưu hóa nội dung của bạn. Cập nhật `babel.config.js` (hoặc `babel.config.json`) để bao gồm các plugin Intlayer:

```js fileName="babel.config.js" codeFormat="commonjs"
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

### Bước 4: Tạo động cơ Điều phối/Khởi tạo Bộ Định Tuyến Quốc tế (Dynamic Locale Routing)

Hãy dọn dẹp trống bỏ hàm chính ở trong tệp layout tổng `RootLayout` rồi đắp đậy vô lớp cấu hình cơ bản lấy ra theo hệ code điển hình phía sau:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
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

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
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

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Bước 5: Cấu trúc Tuyên bố Định danh Nội dung Ứng dụng Bằng Phương thức Tự Hành (Auto Declaration)

Đứng vào vị trí có Trình Compiler (Trình máy dịch chạy nền) được châm ngòi hỏa mù xuất kích, lúc này bạn **bất đắc dĩ không còn** bận tâm về quá trình thiết kế rành rọt bằng tay những từ điển cấu hình nội dụng nữa (VD: tự lưu file là mẫu `.content.ts`).

Để mà bù lại công dụng vô biên này, dĩ nhiên anh em thoải mái nhả ra cả dãy văn bản string thuần thúy đi cắm chốt trực diện dưới lòng mã cấu tứ. Máy xử lí thuộc kho Intlayer quét nhạy vào bên nguồn tệp, sản sinh tự động lớp quy đổi ngôn từ chuẩn mực nhất thay qua cơ sở công nghệ thông minh từ máy Trí khôn nhân tạo (AI Provider), qua đấy hoán thế các câu ký tự trên mặt chữ trong đúng lộ trình vận tác đống build - tất cả đúc rút thầm kín và chính xác cho tới hồi sau. Mọi chuyện sẽ được cơ chế thao túng 100% thay con người xử lí mảng việc mệt nhọc trên.

### Bước 6: Sử dụng nội dung trong mã của bạn

Chỉ cần viết các thành phần của bạn với các chuỗi ký tự cố định trong ngôn ngữ mặc định của bạn. Trình biên dịch sẽ xử lý phần còn lại.

Ví dụ về giao diện trang của bạn:

<Tabs>
  <Tab value="Code" label="Mã">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Bắt đầu bằng cách chỉnh sửa</p>
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
  <Tab value="Output" label="Kết quả">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      vi: {
        getStartedByEditing: "Bắt đầu bằng cách chỉnh sửa",
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

  </Tab>
</Tabs>

- Ký tự gạch đầu dòng báo hiệu **`IntlayerClientProvider`** có tác dụng duy trì mạng lưới lan tỏa thuộc địa bàn cục bộ Ngôn ngữ đi xuống bộ rễ Client con cái bên Trình duyệt duyệt Web (Client Browser).
- Chức danh ngược lại như **`IntlayerServerProvider`** sẽ phát lệnh áp dụng ngôn ngữ thẳng cho toàn Server con, chuyên thiết lập sự gắn kết của phần kết xuất phía máy chủ xử lí tĩnh.

### (Tùy chọn) Bước 7: Điền các bản dịch còn thiếu

Intlayer cung cấp một công cụ CLI để giúp bạn điền các bản dịch còn thiếu. Bạn có thể sử dụng lệnh `intlayer` để kiểm tra và điền các bản dịch còn thiếu từ mã của mình.

```bash
npx intlayer test         # Kiểm tra xem có thiếu bản dịch không
```

```bash
npx intlayer fill         # Điền các bản dịch còn thiếu
```

### (Chưa Bắt Buộc - Không ép) Bước 8: Móc thêm Tính năng Dò Theo Khuôn Mẫu Đi Lại Khách Đến Qua Proxy

Kể mà lúc cần thu thập thám thính để điều hướng tức thì ứng với "ngôn ngữ người truy cập khao khát đọc tiếp", chỉ cần bung cài khối Middleware kiểu rẽ nhánh Proxy:

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

> Công cụ đa hình đa nền tảng `intlayerProxy` không giấu gì ý định nhắm trúng sự lựa chọn ngữ nghĩa theo đuổi cá tính riêng người coi, sau ván trinh báo nó liền bứng chóp chuyển hướng "bất đắc dĩ nhưng mềm mại" thẳng cánh tới đuôi gốc Link phù hợp (URL base parameters) tùy theo dòng tham chiếu trên tệp cấu tạo ở khâu cốt cán mang [Dữ Liệu Khung Định Tuyến Chuẩn (Configuration file)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md). Thích ăn hơn cái là gã chúa tể Proxy ranh mãnh này nạp và ôm trọn cục session ngôn ngữ mong muốn lưu ngay vô tệp cookie của máy client (của phía anh bạn trình duyệt ghé chơi).

### (Mục Đề Xuất Phụ) Bước 9: Hoán Đổi Bộ Cánh Giữa Hiện Trường Máy - Tính năng Chọn Lọc Ngôn Ngữ Switcher

Một số mẹo rẽ não chỉ tay đưa vào cấu trúc Ứng dụng Next.js đổi thay tiếng cho hay nằm ở việc phái thêm anh móc xích thẻ siêu kết nối `Link` (nhãn dẫn chuyển trang của nội hàm Next framework) có kẹp với chuỗi lộ trình Route đích thật cho phù tụng với dạng chữ người đọc yêu sách, nhãn liên tuyến kết cấu này tối ưu hoá thời gian chớp tải nhờ hưởng sái tuyệt kỹ năng bẩm sinh prefetch, từ giã viễn cảnh reset / khởi động máy lạnh sống (nghĩa là tải trống toàn mảng trắng) Hard reload page cực lâu.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
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
              {/* Phiên hiệu quốc tế rút ngắn Locale - VD nhé: VN */}
              {localeItem}
            </span>
            <span>
              {/* Nhãn phiên dịch tên hiệu bằng chính ngôn ngữ của nước sở tại mà mình tự đọc ra - Chẳng hạn: Tiếng Việt */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Theo đúng chuẩn địa phương quốc tế gọi chuẩn bản gốc - Mẫu nhãn là chữ: Français (tiếng xịn của nó) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Phóng tên quốc gia vào chuỗi âm hưởng chung của từ điển tiếng Anh dễ gọi toàn thế giới - Nghĩa là: Vietnamese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
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
              {/* Phiên hiệu quốc tế rút ngắn Locale - VD nhé: VN */}
              {localeItem}
            </span>
            <span>
              {/* Nhãn phiên dịch tên hiệu bằng chính ngôn ngữ của nước sở tại mà mình tự đọc ra - Chẳng hạn: Tiếng Việt */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Theo đúng chuẩn địa phương quốc tế gọi chuẩn bản gốc - Mẫu nhãn là chữ: Français (tiếng xịn của nó) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Phóng tên quốc gia vào chuỗi âm hưởng chung của từ điển tiếng Anh dễ gọi toàn thế giới - Nghĩa là: Vietnamese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
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
              {/* Phiên hiệu quốc tế rút ngắn Locale - VD nhé: VN */}
              {localeItem}
            </span>
            <span>
              {/* Nhãn phiên dịch tên hiệu bằng chính ngôn ngữ của nước sở tại mà mình tự đọc ra - Chẳng hạn: Tiếng Việt */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Theo đúng chuẩn địa phương quốc tế gọi chuẩn bản gốc - Mẫu nhãn là chữ: Français (tiếng xịn của nó) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Phóng tên quốc gia vào chuỗi âm hưởng chung của từ điển tiếng Anh dễ gọi toàn thế giới - Nghĩa là: Vietnamese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Thêm 1 hướng đi bổ sung cũng rất đỉnh đấy chính là gõ gọi lệnh thông qua `setLocale` cung ứng trên mâm từ chiếc rổ nhỏ hook `useLocale`. Muốn đào bới kho tàng năng lượng cao hơn mời bạn tham chiếu cặn kẽ đường đường chính chính trong mục của kho lưu trữ [Chiêm bái công dụng bách khoa hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md).

### (Khuyên dùng Mở Rộng) Bước 10: Thu thập Mã Nước Xứ Địa Hành Động Bên Server Gốc (Server Actions / Functions)

Rớt vào thế kẹt của các loại giao thức đẩy ngầm như gọi Hành Xử Máy Chủ Trạm Hành Động Dữ Liệu (Server action triggers) với mục tiêu ứng định ngôn ngữ đúng khớp của thiết bị tương lai (tiêu biểu như trò bấm máy gửi Emails ngầm chả hạn, hoặc gọi API nằng nặc nạp dữ liệu), bạn chỉ cần bê cái cuốc hàm `getLocale` mang mác gốc từ phần lõi phụ kiện ngòi thư viện tên gọi `@next-intlayer/server` chọc vào.

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Thả phanh mà lập các mưu tính hoạt động Server-side xoay trục trên trụ cột cái chữ `locale` ngay và luôn
};
```

> Bộ máy giải hàm `getLocale` đo đạc ra tên ngôn vựa qua cái vòng quy luật xét duyệt sự phân cấp thứ bậc cao thấp ưu tú gồm:
>
> 1. Trinh thám các thông tin móc ngoặc truyền bằng chùm Header theo nguyên mẫu Request Header (Được Proxy tiêm chích thêm vào nếu xài Middleware cấu tạo tự Next).
> 2. Quét kiểm tiếp tệp nội bộ bánh Cookies được sinh giữ bên thiết bị xem có hay không sự trùng lặp giá trị lưu truyền ưu thích nào cũ rích.
> 3. Trong trường vô vọng bánh đúc Cookies chả hiện thân, nó trích xuất phần tùy nghị từ chùm lệnh System OS / Client Preferences.
> 4. Trường phái phòng thủ ngặt nghèo cuối cùng chốt chặn là gọi ngay em Dự kiến Đích Trễ Default (Default Locale Configured Set-Up System), vốn tựa như vị phao trên file cốt sống `intlayer.config.ts`.

### (Đặc Sắc Tính Toán Nếu Giỏi NextJS Mới Nhất) Bước 11: Giáng cấp béo phì / Trẻ hóa Bundle ứt trệ (Sử dụng Khối lượng siêu nhẹ từ SWC Trình biên dịch mở rộng)

Trọng tâm là gói lõi Next-Intlayer thời trước luôn ném tất cả mớ cẩm nang bộ từ vựng ngầm bám dốc vô ngồn tài nguyên phía Khách hàng cho vào thẳng Page Tĩnh, biến mảng ứng dụng nhẹ hiếu thành con khủng long to mập cực cồng kềnh đối chọi các siêu dề kho dịch (Giết dung lượng mạng mạng Client Load times và size bundles).
Không chịu thua, sức bật tiên tiến SWC Plugin xuất chinh. Cụ thể thì Intlayer SWC cho bạn giải quyết hiện trạng tắc nghẽn nực cười kia bằng hiệu năng cắt tỉa sạch bóng những chi tiết cồng kềnh bên phía Server - bằng mẹo chỉ đính tiêm cụm các dãy nhãn chuỗi vừa in trùng đúng khớp theo lời hô hoán của mảng render thay mặt khách trên Client, mọi mẩu thừa từ hệ bảng ngôn còn sót lại hoàn tác không tì vết tống khứ trả ngược chối nhận!

Nhanh tay lùa cái Plugin này nẳm trong bộ tài nguyên cài cắm cho chặng Build / Tool Dev với đoạn gọi:

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

> Thận Trọng Vàng: Gói Module trình cắm búng mảng này thực tạng tính đến bấy giờ đang trong quá trình thai nghén hoàn hảo dưới trạng thái thực nghiệm tiên tiến (Experimental Test Base). Cũng thêm lời phán là cắm này chỉ ưa chơi thân trong những bộ source thuộc vũ trụ version `> 13.0.x++` có Turbopack Turbo.

> Cẩn Tắc Tránh Mất Răng: Theo lẽ thường SWC Engine thuộc Vercel đưa vô khá đòi hỏi có nhãn móc `<Suspense>` lồng khung sẵn bao tròn bế chặt ở những thẻ khai báo mà khi lúc trong đó anh chàng bạn xưng danh cọi các bộ API dạng async/thay dữ liệu trên trục Component dùng ngọn móc hàm `useIntlayer` như: `importMode: 'dynamic'` (nhập theo kịch bản delay trên luồng Render Server). Phớt lờ lời thỉnh giáo trên thì cành báo lỗi chấn động màn hình sập hệ Next.js lúc khai triển máy tính Server Cục bộ Build App Tree hoàn toàn hiển nhiên xảy nha!!

### Cặp Bóng Liền Hồn Cùng Kỹ Thuật Trực Chiến Dịch Thuật trên Trục Công Nghệ Đơn Nhiệm "Turbopack"

Hạ sách là việc tích tụ mô thức hệ thống Webpack Hook Plugin quá ngần ngại cùng quá trình tiến bộ Vercel Engine Turbopack ("Hot Reload System of next dev"). Băng luồng song song đan xen nhằng nhịt tại chặng biên đúc App, Turbopack dễ bị vướng kẹt ngã cúp mạng và dẫn đến mù màng bất đồng bộ quá trình nhả tệp Dịch "Content Translation Background Auto Files" theo từng giọt phút cập nhật trên `Intlayer Plugin Module`.

Phương pháp duy nhất an ổn duy trì dòng máu chớp nháy Turbopack mà ko bị trễ tiến trình Auto là mớm cung khẩu lệnh `intlayer watch command`, một thanh kích nổ tiến trình Watch Process thứ 2 được đẩy thẳng vô chíp khởi sinh ngay qua đoạn Script CLI:

Tìm góc sửa thẳng tay bên gốc rễ của thư mục JSON chính `package.json`:

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // Thổi hồn thổi sức kích chạy Dev Turbo Song Kiếm Hợp Bích cấy hai mầm Auto Watch Component Server.
  },
}
```

> Chú Trích Số: Tương thích trên khung xương cũ `next-intlayer@ < 6.x` thì bổn phận anh em là đóng dấu ấn câu chữ `--turbopack` găm ngay đoạn trần Script cho CLI Tool Watch nắm bắt! VD mẫu là `dev: "intlayer watch --with 'next dev --turbopack'"`. Lên đỉnh cập bến Update từ Node System sau chu kỳ `7.0.0+` của nhánh Module Intlayer sẽ tích hợp lặn vào lõi ko cần khai.

### Chỉnh Pháo Dữ Liệu Typescript Chuẩn & Mở Chức Năng Bắn Gợi Ý Auto Ngay Nạp Trình VS CODE Của Bạn

Thiên cơ là vì hệ thông biến hóa ngầm Compiler cỗ máy thần công liên tục xào xáo rỉ rả để khôn lường khởi động kết tinh tệp Typescript tự chế cùng Cấu hình Translation Definitions "nho nhỏ" giấu sau cánh gà, bổn phận bạn chỉ vỏn vẹn khai thông một khe nứt trên tệp cài đặt JSON config trạm định vị Typescript (`.tsconfig` của thư mục đồ họa IDE Workspace dự án bạn). Của để dành sẽ là hệ thông thái IntelliSense phát huy tác dụng chớp nhoáng:

![Đèn Dự Báo Phép Lạ Autocomplete](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Soi Bóng Gần Sai Trái Biên Dịch Thiếu Thất Bãi (Lôi Đen Đỏ Chữ)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Rút cây kéo ra bổ nhỏ đâm thêm đường này nương trong lõi cấu mảng dữ liệu trên `.tsconfig`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // Phép quy Include Cụ Khối của bạn nếu có...
    ".intlayer/**/*.ts", // Giữ bí kíp mở đường dẫn luồng Data Intellisense Module!
  ],
}
```

### Đẩy File Lên Git Gác Mái và Các Lưu Ý Ẩn Gấp

Bảo lưu sự an yên các khối nhánh hợp vào cành Tree Branch Pull (CI / CD Flow Process), rác dư chẩn đoán của bộ phận chạy nền máy xử lí dịch ngầm Compiler đẻ ra tệp dạng "Background Generated Files Configuration & Mapped Translations Content" cần né ra ngay danh sách Commit / Index Git. Rối loạn tranh chấp Merge Code hoặc Phình to Repository là tai họa rõ ràng!

Cho bé ấy "ra đảo" đi thông qua mốc lệnh bỏ rơi `gitignore` trần tục:

```plaintext fileName=".gitignore"
# Đốt Sạch và Tỏ Thái Độ Phạt thẻ đỏ Ignore không bao giờ đẩy lên Repos Cloud mấy tệp rác Compile này
.intlayer
```

### Triển Nâng Cánh Chim Phím Gõ Lên Max Đỉnh : Hệ Gói Mở Rộng Từ MS Visual Studio Code Editor

Thiết tính lập trình là cặm cụi bừa gõ, vậy nên tối ưu hóa đôi cánh chim lặn hụp mảng I18n chớ lúc nào xa nhãng anh bạn Tool Plugin Extensinon cực ngọt được sinh kế chỉ điểm cho mảng Coder - gọi tên `Intlayer VS Code Extension`.

Dạo một vòng cửa hàng Extensions VSC tải và bấm Cài xong ăn luôn!
[Marketplace Mở Rộng Ứng Cứu Siêu Dựng - Click và tải (Miễn Phí)](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiến hóa sức bền và sự mãn nhãn vào vũ khí Editor Visual Workspace Tool Của Các Bác:

- **Cú Búng Hiển Thị Nổi Lời Tiên Tri Pop-Up Text Tooltip**: Phóng mũi rùa di chuột lướt nhẹ ngang một cái bóng String Lệnh I18n - Đoán đúng chuẩn luôn dòng dịch thuật đúc kết thực tạng bản xứ trên bảng giao diện hiện lên rõ sáng (Native Txt), cắt bỏ luôn thì giờ mần bò chuột lục tệp Dictionary .content tốn bao lâu.
- **Đỏ Thẩm Bào Lỗi Từng Gạch Đít Sai Phạm Lint Code**: Mã thông thái Live-Linter (Check Code lỗi mảng thời gian thực tế) phát lộ từng vệt báo động gạch chân chữ Lỗ thiếu/hoặc trống hoắc Data Translation bằng lằn ranh Lỗi Ngữ Cảnh!
- **Auto Dập Key Text Biến Ra Module Ngay Phím (Shortcut Extractor)**: Thò hai móng quẹt tắt trên tệp React Mảng Thành Phần bọc kín mã (Ex: `<p> Xin chao </p> => Xài phím tắt => Extract Text to Dictionary Data + Tự chèn React Hook I18n `vào chính chỗ đó`). Code mượt như lụa vứt sạch phiền toái. Xem Mảng chỉ nam tại [Dự Án Documentation về VS Code Editor Trực tuyến](https://intlayer.org/doc/vs-code-extension).

### Dạo Quay Nước Kế Xa Xăm (Nâng Cấp Xịn Sổ Kém UI + Kết Nối Backend Headless Server ) ?

Khái quát sơ nhập kho đồ án Next.js i18n bên nền Repository Code base giờ vững chãi. Bạn nung nấu tính vọc cạch mảng chỉnh text cho mảng Copywriter hoặc Ban thiết kế nội dung thao tác dễ bề qua một giao diện Edit Màn Hình trên Web "Visual App"? (Đổi chữ ko cần Dev gõ trên Code Client Local). Khám phá đường ngỏ thông tuyến vào Module Kỹ Sư Trực Quan React Next Giao Diện UI Tool [Bảng App Thao Tác Nội Dung Trực Quan Ngay Màn App Front - Intlayer Visual Edit Tool Setup Guidelines](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Phá vỡ còng biên giới, bạn khát khao tách trọn mọi Data Dịch khỏi môi trường kho mảng ứng dụng Node Codebase nhằm để phân tán rải đều lên hệ thống Máy Mẹ Hệ Trục Online Lưu Trữ Sever Remote (Cấu trúc mảng CMS Server APIs Platform Dịch Vụ Back-end Cloud API). Tới luôn đi, lôi cổ cẩm nang này về cày qua [Khởi Công Chuyển Đổi Mô Hình Setup Mạng Gốc Nội Dung Xuyên Suốt Mọi Vùng Biên CMS Headless Architecture](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

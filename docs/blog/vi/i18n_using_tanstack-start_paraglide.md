---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n với Paraglide JS: Hướng dẫn thiết lập 2026"
description: "Dịch ứng dụng TanStack Start của bạn với Paraglide JS: chiến lược URL, router rewrite, SSR middleware, hreflang, sitemap và robots.txt, cùng dữ liệu benchmark thực tế."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Quốc tế hóa
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Phiên bản ban đầu"
author: aymericzip
---

# Cách quốc tế hóa ứng dụng TanStack Start của bạn bằng Paraglide JS trong năm 2026

## Mục lục

<TOC/>

## Paraglide JS là gì?

**Paraglide JS** (phát triển bởi inlang) là một thư viện i18n **dựa trên trình biên dịch (compiler-based)**. Thay vì cung cấp một runtime tra cứu các khóa trong một đối tượng JSON, nó biên dịch từng thông điệp thành một hàm JavaScript có kiểu dữ liệu tĩnh (`m.about_title()`). Các thông điệp không dùng đến có thể được bundler loại bỏ (tree-shaking), và lỗi chính tả trong khóa sẽ trở thành lỗi biên dịch (compile error).

Paraglide là phương pháp tiếp cận i18n được sử dụng trong các ví dụ chính thức của TanStack Router, và nó tích hợp với TanStack Start thông qua ba thành phần:

- một **Vite plugin** biên dịch các thông điệp và runtime vào thư mục `src/paraglide`;
- một **server middleware** giải quyết locale cho từng yêu cầu (request);
- một **router rewrite** ánh xạ các URL đã bản địa hóa (`/fr/about`) tới cây route của bạn (`/about`), nhờ đó bạn không cần phân đoạn `$locale`.

Hướng dẫn này sẽ thiết lập cả ba thành phần trên, sau đó trình bày tất cả những gì Paraglide để bạn tự xử lý: `lang` và `dir`, bộ chuyển đổi ngôn ngữ (locale switcher), metadata được dịch, `canonical`, `hreflang` với `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, pre-rendering và các trang 404 được bản địa hóa.

> Bạn đang tìm kiếm một tech stack khác?

- [Hướng dẫn TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_use-intl.md)
- [Hướng dẫn TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_lingui.md)
- [Hướng dẫn TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)

> So sánh hai phương pháp tiếp cận dựa trên trình biên dịch? Đọc bài viết [Intlayer có nhẹ hơn Paraglide không?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/is_intlayer_lighter_than_paraglide.md).

> Để hiểu các thư viện này đến từ đâu, hãy đọc lịch sử i18n trong JavaScript.

- [Lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)

## Dữ liệu benchmark nói gì về Paraglide trên TanStack Start

Bài [kiểm thử benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md) chạy cùng một ứng dụng TanStack Start 10 trang, 10 ngôn ngữ với mọi thư viện phổ biến và đo lường dung lượng thực tế mà trình duyệt tải về.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Các số liệu chính cho `@inlang/paraglide-js@2.15.1`, được đo vào ngày 2026-09-26 (gzip):

| Thiết lập                 | Kích thước thư viện | JS mỗi trang | Rò rỉ ngôn ngữ khác | Rò rỉ trang khác | Tải trang |
| :------------------------ | ------------------: | -----------: | ------------------: | ---------------: | --------: |
| Không i18n (ứng dụng gốc) |                   - |     111.0 KB |                  0% |               0% |   15.7 ms |
| Paraglide JS              |              1.8 KB |     125.1 KB |               49.7% |               0% |   22.1 ms |
| `react-intlayer`          |              4.5 KB |     126.8 KB |                  0% |               0% |   14.8 ms |
| `use-intl`                |             75.9 KB |     128.7 KB |                  0% |               0% |   17.4 ms |
| Lingui                    |             56.7 KB |     120.2 KB |                8.6% |               0% |   21.9 ms |

Những điểm cần lưu ý:

- **Runtime rất nhỏ gọn và các trang không bị rò rỉ.** Runtime được tạo riêng cho cấu hình của bạn, và các thông điệp chỉ được import ở nơi chúng được sử dụng.
- **Rò rỉ ngôn ngữ (Locales leak).** Mỗi hàm thông điệp chứa tất cả các ngôn ngữ, vì vậy khoảng một nửa chuỗi dịch được gửi đến một trang thuộc về các ngôn ngữ mà khách truy cập không sử dụng. Bạn càng thêm nhiều locale, tỷ lệ này càng lớn.
- **Thời gian tải trang chậm nhất trong nhóm**, một phần vì locale được giải quyết thông qua các chiến lược (strategies) trong mỗi lần gọi thay vì đọc trực tiếp từ React context.

> Xem toàn bộ dữ liệu: [Báo cáo benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md), và [kho lưu trữ benchmark](https://github.com/intlayer-org/benchmark-i18n).

## So sánh tính năng trên TanStack Start

Cách Paraglide JS so sánh với các thư viện khác thường được dùng trên TanStack Start:

| Tính năng                                   | `react-intlayer` (Intlayer)              | `use-intl`               | Paraglide JS                         | Lingui                         |
| ------------------------------------------- | ---------------------------------------- | ------------------------ | ------------------------------------ | ------------------------------ |
| **Bản dịch đặt gần component**              | ✅ Đặt cùng (Co-located)                 | ❌ JSON tập trung        | ❌ Một tệp JSON cho mỗi locale       | ⚠️ Văn bản gốc trong component |
| **Tích hợp TypeScript**                     | ✅ Tự động tạo kiểu                      | ✅ Qua `AppConfig`       | ✅ Các hàm thông điệp có kiểu        | ⚠️ Chỉ qua macro               |
| **Phát hiện bản dịch thiếu**                | ✅ Lỗi kiểu và cảnh báo build            | ⚠️ Dự phòng khi chạy     | ⚠️ Dự phòng về locale cơ sở          | ⚠️ Dự phòng về văn bản gốc     |
| **Nội dung phong phú (JSX, Markdown)**      | ✅ Hỗ trợ trực tiếp                      | ⚠️ Thẻ qua `t.rich`      | ⚠️ Chuỗi                             | ✅ JSX bên trong `<Trans>`     |
| **Routing bản địa hóa**                     | ✅ Tích hợp sẵn                          | ❌ Thủ công `{-$locale}` | ✅ `urlPatterns` + router rewrite    | ❌ Thủ công `{-$locale}`       |
| **Đổi ngôn ngữ không tải lại trang**        | ✅ Có                                    | ✅ Có                    | ❌ Tải lại toàn bộ trang             | ✅ Có                          |
| **Xử lý số nhiều (Pluralization)**          | ✅ Dựa trên liệt kê                      | ✅ ICU                   | ✅ Biến thể (Variants)               | ✅ ICU                         |
| **ICU MessageFormat**                       | ✅ Qua `format: "icu"`                   | ✅ Tích hợp gốc          | ⚠️ Qua plugin inlang                 | ✅ Tích hợp gốc                |
| **Định dạng nội dung**                      | ✅ `.ts`, `.json`, `.md`, `.yaml`...     | ⚠️ `.json`               | ⚠️ inlang JSON                       | ✅ PO, JSON, CSV               |
| **Dịch thuật AI**                           | ✅ Nhà cung cấp và API key riêng         | ❌ Không                 | ❌ Không                             | ❌ Không                       |
| **Trình chỉnh sửa trực quan / CMS**         | ✅ Trình soạn thảo cục bộ + CMS tùy chọn | ❌ Nền tảng bên ngoài    | ⚠️ Ứng dụng hệ sinh thái inlang      | ❌ Nền tảng bên ngoài          |
| **Hỗ trợ SEO (hreflang, sitemap)**          | ✅ Tích hợp sẵn                          | ❌ Thủ công              | ⚠️ URL bản địa hóa, còn lại thủ công | ❌ Thủ công                    |
| **Kích thước runtime (gzip, benchmark)**    | 4.5 KB                                   | 75.9 KB                  | 1.8 KB                               | 56.7 KB                        |
| **Rò rỉ, thiết lập tối ưu (locale / page)** | 0% / 0%                                  | 0% / 0%                  | 49.7% / 0%                           | 8.6% / 0%                      |
| **Bản dịch thiếu trong CI**                 | ✅ `npx intlayer test`                   | ⚠️ Không tích hợp sẵn    | ⚠️ Không tích hợp sẵn                | ✅ `lingui compile --strict`   |

> Kích thước runtime và số liệu rò rỉ đến từ [Benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md). Độ rò rỉ được đo trên thiết lập tối ưu nhất của từng thư viện.

> Các hướng dẫn TanStack Start khác:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)

## Các nguyên tắc thực hành bạn nên tuân theo

- **Thiết lập `lang` và `dir` trên thẻ `<html>`** từ locale đã được giải quyết, ngay trên server.
- **Duy trì một URL riêng cho mỗi ngôn ngữ** với chiến lược tiền tố (`/fr/about`), để mọi phiên bản ngôn ngữ đều có thể lập chỉ mục (indexable).
- **Đặt `url` lên đầu tiên trong chiến lược locale của bạn**, để URL là nguồn chân lý duy nhất (source of truth), và trình thu thập dữ liệu (crawler) nhận được đúng trang được yêu cầu.
- **Sử dụng các khóa thông điệp phẳng, có tính mô tả** (`about_title`) ánh xạ rõ ràng thành tên hàm.
- **Commit các tệp `messages/*.json`, không commit thư mục được tạo `src/paraglide`**, nhằm tránh xung đột merge trên các tệp tự động sinh.
- **Dịch metadata của bạn**, và khai báo `canonical`, `hreflang` cùng `x-default` trên mỗi trang.
- **Tạo sitemap đa ngôn ngữ và robots.txt**, và pre-render mọi ngôn ngữ.
- **Sử dụng các liên kết thực cho bộ chuyển đổi ngôn ngữ**, để crawler phát hiện được tất cả các ngôn ngữ.

- [quốc tế hóa và SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md)
- [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md)

## Hướng dẫn từng bước thiết lập Paraglide JS trong ứng dụng TanStack Start

Dưới đây là cấu trúc dự án chúng ta sẽ tạo:

```bash
.
├── project.inlang
│   └── settings.json          # Locales và định dạng thông điệp
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Được sinh tự động, bỏ qua trong git
    ├── server.ts              # Paraglide middleware
    ├── router.tsx             # Ghi đè URL (URL rewrite)
    ├── i18n
    │   ├── config.ts          # URL trang web, helpers
    │   └── seo.ts             # Trình tạo head()
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / và /fr
        ├── about.tsx          # /about và /fr/about
        ├── $.tsx              # Trang 404 bản địa hóa
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Lưu ý rằng không có thư mục `$locale`: router rewrite sẽ loại bỏ tiền tố trước khi khớp route.

<Steps>
<Step number={1} title="Cài đặt các gói phụ thuộc">

Bắt đầu từ một dự án TanStack Start, sau đó khởi tạo Paraglide. Lệnh init sẽ tạo `project.inlang/settings.json`, tệp `messages/en.json` đầu tiên và cài đặt gói cần thiết.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: trình biên dịch và Vite plugin của nó. Không có gói runtime nào cần cài đặt: runtime được tạo trực tiếp vào dự án của bạn.

</Step>
<Step number={2} title="Cấu hình các Locale">

`project.inlang/settings.json` là nguồn chân lý duy nhất cho các locale. Plugin định dạng thông điệp đọc một tệp JSON cho mỗi ngôn ngữ.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Cấu hình Vite Plugin và Chiến lược URL">

Plugin biên dịch các thông điệp trên mỗi lần thay đổi. Có ba tùy chọn quan trọng cho TanStack Start:

- **`strategy`**: danh sách có thứ tự các vị trí đọc locale. `url` đặt đầu tiên giúp URL trở thành nguồn chân lý. `cookie` và `preferredLanguage` được middleware sử dụng khi URL không xác định được locale.
- **`urlPatterns`**: cách một locale ánh xạ tới URL. Các locale không phải mặc định được liệt kê trước, vì pattern khớp đầu tiên sẽ được áp dụng. Ở đây locale mặc định không có tiền tố (`/about`), và các locale khác có tiền tố (`/fr/about`).
- **`outputStructure: "message-modules"`**: mỗi thông điệp là một module, cho phép bundler loại bỏ các thông điệp mà trang không import.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Thêm thư mục được tạo tự động vào `.gitignore`. Nó sẽ được xây dựng lại khi chạy `dev` và `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Tạo các tệp bản dịch của bạn">

Mỗi khóa trở thành một hàm được export từ `src/paraglide/messages`. Các khóa phẳng dạng snake_case mang lại tên hàm rõ ràng nhất. Các biến sử dụng trình giữ chỗ `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Dạng số nhiều sử dụng cú pháp variants của inlang message format:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Thêm Server Middleware">

Middleware giải quyết locale cho từng yêu cầu bằng chiến lược của bạn, và cung cấp nó cho `getLocale()` trong toàn bộ quá trình render trên server thông qua một scope `AsyncLocalStorage`. Điều này giúp các yêu cầu đồng thời bằng các ngôn ngữ khác nhau diễn ra an toàn.

Trong TanStack Start, hãy bọc server entry mặc định:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Ghi đè các URL bản địa hóa trong Router">

Tùy chọn `rewrite` của TanStack Router dịch các URL tại ranh giới của router:

- **đầu vào (input)**: `/fr/about` được hủy bản địa hóa (de-localize) về `/about` trước khi khớp route, nhờ đó một route `about.tsx` duy nhất phục vụ mọi ngôn ngữ;
- **đầu ra (output)**: mọi `href` được tạo (liên kết, chuyển hướng, điều hướng) đều được bản địa hóa cho locale đang hoạt động, do đó `<Link to="/about">` sẽ render thành `/fr/about` trên trang tiếng Pháp.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Vì các liên kết được bản địa hóa thông qua cơ chế rewrite, bạn không cần component `LocalizedLink` tùy chỉnh: chỉ cần sử dụng component `Link` của TanStack Router như bình thường.

</Step>
<Step number={7} title="Tạo Root Document">

`getLocale()` trả về locale được giải quyết bởi middleware trên server, và locale từ URL trong trình duyệt, vì vậy `lang` và `dir` là đồng nhất trong mã HTML từ server và sau khi hydrate.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Sử dụng bản dịch trong các trang của bạn">

Các thông điệp là các hàm thông thường: import `m`, gọi hàm, truyền các biến dưới dạng một đối tượng. Mọi thứ đều được định kiểu (typed), bao gồm cả các biến.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Một hàm thông điệp cũng chấp nhận một locale tường minh: `m.about_title({}, { locale: "fr" })`. Điều này hữu ích trong mã server cần kết xuất ngôn ngữ khác với ngôn ngữ của request, chẳng hạn như gửi email.

</Step>
<Step number={9} title="Thay đổi ngôn ngữ nội dung của bạn" isOptional={true}>

Render bộ chuyển đổi dưới dạng các **liên kết** với `localizeHref`, để trình thu thập dữ liệu (crawler) phát hiện ra mọi ngôn ngữ. `setLocale` lưu lựa chọn vào cookie và tải lại trang bằng ngôn ngữ mới: tải lại toàn bộ trang là hành vi mặc định của Paraglide, vì các hàm thông điệp đọc locale ở mỗi lần gọi thay vì đăng ký vào một React state.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Quốc tế hóa Metadata của bạn" isOptional={true}>

Mỗi phiên bản ngôn ngữ có thể xếp hạng độc lập, miễn là mỗi trang cung cấp:

- một `<title>` và `description` **đã được dịch**;
- một URL **canonical** trỏ về chính nó;
- một **thẻ thay thế `hreflang` cho mỗi locale**, cộng với **`x-default`**;
- **Open Graph** `og:locale`, `og:locale:alternate` và `og:url`;
- **JSON-LD** với `inLanguage`.

Hàm `localizeUrl` của Paraglide xây dựng các URL thay thế từ `urlPatterns` của bạn, vì vậy chúng không bao giờ bị lệch khỏi routing thực tế:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="Quốc tế hóa Sitemap của bạn" isOptional={true}>

Một sitemap đa ngôn ngữ liệt kê mọi URL của từng locale, và mỗi mục khai báo tất cả các phiên bản thay thế của nó bằng `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="Quốc tế hóa robots.txt của bạn" isOptional={true}>

Các route riêng tư tồn tại trong mọi ngôn ngữ, vì vậy các quy tắc `Disallow` phải bao gồm tất cả các đường dẫn được bản địa hóa. Xóa `public/robots.txt` nếu project starter đã tạo, sau đó phục vụ nó từ một route:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="Pre-render mọi Locale" isOptional={true}>

Liệt kê đường dẫn bản địa hóa của từng trang để TanStack Start pre-render tất cả các phiên bản ngôn ngữ. `localizeHref` là mã được tạo tự động không phụ thuộc vào trình duyệt, vì vậy nó có thể chạy trong `vite.config.ts`, nhưng tệp này chỉ tồn tại sau lần biên dịch đầu tiên. Liệt kê các đường dẫn thủ công, như dưới đây, sẽ tránh được vấn đề thứ tự đó:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Vì bộ chuyển đổi ngôn ngữ render các liên kết thực, `crawlLinks: true` cũng sẽ phát hiện các trang mà bạn quên liệt kê.

</Step>
<Step number={14} title="Xử lý các trang 404 bản địa hóa" isOptional={true}>

Nhờ có cơ chế rewrite, `/fr/does-not-exist` được khớp dưới dạng `/does-not-exist`, và `getLocale()` vẫn trả về `fr`, do đó component `notFoundComponent` gốc ở bước 7 sẽ render bằng tiếng Pháp. Một route dạng catch-all đảm bảo các đường dẫn sâu hơn cũng đến được đây. Đánh dấu trang là `noindex`: React 19 sẽ tự động đẩy thẻ `<meta>` lên `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Truy cập Locale trong Server Functions" isOptional={true}>

Các hàm phía server chạy bên trong scope của Paraglide middleware, vì vậy `getLocale()` cũng hoạt động tại đó:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="So sánh với Intlayer" isOptional={true}>

Không có adapter chuyển đổi trực tiếp từ Paraglide sang Intlayer, vì cả hai đều đi theo cùng một triết lý: biên dịch nội dung tại thời điểm build và đưa càng ít runtime vào bundle càng tốt. Sự khác biệt nằm ở những gì được gửi tới trình duyệt và cách tổ chức nội dung:

- **Các Locale**: Intlayer tải [từ điển động (dynamic dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) cho từng locale (0% rò rỉ ngôn ngữ trong benchmark), trong khi mỗi hàm thông điệp của Paraglide mang theo tất cả các ngôn ngữ (49.7%).
- **Tổ chức nội dung**: nội dung có thể nằm trong các tệp `.content.ts` bên cạnh từng component, hoặc trong các tệp tập trung. Xem [so sánh i18n theo component và i18n tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md).
- **Chuyển đổi ngôn ngữ**: nội dung được đọc từ một React context, vì vậy việc chuyển đổi locale sẽ re-render mà không cần tải lại trang.
- **Mã được tạo**: không có gì được tạo bên trong thư mục `src`, do đó không cần phải tạo lại mã trước khi commit.

Nếu bạn chuyển từ một thư viện khác thay vì Paraglide, các [compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) sẽ giữ nguyên API của `use-intl`, `next-intl`, `react-i18next`, `react-intl` hoặc Lingui và chỉ thay thế runtime.

Xem [Intlayer có nhẹ hơn Paraglide không?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/is_intlayer_lighter_than_paraglide.md) và [Hướng dẫn Intlayer cho TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="Tự động hóa bản dịch bằng Intlayer" isOptional={true}>

Paraglide giúp hiển thị các bản dịch, nhưng nó không hỗ trợ bạn **tạo** chúng. Intlayer là **miễn phí** và **mã nguồn mở**, cùng bộ công cụ hữu ích ngay cả trong dự án Paraglide:

- **Dịch bằng AI** sử dụng API key và nhà cung cấp của riêng bạn. Xem [tự động điền (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md) và [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).
- **Giữ các tệp JSON của bạn** làm nguồn chân lý với [plugin đồng bộ JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md).
- **Kiểm tra các bản dịch bị thiếu** trong quy trình CI. Xem [kiểm thử bản dịch của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md).
- **Quét trang web đã triển khai của bạn** để phát hiện các thẻ `hreflang` bị thiếu, canonical sai và rò rỉ ngôn ngữ với [lệnh scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/scan.md).

</Step>
</Steps>

## Các câu hỏi thường gặp

<FAQ>

<Question title="Paraglide JS có phải là lựa chọn tốt cho TanStack Start không?">

Đó là một lựa chọn đáng tin cậy: nó được sử dụng trong các ví dụ chính thức của TanStack Router, có runtime nhỏ nhất trong [bài kiểm thử benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md) (~1.8 KB gzip), và các thông điệp có kiểu dữ liệu đầy đủ. Sự đánh đổi là mỗi hàm thông điệp chứa toàn bộ các locale, làm rò rỉ khoảng một nửa chuỗi dịch tới người dùng ngôn ngữ khác, và việc đổi ngôn ngữ sẽ tải lại trang.

</Question>
<Question title="Tôi có cần phân đoạn route $locale với Paraglide không?">

Không. Router `rewrite` loại bỏ tiền tố locale trước khi khớp route và thêm lại nó vào các liên kết được tạo, nhờ đó một tệp `about.tsx` duy nhất có thể phục vụ `/about`, `/fr/about` và `/es/about`.

</Question>
<Question title="Tại sao thay đổi ngôn ngữ lại tải lại trang?">

Các hàm thông điệp đọc locale khi chúng được gọi, chúng không đăng ký lắng nghe state trong React. Vì vậy `setLocale` mặc định tải lại trang để mọi thông điệp được render lại bằng ngôn ngữ mới. Bạn có thể truyền `{ reload: false }`, nhưng khi đó bạn phải tự xử lý việc render lại cây component.

</Question>
<Question title="Tôi có nên commit thư mục src/paraglide được tạo ra không?">

Tốt hơn là không nên. Thư mục này được tạo lại sau mỗi lần chạy `dev` và `build`, và việc commit nó sẽ gây ra xung đột merge trên các tệp tự sinh. Hãy commit `messages/*.json` và `project.inlang/settings.json` thay vào đó.

</Question>
<Question title="Làm cách nào để thêm thẻ hreflang với Paraglide?">

Sử dụng `localizeUrl` để xây dựng một URL tuyệt đối cho mỗi locale trong hàm `head()` của route, và thêm `x-default` trỏ về locale cơ sở. Bước 10 cung cấp một hàm helper có thể tái sử dụng, và bước 11 thêm các liên kết thay thế tương tự vào sitemap.

</Question>
<Question title="Paraglide có tree-shake các bản dịch không dùng đến không?">

Các **thông điệp (messages)** không sử dụng sẽ bị loại bỏ khi bạn dùng `outputStructure: "message-modules"`, vì vậy nội dung của các trang khác không bị rò rỉ. Tuy nhiên các **ngôn ngữ (locales)** không dùng đến thì không: mỗi hàm thông điệp chứa tất cả các bản dịch, đó là lý do benchmark ghi nhận mức rò rỉ ngôn ngữ 49.7%.

</Question>
<Question title="Tôi có thể chuyển đổi từ Paraglide sang Intlayer không?">

Có. Cả hai đều dựa trên trình biên dịch (compiler-based), nên mô hình tư duy rất tương đồng. Hãy giữ các tệp JSON của bạn với [plugin đồng bộ JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md), sau đó thay thế các lệnh gọi `m.key()` bằng `useIntlayer`, từng trang một. Xem [Hướng dẫn Intlayer cho TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md).

</Question>

</FAQ>

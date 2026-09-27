---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n với Lingui: Hướng dẫn thiết lập toàn diện 2026"
description: "Dịch ứng dụng TanStack Start của bạn với Lingui: macro, catalog PO, SSR, định tuyến ngôn ngữ, hreflang, sitemap và robots.txt, cùng dữ liệu benchmark kích thước bundle thực tế."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Quốc tế hóa
  - i18n
  - SEO
  - Tệp PO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Phiên bản ban đầu"
author: aymericzip
---

# Cách quốc tế hóa ứng dụng TanStack Start của bạn bằng Lingui vào năm 2026

## Mục lục

<TOC/>

## Lingui là gì?

**Lingui** là một thư viện i18n được xây dựng xoay quanh **macro** và **trích xuất thông điệp (message extraction)**. Bạn viết văn bản nguồn trực tiếp trong các component của mình (`` t`Hello` ``, `<Trans>Hello</Trans>`), lệnh `lingui extract` sẽ thu thập mọi thông điệp vào các catalog (mặc định là các tệp PO), các biên dịch viên sẽ điền nội dung bản dịch, và Vite plugin sẽ biên dịch chúng thành JavaScript nhỏ gọn. Các thông điệp sử dụng ICU MessageFormat, vì vậy hỗ trợ đầy đủ số nhiều (plural) và lựa chọn (select).

TanStack Start không đi kèm sẵn một tầng i18n, do đó hướng dẫn này sẽ tích hợp Lingui vào dự án từ đầu:

- **Các macro được biên dịch bởi Babel** thông qua `@rolldown/plugin-babel` (bắt buộc với `@vitejs/plugin-react` v6 và Vite 8).
- **Định tuyến ngôn ngữ (locale routing)** với một phân đoạn tùy chọn `{-$locale}` (`/about`, `/fr/about`).
- **Mỗi ngôn ngữ một catalog, được tải theo nhu cầu (on demand)**, và một instance `I18n` riêng cho mỗi lần render để các yêu cầu SSR đồng thời không bao giờ chia sẻ trạng thái ngôn ngữ.
- **SEO đa ngôn ngữ hoàn chỉnh**: `<title>` và description đã dịch, URL chuẩn (canonical), `hreflang` với `x-default`, Open Graph locales, JSON-LD, sitemap, `robots.txt`, pre-rendering và các trang 404 được bản địa hóa.

> Bạn đang tìm kiếm một bộ công nghệ khác?

- [hướng dẫn TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_use-intl.md)
- [hướng dẫn TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_paraglide.md)
- [hướng dẫn TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)

> Bạn đang sử dụng Next.js?

- [hướng dẫn Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_nextjs_lingui.md)

> So sánh các thư viện?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer.md)

> Để hiểu các thư viện này đến từ đâu, hãy đọc lịch sử i18n trong JavaScript.

- [Lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)

## Benchmark nói gì về Lingui trên TanStack Start

Bài [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md) chạy cùng một ứng dụng TanStack Start 10 trang, 10 ngôn ngữ với mọi thư viện phổ biến và đo lường những gì trình duyệt thực sự tải xuống.

- [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Các số liệu chính cho `@lingui/core@6.6.0`, đo vào ngày 2026-09-26 (gzip):

| Cấu hình                        | Kích thước thư viện | JS mỗi trang | Rò rỉ ngôn ngữ khác | Rò rỉ trang khác |
| :------------------------------ | ------------------: | -----------: | ------------------: | ---------------: |
| Không i18n (ứng dụng gốc)       |                   - |     111.0 KB |                  0% |               0% |
| Lingui (cấu hình trong bài này) |             56.7 KB |     115.2 KB |                9.3% |               0% |
| `@intlayer/lingui` (compat)     |              9.8 KB |     136.7 KB |                9.9% |               0% |
| `react-intlayer` (Intlayer gốc) |              4.5 KB |     126.8 KB |                  0% |               0% |

Những điểm cốt lõi cần lưu ý:

- **Tải một catalog cho mỗi ngôn ngữ theo nhu cầu.** Điều này giữ cho dung lượng các trang gần với ứng dụng gốc.
- **Runtime vẫn tương đối nặng** (~57 KB gzip). Adapter tương thích `@intlayer/lingui` (bước 16) giữ nguyên các macro của bạn và giảm kích thước xuống còn ~10 KB.

> Xem toàn bộ dữ liệu tại: [Báo cáo benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md), và [kho lưu trữ benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Báo cáo benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md)

## So sánh tính năng trên TanStack Start

Cách Lingui so sánh với các thư viện khác thường dùng trên TanStack Start:

| Tính năng                                      | `react-intlayer` (Intlayer)          | `use-intl`               | Paraglide JS                         | Lingui                           |
| ---------------------------------------------- | ------------------------------------ | ------------------------ | ------------------------------------ | -------------------------------- |
| **Bản dịch đặt gần component**                 | ✅ Đặt cùng vị trí (Co-located)      | ❌ JSON tập trung        | ❌ Một tệp JSON cho mỗi ngôn ngữ     | ⚠️ Văn bản nguồn trong component |
| **Tích hợp TypeScript**                        | ✅ Kiểu dữ liệu tự động tạo          | ✅ Qua `AppConfig`       | ✅ Các hàm thông điệp có kiểu        | ⚠️ Chỉ macro                     |
| **Phát hiện thiếu bản dịch**                   | ✅ Lỗi kiểu và cảnh báo lúc build    | ⚠️ Dự phòng runtime      | ⚠️ Dự phòng về ngôn ngữ gốc          | ⚠️ Dự phòng về văn bản nguồn     |
| **Nội dung phong phú (JSX, Markdown)**         | ✅ Hỗ trợ trực tiếp                  | ⚠️ Thẻ qua `t.rich`      | ⚠️ Chuỗi                             | ✅ JSX bên trong `<Trans>`       |
| **Định tuyến bản địa hóa**                     | ✅ Tích hợp sẵn                      | ❌ Thủ công `{-$locale}` | ✅ `urlPatterns` + viết lại router   | ❌ Thủ công `{-$locale}`         |
| **Chuyển ngôn ngữ không cần tải lại**          | ✅ Có                                | ✅ Có                    | ❌ Tải lại toàn bộ trang             | ✅ Có                            |
| **Xử lý số nhiều (Pluralization)**             | ✅ Dựa trên liệt kê                  | ✅ ICU                   | ✅ Biến thể (Variants)               | ✅ ICU                           |
| **ICU MessageFormat**                          | ✅ Qua `format: "icu"`               | ✅ Tích hợp gốc          | ⚠️ Qua plugin inlang                 | ✅ Tích hợp gốc                  |
| **Định dạng nội dung**                         | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`               | ⚠️ inlang JSON                       | ✅ PO, JSON, CSV                 |
| **Dịch tự động bằng AI**                       | ✅ Nhà cung cấp và API key của bạn   | ❌ Không                 | ❌ Không                             | ❌ Không                         |
| **Trình chỉnh sửa trực quan / CMS**            | ✅ Editor cục bộ + CMS tùy chọn      | ❌ Nền tảng bên ngoài    | ⚠️ Các ứng dụng hệ sinh thái inlang  | ❌ Nền tảng bên ngoài            |
| **Hỗ trợ SEO (hreflang, sitemap)**             | ✅ Tích hợp sẵn                      | ❌ Thủ công              | ⚠️ URL bản địa hóa, còn lại thủ công | ❌ Thủ công                      |
| **Kích thước runtime (gzip, benchmark)**       | 4.5 KB                               | 75.9 KB                  | 1.8 KB                               | 56.7 KB                          |
| **Rò rỉ, thiết lập tối ưu (ngôn ngữ / trang)** | 0% / 0%                              | 0% / 0%                  | 49.7% / 0%                           | 8.6% / 0%                        |
| **Bản dịch thiếu trong CI**                    | ✅ `npx intlayer test`               | ⚠️ Không tích hợp sẵn    | ⚠️ Không tích hợp sẵn                | ✅ `lingui compile --strict`     |

> Các số liệu về kích thước runtime và rò rỉ đến từ [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md). Rò rỉ được đo trên cấu hình tối ưu nhất của từng thư viện.

- [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md)

> Các hướng dẫn khác cho TanStack Start:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)

## Các thực hành tốt nhất bạn nên tuân thủ

- **Thiết lập `lang` và `dir` trên thẻ `<html>`** từ ngôn ngữ của route, đảm bảo chúng chính xác trong HTML phía server.
- **Giữ một URL riêng cho mỗi ngôn ngữ** với tiền tố prefix, để mọi phiên bản ngôn ngữ đều có thể được lập chỉ mục.
- **Tạo một instance `I18n` riêng cho mỗi ngôn ngữ**, không bao giờ thay đổi một instance toàn cục trong quá trình SSR: hai yêu cầu đồng thời có thể ghi đè ngôn ngữ của nhau.
- **Chỉ tải catalog đang hoạt động**, không bao giờ import tất cả catalog trong mã phía client.
- **Chọn một phong cách macro nhất quán** (`useLingui` + `t` trong component, `msg` cho các descriptor lười tải) và kiên định với nó. Việc kết hợp lẫn lộn `t`, `i18n._`, `i18n.t` và `<Trans>` làm cho mã nguồn trở nên khó đọc hơn đối với con người và các trợ lý AI.
- **Chạy `lingui extract` trong CI** để không có thông điệp mới nào bị đưa lên mà chưa được dịch.
- **Dịch metadata của bạn**, đồng thời khai báo `canonical`, `hreflang` và `x-default` trên mỗi trang.
- **Tạo sitemap và robots.txt đa ngôn ngữ**, và pre-render mọi ngôn ngữ.
- **Sử dụng các thẻ liên kết thật cho bộ chuyển đổi ngôn ngữ**, để trình thu thập dữ liệu (crawlers) có thể khám phá mọi ngôn ngữ.

- [quốc tế hóa và SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md)
- [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md)

## Hướng dẫn từng bước để thiết lập Lingui trong ứng dụng TanStack Start

Dưới đây là cấu trúc dự án chúng ta sẽ tạo:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Được tạo bởi `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Request middleware (chuyển hướng ngôn ngữ)
    ├── i18n
    │   ├── config.ts           # Cấu hình ngôn ngữ, helper URL
    │   ├── lingui.ts           # Trình tải catalog, các instance I18n
    │   ├── negotiateLocale.ts  # Phân tích Accept-Language
    │   └── seo.ts              # Trình tạo head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Layout ngôn ngữ + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Trang 404 bản địa hóa
```

<Steps>
<Step number={1} title="Cài đặt các gói phụ thuộc">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider` và các macro (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: lệnh `lingui extract` để thu thập thông điệp vào các catalog.
- **@lingui/vite-plugin**: biên dịch các catalog `.po` khi import, vì vậy không cần chạy lệnh `lingui compile`.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: chuyển đổi các macro tại thời điểm build.

</Step>
<Step number={2} title="Tập trung hóa cấu hình ngôn ngữ của bạn">

Ngôn ngữ mặc định không có tiền tố (`/about`), các ngôn ngữ khác có tiền tố (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Cấu hình Lingui">

Cấu hình Lingui tái sử dụng cùng danh sách ngôn ngữ, do đó các catalog, router và sitemap không bao giờ bị lệch nhau.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

Thêm các script trích xuất:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` sẽ thất bại trong CI khi một component chứa thông điệp chưa được trích xuất và commit.

</Step>
<Step number={4} title="Cấu hình Vite">

Với `@vitejs/plugin-react` v6, Babel không còn được tích hợp sẵn. `@rolldown/plugin-babel` sẽ chạy plugin macro của Lingui, và `linguiTransformerBabelPreset` chỉ xử lý các tệp có import macro, giúp quá trình build diễn ra nhanh chóng.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Tải Catalog theo từng ngôn ngữ">

Template literal trong `import()` cho phép Vite xuất ra **mỗi catalog một chunk riêng**, và Lingui plugin sẽ biên dịch tệp `.po` vào đó. Người dùng tiếng Pháp sẽ chỉ tải riêng catalog tiếng Pháp.

Các thông điệp đã biên dịch là dữ liệu thuần túy, do đó chúng có thể được trả về bởi route loader, tuần tự hóa vào HTML và tái sử dụng khi hydration.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Để TypeScript chấp nhận cú pháp import `.po`, hãy khai báo module một lần:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Tạo tài liệu Root">

Root route đọc param ngôn ngữ tùy chọn để thiết lập `lang` và `dir` trên thẻ `<html>` được render phía server.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

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
```

</Step>
<Step number={7} title="Tạo Locale Layout Route">

Thư mục `{-$locale}` tạo ra một phân đoạn đường dẫn tùy chọn: `/about` và `/fr/about` đều khớp với `/{-$locale}/about`. Layout sẽ từ chối các tiền tố không hợp lệ, tải catalog của ngôn ngữ hiện tại và cung cấp một instance `I18n` riêng biệt.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Sử dụng bản dịch trong các trang của bạn">

Viết văn bản nguồn trực tiếp trong component. Các macro sẽ biến nó thành các message ID tại thời điểm build, và `lingui extract` sẽ thu thập chúng.

- `<Trans>` cho nội dung JSX, bao gồm các phần tử lồng nhau;
- `useLingui().t` cho chuỗi (thuộc tính, props);
- `<Plural>` cho số nhiều ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> Thao tác `import()` động của catalog được lưu vào bộ nhớ cache bởi hệ thống module, do đó việc gọi `loadI18n` trong nhiều loader sẽ không tải catalog lại hai lần.

</Step>
<Step number={9} title="Trích xuất và dịch thông điệp của bạn">

Chạy lệnh trích xuất. Lingui sẽ ghi mọi thông điệp vào catalog của từng ngôn ngữ:

```bash
npm run i18n:extract
```

Sau đó dịch trường `msgstr` của từng mục:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos và por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Theo mặc định, message ID là mã băm (hash) của văn bản nguồn: việc thay đổi văn bản tiếng Anh sẽ tạo ra một thông điệp mới. Sử dụng ID tường minh (`<Trans id="about.title">About us</Trans>`) cho các văn bản thường xuyên thay đổi.

</Step>
<Step number={10} title="Xây dựng Component liên kết bản địa hóa" isOptional={true}>

Mọi route đều nằm dưới `{-$locale}`, vì vậy các liên kết phải mang theo param ngôn ngữ hiện tại.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Thay đổi ngôn ngữ nội dung của bạn" isOptional={true}>

Hiển thị bộ chuyển đổi dưới dạng các **thẻ liên kết (links)** để các trình thu thập dữ liệu tìm thấy mọi phiên bản ngôn ngữ. `to="."` giữ nguyên trang hiện tại và thay thế param ngôn ngữ. Loader của layout ngôn ngữ sau đó sẽ nạp catalog mới.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="Quốc tế hóa Metadata của bạn" isOptional={true}>

Mỗi phiên bản ngôn ngữ có thể xếp hạng độc lập, miễn là mỗi trang cung cấp `<title>` và description đã được dịch, thẻ canonical tự tham chiếu, một `hreflang` cho mỗi ngôn ngữ cộng với `x-default`, Open Graph locales và JSON-LD với `inLanguage`. Metadata được dịch trong loader (bước 8), và helper này sẽ xây dựng phần còn lại:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
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
        href: getAbsoluteUrl(path, defaultLocale),
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
<Step number={13} title="Quốc tế hóa Sitemap và robots.txt của bạn" isOptional={true}>

Sitemap liệt kê mọi URL của từng ngôn ngữ, mỗi mục khai báo tất cả các phiên bản thay thế với `xhtml:link`. `robots.txt` chặn các đường dẫn riêng tư trong mọi ngôn ngữ và trỏ tới sitemap. Xóa `public/robots.txt` nếu mẫu starter đã tạo một tệp như vậy.

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="Pre-render mọi ngôn ngữ" isOptional={true}>

Liệt kê mọi đường dẫn đã bản địa hóa để TanStack Start pre-render tất cả các phiên bản ngôn ngữ tại thời điểm build:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Chuyển hướng khách truy cập lần đầu và xử lý trang 404" isOptional={true}>

Một request middleware sẽ chuyển khách truy cập khi vào `/` tới ngôn ngữ ưu tiên của họ (ưu tiên cookie trước, sau đó đến `Accept-Language`). Các deep link không bao giờ bị chuyển hướng, đảm bảo trình thu thập dữ liệu và các URL được chia sẻ luôn nhận đúng trang được yêu cầu.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

Đối với các trang 404, một catch-all route sẽ render component `notFoundComponent` đã được bản địa hóa của layout. Đánh dấu trang với `noindex`: React 19 sẽ tự động đưa thẻ `<meta>` lên `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Giữ lại Macro, Giảm thiểu Runtime với Intlayer" isOptional={true}>

Adapter tương thích [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md) giữ nguyên mã nguồn của bạn: các macro vẫn được biên dịch chính xác như trước, và các lời gọi `i18n._()`, `useLingui()` cùng `<Trans>` được phục vụ bởi các dictionary Intlayer đã biên dịch. Trong bài benchmark, kích thước runtime giảm từ **~56.7 KB xuống còn ~9.8 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md)

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Thêm plugin sau bước chuyển đổi macro để plugin này alias `@lingui/core` và `@lingui/react` sang adapter:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Các catalog được đồng bộ hóa với [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) (cho catalog JSON) hoặc [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) (cho catalog PO). Xem toàn bộ cấu hình trong [hướng dẫn tương thích Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md), và xem so sánh chi tiết trong bài viết [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer-lingui.md).

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md)
- [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md)
- [hướng dẫn tương thích Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer-lingui.md)

</Step>
<Step number={17} title="Tự động hóa bản dịch của bạn với Intlayer" isOptional={true}>

Lingui giúp trích xuất thông điệp, nhưng việc điền hàng chục catalog bằng tay là công đoạn tốn nhiều thời gian nhất. Intlayer là công cụ **miễn phí** và **mã nguồn mở**, hoạt động song song cùng Lingui:

- **Dịch tự động bằng AI** sử dụng API key và nhà cung cấp của riêng bạn. Xem [tự động điền bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md) và [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).
- **Giữ các tệp PO của bạn** làm nguồn chân lý duy nhất với [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md).
- **Kiểm tra thiếu bản dịch** trong CI. Xem [kiểm thử bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md).
- **Kiểm tra website đã triển khai** để phát hiện thiếu `hreflang`, canonical sai và rò rỉ ngôn ngữ với [lệnh scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/scan.md).

</Step>
</Steps>

## Các câu hỏi thường gặp

<FAQ>

<Question title="Lingui có hoạt động với TanStack Start không?">

Có. Lingui không có gói tích hợp riêng cho TanStack Start, nhưng Vite plugin và Babel macro plugin của nó hoạt động hoàn toàn bình thường. Hai điểm mấu chốt cần thực hiện đúng là chạy các macro qua `@rolldown/plugin-babel` (Vite 8 và `@vitejs/plugin-react` v6 không còn tích hợp sẵn Babel), và tạo một instance `I18n` riêng cho mỗi ngôn ngữ thay vì kích hoạt một instance toàn cục trong quá trình SSR.

</Question>
<Question title="Tại sao không nên dùng đối tượng i18n toàn cục từ @lingui/core?">

Trên server, một tiến trình duy nhất sẽ render nhiều request cùng một thời điểm. Việc gọi `i18n.activate("fr")` trên một đối tượng chia sẻ chung sẽ làm thay đổi ngôn ngữ của một request đang render tiếng Anh song song. `setupI18n` tạo ra một instance độc lập cho từng ngôn ngữ, đảm bảo an toàn tuyệt đối.

</Question>
<Question title="Tôi có cần chạy lệnh lingui compile không?">

Không. `@lingui/vite-plugin` sẽ tự động biên dịch các catalog `.po` khi chúng được import. Bạn chỉ cần chạy `lingui extract` để thu thập các thông điệp mới.

</Question>
<Question title="Làm cách nào để dịch tiêu đề trang và meta description với Lingui?">

Khai báo chúng với macro `msg`, và dịch chúng trong route loader bằng ``i18n._(msg`...`)``. Loader sẽ trả về các chuỗi thuần túy, do đó `head()` luôn đồng bộ và các giá trị được tuần tự hóa cho quá trình hydration. Bước 8 và bước 12 sẽ hướng dẫn chi tiết cách thiết lập này.

</Question>
<Question title="Lingui chiếm dung lượng bao nhiêu trong bundle TanStack Start?">

Bài [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md) đo được khoảng ~56.7 KB gzip cho runtime. Khi tải mỗi ngôn ngữ một catalog theo nhu cầu, các trang nặng khoảng ~115 KB so với 111 KB khi không có i18n. Nếu import tĩnh tất cả các catalog, dung lượng sẽ tăng lên ~152 KB.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md)

</Question>
<Question title="Tôi có thể giữ lại các macro của Lingui và chuyển đổi sang Intlayer không?">

Có. Adapter [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md) giữ nguyên các macro và thay thế phần runtime. Sau đó, bạn có thể chuyển đổi dần từng component sang `useIntlayer`. Xem các [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md)
- [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md)

</Question>

</FAQ>

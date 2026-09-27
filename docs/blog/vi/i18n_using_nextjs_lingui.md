---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Next.js 16 i18n với Lingui: Hướng dẫn thiết lập App Router"
description: "Thiết lập Lingui trong Next.js 16 App Router: Server Components, SWC macros, định tuyến proxy, generateMetadata, hreflang, sitemap và robots.txt, kèm dữ liệu benchmark."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Quốc tế hóa
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Phiên bản ban đầu"
author: aymericzip
---

# Cách quốc tế hóa ứng dụng Next.js của bạn bằng Lingui vào năm 2026

## Mục lục

<TOC/>

## Lingui là gì?

**Lingui** là một thư viện i18n được xây dựng xung quanh **macro** và **trích xuất tin nhắn (message extraction)**. Bạn viết văn bản nguồn trực tiếp trong các component (`` t`Hello` ``, `<Trans>Hello</Trans>`), lệnh `lingui extract` sẽ thu thập mọi thông điệp vào các catalog (mặc định là các tệp PO), và một trình tải (loader) sẽ biên dịch chúng thành mã JavaScript nhỏ gọn. Các thông điệp sử dụng cú pháp ICU MessageFormat, và Lingui hỗ trợ đầy đủ **React Server Components** trong App Router.

Hướng dẫn này sẽ thiết lập Lingui trong một dự án **Next.js 16 App Router**, bao gồm:

- **Macro được biên dịch bởi SWC**, giúp Turbopack duy trì tốc độ tối đa.
- **Server và Client Components** dùng chung API `Trans` và `useLingui`.
- **Định tuyến ngôn ngữ** thông qua `proxy.ts`: `/about` cho ngôn ngữ mặc định, `/fr/about` cho các ngôn ngữ khác, cùng khả năng tự động phát hiện ngôn ngữ trong lần truy cập đầu tiên.
- **Render tĩnh (Static rendering)** cho mọi ngôn ngữ với `generateStaticParams`.
- **SEO đa ngôn ngữ hoàn chỉnh**: `generateMetadata` đã dịch, URL chuẩn canonical, `hreflang` với `x-default`, Open Graph locales, JSON-LD, `sitemap.ts`, `robots.ts` và trang 404 được bản địa hóa.

> Bạn đang tìm kiếm một thư viện khác?

- [hướng dẫn next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-intl.md)
- [hướng dẫn next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-i18next.md)
- [hướng dẫn Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)

> Đang sử dụng TanStack Start?

- [hướng dẫn TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_lingui.md)

> Cần so sánh các thư viện?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md)

> Để hiểu các thư viện này đến từ đâu, hãy đọc lịch sử i18n trong JavaScript.

- [Lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)

## Dữ liệu benchmark nói gì về Lingui trên Next.js

Báo cáo [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md) chạy cùng một ứng dụng Next.js gồm 10 trang, 10 ngôn ngữ với mọi thư viện phổ biến và đo lường dung lượng thực tế mà trình duyệt tải xuống.

- [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Các số liệu chính cho `@lingui/core@6.6.0` trên Next.js 16, được đo vào ngày 2026-09-26 (gzip):

| Cấu hình                           | Kích thước thư viện | JS mỗi trang | Rò rỉ ngôn ngữ khác | Rò rỉ trang khác |
| :--------------------------------- | ------------------: | -----------: | ------------------: | ---------------: |
| Không có i18n (ứng dụng gốc)       |                   - |     141.0 KB |                  0% |               0% |
| Lingui, một catalog cho mỗi locale |             72.1 KB |     145.4 KB |                2.8% |            89.9% |
| `@intlayer/lingui` (tương thích)   |             10.7 KB |     221.6 KB |                 50% |              90% |
| `next-intlayer` (Intlayer gốc)     |              4.9 KB |     141.5 KB |                  0% |               0% |

Những điểm quan trọng cần lưu ý:

- **Một catalog đơn lẻ cho mỗi ngôn ngữ vẫn làm rò rỉ thông điệp của các trang khác** vào client provider. Hãy giữ càng nhiều văn bản càng tốt trong Server Components, vì chúng chỉ gửi HTML đã render chứ không gửi catalog.
- **Runtime của Lingui nặng ~72 KB gzip.** Adapter tương thích `@intlayer/lingui` cắt giảm runtime xuống ~11 KB, nhưng trong benchmark này cấu hình tương thích Next.js vẫn tải toàn bộ catalog vào trang. API gốc `next-intlayer` là giải pháp duy nhất giữ nguyên kích thước của ứng dụng cơ sở ban đầu.

> Xem dữ liệu đầy đủ: [Báo cáo benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md), và [kho lưu trữ benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Báo cáo benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md)

## So sánh tính năng trên Next.js

Bảng so sánh Lingui với `next-intl` và Intlayer về các tính năng mà một dự án Next.js App Router thường cần:

| Tính năng                                | `next-intlayer` (Intlayer)                          | Lingui                                                             | `next-intl`                                    |
| ---------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| **Bản dịch đặt gần components**          | ✅ Nội dung đặt cùng vị trí với từng component      | ⚠️ Văn bản nguồn trong component, catalog tập trung                | ❌ JSON tập trung                              |
| **Tích hợp TypeScript**                  | ✅ Kiểu dữ liệu nghiêm ngặt được tạo tự động        | ⚠️ Macros có type, catalog thông điệp thì không                    | ✅ Tốt, thông qua mở rộng `AppConfig`          |
| **Phát hiện bản dịch thiếu**             | ✅ Lỗi TypeScript và cảnh báo khi build             | ⚠️ Dự phòng thời gian chạy về văn bản nguồn                        | ⚠️ Dự phòng thời gian chạy                     |
| **Nội dung phong phú (JSX, Markdown)**   | ✅ Hỗ trợ trực tiếp                                 | ✅ JSX bên trong `<Trans>`, không có Markdown                      | ⚠️ Thẻ qua `t.rich`, không có Markdown         |
| **Dịch thuật bằng AI**                   | ✅ Tự dùng nhà cung cấp và API key, có ngữ cảnh app | ❌ Không                                                           | ❌ Không                                       |
| **Trình chỉnh sửa trực quan / CMS**      | ✅ Trình chỉnh sửa trực quan cục bộ + CMS tùy chọn  | ❌ Thông qua nền tảng bên ngoài                                    | ❌ Thông qua nền tảng bên ngoài                |
| **Định tuyến bản địa hóa**               | ✅ Tích hợp sẵn                                     | ❌ Tự viết `proxy.ts`                                              | ✅ Tích hợp phân đoạn `[locale]`               |
| **Xử lý số nhiều (Pluralization)**       | ✅ Dựa trên liệt kê (Enumeration)                   | ✅ ICU, macro `<Plural>`                                           | ✅ ICU                                         |
| **Định dạng nội dung**                   | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`    | ✅ PO, JSON, CSV                                                   | ✅ `.json`, `.js`, `.ts`                       |
| **ICU MessageFormat**                    | ✅ Thông qua `format: "icu"`                        | ✅ Hỗ trợ gốc                                                      | ✅ Hỗ trợ gốc                                  |
| **Hỗ trợ SEO (hreflang, sitemap)**       | ✅ Tiện ích cho Metadata, sitemap và robots.txt     | ❌ Thủ công                                                        | ✅ Tốt                                         |
| **Server Components**                    | ✅ Truy cập trực tiếp trong mọi Server Component    | ⚠️ Cần `setI18n` trong mọi layout và page                          | ⚠️ Cần `await getTranslations()` mỗi component |
| **Tree-shaking theo component**          | ✅ Tại thời điểm build (Babel / SWC)                | ⚠️ Một catalog mỗi ngôn ngữ, trích xuất theo trang đang thử nghiệm | ⚠️ Thủ công, với `pick()` cho mỗi route        |
| **Kích thước runtime (gzip, benchmark)** | 4.9 KB                                              | 72.1 KB                                                            | 14.7 KB                                        |
| **Bản dịch thiếu trong CI**              | ✅ `npx intlayer test`                              | ✅ `lingui compile --strict`                                       | ⚠️ Không tích hợp sẵn                          |
| **Hệ sinh thái / cộng đồng**             | ⚠️ Nhỏ hơn, đang phát triển nhanh                   | ✅ Trưởng thành                                                    | ✅ Lớn                                         |

> Kích thước runtime được lấy từ [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md). Để thảo luận chi tiết hơn, hãy đọc [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer.md).

- [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer.md)

> Các hướng dẫn Next.js khác:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)

## Các thực hành bạn nên tuân theo

- **Thiết lập `lang` và `dir` trên `<html>`** trong layout `[locale]`.
- **Ưu tiên Server Components** cho văn bản: chúng render HTML trên máy chủ và không cần gửi catalog về client.
- **Gọi `initLingui(locale)` trong mọi layout và page.** Layout không render lại khi điều hướng, vì vậy một page không thể phụ thuộc vào việc layout đã thiết lập ngôn ngữ hay chưa.
- **Duy trì một URL duy nhất cho mỗi ngôn ngữ** và pre-render mọi ngôn ngữ với `generateStaticParams`.
- **Dịch metadata của bạn** trong `generateMetadata`, bao gồm `canonical`, `hreflang` và `x-default`.
- **Tạo sitemap và robots.txt đa ngôn ngữ** với quy ước `sitemap.ts` và `robots.ts`.
- **Sử dụng các liên kết thực cho bộ chuyển đổi ngôn ngữ**, để các bot tìm kiếm có thể khám phá mọi ngôn ngữ.
- **Chạy `lingui extract` trong CI** để đảm bảo không có thông điệp mới nào được triển khai mà chưa được dịch.

- [quốc tế hóa và SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md)
- [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md)
- [so sánh SEO đa ngôn ngữ trên Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/nextjs-multilingual-seo-comparison.md)

## Hướng dẫn từng bước thiết lập Lingui trong ứng dụng Next.js

Dưới đây là cấu trúc dự án mà chúng ta sẽ tạo:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Định tuyến và phát hiện ngôn ngữ
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Được tạo bởi `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Danh sách ngôn ngữ, helpers URL
    │   ├── appRouterI18n.ts        # Catalogs và instances chỉ dành cho server
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Trình tạo generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # Trang 404 bản địa hóa cho các đường dẫn không hợp lệ
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Cài đặt các gói phụ thuộc">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider`, `setI18n` cho Server Components, và các macro (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: biên dịch các macro bên trong luồng xử lý SWC của Next.js.
- **@lingui/loader**: biên dịch các catalog `.po` khi import, giúp bạn không cần chạy `lingui compile`.
- **@lingui/cli**: lệnh `lingui extract` để thu thập các thông điệp vào catalog.

> `@lingui/swc-plugin` là một WebAssembly plugin gắn liền với phiên bản SWC của Next.js. Nếu build thất bại sau khi nâng cấp Next.js, hãy cập nhật plugin lên phiên bản tương thích được liệt kê trong README của plugin.

</Step>
<Step number={2} title="Tập trung cấu hình ngôn ngữ của bạn">

Một tệp duy nhất định nghĩa các ngôn ngữ và hàm tiện ích URL. Hệ thống định tuyến, metadata, sitemap và Lingui đều đọc từ tệp này.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Cấu hình Lingui và Next.js">

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

Plugin SWC biên dịch các macro, và loader biên dịch các tệp `.po`, cho cả Turbopack (mặc định trong Next.js 16) và webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

Thêm các script trích xuất vào `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Tải Catalogs và tạo các Instance cho Server">

Server Components không có React context, vì vậy Lingui cung cấp hàm `setI18n` để đăng ký instance cho lần render hiện tại. Module này tải mỗi catalog **một lần duy nhất cho mỗi tiến trình server** và tạo một instance `I18n` cho mỗi ngôn ngữ. Tệp này là `server-only`: catalog của các ngôn ngữ khác sẽ không bao giờ bị đưa vào bundle phía client.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Để TypeScript chấp nhận việc import tệp `.po`, hãy khai báo module một lần:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Tạo Client Provider">

Client Components đọc bản dịch từ một React context. Provider nhận catalog của ngôn ngữ đang hoạt động từ server layout và khởi tạo instance riêng một lần.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Định nghĩa các Route ngôn ngữ động">

Phân đoạn `[locale]` chứa root layout. `generateStaticParams` sẽ pre-render mọi ngôn ngữ tại thời điểm build, và `dynamicParams = false` sẽ trả về trang 404 cho bất kỳ tiền tố nào khác.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Client provider nhận toàn bộ catalog của ngôn ngữ đang hoạt động. Đây chính là yếu tố mà benchmark đo lường là "rò rỉ trang khác". Việc giữ văn bản trong Server Components sẽ giới hạn những gì client thực sự cần. Đối với các ứng dụng lớn, trình trích xuất theo từng trang đang thử nghiệm của Lingui (`experimental.extractor` trong `lingui.config.ts`) sẽ chia nhỏ catalog theo từng điểm vào (entry point).

</Step>
<Step number={7} title="Sử dụng bản dịch trong Server Components">

Server Components sử dụng các macro tương tự như Client Components. `initLingui` cũng phải được chạy trong từng page, vì layout không render lại khi điều hướng giữa các trang bên trong nó.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Sử dụng bản dịch trong Client Components">

Client Components sử dụng các import tương tự. Các macro sẽ đọc instance từ `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Trích xuất và dịch thông điệp của bạn">

Chạy lệnh trích xuất. Lingui sẽ ghi mọi thông điệp tìm thấy trong thư mục `src` vào từng catalog ngôn ngữ:

```bash
npm run i18n:extract
```

Sau đó dịch giá trị `msgstr` cho từng mục:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Các placeholder `<0>` giữ nguyên vị trí của các phần tử JSX trong thẻ `<Trans>`, giúp người dịch có thể di chuyển vị trí của chúng mà không làm ảnh hưởng đến cấu trúc mã.

</Step>
<Step number={10} title="Thiết lập Proxy cho định tuyến ngôn ngữ" isOptional={true}>

Next.js 16 đã đổi tên `middleware.ts` thành `proxy.ts`. Proxy sẽ triển khai chiến lược tiền tố "khi cần thiết" (as-needed):

- `/fr/about` được phục vụ bình thường;
- `/en/about` chuyển hướng đến `/about`, giúp ngôn ngữ mặc định chỉ có một URL duy nhất;
- `/about` được viết lại nội bộ thành `/en/about`, mà không thay đổi URL hiển thị trên thanh địa chỉ;
- Lần truy cập đầu tiên vào `/` sẽ chuyển hướng đến ngôn ngữ ưu tiên (ưu tiên cookie trước, sau đó đến `Accept-Language`).

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Thay đổi ngôn ngữ nội dung của bạn" isOptional={true}>

`usePathname` trả về URL hiển thị trên trình duyệt (`/about` hoặc `/fr/about`). Loại bỏ tiền tố ngôn ngữ, sau đó xây dựng liên kết cho từng ngôn ngữ. Bộ chuyển đổi render các liên kết thực sự để trình thu thập dữ liệu có thể tiếp cận mọi phiên bản ngôn ngữ, và cookie sẽ ghi nhớ lựa chọn rõ ràng của người dùng.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="Xây dựng Component Localized Link" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Component này cũng hoạt động từ Server Components, vì nó được render bên trong `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Quốc tế hóa Metadata của bạn" isOptional={true}>

Mỗi phiên bản ngôn ngữ có thể xếp hạng độc lập, miễn là mỗi trang cung cấp đầy đủ:

- `title` và `description` **đã được dịch**;
- URL **canonical** trỏ về chính nó;
- Các liên kết thay thế **`hreflang` cho mỗi ngôn ngữ**, cộng với **`x-default`**;
- **Open Graph** `locale`, `alternateLocale` và `url`;
- **JSON-LD** kèm `inLanguage`.

Hàm `generateMetadata` chạy bên ngoài React tree, do đó nó sử dụng trực tiếp instance phía server cùng macro `msg`:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... page component from step 7
```

JSON-LD được render bởi chính trang đó. Các tệp trang chỉ được phép export các trường của Next.js, vì vậy hãy giữ component trong tệp riêng của nó:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Quốc tế hóa Sitemap của bạn" isOptional={true}>

Quy ước `sitemap.ts` hỗ trợ `alternates.languages`, được Next.js render dưới dạng các liên kết thay thế `xhtml:link`. Liệt kê mọi URL cho từng ngôn ngữ:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="Quốc tế hóa robots.txt của bạn" isOptional={true}>

Các đường dẫn riêng tư tồn tại trong mọi ngôn ngữ, vì vậy `disallow` phải bao gồm tất cả các đường dẫn đã được bản địa hóa:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Xử lý các trang 404 được bản địa hóa" isOptional={true}>

`not-found.tsx` render bên trong layout `[locale]`, do đó nó có quyền truy cập vào client provider. Catch-all route sẽ chuyển các đường dẫn không xác định trong một ngôn ngữ về trang này. Next.js sẽ tự động thêm `noindex` vào các phản hồi 404.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → localized not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Truy cập Locale trong Server Actions" isOptional={true}>

Server Actions không nhận tham số route. Cách tiếp cận đáng tin cậy nhất là gửi ngôn ngữ kèm theo form, từ chính trang biết ngôn ngữ đó:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Giữ nguyên Macro, cắt giảm Runtime với Intlayer" isOptional={true}>

Adapter tương thích [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md) giữ nguyên mã nguồn của bạn: các macro vẫn biên dịch như trước, và các lời gọi `i18n._()`, `useLingui()` cùng `<Trans>` được phục vụ bởi từ điển Intlayer. Trong benchmark Next.js, runtime giảm từ **~72.1 KB xuống ~10.7 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md)

Trên Next.js, adapter được tích hợp bằng cách alias `@lingui/core` và `@lingui/react` sang `@intlayer/lingui` trong `next.config.ts` (cho cả webpack và Turbopack), đồng thời bọc cấu hình bằng `withIntlayer` từ `next-intlayer/server`. Hãy giữ lại `@lingui/swc-plugin` để các macro vẫn được biên dịch trước. Cấu hình chi tiết có trong [hướng dẫn tương thích Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md).

- [hướng dẫn tương thích Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md)

Như bảng benchmark đã chỉ ra, adapter giúp giảm kích thước runtime nhưng chưa thể giảm phần catalog được gửi tới từng trang trên Next.js. Nó phù hợp nhất khi được sử dụng làm cầu nối di chuyển: sau khi ứng dụng hoạt động ổn định, hãy chuyển dần từng component sang API gốc `useIntlayer`, chỉ gửi đúng nội dung mà component đó cần hiển thị. Xem [hướng dẫn Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer-lingui.md) và tất cả các [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md).

- [hướng dẫn Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer-lingui.md)
- [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md)

</Step>
<Step number={19} title="Tự động hóa bản dịch bằng Intlayer" isOptional={true}>

Lingui hỗ trợ trích xuất thông điệp, nhưng việc dịch thủ công hàng chục catalog là công đoạn tiêu tốn nhiều thời gian nhất. Intlayer là giải pháp **miễn phí** và **mã nguồn mở**, cung cấp các công cụ hoạt động song song cùng Lingui:

- **Dịch bằng AI** với API key và nhà cung cấp của chính bạn. Xem [tự động điền (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md) và [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).
- **Giữ các tệp PO** làm nguồn chân lý duy nhất với [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md).
- **Kiểm tra bản dịch bị thiếu** trong CI. Xem [kiểm thử bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md).
- **Kiểm tra website đã triển khai** để phát hiện thiếu `hreflang`, sai canonical và rò rỉ ngôn ngữ với [lệnh scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/scan.md).

</Step>
</Steps>

## Các câu hỏi thường gặp

<FAQ>

<Question title="Lingui có hỗ trợ Next.js App Router và Server Components không?">

Có. `@lingui/react` hỗ trợ React Server Components. Server Components đăng ký instance thông qua `setI18n` từ `@lingui/react/server`, Client Components đọc instance từ `I18nProvider`, và cả hai đều sử dụng chung các macro `Trans` và `useLingui`.

</Question>
<Question title="Tại sao tôi phải gọi initLingui trong mỗi trang và layout?">

Server Components không có context, do đó instance được đăng ký cho mỗi lần render. Các layout được giữ lại khi điều hướng và không render lại, vì vậy một page không thể phụ thuộc vào việc layout đã thiết lập ngôn ngữ hay chưa. Việc gọi `initLingui(locale)` ở đầu mỗi layout và page giúp chúng hoạt động độc lập và chính xác.

</Question>
<Question title="Tôi nên sử dụng plugin SWC hay Babel với Next.js?">

Hãy sử dụng `@lingui/swc-plugin`. Nó duy trì luồng biên dịch SWC và Turbopack. Việc thêm cấu hình Babel sẽ vô hiệu hóa SWC trong Next.js và làm chậm quá trình build. Ràng buộc duy nhất là giữ cho phiên bản plugin tương thích với phiên bản SWC của bản phát hành Next.js mà bạn đang sử dụng.

</Question>
<Question title="Làm cách nào để dịch generateMetadata với Lingui?">

Lấy server instance bằng `getI18nInstance(locale)` và dịch các mô tả được khai báo bằng macro `msg`: ``i18n._(msg`About us`)``. Trả về `alternates.canonical`, `alternates.languages` với `x-default`, và `openGraph.locale`. Bước 13 cung cấp một helper có thể tái sử dụng.

</Question>
<Question title="Kích thước của Lingui trong bundle Next.js là bao nhiêu?">

Báo cáo [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md) đo được runtime khoảng ~72 KB gzip. Với một catalog cho mỗi ngôn ngữ, kích thước trang khoảng ~145 KB so với 141 KB khi không có i18n, nhưng mỗi trang vẫn nhận các thông điệp của các trang khác thông qua client provider.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md)

</Question>
<Question title="Lingui, next-intl hay next-i18next: tôi nên chọn thư viện nào cho Next.js?">

Lingui phù hợp với các nhóm thích viết văn bản nguồn trực tiếp trong component và làm việc với các tệp PO cùng biên dịch viên. next-intl phù hợp với các nhóm thích catalog dạng JSON và API `t("key")` tích hợp chặt chẽ với Next.js. next-i18next mang lại hệ sinh thái plugin phong phú của i18next. Xem [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md) và [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md).

- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md)
- [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md)

</Question>
<Question title="Tôi có thể chuyển từ Lingui sang Intlayer mà không cần viết lại components không?">

Có. Adapter [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md) giữ nguyên các macro và thay thế runtime, sau đó bạn có thể chuyển dần các component sang `useIntlayer`. Xem các [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md)
- [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md)

</Question>

</FAQ>

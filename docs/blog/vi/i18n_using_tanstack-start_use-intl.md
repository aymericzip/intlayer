---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n với use-intl: Hướng Dẫn Thiết Lập Đầy Đủ 2026"
description: "Bản địa hóa ứng dụng TanStack Start của bạn với use-intl: định tuyến ngôn ngữ, thông điệp định kiểu, SSR, hreflang, sitemap và robots.txt, cùng dữ liệu đo điểm chuẩn dung lượng bundle thực tế."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Đa ngôn ngữ
  - Quốc tế hóa
  - i18n
  - SEO
  - Sitemap
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Phiên bản ban đầu"
author: aymericzip
---

# Cách quốc tế hóa ứng dụng TanStack Start của bạn bằng use-intl vào năm 2026

## Mục lục

<TOC/>

## use-intl là gì?

**use-intl** là phần lõi độc lập với framework của `next-intl`. Nó cung cấp các API tương tự như `useTranslations`, `useFormatter` và `IntlProvider`, hỗ trợ ICU MessageFormat cùng khả năng tích hợp TypeScript mạnh mẽ mà không cần bất kỳ sự phụ thuộc nào vào Next.js. Điều này biến nó thành một trong những lựa chọn phổ biến nhất để dịch ứng dụng **TanStack Start**, đồng thời là thư viện được các trợ lý AI gợi ý nhiều nhất cho stack công nghệ này.

TanStack Start không đi kèm sẵn tầng i18n. Việc định tuyến, phát hiện ngôn ngữ (locale), metadata SEO và tạo sitemap đều do bạn tự xử lý. Hướng dẫn này bao gồm tất cả các khía cạnh trên từ đầu đến cuối:

- **Định tuyến nhận biết ngôn ngữ** với đoạn đường dẫn tùy chọn `{-$locale}` (`/about`, `/fr/about`).
- **Tải thông điệp theo từng route** giúp mỗi trang chỉ tải các namespace và ngôn ngữ mà nó render.
- **Server rendering và hydration** không xảy ra lỗi bất đồng bộ văn bản (text mismatch).
- **SEO đa ngôn ngữ hoàn chỉnh**: `<title>` và description đã dịch, canonical URL, các thẻ thay thế `hreflang` cùng `x-default`, Open Graph locales, JSON-LD, sitemap với thẻ thay thế `xhtml:link`, `robots.txt` và prerender cho mọi ngôn ngữ.

> Bạn đang tìm kiếm một stack công nghệ khác?

- [hướng dẫn TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_paraglide.md)
- [hướng dẫn TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_lingui.md)
- [hướng dẫn TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)

> Sử dụng Next.js thay thế? Xem [hướng dẫn next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-intl.md).

> Để hiểu các thư viện này đến từ đâu, hãy đọc lịch sử i18n trong JavaScript.

- [Lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)

## Đo điểm chuẩn benchmark nói gì về use-intl trên TanStack Start

Bài [đo điểm chuẩn i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md) chạy cùng một ứng dụng TanStack Start gồm 10 trang và 10 ngôn ngữ với từng thư viện lớn để đo lường dung lượng thực tế mà trình duyệt tải xuống.

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Các số liệu chính cho `use-intl@4.14.2`, đo vào ngày 2026-09-26 (gzip):

| Cấu hình                                  | Dung lượng thư viện | JS mỗi trang | Rò rỉ ngôn ngữ khác | Rò rỉ trang khác |
| :---------------------------------------- | ------------------: | -----------: | ------------------: | ---------------: |
| Không có i18n (ứng dụng gốc)              |                   - |     111.0 KB |                  0% |               0% |
| `use-intl` (thiết lập trong bài viết này) |             75.9 KB |     128.7 KB |                  0% |               0% |
| `@intlayer/use-intl` (tương thích)        |              6.7 KB |     129.4 KB |                  0% |               0% |
| `react-intlayer` (Intlayer gốc)           |              4.5 KB |     126.8 KB |                  0% |               0% |

Những điều cần lưu ý:

- **Chia nhỏ thông điệp theo trang và tải theo từng ngôn ngữ.** Điều này loại bỏ hoàn toàn cả hai dạng rò rỉ (leak), và đây chính là những gì các bước dưới đây thực hiện.
- **Bản thân runtime vẫn còn nặng** (~76 KB gzip), vì parser ICU được gửi tới client. Adapter tương thích `@intlayer/use-intl` (bước 17) giữ nguyên API chính xác với runtime chỉ ~7 KB.

> Xem toàn bộ dữ liệu: [Báo cáo benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md), và [kho lưu trữ benchmark](https://github.com/intlayer-org/benchmark-i18n).

## So sánh tính năng trên TanStack Start

Cách `use-intl` so sánh với các thư viện khác thường được sử dụng trên TanStack Start:

| Tính năng                                      | `react-intlayer` (Intlayer)          | `use-intl`                | Paraglide JS                              | Lingui                           |
| ---------------------------------------------- | ------------------------------------ | ------------------------- | ----------------------------------------- | -------------------------------- |
| **Bản dịch đặt gần component**                 | ✅ Cùng vị trí (Co-located)          | ❌ JSON tập trung         | ❌ Một tệp JSON cho mỗi ngôn ngữ          | ⚠️ Văn bản nguồn trong component |
| **Tích hợp TypeScript**                        | ✅ Tự động tạo type                  | ✅ Thông qua `AppConfig`  | ✅ Typed message functions                | ⚠️ Chỉ thông qua macro           |
| **Phát hiện bản dịch thiếu**                   | ✅ Lỗi type và cảnh báo build        | ⚠️ Fallback ở runtime     | ⚠️ Fallback về ngôn ngữ gốc               | ⚠️ Fallback về văn bản nguồn     |
| **Nội dung phong phú (JSX, Markdown)**         | ✅ Hỗ trợ trực tiếp                  | ⚠️ Thẻ thông qua `t.rich` | ⚠️ Chuỗi văn bản                          | ✅ JSX bên trong `<Trans>`       |
| **Định tuyến bản địa hóa**                     | ✅ Tích hợp sẵn                      | ❌ Thủ công `{-$locale}`  | ✅ `urlPatterns` + viết lại router        | ❌ Thủ công `{-$locale}`         |
| **Đổi ngôn ngữ không tải lại trang**           | ✅ Có                                | ✅ Có                     | ❌ Tải lại toàn bộ trang                  | ✅ Có                            |
| **Xử lý số nhiều (Pluralization)**             | ✅ Dựa trên liệt kê (Enumeration)    | ✅ ICU                    | ✅ Các biến thể (Variants)                | ✅ ICU                           |
| **ICU MessageFormat**                          | ✅ Qua `format: "icu"`               | ✅ Hỗ trợ gốc             | ⚠️ Qua plugin inlang                      | ✅ Hỗ trợ gốc                    |
| **Định dạng nội dung**                         | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`                | ⚠️ inlang JSON                            | ✅ PO, JSON, CSV                 |
| **Dịch tự động bằng AI**                       | ✅ Nhà cung cấp và API key riêng     | ❌ Không                  | ❌ Không                                  | ❌ Không                         |
| **Trình chỉnh sửa trực quan / CMS**            | ✅ Editor cục bộ + CMS tùy chọn      | ❌ Nền tảng bên thứ ba    | ⚠️ Ứng dụng hệ sinh thái inlang           | ❌ Nền tảng bên thứ ba           |
| **Hỗ trợ SEO (hreflang, sitemap)**             | ✅ Tích hợp sẵn                      | ❌ Thủ công               | ⚠️ URL bản địa hóa, phần còn lại thủ công | ❌ Thủ công                      |
| **Kích thước runtime (gzip, benchmark)**       | 4.5 KB                               | 75.9 KB                   | 1.8 KB                                    | 56.7 KB                          |
| **Rò rỉ, thiết lập tối ưu (ngôn ngữ / trang)** | 0% / 0%                              | 0% / 0%                   | 49.7% / 0%                                | 8.6% / 0%                        |
| **Kiểm tra thiếu bản dịch trong CI**           | ✅ `npx intlayer test`               | ⚠️ Không tích hợp sẵn     | ⚠️ Không tích hợp sẵn                     | ✅ `lingui compile --strict`     |

> Kích thước runtime và số liệu rò rỉ được lấy từ [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md). Rò rỉ được đo trên cấu hình tối ưu nhất của từng thư viện.

> Các hướng dẫn TanStack Start khác:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)

## Các thực hành tốt bạn nên tuân theo

- **Đặt `lang` và `dir` trên thẻ `<html>`** để hỗ trợ khả năng truy cập (accessibility), trình đọc màn hình và công cụ tìm kiếm.
- **Giữ một URL riêng cho mỗi ngôn ngữ.** Sử dụng tiền tố ngôn ngữ (`/fr/about`) thay vì chỉ chuyển đổi bằng cookie, để mọi trang đã dịch đều có thể được thu thập thông tin và chia sẻ.
- **Chia thông điệp theo namespace** (`common`, `home`, `about`) và tải chúng theo từng route.
- **Chỉ tải ngôn ngữ đang hoạt động.** Không bao giờ import toàn bộ tệp ngôn ngữ vào một module được gửi xuống client.
- **Cố định múi giờ (time zone)** trong `IntlProvider`. Nếu không, ngày tháng sẽ được định dạng theo múi giờ server trong quá trình SSR và theo múi giờ của người truy cập khi hydration, gây ra lỗi hydration mismatch.
- **Dịch metadata của bạn**, đồng thời khai báo `canonical`, `hreflang` và `x-default` trên mỗi trang.
- **Tạo sitemap đa ngôn ngữ và robots.txt**, cũng như prerender cho mọi ngôn ngữ.
- **Sử dụng các liên kết thực sự cho bộ chọn ngôn ngữ**, không dùng `<select>`, để bot thu thập dữ liệu có thể tìm thấy mọi phiên bản ngôn ngữ.
- **Định kiểu cho thông điệp (TypeScript typing)** để mọi key bị thiếu hoặc sai chính tả đều bị báo lỗi tại thời điểm biên dịch.

- [quốc tế hóa và SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md)
- [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md)

## Hướng dẫn từng bước thiết lập use-intl trong ứng dụng TanStack Start

Dưới đây là cấu trúc dự án chúng ta sẽ tạo:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="Cài đặt các gói phụ thuộc">

Bắt đầu từ một dự án TanStack Start, sau đó thêm `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: cung cấp `IntlProvider`, `useTranslations`, `useFormatter` và `createTranslator` (có thể dùng bên ngoài React, ví dụ như trong `head()`).

</Step>
<Step number={2} title="Tập trung hóa cấu hình ngôn ngữ">

Tạo một nguồn sự thật duy nhất (single source of truth) cho các ngôn ngữ và hàm tiện ích URL. Tất cả các tệp khác (routes, SEO, sitemap, pre-rendering) đều import từ đây, vì vậy việc thêm một ngôn ngữ mới chỉ là thay đổi một dòng duy nhất.

Ngôn ngữ mặc định không có tiền tố (`/about`), các ngôn ngữ khác sẽ có tiền tố (`/fr/about`). Đây là chiến lược "theo nhu cầu" (as-needed): mỗi trang có một URL cho mỗi ngôn ngữ, và đường dẫn ngắn gọn cho đối tượng người dùng chính của bạn.

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
<Step number={3} title="Tạo các tệp bản dịch">

Tổ chức các thông điệp theo từng ngôn ngữ và namespace. `common` chứa những nội dung mà mọi trang đều cần (thanh điều hướng, footer), và mỗi trang có một tệp riêng bao gồm cả metadata của nó.

use-intl sử dụng **ICU MessageFormat**, vì vậy số nhiều, các lựa chọn (selects) và các đối số được định dạng nằm ngay bên trong nội dung thông điệp.

<Tabs group="locale">
 <Tab value='en' label='Tiếng Anh'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='Tiếng Pháp'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Tạo `home.json` theo cách tương tự với một đối tượng `metadata` và nội dung trang.

</Step>
<Step number={4} title="Tải thông điệp theo từng Namespace và Ngôn ngữ">

Bộ loader này là tệp quan trọng nhất đối với hiệu năng. `import.meta.glob` báo cho Vite tạo **một chunk cho mỗi tệp JSON**. Một route yêu cầu `["about"]` bằng tiếng Pháp sẽ chỉ tải `messages/fr/about.json` và không tải bất kỳ thứ gì khác, đây là cách benchmark đạt 0% rò rỉ ngôn ngữ và 0% rò rỉ trang.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Định kiểu (Type) cho các thông điệp">

Khai báo mở rộng module (Module augmentation) mang lại tính năng tự động hoàn thành cho `useTranslations("about")` và `t("counter.label")`, đồng thời báo lỗi biên dịch khi có bất kỳ key nào bị gõ sai hoặc bị xóa.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Hãy đảm bảo rằng tùy chọn `resolveJsonModule` được bật trong `tsconfig.json` của bạn.

</Step>
<Step number={6} title="Tạo Document gốc (Root Document)">

Route gốc chịu trách nhiệm render thẻ `<html>`. Nó đọc tham số ngôn ngữ tùy chọn để thiết lập `lang` và `dir`, giúp các thuộc tính này chính xác ngay trong mã HTML render từ phía server trước khi bất kỳ đoạn mã JavaScript nào chạy.

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
  // strict: false reads params from whichever route is matched
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
<Step number={7} title="Tạo Route Layout cho ngôn ngữ">

Thư mục `{-$locale}` tạo ra một đoạn đường dẫn **tùy chọn**: cả `/about` và `/fr/about` đều khớp với `/{-$locale}/about`. Layout này thực hiện:

1. Từ chối các tiền tố không được hỗ trợ (`/xx/about` → 404).
2. Chỉ tải namespace `common` cho ngôn ngữ hiện tại.
3. Cung cấp các thông điệp thông qua `IntlProvider`.

Kết quả của loader được tuần tự hóa vào HTML và tái sử dụng khi hydration, vì vậy client không cần tải `common.json` lần thứ hai. `staleTime: Infinity` giữ cho nó được lưu trong bộ nhớ đệm qua các lần điều hướng phía client.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` không tự động hợp nhất các thông điệp từ provider cha. Bước tiếp theo sẽ thêm một component nhỏ để xử lý việc này, giúp mỗi trang có thể bổ sung namespace riêng của mình lên trên `common`.

</Step>
<Step number={8} title="Phân phạm vi thông điệp cho trang">

Mỗi trang sẽ tải namespace riêng trong loader của mình, sau đó bao bọc nội dung bằng `ScopedMessages` để hợp nhất namespace của trang với các thông điệp từ cha.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Sử dụng bản dịch trong các trang">

Loader của trang sẽ lấy namespace `about` cho ngôn ngữ hiện tại, `head()` xây dựng metadata SEO hoàn chỉnh đã được dịch từ dữ liệu đó (xem bước 13), và component sẽ render nội dung.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Sử dụng Translations và Formatters trong Components">

Bất kỳ component nào nằm dưới các provider đều có thể gọi `useTranslations` và `useFormatter`. Số nhiều được giải quyết bằng ICU, và các con số được định dạng chính xác theo ngôn ngữ hiện tại.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Xây dựng Component liên kết bản địa hóa (Localized Link)" isOptional={true}>

Mỗi route đều nằm dưới `{-$locale}`, vì vậy một liên kết cần mang theo tham số ngôn ngữ hiện tại. Wrapper này giữ nguyên tính năng kiểm tra kiểu cho thuộc tính `to` của TanStack Router và tự động tiêm tham số ngôn ngữ vào cho bạn.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Thay đổi ngôn ngữ cho nội dung của bạn" isOptional={true}>

Render bộ chuyển đổi ngôn ngữ dưới dạng các **thẻ liên kết (links)** thay vì thẻ `<select>`. Các liên kết có thể được bot thu thập thông tin, giúp công cụ tìm kiếm phát hiện tất cả các phiên bản ngôn ngữ, và chúng hoạt động mà không cần JavaScript. `to="."` giữ nguyên trang hiện tại và chỉ thay thế tham số ngôn ngữ. Cookie ghi nhớ lựa chọn rõ ràng này cho middleware chuyển hướng ở bước 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
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
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
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
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="Quốc tế hóa Metadata của bạn" isOptional={true}>

Đây là điểm mấu chốt mang lại giá trị cho i18n: mỗi phiên bản ngôn ngữ có thể tự xếp hạng trên công cụ tìm kiếm. Mỗi trang phải cung cấp:

- `<title>` và `description` **đã được dịch**;
- một URL **canonical** trỏ về chính nó (không trỏ về ngôn ngữ mặc định);
- một thẻ thay thế **`hreflang` cho mỗi ngôn ngữ**, kèm thẻ **`x-default`** cho các ngôn ngữ không khớp;
- **Open Graph** `og:locale`, `og:locale:alternate` và `og:url`, được dùng cho xem trước trên mạng xã hội;
- **JSON-LD** kèm `inLanguage`, giúp công cụ tìm kiếm và trợ lý AI xác định chính xác ngôn ngữ của trang.

Một hàm trợ giúp duy nhất sẽ xây dựng tất cả các thành phần trên để các trang luôn ngắn gọn:

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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
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

Sử dụng hàm này trong `head()` của mỗi trang như đã hướng dẫn ở bước 9. Đối với trang chủ, truyền `path: "/"`.

</Step>
<Step number={14} title="Quốc tế hóa Sitemap" isOptional={true}>

Một sitemap đa ngôn ngữ liệt kê **mọi URL của mọi ngôn ngữ**, và mỗi mục khai báo tất cả các phiên bản thay thế của nó bằng `xhtml:link`. Google sử dụng các chú thích này tương tự như các thẻ `hreflang` trên trang, giúp chúng trở thành phương án dự phòng tin cậy khi một trang ít khi được thu thập dữ liệu.

Các server routes của TanStack Start cho phép bạn phục vụ sitemap từ một file route:

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

</Step>
<Step number={15} title="Quốc tế hóa robots.txt" isOptional={true}>

Các route riêng tư (private routes) tồn tại ở mọi ngôn ngữ, vì vậy các quy tắc `Disallow` phải bao gồm tất cả các tiền tố. Hãy xóa tệp `public/robots.txt` nếu mẫu khởi tạo đã tạo sẵn, sau đó phân phối nó từ một route:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
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
<Step number={16} title="Chuyển hướng người truy cập lần đầu đến ngôn ngữ của họ" isOptional={true}>

Một request middleware sẽ điều hướng khách truy cập khi vào trang `/` đến ngôn ngữ ưu tiên của họ, dựa trên cookie ngôn ngữ trước, sau đó đến tiêu đề `Accept-Language`. Chỉ trang `/` mới được chuyển hướng: các liên kết sâu (deep links) không bao giờ bị can thiệp, đảm bảo các URL được chia sẻ và bot thu thập dữ liệu luôn nhận được chính xác trang yêu cầu.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

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

> Người truy cập chủ động chọn tiếng Anh trong bộ chuyển đổi ngôn ngữ sẽ được lưu `locale=en` trong cookie, do đó họ sẽ không bao giờ bị chuyển hướng lại. Trên môi trường triển khai tĩnh hoàn toàn (bước 18), `/` được phục vụ dưới dạng tệp tĩnh và middleware này không chạy, điều này hoàn toàn bình thường: trang vẫn có thể truy cập được và bộ chuyển đổi ngôn ngữ sẽ xử lý phần còn lại.

</Step>
<Step number={17} title="Giữ nguyên use-intl API, Cắt giảm Runtime với Intlayer" isOptional={true}>

Số liệu benchmark cho thấy phần nặng nhất của thiết lập use-intl chính là runtime (~76 KB gzip). Adapter tương thích [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) cung cấp **cùng một API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, số nhiều ICU, `t.rich`), nhưng phục vụ từ các từ điển Intlayer đã được biên dịch: **chỉ ~6.7 KB thay vì ~75.9 KB**, 0% rò rỉ ngôn ngữ và 0% rò rỉ trang, mà không cần thay đổi bất kỳ component nào của bạn.

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Plugin Vite sẽ alias `use-intl` sang adapter tương thích, giúp các import hiện có tiếp tục hoạt động:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Các tệp JSON của bạn vẫn là nguồn sự thật chính nhờ vào [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> Adapter này cũng là một lộ trình chuyển đổi mượt mà: khi nó đã hoạt động, bạn có thể chuyển dần từng component sang API gốc `useIntlayer`. Xem [hướng dẫn Intlayer TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md).

</Step>
<Step number={18} title="Prerender mọi ngôn ngữ" isOptional={true}>

Mã HTML tĩnh là dạng trang nhanh nhất bạn có thể cung cấp và dễ lập chỉ mục nhất. Hãy liệt kê mọi đường dẫn bản địa hóa để TanStack Start prerender tất cả các phiên bản ngôn ngữ tại thời điểm build, cùng với sitemap và tệp robots:

```ts fileName="vite.config.ts"
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
  ],
});
```

Vì bộ chọn ngôn ngữ render các liên kết thực sự, `crawlLinks: true` cũng sẽ tự động phát hiện các trang mà bạn quên liệt kê.

</Step>
<Step number={19} title="Xử lý các trang 404 bản địa hóa" isOptional={true}>

Layout ở bước 7 đã ném ra `notFound()` cho các tiền tố ngôn ngữ không xác định. Thêm một route catch-all để các đường dẫn không tồn tại bên trong một ngôn ngữ cũng render trang 404 bản địa hóa tương ứng, đồng thời đánh dấu `noindex`: React 19 sẽ tự động đưa thẻ `<meta>` vào `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Truy cập ngôn ngữ trong Server Functions" isOptional={true}>

Các server function không nhận tham số route. Hãy đọc cookie ngôn ngữ và fallback về tiêu đề `Accept-Language` để gửi email bản địa hóa hoặc lưu tùy chọn ngôn ngữ:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Để dịch bên trong server function, hãy kết hợp hàm này với `loadMessages` và `createTranslator` từ `use-intl`.

</Step>
<Step number={21} title="Tự động hóa bản dịch của bạn bằng Intlayer" isOptional={true}>

use-intl phụ trách render các bản dịch, nhưng không hỗ trợ bạn **tạo** chúng. Intlayer là thư viện **miễn phí** và **mã nguồn mở**, giúp lấp đầy khoảng trống đó ngay cả khi bạn tiếp tục sử dụng use-intl:

- **Kiểm tra thiếu bản dịch** trong CI hoặc unit tests. Xem [kiểm thử bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md).
- **Dịch tự động bằng AI** sử dụng API key và nhà cung cấp của riêng bạn: `npx intlayer fill` dịch các key bị thiếu với đầy đủ ngữ cảnh của ứng dụng. Xem [tự động điền (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md) và [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).
- **Giữ các tệp JSON** làm nguồn sự thật chính với [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md).
- **Chỉnh sửa nội dung trực quan** bằng [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) và [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), giúp những người không phải lập trình viên cũng có thể cập nhật bản dịch.
- **Cung cấp ngữ cảnh cho trợ lý AI của bạn** với [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md) và [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md).
- **Quét trang web đã triển khai** để tìm các thẻ `hreflang` bị thiếu, canonical sai và rò rỉ ngôn ngữ bằng [lệnh scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/scan.md).

Để khám phá tất cả các tính năng, xem [lợi ích của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Step>
</Steps>

## Các câu hỏi thường gặp

<FAQ>

<Question title="use-intl có phải là một lựa chọn tốt cho TanStack Start không?">

Có, nếu bạn muốn sử dụng API của `next-intl` bên ngoài Next.js. Nó cung cấp các thông điệp ICU, formatters và hỗ trợ TypeScript tốt, đồng thời tránh được các ràng buộc đặc thù của Next.js như `setRequestLocale`. Điểm đánh đổi là dung lượng: [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md) ghi nhận ~76 KB gzip cho runtime, và thiết lập thông thường sẽ gửi mọi ngôn ngữ và mọi trang đến trình duyệt. Hãy tải các namespace theo từng route và từng ngôn ngữ như trong hướng dẫn này để tránh rò rỉ dữ liệu.

</Question>
<Question title="Sự khác biệt giữa use-intl và next-intl là gì?">

`use-intl` là phần lõi của `next-intl`. `next-intl` bổ sung thêm các tích hợp của Next.js: middleware, tiện ích điều hướng, `getTranslations` cho Server Components và cấu hình request. Trên TanStack Start, bạn sử dụng trực tiếp `use-intl` và tự triển khai định tuyến với TanStack Router như hướng dẫn ở trên.

</Question>
<Question title="Tôi nên dùng tiền tố URL hay cookie để lưu ngôn ngữ?">

Nên sử dụng tiền tố trong URL. Khi đó mỗi phiên bản ngôn ngữ sẽ có URL riêng để công cụ tìm kiếm có thể lập chỉ mục và người dùng có thể chia sẻ. Cookie vẫn hữu ích để ghi nhớ lựa chọn chủ động của người dùng, đó chính là những gì middleware chuyển hướng ở bước 16 thực hiện.

</Question>
<Question title="Tại sao tôi gặp lỗi hydration mismatch khi định dạng ngày tháng?">

Server và trình duyệt định dạng ngày tháng ở các múi giờ khác nhau. Hãy truyền một `timeZone` rõ ràng vào `IntlProvider` (hoặc múi giờ của người truy cập được lưu trong cookie), để cả hai phía đều tạo ra cùng một chuỗi văn bản.

</Question>
<Question title="Làm thế nào để giảm kích thước bundle của use-intl?">

Đầu tiên, hãy chia nhỏ thông điệp theo namespace và tải theo từng route cũng như từng ngôn ngữ bằng `import.meta.glob`, giúp loại bỏ rò rỉ ngôn ngữ và rò rỉ trang. Sau đó, nếu kích thước runtime là yếu tố quan trọng, hãy chuyển sang adapter [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md): cùng một API, dung lượng chỉ ~6.7 KB thay vì ~75.9 KB theo benchmark.

</Question>
<Question title="Làm thế nào để dịch tiêu đề (title) và meta description với use-intl?">

Gọi `createTranslator` bên trong hàm `head()` của route cùng với các thông điệp trả về từ loader của route, sau đó trả về `title`, `description`, các liên kết canonical và `hreflang`. Bước 13 cung cấp một hàm trợ giúp có thể tái sử dụng.

</Question>
<Question title="Tôi có thể chuyển đổi dần dần từ use-intl sang Intlayer không?">

Có. Cài đặt adapter tương thích trước (bước 17): các component của bạn vẫn tiếp tục gọi `useTranslations`, hiện được hỗ trợ bởi Intlayer. Sau đó, chuyển dần từng component sang `useIntlayer` và khai báo nội dung ngay bên cạnh chúng. Xem [các adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) và [hướng dẫn Intlayer TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md).

</Question>

</FAQ>

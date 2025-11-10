---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Cách quốc tế hóa ứng dụng Next.js của bạn bằng next-i18next
description: Thiết lập i18n với next-i18next -  các thực hành tốt nhất và mẹo SEO cho ứng dụng Next.js đa ngôn ngữ, bao gồm quốc tế hóa, tổ chức nội dung và thiết lập kỹ thuật.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Phiên bản đầu tiên
---

# Cách quốc tế hóa ứng dụng Next.js của bạn bằng next-i18next trong năm 2025

## Mục lục

<TOC/>

## next-i18next là gì?

**next-i18next** là một giải pháp quốc tế hóa (i18n) phổ biến cho các ứng dụng Next.js. Trong khi gói `next-i18next` ban đầu được thiết kế cho Pages Router, hướng dẫn này sẽ chỉ cho bạn cách triển khai i18next với **App Router** hiện đại bằng cách sử dụng trực tiếp `i18next` và `react-i18next`.

Với cách tiếp cận này, bạn có thể:

- **Tổ chức các bản dịch** bằng cách sử dụng namespace (ví dụ: `common.json`, `about.json`) để quản lý nội dung tốt hơn.
- **Tải bản dịch hiệu quả** bằng cách chỉ tải các namespace cần thiết cho mỗi trang, giảm kích thước gói.
- **Hỗ trợ cả thành phần server và client** với xử lý SSR và hydration đúng cách.
- **Đảm bảo hỗ trợ TypeScript** với cấu hình locale và khóa dịch có kiểu an toàn.
- **Tối ưu hóa cho SEO** với metadata phù hợp, sitemap và quốc tế hóa robots.txt.

> Ngoài ra, bạn cũng có thể tham khảo [hướng dẫn next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-intl.md), hoặc sử dụng trực tiếp [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md).

> Xem so sánh tại [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md).

## Các thực hành bạn nên tuân theo

Trước khi đi vào triển khai, đây là một số thực hành bạn nên tuân theo:

- **Đặt thuộc tính `lang` và `dir` cho HTML**
  Trong layout của bạn, tính toán `dir` bằng cách sử dụng `getLocaleDirection(locale)` và đặt `<html lang={locale} dir={dir}>` để đảm bảo khả năng truy cập và SEO đúng cách.
- **Phân tách thông điệp theo namespace**
  Tổ chức các file JSON theo locale và namespace (ví dụ: `common.json`, `about.json`) để chỉ tải những gì bạn cần.
- **Giảm thiểu payload cho client**
  Trên các trang, chỉ gửi các namespace cần thiết đến `NextIntlClientProvider` (ví dụ: `pick(messages, ['common', 'about'])`).
- **Ưu tiên các trang tĩnh**
  Sử dụng trang tĩnh càng nhiều càng tốt để cải thiện hiệu suất và SEO.
- **I18n trong các component server**
  Các component server, như các trang hoặc tất cả các component không được đánh dấu là `client` là tĩnh và có thể được pre-render tại thời điểm build. Vì vậy, chúng ta sẽ phải truyền các hàm dịch cho chúng dưới dạng props.
- **Thiết lập kiểu TypeScript**
  Để đảm bảo an toàn kiểu cho các locales của bạn trong toàn bộ ứng dụng.
- **Proxy cho chuyển hướng**
  Sử dụng proxy để xử lý việc phát hiện locale và định tuyến, đồng thời chuyển hướng người dùng đến URL có tiền tố locale phù hợp.
- **Quốc tế hóa metadata, sitemap, robots.txt của bạn**
  Quốc tế hóa metadata, sitemap, robots.txt bằng cách sử dụng hàm `generateMetadata` do Next.js cung cấp để đảm bảo các công cụ tìm kiếm có thể khám phá tốt hơn ở tất cả các locales.
- **Địa phương hóa các liên kết**
  Địa phương hóa các liên kết sử dụng component `Link` để chuyển hướng người dùng đến URL có tiền tố locale phù hợp. Điều này rất quan trọng để đảm bảo các trang của bạn được khám phá ở tất cả các locales.
- **Tự động hóa kiểm thử và dịch thuật**
  Tự động hóa kiểm thử và dịch thuật giúp tiết kiệm thời gian duy trì ứng dụng đa ngôn ngữ của bạn.

> Xem tài liệu của chúng tôi liệt kê mọi thứ bạn cần biết về quốc tế hóa và SEO: [Quốc tế hóa (i18n) với next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md).

---

## Hướng Dẫn Từng Bước Để Thiết Lập i18next Trong Ứng Dụng Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách Quốc tế hóa ứng dụng của bạn sử dụng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/next-i18next-template) trên GitHub.

Cấu trúc dự án mà chúng ta sẽ tạo:

```bash
.
├── i18n.config.ts
└── src # Thư mục Src là tùy chọn
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Nhóm Route để không làm lộn xộn tất cả các trang với các thông điệp trang chủ)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Bước 1: Cài Đặt Các Phụ Thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: Framework quốc tế hóa cốt lõi xử lý việc tải và quản lý bản dịch.
- **react-i18next**: Liên kết React cho i18next cung cấp các hook như `useTranslation` cho các component phía client.
- **i18next-resources-to-backend**: Plugin cho phép tải động các file bản dịch, giúp bạn chỉ tải những namespace cần thiết.

### Bước 2: Cấu Hình Dự Án Của Bạn

Tạo một file cấu hình để định nghĩa các locale được hỗ trợ, locale mặc định, và các hàm trợ giúp cho việc địa phương hóa URL. File này đóng vai trò là nguồn dữ liệu duy nhất cho thiết lập i18n của bạn và đảm bảo an toàn kiểu trong toàn bộ ứng dụng.

Việc tập trung cấu hình locale giúp tránh sự không nhất quán và dễ dàng thêm hoặc loại bỏ các locale trong tương lai. Các hàm trợ giúp đảm bảo việc tạo URL nhất quán cho SEO và định tuyến.

```ts fileName="i18n.config.ts"
// Định nghĩa các locale được hỗ trợ dưới dạng mảng const để đảm bảo an toàn kiểu
// Câu lệnh 'as const' giúp TypeScript suy luận các kiểu literal thay vì string[]
export const locales = ["en", "fr"] as const;

// Trích xuất kiểu Locale từ mảng locales
// Điều này tạo ra kiểu hợp nhất: "en" | "fr"
export type Locale = (typeof locales)[number];

// Đặt locale mặc định được sử dụng khi không có locale nào được chỉ định
export const defaultLocale: Locale = "en";

// Các ngôn ngữ viết từ phải sang trái cần xử lý hướng văn bản đặc biệt
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Kiểm tra xem một locale có yêu cầu hướng văn bản RTL (từ phải sang trái) hay không
// Dùng cho các ngôn ngữ như Ả Rập, Do Thái, Ba Tư và Urdu
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Tạo đường dẫn đã được địa phương hóa cho một locale và đường dẫn nhất định
// Đường dẫn của locale mặc định không có tiền tố (ví dụ: "/about" thay vì "/en/about")
// Các locale khác có tiền tố (ví dụ: "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// URL cơ sở cho các URL tuyệt đối (dùng trong sitemap, metadata, v.v.)
const ORIGIN = "https://example.com";

// Tạo URL tuyệt đối với tiền tố locale
// Dùng cho metadata SEO, sitemap và URL chuẩn
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Dùng để thiết lập cookie locale trong trình duyệt
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 năm
    "SameSite=Lax",
  ].join("; ");
}
```

### Bước 3: Tập trung các namespace dịch thuật

Tạo một nguồn dữ liệu duy nhất cho mọi namespace mà ứng dụng của bạn cung cấp. Tái sử dụng danh sách này giúp đồng bộ mã phía server, client và công cụ, đồng thời mở khóa kiểu dữ liệu mạnh cho các hàm hỗ trợ dịch thuật.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Bước 4: Định kiểu mạnh cho các khóa dịch với TypeScript

Mở rộng `i18next` để trỏ tới các file ngôn ngữ chuẩn của bạn (thường là tiếng Anh). TypeScript sẽ suy luận các khóa hợp lệ theo từng namespace, do đó các lời gọi tới `t()` được kiểm tra toàn diện.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Mẹo: Lưu khai báo này trong thư mục `src/types` (tạo thư mục nếu chưa có). Next.js đã bao gồm `src` trong `tsconfig.json`, vì vậy phần mở rộng này sẽ được tự động nhận diện. Nếu không, hãy thêm đoạn sau vào file `tsconfig.json` của bạn:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Với thiết lập này, bạn có thể dựa vào tính năng tự động hoàn thành và kiểm tra lỗi khi biên dịch:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// Đúng, đã định kiểu: t("counter.increment")
// Lỗi, lỗi biên dịch: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Bước 5: Thiết lập khởi tạo i18n phía server

Tạo một hàm khởi tạo phía máy chủ để tải các bản dịch cho các thành phần server. Hàm này tạo một instance i18next riêng biệt cho việc render phía server, đảm bảo rằng các bản dịch được tải trước khi render.

Các thành phần server cần có instance i18next riêng vì chúng chạy trong ngữ cảnh khác với các thành phần client. Việc tải trước các bản dịch trên server ngăn chặn hiện tượng nhấp nháy nội dung chưa được dịch và cải thiện SEO bằng cách đảm bảo các công cụ tìm kiếm nhìn thấy nội dung đã được dịch.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Cấu hình tải tài nguyên động cho i18next
// Hàm này nhập động các file JSON bản dịch dựa trên locale và namespace
// Ví dụ: locale="fr", namespace="about" -> nhập "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Khởi tạo instance i18next cho việc render phía server
 *
 * @returns Instance i18next đã được khởi tạo sẵn sàng sử dụng phía server
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Tạo một instance i18next mới (tách biệt với instance phía client)
  const i18n = createInstance();

  // Khởi tạo với tích hợp React và bộ tải backend
  await i18n
    .use(initReactI18next) // Kích hoạt hỗ trợ React hooks
    .use(backend) // Kích hoạt tải tài nguyên động
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Chỉ tải các namespace được chỉ định để tăng hiệu suất
      defaultNS: "common", // Namespace mặc định khi không có namespace nào được chỉ định
      interpolation: { escapeValue: false }, // Không escape HTML (React xử lý bảo vệ XSS)
      react: { useSuspense: false }, // Tắt Suspense để tương thích SSR
      returnNull: false, // Trả về chuỗi rỗng thay vì null cho các key bị thiếu
      initImmediate: false, // Hoãn khởi tạo cho đến khi tài nguyên được tải xong (tăng tốc SSR)
    });
  return i18n;
}
```

### Bước 6: Tạo Provider i18n phía Client

Tạo một component provider phía client bao bọc ứng dụng của bạn với context i18next. Provider này nhận các bản dịch đã được tải sẵn từ server để ngăn chặn hiện tượng flash nội dung chưa dịch (FOUC) và tránh việc tải lặp lại.

Các component phía client cần một instance i18next riêng chạy trong trình duyệt. Bằng cách nhận tài nguyên đã tải sẵn từ server, chúng ta đảm bảo quá trình hydration mượt mà và ngăn chặn hiện tượng nhấp nháy nội dung. Provider cũng quản lý việc thay đổi locale và tải namespace một cách động.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Cấu hình tải tài nguyên động cho phía client
// Cùng mẫu với phía server, nhưng instance này chạy trong trình duyệt
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Tài nguyên đã được tải sẵn từ server (ngăn chặn FOUC - Flash of Untranslated Content)
  // Định dạng: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Provider i18n phía client bao bọc ứng dụng với context i18next
 * Nhận tài nguyên đã tải sẵn từ server để tránh tải lại bản dịch
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Tạo instance i18n một lần sử dụng useState với lazy initializer
  // Điều này đảm bảo instance chỉ được tạo một lần, không phải mỗi lần render
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Nếu có tài nguyên được cung cấp (từ server), sử dụng chúng để tránh tải lại bản dịch phía client
        // Điều này ngăn chặn FOUC và cải thiện hiệu suất tải ban đầu
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Ngăn không trả về giá trị undefined
      });

    return i18nInstance;
  });

  // Cập nhật ngôn ngữ khi prop locale thay đổi
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Đảm bảo tất cả namespace cần thiết được tải phía client
  // Sử dụng join("|") làm dependency để so sánh mảng chính xác
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Cung cấp instance i18n cho tất cả các component con thông qua React context
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Bước 7: Định nghĩa các tuyến đường động theo locale

Thiết lập routing động cho các locale bằng cách tạo thư mục `[locale]` trong thư mục app của bạn. Điều này cho phép Next.js xử lý routing dựa trên locale, trong đó mỗi locale trở thành một phân đoạn URL (ví dụ: `/en/about`, `/fr/about`).

Việc sử dụng các tuyến đường động cho phép Next.js tạo các trang tĩnh cho tất cả các locale trong quá trình build, cải thiện hiệu suất và SEO. Component layout sẽ thiết lập các thuộc tính HTML `lang` và `dir` dựa trên locale, điều này rất quan trọng cho khả năng truy cập và hiểu biết của công cụ tìm kiếm.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Vô hiệu hóa dynamic params - tất cả các locale phải được biết tại thời điểm build
// Điều này đảm bảo việc tạo trang tĩnh cho tất cả các tuyến đường theo locale
export const dynamicParams = false;

/**
 * Tạo các tham số tĩnh cho tất cả các locale tại thời điểm build
 * Next.js sẽ tiền kết xuất các trang cho mỗi locale được trả về ở đây
 * Ví dụ: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Component layout gốc xử lý các thuộc tính HTML theo locale
 * Thiết lập thuộc tính lang và hướng văn bản (ltr/rtl) dựa trên locale
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Xác thực locale từ tham số URL
  // Nếu locale không hợp lệ được cung cấp, sử dụng locale mặc định
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Xác định hướng văn bản dựa trên locale
  // Các ngôn ngữ RTL như tiếng Ả Rập cần dir="rtl" để hiển thị văn bản đúng
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Bước 8: Tạo các tệp dịch của bạn

Tạo các tệp JSON cho mỗi locale và namespace. Cấu trúc này cho phép bạn tổ chức các bản dịch một cách hợp lý và chỉ tải những gì bạn cần cho mỗi trang.

Tổ chức các bản dịch theo namespace (ví dụ: `common.json`, `about.json`) cho phép tách mã và giảm kích thước gói. Bạn chỉ tải các bản dịch cần thiết cho mỗi trang, cải thiện hiệu suất.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/vi/home.json"
{
  "title": "Trang chủ",
  "description": "Mô tả trang chủ",
  "welcome": "Chào mừng",
  "greeting": "Xin chào thế giới!",
  "aboutPage": "Trang Giới thiệu",
  "documentation": "Tài liệu"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/vi/about.json"
{
  "title": "Giới thiệu",
  "description": "Mô tả trang Giới thiệu",
  "counter": {
    "label": "Bộ đếm",
    "increment": "Tăng",
    "description": "Nhấn nút để tăng bộ đếm"
  }
}
```

### Bước 9: Sử dụng Bản dịch trong Trang của Bạn

Tạo một component trang khởi tạo i18next trên server và truyền các bản dịch cho cả component server và client. Điều này đảm bảo các bản dịch được tải trước khi render và ngăn chặn hiện tượng nhấp nháy nội dung.

Việc khởi tạo phía server tải các bản dịch trước khi trang được render, cải thiện SEO và ngăn chặn FOUC (Flash of Unstyled Content). Bằng cách truyền tài nguyên đã tải sẵn cho provider phía client, chúng ta tránh việc tải trùng lặp và đảm bảo quá trình hydration mượt mà.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Component trang phía server xử lý khởi tạo i18n
 * Tải trước các bản dịch trên server và truyền chúng cho các component phía client
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Định nghĩa các namespace bản dịch mà trang này cần
  // Tái sử dụng danh sách tập trung để đảm bảo an toàn kiểu và tự động hoàn thành
  const pageNamespaces = allNamespaces;

  // Khởi tạo i18next trên server với các namespace cần thiết
  // Việc này tải các file JSON bản dịch phía server
  const i18n = await initI18next(locale, pageNamespaces);

  // Lấy hàm dịch cố định cho namespace "about"
  // getFixedT khóa namespace, nên dùng t("title") thay vì t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Trích xuất các gói dịch từ instance i18n
  // Dữ liệu này được truyền cho I18nProvider để hydrate i18n phía client
  // Ngăn ngừa FOUC (Flash of Untranslated Content) và tránh tải lặp lại
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Bước 10: Sử dụng Dịch trong Các Component Client

Các component client có thể sử dụng hook `useTranslation` để truy cập bản dịch. Hook này cung cấp hàm dịch và instance i18n, cho phép bạn dịch nội dung và truy cập thông tin locale.

Các component client cần React hooks để truy cập bản dịch. Hook `useTranslation` tích hợp mượt mà với i18next và cung cấp cập nhật phản ứng khi locale thay đổi.

> Đảm bảo trang/provider chỉ bao gồm các namespace bạn cần (ví dụ: `about`).  
> Nếu bạn dùng React < 19, hãy memo hóa các bộ định dạng nặng như `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Ví dụ component client sử dụng React hooks cho việc dịch
 * Có thể sử dụng các hook như useState, useEffect, và useTranslation
 */
const ClientComponent = () => {
  // Hook useTranslation cung cấp hàm dịch và instance i18n
  // Chỉ định namespace để chỉ tải bản dịch cho namespace "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Tạo bộ định dạng số theo locale
  // i18n.language cung cấp locale hiện tại (ví dụ: "en", "fr")
  // Intl.NumberFormat định dạng số theo quy ước locale
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Định dạng số sử dụng định dạng theo locale cụ thể */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### Bước 11: Sử dụng bản dịch trong các Server Components

Các server component không thể sử dụng React hooks, vì vậy chúng nhận các bản dịch thông qua props từ các component cha của chúng. Cách tiếp cận này giữ cho server component đồng bộ và cho phép chúng được lồng bên trong các client component.

Các server component có thể được lồng dưới các ranh giới client cần phải đồng bộ. Bằng cách truyền các chuỗi đã dịch và thông tin locale dưới dạng props, chúng ta tránh các thao tác bất đồng bộ và đảm bảo việc render chính xác.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Hàm dịch được truyền từ server component cha
  // Server component không thể sử dụng hooks, nên bản dịch được truyền qua props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Ví dụ server component - nhận bản dịch qua props
 * Có thể được lồng bên trong các client component (server component bất đồng bộ)
 * Không thể sử dụng React hooks, vì vậy tất cả dữ liệu phải đến từ props hoặc các thao tác bất đồng bộ
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Định dạng số phía server sử dụng locale
  // Điều này chạy trên server trong SSR, cải thiện thời gian tải trang ban đầu
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Sử dụng hàm dịch được truyền qua prop */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (Tùy chọn) Bước 12: Thay đổi ngôn ngữ nội dung của bạn

Để thay đổi ngôn ngữ nội dung trong Next.js, cách được khuyến nghị là sử dụng URL có tiền tố locale và các liên kết Next.js. Ví dụ dưới đây đọc locale hiện tại từ route, loại bỏ nó khỏi pathname, và hiển thị một liên kết cho mỗi locale có sẵn.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Bộ chọn ngôn ngữ">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (Tùy chọn) Bước 13: Xây dựng một component Link có hỗ trợ đa ngôn ngữ

Tái sử dụng các URL đã được địa phương hóa trong toàn bộ ứng dụng giúp điều hướng nhất quán và thân thiện với SEO. Bao bọc `next/link` trong một helper nhỏ để thêm tiền tố locale đang hoạt động vào các route nội bộ trong khi giữ nguyên các URL bên ngoài.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Mẹo: Vì `LocalizedLink` là một thành phần thay thế trực tiếp, hãy di chuyển dần dần bằng cách thay đổi các import và để thành phần xử lý các URL theo locale cụ thể.

### (Tùy chọn) Bước 14: Truy cập locale đang hoạt động bên trong Server Actions

Server Actions thường cần locale hiện tại để gửi email, ghi log hoặc tích hợp với bên thứ ba. Kết hợp cookie locale được proxy của bạn thiết lập với header `Accept-Language` làm phương án dự phòng.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Ví dụ về một server action sử dụng locale hiện tại
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Sử dụng locale cho các tác động phụ theo ngôn ngữ (email, CRM, v.v.)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Vì helper dựa vào cookies và headers của Next.js, nó hoạt động trong Route Handlers, Server Actions và các ngữ cảnh chỉ dành cho server khác.

### (Tùy chọn) Bước 15: Quốc tế hóa Metadata của bạn

Dịch nội dung là quan trọng, nhưng mục tiêu chính của quốc tế hóa là làm cho trang web của bạn trở nên dễ tiếp cận hơn với thế giới. I18n là một đòn bẩy tuyệt vời để cải thiện khả năng hiển thị trang web của bạn thông qua SEO đúng cách.

Metadata được quốc tế hóa đúng cách giúp các công cụ tìm kiếm hiểu được những ngôn ngữ nào có sẵn trên các trang của bạn. Điều này bao gồm việc thiết lập thẻ meta hreflang, dịch tiêu đề và mô tả, và đảm bảo các URL chuẩn (canonical) được thiết lập chính xác cho từng ngôn ngữ.

Dưới đây là danh sách các thực hành tốt liên quan đến SEO đa ngôn ngữ:

- Đặt thẻ meta hreflang trong thẻ `<head>` để giúp các công cụ tìm kiếm hiểu được những ngôn ngữ nào có trên trang
- Liệt kê tất cả các bản dịch trang trong sitemap.xml sử dụng schema XML `http://www.w3.org/1999/xhtml`
- Đừng quên loại trừ các trang có tiền tố khỏi robots.txt (ví dụ: `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Sử dụng component Link tùy chỉnh để chuyển hướng đến trang được địa phương hóa nhất (ví dụ, bằng tiếng Pháp `<a href="/fr/about">À propos</a>`)

Các nhà phát triển thường quên tham chiếu đúng các trang của họ qua các locale. Hãy sửa điều đó:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Tạo metadata SEO cho mỗi phiên bản locale của trang
 * Hàm này chạy cho mỗi locale tại thời điểm build
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Nhập động file dịch cho locale này
  // Dùng để lấy tiêu đề và mô tả đã dịch cho metadata
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Tạo bản đồ hreflang cho tất cả các locale
  // Giúp các công cụ tìm kiếm hiểu các lựa chọn ngôn ngữ thay thế
  // Định dạng: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // URL chuẩn cho phiên bản locale này
      canonical: absoluteUrl(locale, "/about"),
      // Các lựa chọn ngôn ngữ thay thế cho SEO (thẻ hreflang)
      // "x-default" chỉ định phiên bản locale mặc định
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>Giới thiệu</h1>;
}
```

### (Tùy chọn) Bước 16: Quốc tế hóa Sitemap của bạn

Tạo một sitemap bao gồm tất cả các phiên bản locale của các trang của bạn. Điều này giúp các công cụ tìm kiếm khám phá và lập chỉ mục tất cả các phiên bản ngôn ngữ của nội dung của bạn.

Một sitemap được quốc tế hóa đúng cách đảm bảo các công cụ tìm kiếm có thể tìm thấy và lập chỉ mục tất cả các phiên bản ngôn ngữ của các trang của bạn. Điều này cải thiện khả năng hiển thị trong kết quả tìm kiếm quốc tế.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  // Định dạng đường dẫn có locale, nếu là locale mặc định thì không thêm locale vào URL
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Lấy bản đồ tất cả các locale và đường dẫn đã được địa phương hóa
 *
 * Ví dụ đầu ra:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    // Tạo mảng các cặp [locale, đường dẫn đã định dạng]
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Tạo sitemap với tất cả các biến thể ngôn ngữ để cải thiện SEO
// Trường alternates thông báo cho các công cụ tìm kiếm về các phiên bản ngôn ngữ
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Tùy chọn) Bước 17: Quốc tế hóa tệp robots.txt của bạn

Tạo một tệp robots.txt xử lý đúng tất cả các phiên bản ngôn ngữ của các tuyến đường được bảo vệ của bạn. Điều này đảm bảo rằng các công cụ tìm kiếm không lập chỉ mục các trang quản trị hoặc bảng điều khiển bằng bất kỳ ngôn ngữ nào.

Cấu hình đúng robots.txt cho tất cả các ngôn ngữ ngăn các công cụ tìm kiếm lập chỉ mục các trang nhạy cảm bằng bất kỳ ngôn ngữ nào. Điều này rất quan trọng cho bảo mật và quyền riêng tư.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Tạo đường dẫn cho tất cả các ngôn ngữ (ví dụ: /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (Tùy chọn) Bước 18: Thiết lập Middleware cho Định tuyến Ngôn ngữ

Tạo một proxy để tự động phát hiện ngôn ngữ ưu tiên của người dùng và chuyển hướng họ đến URL có tiền tố ngôn ngữ phù hợp. Điều này cải thiện trải nghiệm người dùng bằng cách hiển thị nội dung theo ngôn ngữ họ ưu thích.

Middleware đảm bảo người dùng được tự động chuyển hướng đến ngôn ngữ ưu tiên khi họ truy cập trang web của bạn. Nó cũng lưu trữ lựa chọn ngôn ngữ của người dùng trong cookie cho các lần truy cập sau.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Biểu thức chính quy để khớp các tệp có phần mở rộng (ví dụ: .js, .css, .png)
// Dùng để loại trừ các tài sản tĩnh khỏi việc định tuyến theo locale
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Trích xuất locale từ header Accept-Language
 * Xử lý các định dạng như "fr-CA", "en-US", v.v.
 * Sử dụng locale mặc định nếu ngôn ngữ trình duyệt không được hỗ trợ
 */
const pickLocale = (accept: string | null) => {
  // Lấy ưu tiên ngôn ngữ đầu tiên (ví dụ: "fr-CA" từ "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Trích xuất mã ngôn ngữ cơ bản (ví dụ: "fr" từ "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Kiểm tra xem chúng ta có hỗ trợ locale này không, nếu không thì dùng mặc định
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Proxy Next.js để phát hiện và định tuyến locale
 * Chạy trên mỗi yêu cầu trước khi trang được render
 * Tự động chuyển hướng đến URL có tiền tố locale khi cần thiết
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua proxy cho các phần nội bộ Next.js, API routes và các file tĩnh
  // Những phần này không nên có tiền tố locale
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Kiểm tra xem URL đã có tiền tố locale chưa
  // Ví dụ: "/fr/about" hoặc "/en" sẽ trả về true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Nếu không có tiền tố locale, phát hiện locale và chuyển hướng
  if (!hasLocale) {
    // Cố gắng lấy locale từ cookie trước (ưu tiên người dùng)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Sử dụng locale từ cookie nếu hợp lệ, nếu không thì phát hiện từ header trình duyệt
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Sao chép URL để sửa đổi pathname
    const url = request.nextUrl.clone();
    // Thêm tiền tố locale vào pathname
    // Xử lý đặc biệt đường dẫn gốc để tránh dấu gạch chéo kép
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Tạo phản hồi chuyển hướng và đặt cookie ngôn ngữ
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Khớp với tất cả các đường dẫn ngoại trừ:
    // - Các route API (/api/*)
    // - Các phần nội bộ của Next.js (/_next/*)
    // - Các file tĩnh (/static/*)
    // - Các file có phần mở rộng (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Tùy chọn) Bước 19: Tự động hóa bản dịch của bạn bằng Intlayer

Intlayer là một thư viện **miễn phí** và **mã nguồn mở** được thiết kế để hỗ trợ quá trình bản địa hóa trong ứng dụng của bạn. Trong khi i18next xử lý việc tải và quản lý bản dịch, Intlayer giúp tự động hóa quy trình làm việc bản dịch.

Việc quản lý bản dịch thủ công có thể tốn nhiều thời gian và dễ xảy ra lỗi. Intlayer tự động hóa việc kiểm thử, tạo và quản lý bản dịch, giúp bạn tiết kiệm thời gian và đảm bảo tính nhất quán trên toàn bộ ứng dụng của bạn.

Intlayer sẽ cho phép bạn:

- **Khai báo nội dung của bạn ở bất cứ đâu bạn muốn trong codebase**
  Intlayer cho phép khai báo nội dung của bạn ở bất cứ đâu bạn muốn trong codebase bằng cách sử dụng các file `.content.{ts|js|json}`. Điều này sẽ giúp tổ chức nội dung tốt hơn, đảm bảo khả năng đọc và bảo trì codebase hiệu quả hơn.

- **Kiểm thử các bản dịch còn thiếu**
  Intlayer cung cấp các hàm kiểm thử có thể tích hợp vào pipeline CI/CD của bạn hoặc trong các unit test. Tìm hiểu thêm về [kiểm thử bản dịch của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md).

- **Tự động hóa việc dịch của bạn**,
  Intlayer cung cấp một CLI và một tiện ích mở rộng VSCode để tự động hóa việc dịch của bạn. Nó có thể được tích hợp vào pipeline CI/CD của bạn. Tìm hiểu thêm về [tự động hóa việc dịch của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).
  Bạn có thể sử dụng **khóa API riêng của bạn và nhà cung cấp AI mà bạn chọn**. Nó cũng cung cấp các bản dịch nhận biết ngữ cảnh, xem thêm [tự động điền nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md).

- **Kết nối nội dung bên ngoài**
- **Tự động hóa việc dịch của bạn**,  
  Intlayer cung cấp một CLI và một tiện ích mở rộng VSCode để tự động hóa việc dịch của bạn. Nó có thể được tích hợp vào pipeline CI/CD của bạn. Tìm hiểu thêm về [tự động hóa việc dịch của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).  
  Bạn có thể sử dụng **khóa API riêng của bạn và nhà cung cấp AI bạn chọn**. Nó cũng cung cấp các bản dịch nhận biết ngữ cảnh, xem thêm [tự động điền nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md).

- **Kết nối nội dung bên ngoài**  
  Intlayer cho phép bạn kết nối nội dung của mình với hệ thống quản lý nội dung bên ngoài (CMS). Để lấy nội dung một cách tối ưu và chèn vào tài nguyên JSON của bạn. Tìm hiểu thêm về [lấy nội dung bên ngoài](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/function_fetching.md).

- **Trình chỉnh sửa trực quan**  
  Intlayer cung cấp một trình chỉnh sửa trực quan miễn phí để chỉnh sửa nội dung của bạn bằng trình chỉnh sửa trực quan. Tìm hiểu thêm về [chỉnh sửa trực quan bản dịch của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Và còn nhiều hơn nữa. Để khám phá tất cả các tính năng mà Intlayer cung cấp, vui lòng tham khảo [Lợi ích của tài liệu Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

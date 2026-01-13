---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Cách quốc tế hóa ứng dụng Next.js của bạn bằng next-intl
description: Thiết lập i18n với next-intl - các thực hành tốt nhất và mẹo SEO cho ứng dụng Next.js đa ngôn ngữ, bao gồm quốc tế hóa, tổ chức nội dung và thiết lập kỹ thuật.
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Phiên bản đầu tiên
---

# Cách quốc tế hóa ứng dụng Next.js của bạn bằng next-intl vào năm 2026

## Mục lục

<TOC/>

## next-intl là gì?

**next-intl** là một thư viện quốc tế hóa (i18n) phổ biến được thiết kế đặc biệt cho Next.js App Router. Nó cung cấp một cách liền mạch để xây dựng các ứng dụng Next.js đa ngôn ngữ với hỗ trợ TypeScript xuất sắc và các tối ưu hóa tích hợp sẵn.

> Nếu bạn muốn, bạn cũng có thể tham khảo [hướng dẫn next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-i18next.md), hoặc sử dụng trực tiếp [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_next-intl.md).

> Xem so sánh tại [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md).

## Các thực hành bạn nên tuân theo

Trước khi chúng ta đi vào phần triển khai, đây là một số thực hành bạn nên tuân theo:

- **Đặt thuộc tính `lang` và `dir` cho HTML**  
  Trong layout của bạn, tính toán `dir` bằng cách sử dụng `getLocaleDirection(locale)` và đặt `<html lang={locale} dir={dir}>` để đảm bảo khả năng truy cập và SEO đúng cách.
- **Phân tách thông điệp theo namespace**  
  Tổ chức các file JSON theo từng locale và namespace (ví dụ: `common.json`, `about.json`) để chỉ tải những gì bạn cần.
- **Giảm thiểu payload cho client**  
  Trên các trang, chỉ gửi các namespace cần thiết tới `NextIntlClientProvider` (ví dụ: `pick(messages, ['common', 'about'])`).
- **Ưu tiên các trang tĩnh**  
  Sử dụng trang tĩnh càng nhiều càng tốt để cải thiện hiệu suất và SEO.
- **I18n trong các component phía server**  
  Các server components, như các trang hoặc tất cả các components không được đánh dấu là `client` là các thành phần tĩnh và có thể được pre-render tại thời điểm build. Vì vậy, chúng ta sẽ phải truyền các hàm dịch sang chúng dưới dạng props.
- **Thiết lập các kiểu TypeScript**  
  Cho các locales của bạn để đảm bảo an toàn kiểu trong toàn bộ ứng dụng.
- **Proxy cho việc chuyển hướng**  
  Sử dụng proxy để xử lý phát hiện locale và routing, đồng thời chuyển hướng người dùng đến URL có tiền tố locale phù hợp.
- **Quốc tế hóa metadata, sitemap, robots.txt của bạn**  
  Quốc tế hóa metadata, sitemap, robots.txt bằng cách sử dụng hàm `generateMetadata` do Next.js cung cấp để đảm bảo các công cụ tìm kiếm có thể khám phá tốt hơn ở tất cả các locales.
- **Địa phương hóa các liên kết**  
  Localize Links sử dụng component `Link` để chuyển hướng người dùng đến URL có tiền tố locale phù hợp. Điều này rất quan trọng để đảm bảo các trang của bạn được khám phá trong tất cả các locales.
- **Tự động hóa kiểm thử và dịch thuật**  
  Tự động hóa kiểm thử và dịch thuật giúp tiết kiệm thời gian duy trì ứng dụng đa ngôn ngữ của bạn.

> Xem tài liệu của chúng tôi liệt kê tất cả những gì bạn cần biết về quốc tế hóa và SEO: [Internationalization (i18n) with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md).

---

## Hướng Dẫn Từng Bước Để Thiết Lập next-intl Trong Ứng Dụng Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn sử dụng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> Xem [Application Template](https://github.com/aymericzip/next-intl-template) trên GitHub.

Dưới đây là cấu trúc dự án mà chúng ta sẽ tạo:

```bash
.
├── global.ts
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src # Src là tùy chọn
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Nhóm Route để không làm lộn xộn tất cả các trang với tài nguyên home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết sử dụng npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Thư viện quốc tế hóa cốt lõi cho Next.js App Router cung cấp các hook, hàm server và provider client để quản lý bản dịch.

### Bước 2: Cấu hình dự án của bạn

Tạo một tệp cấu hình định nghĩa các ngôn ngữ được hỗ trợ và thiết lập cấu hình yêu cầu của next-intl. Tệp này đóng vai trò là nguồn duy nhất cho thiết lập i18n của bạn và đảm bảo an toàn kiểu trong toàn bộ ứng dụng của bạn.

Việc tập trung cấu hình ngôn ngữ giúp tránh sự không nhất quán và làm cho việc thêm hoặc loại bỏ ngôn ngữ trong tương lai trở nên dễ dàng hơn. Hàm `getRequestConfig` chạy trên mỗi yêu cầu và chỉ tải các bản dịch cần thiết cho từng trang, cho phép phân tách mã và giảm kích thước gói.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Định nghĩa các ngôn ngữ được hỗ trợ với an toàn kiểu
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // Kiểm tra xem ngôn ngữ có phải là ngôn ngữ viết từ phải sang trái không
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Tải các thông điệp một cách động theo từng ngôn ngữ để hỗ trợ phân tách mã
// Promise.all tải các namespace song song để cải thiện hiệu suất
async function loadMessages(locale: Locale) {
  // Chỉ tải các namespace mà layout/các trang của bạn cần
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Các tệp JSON trong tương lai nên được thêm vào đây
  ]);

  return { common, home, about } as const;
}

// Trợ giúp để tạo URL có địa phương hóa (ví dụ: /about so với /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig chạy trên mỗi yêu cầu và cung cấp các thông điệp cho các thành phần server
// Đây là nơi next-intl tích hợp với server-side rendering của Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 năm
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Thay đổi route /en/... thành /...
  // Tùy chọn: các đường dẫn có địa phương hóa
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // ngăn chặn chuyển hướng "/" -> "/en" dựa trên cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Bước 3: Định nghĩa các route địa phương động

Thiết lập định tuyến động cho các locale bằng cách tạo thư mục `[locale]` trong thư mục app của bạn. Điều này cho phép Next.js xử lý định tuyến dựa trên locale, trong đó mỗi locale trở thành một phân đoạn URL (ví dụ: `/en/about`, `/fr/about`).

Sử dụng các route động cho phép Next.js tạo các trang tĩnh cho tất cả các locale trong thời gian build, cải thiện hiệu suất và SEO. Thành phần layout thiết lập các thuộc tính HTML `lang` và `dir` dựa trên locale, điều này rất quan trọng cho khả năng truy cập và hiểu biết của công cụ tìm kiếm.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Tạo trước các trang tĩnh cho tất cả các locale trong thời gian build (SSG)
// Điều này cải thiện hiệu suất và SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Trong Next.js App Router, params là một Promise (có thể await)
  // Điều này cho phép các phân đoạn route động được giải quyết bất đồng bộ
  const { locale } = await params;

  // Quan trọng: setRequestLocale thông báo cho next-intl biết locale nào sẽ được sử dụng cho yêu cầu này
  // Nếu không có điều này, getTranslations() sẽ không biết locale nào để sử dụng trong các component server
  setRequestLocale(locale);

  // Lấy hướng văn bản (LTR/RTL) để render HTML đúng cách
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Các thông điệp được tải phía server. Chỉ đẩy những gì cần thiết cho client.
  // Điều này giảm thiểu kích thước gói JavaScript gửi đến trình duyệt
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Dịch/định dạng chỉ chạy phía server
  // Những cái này chạy trên server và có thể được truyền dưới dạng props cho các component
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider làm cho các bản dịch có sẵn cho các component phía client
    // Chỉ truyền những namespace mà các component client của bạn thực sự sử dụng
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Bước 4: Tạo Các Tệp Dịch Thuật Của Bạn

Tạo các tệp JSON cho từng locale và namespace. Cấu trúc này cho phép bạn tổ chức các bản dịch một cách hợp lý và chỉ tải những gì bạn cần cho mỗi trang.

Việc tổ chức bản dịch theo namespace (ví dụ: `common.json`, `about.json`) giúp tách mã và giảm kích thước gói. Bạn chỉ tải các bản dịch cần thiết cho mỗi trang, cải thiện hiệu suất.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Bước 5: Sử Dụng Bản Dịch Trong Các Trang Của Bạn

Tạo một component trang tải bản dịch trên server và truyền chúng cho cả component server và client. Điều này đảm bảo bản dịch được tải trước khi render và ngăn chặn hiện tượng nhấp nháy nội dung.

Việc tải bản dịch phía server cải thiện SEO và ngăn chặn FOUC (Flash of Untranslated Content). Bằng cách sử dụng `pick` để chỉ gửi các namespace cần thiết cho client provider, chúng ta giảm thiểu kích thước bundle JavaScript gửi đến trình duyệt.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Các thông điệp được tải phía server. Chỉ gửi những gì cần thiết cho client.
  // Điều này giúp giảm kích thước gói JavaScript gửi đến trình duyệt
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Dịch/định dạng chỉ chạy phía server
  // Những phần này chạy trên server và có thể được truyền dưới dạng props cho các component
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider làm cho các bản dịch có sẵn cho các component phía client
    // Chỉ truyền các namespace mà các component client của bạn thực sự sử dụng
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Bước 6: Sử dụng bản dịch trong các component phía client

Các component phía client có thể sử dụng các hook `useTranslations` và `useFormatter` để truy cập các bản dịch và các hàm định dạng. Các hook này đọc dữ liệu từ ngữ cảnh `NextIntlClientProvider`.

Các component phía client cần các hook của React để truy cập bản dịch. Các hook `useTranslations` và `useFormatter` tích hợp liền mạch với next-intl và cung cấp các cập nhật phản ứng khi locale thay đổi.

> Đừng quên thêm các namespace cần thiết vào các thông điệp client của trang (chỉ bao gồm các namespace mà các component phía client thực sự cần).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Phạm vi trực tiếp tới đối tượng lồng nhau
  // useTranslations/useFormatter là các hook đọc từ ngữ cảnh NextIntlClientProvider
  // Chúng chỉ hoạt động nếu component được bao bọc trong NextIntlClientProvider
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

### Bước 7: Sử dụng Bản dịch trong các Server Components

Các server component không thể sử dụng React hooks, vì vậy chúng nhận các bản dịch và hàm định dạng thông qua props từ các component cha. Cách tiếp cận này giữ cho các server component đồng bộ và cho phép chúng được lồng bên trong các client component.

Các component server có thể được lồng bên trong các ranh giới client cần phải đồng bộ. Bằng cách truyền các chuỗi đã dịch và các giá trị đã định dạng dưới dạng props, chúng ta tránh các thao tác bất đồng bộ và đảm bảo việc render đúng cách. Tính toán trước các bản dịch và định dạng trong component trang cha.

```tsx fileName="src/components/ServerComponent.tsx"
// Các component server được lồng bên trong các component client phải đồng bộ
// React không thể tuần tự hóa các hàm async qua ranh giới server/client
// Giải pháp: tính toán trước các bản dịch/định dạng trong component cha và truyền dưới dạng props
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> Trong trang/layout của bạn, sử dụng `getTranslations` và `getFormatter` từ `next-intl/server` để tính trước các bản dịch và định dạng, sau đó truyền chúng dưới dạng props cho các component server.

---

### (Tùy chọn) Bước 8: Thay đổi ngôn ngữ nội dung của bạn

Để thay đổi ngôn ngữ nội dung với next-intl, hãy render các liên kết nhận biết locale trỏ đến cùng một pathname trong khi chuyển đổi locale. Provider sẽ tự động viết lại URL, vì vậy bạn chỉ cần nhắm mục tiêu đến route hiện tại.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Loại bỏ tiền tố locale khỏi pathname để lấy đường dẫn cơ sở
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Bộ chọn ngôn ngữ">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Xây dựng href dựa trên việc có phải là locale mặc định hay không
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
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (Tùy chọn) Bước 9: Sử dụng component Link đã được bản địa hóa

`next-intl` cung cấp một gói con `next-intl/navigation` chứa một component link đã được bản địa hóa, tự động áp dụng locale đang hoạt động. Chúng tôi đã trích xuất sẵn cho bạn trong file `@/i18n`, vì vậy bạn có thể sử dụng như sau:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Tùy chọn) Bước 10: Truy cập locale đang hoạt động bên trong Server Actions

Server Actions có thể đọc locale hiện tại bằng cách sử dụng `next-intl/server`. Điều này hữu ích cho việc gửi email bản địa hóa hoặc lưu trữ tùy chọn ngôn ngữ cùng với dữ liệu được gửi lên.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Sử dụng locale để chọn mẫu, nhãn phân tích, v.v.
  console.log(`Đã nhận biểu mẫu liên hệ từ locale ${locale}`);
}
```

> `getLocale` đọc locale được thiết lập bởi proxy `next-intl`, vì vậy nó hoạt động ở bất kỳ đâu trên server: Route Handlers, Server Actions và edge functions.

### (Tùy chọn) Bước 11: Quốc tế hóa Metadata của bạn

Việc dịch nội dung là quan trọng, nhưng mục tiêu chính của quốc tế hóa là làm cho trang web của bạn trở nên dễ thấy hơn với thế giới. I18n là một đòn bẩy tuyệt vời để cải thiện khả năng hiển thị trang web của bạn thông qua SEO đúng cách.

Metadata được quốc tế hóa đúng cách giúp các công cụ tìm kiếm hiểu được những ngôn ngữ nào có sẵn trên các trang của bạn. Điều này bao gồm việc thiết lập các thẻ meta hreflang, dịch tiêu đề và mô tả, cũng như đảm bảo các URL chuẩn (canonical) được thiết lập chính xác cho từng ngôn ngữ.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata chạy cho mỗi locale, tạo metadata thân thiện với SEO
// Điều này giúp các công cụ tìm kiếm hiểu các phiên bản ngôn ngữ thay thế
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Phần còn lại của mã trang
```

### (Tùy chọn) Bước 12: Quốc tế hóa Sitemap của bạn

Tạo một sitemap bao gồm tất cả các phiên bản ngôn ngữ (locale) của các trang của bạn. Điều này giúp các công cụ tìm kiếm khám phá và lập chỉ mục tất cả các phiên bản ngôn ngữ của nội dung của bạn.

Một sitemap được quốc tế hóa đúng cách đảm bảo các công cụ tìm kiếm có thể tìm thấy và lập chỉ mục tất cả các phiên bản ngôn ngữ của các trang của bạn. Điều này cải thiện khả năng hiển thị trong kết quả tìm kiếm quốc tế.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Lấy bản đồ tất cả các locale và các đường dẫn được địa phương hóa tương ứng
 *
 * Ví dụ kết quả:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
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

### (Tùy chọn) Bước 13: Quốc tế hóa tệp robots.txt của bạn

Tạo một tệp robots.txt xử lý đúng tất cả các phiên bản ngôn ngữ của các tuyến đường được bảo vệ của bạn. Điều này đảm bảo rằng các công cụ tìm kiếm không lập chỉ mục các trang quản trị hoặc bảng điều khiển bằng bất kỳ ngôn ngữ nào.

Cấu hình đúng tệp robots.txt cho tất cả các ngôn ngữ giúp ngăn các công cụ tìm kiếm lập chỉ mục các trang nhạy cảm khi các tuyến đường của bạn khác nhau cho từng ngôn ngữ.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Tạo các đường dẫn cho tất cả các ngôn ngữ (ví dụ: /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### (Tùy chọn) Bước 14: Thiết lập Proxy cho Định tuyến Locale

Tạo một proxy để tự động phát hiện locale ưu tiên của người dùng và chuyển hướng họ đến URL có tiền tố locale phù hợp. next-intl cung cấp một hàm proxy tiện lợi xử lý việc này một cách tự động.

Proxy đảm bảo rằng người dùng sẽ được tự động chuyển hướng đến ngôn ngữ ưu tiên của họ khi truy cập trang web của bạn. Nó cũng lưu lại sở thích của người dùng cho các lần truy cập sau, cải thiện trải nghiệm người dùng.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware chạy trước các route, xử lý phát hiện locale và định tuyến
// localeDetection: true sử dụng header Accept-Language để tự động phát hiện locale
export default proxy;

export const config = {
  // Bỏ qua API, các phần nội bộ của Next và tài nguyên tĩnh
  // Regex: khớp tất cả các route ngoại trừ những route bắt đầu bằng api, _next hoặc chứa dấu chấm (file)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Tùy chọn) Bước 15: Thiết lập kiểu TypeScript cho Locale

Thiết lập TypeScript sẽ giúp bạn có tính năng tự động hoàn thành và an toàn kiểu cho các khóa của bạn.

Để làm điều đó, bạn có thể tạo một file global.ts trong thư mục gốc dự án của bạn và thêm đoạn mã sau:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Các file JSON trong tương lai cũng nên được thêm vào đây
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Đoạn mã này sẽ sử dụng Module Augmentation để thêm locales và messages vào kiểu AppConfig của next-intl.

### (Tùy chọn) Bước 15: Tự động hóa bản dịch của bạn bằng Intlayer

Intlayer là một thư viện **miễn phí** và **mã nguồn mở** được thiết kế để hỗ trợ quá trình bản địa hóa trong ứng dụng của bạn. Trong khi next-intl xử lý việc tải và quản lý bản dịch, Intlayer giúp tự động hóa quy trình làm việc bản dịch.

Quản lý bản dịch thủ công có thể tốn nhiều thời gian và dễ xảy ra lỗi. Intlayer tự động hóa việc kiểm tra, tạo và quản lý bản dịch, giúp bạn tiết kiệm thời gian và đảm bảo tính nhất quán trên toàn bộ ứng dụng của bạn.

Intlayer sẽ cho phép bạn:

- **Khai báo nội dung của bạn ở bất cứ đâu bạn muốn trong codebase**
  Intlayer cho phép khai báo nội dung của bạn ở bất cứ đâu bạn muốn trong codebase bằng cách sử dụng các file `.content.{ts|js|json}`. Điều này sẽ giúp tổ chức nội dung tốt hơn, đảm bảo khả năng đọc và bảo trì codebase hiệu quả hơn.

- **Kiểm tra các bản dịch còn thiếu**
  Intlayer cung cấp các hàm kiểm thử có thể được tích hợp vào pipeline CI/CD của bạn hoặc trong các bài kiểm thử đơn vị. Tìm hiểu thêm về [kiểm thử bản dịch của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md).

- **Tự động hóa bản dịch của bạn**,
  Intlayer cung cấp một CLI và một tiện ích mở rộng VSCode để tự động hóa bản dịch của bạn. Nó có thể được tích hợp vào pipeline CI/CD của bạn. Tìm hiểu thêm về [tự động hóa bản dịch của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).
  Bạn có thể sử dụng **khóa API riêng của bạn và nhà cung cấp AI mà bạn chọn**. Nó cũng cung cấp bản dịch nhận biết ngữ cảnh, xem thêm [tự động điền nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md).

- **Kết nối nội dung bên ngoài**
  Intlayer cho phép bạn kết nối nội dung của mình với một hệ thống quản lý nội dung (CMS) bên ngoài. Để lấy nội dung đó một cách tối ưu và chèn vào các tài nguyên JSON của bạn. Tìm hiểu thêm về [lấy nội dung bên ngoài](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/function_fetching.md).

- **Trình chỉnh sửa trực quan**  
  Intlayer cung cấp một trình chỉnh sửa trực quan miễn phí để chỉnh sửa nội dung của bạn bằng trình chỉnh sửa trực quan. Tìm hiểu thêm về [chỉnh sửa trực quan bản dịch của bạn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Và còn nhiều hơn thế nữa. Để khám phá tất cả các tính năng mà Intlayer cung cấp, vui lòng tham khảo [Lợi ích của tài liệu Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Cách dịch ứng dụng Next.js 15 của bạn sử dụng next-i18next – hướng dẫn i18n 2025
description: Hướng dẫn thực tiễn, sẵn sàng cho sản xuất để quốc tế hóa ứng dụng Next.js 15 App Router với i18next/next-i18next và nâng cao với Intlayer.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Dịch website Next.js 15 sử dụng next-i18next với Intlayer | Quốc tế hóa (i18n)

### Hướng dẫn này dành cho ai

- **Junior**: Làm theo chính xác các bước và sao chép các khối mã. Bạn sẽ có một ứng dụng đa ngôn ngữ hoạt động.
- **Mid-level**: Sử dụng các danh sách kiểm tra và các lưu ý về thực hành tốt nhất để tránh những sai sót phổ biến.
- **Senior**: Lướt qua cấu trúc tổng thể, các phần SEO và tự động hóa; bạn sẽ tìm thấy các thiết lập mặc định hợp lý và các điểm mở rộng.

### Những gì bạn sẽ xây dựng

- Dự án App Router với các tuyến đường được địa phương hóa (ví dụ: `/`, `/fr/...`)
- Cấu hình i18n với các locale, locale mặc định, hỗ trợ RTL
- Khởi tạo i18n phía server và một provider phía client
- Các bản dịch theo namespace được tải theo yêu cầu
- SEO với `hreflang`, `sitemap` và `robots` được địa phương hóa
- Middleware cho việc định tuyến theo locale
- Tích hợp Intlayer để tự động hóa quy trình dịch thuật (kiểm thử, điền AI, đồng bộ JSON)

> Lưu ý: next-i18next được xây dựng dựa trên i18next. Hướng dẫn này sử dụng các primitive của i18next tương thích với next-i18next trong App Router, đồng thời giữ cho kiến trúc đơn giản và sẵn sàng cho môi trường production.
> Để so sánh rộng hơn, xem [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Cấu trúc dự án

Cài đặt các dependencies của next-i18next -

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

Bắt đầu với một cấu trúc rõ ràng. Giữ các thông điệp được tách theo locale và namespace.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Danh sách kiểm tra (trung cấp/cao cấp):

- Giữ một file JSON cho mỗi namespace mỗi locale
- Không tập trung quá nhiều thông điệp; sử dụng các namespace nhỏ, theo trang/tính năng
- Tránh import tất cả các locale cùng lúc; chỉ tải những gì bạn cần

---

## 2) Cài đặt dependencies

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Nếu bạn dự định sử dụng các API hoặc cấu hình tương tác của next-i18next, cũng cần:

```bash
pnpm add next-i18next
```

---

## 3) Cấu hình i18n cốt lõi

Định nghĩa các locales, locale mặc định, RTL, và các hàm trợ giúp cho các đường dẫn/URL có địa phương hóa.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Ghi chú chuyên sâu: Nếu bạn sử dụng `next-i18next.config.js`, hãy giữ cho nó đồng bộ với `i18n.config.ts` để tránh lệch pha.

---

## 4) Khởi tạo i18n phía server

Khởi tạo i18next trên server với backend động chỉ nhập khẩu các JSON locale/namespace cần thiết.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Tải tài nguyên JSON từ src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Ghi chú giữa: Giữ danh sách namespace ngắn cho mỗi trang để giới hạn payload. Tránh các gói “bắt tất cả” toàn cục.

---

## 5) Provider phía client cho các component React

Bao bọc các component phía client với một provider phản chiếu cấu hình phía server và chỉ tải các namespace được yêu cầu.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Mẹo cho người mới: Bạn không cần phải truyền tất cả các thông điệp đến client. Hãy bắt đầu chỉ với các namespace của trang.

---

## 6) Bố cục và đường dẫn địa phương hóa

Đặt ngôn ngữ và hướng, đồng thời tạo trước các đường dẫn theo từng locale để ưu tiên render tĩnh.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Ví dụ trang với sử dụng server + client

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Ép buộc render tĩnh cho trang
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Bản dịch (mỗi JSON cho một namespace dưới `src/locales/...`):

```json fileName="src/locales/vi/about.json"
{
  "title": "Giới thiệu",
  "description": "Mô tả trang giới thiệu",
  "counter": {
    "label": "Bộ đếm",
    "increment": "Tăng"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

Component phía client (chỉ tải namespace cần thiết):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
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

> Đảm bảo trang/provider chỉ bao gồm các namespace bạn cần (ví dụ: `about`).
> Nếu bạn sử dụng React < 19, hãy ghi nhớ các bộ định dạng nặng như `Intl.NumberFormat`.

Synchronous server component được nhúng dưới một client boundary:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Metadata, Hreflang, Sitemap, Robots

Dịch nội dung là một cách để mở rộng phạm vi tiếp cận. Thiết lập SEO đa ngôn ngữ một cách kỹ lưỡng.

Các thực hành tốt nhất:

- Đặt `lang` và `dir` tại phần gốc
- Thêm `alternates.languages` cho mỗi locale (+ `x-default`)
- Liệt kê các URL đã dịch trong `sitemap.xml` và sử dụng `hreflang`
- Loại trừ các khu vực riêng tư đã được địa phương hóa (ví dụ: `/fr/admin`) trong `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Nhập đúng gói JSON từ src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly", // tần suất thay đổi: hàng tháng
      priority: 0.7, // độ ưu tiên
      alternates: { languages }, // các phiên bản ngôn ngữ thay thế
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware cho định tuyến locale

Phát hiện locale và chuyển hướng đến đường dẫn có locale nếu thiếu.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // loại trừ các file có phần mở rộng

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Khớp tất cả các đường dẫn ngoại trừ những đường dẫn bắt đầu bằng các từ này và các tệp có phần mở rộng
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Hiệu suất và các thực hành tốt nhất cho trải nghiệm nhà phát triển (DX)

- **Đặt thuộc tính `lang` và `dir` cho html**: Đã thực hiện trong `src/app/[locale]/layout.tsx`.
- **Phân tách thông điệp theo namespace**: Giữ các gói nhỏ (`common.json`, `about.json`, v.v.).
- **Giảm thiểu payload phía client**: Trên các trang, chỉ truyền các namespace cần thiết cho provider.
- **Ưu tiên các trang tĩnh**: Sử dụng `export const dynamic = 'force-static'` và `generateStaticParams` cho từng locale.
- **Đồng bộ các component server**: Truyền các chuỗi/định dạng đã tính trước thay vì gọi async khi render.
- **Ghi nhớ các thao tác nặng**: Đặc biệt trong mã client cho các phiên bản React cũ hơn.
- **Bộ nhớ đệm và header**: Ưu tiên tĩnh hoặc `revalidate` thay vì render động khi có thể.

---

## 11) Kiểm thử và CI

- Thêm unit test cho các component sử dụng `t` để đảm bảo các key tồn tại.
- Xác thực rằng mỗi namespace có cùng các khóa trên tất cả các locale.
- Hiển thị các khóa còn thiếu trong quá trình CI trước khi triển khai.

Intlayer sẽ tự động hóa phần lớn công việc này (xem phần tiếp theo).

---

## 12) Thêm Intlayer lên trên (tự động hóa)

Intlayer giúp bạn giữ đồng bộ các bản dịch JSON, kiểm tra các khóa còn thiếu và điền bằng AI khi cần.

Cài đặt các dependencies của intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Thêm các script cho package:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Các luồng phổ biến:

- `pnpm i18n:test` trong CI để làm cho build thất bại khi thiếu key
- `pnpm i18n:fill` chạy cục bộ để đề xuất bản dịch AI cho các key mới được thêm vào

> Bạn có thể cung cấp các đối số CLI; xem thêm tại [Tài liệu CLI của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

---

## 13) Khắc phục sự cố

- **Không tìm thấy khóa**: Đảm bảo trang/nhà cung cấp liệt kê đúng các namespace và tệp JSON tồn tại trong `src/locales/<locale>/<namespace>.json`.
- **Ngôn ngữ sai/lỗi nháy tiếng Anh**: Kiểm tra kỹ việc phát hiện locale trong `middleware.ts` và `lng` của nhà cung cấp.
- **Vấn đề bố cục RTL**: Xác nhận `dir` được lấy từ `isRtl(locale)` và CSS của bạn tuân thủ `[dir="rtl"]`.
- **Thiếu các alternate SEO**: Xác nhận `alternates.languages` bao gồm tất cả các locale và `x-default`.
- **Gói quá lớn**: Chia nhỏ các namespace hơn nữa và tránh nhập toàn bộ cây `locales` trên client.

---

## 14) Tiếp theo

- Thêm nhiều locale và namespace hơn khi các tính năng phát triển
- Địa phương hóa các trang lỗi, email và nội dung được điều khiển bởi API
- Mở rộng quy trình làm việc của Intlayer để tự động mở PR cập nhật bản dịch

Nếu bạn muốn một mẫu khởi đầu, hãy thử template: `https://github.com/aymericzip/intlayer-next-i18next-template`.

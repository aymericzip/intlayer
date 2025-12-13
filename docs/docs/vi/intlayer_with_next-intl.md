---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Cách dịch Next.js 15 của bạn sử dụng next-intl – hướng dẫn i18n 2025
description: Khám phá cách làm cho website Next.js 15 App Router của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Dịch website Next.js 15 sử dụng next-intl với Intlayer | Quốc tế hóa (i18n)

Hướng dẫn này sẽ dẫn bạn qua các thực hành tốt nhất của next-intl trong ứng dụng Next.js 15 (App Router), và chỉ cách tích hợp Intlayer lên trên để quản lý dịch thuật và tự động hóa mạnh mẽ.

Xem so sánh tại [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md).

- Dành cho người mới: làm theo từng bước để có một ứng dụng đa ngôn ngữ hoạt động.
- Dành cho lập trình viên trung cấp: chú ý tối ưu payload và tách biệt server/client.
- Dành cho lập trình viên cao cấp: lưu ý về static generation, middleware, tích hợp SEO và các hook tự động hóa.

Những nội dung chúng ta sẽ đề cập:

- Cài đặt và cấu trúc file
- Tối ưu cách tải các thông điệp
- Sử dụng component phía client và server
- Metadata, sitemap, robots cho SEO
- Middleware cho định tuyến locale
- Thêm Intlayer lên trên (CLI và tự động hóa)

## Cài đặt ứng dụng của bạn sử dụng next-intl

Cài đặt các dependencies của next-intl -

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
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
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Cài đặt và Tải Nội dung

Chỉ tải các namespace mà các route của bạn cần và xác thực locale sớm. Giữ các component phía server đồng bộ khi có thể và chỉ gửi các thông điệp cần thiết đến client.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Chỉ tải các namespace mà layout/pages của bạn cần
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Đặt locale yêu cầu đang hoạt động cho lần render server này (RSC)
  unstable_setRequestLocale(locale);

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
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Các thông điệp được tải phía server. Chỉ đẩy những gì cần thiết cho client.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Dịch/định dạng chỉ dành riêng cho phía server
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
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

### Sử dụng trong một component phía client

Hãy lấy ví dụ về một component phía client hiển thị bộ đếm.

**Dịch thuật (dạng được tái sử dụng; tải chúng vào messages của next-intl theo cách bạn muốn)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Bộ đếm",
    "increment": "Tăng"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Component phía client**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Phạm vi trực tiếp tới đối tượng lồng nhau
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

> Đừng quên thêm message "about" vào messages phía client của trang
> (chỉ bao gồm các namespace mà client của bạn thực sự cần).

### Sử dụng trong component phía server

Component UI này là một component phía server và có thể được render bên dưới một component phía client (page → client → server). Giữ nó đồng bộ bằng cách truyền các chuỗi đã được tính trước.

```tsx fileName="src/components/ServerComponent.tsx"
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

Ghi chú:

- Tính toán `formattedCount` phía server (ví dụ: `const initialFormattedCount = format.number(0)`).
- Tránh truyền các hàm hoặc đối tượng không thể tuần tự hóa vào các component phía server.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

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

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
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

### Middleware cho định tuyến locale

Thêm một middleware để xử lý phát hiện và định tuyến locale:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Bỏ qua API, các phần nội bộ của Next và tài nguyên tĩnh
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Thực hành tốt nhất

- **Đặt thuộc tính `lang` và `dir` cho html**: Trong `src/app/[locale]/layout.tsx`, tính toán `dir` thông qua `getLocaleDirection(locale)` và đặt `<html lang={locale} dir={dir}>`.
- **Phân tách messages theo namespace**: Tổ chức JSON theo locale và namespace (ví dụ: `common.json`, `about.json`).
- **Giảm thiểu tải trọng cho client**: Trên các trang, chỉ gửi các namespace cần thiết đến `NextIntlClientProvider` (ví dụ, `pick(messages, ['common', 'about'])`).
- **Ưu tiên các trang tĩnh**: Xuất `export const dynamic = 'force-static'` và tạo các tham số tĩnh cho tất cả các `locales`.
- **Các component server đồng bộ**: Truyền các chuỗi đã được tính trước (nhãn đã dịch, số đã định dạng) thay vì các cuộc gọi async hoặc các hàm không thể tuần tự hóa.

## Triển khai Intlayer trên nền next-intl

Cài đặt các phụ thuộc của intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

Tạo file cấu hình intlayer:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // Giữ cấu trúc thư mục theo namespace đồng bộ với Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Thêm các script vào `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Ghi chú:

- `intlayer fill`: sử dụng nhà cung cấp AI của bạn để điền các bản dịch còn thiếu dựa trên các locale đã cấu hình.
- `intlayer test`: kiểm tra các bản dịch bị thiếu hoặc không hợp lệ (sử dụng trong CI).

Bạn có thể cấu hình các đối số và nhà cung cấp; xem thêm tại [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

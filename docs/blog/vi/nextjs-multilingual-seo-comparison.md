---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO và i18n trong Next.js
description: Tìm hiểu cách thiết lập SEO đa ngôn ngữ trong ứng dụng Next.js của bạn bằng cách sử dụng next-intl, next-i18next và Intlayer.
keywords:
  - Intlayer
  - SEO
  - Quốc tế hóa
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - blog-seo-i18n-nextjs
---

# SEO và i18n trong Next.js: Dịch thuật không thôi là chưa đủ

Khi các nhà phát triển nghĩ về quốc tế hóa (i18n), phản xạ đầu tiên thường là: _dịch nội dung_. Nhưng mọi người thường quên rằng mục tiêu chính của quốc tế hóa là làm cho trang web của bạn trở nên dễ nhìn thấy hơn với thế giới.
Nếu ứng dụng Next.js đa ngôn ngữ của bạn không cho các công cụ tìm kiếm biết cách thu thập dữ liệu và hiểu các phiên bản ngôn ngữ khác nhau, hầu hết nỗ lực của bạn có thể sẽ bị bỏ qua.

Trong bài blog này, chúng ta sẽ khám phá **tại sao i18n là một siêu năng lực SEO** và cách triển khai đúng trong Next.js với `next-intl`, `next-i18next`, và `Intlayer`.

---

## Tại sao SEO và i18n

Thêm ngôn ngữ không chỉ là về trải nghiệm người dùng (UX). Nó còn là một đòn bẩy mạnh mẽ cho **tầm nhìn hữu cơ**. Đây là lý do:

1. **Khả năng khám phá tốt hơn:** Các công cụ tìm kiếm lập chỉ mục các phiên bản địa phương hóa và xếp hạng chúng cho người dùng tìm kiếm bằng ngôn ngữ mẹ đẻ của họ.
2. **Tránh nội dung trùng lặp:** Các thẻ canonical và alternate đúng cách giúp trình thu thập dữ liệu biết trang nào thuộc ngôn ngữ nào.
3. **Trải nghiệm người dùng tốt hơn:** Khách truy cập sẽ được đưa đến đúng phiên bản của trang web ngay lập tức.
4. **Lợi thế cạnh tranh:** Ít trang web triển khai SEO đa ngôn ngữ tốt, điều này có nghĩa là bạn có thể nổi bật hơn.

---

## Các thực hành tốt nhất cho SEO đa ngôn ngữ trong Next.js

Dưới đây là danh sách kiểm tra mà mọi ứng dụng đa ngôn ngữ nên thực hiện:

- **Đặt thẻ meta `hreflang` trong `<head>`**  
  Giúp Google hiểu các phiên bản tồn tại cho mỗi ngôn ngữ.

- **Liệt kê tất cả các trang đã dịch trong `sitemap.xml`**  
  Sử dụng schema `xhtml` để các trình thu thập dữ liệu dễ dàng tìm thấy các phiên bản thay thế.

- **Loại trừ các tuyến đường riêng tư/địa phương hóa trong `robots.txt`**  
  Ví dụ: không cho phép `/dashboard`, `/fr/dashboard`, `/es/dashboard` được lập chỉ mục.

- **Sử dụng các liên kết địa phương hóa**  
  Ví dụ: `<a href="/fr/about">À propos</a>` thay vì liên kết đến trang mặc định `/about`.

Đây là những bước đơn giản — nhưng bỏ qua chúng có thể khiến bạn mất đi khả năng hiển thị.

---

## Ví dụ về triển khai

Các nhà phát triển thường quên tham chiếu đúng các trang của họ qua các ngôn ngữ, vì vậy hãy cùng xem cách điều này hoạt động trong thực tế với các thư viện khác nhau.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// Hàm tạo đường dẫn có địa phương hóa
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
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
    locales.map((l) => [l, localizedPath(l, url)])
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
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

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
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Tiền tố đường dẫn với locale trừ khi đó là locale mặc định */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Trợ giúp URL tuyệt đối */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Nhập động file JSON tương ứng
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
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
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
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

    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Tạo một đối tượng chứa tất cả các url cho mỗi locale.
   *
   * Ví dụ:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Trả về
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Phần còn lại của mã trang
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // không cho phép truy cập các URL đa ngôn ngữ của /dashboard
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer cung cấp một hàm `getMultilingualUrls` để tạo các URL đa ngôn ngữ cho sitemap của bạn.

  </TabItem>
</Tabs>

---

## Kết luận

Việc làm i18n đúng trong Next.js không chỉ là dịch văn bản, mà còn là đảm bảo các công cụ tìm kiếm và người dùng biết chính xác phiên bản nội dung nào cần được phục vụ.
Thiết lập hreflang, sitemap và quy tắc robots chính là những gì biến các bản dịch thành giá trị SEO thực sự.

Trong khi next-intl và next-i18next cung cấp cho bạn các cách vững chắc để kết nối điều này, chúng thường yêu cầu rất nhiều thiết lập thủ công để giữ mọi thứ nhất quán giữa các locale.

Đây chính là điểm mà Intlayer thực sự nổi bật:

Nó đi kèm với các trợ giúp tích hợp sẵn như getMultilingualUrls, giúp việc tích hợp hreflang, sitemap và robots trở nên gần như không tốn công sức.

Metadata được giữ tập trung thay vì phân tán khắp các tệp JSON hoặc các tiện ích tùy chỉnh.

Nó được thiết kế dành riêng cho Next.js ngay từ đầu, giúp bạn dành ít thời gian hơn cho việc gỡ lỗi cấu hình và nhiều thời gian hơn để triển khai.

Nếu mục tiêu của bạn không chỉ là dịch thuật mà còn là mở rộng SEO đa ngôn ngữ một cách mượt mà, Intlayer mang đến cho bạn cấu hình sạch sẽ nhất và bền vững nhất cho tương lai.

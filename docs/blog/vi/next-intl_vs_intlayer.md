---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs Intlayer: Điểm chuẩn & So sánh 2026"
description: "So sánh chi tiết giữa next-intl và Intlayer trên Next.js App Router và TanStack Start. Kích thước bundle, rò rỉ nội dung, kích thước component, hydrate và trải nghiệm lập trình viên."
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Điểm chuẩn quốc tế hóa (i18n) trên React & Next.js

`next-intl` là lựa chọn mặc định cho i18n trên Next.js App Router hiện nay: tích hợp chặt chẽ với định tuyến, hỗ trợ đầy đủ ICU MessageFormat, và trải nghiệm lập trình quen thuộc với bất kỳ ai từng sử dụng các hệ thống i18n truyền thống.

`Intlayer` tiếp cận vấn đề theo một hướng hoàn toàn mới: không có từ điển tập trung, không cần khớp nối thủ công giữa namespace và route. Nội dung được khai báo ngay cạnh từng component, và trình biên dịch tại thời điểm build sẽ chỉ đóng gói đúng những gì trang đó thực sự cần.

Bài viết này so sánh cả hai thư viện dựa trên dữ liệu từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), một bộ kiểm thử mã nguồn mở xây dựng cùng một ứng dụng với mỗi thư viện và ghi lại những gì trình duyệt thực sự tải xuống và thực thi.

<TOC/>

> **Tóm tắt (tl;dr)**: `next-intl` làm tăng ít nhất **+12.6 KB gzip** trên mỗi trang chỉ riêng cho runtime của nó, và làm rò rỉ **~90% chuỗi ký tự của các trang khác** trong các cấu hình tiêu chuẩn (`static` và `dynamic`). Để loại bỏ sự rò rỉ đó, lập trình viên phải chia nhỏ danh mục thành các namespace và chọn thủ công cho từng trang. Ngược lại, trình biên dịch của `Intlayer` đảm bảo **0% rò rỉ**, component **nhỏ hơn gấp 3 lần**, và chỉ tốn thêm **+0.3 KB** so với ứng dụng gốc mà không cần cấu hình phức tạp.

## Tóm lược

- **next-intl** - Tiêu chuẩn cộng đồng của Next.js. Các từ điển JSON tập trung cho từng ngôn ngữ, hỗ trợ đầy đủ định dạng ICU MessageFormat, tích hợp sâu vào quy trình xử lý request và định tuyến của Next.js.
- **Intlayer** - Mô hình nội dung lấy component làm trung tâm. Các tệp `.content.ts` đặt ngay cạnh component, trình biên dịch thực hiện tree-shaking và tải lười (lazy loading) theo component và ngôn ngữ, tự động tạo các kiểu TypeScript nghiêm ngặt.

| Thư viện              | Ngôi sao GitHub                                                                                                                                                                | Tổng số commit                                                                                                                                                                     | Commit cuối                                                                                                                                         | Phiên bản đầu | Phiên bản NPM                                                                                                 | Lượt tải NPM                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Tháng 4 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Tháng 3 2021  | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Huy hiệu được cập nhật tự động.

## So sánh tính năng chi tiết

| Tính năng                                           | Intlayer (`react-intlayer` / `next-intlayer`)                                   | next-intl (`next-intl` / `use-intl`)                            |
| --------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Bản dịch đặt cạnh component**                     | ✅ Có, `.content.ts` đặt ngay cạnh component                                    | ❌ Các từ điển JSON tập trung trong thư mục `messages/`         |
| **Tích hợp TypeScript**                             | ✅ Kiểu nghiêm ngặt được tạo tự động từ nội dung                                | ⚠️ Hỗ trợ thông qua cấu hình thủ công `global.d.ts`             |
| **Phát hiện bản dịch còn thiếu**                    | ✅ Lỗi TypeScript + lỗi/cảnh báo tại thời điểm build                            | ⚠️ Runtime trả về key hoặc báo lỗi tùy thuộc vào cấu hình       |
| **Nội dung phong phú (JSX / Markdown / component)** | ✅ Hỗ trợ trực tiếp                                                             | ⚠️ Thông qua `t.rich()` với việc truyền các component ánh xạ    |
| **Hỗ trợ ICU MessageFormat**                        | ⚠️ Đang phát triển                                                              | ✅ Có, hỗ trợ đầy đủ tiêu chuẩn ICU                             |
| **Component server đồng bộ**                        | ✅ `useIntlayer` từ `next-intlayer/server` hoạt động trong component server con | ❌ Cần truyền bản dịch qua props từ component cha bất đồng bộ   |
| **Tree-shaking**                                    | ✅ Tự động cho từng component và từng ngôn ngữ                                  | ⚠️ Đòi hỏi phải chia nhỏ namespace thủ công và sử dụng `pick()` |
| **Tải lười (Lazy loading)**                         | ✅ Một dòng cấu hình (`importMode: 'dynamic'`)                                  | ⚠️ Yêu cầu import động thủ công trong `getRequestConfig`        |
| **Trình chỉnh sửa trực quan / CMS**                 | ✅ Trình chỉnh sửa trực quan miễn phí + CMS tùy chọn                            | ❌ Không có                                                     |
| **Dịch thuật bằng AI**                              | ✅ Tích hợp sẵn, sử dụng API key của riêng bạn                                  | ❌ Không có                                                     |
| **Máy chủ MCP & Kỹ năng Agent**                     | ✅ Có                                                                           | ❌ Không có                                                     |

## Bài kiểm tra điểm chuẩn

### Những gì đã được đo lường

Bộ thử nghiệm [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) xây dựng **cùng một ứng dụng** với mỗi thư viện: **10 trang** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 ngôn ngữ** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), component giống hệt nhau và nội dung giống hệt nhau. Các trang được đo lường bằng `en` và `fr`. Mỗi thư viện được thử nghiệm theo bốn **chiến lược tải**:

| Chiến lược         | Mô tả                                                                                 | Đối tượng sử dụng                          |
| ------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------ |
| **static**         | Tất cả ngôn ngữ và trang được đóng gói cùng nhau từ đầu                               | Bản dựng thử nghiệm nhanh, mã do AI tạo    |
| **dynamic**        | Chỉ ngôn ngữ đang hoạt động được tải, nhưng bao gồm tất cả các trang                  | Đa số các dự án                            |
| **scoped-static**  | Phân chia namespace theo route, không dùng lazy loading                               | Hiếm gặp                                   |
| **scoped-dynamic** | Namespace theo route + lazy loading. Chỉ trang hiện tại và ngôn ngữ hiện tại được gửi | Các ứng dụng có yêu cầu hiệu năng khắt khe |

Intlayer không có biến thể "scoped": trình biên dịch tự động thu hẹp phạm vi nội dung **theo từng component**, do đó các hàng `static` và `dynamic` vốn đã được tối ưu hóa phạm vi.

Bộ công cụ ghi lại:

- **Kích thước thư viện (Lib size)**: kích thước gzip của component trống chỉ import thư viện i18n.
- **JS trang (Page JS)**: dung lượng JavaScript gzip tải về trên mỗi trang.
- **% rò rỉ ngôn ngữ (Locale leak %)**: tỷ lệ chuỗi thuộc về ngôn ngữ mà người dùng không xem.
- **% rò rỉ trang (Page leak %)**: tỷ lệ chuỗi thuộc về trang mà người dùng không truy cập.
- **Trung bình component (Component avg)**: kích thước gzip trung bình của mỗi component khi được biên dịch riêng lẻ.
- **Độ phản hồi E2E**: thời gian từ khi chọn ngôn ngữ mới đến khi DOM cập nhật `html[lang]`.
- **Hydrate (Hydration)**: thời lượng của giai đoạn hydrate trong React.

> Dữ liệu dưới đây được lấy từ lần chạy ngày **2026-09-12** với `next-intl` 4.14.2 và `intlayer` 9.5.1.

### Kết quả trên Next.js (App Router)

| Thư viện                            | Chiến lược     | Kích thước Lib (gz) | JS trang TB (gz) | Rò rỉ ngôn ngữ | Rò rỉ trang | TB component (gz) | Độ phản hồi E2E | Hydrate |
| ----------------------------------- | -------------- | ------------------: | ---------------: | -------------: | ----------: | ----------------: | --------------: | ------: |
| **Ứng dụng gốc** (không i18n)       | -              |              0.0 KB |         141.0 KB |           0.0% |        0.0% |            0.9 KB |         13.4 ms | 11.8 ms |
| `next-intl`                         | static         |             14.7 KB |         153.6 KB |           4.2% |       89.8% |           21.8 KB |         16.0 ms | 14.7 ms |
| `next-intl`                         | dynamic        |             14.7 KB |         153.6 KB |           9.7% |       89.9% |           21.8 KB |         15.6 ms | 14.8 ms |
| `next-intl`                         | scoped-static  |             14.7 KB |         153.6 KB |           0.0% |        0.0% |           80.1 KB |         17.9 ms | 17.4 ms |
| `next-intl`                         | scoped-dynamic |             14.7 KB |         153.6 KB |           0.0% |        0.0% |           22.9 KB |         17.8 ms | 16.8 ms |
| **`next-intlayer`**                 | static         |          **5.5 KB** |     **141.3 KB** |       **0.0%** |    **0.0%** |        **8.5 KB** |     **15.5 ms** | 16.9 ms |
| **`next-intlayer`**                 | dynamic        |          **5.5 KB** |     **141.3 KB** |       **0.0%** |    **0.0%** |        **6.9 KB** |     **15.3 ms** | 15.9 ms |
| `@intlayer/next-intl` (tương thích) | static         |              8.0 KB |         147.5 KB |           0.0% |        0.0% |            8.1 KB |         14.5 ms | 12.8 ms |
| `@intlayer/next-intl` (tương thích) | dynamic        |              8.0 KB |         148.7 KB |           0.0% |        0.0% |            8.1 KB |         11.7 ms | 12.8 ms |

**Cách đọc kết quả**

- **Chi phí runtime.** Ứng dụng gốc nặng 141.0 KB trên mỗi trang. `next-intl` tăng lên 153.6 KB (**+12.6 KB gzip trên mỗi trang**), trong khi Intlayer chỉ tốn 141.3 KB (**+0.3 KB**).
- **Rò rỉ nội dung.** Trong các cấu hình phổ biến (`static` và `dynamic`), `next-intl` gửi **~90% chuỗi của các trang khác** trên mỗi trang vì toàn bộ tệp `en.json` được đưa vào client provider. Để đạt mức 0% đòi hỏi phải chia tách thủ công rất tỉ mỉ, trong khi Intlayer đạt được điều này mặc định.
- **Kích thước component.** Một component gọi `useTranslations()` có dung lượng trung bình 21.8 KB; cùng component đó với `useIntlayer()` chỉ nặng 6.9 KB.

### Kết quả trên TanStack Start (`use-intl`)

| Thư viện                           | Chiến lược     | Kích thước Lib (gz) | JS trang TB (gz) | Rò rỉ ngôn ngữ | Rò rỉ trang | TB component (gz) | Độ phản hồi E2E |
| ---------------------------------- | -------------- | ------------------: | ---------------: | -------------: | ----------: | ----------------: | --------------: |
| **Ứng dụng gốc** (không i18n)      | -              |              0.0 KB |         111.0 KB |           0.0% |        0.0% |            0.7 KB |          8.1 ms |
| `use-intl`                         | static         |             14.1 KB |         179.8 KB |          50.0% |       89.8% |           76.0 KB |          6.7 ms |
| `use-intl`                         | dynamic        |             14.1 KB |         119.4 KB |           0.0% |       89.8% |           75.9 KB |          7.0 ms |
| `use-intl`                         | scoped-static  |             14.1 KB |         128.7 KB |           0.0% |        0.0% |           87.1 KB |         20.9 ms |
| `use-intl`                         | scoped-dynamic |             14.1 KB |         128.7 KB |           0.0% |        0.0% |           87.1 KB |         13.3 ms |
| **`intlayer`**                     | static         |          **5.0 KB** |     **125.8 KB** |          50.0% |    **0.0%** |        **8.1 KB** |      **3.2 ms** |
| **`intlayer`**                     | dynamic        |          **5.0 KB** |     **118.6 KB** |       **0.0%** |    **0.0%** |        **6.3 KB** |      **3.6 ms** |
| `@intlayer/use-intl` (tương thích) | dynamic        |              7.3 KB |         129.7 KB |           0.0% |        0.0% |            9.3 KB |          8.7 ms |

**Cách đọc kết quả**

- Cấu hình đơn giản của `use-intl` gửi **nhiều hơn 68.8 KB JS trên mỗi trang** so với ứng dụng gốc.
- Ở chế độ `dynamic`, `use-intl` đạt mức 119.4 KB nhưng vẫn có **89.8% rò rỉ trang**.
- Sự khác biệt về mặt kiến trúc thể hiện rất rõ ở **kích thước component**: 76-87 KB với `use-intl` so với 6-8 KB với Intlayer.
- **Chuyển đổi ngôn ngữ** nhanh hơn từ 2 đến 4 lần với Intlayer (3 ms so với 7-21 ms).

## Tại sao lại có sự khác biệt? Danh mục tập trung vs từ điển biên dịch

`next-intl` tuân theo mô hình cổ điển: một tệp JSON cho mỗi ngôn ngữ, được nạp trong `getRequestConfig`, chuyển vào `NextIntlClientProvider` và đọc qua cú pháp `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Runtime không thể biết trước những key nào sẽ được trang sử dụng, vì vậy việc gửi toàn bộ danh mục là giải pháp an toàn duy nhất.

Intlayer đảo ngược hoàn toàn quy trình này. Nội dung được khai báo trực tiếp cạnh component:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                ├── page.tsx
                └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

Tại thời điểm build, trình biên dịch nhận biết component nào import từ điển nào và chỉ đóng gói những từ điển cần thiết cho ngôn ngữ đang hoạt động.

> Để có được các số liệu của hàng `dynamic`, hãy đặt `dictionary.importMode: 'dynamic'` trong `intlayer.config.ts`. Xem thêm [tài liệu tối ưu hóa bundle](https://intlayer.org/vi/doc/concept/bundle-optimization).

## Trải nghiệm lập trình viên

### Client component

**next-intl**

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

### Component server đồng bộ

Các thành phần giao diện chung (navbar, footer, thẻ) thường là các component server được kết xuất dưới dạng con của component client, do đó chúng không thể là `async`.

**next-intl**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

**Intlayer**

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

### Metadata

**next-intl**

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

**Intlayer**

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

## Giữ lại API next-intl, tận dụng hiệu năng Intlayer

Bạn không cần viết lại toàn bộ component để có được kết quả hiệu năng vượt trội như trên. Gói `@intlayer/next-intl` là một adapter tương thích trực tiếp: nó giữ lại `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()` và các dạng số nhiều ICU, đồng thời phân phối chúng từ các từ điển Intlayer được biên dịch bởi trình biên dịch Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

Trong bài đánh giá, bản build tương thích của cùng ứng dụng đã giảm từ **153.6 KB xuống 147.5 KB** mỗi trang, kích thước component giảm từ **21.8 KB xuống 8.1 KB**, và rò rỉ trang giảm từ **~90% xuống 0%** mà không cần sửa đổi mã ứng dụng. Các tệp `messages/{locale}.json` hiện tại của bạn vẫn có thể đóng vai trò là nguồn dữ liệu chuẩn thông qua [plugin đồng bộ JSON](https://intlayer.org/vi/doc/compatibility/next-intl).

Xem thêm [hướng dẫn chuyển đổi next-intl](https://intlayer.org/vi/doc/migration/next-intl) để biết các bước chi tiết.

## Khi nào nên chọn thư viện nào?

- **Chọn next-intl** nếu bạn muốn tiêu chuẩn phổ biến trong cộng đồng Next.js, phụ thuộc nhiều vào ICU MessageFormat, ứng dụng có quy mô vừa và nhỏ, hoặc đang tích hợp với các nền tảng dịch thuật tập trung (Crowdin, Phrase, Lokalise...).
- **Chọn Intlayer** nếu bạn muốn **nội dung theo phạm vi component**, **TypeScript nghiêm ngặt**, **báo lỗi thiếu khóa ngay khi build**, **tự động tree-shaking và lazy loading không cần cấu hình**, component server đồng bộ, và bộ công cụ chỉnh sửa tích hợp sẵn (Visual Editor, CMS, dịch thuật AI, máy chủ MCP).
- **Chọn `@intlayer/next-intl`** nếu bạn đã dùng `next-intl` và muốn tối ưu dung lượng bundle mà không cần viết lại mã nguồn.

## So sánh liên quan

- [i18next vs Intlayer](https://intlayer.org/vi/blog/i18next-vs-intlayer) (cùng bài kiểm tra)
- [Lingui vs Intlayer](https://intlayer.org/vi/blog/lingui-vs-intlayer) (cùng bài kiểm tra)
- [Điểm chuẩn vue-i18n vs Intlayer](https://intlayer.org/vi/blog/vue-i18n-vs-intlayer-benchmark) (cùng bài kiểm tra)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/vi/blog/next-i18next-vs-next-intl-vs-intlayer)
- [next-intl có lỗi thời không?](https://intlayer.org/vi/blog/is-next-intl-outdated)

## Ngôi sao GitHub

Số sao GitHub là một thước đo rõ ràng về mức độ phổ biến, sự tin cậy của cộng đồng và tính bền vững lâu dài của dự án.

[![Biểu đồ lịch sử sao](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Kết luận

`next-intl` là một thư viện ổn định và được duy trì tốt trên Next.js. Tuy nhiên, mô hình danh mục tập trung đặt toàn bộ gánh nặng tối ưu hóa lên vai lập trình viên: cấu hình thông thường làm rò rỉ khoảng 90% nội dung của các trang khác, và bản thân runtime đã tốn thêm +12.6 KB gzip trên mỗi trang.

Intlayer chuyển toàn bộ công việc đó sang trình biên dịch. Từ điển theo component, tải lười theo ngôn ngữ và loại bỏ nội dung không sử dụng trở thành kết quả build tự động. Kết quả trên cùng ứng dụng: **+0.3 KB mỗi trang**, **0% rò rỉ**, component **nhỏ hơn gấp 3 lần**, và chuyển đổi ngôn ngữ **nhanh hơn 2 đến 4 lần** trên TanStack Start.

Toàn bộ dữ liệu thô, ứng dụng thử nghiệm và mã script đều có sẵn tại [kho lưu trữ Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom).

Xem thêm tài liệu ['Tại sao chọn Intlayer?'](https://intlayer.org/vi/doc/why) để biết thêm chi tiết.

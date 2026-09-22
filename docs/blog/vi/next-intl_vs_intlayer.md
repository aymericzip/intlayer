---
createdAt: 2026-09-13
updatedAt: 2026-09-22
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

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl` là thư viện i18n phổ biến nhất cho Next.js. Intlayer là một giải pháp thay thế dựa trên trình biên dịch, có phạm vi theo component. Cả hai đều bản địa hóa ứng dụng App Router. Câu hỏi là chi phí thực tế của mỗi thư viện sau khi ứng dụng được xây dựng.

Bài viết này không phải là hướng dẫn. Đây là một so sánh được hỗ trợ bởi các số liệu từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), một bộ benchmark mã nguồn mở xây dựng cùng một ứng dụng với mỗi thư viện và đo lường những gì trình duyệt thực sự tải xuống và thực thi.

<TOC/>

> **tl;dr**: Trên cùng một ứng dụng Next.js, `next-intl` tăng thêm **+12.6 KB gzip** JavaScript trên mỗi trang, so với **+0.3 KB** của Intlayer. Nếu không tối ưu thêm, `next-intl` gửi kèm **~90% chuỗi ký tự của các trang khác** trên mỗi trang. Đạt mức rò rỉ 0% với `next-intl` yêu cầu phân chia namespace và sử dụng `pick(messages, [...])` trên từng trang. Intlayer đạt 0% theo mặc định vì trình biên dịch phân tách nội dung theo từng component. Nếu bạn muốn giữ API của `next-intl` nhưng nhận đầu ra của Intlayer, adapter `@intlayer/next-intl` đo được **147.5 KB** mỗi trang so với **153.6 KB** của bản gốc.

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

Chọn các chỉ số và thư viện mà bạn quan tâm:

<I18nBenchmark framework="nextjs" vertical/>

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

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Bảng đầy đủ, từng thư viện và từng chiến lược, trong [báo cáo benchmark Next.js](https://intlayer.org/vi/doc/benchmark/nextjs).

### Kết quả trên TanStack Start (`use-intl`)

`use-intl` là lõi độc lập với framework của `next-intl`. Cùng API, cùng định dạng tin nhắn. So sánh nó với `intlayer` trên TanStack Start sẽ loại bỏ các phần đặc thù của Next.js khỏi phép so sánh.

<I18nBenchmark framework="tanstack" vertical/>

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

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Bảng đầy đủ trong [báo cáo benchmark TanStack Start](https://intlayer.org/vi/doc/benchmark/tanstack).

## Tại sao lại có sự khác biệt? Danh mục tập trung vs từ điển biên dịch

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

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

Chi phí của việc không đạt được điều đó tăng lên trên hai trục cùng một lúc, số trang và ngôn ngữ:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

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

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/ClientCounter.tsx"
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

> Hãy nhớ bao gồm namespace `counter` trong các tin nhắn được truyền tới `NextIntlClientProvider` trên mỗi trang hiển thị component này.

</Tab>
<Tab label="Intlayer" value="intlayer">

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

Không có gì cần đăng ký trên trang: component tự mang theo nội dung của riêng nó.

</Tab>
</Tabs>
### Component server đồng bộ

Các thành phần giao diện chung (navbar, footer, thẻ) thường là các component server được kết xuất dưới dạng con của component client, do đó chúng không thể là `async`.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

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

Trang phải gọi `await getTranslations("counter")` và `await getFormatter()`, sau đó truyền kết quả xuống dưới dạng props. Component không còn độc lập nữa.

</Tab>
<Tab label="Intlayer" value="intlayer">

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

</Tab>
</Tabs>
### Metadata

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

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

</Tab>
<Tab label="Intlayer" value="intlayer">

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

</Tab>
</Tabs>

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

<AccordionGroup>
<Accordion header="Chọn next-intl">

Bạn muốn tiêu chuẩn của hệ sinh thái cho Next.js, dựa vào ICU MessageFormat, ứng dụng của bạn có quy mô vừa và nhỏ, hoặc bạn tích hợp với nền tảng dịch thuật (Crowdin, Phrase, Lokalise...) yêu cầu JSON tập trung. Hãy dành thời gian để phân chia danh mục thành các namespace và chọn thông điệp bằng `pick()` cho từng trang nếu hiệu năng là yếu tố quan trọng.

</Accordion>
<Accordion header="Chọn Intlayer">

Bạn muốn **nội dung theo phạm vi component**, **TypeScript chặt chẽ**, **lỗi thiếu khóa trong quá trình build**, **tree-shaking và tải chậm (lazy loading) hoàn toàn tự động**, server component đồng bộ và các công cụ biên tập tích hợp sẵn ([Visual Editor](https://intlayer.org/vi/doc/concept/editor), [CMS](https://intlayer.org/vi/doc/concept/cms), [dịch thuật AI](https://intlayer.org/vi/doc/concept/auto-fill), [máy chủ MCP](https://intlayer.org/vi/doc/mcp-server)). Đặc biệt phù hợp cho các codebase mô-đun lớn và design system.

</Accordion>
<Accordion header="Chọn @intlayer/next-intl">

Bạn đã sử dụng `next-intl` và muốn tối ưu kích thước bundle mà không cần viết lại toàn bộ mã nguồn. [Adapter tương thích](https://intlayer.org/vi/doc/compatibility/next-intl) giữ nguyên các import và tệp `messages/{locale}.json` của bạn làm nguồn chân lý duy nhất. Được đo lường cạnh nhau trong [next-intl vs @intlayer/next-intl](https://intlayer.org/vi/blog/next-intl-vs-intlayer-next-intl).

</Accordion>
</AccordionGroup>

## Câu hỏi thường gặp (FAQ)

<FAQ>

<Question title="next-intl có chậm hơn Intlayer không?">

Không phải ở thời gian render. Sự khác biệt nằm ở lượng dữ liệu gửi về trình duyệt: `next-intl` tiêu tốn **+12.6 KB gzip** runtime trên mỗi trang và trong hầu hết các cấu hình phổ biến sẽ gửi ~90% chuỗi ký tự của các trang khác kèm theo mỗi trang. Thời gian chuyển đổi ngôn ngữ và hydration tương đương nhau trên Next.js (15-18 ms); trên TanStack Start, `use-intl` mất 7-21 ms so với 3-4 ms của Intlayer.

</Question>

<Question title="Tôi có thể đạt 0% rò rỉ nội dung với next-intl không?">

Có thể, với cấu hình `scoped-dynamic`: chia `messages/{locale}.json` thành một namespace cho mỗi route, sau đó dùng `pick(messages, [...])` ở mỗi trang và duy trì sự khớp nối đó khi các component thay đổi. Các hàng `scoped-*` trong benchmark chính là phản ánh công việc này. Intlayer đạt 0% mặc định mà không cần làm gì thêm vì compiler tự động giới hạn phạm vi nội dung theo từng component. Xem thêm [tối ưu hóa bundle](https://intlayer.org/vi/doc/concept/bundle-optimization).

</Question>

<Question title="Tôi có phải viết lại các component để di chuyển không?">

Không. `@intlayer/next-intl` giữ nguyên `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, số nhiều ICU và các navigation helper, đồng thời phục vụ chúng từ các từ điển đã biên dịch. Chỉ cần một dòng plugin trong `next.config.ts`. Chi tiết từng bước trong [hướng dẫn di chuyển next-intl](https://intlayer.org/vi/doc/migration/next-intl).

</Question>

<Question title="Intlayer có hỗ trợ ICU MessageFormat không?">

Hỗ trợ ICU đang được hoàn thiện trên API gốc. Các adapter tương thích (`@intlayer/next-intl`, `@intlayer/use-intl`) đã hỗ trợ đầy đủ ICU: số nhiều, `select`, `selectordinal`, `#` và `{ts, date, long}` đều đi qua bộ phân giải ICU của Intlayer. Xem thêm [định dạng tin nhắn ICU](https://intlayer.org/vi/blog/icu-message-format).

</Question>

<Question title="Tôi có thể giữ lại các tệp messages/{locale}.json không?">

Có. [Plugin đồng bộ JSON](https://intlayer.org/vi/doc/compatibility/next-intl) sẽ đọc chúng, chia các khóa cấp cao nhất thành từ điển và ghi lại các bản dịch vào chính các tệp đó khi CLI hoặc CMS cập nhật. Quy trình làm việc của đội ngũ dịch thuật hoàn toàn không bị ảnh hưởng.

</Question>

</FAQ>

## So sánh liên quan

Cùng bài benchmark, các thư viện khác:

- [i18next vs Intlayer](https://intlayer.org/vi/blog/i18next-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/vi/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/vi/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/vi/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/vi/blog/react-i18next-vs-react-intl-vs-intlayer)

Tìm hiểu sâu hơn về next-intl:

- [next-intl vs @intlayer/next-intl](https://intlayer.org/vi/blog/next-intl-vs-intlayer-next-intl), adapter được đo lường trên cùng một ứng dụng
- [Is next-intl outdated?](https://intlayer.org/vi/blog/is-next-intl-outdated)
- [Using Intlayer with next-intl](https://intlayer.org/vi/blog/intlayer-with-next-intl)
- [How to internationalize a Next.js app with next-intl](https://intlayer.org/vi/blog/nextjs-internationalization-using-next-intl)

Tài liệu tham khảo:

- [Báo cáo benchmark Next.js](https://intlayer.org/vi/doc/benchmark/nextjs) và [báo cáo benchmark TanStack Start](https://intlayer.org/vi/doc/benchmark/tanstack)
- [Adapter tương thích: next-intl](https://intlayer.org/vi/doc/compatibility/next-intl) và [hướng dẫn di chuyển](https://intlayer.org/vi/doc/migration/next-intl)
- [Tối ưu hóa bundle](https://intlayer.org/vi/doc/concept/bundle-optimization) và [Intlayer compiler](https://intlayer.org/vi/doc/compiler)
- [i18n theo component vs i18n tập trung](https://intlayer.org/vi/blog/per-component-vs-centralized-i18n)
- [i18n dựa trên compiler vs khai báo](https://intlayer.org/vi/blog/compiler-vs-declarative-i18n)

## Ngôi sao GitHub

Số sao GitHub là một thước đo rõ ràng về mức độ phổ biến, sự tin cậy của cộng đồng và tính bền vững lâu dài của dự án.

[![Biểu đồ lịch sử sao](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Kết luận

`next-intl` là một thư viện ổn định và được duy trì tốt trên Next.js. Tuy nhiên, mô hình danh mục tập trung đặt toàn bộ gánh nặng tối ưu hóa lên vai lập trình viên: cấu hình thông thường làm rò rỉ khoảng 90% nội dung của các trang khác, và bản thân runtime đã tốn thêm +12.6 KB gzip trên mỗi trang.

Intlayer chuyển toàn bộ công việc đó sang trình biên dịch. Từ điển theo component, tải lười theo ngôn ngữ và loại bỏ nội dung không sử dụng trở thành kết quả build tự động. Kết quả trên cùng ứng dụng: **+0.3 KB mỗi trang**, **0% rò rỉ**, component **nhỏ hơn gấp 3 lần**, và chuyển đổi ngôn ngữ **nhanh hơn 2 đến 4 lần** trên TanStack Start.

Toàn bộ dữ liệu thô, ứng dụng thử nghiệm và mã script đều có sẵn tại [kho lưu trữ Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom).

Xem thêm tài liệu ['Tại sao chọn Intlayer?'](https://intlayer.org/vi/doc/why) để biết thêm chi tiết.

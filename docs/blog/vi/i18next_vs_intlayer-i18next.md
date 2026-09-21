---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next vs @intlayer/i18next: Cùng API, Khác biệt Bundle"
description: "Những thay đổi khi ứng dụng React hoặc Next.js giữ nguyên các lệnh gọi i18next, react-i18next và next-i18next nhưng phục vụ chúng thông qua các adapter @intlayer/i18next. JavaScript mỗi trang, kích thước component, rò rỉ chuỗi và quá trình hydrate được đo trên cùng một mã nguồn, cùng với những gì adapter giữ lại, bỏ qua và không thể thay thế."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Adapter tương thích
  - Di chuyển
  - Đa ngôn ngữ
  - i18n
  - Benchmark
  - Kích thước bundle
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Cùng API, Khác biệt Bundle

`@intlayer/i18next`, `@intlayer/react-i18next` và `@intlayer/next-i18next` là các adapter tương thích. Chúng cung cấp API `i18next` mà mã nguồn của bạn đang sử dụng (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) và phân phối bản dịch từ các từ điển được biên dịch bởi Intlayer. Các component không hề thay đổi. Runtime bên dưới chúng mới là phần thay đổi.

Bài viết này đo lường sự thay thế đó trên cùng một ứng dụng Next.js, được xây dựng một lần với `next-i18next` và một lần với `@intlayer/next-i18next`. Các số liệu đến từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Để so sánh `i18next` và Intlayer dưới dạng thư viện, hãy đọc [i18next vs Intlayer](https://intlayer.org/vi/blog/i18next-vs-intlayer). Bài viết này tập trung vào những gì adapter mang lại khi bạn giữ nguyên mã nguồn của mình.

<TOC/>

> **tl;dr**: Trên cùng một ứng dụng Next.js, việc thay thế `next-i18next` bằng `@intlayer/next-i18next` đã giảm lượng JavaScript trên mỗi trang từ **218.5 KB xuống 150.7 KB** gzip (thiết lập cơ bản) và đánh bại thiết lập `next-i18next` được tối ưu hóa hoàn toàn (163.4 KB) **12.7 KB**. Kích thước component trung bình giảm từ **78.5 KB xuống 9.7 KB**, tỷ lệ rò rỉ chuỗi từ trang khác giảm từ **~90% xuống 0%**, thời gian hydrate từ **15.6 ms xuống 11.3 ms**, và runtime từ **19.7 KB xuống 9.4 KB**. Không có component nào bị sửa đổi; chỉ cần chỉnh sửa duy nhất một tệp provider. Các plugin của `i18next` (backend, trình phát hiện ngôn ngữ) vẫn được chấp nhận nhưng không thực hiện hành động nào: không còn gì để tải hoặc phát hiện trong lúc runtime.

## `@intlayer/i18next` là gì

`i18next` là một runtime. Lệnh `i18n.init({ resources })` hoặc một plugin backend sẽ tải `locales/{lng}/{ns}.json` vào một instance toàn cục; `useTranslation("about")` đăng ký component với instance đó; `t("title")` tra cứu khóa tại thời điểm render. Namespace, lazy loading, danh sách namespace theo từng trang và tính an toàn kiểu dữ liệu (type safety) đều do bạn tự cấu hình và duy trì.

Các adapter giữ nguyên API và thay thế instance:

1. **Import aliasing.** Hàm `createNextI18nPlugin()` từ `@intlayer/next-i18next/plugin` (hoặc `withI18next`) bọc `withIntlayer` và thêm các alias cho Webpack / Turbopack để `next-i18next`, `react-i18next` và `i18next` tự động phân giải tới các gói tương ứng của `@intlayer/*`. Trên Vite, `reactI18nextVitePlugin()` từ `@intlayer/react-i18next/plugin` cũng thực hiện tương tự. Không có lệnh import nào bị đổi tên.
2. **JSON làm nguồn chân lý (source of truth).** Plugin `syncJSON` đọc các tệp `locales/{lng}/{ns}.json` hiện có của bạn với `format: "i18next"` (đảm bảo `{{name}}`, lồng `$t()`, hậu tố `_one` / `_other` và ngữ cảnh được phân tích cú pháp chính xác) và ghi lại các bản dịch khi CLI hoặc CMS cập nhật chúng.
3. **Liên kết điểm gọi (call-site binding).** Quá trình tối ưu hóa của Intlayer viết lại lệnh gọi `useTranslation("about")` thành một lời gọi nhận trực tiếp từ điển `about` theo ngôn ngữ đang hoạt động. Component không còn phải truy cập vào bộ lưu trữ toàn cục.

```tsx fileName="components/About.tsx"
// Mã nguồn của bạn, không đổi
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Những gì trình biên dịch tạo ra (đã rút gọn)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Việc viết lại này chính là yếu tố làm thay đổi kích thước component và tỷ lệ rò rỉ trang trong bảng số liệu bên dưới.

## Những gì adapter giữ lại, bỏ qua và không thay thế

| API `i18next`                                                                   | Với `@intlayer/*`                                                                                              |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Giữ lại. Được liên kết với từ điển `ns` tại thời điểm build; các khóa có kiểu dữ liệu theo nội dung của bạn |
| `t("key", { name })`, `{{interpolation}}`, lồng `$t(key)`                       | ✅ Giữ lại                                                                                                     |
| Số nhiều `key_one` / `key_other`, ngữ cảnh `key_male`, `returnObjects`          | ✅ Giữ lại. Số nhiều được đánh giá bằng `Intl.PluralRules`                                                     |
| `<Trans>` với `components`, thẻ đánh số `<1>...</1>`, `values`                  | ✅ Giữ lại                                                                                                     |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Giữ lại                                                                                                     |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Giữ lại. `changeLanguage` điều khiển locale của Intlayer                                                    |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Giữ lại                                                                                                     |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` gọi hàm `init` của plugin và trả về; backend và detector không cần tải hay phát hiện gì tại runtime |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` bị **bỏ qua** kèm cảnh báo dev; hãy xóa các lệnh import JSON để nhận lợi ích giảm bundle        |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Render một `IntlayerProvider`; prop `i18n` bị bỏ qua. Trên App Router, truyền locale (xem bên dưới)         |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Trả về cấu trúc mong đợi và không tải gì. Giữ lại hoặc xóa đều an toàn                                      |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Giữ lại                                                                                                     |
| `next-i18next.config.js`                                                        | ⚠️ Không đọc. Các ngôn ngữ được lấy từ `intlayer.config.ts`                                                    |
| Lệnh `useTranslation()` đơn lẻ không có namespace                               | ✅ Hoạt động dựa trên từ điển `translation` của toàn bộ tệp (`splitKeys: false`)                               |

## Kết quả đo lường (Benchmark)

### Những gì đã được đo

Bộ kiểm thử [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) xây dựng **cùng một ứng dụng** với từng cấu hình: **10 trang** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 ngôn ngữ** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), các component và nội dung giống hệt nhau. Các trang được đo bằng `en` và `fr`.

`next-i18next` được xây dựng theo bốn chiến lược tải, từ việc import JSON của tất cả ngôn ngữ vào `resources` (`static`) cho đến mỗi route một namespace và tải lười (lazy load) qua backend (`scoped-dynamic`). Adapter được xây dựng trên **cùng các component như thiết lập cơ bản**, chỉ thay đổi `next.config.ts`, `intlayer.config.ts` và tệp provider. Adapter không cần biến thể "scoped": trình biên dịch tự động giới hạn phạm vi nội dung theo từng component.

Đối với mỗi bản build, bộ kiểm thử ghi lại:

- **Lib size**: kích thước gzip của một component rỗng chỉ import thư viện i18n.
- **Page JS**: lượng JavaScript gzip được tải về trên mỗi trang, tính trung bình cho tất cả các trang và ngôn ngữ.
- **Locale leak %**: tỷ lệ chuỗi dịch trong JS tải về thuộc về ngôn ngữ mà người dùng **không** xem.
- **Page leak %**: tỷ lệ chuỗi dịch trong JS tải về thuộc về trang mà người dùng **không** truy cập.
- **Component avg**: kích thước gzip trung bình của từng component khi được biên dịch độc lập.
- **E2E reactivity**: thời gian thực tế giữa việc chọn ngôn ngữ mới và khi `html[lang]` được cập nhật trong DOM (Playwright, 5 lần lặp).
- **Hydration**: thời gian của giai đoạn hydrate trong React.

> Các số liệu dưới đây được lấy từ lượt chạy ngày **2026-09-12** với `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) và `@intlayer/next-i18next` 9.5.1. Ứng dụng kiểm thử được thiết kế nhỏ gọn (vài chục chuỗi mỗi ngôn ngữ), do đó tỷ lệ rò rỉ mô tả một **xu hướng**: chúng sẽ tăng lên cùng với nội dung của bạn trong khi chi phí runtime được giữ cố định.

### Kết quả trên Next.js

| Cấu hình                     | Chiến lược     | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ---------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (không dùng i18n)   | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-i18next`               | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |        16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |        15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |        16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |        15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **11.9 ms** | **10.6 ms** |
| `next-intlayer` (gốc)        | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (gốc)        | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Cách phân tích bảng số liệu**

- **Giảm 68 KB trên mỗi trang so với thiết lập cơ bản.** Cấu hình `resources: { en, fr, ... }` gửi mọi ngôn ngữ và mọi namespace trên từng trang: **218.5 KB**. Bản build adapter cho cùng các component đó chỉ còn **150.7 KB**. Nó cũng vượt qua cấu hình tốt nhất của `next-i18next` (163.4 KB, một namespace cho mỗi route, tải lười) khoảng 12.7 KB, bởi vì riêng runtime của `i18next` đã nặng 19.7 KB so với 9.4 KB.
- **Rò rỉ về 0% mà không cần chạm vào component.** Mọi thiết lập `next-i18next` ngoại trừ cấu hình scoped hoàn toàn đều gửi đi ~90% chuỗi thuộc các trang khác. Hàng `dynamic` thậm chí còn tệ hơn: nó không hề giảm rò rỉ giữa các trang mà lại tăng thêm **50% rò rỉ ngôn ngữ**, do backend theo ngôn ngữ vẫn kéo toàn bộ namespace `translation`. Adapter đạt mức 0% / 0% ngay từ mã nguồn cơ bản.
- **Component: nhỏ hơn 8 lần.** Một component dùng `useTranslation()` được biên dịch độc lập có kích thước trung bình **78.5 KB** khi nhúng `resources` và **26-27 KB** khi dùng backend, do `t` gắn chặt với kho lưu trữ toàn cục. Với adapter, nó chỉ còn trung bình **9.7 KB**.
- **Hydration và chuyển đổi ngôn ngữ nhanh hơn.** Thời gian hydrate giảm từ 15.6 ms xuống **11.3 ms** (và từ 27.7 ms ở thiết lập `dynamic`, nơi việc nạp backend nằm trên luồng xử lý quan trọng). Chuyển đổi ngôn ngữ rút ngắn từ 15-16 ms xuống **11-12 ms**.
- **Adapter không phải là runtime gốc.** `next-intlayer` chỉ nặng **141.3 KB**, thêm vỏn vẹn +0.3 KB so với ứng dụng gốc không có i18n. Adapter mang theo toàn bộ giao diện API của `i18next` (cú pháp nội suy, giải quyết hậu tố số nhiều và ngữ cảnh, phân tích thẻ `<Trans>`) trên nền tảng lõi Intlayer: 9.4 KB và +9.4 KB mỗi trang so với bản gốc. Đây là giải pháp cầu nối, không phải đích đến cuối cùng.

> Adapter `react-i18next` trên Vite / TanStack Start không nằm trong đợt thử nghiệm này. Số liệu cơ sở của `react-i18next` trên TanStack Start có tại [i18next vs Intlayer](https://intlayer.org/vi/blog/i18next-vs-intlayer): 127-184 KB mỗi trang và mất 123-185 ms khi đổi ngôn ngữ với backend tải lười.

## Lý do các con số có sự thay đổi

Không có gì trong thư mục `components/` thay đổi, sự cải thiện đến từ nơi mà `useTranslation` được liên kết.

**Với `i18next`**, liên kết hướng tới instance toàn cục. Bất cứ thứ gì được tải vào đó (tất cả các ngôn ngữ trong `static`, toàn bộ namespace của ngôn ngữ đang hoạt động trong `dynamic`) đều có thể được truy cập từ mọi component gọi `useTranslation()`. Trình đóng gói không thể chia nhỏ hơn những gì instance đang nắm giữ, và runtime không thể biết trước component sẽ yêu cầu những khóa nào.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # chuỗi của tất cả các trang
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

**Với `@intlayer/next-i18next`**, liên kết hướng tới từ điển. `syncJSON` chuyển đổi từng tệp namespace thành một từ điển; bước tối ưu hóa sẽ cung cấp cho component đúng từ điển mà nó cần, dưới dạng một import mà trình đóng gói có thể theo dõi và chia nhỏ theo từng trang và từng ngôn ngữ.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # không đổi, vẫn là nguồn dữ liệu chính
│   └── fr/translation.json
├── .intlayer/                        # được tạo tự động: một từ điển cho mỗi namespace, theo từng ngôn ngữ
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← không đổi
```

Tệp `i18n/i18n.ts` và lệnh import `resources` trở thành mã thừa (dead code). Đó chính là nguồn gốc của 68 KB tiết kiệm được.

## Di chuyển trong 3 bước

<Steps>
<Step number={1} title="Cài đặt">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Lệnh này phát hiện `i18next` / `react-i18next` / `next-i18next`, cài đặt `intlayer`, gói framework tương ứng (`next-intlayer` hoặc `react-intlayer`), adapter `@intlayer/*` thích hợp cùng `@intlayer/sync-json-plugin`, đồng thời tạo sẵn cấu hình trong `intlayer.config.ts`. Hãy giữ lại các gói gốc: chúng đóng vai trò là peer dependencies và cung cấp các type cần thiết.

</Step>
<Step number={2} title="Trỏ Intlayer tới các tệp ngôn ngữ của bạn">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // Cú pháp i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Một tệp cho mỗi namespace: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Nếu bạn có một tệp `translation.json` duy nhất cho mỗi ngôn ngữ (namespace mặc định của i18next), hãy đặt `splitKeys: false` để toàn bộ tệp được giữ nguyên thành một từ điển và lệnh gọi `useTranslation()` không đối số vẫn hoạt động bình thường.

</Step>
<Step number={3} title="Thêm plugin">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

Trên App Router, các client component nhận ngôn ngữ từ phân đoạn `[locale]`. `I18nextProvider` của adapter không nhận giá trị locale, do đó chỉ cần thay thế một lần duy nhất trong tệp provider của bạn:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Tất cả các component bên dưới nó vẫn gọi `useTranslation()` như bình thường.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` bọc `vite-intlayer` và tạo alias cho `react-i18next` cùng `i18next`. Đối với dự án không dùng React, plugin `i18nextVitePlugin()` từ `@intlayer/i18next/plugin` sẽ tạo alias cho riêng `i18next`.

</Tab>
</Tabs>

</Step>
</Steps>

### Những gì bạn có thể xóa sau đó

| Tệp / mẫu mã                                           | Lý do                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` và các lệnh import JSON   | Bị adapter bỏ qua. Đây là nơi 68 KB dư thừa từng tồn tại                            |
| `i18next-http-backend`, `i18next-resources-to-backend` | Không còn gì cần tải tại runtime                                                    |
| `i18next-browser-languagedetector`                     | Phát hiện ngôn ngữ được xử lý bởi định tuyến Intlayer (tiền tố URL, cookie, header) |
| `serverSideTranslations()` trong `getStaticProps`      | Trả về cấu trúc trống; vô hại, nhưng không cần thiết                                |
| `next-i18next.config.js`                               | Không được đọc. Ngôn ngữ được khai báo trong `intlayer.config.ts`                   |
| Danh sách `ns: [...]` theo từng trang                  | Trình biên dịch tự động chọn namespace cho từng component                           |

### Những lợi ích nhận được ngoài việc giảm dung lượng

- **Khóa có kiểm tra kiểu dữ liệu (Typed keys).** `useTranslation("about")` được kiểm tra kiểu dựa trên từ điển `about` đã biên dịch; gọi `t("does.not.exist")` sẽ sinh lỗi TypeScript thay vì chỉ trả về một chuỗi khóa.
- **`npx intlayer test`** sẽ báo lỗi CI nếu thiếu khóa ở bất kỳ ngôn ngữ nào. **`npx intlayer fill`** tự động dịch các khóa còn thiếu bằng khóa dịch vụ của bạn (OpenAI, Anthropic, Mistral, Gemini...) và ghi lại vào `locales/{lng}/{ns}.json`.
- **Trình chỉnh sửa trực quan (Visual Editor) và CMS** hoạt động trực tiếp trên cùng tệp JSON, cho phép người dịch chỉnh sửa qua giao diện UI và tệp được cập nhật ngay lập tức.
- **Chuyển đổi từng bước sang `.content.ts`.** Bất kỳ component nào cũng có thể chuyển từ `useTranslation("about")` sang `useIntlayer("about")` kèm theo tệp nội dung đặt cùng thư mục. Các từ điển JSON và `.content.ts` có thể cùng tồn tại song song.

## Những hạn chế cần lưu ý trước khi bắt đầu

- **Backend và detector không hoạt động.** Lệnh gọi `i18n.use(HttpBackend)` chỉ chạy hàm `init` của plugin và không làm gì thêm. Nếu ứng dụng của bạn dựa vào việc tải bản dịch từ một CMS tại runtime, quy trình đó sẽ không còn khả dụng; hãy dùng CMS của Intlayer hoặc các lệnh `intlayer pull` / `push` thay thế.
- **`resources` bị bỏ qua chứ không được gộp vào.** Khác với một số adapter khác, `@intlayer/i18next` không dùng `resources` dạng inline làm phương án dự phòng (fallback). Mọi khóa đều phải tồn tại trong các từ điển được đồng bộ, điều mà `intlayer test` sẽ kiểm tra.
- **App Router yêu cầu chỉnh sửa provider.** Chỉ một tệp duy nhất như hướng dẫn ở trên. Với Pages Router sử dụng `appWithTranslation`, bạn không cần thay đổi gì.
- **`next-i18next.config.js` không được đọc.** Các tùy chọn như `localePath`, `fallbackLng`, `reloadOnPrerender` không có tác dụng; cấu hình ngôn ngữ và fallback đều nằm ở `intlayer.config.ts`.
- **Adapter vẫn tốn một phần dung lượng.** Nó bổ sung 9.4 KB runtime và +9.4 KB mỗi trang so với `next-intlayer`. Khi tất cả các component đã chuyển sang `useIntlayer`, bạn có thể gỡ bỏ adapter này.

## Khi nào nên sử dụng giải pháp nào?

- **Tiếp tục dùng `i18next`** nếu ứng dụng của bạn phụ thuộc hoàn toàn vào các backend runtime (bản dịch do CMS cấp phát ngay lúc có request), vào hệ sinh thái plugin rộng lớn, hoặc trên các nền tảng không phải React mà adapter chưa hỗ trợ.
- **Sử dụng `@intlayer/*`** nếu bạn đang dùng `react-i18next` / `next-i18next` và muốn giảm 68 KB dung lượng, component nhỏ hơn 8 lần, 0% rò rỉ chuỗi, khóa có kiểu dữ liệu an toàn và kiểm tra CI mà không cần viết lại toàn bộ mã nguồn. Đây là bước đệm tối ưu cho một codebase `i18next` hiện hữu.
- **Dùng trực tiếp bản gốc (`next-intlayer` / `react-intlayer`)** cho các dự án mới, hoặc sau khi adapter đã hoàn thành vai trò chuyển tiếp của nó. Đây là lựa chọn nhẹ nhất (5.5 KB, +0.3 KB mỗi trang), hỗ trợ Server Components đồng bộ và các tệp `.content.ts` đặt cùng component.

## Các bài so sánh liên quan

- [i18next vs Intlayer](https://intlayer.org/vi/blog/i18next-vs-intlayer) (so sánh hai thư viện, cùng bài benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/vi/blog/next-intl-vs-intlayer-next-intl) (cùng chuỗi bài adapter)
- [Lingui vs @intlayer/lingui](https://intlayer.org/vi/blog/lingui-vs-intlayer-lingui) (cùng chuỗi bài adapter)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/vi/blog/vue-i18n-vs-intlayer-vue-i18n) (cùng chuỗi bài adapter)
- Hướng dẫn chuyển đổi: [i18next](https://intlayer.org/vi/doc/migration/i18next), [react-i18next](https://intlayer.org/vi/doc/migration/react-i18next), [next-i18next](https://intlayer.org/vi/doc/migration/next-i18next)
- Tài liệu kỹ thuật adapter tương thích: [i18next](https://intlayer.org/vi/doc/compatibility/i18next), [react-i18next](https://intlayer.org/vi/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/vi/doc/compatibility/next-i18next)

## Kết luận

`i18next` là runtime nặng nhất trong thử nghiệm benchmark này, và các adapter giúp loại bỏ phần lớn gánh nặng đó mà không bắt buộc bạn phải từ bỏ API quen thuộc. Trên cùng một ứng dụng Next.js, điều này giúp **giảm 68 KB mỗi trang** so với thiết lập cơ bản, **tiết kiệm thêm 12.7 KB** so với bản tối ưu thủ công tốt nhất, **component nhỏ hơn 8 lần**, **0% rò rỉ chuỗi** và **nhanh hơn 4 ms khi hydrate**, chỉ bằng một tệp cấu hình, một dòng khai báo plugin và chỉnh sửa một tệp provider. Các backend và detector trở thành no-op, `resources` bị bỏ qua thay vì gộp chung, và runtime gốc `next-intlayer` thậm chí còn nhẹ hơn 9 KB nữa.

Mọi dữ liệu thô, ứng dụng kiểm thử và mã kịch bản đều có sẵn trong [kho lưu trữ Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Bạn có thể tự mình kiểm chứng.

Tham khảo thêm tài liệu ['Tại sao chọn Intlayer?'](https://intlayer.org/vi/doc/why) để biết thêm chi tiết.

---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Cùng API, Bundle Khác Nhau"
description: Những thay đổi khi các import next-intl của một ứng dụng Next.js được phục vụ bởi compat adapter @intlayer/next-intl. Kích thước bundle, rò rỉ, kích thước component và hydration được đo lường trên cùng một code, cộng với những gì adapter giữ lại, bỏ qua và không thể thay thế.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Cùng API, Bundle Khác Nhau

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` là một compat adapter: nó cung cấp API của `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...) và phục vụ nó từ các từ điển được biên dịch bởi Intlayer. Mã ứng dụng không thay đổi. Bundle thì có.

Bài viết này so sánh hai cái trên cùng một ứng dụng Next.js, được xây dựng một lần với `next-intl` và một lần với adapter. Các con số này đến từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), một bộ mã nguồn mở ghi lại những gì trình duyệt thực sự tải xuống. Nếu bạn muốn so sánh `next-intl` vs Intlayer dưới dạng các thư viện, hãy đọc [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer). Cái này là về những gì adapter thay đổi khi bạn giữ nguyên các component của mình.

<TOC/>

> **tl;dr**: Trên cùng một ứng dụng Next.js, việc thay thế `next-intl` bằng `@intlayer/next-intl` đã giảm JavaScript trên mỗi trang từ **153.6 KB xuống 147.5 KB** gzip, thành phần trung bình từ **21.8 KB xuống 8.1 KB**, rò rỉ chuỗi trang nước ngoài từ **~90% xuống 0%**, và hydration từ **14.7 ms xuống 12.8 ms**, mà không cần chỉnh sửa thành phần nào. Trên TanStack Start, equivalent `use-intl` (`@intlayer/use-intl`) đã giảm các thành phần từ **76-87 KB xuống 9-11 KB** và chuyển đổi locale từ **7-21 ms xuống 4-9 ms**. Adapter tiêu tốn **8.0 KB** runtime so với **14.7 KB** cho `next-intl` và **5.5 KB** cho `next-intlayer` gốc. Navigation và middleware được triển khai lại trên cấu hình định tuyến của Intlayer; `pathnames` được địa phương hóa là tính năng duy nhất không được chuyển qua.

## `@intlayer/next-intl` là gì

`next-intl` là một runtime: `getRequestConfig` tải một `messages/{locale}.json` cho mỗi request, `NextIntlClientProvider` gửi nó đến client, và `useTranslations("about")` đọc các keys từ object đó tại thời điểm render. Mọi tối ưu hóa (namespaces, `pick(messages, [...])` cho mỗi page, lazy loading) đều phải được bạn viết.

`@intlayer/next-intl` giữ lại phần đầu và phần cuối của chuỗi đó và thay thế phần giữa. Các components của bạn vẫn gọi `useTranslations("about")`; những gì họ nhận được đến từ một dictionary Intlayer được biên dịch tại build time, được phạm vi hóa cho component đó, chỉ trong locale hoạt động.

Ba cơ chế làm cho nó hoạt động:

1. **Import aliasing.** `createNextIntlPlugin()` từ `@intlayer/next-intl/plugin` bao bọc `withIntlayer` và thêm các alias Webpack / Turbopack để `next-intl`, `next-intl/server`, `next-intl/navigation` và `next-intl/middleware` được phân giải thành `@intlayer/next-intl`. Không có import nào trong codebase của bạn bị đổi tên.
2. **JSON as source of truth.** Plugin `syncJSON` đọc `messages/{locale}.json` hiện tại của bạn, tách các khóa cấp cao nhất thành một dictionary cho mỗi namespace, và ghi lại các bản dịch vào cùng các tệp khi CLI hoặc CMS cập nhật chúng. Quy trình làm việc của các dịch giả của bạn không bị thay đổi.
3. **Call-site binding.** Lần pass tối ưu hóa Intlayer (Babel hoặc SWC) viết lại `useTranslations("about")` thành một lệnh gọi nhận trực tiếp dictionary `about`. Component không còn tiếp cận một cây message toàn cục; nó tiếp cận nội dung của riêng nó.

```tsx fileName="app/[locale]/about/page.tsx"
// Mã của bạn, không thay đổi
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Những gì trình biên dịch phát ra (đơn giản hóa)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Đó là lý do tại sao các cột component-size và page-leakage bên dưới thay đổi: một trang chỉ lấy các từ điển của các component mà nó render, và chỉ ở locale đang được phục vụ.

## Những gì adapter giữ lại, bỏ qua và không thay thế

| `next-intl` API                                                      | Với `@intlayer/next-intl`                                                                                                                           |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Được giữ lại. Được ràng buộc với từ điển `ns` tại thời điểm build. Các khóa được gõ dựa trên nội dung của bạn.                                   |
| `getTranslations({ locale, namespace })`                             | ✅ Được giữ lại                                                                                                                                     |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Được giữ lại. ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}` chạy qua Intlayer's ICU resolver                                   |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Được giữ lại                                                                                                                                     |
| `useFormatter()`                                                     | ✅ Được giữ lại. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` kết nối với native `Intl`                                            |
| `NextIntlClientProvider`                                             | ✅ Được giữ lại. Các props `messages`, `timeZone` và `now` **được chấp nhận nhưng bị bỏ qua** (một cảnh báo cho dev sẽ thông báo cho bạn)           |
| `getMessages()`                                                      | ✅ Được giữ lại để tương thích; không còn cần thiết                                                                                                 |
| `getRequestConfig()` trong `src/i18n.ts`                             | ⚠️ Không cần thiết. Các từ điển được biên dịch tại thời điểm build; không có việc tải message cho từng request                                      |
| `defineRouting()`                                                    | ✅ Được giữ lại. Các trường bị bỏ qua (`locales`, `defaultLocale`, `localePrefix`) được đọc từ `intlayer.config.ts`                                 |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Được giữ lại. Được triển khai lại trên cấu hình định tuyến của Intlayer; tham số `routing` được chấp nhận nhưng bị bỏ qua                        |
| `pathnames` (tên route được bản địa hóa)                             | ❌ Được chấp nhận để gõ, **không được nội suy**. Giữ tên đường dẫn đơn giản hoặc chuyển ánh xạ đó sang `rewrite` của Intlayer                       |
| `createMiddleware()`                                                 | ✅ Được giữ lại. Trả về proxy của Intlayer; đặt cookie `NEXT_LOCALE` để `useLocale()` và bộ chuyển đổi của bạn tiếp tục hoạt động                   |
| `NEXT_LOCALE` cookie                                                 | ✅ Được đọc theo mặc định (trừ khi bạn tự cấu hình `routing.storage`)                                                                               |
| Bare `useTranslations()` với không có namespace                      | ⚠️ Hoạt động, nhưng call site không được ràng buộc: nó được giải quyết thông qua registry runtime. Hãy truyền một namespace để có được bundle gains |

## Benchmark

### Những gì được đo lường

Suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) xây dựng **cùng một ứng dụng** với mỗi setup: **10 trang** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), các component giống hệt nhau và nội dung giống hệt nhau. Các trang được đo lường trong `en` và `fr`.

`next-intl` được xây dựng với bốn chiến lược tải, từ cách thiết lập ngây thơ (`messages/{locale}.json` tải toàn bộ) đến cách tối ưu nhất (một namespace cho mỗi route + `pick()` cho mỗi trang). Adapter được xây dựng trên **các component giống như cách thiết lập ngây thơ**, chỉ thay đổi `next.config.ts` và `intlayer.config.ts`. Nó không có biến thể "scoped": compiler scopes content cho mỗi component, vì vậy các hàng `static` và `dynamic` của nó đã được scoped.

Đối với mỗi build, suite ghi lại:

- **Lib size**: gzip size của một component trống chỉ import thư viện i18n. Chi phí cố định của runtime.
- **Page JS**: gzip JavaScript được tải xuống cho mỗi trang, trung bình trên tất cả các trang và locale.
- **Locale leak %**: tỷ lệ các chuỗi dịch được tìm thấy trong JS đã tải xuống mà người dùng **không** xem.
- **Page leak %**: tỷ lệ các chuỗi dịch được tìm thấy trong JS đã tải xuống mà người dùng **không** ở trên trang đó.
- **Component avg**: kích thước gzip trung bình của mỗi component được biên dịch riêng lẻ. Cho thấy bao nhiêu runtime i18n và catalog mà một component đơn lẻ kéo theo.
- **E2E reactivity**: thời gian tính theo giờ tường giữa việc chọn một locale mới và `html[lang]` cập nhật trong DOM (Playwright, 5 lần lặp).
- **Hydration**: thời lượng pha hydration của React.

> Các số liệu dưới đây đến từ lần chạy ngày **2026-09-12** với `next-intl` / `use-intl` 4.14.2 và `@intlayer/*` 9.5.1. Ứng dụng kiểm tra được thiết kế có ý định nhỏ (một vài chục chuỗi cho mỗi locale), vì vậy tỷ lệ phần trăm rò rỉ mô tả một **mô hình**: chúng tăng theo nội dung của bạn trong khi chi phí runtime vẫn cố định.

### Kết quả trên Next.js

Chọn các chỉ số và thư viện mà bạn quan tâm:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Cách đọc nó**

- **Cùng các component, ít hơn 6 KB trên mỗi trang.** Phiên bản build của adapter trên ứng dụng naive đạt **147.5 KB**, thấp hơn mọi cấu hình `next-intl` bao gồm cấu hình được tối ưu hóa hoàn toàn (153.6 KB). Bản thân runtime là sự khác biệt: 8.0 KB so với 14.7 KB, được trả trên mỗi trang.
- **Rò rỉ xuống 0% mà không cần chạm vào component.** Cài đặt `next-intl` ngây thơ vận chuyển ~90% các chuỗi trang nước ngoài trên mỗi trang. Để đạt 0% với `next-intl` có nghĩa là các cài đặt `scoped-*`: một namespace cho mỗi route, và `pick(messages, [...])` trên mỗi trang. Adapter đạt 0% từ mã ngây thơ vì quá trình tối ưu hóa liên kết mỗi `useTranslations("ns")` với từ điển riêng của nó.
- **Components co lại 2.7x.** Một component biên dịch độc lập trung bình **21.8 KB** với `next-intl` (nó đạt đến provider và cây message) và **8.1 KB** với adapter. Trong cài đặt `scoped-static` của `next-intl`, con số đó _tăng lên_ thành 80 KB, vì tệp namespace của mỗi route trở nên có thể tiếp cận từ trang chọn nó.
- **Hydration nhanh hơn 2 ms** (12.8 vs 14.7 ms): không có message object để deserialize từ RSC payload trước khi React có thể hydrate.
- **Adapter không phải là native runtime.** `next-intlayer` nằm ở **141.3 KB**, +0.3 KB so với base app, với 5.5 KB runtime. Adapter mang API surface của `next-intl` (`useFormatter`, `t.rich`, ICU resolver) trên top của core của Intlayer, do đó 8.0 KB và +6 KB trên mỗi page. Đó là cây cầu, không phải đích đến.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Bảng đầy đủ, từng thư viện và từng chiến lược, trong [báo cáo benchmark Next.js](https://intlayer.org/vi/doc/benchmark/nextjs).

### Kết quả trên TanStack Start (`use-intl`)

`use-intl` là core framework-agnostic của `next-intl`. Adapter của nó, `@intlayer/use-intl`, tuân theo cùng design với Vite plugin (`@intlayer/use-intl/plugin`).

| Thiết lập                | Chiến lược     | Kích thước Lib (gz) | Page JS trung bình (gz) | Rò rỉ Locale | Rò rỉ Page | Component trung bình (gz) | E2E reactivity |   Hydration |
| ------------------------ | -------------- | ------------------: | ----------------------: | -----------: | ---------: | ------------------------: | -------------: | ----------: |
| **base** (không i18n)    | -              |              0.0 KB |                111.0 KB |         0.0% |       0.0% |                    0.7 KB |         8.1 ms |     21.6 ms |
| `use-intl`               | static         |             14.1 KB |                179.8 KB |        50.0% |      89.8% |                   76.0 KB |         6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |             14.1 KB |                119.4 KB |         0.0% |      89.8% |                   75.9 KB |         7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |             14.1 KB |                128.7 KB |         0.0% |       0.0% |                   87.1 KB |        20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |             14.1 KB |                128.7 KB |         0.0% |       0.0% |                   87.1 KB |        13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |          **7.3 KB** |                135.8 KB |        49.7% |   **0.0%** |               **10.9 KB** |     **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |          **7.3 KB** |            **129.7 KB** |     **0.0%** |   **0.0%** |                **9.3 KB** |     **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |              5.0 KB |                125.8 KB |        50.0% |       0.0% |                    8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |              5.0 KB |                118.6 KB |         0.0% |       0.0% |                    6.3 KB |         3.6 ms |     14.1 ms |

**Cách đọc bảng**

- **Bytes trên mỗi trang tương đương với `use-intl` được tối ưu hóa.** `@intlayer/use-intl` ở chế độ `dynamic` (129.7 KB) nằm trong 1 KB của `use-intl`'s `scoped-dynamic` (128.7 KB), và cao hơn 10 KB so với `use-intl`'s `dynamic` đơn giản (119.4 KB). Hàng `dynamic` đơn giản đó vẫn rò rỉ 90% chuỗi từ các trang khác; byte count thấp vì nội dung ứng dụng kiểm tra nhỏ. Adapter's 0% là những gì giữ nguyên khi nội dung phát triển.
- **Các component nhỏ hơn 7-9 lần.** Các component `use-intl` trung bình **76-87 KB** trong mọi chiến lược, bởi vì `useTranslations` được liên kết với toàn bộ đối tượng message của provider. Adapter trung bình **9-11 KB**.
- **Chuyển đổi locale nhanh hơn.** Các setup `use-intl` được tối ưu hóa mất **13-21 ms** để cập nhật `html[lang]`; adapter mất **4-9 ms**. Ít component hơn được re-render, và không có gì được lấy lại từ một message tree.
- **`static` giữ lại mọi locale.** Hàng `static` của adapter cho thấy 49.7% rò rỉ locale, giống như native Intlayer ở chế độ `static`: tất cả locale được bundled, chỉ các từ điển của trang được bundled. Một dòng config (`importMode: 'dynamic'`) sẽ loại bỏ nó.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Bảng đầy đủ trong [báo cáo benchmark TanStack Start](https://intlayer.org/vi/doc/benchmark/tanstack).

## Tại sao các con số thay đổi

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Không có gì trong component thay đổi, vì vậy các lợi ích đều đến từ những gì `useTranslations` được liên kết tới.

**Với `next-intl`**, ràng buộc là provider. `NextIntlClientProvider` nhận toàn bộ object `messages` cho locale; mỗi `useTranslations("about")` đọc từ nó. Bundler thấy một component import một hook đọc một context, và không thể biết rằng chỉ có branch `about` được sử dụng. Các routes dưới đây đều chia sẻ cùng một object message, vì vậy cột page-leak đọc ~90% cho đến khi bạn tự chia nhỏ file, và sự lãng phí tăng lên theo cả hai chiều cùng lúc: số trang và số ngôn ngữ:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # mọi namespace, mọi page
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**Với `@intlayer/next-intl`**, binding là dictionary. `syncJSON` chuyển `messages/en.json` thành một dictionary cho mỗi key cấp cao; compiler giải quyết component nào gọi `useTranslations("about")` và gửi nó `about` trực tiếp, trong locale hiện hoạt, dưới dạng một import mà bundler có thể trace và split.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                        # generated: one dictionary per namespace, per locale
└── src
    ├── middleware.ts                 # createMiddleware() giờ trả về proxy của Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (không có props messages)
        └── about/page.tsx            # useTranslations("about")  ← không thay đổi
```

`src/i18n.ts` và props `messages` biến mất. Mọi thứ khác giống hệt.

## Migration trong ba bước

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

Lệnh phát hiện `next-intl` và cài đặt `intlayer`, `next-intlayer`, `@intlayer/next-intl` và `@intlayer/sync-json-plugin`. Giữ `next-intl` được cài đặt: nó là một peer dependency của adapter và cung cấp các types.

</Step>
<Step number={2} title="Chỉ định Intlayer đến messages của bạn">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" đóng gói mọi locale; "dynamic" tải locale hoạt động theo yêu cầu
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU placeholders: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` vẫn ở vị trí của nó. Mỗi khóa cấp cao nhất trở thành một dictionary; `useTranslations("about")` ánh xạ tới dictionary `about`.

</Step>
<Step number={3} title="Bao bọc next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` kết hợp `withIntlayer` (xem nội dung, biên dịch từ điển, bước tối ưu hóa) và các alias `next-intl` → `@intlayer/next-intl` cho Webpack và Turbopack. Build, và các số trong bảng trên là của bạn.

</Step>
</Steps>

### Những gì bạn có thể xóa sau đó

| Tệp / pattern                                | Lý do                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `getRequestConfig` in `src/i18n.ts`          | Không tải tin nhắn theo yêu cầu. Chỉ giữ tệp nếu nó cũng xuất `createNavigation` helpers |
| `messages={...}` on `NextIntlClientProvider` | Adapter đọc output được biên dịch; prop bị bỏ qua và ghi log cảnh báo trong development  |
| `await getMessages()` in layouts             | Lý do tương tự                                                                           |
| Per-page `pick(messages, [...])`             | Compiler thực hiện picking, per component                                                |

### Những gì bạn nhận được ngoài bytes

- **Typed keys.** `useTranslations("about")` được gõ chống lại compiled `about` dictionary. `t("does.not.exist")` là lỗi TypeScript, không phải fallback runtime.
- **`npx intlayer test`** làm CI thất bại khi một locale thiếu một khóa. **`npx intlayer fill`** dịch các khóa bị thiếu bằng nhà cung cấp của bạn lựa chọn (OpenAI, Anthropic, Mistral, Gemini...) sử dụng khóa của riêng bạn, và ghi kết quả trở lại `messages/{locale}.json`.
- **Visual Editor và CMS** làm việc trên các từ điển giống nhau, vì vậy những người không phải là nhà phát triển có thể chỉnh sửa `messages/fr.json` thông qua một giao diện người dùng và tệp được cập nhật.
- **Di chuyển từng phần sang `.content.ts`.** Bất kỳ component nào cũng có thể chuyển từ `useTranslations("about")` sang `useIntlayer("about")` với một tệp nội dung đồng vị trí, từng cái một. Các từ điển JSON và `.content.ts` tồn tại cùng nhau và hợp nhất.

## Những giới hạn cần biết trước khi bạn bắt đầu

<AccordionGroup>
<Accordion header="Cấu hình định tuyến chuyển sang intlayer.config.ts">

`createNavigation(routing)` và `createMiddleware(routing)` giữ nguyên cú pháp nhưng bỏ qua đối số: ngôn ngữ, ngôn ngữ mặc định và chiến lược tiền tố đều lấy từ cấu hình `routing` của Intlayer. Nếu bạn sử dụng `pathnames` đã bản địa hóa của `next-intl` (`/about` sang `/a-propos`), adapter sẽ không nội suy chúng; `routing.rewrite` của Intlayer hỗ trợ trường hợp này nhưng là một cấu hình riêng.

</Accordion>
<Accordion header="useTranslations() không có namespace sẽ không được liên kết">

Quá trình tối ưu hóa cần một namespace tĩnh để biết cần import từ điển nào. Một lệnh gọi không tham số vẫn hoạt động thông qua một registry lúc runtime tham chiếu đến mọi từ điển, nhưng đó chính xác là sự rò rỉ mà bạn đang cố loại bỏ. Hãy truyền namespace.

</Accordion>
<Accordion header="Adapter không hoàn toàn miễn phí">

8.0 KB runtime so với 5.5 KB của `next-intlayer`, và tăng thêm +6-7 KB mỗi trang so với bản build gốc. Đây là chi phí cho bề mặt API của `next-intl`. Khi mọi component đã được chuyển sang `useIntlayer`, hãy gỡ bỏ adapter.

</Accordion>
<Accordion header="messages, timeZone và now trên provider bị bỏ qua">

Các trình định dạng được hỗ trợ bởi `Intl` gốc và chỉ có ngôn ngữ mới ảnh hưởng đến kết quả. Nếu bạn phụ thuộc vào múi giờ bắt buộc hoặc một giá trị `now` cố định cho ngày tháng ổn định khi hydrate, hãy xử lý tại nơi gọi. Xem [định dạng ngày, giờ và số](https://intlayer.org/vi/blog/date-time-number-formatting-locales).

</Accordion>
</AccordionGroup>

## Khi nào nên sử dụng cái nào?

<AccordionGroup>
<Accordion header="Ở lại với next-intl">

Ứng dụng của bạn nhỏ, kích thước gói không phải mối bận tâm và nhóm của bạn thoải mái quản lý thủ công namespace và `pick()` trên từng trang.

</Accordion>
<Accordion header="Sử dụng @intlayer/next-intl">

Bạn đang dùng `next-intl` và muốn giảm kích thước bundle, hạn chế rò rỉ, tăng tốc hydrate, khóa có kiểu dữ liệu rõ ràng và bộ công cụ CLI / CMS mà không cần viết lại mã. Đây là điểm khởi đầu được khuyến nghị cho bất kỳ dự án `next-intl` nào.

</Accordion>
<Accordion header="Chuyển sang bản gốc (next-intlayer)">

Dành cho các dự án mới, hoặc khi adapter đã hoàn thành nhiệm vụ chuyển tiếp. Đây là giải pháp nhẹ nhất trong cả ba (5.5 KB, +0.3 KB mỗi trang) và mở khóa các server component đồng bộ, tệp `.content.ts` theo từng component cùng đầy đủ tính năng. Bắt đầu với [Intlayer với Next.js](https://intlayer.org/vi/doc/environment/nextjs).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Mã ứng dụng của tôi có thực sự không bị xáo trộn không?">

Trên Next.js, câu trả lời là có đối với các component: bản build benchmark chỉ sửa đổi `next.config.ts` và `intlayer.config.ts`. `getRequestConfig` trong `src/i18n.ts`, prop `messages` trên provider và các lệnh gọi `pick()` theo trang trở thành mã chết mà bạn có thể xóa sau đó.

</Question>

<Question title="Điều gì xảy ra với các thông điệp ICU?">

Chúng vẫn hoạt động bình thường. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` và `{ts, date, long}` đều được xử lý bởi bộ giải quyết ICU của Intlayer. Xem [định dạng thông điệp ICU](https://intlayer.org/vi/blog/icu-message-format).

</Question>

<Question title="Tại sao adapter lại nặng hơn next-intlayer gốc?">

Nó mang theo bề mặt API của `next-intl` bên trên lõi Intlayer: `useFormatter`, `t.rich`, bộ giải quyết ICU, các helper điều hướng. Điều đó tốn 8.0 KB so với 5.5 KB, và thêm +6 KB mỗi trang. Đó là chiếc cầu nối, không phải đích đến.

</Question>

<Question title="Tôi có thể di chuyển từng component một không?">

Có. Bất kỳ component nào cũng có thể chuyển từ `useTranslations("about")` sang `useIntlayer("about")` với tệp `.content.ts` đặt cùng vị trí. Các từ điển JSON và `.content.ts` cùng tồn tại và hợp nhất liền mạch.

</Question>

<Question title="Các đường dẫn đã bản địa hóa (pathnames) có hoạt động không?">

Không hoạt động thông qua `pathnames` của `next-intl`: adapter chấp nhận nó để kiểm tra kiểu nhưng không nội suy. Thay vào đó, hãy sử dụng `routing.rewrite` của Intlayer.

</Question>

</FAQ>

## Các so sánh liên quan

Cùng loạt adapter:

- [i18next vs @intlayer/i18next](https://intlayer.org/vi/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/vi/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/vi/blog/vue-i18n-vs-intlayer-vue-i18n)

So sánh trực tiếp các thư viện:

- [next-intl vs Intlayer](https://intlayer.org/vi/blog/next-intl-vs-intlayer), cùng benchmark
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/vi/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/vi/blog/is-next-intl-outdated)

Tài liệu tham khảo:

- [Compat adapter: next-intl](https://intlayer.org/vi/doc/compatibility/next-intl)
- [Hướng dẫn di chuyển: từ next-intl sang Intlayer](https://intlayer.org/vi/doc/migration/next-intl)
- [Báo cáo benchmark Next.js](https://intlayer.org/vi/doc/benchmark/nextjs) và [báo cáo benchmark TanStack Start](https://intlayer.org/vi/doc/benchmark/tanstack)
- [Tối ưu hóa bundle](https://intlayer.org/vi/doc/concept/bundle-optimization) và [trình biên dịch Intlayer](https://intlayer.org/vi/doc/compiler)
- [Visual Editor](https://intlayer.org/vi/doc/concept/editor), [CMS](https://intlayer.org/vi/doc/concept/cms) và [dịch thuật AI](https://intlayer.org/vi/doc/concept/auto-fill)

## Kết luận

`@intlayer/next-intl` làm một việc: nó thay đổi những gì `useTranslations` được liên kết đến, từ một provider chứa mọi message đến một dictionary được biên dịch cho component đó. Trên cùng một ứng dụng Next.js mà trị giá **6 KB mỗi trang**, **các component nhỏ hơn 2.7x**, **0% leakage** và **2 ms hydration**, trước khi bất kỳ ai mở một file component. Navigation và middleware giữ API của họ trên cấu hình routing của Intlayer, và runtime `next-intlayer` native vẫn còn nhẹ hơn nữa.

Tất cả dữ liệu thô, các test apps và scripts có trong [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Chạy nó của bạn.

Tham khảo tài liệu ['Tại sao Intlayer?'](https://intlayer.org/doc/why) để biết thêm chi tiết.

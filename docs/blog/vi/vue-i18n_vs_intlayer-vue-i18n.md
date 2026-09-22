---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "vue-i18n vs @intlayer/vue-i18n: API Giống Nhau, Bundle Khác"
description: Những thay đổi khi một ứng dụng Vue 3 giữ các lệnh gọi vue-i18n của nó nhưng phục vụ chúng qua bộ điều hợp tương thích @intlayer/vue-i18n. JavaScript mỗi trang, kích thước runtime, kích thước thành phần và rò rỉ được đo lường trên cùng một mã Vite + Vue, cộng với những gì bộ điều hợp giữ lại, bỏ qua và không thể thay thế.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | API Giống Nhau, Bundle Khác

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n` là một compat adapter: nó expose API của `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) và phục vụ nó từ các dictionaries được biên dịch bởi Intlayer. Các file `.vue` của bạn không thay đổi. Cái mà `t("footer.github")` được bind tới thì có.

Bài viết này đo lường việc thay thế đó trên cùng một ứng dụng Vite + Vue 3, được xây dựng một lần với `vue-i18n` và một lần với adapter. Các con số đến từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Để so sánh `vue-i18n` và Intlayer như các thư viện, hãy đọc [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) và [benchmark vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). Bài này nói về những gì adapter thay đổi khi bạn giữ các component của mình như cũ.

<TOC/>

> **tl;dr**: Trên cùng một ứng dụng Vite + Vue 3, thay thế `vue-i18n` bằng `@intlayer/vue-i18n` đã giảm JavaScript trên mỗi trang từ **134.9 KB xuống 47.0 KB** gzip (ứng dụng không có i18n nặng 41.3 KB), runtime từ **24.3 KB xuống 7.9 KB**, thành phần trung bình từ **196 KB xuống 8.4 KB**, và rò rỉ chuỗi trang nước ngoài từ **90% xuống 0%**, mà không chỉnh sửa bất kỳ tệp `.vue` nào. `createI18n({ messages })` tiếp tục hoạt động như một fallback; xóa các import JSON để có được những con số trên. Các khối SFC `<i18n>` và `setLocaleMessage()` runtime là hai tính năng không được chuyển đổi qua.

## `@intlayer/vue-i18n` là gì

`vue-i18n` là một runtime. `createI18n({ messages: { en, fr, ... } })` xây dựng một instance toàn cục chứa mọi message của mọi locale; `useI18n()` liên kết mỗi component với nó; `t("footer.github")` duyệt cây tại thời điểm render. Thiết kế đó là điều làm cho các khối SFC `<i18n>` và `setLocaleMessage()` trở nên có thể, và nó cũng là lý do tại sao đồ thị phụ thuộc của mọi component đều bao gồm toàn bộ cây.

`@intlayer/vue-i18n` giữ lại API và thay thế cây:

1. **Import aliasing.** `vueI18nVitePlugin()` từ `@intlayer/vue-i18n/plugin` bao bọc `vite-intlayer` và thêm một `resolve.alias` để `vue-i18n` được phân giải thành `@intlayer/vue-i18n`. Không có import nào được đổi tên.
2. **JSON as source of truth.** Plugin `syncJSON` đọc file `locales/{locale}.json` của bạn với `format: "vue-i18n"` (vì vậy interpolation `{name}`, `{0}` list và plurals pipe `"car | cars"` được phân tích chính xác) và ghi lại các bản dịch khi CLI hoặc CMS cập nhật chúng.
3. **Call-site binding.** Bước tối ưu hóa Intlayer viết lại các call site `useI18n()` để component nhận các dictionaries từ các key của nó, trong locale đang hoạt động, dưới dạng import mà bundler có thể truy vết và tách.

```vue fileName="src/components/Footer.vue"
<!-- Mã của bạn, không thay đổi -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Những gì trình biên dịch phát ra (đơn giản hóa)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

Thành phần không còn truy cập toàn bộ cây thông báo toàn cục. Nó chỉ truy cập `footer`. Đó là lý do tại sao cột kích thước thành phần dưới đây giảm từ 196 KB xuống 8 KB.

## Những gì adapter giữ lại, bỏ qua và không thay thế

| `vue-i18n` API                                                      | Với `@intlayer/vue-i18n`                                                                                        |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Được giữ lại. `t` keys được gõ theo các từ điển của bạn                                                      |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Được giữ lại. `{name}`, `{0}` và plurals phân tách bằng dấu gạch chéo được phân giải như trước               |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Được giữ lại. `datetimeFormats` / `numberFormats` từ `createI18n()` được sử dụng, được hỗ trợ bởi `Intl` gốc |
| `i18n.global.locale.value = "fr"`                                   | ✅ Được giữ lại. Một `WritableComputedRef` được hỗ trợ bởi client của Intlayer; phản ứng hoạt động như trước    |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Được giữ lại. Được đăng ký trên `app.config.globalProperties` bởi `app.use(i18n)`                            |
| `v-t` directive                                                     | ✅ Được giữ lại                                                                                                 |
| `legacy: true`                                                      | ✅ Được chấp nhận                                                                                               |
| `createI18n({ messages })`                                          | ⚠️ `messages` được sử dụng như một **fallback runtime** với cảnh báo dev. Xóa các import JSON để giảm bundle    |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Cảnh báo và không làm gì. Runtime message loading được thay thế bằng build-time dictionaries                 |
| SFC `<i18n>` custom blocks                                          | ❌ Không được đọc. Di chuyển các messages đó vào locale JSON (hoặc một `.content.ts` bên cạnh component)        |
| `@nuxtjs/i18n`                                                      | ⚠️ Adapter riêng biệt, xem [tài liệu tương thích Nuxt](https://intlayer.org/doc/compatibility/nuxtjs-i18n)      |

## Bài kiểm tra

### Những gì đã được đo lường

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite xây dựng **cùng một ứng dụng Vite + Vue 3** với mỗi setup: **10 trang** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), các components và nội dung giống hệt nhau. Các trang được đo lường trong `en` và `fr`.

Cả hai đều được xây dựng trong cấu hình **tĩnh**, cấu hình mà hầu hết các dự án Vue sử dụng: đối với `vue-i18n`, mỗi locale JSON được import và truyền vào `createI18n({ messages })`; đối với adapter, các components giống nhau với `vite.config.ts` và `intlayer.config.ts` được thay đổi và import `messages` được loại bỏ. `vue-intlayer` native được bao gồm để tham khảo.

Đối với mỗi build, suite ghi lại:

- **Kích thước thư viện**: kích thước gzip (và minified) của một component rỗng chỉ import thư viện i18n.
- **Page JS**: gzip JavaScript được tải xuống trên mỗi trang, được lấy trung bình trên tất cả các trang và locale.
- **Locale leak %**: phần chia của các chuỗi được dịch trong JS được tải xuống thuộc về một locale mà người dùng **không** xem.
- **Page leak %**: phần chia của các chuỗi được dịch trong JS được tải xuống thuộc về một trang mà người dùng **không** ở trên.
- **Component avg**: kích thước gzip trung bình của mỗi component được biên dịch riêng lẻ.
- **E2E reactivity**: thời gian treo tường giữa lúc chọn một locale mới và `html[lang]` cập nhật trong DOM (Playwright, 5 lần lặp).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Các con số dưới đây được lấy từ lần chạy ngày **2026-09-12** với `vue-i18n` 11.4.0 và `@intlayer/vue-i18n` 9.5.1. Ứng dụng kiểm tra được thiết kế cố ý nhỏ (một vài chục chuỗi mỗi locale), do đó tỷ lệ phần trăm rò rỉ mô tả một **mẫu**: chúng tăng lên khi nội dung của bạn tăng lên trong khi chi phí runtime vẫn cố định.

### Kết quả trên Vite + Vue 3

Chọn số liệu và thư viện mà bạn quan tâm:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (no i18n)       | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> Cột page-leak của ứng dụng cơ sở được để trống: không có thư viện i18n, quá trình fingerprinting nhặt các chuỗi hard-coded trong các chunk được chia sẻ và con số không có ý nghĩa.

**Cách đọc nó**

- **88 KB ít hơn trên mỗi trang, cùng các component.** `vue-i18n` đưa ứng dụng 41.3 KB lên **134.9 KB**. Bản build adapter của cùng các component đạt **47.0 KB**, vượt quá ứng dụng cơ sở 5.7 KB. Phần lớn sự khác biệt là 74.9 KB của `src/locales` mà `createI18n({ messages })` kéo vào từng trang và adapter không bao giờ bundle như một khối.
- **Runtime thu nhỏ 3x.** Một component trống chỉ import `vue-i18n` tốn **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`, message compiler và runtime. Adapter tốn **7.9 KB / 23.2 KB**, phần lớn là Intlayer's core cộng với `vue-i18n` API surface.
- **Components: nhỏ gọn 23x.** Một component `useI18n()` được compile riêng lẻ trung bình **196 KB**, vì `t` được bind với instance mà giữ mọi message của mọi locale. Với adapter, component tương tự trung bình **8.4 KB**: nó chỉ load dictionary riêng của nó.
- **Rò rỉ.** `vue-i18n` gửi mỗi locale và chuỗi của mỗi trang trên mỗi trang: rò rỉ locale 50% (trên hai locale được fingerprint; với mười locale được bundled, lãng phí thực tế cao hơn), rò rỉ trang 90%. Adapter giảm rò rỉ trang xuống **0%** vì mỗi component chỉ import các dictionaries của nó. Rò rỉ locale là 15% trong lần chạy `static` này; `importMode: 'dynamic'` là cài đặt loại bỏ nó, và cấu hình đó không phải là một phần của lần chạy Vue này.
- **Reactivity và page load.** Chuyển đổi locale rẻ tiền cho cả hai (1.5-2.8 ms); hệ thống reactivity của Vue làm cho nó diễn ra một khi các message đã ở trong bộ nhớ. Page load giảm từ 13.6 ms xuống **9.3 ms**, phù hợp với 88 KB JavaScript ít hơn để phân tích.
- **Về các hàng gốc.** `vue-intlayer` trong lần chạy này đã đóng gói mọi locale ở chế độ `static` và đạt 57.1 KB với runtime 3.9 KB; các từ điển đồng bộ của adapter mang ít chuỗi locale ngoài hơn, do đó con số trên mỗi trang thấp hơn. Runtime gốc vẫn là nhẹ nhất trong ba cái, và mô hình `.content.ts` của nó là nơi các khối `<i18n>` SFC tìm thấy tương đương của chúng.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Bảng đầy đủ, từng thư viện và từng chiến lược, trong [báo cáo benchmark Vue](https://intlayer.org/vi/doc/benchmark/vue).

## Tại sao các số liệu thay đổi

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Không có gì thay đổi trong `src/components/`, vì vậy những lợi ích đến từ những gì `useI18n` được ràng buộc với.

**Với `vue-i18n`**, binding là global instance. `createI18n({ messages: { en, fr, ... } })` là một import chứa toàn bộ; mọi component gọi `useI18n()` đều có thể truy cập tất cả nó, vì vậy bundler không thể split dưới instance. Tối ưu hóa có nghĩa là _bạn_ phải split `en.json` theo route, gọi `setLocaleMessage()` trong router guard, và giữ route-to-file map chính xác khi components di chuyển. Sự lãng phí gia tăng trên cả hai trục cùng một lúc, trang và ngôn ngữ:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # chuỗi của mọi trang
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**Với `@intlayer/vue-i18n`**, binding là dictionary. `syncJSON` biến mỗi key cấp cao nhất của `en.json` thành một dictionary; bước optimize chuyển cho component những cái mà các key của nó đặt tên, như imports mà bundler theo dõi và chia tách per page.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                     # generated: one dictionary per top-level key, per locale
└── src
    ├── i18n.ts                    # createI18n({})   ← messages import removed
    ├── main.ts                    # app.use(i18n)    ← unchanged
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← unchanged
```

Import `messages` trong `i18n.ts` là dòng duy nhất cần xóa. Đó là 88 KB.

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

Lệnh phát hiện `vue-i18n`, cài đặt `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` và `@intlayer/sync-json-plugin`, và điền sẵn `intlayer.config.ts`. Giữ `vue-i18n` được cài đặt: nó là một peer dependency và cung cấp các types.

</Step>
<Step number={2} title="Trỏ Intlayer tới các tệp locale của bạn">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" gói tất cả các locale; "dynamic" tải cái đang hoạt động theo yêu cầu
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // vue-i18n dialect: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` vẫn ở vị trí của nó. Mỗi khóa cấp cao nhất (`footer`, `hero`...) trở thành một dictionary.

</Step>
<Step number={3} title="Thêm plugin và xóa import messages">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Trước: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` bao bọc `vite-intlayer` (theo dõi nội dung, biên dịch từ điển, bước tối ưu hóa) và tạo alias `vue-i18n` thành adapter. Xóa import `messages` là cách loại bỏ 88 KB; giữ lại nó giữ cho ứng dụng hoạt động nhưng ship cả hai.

</Step>
</Steps>

### Những gì bạn có thể xóa sau đó

| File / pattern                                                  | Lý do                                                                                     |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `import en from "./locales/en.json"` và những cái khác tương tự | Chỉ được sử dụng làm fallback bởi adapter. Đây là nơi 88 KB đến từ                        |
| `setLocaleMessage()` trong router guards                        | Không hoạt động. Quá trình loading per-route giờ đây là công việc của compiler            |
| `@intlify/unplugin-vue-i18n`                                    | Không cần thiết: nó precompiles messages và SFC blocks mà adapter không đọc               |
| SFC `<i18n>` blocks                                             | Không được đọc; di chuyển chúng sang locale JSON hoặc một `.content.ts` cho mỗi component |

### Những gì bạn nhận được ngoài việc tiết kiệm bytes

- **Typed keys.** `t("footer.github")` được gõ so với compiled `footer` dictionary; một đường dẫn sai là lỗi TypeScript thay vì key được render dưới dạng text.
- **`npx intlayer test`** làm cho CI thất bại nếu thiếu key trong bất kỳ locale nào. **`npx intlayer fill`** dịch các key bị thiếu bằng provider key của bạn (OpenAI, Anthropic, Mistral, Gemini...) và ghi lại chúng vào `locales/{locale}.json`.
- **Visual Editor và CMS** hoạt động trên cùng JSON, vì vậy những người không phải developer có thể chỉnh sửa thông qua UI và các file sẽ được cập nhật.
- **Di chuyển tăng dần đến `.content.ts`.** Bất kỳ component nào cũng có thể chuyển từ `useI18n()` sang `useIntlayer("footer")` với một file content cùng vị trí. Các từ điển JSON và `.content.ts` tồn tại cùng nhau và hợp nhất.

## Những giới hạn cần biết trước khi bắt đầu

<AccordionGroup>
<Accordion header="Các khối SFC <i18n> không được đọc">

Nếu các tin nhắn của bạn nằm bên trong các component, chúng cần được chuyển sang các tệp ngôn ngữ hoặc sang `.content.ts`, cùng ý tưởng với các kiểu được tạo tự động.

</Accordion>
<Accordion header="Tải tin nhắn tại runtime đã bị loại bỏ">

`setLocaleMessage()` và `mergeLocaleMessage()` đưa ra cảnh báo và trả về. Bản dịch được lấy từ CMS tại runtime cần [Intlayer CMS](https://intlayer.org/vi/doc/concept/cms) hoặc các lệnh `intlayer pull` / `push`.

</Accordion>
<Accordion header="messages là phương án dự phòng, không miễn phí">

Việc giữ các import JSON trong `createI18n()` vẫn giữ 75 KB trong bundle. Hãy xóa chúng khi `intlayer test` thành công.

</Accordion>
<Accordion header="Adapter không phải là runtime gốc">

7.9 KB so với 3.9 KB của `vue-intlayer`. Khi mọi component đã chuyển sang `useIntlayer`, hãy gỡ bỏ nó.

</Accordion>
</AccordionGroup>

## Khi nào sử dụng cái nào?

<AccordionGroup>
<Accordion header="Ở lại với vue-i18n">

Ứng dụng của bạn phụ thuộc vào các khối SFC `<i18n>`, quy trình `setLocaleMessage()` tại runtime hoặc 90 KB mỗi trang không phải là vấn đề đối với người dùng của bạn.

</Accordion>
<Accordion header="Sử dụng @intlayer/vue-i18n">

Bạn đang dùng `vue-i18n` và muốn tiết kiệm 88 KB, component nhỏ hơn 23 lần, 0% rò rỉ trang, khóa có định kiểu và kiểm tra CI mà không cần chỉnh sửa tệp `.vue`. Đây là điểm khởi đầu cho codebase `vue-i18n` hiện có.

</Accordion>
<Accordion header="Chuyển sang native (vue-intlayer)">

Dành cho các dự án mới hoặc khi adapter đã hoàn thành nhiệm vụ. Nó có runtime nhẹ nhất (3.9 KB) và mô hình `.content.ts` cho từng component thay thế các khối `<i18n>` bằng nội dung có định kiểu. Bắt đầu với [Intlayer với Vue](https://intlayer.org/vi/doc/environment/vite-and-vue) hoặc [với Nuxt](https://intlayer.org/vi/doc/environment/nuxt-and-vue).

</Accordion>
</AccordionGroup>

## Câu hỏi thường gặp

<FAQ>

<Question title="Tôi có phải chỉnh sửa các tệp .vue của mình không?">

Không. Bản build benchmark chỉ thay đổi `vite.config.ts`, `intlayer.config.ts` và một dòng trong `src/i18n.ts`, import `messages`. Mọi vị trí gọi `useI18n()`, `$t`, `v-t` và Options API đều được giữ nguyên.

</Question>

<Question title="Tại sao kích thước component lại nhỏ hơn 23 lần?">

Bởi vì `useI18n()` không còn truy cập vào instance toàn cục. `createI18n({ messages })` chứa tất cả tin nhắn của mọi ngôn ngữ, do đó một component được biên dịch riêng lẻ sẽ kéo theo 196 KB. Với adapter, nó chỉ truy cập từ điển của riêng mình: 8.4 KB.

</Question>

<Question title="Định dạng d() và n() thì sao?">

Được giữ nguyên. Các cấu hình `datetimeFormats` và `numberFormats` được truyền vào `createI18n()` đều được tuân thủ, hỗ trợ bởi API `Intl` gốc. Xem [định dạng ngày, giờ và số](https://intlayer.org/vi/blog/date-time-number-formatting-locales).

</Question>

<Question title="Nó có hoạt động với Nuxt không?">

`@intlayer/vue-i18n` nhắm tới Vite + Vue. Đối với `@nuxtjs/i18n`, hãy sử dụng [adapter tương thích Nuxt i18n](https://intlayer.org/vi/doc/compatibility/nuxtjs-i18n) và xem [Intlayer với Nuxt](https://intlayer.org/vi/doc/environment/nuxt-and-vue) để thiết lập native.

</Question>

<Question title="Tôi có thể di chuyển từng component một không?">

Có. Bất kỳ component nào cũng có thể chuyển từ `useI18n()` sang `useIntlayer("footer")` với tệp nội dung được đặt cùng vị trí. Các từ điển JSON và `.content.ts` cùng tồn tại và hợp nhất.

</Question>

</FAQ>

## Những so sánh liên quan

Cùng loạt adapter:

- [next-intl vs @intlayer/next-intl](https://intlayer.org/vi/blog/next-intl-vs-intlayer-next-intl)
- [i18next vs @intlayer/i18next](https://intlayer.org/vi/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/vi/blog/lingui-vs-intlayer-lingui)

Các thư viện được so sánh trực tiếp:

- [vue-i18n vs Intlayer](https://intlayer.org/vi/blog/vue-i18n-vs-intlayer), features and DX
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/vi/blog/vue-i18n-vs-intlayer-benchmark)
- [Is vue-i18n outdated?](https://intlayer.org/vi/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/vi/blog/how-to-pick-vue-i18n-library)

Tài liệu tham khảo:

- [Compat adapter: vue-i18n](https://intlayer.org/vi/doc/compatibility/vue-i18n) and [Nuxt i18n](https://intlayer.org/vi/doc/compatibility/nuxtjs-i18n)
- [Hướng dẫn di chuyển: vue-i18n sang Intlayer](https://intlayer.org/vi/doc/migration/vue-i18n)
- [Báo cáo benchmark Vue](https://intlayer.org/vi/doc/benchmark/vue)
- [Tối ưu hóa bundle](https://intlayer.org/vi/doc/concept/bundle-optimization) và [trình biên dịch Intlayer](https://intlayer.org/vi/doc/compiler)
- [Visual Editor](https://intlayer.org/vi/doc/concept/editor), [CMS](https://intlayer.org/vi/doc/concept/cms) và [dịch thuật AI](https://intlayer.org/vi/doc/concept/auto-fill)

## Kết luận

`@intlayer/vue-i18n` thay đổi những gì `useI18n()` được liên kết đến: từ một instance toàn cục chứa mọi thông báo của mọi locale đến một dictionary được biên dịch cho component đó. Trên cùng một ứng dụng Vite + Vue 3 mà **nhỏ hơn 88 KB trên mỗi trang**, một **runtime nhỏ hơn 3 lần**, **các component nhỏ hơn 23 lần** và **0% page leakage**, cho một tệp cấu hình, một dòng plugin và một import bị xóa. Các khối `<i18n>` SFC và tải thông báo runtime là hai điều mà nó không hỗ trợ, và runtime `vue-intlayer` native vẫn còn nhỏ hơn một nửa.

Tất cả dữ liệu thô, các ứng dụng thử nghiệm và các script đều có trong [kho lưu trữ Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Chạy nó bằng chính bạn.

Tham khảo [tài liệu 'Why Intlayer?'](https://intlayer.org/vi/doc/why) để biết thêm chi tiết.

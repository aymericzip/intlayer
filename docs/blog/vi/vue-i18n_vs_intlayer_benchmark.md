---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: Benchmark 2026"
description: vue-i18n và Intlayer được đo trên cùng một ứng dụng Vite + Vue 3. Kích thước thư viện, JavaScript mỗi trang, rò rỉ nội dung, kích thước component và độ phản ứng khi đổi locale, kèm giải thích các con số.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Benchmark quốc tế hóa (i18n) cho Vue

`vue-i18n` là thư viện i18n tham chiếu cho Vue. Intlayer là một giải pháp thay thế dựa trên trình biên dịch, nội dung được giới hạn theo component, với tích hợp Vue (`vue-intlayer`). Chúng tôi đã so sánh [tính năng và trải nghiệm lập trình viên](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/vue-i18n_vs_intlayer.md) của cả hai. Bài viết này xem xét chi phí của mỗi thư viện sau khi ứng dụng được build.

Dữ liệu đến từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), một bộ công cụ mã nguồn mở build cùng một ứng dụng với từng thư viện và ghi lại những gì trình duyệt thực sự tải xuống và thực thi.

<TOC/>

> **tl;dr**: Trên cùng một ứng dụng Vite + Vue 3, `vue-i18n` gửi **134,9 KB** JavaScript nén gzip mỗi trang so với **41,3 KB** cho ứng dụng không có i18n. Intlayer gửi **57,1 KB**. Riêng runtime của `vue-i18n` đã nặng **24,3 KB gzip** (gấp 6 lần 3,9 KB của Intlayer), mỗi trang mang theo **90% chuỗi của các trang khác**, và một component được biên dịch riêng lẻ kéo theo **196 KB** vì nó bị ràng buộc với cây thông điệp toàn cục. Adapter `@intlayer/vue-i18n` giữ nguyên API của `vue-i18n` và đo được **47,0 KB** mỗi trang.

## Tóm tắt

- **vue-i18n** - Thư viện i18n mặc định cho Vue 2 / Vue 3 và là lõi của `@nuxtjs/i18n`. Thông điệp kiểu ICU, khối `<i18n>` trong SFC, directive `v-t`, các formatter `d()` / `n()`, hệ sinh thái lớn. Thông điệp được đăng ký trên một instance toàn cục tại `createI18n()`; lazy loading theo locale là một pattern thủ công với `setLocaleMessage()`, và việc tách theo route là do bạn tự xây dựng.
- **Intlayer** - Mô hình nội dung lấy component làm trung tâm. Các từ điển `.content.ts` nằm cạnh component mà chúng phục vụ, một trình biên dịch lúc build (`vite-intlayer`) tree-shake và lazy-load chúng theo component và theo locale, các kiểu TypeScript nghiêm ngặt được sinh ra từ nội dung của bạn, và bản dịch thiếu sẽ gây lỗi lúc build. Đi kèm các helper cho router / SEO, Visual Editor / CMS và dịch có hỗ trợ AI.

| Thư viện              | GitHub Stars                                                                                                                                                                   | Tổng số commit                                                                                                                                                                     | Commit gần nhất                                                                                                                                     | Phiên bản đầu | Phiên bản NPM                                                                                               | Lượt tải NPM                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Tháng 4 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Tháng 12 2016 | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Các huy hiệu tự động cập nhật. Ảnh chụp sẽ thay đổi theo thời gian.

## So sánh tính năng song song

| Tính năng                                     | `vue-intlayer` (Intlayer)                                   | `vue-i18n`                                                                       |
| --------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Bản dịch gần component**                    | ✅ Có, `.content.ts` đặt cùng chỗ với mỗi component         | ✅ Qua khối SFC `<i18n>` (tùy chọn); catalog toàn cục là cách thiết lập phổ biến |
| **Tích hợp TypeScript**                       | ✅ Kiểu nghiêm ngặt tự động sinh từ nội dung                | ✅ Typing tốt; an toàn khóa nghiêm ngặt cần typing schema và kỷ luật             |
| **Phát hiện bản dịch thiếu**                  | ✅ Lỗi TypeScript + lỗi/cảnh báo lúc build                  | ⚠️ Fallback lúc runtime + cảnh báo console                                       |
| **Nội dung phong phú (component / Markdown)** | ✅ Hỗ trợ trực tiếp                                         | ⚠️ Nội suy component `<i18n-t>`; Markdown qua plugin bên ngoài                   |
| **Hỗ trợ ICU**                                | ⚠️ Đang phát triển                                          | ✅ Có                                                                            |
| **Định dạng (ngày, số, tiền tệ)**             | ✅ Formatter dựa trên Intl                                  | ✅ `d()` / `n()` với `datetimeFormats` / `numberFormats`                         |
| **Routing bản địa hóa**                       | ✅ Helper cho Vue Router / Nuxt, `getMultilingualUrls`      | ⚠️ Không phải lõi (`@nuxtjs/i18n` hoặc thiết lập router tùy chỉnh)               |
| **Helper SEO (hreflang, sitemap, robots)**    | ✅ Helper tích hợp sẵn                                      | ❌ Không phải lõi                                                                |
| **Tree-shaking (chỉ gửi nội dung được dùng)** | ✅ Theo component, theo locale, tự động bởi trình biên dịch | ⚠️ Thủ công: tách catalog, `setLocaleMessage()` theo route                       |
| **Lazy loading**                              | ✅ `importMode: 'dynamic'` (một dòng cấu hình)              | ✅ `import()` thủ công + `setLocaleMessage()`                                    |
| **Loại bỏ nội dung không dùng**               | ✅ Từ điển không dùng bị loại bỏ lúc build                  | ❌ Không tích hợp sẵn                                                            |
| **Kiểm tra bản dịch thiếu (CLI / CI)**        | ✅ `npx intlayer content test`                              | ⚠️ Bên thứ ba (`vue-i18n-extract`)                                               |
| **Dịch bằng AI**                              | ✅ Tích hợp sẵn, dùng khóa nhà cung cấp của riêng bạn       | ❌ Không                                                                         |
| **Visual Editor / CMS**                       | ✅ Visual Editor miễn phí + CMS tùy chọn                    | ❌ Không (nền tảng bản địa hóa bên ngoài)                                        |
| **MCP server & Agent Skills**                 | ✅ Có                                                       | ❌ Không                                                                         |
| **Hệ sinh thái / cộng đồng**                  | ⚠️ Nhỏ hơn nhưng đang phát triển nhanh                      | ✅ Lớn và trưởng thành trong hệ sinh thái Vue                                    |

## Benchmark

### Những gì được đo

Bộ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) build **cùng một ứng dụng Vite + Vue 3** với từng thư viện: **10 trang** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), component giống hệt và nội dung giống hệt. Các trang được đo ở `en` và `fr`.

Cả hai thư viện được kiểm thử ở cấu hình **static**, cấu hình mà hầu hết dự án Vue triển khai: với `vue-i18n`, JSON của mọi locale được import và truyền vào `createI18n({ messages })`; với Intlayer, `importMode: 'static'` mặc định. Ở chế độ đó Intlayer cũng đóng gói mọi locale, nhưng trình biên dịch vẫn giới hạn nội dung **theo component**, nên một trang chỉ mang theo từ điển của các component mà nó render.

Với mỗi bản build, bộ công cụ ghi lại:

- **Lib size**: kích thước gzip của một component rỗng chỉ import thư viện i18n. Chi phí cố định của runtime.
- **Page JS**: JavaScript gzip tải xuống mỗi trang, tính trung bình trên tất cả các trang và locale.
- **Locale leak %**: tỷ lệ chuỗi đã dịch tìm thấy trong JS tải xuống thuộc về một locale mà người dùng **không** đang xem (lấy dấu vân tay trên `en` và `fr`, nên 50% nghĩa là "locale được đo còn lại hiện diện đầy đủ"; với 10 locale được đóng gói, lãng phí thực tế còn cao hơn).
- **Page leak %**: tỷ lệ chuỗi đã dịch tìm thấy trong JS tải xuống thuộc về một trang mà người dùng **không** đang ở.
- **Component avg**: kích thước gzip trung bình của mỗi component được biên dịch riêng lẻ. Cho thấy một component đơn lẻ kéo theo bao nhiêu runtime i18n và catalog.
- **E2E reactivity**: thời gian thực từ lúc chọn locale mới đến khi `html[lang]` được cập nhật trong DOM (Playwright, 5 lần lặp).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Các con số dưới đây đến từ lần chạy ngày **2026-09-12** với `vue-i18n` 11.4.0 và `intlayer` 9.5.0 / 9.5.1. Ứng dụng kiểm thử được cố ý làm nhỏ (vài chục chuỗi mỗi locale), nên tỷ lệ rò rỉ mô tả một **mẫu hình**: chúng tăng theo nội dung của bạn trong khi chi phí runtime giữ nguyên.

### Kết quả trên Vite + Vue 3

| Thư viện                      | Chiến lược | Lib size (gz) | Lib size (min) | Page JS TB (gz) | Locale leak | Page leak | Component TB (gz) | Phản ứng E2E | Page load |
| ----------------------------- | ---------- | ------------: | -------------: | --------------: | ----------: | --------: | ----------------: | -----------: | --------: |
| **base** (không i18n)         | -          |        0,0 KB |         0,0 KB |         41,3 KB |        0,0% |         - |            1,1 KB |       1,8 ms |   10,8 ms |
| `vue-i18n`                    | static     |       24,3 KB |        83,2 KB |        134,9 KB |       50,0% |     90,0% |          196,0 KB |       2,8 ms |   13,6 ms |
| **`vue-intlayer`**            | static     |    **3,9 KB** |    **11,1 KB** |     **57,1 KB** |       56,8% |  **0,0%** |        **7,7 KB** |   **4,5 ms** |   13,8 ms |
| `@intlayer/vue-i18n` (compat) | static     |        7,9 KB |        23,2 KB |         47,0 KB |       15,0% |      0,0% |            8,4 KB |       1,5 ms |    9,3 ms |

> Cột page-leak của ứng dụng base được để trống: không có thư viện i18n, việc lấy dấu vân tay bắt được các chuỗi hard-code trong các chunk dùng chung và con số không có ý nghĩa.

**Cách đọc**

- **Chi phí runtime.** `vue-i18n` là một trong những runtime nặng nhất toàn bộ benchmark: **24,3 KB gzip / 83,2 KB minified** cho một component rỗng chỉ import nó. `vue-intlayer` tốn 3,9 KB gzip. Khoảng cách đó phải trả trên mọi trang bất kể bạn có bao nhiêu chuỗi.
- **JavaScript mỗi trang.** Ứng dụng không có i18n nặng 41,3 KB. `vue-i18n` tăng gấp hơn ba lần lên **134,9 KB**; Intlayer dừng ở **57,1 KB**, +15,8 KB, phần lớn là mười locale được đóng gói (xem điểm tiếp theo).
- **Rò rỉ.** Với `createI18n({ messages: { en, fr, ... } })`, mọi trang gửi mọi locale và chuỗi của mọi trang: **50% rò rỉ locale** (trên hai locale được lấy dấu vân tay) và **90% rò rỉ trang**. Chế độ `static` của Intlayer cũng đóng gói mọi locale (do đó con số rò rỉ locale tương đương) nhưng có **0% rò rỉ trang**: một trang chỉ kéo từ điển của các component mà nó render. Chuyển sang `importMode: 'dynamic'` loại bỏ luôn rò rỉ locale; cấu hình đó không nằm trong lần chạy Vue này.
- **Kích thước component là nơi kiến trúc thể hiện rõ.** Một component gọi `useI18n()` biên dịch trung bình ra **196 KB**, vì `t()` bị ràng buộc với instance toàn cục chứa mọi thông điệp của mọi locale. Cùng component đó với `useIntlayer()` biên dịch ra **7,7 KB**: nó chỉ chạm tới từ điển của chính nó.
- **Độ phản ứng** không phải vấn đề với cả hai (2-5 ms). Hệ thống reactivity của Vue khiến việc đổi locale rất rẻ một khi thông điệp đã ở trong bộ nhớ.
- **`@intlayer/vue-i18n`**, adapter drop-in, giữ nguyên API của `vue-i18n` và đo được **47,0 KB mỗi trang** và **8,4 KB mỗi component**, với mã ứng dụng không thay đổi.

> Để tham khảo, cùng lần chạy đó đo `fluent-vue` ở mức 171,8 KB mỗi trang, 29,7 KB runtime và 217 KB mỗi component.

## Tại sao có khoảng cách? Instance toàn cục vs từ điển được biên dịch

`vue-i18n` là một runtime. `createI18n()` xây dựng một instance toàn cục chứa cây thông điệp cho mỗi locale; `useI18n()` ràng buộc mỗi component với nó; `t("footer.github")` tra khóa lúc render. Đây là điều giúp khối SFC `<i18n>`, `v-t` và tải thông điệp lúc runtime trở nên khả thi, và cũng là lý do đồ thị phụ thuộc của mọi component bao gồm toàn bộ cây:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # một file mỗi locale, tất cả các trang bên trong
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Tối ưu hóa nghĩa là **bạn** tách `en.json` thành các file theo route, **bạn** gọi `setLocaleMessage()` trong một router guard, và **bạn** giữ cho ánh xạ route-file luôn đúng khi component di chuyển. Runtime không thể làm điều đó cho bạn vì nó không biết component sẽ yêu cầu khóa nào.

Intlayer chuyển kiến thức đó sang lúc build. Nội dung được khai báo cạnh component, và `vite-intlayer` phân giải component nào import từ điển nào:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

Trình biên dịch xuất ra, theo từng từ điển và từng locale, chính xác JSON mà component đó cần, và loại bỏ các từ điển không được import ở đâu cả. Giới hạn theo route là hệ quả của giới hạn theo component, không phải một nhiệm vụ.

> Để loại bỏ luôn các locale không dùng, đặt `dictionary.importMode: 'dynamic'` trong `intlayer.config.ts`. Xem [tài liệu tối ưu bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

## Trải nghiệm lập trình viên

### Thiết lập

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Component

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` chỉ là một chuỗi cho đến khi bạn tự định kiểu schema thông điệp; một lỗi gõ sẽ render ra khóa.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
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

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` và `increment` có kiểu; một lỗi gõ là lỗi TypeScript, thiếu giá trị tiếng Pháp là lỗi build.

### Lazy loading theo locale

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Sau đó gọi `loadLocaleMessages()` từ một router guard, và tự tách `locales/{locale}.json` theo route nếu bạn muốn giới hạn theo trang.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Giữ API của vue-i18n, nhận đầu ra của Intlayer

`@intlayer/vue-i18n` là một adapter drop-in: `useI18n()`, `t()`, `d()`, `n()`, nội suy `{name}` và `{0}`, số nhiều dạng pipe (`"car | cars"`), `v-t` và `i18n.global.locale` vẫn hoạt động, được phục vụ từ các từ điển Intlayer do `vite-intlayer` biên dịch.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

Trong benchmark, bản build compat của cùng ứng dụng giảm từ **134,9 KB xuống 47,0 KB** mỗi trang và từ **196 KB xuống 8,4 KB** mỗi component, với các component không thay đổi. Các file `locales/{locale}.json` hiện có của bạn có thể tiếp tục là nguồn sự thật thông qua plugin đồng bộ JSON.

Xem [hướng dẫn di chuyển từ vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_vue-i18n_to_intlayer.md) và [tài liệu tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/vue-i18n.md). Người dùng Nuxt có cùng lộ trình qua [tương thích `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/nuxtjs-i18n.md).

## Khi nào chọn cái nào?

- **Chọn vue-i18n** nếu bạn muốn cách tiếp cận Vue tiêu chuẩn, bạn dựa vào thông điệp ICU hoặc khối SFC `<i18n>`, bạn đã dùng `@nuxtjs/i18n`, hoặc một nền tảng dịch thuật yêu cầu JSON tập trung. Hãy dành thời gian tách catalog và lazy-load theo route nếu kích thước bundle quan trọng.
- **Chọn Intlayer** nếu bạn muốn **nội dung giới hạn theo component**, **TypeScript nghiêm ngặt**, **lỗi thiếu khóa lúc build**, **tree-shaking và lazy loading không tốn công**, và công cụ biên tập tích hợp sẵn (Visual Editor, CMS, dịch AI, MCP server). Đặc biệt phù hợp với các codebase Vue / Nuxt lớn, mô-đun hóa và các design system.
- **Chọn `@intlayer/vue-i18n`** nếu bạn đã dùng `vue-i18n` và muốn lợi ích về bundle mà không cần viết lại.

## Các so sánh liên quan

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-intl_vs_intlayer.md) (cùng benchmark)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18next_vs_intlayer.md) (cùng benchmark)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer.md) (cùng benchmark)
- [vue-i18n vs Intlayer (tính năng & DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/vue-i18n_vs_intlayer.md)
- [vue-i18n đã lỗi thời?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/is_vue-i18n_outdated.md)

## GitHub Stars

GitHub stars là chỉ báo mạnh về mức độ phổ biến của một dự án, sự tin tưởng của cộng đồng và tính phù hợp lâu dài. Dù không phải thước đo trực tiếp về chất lượng kỹ thuật, chúng phản ánh có bao nhiêu lập trình viên thấy dự án hữu ích, theo dõi tiến trình của nó và có khả năng áp dụng.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Kết luận

`vue-i18n` trưởng thành, linh hoạt và tích hợp sâu với Vue. Benchmark cho thấy thiết kế ưu tiên runtime của nó tốn gì trên một bản build Vite: **runtime 24 KB gzip**, **134,9 KB mỗi trang** cho một ứng dụng chỉ nặng 41 KB khi không có i18n, **90% nội dung của trang khác** trên mọi trang, và các component mỗi cái lên tới **196 KB** vì chúng treo trên cây thông điệp toàn cục.

Intlayer chuyển công việc vào trình biên dịch. Từ điển theo component và loại bỏ nội dung chết là đầu ra của build, không phải quy ước. Trên cùng ứng dụng: **runtime 3,9 KB**, **57,1 KB mỗi trang**, **0% rò rỉ trang**, component **nhỏ hơn 25 lần**. Và nếu việc viết lại không khả thi, `@intlayer/vue-i18n` đi được phần lớn chặng đường mà không đụng đến component.

Toàn bộ dữ liệu thô, ứng dụng kiểm thử và script nằm trong [kho lưu trữ Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Hãy tự chạy thử.

Tham khảo [tài liệu 'Tại sao Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md) để biết thêm chi tiết.

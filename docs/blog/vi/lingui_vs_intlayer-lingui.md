---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui: Cùng Macro, Khác Runtime"
description: "Điều gì thay đổi khi một ứng dụng React giữ nguyên các macro Lingui nhưng phân phối chúng qua adapter tương thích @intlayer/lingui. Kích thước component, hydration, rò rỉ và lượng JavaScript trên mỗi trang được đo lường trên cùng một mã nguồn TanStack Start, bao gồm cả những điểm adapter còn hạn chế."
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Adapter tương thích
  - Di chuyển
  - Quốc tế hóa
  - i18n
  - Benchmark
  - Kích thước bundle
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Cùng Macro, Khác Runtime

`@intlayer/lingui` là adapter tương thích (compat adapter) dành cho `@lingui/core` và `@lingui/react`. Các lệnh gọi `` t`...` ``, `<Trans>`, `useLingui()` và `i18n._()` của bạn được giữ nguyên hoàn toàn; các macro tiếp tục biên dịch bình thường; điểm thay đổi duy nhất là nguồn gốc của các thông điệp khi ứng dụng chạy (runtime). Thay vì một tệp catalog biên dịch duy nhất cho mỗi ngôn ngữ, mỗi vị trí gọi lệnh được liên kết trực tiếp với một từ điển Intlayer được biên dịch riêng cho nó.

Bài viết này đo lường sự thay đổi đó trên cùng một ứng dụng TanStack Start, được xây dựng một lần với Lingui thuần và một lần với adapter. Các số liệu được trích xuất từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Để so sánh trực tiếp hai thư viện độc lập, vui lòng đọc [Lingui vs Intlayer](https://intlayer.org/vi/blog/lingui-vs-intlayer). Bài viết này tập trung vào những gì adapter thay đổi và những trường hợp adapter không mang lại lợi thế.

<TOC/>

> **Tóm tắt (tl;dr)**: Trên cùng một ứng dụng TanStack Start, `@intlayer/lingui` đã cắt giảm kích thước trung bình của component từ **85.5 KB xuống 12.8 KB** gzip, rút ngắn thời gian hydration từ **28 ms xuống 19.7 ms**, và chuyển đổi ngôn ngữ từ **5.9 ms xuống 2.9 ms**, trong khi giữ nguyên toàn bộ macro. Ở cấu hình cơ bản (tải toàn bộ catalog ngay từ đầu), adapter còn loại bỏ **90% rò rỉ trang** và tiết kiệm 12 KB cho mỗi trang. Tuy nhiên, ở cấu hình tải lười (lazy loading), adapter chuyển tải **137 KB mỗi trang so với 115 KB** của Lingui thuần: nguyên nhân là adapter phân tích cú pháp ICU ở runtime trong khi Lingui phân phối các mảng token biên dịch sẵn. Mức rò rỉ ngôn ngữ gốc (~9-10%) tương đương ở cả hai bên, vì nó xuất phát từ chuỗi fallback `message` nhúng trực tiếp trong component chứ không phải từ runtime. Adapter là một plugin Vite và được đo lường trên TanStack Start.

## `@intlayer/lingui` là gì

Lingui bao gồm một trình biên dịch và một runtime. Các macro trong mã nguồn được trích xuất thành catalog `.po` (hoặc JSON) theo từng ngôn ngữ, biên dịch thành module JS cho từng ngôn ngữ và nạp vào một thực thể `I18n` toàn cục qua `i18n.load()` + `i18n.activate()`. Mỗi lệnh gọi `useLingui()` đăng ký lắng nghe thực thể đó; mỗi lệnh gọi `_()` tìm kiếm mã định danh trong catalog đang hoạt động.

`@intlayer/lingui` giữ nguyên các macro cũng như API và thay thế cơ chế tìm kiếm catalog:

1. **Bí danh import (Import aliasing).** Plugin `lingui()` từ gói `@intlayer/lingui/plugin` bọc lấy `vite-intlayer` và bổ sung các mục `resolve.alias` để `@lingui/core` và `@lingui/react` phân giải sang `@intlayer/lingui`. Các lệnh import trong mã nguồn của bạn hoàn toàn không đổi.
2. **Catalog đóng vai trò nguồn chân lý duy nhất.** Plugin `syncJSON` (hoặc `syncPO` cho tệp `.po`) đọc các catalog hiện có và chuyển đổi chúng thành từ điển Intlayer, đồng thời ghi ngược các bản dịch khi CLI hoặc CMS cập nhật. Với thiết lập `splitKeys: "key-prefix"`, một catalog phẳng gồm các ID dạng dấu chấm (`footer.github`, `hero.title`) được tách thành các từ điển nhỏ theo tiền tố thay vì một tệp đơn lẻ nặng 244 KB.
3. **Liên kết tại vị trí gọi (Call-site binding).** Quá trình tối ưu hóa của Intlayer thu thập các ID được truyền vào `_`, `t` và `<Trans>` trong từng tệp, sau đó chỉ chuyển giao các từ điển khớp chính xác tới component. `<Trans id="hero.title">` tự liên kết độc lập; `useLingui()` liên kết với tất cả các tiền tố được sử dụng trong tệp đó. Các ID không chứa dấu chấm (ID dạng băm, `mockBanner`) tự động chuyển về từ điển dự phòng `messages` duy nhất của Lingui.

```tsx fileName="src/components/Hero.tsx"
// Mã nguồn của bạn, giữ nguyên
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="Kết quả trình biên dịch tạo ra (rút gọn)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

Component không còn cần kết nối tới thực thể toàn cục và tệp catalog khổng lồ phía sau nó. Nó chỉ tương tác trực tiếp với `hero`. Đây chính là nguyên nhân khiến kích thước component trong bảng bên dưới giảm tới 7 lần.

## Những gì adapter giữ lại, bỏ qua và không thay thế

| Lingui API                                               | Khi dùng `@intlayer/lingui`                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Macro `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ Giữ nguyên. Duy trì `@lingui/babel-plugin-lingui-macro` hoặc `@lingui/swc-plugin` trước lượt chạy Intlayer |
| `useLingui()` → `{ i18n, _, t }`                         | ✅ Giữ nguyên. Hoạt động bình thường bên ngoài Provider (ngôn ngữ suy ra từ `react-intlayer`)                 |
| `i18n._(id, values)`, `i18n.t()`                         | ✅ Giữ nguyên. Phân giải chính xác cả ID tường minh lẫn ID băm                                                |
| Định dạng số nhiều ICU, `select`, `selectordinal`, `#`   | ✅ Giữ nguyên, thông qua bộ xử lý ICU của Intlayer                                                            |
| `i18n.date()`, `i18n.number()`, `formats`                | ✅ Giữ nguyên, hỗ trợ bởi API `Intl` gốc của trình duyệt                                                      |
| `I18nProvider`                                           | ✅ Giữ nguyên. Bọc `IntlayerProvider`; lắng nghe `i18n.on("change")` để `activate()` kích hoạt render lại     |
| `i18n.activate(locale)`                                  | ✅ Giữ nguyên                                                                                                 |
| `i18n.load(locale, messages)` / `loadAndActivate()`      | ⚠️ Chấp nhận dưới dạng **dự phòng runtime**. Từ điển biên dịch được ưu tiên; cảnh báo dev gợi ý xóa bỏ        |
| `setupI18n({ messages, missing })`                       | ⚠️ `messages` được hợp nhất làm dự phòng; `missing` bị bỏ qua                                                 |
| `lingui extract` / `lingui compile`                      | ✅ Tiếp tục quy trình làm việc thường ngày. Trỏ `syncPO` / `syncJSON` tới các catalog được trích xuất         |
| `defaultComponent` trên `I18nProvider`                   | ⚠️ Được lưu trong ngữ cảnh nhưng không áp dụng khi kết xuất                                                   |
| Next.js                                                  | ❌ Plugin bọc `vite-intlayer`. Chỉ hỗ trợ Vite, TanStack Start và React Router                                |

## Đánh giá Benchmark

### Những nội dung được đo lường

Bộ thử nghiệm [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) xây dựng **cùng một ứng dụng** trên từng cấu hình: **10 trang** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 ngôn ngữ** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), cùng cấu trúc component và nội dung đồng nhất. Các trang được đo lường bằng tiếng Anh (`en`) và tiếng Pháp (`fr`).

Lingui được xây dựng theo bốn chiến lược tải: từ nhập tĩnh toàn bộ catalog biên dịch ngay từ đầu (`static`) cho tới tải lười catalog theo từng route (`scoped-dynamic`). Adapter được kiểm thử trên **cùng các component đó**, chỉ thay đổi tệp `vite.config.ts` và `intlayer.config.ts`. Hàng `static` đóng gói tất cả ngôn ngữ; hàng `dynamic` (`importMode: 'dynamic'`) tải ngôn ngữ đang hoạt động theo yêu cầu. Không có biến thể "scoped" riêng biệt: vì bước tối ưu hóa tự động phân chia phạm vi theo từng vị trí gọi.

Đối với mỗi bản dựng, các chỉ số sau được ghi nhận:

- **Lib size**: kích thước gzip của component rỗng chỉ import thư viện i18n.
- **Page JS**: lượng JavaScript gzip tải về mỗi trang, tính trung bình trên toàn bộ trang và ngôn ngữ.
- **Locale leak %**: tỷ lệ phần trăm chuỗi dịch trong JS tải về thuộc về các ngôn ngữ mà người dùng **không** xem.
- **Page leak %**: tỷ lệ phần trăm chuỗi dịch trong JS tải về thuộc về các trang mà người dùng **không** truy cập.
- **Component avg**: kích thước gzip trung bình của từng component khi được biên dịch độc lập.
- **E2E reactivity**: thời gian thực từ lúc chọn ngôn ngữ mới đến khi thuộc tính `html[lang]` cập nhật trên DOM (Playwright, lặp lại 5 lần).
- **Hydration**: thời gian thực hiện pha hydration của React.

> Các số liệu dưới đây lấy từ lần chạy ngày **2026-09-12** với `@lingui/react` 6.6.0 và `@intlayer/lingui` 9.5.1. Ứng dụng kiểm thử được thiết kế nhỏ gọn có chủ đích (vài chục chuỗi mỗi ngôn ngữ), do đó tỷ lệ rò rỉ thể hiện một **mô hình cấu trúc**: chúng tăng dần theo quy mô nội dung trong khi chi phí runtime cố định.

### Kết quả trên TanStack Start

| Cấu hình               | Chiến lược     | Lib size (gz) | Page JS TB (gz) | Rò rỉ ngôn ngữ | Rò rỉ trang | Component TB (gz) | Phản hồi E2E |   Hydration |
| ---------------------- | -------------- | ------------: | --------------: | -------------: | ----------: | ----------------: | -----------: | ----------: |
| **cơ sở** (không i18n) | -              |        0.0 KB |        111.0 KB |           0.0% |        0.0% |            0.7 KB |       8.1 ms |     21.6 ms |
| Lingui                 | static         |       11.2 KB |        152.2 KB |          50.0% |       90.0% |           58.0 KB |       3.9 ms |     19.9 ms |
| Lingui                 | dynamic        |       11.2 KB |    **115.2 KB** |           9.3% |        0.0% |           85.5 KB |       5.9 ms |     28.0 ms |
| Lingui                 | scoped-static  |       11.2 KB |        120.8 KB |           4.0% |        0.0% |          147.9 KB |       7.1 ms |     33.9 ms |
| Lingui                 | scoped-dynamic |       11.2 KB |        120.2 KB |           8.6% |        0.0% |           83.7 KB |      42.1 ms |     32.9 ms |
| **`@intlayer/lingui`** | static         |   **10.3 KB** |        140.5 KB |          50.0% |    **0.0%** |       **14.9 KB** |   **3.3 ms** | **11.3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10.3 KB** |        137.0 KB |           9.9% |    **0.0%** |       **12.8 KB** |   **2.9 ms** | **19.7 ms** |
| `intlayer` (gốc)       | static         |        5.0 KB |        125.8 KB |          50.0% |        0.0% |            8.1 KB |       3.2 ms |     11.5 ms |
| `intlayer` (gốc)       | dynamic        |        5.0 KB |        118.6 KB |           0.0% |        0.0% |            6.3 KB |       3.6 ms |     14.1 ms |

**Phân tích số liệu**

- **Component: nhỏ hơn 7 lần.** Đây là hiệu quả rõ rệt nhất của adapter. Một component Lingui được biên dịch độc lập nặng trung bình **58-148 KB** tùy theo chiến lược, bởi vì `useLingui()` kết nối tới thực thể toàn cục và mọi catalog nạp vào đó. Cùng component đó khi chạy với adapter chỉ nặng trung bình **12.8-14.9 KB**: nó chỉ nhập từ điển của chính nó và bộ xử lý ICU.
- **Hydration: nhanh hơn 8-14 ms.** `i18n.load()` + `i18n.activate()` chạy ở phía client trước khi React có thể hydrate; thiết lập Lingui càng chia nhỏ thì bước này càng kéo dài (28-34 ms). Với adapter, các từ điển đóng vai trò như các import tĩnh thông thường mà bundler đã sắp xếp sẵn trong chunk của trang: **11.3 ms** ở chế độ `static`, **19.7 ms** ở chế độ `dynamic`.
- **Chuyển đổi ngôn ngữ: nhanh gấp 2 lần, không giật cục.** Cấu hình tối ưu `scoped-dynamic` của Lingui mất **42 ms** để cập nhật `html[lang]`, do catalog của route phải được tải về, nạp và kích hoạt trước khi giao diện thay đổi. Adapter duy trì ổn định ở mức **2.9-3.3 ms** trên cả hai chế độ.
- **Cấu hình đơn giản được khắc phục tự động.** Lingui tĩnh tải toàn bộ catalog trên mỗi trang: 152.2 KB và 90% rò rỉ trang. Adapter tĩnh đạt 140.5 KB, 0% rò rỉ trang trên cùng các component đó.
- **Dung lượng mỗi trang: Lingui dẫn trước ở `dynamic` 22 KB.** Đây là điểm cần nhìn nhận khách quan. Lingui biên dịch thông điệp thành mảng token ở thời điểm build và chỉ gửi runtime gọn nhẹ 11 KB để duyệt mảng. Adapter phân phối bộ giải mã ICU của Intlayer (khoảng 15 KB mã `@intlayer/core` bổ sung so với bản dựng gốc), lớp adapter (~10 KB) và `react-intlayer` (~6 KB). Trên ứng dụng này, điều đó tạo nên **137.0 KB so với 115.2 KB**. Nếu mục tiêu tối hậu của bạn chỉ là số byte nhỏ nhất trên mỗi trang và bạn đã triển khai Lingui tải lười bài bản, adapter sẽ không giúp ích về mặt này.
- **Tỷ lệ rò rỉ ngôn ngữ tương đương ở hai bên.** 9.3% cho Lingui và 9.9% cho adapter ở chế độ `dynamic`. Điều này bắt nguồn từ chính mã nguồn component: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` chứa văn bản tiếng Anh gốc làm fallback, và kết quả biên dịch macro cũng vậy trừ khi trường message được lọc bỏ. Chuỗi tiếng Anh này sẽ lọt vào chunk `fr` bất kể runtime nào được sử dụng. Bản Intlayer gốc (`.content.ts`, không có chuỗi nội tuyến trong mã lệnh) đạt mức 0% tuyệt đối.

## Tại sao các con số thay đổi, và vì sao một chỉ số giữ nguyên

Hai yếu tố quyết định các kết quả trên: **component được liên kết tới cái gì**, và **thông điệp được vận chuyển theo định dạng nào**.

**Liên kết.** Ở Lingui, đơn vị phân chia cơ bản là toàn bộ ngôn ngữ. Tệp `messages.mjs` của `fr` là một module độc lập; bất kỳ component nào nhập thực thể nạp tệp này đều có quyền truy cập toàn bộ nội dung, ngăn bundler chia nhỏ dưới cấp độ ngôn ngữ. Với adapter, đơn vị trở thành vị trí gọi: `hero` và `footer` là các import riêng rẽ, được tách và tải theo nhu cầu của từng component. Đó là nguồn gốc giúp giảm kích thước component, tăng tốc hydration và triệt tiêu rò rỉ trang.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # kết quả lingui compile, một tệp mỗi ngôn ngữ
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # tự động tạo: một từ điển cho mỗi tiền tố ID, theo ngôn ngữ
└── src
    ├── locales
    │   ├── en/messages.json             # không đổi, tiếp tục là nguồn chân lý duy nhất
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← không đổi
```

**Định dạng.** Bước biên dịch của Lingui chuyển đổi `{count, plural, one {# item} other {# items}}` thành một mảng token; runtime không bao giờ phải phân tích cú pháp ICU. Adapter giữ nguyên thông điệp dưới dạng văn bản và phân tích qua bộ xử lý ICU của Intlayer. Đây là chi phí cố định khoảng 15 KB bạn chỉ trả một lần cho mỗi trang, giải thích tại sao hàng `dynamic` kém hơn về dung lượng thô dù chiến thắng ở mọi mặt khác. Intlayer gốc tránh được điều này nhờ các từ điển `.content.ts` sử dụng các nút `enu()` / `insert()` được trình biên dịch giải quyết từ trước.

## Ba bước chuyển đổi

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

Lệnh này sẽ nhận diện Lingui, đọc `lingui.config.ts` để chọn `syncPO` (catalog `.po`) hoặc `syncJSON` (catalog JSON), cài đặt `intlayer`, `react-intlayer`, `@intlayer/lingui` cùng plugin đồng bộ phù hợp, đồng thời hoán đổi `@lingui/vite-plugin` bằng plugin adapter trong `vite.config.ts`. Giữ nguyên `@lingui/core`, `@lingui/react` và plugin macro của bạn: các macro tiếp tục biên dịch bình thường và adapter tận dụng các kiểu dữ liệu của Lingui.

</Step>
<Step number={2} title="Kết nối Intlayer với catalog của bạn">

Đối với catalog JSON (khi `format: "minimal"` trong `lingui.config.ts`):

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
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Gom nhóm ID dạng dấu chấm theo đoạn đầu tiên: `footer.github` → từ điển `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

Đối với catalog `.po`, thay thế `syncJSON` bằng `syncPO` từ `@intlayer/sync-po-plugin` với cùng mẫu `source` nhưng mang phần mở rộng `.po`. Xem thêm tại [tài liệu plugin Sync PO](https://intlayer.org/vi/doc/plugin/sync-po).

`splitKeys: "key-prefix"` là chìa khóa chính giúp thu nhỏ kích thước component một cách ngoạn mục. Tệp catalog gốc giữ nguyên cấu trúc phẳng; việc phân tách chỉ diễn ra trong các từ điển được tạo ra, và quá trình ghi ngược sẽ tự động hợp nhất các khóa lại.

</Step>
<Step number={3} title="Thêm plugin">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Giữ nguyên plugin macro; nó cần chạy trước lượt xử lý của Intlayer
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

Plugin `lingui()` bao gói `vite-intlayer` (theo dõi nội dung, biên dịch từ điển, tối ưu hóa) và thiết lập bí danh để `@lingui/core` và `@lingui/react` trỏ tới adapter. Hãy tiến hành build để áp dụng ngay các cải thiện hiệu năng nói trên.

</Step>
</Steps>

### Những mục bạn có thể xóa sau đó

| Tệp / mẫu                                            | Lý do                                                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Từ điển được các component sử dụng trực tiếp import. `i18n.load()` chuyển thành phương án dự phòng |
| `i18n.load()` / `i18n.loadAndActivate()`             | Giữ lại `i18n.activate(locale)`; xóa bỏ mã tải catalog thủ công                                    |
| `lingui compile` trong tập lệnh build                | Chỉ xóa khi bạn sử dụng JSON hoặc `.po` làm nguồn và không còn import các module biên dịch sẵn     |

### Những giá trị nhận được ngoài việc tiết kiệm byte

- **Phát hiện bản dịch còn thiếu.** Lệnh `npx intlayer test` sẽ dừng quy trình CI nếu một ngôn ngữ thiếu khóa dịch; trong khi `lingui extract` chỉ đưa ra thống kê.
- **Tự động điền qua `npx intlayer fill`.** Tự động dịch các mục còn thiếu bằng nhà cung cấp AI bạn chọn (OpenAI, Anthropic, Mistral, Gemini...) và lưu ngược lại vào catalog của bạn.
- **Trình chỉnh sửa trực quan (Visual Editor) và CMS.** Hoạt động trên cùng các từ điển, giúp các thành viên không chuyên về kỹ thuật có thể chỉnh sửa tệp `.po` và JSON trực tiếp qua giao diện trực quan.
- **Chuyển đổi từng bước sang `.content.ts`.** Bất kỳ component nào cũng có thể đổi từ `useLingui()` sang `useIntlayer("hero")` với tệp nội dung đi kèm bất cứ lúc nào. Hai loại từ điển cùng tồn tại và kết hợp mượt mà.

## Các giới hạn cần biết trước khi bắt đầu

- **Chi phí mỗi trang ở chế độ `dynamic`.** Như đã phân tích: dự kiến dung lượng sẽ tăng khoảng +20 KB mỗi trang so với thiết lập Lingui tải lười trên ứng dụng nhỏ. Khoảng cách này không nở rộng theo khối lượng nội dung (vì do bộ phân tích cú pháp chứ không phải do catalog), nhưng nó cũng không tự thu hẹp lại.
- **Vẫn còn rò rỉ ngôn ngữ nguồn.** Bộ mô tả thông điệp và kết quả macro chứa sẵn chuỗi tiếng Anh gốc để phòng ngừa lỗi. Nếu bạn cần loại bỏ điều này, giải pháp là xóa trường `message` hoặc chuyển đổi component sang `.content.ts`.
- **`i18n.load()` chỉ là phương án dự phòng.** Nếu bạn vẫn tiếp tục import các catalog đã biên dịch và gọi `load()`, bạn sẽ vô tình nạp cả gói cũ lẫn gói mới. Hãy xóa các lệnh import đó.
- **Chỉ dành cho Vite.** Hiện chưa có plugin Next.js cho `@intlayer/lingui`. Các dự án Next.js đang dùng Lingui nên cân nhắc chuyển đổi thẳng sang [`next-intlayer`](https://intlayer.org/vi/doc/environment/nextjs).
- **`defaultComponent` không được áp dụng.** Nếu bạn đang dựa vào thuộc tính này để tự động bọc thẻ `<Trans>`, hãy chủ động bổ sung component bao bọc bên ngoài.

## Khi nào nên dùng giải pháp nào?

- **Tiếp tục dùng Lingui** nếu bạn đã triển khai thành công cấu hình `scoped-dynamic`, ưu tiên số một của bạn là kích thước byte nhỏ nhất trên mỗi trang, và độ trễ 42 ms khi đổi ngôn ngữ cùng 30 ms hydration hoàn toàn chấp nhận được đối với dự án.
- **Sử dụng `@intlayer/lingui`** nếu bạn đang dùng Lingui và muốn component nhẹ hơn, hydration và đổi ngôn ngữ nhanh hơn, 0% rò rỉ trang ở cấu hình đơn giản, ID có định kiểu, kiểm thử CI và tự động dịch AI mà không phải chỉnh sửa macro. Đây là bước đệm lý tưởng cho dự án Lingui hiện hữu.
- **Chuyển sang Intlayer gốc (`react-intlayer`)** khi bạn bước vào giai đoạn tái cấu trúc component. Đây là phương án duy nhất đạt **0% rò rỉ ngôn ngữ**, runtime chỉ 5 KB và chỉ tăng thêm +7.6 KB mỗi trang so với ứng dụng cơ bản.

## Các bài viết so sánh liên quan

- [Lingui vs Intlayer](https://intlayer.org/vi/blog/lingui-vs-intlayer) (so sánh trực tiếp hai thư viện trên cùng benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/vi/blog/next-intl-vs-intlayer-next-intl) (thuộc chuỗi so sánh adapter tương thích)
- [i18next vs @intlayer/i18next](https://intlayer.org/vi/blog/i18next-vs-intlayer-i18next) (thuộc chuỗi so sánh adapter tương thích)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/vi/blog/vue-i18n-vs-intlayer-vue-i18n) (thuộc chuỗi so sánh adapter tương thích)
- [Tài liệu adapter tương thích: Lingui](https://intlayer.org/vi/doc/compatibility/lingui)
- [So sánh i18n dạng biên dịch vs dạng khai báo](https://intlayer.org/vi/blog/compiler-vs-declarative-i18n)

## Kết luận

`@intlayer/lingui` thay đổi căn bản cách thức liên kết các vị trí gọi Lingui: thay vì trỏ tới một thực thể toàn cục và tệp catalog ngôn ngữ cồng kềnh, component sẽ kết nối với từ điển được biên dịch riêng cho chính nó. Trên cùng một ứng dụng TanStack Start, điều này mang lại **component nhỏ hơn 7 lần**, **thời gian hydration rút ngắn 8-14 ms**, **chuyển đổi ngôn ngữ nhanh hơn gấp 2 lần** và loại bỏ hoàn toàn độ trễ 42 ms, mà không cần sửa bất kỳ macro nào. Adapter không can thiệp vào các chuỗi văn bản dự phòng trong component (do đó mức rò rỉ ngôn ngữ nguồn vẫn giữ nguyên) và thực hiện phân tích ICU ở runtime (khiến chế độ động tốn thêm khoảng 20 KB mỗi trang so với Lingui thuần). Hãy cân nhắc kỹ mục tiêu hiệu năng của bạn trước khi đưa ra quyết định phù hợp.

Toàn bộ dữ liệu thô, các ứng dụng thử nghiệm và tập lệnh đo lường đều có sẵn tại [kho lưu trữ Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Bạn hoàn toàn có thể tự mình chạy kiểm thử.

Tham khảo tài liệu ['Tại sao nên chọn Intlayer?'](https://intlayer.org/vi/doc/why) để biết thêm thông tin chi tiết.

---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Di chuyển từ vue-i18n sang Intlayer | Quốc tế hóa (i18n)"
description: "Tìm hiểu cách di chuyển ứng dụng Vue hoặc Nuxt của bạn từ vue-i18n sang Intlayer — từng bước, mà không làm hỏng mã hiện có của bạn. Sử dụng adapter tương thích @intlayer/vue-i18n cho quá trình chuyển đổi không gián đoạn."
keywords:
  - vue-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Migrating from vue-i18n to Intlayer

## Tại sao nên chuyển từ vue-i18n sang Intlayer?

<AccordionGroup>

<Accordion header="Kích thước bundle">

Thay vì tải những tệp JSON khổng lồ vào các trang của bạn, chỉ tải nội dung cần thiết. Intlayer giúp **giảm kích thước bundle và trang của bạn lên tới 50%**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Phân giới hạn nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể nhân đôi hoặc xóa một thư mục tính năng duy nhất mà không cần lo lắng về việc xem xét toàn bộ codebase nội dung của bạn. Ngoài ra, Intlayer **hoàn toàn được gõ** để đảm bảo độ chính xác của nội dung của bạn.

Intlayer cũng là giải pháp có **phát triển tích cực nhất** trong hệ sinh thái i18n — các vấn đề được sửa chữa nhanh chóng, các adapter framework mới được tích hợp thường xuyên, và API cốt lõi được liên tục cải tiến dựa trên phản hồi sản xuất thực tế.

</Accordion>

<Accordion header="AI Agent">

Đặt cùng địa điểm nội dung **giảm ngữ cảnh cần thiết** bởi các Mô hình Ngôn ngữ Lớn (LLMs). Intlayer cũng đi kèm với một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**, và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để làm cho trải nghiệm nhà phát triển (DX) thậm chí còn mượt mà hơn cho các AI agents.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tự động hóa để dịch trong pipeline CI/CD của bạn bằng cách sử dụng LLM lựa chọn của bạn với chi phí của nhà cung cấp AI của bạn. Intlayer cũng cung cấp **compiler** để tự động hóa trích xuất nội dung, cũng như một [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để giúp **dịch trong nền**.

</Accordion>

<Accordion header="Hiệu suất">

Kết nối các tệp JSON khổng lồ với các thành phần có thể dẫn đến các vấn đề về hiệu suất và phản ứng. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm xây dựng.

</Accordion>

<Accordion header="Scaling với non-dev">

Hơn chỉ là một giải pháp i18n, Intlayer cung cấp **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) tự lưu trữ** và một **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của bạn **theo thời gian thực**, làm cho cộng tác với các nhà dịch, biên tập viên sao chép và các thành viên nhóm khác trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>

</AccordionGroup>

---

## Chiến lược di chuyển

Có hai chiến lược bổ sung nhau để di chuyển từ `vue-i18n` sang Intlayer:

1. **Compat adapter (được khuyến nghị cho các ứng dụng hiện có)** — Cài đặt `@intlayer/vue-i18n` (cho các Vue component). Package này cung cấp **cùng API** như `vue-i18n` nhưng ủy thác tất cả công việc dịch cho Intlayer phía sau. Bạn giữ lại các lệnh gọi `$t`, `useI18n()`, và `<i18n-t>` hiện có — thay đổi duy nhất là đường dẫn import và khởi tạo.

2. **Di chuyển toàn bộ** — Dần dần thay thế các API của `vue-i18n` bằng các Intlayer hook gốc (`useIntlayer`) và đặt cùng vị trí nội dung trong các tệp `.content.ts` bên cạnh các component của bạn.

Hướng dẫn này bao gồm **Chiến lược 1** trước tiên (compat adapter drop-in), sau đó hướng dẫn qua các di chuyển toàn bộ tùy chọn.

---

## Mục lục

<TOC/>

---

## Hướng dẫn di chuyển nhanh chóng

Các bước sau đây là mức tối thiểu cần thiết để chạy ứng dụng `vue-i18n` hiện tại của bạn trên Intlayer mà không cần thay đổi mã trong các component.

<Steps>

<Step number={1} title="Cài đặt Dependencies">

Cài đặt các gói core của Intlayer và adapter tương thích:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là một AI agent.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Bạn có thể giữ `vue-i18n` được cài đặt — adapter tương thích sử dụng nó như một `devDependency` / `peerDependency` cho các kiểu TypeScript.

</Step>

<Step number={2} title="Cấu hình Intlayer">

Lệnh `intlayer init` tạo một `intlayer.config.ts` khởi động. Cập nhật nó để khớp với các locale hiện tại của bạn và trỏ plugin `syncJSON` vào các tệp tin message của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Thêm tất cả các locale hiện tại của bạn ở đây
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // khớp với cú pháp placeholder vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** ánh xạ một locale tới đường dẫn tệp JSON của nó. **`location`** cho Intlayer watcher biết thư mục nào để theo dõi các thay đổi. Tùy chọn `format: 'icu'` đảm bảo rằng các placeholder được phân tích cú pháp chính xác cho `vue-i18n`.

</Step>

<Step number={3} title="Thêm plugin Intlayer vào Bundler của bạn">

Bao bọc cấu hình bundler hiện tại của bạn bằng plugin tương thích. Nó sáng tác plugin core Intlayer, thiết lập content watching, và — quan trọng nhất — **chèn một module alias** để các lệnh gọi `import … from 'vue-i18n'` hiện tại của bạn được chuyển hướng trong suốt tới `@intlayer/vue-i18n` tại thời gian xây dựng. Không cần thay đổi tệp source.

**Cho Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` bao bọc plugin `intlayer()` của `vite-intlayer` và thêm alias `vue-i18n`. Sử dụng plugin `intlayer()` đơn thuần từ `vite-intlayer` biên dịch dictionaries nhưng **không** thêm alias — sau đó bạn sẽ cần đổi tên imports thành `@intlayer/vue-i18n` theo cách thủ công (xem Bước 4).

**Cho Nuxt:**

Nếu bạn đang sử dụng `@nuxtjs/i18n` (tích hợp Nuxt), cài đặt `nuxt-intlayer` và thêm nó vào `nuxt.config.ts` của bạn:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // Bạn có thể an toàn loại bỏ @nuxtjs/i18n từ các module của bạn
});
```

> **Bạn không còn cần `createI18n()` hoặc bootstrap provider thủ công.** Intlayer biên dịch tất cả dictionaries tại **thời gian xây dựng**, vì vậy không có bước tải thời gian chạy. Provider được tạo alias xử lý khởi tạo cho bạn.

</Step>

</Steps>

Đó là tất cả những gì cần thiết cho hướng dẫn di chuyển nhanh chóng. Ứng dụng của bạn giờ đây chạy trên Intlayer trong khi giữ nguyên mọi lệnh gọi và API `vue-i18n`.

> **Các khóa dịch được gõ — tự động.** Sau khi Intlayer biên dịch các dictionaries của bạn, `useI18n` được gõ đối với nội dung thực tế của bạn khi bạn chuyển tùy chọn `namespace`. Các khóa được tự động hoàn thành trong IDE của bạn và các đường dẫn không hợp lệ gây ra các lỗi TypeScript tại thời gian xây dựng — không cần thiết lập bổ sung.
>
> ```ts
> // 'about' là một khóa dictionary được đăng ký
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ tự động hoàn thành
> t("does.not.exist"); // ✗ Lỗi TypeScript
> ```

---

## Hoàn tất quá trình di chuyển

Các bước dưới đây là tùy chọn và có thể thực hiện từng bước. Chúng mở khóa bộ tính năng đầy đủ của Intlayer: trình chỉnh sửa trực quan, CMS, các tệp nội dung được gõ, dịch tự động bằng AI, v.v.

<Steps>

<Step number={4} title="Đổi tên import rõ ràng (tùy chọn)" isOptional={true}>

Các plugin Intlayer đã xử lý aliasing ở cấp bundler. Nếu bạn muốn làm cho phụ thuộc rõ ràng trong các tệp nguồn của mình, bạn có thể đổi tên các import theo cách thủ công:

| Trước                                   | Sau                                               |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

Đây là các **thay thế drop-in** — không cần thay đổi nào đối với chữ ký cuộc gọi, đối số hoặc các loại trả về.

</Step>

<Step number={5} title="Bật Tự động hóa Dịch được Hỗ trợ bởi AI" isOptional={true}>

Sau khi Intlayer được kết nối, hãy sử dụng CLI của nó để điền các bản dịch còn thiếu tự động:

```bash packageManager="npm"
# Kiểm tra các bản dịch còn thiếu (thêm vào CI)
npx intlayer test

# Điền các bản dịch còn thiếu bằng AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Thêm cấu hình AI vào `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // mặc định
    // model: "gpt-4o-mini",   // mặc định
  },
};

export default config;
```

> Xem [tài liệu Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để biết tất cả các tùy chọn có sẵn.

</Step>

</Steps>

---

## Những gì bạn có thể xóa sau khi di chuyển

Sau khi các bộ chuyển đổi tương thích được đặt vào, các boilerplate `vue-i18n` sau đây có thể bị xóa:

| File / pattern                            | Tại sao nó không còn cần thiết                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `createI18n()` calls                      | Provider của Intlayer khởi tạo mọi thứ tự động; không có bước tải tại runtime.                                                                   |
| Vue plugin registration (`app.use(i18n)`) | Plugin Intlayer xử lý injection và bootstrapping ở phía sau.                                                                                     |
| JSON language bundles (`locales/*.json`)  | Các bundle JSON chỉ cần thiết nếu bạn vẫn sử dụng plugin `syncJSON`. Sau khi di chuyển sang các file `.content.ts`, bạn có thể xóa thư mục JSON. |

Khi bạn sẵn sàng để đi xa hơn, Intlayer **tự động phát hiện tất cả các file `.content.ts` và `.content.json` ở bất kỳ đâu trong codebase của bạn** (theo mặc định, ở bất kỳ đâu bên trong `./src`). Bạn có thể đặt một file `my-component.content.ts` ngay cạnh `MyComponent.vue` của bạn và Intlayer sẽ nhận nó tại thời điểm build mà không cần cấu hình bổ sung — không imports, không registration, không file index tập trung. Điều này làm cho việc đặt cùng vị trí translations với pages và components hoàn toàn không gây khó khăn.

---

## Cấu hình TypeScript

Intlayer sử dụng module augmentation để cung cấp đầy đủ TypeScript intellisense cho các khóa dịch của bạn. Đảm bảo rằng `tsconfig.json` của bạn bao gồm các loại được tự động tạo:

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tự động tạo
  ],
}
```

---

## Cấu hình Git

Thêm thư mục được tạo bởi Intlayer vào `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

---

## Đi Sâu Hơn

- **Visual Editor** — Quản lý bản dịch một cách trực quan trong trình duyệt của bạn: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- **CMS** — Quản lý nội dung từ xa: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- **VS Code Extension** — Nhận khuyến nghị tự động hoàn thành mã và phát hiện lỗi dịch theo thời gian thực: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- **CLI Reference** — Danh sách đầy đủ các lệnh CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- **Intlayer with Vue** — Hướng dẫn thiết lập hoàn chỉnh cho Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md)
- **Intlayer with Nuxt** — Hướng dẫn thiết lập hoàn chỉnh cho Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nuxt.md)

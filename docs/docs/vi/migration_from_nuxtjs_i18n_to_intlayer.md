---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrate from @nuxtjs/i18n to Intlayer | Internationalization (i18n)"
description: "Learn how to migrate your Nuxt app from @nuxtjs/i18n to Intlayer — step by step, without breaking your existing code. Use the @intlayer/vue-i18n compat adapter for a zero-disruption transition."
keywords:
  - "@nuxtjs/i18n"
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
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrating từ @nuxtjs/i18n to Intlayer

## Tại sao nên chuyển đổi từ @nuxtjs/i18n sang Intlayer?

<AccordionGroup>

<Accordion header="Kích thước bundle">

Thay vì tải các file JSON khổng lồ vào các trang của bạn, hãy tải chỉ nội dung cần thiết. Intlayer giúp bạn **giảm kích thước bundle và trang lên đến 50%**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Giới hạn nội dung ứng dụng của bạn **giúp dễ bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng duy nhất mà không cần lo lắng về việc xem xét toàn bộ codebase nội dung của mình. Ngoài ra, Intlayer **được gõ hoàn toàn** để đảm bảo độ chính xác của nội dung của bạn.

Intlayer cũng là giải pháp có **phát triển tích cực nhất** trong hệ sinh thái i18n — các vấn đề được khắc phục nhanh chóng, các adapter framework mới được phát hành thường xuyên, và API cốt lõi được liên tục cải tiến dựa trên phản hồi sản xuất thực tế.

</Accordion>

<Accordion header="AI Agent">

Đặt cùng vị trí nội dung **giảm bối cảnh cần thiết** bởi các Large Language Models (LLMs). Intlayer cũng đi kèm với một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**, và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để làm cho trải nghiệm nhà phát triển (DX) thậm chí còn suôn sẻ hơn cho các AI agent.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tự động hóa để dịch trong đường ống CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí của nhà cung cấp AI của bạn. Intlayer cũng cung cấp một **compiler** để tự động hóa trích xuất nội dung, cũng như một [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để giúp bạn **dịch ở chế độ nền**.

</Accordion>

<Accordion header="Hiệu suất">

Kết nối các file JSON khổng lồ với các thành phần có thể dẫn đến các vấn đề về hiệu suất và phản ứng. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm xây dựng.

</Accordion>

<Accordion header="Mở rộng quy mô với những người không phải dev">

Không chỉ là một giải pháp i18n, Intlayer cung cấp một **[trình soạn thảo hình ảnh](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) được tự lưu trữ** và một **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình **theo thời gian thực**, giúp cộng tác với các dịch giả, biên tập viên và những thành viên nhóm khác trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>

</AccordionGroup>

---

## Chiến lược di chuyển

Vì `@nuxtjs/i18n` được hỗ trợ bởi `vue-i18n` ở phía dưới, có hai chiến lược bổ sung cho việc di chuyển sang Intlayer:

1. **Compat adapter (khuyến nghị cho các ứng dụng hiện có)** — Cài đặt `@intlayer/vue-i18n` và `nuxt-intlayer`. Điều này cung cấp **cùng API chính xác** như `vue-i18n` nhưng ủy quyền tất cả công việc dịch thuật cho Intlayer ở phía dưới. Bạn giữ lại `$t`, `useI18n()`, và định tuyến Nuxt hiện có — thay đổi duy nhất là khởi tạo.

2. **Di chuyển đầy đủ** — Từng bước thay thế các API `@nuxtjs/i18n` bằng các hook Intlayer gốc (`useIntlayer`) và đặt cùng vị trí nội dung trong các file `.content.ts` bên cạnh các component của bạn.

Hướng dẫn này bao gồm **Chiến lược 1** trước (compat adapter drop-in), sau đó hướng dẫn qua di chuyển đầy đủ tùy chọn.

---

## Mục lục

<TOC/>

---

## Quá trình di chuyển nhanh

Các bước sau là mức tối thiểu cần thiết để chạy ứng dụng Nuxt hiện có của bạn trên Intlayer mà không cần thay đổi bất kỳ mã nào trong các thành phần của bạn.

<Steps>

<Step number={1} title="Cài đặt Phụ thuộc">

Cài đặt các gói lõi Intlayer và adapter tương thích:

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

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là một tác nhân AI.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Bạn có thể an toàn giữ `@nuxtjs/i18n` được cài đặt trong quá trình di chuyển, mặc dù bạn sẽ xóa nó khỏi cấu hình Nuxt của mình sớm.

</Step>

<Step number={2} title="Cấu hình Intlayer">

Lệnh `intlayer init` tạo một `intlayer.config.ts` khởi động. Cập nhật nó để phù hợp với các locale hiện có của bạn và chỉ plugin `syncJSON` vào các tệp tin nhắn của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Thêm tất cả các locale hiện có của bạn ở đây
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // khớp với cú pháp placeholder vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** ánh xạ một locale vào đường dẫn tệp JSON của nó. **`location`** cho trình quan sát Intlayer biết thư mục nào để giám sát những thay đổi. Tùy chọn `format: 'icu'` đảm bảo rằng các placeholder được phân tích chính xác cho `vue-i18n`.

</Step>

<Step number={3} title="Cập nhật Cấu hình Nuxt">

Thay thế module `@nuxtjs/i18n` bằng `nuxt-intlayer` trong `nuxt.config.ts` của bạn. Plugin Intlayer tự động cài đặt các alias module, có nghĩa là các cuộc gọi `import { useI18n } from 'vue-i18n'` hiện có của bạn được chuyển hướng trong suốt sang `@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // Xóa '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **Bạn không cần định nghĩa các đối tượng cấu hình i18n Nuxt nữa.** Intlayer biên dịch tất cả các từ điển vào **thời gian xây dựng**, xử lý phát hiện locale, định tuyến và tải từ điển một cách liền mạch.

</Step>

</Steps>

Đó là tất cả những gì cần thiết cho quá trình di chuyển nhanh. Ứng dụng Nuxt của bạn hiện chạy trên Intlayer trong khi giữ lại mọi `$t` và `useI18n()`.

---

## Hoàn tất di chuyển

Các bước dưới đây là tùy chọn và có thể được thực hiện dần dần. Chúng mở khóa bộ tính năng Intlayer đầy đủ: trình chỉnh sửa trực quan, CMS, các tệp nội dung được gõ, dịch tự động bằng AI, và hơn thế nữa.

<Steps>

<Step number={4} title="Đổi tên import rõ ràng (tùy chọn)" isOptional={true}>

Các plugin Intlayer đã xử lý aliasing ở cấp bundler. Nếu bạn muốn làm cho phụ thuộc rõ ràng trong các tệp nguồn của mình, bạn có thể đổi tên các import theo cách thủ công:

| Trước                                | Sau                                            |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

Đây là **những thay thế trực tiếp** — không cần thay đổi gì về chữ ký cuộc gọi, đối số hoặc kiểu trả về.

</Step>

<Step number={5} title="Bật Tự động hóa Dịch được Hỗ trợ bằng AI" isOptional={true}>

Khi Intlayer được kết nối, hãy sử dụng CLI của nó để điền vào các bản dịch bị thiếu tự động:

```bash packageManager="npm"
# Kiểm tra các bản dịch bị thiếu (thêm vào CI)
npx intlayer test

# Điền các bản dịch bị thiếu bằng AI
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
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

Khi compat adapter đã được triển khai, boilerplate sau đây có thể được xóa:

| File / pattern                            | Tại sao nó không còn cần thiết                                                                                                                |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18n` configurations in `nuxt.config.ts` | Intlayer xử lý định tuyến, tải từ điển và các locale mặc định nội bộ.                                                                         |
| `@nuxtjs/i18n` from `package.json`        | Được thay thế hoàn toàn bởi `nuxt-intlayer`.                                                                                                  |
| JSON language bundles (`locales/*.json`)  | JSON bundles chỉ cần thiết nếu bạn vẫn sử dụng plugin `syncJSON`. Khi bạn di chuyển sang các file `.content.ts`, bạn có thể xóa thư mục JSON. |

Khi bạn sẵn sàng để đi xa hơn, Intlayer **tự động phát hiện tất cả các file `.content.ts` và `.content.json` ở bất kỳ đâu trong codebase của bạn** (theo mặc định, bất kỳ đâu bên trong `./src`). Bạn có thể đặt một file `my-component.content.ts` ngay bên cạnh `MyComponent.vue` của bạn và Intlayer sẽ nhận nó tại thời gian build mà không cần bất kỳ cấu hình bổ sung nào — không có imports, không có registration, không cần file index tập trung. Điều này làm cho việc đặt các bản dịch cùng với các trang và thành phần hoàn toàn không ma sát.

---

## Cấu hình TypeScript

Intlayer sử dụng module augmentation để cung cấp đầy đủ TypeScript intellisense cho các khóa dịch của bạn. Hãy đảm bảo `tsconfig.json` của bạn bao gồm các kiểu được tự động tạo:

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tự động tạo
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

## Đi Xa Hơn

- **Visual Editor** — Quản lý bản dịch trực quan trong trình duyệt của bạn: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- **CMS** — Externalize và quản lý nội dung từ xa: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- **VS Code Extension** — Nhận autocompletion và phát hiện lỗi bản dịch real-time: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- **CLI Reference** — Danh sách đầy đủ các lệnh CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- **Intlayer with Nuxt** — Hướng dẫn thiết lập đầy đủ cho Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nuxt.md)
- **Intlayer with Vue** — Hướng dẫn thiết lập đầy đủ cho Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md)

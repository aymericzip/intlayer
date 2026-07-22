---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrate from i18next to Intlayer | Internationalization (i18n)"
description: "Learn how to migrate your JavaScript/TypeScript app from i18next to Intlayer — step by step, without breaking your existing code. Use the @intlayer/i18next compat adapter for a zero-disruption transition."
keywords:
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrating from i18next to Intlayer

## Tại sao nên chuyển từ i18next sang Intlayer?

<AccordionGroup>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON khổng lồ vào các trang của bạn, chỉ tải nội dung cần thiết. Intlayer giúp **giảm kích thước bundle và trang của bạn lên tới 50%**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Phạm vi nội dung ứng dụng của bạn **tạo điều kiện thuận lợi cho việc bảo trì** các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng duy nhất mà không cần lo lắng về việc xem lại toàn bộ codebase nội dung của mình. Ngoài ra, Intlayer **hoàn toàn được gõ kiểu** để đảm bảo độ chính xác của nội dung của bạn.

Intlayer cũng là giải pháp có **phát triển tích cực nhất** trong hệ sinh thái i18n — các vấn đề được sửa chữa nhanh chóng, các adapter khung mới được phát hành thường xuyên, và API cốt lõi được liên tục cải tiến dựa trên phản hồi sản xuất thực tế.

</Accordion>

<Accordion header="AI Agent">

Đặt nội dung cùng nhau **giảm ngữ cảnh cần thiết** bởi Large Language Models (LLMs). Intlayer cũng đi kèm với một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**, và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để làm cho trải nghiệm nhà phát triển (DX) thậm chí còn mịn màng hơn cho các agent AI.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tự động hóa để dịch trong pipeline CI/CD của bạn bằng cách sử dụng LLM lựa chọn của bạn với chi phí của nhà cung cấp AI của bạn. Intlayer cũng cung cấp **compiler** để tự động trích xuất nội dung, cũng như [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

</Accordion>

<Accordion header="Hiệu suất">

Kết nối các tệp JSON khổng lồ với các component có thể dẫn đến các vấn đề về hiệu suất và phản ứng. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm xây dựng.

</Accordion>

<Accordion header="Mở rộng quy mô với non-dev">

Không chỉ là một giải pháp i18n, Intlayer cung cấp **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)** và **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình **real-time**, làm cho sự cộng tác với các nhà dịch, biên tập viên và các thành viên nhóm khác diễn ra liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>

</AccordionGroup>

---

## Chiến lược di chuyển

Có hai chiến lược bổ sung nhau để di chuyển từ `i18next` sang Intlayer:

1. **Compat adapter (được khuyến nghị cho các ứng dụng hiện có)** — Cài đặt `@intlayer/i18next`. Gói này cung cấp **API giống hệt** với `i18next` nhưng ủy quyền tất cả công việc dịch cho Intlayer ở phía sau. Bạn giữ lại các lệnh gọi `i18next.t()`, `i18next.changeLanguage()` và `createInstance()` hiện có của mình — thay đổi duy nhất là đường dẫn import và khởi tạo.

2. **Di chuyển toàn bộ** — Thay thế dần các API `i18next` bằng các công cụ Intlayer gốc và đồng vị trí hóa nội dung trong các tệp `.content.ts`.

Hướng dẫn này bao gồm **Chiến lược 1** trước tiên (compat adapter plug-and-play), sau đó hướng dẫn qua quá trình di chuyển toàn bộ tùy chọn.

---

## Mục lục

<TOC/>

---

## Hướng dẫn sơ lược về cách chuyển đổi

Các bước sau đây là những bước tối thiểu cần thiết để chạy ứng dụng `i18next` hiện có của bạn trên Intlayer mà không cần thay đổi mã.

<Steps>

<Step number={1} title="Cài đặt các phụ thuộc">

Cài đặt các gói Intlayer core và bộ adapter tương thích:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là một agent AI.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> Bạn có thể giữ `i18next` được cài đặt — bộ adapter tương thích sử dụng nó như một `devDependency` / `peerDependency` cho các loại TypeScript.

</Step>

<Step number={2} title="Cấu hình Intlayer">

Lệnh `intlayer init` tạo ra một tệp `intlayer.config.ts` khởi động. Cập nhật nó để phù hợp với các locale hiện có của bạn và chỉ plugin `syncJSON` tới các tệp tin thông báo của bạn:

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
      // khớp với cú pháp placeholder i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** ánh xạ một locale tới đường dẫn tệp JSON của nó. **`location`** cho Intlayer watcher biết thư mục nào để giám sát các thay đổi. Tùy chọn `format: 'i18next'` đảm bảo rằng các placeholder như `{{name}}` được phân tích cú pháp chính xác.

</Step>

<Step number={3} title="Cập nhật Alias Bundler (Tùy chọn)">

Nếu bạn đang sử dụng một bundler (Vite, Webpack, esbuild), bạn có thể tiêm một alias module sao cho `import ... from 'i18next'` tự động phân giải thành `@intlayer/i18next`. Điều này loại bỏ nhu cầu thay đổi thủ công bất kỳ import nào trong codebase của bạn.

**Cho Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` bao bọc plugin `intlayer()` của `vite-intlayer` và thêm
> alias `i18next` → `@intlayer/i18next` cho bạn. Sử dụng plugin `intlayer()` đơn giản
> từ `vite-intlayer` biên dịch các từ điển nhưng **không** thêm alias đó — bạn
> sẽ cần đổi tên các import thành `@intlayer/i18next` theo cách thủ công (xem bước tiếp theo).

</Step>

</Steps>

Đó là tất cả những gì bạn cần cho hướng dẫn sơ lược về cách chuyển đổi. Ứng dụng của bạn bây giờ chạy trên Intlayer trong khi giữ nguyên mọi import và API của `i18next`.

---

## Hoàn thành quá trình di chuyển

Các bước dưới đây là tùy chọn và có thể được thực hiện dần dần. Chúng mở khóa bộ tính năng đầy đủ của Intlayer: trình chỉnh sửa trực quan, CMS, tệp nội dung được gõ, dịch tự động hóa bằng AI, và hơn thế nữa.

<Steps>

<Step number={4} title="Đổi tên nhập rõ ràng (tùy chọn)" isOptional={true}>

Nếu bạn muốn làm cho dependency rõ ràng trong các tệp nguồn của mình, hoặc nếu bạn không sử dụng plugin bundler để tạo alias cho các import, bạn có thể đổi tên các import theo cách thủ công:

| Trước                                      | Sau                                                  |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

Đây là **drop-in replacements** — không cần thay đổi chữ ký hàm, đối số hoặc kiểu trả về.

</Step>

<Step number={5} title="Bật Tự động hóa Dịch được Cấp năng lượng bằng AI" isOptional={true}>

Khi Intlayer đã được thiết lập, hãy sử dụng CLI của nó để điền các bản dịch bị thiếu một cách tự động:

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
      format: "i18next",
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

> Xem [tài liệu CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để biết tất cả các tùy chọn có sẵn.

</Step>

</Steps>

---

## Những gì bạn có thể xóa sau khi di chuyển

Khi adapter tương thích được triển khai, boilerplate `i18next` sau đây có thể được xóa:

| File / pattern                           | Lý do không còn cần thiết                                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Intlayer khởi tạo mọi thứ tự động; không có bước tải runtime.                                                                                 |
| `i18next.use(...)`                       | Intlayer không sử dụng các plugin, backend hoặc language detector của i18next.                                                                |
| JSON language bundles (`locales/*.json`) | JSON bundles chỉ cần thiết nếu bạn vẫn sử dụng plugin `syncJSON`. Sau khi di chuyển sang các file `.content.ts`, bạn có thể xóa thư mục JSON. |

Khi bạn sẵn sàng tiến thêm, Intlayer **tự động phát hiện tất cả các file `.content.ts` và `.content.json` ở bất kỳ đâu trong codebase của bạn** (mặc định, ở bất kỳ đâu trong `./src`). Bạn có thể đặt một file `my-component.content.ts` ngay cạnh logic của bạn và Intlayer sẽ nhận nó tại build time mà không cần cấu hình bổ sung — không cần import, registration, hay file index tập trung. Điều này giúp việc co-locating translations hoàn toàn không gặp khó khăn.

---

## Cấu hình TypeScript

Intlayer sử dụng module augmentation để cung cấp đầy đủ TypeScript intellisense cho các khóa dịch của bạn. Hãy đảm bảo rằng `tsconfig.json` của bạn bao gồm các loại được tự động tạo:

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

## Đi Xa Hơn

- **Visual Editor** — Quản lý bản dịch trực quan trong trình duyệt của bạn: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- **CMS** — Ngoại hóa và quản lý nội dung từ xa: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- **VS Code Extension** — Nhận khả năng tự động hoàn thành và phát hiện lỗi dịch thời gian thực: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- **CLI Reference** — Danh sách đầy đủ các lệnh CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)

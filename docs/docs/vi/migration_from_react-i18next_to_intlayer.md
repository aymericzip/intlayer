---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrate from react-i18next / i18next to Intlayer | Internationalization (i18n)"
description: "Learn how to migrate your React or Next.js app from react-i18next or i18next to Intlayer — step by step, without breaking your existing code. Use the @intlayer/react-i18next and @intlayer/i18next compat adapters for a zero-disruption transition."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrating from react-i18next / i18next to Intlayer

## Tại sao nên chuyển từ react-i18next / i18next sang Intlayer?

<AccordionGroup>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON khổng lồ vào trang của bạn, chỉ tải nội dung cần thiết. Intlayer giúp **giảm kích thước bundle và trang của bạn tới 50%**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Phạm vi nội dung ứng dụng của bạn **tạo điều kiện thuận lợi cho việc bảo trì** các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng duy nhất mà không cần lo lắng về việc kiểm tra toàn bộ codebase nội dung của mình. Ngoài ra, Intlayer **được gõ hoàn toàn** để đảm bảo độ chính xác của nội dung của bạn.

Intlayer cũng là giải pháp có **phát triển tích cực nhất** trong hệ sinh thái i18n — các vấn đề được sửa chữa nhanh chóng, các bộ điều hợp framework mới được giới thiệu thường xuyên, và API cốt lõi được liên tục cải tiến dựa trên phản hồi sản xuất thực tế.

</Accordion>

<Accordion header="AI Agent">

Đặt nội dung cùng vị trí **giảm bối cảnh cần thiết** bởi Large Language Models (LLMs). Intlayer cũng đi kèm với một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**, và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để làm cho trải nghiệm nhà phát triển (DX) còn suôn sẻ hơn cho các agent AI.

</Accordion>

<Accordion header="Automation">

Sử dụng tự động hóa để dịch trong pipeline CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí của nhà cung cấp AI của bạn. Intlayer cũng cung cấp một **compiler** để tự động hóa việc trích xuất nội dung, cũng như một [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để giúp **dịch trong nền**.

</Accordion>

<Accordion header="Performance">

Kết nối các tệp JSON khổng lồ với các thành phần có thể dẫn đến các vấn đề về hiệu suất và phản ứng. Intlayer tối ưu hóa tải nội dung của bạn tại thời điểm xây dựng.

</Accordion>

<Accordion header="Scaling with non-dev">

Hơn chỉ là một giải pháp i18n, Intlayer cung cấp một **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) tự lưu trữ** và một **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình **theo thời gian thực**, làm cho cộng tác với các dịch giả, biên tập viên và các thành viên nhóm khác trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>

</AccordionGroup>

---

## Chiến lược di chuyển

Có hai chiến lược bổ sung cho việc di chuyển từ `react-i18next` / `i18next` sang Intlayer:

1. **Compat adapter (được khuyến nghị cho các ứng dụng hiện có)** — Cài đặt `@intlayer/react-i18next` (cho các thành phần React) và/hoặc `@intlayer/i18next` (cho instance `i18n` cốt lõi). Các gói này công khai **API chính xác giống nhau** như `react-i18next` / `i18next` nhưng ủy thác toàn bộ công việc dịch cho Intlayer dưới nắp. Bạn giữ lại các lệnh gọi `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` hiện có — thay đổi duy nhất là đường dẫn import.

2. **Di chuyển toàn bộ** — Dần dần thay thế các API `react-i18next` bằng các hook Intlayer native (`useIntlayer`, `IntlayerProvider`) và đặt nội dung cùng vị trí trong các file `.content.ts` bên cạnh các thành phần của bạn.

Hướng dẫn này bao gồm **Chiến lược 1** trước (compat adapter plug-and-play), sau đó hướng dẫn qua quá trình di chuyển toàn bộ tùy chọn.

---

## Mục lục

<TOC/>

---

## Sự di chuyển nhanh chóng

Các bước sau đây là tối thiểu cần thiết để chạy ứng dụng `react-i18next` hiện tại của bạn trên Intlayer mà không cần thay đổi mã.

<Steps>

<Step number={1} title="Cài đặt Dependencies">

Cài đặt các gói core của Intlayer và các bộ chuyển đổi tương thích:

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

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là agent AI.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Bạn có thể giữ `react-i18next` và `i18next` được cài đặt — các bộ chuyển đổi tương thích sử dụng chúng như `devDependencies` / tùy chọn `peerDependencies` cho các loại TypeScript. Bạn không cần thay đổi bất kỳ peers `package.json` nào.

</Step>

<Step number={2} title="Cấu hình Intlayer">

Lệnh `intlayer init` tạo một `intlayer.config.ts` khởi động. Cập nhật nó để khớp với các locale hiện tại của bạn và chỉ plugin `syncJSON` đến các tệp tin của bạn:

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
      // khớp với cú pháp placeholder react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** ánh xạ một locale đến đường dẫn tệp JSON của nó. **`location`** cho Intlayer watcher biết thư mục nào cần giám sát những thay đổi. Tùy chọn `format: 'i18next'` đảm bảo rằng các placeholder như `{{name}}` được phân tích cú pháp một cách chính xác.

</Step>

<Step number={3} title="Thêm Plugin Intlayer vào Bundler của bạn">

Bọc cấu hình bundler hiện tại của bạn bằng plugin tương thích. Nó tổng hợp plugin core Intlayer, dây dẫn các nội dung theo dõi, và — rất quan trọng — **tiêm module aliases** để các lệnh `import … from 'react-i18next'` (và `'i18next'`) hiện tại của bạn được chuyển hướng một cách trong suốt đến `@intlayer/react-i18next` / `@intlayer/i18next` tại thời gian xây dựng. Không cần thay đổi tệp tin nguồn.

**Đối với Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` bọc plugin `intlayer()` của `vite-intlayer` và thêm các alias `react-i18next` / `i18next`. Sử dụng plugin `intlayer()` đơn giản từ `vite-intlayer` biên dịch các từ điển nhưng **không** thêm các alias đó — bạn sau đó sẽ phải đổi tên các import thành `@intlayer/*` theo cách thủ công (xem Bước 4).

**Đối với Next.js:**

Nếu bạn đang sử dụng `next-i18next` (tích hợp Pages Router), hãy cài đặt `@intlayer/next-i18next` và `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Sau đó thêm plugin tương thích vào `next.config.ts` của bạn (nó tiêm các alias `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {/* các tùy chọn của bạn */};

export default withIntlayer(nextConfig);
```

> **Bạn không còn cần `i18next.init()` hoặc khởi động provider thủ công.** Intlayer biên dịch tất cả các từ điển tại **thời gian xây dựng**, vì vậy không có bước tải hạng nhân tài nào. Nhà cung cấp bị tính bí danh xử lý việc khởi tạo cho bạn.

</Step>

</Steps>

Đó là tất cả cho sự di chuyển nhanh chóng. Ứng dụng của bạn hiện chạy trên Intlayer trong khi giữ nguyên mọi import và API `react-i18next`.

> **Các khóa dịch được gõ — tự động.** Khi Intlayer biên dịch các từ điển của bạn, `useTranslation` và `getFixedT` được gõ dựa trên nội dung thực tế của bạn. Các khóa được tự động hoàn thành trong IDE của bạn và các đường dẫn không hợp lệ gây ra lỗi TypeScript tại thời gian xây dựng — không cần thiết lập thêm.
>
> ```tsx
> // 'about' là một khóa từ điển được đăng ký → t() chỉ chấp nhận các đường dẫn dot hợp lệ
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ tự động hoàn thành
> t("does.not.exist"); // ✗ lỗi TypeScript
>
> // Phía máy chủ (instance i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ được gõ
> ```

---

## Quá trình di chuyển hoàn toàn

Các bước dưới đây là tùy chọn và có thể được thực hiện từng bước. Chúng mở khóa bộ tính năng Intlayer đầy đủ: trình chỉnh sửa trực quan, CMS, các tệp nội dung được gõ, dịch được hỗ trợ bởi AI, và hơn thế nữa.

<Steps>

<Step number={4} title="Đổi tên nhập rõ ràng (tùy chọn)" isOptional={true}>

Các plugin Intlayer đã xử lý aliasing ở mức bundler. Nếu bạn muốn làm cho sự phụ thuộc rõ ràng trong các tệp nguồn của mình, bạn có thể đổi tên các bản import theo cách thủ công:

| Trước                                              | Sau                                                          |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Đối với Next.js (`next-i18next`):

| Trước                                                                          | Sau                                                               |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>

<Step number={5} title="Bật Tự động dịch được hỗ trợ bởi AI" isOptional={true}>

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

Khi các compat adapters đã được triển khai, boilerplate `react-i18next` / `i18next` sau đây có thể được xóa:

| File / pattern                           | Lý do nó không còn cần thiết                                                                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Intlayer's provider khởi tạo mọi thứ tự động; không có bước tải lúc runtime.                                                                 |
| `I18nextProvider` / `initReactI18next`   | The Intlayer plugin xử lý injection và bootstrapping under the hood.                                                                         |
| JSON language bundles (`locales/*.json`) | JSON bundles chỉ cần thiết nếu bạn vẫn sử dụng plugin `syncJSON`. Khi bạn di chuyển sang các file `.content.ts` bạn có thể xóa thư mục JSON. |

Khi bạn sẵn sàng tiến xa hơn, Intlayer **tự động khám phá tất cả các file `.content.ts` và `.content.json` ở bất kỳ đâu trong codebase của bạn** (theo mặc định, ở bất kỳ đâu trong `./src`). Bạn có thể đặt một file `my-component.content.ts` ngay cạnh `MyComponent.tsx` của bạn và Intlayer sẽ nhận nó khi build mà không cần cấu hình bổ sung — không cần imports, không cần registration, không cần file index tập trung. Điều này làm cho việc co-locating translations với pages và components hoàn toàn không gặp trở ngại.

---

## Cấu hình TypeScript

Intlayer sử dụng module augmentation để cung cấp đầy đủ intellisense TypeScript cho các khóa dịch của bạn. Đảm bảo rằng `tsconfig.json` của bạn bao gồm các loại được tạo tự động:

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tạo tự động
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

- **Visual Editor** — Quản lý bản dịch một cách trực quan trong trình duyệt của bạn: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- **CMS** — Externalize và quản lý nội dung từ xa: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- **VS Code Extension** — Nhận tính năng tự động hoàn thành và phát hiện lỗi dịch trong thời gian thực: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- **CLI Reference** — Danh sách đầy đủ các lệnh CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- **Intlayer with React** — Hướng dẫn thiết lập đầy đủ cho React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)
- **Intlayer with Next.js** — Hướng dẫn thiết lập đầy đủ cho Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)

---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrate from next-i18next to Intlayer | Internationalization (i18n)"
description: "Learn how to migrate your Next.js app from next-i18next to Intlayer — step by step, without breaking your existing code. Use the @intlayer/next-i18next compat adapter for a zero-disruption transition."
keywords:
  - next-i18next
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
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Di chuyển từ next-i18next sang Intlayer

## Tại sao nên migrate từ next-i18next sang Intlayer?

<AccordionGroup>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON khổng lồ vào các trang của bạn, chỉ tải nội dung cần thiết. Intlayer giúp **giảm kích thước bundle và trang của bạn lên tới 50%**.

</Accordion>

<Accordion header="Dễ bảo trì">

Phân chia nội dung ứng dụng của bạn **giúp dễ bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng duy nhất mà không cần phải xem xét toàn bộ codebase nội dung của mình. Ngoài ra, Intlayer **có đầy đủ kiểu dữ liệu** để đảm bảo độ chính xác của nội dung của bạn.

Intlayer cũng là giải pháp có **phát triển tích cực nhất** trong hệ sinh thái i18n — các lỗi được sửa nhanh chóng, các bộ điều hợp framework mới được phát hành thường xuyên, và API cốt lõi được liên tục cải tiến dựa trên phản hồi từ sản xuất thực tế.

</Accordion>

<Accordion header="AI Agent">

Đặt nội dung cùng vị trí **giảm bối cảnh cần thiết** bởi các Mô hình Ngôn ngữ Lớn (LLMs). Intlayer cũng đi kèm với một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**, và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để làm cho trải nghiệm nhà phát triển (DX) thậm chí còn mượt mà hơn cho các AI agents.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tự động hóa để dịch trong pipeline CI/CD của bạn bằng cách sử dụng LLM lựa chọn của bạn với chi phí của nhà cung cấp AI của bạn. Intlayer cũng cung cấp một **compiler** để tự động hóa trích xuất nội dung, cũng như một [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để giúp **dịch trong nền**.

</Accordion>

<Accordion header="Hiệu suất">

Kết nối các tệp JSON khổng lồ với các thành phần có thể dẫn đến các vấn đề về hiệu suất và tính phản ứng. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm xây dựng.

</Accordion>

<Accordion header="Mở rộng quy mô với non-dev">

Hơn chỉ là một giải pháp i18n, Intlayer cung cấp một **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) tự lưu trữ** và một **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình **theo thời gian thực**, giúp cộng tác với các dịch giả, biên tập viên nội dung và các thành viên nhóm khác một cách liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>

</AccordionGroup>

---

## Chiến lược di chuyển

Vì `next-i18next` bao bọc `react-i18next` và `i18next` bên dưới, có hai chiến lược bổ sung để di chuyển sang Intlayer:

1. **Compat adapter (khuyến nghị cho các ứng dụng hiện có)** — Cài đặt `@intlayer/next-i18next`, `@intlayer/react-i18next`, và `@intlayer/i18next`. Những package này hiển thị **API hoàn toàn giống nhau** với các đối tác của chúng nhưng ủy thác tất cả công việc dịch cho Intlayer bên dưới. Bạn giữ nguyên các lệnh gọi `useTranslation`, `appWithTranslation`, `serverSideTranslations` và định tuyến Next.js Pages không thay đổi — thay đổi duy nhất là quá trình khởi tạo.

2. **Di chuyển toàn bộ** — Dần dần thay thế các API `next-i18next` bằng các hook Intlayer gốc (`useIntlayer`) và đặt cùng vị trí nội dung trong các tệp `.content.ts` bên cạnh các thành phần của bạn.

Hướng dẫn này bao gồm **Chiến lược 1** trước tiên (compat adapter sẵn sàng sử dụng), sau đó hướng dẫn qua quá trình di chuyển toàn bộ tùy chọn.

---

## Mục lục

<TOC/>

---

## Migración nhanh

Các bước sau đây là yêu cầu tối thiểu để chạy ứng dụng Next.js Pages Router hiện tại của bạn trên Intlayer mà không cần thay đổi mã trong các trang và thành phần của bạn.

<Steps>

<Step number={1} title="Cài đặt Phụ thuộc">

Cài đặt các gói lõi Intlayer và bộ điều hợp tương thích:

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
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Bạn có thể an toàn giữ `next-i18next`, `react-i18next` và `i18next` được cài đặt trong quá trình migration, mặc dù bạn sẽ xóa chúng sau khi được alias.

</Step>

<Step number={2} title="Cấu hình Intlayer">

Lệnh `intlayer init` tạo một `intlayer.config.ts` khởi động. Cập nhật nó để phù hợp với các locale hiện tại của bạn và chỉ plugin `syncJSON` tới các tệp tin tin nhắn `next-i18next` của bạn (thường nằm trong `public/locales`):

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
      // khớp với cú pháp placeholder i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** ánh xạ một locale và một namespace (`key`) tới đường dẫn tệp JSON của nó. **`location`** cho plugin Intlayer watcher biết thư mục nào cần giám sát các thay đổi. Tùy chọn `format: 'i18next'` đảm bảo rằng các placeholder được phân tích cú pháp chính xác cho `next-i18next`.

</Step>

<Step number={3} title="Cập nhật Cấu hình Next.js">

Bọc `next.config.ts` (hoặc `.js`) hiện tại của bạn với `createNextI18nPlugin` từ `@intlayer/next-i18next/plugin`. Wrapper này soạn `withIntlayer` **và** tiêm các alias `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`, vì vậy các cuộc gọi `import { useTranslation } from 'next-i18next'` hiện tại của bạn được chuyển hướng một cách trong suốt tại thời gian xây dựng. Không cần thay đổi tệp nguồn.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// Bạn có thể xóa cấu hình i18n được nhập từ next-i18next.config.js
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer quản lý định tuyến i18n Next.js dưới các phần che phủ,
  // vì vậy bạn không cần chuyển đối tượng i18n vào đây nữa.
};

export default withIntlayer(nextConfig);
```

> **Bạn không còn cần `next-i18next.config.js`.** Intlayer biên dịch tất cả từ điển tại **thời gian xây dựng**, xử lý phát hiện locale, định tuyến và tải từ điển một cách liền mạch.
>
> Thích cách sử dụng `withIntlayer` từ `next-intlayer/server`? Nó biên dịch từ điển của bạn nhưng **không** thêm các alias `next-i18next` / `react-i18next` / `i18next` — bạn sẽ phải đổi tên imports thành `@intlayer/*` theo cách thủ công (xem Bước 4).

</Step>

</Steps>

Vậy là xong cho quá trình migration nhanh. Ứng dụng Next.js của bạn bây giờ chạy trên Intlayer trong khi giữ nguyên mọi cuộc gọi `useTranslation`, `serverSideTranslations` và `appWithTranslation`.

> **Các khóa dịch được gõ — tự động.** Một khi Intlayer biên dịch từ điển của bạn, `useTranslation` và `getFixedT` được gõ theo nội dung thực tế của bạn. Các khóa được tự động hoàn thành trong IDE của bạn và các đường dẫn không hợp lệ gây ra các lỗi TypeScript tại thời gian xây dựng — không cần thiết lập bổ sung.
>
> ```tsx
> // Pages Router — 'about' là một khóa từ điển được đăng ký
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ tự động hoàn thành
> t("does.not.exist"); // ✗ Lỗi TypeScript
>
> // getStaticProps / getServerSideProps (instance i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ được gõ
> ```

---

## Hoàn tất quá trình di chuyển

Các bước dưới đây là tuỳ chọn và có thể được thực hiện theo từng giai đoạn. Chúng mở khóa bộ tính năng đầy đủ của Intlayer: trình soạn thảo trực quan, CMS, các tệp nội dung được gõ, dịch tự động bằng AI, và hơn thế nữa.

<Steps>

<Step number={4} title="Đổi tên nhập rõ ràng (tuỳ chọn)" isOptional={true}>

Plugin Intlayer đã xử lý việc tạo bí danh ở mức bundler. Nếu bạn muốn làm cho phụ thuộc rõ ràng trong các tệp nguồn của mình, bạn có thể đổi tên các lần nhập theo cách thủ công:

| Trước                                                                          | Sau                                                               |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

Đây là các **thay thế sẵn sàng sử dụng** — không cần thay đổi chữ ký cuộc gọi, đối số hoặc kiểu trả về.

</Step>

<Step number={5} title="Bật Tự động dịch được hỗ trợ bởi AI" isOptional={true}>

Khi Intlayer được kết nối, hãy sử dụng CLI của nó để điền các bản dịch bị thiếu một cách tự động:

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

> Xem [tài liệu Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để biết tất cả các tuỳ chọn có sẵn.

</Step>

</Steps>

---

## Những gì bạn có thể xóa sau khi di chuyển

Khi compat adapter được triển khai, boilerplate `next-i18next` sau đây có thể được xóa:

| File / pattern                                  | Tại sao nó không còn được cần                                                                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                        | Intlayer xử lý routing, dictionary loading và default locales nội bộ dựa trên `intlayer.config.ts`.                                         |
| `next-i18next` từ `package.json`                | Được thay thế hoàn toàn bởi `@intlayer/next-i18next` và aliasing.                                                                           |
| JSON language bundles (`public/locales/*.json`) | JSON bundles chỉ được cần nếu bạn vẫn sử dụng plugin `syncJSON`. Khi bạn di chuyển sang các file `.content.ts` bạn có thể xóa thư mục JSON. |

Khi bạn sẵn sàng tiến xa hơn, Intlayer **tự động khám phá tất cả các file `.content.ts` và `.content.json` ở bất kỳ đâu trong codebase của bạn** (theo mặc định, ở bất kỳ đâu bên trong `./src`). Bạn có thể đặt một file `my-component.content.ts` ngay cạnh file `MyComponent.tsx` của bạn và Intlayer sẽ nhận nó tại thời gian build mà không cần bất kỳ cấu hình bổ sung — không có imports, không có registration, không cần file index tập trung. Điều này làm cho việc co-locating translations với pages và components hoàn toàn không có ma sát.

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

## Đi Sâu Hơn

- **Visual Editor** — Quản lý bản dịch trực quan trong trình duyệt của bạn: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- **CMS** — Ngoại hóa và quản lý nội dung từ xa: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- **VS Code Extension** — Nhận gợi ý tự động hoàn thành và phát hiện lỗi dịch theo thời gian thực: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- **CLI Reference** — Danh sách đầy đủ các lệnh CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- **Intlayer with Next.js (Pages Router)** — Hướng dẫn cài đặt đầy đủ cho Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_page_router.md)

---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Chuyển từ next-intl sang Intlayer | Quốc tế hóa (i18n)"
description: "Tìm hiểu cách chuyển Next.js app của bạn từ next-intl sang Intlayer — từng bước một, mà không phá vỡ mã hiện có của bạn. Sử dụng bộ chuyển đổi tương thích @intlayer/next-intl để thực hiện quá trình chuyển đổi không gián đoạn."
keywords:
  - next-intl
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Chuyển từ next-intl sang Intlayer

## Tại sao nên chuyển từ next-intl sang Intlayer?

<AccordionGroup>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON khổng lồ vào các trang của bạn, chỉ tải nội dung cần thiết. Intlayer giúp **giảm kích thước bundle và trang của bạn lên tới 50%**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Phạm vi nội dung ứng dụng của bạn **tạo điều kiện thuận lợi cho việc bảo trì** các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng duy nhất mà không cần lo lắng về việc xem xét toàn bộ codebase nội dung của bạn. Ngoài ra, Intlayer **hoàn toàn được gõ type** để đảm bảo độ chính xác của nội dung của bạn.

Intlayer cũng là giải pháp có **phát triển tích cực nhất** trong hệ sinh thái i18n — các sự cố được sửa chữa nhanh chóng, các adapter framework mới xuất hiện thường xuyên, và API cơ bản được liên tục cải tiến dựa trên phản hồi sản xuất thực tế.

</Accordion>

<Accordion header="AI Agent">

Đặt nội dung cùng vị trí **giảm ngữ cảnh cần thiết** bởi Large Language Models (LLMs). Intlayer cũng đi kèm với một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**, và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để làm cho trải nghiệm của nhà phát triển (DX) càng mượt mà hơn cho các AI agents.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tự động hóa để dịch trong pipeline CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí của nhà cung cấp AI của bạn. Intlayer cũng cung cấp một **compiler** để tự động hóa trích xuất nội dung, cũng như một [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để giúp **dịch trong nền**.

</Accordion>

<Accordion header="Hiệu suất">

Kết nối các tệp JSON khổng lồ với các thành phần có thể dẫn đến các vấn đề về hiệu suất và phản ứng. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm xây dựng.

</Accordion>

<Accordion header="Mở rộng với những người không phải nhà phát triển">

Hơn chỉ là một giải pháp i18n, Intlayer cung cấp một **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) được tự lưu trữ** và một **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình **theo thời gian thực**, làm cho sự cộng tác với các dịch giả, biên tập viên sao chép và các thành viên nhóm khác trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>

</AccordionGroup>

---

## Chiến lược di chuyển

Cách tiếp cận được khuyến nghị cho các ứng dụng hiện có là **compat adapter**: cài đặt `@intlayer/next-intl`, cái mà hiển thị **chính xác cùng API** như `next-intl` nhưng ủy quyền tất cả công việc dịch cho Intlayer ở phía sau.

Bạn giữ lại `useTranslations`, `getTranslations`, `NextIntlClientProvider` và các bạn của chúng — **thay đổi duy nhất là đường dẫn import**. Không cần tái cấu trúc các chữ ký gọi, hình dạng prop, hoặc cấu trúc thành phần.

Theo thời gian, bạn có thể tùy chọn di chuyển các tệp riêng lẻ sang định dạng `.content.ts` phong phú hơn của Intlayer để mở khóa trình chỉnh sửa trực quan, CMS, và phạm vi nội dung cho từng thành phần — nhưng bước đó hoàn toàn tùy chọn và có thể được thực hiện từng bước.

---

## Mục Lục

<TOC/>

---

## Quá trình migration nhanh

Các bước sau là mức tối thiểu cần thiết để chạy ứng dụng `next-intl` hiện tại của bạn trên Intlayer mà không cần thay đổi code.

<Steps>

<Step number={1} title="Cài đặt Dependencies">

Cài đặt các gói lõi của Intlayer và adapter tương thích `@intlayer/next-intl`:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là một AI agent.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> Giữ `next-intl` được cài đặt — nó vẫn được yêu cầu cho **định tuyến URL** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). Adapter tương thích **không** thay thế lớp định tuyến.

</Step>

<Step number={2} title="Cấu hình Intlayer">

Lệnh `intlayer init` tạo một `intlayer.config.ts` khởi đầu. Cập nhật nó để khớp với các locale hiện tại của bạn và trỏ plugin `syncJSON` tới các tệp tin message của bạn:

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
      // 'icu' khớp với cú pháp placeholder ICU của next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** ánh xạ một locale tới đường dẫn tệp JSON của nó. **`location`** cho Intlayer watcher biết thư mục nào cần theo dõi các thay đổi. Tùy chọn `format: 'icu'` đảm bảo các placeholder ICU như `{name}` và `{count, plural, one {# item} other {# items}}` được phân tích chính xác.

> Để xem danh sách đầy đủ các tùy chọn cấu hình, xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Thêm Plugin Intlayer vào Next.js">

Bao bọc cấu hình Next.js hiện tại của bạn với `createNextIntlPlugin` từ `@intlayer/next-intl/plugin`. Wrapper này soạn `withIntlayer` **và** đăng ký các alias `next-intl` → `@intlayer/next-intl` cho bạn:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* các tùy chọn cấu hình hiện tại của bạn */
};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` bao bọc `withIntlayer`, tự động phát hiện **Webpack** hoặc **Turbopack**, thiết lập theo dõi nội dung, biên dịch từ điển, và — quan trọng nhất — **tiêm các alias module** để các lệnh gọi `import … from 'next-intl'` hiện tại của bạn được chuyển hướng một cách minh bạch tới `@intlayer/next-intl` tại thời điểm xây dựng. Mục nhập định tuyến `next-intl/routing` vẫn trỏ tới gói thực tế. Không cần thay đổi tệp tin nguồn.
>
> Thích `withIntlayer` thuần túy từ `next-intlayer/server`? Nó sẽ biên dịch các từ điển của bạn, nhưng nó **không** thêm các alias `next-intl` — khi đó bạn sẽ phải đổi tên các import thành `@intlayer/next-intl` theo cách thủ công (xem Bước 4).

> **Bạn không còn cần `getRequestConfig` hoặc `loadMessages`.** Với `next-intl`, bạn phải viết một tệp `src/i18n.ts` tải các bundle message JSON trên mỗi yêu cầu qua `getRequestConfig`. Intlayer biên dịch tất cả các từ điển tại **thời điểm xây dựng**, vì vậy không có bước tải tại runtime. Bạn có thể xóa tệp đó hoàn toàn (hoặc chỉ giữ các phần định tuyến nếu bạn vẫn sử dụng `createNavigation`).

</Step>

</Steps>

Đó là tất cả cho quá trình migration nhanh. Ứng dụng của bạn bây giờ chạy trên Intlayer trong khi giữ nguyên mọi import và API `next-intl`.

> **Các khóa dịch được gõ — tự động.** Khi Intlayer biên dịch các từ điển của bạn, `useTranslations` và `getTranslations` được gõ dựa trên nội dung thực tế của bạn. Các khóa được tự động hoàn thành trong IDE của bạn và các đường dẫn không hợp lệ gây ra lỗi TypeScript tại thời điểm xây dựng — không cần thiết lập bổ sung.
>
> ```tsx
> // Client component — 'about' là một khóa từ điển đã đăng ký
> const t = useTranslations("about");
> t("counter.label"); // ✓ tự động hoàn thành
> t("does.not.exist"); // ✗ Lỗi TypeScript
>
> // Server component
> const t = await getTranslations("about");
> t("counter.label"); // ✓ được gõ
> ```

---

## Hoàn thành migration

Các bước dưới đây là tùy chọn và có thể được thực hiện theo từng bước. Chúng mở khóa bộ tính năng đầy đủ của Intlayer: trình chỉnh sửa trực quan, CMS, các tệp nội dung được định kiểu, dịch thuật được hỗ trợ bởi AI, và hơn thế nữa.

<Steps>

<Step number={4} title="Đổi tên nhập khẩu rõ ràng (tùy chọn)" isOptional={true}>

Trình bao bọc `createNextIntlPlugin()` đã xử lý bí danh `next-intl` → `@intlayer/next-intl` ở mức bundler. Nếu bạn muốn làm cho phụ thuộc rõ ràng trong các tệp nguồn của mình (và sử dụng plugin `withIntlayer` đơn giản thay vào đó), bạn có thể đổi tên các nhập khẩu theo cách thủ công:

| Trước                                                | Sau                                                            |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Luôn giữ các nhập khẩu định tuyến từ `next-intl` thực tế — bộ điều hợp tương thích **không** thay thế lớp định tuyến URL:
>
> ```ts
> // ✅ Luôn giữ các nhập khẩu này từ 'next-intl' thực tế
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Ngoài ra, bạn có thể sử dụng `defineRouting` từ `@intlayer/next-intl/routing` để tự động hợp nhất cấu hình locale từ `intlayer.config.ts` của bạn.

</Step>

<Step number={5} title="Kích hoạt Tự động hóa Dịch thuật được hỗ trợ bởi AI" isOptional={true}>

Sau khi Intlayer được kết nối, bạn có thể sử dụng CLI của nó để điền các bản dịch bị thiếu tự động bằng LLM mà bạn chọn:

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

Thêm `OPENAI_API_KEY` (hoặc khóa nhà cung cấp ưu tiên của bạn) vào tệp `.env` của bạn, sau đó mở rộng `intlayer.config.ts` của bạn:

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
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

## Những gì bạn có thể xóa sau khi migrate

Once `@intlayer/next-intl` is in place, the following `next-intl` boilerplate can be removed:

| File / pattern                                    | Why it's no longer needed                                                                                                                                        |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n.ts` → `getRequestConfig` export         | Intlayer compiles dictionaries at build time; there is no per-request message loading. Keep the file only if it also exports `createNavigation` routing helpers. |
| `loadMessages()` / `getMessages()` call in layout | The `NextIntlClientProvider` from `@intlayer/next-intl` reads from compiled output; no `messages` prop is required.                                              |
| `locales/{locale}/*.json` imports in layout       | JSON bundles are only needed if you still use the `syncJSON` plugin. Once you migrate to `.content.ts` files you can delete the JSON folder.                     |

When you are ready to go further, Intlayer **automatically discovers all `.content.ts` and `.content.json` files anywhere in your codebase** (by default, anywhere inside `./src`). You can place an `about.content.ts` file right next to your `about/page.tsx` and Intlayer will pick it up at build time with no additional configuration — no imports, no registration, no centralized index file needed. This makes co-locating translations with pages and components completely frictionless.

---

## Cấu hình TypeScript

Intlayer sử dụng module augmentation để cung cấp đầy đủ intellisense TypeScript cho các khóa dịch của bạn. Đảm bảo rằng `tsconfig.json` của bạn bao gồm các kiểu được tạo tự động:

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
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

- **Visual Editor** — Quản lý bản dịch trực quan trong trình duyệt: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- **CMS** — Externalize và quản lý nội dung từ xa: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- **VS Code Extension** — Nhận autocompletion và phát hiện lỗi dịch theo thời gian thực: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- **CLI Reference** — Danh sách đầy đủ các lệnh CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- **Intlayer with Next.js** — Hướng dẫn thiết lập đầy đủ cho Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)

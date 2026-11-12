---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: thiết lập Intlayer trong dự án"
description: "Chạy intlayer init để thêm Intlayer vào dự án hiện có: lệnh phát hiện framework, cài gói và ghi file cấu hình."
keywords:
  - Khởi tạo
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init chỉ cài đặt các gói và thiết lập framework; thêm một lệnh con cho mỗi bước; --interactive thất bại khi không có terminal"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Thêm lệnh con init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Thêm tùy chọn --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm nội dung lệnh init"
author: aymericzip
---

# Khởi tạo Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Lệnh `init` cài đặt các gói Intlayer và thiết lập framework của bạn (tệp cấu hình, TypeScript, plugin bundler, middleware/proxy, provider). Đây là cách được khuyến nghị để bắt đầu với Intlayer.

Mọi thứ khác (workflow CI, skill AI, máy chủ MCP, công cụ editor, quy tắc lint, CMS, hạ tầng) đều là tùy chọn: chọn trong checklist `--interactive`, hoặc chạy lệnh con tương ứng (xem bên dưới).

## Tên thay thế (Aliases):

- `npx intlayer init`

## Các tham số (Arguments):

- `--project-root [projectRoot]` - Tùy chọn. Chỉ định thư mục gốc của dự án. Nếu không được cung cấp, lệnh sẽ tìm kiếm thư mục dự án bắt đầu từ thư mục làm việc hiện tại.
- `--no-gitignore` - Tùy chọn. Bỏ qua việc tự động cập nhật tệp `.gitignore`. Nếu cờ này được đặt, `.intlayer` sẽ không được thêm vào `.gitignore`.
- `--no-framework-setup` - Tùy chọn. Chỉ cài đặt các gói, không thay đổi các tệp của dự án.
- `--routing <routing>` - Tùy chọn. Định tuyến locale: `prefix-no-default` (mặc định), `prefix-all`, `no-prefix`, `search-params` hoặc `none`.
- `--content <layout>` - Tùy chọn. Cách khai báo nội dung:
  - `multilingual` - `{fileName}.content.{ts,json}` bên cạnh component, mọi locale trong một tệp (thiết lập `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` bên cạnh component (thiết lập `compiler.output` và `dictionary.locale`).
  - `centralized` - một catalog `/locales/{locale}.{json,po}` cho mỗi locale (thêm plugin `syncJSON` / `syncPO`).
  - `namespaces` - các catalog `/locales/{locale}/{namespace}.{json,po}` (thêm plugin `syncJSON` / `syncPO`).
- `--content-format <format>` - Tùy chọn, đi kèm với `--content`. `ts` hoặc `json` cho `multilingual` / `per-locale`, `json` hoặc `po` cho `centralized` / `namespaces`. Mặc định là lựa chọn đầu tiên.
- `--message-format <format>` - Tùy chọn, đi kèm với `--content centralized` hoặc `namespaces` ở định dạng JSON. Cú pháp thông điệp của catalog: `icu` (mặc định), `i18next`, `vue-i18n` hoặc `intlayer`.
- `-i, --interactive` - Tùy chọn. Chọn các bước thiết lập từ một checklist (gói, CI, skill, MCP, VS Code, LSP, lint, CMS, hạ tầng, …) thay vì bộ mặc định. Cần có terminal: nếu không có (agent AI, CI), lệnh sẽ thất bại và liệt kê các lệnh con cần chạy thay thế.
- `--no-github-actions` - Tùy chọn. Với `--interactive`, không bao giờ tạo các workflow GitHub Actions, kể cả khi chúng được chọn.

## Cách thức hoạt động:

Lệnh `init` thực hiện các tác vụ thiết lập sau:

1. **Xác thực cấu trúc dự án** - Đảm bảo bạn đang ở trong một thư mục dự án hợp lệ có tệp `package.json`.
2. **Cài đặt các gói** - Cài đặt các gói Intlayer còn thiếu cho stack của bạn (ví dụ `react-intlayer`, `vite-intlayer`) và nâng cấp các gói đã cũ.
3. **Cập nhật `.gitignore`** - Thêm `.intlayer` vào tệp `.gitignore` của bạn để loại bỏ các tệp được tạo tự động khỏi trình quản lý phiên bản (có thể bỏ qua bằng `--no-gitignore`).
4. **Cấu hình TypeScript** - Cập nhật bất kỳ tệp `tsconfig.json` nào để bao gồm các định nghĩa kiểu của Intlayer (`.intlayer/**/*.ts`).
5. **Tạo tệp cấu hình** - Tạo `intlayer.config.ts` (cho các dự án TypeScript) hoặc `intlayer.config.mjs` (cho các dự án JavaScript) với các cài đặt mặc định.
6. **Cập nhật cấu hình bundler / framework** - Thêm plugin Intlayer vào cấu hình Vite, Next.js, Nuxt, Astro, … và tạo middleware/proxy cùng provider khi framework hỗ trợ.

## Thiết lập từng bước một

Mỗi bước trong checklist `--interactive` đều có lệnh con riêng. Chúng không hỏi gì khi các giá trị được truyền dưới dạng flag, nên có thể chạy an toàn từ agent AI hoặc job CI.

| Lệnh                                                                  | Thiết lập gì                                                                         |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `intlayer init packages`                                              | Cài đặt các gói Intlayer còn thiếu và nâng cấp các gói đã cũ                         |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Tệp cấu hình, TypeScript, plugin bundler, middleware/proxy, provider và `.gitignore` |
| `intlayer init github-actions`                                        | Các workflow GitHub Actions `fill` và `test`                                         |
| `intlayer init vscode-extension`                                      | Đề xuất tiện ích Intlayer trong `.vscode/extensions.json`                            |
| `intlayer init lsp`                                                   | Máy chủ ngôn ngữ Intlayer trong `.vscode/settings.json`                              |
| `intlayer init eslint`                                                | Các quy tắc lint của Intlayer (ESLint / oxlint), khi dự án đã dùng linter            |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | Tài liệu Intlayer dưới dạng skill cho agent AI                                       |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Máy chủ MCP của Intlayer                                                             |
| `intlayer init extension [--browser <chrome/firefox>]`                | Mở trang cửa hàng của tiện ích trình duyệt Intlayer                                  |
| `intlayer init cms`                                                   | Đăng nhập Intlayer CMS qua trình duyệt và lưu thông tin xác thực vào `.env`          |
| `intlayer init infra --mode <desktop/docker/compose>`                 | Ứng dụng desktop hoặc một stack tự lưu trữ                                           |

### Từ agent AI hoặc job CI

Shell của agent AI không có terminal, nên không thể trả lời câu hỏi. Hãy dùng lệnh mặc định, sau đó là các lệnh con bạn cần:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Khi không có terminal:

- `init skills` cài đặt các skill phù hợp với stack của bạn, trừ khi đặt `--skills` (ví dụ `--skills Usage Content React`).
- `init skills` và `init mcp` dùng nền tảng AI được phát hiện (Claude Code, Cursor, VS Code, Windsurf, …), trừ khi đặt `--platform`, và thất bại kèm danh sách nền tảng nếu không phát hiện được nền tảng nào.
- `init mcp` dùng transport `stdio`, trừ khi đặt `--transport`.
- `init infra` bắt buộc có `--mode`, còn `init extension` chỉ in ra các liên kết cửa hàng, trừ khi đặt `--browser`.

Máy chủ MCP luôn được cấu hình bên trong dự án (với Claude Code là trong `.mcp.json`).

## Ví dụ:

### Khởi tạo cơ bản:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Thao tác này khởi tạo Intlayer trong thư mục hiện tại, tự động phát hiện gốc dự án.

### Khởi tạo với gốc dự án tùy chỉnh:

```bash packageManager="npm"
npx intlayer init --project-root ./du-an-cua-toi
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./du-an-cua-toi
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./du-an-cua-toi
```

```bash packageManager="bun"
bun x intlayer init --project-root ./du-an-cua-toi
```

Thao tác này khởi tạo Intlayer trong thư mục được chỉ định.

### Khởi tạo không cập nhật .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Thao tác này sẽ thiết lập tất cả các tệp cấu hình nhưng sẽ không sửa đổi tệp `.gitignore` của bạn.

### Thiết lập cơ sở hạ tầng (ứng dụng máy tính để bàn hoặc tự lưu trữ):

```bash
npx intlayer init infra
```

Tải xuống và chạy trình cài đặt được lưu trữ (`https://intlayer.org/install.sh`, hoặc `install.ps1` trên Windows), hỏi bạn cách muốn chạy Intlayer:

- **Ứng dụng máy tính để bàn** - cài đặt bảng điều khiển gốc trên máy của bạn, kết nối với Intlayer Cloud.
- **Docker tất cả trong một (All-in-one)** - bảng điều khiển + API + MongoDB + Redis + MinIO trong một vùng chứa duy nhất.
- **Docker Compose** - một vùng chứa cho mỗi dịch vụ, để tự lưu trữ có thể mở rộng.

Bỏ qua menu với `--mode`:

```bash
npx intlayer init infra --mode compose
```

Bước tương tự cũng được cung cấp bởi `npx intlayer init --interactive`. Xem [tài liệu tham khảo `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/infra.md) để biết cài đặt của trình cài đặt và [hướng dẫn tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md) để biết những gì mỗi chế độ thiết lập.

- [tài liệu tham khảo `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/infra.md)
- [hướng dẫn tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md)

## Ví dụ đầu ra:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Lưu ý:

- Lệnh này mang tính lũy đẳng (idempotent) - bạn có thể chạy nó nhiều lần một cách an toàn. Các bước đã được cấu hình sẽ tự động được bỏ qua.
- Nếu tệp cấu hình đã tồn tại, nó sẽ không bị ghi đè.
- Các cấu hình TypeScript không có mảng `include` (ví dụ: cấu hình kiểu giải pháp có tham chiếu) sẽ bị bỏ qua.
- Lệnh sẽ dừng với thông báo lỗi nếu không tìm thấy `package.json` trong gốc dự án.

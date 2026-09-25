---
createdAt: 2024-08-11
updatedAt: 2026-09-23
title: CLI - Tất cả các lệnh CLI của Intlayer cho trang web đa ngôn ngữ của bạn
description: Tìm hiểu cách sử dụng Intlayer CLI để quản lý trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - CLI
  - Giao diện dòng lệnh
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Thêm lệnh upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Thêm lệnh init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Thay thế lệnh `ci` bằng cờ `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Thêm nội dung lệnh scan"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Thêm nội dung lệnh standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Thêm nội dung lệnh CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Thêm nội dung lệnh liệt kê dự án"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm nội dung lệnh khởi tạo"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Thêm nội dung lệnh trích xuất"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Thêm tùy chọn skipIfExists vào lệnh translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Thêm bí danh cho các đối số và lệnh CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Thêm tùy chọn xây dựng vào các lệnh"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Thêm nội dung lệnh phiên bản"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Đặt tùy chọn verbose mặc định là true qua CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Thêm lệnh theo dõi và tùy chọn with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Thêm nội dung lệnh chỉnh sửa"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Thêm lệnh kiểm tra và liệt kê nội dung"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Cập nhật tài liệu tham số cho lệnh CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Intlayer CLI - Tất cả các lệnh CLI của Intlayer cho trang web đa ngôn ngữ của bạn

## Mục lục

<TOC/>

## Cài đặt gói

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Nếu gói `intlayer` đã được cài đặt, CLI sẽ tự động được cài đặt. Bạn có thể bỏ qua bước này.

## Gói intlayer-cli

Gói `intlayer-cli` được thiết kế để chuyển đổi các [khai báo Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md) của bạn vào các từ điển.

Gói này chuyển đổi tất cả các tệp Intlayer, chẳng hạn như `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Xem cách khai báo các tệp khai báo Intlayer của bạn](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Để diễn giải các từ điển Intlayer, bạn có thể sử dụng các trình diễn giải như [react-intlayer](https://www.npmjs.com/package/react-intlayer) hoặc [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Hỗ trợ tệp cấu hình

Intlayer chấp nhận nhiều định dạng tệp cấu hình khác nhau:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Để tìm hiểu cách cấu hình các ngôn ngữ có sẵn hoặc các tham số khác, hãy xem [tài liệu cấu hình tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Thực hiện các lệnh Intlayer

### Xác thực

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/login" />
</TechGrid>

> `intlayer login` cấp một **access key** (`clientId` / `clientSecret`) mà mọi lệnh có xác thực đều sử dụng. Secret là một thông tin xác thực phía server và không bao giờ được gửi tới client bundle của bạn — xem [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/login.md#keeping-the-access-key-safe).

### Các lệnh cốt lõi

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/list_projects" />
</TechGrid>

### Quản lý từ điển

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/list" />
</TechGrid>

### Quản lý thành phần

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract" />
</TechGrid>

### Cấu hình

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/configuration" />
</TechGrid>

### Quản lý tài liệu

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-review" />
</TechGrid>

### Trình chỉnh sửa và Đồng bộ trực tiếp (Live Sync)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/live" />
</TechGrid>

### Kiểm toán & Chẩn đoán

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/scan" />
</TechGrid>

### Công cụ dành cho nhà phát triển

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/debug" />
</TechGrid>

## Sử dụng các lệnh Intlayer trong tệp `package.json` của bạn

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Lưu ý**: Bạn cũng có thể sử dụng các bí danh ngắn hơn:
>
> - `npx intlayer list`: thay cho `npx intlayer content list`
> - `npx intlayer test`: thay cho `npx intlayer content test`
> - `npx intlayer projects-list` hoặc `npx intlayer pl`: thay cho `npx intlayer projects list`

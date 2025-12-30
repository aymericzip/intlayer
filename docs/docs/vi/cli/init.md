---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Khởi tạo Intlayer
description: Tìm hiểu cách khởi tạo Intlayer trong dự án của bạn.
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
  - version: 7.5.9
    date: 2025-12-30
    changes: Thêm lệnh init
---

# Khởi tạo Intlayer

```bash
npx intlayer init
```

Lệnh `init` tự động thiết lập Intlayer trong dự án của bạn bằng cách cấu hình các tệp và thiết lập cần thiết. Đây là cách được khuyến nghị để bắt đầu với Intlayer.

## Bí danh:

- `npx intlayer init`

## Tham số:

- `--project-root [projectRoot]` - Tùy chọn. Chỉ định thư mục gốc của dự án. Nếu không được cung cấp, lệnh sẽ tìm thư mục gốc bắt đầu từ thư mục làm việc hiện tại.

## Những việc nó thực hiện:

Lệnh `init` thực hiện các tác vụ thiết lập sau:

1. **Xác thực cấu trúc dự án** - Đảm bảo bạn đang ở trong thư mục dự án hợp lệ có tệp `package.json`
2. **Cập nhật `.gitignore`** - Thêm `.intlayer` vào tệp `.gitignore` của bạn để loại trừ các tệp được tạo ra khỏi quản lý phiên bản
3. **Cấu hình TypeScript** - Cập nhật tất cả các tệp `tsconfig.json` để bao gồm định nghĩa kiểu của Intlayer (`.intlayer/**/*.ts`)
4. **Tạo tệp cấu hình** - Tạo `intlayer.config.ts` (cho dự án TypeScript) hoặc `intlayer.config.mjs` (cho dự án JavaScript) với các thiết lập mặc định
5. **Cập nhật cấu hình Vite** - Nếu phát hiện tệp cấu hình Vite, thêm import plugin `vite-intlayer`
6. **Cập nhật cấu hình Next.js** - Nếu phát hiện tệp cấu hình Next.js, thêm import plugin `next-intlayer`

## Ví dụ:

### Khởi tạo cơ bản:

```bash
npx intlayer init
```

Lệnh này sẽ khởi tạo Intlayer trong thư mục hiện tại, tự động phát hiện thư mục gốc của dự án.

### Khởi tạo với thư mục gốc dự án tùy chỉnh:

```bash
npx intlayer init --project-root ./my-project
```

Lệnh này sẽ khởi tạo Intlayer trong thư mục được chỉ định.

## Ví dụ đầu ra:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Ghi chú:

- Lệnh có tính idempotent - bạn có thể chạy nó nhiều lần một cách an toàn. Nó sẽ bỏ qua các bước đã được cấu hình.
- Nếu một tệp cấu hình đã tồn tại, nó sẽ không bị ghi đè.
- Các tệp cấu hình TypeScript không có mảng `include` (ví dụ: các cấu hình theo kiểu solution với references) sẽ bị bỏ qua.
- Lệnh sẽ kết thúc với lỗi nếu không tìm thấy `package.json` trong thư mục gốc của dự án.

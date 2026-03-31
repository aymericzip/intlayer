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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Thêm tùy chọn --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm nội dung lệnh init"
---

# Khởi tạo Intlayer

```bash
npx intlayer init
```

Lệnh `init` tự động định cấu hình Intlayer cho dự án của bạn bằng cách tạo các tệp và cài đặt cần thiết. Đây là cách bắt đầu được khuyến nghị với Intlayer.

## Tên thay thế (Aliases):

- `npx intlayer init`

## Các tham số (Arguments):

- `--project-root [projectRoot]` - Tùy chọn. Chỉ định thư mục gốc của dự án. Nếu không được cung cấp, lệnh sẽ tìm kiếm thư mục dự án bắt đầu từ thư mục làm việc hiện tại.
- `--no-gitignore` - Tùy chọn. Bỏ qua việc tự động cập nhật tệp `.gitignore`. Nếu cờ này được đặt, `.intlayer` sẽ không được thêm vào `.gitignore`.

## Cách thức hoạt động:

Lệnh `init` thực hiện các tác vụ thiết lập sau:

1. **Xác thực cấu trúc dự án** - Đảm bảo bạn đang ở trong một thư mục dự án hợp lệ có tệp `package.json`.
2. **Cập nhật `.gitignore`** - Thêm `.intlayer` vào tệp `.gitignore` của bạn để loại bỏ các tệp được tạo tự động khỏi trình quản lý phiên bản (có thể bỏ qua bằng `--no-gitignore`).
3. **Cấu hình TypeScript** - Cập nhật bất kỳ tệp `tsconfig.json` nào để bao gồm các định nghĩa kiểu của Intlayer (`.intlayer/**/*.ts`).
4. **Tạo tệp cấu hình** - Tạo `intlayer.config.ts` (cho các dự án TypeScript) hoặc `intlayer.config.mjs` (cho các dự án JavaScript) với các cài đặt mặc định.
5. **Cập nhật cấu hình Vite** - Nếu phát hiện tệp cấu hình Vite, nó sẽ thêm phần nhập cho plugin `vite-intlayer`.
6. **Cập nhật cấu hình Next.js** - Nếu phát hiện tệp cấu hình Next.js, nó sẽ thêm phần nhập cho plugin `next-intlayer`.

## Ví dụ:

### Khởi tạo cơ bản:

```bash
npx intlayer init
```

Thao tác này khởi tạo Intlayer trong thư mục hiện tại, tự động phát hiện gốc dự án.

### Khởi tạo với gốc dự án tùy chỉnh:

```bash
npx intlayer init --project-root ./du-an-cua-toi
```

Thao tác này khởi tạo Intlayer trong thư mục được chỉ định.

### Khởi tạo không cập nhật .gitignore:

```bash
npx intlayer init --no-gitignore
```

Thao tác này sẽ thiết lập tất cả các tệp cấu hình nhưng sẽ không sửa đổi tệp `.gitignore` của bạn.

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

- Lệnh này mang tính lũy đẳng (idempotent) — bạn có thể chạy nó nhiều lần một cách an toàn. Các bước đã được cấu hình sẽ tự động được bỏ qua.
- Nếu tệp cấu hình đã tồn tại, nó sẽ không bị ghi đè.
- Các cấu hình TypeScript không có mảng `include` (ví dụ: cấu hình kiểu giải pháp có tham chiếu) sẽ bị bỏ qua.
- Lệnh sẽ dừng với thông báo lỗi nếu không tìm thấy `package.json` trong gốc dự án.

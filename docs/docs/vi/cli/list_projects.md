---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Liệt kê các dự án Intlayer
description: Tìm hiểu cách liệt kê tất cả dự án Intlayer trong một thư mục hoặc kho git.
keywords:
  - Danh sách
  - Dự án
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# Liệt kê các dự án Intlayer

```bash
npx intlayer projects list
```

Lệnh này tìm kiếm và liệt kê tất cả các dự án Intlayer bằng cách tìm các thư mục chứa các tệp cấu hình Intlayer. Nó hữu ích để phát hiện tất cả các dự án Intlayer trong một monorepo, workspace, hoặc kho git.

## Bí danh:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Tham số:

- **`--base-dir [path]`**: Chỉ định thư mục gốc để bắt đầu tìm kiếm. Mặc định là thư mục làm việc hiện tại.

  > Ví dụ: `npx intlayer projects list --base-dir /path/to/workspace`

  > Ví dụ: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Tìm kiếm từ thư mục gốc của git thay vì thư mục cơ sở. Điều này hữu ích để tìm tất cả các dự án Intlayer trong một monorepo hoặc kho git.

  > Ví dụ: `npx intlayer projects list --git-root`

- **`--json`**: Xuất kết quả dưới dạng JSON thay vì văn bản được định dạng. Hữu ích cho việc viết script và truy cập lập trình.

  > Ví dụ: `npx intlayer projects list --json`

## Cách hoạt động:

Lệnh sẽ tìm các tệp cấu hình Intlayer trong thư mục được chỉ định (hoặc git root nếu sử dụng `--git-root`). Nó tìm các mẫu tệp cấu hình sau:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Mỗi thư mục chứa một trong các tệp này được coi là một dự án Intlayer và sẽ được liệt kê trong đầu ra.

## Ví dụ:

### Liệt kê các dự án trong thư mục hiện tại:

```bash
npx intlayer projects list
```

### Liệt kê các dự án trong một thư mục cụ thể:

```bash
npx intlayer projects list --base-dir ./packages
```

### Liệt kê tất cả dự án trong repository git:

```bash
npx intlayer projects list --git-root
```

### Sử dụng alias rút gọn:

```bash
npx intlayer pl --git-root
```

### Đầu ra dưới dạng JSON:

```bash
npx intlayer projects list --json
```

## Ví dụ đầu ra:

### Đầu ra được định dạng:

```bash
$ npx intlayer projects list --git-root

Tìm thấy 3 dự án Intlayer:

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### Đầu ra JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Các trường hợp sử dụng:

- **Quản lý Monorepo**: Khám phá tất cả các dự án Intlayer trong cấu trúc monorepo
- **Khám phá dự án**: Tìm tất cả các dự án hỗ trợ Intlayer trong một workspace
- **CI/CD**: Xác minh các dự án Intlayer trong các workflow tự động
- **Tài liệu**: Tạo tài liệu liệt kê tất cả các dự án sử dụng Intlayer

Đầu ra cung cấp đường dẫn tuyệt đối đến từng thư mục dự án, giúp dễ dàng điều hướng đến hoặc viết script thao tác trên nhiều dự án Intlayer.

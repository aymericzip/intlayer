---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: CLI - Nâng cấp các gói Intlayer
description: Tìm hiểu cách sử dụng lệnh upgrade của Intlayer CLI để liệt kê từng gói Intlayer trong dự án hoặc monorepo của bạn và nâng cấp chúng lên phiên bản mới nhất.
keywords:
  - CLI
  - Upgrade
  - Nâng cấp
  - Gói
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Thêm lệnh upgrade"
author: aymericzip
---

# Nâng cấp các gói Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

Lệnh `upgrade` liệt kê các gói Intlayer được khai báo trong mỗi `package.json` của dự án, bao gồm cả các workspace monorepo, và nâng cấp chúng lên phiên bản mới nhất đã xuất bản. Lệnh này chạy bước nâng cấp gói tương tự như `intlayer init` một cách độc lập.

## Đối số:

- `--project-root [projectRoot]` - Tùy chọn. Thư mục gốc của dự án. Theo mặc định, lệnh bắt đầu từ `package.json` gần nhất phía trên thư mục làm việc hiện tại.
- `--dry-run` - Tùy chọn. Liệt kê các gói và phiên bản mục tiêu của chúng mà không sửa đổi bất kỳ tệp nào.
- `--tag <tag>` - Tùy chọn. npm dist-tag cần nâng cấp lên (ví dụ `canary`). Mặc định là `latest`.

## Chức năng hoạt động:

1. **Liệt kê các gói Intlayer** - Quét từng `package.json` của dự án (bỏ qua `node_modules` và kết quả bản dựng) để tìm các phụ thuộc và devDependencies `intlayer`, `@intlayer/*`, `*-intlayer` và `intlayer-*`.
2. **Lấy phiên bản mục tiêu** - Đọc phiên bản của dist-tag đã chọn (mặc định là `latest`) của từng gói từ npm registry.
3. **Viết lại dải phiên bản** - Cập nhật trực tiếp từng dải phiên bản đã lỗi thời trong tệp, giữ nguyên toán tử (`^`, `~` hoặc không có) và thụt lề của tệp.
4. **Cài đặt một lần** - Chạy một lượt cài đặt duy nhất từ thư mục gốc của workspace (thư mục gần nhất có tệp khóa), sử dụng trình quản lý gói sở hữu tệp khóa đó:

| Tệp khóa (Lock file)           | Lệnh           |
| ------------------------------ | -------------- |
| `bun.lock` / `bun.lockb`       | `bun install`  |
| `pnpm-lock.yaml`               | `pnpm install` |
| `yarn.lock`                    | `yarn install` |
| `package-lock.json` hoặc không | `npm install`  |

Nếu không có tệp khóa, trường `packageManager` của `package.json` (ví dụ `"bun@1.2.0"`) sẽ được sử dụng trước khi chuyển sang npm.

Các dải phiên bản không trỏ đến registry, chẳng hạn như `workspace:*`, `file:`, `link:`, `catalog:` hoặc URL git, sẽ không bao giờ bị sửa đổi.

## Ví dụ:

### Liệt kê các nâng cấp có sẵn mà không áp dụng chúng:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Nâng cấp lên bản phát hành canary:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Ví dụ đầu ra:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Ghi chú:

- Chạy lệnh từ thư mục gốc của kho lưu trữ để nâng cấp mọi workspace. Chạy lệnh từ một workspace cụ thể để chỉ nâng cấp riêng workspace đó.
- Các gói không thể lấy được phiên bản (ngoại tuyến, gói riêng tư hoặc chưa xuất bản) sẽ được liệt kê và giữ nguyên.
- Nếu quá trình cài đặt thất bại, các dải phiên bản đã nâng cấp vẫn được giữ lại trong `package.json`. Hãy chạy lệnh cài đặt của trình quản lý gói theo cách thủ công.

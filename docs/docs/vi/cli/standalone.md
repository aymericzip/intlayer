---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Bản Đóng Gói Độc Lập (Standalone Bundle)
description: Tìm hiểu cách tạo một bản đóng gói JavaScript độc lập cho nội dung ứng dụng.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Khởi tạo tài liệu lệnh standalone"
---

# Bản Đóng Gói Độc Lập (Standalone Bundle)

Lệnh `standalone` cho phép bạn tạo một bản đóng gói JavaScript độc lập chứa Intlayer và bất kỳ gói nào khác được chỉ định. Điều này đặc biệt hữu ích khi sử dụng Intlayer trong các môi trường không có trình quản lý gói hoặc trình đóng gói, chẳng hạn như ứng dụng HTML/JS đơn giản.

Bản đóng gói sử dụng [esbuild](https://esbuild.github.io/) để kết hợp các gói được yêu cầu và các phần phụ thuộc của chúng vào một tệp duy nhất, tệp này có thể dễ dàng nhập vào bất kỳ dự án web nào.

## Cách sử dụng

```bash
npx intlayer standalone --packages [các gói...] [tùy chọn]
```

## Tùy chọn

- `-o, --outfile [outfile]` - Tùy chọn. Tên của tệp đầu ra. Mặc định: `intlayer-bundle.js`.
- `--packages [các gói...]` - Bắt buộc. Danh sách các gói cần đưa vào bản đóng gói (ví dụ: `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Tùy chọn. Phiên bản của các gói cần đóng gói. Nếu không được chỉ định, phiên bản Intlayer CLI sẽ được sử dụng theo mặc định.
- `--minify` - Tùy chọn. Có nén (minify) đầu ra hay không. Mặc định: `true`.
- `--platform [platform]` - Tùy chọn. Nền tảng mục tiêu cho bản đóng gói (ví dụ: `browser`, `node`). Mặc định: `browser`.
- `--format [format]` - Tùy chọn. Định dạng đầu ra cho bản đóng gói (ví dụ: `esm`, `cjs`, `iife`). Mặc định: `esm`.

## Tùy chọn chung

- `--env-file [envFile]` - Tệp môi trường.
- `-e, --env [env]` - Môi trường.
- `--base-dir [baseDir]` - Thư mục gốc.
- `--no-cache` - Tắt bộ nhớ đệm.
- `--verbose` - Đầu ra chi tiết.

## Ví dụ:

### Tạo bản đóng gói cho Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Thao tác này sẽ tạo một tệp `intlayer.js` chứa cả hai gói `intlayer` và `vanilla-intlayer`, được nén và ở định dạng ESM, sẵn sàng để sử dụng trong trình duyệt qua thẻ `<script>`.

### Đóng gói phiên bản cụ thể:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Đóng gói ở định dạng khác:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Cách thức hoạt động:

1. **Tạo môi trường tạm thời** - Thiết lập một thư mục tạm thời để quản lý các phần phụ thuộc.
2. **Cài đặt các gói** - Sử dụng `npm` hoặc `bun` (nếu có) để cài đặt các gói được yêu cầu và các phần phụ thuộc của chúng.
3. **Tạo điểm bắt đầu (entry point)** - Tạo một tệp điểm bắt đầu tạm thời xuất tất cả các gói được yêu cầu và cung cấp chúng dưới dạng các biến toàn cục khi chạy trong trình duyệt.
4. **Đóng gói bằng esbuild** - Sử dụng esbuild để kết hợp mọi thứ vào một tệp, áp dụng tính năng nén và định dạng theo yêu cầu.
5. **Tạo tệp** - Ghi bản đóng gói kết quả vào đường dẫn đầu ra được chỉ định.

## Các Biến Toàn Cục

Khi bản đóng gói được tải trong trình duyệt, nó sẽ cung cấp các gói được yêu cầu dưới dạng các biến toàn cục trên đối tượng `window`. Tên biến được lấy từ tên gói (ví dụ: `intlayer` trở thành `Intlayer`, `vanilla-intlayer` trở thành `VanillaIntlayer`).

```javascript
// Truy cập Intlayer từ bản đóng gói
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```

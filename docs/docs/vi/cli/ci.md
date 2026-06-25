---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Lệnh CI
description: Tìm hiểu cách sử dụng lệnh Intlayer CI để chạy các lệnh Intlayer với thông tin xác thực được tự động chèn vào trong các pipeline CI/CD và monorepo.
keywords:
  - CI
  - CI/CD
  - Tự động hóa
  - Monorepo
  - Thông tin xác thực
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "Thêm lệnh CI"
author: aymericzip
---

# Lệnh CI

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

Lệnh CI được thiết kế cho tự động hóa và các pipeline CI/CD. Nó tự động chèn thông tin xác thực từ biến môi trường `INTLAYER_PROJECT_CREDENTIALS` và có thể chạy các lệnh Intlayer trên nhiều dự án trong một monorepo.

## Cách hoạt động

Lệnh CI hoạt động ở hai chế độ:

1. **Chế độ dự án đơn**: Nếu thư mục làm việc hiện tại khớp với một trong các đường dẫn dự án trong `INTLAYER_PROJECT_CREDENTIALS`, nó sẽ chạy lệnh chỉ cho dự án cụ thể đó.

2. **Chế độ lặp lại**: Nếu không phát hiện ngữ cảnh dự án cụ thể, nó sẽ lặp lại tất cả các dự án đã cấu hình và chạy lệnh cho từng dự án.

## Biến môi trường

Lệnh yêu cầu biến môi trường `INTLAYER_PROJECT_CREDENTIALS` được đặt. Biến này phải chứa một đối tượng JSON ánh xạ các đường dẫn dự án đến thông tin xác thực của chúng:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Phát hiện trình quản lý gói

Lệnh CI tự động phát hiện trình quản lý gói đang được sử dụng (npm, yarn, pnpm hoặc bun) dựa trên biến môi trường `npm_config_user_agent` và sử dụng lệnh phù hợp để thực thi Intlayer.

## Đối số

- **`<command...>`**: Lệnh Intlayer để thực thi (ví dụ: `fill`, `push`, `build`). Bạn có thể truyền bất kỳ lệnh Intlayer nào và các đối số của nó.

  > Ví dụ: `npx intlayer ci fill --verbose`
  >
  > Ví dụ: `npx intlayer ci push`
  >
  > Ví dụ: `npx intlayer ci build --watch`

## Ví dụ

### Chạy lệnh ở chế độ dự án đơn

Nếu bạn đang ở trong thư mục dự án khớp với một trong các đường dẫn trong `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

Điều này sẽ chạy lệnh `fill` với thông tin xác thực được tự động chèn cho dự án `packages/app`.

### Chạy lệnh trên tất cả các dự án

Nếu bạn đang ở trong thư mục không khớp với bất kỳ đường dẫn dự án nào, lệnh sẽ lặp lại tất cả các dự án đã cấu hình:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Điều này sẽ chạy lệnh `push` cho mỗi dự án được cấu hình trong `INTLAYER_PROJECT_CREDENTIALS`.

### Truyền cờ bổ sung

Bạn có thể truyền bất kỳ cờ nào cho lệnh Intlayer cơ bản:

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### Sử dụng trong pipeline CI/CD

Trong cấu hình CI/CD của bạn (ví dụ: GitHub Actions, GitLab CI), đặt `INTLAYER_PROJECT_CREDENTIALS` làm bí mật:

```yaml
# Ví dụ GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Điền từ điển
    run: npx intlayer ci fill
```

## GitHub Actions được tạo tự động

Khi bạn chạy `intlayer init`, Intlayer sẽ phát hiện package manager của bạn (npm, yarn, pnpm, hoặc bun) và tạo hai workflow GitHub Actions trong `.github/workflows/`, với các lệnh phù hợp với package manager đó:

- **`intlayer-fill.yml`** — Trên mọi pull request, xây dựng các từ điển và chạy `intlayer fill --git-diff --mode complete` để tạo các bản dịch bị thiếu cho các từ điển đã thay đổi, sau đó commit kết quả lại vào nhánh PR.
- **`intlayer-test.yml`** — Trên mọi pull request, xây dựng các từ điển và chạy `intlayer test`, làm cho kiểm tra thất bại khi các locale bắt buộc bị thiếu bản dịch.

Các tập tin workflow hiện có sẽ không bao giờ bị ghi đè. Để bỏ qua việc tạo tự động hoàn toàn, hãy chạy:

```bash
npx intlayer init --no-github-actions
```

### Cấp quyền truy cập AI cho quy trình fill

`intlayer-fill.yml` được tạo ra yêu cầu quyền truy cập AI. Có hai tùy chọn có sẵn (được cấu hình trong khối `env` của quy trình):

1. **Khóa nhà cung cấp AI của riêng bạn** — Thêm bí mật `AI_API_KEY` trong cài đặt kho lưu trữ của bạn (Settings → Secrets and variables → Actions). Quy trình sẽ chuyển tiếp nó qua `--provider`, `--model` và `--api-key`.
2. **Khóa truy cập Intlayer CMS** — Thêm bí mật `INTLAYER_CLIENT_ID` và `INTLAYER_CLIENT_SECRET` và kết nối chúng vào phần `editor` của `intlayer.config` của bạn. Các khóa truy cập CMS cấp quyền truy cập AI thông qua backend Intlayer.

Quy trình `intlayer-test.yml` không yêu cầu bất kỳ quyền truy cập AI nào.

## Xử lý lỗi

- Nếu `INTLAYER_PROJECT_CREDENTIALS` không được đặt, lệnh sẽ thoát với lỗi.
- Nếu `INTLAYER_PROJECT_CREDENTIALS` không phải là JSON hợp lệ, lệnh sẽ thoát với lỗi.
- Nếu đường dẫn dự án không tồn tại, nó sẽ được bỏ qua với cảnh báo.
- Nếu bất kỳ dự án nào thất bại, lệnh sẽ thoát với mã trạng thái khác không.

## Trường hợp sử dụng

- **Tự động hóa monorepo**: Chạy các lệnh Intlayer trên nhiều dự án trong một monorepo
- **Pipeline CI/CD**: Tự động hóa quản lý từ điển trong quy trình tích hợp liên tục
- **Thao tác hàng loạt**: Thực hiện cùng một thao tác trên nhiều dự án Intlayer cùng một lúc
- **Quản lý bí mật**: Quản lý an toàn thông tin xác thực cho nhiều dự án bằng cách sử dụng biến môi trường

## Thực hành bảo mật tốt nhất

- Lưu trữ `INTLAYER_PROJECT_CREDENTIALS` dưới dạng bí mật được mã hóa trong nền tảng CI/CD của bạn
- Không bao giờ commit thông tin xác thực vào kiểm soát phiên bản
- Sử dụng thông tin xác thực cụ thể theo môi trường cho các môi trường triển khai khác nhau
- Xoay thông tin xác thực thường xuyên

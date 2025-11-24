---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Xây dựng Từ điển
description: Tìm hiểu cách xây dựng từ điển Intlayer của bạn từ các tệp khai báo nội dung.
keywords:
  - Xây dựng
  - Từ điển
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# Xây dựng Từ điển

Để xây dựng từ điển của bạn, bạn có thể chạy các lệnh:

```bash
npx intlayer build
```

hoặc ở chế độ theo dõi

```bash
npx intlayer build --watch
```

Lệnh này sẽ tìm các tệp khai báo nội dung của bạn theo mặc định tại `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Và xây dựng các từ điển trong thư mục `.intlayer`.

## Bí danh:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Tham số:

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm tệp `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

  > Ví dụ: `npx intlayer build --base-dir ./src`

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`). Hữu ích trong trường hợp bạn sử dụng biến môi trường trong tệp cấu hình intlayer của mình.

  > Ví dụ: `npx intlayer build --env production`

- **`--env-file`**: Cung cấp tệp môi trường tùy chỉnh để tải các biến. Hữu ích trong trường hợp bạn sử dụng biến môi trường trong tệp cấu hình intlayer của mình.

  > Ví dụ: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Khởi chạy lệnh song song với quá trình build.

  > Ví dụ: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Bỏ qua bước chuẩn bị.

  > Ví dụ: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

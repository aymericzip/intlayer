---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Lỗi build trong CI/CD
description: Tìm hiểu cách sửa lỗi build xảy ra trong môi trường CI/CD.
keywords:
  - build
  - lỗi
  - ci
  - cd
  - pipeline
  - intlayer
  - dictionaries
  - next.js
  - prebuild
  - automation
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# Lỗi khi build trên CI/CD

Nếu bạn gặp lỗi như sau trên Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Dưới đây là một số giải pháp:

## 1. Thiếu dictionaries

Đảm bảo rằng các dictionaries được build ở giai đoạn build.

Thường xảy ra trường hợp build hoạt động tốt trên máy local nhưng không trên CI/CD. Lý do là trên máy local, thư mục `.intlayer` tồn tại, nhưng trên CI/CD thì không vì nó bị loại trừ khỏi quá trình build.

Bạn có thể khắc phục bằng cách thêm một script prebuild trong file `package.json` của dự án.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Sẽ chạy trước khi build
    "build": "next build",
  },
}
```

> Lưu ý rằng nếu bạn sử dụng hàm `withIntlayer`, hoặc plugin bundler tương đương cho framework của bạn, script prebuild sẽ được chạy trước khi build.

## 2. Thiếu biến môi trường tại thời điểm build / chạy

Trong một container, hoặc nền tảng tự động triển khai, nên loại trừ file `.env` khỏi quá trình build.

```text fileName=".gitignore or .dockerignore"
# Biến môi trường
.env
**/.env
.env.*
**/.env.*
```

Nếu biến môi trường của bạn không có sẵn tại thời điểm build, một lỗi sẽ được ném ra.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Có thể vấn đề không liên quan đến Intlayer. Vì vậy hãy kiểm tra biến môi trường của bạn tại thời điểm build trên nền tảng CI/CD của bạn.

---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Kiểm tra bản dịch thiếu
description: Tìm hiểu cách kiểm tra và xác định các bản dịch thiếu trong từ điển của bạn.
keywords:
  - Kiểm tra
  - Bản dịch thiếu
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Kiểm tra bản dịch thiếu

```bash
npx intlayer content test
```

## Bí danh:

- `npx intlayer test`

Lệnh này phân tích các tệp khai báo nội dung của bạn để xác định các bản dịch thiếu trên tất cả các locale đã cấu hình. Nó cung cấp một báo cáo toàn diện cho thấy các khóa dịch nào đang thiếu ở các locale nào, giúp bạn duy trì sự nhất quán trong nội dung đa ngôn ngữ của mình.

## Ví dụ đầu ra:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## Tham số:

**Tùy chọn cấu hình:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file [envFile]`**: Cung cấp tệp môi trường tùy chỉnh để tải biến.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.

  > Ví dụ: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

**Tùy chọn chuẩn bị:**

- **`--build`**: Xây dựng các từ điển trước khi đẩy để đảm bảo nội dung được cập nhật. True sẽ bắt buộc xây dựng, false sẽ bỏ qua việc xây dựng, undefined sẽ cho phép sử dụng bộ nhớ đệm của bản xây dựng.

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

  > Ví dụ: `npx intlayer content test --verbose`

## Ví dụ:

```bash
npx intlayer content test --verbose
```

Kết quả đầu ra giúp bạn nhanh chóng xác định các bản dịch cần được hoàn thành để đảm bảo ứng dụng của bạn hoạt động đúng trên tất cả các locale đã cấu hình.

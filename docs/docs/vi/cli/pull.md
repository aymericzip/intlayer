---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Kéo Từ Điển
description: Tìm hiểu cách kéo từ điển từ trình chỉnh sửa Intlayer và CMS.
keywords:
  - Kéo
  - Từ điển
  - CLI
  - Intlayer
  - Trình chỉnh sửa
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Kéo Từ Điển Từ Xa

```bash
npx intlayer pull
```

Nếu đã cài đặt [trình chỉnh sửa intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), bạn cũng có thể kéo từ điển từ trình chỉnh sửa. Bằng cách này, bạn có thể ghi đè nội dung của các từ điển để phục vụ nhu cầu ứng dụng của bạn.

## Bí danh:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Tham số:

**Tùy chọn từ điển:**

- **`-d, --dictionaries`**: Id của các từ điển cần kéo. Nếu không chỉ định, tất cả các từ điển sẽ được kéo.

  > Ví dụ: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Id của các từ điển cần kéo (bí danh của --dictionaries).

  > Ví dụ: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

**Tùy chọn biến môi trường:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file`**: Cung cấp file môi trường tùy chỉnh để tải các biến.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

  > Ví dụ: `npx intlayer dictionary push --env production`

**Tùy chọn đầu ra:**

- **`--new-dictionaries-path`** : Đường dẫn đến thư mục nơi các từ điển mới sẽ được lưu. Nếu không được chỉ định, các từ điển mới sẽ được lưu trong thư mục `./intlayer-dictionaries` của dự án. Nếu trường `filePath` được chỉ định trong nội dung từ điển của bạn, các từ điển sẽ không xem xét tham số này và sẽ được lưu trong thư mục `filePath` đã chỉ định.

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

## Ví dụ:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Theo dõi Từ điển
description: Tìm hiểu cách theo dõi các thay đổi trong các tệp khai báo nội dung của bạn và tự động xây dựng từ điển.
keywords:
  - Theo dõi
  - Từ điển
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# Theo dõi Từ điển

```bash
npx intlayer watch
```

Lệnh này sẽ theo dõi các thay đổi trong các tệp khai báo nội dung của bạn và xây dựng các từ điển trong thư mục `.intlayer`.
Lệnh này tương đương với `npx intlayer build --watch --skip-prepare`.

## Các bí danh:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Tham số:

- **`--with`**: Khởi chạy lệnh song song với việc theo dõi.

> Ví dụ: `npx intlayer watch --with "next dev --turbopack"`

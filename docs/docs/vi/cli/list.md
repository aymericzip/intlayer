---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Liệt kê các tệp khai báo nội dung
description: Tìm hiểu cách liệt kê tất cả các tệp khai báo nội dung trong dự án của bạn.
keywords:
  - Liệt kê
  - Khai báo nội dung
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
---

# Liệt kê các tệp khai báo nội dung

```bash
npx intlayer content list
```

## Bí danh:

- `npx intlayer list`

Lệnh này hiển thị tất cả các tệp khai báo nội dung trong dự án của bạn, cho thấy các khóa từ điển và đường dẫn tệp của chúng. Nó hữu ích để có cái nhìn tổng quan về tất cả các tệp nội dung của bạn và xác minh rằng chúng được Intlayer phát hiện đúng cách.

## Ví dụ:

```bash
npx intlayer content list
```

## Ví dụ đầu ra:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Tổng số tệp khai báo nội dung: 3
```

Lệnh này sẽ xuất ra:

- Một danh sách được định dạng của tất cả các tệp khai báo nội dung với các khóa và đường dẫn tệp tương đối của chúng
- Tổng số tệp khai báo nội dung được tìm thấy

Kết quả đầu ra giúp bạn xác minh rằng tất cả các tệp nội dung của bạn được cấu hình đúng và có thể được hệ thống Intlayer phát hiện.

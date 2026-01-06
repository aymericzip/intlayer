---
createdAt: 2024-08-11
updatedAt: 2026-01-06
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
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Thêm tùy chọn đầu ra tuyệt đối cho lệnh list
  - version: 7.5.11
    date: 2026-01-06
    changes: Thêm tùy chọn đầu ra JSON cho lệnh list
---

# Liệt kê các tệp khai báo nội dung

```bash
npx intlayer content list
```

## Bí danh:

- `npx intlayer list`

Lệnh này hiển thị tất cả các tệp khai báo nội dung trong dự án của bạn, cho thấy các khóa từ điển và đường dẫn tệp của chúng. Nó hữu ích để có cái nhìn tổng quan về tất cả các tệp nội dung của bạn và xác minh rằng chúng được Intlayer phát hiện đúng cách.

## Đối số:

- **`--json`**: Xuất kết quả dưới dạng JSON thay vì văn bản được định dạng. Hữu ích cho việc viết script và truy cập lập trình.

  > Ví dụ: `npx intlayer content list --json`

## Ví dụ:

### Liệt kê các tệp khai báo nội dung:

```bash
npx intlayer content list
```

### Đầu ra dưới dạng JSON:

```bash
npx intlayer content list --json
```

### Đầu ra dưới dạng đường dẫn tuyệt đối:

```bash
npx intlayer content list --absolute
```

## Ví dụ đầu ra:

### Đầu ra được định dạng:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Tổng số tệp khai báo nội dung: 3
```

### Đầu ra JSON:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Lệnh này sẽ xuất ra:

- Một danh sách được định dạng của tất cả các tệp khai báo nội dung với các khóa và đường dẫn tệp tương đối của chúng
- Tổng số tệp khai báo nội dung được tìm thấy

Kết quả đầu ra giúp bạn xác minh rằng tất cả các tệp nội dung của bạn được cấu hình đúng và có thể được hệ thống Intlayer phát hiện.

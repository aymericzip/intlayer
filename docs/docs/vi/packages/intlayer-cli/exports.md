---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói intlayer-cli
description: Công cụ CLI cho Intlayer, cung cấp các lệnh để xây dựng và kiểm toán từ điển.
keywords:
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Gói intlayer-cli

Gói `intlayer-cli` cung cấp một tập các lệnh để quản lý từ điển và cấu hình của Intlayer.

## Cài đặt

```bash
npm install intlayer-cli
```

## Các export

### Lệnh CLI (Functions)

Gói này xuất các hàm vận hành các lệnh CLI, cho phép bạn kích hoạt các thao tác Intlayer một cách lập trình.

Import:

```tsx
import "intlayer-cli";
```

| Hàm            | Mô tả                                            |
| -------------- | ------------------------------------------------ |
| `build`        | Xây dựng các từ điển Intlayer.                   |
| `audit`        | Kiểm tra các từ điển để tìm bản dịch thiếu.      |
| `liveSync`     | Đồng bộ hóa từ điển theo thời gian thực.         |
| `pull`         | Kéo từ điển từ một nguồn từ xa.                  |
| `push`         | Đẩy từ điển tới một nguồn từ xa.                 |
| `test`         | Chạy kiểm thử trên các từ điển.                  |
| `transform`    | Chuyển đổi các từ điển giữa các định dạng.       |
| `fill`         | Điền các bản dịch còn thiếu vào từ điển bằng AI. |
| `reviewDoc`    | Xem xét tài liệu để phục vụ quốc tế hóa.         |
| `translateDoc` | Dịch tài liệu bằng AI.                           |

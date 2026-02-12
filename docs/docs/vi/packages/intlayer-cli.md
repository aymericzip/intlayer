---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói intlayer-cli
description: Công cụ CLI cho Intlayer, cung cấp các lệnh để xây dựng và kiểm toán từ điển.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói intlayer-cli

Gói `intlayer-cli` cung cấp một tập hợp các lệnh để quản lý các từ điển và cấu hình của Intlayer.

## Cài đặt

```bash
npm install intlayer-cli
```

## Các export

### Lệnh CLI (Hàm)

Gói này xuất các hàm cung cấp cho các lệnh CLI.

| Hàm        | Mô tả                                             |
| ---------- | ------------------------------------------------- |
| `build`    | Xây dựng các từ điển Intlayer.                    |
| `audit`    | Kiểm tra các từ điển để phát hiện bản dịch thiếu. |
| `liveSync` | Đồng bộ các từ điển theo thời gian thực.          |
| `pull`     | Kéo các từ điển từ nguồn từ xa.                   |
| `push`     | Đẩy các từ điển lên nguồn từ xa.                  |
| `test`     | Chạy kiểm thử trên các từ điển.                   |
| `extract`  | Chuyển đổi các từ điển giữa các định dạng.        |

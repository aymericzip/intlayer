---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Từ Điển Động
description: Tổng quan về ba tính năng từ điển động của Intlayer — bộ sưu tập, biến thể và bản ghi động — để xây dựng nội dung i18n linh hoạt, được điều khiển bằng runtime.
keywords:
  - Từ Điển Động
  - Bộ Sưu Tập
  - Biến Thể
  - Bản Ghi Động
  - Intlayer
  - Quốc tế hóa
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Phát hành tính năng từ điển động"
author: aymericzip
---

# Từ Điển Động

Intlayer hỗ trợ ba cơ chế để thể hiện nội dung vượt ra ngoài một từ điển tĩnh duy nhất cho mỗi khóa. Mỗi cơ chế được khai báo thông qua một **trường siêu dữ liệu (metadata) cấp cao nhất** trong tệp nội dung; không cần hàm bao (wrapper).

| Tính năng                                                                                                             | Trường siêu dữ liệu | Bộ chọn trong `useIntlayer` |
| --------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------- |
| [Bộ Sưu Tập](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/collections.md)       | `item: N`           | `{ item: N }`               |
| [Biến Thể](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/variants.md)            | `variant: "name"`   | `{ variant: "name" }`       |
| [Bản Ghi Động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }`   | `{ id, … }`                 |

Cả ba cơ chế đều kết hợp với đối số ngôn ngữ (locale) và hỗ trợ tải chọn lọc / tải lười (lazy loading) thông qua `importMode`.

## Khi nào nên sử dụng tính năng nào

- **Bộ sưu tập** — danh sách các mục có thứ tự được quản lý trong các tệp riêng biệt (mục FAQ, bài viết blog, sản phẩm).
- **Biến thể** — các lựa chọn nội dung thay thế được đặt tên cho các thử nghiệm A/B, biểu ngữ theo mùa hoặc cờ tính năng (feature flags).
- **Bản ghi động** — nội dung được truy xuất tại runtime bằng một ID ẩn (bản ghi CMS, nội dung dành riêng cho người dùng).

## Giải quyết xung đột bộ chọn

Khi có nhiều bộ chọn tồn tại trên cùng một từ điển, thứ tự ưu tiên giải quyết là:

```
variant → meta → item
```

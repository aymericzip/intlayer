---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Từ điển động
description: Tổng quan về các tính năng từ điển động của Intlayer — bộ sưu tập và biến thể — để xây dựng nội dung i18n linh hoạt, được điều khiển trong thời gian chạy.
keywords:
  - Từ điển động
  - Bộ sưu tập
  - Biến thể
  - Intlayer
  - Quốc tế hóa
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Phát hành tính năng từ điển động"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Hợp nhất bản ghi động vào biến thể — `variant` giờ chấp nhận một chuỗi hoặc một đối tượng"
author: aymericzip
---

# Từ điển động

Intlayer hỗ trợ hai cơ chế để diễn đạt nội dung vượt ra ngoài một từ điển tĩnh duy nhất cho mỗi khóa. Mỗi cơ chế được khai báo qua một **trường metadata cấp cao nhất** trong tệp nội dung; không cần hàm bao bọc.

| Tính năng                                                                                                       | Trường metadata                           | Bộ chọn trong `useIntlayer`                       |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| [Bộ sưu tập](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/collections.md) | `item: N`                                 | `{ item: N }`                                     |
| [Biến thể](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/variants.md)      | `variant: "name"` _hoặc_ `variant: { … }` | `{ variant: "name" }` _hoặc_ `{ variant: { … } }` |

Cả hai đều kết hợp với đối số locale và hỗ trợ tải chọn lọc / lười qua `importMode`.

## Khi nào dùng cái nào

- **Bộ sưu tập** — danh sách mục được sắp xếp, quản lý trong các tệp riêng (mục FAQ, bài blog, sản phẩm).
- **Biến thể** — các lựa chọn nội dung được đặt tên hoặc có cấu trúc:
  - biến thể **chuỗi** cho thử nghiệm A/B, banner theo mùa hoặc feature flag;
  - biến thể **đối tượng** cho bản ghi CMS, nội dung riêng theo người dùng, hoặc bất kỳ nội dung nào được định địa chỉ bằng một tập hợp trường ("bản ghi động" trước đây).

> Các phiên bản trước cung cấp một trường `meta` riêng cho nội dung được khóa theo bản ghi. Nó đã được hợp nhất vào `variant`: hãy truyền một **đối tượng** cho `variant` thay vì dùng `meta`.

## Khử nhập nhằng bộ chọn

Một khóa có thể khai báo cả hai chiều cùng lúc (ví dụ một bộ sưu tập mà mỗi mục có một biến thể). Chúng được phân giải theo thứ tự:

```
variant → item
```

Vì vậy, `{ variant: "promo" }` trên khóa variant × item trả về mọi mục promo dưới dạng mảng, và thêm `{ item: 2 }` thu hẹp lại còn một mục duy nhất.

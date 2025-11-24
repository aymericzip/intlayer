---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Đánh Giá Tài Liệu
description: Tìm hiểu cách đánh giá các tệp tài liệu về chất lượng, tính nhất quán và độ đầy đủ trên các ngôn ngữ khác nhau.
keywords:
  - Đánh Giá
  - Tài Liệu
  - Tài Liệu Hướng Dẫn
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# Đánh Giá Tài Liệu

Lệnh `doc review` phân tích các tệp tài liệu về chất lượng, tính nhất quán và độ đầy đủ trên các ngôn ngữ khác nhau.

```bash
npx intlayer doc review
```

Lệnh này có thể được sử dụng để đánh giá các tệp đã được dịch, và kiểm tra xem bản dịch có chính xác hay không.

Đối với hầu hết các trường hợp sử dụng,

- ưu tiên sử dụng `doc translate` khi phiên bản dịch của tệp này chưa có.
- ưu tiên sử dụng `doc review` khi phiên bản dịch của tệp này đã tồn tại.

> Lưu ý rằng quá trình đánh giá tiêu tốn nhiều token đầu vào hơn so với quá trình dịch để đánh giá toàn bộ tệp. Tuy nhiên, quá trình đánh giá sẽ tối ưu các phần cần đánh giá, và sẽ bỏ qua những phần không thay đổi.

## Tham số:

Lệnh `doc review` chấp nhận cùng các tham số như `doc translate`, cho phép bạn đánh giá các tệp tài liệu cụ thể và áp dụng các kiểm tra chất lượng.

Nếu bạn đã kích hoạt một trong các tùy chọn git, lệnh sẽ chỉ đánh giá phần của các tệp bị thay đổi. Script sẽ xử lý bằng cách chia tệp thành các phần nhỏ và đánh giá từng phần. Nếu phần đó không có thay đổi, script sẽ bỏ qua để tăng tốc quá trình đánh giá và giới hạn chi phí API của nhà cung cấp AI.

- Để xem danh sách đầy đủ các tham số, hãy xem tài liệu lệnh [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-translate.md).

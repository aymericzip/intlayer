---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Điểm chuẩn các thư viện i18n
description: Tìm hiểu cách Intlayer so sánh với các thư viện i18n khác về hiệu năng và kích thước gói bundle.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Khởi tạo benchmark"
---

# Benchmark Bloom — Báo cáo

Benchmark Bloom là một bộ công cụ đo lường hiệu năng nhằm đánh giá tác động thực tế của các thư viện i18n (quốc tế hóa) trên nhiều React framework và chiến lược tải khác nhau.

Tìm hiểu các báo cáo chi tiết và tài liệu kỹ thuật cho từng framework dưới đây:

- [**Báo cáo Benchmark Next.js**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md)
- [**Báo cáo Benchmark TanStack Start**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md)

---

## Kết quả hiện tại

Xem [**bảng điều khiển benchmark tương tác**](https://intlayer.org/benchmark) để so sánh trực tiếp và xem dữ liệu tổng hợp.
| `scoped-dynamic` | Cao (rò rỉ gần như bằng không) | Cao |

Việc chuyển từ `static` sang `scoped-dynamic` thường giúp giảm nội dung không sử dụng từ 60–90%, nhưng đòi hỏi cấu hình phức tạp hơn nhiều. Các thư viện như Intlayer tự động hóa mô hình scoped-dynamic để các nhà phát triển đạt được hiệu quả mà không cần viết quá nhiều mã lặp lại (boilerplate).

### Cách đọc các con số rò rỉ (leakage)

Mức rò rỉ trang **35%** có nghĩa là 35% lượng JavaScript được tải xuống cho trang đó chứa các chuỗi ký tự từ các trang khác — nội dung mà người dùng không thể nhìn thấy trên trang hiện tại. Trên một trang nặng 400 KB, đó là ~140 KB dữ liệu lãng phí có thể tránh được.

Mức rò rỉ ngôn ngữ (locale leakage) **10%** có nghĩa là 10% gói bundle chứa các bản dịch của các ngôn ngữ mà người dùng hiện tại không sử dụng.

### Tính phản ứng (Reactivity) và thời gian render

- **E2E reactivity**: đo lường trải nghiệm người dùng đầy đủ: mạng, chi phí framework, cập nhật DOM.
- **Thời gian React Profiler**: tách biệt chi phí render lại cây React.

Một thư viện có thể có thời gian Profiler thấp nhưng thời gian E2E cao nếu việc chuyển đổi ngôn ngữ yêu cầu một yêu cầu mạng (tải tệp ngôn ngữ mới). Ngược lại, một thư viện có thể có thời gian Profiler cao nhưng vẫn mang lại cảm giác nhanh nếu nó gom nhóm (batch) các bản cập nhật một cách hiệu quả.

---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` & Intlayer – lỗi từ chối `node:fs` dương tính giả
description: Tại sao vite-env-only báo một import `node:fs` bị từ chối khi dùng Intlayer + React-Router + Vite và phải làm gì.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import bị từ chối
  - alias
  - bundle phía client
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only từ chối `node:fs` với Intlayer

Nếu bạn đã sử dụng plugin **vite-env-only** (như được đề cập trong các gợi ý React-Router v7 cũ hơn) và thấy:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…mặc dù **không có `node:fs` trong bundle phía client của bạn**, đây là một **false positive (dương tính giả)**.

## Nguyên nhân gây ra

`vite-env-only` chạy một kiểm tra dựa trên Babel **rất sớm trong quá trình phân giải graph của Vite**, _trước khi_:

- aliasing (bao gồm ánh xạ browser vs node của Intlayer),
- dead-code elimination,
- SSR vs client resolution,
- các module ảo như của React-Router.

Các package của Intlayer chứa mã có thể chạy trên cả Node và trình duyệt. Ở một giai đoạn _trung gian_, một builtin của Node như `node:fs` có thể xuất hiện trong graph **trước khi** Vite loại bỏ nó khỏi build phía client. `vite-env-only` nhìn thấy điều đó và báo lỗi ngay lập tức, mặc dù bundle cuối cùng không chứa nó.

## React-Router và Server Modules

Trong tài liệu của React-Router về **server module conventions**
(https://reactrouter.com/api/framework-conventions/server-modules), nhóm **rõ ràng khuyến nghị sử dụng `vite-env-only`** để ngăn các import chỉ dành cho server bị rò rỉ vào bundle phía client.

Tuy nhiên, những quy ước đó dựa vào aliasing của Vite, conditional exports và tree-shaking để loại bỏ mã chỉ dành cho server. Trong khi aliasing và conditional exports đã được áp dụng, một số tiện ích dựa trên Node vẫn còn xuất hiện trong các package như `@intlayer/core` ở giai đoạn đó (mặc dù chúng không bao giờ được import vào client). Vì tree-shaking chưa chạy, các hàm đó vẫn bị Babel phân tích cú pháp, và `vite-env-only` phát hiện các import `node:` của chúng và báo dương tính giả — mặc dù chúng đã được loại bỏ chính xác khỏi bundle cuối cùng của client.

## Cách khắc phục / giải pháp tạm thời

### Khuyến nghị: Gỡ bỏ `vite-env-only`

Chỉ cần gỡ plugin. Trong nhiều trường hợp bạn không cần nó — Vite đã xử lý việc phân biệt imports client và server thông qua cơ chế resolution của nó.

Điều này sửa lỗi báo sai `node:fs` mà không cần thay đổi Intlayer.

### Thay vào đó, kiểm tra bản build cuối cùng

Nếu bạn vẫn muốn đảm bảo không có built-in của Node trong client, hãy làm điều đó **sau khi build**, ví dụ:

```bash
pnpm build
grep -R "node:" dist/
```

Nếu không có kết quả, các bundle client của bạn sạch.

## Tóm tắt

- `vite-env-only` có thể báo lỗi về `node:fs` vì nó kiểm tra quá sớm.
- Vite + Intlayer + quy ước server modules của React-Router thường loại bỏ tham chiếu chỉ dành cho server một cách chính xác.
- Gỡ plugin hoặc kiểm tra _kết quả cuối cùng_ thường là giải pháp tốt nhất.

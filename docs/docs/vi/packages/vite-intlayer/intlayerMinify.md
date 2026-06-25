---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Tài liệu Plugin Vite intlayerMinify | vite-intlayer
description: Plugin Vite giúp nén (minify) các tệp JSON từ điển Intlayer đã biên dịch và tùy chọn mã hóa các tên trường nội dung để giảm kích thước gói bundle.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - nén
  - kích thước bundle
  - từ điển
  - đa ngôn ngữ
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` là một plugin Vite nén các tệp JSON từ điển đã biên dịch trong quá trình build production. Nó loại bỏ tất cả khoảng trắng không cần thiết và khi kết hợp với `intlayerPrune`, có thể tùy chọn đổi tên các trường nội dung thành các bí danh ngắn (`a`, `b`, `c`, …) để giảm thiểu hơn nữa kích thước gói bundle.

> Plugin này đã được tích hợp và cấu hình tự động khi bạn sử dụng [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md). Bạn chỉ cần tự đăng ký thủ công nếu đang tự thiết lập cấu trúc plugin của riêng mình.

## Cách sử dụng

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Điều kiện kích hoạt

`intlayerMinify` chỉ hoạt động **khi và chỉ khi** cả ba điều kiện sau đều đúng:

1. Lệnh Vite chạy là `build` (không phải `serve` / dev).
2. Tùy chọn `build.optimize` là `true` (hoặc `undefined`, mặc định sẽ là `true` đối với tiến trình build).
3. Tùy chọn `build.minify` được đặt là `true` trong cấu hình Intlayer của bạn.

Nó tự động bị **vô hiệu hóa** khi `editor.enabled` là `true` vì editor cần nội dung từ điển đầy đủ và thân thiện với người đọc.

## Những gì được nén

Plugin nhắm vào hai vị trí từ điển (được phân giải từ `intlayer.system`):

- `dictionariesDir` — các từ điển tĩnh cho tất cả các locale (ví dụ: `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — các từ điển động cho mỗi locale

> Các từ điển sử dụng chế độ fetch (`fetchDictionariesDir`) sẽ **không bao giờ** bị nén vì chúng được cung cấp từ một API từ xa tại thời điểm chạy bằng cách sử dụng các tên trường gốc. Việc đổi tên các trường sẽ tạo ra sự không khớp giữa phản hồi của máy chủ và các thuộc tính được truy cập phía client.

## Mã hóa tên trường (Thu nhỏ thuộc tính)

Khi `intlayerPrune` đã phân tích mã nguồn và cập nhật dữ liệu cho `pruneContext.dictionaryKeyToFieldRenameMap`, `intlayerMinify` cũng đổi tên các trường nội dung thành các bí danh ngắn. Ví dụ:

```json
// trước khi đổi
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// sau khi đổi (đã được mã hóa)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Các thuộc tính truy cập trong tệp nguồn tương ứng được đổi tên bằng bước xử lý Babel bên trong `intlayerOptimize`, do đó hành vi runtime không bị thay đổi.

Các trường nội bộ của Intlayer (`nodeType`, `translation`, v.v.) không bao giờ bị đổi tên.

## Các từ điển trường hợp đặc biệt (Edge-cases)

Các từ điển được gắn cờ trong `pruneContext.dictionariesWithEdgeCases` (phát hiện bất thường về cấu trúc trong giai đoạn prune) sẽ được bỏ qua hoàn toàn — không nén hay mã hóa — để tránh gửi dữ liệu bị hỏng.

## Nhóm đủ điều kiện (Bộ sưu tập / Biến thể / Bản ghi meta)

Đối với các từ điển có mảng `qualifierTypes` (bộ sưu tập, biến thể và bản ghi meta), plugin giữ nguyên mảng `qualifierTypes` và bản đồ phụ `meta` một cách nguyên văn. Chỉ có các mục nhập `content` bị mã hóa tên trường. Các khóa phức hợp (được sử dụng để đối sánh bộ chọn tại thời điểm chạy) không bao giờ bị can thiệp.

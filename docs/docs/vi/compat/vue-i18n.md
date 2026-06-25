---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ Vue I18n Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng Vue của bạn từ vue-i18n sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ Vue I18n Sang Intlayer

Nếu ứng dụng Vue của bạn hiện đang sử dụng `vue-i18n`, bạn có thể di chuyển sang Intlayer mà không cần viết lại các component hoặc dịch các hook. Intlayer cung cấp một bộ điều hợp tương thích phản chiếu hoàn hảo API của `vue-i18n` trong khi tận dụng các tính năng mạnh mẽ của Intlayer bên dưới.

## Phải làm gì

Để bắt đầu, chỉ cần chạy lệnh khởi tạo trong dự án của bạn:

```bash
npx intlayer init
```

Trong quá trình khởi tạo, Intlayer sẽ thiết lập file cấu hình (`intlayer.config.ts`) và chuẩn bị dự án của bạn để di chuyển. Bạn chỉ cần thêm plugin Intlayer vào cấu hình Vite của mình để tự động tạo bí danh cho các import `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Những gì diễn ra bên dưới

`vueI18nVitePlugin` chèn một bí danh module vào bundler của bạn. Bất kỳ import nào của `vue-i18n` trong codebase của bạn sẽ được chuyển hướng trong suốt sang `@intlayer/vue-i18n`.

**Bên dưới, bộ điều hợp xử lý cú pháp `vue-i18n` phức tạp một cách gốc:**

- **Nội suy & Số nhiều:** Giải quyết các nội suy `{name}` và danh sách `{0}`. Số nhiều kiểu pipe (`"car | cars"`) được chuyển đổi thành các node enumeration/plural của Intlayer dựa trên ngữ nghĩa vị trí.
- **Định dạng:** Các hàm như `d()` và `n()` bao bọc `Intl` bên dưới, tuân thủ `datetimeFormats` và `numberFormats` được xác định trong các tùy chọn của bạn.
- **Trạng thái toàn cục & cục bộ:** `global.locale` được ánh xạ tới một `WritableComputedRef` được hỗ trợ bởi client Intlayer, vì vậy reactivity hoạt động chính xác như mong đợi (ví dụ: `locale.value = 'fr'`).
- **Directive:** Directive `v-t` được đăng ký và hoạt động bình thường.

Ứng dụng của bạn tiếp tục hiển thị chính xác như trước, nhưng nội dung được cung cấp bởi các từ điển Intlayer của bạn, mang lại cho bạn type safety, tối ưu hóa bundle tốt hơn và tích hợp CMS liền mạch.

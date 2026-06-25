---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Tài liệu Gói @intlayer/babel"
description: Các plugin Babel cho Intlayer để xử lý trích xuất nội dung, tối ưu hóa nhập khẩu (import), loại bỏ các trường không sử dụng và mã hóa tên trường trong quá trình xây dựng (build).
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - đa ngôn ngữ
  - i18n
  - trình biên dịch
  - tối ưu hóa
  - loại bỏ
  - thu nhỏ
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Hợp nhất tài liệu cho tất cả các xuất khẩu (exports)"
author: aymericzip
---

# Gói @intlayer/babel

Gói `@intlayer/babel` cung cấp một tập hợp các plugin Babel chuyên dụng cho Intlayer. Các plugin này bao gồm toàn bộ chu kỳ xây dựng: trích xuất các khai báo nội dung, viết lại các lệnh gọi `useIntlayer` / `getIntlayer` thành các lệnh nhập từ điển được tối ưu hóa, cắt bỏ các trường không sử dụng và nén tên trường.

## Cài đặt

```bash
npm install @intlayer/babel
```

## Xuất khẩu (Exports)

Nhập khẩu (Import):

```ts
import { ... } from "@intlayer/babel";
```

---

### Plugins

| Hàm / Lớp                      | Mô tả                                                                                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Plugin Babel trích xuất nội dung có thể dịch từ các tệp nguồn và tự động chèn các hook `useIntlayer` / `getIntlayer`. Được thiết kế để sử dụng với Next.js và các công cụ xây dựng dựa trên Babel. |
| `intlayerOptimizeBabelPlugin`  | Plugin Babel chuyển đổi các lệnh gọi `useIntlayer` và `getIntlayer` và viết lại các lệnh nhập của chúng thành các lệnh nhập từ điển JSON được tối ưu hóa (tĩnh, động hoặc qua fetch).              |
| `intlayerPurgeBabelPlugin`     | Plugin Babel phân tích các tệp nguồn và viết lại các tệp JSON từ điển đã biên dịch để loại bỏ các trường không sử dụng (`build.purge`) hoặc đổi tên chúng thành các bí danh ngắn (`build.minify`). |
| `intlayerMinifyBabelPlugin`    | Plugin Babel viết lại các tệp nguồn để sử dụng các bí danh trường ngắn được chỉ định trong giai đoạn thu nhỏ (ví dụ: `content.title` ← `content.a`). Dựa vào `intlayerPurgeBabelPlugin`.           |
| `makeFieldRenameBabelPlugin`   | Hàm tạo (factory) tạo ra một plugin Babel để đổi tên các truy cập trường nội dung từ điển trong các tệp nguồn theo `dictionaryKeyToFieldRenameMap` được điền trong `PruneContext`.                 |
| `makeUsageAnalyzerBabelPlugin` | Hàm tạo tạo ra một plugin Babel để phân tích việc sử dụng `useIntlayer` / `getIntlayer` trong mã nguồn và tổng hợp dữ liệu sử dụng trường trong `PruneContext` chung.                              |
| `getSharedPruneContext`        | Hàm trợ giúp trả về đối tượng `PruneContext` chung cho thư mục gốc đã chỉ định hoặc `null` nếu nó chưa được khởi tạo.                                                                              |

---

### Tiện ích cấu hình plugin

| Hàm                        | Mô tả                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Tải cấu hình Intlayer và trả về `ExtractPluginOptions` sẵn sàng sử dụng với `intlayerExtractBabelPlugin`.                                       |
| `getOptimizePluginOptions` | Tải cấu hình Intlayer và các từ điển đã biên dịch, đồng thời trả về `OptimizePluginOptions` sẵn sàng sử dụng với `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Tải cấu hình Intlayer và trả về `PurgePluginOptions` sẵn sàng sử dụng với `intlayerPurgeBabelPlugin`.                                           |
| `getMinifyPluginOptions`   | Tải cấu hình Intlayer và trả về `MinifyPluginOptions` sẵn sàng sử dụng với `intlayerMinifyBabelPlugin`.                                         |

---

### Kiểu dữ liệu

| Kiểu dữ liệu            | Mô tả                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Chế độ trình biên dịch: `'dev'` để phát triển với hỗ trợ HMR hoặc `'build'` cho các bản dựng production.                      |
| `ExtractPluginOptions`  | Tùy chọn cho `intlayerExtractBabelPlugin`: danh sách tệp, cấu hình, callback `onExtract`, v.v.                                |
| `ExtractResult`         | Kết quả trích xuất: khóa từ điển, đường dẫn tệp, nội dung và ngôn ngữ.                                                        |
| `OptimizePluginOptions` | Tùy chọn cho `intlayerOptimizeBabelPlugin`: đường dẫn từ điển, chế độ nhập, bản đồ chế độ cho mỗi từ điển, v.v.               |
| `PurgePluginOptions`    | Tùy chọn cho `intlayerPurgeBabelPlugin`: thư mục gốc, cờ purge/minify/optimize, danh sách tệp component.                      |
| `MinifyPluginOptions`   | Tùy chọn cho `intlayerMinifyBabelPlugin`: thư mục gốc, cờ thu nhỏ/tối ưu hóa/editorEnabled.                                   |
| `PruneContext`          | Trạng thái chia sẻ giữa các phân tích và các plugin cắt bỏ: bản đồ sử dụng trường, bản đồ đổi tên, v.v.                       |
| `DictionaryFieldUsage`  | Kết quả sử dụng trường cho một từ điển duy nhất: `Set<string>` hoặc `'all'` khi phân tích tĩnh không đưa ra kết quả kết luận. |
| `NestedRenameEntry`     | Một nút trong cây đổi tên: `shortName` và bản đồ các con.                                                                     |
| `NestedRenameMap`       | Một cấp độ trong cây đổi tên: `Map<string, NestedRenameEntry>`.                                                               |
| `CompatCallerConfig`    | Cấu hình cho bộ phân tích sử dụng tương thích cho các gói `compat-adapter` (tên người gọi và các tùy chọn xử lý).             |
| `ScriptBlock`           | Khối script được trích xuất từ tệp SFC (Vue hoặc Svelte): nội dung, độ lệch bắt đầu và kết thúc.                              |

---

### Các hàm tiện ích

| Hàm                               | Mô tả                                                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Chuyển đổi một số nguyên (bắt đầu từ số không) thành mã định danh chữ cái ngắn: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, v.v.                                |
| `buildNestedRenameMapFromContent` | Xây dựng đệ quy một `NestedRenameMap` từ giá trị nội dung của một từ điển đã biên dịch, tôn trọng các cấu trúc nút Intlayer (translation, enumeration, v.v.). |
| `createPruneContext`              | Tạo một đối tượng `PruneContext` trống mới được khởi tạo với các giá trị mặc định.                                                                            |
| `extractScriptBlocks`             | Trích xuất các khối `<script>` từ các tệp SFC (Vue / Svelte) để phân tích Babel tiếp theo.                                                                    |
| `BABEL_PARSER_OPTIONS`            | Hằng số đại diện cho các tùy chọn phân tích cú pháp Babel bao gồm các framework được hỗ trợ (React/Vue/Svelte/Angular/...).                                   |
| `INTLAYER_CALLER_NAMES`           | Danh sách hằng số gồm các tên người gọi Intlayer ban đầu: `['useIntlayer', 'getIntlayer']`.                                                                   |

---

## Ví dụ sử dụng

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Lưu ý:** Plugin `intlayerPurgeBabelPlugin` phải được khai báo **trước** `intlayerMinifyBabelPlugin`, vì plugin sau đọc bản đồ đổi tên được xây dựng bởi plugin trước. Ngoài ra, cả hai đều phải đứng sau `intlayerOptimizeBabelPlugin` để nó có thể nhìn thấy các khóa từ điển trước khi các lệnh gọi `useIntlayer` được viết lại.

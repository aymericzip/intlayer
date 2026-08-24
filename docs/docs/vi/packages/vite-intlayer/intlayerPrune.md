---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Plugin intlayerPrune cho Vite | vite-intlayer
description: Xem cách sử dụng plugin intlayerPrune cho gói vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalization
  - Tài liệu
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# Tài liệu Plugin intlayerPrune cho Vite

Plugin Vite `intlayerPrune` được sử dụng để thực hiện tree-shaking và loại bỏ các từ điển không được sử dụng khỏi bundle ứng dụng của bạn. Điều này giúp giảm kích thước bundle cuối cùng bằng cách chỉ bao gồm nội dung đa ngôn ngữ cần thiết.

> Plugin đã được bao gồm và cấu hình tự động khi bạn sử dụng [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md). Bạn chỉ cần đăng ký nó theo cách thủ công nếu bạn đang soạn plugin stack của riêng mình.

## Cách sử dụng

### Như một phần của `intlayer()` (được khuyến nghị)

Bật pruning thông qua cấu hình Intlayer của bạn và plugin chính sẽ xử lý mọi thứ:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // kích hoạt cả prune và minify
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Độc lập

Nếu bạn đang soạn stack plugin thủ công, `intlayerPrune` và `intlayerMinify` chia sẻ một object `PruneContext` phải được tạo một lần và truyền cho cả hai:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // tuỳ chọn, đọc từ cùng một context
  ],
});
```

## Cách thức hoạt động

### 1. Phân tích cách sử dụng (buildStart)

Trong `buildStart`, plugin `intlayerOptimize` (cũng là một phần của `intlayer()`) quét mọi tệp nguồn component được liệt kê trong `build.filesList`. Với mỗi lệnh gọi `useIntlayer('key')` hoặc `getIntlayer('key')`, nó ghi lại chính xác những trường nào được truy cập, ví dụ:

```ts
const { title, description } = useIntlayer("myDict");
// records: myDict → { title, description }
```

Điều này xây dựng `pruneContext.fieldUsageMap` trước khi bất kỳ lệnh gọi `transform` nào chạy.

### 2. JSON pruning (transform, enforce: 'pre')

When Vite processes a compiled dictionary JSON file, `intlayerPrune` intercepts it before Vite's built-in JSON → ESM conversion. It reads the field-usage map from `pruneContext` and removes any content field that is not in the recorded usage set.

Two content shapes are supported:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Fields are pruned per-locale inside `translation`.
- **Dynamic (per-locale) dictionaries** — flat `{ fieldA: ..., fieldB: ... }`. Fields are pruned at the top level.

### 3. Các trường hợp đặc biệt

Nếu cấu trúc nội dung của một dictionary không thể được nhận dạng (ví dụ: một hình dạng lồng ghép không thông thường), nó sẽ được thêm vào `pruneContext.dictionariesWithEdgeCases` và **được để nguyên**. Một cảnh báo sẽ được ghi lại. `intlayerMinify` cũng bỏ qua những dictionary này.

### 4. Field-rename map

Khi pruning thành công, `intlayerPrune` cũng ghi `pruneContext.dictionaryKeyToFieldRenameMap` — một ánh xạ từ tên trường gốc sang các bí danh ngắn. `intlayerMinify` đọc bản đồ này để đổi tên các trường trong JSON đầu ra, và Babel rename pass của `intlayerOptimize` cập nhật các truy cập thuộc tính trong các tệp nguồn tương ứng.

## Điều kiện kích hoạt

`intlayerPrune` được kích hoạt **chỉ khi** tất cả các điều kiện sau đây đều đúng:

1. Lệnh Vite là `build`.
2. `build.optimize` là `true` (hoặc `undefined`, mặc định là `true` cho các bản build).
3. `build.purge` là `true` trong cấu hình Intlayer của bạn.

Nó vẫn hoạt động khi `editor.enabled` là `true`: trình soạn thảo trực quan phân giải mỗi chỉnh sửa thông qua `dictionaryKey` + `keyPath` dựa trên các từ điển chưa hợp nhất, mà plugin này không bao giờ đụng đến, và một trường đã bị loại bỏ là trường mà không component nào đọc — vì vậy nó không bao giờ được render và cũng không thể chọn được trên trang.

---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Tối ưu hóa kích thước Bundle i18n & Hiệu suất
description: Giảm kích thước bundle ứng dụng bằng cách tối ưu hóa nội dung quốc tế hóa (i18n). Tìm hiểu cách tận dụng tree shaking và lazy loading cho từ điển với Intlayer.
keywords:
  - Tối ưu hóa Bundle
  - Tự động hóa nội dung
  - Nội dung động
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Thêm các tùy chọn `minify` và `purge` vào cấu hình build"
---

# Tối ưu hóa kích thước Bundle i18n & Hiệu suất

Một trong những thách thức phổ biến nhất với các giải pháp i18n truyền thống dựa trên tệp JSON là quản lý kích thước nội dung. Nếu các nhà phát triển không tách nội dung thành các không gian tên (namespaces) theo cách thủ công, người dùng thường phải tải xuống các bản dịch cho mọi trang và có thể là mọi ngôn ngữ chỉ để xem một trang duy nhất.

Ví dụ, một ứng dụng có 10 trang được dịch sang 10 ngôn ngữ có thể dẫn đến việc người dùng tải xuống nội dung của 100 trang, mặc dù họ chỉ cần **một** trang (trang hiện tại bằng ngôn ngữ hiện tại). Điều này dẫn đến lãng phí băng thông và thời gian tải chậm hơn.

**Intlayer giải quyết vấn đề này thông qua tối ưu hóa tại thời điểm build.** Nó phân tích mã của bạn để phát hiện từ điển nào thực sự được sử dụng cho mỗi thành phần và chỉ chèn lại nội dung cần thiết vào bundle của bạn.

## Mục lục

<TOC />

## Quét bundle của bạn

Phân tích bundle là bước đầu tiên để xác định các tệp JSON "nặng" và cơ hội tách mã (code-splitting). Các công cụ này tạo ra một sơ đồ cây (treemap) trực quan về mã đã biên dịch của ứng dụng, cho phép bạn thấy chính xác thư viện nào đang tiêu tốn nhiều không gian nhất.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite sử dụng Rollup dưới nền t cả. Plugin `rollup-plugin-visualizer` tạo ra một tệp HTML tương tác hiển thị kích thước của mọi mô-đun trong biểu đồ của bạn.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Tự động mở báo cáo trong trình duyệt của bạn
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Đối với các dự án sử dụng App Router và Turbopack, Next.js cung cấp một trình phân tích thử nghiệm tích hợp sẵn mà không cần thêm phụ thuộc.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Nếu bạn đang sử dụng trình đóng gói Webpack mặc định trong Next.js, hãy sử dụng trình phân tích bundle chính thức. Kích hoạt nó bằng cách đặt biến môi trường trong quá trình build của bạn.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Cấu hình Next.js của bạn
});
```

**Sử dụng:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack Tiêu chuẩn

Đối với Create React App (ejected), Angular hoặc các thiết lập Webpack tùy chỉnh, hãy sử dụng tiêu chuẩn ngành `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Cách thức hoạt động

Intlayer sử dụng **cách tiếp cận theo từng thành phần**. Không giống như các tệp JSON toàn cục, nội dung của bạn được xác định bên cạnh hoặc bên trong các thành phần của bạn. Trong quá trình build, Intlayer sẽ:

1.  **Phân tích** mã của bạn để tìm các cuộc gọi `useIntlayer`.
2.  **Xây dựng** nội dung từ điển tương ứng.
3.  **Thay thế** cuộc gọi `useIntlayer` bằng mã được tối ưu hóa dựa trên cấu hình của bạn.

Điều này đảm bảo rằng:

- Nếu một thành phần không được nhập, nội dung của nó sẽ không được bao gồm trong bundle (Loại bỏ mã chết - Dead Code Elimination).
- Nếu một thành phần được tải chậm (lazy-loaded), nội dung của nó cũng được tải chậm.

## Thiết lập theo Nền tảng

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js yêu cầu plugin `@intlayer/swc` để xử lý quá trình chuyển đổi, vì Next.js sử dụng SWC cho các lần build.

> Plugin này không được cài đặt theo mặc định vì các plugin SWC vẫn đang được thử nghiệm cho Next.js. Nó có thể thay đổi trong tương lai.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Sau khi cài đặt, Intlayer sẽ tự động phát hiện và sử dụng plugin này.

 </Tab>
 <Tab value="vite">

### Vite

Vite sử dụng plugin `@intlayer/babel` được bao gồm như một phụ thuộc của `vite-intlayer`. Quá trình tối ưu hóa được bật theo mặc định. Không cần làm gì thêm.

 </Tab>
 <Tab value="webpack">

### Webpack

Để bật tối ưu hóa bundle với Intlayer trên Webpack, bạn cần cài đặt và cấu hình plugin Babel (`@intlayer/babel`) hoặc SWC (`@intlayer/swc`) thích hợp.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

```typescript fileName="babel.config.js"
const {
  getOptimizePluginOptions,
  intlayerOptimizeBabelPlugin,
} = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Cấu hình

Bạn có thể kiểm soát cách Intlayer tối ưu hóa bundle của mình thông qua thuộc tính `build` trong tệp `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Nén (minify) các từ điển để giảm kích thước bundle.
     */
     minify: true;

    /**
     * Loại bỏ (purge) các khóa không sử dụng trong từ điển
     */
     purge: true;

    /**
     * Cho biết liệu quá trình build có nên kiểm tra các kiểu TypeScript hay không
     */
    checkTypes: false;
  },
};

export default config;
```

> Giữ tùy chọn mặc định cho `optimize` được khuyến nghị trong hầu hết các trường hợp.

> Xem cấu hình tài liệu để biết thêm chi tiết: [Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

### Tùy chọn Build

Các tùy chọn sau đây có sẵn trong đối tượng cấu hình `build`:

| Thuộc tính     | Kiểu      | Mặc định    | Mô tả                                                                                                                                                                                                                         |
| :------------- | :-------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Kiểm soát xem có bật tối ưu hóa build hay không. Nếu là `true`, Intlayer thay thế các cuộc gọi từ điển bằng các lệnh chèn được tối ưu hóa. Nếu là `false`, tối ưu hóa bị tắt. Tốt nhất nên đặt thành `true` trong production. |
| **`minify`**   | `boolean` | `false`     | Liệu có nén các từ điển để giảm kích thước bundle hay không.                                                                                                                                                                  |
| **`purge`**    | `boolean` | `false`     | Liệu có loại bỏ các khóa không sử dụng trong từ điển hay không.                                                                                                                                                               |

### Nén (Minification)

Nén từ điển giúp loại bỏ các khoảng trắng, nhận xét không cần thiết và giảm kích thước nội dung JSON. Điều này đặc biệt hữu ích cho các từ điển lớn.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Lưu ý: Nén bị bỏ qua nếu `optimize` bị tắt hoặc nếu Trình chỉnh sửa trực quan (Visual Editor) được bật (vì trình chỉnh sửa cần nội dung đầy đủ để cho phép chỉnh sửa).

### Loại bỏ (Purging)

Loại bỏ đảm bảo rằng chỉ những khóa thực sự được sử dụng trong mã của bạn mới được đưa vào bundle từ điển cuối cùng. Điều này có thể giảm đáng kể kích thước bundle của bạn nếu bạn có các từ điển lớn với nhiều khóa không được sử dụng trong mọi phần của ứng dụng.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Lưu ý: Loại bỏ bị bỏ qua nếu `optimize` bị tắt.

### Chế độ Nhập (Import Mode)

Đối với các ứng dụng lớn, bao gồm nhiều trang và ngôn ngữ, tệp JSON của bạn có thể chiếm một phần đáng kể trong kích thước bundle. Intlayer cho phép bạn kiểm soát cách tải từ điển.

Chế độ nhập có thể được xác định mặc định trên toàn cầu trong tệp `intlayer.config.ts` của bạn.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Cũng như đối với mỗi từ điển trong các tệp `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` của bạn.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Ghi đè chế độ nhập mặc định
  content: {
    // ...
  },
};

export default appContent;
```

| Thuộc tính       | Kiểu                               | Mặc định   | Mô tả                                                                                                         |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------ |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Đã lỗi thời**: Sử dụng `dictionary.importMode` thay thế. Xác định cách tải từ điển (xem chi tiết bên dưới). |

Cài đặt `importMode` quy định cách nội dung từ điển được chèn vào thành phần của bạn.
Bạn có thể xác định nó trên toàn cầu trong tệp `intlayer.config.ts` dưới đối tượng `dictionary`, hoặc bạn có thể ghi đè nó cho một từ điển cụ thể trong tệp `.content.ts` của nó.

### 1. Chế độ Tĩnh (`default`)

Trong chế độ tĩnh, Intlayer thay thế `useIntlayer` bằng `useDictionary` và chèn từ điển trực tiếp vào bundle JavaScript.

- **Ưu điểm:** Hiển thị tức thì (đồng bộ), không có yêu cầu mạng bổ sung trong quá trình hydrat hóa.
- **Nhược điểm:** Bundle bao gồm các bản dịch cho **tất cả** các ngôn ngữ có sẵn cho thành phần cụ thể đó.
- **Tốt nhất cho:** Ứng dụng trang đơn (SPA).

**Ví dụ mã đã chuyển đổi:**

```tsx
// Mã của bạn
const content = useIntlayer("my-key");

// Mã được tối ưu hóa (Tĩnh)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Chế độ Động

Trong chế độ động, Intlayer thay thế `useIntlayer` bằng `useDictionaryAsync`. Điều này sử dụng `import()` (cơ chế giống như Suspense) để tải chậm (lazy-load) cụ thể JSON cho ngôn ngữ hiện tại.

- **Ưu điểm:** **Tree shaking cấp độ ngôn ngữ.** Người dùng xem phiên bản tiếng Anh sẽ _chỉ_ tải xuống từ điển tiếng Anh. Từ điển tiếng Pháp không bao giờ được tải.
- **Nhược điểm:** Kích hoạt một yêu cầu mạng (lấy tài nguyên) cho mỗi thành phần trong quá trình hydrat hóa.
- **Tốt nhất cho:** Các khối văn bản lớn, bài báo hoặc ứng dụng hỗ trợ nhiều ngôn ngữ nơi kích thước bundle là quan trọng.

**Ví dụ mã đã chuyển đổi:**

```tsx
// Mã của bạn
const content = useIntlayer("my-key");

// Mã được tối ưu hóa (Động)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Khi sử dụng `importMode: 'dynamic'`, nếu bạn có 100 thành phần sử dụng `useIntlayer` trên một trang duy nhất, trình duyệt sẽ thử 100 lần lấy riêng biệt. Để tránh tình trạng "thác nước" (waterfall) của các yêu cầu này, hãy nhóm nội dung vào ít tệp `.content` hơn (ví dụ: một từ điển cho mỗi phần trang) thay vì một từ điển cho mỗi thành phần nguyên tử.

### 3. Chế độ Fetch

Hoạt động tương tự như chế độ Động nhưng cố gắng lấy các từ điển từ Intlayer Live Sync API trước. Nếu cuộc gọi API thất bại hoặc nội dung không được đánh dấu để cập nhật trực tiếp, nó sẽ quay lại chế độ nhập động.

> Xem tài liệu CMS để biết thêm chi tiết: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)

> Trong chế độ fetch, không thể sử dụng loại bỏ (purge) và nén (minification).

## Tóm tắt: Tĩnh vs Động

| Tính năng                       | Chế độ Tĩnh                                          | Chế độ Động                                |
| :------------------------------ | :--------------------------------------------------- | :----------------------------------------- |
| **Kích thước Bundle JS**        | Lớn hơn (bao gồm tất cả các ngôn ngữ cho thành phần) | Nhỏ nhất (chỉ mã, không có nội dung)       |
| **Tải ban đầu**                 | Tức thì (Nội dung có trong bundle)                   | Độ trễ nhẹ (Lấy JSON)                      |
| **Yêu cầu mạng**                | 0 yêu cầu bổ sung                                    | 1 yêu cầu trên mỗi từ điển                 |
| **Tree Shaking**                | Cấp độ thành phần                                    | Cấp độ thành phần + Cấp độ ngôn ngữ        |
| **Trường hợp sử dụng tốt nhất** | Các thành phần giao diện người dùng, Ứng dụng nhỏ    | Các trang có nhiều văn bản, Nhiều ngôn ngữ |

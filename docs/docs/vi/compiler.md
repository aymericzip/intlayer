---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Trình Biên Dịch Intlayer | Trích Xuất Nội Dung Tự Động cho i18n
description: Tự động hóa quy trình quốc tế hóa của bạn với Trình Biên Dịch Intlayer. Trích xuất nội dung trực tiếp từ các component để i18n nhanh hơn và hiệu quả hơn trong Vite, Next.js và nhiều hơn nữa.
keywords:
  - Intlayer
  - Trình Biên Dịch
  - Quốc tế hóa
  - i18n
  - Tự động hóa
  - Trích xuất
  - Tốc độ
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: Phát hành Trình Biên Dịch
---

# Trình Biên Dịch Intlayer | Trích Xuất Nội Dung Tự Động cho i18n

## Trình Biên Dịch Intlayer là gì?

**Trình Biên Dịch Intlayer** là một công cụ mạnh mẽ được thiết kế để tự động hóa quy trình quốc tế hóa (i18n) trong các ứng dụng của bạn. Nó quét mã nguồn của bạn (JSX, TSX, Vue, Svelte) để tìm các khai báo nội dung, trích xuất chúng và tự động tạo ra các tệp từ điển cần thiết. Điều này cho phép bạn giữ nội dung cùng vị trí với các component của mình trong khi Intlayer xử lý việc quản lý và đồng bộ hóa các từ điển đó.

## Tại sao nên sử dụng Trình Biên Dịch Intlayer?

- **Tự động hóa**: Loại bỏ việc sao chép thủ công nội dung vào từ điển.
- **Tốc độ**: Tối ưu hóa việc trích xuất nội dung đảm bảo quá trình build của bạn vẫn nhanh.
- **Trải nghiệm nhà phát triển**: Giữ các khai báo nội dung ngay tại nơi chúng được sử dụng, cải thiện khả năng bảo trì.
- **Cập nhật trực tiếp**: Hỗ trợ Hot Module Replacement (HMR) để phản hồi ngay lập tức trong quá trình phát triển.

Xem bài viết blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md) để có sự so sánh sâu hơn.

## Tại sao không sử dụng Trình Biên Dịch Intlayer?

Mặc dù trình biên dịch mang lại trải nghiệm "hoạt động ngay" tuyệt vời, nó cũng giới thiệu một số đánh đổi mà bạn nên biết:

- **Sự mơ hồ của heuristic**: Trình biên dịch phải đoán xem đâu là nội dung hướng đến người dùng so với logic ứng dụng (ví dụ: `className="active"`, mã trạng thái, ID sản phẩm). Trong các codebase phức tạp, điều này có thể dẫn đến dương tính giả hoặc các chuỗi bị bỏ sót cần chú thích thủ công và ngoại lệ.
- **Chỉ trích xuất tĩnh**: Trích xuất dựa trên trình biên dịch dựa vào phân tích tĩnh. Các chuỗi chỉ tồn tại ở thời gian chạy (mã lỗi API, trường CMS, v.v.) không thể được phát hiện hoặc dịch bởi trình biên dịch một mình, vì vậy bạn vẫn cần một chiến lược i18n thời gian chạy bổ sung.

Để có so sánh kiến trúc sâu hơn, xem bài viết blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md).

Như một giải pháp thay thế, để tự động hóa quy trình i18n của bạn trong khi vẫn giữ quyền kiểm soát hoàn toàn đối với nội dung của bạn, Intlayer cũng cung cấp lệnh tự động trích xuất `intlayer transform` (xem [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/transform.md)), hoặc lệnh `Intlayer: extract content to Dictionary` từ tiện ích mở rộng Intlayer VS Code (xem [tài liệu tiện ích mở rộng VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)).

## Cách sử dụng

### Vite

Đối với các ứng dụng dựa trên Vite (React, Vue, Svelte, v.v.), cách dễ nhất để sử dụng trình biên dịch là thông qua plugin `vite-intlayer`.

#### Cài đặt

```bash
npm install vite-intlayer
```

#### Cấu hình

Cập nhật file `vite.config.ts` của bạn để bao gồm plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Thêm plugin trình biên dịch
  ],
});
```

#### Hỗ trợ Framework

Plugin Vite tự động phát hiện và xử lý các loại file khác nhau:

- **React / JSX / TSX**: Xử lý một cách tự nhiên.
- **Vue**: Yêu cầu `@intlayer/vue-compiler`.
- **Svelte**: Yêu cầu `@intlayer/svelte-compiler`.

Hãy chắc chắn cài đặt gói trình biên dịch phù hợp với framework của bạn:

```bash
# Dành cho Vue
npm install @intlayer/vue-compiler

# Dành cho Svelte
npm install @intlayer/svelte-compiler
```

### Next.js (Babel)

Đối với Next.js hoặc các ứng dụng dựa trên Webpack sử dụng Babel, bạn có thể cấu hình trình biên dịch bằng cách sử dụng plugin `@intlayer/babel`.

#### Cài đặt

```bash
npm install @intlayer/babel
```

#### Cấu hình

Cập nhật `babel.config.js` (hoặc `babel.config.json`) của bạn để bao gồm plugin trích xuất. Chúng tôi cung cấp một helper `getExtractPluginOptions` để tự động tải cấu hình Intlayer của bạn.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Cấu hình này đảm bảo rằng nội dung được khai báo trong các component của bạn sẽ được tự động trích xuất và sử dụng để tạo từ điển trong quá trình build.

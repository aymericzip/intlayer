---
createdAt: 2025-09-09
updatedAt: 2026-03-12
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
  - version: 8.2.0
    date: 2026-03-09
    changes: Cập nhật các tùy chọn trình biên dịch, thêm hỗ trợ FilePathPattern
  - version: 8.1.7
    date: 2026-02-25
    changes: Cập nhật các tùy chọn trình biên dịch
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

Như một giải pháp thay thế, để tự động hóa quy trình i18n của bạn trong khi vẫn giữ quyền kiểm soát hoàn toàn đối với nội dung của bạn, Intlayer cũng cung cấp lệnh tự động trích xuất `intlayer extract` (xem [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md)), hoặc lệnh `Intlayer: extract content to Dictionary` từ tiện ích mở rộng Intlayer VS Code (xem [tài liệu tiện ích mở rộng VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)).

## Cách sử dụng

<Tabs>
 <Tab value='vite'>

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

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

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

 </Tab>
 <Tab value='nextjs'>

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
    // Trích xuất nội dung từ các component vào từ điển
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Tối ưu hóa việc import bằng cách thay thế useIntlayer bằng việc import trực tiếp từ điển
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Cấu hình này đảm bảo rằng nội dung được khai báo trong các component của bạn será được tự động trích xuất và sử dụng để tạo từ điển trong quá trình build.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Cấu hình tùy chỉnh

Để tùy chỉnh hành vi của trình biên dịch, bạn có thể cập nhật tệp `intlayer.config.ts` trong thư mục gốc của dự án.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Cho biết trình biên dịch có nên được bật hay không.
     * Đặt thành 'build-only' để bỏ qua trình biên dịch trong quá trình phát triển và tăng tốc thời gian khởi động.
     */
    enabled: true,

    /**
     * Xác định đường dẫn tệp đầu ra. Thay thế `outputDir`.
     *
     * - Các đường dẫn bắt đầu bằng `./` được giải quyết tương đối so với thư mục component.
     * - Các đường dẫn bắt đầu bằng `/` được giải quyết tương đối so với thư mục gốc của dự án (`baseDir`).
     *
     * - Việc bao gồm biến `{{locale}}` trong đường dẫn sẽ cho phép tạo các từ điển được tách biệt theo ngôn ngữ.
     *
     * Ví dụ:
     * ```ts
     * {
     *   // Tạo tệp .content.ts đa ngôn ngữ bên cạnh component
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Cách viết tương đương bằng template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Tạo tệp JSON tập trung theo ngôn ngữ trong thư mục gốc của dự án
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Cách viết tương đương bằng template string
     * }
     * ```
     *
     * Danh sách biến:
     *   - `fileName`: Tên tệp.
     *   - `key`: Khóa nội dung.
     *   - `locale`: Ngôn ngữ nội dung.
     *   - `extension`: Phần mở rộng tệp.
     *   - `componentFileName`: Tên tệp component.
     *   - `componentExtension`: Phần mở rộng tệp component.
     *   - `format`: Định dạng từ điển.
     *   - `componentFormat`: Định dạng từ điển component.
     *   - `componentDirPath`: Đường dẫn thư mục component.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Cho biết liệu các component có nên được lưu sau khi được chuyển đổi hay không.
     * Bằng cách đó, trình biên dịch có thể được chạy một lần duy nhất để chuyển đổi ứng dụng, và sau đó nó có thể được gỡ bỏ.
     */
    saveComponents: false,

    /**
     * Chỉ chèn nội dung vào tệp đã tạo. Hữu ích cho đầu ra JSON i18next hoặc ICU MessageFormat cho mỗi ngôn ngữ.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "", // Thêm một tiền tố tùy chọn cho các khóa từ điển được trích xuất
  },
};

export default config;
````

### Tham khảo cấu hình trình biên dịch

Các thuộc tính sau có thể được cấu hình trong khối `compiler` của tệp `intlayer.config.ts` của bạn:

- **enabled**:
  - _Loại_: `boolean | 'build-only'`
  - _Mặc định_: `true`
  - _Mô tả_: Cho biết trình biên dịch có nên được bật hay không.

- **dictionaryKeyPrefix**:
  - _Loại_: `string`
  - _Mặc định_: `''`
  - _Mô tả_: Tiền tố cho các khóa từ điển được trích xuất.

- **transformPattern**:
  - _Loại_: `string | string[]`
  - _Mặc định_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Mô tả_: (Đã lỗi thời: hãy sử dụng `build.traversePattern` thay thế) Các mẫu để duyệt mã để tối ưu hóa.

- **excludePattern**:
  - _Loại_: `string | string[]`
  - _Mặc định_: `['**/node_modules/**']`
  - _Mô tả_: (Đã lỗi thời: hãy sử dụng `build.traversePattern` thay thế) Các mẫu để loại trừ khỏi quá trình tối ưu hóa.

- **output**:
  - _Loại_: `FilePathPattern`
  - _Mặc định_: `({ key }) => 'compiler/${key}.content.json'`
  - _Mô tả_: Xác định đường dẫn tệp đầu ra. Thay thế `outputDir`. Xử lý các biến động như `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}` và `{{componentFormat}}`. Có thể được đặt dưới dạng chuỗi bằng định dạng `'my/{{var}}/path'` hoặc dưới dạng hàm.
  - _Ghi chú_: Các đường dẫn `./**/*` được giải quyết tương đối so với component. Các đường dẫn `/**/*` được giải quyết tương đối so với `baseDir` của Intlayer.
  - _Ghi chú_: Nếu ngôn ngữ được xác định trong đường dẫn, các từ điển sẽ được tạo cho mỗi ngôn ngữ.
  - _Ví dụ_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Loại_: `boolean`
  - _Mặc định_: `false`
  - _Mô tả_: Cho biết liệu siêu dữ liệu có nên được lưu trong tệp hay không. Nếu true, trình biên dịch sẽ không lưu siêu dữ liệu của từ điển (khóa, trình bao bọc nội dung). Hữu ích cho đầu ra JSON i18next hoặc ICU MessageFormat cho mỗi ngôn ngữ.
  - _Ghi chú_: Hữu ích nếu được sử dụng với plugin `loadJSON`.
  - _Ví dụ_:
    Nếu `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Nếu `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Loại_: `boolean`
  - _Mặc định_: `false`
  - _Mô tả_: Cho biết liệu các component có nên được lưu sau khi được chuyển đổi hay không.

### Điền các bản dịch còn thiếu

Intlayer cung cấp một công cụ CLI để giúp bạn điền các bản dịch còn thiếu. Bạn có thể sử dụng lệnh `intlayer` để kiểm tra và điền các bản dịch còn thiếu từ mã của mình.

```bash
npx intlayer test         # Kiểm tra xem có thiếu bản dịch không
```

```bash
npx intlayer fill         # Điền các bản dịch còn thiếu
```

### Trích xuất

Intlayer cung cấp một công cụ CLI để giúp bạn trích xuất nội dung từ mã của mình. Bạn có thể sử dụng lệnh `intlayer extract` để trích xuất nội dung từ mã của mình.

```bash
npx intlayer extract
```

> Để biết thêm chi tiết, hãy tham khảo [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
